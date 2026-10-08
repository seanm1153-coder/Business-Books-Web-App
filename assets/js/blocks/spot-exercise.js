// Highlighter exercise: tag sentences in short statements with a set of labels,
// then check the marks against the answers and explain each one.
(function () {
  "use strict";
  const { esc, tablist } = window.Marginalia.util;

  const segKey = (pi, si) => `${pi}-${si}`;
  const segments = (x) => x.paras.flatMap((para, pi) => para.map((seg, si) => ({ ...seg, key: segKey(pi, si) })));

  // A segment's result once answers are checked.
  function result(seg, tag) {
    if (seg.h && tag === seg.h) return "correct";
    if (seg.h && tag) return "wrong";
    if (seg.h) return "missed";
    if (tag) return "false";
    return seg.note ? "fine" : null;
  }

  window.Marginalia.blocks["spot-exercise"] = {
    render(block, ctx) {
      const u = ctx.uid;
      return `<section class="spot" aria-labelledby="${u}-h">
        <div class="spot-head">
          <p class="eyebrow">Exercise</p>
          <h2 class="h2" id="${u}-h">${esc(block.title)}</h2>
          <p class="section-dek">${esc(block.intro)}</p>
        </div>
        <div class="tabs" role="tablist" aria-label="Choose a statement">
          ${block.exercises
            .map(
              (x, i) =>
                `<button class="pill" role="tab" type="button" id="${u}-ex-${x.id}" data-ex="${x.id}" aria-controls="${u}-memo" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}">${esc(x.label)}</button>`
            )
            .join("")}
        </div>
        <div class="spot-grid">
          <div class="spot-main">
            <div class="highlighters" role="toolbar" aria-label="Highlighters">
              ${block.labels
                .map((h, i) => `<button type="button" class="hl-btn" data-pen="${h.id}" aria-pressed="${i === 0}"><span class="swatch hl-${h.id}" aria-hidden="true"></span>${esc(h.short)}</button>`)
                .join("")}
              <button type="button" class="hl-btn" data-pen="erase" aria-pressed="false"><span class="swatch swatch-erase" aria-hidden="true"></span>Eraser</button>
            </div>
            <div class="memo" id="${u}-memo" role="tabpanel" aria-labelledby="${u}-ex-${block.exercises[0].id}"></div>
            <div class="spot-actions">
              <button type="button" class="btn-primary" data-action="check">Check answers</button>
              <button type="button" class="pill" data-action="reset">Start over</button>
            </div>
          </div>
          <aside class="spot-notes" aria-live="polite"></aside>
        </div>
      </section>`;
    },

    mount(root, block, ctx) {
      const labelById = Object.fromEntries(block.labels.map((h) => [h.id, h]));
      // What one label is called in the feedback ("hallmark", "guidepost", …).
      const noun = block.noun || { one: "hallmark", article: "a" };
      // Per-statement marks survive switching between statements.
      const marks = Object.fromEntries(block.exercises.map((x) => [x.id, { tags: {}, checked: false }]));
      let current = block.exercises[0];
      let pen = block.labels[0].id;

      const memo = root.querySelector(".memo");
      const notesEl = root.querySelector(".spot-notes");
      const checkBtn = root.querySelector('[data-action="check"]');

      function renderMemo() {
        const m = marks[current.id];
        let n = 0;
        memo.innerHTML =
          `<p class="memo-src">${esc(current.source)}</p>` +
          current.paras
            .map(
              (para, pi) =>
                `<p class="memo-p">${para
                  .map((seg, si) => {
                    const key = segKey(pi, si);
                    const tag = m.tags[key];
                    const res = m.checked ? result(seg, tag) : null;
                    const num = res ? ++n : 0;
                    const cls = ["seg", tag ? `hl-${tag}` : "", res ? `res-${res}` : ""].filter(Boolean).join(" ");
                    const label = tag ? `, marked ${labelById[tag].short}` : "";
                    return `<span class="${cls}" role="button" tabindex="0" data-seg="${key}" aria-label="${esc(seg.t)}${esc(label)}">${esc(seg.t)}${num ? `<sup class="seg-n">${num}</sup>` : ""}</span>`;
                  })
                  .join(" ")}</p>`
            )
            .join("");
      }

      function renderNotes() {
        const m = marks[current.id];
        const segs = segments(current);
        const marked = Object.keys(m.tags).length;
        if (!m.checked) {
          notesEl.innerHTML = `<p class="eyebrow">Your marks</p>
            <p class="spot-count"><span class="tnum">${marked}</span> ${marked === 1 ? "sentence" : "sentences"} marked</p>
            <p class="spot-hint">${esc(current.hint)}</p>`;
          return;
        }
        const answers = segs.filter((s) => s.h);
        const tally = { correct: 0, wrong: 0, missed: 0, false: 0 };
        const rows = [];
        let n = 0;
        segs.forEach((seg) => {
          const tag = m.tags[seg.key];
          const res = result(seg, tag);
          if (!res) return;
          n++;
          if (tally[res] !== undefined) tally[res]++;
          const right = seg.h ? labelById[seg.h].short : "";
          const verdict = {
            correct: `Found · ${right}`,
            wrong: `You marked ${tag ? labelById[tag].short : ""} · Answer: ${right}`,
            missed: `Missed · ${right}`,
            false: `Not ${noun.article} ${noun.one} here`,
            fine: "Fine as written"
          }[res];
          const quote = seg.t.length > 80 ? seg.t.slice(0, 78).trimEnd() + "…" : seg.t;
          rows.push(`<li class="note res-${res}">
            <span class="note-n">${n}</span>
            <div class="note-body">
              <p class="note-v">${esc(verdict)}</p>
              <p class="note-q">“${esc(quote)}”</p>
              <p class="note-d">${esc(seg.note || "This sentence is fine as written.")}</p>
            </div>
          </li>`);
        });
        const extra = [];
        if (tally.wrong) extra.push(`${tally.wrong} mislabeled`);
        if (tally.missed) extra.push(`${tally.missed} missed`);
        if (tally.false) extra.push(`${tally.false} false ${tally.false === 1 ? "alarm" : "alarms"}`);
        const perfect = tally.correct === answers.length && !tally.false;
        notesEl.innerHTML = `<p class="eyebrow">Answers</p>
          <p class="spot-count"><span class="tnum">${tally.correct} of ${answers.length}</span> found</p>
          <p class="spot-hint">${perfect ? `A clean read. Every ${noun.one} found, nothing over-marked.` : esc(extra.join(" · ")) + ". Edit any mark to try again."}</p>
          <ol class="notes" role="list">${rows.join("")}</ol>`;
      }

      function render() {
        renderMemo();
        renderNotes();
        checkBtn.disabled = marks[current.id].checked;
      }

      function applyPen(key) {
        const m = marks[current.id];
        if (pen === "erase" || m.tags[key] === pen) delete m.tags[key];
        else m.tags[key] = pen;
        m.checked = false;
        render();
        const again = memo.querySelector(`[data-seg="${key}"]`);
        if (again) again.focus();
      }

      memo.addEventListener("click", (e) => {
        const seg = e.target.closest("[data-seg]");
        if (seg) applyPen(seg.dataset.seg);
      });
      memo.addEventListener("keydown", (e) => {
        const seg = e.target.closest("[data-seg]");
        if (seg && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          applyPen(seg.dataset.seg);
        }
      });

      const penButtons = Array.from(root.querySelectorAll("[data-pen]"));
      penButtons.forEach((b) =>
        b.addEventListener("click", () => {
          pen = b.dataset.pen;
          penButtons.forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
        })
      );

      checkBtn.addEventListener("click", () => {
        marks[current.id].checked = true;
        render();
        const segs = segments(current);
        const answers = segs.filter((s) => s.h);
        const found = answers.filter((s) => marks[current.id].tags[s.key] === s.h).length;
        window.Marginalia.memory.result(`${ctx.book.id}.${ctx.slug}.${current.id}`, {
          book: ctx.book.id,
          page: ctx.slug,
          label: `${block.title}: ${current.label}`,
          score: found,
          total: answers.length
        });
      });
      root.querySelector('[data-action="reset"]').addEventListener("click", () => {
        marks[current.id] = { tags: {}, checked: false };
        render();
      });

      tablist(Array.from(root.querySelectorAll("[data-ex]")), (tab) => {
        current = block.exercises.find((x) => x.id === tab.dataset.ex);
        memo.setAttribute("aria-labelledby", tab.id);
        render();
      });

      render();
    }
  };
})();
