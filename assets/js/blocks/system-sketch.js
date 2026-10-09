// System sketch: describe a recurring problem with the book's tools (behavior, stock, flows,
// a feedback loop, a delay, a leverage point), see it drawn as a stock-and-flow sketch, and
// check it against the habits the book teaches. Drafts persist per book.
(function () {
  "use strict";
  const { esc } = window.Marginalia.util;
  const memory = () => window.Marginalia.memory;

  const FIELDS = ["behavior", "stock", "inflow", "outflow", "kind", "loop", "delay", "lever"];
  const TEXT = FIELDS.filter((k) => k !== "kind");
  const TIME_RE =
    /\b(over|since|every|each|years?|months?|weeks?|quarters?|decades?|rising|rose|risen|falling|fell|fallen|keeps?|kept|again|trend|steadily|grow|grows|grew|growing|declin\w*|swing\w*|cycles?|crept|creeping|flattened|for the (past|last))\b/i;
  const FLOW_RE = /\b(per|rate|a (day|week|month|quarter|year)|each (day|week|month|quarter|year)|sales|hiring|spending|growth|sign-?ups?|cancellations?)\b/i;
  const UNIT_RE = /\d|\b(days?|weeks?|months?|quarters?|years?|decades?|hours?)\b/i;
  const NUMBER_RE = /\b(budgets?|prices?|targets?|tax(es)?|subsid\w*|fees?|bonus(es)?|headcount|more staff|hire more|increase|raise|cut|spend more|discounts?)\b/i;
  const HIGHER_RE =
    /\b(informat\w*|data|visible|show|shows|see|sees|dashboard|feedback|reports?|rules?|polic\w*|incentives?|goals?|purpose|measured?|metrics?|who decides|beliefs?|assumptions?|paradigm)\b/i;
  const STOP = new Set("a an the and or of to in on for with by at as is are be it its they them their this that when then than so from into more less fewer".split(" "));
  const words = (s) => (s.toLowerCase().match(/[a-z']+/g) || []).filter((w) => w.length > 3 && !STOP.has(w));

  function runChecks(s) {
    const t = Object.fromEntries(FIELDS.map((k) => [k, (s[k] || "").trim()]));
    const checks = [];
    const add = (status, title, detail) => checks.push({ status, title, detail });

    if (t.behavior.length < 20) add("fail", "Behavior, not an event", "Describe what has been happening over time: the shape a graph of it would have.");
    else if (TIME_RE.test(t.behavior)) add("pass", "Behavior, not an event", "It describes a pattern over time, not a single happening.");
    else add("warn", "Behavior, not an event", "It reads like a single event. What would the line on a graph look like over months or years?");

    const flowWord = t.stock.match(FLOW_RE);
    if (!t.stock) add("fail", "A stock, not a flow", "Name what accumulates: something you could count at a single moment.");
    else if (flowWord) add("warn", "A stock, not a flow", `“${flowWord[0]}” sounds like a flow. A stock is what you could count at one moment: customers, cash, staff, trust.`);
    else add("pass", "A stock, not a flow", "Something that accumulates and could be counted at a moment.");

    if (!t.inflow || !t.outflow) add("fail", "A way in and a way out", `Every stock has flows on both sides. ${t.inflow ? "What drains it?" : "What adds to it?"}`);
    else add("pass", "A way in and a way out", "There are two ways to change the stock: raise the inflow or cut the outflow.");

    const stockWords = words(t.stock);
    const mentions = stockWords.some((w) => t.loop.toLowerCase().includes(w.slice(0, Math.max(4, w.length - 2))));
    if (t.loop.length < 20) add("fail", "The stock talks back", "Say how the level of the stock changes one of its own flows.");
    else if (!t.kind) add("warn", "The stock talks back", "Choose whether the loop reinforces change or balances it.");
    else if (stockWords.length && !mentions) add("warn", "The stock talks back", `The loop doesn't mention the stock. Try “the more ${t.stock.toLowerCase()}, the …”.`);
    else add("pass", "The stock talks back", `A ${t.kind} loop that runs from the stock back to its flows.`);

    if (!t.delay) add("fail", "A delay with a length", "Where does the system take time to notice, decide or respond?");
    else if (UNIT_RE.test(t.delay)) add("pass", "A delay with a length", "It says how long. Delays are usually longer than people expect, so a number helps.");
    else add("warn", "A delay with a length", "How long is it? A rough number is better than none.");

    if (!t.lever) add("fail", "Pushing above the numbers", "What would you change?");
    else if (HIGHER_RE.test(t.lever)) add("pass", "Pushing above the numbers", "It changes information, rules or goals, which sit well up Meadows's list of leverage points.");
    else if (NUMBER_RE.test(t.lever)) add("warn", "Pushing above the numbers", "That changes a number, the lowest leverage point. Could you change who sees what, the rules or the goal instead?");
    else add("warn", "Pushing above the numbers", "Which leverage point is it? The list runs from numbers up through information, rules and goals.");

    return checks;
  }

  function verdict(checks, s) {
    const passes = checks.filter((c) => c.status === "pass").length;
    if (!TEXT.some((k) => (s[k] || "").trim())) return { passes, text: "Start with the behavior", sub: "The checks update as you type." };
    if (passes === checks.length) return { passes, text: "A system you can work on", sub: "Behavior, structure and a place to push." };
    if (passes >= 4) return { passes, text: "Most of the structure is there", sub: "Work through the flags below." };
    return { passes, text: "Still mostly events", sub: "Find the stock and the loop behind the behavior." };
  }

  function critiquePrompt(s) {
    const v = (k) => (s[k] || "").trim() || "(empty)";
    return [
      'You are a candid, constructive editor who knows the book "Thinking in Systems: A Primer" by Donella H. Meadows well. A reader sketched a system behind a problem they face, shown below.',
      "Critique it using the book's ideas: start from behavior over time, not events; a stock is what accumulates and flows change it; feedback loops run from the stock back to its own flows; delays cause overshoot and oscillation; and the strongest interventions change information, rules and goals rather than numbers. Point out a loop, delay or limit the reader may have missed.",
      "Be specific and quote the sketch's own words. Plain language, no flattery, under 200 words.",
      "",
      "Reply in exactly this format:",
      "Verdict: <one sentence>",
      "What works:",
      "- <point>",
      "What to fix:",
      "- <point>",
      "- <point>",
      "Try this: <one rewritten line for the weakest part of the sketch>",
      "",
      "The sketch:",
      `Behavior: ${v("behavior")}`,
      `Stock: ${v("stock")}`,
      `Inflow: ${v("inflow")}`,
      `Outflow: ${v("outflow")}`,
      `Loop (${s.kind || "kind not chosen"}): ${v("loop")}`,
      `Delay: ${v("delay")}`,
      `Where to push: ${v("lever")}`
    ].join("\n");
  }

  window.Marginalia.blocks["system-sketch"] = {
    render(block, ctx) {
      const u = ctx.uid;
      const field = (key, label, q, rows) => `<div class="field">
          <label class="field-label" for="${u}-${key}">
            <span class="field-k">${esc(label)}</span>
            <span class="field-q">${esc(q)}</span>
          </label>
          <textarea id="${u}-${key}" data-field="${key}" rows="${rows}"></textarea>
        </div>`;
      return `<div class="bench sk">
        <div class="spot-head">
          <p class="eyebrow">Workbench</p>
          <h2 class="h2">${esc(block.title)}</h2>
          <p class="section-dek">${esc(block.intro)}</p>
        </div>
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
            ${field("behavior", "Step 1 · The behavior", "What has been happening, over time?", 3)}
            ${field("stock", "Step 2 · The stock", "What accumulates?", 1)}
            <div class="sk-flows">
              ${field("inflow", "Step 3 · Inflow", "What adds to it?", 1)}
              ${field("outflow", "Step 4 · Outflow", "What drains it?", 1)}
            </div>
            <fieldset class="field">
              <legend class="field-label">
                <span class="field-k">Step 5 · The loop</span>
                <span class="field-q">How does the stock change its own flows?</span>
              </legend>
              <div class="sk-kinds">
                <label class="sk-kind"><input type="radio" name="${u}-kind" value="reinforcing" data-kind> Reinforcing</label>
                <label class="sk-kind"><input type="radio" name="${u}-kind" value="balancing" data-kind> Balancing</label>
              </div>
              <textarea id="${u}-loop" data-field="loop" rows="2" aria-label="The loop"></textarea>
            </fieldset>
            ${field("delay", "Step 6 · The delay", "Where does it take time to respond, and how long?", 2)}
            ${field("lever", "Step 7 · Where to push", "What would you change?", 2)}
          </form>
          <aside class="bench-check" aria-label="Sketch and checks">
            <div class="check-card">
              <div class="sk-card" data-ref="preview"></div>
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
      const inputs = Object.fromEntries(TEXT.map((k) => [k, root.querySelector(`[data-field="${k}"]`)]));
      const clone = (id) => ({ source: id, ...Object.fromEntries(FIELDS.map((k) => [k, block.examples[id][k] || ""])) });
      const valid = (d) => d && FIELDS.every((k) => typeof d[k] === "string");
      const saved = memory().draft(block.draftKey);
      let state = valid(saved) ? saved : clone(block.defaultExample);
      let canSave = true;

      function autosize(el) {
        el.style.height = "auto";
        el.style.height = el.scrollHeight + 2 + "px";
      }

      function fill() {
        TEXT.forEach((k) => {
          inputs[k].value = state[k];
          autosize(inputs[k]);
        });
        root.querySelectorAll("[data-kind]").forEach((r) => (r.checked = r.value === state.kind));
      }

      function preview() {
        const v = (k, empty) => (state[k].trim() ? esc(state[k].trim()) : `<span class="pov-empty">${esc(empty)}</span>`);
        const kind = state.kind;
        return `
          <p class="eyebrow">The sketch</p>
          <p class="sk-behavior">${v("behavior", "What has been happening goes here.")}</p>
          <div class="sk-diagram">
            <div class="sk-flow"><span class="pov-k">Inflow</span><p>${v("inflow", "…")}</p></div>
            <span class="sk-arrow" aria-hidden="true">→</span>
            <div class="sk-stock"><span class="pov-k">Stock</span><p>${v("stock", "…")}</p></div>
            <span class="sk-arrow" aria-hidden="true">→</span>
            <div class="sk-flow"><span class="pov-k">Outflow</span><p>${v("outflow", "…")}</p></div>
          </div>
          <p class="sk-loop">${
            kind ? `<span class="sk-loop-c is-${kind}" aria-hidden="true">${kind === "reinforcing" ? "R" : "B"}</span><span class="visually-hidden">${kind} loop: </span>` : ""
          }${v("loop", "The loop goes here.")}</p>
          ${state.delay.trim() ? `<p class="sk-note"><span class="pov-k">Delay</span>${v("delay", "")}</p>` : ""}
          ${state.lever.trim() ? `<p class="sk-note sk-lever"><span class="pov-k">Where to push</span>${v("lever", "")}</p>` : ""}`;
      }

      function update() {
        canSave = memory().setDraft(block.draftKey, state);
        ref("preview").innerHTML = preview();
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
                ? "Your sketch is saved to your Claude account as you type."
                : "Your sketch is saved in this browser as you type.";
      }

      const form = root.querySelector("form");
      let touched = false;
      form.addEventListener("input", (e) => {
        touched = true;
        if (e.target.matches("[data-kind]")) state.kind = e.target.value;
        else if (e.target.dataset.field) {
          state[e.target.dataset.field] = e.target.value;
          autosize(e.target);
        } else return;
        state.source = "own";
        update();
      });
      form.addEventListener("submit", (e) => e.preventDefault());
      root.querySelectorAll("[data-example]").forEach((b) =>
        b.addEventListener("click", () => {
          state = clone(b.dataset.example);
          fill();
          update();
        })
      );
      const onResize = () => TEXT.forEach((k) => autosize(inputs[k]));
      window.addEventListener("resize", onResize);
      // Fields are first sized before the web fonts arrive; size them again once they have.
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => root.isConnected && onResize());

      const offMemory = memory().onChange((kind) => {
        if (kind !== "all" || touched) return;
        const remote = memory().draft(block.draftKey);
        if (valid(remote)) {
          state = remote;
          fill();
        }
        update();
      });

      const offAsk = window.Marginalia.ask.mount(ref("critique"), {
        label: "Ask Claude for a critique",
        prompt: () => critiquePrompt(state),
        isEmpty: () => !TEXT.some((k) => (state[k] || "").trim())
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
