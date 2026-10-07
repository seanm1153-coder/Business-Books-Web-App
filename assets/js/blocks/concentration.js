// Spread or concentrate: allocate a fixed effort budget across initiatives that only
// pay off once they cross a threshold. Effort past the threshold adds a small bonus.
(function () {
  "use strict";
  const { esc } = window.Marginalia.util;

  const BONUS = 0.15; // extra value per unit past the threshold
  const MAX_BONUS_UNITS = 2;

  function payoff(f, effort) {
    if (effort < f.threshold) return 0;
    return f.value * (1 + BONUS * Math.min(MAX_BONUS_UNITS, effort - f.threshold));
  }

  window.Marginalia.blocks.concentration = {
    render(block, ctx) {
      return `<section class="conc" aria-labelledby="${ctx.uid}-h">
        <div class="spot-head">
          <p class="eyebrow">Exercise</p>
          <h2 class="h2" id="${ctx.uid}-h">${esc(block.title)}</h2>
          <p class="section-dek">${esc(block.intro)}</p>
        </div>
        <div class="jc-presets" role="group" aria-label="Presets">
          <span class="examples-k">Try</span>
          <button type="button" class="pill" data-preset="spread">Spread evenly</button>
          <button type="button" class="pill" data-preset="focus">Concentrate</button>
          <button type="button" class="pill" data-preset="clear">Clear</button>
        </div>
        <div class="chain-grid">
          <ol class="fronts" data-ref="fronts" role="list"></ol>
          <div class="chain-out">
            <div class="tiles">
              <div class="tile"><p class="tile-k">Effort left</p><p class="tile-v" data-ref="left"></p></div>
              <div class="tile"><p class="tile-k">${esc(block.impactLabel)}</p><p class="tile-v" data-ref="impact"></p></div>
            </div>
            <div class="happened" aria-live="polite">
              <p class="eyebrow">What's happening</p>
              <p class="happened-t" data-ref="note"></p>
            </div>
          </div>
        </div>
        <div class="fin-dock">
          <p>Effort left <span data-ref="dock-left"></span></p>
          <p>${esc(block.impactLabel)} <span data-ref="dock-impact"></span></p>
        </div>
      </section>`;
    },

    mount(root, block) {
      const ref = (n) => root.querySelector(`[data-ref="${n}"]`);
      const fronts = block.fronts;
      let effort = block.start.slice();

      const used = () => effort.reduce((a, b) => a + b, 0);
      const total = () => fronts.reduce((sum, f, i) => sum + payoff(f, effort[i]), 0);
      const fmt = (v) => Math.round(v).toLocaleString("en-US");

      function presets(name) {
        if (name === "clear") return fronts.map(() => 0);
        if (name === "spread") {
          const each = Math.floor(block.budget / fronts.length);
          const out = fronts.map(() => each);
          for (let i = 0; i < block.budget - each * fronts.length; i++) out[i]++;
          return out;
        }
        return block.focus.slice();
      }

      function render() {
        const left = block.budget - used();
        ref("fronts").innerHTML = fronts
          .map((f, i) => {
            const e = effort[i];
            const pays = payoff(f, e);
            const status = pays
              ? `<span class="front-status is-on">Crossed · pays ${fmt(pays)}</span>`
              : e
                ? `<span class="front-status is-short">Below threshold · needs ${f.threshold - e} more</span>`
                : `<span class="front-status">Not started</span>`;
            const cells = Array.from({ length: Math.max(f.threshold + MAX_BONUS_UNITS, 1) }, (_, k) => {
              const cls = [k < e ? "on" : "", k === f.threshold - 1 ? "is-threshold" : ""].filter(Boolean).join(" ");
              return `<i class="${cls}"></i>`;
            }).join("");
            return `<li class="front${pays ? " is-crossed" : ""}">
              <div class="front-head">
                <span class="front-name">${esc(f.name)}</span>
                <span class="front-value">Worth ${fmt(f.value)} at the threshold</span>
              </div>
              <div class="front-bar" aria-hidden="true">${cells}</div>
              <p class="front-meta"><span class="tnum">${e}</span> ${e === 1 ? "unit" : "units"}, ${f.threshold} needed · ${status}</p>
              <div class="front-btns">
                <button type="button" class="pill" data-minus="${i}" ${e ? "" : "disabled"} aria-label="Take effort from ${esc(f.name)}">−</button>
                <button type="button" class="pill" data-plus="${i}" ${left && e < f.threshold + MAX_BONUS_UNITS ? "" : "disabled"} aria-label="Add effort to ${esc(f.name)}">+</button>
              </div>
            </li>`;
          })
          .join("");
        const impact = total();
        ref("left").textContent = `${left} of ${block.budget}`;
        ref("impact").textContent = fmt(impact);
        ref("dock-left").textContent = left;
        ref("dock-impact").textContent = fmt(impact);
        const crossed = fronts.filter((f, i) => payoff(f, effort[i])).length;
        const started = effort.filter((e) => e).length;
        let note;
        if (!used()) note = block.emptyNote;
        else if (!crossed) note = `Effort is spread across ${started} ${started === 1 ? "initiative" : "initiatives"} and none has crossed its threshold, so nothing pays off yet.`;
        else if (started > crossed) note = `${crossed} of ${started} started initiatives ${crossed === 1 ? "has" : "have"} crossed the threshold. The effort on the other ${started - crossed} isn't paying off yet.`;
        else note = `Every initiative you started has crossed its threshold. That's what concentration buys: fewer things, done far enough to matter.`;
        if (left === 0) note += " The budget is fully spent.";
        ref("note").textContent = note;
      }

      root.addEventListener("click", (e) => {
        const plus = e.target.closest("[data-plus]");
        const minus = e.target.closest("[data-minus]");
        const preset = e.target.closest("[data-preset]");
        if (plus) effort[Number(plus.dataset.plus)]++;
        else if (minus) effort[Number(minus.dataset.minus)]--;
        else if (preset) effort = presets(preset.dataset.preset);
        else return;
        render();
        const again = plus ? root.querySelector(`[data-plus="${plus.dataset.plus}"]`) : minus ? root.querySelector(`[data-minus="${minus.dataset.minus}"]`) : null;
        if (again && !again.disabled) again.focus();
      });
      render();
    }
  };
})();
