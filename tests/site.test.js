// Every route renders, fits the screen, and links only to routes that exist.
const test = require("node:test");
const assert = require("node:assert/strict");
const { execFileSync } = require("node:child_process");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { setup, routes } = require("./helpers");
const { ROOT } = require("./serve");

let env;
test.before(async () => (env = await setup()));
test.after(() => env.close());

test("every route renders at desktop width with live links and no errors", async () => {
  const page = await env.page();
  await page.open("shelf");
  const all = await routes(page);
  assert.ok(all.length > 20, `only ${all.length} routes found`);
  const known = new Set(all);
  for (const r of all) {
    await page.open(r);
    assert.equal(await page.evaluate(() => location.hash.slice(1)), r, `#${r} redirected`);
    assert.ok((await page.text("#view h1")).length > 0, `#${r} has no title`);
    assert.ok((await page.evaluate(() => document.title)).length > 0);
    const width = await page.evaluate(() => document.documentElement.scrollWidth);
    assert.ok(width <= 1280, `#${r} is ${width}px wide`);
    const links = await page.evaluate(() => [...document.querySelectorAll('a[href^="#"]')].map((a) => a.getAttribute("href").slice(1)));
    const dead = links.filter((h) => h && !known.has(h));
    assert.deepEqual(dead, [], `#${r} links to missing routes`);
    const unresolved = await page.evaluate(() => document.querySelectorAll('a[href^="@"]').length);
    assert.equal(unresolved, 0, `#${r} has unresolved @slug links`);
  }
  assert.deepEqual(page.errors, []);
});

for (const scheme of ["light", "dark"]) {
  test(`every route fits a 390px phone screen (${scheme})`, async () => {
    const page = await env.page({ width: 390, height: 844, scheme });
    await page.open("shelf");
    for (const r of await routes(page)) {
      await page.open(r);
      const width = await page.evaluate(() => document.documentElement.scrollWidth);
      assert.ok(width <= 390, `#${r} is ${width}px wide on a phone`);
    }
    assert.deepEqual(page.errors, []);
  });
}

test("old links and unknown routes redirect", async () => {
  const page = await env.page();
  const cases = { book: "gsbs", kernel: "gsbs-kernel", builder: "gsbs-builder", "bad-strategy": "gsbs-bad-strategy", nope: "shelf", "gsbs-nope": "shelf" };
  for (const [from, to] of Object.entries(cases)) {
    await page.goto(env.base + (from ? "#" + from : ""));
    await page.waitForFunction((t) => location.hash.slice(1) === t, to);
  }
  assert.deepEqual(page.errors, []);
});

test("the header stays on one line on every route", async () => {
  const page = await env.page();
  await page.open("shelf");
  for (const r of await routes(page)) {
    await page.open(r);
    const h = await page.evaluate(() => document.querySelector(".site-header").getBoundingClientRect().height);
    assert.ok(h < 80, `header is ${h}px tall on #${r}`);
  }
  const books = await page.evaluate(() => window.Marginalia.books.filter((b) => b.status === "open").map((b) => ({ id: b.id, nav: b.nav || [] })));
  for (const b of books) assert.ok(b.nav.length <= 4, `${b.id} lists ${b.nav.length} pages in its nav; the header fits four`);
  // A narrower desktop, where the longest book navs used to wrap.
  const narrow = await env.page({ width: 1024 });
  for (const b of books) {
    for (const r of [b.id, ...b.nav.map((slug) => `${b.id}-${slug}`)]) {
      await narrow.open(r);
      const h = await narrow.evaluate(() => document.querySelector(".site-header").getBoundingClientRect().height);
      assert.ok(h < 80, `header is ${h}px tall on #${r} at 1024px`);
    }
  }
});

test("the single-file bundle renders every route", async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "marginalia-"));
  const out = path.join(dir, "marginalia.html");
  execFileSync("python3", [path.join(ROOT, "tools/bundle.py"), out]);
  const page = await env.page();
  await page.goto(env.base);
  await page.waitForFunction(() => document.querySelector("#view h1"));
  const all = await routes(page);
  await page.goto("file://" + out);
  for (const r of all) {
    await page.evaluate((h) => (location.hash = h), r);
    await page.waitForFunction((h) => location.hash.slice(1) === h && document.querySelector("#view h1"), r);
  }
  assert.deepEqual(page.errors, []);
  fs.rmSync(dir, { recursive: true });
});
