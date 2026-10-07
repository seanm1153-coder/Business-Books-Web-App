// The magic triangle: three designs (company, product, category) on three axes.
// The filled shape shows the balance; the weakest side sets how well the whole works.
(function () {
  "use strict";
  const { esc, capitalize: M_cap } = window.Marginalia.util;

  function shapeSVG(block, vals, size) {
    const S = Math.min(360, Math.max(240, size));
    const cx = S / 2;
    const cy = S / 2 + 14;
    const R = S / 2 - 46;
    const angle = (i) => -Math.PI / 2 + (i * 2 * Math.PI) / 3;
    const pt = (i, f) => [cx + Math.cos(angle(i)) * R * f, cy + Math.sin(angle(i)) * R * f];
    const poly = (fs) => fs.map((f, i) => pt(i, f).map((n) => n.toFixed(1)).join(",")).join(" ");
    const rings = [0.25, 0.5, 0.75, 1].map((f) => `<polygon class="tri-ring" points="${poly([f, f, f])}"/>`).join("");
    const axes = block.sides.map((_, i) => `<line class="tri-axis" x1="${cx}" y1="${cy}" x2="${pt(i, 1)[0].toFixed(1)}" y2="${pt(i, 1)[1].toFixed(1)}"/>`).join("");
    const shape = `<polygon class="tri-shape" points="${poly(vals.map((v) => Math.max(0.04, v / 10)))}"/>`;
    const dots = vals.map((v, i) => {
      const [x, y] = pt(i, Math.max(0.04, v / 10));
      return `<circle class="tri-dot" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="5"/>`;
    }).join("");
    const labels = block.sides.map((s, i) => {
      const [x, y] = pt(i, 1.16);
      const anchor = i === 0 ? "middle" : i === 1 ? "end" : "start"; // keep labels inside the frame
      return `<text class="tri-label" x="${x.toFixed(1)}" y="${(y + (i === 0 ? -4 : 12)).toFixed(1)}" text-anchor="${anchor}">${esc(s.short)} · ${vals[i]}</text>`;
    }).join("");
    return `<svg class="tri-svg" width="${S}" height="${S + 10}" viewBox="0 0 ${S} ${S + 10}" role="img" aria-label="${block.sides.map((s, i) => `${s.short} ${vals[i]} of 10`).join(", ")}">
      ${rings}${axes}${shape}${dots}${labels}
    </svg>`;
  }

  window.Marginalia.blocks.triangle = {
    render(block, ctx) {
      return `<section class="tri" aria-labelledby="${ctx.uid}-h">
        <div class="spot-head">
          <p class="eyebrow">Exercise</p>
          <h2 class="h2" id="${ctx.uid}-h">${esc(block.title)}</h2>
          <p class="section-dek">${esc(block.intro)}</p>
        </div>
        <div class="jc-presets" role="group" aria-label="Presets">
          <span class="examples-k">Try</span>
          ${block.presets.map((p, i) => `<button type="button" class="pill" data-preset="${i}">${esc(p.label)}</button>`).join("")}
        </div>
        <div class="wc-grid">
          <div class="levers">
            ${block.sides
              .map(
                (s, i) => `<div class="lever">
                  <label class="lever-label" for="${ctx.uid}-s${i}">
                    <span class="lever-t">${esc(s.name)}</span>
                    <span class="lever-v tnum" data-val="${i}"></span>
                  </label>
                  <input type="range" id="${ctx.uid}-s${i}" data-side="${i}" min="0" max="10" step="1">
                  <p class="lever-hint">${esc(s.hint)}</p>
                </div>`
              )
              .join("")}
          </div>
          <div class="tri-out">
            <div class="tri-wrap" data-ref="shape"></div>
            <p class="tri-status" data-ref="status" aria-live="polite"></p>
            <p class="tri-note" data-ref="note"></p>
          </div>
        </div>
      </section>`;
    },

    mount(root, block) {
      const ref = (n) => root.querySelector(`[data-ref="${n}"]`);
      const inputs = Array.from(root.querySelectorAll("input[data-side]"));
      let vals = block.presets[block.start].values.slice();
      let note = block.presets[block.start].note;

      function render() {
        inputs.forEach((inp, i) => {
          inp.value = vals[i];
          root.querySelector(`[data-val="${i}"]`).textContent = `${vals[i]} of 10`;
        });
        root.querySelectorAll("[data-preset]").forEach((b) => {
          const p = block.presets[Number(b.dataset.preset)];
          b.setAttribute("aria-pressed", String(p.values.every((v, i) => v === vals[i])));
        });
        ref("shape").innerHTML = shapeSVG(block, vals, ref("shape").clientWidth || 320);
        const lo = Math.min(...vals);
        const hi = Math.max(...vals);
        const weakest = block.sides.filter((_, i) => vals[i] === lo).map((s) => s.short.toLowerCase());
        let status;
        if (lo >= 7) status = `<strong>Spinning.</strong> All three are strong, so each one makes the others work better.`;
        else if (hi - lo >= 4) status = `<strong>Out of balance.</strong> ${esc(M_cap(weakest.join(" and ")))} ${weakest.length > 1 ? "are" : "is"} holding the others back.`;
        else if (hi <= 4) status = `<strong>Barely started.</strong> None of the three has been designed on purpose yet.`;
        else status = `<strong>Building.</strong> Roughly in balance; raise all three together.`;
        ref("status").innerHTML = status;
        ref("note").textContent = note || "";
      }

      inputs.forEach((inp) =>
        inp.addEventListener("input", () => {
          vals[Number(inp.dataset.side)] = Number(inp.value);
          note = "";
          render();
        })
      );
      root.querySelectorAll("[data-preset]").forEach((b) =>
        b.addEventListener("click", () => {
          const p = block.presets[Number(b.dataset.preset)];
          vals = p.values.slice();
          note = p.note;
          render();
        })
      );
      let timer = 0;
      const onResize = () => {
        clearTimeout(timer);
        timer = setTimeout(render, 120);
      };
      window.addEventListener("resize", onResize);
      render();
      return () => window.removeEventListener("resize", onResize);
    }
  };
})();
