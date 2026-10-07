// From profit to cash: start at net profit and decide, for each balance sheet change,
// whether it adds cash or uses it. The finished bridge checks itself against the
// change in the cash account. Rows may include { total: "label" } subtotal markers.
(function () {
  "use strict";
  const { esc } = window.Marginalia.util;

  const dollars = (v) => (v < 0 ? "−$" : "$") + Math.abs(Math.round(v)).toLocaleString("en-US");
  const signedDollars = (v) => (v > 0 ? "+" : "") + dollars(v);

  window.Marginalia.blocks["cash-bridge"] = {
    render(block, ctx) {
      const steps = block.rows.filter((r) => !r.total);
      return `<section class="cb" aria-labelledby="${ctx.uid}-h">
        <div class="spot-head">
          <p class="eyebrow">${esc(block.company)} · ${esc(block.period)}</p>
          <h2 class="h2" id="${ctx.uid}-h">${esc(block.title)}</h2>
          <p class="section-dek">${esc(block.intro)}</p>
        </div>
        <div class="cb-grid">
          <section class="statement cb-sheet">
            <h3 class="st-t">Balance sheet</h3>
            <p class="st-sub">${esc(block.sheetNote)}</p>
            <table class="st-table">
              <thead><tr class="st-head"><th scope="col"><span class="visually-hidden">Item</span></th><th scope="col">Start</th><th scope="col">End</th><th scope="col">Change</th></tr></thead>
              <tbody>
                ${block.sheet
                  .map((r) =>
                    r.group
                      ? `<tr class="st-head"><th scope="rowgroup" colspan="4">${esc(r.group)}</th></tr>`
                      : `<tr class="st-row${r.key ? " is-key" : ""}"><th scope="row">${esc(r.label)}</th><td>${r.start.toLocaleString("en-US")}</td><td>${r.end.toLocaleString("en-US")}</td><td>${r.end === r.start ? "–" : (r.end > r.start ? "+" : "−") + Math.abs(r.end - r.start).toLocaleString("en-US")}</td></tr>`
                  )
                  .join("")}
              </tbody>
            </table>
            <p class="st-foot">${esc(block.sheetFoot)}</p>
          </section>
          <div class="cb-bridge">
            <p class="cb-progress" data-ref="progress"></p>
            <ol class="cb-rows" role="list">
              <li class="cb-row is-total">
                <div class="cb-head"><span class="cb-label">${esc(block.start.label)}</span><span class="cb-amt tnum">${esc(dollars(block.start.amount))}</span></div>
                <p class="cb-detail">${esc(block.start.detail)}</p>
                <div class="cb-track" aria-hidden="true"><span class="cb-zero" data-zero></span><span class="cb-bar" data-bar="start"></span></div>
              </li>
              ${block.rows
                .map((r, i) =>
                  r.total
                    ? `<li class="cb-row is-total">
                        <div class="cb-head"><span class="cb-label">${esc(r.total)}</span><span class="cb-amt tnum" data-total="${i}"></span></div>
                        <div class="cb-track" aria-hidden="true"><span class="cb-zero" data-zero></span><span class="cb-bar" data-bar="t${i}"></span></div>
                      </li>`
                    : `<li class="cb-row" data-row="${esc(r.id)}">
                        <div class="cb-head"><span class="cb-label">${esc(r.label)}</span><span class="cb-amt tnum" data-amt="${esc(r.id)}"></span></div>
                        <p class="cb-detail">${esc(r.detail)}</p>
                        <div class="cb-choice" role="group" aria-label="${esc(r.label)}">
                          <button type="button" class="pill" data-pick="${esc(r.id)}" data-sign="1" aria-pressed="false">Adds cash</button>
                          <button type="button" class="pill" data-pick="${esc(r.id)}" data-sign="-1" aria-pressed="false">Uses cash</button>
                        </div>
                        <div class="cb-track" aria-hidden="true"><span class="cb-zero" data-zero></span><span class="cb-bar is-step" data-bar="${esc(r.id)}"></span></div>
                        <p class="cb-why" data-why="${esc(r.id)}" hidden></p>
                      </li>`
                )
                .join("")}
            </ol>
            <div class="happened" aria-live="polite">
              <p class="eyebrow">The check</p>
              <p class="happened-t" data-ref="note"></p>
            </div>
            <div class="log-actions">
              <button type="button" class="pill" data-ref="reveal">Show the answers</button>
              <button type="button" class="pill" data-ref="reset">Start over</button>
            </div>
          </div>
        </div>
        <div class="fin-dock">
          <p>Decided <span data-ref="dock-done"></span></p>
          <p>Your bridge <span data-ref="dock-total"></span></p>
        </div>
      </section>`;
    },

    mount(root, block, ctx) {
      const ref = (n) => root.querySelector(`[data-ref="${n}"]`);
      const steps = block.rows.filter((r) => !r.total);
      let picks = {};
      let revealed = false;

      // Running totals along the reader's path (undecided rows count as zero) and along
      // the correct one; the bar scale covers both so it doesn't jump at the end.
      function walk(signOf) {
        let run = block.start.amount;
        const out = [{ from: 0, to: run }];
        block.rows.forEach((r) => {
          if (r.total) out.push({ from: 0, to: run });
          else {
            const next = run + (signOf(r) || 0) * r.amount;
            out.push({ from: run, to: next });
            run = next;
          }
        });
        return { out, end: run };
      }

      function render() {
        const mine = walk((r) => picks[r.id]);
        const right = walk((r) => r.sign);
        const all = [...mine.out, ...right.out].flatMap((s) => [s.from, s.to]);
        const lo = Math.min(0, ...all);
        const hi = Math.max(...all);
        const x = (v) => ((v - lo) / (hi - lo || 1)) * 100;
        const place = (el, s) => {
          const a = Math.min(s.from, s.to);
          const b = Math.max(s.from, s.to);
          el.style.left = x(a).toFixed(2) + "%";
          el.style.width = Math.max(0.6, x(b) - x(a)).toFixed(2) + "%";
          el.classList.toggle("is-empty", a === b);
        };
        root.querySelectorAll("[data-zero]").forEach((z) => {
          z.style.left = x(0).toFixed(2) + "%";
          z.hidden = lo === 0;
        });

        place(root.querySelector('[data-bar="start"]'), mine.out[0]);
        let decidedSoFar = true;
        block.rows.forEach((r, i) => {
          const seg = mine.out[i + 1];
          if (r.total) {
            place(root.querySelector(`[data-bar="t${i}"]`), decidedSoFar ? seg : { from: 0, to: 0 });
            root.querySelector(`[data-total="${i}"]`).textContent = decidedSoFar ? dollars(seg.to) : "Decide the rows above";
            return;
          }
          const pick = picks[r.id];
          if (!pick) decidedSoFar = false;
          place(root.querySelector(`[data-bar="${r.id}"]`), seg);
          root.querySelector(`[data-amt="${r.id}"]`).textContent = pick ? signedDollars(pick * r.amount) : dollars(r.amount);
          root.querySelectorAll(`[data-pick="${r.id}"]`).forEach((b) => b.setAttribute("aria-pressed", String(Number(b.dataset.sign) === pick)));
          const row = root.querySelector(`[data-row="${r.id}"]`);
          const why = root.querySelector(`[data-why="${r.id}"]`);
          const show = revealed && pick;
          row.classList.toggle("is-right", Boolean(show && pick === r.sign));
          row.classList.toggle("is-wrong", Boolean(show && pick !== r.sign));
          why.hidden = !revealed;
          why.textContent = revealed ? `${pick ? (pick === r.sign ? "Right. " : "Not quite. ") : ""}${r.sign > 0 ? "Adds cash" : "Uses cash"}: ${r.why}` : "";
        });

        const done = steps.filter((r) => picks[r.id]).length;
        const wrong = steps.filter((r) => picks[r.id] && picks[r.id] !== r.sign);
        ref("progress").textContent = `${done} of ${steps.length} decided`;
        ref("dock-done").textContent = `${done} of ${steps.length}`;
        ref("dock-total").textContent = done === steps.length ? dollars(mine.end) : "–";

        let note;
        if (done < steps.length) {
          note = block.startNote;
        } else if (!wrong.length) {
          note = `Your bridge ends at ${dollars(mine.end)}, and ${block.actualNote} They match: every change on the balance sheet is accounted for.`;
        } else {
          const off = mine.end - right.end;
          note = `Your bridge ends at ${dollars(mine.end)}, but ${block.actualNote} It's ${off > 0 ? "over" : "under"} by ${dollars(Math.abs(off))}. A row going the wrong way moves the end by twice its amount, so look for ${wrong.length === 1 ? "one row" : "rows"} that add up to half the gap, or show the answers.`;
        }
        ref("note").textContent = note;
      }

      // Saved for the notebook each time a choice completes or changes a finished bridge.
      function record() {
        if (steps.some((r) => !picks[r.id])) return;
        window.Marginalia.memory.result(`${ctx.book.id}.${ctx.slug}.bridge`, {
          book: ctx.book.id,
          page: ctx.slug,
          label: block.title,
          score: steps.filter((r) => picks[r.id] === r.sign).length,
          total: steps.length
        });
      }

      root.addEventListener("click", (e) => {
        const pick = e.target.closest("[data-pick]");
        if (pick) {
          picks[pick.dataset.pick] = Number(pick.dataset.sign);
          render();
          record();
          return;
        }
        if (e.target.closest('[data-ref="reveal"]')) {
          revealed = true;
          render();
        } else if (e.target.closest('[data-ref="reset"]')) {
          picks = {};
          revealed = false;
          render();
        }
      });
      render();
    }
  };
})();
