// Now or later: a sum today against larger sums later, judged at a rate the reader sets.
//   present value = amount ÷ (1 + rate)^years
// Each later offer is better than the money now only while its present value is higher.
(function () {
  "use strict";
  const { esc } = window.Marginalia.util;

  const dollars = (v) => "$" + Math.round(v).toLocaleString("en-US");
  const pct = (r) => (Math.round(r * 1000) / 10).toString().replace(/\.0$/, "") + "%";
  const TIE = 50; // within $50 counts as about the same

  window.Marginalia.blocks["now-or-later"] = {
    render(block, ctx) {
      const r = block.rate;
      return `<section class="tv" aria-labelledby="${ctx.uid}-h">
        <div class="spot-head">
          <p class="eyebrow">Exercise</p>
          <h2 class="h2" id="${ctx.uid}-h">${esc(block.title)}</h2>
          <p class="section-dek">${esc(block.intro)}</p>
        </div>
        <div class="tv-controls">
          <div class="lever">
            <label class="lever-label" for="${ctx.uid}-rate">
              <span class="lever-t">${esc(block.rateLabel)}</span>
              <span class="lever-v tnum" data-ref="rate-v"></span>
            </label>
            <input type="range" id="${ctx.uid}-rate" data-ref="rate" min="${r.min}" max="${r.max}" step="${r.step}" value="${r.start}">
            <p class="lever-hint">${esc(block.rateHint)}</p>
          </div>
          <div class="jc-presets" role="group" aria-label="Rates to try">
            <span class="examples-k">Try</span>
            ${block.presets.map((p) => `<button type="button" class="pill" data-rate="${p.rate}">${esc(p.label)}</button>`).join("")}
          </div>
        </div>
        <p class="tv-now">Take <strong class="tnum">${dollars(block.now)}</strong> today, or:</p>
        <ol class="tv-offers" role="list" data-ref="offers"></ol>
        <div class="happened" aria-live="polite">
          <p class="eyebrow">At this rate</p>
          <p class="happened-t" data-ref="note"></p>
        </div>
        <p class="fin-foot">${esc(block.foot)}</p>
      </section>`;
    },

    mount(root, block) {
      const ref = (n) => root.querySelector(`[data-ref="${n}"]`);
      const input = ref("rate");
      const max = Math.max(block.now, ...block.offers.map((o) => o.amount));
      const x = (v) => ((v / max) * 100).toFixed(2) + "%";

      function render() {
        const rate = Number(input.value);
        ref("rate-v").textContent = pct(rate);
        let later = 0;
        ref("offers").innerHTML = block.offers
          .map((o) => {
            const factor = Math.pow(1 + rate, o.years);
            const pv = o.amount / factor;
            const diff = pv - block.now;
            const verdict = Math.abs(diff) < TIE ? "even" : diff > 0 ? "later" : "now";
            if (verdict === "later") later++;
            const label = { even: "About the same", later: "Take the later money", now: `Take ${dollars(block.now)} now` }[verdict];
            return `<li class="tv-offer is-${verdict}">
              <div class="tv-head">
                <span class="tv-t"><strong class="tnum">${dollars(o.amount)}</strong> in ${o.years} ${o.years === 1 ? "year" : "years"}</span>
                <span class="tv-verdict">${label}</span>
              </div>
              <div class="tv-track" aria-hidden="true">
                <span class="tv-bar" style="width:${x(pv)}"></span>
                <span class="tv-mark" style="left:${x(block.now)}"></span>
              </div>
              <p class="tv-math tnum">${dollars(o.amount)} ÷ ${(1 + rate).toFixed(3).replace(/0+$/, "").replace(/\.$/, "")}<sup>${o.years}</sup> = <strong>${dollars(pv)}</strong> today</p>
            </li>`;
          })
          .join("");
        const n = block.offers.length;
        ref("note").textContent =
          `At ${pct(rate)}, ${later} of ${n} later offers ${later === 1 ? "is" : "are"} worth more than ${dollars(block.now)} today. ` +
          (rate === 0
            ? "With no return available elsewhere, waiting costs nothing, so the bigger number always wins."
            : later === 0
              ? "Money now wins everywhere: invested at this rate, it would grow past every later offer."
              : later === n
                ? "Every later offer beats investing the money now at this rate."
                : "The offers that wait longest lose the most as the rate rises, because the rate compounds once for every year.");
      }

      input.addEventListener("input", render);
      root.addEventListener("click", (e) => {
        const btn = e.target.closest("[data-rate]");
        if (!btn) return;
        input.value = btn.dataset.rate;
        render();
      });
      render();
    }
  };
})();
