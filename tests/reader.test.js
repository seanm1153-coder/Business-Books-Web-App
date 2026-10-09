// What the site remembers for a reader: margin notes, the notebook, the Northline
// year, cloud sync inside a Claude viewer, and the Claude critique.
const test = require("node:test");
const assert = require("node:assert/strict");
const { setup } = require("./helpers");

let env;
test.before(async () => (env = await setup()));
test.after(() => env.close());

// Select a phrase inside a chapter paragraph, as a reader would with the mouse.
function select(page, needle) {
  return page.evaluate((needle) => {
    for (const el of document.querySelectorAll(".prose p")) {
      const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      const nodes = [];
      let text = "";
      for (let n; (n = walker.nextNode()); ) {
        nodes.push([n, text.length]);
        text += n.nodeValue;
      }
      const at = text.indexOf(needle);
      if (at < 0) continue;
      const find = (pos) => {
        for (let i = nodes.length - 1; i >= 0; i--) if (nodes[i][1] <= pos) return [nodes[i][0], pos - nodes[i][1]];
      };
      const range = document.createRange();
      range.setStart(...find(at));
      range.setEnd(...find(at + needle.length));
      const sel = getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
      document.dispatchEvent(new Event("selectionchange"));
      return true;
    }
    return false;
  }, needle);
}

test("highlights and notes survive a reload and reach the notebook", async () => {
  const page = await env.page();
  await page.open("gsbs-kernel");
  assert.ok(await select(page, "Treat it as a hypothesis, stated plainly"));
  await page.waitForSelector(".hl-toolbar", { state: "visible" });
  await page.click('.hl-toolbar [data-act="hl"]');
  assert.equal(await page.evaluate(() => [...document.querySelectorAll("mark.user-hl")].map((m) => m.textContent).join("")), "Treat it as a hypothesis, stated plainly");

  assert.ok(await select(page, "It is not a goal or a vision."));
  await page.waitForSelector(".hl-toolbar", { state: "visible" });
  await page.click('.hl-toolbar [data-act="note"]');
  await page.waitForSelector(".note-pop", { state: "visible" });
  await page.fill("#note-text", "This is the line I keep forgetting.");
  await page.click('[data-np="save"]');
  assert.match(await page.text("[data-page-notes]"), /This is the line I keep forgetting\./);
  assert.equal(await page.text("#notecount"), "2");

  await page.reload();
  await page.waitForSelector("mark.user-hl.has-note");
  await page.click("mark.user-hl >> nth=0");
  await page.waitForSelector(".note-pop", { state: "visible" });
  await page.keyboard.press("Escape");

  await page.open("gsbs-bad-strategy");
  await page.click('[data-pen="goals"]');
  await page.click('[data-seg="0-0"]');
  await page.click('[data-action="check"]');
  await page.open("notebook");
  assert.match(await page.text(".nb-tiles"), /HIGHLIGHTS AND NOTES \| 2 /i);
  assert.match(await page.text(".nb-tiles"), /EXERCISES DONE \| 1 /i);
  assert.match(await page.text(".nb-book"), /This is the line I keep forgetting\./);
  await page.open("shelf");
  // The total grows as pages are added, so read it from the book rather than fixing it here.
  const total = await page.evaluate(() => Object.keys(window.Marginalia.books.find((b) => b.id === "gsbs").pages).length);
  assert.equal(await page.text(".book-progress"), `2 of ${total} pages explored`);
  assert.deepEqual(page.errors, []);
});

test("a Northline year plays through, resumes after reload and lands in the notebook", async () => {
  const page = await env.page();
  await page.open("northline");
  await page.click('[data-act="start"]');
  for (const choice of ["price", "accept90", "category", "stretch"]) {
    await page.click(`[data-choose="${choice}"]`);
    await page.click('[data-act="next"]');
  }
  assert.match(await page.text(".nl-ending"), /Profitable on paper, short of cash .*\$143k .*\$297k .*\$273k/);
  await page.reload();
  await page.waitForSelector(".nl-ending");
  await page.open("notebook");
  assert.match(await page.text(".nb-northline"), /Profit \$143k, cash \$297k, \$273k borrowed/);
  assert.deepEqual(page.errors, []);
});

