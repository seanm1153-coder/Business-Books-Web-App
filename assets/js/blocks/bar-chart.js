// Bar chart: a ranked horizontal bar chart of real figures, with an optional reference line
// (an average), values written only on the rows the text discusses (`show: true`), a
// tooltip on hover and keyboard focus, and the full table one click away.
// Block: { title, intro?, rows: [{ label, value, show?, text? }], max, ticks, unit, decimals,
// ref?: { value, label }, labelHead, valueHead, source (trusted HTML) }.
(function () {
  "use strict";
  const { esc, figHead, resolveLinks } = window.Marginalia.util;

  window.Marginalia.blocks["bar-chart"] = {
    render(block, ctx) {
      const fmt = (v) => `${v.toFixed(block.decimals ?? 0)}${block.unit || ""}`;
      // A row's own `text` replaces the rounded value, for values too small to round well.
      const show = (r) => r.text || fmt(r.value);
      const x = (v) => `${((v / block.max) * 100).toFixed(2)}%`;
      const rows = block.rows
        .map(
          (r, i) => `<li class="bc-row${r.show ? " is-shown" : ""}" data-i="${i}" tabindex="${i ? -1 : 0}" aria-label="${esc(r.label)}: ${esc(show(r))}">
            <span class="bc-l" aria-hidden="true">${esc(r.label)}</span>
            <span class="bc-track" aria-hidden="true">
              <span class="bc-bar" style="--w: ${x(r.value)}"></span>
              ${r.show ? `<span class="bc-v tnum${r.value / block.max > 0.6 ? " is-in" : ""}" style="--w: ${x(r.value)}">${esc(show(r))}</span>` : ""}
            </span>
          </li>`
        )
        .join("");
      const ref = block.ref;
      return `<section class="bc" aria-labelledby="${ctx.uid}-h">
        ${figHead(block, ctx)}
        <figure class="bc-fig">
          <div class="bc-plot">
            ${ref ? `<div class="bc-top" aria-hidden="true"><span class="bc-ref-k" style="--x: ${x(ref.value)}">${esc(ref.label)} <span class="tnum">${esc(fmt(ref.value))}</span></span></div>` : ""}
            <div class="bc-area">
              <div class="bc-grid" aria-hidden="true">
                ${block.ticks.map((t) => `<span class="bc-gl" style="--x: ${x(t)}"></span>`).join("")}
                ${ref ? `<span class="bc-ref" style="--x: ${x(ref.value)}"></span>` : ""}
              </div>
              <ol class="bc-rows" role="list" aria-label="${esc(block.title)}">${rows}</ol>
            </div>
            <div class="bc-axis" aria-hidden="true">
              ${block.ticks.map((t) => `<span class="bc-tick tnum" style="--x: ${x(t)}">${esc(`${t}${block.unit || ""}`)}</span>`).join("")}
            </div>
            <div class="bc-tip" hidden><strong class="bc-tip-v tnum"></strong><span class="bc-tip-l"></span></div>
          </div>
          ${block.source ? `<figcaption class="fig-foot">${resolveLinks(block.source, ctx)}</figcaption>` : ""}
        </figure>
        <details class="bc-table">
          <summary>Show the figures as a table</summary>
          <table>
            <thead><tr><th scope="col">${esc(block.labelHead)}</th><th scope="col" class="num">${esc(block.valueHead)}</th></tr></thead>
            <tbody>${block.rows.map((r) => `<tr><th scope="row">${esc(r.label)}</th><td class="num tnum">${esc(show(r))}</td></tr>`).join("")}</tbody>
          </table>
        </details>
      </section>`;
    },

    mount(root, block) {
      const plot = root.querySelector(".bc-plot");
      const tip = root.querySelector(".bc-tip");
      const rows = Array.from(root.querySelectorAll(".bc-row"));
      const fmt = (v) => `${v.toFixed(block.decimals ?? 0)}${block.unit || ""}`;
      let hot = null;

      function show(row) {
        if (hot) hot.classList.remove("is-hot");
        hot = row;
        if (!row) {
          tip.hidden = true;
          return;
        }
        row.classList.add("is-hot");
        const r = block.rows[Number(row.dataset.i)];
        tip.querySelector(".bc-tip-v").textContent = r.text || fmt(r.value);
        tip.querySelector(".bc-tip-l").textContent = r.label;
        tip.hidden = false;
        // Beside the end of the bar, kept inside the plot.
        const box = plot.getBoundingClientRect();
        const bar = row.querySelector(".bc-bar").getBoundingClientRect();
        const left = Math.min(bar.right - box.left + 10, box.width - tip.offsetWidth);
        tip.style.transform = `translate(${Math.max(0, left)}px, ${bar.top - box.top + bar.height / 2 - tip.offsetHeight / 2}px)`;
      }

      root.addEventListener("pointerover", (e) => {
        const row = e.target.closest(".bc-row");
        if (row) show(row);
      });
      root.querySelector(".bc-rows").addEventListener("pointerleave", () => show(root.querySelector(".bc-row:focus")));
      root.addEventListener("focusin", (e) => {
        const row = e.target.closest(".bc-row");
        if (row) show(row);
      });
      root.addEventListener("focusout", (e) => {
        if (e.target.closest(".bc-row") && !(e.relatedTarget && e.relatedTarget.closest && e.relatedTarget.closest(".bc-row"))) show(null);
      });
      // One tab stop for the whole chart; arrow keys move between bars.
      root.addEventListener("keydown", (e) => {
        const row = e.target.closest(".bc-row");
        if (!row) return;
        const i = rows.indexOf(row);
        const to = { ArrowDown: i + 1, ArrowUp: i - 1, Home: 0, End: rows.length - 1 }[e.key];
        if (to === undefined || !rows[to]) return;
        e.preventDefault();
        row.tabIndex = -1;
        rows[to].tabIndex = 0;
        rows[to].focus();
      });
    }
  };
})();
