// Queue: a nonlinear relationship. One desk closes `capacity` requests an hour on average;
// requests arrive at random. Average time from arrival to done (a single-server queue):
//   minutes = 60 ÷ (capacity − requests per hour)
// A straight line through two quiet-hour points shows what a linear guess predicts.
(function () {
  "use strict";
  const { esc } = window.Marginalia.util;

  const fmt = (v) => (v < 10 ? v.toFixed(1) : Math.round(v).toLocaleString("en-US"));

  window.Marginalia.blocks.queue = {
    render(block, ctx) {
      return `<section class="qu" aria-labelledby="${ctx.uid}-h">
        <div class="spot-head">
          <p class="eyebrow">Simulator</p>
          <h2 class="h2" id="${ctx.uid}-h">${esc(block.title)}</h2>
          <p class="section-dek">${esc(block.intro)}</p>
        </div>
        <div class="jc-presets" role="group" aria-label="Experiments">
          <span class="examples-k">Try</span>
          ${block.presets.map((p) => `<button type="button" class="pill" data-preset="${esc(String(p.value))}">${esc(p.label)}</button>`).join("")}
        </div>
        <div class="bt-grid">
          <div class="bt-left">
            <div class="levers">
              <div class="lever">
                <label class="lever-label" for="${ctx.uid}-rate">
                  <span class="lever-t">${esc(block.rateLabel)}</span>
                  <span class="lever-v tnum" data-ref="val"></span>
                </label>
                <input type="range" id="${ctx.uid}-rate" data-ref="input" min="${block.min}" max="${block.max}" step="${block.step}">
                <p class="lever-hint">${esc(block.rateHint)}</p>
              </div>
            </div>
            <div class="tiles tiles-3">
              <div class="tile"><p class="tile-k">Busy</p><p class="tile-v" data-ref="busy"></p><p class="tile-sub">of capacity</p></div>
              <div class="tile"><p class="tile-k">Actual</p><p class="tile-v" data-ref="actual"></p><p class="tile-sub">minutes a request</p></div>
              <div class="tile"><p class="tile-k">Straight line</p><p class="tile-v" data-ref="guess"></p><p class="tile-sub">minutes, if it were linear</p></div>
            </div>
          </div>
          <div class="bt-right">
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
      const cap = block.capacity;
      const minutes = (r) => 60 / (cap - r);
      const [a, b] = block.quiet;
      const slope = (minutes(b) - minutes(a)) / (b - a);
      const guess = (r) => minutes(b) + (r - b) * slope;
      let rate = block.start;

      function chartSVG() {
        const box = ref("chart");
        const W = Math.max(260, box.clientWidth || 480);
        const H = 230;
        const m = { t: 14, r: 14, b: 30, l: 40 };
        const w = W - m.l - m.r;
        const h = H - m.t - m.b;
        const top = block.yMax;
        const x = (r) => m.l + (r / cap) * w;
        const y = (v) => m.t + h - (Math.min(v, top) / top) * h;
        let grid = "";
        for (let v = 0; v <= top; v += top / 4) {
          grid += `<line class="ch-grid" x1="${m.l}" x2="${m.l + w}" y1="${y(v).toFixed(1)}" y2="${y(v).toFixed(1)}"/>
            <text class="ch-tick" x="${m.l - 6}" y="${(y(v) + 3.5).toFixed(1)}" text-anchor="end">${v}</text>`;
        }
        // The last tick names the capacity; the curve fills the space beside the line itself.
        for (let r = 0; r < cap; r += cap / 4) {
          grid += `<text class="ch-tick" x="${x(r).toFixed(1)}" y="${H - 12}" text-anchor="middle">${r}</text>`;
        }
        grid += `<text class="ch-tick" x="${x(cap).toFixed(1)}" y="${H - 12}" text-anchor="end">Capacity</text>`;
        // The curve stops where it leaves the chart.
        const pts = [];
        for (let r = 0; r < cap; r += 0.05) {
          pts.push(`${x(r).toFixed(1)},${y(minutes(r)).toFixed(1)}`);
          if (minutes(r) >= top) break;
        }
        const now = minutes(rate);
        return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(block.caption)} At ${rate} an hour a request takes ${fmt(now)} minutes; a straight line predicts ${fmt(guess(rate))}.">
          ${grid}
          <line class="inv-rise" x1="${x(cap).toFixed(1)}" x2="${x(cap).toFixed(1)}" y1="${m.t}" y2="${m.t + h}"/>
          <line class="bt-line" x1="${m.l + 12}" x2="${m.l + 32}" y1="${m.t + 8}" y2="${m.t + 8}"/>
          <text class="ch-tick" x="${m.l + 38}" y="${m.t + 11.5}">Actual</text>
          <line class="ls-goal" x1="${m.l + 12}" x2="${m.l + 32}" y1="${m.t + 24}" y2="${m.t + 24}"/>
          <text class="ch-tick" x="${m.l + 38}" y="${m.t + 27.5}">Straight line</text>
          <line class="ls-goal" x1="${x(0).toFixed(1)}" x2="${x(cap).toFixed(1)}" y1="${y(guess(0)).toFixed(1)}" y2="${y(guess(cap)).toFixed(1)}"/>
          <polyline class="bt-line" points="${pts.join(" ")}"/>
          <circle class="qu-guess" cx="${x(rate).toFixed(1)}" cy="${y(guess(rate)).toFixed(1)}" r="4"/>
          ${now <= top ? `<circle class="bt-dot" cx="${x(rate).toFixed(1)}" cy="${y(now).toFixed(1)}" r="4.5"/>` : ""}
        </svg>`;
      }

      function describe() {
        const now = minutes(rate);
        const busy = Math.round((100 * rate) / cap);
        const next = rate + 1 < cap ? `One more request an hour would make it ${fmt(minutes(rate + 1))}.` : `One more request an hour and the desk would be at capacity, with the queue growing without limit.`;
        const ratio = now / guess(rate);
        return `At ${busy}% busy, a request takes ${fmt(now)} minutes from arrival to done, against ${fmt(guess(rate))} on the straight line. ${
          ratio < 1.15 ? "Here the straight line is a fair guess." : `That's ${ratio.toFixed(1).replace(/\.0$/, "")} times what the straight line predicts.`
        } ${next}`;
      }

      function update() {
        ref("input").value = rate;
        ref("val").textContent = `${rate} an hour`;
        ref("busy").textContent = `${Math.round((100 * rate) / cap)}%`;
        ref("actual").textContent = fmt(minutes(rate));
        ref("guess").textContent = fmt(guess(rate));
        ref("chart").innerHTML = chartSVG();
        ref("note").textContent = describe();
        root.querySelectorAll("[data-preset]").forEach((p) => p.setAttribute("aria-pressed", String(Number(p.dataset.preset) === rate)));
      }

      root.addEventListener("input", (e) => {
        if (!e.target.closest('[data-ref="input"]')) return;
        rate = Number(e.target.value);
        update();
      });
      root.addEventListener("click", (e) => {
        const btn = e.target.closest("[data-preset]");
        if (!btn) return;
        rate = Number(btn.dataset.preset);
        update();
      });
      const onResize = () => update();
      window.addEventListener("resize", onResize);
      update();
      return () => window.removeEventListener("resize", onResize);
    }
  };
})();
