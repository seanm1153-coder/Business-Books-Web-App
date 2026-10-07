// Kernel workbench: write a diagnosis, guiding policy and actions, with rule-based
// checks for the patterns Rumelt calls bad strategy. Drafts persist per book.
(function () {
  "use strict";
  const { esc, store } = window.Marginalia.util;

  const CHALLENGE =
    /\b(problem|problems|challenge|obstacle|obstacles|because|threat|threats|losing|lose|loses|can't|cannot|unable|risk|risks|constraint|bottleneck|declin\w*|shrink\w*|squeez\w*|run(?:ning)? out|too (?:many|few|slow|expensive|late)|behind|struggl\w*|weak\w*|stuck|failing|fails)\b/i;
  const RULES_OUT =
    /\b(instead of|rather than|only|not|no longer|stop|avoid|exit|cut|drop|abandon|concentrate|focus(?:ed)? on|narrow|fewer|less|never|refuse)\b/i;
  const GOAL_PATTERNS = [
    /\b(?:become|be|remain|stay)\s+(?:the|a|an|our)\s+(?:[\w-]+\s+){0,3}?(?:leader|leading|best|premier|top|number one|no\. ?1|#1|dominant|preferred|go-to)\b(?:\s+[\w-]+){0,2}/gi,
    /\b(?:grow|increase|boost|double|triple|raise|lift|reach|hit|achieve|deliver)\b[^.,;\n]{0,40}?\d[\d,.]*\s?(?:%|percent\b|x\b|million\b|billion\b|k\b)(?:\s+(?:year[- ]over[- ]year|annually|a year|per year|growth))?/gi,
    /\b(?:maximi[sz]e|optimi[sz]e)\s+(?:(?:shareholder|stakeholder|long-term)\s+)?(?:value|returns|revenue|profits?)\b/gi,
    /\b(?:increase|grow|improve|boost|raise)\s+(?:our\s+)?(?:revenue|sales|profits?|profitability|market share|customer satisfaction(?: scores)?|margins?|engagement)\b/gi
  ];
  const FLUFF_TERMS = [
    "world-class", "world class", "world-leading", "best-in-class", "best in class", "customer-centric", "customer centric",
    "synergy", "synergies", "synergistic", "leveraging", "leverage our", "drive innovation", "driving innovation",
    "innovative solutions", "empower", "empowering", "excellence", "holistic", "paradigm", "transformational",
    "digital transformation", "next-generation", "next generation", "cutting-edge", "cutting edge", "value-added",
    "seamless", "seamlessly", "robust", "unlock value", "stakeholder value", "best practices", "game-changing",
    "game changer", "move the needle", "strategic alignment", "thought leader\\w*", "disrupt\\w*", "deliver value",
    "value proposition"
  ];
  const FLUFF_RE = new RegExp(`\\b(?:${FLUFF_TERMS.join("|")})\\b`, "gi");

  function findMarks(text) {
    const all = [];
    const collect = (re, kind) => {
      re.lastIndex = 0;
      let m;
      while ((m = re.exec(text))) {
        const raw = m[0];
        const trimmed = raw.replace(/\s+$/, "");
        if (trimmed) all.push({ s: m.index, e: m.index + trimmed.length, kind, text: trimmed });
        if (!raw.length) re.lastIndex++;
      }
    };
    GOAL_PATTERNS.forEach((re) => collect(re, "goal"));
    collect(FLUFF_RE, "fluff");
    all.sort((a, b) => a.s - b.s || b.e - b.s - (a.e - a.s));
    const marks = [];
    let end = -1;
    for (const f of all) {
      if (f.s >= end) {
        marks.push(f);
        end = f.e;
      }
    }
    return { marks, all };
  }

  function markup(text) {
    if (!text.trim()) return '<span class="rb-empty">Not written yet.</span>';
    const { marks } = findMarks(text);
    let out = "";
    let i = 0;
    for (const m of marks) {
      out += esc(text.slice(i, m.s));
      const title = m.kind === "goal" ? "Reads as a goal" : "Sounds strategic, says little";
      out += `<mark class="m-${m.kind}" title="${title}">${esc(text.slice(m.s, m.e))}</mark>`;
      i = m.e;
    }
    return out + esc(text.slice(i));
  }

  function listNums(nums, noun) {
    if (nums.length === 1) return `${noun} ${nums[0]}`;
    return `${noun}s ${nums.slice(0, -1).join(", ")} and ${nums[nums.length - 1]}`;
  }

  function runChecks(s) {
    const D = s.diagnosis.trim();
    const P = s.policy.trim();
    const acts = s.actions.map((a, i) => ({ ...a, n: i + 1 })).filter((a) => a.text.trim());
    const checks = [];

    // 1. Diagnosis names the challenge
    if (D.length < 25) {
      checks.push({
        status: "fail",
        title: "Diagnosis names the challenge",
        detail: D ? "Your diagnosis is very short. Say what is going on and what makes it hard." : "Write a diagnosis first. Say what is going on and what makes it hard."
      });
    } else if (CHALLENGE.test(D)) {
      checks.push({ status: "pass", title: "Diagnosis names the challenge", detail: "It names an obstacle, which gives the rest of the strategy something to act on." });
    } else {
      checks.push({ status: "warn", title: "Diagnosis names the challenge", detail: "It describes the situation but doesn't name an obstacle. What, specifically, is in the way?" });
    }

    // 2. Guiding policy is an approach, not a goal
    const policyGoals = P ? findMarks(P).all.filter((m) => m.kind === "goal") : [];
    if (!P) {
      checks.push({ status: "fail", title: "Policy is an approach, not a goal", detail: "Write a guiding policy: the overall approach you will take to the challenge." });
    } else if (policyGoals.length) {
      checks.push({
        status: "warn",
        title: "Policy is an approach, not a goal",
        detail: `“${policyGoals[0].text}” reads as a goal. A guiding policy says how you will deal with the challenge, not the result you hope for.`
      });
    } else {
      checks.push({ status: "pass", title: "Policy is an approach, not a goal", detail: "It describes how you will act, not just where you want to end up." });
    }

    // 3. Guiding policy rules things out
    if (!P) {
      checks.push({ status: "fail", title: "Policy rules things out", detail: "A guiding policy works like a guardrail. Once you write one, say what it rules out." });
    } else if (RULES_OUT.test(P)) {
      checks.push({ status: "pass", title: "Policy rules things out", detail: "It says what you won't do, which is what makes it useful for deciding." });
    } else {
      checks.push({ status: "warn", title: "Policy rules things out", detail: "Nothing in it rules anything out. What will you stop doing, or refuse to do?" });
    }

    // 4. Every action serves the policy
    const orphans = acts.filter((a) => !a.linked).map((a) => a.n);
    if (!acts.length) {
      checks.push({ status: "fail", title: "Every action serves the policy", detail: "Add at least one action. Without actions, a strategy is only commentary." });
    } else if (orphans.length) {
      const one = orphans.length === 1;
      checks.push({
        status: "warn",
        title: "Every action serves the policy",
        detail: `${listNums(orphans, "Action")} ${one ? "isn't" : "aren't"} linked to the policy. Cut ${one ? "it" : "them"}, or change the policy so ${one ? "it belongs" : "they belong"}.`
      });
    } else {
      checks.push({ status: "pass", title: "Every action serves the policy", detail: "Each action is linked to the guiding policy." });
    }

    // 5. Actions are concrete and few
    const targets = acts.filter((a) => findMarks(a.text).all.some((m) => m.kind === "goal")).map((a) => a.n);
    if (!acts.length) {
      checks.push({ status: "fail", title: "Actions are concrete and few", detail: "Nothing to check yet." });
    } else if (targets.length) {
      const one = targets.length === 1;
      checks.push({
        status: "warn",
        title: "Actions are concrete and few",
        detail: `${listNums(targets, "Action")} ${one ? "is a target" : "are targets"}, not ${one ? "an action" : "actions"}. What will you do to hit ${one ? "it" : "them"}?`
      });
    } else if (acts.length > 6) {
      checks.push({
        status: "warn",
        title: "Actions are concrete and few",
        detail: `${acts.length} actions is a lot to coordinate. A long list often means nobody chose. Which ones matter most?`
      });
    } else {
      checks.push({
        status: "pass",
        title: "Actions are concrete and few",
        detail: `${acts.length} concrete ${acts.length === 1 ? "action" : "actions"}, few enough to coordinate.`
      });
    }

    // 6. Plain language
    const allText = [D, P, ...acts.map((a) => a.text)].join("\n");
    if (!allText.trim()) {
      checks.push({ status: "fail", title: "Plain language", detail: "Nothing to check yet." });
    } else {
      const fluff = [];
      FLUFF_RE.lastIndex = 0;
      let m;
      while ((m = FLUFF_RE.exec(allText))) {
        const t = m[0].toLowerCase();
        if (!fluff.includes(t)) fluff.push(t);
      }
      if (fluff.length) {
        const shown = fluff.slice(0, 3).map((t) => `“${t}”`).join(", ");
        checks.push({
          status: "warn",
          title: "Plain language",
          detail: `${fluff.length} ${fluff.length === 1 ? "phrase sounds" : "phrases sound"} strategic but say little: ${shown}${fluff.length > 3 ? " and more" : ""}.`
        });
      } else {
        checks.push({ status: "pass", title: "Plain language", detail: "No buzzwords found." });
      }
    }

    return checks;
  }

  function verdict(checks, s) {
    const passes = checks.filter((c) => c.status === "pass").length;
    const empty = !s.diagnosis.trim() && !s.policy.trim() && !s.actions.some((a) => a.text.trim());
    if (empty) return { passes, text: "Start writing", sub: "The checks update as you type." };
    if (passes === checks.length) return { passes, text: "Reads like a strategy", sub: "Now test it against what actually happens." };
    if (passes >= 4) return { passes, text: "Close. A few things to tighten.", sub: "Work through the flags below." };
    return { passes, text: "Reads more like a wish list", sub: "Start with the diagnosis. Everything else depends on it." };
  }

  function mapSVG(s) {
    const acts = s.actions.map((a, i) => ({ ...a, n: i + 1 })).filter((a) => a.text.trim());
    const hasD = s.diagnosis.trim().length > 0;
    const hasP = s.policy.trim().length > 0;
    const count = acts.length;
    const r = count > 8 ? 9 : 12;
    const span = Math.min(264, Math.max(0, count - 1) * 46);
    const x0 = 160 - span / 2;
    const ay = 160;

    const node = (cy, label, on) =>
      `<g class="km-node${on ? " on" : ""}"><rect x="96" y="${cy - 14}" width="128" height="28" rx="3"/><text x="160" y="${cy + 4}" text-anchor="middle">${label}</text></g>`;

    let out = `<line class="km-edge${hasD && hasP ? " on" : ""}" x1="160" y1="38" x2="160" y2="70"/>`;
    acts.forEach((a, k) => {
      a.x = count > 1 ? x0 + (k * span) / (count - 1) : 160;
      if (a.linked && hasP) out += `<line class="km-edge on" x1="160" y1="98" x2="${a.x.toFixed(1)}" y2="${ay - r}"/>`;
    });
    out += node(24, "DIAGNOSIS", hasD) + node(84, "GUIDING POLICY", hasP);
    acts.forEach((a) => {
      out += `<g class="km-act ${a.linked ? "on" : "off"}"><circle cx="${a.x.toFixed(1)}" cy="${ay}" r="${r}"/><text x="${a.x.toFixed(1)}" y="${ay + 3.5}" text-anchor="middle">${a.n}</text></g>`;
    });
    if (!count) out += `<text class="km-empty" x="160" y="${ay + 4}" text-anchor="middle">NO ACTIONS YET</text>`;
    return out;
  }

  function cloneExample(examples, id) {
    const ex = examples[id];
    return {
      source: id,
      diagnosis: ex.diagnosis,
      policy: ex.policy,
      actions: ex.actions.map((a) => ({ text: a.text, linked: a.linked }))
    };
  }

  window.Marginalia.blocks["kernel-builder"] = {
    render(block, ctx) {
      const u = ctx.uid;
      return `<div class="bench">
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
            <div class="field">
              <label class="field-label" for="${u}-diagnosis">
                <span class="field-k">Step 1 · Diagnosis</span>
                <span class="field-q">What is going on, and what makes it hard?</span>
              </label>
              <textarea id="${u}-diagnosis" rows="5"></textarea>
            </div>
            <div class="field">
              <label class="field-label" for="${u}-policy">
                <span class="field-k">Step 2 · Guiding policy</span>
                <span class="field-q">How will you deal with it, and what will you rule out?</span>
              </label>
              <textarea id="${u}-policy" rows="3"></textarea>
            </div>
            <fieldset class="field">
              <legend class="field-label">
                <span class="field-k">Step 3 · Coherent actions</span>
                <span class="field-q">What will you actually do?</span>
                <span class="field-hint">Mark each action that carries out the guiding policy.</span>
              </legend>
              <ol class="actions" role="list"></ol>
              <button class="pill pill-add" type="button" data-ref="add-action">+ Add an action</button>
            </fieldset>
          </form>

          <aside class="bench-check" aria-label="Checks">
            <div class="check-card">
              <div class="check-summary" data-ref="summary" aria-live="polite"></div>
              <svg class="kernel-map" data-ref="map" viewBox="0 0 320 184" role="img" aria-label="Map of how the actions connect to the guiding policy"></svg>
              <p class="map-key">Solid line: the action carries out the policy. Dashed circle: not linked.</p>
              <ul class="checks" data-ref="checks" role="list"></ul>
            </div>
            <div class="readback">
              <p class="eyebrow">Read-back</p>
              <div data-ref="readback"></div>
              <p class="legend"><mark class="m-goal">Highlighted</mark> reads as a goal. <mark class="m-fluff">Highlighted</mark> sounds strategic but says little.</p>
            </div>
          </aside>
        </div>
      </div>`;
    },

    mount(root, block, ctx) {
      const examples = block.examples;
      const saved = store.get(block.storageKey);
      let state = saved && Array.isArray(saved.actions) ? saved : cloneExample(examples, block.defaultExample);
      let canSave = true;

      const ref = (name) => root.querySelector(`[data-ref="${name}"]`);
      const diagEl = root.querySelector(`#${ctx.uid}-diagnosis`);
      const policyEl = root.querySelector(`#${ctx.uid}-policy`);
      const actionsEl = root.querySelector(".actions");
      const addBtn = ref("add-action");
      const actionId = (i) => `${ctx.uid}-action-${i}`;

      // Grow textareas to fit their text instead of scrolling inside them.
      function autosize(el) {
        el.style.height = "auto";
        el.style.height = el.scrollHeight + 2 + "px";
      }

      function fillFields() {
        diagEl.value = state.diagnosis;
        policyEl.value = state.policy;
        renderActions();
        autosize(diagEl);
        autosize(policyEl);
      }

      function renderActions() {
        actionsEl.innerHTML = state.actions
          .map(
            (a, i) => `<li class="action-row">
              <span class="action-n">${i + 1}</span>
              <textarea class="action-text" id="${actionId(i)}" data-i="${i}" rows="1" aria-label="Action ${i + 1}" placeholder="Describe a concrete step">${esc(a.text)}</textarea>
              <button type="button" class="link-toggle" data-link="${i}" aria-pressed="${a.linked}">${a.linked ? "Serves the policy" : "Not linked"}</button>
              <button type="button" class="remove" data-remove="${i}" aria-label="Remove action ${i + 1}">×</button>
            </li>`
          )
          .join("");
        actionsEl.querySelectorAll("textarea").forEach(autosize);
      }

      function update() {
        canSave = store.set(block.storageKey, state);
        const checks = runChecks(state);
        const v = verdict(checks, state);
        ref("summary").innerHTML = `
          <p class="verdict">${esc(v.text)}</p>
          <p class="score"><span class="pips" aria-hidden="true">${checks.map((c) => `<i class="pip ${c.status}"></i>`).join("")}</span>${v.passes} of ${checks.length} checks pass</p>
          <p class="verdict-sub">${esc(v.sub)}</p>`;
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
        ref("map").innerHTML = mapSVG(state);
        const acts = state.actions.filter((a) => a.text.trim());
        ref("readback").innerHTML = `<dl class="rb">
          <dt>Diagnosis</dt><dd>${markup(state.diagnosis)}</dd>
          <dt>Guiding policy</dt><dd>${markup(state.policy)}</dd>
          <dt>Actions</dt><dd>${
            acts.length ? `<ol>${state.actions.map((a, i) => (a.text.trim() ? `<li value="${i + 1}">${markup(a.text)}</li>` : "")).join("")}</ol>` : markup("")
          }</dd>
        </dl>`;
        updateSource();
      }

      function updateSource() {
        root.querySelectorAll("[data-example]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.example === state.source)));
        const ex = examples[state.source];
        const saving = canSave ? "Your draft is saved in this browser as you type." : "Drafts can't be saved in this browser, so copy your work before leaving.";
        ref("source-note").textContent = ex && ex.note ? ex.note : saving;
      }

      function markOwn() {
        if (state.source !== "own") state.source = "own";
      }

      diagEl.addEventListener("input", () => {
        state.diagnosis = diagEl.value;
        autosize(diagEl);
        markOwn();
        update();
      });
      policyEl.addEventListener("input", () => {
        state.policy = policyEl.value;
        autosize(policyEl);
        markOwn();
        update();
      });
      actionsEl.addEventListener("input", (e) => {
        const i = Number(e.target.dataset.i);
        if (Number.isNaN(i)) return;
        state.actions[i].text = e.target.value;
        autosize(e.target);
        markOwn();
        update();
      });
      actionsEl.addEventListener("click", (e) => {
        const link = e.target.closest("[data-link]");
        const remove = e.target.closest("[data-remove]");
        if (link) {
          const i = Number(link.dataset.link);
          state.actions[i].linked = !state.actions[i].linked;
          markOwn();
          renderActions();
          actionsEl.querySelector(`[data-link="${i}"]`).focus();
          update();
        } else if (remove) {
          const i = Number(remove.dataset.remove);
          state.actions.splice(i, 1);
          markOwn();
          renderActions();
          const next = actionsEl.querySelector(`#${actionId(Math.min(i, state.actions.length - 1))}`);
          (next || addBtn).focus();
          update();
        }
      });
      actionsEl.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && e.target.matches("textarea")) {
          e.preventDefault();
          addBtn.click();
        }
      });
      addBtn.addEventListener("click", () => {
        state.actions.push({ text: "", linked: true });
        markOwn();
        renderActions();
        actionsEl.querySelector(`#${actionId(state.actions.length - 1)}`).focus();
        update();
      });
      root.querySelector("form").addEventListener("submit", (e) => e.preventDefault());
      root.querySelectorAll("[data-example]").forEach((b) =>
        b.addEventListener("click", () => {
          state = cloneExample(examples, b.dataset.example);
          fillFields();
          update();
        })
      );

      const onResize = () => root.querySelectorAll(".bench-form textarea").forEach(autosize);
      window.addEventListener("resize", onResize);

      fillFields();
      update();
      return () => window.removeEventListener("resize", onResize);
    }
  };
})();
