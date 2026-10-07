// Buying growth: toggle acquisitions and watch sales and owners' value move apart.
// A deal's value created = what the target is worth on its own + gains from
// combining − the price paid. Sales simply add up.
(function () {
  "use strict";
  const { esc } = window.Marginalia.util;

  const created = (d) => d.alone + d.gains - d.price;
  const pctChange = (now, base) => Math.round(((now - base) / base) * 100);
  const signed = (v) => (v > 0 ? "+" : v < 0 ? "−" : "") + Math.abs(v);
  const money = (block, v) => `${v < 0 ? "−" : ""}${block.unit.before}${Math.abs(v)}${block.unit.after}`;
  const signedMoney = (block, v) => (v > 0 ? "+" : "") + money(block, v);

  window.Marginalia.blocks.deals = {
    render(block, ctx) {
      const m = (v) => money(block, v);
      return `<section class="deals" aria-labelledby="${ctx.uid}-h">
        <div class="spot-head">
          <p class="eyebrow">Exercise</p>
          <h2 class="h2" id="${ctx.uid}-h">${esc(block.title)}</h2>
          <p class="section-dek">${esc(block.intro)}</p>
        </div>
        <div class="jc-presets" role="group" aria-label="Presets">
          <span class="examples-k">Try</span>
          <button type="button" class="pill" data-preset="all">Buy them all</button>
          <button type="button" class="pill" data-preset="none">Buy nothing</button>
        </div>
        <div class="chain-grid">
          <ul class="deal-list" role="list">
            ${block.deals
              .map(
                (d) => `<li class="deal" data-deal-row="${esc(d.id)}">
                  <label class="deal-pick">
                    <input type="checkbox" data-deal="${esc(d.id)}">
                    <span class="deal-name">${esc(d.name)}</span>
                    <span class="deal-what">${esc(d.what)}</span>
                    <span class="deal-terms">Adds ${esc(m(d.sales))} of sales · Price ${esc(m(d.price))}</span>
                  </label>
                  <div class="deal-math" data-math="${esc(d.id)}" hidden>
                    <dl class="deal-sum">
                      <div><dt>Worth on its own</dt><dd class="tnum">${esc(m(d.alone))}</dd></div>
                      <div><dt>Gains from combining</dt><dd class="tnum">+ ${esc(m(d.gains))}</dd></div>
                      <div><dt>Price paid</dt><dd class="tnum">− ${esc(m(d.price))}</dd></div>
                      <div class="deal-net${created(d) < 0 ? " is-neg" : ""}"><dt>Value created</dt><dd class="tnum">${esc(signedMoney(block, created(d)))}</dd></div>
                    </dl>
                    <p class="deal-why">${esc(d.why)}</p>
                  </div>
                </li>`
              )
              .join("")}
          </ul>
          <div class="chain-out">
            <div class="tiles">
              <div class="tile"><p class="tile-k">Sales</p><p class="tile-v" data-ref="sales"></p><p class="tile-sub" data-ref="sales-sub"></p></div>
              <div class="tile"><p class="tile-k">${esc(block.valueLabel)}</p><p class="tile-v" data-ref="value"></p><p class="tile-sub" data-ref="value-sub"></p></div>
            </div>
            <div class="happened" aria-live="polite">
              <p class="eyebrow">What's happening</p>
              <p class="happened-t" data-ref="note"></p>
            </div>
            <p class="fin-foot">${esc(block.foot)}</p>
          </div>
        </div>
        <div class="fin-dock">
          <p>Sales <span data-ref="dock-sales"></span></p>
          <p>${esc(block.valueLabel)} <span data-ref="dock-value"></span></p>
        </div>
      </section>`;
    },

    mount(root, block) {
      const ref = (n) => root.querySelector(`[data-ref="${n}"]`);
      const m = (v) => money(block, v);
      let bought = new Set();

      function explain(deals, sales, value) {
        if (!deals.length) return block.emptyNote;
        const s = pctChange(sales, block.base.sales);
        const v = pctChange(value, block.base.value);
        const losers = deals.filter((d) => created(d) < 0).length;
        let note = `Sales are up ${s}% and ${block.valueNoun} is ${v > 0 ? `up ${v}%` : v < 0 ? `down ${-v}%` : "unchanged"}.`;
        if (losers === deals.length) note += ` Every deal you made added sales, and every one cost more than it gained. ${block.loseNote}`;
        else if (losers) note += ` Every deal added sales, but ${losers} of ${deals.length} paid more than they gained. ${block.loseNote}`;
        else note += ` ${block.winNote}`;
        return note;
      }

      function render() {
        const deals = block.deals.filter((d) => bought.has(d.id));
        const sales = block.base.sales + deals.reduce((a, d) => a + d.sales, 0);
        const value = block.base.value + deals.reduce((a, d) => a + created(d), 0);
        block.deals.forEach((d) => {
          const on = bought.has(d.id);
          root.querySelector(`[data-deal="${d.id}"]`).checked = on;
          root.querySelector(`[data-math="${d.id}"]`).hidden = !on;
          root.querySelector(`[data-deal-row="${d.id}"]`).classList.toggle("is-bought", on);
        });
        const s = pctChange(sales, block.base.sales);
        const v = pctChange(value, block.base.value);
        ref("sales").textContent = m(sales);
        ref("value").textContent = m(value);
        const start = `Where ${block.company} starts`;
        ref("sales-sub").textContent = deals.length ? `${signed(s)}% since the start` : start;
        ref("value-sub").textContent = deals.length ? `${signed(v)}% since the start` : start;
        ref("value-sub").classList.toggle("is-down", v < 0);
        ref("dock-sales").textContent = m(sales);
        ref("dock-value").textContent = m(value);
        ref("note").textContent = explain(deals, sales, value);
      }

      root.addEventListener("change", (e) => {
        const box = e.target.closest("[data-deal]");
        if (!box) return;
        if (box.checked) bought.add(box.dataset.deal);
        else bought.delete(box.dataset.deal);
        render();
      });
      root.addEventListener("click", (e) => {
        const btn = e.target.closest("[data-preset]");
        if (!btn) return;
        bought = new Set(btn.dataset.preset === "all" ? block.deals.map((d) => d.id) : []);
        render();
      });
      render();
    }
  };
})();
