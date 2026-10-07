// Ratio reader: two years of one company's statements, the main ratios from each
// family, and a detail panel that shows each formula with the real numbers in it.
(function () {
  "use strict";
  const { esc } = window.Marginalia.util;

  const k = (v) => "$" + Math.round(v).toLocaleString("en-US") + "k";

  // Each ratio: how to compute it, how to show it, and which direction is healthier.
  const RATIOS = [
    { id: "gm", family: "Profitability", name: "Gross margin", unit: "pct", better: "higher",
      formula: ["Gross profit", "Revenue"], parts: (s) => [s.revenue - s.cogs, s.revenue],
      tells: "How much of each sales dollar is left after the direct cost of the product." },
    { id: "om", family: "Profitability", name: "Operating margin", unit: "pct", better: "higher",
      formula: ["Operating profit", "Revenue"], parts: (s) => [s.revenue - s.cogs - s.opex, s.revenue],
      tells: "What the business earns from operations, before interest and taxes." },
    { id: "nm", family: "Profitability", name: "Net margin", unit: "pct", better: "higher",
      formula: ["Net income", "Revenue"], parts: (s) => [ni(s), s.revenue],
      tells: "The bottom line as a share of sales, after everything." },
    { id: "roa", family: "Profitability", name: "Return on assets", unit: "pct", better: "higher",
      formula: ["Net income", "Total assets"], parts: (s) => [ni(s), assets(s)],
      tells: "How much profit the company makes on everything it owns." },
    { id: "roe", family: "Profitability", name: "Return on equity", unit: "pct", better: "higher",
      formula: ["Net income", "Owners' equity"], parts: (s) => [ni(s), s.equity],
      tells: "The return on the owners' money. Debt can push it up, so read it alongside leverage." },
    { id: "de", family: "Leverage", name: "Debt to equity", unit: "x2", better: "lower",
      formula: ["Total debt", "Owners' equity"], parts: (s) => [s.stDebt + s.ltDebt, s.equity],
      tells: "How much of the business is financed by lenders rather than owners." },
    { id: "ic", family: "Leverage", name: "Interest coverage", unit: "x1", better: "higher",
      formula: ["Operating profit", "Interest expense"], parts: (s) => [s.revenue - s.cogs - s.opex, s.interest],
      tells: "How many times over operating profit covers the interest bill." },
    { id: "cr", family: "Liquidity", name: "Current ratio", unit: "x2", better: "higher",
      formula: ["Current assets", "Current liabilities"], parts: (s) => [s.cash + s.ar + s.inv, s.ap + s.stDebt],
      tells: "Whether assets that turn into cash within a year cover bills due within a year." },
    { id: "qr", family: "Liquidity", name: "Quick ratio", unit: "x2", better: "higher",
      formula: ["Current assets − inventory", "Current liabilities"], parts: (s) => [s.cash + s.ar, s.ap + s.stDebt],
      tells: "The same test without inventory, which can be slow to turn into cash." },
    { id: "dso", family: "Efficiency", name: "Days sales outstanding", unit: "days", better: "lower",
      formula: ["Receivables", "Revenue ÷ 365"], parts: (s) => [s.ar, s.revenue / 365],
      tells: "How long customers take to pay, on average." },
    { id: "dio", family: "Efficiency", name: "Days in inventory", unit: "days", better: "lower",
      formula: ["Inventory", "Cost of goods sold ÷ 365"], parts: (s) => [s.inv, s.cogs / 365],
      tells: "How long stock sits before it's sold." },
    { id: "dpo", family: "Efficiency", name: "Days payable outstanding", unit: "days", better: "higher",
      formula: ["Payables", "Cost of goods sold ÷ 365"], parts: (s) => [s.ap, s.cogs / 365],
      tells: "How long the company takes to pay suppliers. Longer helps cash, up to a point." },
    { id: "at", family: "Efficiency", name: "Asset turnover", unit: "x2", better: "higher",
      formula: ["Revenue", "Total assets"], parts: (s) => [s.revenue, assets(s)],
      tells: "How many dollars of sales each dollar of assets produces." }
  ];

  function ni(s) {
    const ebt = s.revenue - s.cogs - s.opex - s.interest;
    return ebt - s.tax;
  }
  function assets(s) {
    return s.cash + s.ar + s.inv + s.ppe;
  }

  function value(r, s) {
    const [a, b] = r.parts(s);
    return r.unit === "pct" ? (a / b) * 100 : a / b;
  }
  function show(r, v) {
    if (r.unit === "pct") return v.toFixed(1) + "%";
    if (r.unit === "days") return Math.round(v) + " days";
    return v.toFixed(r.unit === "x1" ? 1 : 2) + "×";
  }

  window.Marginalia.blocks.ratios = {
    render(block, ctx) {
      const [y1, y2] = block.years;
      const families = [...new Set(RATIOS.map((r) => r.family))];
      return `<section class="ratios" aria-labelledby="${ctx.uid}-h">
        <div class="spot-head">
          <p class="eyebrow">${esc(block.company)}</p>
          <h2 class="h2" id="${ctx.uid}-h">${esc(block.title)}</h2>
          <p class="section-dek">${esc(block.intro)}</p>
        </div>
        <div class="tiles tiles-3" data-ref="headline"></div>
        <div class="ratios-grid">
          <div class="ratio-table-wrap">
            <table class="ratio-table">
              <thead><tr><th scope="col">Ratio</th><th scope="col">${esc(y1.label)}</th><th scope="col">${esc(y2.label)}</th><th scope="col"><span class="visually-hidden">Change</span></th></tr></thead>
              ${families
                .map(
                  (fam) => `<tbody>
                    <tr class="rt-family"><th colspan="4" scope="rowgroup">${esc(fam)}</th></tr>
                    ${RATIOS.filter((r) => r.family === fam)
                      .map((r) => {
                        const a = value(r, y1.s);
                        const b = value(r, y2.s);
                        const up = b > a;
                        const flat = Math.abs(b - a) < Math.abs(a) * 0.005;
                        const good = flat ? null : (r.better === "higher") === up;
                        const dir = flat ? "flat" : good ? "better" : "worse";
                        return `<tr class="rt-row" data-ratio="${r.id}" tabindex="0">
                          <th scope="row">${esc(r.name)}</th>
                          <td>${show(r, a)}</td>
                          <td>${show(r, b)}</td>
                          <td class="rt-dir is-${dir}"><span aria-hidden="true">${flat ? "→" : up ? "▲" : "▼"}</span> ${dir === "flat" ? "Steady" : dir === "better" ? "Better" : "Worse"}</td>
                        </tr>`;
                      })
                      .join("")}
                  </tbody>`
                )
                .join("")}
            </table>
          </div>
          <aside class="ratio-detail" data-ref="detail" aria-live="polite"></aside>
        </div>
      </section>`;
    },

    mount(root, block) {
      const ref = (n) => root.querySelector(`[data-ref="${n}"]`);
      const [y1, y2] = block.years;
      const pctChange = (a, b) => ((b - a) / Math.abs(a)) * 100;
      const sign = (v) => (v > 0 ? "+" : v < 0 ? "−" : "") + Math.abs(Math.round(v)) + "%";

      ref("headline").innerHTML = [
        ["Revenue", y1.s.revenue, y2.s.revenue],
        ["Net income", ni(y1.s), ni(y2.s)],
        ["Cash", y1.s.cash, y2.s.cash]
      ]
        .map(
          ([label, a, b]) => `<div class="tile">
            <p class="tile-k">${label}</p>
            <p class="tile-v${b < a ? " is-neg" : ""}">${sign(pctChange(a, b))}</p>
            <p class="tile-sub">${k(a)} → ${k(b)}</p>
          </div>`
        )
        .join("");

      function select(id) {
        const r = RATIOS.find((x) => x.id === id);
        root.querySelectorAll(".rt-row").forEach((row) => row.classList.toggle("is-selected", row.dataset.ratio === id));
        const line = (y) => {
          const [a, b] = r.parts(y.s);
          const fmtPart = (v, i) => (r.unit === "days" && i === 1 ? k(v) + " a day" : k(v));
          return `<div class="rd-year">
            <p class="rd-y">${esc(y.label)}</p>
            <p class="rd-calc"><span>${fmtPart(a, 0)}</span><span class="rd-over">÷</span><span>${fmtPart(b, 1)}</span><span class="rd-eq">=</span><strong>${show(r, value(r, y.s))}</strong></p>
          </div>`;
        };
        ref("detail").innerHTML = `
          <p class="eyebrow">${esc(r.family)}</p>
          <h3 class="rd-t">${esc(r.name)}</h3>
          <p class="rd-formula"><span>${esc(r.formula[0])}</span><span class="rd-rule"></span><span>${esc(r.formula[1])}</span></p>
          ${line(y1)}${line(y2)}
          <p class="rd-tells">${esc(r.tells)}</p>
          ${block.notes[r.id] ? `<p class="rd-note"><span>At ${esc(block.company)}</span>${esc(block.notes[r.id])}</p>` : ""}`;
      }

      root.querySelector(".ratio-table").addEventListener("click", (e) => {
        const row = e.target.closest("[data-ratio]");
        if (row) select(row.dataset.ratio);
      });
      root.querySelector(".ratio-table").addEventListener("keydown", (e) => {
        const row = e.target.closest("[data-ratio]");
        if (row && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          select(row.dataset.ratio);
        }
      });
      select(block.startRatio);
    }
  };
})();
