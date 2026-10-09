// Figure: a diagram drawn as inline SVG in the book file (trusted markup), with numbered
// notes beside it on wide screens and below it on phones. SVG elements take their look from
// the .sv-* classes in styles.css, so every diagram follows the theme. `svgNarrow`, if
// given, replaces `svg` on phones (a taller layout that keeps the text legible).
// Block: { title, intro?, alt, svg, svgNarrow?, notes?: [{ t, d }], caption?, full? }; with
// `full` the drawing takes the full width and the notes sit in a row beneath it.
(function () {
  "use strict";
  const { esc, figHead, pad2, resolveLinks } = window.Marginalia.util;

  window.Marginalia.blocks.figure = {
    render(block, ctx) {
      const notes = block.notes || [];
      return `<section class="fg" aria-labelledby="${ctx.uid}-h">
        ${figHead(block, ctx)}
        <div class="fg-body${notes.length ? " has-notes" : ""}${block.full ? " is-full" : ""}">
          <figure class="fg-fig${block.svgNarrow ? " has-narrow" : ""}">
            <div class="fg-art" role="img" aria-label="${esc(block.alt)}">
              <div class="fg-wide" aria-hidden="true">${block.svg}</div>
              ${block.svgNarrow ? `<div class="fg-narrow" aria-hidden="true">${block.svgNarrow}</div>` : ""}
            </div>
            ${block.caption ? `<figcaption class="fig-foot">${resolveLinks(block.caption, ctx)}</figcaption>` : ""}
          </figure>
          ${
            notes.length
              ? `<ol class="fg-notes" role="list">${notes
                  .map(
                    (n, i) => `<li class="fg-note">
                      <span class="brief-n tnum" aria-hidden="true">${pad2(i + 1)}</span>
                      <p class="brief-d"><strong class="brief-t">${esc(n.t)}</strong> ${resolveLinks(n.d, ctx)}</p>
                    </li>`
                  )
                  .join("")}</ol>`
              : ""
          }
        </div>
      </section>`;
    }
  };
})();
