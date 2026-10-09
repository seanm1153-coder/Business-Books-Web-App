// Loop cards: a grid of cards, each with a small causal loop diagram (drawn by the diagram
// block) and short labelled paragraphs. For Meadows's system traps and similar catalogs.
// Block: { title, intro?, cols?, items: [{ name, diagram: { w, h, nodes, links, marks? },
//   alt, rows: [{ k, d }] }], caption? }.
(function () {
  "use strict";
  const M = window.Marginalia;
  const { esc, figHead, pad2, resolveLinks } = M.util;

  M.blocks["loop-cards"] = {
    render(block, ctx) {
      return `<section class="lc" aria-labelledby="${ctx.uid}-h">
        ${figHead(block, ctx)}
        <ol class="lc-grid" role="list" style="--cols: ${Number(block.cols) || 2}">
          ${block.items
            .map(
              (it, i) => `<li class="lc-card">
                <p class="lc-n tnum" aria-hidden="true">${pad2(i + 1)}</p>
                <h3 class="lc-t">${esc(it.name)}</h3>
                <div class="lc-art" role="img" aria-label="${esc(it.alt)}"><div aria-hidden="true">${M.blocks.diagram.draw(it.diagram, `${ctx.uid}-${i}`)}</div></div>
                <dl class="lc-rows">${it.rows.map((r) => `<dt>${esc(r.k)}</dt><dd>${resolveLinks(r.d, ctx)}</dd>`).join("")}</dl>
              </li>`
            )
            .join("")}
        </ol>
        ${block.caption ? `<p class="fig-foot">${resolveLinks(block.caption, ctx)}</p>` : ""}
      </section>`;
    }
  };
})();
