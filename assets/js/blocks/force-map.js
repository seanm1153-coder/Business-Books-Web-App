// Force map: a hub and four spokes, laid out as Porter draws the five forces, with each box
// listing what makes that force strong and where it hits the P&L. Generic enough for any
// framework of that shape. Positions: center, top, left, right, bottom; each
// { name, when?, hits?: ["Price ↓", …], lists: [{ k?, items: [html] }] }. The top and bottom
// boxes run the full width with their lists in columns, so the long lists don't leave empty
// corners. Optional `notes` (trusted HTML) sit in a row underneath.
(function () {
  "use strict";
  const { esc, figHead, resolveLinks } = window.Marginalia.util;

  const POS = ["top", "left", "center", "right", "bottom"];
  const ARROW = { top: "↓", left: "→", right: "←", bottom: "↑" };

  window.Marginalia.blocks["force-map"] = {
    render(block, ctx) {
      const force = (pos) => {
        const f = block[pos];
        return `<section class="fm-force fm-${pos}" aria-labelledby="${ctx.uid}-${pos}">
          <div class="fm-head">
            <h3 class="fm-name" id="${ctx.uid}-${pos}">${esc(f.name)}</h3>
            ${f.hits ? `<p class="fm-hits">${f.hits.map((h) => `<span class="pl-tag">${esc(h)}</span>`).join("")}</p>` : ""}
            ${f.when ? `<p class="fm-when">${esc(f.when)}</p>` : ""}
          </div>
          <div class="fm-body">
            ${f.lists
              .map(
                (l) => `<div class="fm-group">
                  ${l.k ? `<p class="fm-k">${esc(l.k)}</p>` : ""}
                  <ul class="fm-list">${l.items.map((it) => `<li>${resolveLinks(it, ctx)}</li>`).join("")}</ul>
                </div>`
              )
              .join("")}
          </div>
          ${ARROW[pos] ? `<span class="fm-arrow" aria-hidden="true">${ARROW[pos]}</span>` : ""}
        </section>`;
      };
      return `<section class="fm" aria-labelledby="${ctx.uid}-h">
        ${figHead(block, ctx)}
        <div class="fm-grid">${POS.map(force).join("")}</div>
        ${block.notes ? `<div class="fm-notes">${block.notes.map((n) => `<div class="fm-note">${resolveLinks(n, ctx)}</div>`).join("")}</div>` : ""}
        ${block.foot ? `<p class="fig-foot">${resolveLinks(block.foot, ctx)}</p>` : ""}
      </section>`;
    }
  };
})();
