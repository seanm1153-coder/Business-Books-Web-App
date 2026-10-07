// How a category's market value splits between its king and everyone else.
// Rivals share the remainder evenly, to keep the picture simple; a toggle
// compares with a fully even split.
(function () {
  "use strict";
  const { esc } = window.Marginalia.util;

  const pct = (v) => (v >= 10 ? Math.round(v) : Math.round(v * 10) / 10) + "%";

  window.Marginalia.blocks["value-split"] = {
    render(block, ctx) {
      const u = ctx.uid;
      return `<section class="vs" aria-labelledby="${u}-h">
        <div class="spot-head">
          <p class="eyebrow">Figure</p>
          <h2 class="h2" id="${u}-h">${esc(block.title)}</h2>
          <p class="section-dek">${esc(block.intro)}</p>
        </div>
        <div class="vs-controls">
          <div class="lever">
            <label class="lever-label" for="${u}-rivals">
              <span class="lever-t">Other companies in the category</span>
              <span class="lever-v tnum" data-ref="rivals-v"></span>
            </label>
            <input type="range" id="${u}-rivals" min="1" max="${block.maxRivals}" step="1" value="${block.startRivals}">
          </div>
          <div class="examples" role="group" aria-label="How value splits">
            <button type="button" class="pill" data-mode="king" aria-pressed="true">Winner takes most</button>
            <button type="button" class="pill" data-mode="even" aria-pressed="false">Even split</button>
          </div>
        </div>
        <div class="vs-bar" data-ref="bar" role="img"></div>
        <div class="tiles tiles-3">
          <div class="tile"><p class="tile-k">The leader's share</p><p class="tile-v" data-ref="king"></p></div>
          <div class="tile"><p class="tile-k">Each other company</p><p class="tile-v" data-ref="rival"></p></div>
          <div class="tile"><p class="tile-k">Leader vs. each other</p><p class="tile-v" data-ref="ratio"></p></div>
        </div>
        <p class="fin-foot">${esc(block.foot)}</p>
      </section>`;
    },

    mount(root, block) {
      const ref = (n) => root.querySelector(`[data-ref="${n}"]`);
      const slider = root.querySelector('input[type="range"]');
      const modes = Array.from(root.querySelectorAll("[data-mode]"));
      let mode = "king";

      function render() {
        const n = Number(slider.value);
        const king = mode === "king" ? block.kingShare : 100 / (n + 1);
        const rival = (100 - king) / n;
        ref("rivals-v").textContent = n;
        ref("bar").innerHTML =
          `<span class="vs-seg vs-king" style="flex-basis:${king}%"><span>${mode === "king" ? "King" : "Leader"} · ${pct(king)}</span></span>` +
          Array.from({ length: n }, () => `<span class="vs-seg" style="flex-basis:${rival}%">${rival >= 9 ? `<span>${pct(rival)}</span>` : ""}</span>`).join("");
        ref("bar").setAttribute("aria-label", `Leader ${pct(king)}; each of ${n} other companies ${pct(rival)}`);
        ref("king").textContent = pct(king);
        ref("rival").textContent = pct(rival);
        ref("ratio").textContent = `${Math.round(king / rival)}×`;
      }

      slider.addEventListener("input", render);
      modes.forEach((b) =>
        b.addEventListener("click", () => {
          mode = b.dataset.mode;
          modes.forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
          render();
        })
      );
      render();
    }
  };
})();
