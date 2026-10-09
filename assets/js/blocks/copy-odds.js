// Copy odds: why fit protects a strategy. If a rival matches any one activity with
// probability p, it matches n independent activities with probability p^n.
(function () {
  "use strict";
  const { esc } = window.Marginalia.util;

  const pct = (v) => (v < 0.01 ? "under 1%" : `${Math.round(v * 100)}%`);

  window.Marginalia.blocks["copy-odds"] = {
    render(block, ctx) {
      const slider = (key, label, min, max, hint) => `<div class="lever">
          <label class="lever-label" for="${ctx.uid}-${key}">
            <span class="lever-t">${esc(label)}</span>
            <span class="lever-v tnum" data-val="${key}"></span>
          </label>
          <input type="range" id="${ctx.uid}-${key}" data-input="${key}" min="${min}" max="${max}" step="1">
          <p class="lever-hint">${esc(hint)}</p>
        </div>`;
      return `<section class="co" aria-labelledby="${ctx.uid}-h">
        <div class="spot-head">
          <p class="eyebrow">Calculator</p>
          <h2 class="h2" id="${ctx.uid}-h">${esc(block.title)}</h2>
          <p class="section-dek">${esc(block.intro)}</p>
        </div>
        <div class="bt-grid">
          <div class="levers">
            ${slider("p", block.pLabel, 50, 99, block.pHint)}
            ${slider("n", block.nLabel, 1, block.maxN, block.nHint)}
          </div>
          <div class="bt-right">
            <figure class="bt-chart-fig">
              <div class="bt-chart" data-ref="chart"></div>
              <figcaption class="bt-cap">${esc(block.caption)}</figcaption>
            </figure>
            <div class="tiles tiles-3" data-ref="tiles"></div>
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
      let state = { p: block.start.p, n: block.start.n };

      function chartSVG() {
        const box = ref("chart");
        const W = Math.max(260, box.clientWidth || 480);
        const H = 200;
        const m = { t: 14, r: 10, b: 28, l: 40 };
        const w = W - m.l - m.r;
        const h = H - m.t - m.b;
        const n = block.maxN;
        const slot = w / n;
        const y = (v) => m.t + h - v * h;
        let grid = "";
        for (let v = 0; v <= 1.0001; v += 0.25) {
          grid += `<line class="ch-grid" x1="${m.l}" x2="${m.l + w}" y1="${y(v).toFixed(1)}" y2="${y(v).toFixed(1)}"/>
            <text class="ch-tick" x="${m.l - 6}" y="${(y(v) + 3.5).toFixed(1)}" text-anchor="end">${Math.round(v * 100)}%</text>`;
        }
        const p = state.p / 100;
        const bars = Array.from({ length: n }, (_, i) => {
          const k = i + 1;
          const v = Math.pow(p, k);
          const x = m.l + i * slot + slot * 0.18;
          return `<rect class="co-bar${k === state.n ? " is-on" : ""}" x="${x.toFixed(1)}" y="${y(v).toFixed(1)}" width="${(slot * 0.64).toFixed(1)}" height="${(m.t + h - y(v)).toFixed(1)}"/>
            <text class="ch-tick" x="${(m.l + i * slot + slot / 2).toFixed(1)}" y="${H - 10}" text-anchor="middle">${k}</text>`;
        }).join("");
        return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(block.caption)} With ${state.p}% for each activity, the chance of matching all ${state.n} is ${pct(Math.pow(p, state.n))}.">
          ${grid}${bars}
        </svg>`;
      }

      function update() {
        ["p", "n"].forEach((k) => {
          root.querySelector(`[data-input="${k}"]`).value = state[k];
        });
        root.querySelector('[data-val="p"]').textContent = `${state.p}%`;
        root.querySelector('[data-val="n"]').textContent = state.n;
        const p = state.p / 100;
        const all = Math.pow(p, state.n);
        ref("chart").innerHTML = chartSVG();
        ref("tiles").innerHTML = [
          ["One activity", pct(p)],
          [`All ${state.n}`, pct(all)],
          ["Misses one", pct(1 - all)]
        ]
          .map(([k, v]) => `<div class="tile"><p class="tile-k">${esc(k)}</p><p class="tile-v">${esc(v)}</p></div>`)
          .join("");
        const half = Math.ceil(Math.log(0.5) / Math.log(p));
        ref("note").textContent =
          state.n === 1
            ? `A rival copying a single activity succeeds ${pct(p)} of the time. Add activities that only work together and the odds fall fast.`
            : `A rival that gets each activity right ${pct(p)} of the time gets all ${state.n} right only ${pct(all)} of the time. ${
                half <= block.maxN ? `At ${state.p}%, the odds fall below even once ${half} activities have to be matched.` : `At ${state.p}%, even ${block.maxN} activities leave the odds better than even.`
              }`;
      }

      root.addEventListener("input", (e) => {
        const input = e.target.closest("[data-input]");
        if (!input) return;
        state[input.dataset.input] = Number(input.value);
        update();
      });
      const onResize = () => update();
      window.addEventListener("resize", onResize);
      update();
      return () => window.removeEventListener("resize", onResize);
    }
  };
})();
