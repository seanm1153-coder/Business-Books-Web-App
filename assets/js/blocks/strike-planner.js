// Strike planner: schedule launch moves across weeks and watch a toy model of
// market attention. Attention fades each week; moves in the same week reinforce
// each other; a move lands harder when the market is already paying attention.
//   impact(h)  = h × (1 + 0.5 × (h − 1))         h = moves that week
//   a(t)       = 0.6 × a(t−1) + impact(h) × (1 + a(t−1) / 4)
(function () {
  "use strict";
  const { esc } = window.Marginalia.util;

  const DECAY = 0.6;
  const impact = (h) => h * (1 + 0.5 * (h - 1));

  function simulate(weeks, plan) {
    const counts = Array(weeks).fill(0);
    plan.forEach((w) => w != null && counts[w]++);
    const out = [];
    let a = 0;
    for (let t = 0; t < weeks; t++) {
      a = DECAY * a + impact(counts[t]) * (1 + a / 4);
      out.push({ a, h: counts[t] });
    }
    return out;
  }

  function chartSVG(series, threshold, width) {
    const H = 190;
    const m = { t: 12, r: 12, b: 26, l: 12 };
    const w = Math.max(260, width) - m.l - m.r;
    const h = H - m.t - m.b;
    const top = Math.max(threshold * 2, ...series.map((p) => p.a)) * 1.08;
    const y = (v) => m.t + h - (v / top) * h;
    const bw = w / series.length;
    const bars = series
      .map((p, i) => {
        const x = m.l + i * bw + 2;
        const yy = y(p.a);
        const height = Math.max(0, m.t + h - yy);
        const on = p.a >= threshold;
        return `<g>
          <title>Week ${i + 1}: ${p.h} ${p.h === 1 ? "move" : "moves"}${on ? ", the market is paying attention" : ""}</title>
          <rect class="sp-bar${on ? " is-on" : ""}" x="${x.toFixed(1)}" y="${yy.toFixed(1)}" width="${Math.max(2, bw - 4).toFixed(1)}" height="${height.toFixed(1)}" rx="3"/>
          ${p.h ? `<circle class="sp-move" cx="${(x + (bw - 4) / 2).toFixed(1)}" cy="${(m.t + h + 6).toFixed(1)}" r="2.5"/>` : ""}
          <text class="sp-tick" x="${(x + (bw - 4) / 2).toFixed(1)}" y="${H - 6}" text-anchor="middle">${i + 1}</text>
        </g>`;
      })
      .join("");
    const ty = y(threshold).toFixed(1);
    return `<svg class="sp-chart" width="${m.l + w + m.r}" height="${H}" viewBox="0 0 ${m.l + w + m.r} ${H}" role="img" aria-label="Market attention by week">
      <line class="sp-base" x1="${m.l}" x2="${m.l + w}" y1="${m.t + h}" y2="${m.t + h}"/>
      ${bars}
      <line class="sp-threshold" x1="${m.l}" x2="${m.l + w}" y1="${ty}" y2="${ty}"/>
      <text class="sp-threshold-t" x="${m.l + w}" y="${(Number(ty) - 6).toFixed(1)}" text-anchor="end">The market notices</text>
    </svg>`;
  }

  window.Marginalia.blocks["strike-planner"] = {
    render(block, ctx) {
      const weeks = Array.from({ length: block.weeks }, (_, i) => i + 1);
      return `<section class="sp" aria-labelledby="${ctx.uid}-h">
        <div class="spot-head">
          <p class="eyebrow">Exercise</p>
          <h2 class="h2" id="${ctx.uid}-h">${esc(block.title)}</h2>
          <p class="section-dek">${esc(block.intro)}</p>
        </div>
        <div class="jc-presets" role="group" aria-label="Presets">
          <span class="examples-k">Try</span>
          ${Object.entries(block.presets)
            .map(([id, p]) => `<button type="button" class="pill" data-preset="${id}">${esc(p.label)}</button>`)
            .join("")}
          <button type="button" class="pill" data-preset="clear">Clear</button>
        </div>
        <div class="sp-grid">
          <div class="sp-plan">
            <div class="sp-weeks" aria-hidden="true">${weeks.map((w) => `<span>${w}</span>`).join("")}</div>
            ${block.moves
              .map(
                (mv, i) => `<div class="sp-row" role="group" aria-label="${esc(mv)}: pick a week">
                  <span class="sp-move-t">${esc(mv)}</span>
                  <div class="sp-cells">
                    ${weeks.map((w) => `<button type="button" class="sp-cell" data-move="${i}" data-week="${w - 1}" aria-label="${esc(mv)} in week ${w}" aria-pressed="false"></button>`).join("")}
                  </div>
                </div>`
              )
              .join("")}
            <p class="sp-hint">Tap a week to schedule a move there. Tap it again to unschedule.</p>
          </div>
          <div class="sp-out">
            <div class="tiles">
              <div class="tile"><p class="tile-k">Weeks the market noticed</p><p class="tile-v" data-ref="weeks"></p></div>
              <div class="tile"><p class="tile-k">Moves scheduled</p><p class="tile-v" data-ref="moves"></p></div>
            </div>
            <div class="chart-box">
              <p class="chart-t">Market attention, by week</p>
              <div class="chart-wrap" data-ref="chart"></div>
            </div>
            <p class="happened-t sp-note" data-ref="note" aria-live="polite"></p>
            <p class="fin-foot">${esc(block.foot)}</p>
          </div>
        </div>
      </section>`;
    },

    mount(root, block) {
      const ref = (n) => root.querySelector(`[data-ref="${n}"]`);
      const presetPlan = (id) => (id === "clear" ? block.moves.map(() => null) : block.presets[id].plan.map((w) => (w == null ? null : w - 1)));
      let plan = presetPlan(block.start);
      let active = block.start;

      function render() {
        root.querySelectorAll(".sp-cell").forEach((c) => {
          const on = plan[Number(c.dataset.move)] === Number(c.dataset.week);
          c.classList.toggle("is-on", on);
          c.setAttribute("aria-pressed", String(on));
        });
        root.querySelectorAll("[data-preset]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.preset === active)));
        const series = simulate(block.weeks, plan);
        const noticed = series.filter((p) => p.a >= block.threshold).length;
        const scheduled = plan.filter((w) => w != null).length;
        ref("weeks").textContent = `${noticed} of ${block.weeks}`;
        ref("moves").textContent = `${scheduled} of ${block.moves.length}`;
        ref("chart").innerHTML = chartSVG(series, block.threshold, ref("chart").clientWidth || 520);
        const busiest = Math.max(0, ...series.map((p) => p.h));
        let note;
        if (!scheduled) note = "Nothing scheduled yet. Pick a preset or tap a week for each move.";
        else if (!noticed) note = busiest > 1 ? "Moves are bunched a little, but not enough. Each one fades before the next builds on it." : "Each move lands on its own and fades before the next one arrives. The market never notices.";
        else {
          const last = series.map((p, i) => (p.a >= block.threshold ? i : -1)).filter((i) => i >= 0).pop();
          note = `The market noticed for ${noticed} ${noticed === 1 ? "week" : "weeks"}, through week ${last + 1}.`;
          note += last < block.weeks - 1 ? " After that, attention fades unless something keeps it going." : "";
        }
        ref("note").textContent = note;
      }

      root.addEventListener("click", (e) => {
        const cell = e.target.closest(".sp-cell");
        const preset = e.target.closest("[data-preset]");
        if (cell) {
          const i = Number(cell.dataset.move);
          const w = Number(cell.dataset.week);
          plan[i] = plan[i] === w ? null : w;
          active = null;
        } else if (preset) {
          plan = presetPlan(preset.dataset.preset);
          active = preset.dataset.preset === "clear" ? null : preset.dataset.preset;
        } else return;
        render();
      });

      let timer = 0;
      const onResize = () => {
        clearTimeout(timer);
        timer = setTimeout(render, 120);
      };
      window.addEventListener("resize", onResize);
      render();
      return () => window.removeEventListener("resize", onResize);
    }
  };
})();
