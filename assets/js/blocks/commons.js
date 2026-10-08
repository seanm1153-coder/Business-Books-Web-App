// Commons: herders share a pasture that regrows fastest when it's half grazed.
//   cows' share of a full feed  f = min(1, grass ÷ hungry)
//   grazing                     = cows × eat × f              (in % of full cover)
//   regrowth                    = regrow × g × (1 − g ÷ 100)  (on what's left after grazing)
//   income per cow              = value × f − upkeep
// Each year a herder adds a cow if that year's cows made money and sells one if they lost it.
// Herders who hold back stop at `share` cows; a cap does the same for everyone. On fenced
// plots each herder grazes a fifth of the pasture and bears the whole cost of overgrazing it.
(function () {
  "use strict";
  const { esc } = window.Marginalia.util;

  const WORDS = ["no", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
  const money = (v) => `${Math.round(v) < 0 ? "−" : ""}$${Math.abs(Math.round(v)).toLocaleString("en-US")}`;
  const pct = (v) => `${Math.round(v)}%`;
  // Forty years of earnings, to the nearest thousand dollars.
  const total = (v) => money(Math.round(v / 1000) * 1000);
  const sum = (a) => a.reduce((s, v) => s + v, 0);

  function simulate(block, mode, holders, cap) {
    const n = block.herders;
    const fenced = mode === "fenced";
    const limit = (i) => (mode === "cap" ? cap / n : i < holders ? block.share : Infinity);
    // One season on a patch of grass grazed by `cows` (scaled to the whole pasture).
    const season = (g, cows) => {
      const f = Math.min(1, g / block.hungry);
      const left = Math.max(0, g - cows * block.eat * f);
      return { f, next: left + block.regrow * left * (1 - left / 100) };
    };
    // Start where the grass has settled under the starting herd.
    let g0 = 100;
    for (let k = 0; k < 500; k++) g0 = season(g0, block.startCows * n).next;
    const herd = Array(n).fill(mode === "cap" ? Math.min(block.startCows, cap / n) : block.startCows);
    const grass = fenced ? Array(n).fill(g0) : [g0];
    const earned = Array(n).fill(0);
    const points = [];
    for (let t = 0; t <= block.years; t++) {
      const point = { t, grass: sum(grass) / grass.length, cows: sum(herd), herd: herd.slice(), plots: grass.slice() };
      // A plot is a fifth of the pasture, so each cow on it eats five times the share.
      const perCow = herd.map((h, i) => {
        const s = season(fenced ? grass[i] : grass[0], fenced ? h * n : point.cows);
        if (fenced) grass[i] = s.next;
        return { f: s.f, next: s.next, v: block.value * s.f - block.upkeep };
      });
      if (!fenced) grass[0] = perCow[0].next;
      point.income = sum(herd.map((h, i) => h * perCow[i].v));
      herd.forEach((h, i) => (earned[i] += h * perCow[i].v));
      points.push(point);
      herd.forEach((h, i) => {
        if (perCow[i].v > 0 && h < limit(i)) herd[i] = h + 1;
        else if (perCow[i].v < 0 && h > 0) herd[i] = h - 1;
        if (h > limit(i)) herd[i] = limit(i);
      });
    }
    const last = points[points.length - 1];
    const peak = points.reduce((a, p) => (p.cows > a.cows ? p : a));
    const low = points.reduce((a, p) => (p.grass < a.grass ? p : a));
    return {
      points,
      last,
      peak,
      low,
      herders: earned.map((e, i) => ({ holds: mode !== "cap" && i < holders, cows: last.herd[i], earned: e, plot: last.plots[fenced ? i : 0] }))
    };
  }

  // Average of a group of herders' earnings and plots.
  function group(list) {
    return list.length
      ? { n: list.length, earned: sum(list.map((h) => h.earned)) / list.length, plot: sum(list.map((h) => h.plot)) / list.length }
      : null;
  }

  window.Marginalia.blocks.commons = {
    render(block, ctx) {
      return `<section class="cm" aria-labelledby="${ctx.uid}-h">
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
          <div class="bt-left">
            <fieldset class="cm-modes">
              <legend class="lever-t">How the pasture is run</legend>
              ${block.modes
                .map(
                  (m) => `<label class="cm-mode" for="${ctx.uid}-mode-${esc(m.id)}">
                    <input type="radio" name="${ctx.uid}-mode" id="${ctx.uid}-mode-${esc(m.id)}" value="${esc(m.id)}" data-mode>
                    <span class="cm-mode-t">${esc(m.label)}</span>
                    <span class="cm-mode-d">${esc(m.hint)}</span>
                  </label>`
                )
                .join("")}
            </fieldset>
            <div class="levers">
              <div class="lever" data-for="holders">
                <label class="lever-label" for="${ctx.uid}-holders">
                  <span class="lever-t">${esc(block.holdersLabel)}</span>
                  <span class="lever-v tnum" data-val="holders"></span>
                </label>
                <input type="range" id="${ctx.uid}-holders" data-input="holders" min="0" max="${block.herders}" step="1">
                <p class="lever-hint">${esc(block.holdersHint)}</p>
              </div>
              <div class="lever" data-for="cap">
                <label class="lever-label" for="${ctx.uid}-cap">
                  <span class="lever-t">${esc(block.capLabel)}</span>
                  <span class="lever-v tnum" data-val="cap"></span>
                </label>
                <input type="range" id="${ctx.uid}-cap" data-input="cap" min="${block.capMin}" max="${block.capMax}" step="${block.herders}">
                <p class="lever-hint">${esc(block.capHint)}</p>
              </div>
            </div>
          </div>
          <div class="bt-right">
            <div>
              <p class="cm-when">In year ${block.years}</p>
              <div class="tiles tiles-3">
                <div class="tile"><p class="tile-k">Grass</p><p class="tile-v" data-ref="grass"></p></div>
                <div class="tile"><p class="tile-k">Cows</p><p class="tile-v" data-ref="cows"></p></div>
                <div class="tile"><p class="tile-k">Income</p><p class="tile-v" data-ref="income"></p></div>
              </div>
            </div>
            <figure class="bt-chart-fig">
              <div class="cm-chart" data-ref="chart"></div>
              <figcaption class="bt-cap">${esc(block.caption)}</figcaption>
            </figure>
            <div class="happened" aria-live="polite">
              <p class="eyebrow">What's happening</p>
              <p class="happened-t" data-ref="note"></p>
            </div>
            <table class="cm-table">
              <caption class="visually-hidden">Each herder in year ${block.years}</caption>
              <thead><tr><th scope="col">Herder</th><th scope="col">Cows</th><th scope="col" class="cm-num">Total earned</th></tr></thead>
              <tbody data-ref="herders"></tbody>
            </table>
          </div>
        </div>
      </section>`;
    },

    mount(root, block) {
      const ref = (n) => root.querySelector(`[data-ref="${n}"]`);
      const most = (block.regrow * 100) / 4 / block.eat; // the largest herd the grass can feed for good
      const first = block.presets[0];
      let state = { mode: first.mode, holders: first.holders, cap: first.cap };
      const everyone = simulate(block, "shared", block.herders, block.capMax);

      function chartSVG(run) {
        const box = ref("chart");
        const W = Math.max(260, box.clientWidth || 480);
        const H = 270;
        const m = { t: 20, r: 14, b: 26, l: 40 };
        const gap = 36;
        const ph = (H - m.t - m.b - gap) / 2;
        const w = W - m.l - m.r;
        const x = (t) => m.l + (t / block.years) * w;
        const hi = Math.max(most, ...run.points.map((p) => p.cows));
        const cowStep = [10, 20, 25, 50, 100].find((k) => Math.ceil(hi / k - 1e-9) <= 4);
        const cowTop = cowStep * Math.ceil(hi / cowStep - 1e-9);
        const yG = (v) => m.t + ph - (v / 100) * ph;
        const yC = (v) => m.t + ph + gap + ph - (v / cowTop) * ph;
        let grid = "";
        for (let v = 0; v <= 100; v += 50) {
          grid += `<line class="ch-grid" x1="${m.l}" x2="${m.l + w}" y1="${yG(v).toFixed(1)}" y2="${yG(v).toFixed(1)}"/>
            <text class="ch-tick" x="${m.l - 6}" y="${(yG(v) + 3.5).toFixed(1)}" text-anchor="end">${v}%</text>`;
        }
        for (let v = 0; v <= cowTop + 1e-9; v += cowStep) {
          grid += `<line class="ch-grid" x1="${m.l}" x2="${m.l + w}" y1="${yC(v).toFixed(1)}" y2="${yC(v).toFixed(1)}"/>
            <text class="ch-tick" x="${m.l - 6}" y="${(yC(v) + 3.5).toFixed(1)}" text-anchor="end">${v}</text>`;
        }
        for (let t = 0; t <= block.years; t += 10) {
          grid += `<text class="ch-tick" x="${x(t).toFixed(1)}" y="${H - 8}" text-anchor="middle">${t}</text>`;
        }
        const line = (key, y) => run.points.map((p) => `${x(p.t).toFixed(1)},${y(p[key]).toFixed(1)}`).join(" ");
        // On fenced plots with both kinds of herder, draw the two kinds of plot instead of the average.
        const split = state.mode === "fenced" && state.holders > 0 && state.holders < block.herders;
        const plotLine = (i, cls, label) => {
          const end = run.points[run.points.length - 1].plots[i];
          return `<polyline class="${cls}" points="${run.points.map((p) => `${x(p.t).toFixed(1)},${yG(p.plots[i]).toFixed(1)}`).join(" ")}"/>
            <text class="ch-tick" x="${m.l + w}" y="${(yG(end) + (end > 50 ? 14 : -6)).toFixed(1)}" text-anchor="end">${esc(label)}</text>`;
        };
        const grassLines = split
          ? plotLine(0, "bt-line", block.heldPlotLabel) + plotLine(state.holders, "cm-plot", block.otherPlotLabel)
          : `<polyline class="bt-line" points="${line("grass", yG)}"/>`;
        // The dashed line is keyed in the panel's title row, clear of the data.
        const keyText = `Most it can feed for good: ${most}`;
        const keyW = keyText.length * 6;
        const { last } = run;
        return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(block.caption)} In year ${block.years} the grass is at ${pct(last.grass)} with ${last.cows} cows.">
          ${grid}
          <text class="cm-panel-t" x="${m.l}" y="${m.t - 8}">${esc(block.grassLabel)}</text>
          <text class="cm-panel-t" x="${m.l}" y="${m.t + ph + gap - 8}">${esc(block.cowsLabel)}</text>
          <line class="ls-goal" x1="${m.l}" x2="${m.l + w}" y1="${yC(most).toFixed(1)}" y2="${yC(most).toFixed(1)}"/>
          <line class="ls-goal" x1="${(m.l + w - keyW - 32).toFixed(1)}" x2="${(m.l + w - keyW - 12).toFixed(1)}" y1="${m.t + ph + gap - 11.5}" y2="${m.t + ph + gap - 11.5}"/>
          <text class="ch-tick" x="${m.l + w}" y="${m.t + ph + gap - 8}" text-anchor="end">${esc(keyText)}</text>
          ${grassLines}
          <polyline class="cm-cows" points="${line("cows", yC)}"/>
        </svg>`;
      }

      function describe(run) {
        const { mode, holders, cap } = state;
        const n = block.herders;
        const { last, peak, low } = run;
        const failed = low.grass < block.failBelow;
        const fall = failed
          ? `The herd peaks at ${peak.cows} cows in year ${peak.t}, and by year ${low.t} ${low.grass < 2 ? "the grass is all but gone" : `the grass is down to ${pct(low.grass)} of full cover`}.`
          : `The grass holds at ${pct(last.grass)} of full cover with ${last.cows} cows on it, and the herders earn ${money(last.income)} a year between them.`;
        const each = total(run.herders[0].earned);
        const best = total(everyone.herders[0].earned);
        const held = group(run.herders.filter((h) => h.holds));
        const not = group(run.herders.filter((h) => !h.holds));
        const who = (g, verb) => (g.n === 1 ? `The one herder who ${verb}` : `The ${WORDS[g.n]} who ${verb}`);
        if (mode === "cap") {
          return failed
            ? `${fall} A cap of ${cap} cows is more than the grass can feed. Each herder earned ${each} over ${block.years} years.`
            : `${fall} A cap of ${cap}, ${cap / n} cows each, earned each herder ${each} over ${block.years} years.${cap < most ? " The pasture is safe, but it could feed more cows." : " That's the most the pasture can feed year after year."}`;
        }
        if (mode === "fenced") {
          if (!held) return `${fall} Fencing alone doesn't save a plot whose owner overgrazes it. Each herder earned ${each} over ${block.years} years.`;
          if (!not) return `${fall} Each herder earned ${each} over ${block.years} years, the same as when everyone holds back on the shared pasture. Here nobody depends on anyone else's restraint.`;
          return `${who(held, "held back")} kept ${held.n === 1 ? "their plot" : "their plots"} at ${pct(held.plot)} cover and earned ${total(held.earned)}${held.n === 1 ? "" : " each"} over ${block.years} years. ${who(not, "didn't")} ruined only ${not.n === 1 ? "their own plot" : "their own plots"}, down to ${pct(not.plot)}, and earned ${total(not.earned)}${not.n === 1 ? "" : " each"}. Nobody else paid for it.`;
        }
        if (!held) return `${fall} Each herder earned ${each} over ${block.years} years. Had all ${WORDS[n]} held back to ${block.share} cows, each would have earned ${best}.`;
        if (!not) return `${fall} Each herder earned ${each} over ${block.years} years. It only works while everyone holds back: try ${WORDS[n - 1]} of ${WORDS[n]}.`;
        return `${fall} ${who(held, "held back")} earned ${total(held.earned)}${held.n === 1 ? "" : " each"} over ${block.years} years; ${who(not, "didn't").replace(/^The/, "the")} earned ${total(not.earned)}${not.n === 1 ? "" : " each"}. ${
          not.earned > held.earned
            ? "Breaking the agreement paid better, even though it ruined the pasture for everyone."
            : "Holding back lost less when the grass failed, but it couldn't save the pasture."
        }`;
      }

      function update() {
        root.querySelectorAll("[data-mode]").forEach((r) => {
          r.checked = r.value === state.mode;
          r.closest(".cm-mode").classList.toggle("is-on", r.checked);
        });
        root.querySelector('[data-for="holders"]').hidden = state.mode === "cap";
        root.querySelector('[data-for="cap"]').hidden = state.mode !== "cap";
        root.querySelector('[data-input="holders"]').value = state.holders;
        root.querySelector('[data-input="cap"]').value = state.cap;
        root.querySelector('[data-val="holders"]').textContent = `${state.holders} of ${block.herders}`;
        root.querySelector('[data-val="cap"]').textContent = `${state.cap} cows`;
        root.querySelectorAll("[data-preset]").forEach((b) => {
          const p = block.presets.find((q) => q.id === b.dataset.preset);
          const on = p.mode === state.mode && (p.mode === "cap" ? p.cap === state.cap : p.holders === state.holders);
          b.setAttribute("aria-pressed", String(on));
        });

        const run = simulate(block, state.mode, state.holders, state.cap);
        const { last } = run;
        ref("grass").textContent = pct(last.grass);
        ref("cows").textContent = last.cows;
        ref("income").textContent = money(last.income);
        ref("income").classList.toggle("is-neg", Math.round(last.income) < 0);
        ref("chart").innerHTML = chartSVG(run);
        ref("note").textContent = describe(run);
        ref("herders").innerHTML = run.herders
          .map(
            (h, i) => `<tr>
              <th scope="row"><span class="cm-who">${i + 1}</span> <span class="cm-how">${esc(
                state.mode === "cap" ? block.capRule : h.holds ? block.holdsRule : block.addsRule
              )}${state.mode === "fenced" ? ` · plot at ${pct(h.plot)}` : ""}</span></th>
              <td class="tnum">${h.cows}</td>
              <td class="cm-num tnum${Math.round(h.earned / 1000) < 0 ? " is-neg" : ""}">${total(h.earned)}</td>
            </tr>`
          )
          .join("");
      }

      root.addEventListener("input", (e) => {
        const input = e.target.closest("[data-input]");
        if (input) {
          state[input.dataset.input] = Number(input.value);
          update();
        }
      });
      root.addEventListener("change", (e) => {
        const radio = e.target.closest("[data-mode]");
        if (radio && radio.checked) {
          state.mode = radio.value;
          update();
        }
      });
      root.addEventListener("click", (e) => {
        const btn = e.target.closest("[data-preset]");
        if (!btn) return;
        const p = block.presets.find((q) => q.id === btn.dataset.preset);
        state = { mode: p.mode, holders: p.mode === "cap" ? state.holders : p.holders, cap: p.mode === "cap" ? p.cap : state.cap };
        update();
      });
      const onResize = () => update();
      window.addEventListener("resize", onResize);
      update();
      return () => window.removeEventListener("resize", onResize);
    }
  };
})();
