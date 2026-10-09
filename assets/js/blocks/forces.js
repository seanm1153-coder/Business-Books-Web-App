// Forces: a toy model of how the five forces divide the value an industry creates.
// Of every $100 of value (what buyers would pay, less what inputs cost suppliers):
//   suppliers take   take[supplier level] of it
//   each other force takes its share of what's left, passed on to buyers as lower prices
//   or more for the money (buyer power, rivalry, substitutes, the threat of entry)
// The industry keeps the rest. The shares are illustrative, not from the book.
(function () {
  "use strict";
  const { esc } = window.Marginalia.util;

  const money = (v) => `$${Math.round(v)}`;
  const WORDS = ["no", "one", "two", "three", "four", "five"];

  function split(block, levels) {
    const supplier = block.forces.find((f) => f.to === "suppliers");
    const suppliers = 100 * supplier.take[levels[supplier.id]];
    let kept = 100 - suppliers;
    block.forces.filter((f) => f.to !== "suppliers").forEach((f) => (kept *= 1 - f.take[levels[f.id]]));
    return { kept, suppliers, buyers: 100 - suppliers - kept };
  }

  window.Marginalia.blocks.forces = {
    render(block, ctx) {
      const card = (f) => `<fieldset class="ff-force ff-${esc(f.id)}">
          <legend class="ff-name">${esc(f.name)}</legend>
          <p class="ff-q">${esc(f.question)}</p>
          <div class="ff-seg">
            ${block.levels
              .map(
                (l, i) => `<label class="ff-opt"><input type="radio" name="${ctx.uid}-${esc(f.id)}" value="${i}" data-force="${esc(f.id)}"><span>${esc(l)}</span></label>`
              )
              .join("")}
          </div>
          ${f.arrow ? `<span class="ff-arrow" aria-hidden="true">${f.arrow}</span>` : ""}
        </fieldset>`;
      return `<section class="ff" aria-labelledby="${ctx.uid}-h">
        <div class="spot-head">
          <p class="eyebrow">A toy model</p>
          <h2 class="h2" id="${ctx.uid}-h">${esc(block.title)}</h2>
          <p class="section-dek">${esc(block.intro)}</p>
        </div>
        <div class="jc-presets" role="group" aria-label="Examples">
          <span class="examples-k">Try</span>
          ${block.presets.map((p) => `<button type="button" class="pill" data-preset="${esc(p.id)}">${esc(p.label)}</button>`).join("")}
        </div>
        <div class="ff-grid">${block.forces.map(card).join("")}</div>
        <div class="ff-out">
          <div>
            <p class="cm-when">${esc(block.outLabel)}</p>
            <div class="ff-bar" data-ref="bar" aria-hidden="true"></div>
            <div class="tiles tiles-3" data-ref="tiles"></div>
          </div>
          <div class="happened" aria-live="polite">
            <p class="eyebrow">What's happening</p>
            <p class="happened-t" data-ref="note"></p>
          </div>
        </div>
        <p class="fin-foot">${esc(block.foot)}</p>
      </section>`;
    },

    mount(root, block) {
      const ref = (n) => root.querySelector(`[data-ref="${n}"]`);
      const byId = Object.fromEntries(block.forces.map((f) => [f.id, f]));
      let levels = { ...block.presets[0].levels };

      function describe(out) {
        const strong = block.forces.filter((f) => levels[f.id] === block.levels.length - 1);
        // The force whose weakening would add the most to what the industry keeps.
        const gains = block.forces
          .filter((f) => levels[f.id] > 0)
          .map((f) => ({ f, gain: split(block, { ...levels, [f.id]: 0 }).kept - out.kept }))
          .sort((a, b) => b.gain - a.gain);
        let text = `The industry keeps ${money(out.kept)} of every $100 of value it creates. Suppliers take ${money(out.suppliers)}, and ${money(out.buyers)} goes to buyers as lower prices or more for their money.`;
        if (!gains.length) return `${text} With every force weak, this is about as good as an industry gets.`;
        const top = gains[0];
        if (strong.length === 1) text += ` One strong force is enough to do real damage: ${top.f.short} alone costs the industry ${money(top.gain)} of every $100.`;
        else if (strong.length > 1)
          text += ` With ${strong.length === block.forces.length ? "every force" : `${WORDS[strong.length]} forces`} strong, the industry keeps little. The most costly is ${top.f.short}.`;
        text += ` A company that found a position sheltered from ${top.f.short}, or weakened it, would keep up to ${money(out.kept + top.gain)}.`;
        return text;
      }

      function update() {
        root.querySelectorAll("[data-force]").forEach((r) => {
          r.checked = Number(r.value) === levels[r.dataset.force];
          r.closest(".ff-opt").classList.toggle("is-on", r.checked);
        });
        root.querySelectorAll("[data-preset]").forEach((b) => {
          const p = block.presets.find((q) => q.id === b.dataset.preset);
          b.setAttribute("aria-pressed", String(block.forces.every((f) => p.levels[f.id] === levels[f.id])));
        });
        const out = split(block, levels);
        const seg = (cls, v, label) => (v > 0.5 ? `<span class="ff-seg-bar ${cls}" style="flex-grow:${v.toFixed(2)}"><span>${esc(label)}</span></span>` : "");
        ref("bar").innerHTML =
          seg("is-kept", out.kept, money(out.kept)) + seg("is-suppliers", out.suppliers, money(out.suppliers)) + seg("is-buyers", out.buyers, money(out.buyers));
        ref("tiles").innerHTML = [
          ["Kept by the industry", out.kept, "ff-k-kept"],
          ["Taken by suppliers", out.suppliers, "ff-k-suppliers"],
          ["Passed to buyers", out.buyers, "ff-k-buyers"]
        ]
          .map(([k, v, cls]) => `<div class="tile"><p class="tile-k"><span class="key ${cls}"></span>${esc(k)}</p><p class="tile-v">${money(v)}</p></div>`)
          .join("");
        ref("note").textContent = describe(out);
      }

      root.addEventListener("change", (e) => {
        const r = e.target.closest("[data-force]");
        if (!r || !byId[r.dataset.force]) return;
        levels[r.dataset.force] = Number(r.value);
        update();
      });
      root.addEventListener("click", (e) => {
        const btn = e.target.closest("[data-preset]");
        if (!btn) return;
        levels = { ...block.presets.find((p) => p.id === btn.dataset.preset).levels };
        update();
      });
      update();
    }
  };
})();
