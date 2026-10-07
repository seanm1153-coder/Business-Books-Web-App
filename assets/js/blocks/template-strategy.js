// The strategy template machine: generates a plausible vision, mission, values and goals
// from stock phrases, then counts the choices in it (there never are any).
(function () {
  "use strict";
  const { esc } = window.Marginalia.util;

  const BANK = {
    adj: ["most trusted", "most innovative", "leading", "best-loved", "most customer-centric", "premier"],
    noun: ["partner", "provider", "platform", "destination", "brand"],
    thing: ["integrated solutions", "connected experiences", "sustainable value", "digital services", "everyday essentials"],
    scope: ["in every market we serve", "worldwide", "for the communities we serve", "across the region"],
    verb: ["empower", "delight", "serve", "enable"],
    who: ["our customers", "the people and businesses we serve", "every stakeholder"],
    means: [
      "delivering innovative, high-quality solutions",
      "leveraging our people, technology and partnerships",
      "putting customers at the center of everything we do",
      "combining operational excellence with a passion for service"
    ],
    values: ["Integrity", "Excellence", "Innovation", "Customer focus", "Teamwork", "Accountability", "Respect", "Passion", "Agility", "Sustainability", "Courage", "Ownership"],
    goals: [
      "Grow revenue {n}% a year",
      "Achieve best-in-class customer satisfaction",
      "Be number one or two in every market we serve",
      "Expand operating margin by {m} points",
      "Double digital sales by {y}",
      "Be a great place to work"
    ]
  };

  const FLUFF = /\b(trusted|innovative|innovation|leading|best-loved|customer-centric|premier|integrated|connected|sustainable|solutions|experiences|empower|delight|enable|leverag\w*|excellence|passion|best-in-class|great place)\b/gi;

  function rng(seed) {
    let s = seed;
    return () => {
      s = (s * 16807) % 2147483647;
      return (s - 1) / 2147483646;
    };
  }

  function generate(rand) {
    const pick = (arr) => arr[Math.floor(rand() * arr.length)];
    const pickN = (arr, n) => {
      const pool = arr.slice();
      const out = [];
      while (out.length < n) out.push(pool.splice(Math.floor(rand() * pool.length), 1)[0]);
      return out;
    };
    const fill = (s) => s.replace("{n}", 8 + Math.floor(rand() * 8)).replace("{m}", 2 + Math.floor(rand() * 4)).replace("{y}", 2027 + Math.floor(rand() * 4));
    return {
      vision: `To be the ${pick(BANK.adj)} ${pick(BANK.noun)} of ${pick(BANK.thing)} ${pick(BANK.scope)}.`,
      mission: `We ${pick(BANK.verb)} ${pick(BANK.who)} by ${pick(BANK.means)}.`,
      values: pickN(BANK.values, 4),
      goals: pickN(BANK.goals, 3).map(fill)
    };
  }

  function count(plan) {
    const text = [plan.vision, plan.mission, ...plan.values, ...plan.goals].join(" ");
    const fluff = (text.match(FLUFF) || []).length;
    return { fluff, goals: plan.goals.length };
  }

  window.Marginalia.blocks["template-strategy"] = {
    render(block, ctx) {
      return `<section class="tpl" aria-labelledby="${ctx.uid}-h">
        <div class="spot-head">
          <p class="eyebrow">Exercise</p>
          <h2 class="h2" id="${ctx.uid}-h">${esc(block.title)}</h2>
          <p class="section-dek">${esc(block.intro)}</p>
        </div>
        <div class="tpl-grid">
          <div class="tpl-card" data-ref="card" aria-live="polite"></div>
          <aside class="tpl-detector">
            <p class="eyebrow">Choice detector</p>
            <ul class="tpl-counts" data-ref="counts" role="list"></ul>
            <p class="tpl-verdict">${esc(block.verdict)}</p>
            <div class="log-actions">
              <button type="button" class="btn-primary" data-ref="again">Generate another</button>
            </div>
          </aside>
        </div>
      </section>`;
    },

    mount(root, block) {
      const ref = (n) => root.querySelector(`[data-ref="${n}"]`);
      let rand = rng(42);
      let made = 0;

      function render() {
        const plan = generate(rand);
        made++;
        const c = count(plan);
        ref("card").innerHTML = `
          <p class="tpl-co">Strategy on a page · Draft ${made}</p>
          <div class="tpl-sec"><p class="tpl-k">Our vision</p><p class="tpl-vision">${esc(plan.vision)}</p></div>
          <div class="tpl-sec"><p class="tpl-k">Our mission</p><p>${esc(plan.mission)}</p></div>
          <div class="tpl-sec"><p class="tpl-k">Our values</p><ul class="tpl-values" role="list">${plan.values.map((v) => `<li>${esc(v)}</li>`).join("")}</ul></div>
          <div class="tpl-sec"><p class="tpl-k">Our strategic goals</p><ol class="tpl-goals">${plan.goals.map((g) => `<li>${esc(g)}</li>`).join("")}</ol></div>`;
        const rows = [
          ["Challenges named", 0, true],
          ["Things ruled out", 0, true],
          ["Actions anyone could start on Monday", 0, true],
          ["Goals", c.goals, false],
          ["Buzzwords", c.fluff, false]
        ];
        ref("counts").innerHTML = rows
          .map(([label, n, isChoice]) => `<li class="${isChoice ? "is-zero" : ""}"><span>${label}</span><span class="tnum">${n}</span></li>`)
          .join("");
      }

      ref("again").addEventListener("click", () => {
        if (made === 1) rand = rng(Date.now() % 2147483646 || 7);
        render();
      });
      render();
    }
  };
})();
