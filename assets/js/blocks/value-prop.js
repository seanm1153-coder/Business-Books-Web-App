// Value proposition: answer Porter's three questions (which customers, which needs, what
// relative price) for an invented business, and check whether the answers hang together.
// Each pair of answers is rated by `rules` (good, weak or bad); three good pairs make a
// coherent position, which then shows the value chain tailored to deliver it.
(function () {
  "use strict";
  const { esc } = window.Marginalia.util;

  window.Marginalia.blocks["value-prop"] = {
    render(block, ctx) {
      const question = (q) => `<fieldset class="cm-modes vp-q">
          <legend class="lever-t">${esc(q.label)}</legend>
          ${q.options
            .map(
              (o) => `<label class="cm-mode" for="${ctx.uid}-${esc(o.id)}">
                <input type="radio" name="${ctx.uid}-${esc(q.id)}" id="${ctx.uid}-${esc(o.id)}" value="${esc(o.id)}" data-q="${esc(q.id)}">
                <span class="cm-mode-t">${esc(o.label)}</span>
              </label>`
            )
            .join("")}
        </fieldset>`;
      return `<section class="vp" aria-labelledby="${ctx.uid}-h">
        <div class="spot-head">
          <p class="eyebrow">Builder</p>
          <h2 class="h2" id="${ctx.uid}-h">${esc(block.title)}</h2>
          <p class="section-dek">${esc(block.intro)}</p>
        </div>
        <div class="bt-grid">
          <div class="vp-qs">${block.questions.map(question).join("")}</div>
          <div class="vp-out" aria-live="polite" data-ref="out"></div>
        </div>
      </section>`;
    },

    mount(root, block) {
      const ref = (n) => root.querySelector(`[data-ref="${n}"]`);
      const label = Object.fromEntries(block.questions.flatMap((q) => q.options.map((o) => [o.id, o.label])));
      let picks = { ...block.start };

      function rate(a, b) {
        return block.rules.find((r) => (r.a === a && r.b === b) || (r.a === b && r.b === a)) || { fit: "good", text: "" };
      }

      function update() {
        root.querySelectorAll("[data-q]").forEach((r) => {
          r.checked = picks[r.dataset.q] === r.value;
          r.closest(".cm-mode").classList.toggle("is-on", r.checked);
        });
        const ids = block.questions.map((q) => picks[q.id]);
        const pairs = [
          [ids[0], ids[1]],
          [ids[1], ids[2]],
          [ids[0], ids[2]]
        ].map(([a, b]) => ({ a, b, ...rate(a, b) }));
        const position = block.positions.find((p) => block.questions.every((q) => p.picks[q.id] === picks[q.id]));
        const flags = pairs.filter((p) => p.fit !== "good");
        let html;
        if (position && !flags.length) {
          html = `<p class="eyebrow">A coherent position</p>
            <p class="vp-title">${esc(position.title)}</p>
            <p class="vp-text">${esc(position.text)}</p>
            <p class="cm-when">${esc(block.chainLabel)}</p>
            <ul class="vp-chain" role="list">${position.activities.map((a) => `<li>${esc(a)}</li>`).join("")}</ul>`;
        } else {
          html = `<p class="eyebrow">Not yet a value proposition</p>
            <p class="vp-title">${esc(flags.some((f) => f.fit === "bad") ? block.badTitle : block.weakTitle)}</p>
            <ul class="vp-flags" role="list">
              ${flags
                .map(
                  (f) => `<li class="is-${f.fit}">
                    <span class="vp-mark" aria-hidden="true">${f.fit === "bad" ? "×" : "!"}</span>
                    <span><span class="visually-hidden">${f.fit === "bad" ? "Contradiction" : "Weak link"}: </span><strong>${esc(label[f.a])} · ${esc(label[f.b])}.</strong> ${esc(f.text)}</span>
                  </li>`
                )
                .join("")}
            </ul>
            <p class="vp-text">${esc(block.hint)}</p>`;
        }
        ref("out").innerHTML = html;
      }

      root.addEventListener("change", (e) => {
        const r = e.target.closest("[data-q]");
        if (!r) return;
        picks[r.dataset.q] = r.value;
        update();
      });
      update();
    }
  };
})();
