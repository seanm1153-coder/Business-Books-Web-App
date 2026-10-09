// Value chain: Porter's generic value chain drawn as he draws it, support activities in
// bands across the top, primary activities as columns along the bottom, and the margin as
// the arrow's point, each activity with what it covers. On phones the bands and columns
// stack. Block: { title, intro?, support: [{ name, d }], primary: [{ name, d }],
// marginLabel, caption? }.
(function () {
  "use strict";
  const { esc, figHead, resolveLinks } = window.Marginalia.util;

  window.Marginalia.blocks["value-chain"] = {
    render(block, ctx) {
      return `<section class="vc" aria-labelledby="${ctx.uid}-h">
        ${figHead(block, ctx)}
        <figure class="vc-fig">
          <div class="vc-chain" style="--cols: ${block.primary.length}">
            <p class="vc-k vc-k-support">Support activities</p>
            ${block.support
              .map(
                (a, i) => `<div class="vc-support" style="grid-row: ${i + 2}">
                  <h3 class="vc-name">${esc(a.name)}</h3>
                  <p class="vc-d">${esc(a.d)}</p>
                </div>`
              )
              .join("")}
            <p class="vc-k vc-k-primary" style="grid-row: ${block.support.length + 2}">Primary activities</p>
            ${block.primary
              .map(
                (a, i) => `<div class="vc-primary" style="grid-row: ${block.support.length + 3}; grid-column: ${i + 1}">
                  <h3 class="vc-name">${esc(a.name)}</h3>
                  <p class="vc-d">${esc(a.d)}</p>
                </div>`
              )
              .join("")}
            <div class="vc-margin" style="grid-row: 2 / span ${block.support.length + 2}"><span>${esc(block.marginLabel)}</span></div>
          </div>
          ${block.caption ? `<figcaption class="fig-foot">${resolveLinks(block.caption, ctx)}</figcaption>` : ""}
        </figure>
      </section>`;
    }
  };
})();
