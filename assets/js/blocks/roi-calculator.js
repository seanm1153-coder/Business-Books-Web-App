// ROI calculator: one up-front cost and an even stream of annual savings, judged three ways.
//   present value of year t  = savings ÷ (1 + rate)^t
//   net present value        = −cost + Σ present values
//   payback                  = cost ÷ savings (years, undiscounted)
//   internal rate of return  = the rate at which NPV is zero (found by bisection)
(function () {
  "use strict";
  const { esc } = window.Marginalia.util;

  const dollars = (v) => (v < 0 ? "−$" : "$") + Math.round(Math.abs(v)).toLocaleString("en-US");
  const kfmt = (v) => (v < 0 ? "−" : "") + "$" + Math.round(Math.abs(v) / 1000) + "k";

  function npv(cost, savings, years, rate) {
    let v = -cost;
    for (let t = 1; t <= years; t++) v += savings / Math.pow(1 + rate, t);
    return v;
  }

  function irr(cost, savings, years) {
    if (savings * years <= cost) return null; // never pays back, even at 0%
    let lo = 0;
    let hi = 1;
    while (npv(cost, savings, years, hi) > 0 && hi < 100) hi *= 2;
    for (let i = 0; i < 80; i++) {
      const mid = (lo + hi) / 2;
      if (npv(cost, savings, years, mid) > 0) lo = mid;
      else hi = mid;
    }
    return (lo + hi) / 2;
  }

  function chartSVG(cost, savings, years, rate, width) {
    const H = 230;
    const m = { t: 16, r: 16, b: 30, l: 56 };
    const w = Math.max(280, width) - m.l - m.r;
    const h = H - m.t - m.b;
    const pts = [];
    let cum = -cost;
    pts.push({ t: 0, nominal: -cost, pv: -cost, cum });
    for (let t = 1; t <= years; t++) {
      const pv = savings / Math.pow(1 + rate, t);
      cum += pv;
      pts.push({ t, nominal: savings, pv, cum });
    }
    const vals = pts.flatMap((p) => [p.nominal, p.pv, p.cum]).concat(0);
    const lo = Math.min(...vals) * 1.1;
    const hi = Math.max(...vals) * 1.15;
    const y = (v) => m.t + h - ((v - lo) / (hi - lo)) * h;
    const bw = w / pts.length;
    const x = (i) => m.l + i * bw + bw / 2;
    const step = Math.pow(10, Math.floor(Math.log10((hi - lo) / 4)));
    const tick = (hi - lo) / 4 > step * 5 ? step * 5 : (hi - lo) / 4 > step * 2 ? step * 2 : step;
    let grid = "";
    for (let v = Math.ceil(lo / tick) * tick; v <= hi; v += tick) {
      grid += `<line class="ch-grid${Math.abs(v) < 1e-6 ? " is-zero" : ""}" x1="${m.l}" x2="${m.l + w}" y1="${y(v).toFixed(1)}" y2="${y(v).toFixed(1)}"/>
        <text class="ch-tick" x="${m.l - 8}" y="${(y(v) + 3.5).toFixed(1)}" text-anchor="end">${kfmt(v)}</text>`;
    }
    const bars = pts
      .map((p, i) => {
        const x0 = x(i) - bw * 0.3;
        const bwid = bw * 0.6;
        const rect = (v, cls) => {
          const y0 = Math.min(y(0), y(v));
          return `<rect class="${cls}" x="${x0.toFixed(1)}" y="${y0.toFixed(1)}" width="${bwid.toFixed(1)}" height="${Math.max(1, Math.abs(y(v) - y(0))).toFixed(1)}" rx="3"/>`;
        };
        return `<g><title>${p.t === 0 ? `Today: cost ${dollars(cost)}` : `Year ${p.t}: ${dollars(p.nominal)} saved, worth ${dollars(p.pv)} today`}</title>
          ${p.t === 0 ? rect(p.pv, "roi-cost") : rect(p.nominal, "roi-nominal") + rect(p.pv, "roi-pv")}
          <text class="ch-tick" x="${x(i).toFixed(1)}" y="${H - 10}" text-anchor="middle">${p.t === 0 ? "Today" : "Yr " + p.t}</text></g>`;
      })
      .join("");
    const line = pts.map((p, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(p.cum).toFixed(1)}`).join("");
    const dots = pts.map((p, i) => `<circle class="roi-dot" cx="${x(i).toFixed(1)}" cy="${y(p.cum).toFixed(1)}" r="4"/>`).join("");
    const last = pts[pts.length - 1];
    return `<svg class="roi-chart" width="${m.l + w + m.r}" height="${H}" viewBox="0 0 ${m.l + w + m.r} ${H}" role="img" aria-label="Cost today, each year's savings and what it is worth today, and the running total">
      ${grid}${bars}
      <path class="roi-line" d="${line}"/>${dots}
      <text class="roi-label" x="${(x(pts.length - 1) - 12).toFixed(1)}" y="${(y(last.cum) < m.t + 40 ? y(last.cum) + 20 : y(last.cum) - 12).toFixed(1)}" text-anchor="end">Running total ${kfmt(last.cum)}</text>
    </svg>`;
  }

  window.Marginalia.blocks["roi-calculator"] = {
    render(block, ctx) {
      const r = block.ranges;
      const slider = (key, label, min, max, step) => `<div class="lever">
          <label class="lever-label" for="${ctx.uid}-${key}">
            <span class="lever-t">${esc(label)}</span>
            <span class="lever-v tnum" data-val="${key}"></span>
          </label>
          <input type="range" id="${ctx.uid}-${key}" data-key="${key}" min="${min}" max="${max}" step="${step}">
        </div>`;
      return `<section class="roi" aria-labelledby="${ctx.uid}-h">
        <div class="spot-head">
          <p class="eyebrow">${esc(block.company)}</p>
          <h2 class="h2" id="${ctx.uid}-h">${esc(block.title)}</h2>
          <p class="section-dek">${esc(block.intro)}</p>
        </div>
        <div class="wc-grid">
          <div class="levers">
            <div class="roi-cost-line"><span>Cost today</span><strong class="tnum">${dollars(block.cost)}</strong></div>
            ${slider("savings", "Savings per year", r.savings[0], r.savings[1], r.savings[2])}
            ${slider("years", "Years it lasts", r.years[0], r.years[1], 1)}
            ${slider("rate", "Hurdle rate", r.rate[0], r.rate[1], 0.5)}
            <p class="lever-hint">The hurdle rate is the return the company needs from any project, usually set from its cost of capital.</p>
            <div class="log-actions"><button type="button" class="pill" data-ref="reset">Back to the estimate</button></div>
          </div>
          <div class="wc-out">
            <p class="roi-verdict" data-ref="verdict"></p>
            <div class="tiles tiles-3">
              <div class="tile"><p class="tile-k">Payback</p><p class="tile-v" data-ref="payback"></p><p class="tile-sub">How fast the cost comes back</p></div>
              <div class="tile"><p class="tile-k">Net present value</p><p class="tile-v" data-ref="npv"></p><p class="tile-sub">Value added, in today's dollars</p></div>
              <div class="tile"><p class="tile-k">Internal rate of return</p><p class="tile-v" data-ref="irr"></p><p class="tile-sub" data-ref="irr-sub"></p></div>
            </div>
            <div class="chart-box">
              <p class="chart-t">Each year's savings, and what they're worth today</p>
              <div class="chart-wrap" data-ref="chart"></div>
              <p class="roi-key"><span class="roi-sw roi-sw-nom"></span>Saved that year <span class="roi-sw roi-sw-pv"></span>Worth today <span class="roi-sw roi-sw-line"></span>Running total</p>
            </div>
          </div>
        </div>
      </section>`;
    },

    mount(root, block) {
      const ref = (n) => root.querySelector(`[data-ref="${n}"]`);
      const inputs = Array.from(root.querySelectorAll("input[data-key]"));
      let v = { ...block.start };

      function render() {
        inputs.forEach((inp) => {
          inp.value = v[inp.dataset.key];
          const k = inp.dataset.key;
          root.querySelector(`[data-val="${k}"]`).textContent =
            k === "savings" ? dollars(v.savings) : k === "years" ? `${v.years} years` : `${v.rate}%`;
        });
        const rate = v.rate / 100;
        const value = npv(block.cost, v.savings, v.years, rate);
        const r = irr(block.cost, v.savings, v.years);
        const payback = block.cost / v.savings;
        ref("payback").textContent = payback <= v.years ? `${payback.toFixed(1)} years` : "Never";
        ref("npv").textContent = dollars(value);
        ref("npv").classList.toggle("is-neg", value < 0);
        ref("irr").textContent = r === null ? "None" : `${(r * 100).toFixed(1)}%`;
        ref("irr-sub").textContent = r === null ? "The savings never cover the cost" : r * 100 >= v.rate ? `Above the ${v.rate}% hurdle` : `Below the ${v.rate}% hurdle`;
        ref("verdict").innerHTML =
          value >= 0
            ? `<strong>Worth doing at this hurdle rate.</strong> The savings, counted at today's value, beat the cost by ${dollars(value)}.`
            : `<strong>Not worth it at this hurdle rate.</strong> Counted at today's value, the savings fall ${dollars(-value)} short of the cost.`;
        ref("verdict").classList.toggle("is-neg", value < 0);
        ref("chart").innerHTML = chartSVG(block.cost, v.savings, v.years, rate, ref("chart").clientWidth || 520);
      }

      inputs.forEach((inp) =>
        inp.addEventListener("input", () => {
          v[inp.dataset.key] = Number(inp.value);
          render();
        })
      );
      ref("reset").addEventListener("click", () => {
        v = { ...block.start };
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
