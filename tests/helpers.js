// Shared setup for the browser tests: one static server and one Chromium per test file.
const { chromium } = require("playwright");
const { serve } = require("./serve");

async function setup() {
  const server = await serve(0);
  const browser = await chromium.launch();
  const base = `http://127.0.0.1:${server.address().port}/index.html`;
  return {
    base,
    browser,
    async close() {
      await browser.close();
      server.close();
    },
    // A fresh context (empty storage) with one page. `errors` collects uncaught
    // exceptions and console errors; tests assert it stays empty.
    async page({ width = 1280, height = 900, scheme = "light", init } = {}) {
      const context = await browser.newContext({ viewport: { width, height }, colorScheme: scheme });
      const page = await context.newPage();
      const errors = [];
      page.on("pageerror", (e) => errors.push(e.message));
      page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
      if (init) await page.addInitScript(init);
      page.errors = errors;
      page.open = (hash) => open(page, base, hash);
      page.text = (sel) => text(page, sel);
      return page;
    }
  };
}

// Navigate to a route and wait for the router to render it.
async function open(page, base, hash = "") {
  const want = hash.replace(/^#/, "");
  const url = base + (want ? "#" + want : "");
  if (page.url().split("#")[0] === base) {
    await page.evaluate((h) => (location.hash = h), want || "shelf");
  } else {
    await page.goto(url);
  }
  await page.waitForFunction(() => document.querySelector("#view h1"));
  await page.waitForTimeout(150); // let blocks mount and lay out
}

// Visible text of the first match, with line breaks collapsed to " | ".
function text(page, sel) {
  return page.evaluate((s) => document.querySelector(s)?.innerText.replace(/\s*\n+\s*/g, " | ").trim() ?? null, sel);
}

// Set a range input and fire its input event.
function slide(page, sel, value) {
  return page.$eval(sel, (el, v) => {
    el.value = v;
    el.dispatchEvent(new Event("input", { bubbles: true }));
  }, value);
}

// Every route the site serves, read from the registered books.
function routes(page) {
  return page.evaluate(() => {
    const out = ["shelf", ...Object.keys(window.Marginalia.views)];
    for (const book of window.Marginalia.books) {
      if (book.status !== "open") continue;
      out.push(book.id, ...Object.keys(book.pages).map((slug) => `${book.id}-${slug}`));
    }
    return out;
  });
}

module.exports = { setup, slide, routes };
