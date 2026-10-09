// Chain compare: two or more value chains side by side, activity by activity, so the
// tailoring shows at a glance. Desktop draws a matrix (activities across, companies down);
// phones list it activity by activity, each cell labelled with its company. The markup is
// in activity order and grid placement builds the matrix, so nothing is duplicated.
// Block: { title, intro?, activities: [..], rows: [{ name, cells: [..], pen? }], caption? }.
// A cell is HTML, or { d, tag } to label it ("Copied", "Kept"); tagged cells marked
// `hot: true` are outlined in pen.
(function () {
  "use strict";
  const { esc, figHead, resolveLinks } = window.Marginalia.util;

  window.Marginalia.blocks["chain-compare"] = {
    render(block, ctx) {
      const rows = block.rows;
      const names = rows
        .map((r, j) => `<p class="cc-row${r.pen ? " is-pen" : ""}" style="grid-row: ${j + 2}" aria-hidden="true">${esc(r.name)}</p>`)
        .join("");
      const cols = block.activities
        .map(
          (a, i) => `<h3 class="cc-act" style="grid-column: ${i + 2}">${esc(a)}</h3>
            ${rows
              .map(
                (r, j) => {
                  const c = typeof r.cells[i] === "string" ? { d: r.cells[i] } : r.cells[i];
                  return `<div class="cc-cell${r.pen || c.hot ? " is-pen" : ""}" style="grid-row: ${j + 2}; grid-column: ${i + 2}">
                    <span class="cc-who">${esc(r.name)}</span>
                    ${c.tag ? `<span class="pl-tag cc-tag">${esc(c.tag)}</span>` : ""}
                    <span class="cc-d">${resolveLinks(c.d, ctx)}</span>
                  </div>`;
                }
              )
              .join("")}`
        )
        .join("");
      return `<section class="cc" aria-labelledby="${ctx.uid}-h">
        ${figHead(block, ctx)}
        <figure class="cc-fig">
          <div class="cc-grid" style="--n: ${block.activities.length}">${names}${cols}</div>
          ${block.caption ? `<figcaption class="fig-foot">${resolveLinks(block.caption, ctx)}</figcaption>` : ""}
        </figure>
      </section>`;
    }
  };
})();
