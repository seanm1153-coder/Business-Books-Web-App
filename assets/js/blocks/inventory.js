// Delays: a dealer keeps a stock of goods equal to a set number of days of sales.
// Demand rises once; three delays decide what the stock does next.
//   perceived sales  = average of the last P days of sales          (perception delay)
//   orders           = perceived + (target − stock) ÷ R             (response delay)
//   deliveries       = the orders placed D days earlier             (delivery delay)
//   stock(t + 1)     = stock(t) + deliveries − sales
(function () {
  "use strict";
  const { esc } = window.Marginalia.util;

  function simulate(block, P, R, D) {
    const { base, rise, at, cover, days } = block;
    const sales = (t) => (t < at ? base : base * (1 + rise));
    const pipeline = Array(D).fill(base);
    const past = Array(P).fill(base);
    let stock = base * cover;
    const points = [];
    for (let t = 0; t <= days; t++) {
      points.push([t, stock]);
      const perceived = past.reduce((a, b) => a + b, 0) / P;
      const order = Math.max(0, perceived + (cover * perceived - stock) / R);
      pipeline.push(order);
      stock = Math.max(0, stock + pipeline.shift() - sales(t));
      past.push(sales(t));
      past.shift();
    }
    const after = points.filter(([t]) => t >= at).map(([, v]) => v);
    const late = points.filter(([t]) => t >= days - 20).map(([, v]) => v);
    return {
      points,
      max: Math.round(Math.max(...after)),
      min: Math.round(Math.min(...after)),
      late: Math.round(Math.max(...late) - Math.min(...late))
    };
  }

  window.Marginalia.blocks.inventory = {
    render(block, ctx) {
      const slider = (d) => `<div class="lever">
          <label class="lever-label" for="${ctx.uid}-${d.key}">
            <span class="lever-t">${esc(d.label)}</span>
            <span class="lever-v tnum" data-val="${d.key}"></span>
          </label>
          <input type="range" id="${ctx.uid}-${d.key}" data-delay="${d.key}" min="1" max="10" step="1">
          <p class="lever-hint">${esc(d.hint)}</p>
        </div>`;
      return `<section class="inv" aria-labelledby="${ctx.uid}-h">
        <div class="spot-head">
          <p class="eyebrow">Simulator</p>
          <h2 class="h2" id="${ctx.uid}-h">${esc(block.title)}</h2>
          <p class="section-dek">${esc(block.intro)}</p>
        </div>
        <div class="jc-presets" role="group" aria-label="Experiments">
          <span class="examples-k">Try</span>
          ${block.presets.map((p) => `<button type="button" class="pill" data-preset="${esc(p.id)}">${esc(p.label)}</button>`).join("")}
        </div>
        <div class="bt-grid">
          <div class="levers">${block.delays.map(slider).join("")}</div>
          <div class="bt-right">
            <div class="tiles tiles-3">
              <div class="tile"><p class="tile-k">Highest stock</p><p class="tile-v" data-ref="max"></p></div>
              <div class="tile"><p class="tile-k">Lowest stock</p><p class="tile-v" data-ref="min"></p></div>
              <div class="tile"><p class="tile-k">Swing, last 20 days</p><p class="tile-v" data-ref="late"></p></div>
            </div>
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
      </section>`;
    },

    mount(root, block) {
      const ref = (n) => root.querySelector(`[data-ref="${n}"]`);
      const start = block.presets[0].delays;
      const reference = simulate(block, start.P, start.R, start.D);
      let delays = { ...start };
      const unit = block.unit;

      function chartSVG(run) {
        const box = ref("chart");
        const W = Math.max(260, box.clientWidth || 480);
        const H = 210;
        const m = { t: 14, r: 14, b: 26, l: 46 };
        const w = W - m.l - m.r;
        const h = H - m.t - m.b;
        const hi = Math.max(...run.points.map(([, v]) => v), block.base * block.cover * (1 + block.rise));
        const span = hi || 1;
        const mag = Math.pow(10, Math.floor(Math.log10(span / 5)));
        const step = [1, 2, 2.5, 5, 10, 20].map((k) => k * mag).find((k) => Math.ceil(span / k - 1e-9) <= 5);
        const top = step * Math.ceil(span / step - 1e-9);
        const x = (t) => m.l + (t / block.days) * w;
        const y = (v) => m.t + h - (v / top) * h;
        let grid = "";
        for (let v = 0; v <= top + 1e-9; v += step) {
          grid += `<line class="ch-grid" x1="${m.l}" x2="${m.l + w}" y1="${y(v).toFixed(1)}" y2="${y(v).toFixed(1)}"/>
            <text class="ch-tick" x="${m.l - 6}" y="${(y(v) + 3.5).toFixed(1)}" text-anchor="end">${v}</text>`;
        }
        for (let t = 0; t <= block.days; t += 20) {
          grid += `<text class="ch-tick" x="${x(t).toFixed(1)}" y="${H - 8}" text-anchor="middle">${t}</text>`;
        }
        // The target steps up with demand, but only once sales are noticed: draw the final target.
        const target = block.base * block.cover * (1 + block.rise);
        const pts = run.points.map(([t, v]) => `${x(t).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
        return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(block.caption)} Between day ${block.at} and day ${block.days} it ranges from ${run.min} to ${run.max} ${unit}.">
          ${grid}
          <line class="inv-rise" x1="${x(block.at).toFixed(1)}" x2="${x(block.at).toFixed(1)}" y1="${m.t}" y2="${m.t + h}"/>
          <text class="ch-tick" x="${(x(block.at) + 5).toFixed(1)}" y="${m.t + 10}">Demand +${Math.round(block.rise * 100)}%</text>
          <line class="ls-goal" x1="${x(block.at).toFixed(1)}" x2="${m.l + w}" y1="${y(target).toFixed(1)}" y2="${y(target).toFixed(1)}"/>
          <line class="ls-goal" x1="${(m.l + w - 118).toFixed(1)}" x2="${(m.l + w - 98).toFixed(1)}" y1="${m.t + 6}" y2="${m.t + 6}"/>
          <text class="ch-tick" x="${m.l + w}" y="${m.t + 10}" text-anchor="end">New target, ${Math.round(target)}</text>
          <polyline class="bt-line" points="${pts}"/>
        </svg>`;
      }

      function describe(run) {
        const settled = run.late <= block.settleWithin;
        const same = delays.P === start.P && delays.R === start.R && delays.D === start.D;
        let text = settled
          ? `The stock overshoots to ${run.max} ${unit}, then settles near its new target within the 100 days.`
          : `The stock swings between ${run.min} and ${run.max} ${unit} and is still moving ${run.late} ${unit} from high to low in the last 20 days. It never settles.`;
        if (!same) {
          const ratio = run.late / Math.max(1, reference.late);
          text +=
            ratio > 1.15
              ? ` That's worse than with Meadows's settings, where the late swing was ${reference.late}.`
              : ratio < 0.85
                ? ` That's calmer than with Meadows's settings, where the late swing was ${reference.late}.`
                : ` That's about the same as with Meadows's settings.`;
        }
        return text;
      }

      function update() {
        block.delays.forEach((d) => {
          root.querySelector(`[data-delay="${d.key}"]`).value = delays[d.key];
          root.querySelector(`[data-val="${d.key}"]`).textContent = `${delays[d.key]} ${delays[d.key] === 1 ? "day" : "days"}`;
        });
        const run = simulate(block, delays.P, delays.R, delays.D);
        ref("max").textContent = run.max;
        ref("min").textContent = run.min;
        ref("late").textContent = run.late;
        ref("chart").innerHTML = chartSVG(run);
        ref("note").textContent = describe(run);
      }

      root.addEventListener("input", (e) => {
        const input = e.target.closest("[data-delay]");
        if (!input) return;
        delays[input.dataset.delay] = Number(input.value);
        update();
      });
      root.addEventListener("click", (e) => {
        const btn = e.target.closest("[data-preset]");
        if (!btn) return;
        delays = { ...block.presets.find((p) => p.id === btn.dataset.preset).delays };
        update();
      });
      const onResize = () => update();
      window.addEventListener("resize", onResize);
      update();
      return () => window.removeEventListener("resize", onResize);
    }
  };
})();
