// Activity system: choose how each activity is done and see the choices reinforce or clash.
// Every option adds { price, cost } per customer to `base`; every link adds { price, cost }
// when both of its options are chosen. Links that raise price or cut cost are fits; links
// that add cost are clashes. Activities are drawn as a hexagon of nodes with the active
// links between them.
(function () {
  "use strict";
  const { esc } = window.Marginalia.util;

  const money = (v) => `${v < 0 ? "−" : ""}$${Math.abs(Math.round(v))}`;
  const WORDS = ["no", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
  const count = (n, noun) => `${WORDS[n] || n} ${noun}${n === 1 ? "" : "s"}`;
  const capital = (t) => t.charAt(0).toUpperCase() + t.slice(1);

  function evaluate(block, picks) {
    const chosen = new Set(Object.values(picks));
    let price = block.base.price;
    let cost = block.base.cost;
    block.activities.forEach((a) => {
      const o = a.options.find((x) => x.id === picks[a.id]);
      price += o.price || 0;
      cost += o.cost || 0;
    });
    const active = block.links.filter((l) => chosen.has(l.a) && chosen.has(l.b));
    active.forEach((l) => {
      price += l.price || 0;
      cost += l.cost || 0;
    });
    const fits = active.filter((l) => (l.cost || 0) <= 0);
    const clashes = active.filter((l) => (l.cost || 0) > 0);
    return { price, cost, margin: price - cost, fits, clashes };
  }

  window.Marginalia.blocks["activity-system"] = {
    // Shared with copy-valley, which runs the same model over every partial copy.
    evaluate,

    render(block, ctx) {
      const toggle = (a) => `<fieldset class="as-act">
          <legend class="as-name">${esc(a.name)}</legend>
          <div class="ff-seg">
            ${a.options
              .map(
                (o) => `<label class="ff-opt"><input type="radio" name="${ctx.uid}-${esc(a.id)}" value="${esc(o.id)}" data-act="${esc(a.id)}"><span>${esc(o.label)}</span></label>`
              )
              .join("")}
          </div>
        </fieldset>`;
      return `<section class="as" aria-labelledby="${ctx.uid}-h">
        <div class="spot-head">
          <p class="eyebrow">${esc(block.eyebrow || "Builder")}</p>
          <h2 class="h2" id="${ctx.uid}-h">${esc(block.title)}</h2>
          <p class="section-dek">${esc(block.intro)}</p>
        </div>
        <div class="jc-presets" role="group" aria-label="Examples">
          <span class="examples-k">Try</span>
          ${block.presets.map((p) => `<button type="button" class="pill" data-preset="${esc(p.id)}">${esc(p.label)}</button>`).join("")}
        </div>
        <div class="bt-grid">
          <div class="as-acts">${block.activities.map(toggle).join("")}</div>
          <div class="bt-right">
            <figure class="bt-chart-fig">
              <div data-ref="map"></div>
              <figcaption class="bt-cap">${esc(block.caption)}</figcaption>
            </figure>
            <div class="tiles tiles-3" data-ref="tiles"></div>
            <div class="happened" aria-live="polite">
              <p class="eyebrow">What's happening</p>
              <p class="happened-t" data-ref="note"></p>
            </div>
            <div>
              <p class="cm-when">${esc(block.linksLabel)}</p>
              <ul class="as-links" data-ref="links" role="list"></ul>
            </div>
          </div>
        </div>
      </section>`;
    },

    mount(root, block) {
      const ref = (n) => root.querySelector(`[data-ref="${n}"]`);
      const optionOf = {};
      block.activities.forEach((a) => a.options.forEach((o) => (optionOf[o.id] = { act: a, opt: o })));
      const refs = Object.fromEntries(block.presets.map((p) => [p.id, evaluate(block, p.picks)]));
      let picks = { ...block.presets[0].picks };

      // Six nodes on a hexagon, in the order the block lists for the map.
      const W = 380;
      const H = 300;
      const spot = Object.fromEntries(
        block.mapOrder.map((id, i) => {
          const angle = -Math.PI / 2 + (i * Math.PI) / 3;
          return [id, { x: W / 2 + 140 * Math.cos(angle), y: H / 2 + 112 * Math.sin(angle) }];
        })
      );

      function mapSVG(out) {
        const at = (optId) => spot[optionOf[optId].act.id];
        const line = (l, cls) => {
          const a = at(l.a);
          const b = at(l.b);
          return `<line class="${cls}" x1="${a.x.toFixed(1)}" y1="${a.y.toFixed(1)}" x2="${b.x.toFixed(1)}" y2="${b.y.toFixed(1)}"/>`;
        };
        const nodes = block.activities
          .map((a) => {
            const o = a.options.find((x) => x.id === picks[a.id]);
            const p = spot[a.id];
            const side = a.options.indexOf(o);
            return `<g class="as-node is-side-${side}">
              <rect x="${(p.x - 64).toFixed(1)}" y="${(p.y - 19).toFixed(1)}" width="128" height="38" rx="3"/>
              <text x="${p.x.toFixed(1)}" y="${(p.y - 4).toFixed(1)}" text-anchor="middle" class="as-node-k">${esc(a.name.toUpperCase())}</text>
              <text x="${p.x.toFixed(1)}" y="${(p.y + 11).toFixed(1)}" text-anchor="middle">${esc(o.short)}</text>
            </g>`;
          })
          .join("");
        const label = `${block.caption} ${count(out.fits.length, "link")} reinforce and ${count(out.clashes.length, "link")} clash.`;
        return `<svg class="as-map" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(label)}">
          ${out.fits.map((l) => line(l, "as-fit")).join("")}
          ${out.clashes.map((l) => line(l, "as-clash")).join("")}
          ${nodes}
        </svg>`;
      }

      function describe(out) {
        const match = block.presets.find((p) => p.consistent && block.activities.every((a) => p.picks[a.id] === picks[a.id]));
        const vs = block.presets.filter((p) => p.consistent).map((p) => `${money(refs[p.id].margin)} for ${p.name}`);
        if (match) return `${match.note} ${capital(count(out.fits.length, "link"))} reinforce and none clash. The margin is ${money(out.margin)} a passenger.`;
        const worst = out.clashes.slice().sort((a, b) => b.cost - a.cost)[0];
        return `A straddle: choices from both strategies. ${capital(count(out.fits.length, "link"))} still reinforce and ${count(out.clashes.length, "link")} clash${
          worst ? `, the worst between ${optionOf[worst.a].opt.short.toLowerCase()} and ${optionOf[worst.b].opt.short.toLowerCase()}` : ""
        }. The margin is ${money(out.margin)} a passenger, against ${vs.join(" and ")}.`;
      }
      function update() {
        root.querySelectorAll("[data-act]").forEach((r) => {
          r.checked = picks[r.dataset.act] === r.value;
          r.closest(".ff-opt").classList.toggle("is-on", r.checked);
        });
        root.querySelectorAll("[data-preset]").forEach((b) => {
          const p = block.presets.find((q) => q.id === b.dataset.preset);
          b.setAttribute("aria-pressed", String(block.activities.every((a) => p.picks[a.id] === picks[a.id])));
        });
        const out = evaluate(block, picks);
        ref("map").innerHTML = mapSVG(out);
        ref("tiles").innerHTML = [
          [block.priceLabel, out.price],
          [block.costLabel, out.cost],
          ["Margin", out.margin]
        ]
          .map(([k, v]) => `<div class="tile"><p class="tile-k">${esc(k)}</p><p class="tile-v${v < 0 ? " is-neg" : ""}">${esc(money(v))}</p></div>`)
          .join("");
        ref("note").textContent = describe(out);
        ref("links").innerHTML = [...out.clashes, ...out.fits]
          .map((l) => {
            const clash = (l.cost || 0) > 0;
            return `<li class="${clash ? "is-clash" : "is-fit"}">
              <span class="as-mark" aria-hidden="true">${clash ? "×" : "+"}</span>
              <span><span class="visually-hidden">${clash ? "Clash" : "Reinforces"}: </span><strong>${esc(optionOf[l.a].opt.short)} and ${esc(
                optionOf[l.b].opt.short.toLowerCase()
              )}.</strong> ${esc(l.text)}</span>
            </li>`;
          })
          .join("");
      }

      root.addEventListener("change", (e) => {
        const r = e.target.closest("[data-act]");
        if (!r) return;
        picks[r.dataset.act] = r.value;
        update();
      });
      root.addEventListener("click", (e) => {
        const btn = e.target.closest("[data-preset]");
        if (!btn) return;
        picks = { ...block.presets.find((p) => p.id === btn.dataset.preset).picks };
        update();
      });
      update();
    }
  };
})();
