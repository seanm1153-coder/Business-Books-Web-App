// Ladder: a numbered list read from one end to the other (used for the twelve
// leverage points, from least to most effective). Items: { n, name, desc }.
(function () {
  "use strict";
  const { esc } = window.Marginalia.util;

  window.Marginalia.blocks.ladder = {
    render(block, ctx) {
      return `<section class="ladder" aria-labelledby="${ctx.uid}-h">
        <div class="spot-head">
          <p class="eyebrow">${esc(block.eyebrow)}</p>
          <h2 class="h2" id="${ctx.uid}-h">${esc(block.title)}</h2>
          ${block.intro ? `<p class="section-dek">${esc(block.intro)}</p>` : ""}
        </div>
        <p class="ladder-end">${esc(block.lowLabel)}</p>
        <ol class="ladder-list" role="list">
          ${block.items
            .map(
              (it) => `<li class="ladder-step">
                <span class="ladder-n tnum" aria-hidden="true">${esc(it.n)}</span>
                <div class="ladder-body">
                  <h3 class="ladder-t"><span class="visually-hidden">${esc(it.n)}. </span>${esc(it.name)}</h3>
                  <p class="ladder-d">${esc(it.desc)}</p>
                </div>
              </li>`
            )
            .join("")}
        </ol>
        <p class="ladder-end">${esc(block.highLabel)}</p>
      </section>`;
    }
  };
})();
