// Working capital levers: days sales outstanding, days in inventory and days payable,
// turned into a cash conversion cycle and the cash it ties up.
//   receivables = revenue / 365 × DSO
//   inventory   = cost of goods sold / 365 × DIO
//   payables    = cost of goods sold / 365 × DPO
//   cash cycle  = DIO + DSO − DPO
(function () {
  "use strict";
  const { esc } = window.Marginalia.util;

  const dollars = (v) => (v < 0 ? "−$" : "$") + Math.abs(Math.round(v)).toLocaleString("en-US");
  const signedDollars = (v) => (Math.round(v) > 0 ? "+" : "") + dollars(v);
  const signedDays = (v) => (v > 0 ? "+" : v < 0 ? "−" : "±") + Math.abs(v);

  function compute(block, d) {
    const perDaySales = block.revenue / 365;
    const perDayCost = block.cogs / 365;
    const ar = perDaySales * d.dso;
    const inv = perDayCost * d.dio;
    const ap = perDayCost * d.dpo;
    return { ar, inv, ap, tied: ar + inv - ap, ccc: d.dio + d.dso - d.dpo, perDaySales, perDayCost };
  }

  function cycleSVG(d, width) {
    const H = 150;
    const m = { l: 12, r: 12, t: 10 };
    const w = Math.max(260, width) - m.l - m.r;
    const span = Math.max(d.dio + d.dso, d.dpo) + 10;
    const x = (days) => m.l + (days / span) * w;
    const bar = (y, from, to, cls, label) => {
      const bw = Math.max(0, x(to) - x(from));
      const text = bw > 120 ? label : bw > 40 ? `${to - from}d` : "";
      return `<rect class="cy-bar ${cls}" x="${x(from).toFixed(1)}" y="${y}" width="${bw.toFixed(1)}" height="22" rx="3"/>
        ${text ? `<text class="cy-in" x="${(x(from) + 8).toFixed(1)}" y="${y + 15}">${text}</text>` : ""}`;
    };
    const ccc = d.dio + d.dso - d.dpo;
    const gapFrom = Math.min(d.dpo, d.dio + d.dso);
    const gapTo = d.dio + d.dso;
    let ticks = "";
    const step = span > 150 ? 30 : 15;
    for (let t = 0; t <= span; t += step) {
      ticks += `<line class="cy-tick" x1="${x(t).toFixed(1)}" x2="${x(t).toFixed(1)}" y1="${m.t}" y2="${H - 22}"/>
        <text class="cy-tick-t" x="${x(t).toFixed(1)}" y="${H - 8}" text-anchor="${t === 0 ? "start" : "middle"}">${t === 0 ? "Day 0" : t}</text>`;
    }
    return `<svg class="cycle" width="${m.l + w + m.r}" height="${H}" viewBox="0 0 ${m.l + w + m.r} ${H}" role="img"
        aria-label="Inventory for ${d.dio} days, then receivables for ${d.dso} days; suppliers paid on day ${d.dpo}; cash conversion cycle ${ccc} days">
      ${ticks}
      ${bar(m.t, 0, d.dio, "cy-inv", `Inventory · ${d.dio} days`)}
      ${bar(m.t + 30, d.dio, d.dio + d.dso, "cy-ar", `Receivables · ${d.dso} days`)}
      ${bar(m.t + 60, 0, d.dpo, "cy-ap", `Payables · ${d.dpo} days`)}
      ${ccc > 0 ? `<rect class="cy-gap" x="${x(gapFrom).toFixed(1)}" y="${m.t + 90}" width="${(x(gapTo) - x(gapFrom)).toFixed(1)}" height="16" rx="3"/>
        <text class="cy-gap-t" x="${((x(gapFrom) + x(gapTo)) / 2).toFixed(1)}" y="${m.t + 102}" text-anchor="middle">${x(gapTo) - x(gapFrom) > 150 ? `Cash gap · ${ccc} days` : `${ccc}d`}</text>` : ""}
    </svg>`;
  }

  window.Marginalia.blocks["wc-levers"] = {
    render(block, ctx) {
      const slider = (key, label, hint) => {
        const r = block.ranges[key];
        return `<div class="lever">
          <label class="lever-label" for="${ctx.uid}-${key}">
            <span class="lever-t">${esc(label)}</span>
            <span class="lever-v tnum" data-val="${key}"></span>
          </label>
          <input type="range" id="${ctx.uid}-${key}" data-key="${key}" min="${r[0]}" max="${r[1]}" step="1">
          <p class="lever-hint">${esc(hint)} <span class="lever-today" data-today="${key}"></span></p>
        </div>`;
      };
      return `<section class="wc" aria-labelledby="${ctx.uid}-h">
        <div class="spot-head">
          <p class="eyebrow">${esc(block.company)}</p>
          <h2 class="h2" id="${ctx.uid}-h">${esc(block.title)}</h2>
          <p class="section-dek">${esc(block.intro)}</p>
        </div>
        <div class="wc-grid">
          <div class="levers">
            ${slider("dso", "Days sales outstanding", "How long customers take to pay.")}
            ${slider("dio", "Days in inventory", "How long stock sits before it's sold.")}
            ${slider("dpo", "Days payable outstanding", "How long you take to pay suppliers.")}
            <div class="log-actions"><button type="button" class="pill" data-ref="reset">Back to today</button></div>
          </div>
          <div class="wc-out">
            <div class="tiles tiles-3">
              <div class="tile"><p class="tile-k">Cash conversion cycle</p><p class="tile-v" data-ref="ccc"></p><p class="tile-sub" data-ref="ccc-sub"></p></div>
              <div class="tile"><p class="tile-k">Cash tied up</p><p class="tile-v" data-ref="tied"></p><p class="tile-sub">Receivables + inventory − payables</p></div>
              <div class="tile"><p class="tile-k">Cash freed vs. today</p><p class="tile-v" data-ref="freed"></p><p class="tile-sub" data-ref="freed-sub"></p></div>
            </div>
            <div class="chart-box">
              <p class="chart-t">One dollar's trip through the business</p>
              <div class="chart-wrap" data-ref="cycle"></div>
              <p class="cy-key">Suppliers are paid on the day the payables bar ends. Until a customer pays, the gap is financed with your own cash.</p>
            </div>
            <p class="wc-rule" data-ref="rule"></p>
          </div>
        </div>
        <div class="fin-dock">
          <p>Cycle <span data-ref="dock-ccc"></span></p>
          <p>Cash freed <span data-ref="dock-freed"></span></p>
        </div>
      </section>`;
    },

    mount(root, block) {
      const ref = (n) => root.querySelector(`[data-ref="${n}"]`);
      const inputs = Array.from(root.querySelectorAll("input[data-key]"));
      let d = { ...block.base };
      const today = compute(block, block.base);

      function render() {
        const now = compute(block, d);
        inputs.forEach((inp) => {
          inp.value = d[inp.dataset.key];
          root.querySelector(`[data-val="${inp.dataset.key}"]`).textContent = `${d[inp.dataset.key]} days`;
          const delta = d[inp.dataset.key] - block.base[inp.dataset.key];
          root.querySelector(`[data-today="${inp.dataset.key}"]`).textContent = delta ? `Today: ${block.base[inp.dataset.key]} (${signedDays(delta)}).` : "";
        });
        ref("ccc").textContent = `${now.ccc} days`;
        ref("ccc-sub").textContent = now.ccc === today.ccc ? "Today's cycle" : `${signedDays(now.ccc - today.ccc)} days vs. today`;
        ref("tied").textContent = dollars(now.tied);
        const freed = today.tied - now.tied;
        ref("freed").textContent = signedDollars(freed);
        ref("freed").classList.toggle("is-neg", freed < 0);
        ref("dock-ccc").textContent = `${now.ccc} days`;
        ref("dock-freed").textContent = signedDollars(freed);
        ref("dock-freed").classList.toggle("is-neg", freed < 0);
        ref("freed-sub").textContent = freed > 0 ? "Cash back in the bank, with no change in profit." : freed < 0 ? "More cash tied up, with no change in profit." : "Move a slider to see the effect.";
        ref("cycle").innerHTML = cycleSVG(d, ref("cycle").clientWidth || 520);
        ref("rule").innerHTML = `Rules of thumb at this size: one day of receivables is worth <strong>${dollars(now.perDaySales)}</strong>; one day of inventory or payables is worth <strong>${dollars(now.perDayCost)}</strong>.`;
      }

      inputs.forEach((inp) =>
        inp.addEventListener("input", () => {
          d[inp.dataset.key] = Number(inp.value);
          render();
        })
      );
      ref("reset").addEventListener("click", () => {
        d = { ...block.base };
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
