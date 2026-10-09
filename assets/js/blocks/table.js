// Table: a dense comparison with a row heading in the first column. Cells are trusted HTML
// (they may carry links and P&L tags). On phones each row becomes a small card, every cell
// labelled with its column, so nothing scrolls sideways; a short cell (a figure, a word)
// sits on one line beside its label.
// Block: { title, intro?, columns: [..], widths?: [css width | null, ..], rows: [[..]], foot? }.
(function () {
  "use strict";
  const { esc, figHead, resolveLinks } = window.Marginalia.util;
  const short = (cell) => String(cell).replace(/<[^>]*>/g, "").length <= 16;

  window.Marginalia.blocks.table = {
    render(block, ctx) {
      const cols = block.columns;
      return `<section class="dt" aria-labelledby="${ctx.uid}-h">
        ${figHead(block, ctx)}
        <table class="dt-table">
          ${block.widths ? `<colgroup>${block.widths.map((w) => `<col${w ? ` style="width: ${esc(w)}"` : ""}>`).join("")}</colgroup>` : ""}
          <thead><tr>${cols.map((c) => `<th scope="col">${esc(c)}</th>`).join("")}</tr></thead>
          <tbody>
            ${block.rows
              .map(
                (r) => `<tr>${r
                  .map((cell, i) =>
                    i === 0
                      ? `<th scope="row">${resolveLinks(cell, ctx)}</th>`
                      : `<td data-label="${esc(cols[i])}"${short(cell) ? ' class="is-short"' : ""}>${resolveLinks(cell, ctx)}</td>`
                  )
                  .join("")}</tr>`
              )
              .join("")}
          </tbody>
        </table>
        ${block.foot ? `<p class="fig-foot">${resolveLinks(block.foot, ctx)}</p>` : ""}
      </section>`;
    }
  };
})();
