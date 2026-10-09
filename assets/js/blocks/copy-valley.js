// Copy valley: what a partial copy of an activity system earns. Starting from one consistent
// strategy (`from`) and switching k activities to the other (`to`), it runs the airline model
// (activity-system's evaluate) over every way of choosing those k, and charts the best and
// worst margin for each k.
(function () {
  "use strict";
  const { esc } = window.Marginalia.util;

  const money = (v) => `${v < 0 ? "−" : ""}$${Math.abs(Math.round(v))}`;
  const WORDS = ["no", "one", "two", "three", "four", "five", "six"];

  function analyse(block) {
    const { evaluate } = window.Marginalia.blocks["activity-system"];
    const model = block.airline;
    const from = model.presets.find((p) => p.id === block.from).picks;
    const to = model.presets.find((p) => p.id === block.to).picks;
    const acts = model.activities.map((a) => a.id);
    const rows = acts.map(() => null).concat(null);
    for (let mask = 0; mask < 1 << acts.length; mask++) {
      const switched = acts.filter((_, i) => (mask >> i) & 1);
      const picks = Object.fromEntries(acts.map((id) => [id, switched.includes(id) ? to[id] : from[id]]));
      const { margin } = evaluate(model, picks);
      const k = switched.length;
      const row = rows[k] || (rows[k] = { k, best: -Infinity, worst: Infinity, bestSet: [] });
      if (margin > row.best) {
        row.best = margin;
        row.bestSet = switched;
      }
      row.worst = Math.min(row.worst, margin);
    }
    return rows;
  }

  window.Marginalia.blocks["copy-valley"] = {
    render(block, ctx) {
      return `<section class="cv" aria-labelledby="${ctx.uid}-h">
        <div class="spot-head">
          <p class="eyebrow">A toy model</p>
          <h2 class="h2" id="${ctx.uid}-h">${esc(block.title)}</h2>
          <p class="section-dek">${esc(block.intro)}</p>
        </div>
        <div class="bt-grid">
          <div class="levers">
            <div class="lever">
              <label class="lever-label" for="${ctx.uid}-k">
                <span class="lever-t">${esc(block.kLabel)}</span>
                <span class="lever-v tnum" data-ref="val"></span>
              </label>
              <input type="range" id="${ctx.uid}-k" data-ref="input" min="0" max="${block.airline.activities.length}" step="1">
              <p class="lever-hint">${esc(block.kHint)}</p>
            </div>
            <div class="happened" aria-live="polite">
              <p class="eyebrow">What's happening</p>
              <p class="happened-t" data-ref="note"></p>
            </div>
          </div>
          <div class="bt-right">
            <figure class="bt-chart-fig">
              <div class="bt-chart" data-ref="chart"></div>
              <figcaption class="bt-cap">${esc(block.caption)}</figcaption>
            </figure>
          </div>
        </div>
      </section>`;
    },

    mount(root, block) {
      const ref = (n) => root.querySelector(`[data-ref="${n}"]`);
      const rows = analyse(block);
      const n = rows.length - 1;
      const nameOf = Object.fromEntries(block.airline.activities.map((a) => [a.id, a.name.toLowerCase()]));
      let k = block.start;

      function chartSVG() {
        const box = ref("chart");
        const W = Math.max(260, box.clientWidth || 480);
        const H = 230;
        const m = { t: 16, r: 12, b: 30, l: 42 };
        const w = W - m.l - m.r;
        const h = H - m.t - m.b;
        const lo = Math.floor(Math.min(...rows.map((r) => r.worst)) / 5) * 5;
        const hi = Math.ceil(Math.max(...rows.map((r) => r.best)) / 5) * 5;
        const x = (i) => m.l + ((i + 0.5) / (n + 1)) * w;
        const y = (v) => m.t + h - ((v - lo) / (hi - lo)) * h;
        let grid = "";
        for (let v = lo; v <= hi; v += 5) {
          grid += `<line class="ch-grid${v === 0 ? " is-zero" : ""}" x1="${m.l}" x2="${m.l + w}" y1="${y(v).toFixed(1)}" y2="${y(v).toFixed(1)}"/>
            <text class="ch-tick" x="${m.l - 6}" y="${(y(v) + 3.5).toFixed(1)}" text-anchor="end">${money(v)}</text>`;
        }
        const stay = rows[0].best;
        const marks = rows
          .map((r) => {
            const on = r.k === k ? " is-on" : "";
            return `<line class="cv-range${on}" x1="${x(r.k).toFixed(1)}" x2="${x(r.k).toFixed(1)}" y1="${y(r.worst).toFixed(1)}" y2="${y(r.best).toFixed(1)}"/>
              <circle class="cv-worst${on}" cx="${x(r.k).toFixed(1)}" cy="${y(r.worst).toFixed(1)}" r="4"/>
              <circle class="cv-best${on}" cx="${x(r.k).toFixed(1)}" cy="${y(r.best).toFixed(1)}" r="4.5"/>
              <text class="ch-tick" x="${x(r.k).toFixed(1)}" y="${H - 10}" text-anchor="middle">${r.k}</text>`;
          })
          .join("");
        return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(block.caption)} Switching ${k} of ${n}: best ${money(rows[k].best)}, worst ${money(rows[k].worst)}.">
          ${grid}
          <line class="ls-goal" x1="${m.l}" x2="${m.l + w}" y1="${y(stay).toFixed(1)}" y2="${y(stay).toFixed(1)}"/>
          <text class="ch-tick" x="${m.l + w}" y="${(y(stay) - 6).toFixed(1)}" text-anchor="end">${esc(block.stayLabel)}, ${money(stay)}</text>
          ${marks}
        </svg>`;
      }

      function describe() {
        const r = rows[k];
        const stay = rows[0].best;
        const all = rows[n].best;
        if (k === 0) return `Staying as it is, the airline earns ${money(stay)} a passenger.`;
        if (k === n) return `A complete copy of the low-cost system earns ${money(all)} a passenger, more than the ${money(stay)} it started with. Only the whole system pays.`;
        const list = r.bestSet.map((id) => nameOf[id]);
        const which = list.length === 1 ? list[0] : `${list.slice(0, -1).join(", ")} and ${list[list.length - 1]}`;
        return `Switching ${WORDS[k]} of ${WORDS[n]} activities, the best ${k === 1 ? "one to switch is" : "ones to switch are"} ${which}, earning ${money(r.best)} a passenger; the worst choice of ${WORDS[k]} earns ${money(r.worst)}. ${
          r.best < stay
            ? `Even the best partial copy earns less than not copying at all (${money(stay)}) and less than copying everything (${money(all)}).`
            : `Copying everything would earn ${money(all)}.`
        }`;
      }

      function update() {
        ref("input").value = k;
        ref("val").textContent = `${k} of ${n}`;
        ref("chart").innerHTML = chartSVG();
        ref("note").textContent = describe();
      }

      root.addEventListener("input", (e) => {
        if (!e.target.closest('[data-ref="input"]')) return;
        k = Number(e.target.value);
        update();
      });
      const onResize = () => update();
      window.addEventListener("resize", onResize);
      update();
      return () => window.removeEventListener("resize", onResize);
    }
  };
})();
