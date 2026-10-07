// Prose sections: a reading column with an optional sidenote in the margin.
// Paragraphs and sidenotes are trusted HTML from the book files (they carry term and link markup).
(function () {
  "use strict";
  const { esc, resolveLinks } = window.Marginalia.util;

  window.Marginalia.blocks.prose = {
    render(block, ctx) {
      const sections = block.sections
        .map(
          (s) => `<section class="prose-row">
            <div class="prose">
              <h2>${s.n ? `<span class="h-n">${s.n}</span>` : ""}${esc(s.title)}</h2>
              ${s.paras.map((p) => `<p>${resolveLinks(p, ctx)}</p>`).join("")}
            </div>
            ${s.side ? `<aside class="sidenote"><p class="sidenote-k">${esc(s.side.label)}</p>${resolveLinks(s.side.html, ctx)}</aside>` : ""}
          </section>`
        )
        .join("");
      return `<div class="concept-body">${sections}</div>`;
    }
  };
})();
