// Continuity: a toy model of why strategies need time. A company pursues strategy A or B.
// Each year, capability for the strategy it's pursuing (skills, reputation, fit) closes
// `learn` of the gap to full; capability for the other decays by `decay`. Profit that year is
// the strategy's potential × capability, less `changeCost` in a year it changes strategy.
// Optionally the market shifts in year `shift`, after which B has the higher potential.
(function () {
  "use strict";
  const { esc } = window.Marginalia.util;

  const money = (v) => `${Math.round(v) < 0 ? "−" : ""}$${Math.abs(Math.round(v)).toLocaleString("en-US")}m`;
  const NEVER = 11;
  const WORDS = ["no", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];

  function simulate(block, { every, shift, adapt }) {
    let s = "A";
    const cap = { A: block.start, B: 0 };
    const years = [];
    let total = 0;
    let changes = 0;
    for (let t = 1; t <= block.years; t++) {
      let changed = false;
      if (!adapt && every < NEVER && t > 1 && (t - 1) % every === 0) changed = true;
      if (adapt && shift && t === block.shiftYear && s === "A") changed = true;
      if (changed) {
        s = s === "A" ? "B" : "A";
        changes++;
      }
      const shifted = shift && t >= block.shiftYear;
      const potential = shifted ? block.after[s] : block.before[s];
      const other = s === "A" ? "B" : "A";
      cap[s] += (1 - cap[s]) * block.learn;
      cap[other] *= block.decay;
      const profit = potential * cap[s] - (changed ? block.changeCost : 0);
      total += profit;
      years.push({ t, s, profit, changed });
    }
    return { years, total, changes };
  }

  window.Marginalia.blocks.continuity = {
    render(block, ctx) {
      return `<section class="ct" aria-labelledby="${ctx.uid}-h">
        <div class="spot-head">
          <p class="eyebrow">A toy model</p>
          <h2 class="h2" id="${ctx.uid}-h">${esc(block.title)}</h2>
          <p class="section-dek">${esc(block.intro)}</p>
        </div>
        <div class="jc-presets" role="group" aria-label="Examples">
          <span class="examples-k">Try</span>
          ${block.presets.map((p) => `<button type="button" class="pill" data-preset="${esc(p.id)}">${esc(p.label)}</button>`).join("")}
        </div>
        <div class="bt-grid">
          <div class="levers">
            <div class="lever">
              <label class="lever-label" for="${ctx.uid}-every">
                <span class="lever-t">${esc(block.everyLabel)}</span>
                <span class="lever-v tnum" data-ref="val"></span>
              </label>
              <input type="range" id="${ctx.uid}-every" data-ref="every" min="1" max="${NEVER}" step="1">
              <p class="lever-hint">${esc(block.everyHint)}</p>
            </div>
            <label class="ls-toggle" for="${ctx.uid}-shift"><input type="checkbox" id="${ctx.uid}-shift" data-ref="shift"> ${esc(block.shiftLabel)}</label>
            <label class="ls-toggle" for="${ctx.uid}-adapt"><input type="checkbox" id="${ctx.uid}-adapt" data-ref="adapt"> ${esc(block.adaptLabel)}</label>
            <div class="tiles tiles-3" data-ref="tiles"></div>
          </div>
          <div class="bt-right">
            <div class="adv-key"><span><i class="key ct-k-a"></i>Strategy A</span><span><i class="key ct-k-b"></i>Strategy B</span></div>
            <figure class="bt-chart-fig">
              <div class="bt-chart" data-ref="chart"></div>
              <figcaption class="bt-cap">${esc(block.caption)}</figcaption>
            </figure>
            <div class="happened" aria-live="polite">
              <p class="eyebrow">What's happening</p>
              <p class="happened-t" data-ref="note"></p>
            </div>
          </div>
        </div>
        <p class="fin-foot">${esc(block.foot)}</p>
      </section>`;
    },

    mount(root, block) {
      const ref = (n) => root.querySelector(`[data-ref="${n}"]`);
      let state = { ...block.presets[0].state };

      function chartSVG(run) {
        const box = ref("chart");
        const W = Math.max(260, box.clientWidth || 480);
        const H = 220;
        const m = { t: 18, r: 10, b: 28, l: 44 };
        const w = W - m.l - m.r;
        const h = H - m.t - m.b;
        const lo = -50;
        const hi = 100;
        const slot = w / block.years;
        const y = (v) => m.t + h - ((v - lo) / (hi - lo)) * h;
        let grid = "";
        for (let v = lo; v <= hi; v += 50) {
          grid += `<line class="ch-grid${v === 0 ? " is-zero" : ""}" x1="${m.l}" x2="${m.l + w}" y1="${y(v).toFixed(1)}" y2="${y(v).toFixed(1)}"/>
            <text class="ch-tick" x="${m.l - 6}" y="${(y(v) + 3.5).toFixed(1)}" text-anchor="end">${money(v)}</text>`;
        }
        for (let t = 5; t <= block.years; t += 5) {
          grid += `<text class="ch-tick" x="${(m.l + (t - 0.5) * slot).toFixed(1)}" y="${H - 10}" text-anchor="middle">${t}</text>`;
        }
        const bars = run.years
          .map((yr) => {
            const top = y(Math.max(0, yr.profit));
            const bottom = y(Math.min(0, yr.profit));
            return `<rect class="ct-bar is-${yr.s}" x="${(m.l + (yr.t - 1) * slot + slot * 0.15).toFixed(1)}" y="${top.toFixed(1)}" width="${(slot * 0.7).toFixed(1)}" height="${Math.max(1, bottom - top).toFixed(1)}"/>`;
          })
          .join("");
        const sx = m.l + (block.shiftYear - 1) * slot;
        const shiftMark = state.shift
          ? `<line class="inv-rise" x1="${sx.toFixed(1)}" x2="${sx.toFixed(1)}" y1="${m.t - 6}" y2="${m.t + h}"/>
             <text class="ch-tick" x="${(sx + 4).toFixed(1)}" y="${m.t + 2}">Market shifts</text>`
          : "";
        return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(block.caption)} Total over ${block.years} years: ${money(run.total)}.">
          ${grid}${bars}${shiftMark}
        </svg>`;
      }

      function describe(run, steady) {
        const diff = run.total - steady.total;
        const vs = `${money(Math.abs(diff))} ${diff < 0 ? "less" : "more"} than never changing`;
        const n = run.changes;
        if (state.adapt && state.shift)
          return `Changing once, when the market actually shifts, beats both standing still and constant change: ${money(run.total)} over ${block.years} years, ${vs}. The year of the change is costly, and then the new strategy has to be built up from scratch.`;
        if (state.every >= NEVER)
          return state.shift
            ? `Sticking with strategy A after the market shifts in year ${block.shiftYear} cuts its profit to ${money(run.years[run.years.length - 1].profit)} a year for the rest of the period: ${money(run.total)} over ${block.years} years. Continuity isn't the same as standing still when the ground moves.`
            : `Sticking with one strategy lets skills, reputation and fit build year after year: profit climbs to ${money(run.years[run.years.length - 1].profit)} a year and stays there, ${money(run.total)} over ${block.years} years.`;
        return `Changing strategy ${n === 1 ? "once" : `${WORDS[n] || n} times`} throws away what was built each time: every change costs a year of disruption and restarts the climb. Over ${block.years} years the company earns ${money(run.total)}, ${vs}.`;
      }

      function update() {
        ref("every").value = state.every;
        ref("val").textContent = state.every >= NEVER ? "never" : state.every === 1 ? "every year" : `every ${state.every} years`;
        ref("shift").checked = state.shift;
        ref("adapt").checked = state.adapt && state.shift;
        ref("adapt").disabled = !state.shift;
        ref("adapt").closest(".ls-toggle").classList.toggle("is-off", !state.shift);
        ref("every").disabled = state.adapt && state.shift;
        root.querySelectorAll("[data-preset]").forEach((b) => {
          const p = block.presets.find((q) => q.id === b.dataset.preset).state;
          b.setAttribute("aria-pressed", String(p.every === state.every && p.shift === state.shift && p.adapt === state.adapt));
        });
        const run = simulate(block, { ...state, adapt: state.adapt && state.shift });
        const steady = simulate(block, { every: NEVER, shift: state.shift, adapt: false });
        ref("chart").innerHTML = chartSVG(run);
        ref("tiles").innerHTML = [
          [`${block.years}-year profit`, money(run.total)],
          ["Changes", String(run.changes)],
          ["Against staying", Math.round(run.total - steady.total) === 0 ? "Same" : `${run.total > steady.total ? "+" : "−"}${money(Math.abs(run.total - steady.total))}`]
        ]
          .map(([k, v]) => `<div class="tile"><p class="tile-k">${esc(k)}</p><p class="tile-v">${esc(v)}</p></div>`)
          .join("");
        ref("note").textContent = describe(run, steady);
      }

      root.addEventListener("input", (e) => {
        if (e.target === ref("every")) {
          state.every = Number(e.target.value);
          update();
        }
      });
      root.addEventListener("change", (e) => {
        if (e.target === ref("shift")) state.shift = e.target.checked;
        else if (e.target === ref("adapt")) state.adapt = e.target.checked;
        else return;
        update();
      });
      root.addEventListener("click", (e) => {
        const btn = e.target.closest("[data-preset]");
        if (!btn) return;
        state = { ...block.presets.find((p) => p.id === btn.dataset.preset).state };
        update();
      });
      const onResize = () => update();
      window.addEventListener("resize", onResize);
      update();
      return () => window.removeEventListener("resize", onResize);
    }
  };
})();
