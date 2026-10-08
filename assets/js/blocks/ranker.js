// Ranker: put items in order with move up / move down buttons, then check the order.
// Items carry a `rank`; the correct order sorts by rank, `descending` when the block says so
// (leverage points run from 12, least effective, down to 1).
(function () {
  "use strict";
  const { esc } = window.Marginalia.util;

  window.Marginalia.blocks.ranker = {
    render(block, ctx) {
      return `<section class="rk" aria-labelledby="${ctx.uid}-h">
        <div class="spot-head">
          <p class="eyebrow">Exercise</p>
          <h2 class="h2" id="${ctx.uid}-h">${esc(block.title)}</h2>
          <p class="section-dek">${esc(block.intro)}</p>
        </div>
        <div class="rk-card">
          <p class="rk-end">${esc(block.topLabel)}</p>
          <ol class="rk-list" data-ref="list" role="list"></ol>
          <p class="rk-end">${esc(block.bottomLabel)}</p>
          <div class="rk-result" aria-live="polite" data-ref="result"></div>
          <div class="log-actions">
            <button type="button" class="btn-primary" data-ref="check">Check the order</button>
            <button type="button" class="pill" data-ref="reset">Start over</button>
          </div>
        </div>
      </section>`;
    },

    mount(root, block, ctx) {
      const ref = (n) => root.querySelector(`[data-ref="${n}"]`);
      const byId = Object.fromEntries(block.items.map((it) => [it.id, it]));
      const correct = block.items
        .slice()
        .sort((a, b) => (block.descending ? b.rank - a.rank : a.rank - b.rank))
        .map((it) => it.id);
      let order;
      let checked;

      function reset() {
        order = block.start.slice();
        checked = false;
        render();
      }

      function render(focus) {
        ref("list").innerHTML = order
          .map((id, i) => {
            const it = byId[id];
            const right = checked && correct[i] === id;
            return `<li class="rk-item${checked ? (right ? " is-right" : " is-wrong") : ""}">
              <span class="rk-pos tnum" aria-hidden="true">${i + 1}</span>
              <div class="rk-body">
                <p class="rk-t">${esc(it.text)}</p>
                ${
                  checked
                    ? `<p class="rk-answer"><span class="rk-mark">${right ? "Right place" : `Belongs at ${correct.indexOf(id) + 1}`}</span> ${esc(it.label)}</p>
                       <p class="rk-why">${esc(it.why)}</p>`
                    : ""
                }
              </div>
              <div class="rk-btns">
                <button type="button" class="pill" data-move="up" data-id="${esc(id)}" ${i === 0 ? "disabled" : ""} aria-label="Move up: ${esc(it.text)}">↑</button>
                <button type="button" class="pill" data-move="down" data-id="${esc(id)}" ${i === order.length - 1 ? "disabled" : ""} aria-label="Move down: ${esc(it.text)}">↓</button>
              </div>
            </li>`;
          })
          .join("");
        if (focus) {
          const btn = root.querySelector(`[data-move="${focus.dir}"][data-id="${focus.id}"]`);
          const other = root.querySelector(`[data-move="${focus.dir === "up" ? "down" : "up"}"][data-id="${focus.id}"]`);
          (btn && !btn.disabled ? btn : other).focus();
        }
        const placed = order.filter((id, i) => correct[i] === id).length;
        ref("result").innerHTML = checked
          ? `<p class="rk-score"><span class="tnum">${placed} of ${order.length}</span> in the right place</p><p class="rk-hint">${esc(placed === order.length ? block.perfect : block.hint)}</p>`
          : "";
        ref("check").disabled = checked;
      }

      root.addEventListener("click", (e) => {
        const mv = e.target.closest("[data-move]");
        if (mv) {
          const i = order.indexOf(mv.dataset.id);
          const j = mv.dataset.move === "up" ? i - 1 : i + 1;
          if (j < 0 || j >= order.length) return;
          [order[i], order[j]] = [order[j], order[i]];
          checked = false;
          render({ id: mv.dataset.id, dir: mv.dataset.move });
          return;
        }
        if (e.target.closest('[data-ref="check"]')) {
          checked = true;
          render();
          window.Marginalia.memory.result(`${ctx.book.id}.${ctx.slug}.ranker`, {
            book: ctx.book.id,
            page: ctx.slug,
            label: block.title,
            score: order.filter((id, i) => correct[i] === id).length,
            total: order.length
          });
        } else if (e.target.closest('[data-ref="reset"]')) {
          reset();
        }
      });
      reset();
    }
  };
})();
