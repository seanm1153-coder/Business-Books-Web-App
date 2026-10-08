// Bathtub: one stock, one inflow, one outflow. Run the clock, move the faucet and the
// drain, and watch the level trace a behavior-over-time graph. The stock changes only
// through its flows: level(t + dt) = level(t) + (inflow − outflow) × dt.
(function () {
  "use strict";
  const { esc } = window.Marginalia.util;

  const SPEED = 2.5; // simulated minutes per second while running
  const STEP = 0.05; // integration step, in minutes
  const SAMPLE = 0.25; // history resolution, in minutes
  const fmt = (v) => (Math.round(v * 10) / 10).toString();

  window.Marginalia.blocks.bathtub = {
    render(block, ctx) {
      const slider = (key, label, hint) => `<div class="lever">
          <label class="lever-label" for="${ctx.uid}-${key}">
            <span class="lever-t">${esc(label)}</span>
            <span class="lever-v tnum" data-val="${key}"></span>
          </label>
          <input type="range" id="${ctx.uid}-${key}" data-flow="${key}" min="0" max="${block.maxFlow}" step="0.5">
          <p class="lever-hint">${esc(hint)}</p>
        </div>`;
      return `<section class="bt" aria-labelledby="${ctx.uid}-h">
        <div class="spot-head">
          <p class="eyebrow">Simulator</p>
          <h2 class="h2" id="${ctx.uid}-h">${esc(block.title)}</h2>
          <p class="section-dek">${esc(block.intro)}</p>
        </div>
        <div class="jc-presets" role="group" aria-label="Scenarios">
          <span class="examples-k">Try</span>
          ${block.scenarios.map((s) => `<button type="button" class="pill" data-scenario="${esc(s.id)}">${esc(s.label)}</button>`).join("")}
        </div>
        <div class="bt-grid">
          <div class="bt-left">
            <svg class="bt-tub" viewBox="0 0 260 196" aria-hidden="true">
              <path class="bt-pipe" d="M 14 18 L 74 18 L 74 34"></path>
              <rect class="bt-stream" data-ref="in-stream" x="70" y="34" width="0" height="0"></rect>
              <rect class="bt-wall" x="38" y="48" width="184" height="114" rx="10"></rect>
              <rect class="bt-water" data-ref="water" x="41" y="51" width="178" height="0" rx="7"></rect>
              <line class="bt-surface" data-ref="surface" x1="41" x2="219" y1="159" y2="159"></line>
              <path class="bt-pipe" d="M 196 162 L 196 176"></path>
              <rect class="bt-stream" data-ref="out-stream" x="194" y="176" width="0" height="18"></rect>
              <text class="bt-label" x="82" y="22">Inflow</text>
              <text class="bt-label" x="206" y="186">Outflow</text>
            </svg>
            <div class="levers">
              ${slider("inflow", block.inflowLabel, block.inflowHint)}
              ${slider("outflow", block.outflowLabel, block.outflowHint)}
            </div>
            <div class="log-actions">
              <button type="button" class="btn-primary" data-ref="run">Run</button>
              <button type="button" class="pill" data-ref="jump">+5 min</button>
              <button type="button" class="pill" data-ref="reset">Reset</button>
            </div>
          </div>
          <div class="bt-right">
            <div class="tiles">
              <div class="tile"><p class="tile-k">${esc(block.stockLabel)}</p><p class="tile-v" data-ref="level"></p></div>
              <div class="tile"><p class="tile-k">Net flow</p><p class="tile-v" data-ref="net"></p><p class="tile-sub">${esc(block.unit)} per minute, in minus out</p></div>
            </div>
            <figure class="bt-chart-fig">
              <div class="bt-chart" data-ref="chart"></div>
              <figcaption class="bt-cap">${esc(block.chartCaption)} <span class="tnum" data-ref="time"></span></figcaption>
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
      const inputs = { inflow: root.querySelector('[data-flow="inflow"]'), outflow: root.querySelector('[data-flow="outflow"]') };
      const cap = block.capacity;
      const u = block.unit;
      let s; // simulation state
      let frame = 0;
      let last = 0;
      let noteKey = "";

      function load(sc) {
        stop();
        s = {
          t: 0,
          level: sc.start,
          inflow: sc.inflow,
          outflow: sc.outflow,
          ramp: sc.ramp || null,
          history: [[0, sc.start]]
        };
        noteKey = "";
        render(true);
      }

      // A scripted ramp moves the faucet on its own until the reader takes over.
      function inflowAt(t) {
        const r = s.ramp;
        if (!r) return s.inflow;
        return r.from + (r.to - r.from) * Math.min(1, t / r.over);
      }

      function advance(minutes) {
        const end = Math.min(block.minutes, s.t + minutes);
        while (s.t < end - 1e-9) {
          const dt = Math.min(STEP, end - s.t);
          s.inflow = inflowAt(s.t);
          s.level = Math.max(0, Math.min(cap, s.level + (s.inflow - s.outflow) * dt));
          s.t += dt;
          const lastSample = s.history[s.history.length - 1][0];
          if (s.t - lastSample >= SAMPLE - 1e-9) s.history.push([s.t, s.level]);
        }
        if (s.t >= block.minutes - 1e-9) stop();
      }

      function tick(now) {
        const dt = Math.min(0.1, ((now - last) / 1000) * SPEED);
        last = now;
        advance(dt);
        render(false);
        if (frame) frame = requestAnimationFrame(tick);
      }

      function start() {
        if (s.t >= block.minutes - 1e-9) return;
        last = performance.now();
        frame = requestAnimationFrame(tick);
        ref("run").textContent = "Pause";
      }

      function stop() {
        if (frame) cancelAnimationFrame(frame);
        frame = 0;
        const run = ref("run");
        if (run) run.textContent = "Run";
      }

      function chartSVG() {
        const box = ref("chart");
        const W = Math.max(260, box.clientWidth || 480);
        const H = 190;
        const m = { t: 10, r: 12, b: 26, l: 40 };
        const w = W - m.l - m.r;
        const h = H - m.t - m.b;
        const x = (t) => m.l + (t / block.minutes) * w;
        const y = (v) => m.t + h - (v / cap) * h;
        let grid = "";
        for (let v = 0; v <= cap; v += cap / 4) {
          grid += `<line class="ch-grid" x1="${m.l}" x2="${m.l + w}" y1="${y(v).toFixed(1)}" y2="${y(v).toFixed(1)}"/>
            <text class="ch-tick" x="${m.l - 6}" y="${(y(v) + 3.5).toFixed(1)}" text-anchor="end">${v}</text>`;
        }
        for (let t = 0; t <= block.minutes; t += 5) {
          grid += `<text class="ch-tick" x="${x(t).toFixed(1)}" y="${H - 8}" text-anchor="middle">${t}</text>`;
        }
        const pts = s.history.concat([[s.t, s.level]]).map(([t, v]) => `${x(t).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
        return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="Water in the tub over ${block.minutes} minutes: now ${fmt(s.level)} ${u} at minute ${fmt(s.t)}.">
          ${grid}
          <polyline class="bt-line" points="${pts}"/>
          <circle class="bt-dot" cx="${x(s.t).toFixed(1)}" cy="${y(s.level).toFixed(1)}" r="4"/>
        </svg>`;
      }

      function describe() {
        const net = s.inflow - s.outflow;
        const closing = s.ramp && s.t < s.ramp.over && s.ramp.to < s.ramp.from;
        let key;
        let text;
        if (s.level >= cap - 1e-6 && net > 0) {
          key = "full";
          text = `The tub is full and overflowing: the extra ${fmt(net)} ${u} a minute ends up on the floor.`;
        } else if (s.level <= 1e-6 && net < 0) {
          key = "empty";
          text = "The tub is empty. The drain can't take out water that isn't there.";
        } else if (Math.abs(net) < 1e-6) {
          key = "steady";
          text = `Inflow equals outflow, so the level holds still. Water is still moving through the tub at ${fmt(s.inflow)} ${u} a minute: a dynamic equilibrium.`;
        } else if (net > 0) {
          key = closing ? "rising-closing" : "rising";
          text = closing
            ? `The faucet is closing, yet the level keeps rising: inflow (${fmt(s.inflow)}) is still bigger than outflow (${fmt(s.outflow)}). A stock responds to the difference between its flows, not to which way they're moving.`
            : `Inflow is bigger than outflow, so the level rises ${fmt(net)} ${u} every minute.`;
        } else {
          key = "falling";
          text = `Outflow is bigger than inflow, so the level falls ${fmt(-net)} ${u} every minute.`;
        }
        if (s.t >= block.minutes - 1e-9) {
          key += "-done";
          text += " The chart is full; reset to run it again.";
        }
        return { key, text };
      }

      function render(force) {
        Object.entries(inputs).forEach(([k, el]) => {
          el.value = s[k];
          root.querySelector(`[data-val="${k}"]`).textContent = `${fmt(s[k])} ${u}/min`;
        });
        const net = s.inflow - s.outflow;
        ref("level").textContent = `${fmt(s.level)} ${u}`;
        ref("net").textContent = `${net > 0 ? "+" : net < 0 ? "−" : ""}${fmt(Math.abs(net))}`;
        ref("time").textContent = `Minute ${fmt(s.t)} of ${block.minutes}.`;

        // Tub drawing: water height and stream widths scale with level and flows.
        const fill = (s.level / cap) * 108;
        ref("water").setAttribute("y", (159 - fill).toFixed(1));
        ref("water").setAttribute("height", fill.toFixed(1));
        ref("surface").setAttribute("y1", (159 - fill).toFixed(1));
        ref("surface").setAttribute("y2", (159 - fill).toFixed(1));
        ref("surface").style.opacity = s.level > 0.5 ? 1 : 0;
        const inW = (s.inflow / block.maxFlow) * 10;
        const inS = ref("in-stream");
        inS.setAttribute("width", inW.toFixed(1));
        inS.setAttribute("x", (74 - inW / 2).toFixed(1));
        inS.setAttribute("height", Math.max(0, 159 - fill - 34).toFixed(1));
        const outW = s.level > 0 ? (s.outflow / block.maxFlow) * 10 : 0;
        const outS = ref("out-stream");
        outS.setAttribute("width", outW.toFixed(1));
        outS.setAttribute("x", (196 - outW / 2).toFixed(1));

        ref("chart").innerHTML = chartSVG();
        const d = describe();
        if (force || d.key !== noteKey) {
          noteKey = d.key;
          ref("note").textContent = d.text;
        }
      }

      Object.entries(inputs).forEach(([k, el]) =>
        el.addEventListener("input", () => {
          s[k] = Number(el.value);
          if (k === "inflow") s.ramp = null; // the reader has taken over the faucet
          render(false);
        })
      );
      root.addEventListener("click", (e) => {
        const sc = e.target.closest("[data-scenario]");
        if (sc) return load(block.scenarios.find((x) => x.id === sc.dataset.scenario));
        const btn = e.target.closest("[data-ref]");
        if (!btn) return;
        if (btn.dataset.ref === "run") {
          if (frame) stop();
          else start();
        } else if (btn.dataset.ref === "jump") {
          advance(5);
          render(false);
        } else if (btn.dataset.ref === "reset") {
          load(block.initial);
        }
      });
      const onResize = () => render(false);
      window.addEventListener("resize", onResize);
      load(block.initial);
      return () => {
        stop();
        window.removeEventListener("resize", onResize);
      };
    }
  };
})();
