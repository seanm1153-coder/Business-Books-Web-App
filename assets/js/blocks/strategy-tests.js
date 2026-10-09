// Strategy tests: write down a strategy and check it against Porter's five tests (a
// distinctive value proposition, a tailored value chain, trade-offs, fit and continuity).
// The checks are rules of thumb on the wording. Drafts persist per book.
(function () {
  "use strict";
  const { esc } = window.Marginalia.util;
  const memory = () => window.Marginalia.memory;

  const FIELDS = ["customers", "needs", "price", "chain", "tradeoffs", "fit", "continuity"];
  const EVERYONE_RE = /\b(everyone|everybody|anyone|all customers|all businesses|of all sizes|any size|all kinds|every kind|mass market|the whole market)\b/i;
  const RELATIVE_RE = /\b(more|less|higher|lower|premium|discount|cheaper|dearer|than|below|above|same|match|matches|half|double)\b|%/i;
  const DIFFERENT_RE = /\b(unlike|instead|only|rather than|different|differently|our own|in-house|we don't|we do not|no |without|none of)\b/i;
  const NOT_RE = /\b(won't|will not|don't|do not|never|no |not |without|instead of|give up|gave up|stop|stopped|turn away|turn down|decline|refuse|avoid)\b/i;
  const LINK_RE = /\b(so|because|which means|lets|let us|allows|makes|so that|reinforc\w*|enables?|means|feeds|supports|in turn)\b/i;
  const YEARS_RE = /\d+\s*(years?|yrs)|\b(years|decades?)\b/i;
  const SHORT_RE = /\b(every year|annually|each year|quarterly|every quarter|this year)\b/i;

  function runChecks(s) {
    const t = Object.fromEntries(FIELDS.map((k) => [k, (s[k] || "").trim()]));
    const checks = [];
    const add = (status, title, detail) => checks.push({ status, title, detail });

    if (!t.customers || !t.needs) add("fail", "A distinctive value proposition", "Say which customers you serve and which of their needs you meet.");
    else if (EVERYONE_RE.test(t.customers)) add("warn", "A distinctive value proposition", "Serving everyone isn't a choice. Which customers will you serve best, and which will you leave to others?");
    else if (!RELATIVE_RE.test(t.price)) add("warn", "A distinctive value proposition", "Say how your price compares with the alternatives: higher, lower or the same, and why customers accept it.");
    else add("pass", "A distinctive value proposition", "It names the customers, their needs and a relative price.");

    const pieces = t.chain.split(/\n|;|,|\.\s/).filter((x) => x.trim().length > 3).length;
    if (!t.chain) add("fail", "A tailored value chain", "Which activities do you perform differently from your rivals?");
    else if (pieces < 2 || !DIFFERENT_RE.test(t.chain)) add("warn", "A tailored value chain", "List at least two activities you perform differently from rivals, and say how they differ.");
    else add("pass", "A tailored value chain", "Several activities, each done differently from the usual way.");

    if (!t.tradeoffs) add("fail", "Clear trade-offs", "What have you chosen not to do?");
    else if (NOT_RE.test(t.tradeoffs)) add("pass", "Clear trade-offs", "It names things you've chosen not to do. That's what makes a position hard to copy.");
    else add("warn", "Clear trade-offs", "Name what you won't do: customers you turn away, features you leave out, markets you stay out of.");

    if (!t.fit) add("fail", "Fit among activities", "How do your activities make each other work better?");
    else if (LINK_RE.test(t.fit)) add("pass", "Fit among activities", "It describes activities that reinforce one another.");
    else add("warn", "Fit among activities", "Describe a link: how one activity makes another cheaper or more valuable.");

    if (!t.continuity) add("fail", "Continuity", "How long have you pursued this strategy, and for how long will you?");
    else if (SHORT_RE.test(t.continuity) && !YEARS_RE.test(t.continuity.replace(SHORT_RE, ""))) add("warn", "Continuity", "A strategy revisited every year never has time to build its fit. Think in years.");
    else if (YEARS_RE.test(t.continuity)) add("pass", "Continuity", "It thinks in years, long enough for skills, reputation and fit to build.");
    else add("warn", "Continuity", "Put a number of years on it. A strategy needs years, not quarters, to pay off.");

    return checks;
  }

  function verdict(checks, s) {
    const passes = checks.filter((c) => c.status === "pass").length;
    if (!FIELDS.some((k) => (s[k] || "").trim())) return { passes, text: "Start with your customers", sub: "The checks update as you type." };
    if (passes === checks.length) return { passes, text: "Passes all five tests", sub: "A distinct position, built to last." };
    if (passes >= 3) return { passes, text: "Most of a strategy", sub: "Work through the flags below." };
    return { passes, text: "Not yet a strategy", sub: "Start with the value proposition, then the trade-offs." };
  }

  function critiquePrompt(s) {
    const v = (k) => (s[k] || "").trim() || "(empty)";
    return [
      'You are a candid, constructive editor who knows "Understanding Michael Porter" by Joan Magretta, and Michael Porter\'s work on strategy, well. A reader wrote down a strategy, shown below.',
      "Critique it against Porter's five tests: a distinctive value proposition (which customers, which needs, what relative price), a value chain tailored to it, clear trade-offs, fit among activities, and continuity over years. Watch for competing to be the best rather than unique, operational effectiveness passed off as strategy, and straddling.",
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
      "The strategy:",
      `Customers: ${v("customers")}`,
      `Needs: ${v("needs")}`,
      `Relative price: ${v("price")}`,
      `Tailored value chain: ${v("chain")}`,
      `Trade-offs: ${v("tradeoffs")}`,
      `Fit: ${v("fit")}`,
      `Continuity: ${v("continuity")}`
    ].join("\n");
  }

  window.Marginalia.blocks["strategy-tests"] = {
    render(block, ctx) {
      const u = ctx.uid;
      const field = (key, label, q, rows) => `<div class="field">
          <label class="field-label" for="${u}-${key}">
            <span class="field-k">${esc(label)}</span>
            <span class="field-q">${esc(q)}</span>
          </label>
          <textarea id="${u}-${key}" data-field="${key}" rows="${rows}"></textarea>
        </div>`;
      return `<div class="bench st">
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
            ${field("customers", "Test 1 · Which customers?", "Who do you serve, and who don't you?", 2)}
            ${field("needs", "Test 1 · Which needs?", "What do you do for them that others do poorly?", 2)}
            ${field("price", "Test 1 · What relative price?", "How does your price compare with the alternatives?", 1)}
            ${field("chain", "Test 2 · A tailored value chain", "Which activities do you perform differently from rivals?", 3)}
            ${field("tradeoffs", "Test 3 · Trade-offs", "What have you chosen not to do?", 2)}
            ${field("fit", "Test 4 · Fit", "How do your activities reinforce each other?", 2)}
            ${field("continuity", "Test 5 · Continuity", "How long have you pursued this, and for how long will you?", 1)}
          </form>
          <aside class="bench-check" aria-label="Summary and checks">
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
      const valid = (d) => d && FIELDS.every((k) => typeof d[k] === "string");
      const saved = memory().draft(block.draftKey);
      let state = valid(saved) ? saved : clone(block.defaultExample);
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
        const v = (k, empty) => (state[k].trim() ? esc(state[k].trim()) : `<span class="pov-empty">${esc(empty)}</span>`);
        ref("preview").innerHTML = `
          <p class="eyebrow">The strategy</p>
          <dl class="st-rows">
            <div><dt class="pov-k">Customers</dt><dd>${v("customers", "Which customers?")}</dd></div>
            <div><dt class="pov-k">Needs</dt><dd>${v("needs", "Which needs?")}</dd></div>
            <div><dt class="pov-k">Relative price</dt><dd>${v("price", "What relative price?")}</dd></div>
            ${state.tradeoffs.trim() ? `<div><dt class="pov-k">We won't</dt><dd>${v("tradeoffs", "")}</dd></div>` : ""}
          </dl>`;
        const checks = runChecks(state);
        const verdictNow = verdict(checks, state);
        ref("summary").innerHTML = `
          <p class="verdict">${esc(verdictNow.text)}</p>
          <p class="score"><span class="pips" aria-hidden="true">${checks.map((c) => `<i class="pip ${c.status}"></i>`).join("")}</span>${verdictNow.passes} of ${checks.length} tests pass</p>
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
                ? "Your strategy is saved to your Claude account as you type."
                : "Your strategy is saved in this browser as you type.";
      }

      const form = root.querySelector("form");
      let touched = false;
      form.addEventListener("input", (e) => {
        const k = e.target.dataset.field;
        if (!k) return;
        touched = true;
        state[k] = e.target.value;
        state.source = "own";
        autosize(e.target);
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
      const onResize = () => FIELDS.forEach((k) => autosize(inputs[k]));
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
