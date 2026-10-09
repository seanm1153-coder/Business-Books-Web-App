// Brief: a chapter's argument as numbered claims, set in columns so the whole of it fits on
// a screen or two. Points: { t: "the claim in a few words", d: "a sentence or two (trusted HTML)" }.
(function () {
  "use strict";
  const { esc, figHead, pad2, resolveLinks } = window.Marginalia.util;

  window.Marginalia.blocks.brief = {
    render(block, ctx) {
      return `<section class="brief" aria-labelledby="${ctx.uid}-h">
        ${figHead(block, ctx)}
        <ol class="brief-list" role="list"${block.cols ? ` style="--cols: ${Number(block.cols)}"` : ""}>
          ${block.points
            .map(
              (p, i) => `<li class="brief-p">
                <span class="brief-n tnum" aria-hidden="true">${pad2(i + 1)}</span>
                <p class="brief-d"><strong class="brief-t">${esc(p.t)}</strong> ${resolveLinks(p.d, ctx)}</p>
              </li>`
            )
            .join("")}
        </ol>
      </section>`;
    }
  };
})();
