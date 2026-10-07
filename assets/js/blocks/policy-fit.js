// Policy fit: pick one option per policy; each option aims at one segment or at everyone.
// Strength in a segment = policies aimed there + one for every pair of them (they reinforce
// each other). Options for everyone add a point to every segment and reinforce nothing.
// A segment is led when strength beats the strongest rival there.
(function () {
  "use strict";
  const { esc, capitalize } = window.Marginalia.util;

  const ALL = "all";
  const pairs = (n) => (n * (n - 1)) / 2;
  const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`;

  function score(block, choice) {
    const picks = block.policies.map((p) => choice[p.id]).filter(Boolean);
    const broad = picks.filter((t) => t === ALL).length;
    const segs = block.segments.map((s) => {
      const n = picks.filter((t) => t === s.id).length;
      const strength = n + pairs(n) + broad;
      return { ...s, n, pairs: pairs(n), strength, lead: strength > s.rival.strength };
    });
    return { picks, broad, segs };
  }

  window.Marginalia.blocks["policy-fit"] = {
    render(block, ctx) {
      const tagFor = Object.fromEntries(block.segments.map((s) => [s.id, s.short]));
      tagFor[ALL] = block.allLabel;
      return `<section class="pf" aria-labelledby="${ctx.uid}-h">
        <div class="spot-head">
          <p class="eyebrow">Exercise</p>
          <h2 class="h2" id="${ctx.uid}-h">${esc(block.title)}</h2>
          <p class="section-dek">${esc(block.intro)}</p>
        </div>
        <div class="jc-presets" role="group" aria-label="Presets">
          <span class="examples-k">Try</span>
          ${block.presets.map((p) => `<button type="button" class="pill" data-preset="${esc(p.id)}">${esc(p.label)}</button>`).join("")}
        </div>
        <div class="pf-grid">
          <div class="jc-calls">
            ${block.policies
              .map(
                (p) => `<fieldset class="jc-call">
                  <legend><span class="jc-t">${esc(p.title)}</span><span class="jc-q">${esc(p.question)}</span></legend>
                  <div class="jc-opts">
                    ${p.options
                      .map(
                        (o) => `<label class="jc-opt">
                          <input type="radio" name="${ctx.uid}-${esc(p.id)}" value="${esc(o.target)}" data-policy="${esc(p.id)}">
                          <span class="jc-opt-t">${esc(o.label)}</span>
                          <span class="jc-tag${o.target === ALL ? " pf-tag-all" : ""}">${esc(tagFor[o.target])}</span>
                        </label>`
                      )
                      .join("")}
                  </div>
                </fieldset>`
              )
              .join("")}
          </div>
          <aside class="pf-out">
            <div class="tiles">
              <div class="tile"><p class="tile-k">${esc(block.ledLabel)}</p><p class="tile-v" data-ref="led"></p></div>
              <div class="tile"><p class="tile-k">${esc(block.valueLabel)}</p><p class="tile-v" data-ref="value"></p></div>
            </div>
            <ol class="pf-segs" data-ref="segs" role="list"></ol>
            <div class="happened" aria-live="polite">
              <p class="eyebrow">What's happening</p>
              <p class="happened-t" data-ref="note"></p>
            </div>
          </aside>
        </div>
        <p class="fin-foot pf-foot">${esc(block.foot)}</p>
        <div class="fin-dock">
          <p>${esc(block.ledLabel)} <span data-ref="dock-led"></span></p>
          <p>${esc(block.valueLabel)} <span data-ref="dock-value"></span></p>
        </div>
      </section>`;
    },

    mount(root, block) {
      const ref = (n) => root.querySelector(`[data-ref="${n}"]`);
      const total = block.policies.length;
      // The scale fits the strongest possible position and the strongest rival.
      const scale = Math.max(total + pairs(total), ...block.segments.map((s) => s.rival.strength));
      const money = (v) => `${block.unit.before}${v}${block.unit.after}`;
      const presetById = Object.fromEntries(block.presets.map((p) => [p.id, p]));
      const fromPreset = (id) => Object.fromEntries(block.policies.map((p, i) => [p.id, presetById[id].picks[i] || null]));
      let choice = fromPreset(block.start);

      function explain({ picks, broad, segs }) {
        if (!picks.length) return block.emptyNote;
        const led = segs.filter((s) => s.lead);
        const top = segs.slice().sort((a, b) => b.n - a.n)[0];
        let note;
        if (led.length) {
          const s = led[0];
          note = `${plural(s.n, "policy points", "policies point")} at ${s.name}, which makes ${plural(s.pairs, "reinforcing pair", "reinforcing pairs")} and a strength of ${s.strength} against ${s.rival.name} at ${s.rival.strength}.`;
          if (s.together) note += ` ${s.together}`;
          const rest = picks.length - s.n - broad;
          if (rest) note += ` ${rest === 1 ? "The remaining policy points elsewhere and adds" : `The remaining ${rest} policies point elsewhere and add`} little on ${rest === 1 ? "its" : "their"} own.`;
        } else if (top.n >= total - 1) {
          note = `${plural(top.n, "policy points", "policies point")} at ${top.name} and they reinforce each other, but they still fall short of ${top.rival.name}: ${top.strength} against ${top.rival.strength}. Coordination builds power. Where you aim it is the other half of focus.`;
        } else if (broad > total / 2) {
          note = `${plural(broad, "policy tries", "policies try")} to serve everyone. Each adds a point to every group but reinforces nothing, so every rival stays ahead.`;
        } else {
          const dirs = new Set(picks).size;
          note = `Your policies point in ${dirs} ${dirs === 1 ? "direction" : "different directions"}. No group gets more than ${top.n} of them, so the reinforcing pairs never build up and every rival stays ahead.`;
        }
        const unset = total - picks.length;
        if (unset) note += ` ${plural(unset, "policy is", "policies are")} still to set.`;
        return note;
      }

      function render() {
        block.policies.forEach((p) => {
          root.querySelectorAll(`[data-policy="${p.id}"]`).forEach((input) => (input.checked = input.value === choice[p.id]));
        });
        const s = score(block, choice);
        const led = s.segs.filter((x) => x.lead);
        const value = led.reduce((sum, x) => sum + x.size, 0);
        const pct = (v) => ((v / scale) * 100).toFixed(1) + "%";
        ref("segs").innerHTML = s.segs
          .map(
            (x) => `<li class="pf-seg${x.lead ? " is-lead" : ""}">
              <div class="pf-seg-head">
                <span class="pf-seg-name">${esc(capitalize(x.name))}</span>
                <span class="pf-seg-size">${esc(money(x.size))} ${esc(block.sizeNote)}</span>
              </div>
              <div class="pf-bar" aria-hidden="true">
                <span class="pf-bar-k">${esc(block.company)}</span>
                <span class="pf-track"><span class="pf-fill" style="width:${pct(x.strength)}"></span></span>
                <span class="pf-bar-v tnum">${x.strength}</span>
              </div>
              <div class="pf-bar is-rival" aria-hidden="true">
                <span class="pf-bar-k">${esc(x.rival.short)}</span>
                <span class="pf-track"><span class="pf-fill" style="width:${pct(x.rival.strength)}"></span></span>
                <span class="pf-bar-v tnum">${x.rival.strength}</span>
              </div>
              <p class="pf-seg-meta">
                <span class="visually-hidden">${esc(block.company)} ${x.strength}, ${esc(x.rival.name)} ${x.rival.strength}. </span>${plural(x.n, "policy", "policies")} · ${plural(x.pairs, "pair", "pairs")} ·
                ${x.lead ? '<span class="pf-status is-lead">You lead</span>' : `<span class="pf-status">${x.strength === x.rival.strength ? "Level" : `Behind by ${x.rival.strength - x.strength}`}</span>`}
              </p>
            </li>`
          )
          .join("");
        ref("led").textContent = `${led.length} of ${s.segs.length}`;
        ref("value").textContent = money(value);
        ref("dock-led").textContent = `${led.length} of ${s.segs.length}`;
        ref("dock-value").textContent = money(value);
        ref("note").textContent = explain(s);
      }

      root.addEventListener("change", (e) => {
        const input = e.target.closest("[data-policy]");
        if (!input) return;
        choice[input.dataset.policy] = input.value;
        render();
      });
      root.addEventListener("click", (e) => {
        const btn = e.target.closest("[data-preset]");
        if (!btn) return;
        choice = fromPreset(btn.dataset.preset);
        render();
      });
      render();
    }
  };
})();
