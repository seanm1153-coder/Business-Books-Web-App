// Point-of-view builder: write a category's story (problem, from, to, why now, name)
// and check it against the habits Play Bigger warns about. Drafts persist per book.
(function () {
  "use strict";
  const { esc } = window.Marginalia.util;
  const memory = () => window.Marginalia.memory;

  const FIELDS = ["problem", "from", "to", "why", "name"];
  const PROBLEM_RE =
    /\b(lose|loses|lost|losing|waste|wastes|wasted|cost|costs|can't|cannot|miss|misses|missed|break|breaks|broken|fail|fails|failing|stuck|slow|late|risk|pain|hours|weeks|days|nobody|no one|guess|guessing|juggle|struggle|struggles)\b/i;
  const SELF_RE = /\b(we|we're|our|us|my|platform|solution|product|features?|app)\b/gi;
  const COMPARE_RE = /\b(better|faster|cheaper|easier|more|less|best|improved|enhanced|superior)\b|\d+\s?(%|x\b)/gi;
  const WHY_RE = /\d|\b(now|today|since|recent|recently|new|every|first time|finally|no longer)\b/i;
  const NAME_FLUFF = /\b(platform|solution|next-gen|next generation|revolutionary|innovative|world-class|best-in-class|cutting-edge|ai-powered|smart|ultimate|leading)\b/i;
  const STOP = new Set("a an the and or of to in on for with by at as is are be it its they them their this that when then than so from into".split(" "));

  const words = (s) => s.toLowerCase().match(/[a-z']+/g) || [];
  const content = (s) => new Set(words(s).filter((w) => !STOP.has(w)));

  function runChecks(s) {
    const t = Object.fromEntries(FIELDS.map((k) => [k, (s[k] || "").trim()]));
    const checks = [];
    const add = (status, title, detail) => checks.push({ status, title, detail });

    if (t.problem.length < 30) add("fail", "Starts with a problem", "Describe what's going wrong for the customer, in their words, before anything else.");
    else if (PROBLEM_RE.test(t.problem)) add("pass", "Starts with a problem", "It names something the customer is losing or struggling with.");
    else add("warn", "Starts with a problem", "It describes a situation but not a cost. What are customers losing today: time, money, sleep?");

    const story = [t.problem, t.from, t.to].join(" ");
    const self = [...new Set((story.match(SELF_RE) || []).map((w) => w.toLowerCase()))];
    if (!story.trim()) add("fail", "Tells the market's story, not yours", "Nothing written yet.");
    else if (self.length) add("warn", "Tells the market's story, not yours", `“${self.slice(0, 3).join("”, “")}” puts the company or product in the story too early. The point of view is about the problem.`);
    else add("pass", "Tells the market's story, not yours", "No product or company talk. It reads as a view of the world.");

    const compares = [...new Set((t.to.match(COMPARE_RE) || []).map((w) => w.toLowerCase()))];
    if (!t.to) add("fail", "A new way, not a better one", "Write the “to”: how the job gets done after the change.");
    else if (compares.length) add("warn", "A new way, not a better one", `“${compares[0]}” makes it sound like a better version of the old way. Describe a different way instead.`);
    else add("pass", "A new way, not a better one", "It describes a different way of doing the job, not an upgrade.");

    if (!t.from || !t.to) add("fail", "From and to really differ", "Write both the “from” and the “to”.");
    else {
      const a = content(t.from);
      const b = content(t.to);
      const shared = [...a].filter((w) => b.has(w)).length;
      const overlap = shared / (new Set([...a, ...b]).size || 1);
      if (overlap >= 0.6) add("warn", "From and to really differ", "They share most of their words, so the change reads as small. What actually changes for the customer?");
      else add("pass", "From and to really differ", "The before and after are clearly different ways of working.");
    }

    if (t.why.length < 20) add("fail", "Says why now", "What changed that makes the new way possible or urgent today?");
    else if (WHY_RE.test(t.why)) add("pass", "Says why now", "It points to something that has changed.");
    else add("warn", "Says why now", "Point to what changed: a technology, a rule, a number, a date.");

    const n = words(t.name).length;
    if (!n) add("fail", "A short, plain category name", "Name the category: what people will call this kind of thing.");
    else if (NAME_FLUFF.test(t.name)) add("warn", "A short, plain category name", "Hype words age badly in a name. Describe the problem or the new way plainly.");
    else if (n > 4) add("warn", "A short, plain category name", `${n} words is long for a name people will repeat. Aim for two to four.`);
    else add("pass", "A short, plain category name", "Short enough to repeat, plain enough to understand.");

    return checks;
  }

  function verdict(checks, s) {
    const passes = checks.filter((c) => c.status === "pass").length;
    if (!FIELDS.some((k) => (s[k] || "").trim())) return { passes, text: "Start with the problem", sub: "The checks update as you type." };
    if (passes === checks.length) return { passes, text: "Ready to strike", sub: "This story could carry a launch." };
    if (passes >= 4) return { passes, text: "Close. A few things to tighten.", sub: "Work through the flags below." };
    return { passes, text: "Reads like a product pitch", sub: "Lead with the problem, not the product." };
  }

  function critiquePrompt(s) {
    const v = (k) => (s[k] || "").trim() || "(empty)";
    return [
      'You are a candid, constructive editor who knows the book "Play Bigger" by Al Ramadan, Dave Peterson, Christopher Lochhead and Kevin Maney well. A reader drafted a category point of view, shown below.',
      "Critique it using the book's ideas: a point of view tells the market's story before the product's. It frames a problem in the customer's terms, contrasts the old way with a genuinely new way (not a better version of the old one), says why now, and gives the category a name people can repeat. Watch for product-pitch habits: features, comparisons with competitors, company-centric language and hype.",
      "Be specific and quote the draft's own words. Plain language, no flattery, under 200 words.",
      "",
      "Reply in exactly this format:",
      "Verdict: <one sentence>",
      "What works:",
      "- <point>",
      "What to fix:",
      "- <point>",
      "- <point>",
      "Try this: <one rewritten line for the weakest part of the draft>",
      "",
      "The draft:",
      `The problem: ${v("problem")}`,
      `From: ${v("from")}`,
      `To: ${v("to")}`,
      `Why now: ${v("why")}`,
      `Category name: ${v("name")}`
    ].join("\n");
  }

  window.Marginalia.blocks["pov-builder"] = {
    render(block, ctx) {
      const u = ctx.uid;
      const field = (key, label, q, rows) => `<div class="field">
          <label class="field-label" for="${u}-${key}">
            <span class="field-k">${esc(label)}</span>
            <span class="field-q">${esc(q)}</span>
          </label>
          <textarea id="${u}-${key}" data-field="${key}" rows="${rows}"></textarea>
        </div>`;
      return `<div class="bench pov">
        <div class="bench-tools">
          <div class="examples" role="group" aria-label="Load an example">
            <span class="examples-k">Load</span>
            ${Object.entries(block.examples)
              .map(([id, ex]) => `<button class="pill" type="button" data-example="${id}">${esc(ex.label)}</button>`)
              .join("")}
          </div>
          <p class="source-note" data-ref="source-note"></p>
        </div>
        <div class="bench-grid">
          <form class="bench-form" autocomplete="off">
            ${field("problem", "Step 1 · The problem", "What is going wrong for customers today?", 3)}
            ${field("from", "Step 2 · From", "How is the job done today?", 1)}
            ${field("to", "Step 3 · To", "How will it be done instead?", 1)}
            ${field("why", "Step 4 · Why now", "What has changed that makes the new way possible?", 2)}
            ${field("name", "Step 5 · The category", "What will people call this kind of thing?", 1)}
          </form>
          <aside class="bench-check" aria-label="Preview and checks">
            <div class="check-card">
              <div class="pov-card" data-ref="preview"></div>
              <div class="check-summary" data-ref="summary" aria-live="polite"></div>
              <ul class="checks" data-ref="checks" role="list"></ul>
              <div class="critique" data-ref="critique" hidden></div>
            </div>
          </aside>
        </div>
      </div>`;
    },

    mount(root, block) {
      const ref = (n) => root.querySelector(`[data-ref="${n}"]`);
      const inputs = Object.fromEntries(FIELDS.map((k) => [k, root.querySelector(`[data-field="${k}"]`)]));
      const clone = (id) => ({ source: id, ...Object.fromEntries(FIELDS.map((k) => [k, block.examples[id][k] || ""])) });
      const saved = memory().draft(block.draftKey);
      let state = saved && FIELDS.every((k) => typeof saved[k] === "string") ? saved : clone(block.defaultExample);
      let canSave = true;

      function autosize(el) {
        el.style.height = "auto";
        el.style.height = el.scrollHeight + 2 + "px";
      }

      function fill() {
        FIELDS.forEach((k) => {
          inputs[k].value = state[k];
          autosize(inputs[k]);
        });
      }

      function update() {
        canSave = memory().setDraft(block.draftKey, state);
        const v = (k) => esc(state[k].trim());
        ref("preview").innerHTML = `
          <p class="eyebrow">The point of view</p>
          <p class="pov-problem">${v("problem") || '<span class="pov-empty">The problem goes here.</span>'}</p>
          <div class="pov-fromto">
            <div><p class="pov-k">From</p><p>${v("from") || "…"}</p></div>
            <span class="pov-arrow" aria-hidden="true">→</span>
            <div><p class="pov-k">To</p><p>${v("to") || "…"}</p></div>
          </div>
          ${state.why.trim() ? `<p class="pov-why"><span class="pov-k">Why now</span>${v("why")}</p>` : ""}
          <p class="pov-name"><span class="pov-k">We call it</span>${v("name") || "…"}</p>`;
        const checks = runChecks(state);
        const verdictNow = verdict(checks, state);
        ref("summary").innerHTML = `
          <p class="verdict">${esc(verdictNow.text)}</p>
          <p class="score"><span class="pips" aria-hidden="true">${checks.map((c) => `<i class="pip ${c.status}"></i>`).join("")}</span>${verdictNow.passes} of ${checks.length} checks pass</p>
          <p class="verdict-sub">${esc(verdictNow.sub)}</p>`;
        ref("checks").innerHTML = checks
          .map(
            (c) => `<li class="check ${c.status}">
              <span class="check-icon" aria-hidden="true">${c.status === "pass" ? "✓" : c.status === "warn" ? "!" : "–"}</span>
              <span class="check-body">
                <span class="check-t"><span class="visually-hidden">${c.status === "pass" ? "Passes" : c.status === "warn" ? "Needs work" : "Missing"}: </span>${esc(c.title)}</span>
                <span class="check-d">${esc(c.detail)}</span>
              </span>
            </li>`
          )
          .join("");
        root.querySelectorAll("[data-example]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.example === state.source)));
        const ex = block.examples[state.source];
        ref("source-note").textContent =
          ex && ex.note
            ? ex.note
            : !canSave
              ? "Drafts can't be saved here, so copy your work before leaving."
              : memory().mode === "cloud"
                ? "Your draft is saved to your Claude account as you type."
                : "Your draft is saved in this browser as you type.";
      }

      root.querySelector("form").addEventListener("input", (e) => {
        const k = e.target.dataset.field;
        if (!k) return;
        state[k] = e.target.value;
        state.source = "own";
        autosize(e.target);
        update();
      });
      root.querySelector("form").addEventListener("submit", (e) => e.preventDefault());
      root.querySelectorAll("[data-example]").forEach((b) =>
        b.addEventListener("click", () => {
          state = clone(b.dataset.example);
          fill();
          update();
        })
      );
      const onResize = () => FIELDS.forEach((k) => autosize(inputs[k]));
      window.addEventListener("resize", onResize);
      // Fields are first sized before the web fonts arrive; size them again once they have.
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => root.isConnected && onResize());

      let touched = false;
      root.querySelector("form").addEventListener("input", () => (touched = true));
      const offMemory = memory().onChange((kind) => {
        if (kind !== "all" || touched) return;
        const remote = memory().draft(block.draftKey);
        if (remote && FIELDS.every((k) => typeof remote[k] === "string")) {
          state = remote;
          fill();
        }
        update();
      });

      const offAsk = window.Marginalia.ask.mount(ref("critique"), {
        label: "Ask Claude for a critique",
        prompt: () => critiquePrompt(state),
        isEmpty: () => !FIELDS.some((k) => (state[k] || "").trim())
      });

      fill();
      update();
      return () => {
        window.removeEventListener("resize", onResize);
        offMemory();
        offAsk();
      };
    }
  };
})();