// A stand-in for the Claude viewer's db and user capabilities, backed by a plain object.
function cloudMock(store) {
  return `(() => {
    const store = ${JSON.stringify(store)};
    window.__store = store;
    const depth = (p) => p.split("/").length;
    const doc = (path) => ({
      path, id: path.split("/").pop(),
      get: async () => ({ exists: path in store, id: path.split("/").pop(), data: () => store[path] }),
      set: async (d) => { store[path] = JSON.parse(JSON.stringify(d)); },
      delete: async () => { delete store[path]; },
      collection: (c) => col(path + "/" + c),
      onSnapshot: () => () => {}
    });
    const col = (path) => ({
      path,
      doc: (id) => doc(path + "/" + id),
      get: async () => {
        const docs = Object.keys(store).filter((k) => k.startsWith(path + "/") && depth(k) === depth(path) + 1)
          .map((k) => ({ id: k.split("/").pop(), exists: true, data: () => store[k] }));
        return { docs, size: docs.length, empty: !docs.length };
      },
      onSnapshot: (next) => { col(path).get().then(next); return () => {}; }
    });
    const db = { doc, collection: col };
    const user = { id: async () => "u_test" };
    window.claude = { use: async (n) => (n === "db" ? db : n === "user" ? user : null) };
  })();`;
}

test("inside a Claude viewer, notes and drafts follow the reader to a new device", async () => {
  const first = await env.page({ init: cloudMock({}) });
  await first.open("gsbs-kernel");
  await first.waitForFunction(() => window.Marginalia.memory.mode === "cloud");
  await first.evaluate(() => window.Marginalia.memory.addNote({ book: "gsbs", page: "kernel", para: "p0", quote: "Strip any good strategy down", note: "cloud note" }));
  await first.open("gsbs-builder");
  await first.fill('textarea[id$="-policy"]', "Concentrate on commuters and stop everything else.");
  await first.waitForFunction(() => Object.keys(window.__store).some((k) => k.endsWith("/library") && JSON.stringify(window.__store[k]).includes("commuters")));
  const store = await first.evaluate(() => window.__store);
  assert.ok(Object.keys(store).every((k) => k.startsWith("data/users/u_test/")), "everything is stored under the reader's private path");

  const second = await env.page({ init: cloudMock(store) });
  await second.open("gsbs-kernel");
  await second.waitForSelector("mark.user-hl");
  assert.match(await second.evaluate(() => document.querySelector("mark.user-hl").textContent), /Strip any good strategy down/);
  await second.open("gsbs-builder");
  await second.waitForFunction(() => document.querySelector('textarea[id$="-policy"]').value.includes("commuters"));
  assert.deepEqual([...first.errors, ...second.errors], []);
});

test("the Claude critique is hidden without a viewer and streams an answer with one", async () => {
  const plain = await env.page();
  await plain.open("gsbs-builder");
  await plain.waitForTimeout(300);
  assert.equal(await plain.evaluate(() => document.querySelector(".critique").hidden), true);

  const page = await env.page({
    init: () => {
      const reply = "Verdict: A real strategy with a clear crux.\nWhat works:\n- The diagnosis names cash and sprawl.\nWhat to fix:\n- Say what stops.\nTry this: Make four products and stop the rest.";
      const sample = (input, opts) =>
        new Promise((resolve) => {
          window.__prompt = input;
          let i = 0;
          const step = () => {
            i = Math.min(reply.length, i + 40);
            opts.onText({ text: reply.slice(0, i), delta: "" });
            if (i < reply.length) setTimeout(step, 20);
            else resolve({ text: reply, truncated: false });
          };
          setTimeout(step, 50);
        });
      window.claude = { use: async (n) => (n === "sample" ? sample : null) };
    }
  });
  for (const route of ["gsbs-builder", "pb-point-of-view"]) {
    await page.open(route);
    await page.waitForSelector(".critique:not([hidden])");
    await page.click(".cq-ask");
    await page.waitForFunction(() => document.querySelector(".cq-out").textContent.includes("Make four products"));
    assert.match(await page.text(".cq-out"), /A real strategy with a clear crux/);
    assert.equal(typeof (await page.evaluate(() => window.__prompt)), "string");
  }
  assert.deepEqual([...plain.errors, ...page.errors], []);
});

