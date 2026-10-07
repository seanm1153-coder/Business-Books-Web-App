// Judgment calls: the same month of business, with accounting choices you toggle.
// Profit moves with every choice; the change in cash does not.
(function () {
  "use strict";
  const { esc } = window.Marginalia.util;

  const FX = ["revenue", "cogs", "da", "reserve", "writedown", "project"];
  const money = (v) => {
    if (Math.round(v) === 0) return "–";
    const s = Math.abs(Math.round(v)).toLocaleString("en-US");
    return v < 0 ? `(${s})` : s;
  };
  const dollars = (v) => (v < 0 ? "−$" : "$") + Math.abs(Math.round(v)).toLocaleString("en-US");

  function totals(block, choice) {
    const t = Object.fromEntries(FX.map((k) => [k, 0]));
    block.calls.forEach((c) => {
      const fx = c.options.find((o) => o.id === choice[c.id]).fx;
      FX.forEach((k) => (t[k] += fx[k] || 0));
    });
    const b = block.base;
    const revenue = b.revenue + t.revenue;
    const cogs = b.cogs + t.cogs;
    const profit = revenue - cogs - b.opex - t.da - t.reserve - t.writedown - t.project;
    return { t, revenue, cogs, profit };
  }

  // Each call adds independently, so the extremes are the per-call extremes.
  function extremes(block, pick) {
    const choice = {};
    block.calls.forEach((c) => {
      const scored = c.options.map((o) => ({ id: o.id, p: totals(block, { ...defaults(block), [c.id]: o.id }).profit }));
      scored.sort((a, b) => a.p - b.p);
      choice[c.id] = pick === "low" ? scored[0].id : scored[scored.length - 1].id;
    });
    return choice;
  }

  const defaults = (block) => Object.fromEntries(block.calls.map((c) => [c.id, c.start]));

  window.Marginalia.blocks["judgment-calls"] = {
    render(block, ctx) {
      return `<section class="jc" aria-labelledby="${ctx.uid}-h">
        <div class="spot-head">
          <p class="eyebrow">${esc(block.company)} · ${esc(block.period)}</p>
          <h2 class="h2" id="${ctx.uid}-h">${esc(block.title)}</h2>
          <p class="section-dek">${esc(block.intro)}</p>
        </div>
        <div class="jc-presets" role="group" aria-label="Set every call at once">
          <span class="examples-k">Set all</span>
          <button type="button" class="pill" data-preset="low">Most conservative</button>
          <button type="button" class="pill" data-preset="high">Most aggressive</button>
        </div>
        <div class="jc-grid">
          <div class="jc-calls">
            ${block.calls
              .map(
                (c) => `<fieldset class="jc-call">
                  <legend><span class="jc-t">${esc(c.title)}</span><span class="jc-q">${esc(c.question)}</span></legend>
                  <div class="jc-opts">
                    ${c.options
                      .map(
                        (o) => `<label class="jc-opt">
                          <input type="radio" name="${ctx.uid}-${c.id}" id="${ctx.uid}-${c.id}-${o.id}" value="${o.id}" data-call="${c.id}">
                          <span class="jc-opt-t">${esc(o.label)}</span>
                          <span class="jc-tag jc-${o.tag}">${o.tag === "aggressive" ? "Raises profit" : "Lowers profit"}</span>
                        </label>`
                      )
                      .join("")}
                  </div>
                  <p class="jc-note" data-note="${c.id}"></p>
                </fieldset>`
              )
              .join("")}
          </div>
          <aside class="jc-out">
            <div class="tiles">
              <div class="tile"><p class="tile-k">Operating profit</p><p class="tile-v" data-ref="profit"></p></div>
              <div class="tile"><p class="tile-k">Change in cash</p><p class="tile-v" data-ref="cash"></p><p class="tile-sub">The same under every choice.</p></div>
            </div>
            <div class="range" data-ref="range"></div>
            <section class="statement">
              <h3 class="st-t">Income statement</h3>
              <p class="st-sub">${esc(block.period)} · as reported</p>
              <table class="st-table"><tbody data-ref="is"></tbody></table>
            </section>
          </aside>
        </div>
      </section>`;
    },

    mount(root, block) {
      const ref = (n) => root.querySelector(`[data-ref="${n}"]`);
      let choice = defaults(block);
      const low = totals(block, extremes(block, "low")).profit;
      const high = totals(block, extremes(block, "high")).profit;

      function render(changedCall) {
        const now = totals(block, choice);
        block.calls.forEach((c) => {
          const input = root.querySelector(`[data-call="${c.id}"][value="${choice[c.id]}"]`);
          if (input) input.checked = true;
          root.querySelector(`[data-note="${c.id}"]`).textContent = c.options.find((o) => o.id === choice[c.id]).note;
        });
        ref("profit").textContent = dollars(now.profit);
        ref("profit").classList.toggle("is-neg", now.profit < 0);
        ref("cash").textContent = (block.cashChange >= 0 ? "+" : "") + dollars(block.cashChange);

        const pos = (v) => ((v - low) / (high - low || 1)) * 100;
        ref("range").innerHTML = `
          <p class="range-t">Possible operating profit for the same month</p>
          <div class="range-track">
            <span class="range-zero" style="left:${pos(0).toFixed(1)}%" ${low < 0 && high > 0 ? "" : "hidden"}></span>
            <span class="range-mark" style="left:${pos(now.profit).toFixed(1)}%"></span>
          </div>
          <div class="range-ends"><span>${dollars(low)}</span><span>${dollars(high)}</span></div>`;

        const rows = [
          ["Revenue", now.revenue, ""],
          ["Cost of goods sold", -now.cogs, ""],
          ["Gross profit", now.revenue - now.cogs, "sub"],
          ["Operating expenses", -block.base.opex, ""],
          ["Depreciation and amortization", -now.t.da, ""],
          ["Bad-debt reserve", -now.t.reserve, ""],
          ["Inventory write-down", -now.t.writedown, ""],
          ["Software project, expensed", -now.t.project, ""],
          ["Operating profit", now.profit, "total"]
        ];
        const touched = changedCall ? block.calls.find((c) => c.id === changedCall).lines : [];
        ref("is").innerHTML = rows
          .map(
            ([label, v, kind]) => `<tr class="st-row${kind ? ` is-${kind}` : ""}${touched.includes(label) ? " is-changed" : ""}${kind === "total" && v < 0 ? " is-neg" : ""}">
              <th scope="row">${esc(label)}</th><td>${money(v)}</td>
            </tr>`
          )
          .join("");
      }

      root.addEventListener("change", (e) => {
        const input = e.target.closest("[data-call]");
        if (!input) return;
        choice[input.dataset.call] = input.value;
        render(input.dataset.call);
      });
      root.querySelectorAll("[data-preset]").forEach((b) =>
        b.addEventListener("click", () => {
          choice = extremes(block, b.dataset.preset);
          render();
        })
      );
      render();
    }
  };
})();
