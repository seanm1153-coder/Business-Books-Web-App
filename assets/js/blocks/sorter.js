// Two-way sorting game: one statement at a time, pick a side, see why, and
// (for wrong-side items) a rewrite. Ends with a score and a review list.
(function () {
  "use strict";
  const { esc } = window.Marginalia.util;

  window.Marginalia.blocks.sorter = {
    render(block, ctx) {
      return `<section class="sorter" aria-labelledby="${ctx.uid}-h">
        <div class="spot-head">
          <p class="eyebrow">Exercise</p>
          <h2 class="h2" id="${ctx.uid}-h">${esc(block.title)}</h2>
          <p class="section-dek">${esc(block.intro)}</p>
        </div>
        <div class="sorter-card" data-ref="card" aria-live="polite"></div>
      </section>`;
    },

    mount(root, block, ctx) {
      const card = root.querySelector('[data-ref="card"]');
      const optById = Object.fromEntries(block.options.map((o) => [o.id, o]));
      let i = 0;
      let answers = [];

      function renderItem() {
        const item = block.items[i];
        const picked = answers[i];
        const right = picked === item.answer;
        card.innerHTML = `
          <p class="sorter-progress"><span class="tnum">${i + 1} of ${block.items.length}</span>${answers.filter((a, k) => a === block.items[k].answer).length ? ` · ${answers.filter((a, k) => a === block.items[k].answer).length} right so far` : ""}</p>
          <p class="sorter-q">${esc(item.text)}</p>
          <div class="sorter-opts${block.options.length === 4 ? " sorter-opts-4" : ""}" role="group" aria-label="Your answer">
            ${block.options
              .map(
                (o) => `<button type="button" class="sorter-opt${picked === o.id ? (right ? " is-right" : " is-wrong") : ""}${picked && o.id === item.answer && !right ? " is-answer" : ""}" data-opt="${o.id}"${picked ? " disabled" : ""}>
                  <span class="sorter-opt-t">${esc(o.label)}</span><span class="sorter-opt-d">${esc(o.hint)}</span>
                </button>`
              )
              .join("")}
          </div>
          ${
            picked
              ? `<div class="sorter-why">
                  <p class="sorter-verdict ${right ? "is-right" : "is-wrong"}">${right ? "Right" : "Not quite"} · ${esc(optById[item.answer].label)}</p>
                  <p>${esc(item.why)}</p>
                  ${item.rewrite ? `<p class="sorter-rewrite"><span>${esc(block.rewriteLabel)}</span>${esc(item.rewrite)}</p>` : ""}
                  <button type="button" class="btn-primary" data-action="next">${i === block.items.length - 1 ? "See your score" : "Next statement"}</button>
                </div>`
              : ""
          }`;
        const next = card.querySelector('[data-action="next"]');
        if (next) next.focus();
      }

      function renderDone() {
        const score = answers.filter((a, k) => a === block.items[k].answer).length;
        window.Marginalia.memory.result(`${ctx.book.id}.${ctx.slug}.sorter`, {
          book: ctx.book.id,
          page: ctx.slug,
          label: block.title,
          score,
          total: block.items.length
        });
        card.innerHTML = `
          <p class="sorter-progress">Done</p>
          <p class="sorter-score"><span class="tnum">${score} of ${block.items.length}</span> right</p>
          <ol class="sorter-review" role="list">
            ${block.items
              .map(
                (item, k) => `<li class="${answers[k] === item.answer ? "is-right" : "is-wrong"}">
                  <span class="sorter-mark" aria-hidden="true">${answers[k] === item.answer ? "✓" : "×"}</span>
                  <span><span class="visually-hidden">${answers[k] === item.answer ? "Right" : "Wrong"}: </span>${esc(item.text)} <em>${esc(optById[item.answer].label)}</em></span>
                </li>`
              )
              .join("")}
          </ol>
          <button type="button" class="pill" data-action="restart">Start over</button>`;
        card.querySelector('[data-action="restart"]').focus();
      }

      card.addEventListener("click", (e) => {
        const opt = e.target.closest("[data-opt]");
        const action = e.target.closest("[data-action]");
        if (opt && !answers[i]) {
          answers[i] = opt.dataset.opt;
          renderItem();
        } else if (action && action.dataset.action === "next") {
          i++;
          if (i < block.items.length) renderItem();
          else renderDone();
        } else if (action && action.dataset.action === "restart") {
          i = 0;
          answers = [];
          renderItem();
        }
      });

      renderItem();
    }
  };
})();