test("Ask Claude: hidden without a viewer; reads the page, works its controls and saves answers", async () => {
  const plain = await env.page();
  await plain.open("ump-five-forces");
  await plain.waitForTimeout(300);
  assert.equal(await plain.evaluate(() => document.querySelector(".ac-launch")), null);

  const page = await env.page({
    init: () => {
      const answer = "I set **Buyer power** to strong. The industry now keeps $42 of every $100.\n\n- Buyers take more\n- Suppliers are unchanged";
      const sample = async (input, opts) => {
        window.__inputs = (window.__inputs || []).concat([input]);
        // Like Claude, find the control in the page state and use the tool to change it.
        const m = input[0].content.match(/- (c\d+) choice "Buyer power"/);
        if (opts.tools && m) await opts.tools.find((t) => t.name === "set_control").execute({ id: m[1], value: "Strong" }, { signal: new AbortController().signal });
        await new Promise((r) => setTimeout(r, 30));
        opts.onText({ text: answer, delta: answer });
        return { text: answer, truncated: false, modelTierApplied: "default" };
      };
      sample.limits = async () => ({ maxPromptBytes: 262144, tools: { maxCount: 8 } });
      window.claude = { use: async (n) => (n === "sample" ? sample : null) };
    }
  });
  await page.open("ump-five-forces");
  await page.waitForSelector(".ac-launch");
  await page.click(".ac-launch");
  assert.equal(await page.evaluate(() => document.querySelector(".ac-panel").hidden), false);
  assert.match(await page.text(".ac-about"), /The five forces/);

  await page.fill("#ac-input", "Show me what strong buyers do");
  await page.press("#ac-input", "Enter");
  await page.waitForSelector(".ac-msg.is-claude .ac-md strong");
  assert.match(await page.text(".ac-msg.is-claude .ac-md"), /Buyer power .* Buyers take more/);
  // The tool really moved the control, and the panel says so.
  assert.match(await page.text('.ff [data-ref="tiles"]'), /\$42 .* \$5 .* \$53$/i);
  assert.match(await page.text(".ac-did"), /Chose “Strong” for “Buyer power”/);
  const first = await page.evaluate(() => window.__inputs[0]);
  assert.equal(first[0].role, "user");
  assert.match(first[0].content, /Page: Part I · Chapter 02 · The five forces[\s\S]*<page_text>[\s\S]*<interactives>[\s\S]*choice "Buyer power": Weak \[chosen\]/);
  assert.equal(first[first.length - 1].content, "Show me what strong buyers do");

  // Keep the answer as a margin note.
  await page.click('.ac-msg [data-act="save"]');
  const notes = await page.evaluate(() => window.Marginalia.memory.notes({ book: "ump", page: "five-forces" }));
  assert.equal(notes.length, 1);
  assert.match(notes[0].quote, /^Asked Claude: Show me what strong buyers do/);
  assert.match(notes[0].note, /^Claude: I set Buyer power to strong/);

  // Select a passage and ask about it.
  await page.evaluate(() => {
    const p = document.querySelector(".prose p");
    const range = document.createRange();
    range.setStart(p.firstChild, 0);
    range.setEnd(p.firstChild, 40);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
    document.dispatchEvent(new Event("selectionchange"));
  });
  await page.waitForSelector('.hl-toolbar [data-act="ask"]:not([hidden])');
  await page.click('.hl-toolbar [data-act="ask"]');
  assert.match(await page.text(".ac-quote"), /^About: “Most people picture competition as a/);
  await page.fill("#ac-input", "What does this mean?");
  await page.press("#ac-input", "Enter");
  await page.waitForFunction(() => window.__inputs.length === 2);
  const second = await page.evaluate(() => window.__inputs[1]);
  assert.match(second[second.length - 1].content, /^About this passage on the page: "Most people picture competition as a[\s\S]*What does this mean\?$/);
  // The earlier question and answer travel with the new one.
  assert.equal(second.length, 4);

  // A new page starts a new conversation.
  await page.open("ump-advantage");
  await page.waitForSelector(".ac-empty");
  assert.match(await page.text(".ac-about"), /Competitive advantage/);
  assert.deepEqual([...plain.errors, ...page.errors], []);
});
