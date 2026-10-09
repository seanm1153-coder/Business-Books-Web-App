// Trap cards: a numbered grid of recurring problem structures, each with its structure,
// how the trap works and the way out. Items: { name, structure?, trap, out }; the
// structure line is optional, so the block also serves for lists of habits.
(function () {
  "use strict";
  const { esc } = window.Marginalia.util;

  window.Marginalia.blocks["trap-cards"] = {
    render(block, ctx) {
      return `<section class="tc" aria-labelledby="${ctx.uid}-h">
        <div class="spot-head">
          <p class="eyebrow">${esc(block.eyebrow)}</p>
          <h2 class="h2" id="${ctx.uid}-h">${esc(block.title)}</h2>
          ${block.intro ? `<p class="section-dek">${esc(block.intro)}</p>` : ""}
        </div>
        <ol class="tc-list" role="list">
          ${block.items
            .map(
              (it, i) => `<li class="tc-card">
                <p class="tc-n tnum" aria-hidden="true">${String(i + 1).padStart(2, "0")}</p>
                <h3 class="tc-t">${esc(it.name)}</h3>
                ${it.structure ? `<p class="tc-s">${esc(it.structure)}</p>` : ""}
                <p class="tc-d">${esc(it.trap)}</p>
                <p class="tc-k">${esc(block.outLabel)}</p>
                <p class="tc-d">${esc(it.out)}</p>
              </li>`
            )
            .join("")}
        </ol>
      </section>`;
    }
  };
})();
