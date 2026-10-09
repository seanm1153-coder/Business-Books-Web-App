// Buffer: what resilience costs and what it buys. A factory keeps `b` weeks of parts.
//   calm year    = hold × b
//   average year = hold × b + chance × E[max(0, stoppage − b)] × short     (exact)
//   bad decade   = the decade 1 in 20 is worse than, over `decades` simulated decades
// Every buffer faces the same simulated decades (a seeded generator), so the numbers are
// repeatable and comparable.
(function () {
  "use strict";
  const { esc } = window.Marginalia.util;

  const money = (v) => `$${Math.round(v).toLocaleString("en-US")}`;

  function seeded(a) {
    return function () {
      a = (a + 0x6d2b79f5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function analyse(block) {
    const rnd = seeded(block.seed);
    const futures = [];
    for (let d = 0; d < block.decades; d++) {
      const stops = [];
      for (let y = 0; y < block.years; y++) {
        if (rnd() >= block.chance) continue;
        const u = rnd();
        let acc = 0;
        const hit = block.stoppages.find((s) => (acc += s.p) > u) || block.stoppages[block.stoppages.length - 1];
        stops.push(hit.weeks);
      }
      futures.push(stops);
    }
    const rows = [];
    for (let b = 0; b <= block.maxWeeks; b++) {
      const short = (w) => Math.max(0, w - b) * block.short;
      const decades = futures.map((stops) => block.years * block.hold * b + stops.reduce((a, w) => a + short(w), 0)).sort((x, y) => x - y);
      rows.push({
        b,
        calm: block.hold * b,
        average: block.hold * b + block.chance * block.stoppages.reduce((a, s) => a + s.p * short(s.weeks), 0),
        bad: decades[Math.floor(0.95 * decades.length)] / block.years
      });
    }
    return rows;
  }

  window.Marginalia.blocks.buffer = {
    render(block, ctx) {
      return `<section class="bf" aria-labelledby="${ctx.uid}-h">
        <div class="spot-head">
          <p class="eyebrow">Simulator</p>
          <h2 class="h2" id="${ctx.uid}-h">${esc(block.title)}</h2>
          <p class="section-dek">${esc(block.intro)}</p>
        </div>
        <div class="jc-presets" role="group" aria-label="Experiments">
          <span class="examples-k">Try</span>
          ${block.presets.map((p) => `<button type="button" class="pill" data-preset="${p.weeks}">${esc(p.label)}</button>`).join("")}
        </div>
        <div class="bt-grid">
          <div class="bt-left">
            <div class="levers">
              <div class="lever">
                <label class="lever-label" for="${ctx.uid}-weeks">
                  <span class="lever-t">${esc(block.weeksLabel)}</span>
                  <span class="lever-v tnum" data-ref="val"></span>
                </label>
                <input type="range" id="${ctx.uid}-weeks" data-ref="input" min="0" max="${block.maxWeeks}" step="1">
                <p class="lever-hint">${esc(block.weeksHint)}</p>
              </div>
            </div>
            <div class="tiles tiles-3">
              <div class="tile"><p class="tile-k">Calm year</p><p class="tile-v" data-ref="calm"></p><p class="tile-sub">holding the parts</p></div>
              <div class="tile"><p class="tile-k">Average</p><p class="tile-v" data-ref="average"></p><p class="tile-sub">a year, stoppages included</p></div>
              <div class="tile"><p class="tile-k">Bad decade</p><p class="tile-v" data-ref="bad"></p><p class="tile-sub">a year, 1 decade in 20</p></div>
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
      const rows = analyse(block);
      const cheapest = rows.reduce((a, r) => (r.average < a.average ? r : a));
      let weeks = block.start;

      function chartSVG() {
        const box = ref("chart");
        const W = Math.max(260, box.clientWidth || 480);
        const H = 240;
        const m = { t: 14, r: 14, b: 30, l: 48 };
        const w = W - m.l - m.r;
        const h = H - m.t - m.b;
        const hi = Math.max(...rows.map((r) => r.bad));
        const mag = Math.pow(10, Math.floor(Math.log10(hi / 4)));
        const step = [1, 2, 2.5, 5, 10].map((k) => k * mag).find((k) => Math.ceil(hi / k - 1e-9) <= 4);
        const top = step * Math.ceil(hi / step - 1e-9);
        const x = (b) => m.l + (b / block.maxWeeks) * w;
        const y = (v) => m.t + h - (v / top) * h;
        let grid = "";
        for (let v = 0; v <= top + 1e-9; v += step) {
          grid += `<line class="ch-grid" x1="${m.l}" x2="${m.l + w}" y1="${y(v).toFixed(1)}" y2="${y(v).toFixed(1)}"/>
            <text class="ch-tick" x="${m.l - 6}" y="${(y(v) + 3.5).toFixed(1)}" text-anchor="end">${v ? `$${Math.round(v / 1000)}k` : "$0"}</text>`;
        }
        for (let b = 0; b <= block.maxWeeks; b += 2) {
          grid += `<text class="ch-tick" x="${x(b).toFixed(1)}" y="${H - 12}" text-anchor="middle">${b}</text>`;
        }
        const series = [
          { key: "bad", cls: "bf-bad", label: "Bad decade" },
          { key: "average", cls: "bf-avg", label: "Average" },
          { key: "calm", cls: "bf-calm", label: "Calm year" }
        ];
        const lines = series
          .map((s) => {
            const pts = rows.map((r) => `${x(r.b).toFixed(1)},${y(r[s.key]).toFixed(1)}`).join(" ");
            const r = rows[weeks];
            // Labels sit above each line's left end, where the lines are furthest apart; the
            // calm-year line starts on the axis, so its label sits under the line's right end.
            const label =
              s.key === "calm"
                ? `<text class="ch-tick" x="${(m.l + w).toFixed(1)}" y="${(y(rows[rows.length - 1].calm) + 22).toFixed(1)}" text-anchor="end">${esc(s.label)}</text>`
                : `<text class="ch-tick" x="${(x(0) + 6).toFixed(1)}" y="${(y(rows[0][s.key]) - 7).toFixed(1)}">${esc(s.label)}</text>`;
            return `<polyline class="${s.cls}" points="${pts}"/>
              ${label}
              <circle class="${s.cls}-dot" cx="${x(r.b).toFixed(1)}" cy="${y(r[s.key]).toFixed(1)}" r="4"/>`;
          })
          .join("");
        const r = rows[weeks];
        return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(block.caption)} With ${weeks} weeks of parts: ${money(r.calm)} in a calm year, ${money(r.average)} on average, ${money(r.bad)} a year in a bad decade.">
          ${grid}
          <line class="inv-rise" x1="${x(weeks).toFixed(1)}" x2="${x(weeks).toFixed(1)}" y1="${m.t}" y2="${m.t + h}"/>
          ${lines}
        </svg>`;
      }

      function describe() {
        const r = rows[weeks];
        const lean = rows[0];
        let text =
          weeks === 0
            ? `With no parts in reserve, a calm year costs nothing. But stoppages make lean the most expensive choice on average, ${money(r.average)} a year, and one decade in 20 costs ${money(r.bad)} a year or more.`
            : `Holding ${weeks} ${weeks === 1 ? "week" : "weeks"} of parts costs ${money(r.calm)} in every calm year, the price that shows up in the budget. With stoppages included, the factory spends ${money(r.average)} a year on average, against ${money(lean.average)} with no reserve, ${
                r.bad > r.calm ? `and one decade in 20 costs ${money(r.bad)} a year or more.` : "and even the longest stoppage is covered, so no decade costs more than that."
              }`;
        text +=
          r.b === cheapest.b
            ? " This is the cheapest buffer on average."
            : ` The cheapest on average is ${cheapest.b} weeks, at ${money(cheapest.average)}.`;
        return text;
      }

      function update() {
        const r = rows[weeks];
        ref("input").value = weeks;
        ref("val").textContent = `${weeks} ${weeks === 1 ? "week" : "weeks"}`;
        ref("calm").textContent = money(r.calm);
        ref("average").textContent = money(r.average);
        ref("bad").textContent = money(r.bad);
        ref("chart").innerHTML = chartSVG();
        ref("note").textContent = describe();
        root.querySelectorAll("[data-preset]").forEach((p) => p.setAttribute("aria-pressed", String(Number(p.dataset.preset) === weeks)));
      }

      root.addEventListener("input", (e) => {
        if (!e.target.closest('[data-ref="input"]')) return;
        weeks = Number(e.target.value);
        update();
      });
      root.addEventListener("click", (e) => {
        const btn = e.target.closest("[data-preset]");
        if (!btn) return;
        weeks = Number(btn.dataset.preset);
        update();
      });
      const onResize = () => update();
      window.addEventListener("resize", onResize);
      update();
      return () => window.removeEventListener("resize", onResize);
    }
  };
})();
