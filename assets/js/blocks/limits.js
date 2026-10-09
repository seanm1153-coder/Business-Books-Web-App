// Limits: a resource and the capital that harvests it (Meadows's oil and fishing economies).
//   take per unit of capital  = perUnit × min(1, resource left ÷ fullUntil)
//   resource                 += regrow × r × (1 − r ÷ size) − take      (regrow is 0 for oil)
//   capital growth rate       = min(growth, (take ratio − costShare) × payback) − 1 ÷ life
// Profits are reinvested up to a growth goal; capital wears out over `life` years.
// Each system sets one slider: the size of the oil field, or how scarce fish must be before
// a boat's catch falls.
(function () {
  "use strict";
  const { esc, tablist } = window.Marginalia.util;

  const TIMES = ["", "the same", "twice", "three times", "four times", "five times", "six times", "seven times", "eight times"];

  function simulate(sys, v) {
    const size = sys.size * (sys.slider.key === "size" ? v : 1);
    const fullUntil = sys.slider.key === "fullUntil" ? v / 100 : sys.fullUntil;
    const dt = 0.05;
    let stock = size * sys.startStock;
    let capital = sys.capital;
    const points = [];
    for (let i = 0; i <= Math.round(sys.years / dt); i++) {
      const ratio = Math.min(1, stock / size / fullUntil);
      const take = Math.min(stock / dt, capital * sys.perUnit * ratio);
      if (i % Math.round(1 / dt) === 0) points.push({ t: i * dt, stock: (100 * stock) / size, capital, flow: take });
      const growth = Math.max(0, Math.min(sys.growth, (ratio - sys.costShare) * sys.payback));
      stock = Math.max(0, stock + (sys.regrow * stock * (1 - stock / size) - take) * dt);
      capital += (growth - 1 / sys.life) * capital * dt;
    }
    const peak = points.reduce((a, p) => (p.flow > a.flow ? p : a));
    const peakCapital = points.reduce((a, p) => (p.capital > a.capital ? p : a));
    return { points, peak, peakCapital, last: points[points.length - 1] };
  }

  const round = (v) => Math.round(v).toLocaleString("en-US");

  const MODELS = {
    oil: {
      tiles(run) {
        const boom = run.points.filter((p) => p.flow >= run.peak.flow / 2).length;
        return [
          { k: "Peak year", v: round(run.peak.t), sub: `of ${run.last.t}` },
          { k: "Peak output", v: round(run.peak.flow), sub: "million barrels a year" },
          { k: "Boom years", v: boom, sub: "output above half its peak" }
        ];
      },
      describe(sys, run, v, base) {
        const tenth = run.points.find((p) => p.t > run.peak.t && p.flow < run.peak.flow / 10);
        const boom = run.points.filter((p) => p.flow >= run.peak.flow / 2).length;
        let text = `Profits buy rigs, and output grows for ${round(run.peak.t)} years, to ${round(run.peak.flow)} million barrels a year. Then each rig gets less from the emptying field, profits fall, and rigs wear out faster than they're replaced${
          tenth ? `: by year ${round(tenth.t)}, output is below a tenth of its peak.` : "."
        }`;
        if (v > 1) {
          text += ` With ${TIMES[v]} the oil, the peak comes ${round(run.peak.t - base.peak.t)} years later than in the original field, and output stays above half its peak for ${boom} years, against ${base.points.filter((p) => p.flow >= base.peak.flow / 2).length}.`;
        }
        return text;
      }
    },
    fish: {
      kicker: (sys) => `In year ${sys.years}`,
      tiles(run) {
        return [
          { k: "Fish", v: `${Math.round(run.last.stock)}%`, sub: "of what the sea can hold" },
          { k: "Boats", v: round(run.last.capital) },
          { k: "Catch", v: round(run.last.flow), sub: "thousand tonnes a year" }
        ];
      },
      describe(sys, run) {
        const most = (sys.regrow * sys.size) / 4;
        const after = run.points.filter((p) => p.t >= 10);
        const gone = after.find((p) => p.stock < 2);
        const late = run.points.filter((p) => p.t >= sys.years - 30);
        const lo = Math.min(...late.map((p) => p.stock));
        const hi = Math.max(...late.map((p) => p.stock));
        const avg = late.reduce((a, p) => a + p.flow, 0) / late.length;
        const { last, peakCapital } = run;
        if (gone) {
          return `Boats keep full catches as the fish thin, so the fleet keeps growing, to ${round(peakCapital.capital)} boats by year ${round(peakCapital.t)}. By year ${round(gone.t)} the fish are all but gone and the catch collapses. ${
            last.stock > 10
              ? `Only once the fleet has shrunk to ${round(last.capital)} boats do the fish begin to come back.`
              : `With almost no fish left to breed, they haven't come back by year ${sys.years}.`
          }`;
        }
        if (hi - lo > 3) {
          return `The fleet overshoots, the fish run short and boats are laid up; then the fish recover and the cycle starts again. In the last 30 years the fish swing between ${Math.round(lo)}% and ${Math.round(hi)}% of what the sea can hold, and the catch averages ${round(avg)} thousand tonnes a year, below the ${round(most)} the fish could yield for good.`;
        }
        return `The fleet overshoots to ${round(peakCapital.capital)} boats, then fish and fleet settle: about ${Math.round(last.stock)}% of what the sea can hold, ${round(last.capital)} boats, and a catch of ${round(last.flow)} thousand tonnes a year, ${
          last.flow >= 0.95 * most ? "close to the most the fish can yield for good." : `below the ${round(most)} the fish could yield for good.`
        }`;
      }
    }
  };

  window.Marginalia.blocks.limits = {
    render(block, ctx) {
      return `<section class="lim" aria-labelledby="${ctx.uid}-h">
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
        <div class="bt-grid" id="${ctx.uid}-panel" role="tabpanel" aria-labelledby="${ctx.uid}-tab-${block.systems[0].id}" data-ref="panel"></div>
      </section>`;
    },

    mount(root, block, ctx) {
      const panel = root.querySelector('[data-ref="panel"]');
      const ref = (n) => panel.querySelector(`[data-ref="${n}"]`);
      const values = Object.fromEntries(block.systems.map((s) => [s.id, s.slider.value]));
      let sys = block.systems[0];

      function show() {
        const s = sys.slider;
        panel.innerHTML = `
          <div class="bt-left">
            <p class="ls-kind">${esc(sys.kind)}</p>
            <div class="jc-presets lim-presets" role="group" aria-label="Experiments">
              <span class="examples-k">Try</span>
              ${sys.presets.map((p) => `<button type="button" class="pill" data-preset="${esc(String(p.value))}">${esc(p.label)}</button>`).join("")}
            </div>
            <div class="levers">
              <div class="lever">
                <label class="lever-label" for="${ctx.uid}-${sys.id}">
                  <span class="lever-t">${esc(s.label)}</span>
                  <span class="lever-v tnum" data-ref="val"></span>
                </label>
                <input type="range" id="${ctx.uid}-${sys.id}" data-ref="input" min="${s.min}" max="${s.max}" step="${s.step}">
                <p class="lever-hint">${esc(s.hint)}</p>
              </div>
            </div>
          </div>
          <div class="bt-right">
            <div>
              ${MODELS[sys.model].kicker ? `<p class="cm-when">${esc(MODELS[sys.model].kicker(sys))}</p>` : ""}
              <div class="tiles tiles-3" data-ref="tiles"></div>
            </div>
            <figure class="bt-chart-fig">
              <div class="cm-chart" data-ref="chart"></div>
              <figcaption class="bt-cap">${esc(sys.caption)}</figcaption>
            </figure>
            <div class="happened" aria-live="polite">
              <p class="eyebrow">What's happening</p>
              <p class="happened-t" data-ref="note"></p>
            </div>
          </div>`;
        update();
      }

      function chartSVG(run) {
        const box = ref("chart");
        const W = Math.max(260, box.clientWidth || 480);
        const H = 270;
        const m = { t: 20, r: 14, b: 26, l: 40 };
        const gap = 36;
        const ph = (H - m.t - m.b - gap) / 2;
        const w = W - m.l - m.r;
        const x = (t) => m.l + (t / sys.years) * w;
        const most = sys.regrow ? (sys.regrow * sys.size) / 4 : 0;
        // The smallest clean step that covers the flow in at most four gridlines.
        const hi = Math.max(most, ...run.points.map((p) => p.flow)) || 1;
        const mag = Math.pow(10, Math.floor(Math.log10(hi / 4)));
        const step = [1, 2, 2.5, 5, 10].map((k) => k * mag).find((k) => Math.ceil(hi / k - 1e-9) <= 4);
        const top = step * Math.ceil(hi / step - 1e-9);
        const yS = (v) => m.t + ph - (v / 100) * ph;
        const yF = (v) => m.t + ph + gap + ph - (v / top) * ph;
        let grid = "";
        for (let v = 0; v <= 100; v += 50) {
          grid += `<line class="ch-grid" x1="${m.l}" x2="${m.l + w}" y1="${yS(v).toFixed(1)}" y2="${yS(v).toFixed(1)}"/>
            <text class="ch-tick" x="${m.l - 6}" y="${(yS(v) + 3.5).toFixed(1)}" text-anchor="end">${v}%</text>`;
        }
        for (let v = 0; v <= top + 1e-9; v += step) {
          grid += `<line class="ch-grid" x1="${m.l}" x2="${m.l + w}" y1="${yF(v).toFixed(1)}" y2="${yF(v).toFixed(1)}"/>
            <text class="ch-tick" x="${m.l - 6}" y="${(yF(v) + 3.5).toFixed(1)}" text-anchor="end">${round(v)}</text>`;
        }
        for (let t = 0; t <= sys.years; t += sys.years / 4) {
          grid += `<text class="ch-tick" x="${x(t).toFixed(1)}" y="${H - 8}" text-anchor="middle">${t}</text>`;
        }
        const line = (key, y) => run.points.map((p) => `${x(p.t).toFixed(1)},${y(p[key]).toFixed(1)}`).join(" ");
        const keyText = `Most it can yield for good: ${round(most)}`;
        const keyW = keyText.length * 6;
        const mostLine = most
          ? `<line class="ls-goal" x1="${m.l}" x2="${m.l + w}" y1="${yF(most).toFixed(1)}" y2="${yF(most).toFixed(1)}"/>
             <line class="ls-goal" x1="${(m.l + w - keyW - 32).toFixed(1)}" x2="${(m.l + w - keyW - 12).toFixed(1)}" y1="${m.t + ph + gap - 11.5}" y2="${m.t + ph + gap - 11.5}"/>
             <text class="ch-tick" x="${m.l + w}" y="${m.t + ph + gap - 8}" text-anchor="end">${esc(keyText)}</text>`
          : "";
        return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(sys.caption)} The ${esc(sys.flowNoun)} peaks at ${round(run.peak.flow)} in year ${round(run.peak.t)}.">
          ${grid}
          <text class="cm-panel-t" x="${m.l}" y="${m.t - 8}">${esc(sys.stockLabel)}</text>
          <text class="cm-panel-t" x="${m.l}" y="${m.t + ph + gap - 8}">${esc(sys.flowLabel)}</text>
          ${mostLine}
          <polyline class="bt-line" points="${line("stock", yS)}"/>
          <polyline class="cm-cows" points="${line("flow", yF)}"/>
        </svg>`;
      }

      function update() {
        const v = values[sys.id];
        const s = sys.slider;
        ref("input").value = v;
        ref("val").textContent = s.format.replace("{v}", v);
        panel.querySelectorAll("[data-preset]").forEach((b) => b.setAttribute("aria-pressed", String(Number(b.dataset.preset) === v)));
        const model = MODELS[sys.model];
        const run = simulate(sys, v);
        const base = simulate(sys, s.value);
        ref("tiles").innerHTML = model
          .tiles(run)
          .map((t) => `<div class="tile"><p class="tile-k">${esc(t.k)}</p><p class="tile-v">${esc(String(t.v))}</p>${t.sub ? `<p class="tile-sub">${esc(t.sub)}</p>` : ""}</div>`)
          .join("");
        ref("chart").innerHTML = chartSVG(run);
        ref("note").textContent = model.describe(sys, run, v, base);
      }

      panel.addEventListener("input", (e) => {
        if (!e.target.closest('[data-ref="input"]')) return;
        values[sys.id] = Number(e.target.value);
        update();
      });
      panel.addEventListener("click", (e) => {
        const btn = e.target.closest("[data-preset]");
        if (!btn) return;
        values[sys.id] = Number(btn.dataset.preset);
        update();
      });
      tablist(Array.from(root.querySelectorAll("[data-sys]")), (tab) => {
        sys = block.systems.find((s) => s.id === tab.dataset.sys);
        root.querySelector('[role="tabpanel"]').setAttribute("aria-labelledby", tab.id);
        show();
      });
      const onResize = () => update();
      window.addEventListener("resize", onResize);
      show();
      return () => window.removeEventListener("resize", onResize);
    }
  };
})();
