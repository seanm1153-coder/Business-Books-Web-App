// Chain-link system: spend a fixed number of improvement points on the parts of a
// system whose output is set by its weakest part. Compares with an additive system.
(function () {
  "use strict";
  const { esc } = window.Marginalia.util;

  const listNames = (names) =>
    names.length === 1 ? names[0] : `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;

  window.Marginalia.blocks["chain-link"] = {
    render(block, ctx) {
      return `<section class="chain" aria-labelledby="${ctx.uid}-h">
        <div class="spot-head">
          <p class="eyebrow">Exercise</p>
          <h2 class="h2" id="${ctx.uid}-h">${esc(block.title)}</h2>
          <p class="section-dek">${esc(block.intro)}</p>
        </div>
        <div class="chain-grid">
          <div class="chain-links">
            <p class="chain-budget" data-ref="budget"></p>
            <ol class="links" data-ref="links" role="list"></ol>
            <div class="log-actions">
              <button type="button" class="pill" data-ref="reset">Start over</button>
            </div>
          </div>
          <div class="chain-out">
            <div class="meter-row">
              <p class="meter-k">${esc(block.outputLabel)}, chain-link</p>
              <p class="meter-v" data-ref="chain-v"></p>
              <div class="meter"><span data-ref="chain-bar"></span></div>
              <p class="meter-sub" data-ref="chain-sub"></p>
            </div>
            <div class="meter-row is-quiet">
              <p class="meter-k">If the parts simply added up</p>
              <p class="meter-v" data-ref="add-v"></p>
              <div class="meter"><span data-ref="add-bar"></span></div>
              <p class="meter-sub">The average of all five. Here every improvement counts a little.</p>
            </div>
            <div class="happened" aria-live="polite">
              <p class="eyebrow">What just happened</p>
              <p class="happened-t" data-ref="note"></p>
            </div>
            <p class="chain-wasted" data-ref="wasted"></p>
          </div>
        </div>
        <div class="fin-dock">
          <p>${esc(block.outputLabel)} <span data-ref="dock-v"></span></p>
          <p>Points left <span data-ref="dock-points"></span></p>
        </div>
      </section>`;
    },

    mount(root, block) {
      const ref = (n) => root.querySelector(`[data-ref="${n}"]`);
      let levels;
      let points;
      let wasted;
      let note;

      function reset() {
        levels = block.links.map((l) => l.level);
        points = block.points;
        wasted = 0;
        note = block.startNote;
        render();
      }

      const min = () => Math.min(...levels);
      const weakest = () => block.links.filter((_, i) => levels[i] === min()).map((l) => l.name);

      function improve(i) {
        if (!points || levels[i] >= 10) return;
        const before = min();
        const wasWeakest = levels[i] === before;
        const name = block.links[i].name;
        levels[i]++;
        points--;
        const after = min();
        if (after > before) {
          const tied = weakest();
          note = `${name} rose to ${levels[i]}, and the whole ${block.outputNoun} rose with it.`;
          if (tied.length > 1 || tied[0] !== name) {
            const others = tied.filter((t) => t !== name);
            note += ` ${listNames(others)} ${others.length === 1 ? "is" : "are"} now just as weak, so ${others.length === 1 ? "it has" : "they have"} to improve next.`;
          }
        } else if (wasWeakest) {
          // Not wasted: one of several tied weakest links has to move first.
          const others = weakest();
          note = `${name} rose to ${levels[i]}, but nothing changed: ${listNames(others)} ${others.length === 1 ? "is" : "are"} still at ${after}. No single improvement pays off on its own. Rumelt calls this being stuck.`;
        } else {
          wasted++;
          note = `${name} rose to ${levels[i]}. The ${block.outputNoun} didn't change, because it's still limited by ${listNames(weakest())} at ${after}. That point was wasted.`;
        }
        if (!points) note += " That was your last point.";
        render();
        const btn = root.querySelector(`[data-improve="${i}"]`);
        if (btn && !btn.disabled) btn.focus();
      }

      function render() {
        const lo = min();
        const avg = levels.reduce((a, b) => a + b, 0) / levels.length;
        ref("budget").innerHTML = `<span class="tnum">${points}</span> improvement ${points === 1 ? "point" : "points"} left`;
        ref("links").innerHTML = block.links
          .map((l, i) => {
            const weak = levels[i] === lo;
            return `<li class="link-card${weak ? " is-weak" : ""}">
              <div class="link-head">
                <span class="link-name">${esc(l.name)}</span>
                ${weak ? '<span class="chip chip-weak">Weakest</span>' : ""}
                <span class="link-level tnum">${levels[i]}<span>/10</span></span>
              </div>
              <div class="link-bar" aria-hidden="true">${Array.from({ length: 10 }, (_, k) => `<i class="${k < levels[i] ? "on" : ""}"></i>`).join("")}</div>
              <p class="link-d">${esc(l.desc)}</p>
              <button type="button" class="pill link-btn" data-improve="${i}" ${!points || levels[i] >= 10 ? "disabled" : ""} aria-label="Improve ${esc(l.name)}">+ Improve</button>
            </li>`;
          })
          .join("");
        ref("chain-v").innerHTML = `${lo}<span>/10</span>`;
        ref("chain-bar").style.width = lo * 10 + "%";
        ref("chain-sub").textContent = `Set by ${listNames(weakest())}.`;
        ref("add-v").innerHTML = `${avg.toFixed(1)}<span>/10</span>`;
        ref("add-bar").style.width = avg * 10 + "%";
        ref("note").textContent = note;
        ref("dock-v").textContent = `${lo}/10`;
        ref("dock-points").textContent = points;
        ref("wasted").textContent = wasted ? `${wasted} of ${block.points - points} ${block.points - points === 1 ? "point" : "points"} spent without improving the ${block.outputNoun}.` : "";
      }

      ref("links").addEventListener("click", (e) => {
        const btn = e.target.closest("[data-improve]");
        if (btn) improve(Number(btn.dataset.improve));
      });
      ref("reset").addEventListener("click", reset);
      reset();
    }
  };
})();
