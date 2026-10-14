// Double entry: post a run of transactions to a small balance sheet. For each one the
// reader picks the two accounts that change and which way; a balance scale shows assets
// against liabilities plus equity. Wrong entries are shown, explained and taken back.
(function () {
  "use strict";
  const { esc } = window.Marginalia.util;

  const dollars = (v) => (v < 0 ? "−$" : "$") + Math.abs(Math.round(v)).toLocaleString("en-US");
  const MAX_TILT = 9; // degrees

  window.Marginalia.blocks["double-entry"] = {
    render(block, ctx) {
      const options = block.accounts.map((a) => `<option value="${esc(a.id)}">${esc(a.label)}</option>`).join("");
      const changeRow = (n) => `<div class="de-change">
          <label class="de-k" for="${ctx.uid}-acct-${n}">Change ${n}</label>
          <select id="${ctx.uid}-acct-${n}" data-acct="${n}"><option value="">Choose an account</option>${options}</select>
          <div class="de-dir" role="group" aria-label="Change ${n} direction">
            <button type="button" class="pill" data-dir="${n}" data-sign="1" aria-pressed="false">Goes up</button>
            <button type="button" class="pill" data-dir="${n}" data-sign="-1" aria-pressed="false">Goes down</button>
          </div>
        </div>`;
      return `<section class="de" aria-labelledby="${ctx.uid}-h">
        <div class="spot-head">
          <p class="eyebrow">${esc(block.company)} · ${esc(block.period)}</p>
          <h2 class="h2" id="${ctx.uid}-h">${esc(block.title)}</h2>
          <p class="section-dek">${esc(block.intro)}</p>
        </div>
        <div class="de-grid">
          <div class="de-entry">
            <div class="de-card" data-ref="card">
              <p class="sorter-progress" data-ref="progress"></p>
              <p class="de-q" data-ref="q"></p>
              <div class="de-form" data-ref="form">
                ${changeRow(1)}
                ${changeRow(2)}
                <div class="log-actions">
                  <button type="button" class="btn-primary" data-ref="post">Post it</button>
                </div>
              </div>
              <div class="de-feedback" aria-live="polite">
                <p class="de-verdict" data-ref="verdict"></p>
                <p class="de-why" data-ref="why"></p>
                <div class="log-actions" data-ref="after" hidden>
                  <button type="button" class="pill" data-ref="retry">Try again</button>
                  <button type="button" class="pill" data-ref="reveal">Show the answer</button>
                  <button type="button" class="btn-primary" data-ref="next">Next transaction</button>
                </div>
              </div>
            </div>
          </div>
          <div class="de-books">
            <figure class="de-scale" aria-hidden="true">
              <svg viewBox="0 0 320 132">
                <path class="de-post" d="M 160 52 L 146 124 L 174 124 Z"></path>
                <g class="de-beam" data-ref="beam">
                  <rect x="30" y="47" width="260" height="6" rx="3"></rect>
                </g>
                <g class="de-pan" data-ref="pan-a">
                  <line x1="44" y1="50" x2="44" y2="80"></line>
                  <path d="M 4 80 L 84 80 Q 44 104 4 80 Z"></path>
                </g>
                <g class="de-pan" data-ref="pan-c">
                  <line x1="276" y1="50" x2="276" y2="80"></line>
                  <path d="M 236 80 L 316 80 Q 276 104 236 80 Z"></path>
                </g>
                <circle class="de-pivot" cx="160" cy="50" r="5"></circle>
              </svg>
            </figure>
            <div class="tiles">
              <div class="tile"><p class="tile-k">Assets</p><p class="tile-v" data-ref="assets"></p></div>
              <div class="tile"><p class="tile-k">Liabilities + equity</p><p class="tile-v" data-ref="claims"></p></div>
            </div>
            <p class="de-status" data-ref="status"></p>
            <section class="statement">
              <h3 class="st-t">Balance sheet</h3>
              <p class="st-sub">${esc(block.sheetNote)}</p>
              <table class="st-table"><tbody data-ref="sheet"></tbody></table>
            </section>
          </div>
        </div>
        <div class="fin-dock">
          <p>Assets <span data-ref="dock-a"></span></p>
          <p>Liabilities + equity <span data-ref="dock-c"></span></p>
        </div>
      </section>`;
    },

    mount(root, block, ctx) {
      const ref = (n) => root.querySelector(`[data-ref="${n}"]`);
      const byId = Object.fromEntries(block.accounts.map((a) => [a.id, a]));
      const sideTotal = (b, side) => block.accounts.filter((a) => a.side === side).reduce((s, a) => s + b[a.id], 0);
      // The scale's sensitivity: a gap the size of the biggest transaction tips it fully.
      const fullTilt = Math.max(...block.moves.map((m) => m.amount));

      let books;
      let i;
      let picks;
      let trial; // the books with a wrong entry applied, shown until the reader retries
      let touched;
      let state; // "choose" | "right" | "wrong"
      let firstTry;
      let score;

      function start() {
        books = { ...block.start };
        i = 0;
        score = 0;
        load();
      }

      function load() {
        picks = { 1: { acct: "", sign: 0 }, 2: { acct: "", sign: 0 } };
        trial = null;
        touched = [];
        state = "choose";
        firstTry = true;
        root.querySelectorAll("[data-acct]").forEach((s) => (s.value = ""));
        render();
      }

      const apply = (b, entries) => {
        const next = { ...b };
        entries.forEach(([acct, sign]) => (next[acct] += sign * block.moves[i].amount));
        return next;
      };
      const entriesOf = () => [1, 2].map((n) => [picks[n].acct, picks[n].sign]);
      const sameEntries = (a, b) => {
        const key = (es) => es.map(([acct, sign]) => `${acct}:${sign}`).sort().join("|");
        return key(a) === key(b);
      };

      function post() {
        const mine = entriesOf();
        const move = block.moves[i];
        if (mine.some(([acct, sign]) => !acct || !sign)) {
          ref("verdict").textContent = "Choose two accounts and a direction for each.";
          ref("verdict").className = "de-verdict";
          return;
        }
        if (mine[0][0] === mine[1][0]) {
          ref("verdict").textContent = "Pick two different accounts. Every transaction touches at least two.";
          ref("verdict").className = "de-verdict";
          return;
        }
        touched = mine.map(([acct]) => acct);
        if (sameEntries(mine, move.entries)) {
          books = apply(books, move.entries);
          if (firstTry) score++;
          state = "right";
        } else {
          trial = apply(books, mine);
          state = "wrong";
          firstTry = false;
        }
        render();
        if (state === "right" && i === block.moves.length - 1) record();
      }

      function reveal() {
        const move = block.moves[i];
        books = apply(books, move.entries);
        trial = null;
        touched = move.entries.map(([acct]) => acct);
        state = "right";
        render();
        if (i === block.moves.length - 1) record();
      }

      function record() {
        window.Marginalia.memory.result(`${ctx.book.id}.${ctx.slug}.entries`, {
          book: ctx.book.id,
          page: ctx.slug,
          label: block.title,
          score,
          total: block.moves.length
        });
      }

      const describe = (entries) =>
        entries.map(([acct, sign]) => `${byId[acct].label} ${sign > 0 ? "up" : "down"} ${dollars(block.moves[i].amount)}`).join(", ");

      function render() {
        const move = block.moves[i];
        const shown = trial || books;
        const assets = sideTotal(shown, "asset");
        const claims = sideTotal(shown, "claim");
        const gap = assets - claims;
        const done = state === "right" && i === block.moves.length - 1;

        ref("progress").textContent = done ? `Done · ${score} of ${block.moves.length} right first time` : `Transaction ${i + 1} of ${block.moves.length}`;
        ref("q").textContent = move.text;
        ref("form").hidden = state !== "choose";
        [1, 2].forEach((n) => {
          root.querySelectorAll(`[data-dir="${n}"]`).forEach((b) => b.setAttribute("aria-pressed", String(Number(b.dataset.sign) === picks[n].sign)));
        });

        const verdict = ref("verdict");
        const why = ref("why");
        if (state === "choose") {
          verdict.textContent = "";
          why.textContent = "";
        } else if (state === "right") {
          verdict.textContent = `Right · ${describe(move.entries)}`;
          verdict.className = "de-verdict is-right";
          why.textContent = move.why;
        } else if (gap !== 0) {
          verdict.textContent = `Out of balance by ${dollars(Math.abs(gap))}`;
          verdict.className = "de-verdict is-wrong";
          why.textContent = `Your entry moves ${describe(entriesOf())}. The two sides no longer match, so one of the changes has to go the other way or sit on the other side.`;
        } else {
          verdict.textContent = "It balances, but those aren't the accounts that changed";
          verdict.className = "de-verdict is-wrong";
          why.textContent = move.hint || "Think about what the company actually received or gave up, and who now has a claim on it.";
        }
        ref("after").hidden = state === "choose";
        ref("retry").hidden = state !== "wrong";
        ref("reveal").hidden = state !== "wrong";
        ref("next").hidden = state !== "right";
        ref("next").textContent = done ? "Start over" : "Next transaction";

        // Scale: the heavier side sinks.
        const tilt = Math.max(-1, Math.min(1, gap / fullTilt)) * MAX_TILT;
        const drop = Math.sin((tilt * Math.PI) / 180) * 116;
        ref("beam").style.transform = `rotate(${-tilt}deg)`;
        ref("pan-a").style.transform = `translateY(${drop}px)`;
        ref("pan-c").style.transform = `translateY(${-drop}px)`;
        root.querySelector(".de-scale").classList.toggle("is-off", gap !== 0);

        ref("assets").textContent = dollars(assets);
        ref("claims").textContent = dollars(claims);
        ref("dock-a").textContent = dollars(assets);
        ref("dock-c").textContent = dollars(claims);
        ref("status").textContent = gap === 0 ? "In balance" : `Out of balance by ${dollars(Math.abs(gap))}`;
        ref("status").classList.toggle("is-off", gap !== 0);

        const groups = [
          ["Assets", "asset"],
          ["Liabilities and equity", "claim"]
        ];
        ref("sheet").innerHTML = groups
          .map(
            ([title, side]) =>
              `<tr class="st-head"><th scope="rowgroup" colspan="2">${title}</th></tr>` +
              block.accounts
                .filter((a) => a.side === side)
                .map(
                  (a) => `<tr class="st-row${touched.includes(a.id) && state !== "choose" ? (state === "right" ? " is-changed" : " is-off") : ""}">
                    <th scope="row">${esc(a.label)}</th><td>${shown[a.id].toLocaleString("en-US")}</td>
                  </tr>`
                )
                .join("") +
              `<tr class="st-row is-sub"><th scope="row">Total</th><td>${sideTotal(shown, side).toLocaleString("en-US")}</td></tr>`
          )
          .join("");
      }

      root.addEventListener("change", (e) => {
        const sel = e.target.closest("[data-acct]");
        if (!sel) return;
        picks[sel.dataset.acct].acct = sel.value;
      });
      root.addEventListener("click", (e) => {
        const dir = e.target.closest("[data-dir]");
        if (dir) {
          picks[dir.dataset.dir].sign = Number(dir.dataset.sign);
          render();
          return;
        }
        const btn = e.target.closest("[data-ref]");
        if (!btn) return;
        const name = btn.dataset.ref;
        if (name === "post") post();
        else if (name === "retry") {
          trial = null;
          touched = [];
          state = "choose";
          render();
        } else if (name === "reveal") reveal();
        else if (name === "next") {
          if (i === block.moves.length - 1) start();
          else {
            i++;
            load();
          }
          const first = root.querySelector('[data-acct="1"]');
          if (first) first.focus();
        }
      });
      start();
    }
  };
})();
