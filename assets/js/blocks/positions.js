// Positions: a toy market for "compete to be unique, not the best". Customers are spread
// evenly along one line of needs (0 to 100); each buys from the nearest firm, and firms at
// the same distance share them. A firm's margin per customer depends on how far its nearest
// rival stands: margin × (floor + (1 − floor) × min(1, gap ÷ room)). Firms on the same spot
// compete on price alone and keep only the floor.
(function () {
  "use strict";
  const { esc } = window.Marginalia.util;

  const money = (v) => `$${Math.round(v).toLocaleString("en-US")}`;
  const WORDS = ["no", "one", "two", "three", "four", "five", "six"];

  function simulate(block, pos) {
    const steps = 1000;
    const served = pos.map(() => 0);
    for (let i = 0; i < steps; i++) {
      const c = ((i + 0.5) / steps) * 100;
      const d = pos.map((p) => Math.abs(p - c));
      const best = Math.min(...d);
      const near = d.map((x, k) => (Math.abs(x - best) < 1e-9 ? k : -1)).filter((k) => k >= 0);
      near.forEach((k) => (served[k] += block.customers / steps / near.length));
    }
    const firms = pos.map((p, k) => {
      const gap = Math.min(...pos.filter((_, j) => j !== k).map((q) => Math.abs(q - p)));
      const each = block.margin * (block.floor + (1 - block.floor) * Math.min(1, gap / block.room));
      return { name: block.firms[k], p, gap, served: served[k], each, profit: served[k] * each };
    });
    return { firms, total: firms.reduce((a, f) => a + f.profit, 0) };
  }

  window.Marginalia.blocks.positions = {
    render(block, ctx) {
      return `<section class="ps" aria-labelledby="${ctx.uid}-h">
        <div class="spot-head">
          <p class="eyebrow">A toy model</p>
          <h2 class="h2" id="${ctx.uid}-h">${esc(block.title)}</h2>
          <p class="section-dek">${esc(block.intro)}</p>
        </div>
        <div class="jc-presets" role="group" aria-label="Examples">
          <span class="examples-k">Try</span>
          ${block.presets.map((p) => `<button type="button" class="pill" data-preset="${esc(p.id)}">${esc(p.label)}</button>`).join("")}
        </div>
        <div class="bt-grid">
          <div class="levers">
            ${block.firms
              .map(
                (f, k) => `<div class="lever">
                  <label class="lever-label" for="${ctx.uid}-f${k}">
                    <span class="lever-t">${esc(f)}</span>
                    <span class="lever-v tnum" data-val="${k}"></span>
                  </label>
                  <input type="range" id="${ctx.uid}-f${k}" data-firm="${k}" min="0" max="100" step="5">
                </div>`
              )
              .join("")}
            <p class="lever-hint">${esc(block.hint)}</p>
          </div>
          <div class="bt-right">
            <div class="ps-market" data-ref="market" aria-hidden="true"></div>
            <div class="ps-ends"><span>${esc(block.lowLabel)}</span><span>${esc(block.highLabel)}</span></div>
            <table class="cm-table ps-table">
              <caption class="visually-hidden">Each firm's customers and profit</caption>
              <thead><tr><th scope="col">Firm</th><th scope="col" class="cm-num">Customers</th><th scope="col" class="cm-num">Margin each</th><th scope="col" class="cm-num">Profit</th></tr></thead>
              <tbody data-ref="rows"></tbody>
              <tfoot><tr><th scope="row" colspan="3">The industry</th><td class="cm-num tnum" data-ref="total"></td></tr></tfoot>
            </table>
            <div class="happened" aria-live="polite">
              <p class="eyebrow">What's happening</p>
              <p class="happened-t" data-ref="note"></p>
            </div>
          </div>
        </div>
        <p class="fin-foot">${esc(block.foot)}</p>
      </section>`;
    },

    mount(root, block) {
      const ref = (n) => root.querySelector(`[data-ref="${n}"]`);
      let pos = block.presets[0].positions.slice();
      const spread = simulate(block, block.presets.find((p) => p.id === block.spreadPreset).positions);

      function describe(run) {
        const n = run.firms.length;
        const letter = (f) => f.name.slice(-1);
        const list = (a) => (a.length < 2 ? a.join("") : `${a.slice(0, -1).join(", ")} and ${a[a.length - 1]}`);
        const total = `The industry earns ${money(run.total)}`;
        const groups = [];
        run.firms
          .filter((f) => f.gap === 0)
          .forEach((f) => {
            const g = groups.find((x) => x[0].p === f.p);
            if (g) g.push(f);
            else groups.push([f]);
          });
        if (groups.length === 1 && groups[0].length === n)
          return `All ${WORDS[n]} firms chase the same idea of the best, serve the same customers in the same way, and compete on price. ${total}, against ${money(spread.total)} for the same firms spread out.`;
        const apart = run.firms.filter((f) => f.gap >= block.room);
        if (apart.length === n) return `Every firm stands apart and serves the customers it suits best, so no one is forced into a price war. ${total}.`;
        const parts = [];
        if (groups.length) {
          const where = groups.map((g, i) => `${list(g.map(letter))}${i ? "" : " crowd together"} at ${g[0].p}`).join(", and ");
          parts.push(`Firms ${where}; crowded firms fight on price and keep ${money(groups[0][0].each)} a customer`);
        }
        if (apart.length) {
          const best = apart.reduce((a, f) => (f.profit > a.profit ? f : a));
          parts.push(`${best.name}, standing apart, keeps ${money(best.each)} a customer and earns ${money(best.profit)}`);
        }
        return `${parts.length ? `${parts.join(". ")}. ` : ""}${total}, against ${money(spread.total)} with all ${WORDS[n]} spread out.`;
      }

      function update() {
        pos.forEach((p, k) => {
          root.querySelector(`[data-firm="${k}"]`).value = p;
          root.querySelector(`[data-val="${k}"]`).textContent = p;
        });
        root.querySelectorAll("[data-preset]").forEach((b) => {
          const pr = block.presets.find((q) => q.id === b.dataset.preset);
          b.setAttribute("aria-pressed", String(pr.positions.every((p, k) => p === pos[k])));
        });
        const run = simulate(block, pos);
        // The market: who serves each stretch of the line, and where each firm stands.
        const order = run.firms.map((f, k) => ({ ...f, k })).sort((a, b) => a.p - b.p || a.k - b.k);
        const spots = [...new Set(order.map((f) => f.p))];
        const bounds = spots.map((p, i) => [i ? (spots[i - 1] + p) / 2 : 0, i < spots.length - 1 ? (p + spots[i + 1]) / 2 : 100]);
        const stack = {};
        ref("market").innerHTML =
          bounds.map(([a, b], i) => `<span class="ps-zone ${i % 2 ? "is-alt" : ""}" style="left:${a}%;width:${b - a}%"></span>`).join("") +
          order
            .map((f) => {
              const level = (stack[f.p] = (stack[f.p] || 0) + 1) - 1;
              return `<span class="ps-firm${f.gap === 0 ? " is-crowded" : ""}" style="left:${f.p}%;top:${0.4 + level * 1.7}rem">${esc(f.name.slice(-1))}</span>`;
            })
            .join("");
        ref("market").style.height = `${Math.max(3.4, 0.4 + Math.max(...Object.values(stack)) * 1.7 + 0.6)}rem`;
        ref("rows").innerHTML = run.firms
          .map(
            (f) => `<tr>
              <th scope="row">${esc(f.name)}</th>
              <td class="cm-num tnum">${Math.round(f.served)}</td>
              <td class="cm-num tnum">${money(f.each)}</td>
              <td class="cm-num tnum">${money(f.profit)}</td>
            </tr>`
          )
          .join("");
        ref("total").textContent = money(run.total);
        ref("note").textContent = describe(run);
      }

      root.addEventListener("input", (e) => {
        const input = e.target.closest("[data-firm]");
        if (!input) return;
        pos[Number(input.dataset.firm)] = Number(input.value);
        update();
      });
      root.addEventListener("click", (e) => {
        const btn = e.target.closest("[data-preset]");
        if (!btn) return;
        pos = block.presets.find((p) => p.id === btn.dataset.preset).positions.slice();
        update();
      });
      update();
    }
  };
})();
