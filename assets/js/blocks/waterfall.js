// Waterfall: a running total built step by step, for income statements and cash bridges.
// Each step is a horizontal bar: a total runs from zero to the running total; a change
// floats from the running total before it. Several waterfalls can sit side by side on one
// scale, to compare two versions of the same account.
// Block: { title, intro?, charts: [{ t?, steps: [{ label, v } | { label, total: true }] }],
//   k? (show thousands, "$240k"; a number keeps that many decimals, "$142.5k"),
//   keys?: [adds, takes away, total], caption? }.
(function () {
  "use strict";
  const { esc, figHead, resolveLinks } = window.Marginalia.util;

  // Each step with where its bar starts and ends.
  function walk(steps) {
    let run = 0;
    return steps.map((s) => {
      if (s.total) return { ...s, from: 0, to: run, kind: "total" };
      const from = run;
      run += s.v;
      return { ...s, from, to: run, kind: s.v >= 0 ? "add" : "take" };
    });
  }

  window.Marginalia.blocks.waterfall = {
    render(block, ctx) {
      const charts = block.charts.map((c) => ({ ...c, rows: walk(c.steps) }));
      const ends = charts.flatMap((c) => c.rows.flatMap((r) => [r.from, r.to]));
      const lo = Math.min(0, ...ends);
      const hi = Math.max(0, ...ends);
      const x = (v) => ((v - lo) / (hi - lo || 1)) * 100;
      const money = (v, sign) => {
        const a = Math.abs(v);
        const n = block.k
          ? `${(a / 1000).toLocaleString("en-US", { maximumFractionDigits: block.k === true ? 0 : block.k })}k`
          : Math.round(a).toLocaleString("en-US");
        return `${v < 0 ? "−" : sign && v > 0 ? "+" : ""}$${n}`;
      };
      const keys = block.keys || ["Adds", "Takes away", "Total"];
      const chart = (c) => `<figure class="wf-chart">
          ${c.t ? `<figcaption class="wf-t">${esc(c.t)}</figcaption>` : ""}
          <div class="wf-rows">
            ${lo < 0 ? `<span class="wf-zero" style="--x: ${(x(0) / 100).toFixed(4)}" aria-hidden="true"></span>` : ""}
            ${c.rows
              .map((r) => {
                const a = x(Math.min(r.from, r.to));
                const w = Math.max(0.4, Math.abs(x(r.to) - x(r.from)));
                return `<div class="wf-row is-${r.kind}">
                  <span class="wf-l">${esc(r.label)}</span>
                  <span class="wf-track" aria-hidden="true"><span class="wf-bar" style="left: ${a.toFixed(2)}%; width: ${w.toFixed(2)}%"></span></span>
                  <span class="wf-v tnum">${money(r.kind === "total" ? r.to : r.v, r.kind !== "total" && r.from !== 0)}</span>
                </div>`;
              })
              .join("")}
          </div>
        </figure>`;
      return `<section class="wf" aria-labelledby="${ctx.uid}-h">
        ${figHead(block, ctx)}
        <p class="wf-key" aria-hidden="true"><span><i class="wf-sw is-add"></i>${esc(keys[0])}</span><span><i class="wf-sw is-take"></i>${esc(keys[1])}</span><span><i class="wf-sw is-total"></i>${esc(keys[2])}</span></p>
        <div class="wf-grid" style="--cols: ${charts.length}">${charts.map(chart).join("")}</div>
        ${block.caption ? `<p class="fig-foot">${resolveLinks(block.caption, ctx)}</p>` : ""}
      </section>`;
    }
  };
})();
