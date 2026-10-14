// The layers of profit: toggle business moves and see which of gross, operating and
// net profit each one reaches. Every move changes one or more income statement lines;
// the block works out the layers and margins.
(function () {
  "use strict";
  const { esc } = window.Marginalia.util;

  const KEYS = ["revenue", "cogs", "sm", "ga", "rd", "dep", "interest", "other"];
  const LAYERS = [
    ["gross", "gross profit", "Gross"],
    ["operating", "operating profit", "Operating"],
    ["net", "net profit", "Net"]
  ];

  const money = (v) => {
    if (Math.round(v) === 0) return "–";
    const s = Math.abs(Math.round(v)).toLocaleString("en-US");
    return v < 0 ? `(${s})` : s;
  };
  const pct = (v) => (v * 100).toFixed(1) + "%";

  function statement(block, on) {
    const t = { ...block.base };
    block.moves.forEach((m) => {
      if (!on.has(m.id)) return;
      KEYS.forEach((k) => (t[k] = (t[k] || 0) + (m.fx[k] || 0)));
    });
    const gross = t.revenue - t.cogs;
    const operating = gross - t.sm - t.ga - t.rd - t.dep;
    const pretax = operating - t.interest + (t.other || 0);
    const tax = Math.max(0, pretax * block.taxRate);
    const net = pretax - tax;
    return { ...t, gross, operating, pretax, tax, net };
  }

  // Which layers a move changes, judged against the statement without it.
  function reach(block, on, id) {
    const without = new Set(on);
    without.delete(id);
    const a = statement(block, without);
    const b = statement(block, new Set([...without, id]));
    return LAYERS.filter(([k]) => Math.round(a[k]) !== Math.round(b[k])).map(([, label]) => label);
  }

  const listWords = (xs) => (xs.length === 1 ? `${xs[0]} only` : `${xs.slice(0, -1).join(", ")} and ${xs[xs.length - 1]}`);

  window.Marginalia.blocks["profit-layers"] = {
    render(block, ctx) {
      return `<section class="pl" aria-labelledby="${ctx.uid}-h">
        <div class="spot-head">
          <p class="eyebrow">${esc(block.company)} · ${esc(block.period)}</p>
          <h2 class="h2" id="${ctx.uid}-h">${esc(block.title)}</h2>
          <p class="section-dek">${esc(block.intro)}</p>
        </div>
        <div class="pl-grid">
          <div class="pl-moves">
            <div class="moves" role="group" aria-label="Business moves">
              ${block.moves
                .map(
                  (m) => `<button type="button" class="move pl-move" data-move="${esc(m.id)}" aria-pressed="false">
                    <span class="move-t">${esc(m.label)}</span>
                    <span class="move-a">${esc(m.amount)}</span>
                    <span class="move-why" data-reach="${esc(m.id)}"></span>
                  </button>`
                )
                .join("")}
            </div>
            <div class="log-actions">
              <button type="button" class="pill" data-ref="reset">Start over</button>
            </div>
          </div>
          <div class="pl-out">
            <div class="tiles tiles-3">
              ${LAYERS.map(
                ([k, , short]) => `<div class="tile"><p class="tile-k">${short} margin</p><p class="tile-v" data-ref="${k}"></p><p class="tile-sub" data-ref="${k}-sub"></p></div>`
              ).join("")}
            </div>
            <div class="happened" aria-live="polite">
              <p class="eyebrow">What just happened</p>
              <p class="happened-t" data-ref="note"></p>
            </div>
            <section class="statement">
              <h3 class="st-t">Income statement</h3>
              <p class="st-sub">${esc(block.period)} · in dollars</p>
              <table class="st-table"><tbody data-ref="is"></tbody></table>
              <p class="st-foot">${esc(block.foot)}</p>
            </section>
          </div>
        </div>
        <div class="fin-dock">
          ${LAYERS.map(([k, , short]) => `<p>${short} <span data-ref="dock-${k}"></span></p>`).join("")}
        </div>
      </section>`;
    },

    mount(root, block) {
      const ref = (n) => root.querySelector(`[data-ref="${n}"]`);
      const start = statement(block, new Set());
      let on = new Set();
      let note = block.startNote;
      let touched = [];

      function render() {
        const s = statement(block, on);
        LAYERS.forEach(([k]) => {
          const margin = s[k] / s.revenue;
          const diff = (margin - start[k] / start.revenue) * 100;
          ref(k).textContent = pct(margin);
          ref(`${k}-sub`).textContent =
            Math.abs(diff) < 0.05 ? (on.size ? "Unchanged" : "Where the year started") : `${diff > 0 ? "+" : "−"}${Math.abs(diff).toFixed(1)} points`;
          ref(`dock-${k}`).textContent = pct(margin);
        });
        block.moves.forEach((m) => {
          const btn = root.querySelector(`[data-move="${m.id}"]`);
          const pressed = on.has(m.id);
          btn.setAttribute("aria-pressed", String(pressed));
          root.querySelector(`[data-reach="${m.id}"]`).textContent = pressed ? `Reaches ${listWords(reach(block, on, m.id))}` : "";
        });
        const rows = [
          ["revenue", "Revenue", s.revenue, ""],
          ["cogs", "Cost of goods sold", -s.cogs, ""],
          ["gross", "Gross profit", s.gross, "sub"],
          ["sm", "Sales and marketing", -s.sm, ""],
          ["ga", "General and administrative", -s.ga, ""],
          ["rd", "Research and development", -s.rd, ""],
          ["dep", "Depreciation", -s.dep, ""],
          ["operating", "Operating profit", s.operating, "sub"],
          ["interest", "Interest", -s.interest, ""],
          ["other", block.otherLabel, s.other || 0, ""],
          ["pretax", "Profit before tax", s.pretax, "sub"],
          ["tax", `Tax at ${Math.round(block.taxRate * 100)}%`, -s.tax, ""],
          ["net", "Net profit", s.net, "total"]
        ];
        ref("is").innerHTML = rows
          .map(
            ([k, label, v, kind]) => `<tr class="st-row${kind ? ` is-${kind}` : ""}${touched.includes(k) ? " is-changed" : ""}">
              <th scope="row">${esc(label)}</th><td>${money(v)}</td>
            </tr>`
          )
          .join("");
        ref("note").textContent = note;
      }

      root.addEventListener("click", (e) => {
        const btn = e.target.closest("[data-move]");
        if (!btn) return;
        const m = block.moves.find((x) => x.id === btn.dataset.move);
        const before = statement(block, on);
        if (on.has(m.id)) {
          on.delete(m.id);
          note = `Undone: ${m.label.charAt(0).toLowerCase()}${m.label.slice(1)}.`;
        } else {
          on.add(m.id);
          note = m.note;
        }
        const after = statement(block, on);
        touched = [...KEYS, "gross", "operating", "pretax", "tax", "net"].filter((k) => Math.round(before[k] || 0) !== Math.round(after[k] || 0));
        render();
      });
      ref("reset").addEventListener("click", () => {
        on = new Set();
        note = block.startNote;
        touched = [];
        render();
      });
      render();
    }
  };
})();
