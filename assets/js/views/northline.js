// Northline: a year in three books. Four quarterly decisions, each read through a
// different book, flowing through one financial model (assets/js/northline-model.js).
(function () {
  "use strict";
  const M = window.Marginalia;
  const { esc } = M.util;
  const Model = window.NorthlineModel;

  const millions = (v) => "$" + (v / 1e6).toFixed(1) + "M";
  const k = (v) => (v < 0 ? "−" : "") + "$" + Math.round(Math.abs(v) / 1000).toLocaleString("en-US") + "k";

  const SCENES = [
    {
      when: "January",
      lens: { book: "Good Strategy Bad Strategy", page: "#gsbs-kernel", label: "The kernel" },
      situation:
        "A cheaper rival is winning shelf space at Northline's dealers. Northline sells fourteen models across every kind of riding, and sales have gone flat.",
      question: "What's the strategy for the year?",
      options: [
        {
          id: "price",
          label: "Match the rival's prices across the range",
          detail: "Protect volume. Every model gets a price cut.",
          note: "Rumelt would ask for the diagnosis first. Matching prices fights on the rival's terms and spreads the cut across every model, including the ones nobody wanted. Volume holds; margins fall.",
          link: ["#gsbs-kernel", "The kernel"]
        },
        {
          id: "focus",
          label: "Cut to four commuter models and leave the discount dealers",
          detail: "Commuting is the one segment where Northline's frames win reviews.",
          note: "A diagnosis (Northline wins with commuters and loses everywhere else) and a guiding policy that rules things out. Revenue dips, margins rise, and with fewer models far less stock sits in the warehouse.",
          link: ["#gsbs-kernel", "The kernel"]
        },
        {
          id: "vision",
          label: "Launch “Northline 2030: the most loved bike brand”",
          detail: "A brand campaign and an all-hands to rally the company.",
          note: "A goal dressed up as a strategy. It says where Northline wants to end up and nothing about the rival or the flat sales. The campaign costs $250k and changes nothing else.",
          link: ["#gsbs-bad-strategy", "Bad strategy"]
        }
      ]
    },
    {
      when: "April",
      lens: { book: "Financial Intelligence", page: "#fi-profit-cash", label: "Profit isn't cash" },
      situation:
        "CityCycle, a chain of forty urban bike shops, offers a $1.2 million annual order. Their terms: payment in 90 days. Northline's customers usually pay in about 65.",
      question: "Do you take the order?",
      options: [
        {
          id: "accept90",
          label: "Take it on their terms",
          detail: "Revenue up $1.2 million a year, paid in 90 days.",
          note: "Profit rises with the new sales, but each dollar CityCycle owes sits in receivables for three months, and the stock to fill the order has to be paid for first. Watch the cash line.",
          link: ["#fi-profit-cash", "Profit isn't cash"]
        },
        {
          id: "accept45",
          label: "Take it, but trade a 2% discount for payment in 45 days",
          detail: "A little less revenue, much faster cash.",
          note: "Two percent of the order buys 45 days. Profit is slightly lower than taking their terms; the cash tied up in receivables is half as much.",
          link: ["#fi-working-capital", "Working capital levers"]
        },
        {
          id: "decline",
          label: "Turn it down",
          detail: "Keep the balance sheet as it is.",
          note: "Safe for cash, but Northline passes up profitable growth that better payment terms could have financed.",
          link: ["#fi-working-capital", "Working capital levers"]
        }
      ]
    },
    {
      when: "July",
      lens: { book: "Play Bigger", page: "#pb-lightning-strike", label: "The lightning strike" },
      situation:
        "Northline's new frames have GPS theft tracking built into the down tube. Nobody else has it. Marketing has $250,000 to spend.",
      question: "How do you take it to market?",
      options: [
        {
          id: "features",
          label: "Add it to the spec sheet",
          detail: "“The commuter bike with the most features.” Keep the budget.",
          note: "Playing smaller. A feature on a spec sheet invites buyers to compare it with everyone else's. Sales tick up a little.",
          link: ["#pb-category-kings", "Category kings"]
        },
        {
          id: "category",
          label: "Name a category and strike",
          detail: "“Theft-proof commuting”: publish the point of view, then one concentrated launch.",
          note: {
            focus: "Playing bigger, and the company backs it up: a focused commuter range makes the story believable. The strike lands and Northline starts to define the category.",
            other: "The strike lands, but the story doesn't match the company: a commuter category from a brand selling fourteen models of everything. Rumelt would call it incoherent. Some lift, much less than it could have been."
          },
          link: ["#pb-lightning-strike", "The lightning strike"]
        },
        {
          id: "drip",
          label: "Spread the budget over the rest of the year",
          detail: "A steady drip of ads and posts through December.",
          note: "The same money, spread thin. Each ad fades before the next arrives and the market never quite notices.",
          link: ["#pb-lightning-strike", "The lightning strike"]
        }
      ]
    },
    {
      when: "October",
      lens: { book: "Financial Intelligence", page: "#fi-profit-estimate", label: "Profit is an estimate" },
      situation:
        "The board wants a stronger profit number for the year. Finance points out that the equipment could reasonably be depreciated over ten years instead of five.",
      question: "Do you change the estimate?",
      options: [
        {
          id: "stretch",
          label: "Switch to ten-year depreciation",
          detail: "Reported profit rises this quarter.",
          note: "Reported profit is $60k higher this quarter. The business is exactly the same, and so is the cash. Defensible, but it's an estimate moving, not the company improving.",
          link: ["#fi-profit-estimate", "Profit is an estimate"]
        },
        {
          id: "keep",
          label: "Keep five years",
          detail: "Report the numbers as they are.",
          note: "Nothing changes, which is the point: the numbers describe what the business actually did.",
          link: ["#fi-profit-estimate", "Profit is an estimate"]
        }
      ]
    }
  ];

  const ENDINGS = {
    "A category king in the making": "Focus made the product believable, and a concentrated launch let Northline name the category. Profit and cash both grew without new borrowing.",
    "Defining the category, on borrowed money": "Northline is defining the category, but the growth was financed by the bank.",
    "Profitable on paper, short of cash": "The income statement shows a profit, but slower collections and thinner margins drained the bank account. The credit line covered the gap.",
    "Losing money and borrowing to keep going": "Thin margins and spending without focus turned into losses, and the bank kept Northline afloat.",
    "A strong launch with no strategy behind it": "The category launch made noise, but without a focused company behind it the story and the business didn't match.",
    "Busy, but stuck": "Plenty of activity, no choice at the center of it. Northline ends the year much as it began.",
    "Focused and profitable, but still unknown": "The focused range is working and cash is healthy. The theft-tracking frames could have defined a category; the market still sees one brand among many."
  };

  const noteFor = (opt, state) => (typeof opt.note === "string" ? opt.note : state.focus ? opt.note.focus : opt.note.other);

  function ledgerHTML(result) {
    const qs = result.quarters;
    const col = (label, pick, cls) => `<tr${cls ? ` class="${cls}"` : ""}><th scope="row">${label}</th>${[0, 1, 2, 3].map((i) => `<td>${qs[i] ? pick(qs[i]) : ""}</td>`).join("")}</tr>`;
    return `<table class="nl-table">
      <thead><tr><th scope="col"><span class="visually-hidden">Line</span></th>${SCENES.map((s, i) => `<th scope="col">Q${i + 1}</th>`).join("")}</tr></thead>
      <tbody>
        ${col("Revenue", (q) => k(q.revenue))}
        ${col("Profit", (q) => `<span class="${q.profit < 0 ? "is-neg" : ""}">${k(q.profit)}</span>`)}
        ${col("Cash from operations", (q) => `<span class="${q.cfo < 0 ? "is-neg" : ""}">${k(q.cfo)}</span>`)}
        ${col("Borrowed", (q) => (q.borrowed ? `<span class="is-neg">${k(q.borrowed)}</span>` : "–"))}
        ${col("Cash at end", (q) => k(q.cash), "is-total")}
      </tbody>
    </table>`;
  }

  M.views.northline = {
    title: "Northline",
    crumb: "Northline",
    render(view) {
      const saved = M.memory.draft("northline");
      let choices = saved && Array.isArray(saved.choices) ? saved.choices.slice(0, SCENES.length) : [];
      let revealed = choices.length; // decisions whose consequences have been shown
      let started = Boolean(saved);

      function save() {
        M.memory.setDraft("northline", { choices });
      }

      function render() {
        const result = Model.run(choices);
        const step = choices.length;
        const done = step === SCENES.length && revealed === step;
        const s = result.state;

        let main;
        if (step === 0 && !started) {
          main = intro();
        } else if (revealed < step) {
          main = consequence(step - 1, result);
        } else if (!done) {
          main = scene(step);
        } else {
          main = ending(result);
        }

        view.innerHTML = `
          <article class="paper-section northline">
            <div class="wrap">
              <header class="concept-head">
                <p class="eyebrow">A year in three books</p>
                <h1 class="display concept-title">Northline</h1>
                <p class="dek">Four decisions for an invented bike maker, one per quarter. Each is read through a different book, and every choice flows through the same income statement and bank balance.</p>
              </header>
              <div class="nl-grid">
                <div class="nl-main" aria-live="polite">${main}</div>
                <aside class="nl-ledger">
                  <p class="eyebrow">Northline's ledger</p>
                  <div class="tiles">
                    <div class="tile"><p class="tile-k">Cash in the bank</p><p class="tile-v">${k(s.cash)}</p><p class="tile-sub">${s.borrowed ? `${k(s.borrowed)} borrowed so far` : `The bank wants at least ${k(s.minCash)}`}</p></div>
                    <div class="tile"><p class="tile-k">Revenue run rate</p><p class="tile-v">${millions(s.revenue)}</p><p class="tile-sub">${esc(Model.POSITIONS[s.position])}</p></div>
                  </div>
                  ${result.quarters.length ? ledgerHTML(result) : `<p class="nl-start-note">January 1: $12 million in sales, customers taking 65 days to pay, stock sitting 85 days, and ${k(s.cash)} in the bank. The same company as on <a href="#fi-ratios">Reading the ratios</a>.</p>`}
                  <ol class="nl-steps" role="list">
                    ${SCENES.map((sc, i) => `<li class="${i < revealed ? "is-done" : i === step ? "is-now" : ""}"><span>Q${i + 1}</span>${esc(sc.lens.book)}</li>`).join("")}
                  </ol>
                </aside>
              </div>
            </div>
          </article>`;
        const focusTarget = view.querySelector(".nl-main [data-autofocus]");
        if (focusTarget) focusTarget.focus({ preventScroll: true });
      }

      function intro() {
        return `<section class="nl-card">
          <p class="nl-when">Before the year starts</p>
          <h2 class="nl-q">You run Northline Bikes.</h2>
          <p>Last year sales grew by a fifth and the income statement looked fine, but the ratios told a more worried story: slower collections, stock piling up, more debt, and cash down to $350,000.</p>
          <p>This year you'll make four calls. The first draws on <em>Good Strategy Bad Strategy</em>, the second and fourth on <em>Financial Intelligence</em>, the third on <em>Play Bigger</em>. The ledger on the right keeps score in the only currency that can't be argued with: cash.</p>
          <button type="button" class="btn-primary" data-act="start" data-autofocus>Start the year</button>
        </section>`;
      }

      function scene(i) {
        const sc = SCENES[i];
        return `<section class="nl-card">
          <p class="nl-when">Q${i + 1} · ${esc(sc.when)} <a class="nl-lens" href="${sc.lens.page}">${esc(sc.lens.book)} · ${esc(sc.lens.label)}</a></p>
          <p class="nl-situation">${esc(sc.situation)}</p>
          <h2 class="nl-q">${esc(sc.question)}</h2>
          <div class="nl-options" role="group" aria-label="${esc(sc.question)}">
            ${sc.options
              .map(
                (o, n) => `<button type="button" class="nl-option" data-choose="${o.id}"${n === 0 ? " data-autofocus" : ""}>
                  <span class="nl-opt-t">${esc(o.label)}</span>
                  <span class="nl-opt-d">${esc(o.detail)}</span>
                </button>`
              )
              .join("")}
          </div>
          ${i > 0 ? `<button type="button" class="pill nl-restart" data-act="restart">Start the year over</button>` : ""}
        </section>`;
      }

      function consequence(i, result) {
        const sc = SCENES[i];
        const opt = sc.options.find((o) => o.id === choices[i]);
        const q = result.quarters[i];
        const before = Model.run(choices.slice(0, i)).state;
        return `<section class="nl-card">
          <p class="nl-when">Q${i + 1} · ${esc(sc.when)} · You chose</p>
          <h2 class="nl-q">${esc(opt.label)}</h2>
          <div class="tiles tiles-3 nl-q-tiles">
            <div class="tile"><p class="tile-k">Profit this quarter</p><p class="tile-v${q.profit < 0 ? " is-neg" : ""}">${k(q.profit)}</p></div>
            <div class="tile"><p class="tile-k">Cash from operations</p><p class="tile-v${q.cfo < 0 ? " is-neg" : ""}">${k(q.cfo)}</p></div>
            <div class="tile"><p class="tile-k">Cash at end</p><p class="tile-v">${k(q.cash)}</p><p class="tile-sub">${q.borrowed ? `After borrowing ${k(q.borrowed)} to stay above the bank's minimum` : `Was ${k(before.cash)}`}</p></div>
          </div>
          <div class="nl-lens-note">
            <p class="eyebrow">${esc(sc.lens.book)}</p>
            <p>${esc(noteFor(opt, result.state))}</p>
            <a class="nb-link" href="${opt.link[0]}">Read: ${esc(opt.link[1])} →</a>
          </div>
          <div class="nl-actions">
            <button type="button" class="btn-primary" data-act="next" data-autofocus>${i === SCENES.length - 1 ? "See how the year ended" : `On to Q${i + 2}`}</button>
            <button type="button" class="pill" data-act="undo">Choose differently</button>
          </div>
        </section>`;
      }

      function ending(result) {
        const o = Model.outcome(result);
        return `<section class="nl-card nl-ending">
          <p class="nl-when">December 31</p>
          <h2 class="nl-headline">${esc(o.headline)}</h2>
          <p>${esc(ENDINGS[o.headline])}${o.stretched ? " And the profit you reported leans on a longer depreciation schedule, not a better business." : ""}</p>
          <div class="tiles tiles-3 nl-q-tiles">
            <div class="tile"><p class="tile-k">Profit for the year</p><p class="tile-v${o.profit < 0 ? " is-neg" : ""}">${k(o.profit)}</p></div>
            <div class="tile"><p class="tile-k">Cash at year end</p><p class="tile-v">${k(o.cash)}</p><p class="tile-sub">Started at $350k</p></div>
            <div class="tile"><p class="tile-k">Borrowed</p><p class="tile-v${o.borrowed ? " is-neg" : ""}">${o.borrowed ? k(o.borrowed) : "Nothing"}</p></div>
          </div>
          <ol class="nl-recap" role="list">
            ${SCENES.map((sc, i) => {
              const opt = sc.options.find((x) => x.id === choices[i]);
              return `<li><span class="nl-recap-q">Q${i + 1}</span><span class="nl-recap-body"><span class="nl-recap-t">${esc(opt.label)}</span><a href="${opt.link[0]}">${esc(sc.lens.book)} · ${esc(opt.link[1])}</a></span></li>`;
            }).join("")}
          </ol>
          <div class="nl-actions">
            <button type="button" class="btn-primary" data-act="restart" data-autofocus>Play the year again</button>
            <a class="pill" href="#notebook">See it in your notebook</a>
          </div>
        </section>`;
      }

      function finish() {
        const result = Model.run(choices);
        const o = Model.outcome(result);
        M.memory.result("northline", {
          label: o.headline,
          detail: `Profit ${k(o.profit)}, cash ${k(o.cash)}${o.borrowed ? `, ${k(o.borrowed)} borrowed` : ", nothing borrowed"}. ${o.position}.`
        });
      }

      view.addEventListener("click", onClick);
      function onClick(e) {
        const choose = e.target.closest("[data-choose]");
        const act = e.target.closest("[data-act]");
        if (choose) {
          choices = choices.concat(choose.dataset.choose);
          save();
        } else if (act) {
          const a = act.dataset.act;
          if (a === "start") {
            started = true;
            choices = [];
            revealed = 0;
            save();
          } else if (a === "next") {
            revealed = choices.length;
            if (revealed === SCENES.length) finish();
          } else if (a === "undo") {
            choices = choices.slice(0, -1);
            revealed = choices.length;
            save();
          } else if (a === "restart") {
            choices = [];
            revealed = 0;
            save();
          } else return;
        } else return;
        render();
        view.querySelector(".nl-main").scrollIntoView({ behavior: M.util.reducedMotion.matches ? "auto" : "smooth", block: "nearest" });
      }

      render();
      return () => view.removeEventListener("click", onClick);
    }
  };
})();
