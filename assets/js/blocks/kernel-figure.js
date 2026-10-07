// Three-step figure with tabs that swap between examples (used for Rumelt's kernel).
(function () {
  "use strict";
  const { esc, reducedMotion, tablist } = window.Marginalia.util;

  function panelsHTML(block, view) {
    return block.steps
      .map(
        (step, i) => `
        <section class="kpanel">
          <p class="kpanel-k">Step ${i + 1}</p>
          <h3 class="kpanel-t">${esc(step.title)}</h3>
          <p class="kpanel-q">${esc(step.question)}</p>
          <div class="kpanel-body">${
            Array.isArray(view[step.key])
              ? `<ul>${view[step.key].map((b) => `<li>${esc(b)}</li>`).join("")}</ul>`
              : `<p>${esc(view[step.key])}</p>`
          }</div>
        </section>`
      )
      .join("");
  }

  window.Marginalia.blocks["kernel-figure"] = {
    render(block, ctx) {
      const first = block.views[0];
      return `<figure class="kernel-fig">
        <div class="tabs" role="tablist" aria-label="Choose an example">
          ${block.views
            .map(
              (v, i) =>
                `<button class="pill" role="tab" type="button" id="${ctx.uid}-tab-${v.id}" data-view="${v.id}" aria-controls="${ctx.uid}-panels" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}">${esc(v.label)}</button>`
            )
            .join("")}
        </div>
        <div class="kernel-panels" id="${ctx.uid}-panels" role="tabpanel" aria-labelledby="${ctx.uid}-tab-${first.id}">${panelsHTML(block, first)}</div>
        <figcaption class="caption">${esc(block.caption)}</figcaption>
      </figure>`;
    },

    mount(root, block) {
      const panels = root.querySelector(".kernel-panels");
      tablist(Array.from(root.querySelectorAll('[role="tab"]')), (tab) => {
        const view = block.views.find((v) => v.id === tab.dataset.view);
        panels.setAttribute("aria-labelledby", tab.id);
        if (reducedMotion.matches) {
          panels.innerHTML = panelsHTML(block, view);
          return;
        }
        panels.classList.add("is-swapping");
        setTimeout(() => {
          panels.innerHTML = panelsHTML(block, view);
          requestAnimationFrame(() => requestAnimationFrame(() => panels.classList.remove("is-swapping")));
        }, 160);
      });
    }
  };
})();
