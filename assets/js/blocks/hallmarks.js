// A grid of named patterns, each with a definition, an example and a test.
// Each item's id doubles as its highlighter color (.hl-<id>), shared with the spot exercise.
(function () {
  "use strict";
  const { esc } = window.Marginalia.util;

  window.Marginalia.blocks.hallmarks = {
    render(block) {
      return `<section class="hallmarks-sec" aria-label="${esc(block.label || "Hallmarks")}">
        <ul class="hallmarks" role="list">
          ${block.items
            .map(
              (h) => `<li class="hallmark">
                <h3 class="hallmark-t"><span class="hl hl-${h.id}">${esc(h.name)}</span></h3>
                <p class="hallmark-d">${esc(h.def)}</p>
                <p class="hallmark-k">Sounds like</p>
                <p class="hallmark-s">${esc(h.sounds)}</p>
                <p class="hallmark-k">How to spot it</p>
                <p class="hallmark-tell">${esc(h.tell)}</p>
              </li>`
            )
            .join("")}
        </ul>
      </section>`;
    }
  };
})();
