// Feedback loops: one stock, simulated three ways, on tabs.
//   cooling     balancing loop:   dT/dt = −k (T − room)
//   interest    reinforcing loop: M(t+1) = M(t) (1 + r)
//   population  both:             dP/dt = b P − d P, with b optionally falling over time
// Each run starts from the slider settings and is redrawn whenever one moves.
(function () {
  "use strict";
  const { esc, tablist } = window.Marginalia.util;

  const round = (v, n = 0) => Math.round(v * 10 ** n) / 10 ** n;
  const comma = (v) => Math.round(v).toLocaleString("en-US");

  // Named formats, so the book file stays plain data.
  const TICKS = {
    deg: (v) => `${round(v)}°`,
    money: (v) => (v >= 10000 ? `$${round(v / 1000)}k` : `$${comma(v)}`),
    millions: (v) => `${round(v, v < 10 ? 1 : 0)}m`
  };
  const PARAMS = {
    deg: (v) => `${round(v)}°C`,
    money: (v) => `$${comma(v)}`,
    millions: (v) => `${round(v)} million`,
    pctYear: (v) => `${round(v * 100, 1)}% a year`,
    gapPerMin: (v) => `${round(v * 100)}% of the gap a minute`
  };

  // Each model: run(params) → { points: [[t, stock], ...], ... } and describe(run, params).
  const MODELS = {
    cooling: {
      run(p) {
        const pts = [];
        let T = p.start;
        const dt = 0.25;
        let within = null;
        for (let t = 0; t <= 60 + 1e-9; t += dt) {
          if (Math.abs(t * 4 - Math.round(t * 4)) < 1e-6) pts.push([t, T]);
          if (within === null && Math.abs(T - p.room) <= 1) within = t;
          T += -p.k * (T - p.room) * dt;
        }
        return { points: pts, within, end: pts[pts.length - 1][1] };
      },
      scale: () => [0, 100],
      describe(r, p) {
        const gap = p.start - p.room;
        if (Math.abs(gap) < 0.5) return `The drink starts at room temperature, so there's no gap to close and nothing changes. A balancing loop only acts on a difference.`;
        const dir = gap > 0 ? "cools" : "warms";
        const first = Math.abs(p.k * gap);
        return `The drink ${dir} fastest at first, about ${round(first, 1)}° in the first minute, because the gap to the room is biggest. As the gap closes, the change slows: it's within 1° of the room after ${r.within === null ? "more than 60" : round(r.within)} minutes and never quite gets there.`;
      }
    },
    interest: {
      run(p) {
        const pts = [];
        let M = p.start;
        for (let y = 0; y <= 40; y++) {
          pts.push([y, M]);
          M *= 1 + p.r;
        }
        return { points: pts, end: pts[pts.length - 1][1] };
      },
      scale: (r) => [0, Math.max(...r.points.map((x) => x[1]))],
      describe(r, p) {
        if (p.r === 0) return `At 0% the loop has no gain: the balance stays at $${comma(p.start)} for ever.`;
        const pct = p.r * 100;
        return `At ${round(pct, 1)}% a year the balance roughly doubles every ${round(70 / pct)} years (70 ÷ ${round(pct, 1)}). Each year's interest is bigger than the last because it's paid on a bigger balance: $${comma(p.start)} becomes $${comma(r.end)} after 40 years.`;
      }
    },
    population: {
      run(p) {
        const pts = [];
        let P = p.start;
        let cross = null;
        const dt = 0.5;
        for (let t = 0; t <= 100 + 1e-9; t += dt) {
          const b = p.falling ? p.b + (p.bEnd - p.b) * (t / 100) : p.b;
          if (cross === null && p.falling && b <= p.d && p.b > p.d) cross = t;
          if (Math.abs(t - Math.round(t)) < 1e-6) pts.push([t, P]);
          P += (b - p.d) * P * dt;
        }
        const peak = pts.reduce((a, x) => (x[1] > a[1] ? x : a));
        return { points: pts, cross, peak, end: pts[pts.length - 1][1] };
      },
      scale: (r) => [0, Math.max(...r.points.map((x) => x[1]))],
      describe(r, p) {
        const net = (p.b - p.d) * 100;
        if (p.falling && r.cross !== null) {
          return `Early on births outpace deaths and the reinforcing loop dominates, so the population grows. The birth rate keeps falling, and in year ${round(r.cross)} it drops below the death rate. From then the balancing loop dominates: the population peaks at about ${comma(r.peak[1])} million and starts to shrink. Same structure, different behavior.`;
        }
        if (Math.abs(net) < 0.05) return `Births and deaths cancel out, so the population holds steady. Both loops are working; neither dominates.`;
        return net > 0
          ? `Births (${round(p.b * 100, 1)}%) outpace deaths (${round(p.d * 100, 1)}%), so the reinforcing loop dominates and the population grows ${round(net, 1)}% a year, faster and faster in absolute numbers.`
          : `Deaths (${round(p.d * 100, 1)}%) outpace births (${round(p.b * 100, 1)}%), so the balancing loop dominates and the population shrinks ${round(-net, 1)}% a year.`;
      }
    }
  };

  // Small loop diagrams: a stock box, its flows, and a labeled loop for each feedback.
  function diagram(sys) {
    const loops = sys.loops
      .map((l, i) => {
        const left = sys.loops.length === 1 ? 150 : i === 0 ? 92 : 208;
        return `<path class="ls-loop" d="M ${left - 26} 74 C ${left - 30} 112, ${left + 30} 112, ${left + 26} 74" marker-end="url(#ls-head-${sys.id})"/>
          <circle class="ls-loop-c is-${l.kind}" cx="${left}" cy="101" r="11"/>
          <text class="ls-loop-t" x="${left}" y="105" text-anchor="middle">${l.kind === "reinforcing" ? "R" : "B"}</text>
          <text class="ls-flow-t" x="${left}" y="128" text-anchor="middle">${esc(l.label)}</text>`;
      })
      .join("");
    return `<svg class="ls-diagram" viewBox="0 0 300 136" aria-hidden="true">
      <defs><marker id="ls-head-${sys.id}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" class="ls-head"/></marker></defs>
      <rect class="ls-stock" x="105" y="22" width="90" height="44" rx="4"/>
      <text class="ls-stock-t" x="150" y="49" text-anchor="middle">${esc(sys.stockShort)}</text>
      ${sys.inflow ? `<line class="ls-flow" x1="20" y1="44" x2="101" y2="44" marker-end="url(#ls-head-${sys.id})"/><text class="ls-flow-t" x="60" y="34" text-anchor="middle">${esc(sys.inflow)}</text>` : ""}
      ${sys.outflow ? `<line class="ls-flow" x1="199" y1="44" x2="280" y2="44" marker-end="url(#ls-head-${sys.id})"/><text class="ls-flow-t" x="240" y="34" text-anchor="middle">${esc(sys.outflow)}</text>` : ""}
      ${loops}
    </svg>`;
  }

  window.Marginalia.blocks["loop-sim"] = {
    render(block, ctx) {
      return `<section class="ls" aria-labelledby="${ctx.uid}-h">
        <div class="spot-head">
          <p class="eyebrow">Simulator</p>
          <h2 class="h2" id="${ctx.uid}-h">${esc(block.title)}</h2>
          <p class="section-dek">${esc(block.intro)}</p>
        </div>
        <div class="tabs" role="tablist" aria-label="Choose a system">
          ${block.systems
            .map(
              (sys, i) =>
                `<button class="pill" role="tab" type="button" id="${ctx.uid}-tab-${sys.id}" data-sys="${sys.id}" aria-controls="${ctx.uid}-panel" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}">${esc(sys.label)}</button>`
            )
            .join("")}
        </div>
        <div class="ls-grid" id="${ctx.uid}-panel" role="tabpanel" aria-labelledby="${ctx.uid}-tab-${block.systems[0].id}" data-ref="panel"></div>
      </section>`;
    },

    mount(root, block, ctx) {
      const panel = root.querySelector('[data-ref="panel"]');
      const ref = (n) => panel.querySelector(`[data-ref="${n}"]`);
      const values = Object.fromEntries(block.systems.map((sys) => [sys.id, Object.fromEntries(sys.params.map((p) => [p.key, p.value]))]));
      let sys = block.systems[0];

      function paramHTML(p) {
        if (p.type === "toggle") {
          return `<label class="ls-toggle" for="${ctx.uid}-${sys.id}-${p.key}">
            <input type="checkbox" id="${ctx.uid}-${sys.id}-${p.key}" data-param="${p.key}">
            <span>${esc(p.label)}</span>
          </label>`;
        }
        return `<div class="lever">
          <label class="lever-label" for="${ctx.uid}-${sys.id}-${p.key}">
            <span class="lever-t">${esc(p.label)}</span>
            <span class="lever-v tnum" data-val="${p.key}"></span>
          </label>
          <input type="range" id="${ctx.uid}-${sys.id}-${p.key}" data-param="${p.key}" min="${p.min}" max="${p.max}" step="${p.step}">
          ${p.hint ? `<p class="lever-hint">${esc(p.hint)}</p>` : ""}
        </div>`;
      }

      function show() {
        panel.innerHTML = `
          <div class="ls-left">
            ${diagram(sys)}
            <p class="ls-kind">${esc(sys.kind)}</p>
            <div class="levers">${sys.params.map(paramHTML).join("")}</div>
          </div>
          <div class="ls-right">
            <figure class="ls-fig">
              <div class="ls-chart" data-ref="chart"></div>
              <figcaption class="bt-cap">${esc(sys.caption)}</figcaption>
            </figure>
            <div class="happened" aria-live="polite">
              <p class="eyebrow">What's happening</p>
              <p class="happened-t" data-ref="note"></p>
            </div>
          </div>`;
        update();
      }

      function chartSVG(points, [lo, hi]) {
        const box = ref("chart");
        const W = Math.max(260, box.clientWidth || 480);
        const H = 200;
        const m = { t: 12, r: 14, b: 26, l: 52 };
        const w = W - m.l - m.r;
        const h = H - m.t - m.b;
        const tEnd = points[points.length - 1][0];
        // The smallest clean step that covers the data in at most five gridlines.
        const span = hi - lo || 1;
        const mag = Math.pow(10, Math.floor(Math.log10(span / 5)));
        const step = [1, 2, 2.5, 5, 10, 20].map((k) => k * mag).find((k) => Math.ceil(span / k - 1e-9) <= 5);
        const top = lo + step * Math.ceil(span / step - 1e-9);
        const x = (t) => m.l + (t / tEnd) * w;
        const y = (v) => m.t + h - ((v - lo) / (top - lo)) * h;
        let grid = "";
        for (let v = lo; v <= top + 1e-9; v += step) {
          grid += `<line class="ch-grid" x1="${m.l}" x2="${m.l + w}" y1="${y(v).toFixed(1)}" y2="${y(v).toFixed(1)}"/>
            <text class="ch-tick" x="${m.l - 6}" y="${(y(v) + 3.5).toFixed(1)}" text-anchor="end">${esc(TICKS[sys.unit](v))}</text>`;
        }
        const tStep = tEnd / 4;
        for (let t = 0; t <= tEnd + 1e-9; t += tStep) {
          grid += `<text class="ch-tick" x="${x(t).toFixed(1)}" y="${H - 8}" text-anchor="middle">${round(t)}</text>`;
        }
        const goal = sys.goalParam ? values[sys.id][sys.goalParam] : null;
        const goalLine =
          goal === null
            ? ""
            : `<line class="ls-goal" x1="${m.l}" x2="${m.l + w}" y1="${y(goal).toFixed(1)}" y2="${y(goal).toFixed(1)}"/>
               <text class="ch-tick" x="${m.l + w}" y="${(y(goal) - 5).toFixed(1)}" text-anchor="end">${esc(sys.goalLabel)}</text>`;
        const pts = points.map(([t, v]) => `${x(t).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
        const [lt, lv] = points[points.length - 1];
        return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(sys.caption)} Ends at ${esc(TICKS[sys.unit](lv))}.">
          ${grid}${goalLine}
          <polyline class="bt-line" points="${pts}"/>
          <circle class="bt-dot" cx="${x(lt).toFixed(1)}" cy="${y(lv).toFixed(1)}" r="4"/>
        </svg>`;
      }

      function update() {
        const v = values[sys.id];
        sys.params.forEach((p) => {
          const input = panel.querySelector(`[data-param="${p.key}"]`);
          if (p.type === "toggle") input.checked = Boolean(v[p.key]);
          else {
            input.value = v[p.key];
            panel.querySelector(`[data-val="${p.key}"]`).textContent = PARAMS[p.format](v[p.key]);
          }
          if (p.dependsOn) input.closest(".lever, .ls-toggle").hidden = !v[p.dependsOn];
        });
        const model = MODELS[sys.model];
        const run = model.run(v);
        ref("chart").innerHTML = chartSVG(run.points, model.scale(run));
        ref("note").textContent = model.describe(run, v);
      }

      panel.addEventListener("input", (e) => {
        const input = e.target.closest("[data-param]");
        if (!input) return;
        values[sys.id][input.dataset.param] = input.type === "checkbox" ? input.checked : Number(input.value);
        update();
      });
      tablist(Array.from(root.querySelectorAll("[data-sys]")), (tab) => {
        sys = block.systems.find((s) => s.id === tab.dataset.sys);
        panel.setAttribute("aria-labelledby", tab.id);
        show();
      });
      const onResize = () => update();
      window.addEventListener("resize", onResize);
      show();
      return () => window.removeEventListener("resize", onResize);
    }
  };
})();
