// A map that steps through phases (used for Hannibal at Cannae). Units belong to one of
// two sides and have a position per phase: a box { x, y, w, h } or a shape { d, l },
// optionally `out` (faded: broken or gone), `l` (label position) and `hideLabel`.
// `inside: true` puts a unit's label inside its fill. Each phase adds arrows and captions.
(function () {
  "use strict";
  const { esc, tablist } = window.Marginalia.util;

  const NS = "http://www.w3.org/2000/svg";

  function unitHTML(u) {
    return `<g class="pm-unit pm-${u.side}${u.inside ? " pm-inside" : ""}" data-unit="${esc(u.id)}">
      <rect class="pm-box" rx="2"></rect>
      <path class="pm-shape"></path>
      <text class="pm-label" text-anchor="middle">${esc(u.label)}</text>
    </g>`;
  }

  window.Marginalia.blocks["phase-map"] = {
    render(block, ctx) {
      const [vw, vh] = block.size;
      return `<figure class="pm" aria-labelledby="${ctx.uid}-h">
        <div class="spot-head">
          <p class="eyebrow">${esc(block.eyebrow)}</p>
          <h2 class="h2" id="${ctx.uid}-h">${esc(block.title)}</h2>
          <p class="section-dek">${esc(block.intro)}</p>
        </div>
        <div class="tabs pm-tabs" role="tablist" aria-label="Phases">
          ${block.phases
            .map(
              (p, i) =>
                `<button class="pill" role="tab" type="button" id="${ctx.uid}-tab-${i}" data-phase="${i}" aria-controls="${ctx.uid}-panel" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}">${i + 1} · ${esc(p.tab)}</button>`
            )
            .join("")}
        </div>
        <div class="pm-grid" id="${ctx.uid}-panel" role="tabpanel" aria-labelledby="${ctx.uid}-tab-0">
          <div class="pm-map">
            <svg viewBox="0 0 ${vw} ${vh}" role="img" aria-labelledby="${ctx.uid}-svgt">
              <title id="${ctx.uid}-svgt" data-ref="svgt"></title>
              <defs>
                <marker id="${ctx.uid}-head" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" class="pm-head"></path>
                </marker>
              </defs>
              ${(block.terrain || []).map((t) => `<path class="pm-terrain" d="${esc(t.d)}"></path>${t.label ? `<text class="pm-terrain-label" x="${t.lx}" y="${t.ly}">${esc(t.label)}</text>` : ""}`).join("")}
              ${block.units.map(unitHTML).join("")}
              <g data-ref="arrows"></g>
            </svg>
            <ul class="pm-legend" role="list">
              ${block.sides.map((s) => `<li><span class="pm-swatch pm-${esc(s.id)}" aria-hidden="true"></span>${esc(s.label)}</li>`).join("")}
              <li><span class="pm-swatch pm-out-swatch" aria-hidden="true"></span>${esc(block.outLabel)}</li>
            </ul>
          </div>
          <div class="pm-text" aria-live="polite">
            <p class="pm-step" data-ref="step"></p>
            <h3 class="pm-t" data-ref="title"></h3>
            <p class="pm-body" data-ref="body"></p>
            <div class="pm-why">
              <p class="eyebrow">${esc(block.whyLabel)}</p>
              <p data-ref="why"></p>
            </div>
            <div class="log-actions">
              <button type="button" class="pill" data-ref="prev">← Previous</button>
              <button type="button" class="pill" data-ref="next">Next →</button>
            </div>
          </div>
        </div>
        <figcaption class="caption">${esc(block.caption)}</figcaption>
      </figure>`;
    },

    mount(root, block, ctx) {
      const ref = (n) => root.querySelector(`[data-ref="${n}"]`);
      const tabs = Array.from(root.querySelectorAll('[role="tab"]'));
      const panel = root.querySelector('[role="tabpanel"]');
      let phase = 0;

      function place(u, i) {
        const g = root.querySelector(`[data-unit="${u.id}"]`);
        const at = u.at[Math.min(i, u.at.length - 1)];
        const box = g.querySelector(".pm-box");
        const shape = g.querySelector(".pm-shape");
        const label = g.querySelector(".pm-label");
        g.classList.toggle("is-out", Boolean(at.out));
        if (at.d) {
          box.setAttribute("width", 0);
          box.setAttribute("height", 0);
          shape.setAttribute("d", at.d);
          g.style.transform = "translate(0px, 0px)";
          label.setAttribute("x", at.l[0]);
          label.setAttribute("y", at.l[1]);
        } else {
          shape.setAttribute("d", "");
          box.setAttribute("width", at.w);
          box.setAttribute("height", at.h);
          // Boxes sit at the origin and move by transform, so moves can animate.
          g.style.transform = `translate(${at.x}px, ${at.y}px)`;
          const [lx, ly] = at.l || [at.w / 2, at.h + 11];
          label.setAttribute("x", lx);
          label.setAttribute("y", ly);
        }
        label.style.display = at.hideLabel ? "none" : "";
      }

      function show(i) {
        phase = i;
        const p = block.phases[i];
        block.units.forEach((u) => place(u, i));
        const arrows = ref("arrows");
        arrows.textContent = "";
        (p.arrows || []).forEach((d) => {
          const path = document.createElementNS(NS, "path");
          path.setAttribute("d", d);
          path.setAttribute("class", "pm-arrow");
          path.setAttribute("marker-end", `url(#${ctx.uid}-head)`);
          arrows.appendChild(path);
        });
        ref("svgt").textContent = `${p.title}. ${p.body}`;
        ref("step").textContent = `Phase ${i + 1} of ${block.phases.length}`;
        ref("title").textContent = p.title;
        ref("body").textContent = p.body;
        ref("why").textContent = p.why;
        ref("prev").disabled = i === 0;
        ref("next").disabled = i === block.phases.length - 1;
        panel.setAttribute("aria-labelledby", tabs[i].id);
      }

      function select(i) {
        tabs.forEach((t, k) => {
          t.setAttribute("aria-selected", String(k === i));
          t.tabIndex = k === i ? 0 : -1;
        });
        show(i);
      }

      tablist(tabs, (tab) => show(Number(tab.dataset.phase)));
      ref("prev").addEventListener("click", () => phase > 0 && select(phase - 1));
      ref("next").addEventListener("click", () => phase < block.phases.length - 1 && select(phase + 1));
      show(0);
    }
  };
})();
