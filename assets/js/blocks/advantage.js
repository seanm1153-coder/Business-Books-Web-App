// Advantage: competitive advantage as relative price and relative cost. A rival sells at
// `rival.price` and spends `rival.cost`; the reader sets how much more or less customers pay
// them (a percentage of the rival's price) and how much more or less it costs them to serve
// those customers (a percentage of the rival's cost). Margin = price − cost.
(function () {
  "use strict";
  const { esc } = window.Marginalia.util;

  const money = (v) => `${v < -0.004 ? "−" : ""}$${Math.abs(v).toFixed(2).replace(/\.00$/, "")}`;
  const pct = (v) => `${v > 0 ? "+" : v < 0 ? "−" : ""}${Math.abs(v)}%`;

  window.Marginalia.blocks.advantage = {
    render(block, ctx) {
      const slider = (key, label, min, max, hint) => `<div class="lever">
          <label class="lever-label" for="${ctx.uid}-${key}">
            <span class="lever-t">${esc(label)}</span>
            <span class="lever-v tnum" data-val="${key}"></span>
          </label>
          <input type="range" id="${ctx.uid}-${key}" data-input="${key}" min="${min}" max="${max}" step="1">
          <p class="lever-hint">${esc(hint)}</p>
        </div>`;
      return `<section class="adv" aria-labelledby="${ctx.uid}-h">
        <div class="spot-head">
          <p class="eyebrow">Calculator</p>
          <h2 class="h2" id="${ctx.uid}-h">${esc(block.title)}</h2>
          <p class="section-dek">${esc(block.intro)}</p>
        </div>
        <div class="jc-presets" role="group" aria-label="Examples">
          <span class="examples-k">Try</span>
          ${block.presets.map((p) => `<button type="button" class="pill" data-preset="${esc(p.id)}">${esc(p.label)}</button>`).join("")}
        </div>
        <div class="bt-grid">
          <div class="levers">
            ${slider("price", block.priceLabel, block.priceRange[0], block.priceRange[1], block.priceHint)}
            ${slider("cost", block.costLabel, block.costRange[0], block.costRange[1], block.costHint)}
          </div>
          <div class="bt-right">
            <div class="adv-bars" data-ref="bars"></div>
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
      const { rival } = block;
      const rivalMargin = rival.price - rival.cost;
      let state = { price: block.presets[0].price, cost: block.presets[0].cost };

      function figures() {
        const price = rival.price * (1 + state.price / 100);
        const cost = rival.cost * (1 + state.cost / 100);
        return { price, cost, margin: price - cost };
      }

      function describe(f) {
        const { price: dp, cost: dc } = state;
        const vs = `Your margin is ${money(f.margin)} a sale, against the rival's ${money(rivalMargin)}.`;
        const premium = `customers pay ${Math.abs(dp)}% ${dp >= 0 ? "more" : "less"}`;
        const extra = `${Math.abs(dc)}% ${dc >= 0 ? "more" : "less"}`;
        if (f.margin > rivalMargin + 0.004) {
          if (dp > 0 && dc < 0) return `Both kinds of advantage at once: ${premium} and serving them costs ${extra}. ${vs} It's rare, because what buyers will pay extra for usually costs more to provide.`;
          if (dp > 0) return `A price advantage: ${premium}, and earning that premium raises your cost by ${dc === 0 ? "nothing" : `only ${dc}%`}. ${vs}`;
          return `A cost advantage: serving customers costs you ${extra}${dp < 0 ? `, more than making up for a price ${Math.abs(dp)}% lower` : dp === 0 ? " at the same price" : ""}. ${vs}`;
        }
        if (Math.abs(f.margin - rivalMargin) <= 0.004) return `No advantage: whatever you do differently, price and cost net out to the rival's margin. ${vs}`;
        if (dp > 0) return `A premium that doesn't pay: ${premium}, but serving them costs ${extra}. ${vs} A higher price is an advantage only if it exceeds the extra cost of earning it.`;
        if (dc < 0) return `Savings that don't pay: costs are ${extra}, but the price has fallen further. ${vs}`;
        return `A disadvantage on both sides: a lower or equal price and a higher or equal cost. ${vs}`;
      }

      function update() {
        ["price", "cost"].forEach((k) => {
          root.querySelector(`[data-input="${k}"]`).value = state[k];
          root.querySelector(`[data-val="${k}"]`).textContent = pct(state[k]);
        });
        root.querySelectorAll("[data-preset]").forEach((b) => {
          const p = block.presets.find((q) => q.id === b.dataset.preset);
          b.setAttribute("aria-pressed", String(p.price === state.price && p.cost === state.cost));
        });
        const f = figures();
        const top = rival.price * (1 + block.priceRange[1] / 100);
        const bar = (label, price, cost) => {
          const margin = price - cost;
          return `<div class="adv-row">
            <p class="adv-who">${esc(label)}</p>
            <div class="adv-track">
              <span class="adv-cost" style="width:${((Math.min(cost, price) / top) * 100).toFixed(2)}%"><span>${esc(money(cost))}</span></span>
              ${
                margin > 0
                  ? `<span class="adv-margin" style="width:${((margin / top) * 100).toFixed(2)}%"></span>`
                  : `<span class="adv-loss" style="width:${((-margin / top) * 100).toFixed(2)}%"></span>`
              }
              <span class="adv-mlabel${margin < 0 ? " is-neg" : ""}">${esc(money(margin))}</span>
            </div>
            <p class="adv-price tnum">${esc(money(price))}</p>
          </div>`;
        };
        ref("bars").innerHTML = `
          <div class="adv-key"><span><i class="key adv-k-cost"></i>Cost</span><span><i class="key adv-k-margin"></i>Margin</span><span class="adv-key-r">Price</span></div>
          ${bar(block.rivalLabel, rival.price, rival.cost)}
          ${bar(block.youLabel, f.price, f.cost)}`;
        ref("tiles").innerHTML = [
          ["Your price", money(f.price)],
          ["Your cost", money(f.cost)],
          ["Your margin", money(f.margin), f.margin < 0]
        ]
          .map(([k, v, neg]) => `<div class="tile"><p class="tile-k">${esc(k)}</p><p class="tile-v${neg ? " is-neg" : ""}">${esc(v)}</p></div>`)
          .join("");
        ref("note").textContent = describe(f);
      }

      root.addEventListener("input", (e) => {
        const input = e.target.closest("[data-input]");
        if (!input) return;
        state[input.dataset.input] = Number(input.value);
        update();
      });
      root.addEventListener("click", (e) => {
        const btn = e.target.closest("[data-preset]");
        if (!btn) return;
        const p = block.presets.find((q) => q.id === btn.dataset.preset);
        state = { price: p.price, cost: p.cost };
        update();
      });
      update();
    }
  };
})();
