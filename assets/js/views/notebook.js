// The commonplace book: everything a reader has highlighted, written and scored,
// gathered by book. Read-only here; notes are edited where they were made.
(function () {
  "use strict";
  const M = window.Marginalia;
  const { esc } = M.util;

  // Workbench drafts the notebook knows how to summarize.
  const DRAFTS = {
    "gsbs.kernel": {
      book: "gsbs",
      page: "builder",
      label: "Your strategy kernel",
      rows: (d) => [
        ["Diagnosis", d.diagnosis],
        ["Guiding policy", d.policy],
        ["Actions", (d.actions || []).map((a) => a.text).filter(Boolean).join(" · ")]
      ]
    },
    "pb.pov": {
      book: "pb",
      page: "point-of-view",
      label: "Your point of view",
      rows: (d) => [
        ["The problem", d.problem],
        ["From → to", d.from && d.to ? `${d.from} → ${d.to}` : ""],
        ["The category", d.name]
      ]
    },
    "ump.tests": {
      book: "ump",
      page: "five-tests",
      label: "Your strategy",
      rows: (d) => [
        ["Customers and needs", [d.customers, d.needs].filter((x) => x && x.trim()).join(" · ")],
        ["Relative price", d.price],
        ["Trade-offs", d.tradeoffs],
        ["Continuity", d.continuity]
      ]
    },
    "tis.sketch": {
      book: "tis",
      page: "living",
      label: "Your system sketch",
      rows: (d) => [
        ["The behavior", d.behavior],
        ["Stock and flows", d.stock ? `${d.stock}${d.inflow || d.outflow ? ` (in: ${d.inflow || "…"}; out: ${d.outflow || "…"})` : ""}` : ""],
        ["The loop", d.loop],
        ["Where to push", d.lever]
      ]
    }
  };

  // Only drafts the reader has edited count; a loaded example isn't theirs.
  const ownDraft = (key) => {
    const d = M.memory.draft(key);
    return d && d.source === "own" ? d : null;
  };

  const clip = (s, n) => (s.length > n ? s.slice(0, n - 1).trimEnd() + "…" : s);

  function asText() {
    const lines = ["# My commonplace book", ""];
    M.books
      .filter((b) => b.status === "open")
      .forEach((b) => {
        const notes = M.memory.notes({ book: b.id });
        const drafts = Object.entries(DRAFTS).filter(([k, d]) => d.book === b.id && ownDraft(k));
        if (!notes.length && !drafts.length) return;
        lines.push(`## ${b.title}`, "");
        notes.forEach((n) => {
          lines.push(`> ${n.quote}`, `— ${n.pageTitle || n.page}`);
          if (n.note) lines.push("", n.note);
          lines.push("");
        });
        drafts.forEach(([k, d]) => {
          lines.push(`### ${d.label}`);
          d.rows(ownDraft(k)).forEach(([label, v]) => v && lines.push(`- ${label}: ${v}`));
          lines.push("");
        });
      });
    return lines.join("\n");
  }

  function bookSection(b) {
    const notes = M.memory.notes({ book: b.id });
    const visited = new Set(M.memory.visited(b.id));
    // Pages in chapter order, then any page that isn't a chapter (the workbenches).
    const chapterOrder = [];
    b.parts.forEach((p) => p.chapters.forEach((c) => c.page && !chapterOrder.includes(c.page) && chapterOrder.push(c.page)));
    const slugs = chapterOrder.concat(Object.keys(b.pages).filter((s) => !chapterOrder.includes(s)));
    const results = Object.values(M.memory.results()).filter((r) => r.book === b.id);
    const drafts = Object.entries(DRAFTS).filter(([k, d]) => d.book === b.id && ownDraft(k));
    const href = (slug) => `#${b.id}-${slug}`;
    const seen = slugs.filter((s) => visited.has(s)).length;

    const byPage = {};
    notes.forEach((n) => (byPage[n.page] = byPage[n.page] || []).push(n));

    return `<section class="nb-book">
      <div class="nb-book-head">
        <h2 class="h2"><a href="#${b.id}">${esc(b.title)}</a></h2>
        <p class="nb-progress"><span class="tnum">${seen} of ${slugs.length}</span> pages explored</p>
      </div>
      <ul class="nb-pages" role="list">
        ${slugs
          .map((s) => `<li><a class="nb-page${visited.has(s) ? " is-seen" : ""}" href="${href(s)}"><span aria-hidden="true">${visited.has(s) ? "✓" : "○"}</span>${esc(b.pages[s].title)}<span class="visually-hidden">${visited.has(s) ? " (explored)" : " (not yet)"}</span></a></li>`)
          .join("")}
      </ul>
      <div class="nb-cols">
        <div class="nb-notes">
          <p class="eyebrow">Highlights and notes</p>
          ${
            notes.length
              ? slugs
                  .filter((s) => byPage[s])
                  .map(
                    (s) => `<div class="nb-group">
                      <p class="nb-group-t"><a href="${href(s)}">${esc(b.pages[s].title)}</a></p>
                      <ol class="nb-list" role="list">
                        ${byPage[s]
                          .map(
                            (n) => `<li>
                              <blockquote class="nb-quote">${esc(clip(n.quote, 320))}</blockquote>
                              ${n.note ? `<p class="nb-note">${esc(n.note)}</p>` : ""}
                            </li>`
                          )
                          .join("")}
                      </ol>
                    </div>`
                  )
                  .join("")
              : `<p class="nb-empty">No highlights yet. Select a sentence in any chapter to keep it here.</p>`
          }
        </div>
        <div class="nb-side">
          ${drafts
            .map(([k, d]) => {
              const rows = d.rows(ownDraft(k)).filter(([, v]) => v);
              return `<div class="nb-draft">
                <p class="eyebrow">${esc(d.label)}</p>
                ${rows.length ? `<dl>${rows.map(([l, v]) => `<dt>${esc(l)}</dt><dd>${esc(clip(String(v), 220))}</dd>`).join("")}</dl>` : `<p class="nb-empty">Started, but empty.</p>`}
                <a class="nb-link" href="${href(d.page)}">Keep working →</a>
              </div>`;
            })
            .join("")}
          ${
            results.length
              ? `<div class="nb-results">
                  <p class="eyebrow">Exercises</p>
                  <ul role="list">
                    ${results
                      .sort((a, c) => (a.at || 0) - (c.at || 0))
                      .map((r) => `<li><a href="${href(r.page)}">${esc(r.label)}</a><span class="tnum">${r.score} of ${r.total}</span></li>`)
                      .join("")}
                  </ul>
                </div>`
              : ""
          }
        </div>
      </div>
    </section>`;
  }

  M.views.notebook = {
    title: "Notebook",
    crumb: "Notebook",
    live: true,
    render(view) {
      const open = M.books.filter((b) => b.status === "open");
      const notes = M.memory.notes();
      const results = Object.values(M.memory.results());
      const pagesTotal = open.reduce((n, b) => n + Object.keys(b.pages).length, 0);
      const pagesSeen = open.reduce((n, b) => n + M.memory.visited(b.id).filter((s) => b.pages[s]).length, 0);
      const drafts = Object.keys(DRAFTS).filter((k) => ownDraft(k)).length;
      const northline = M.memory.results()["northline"];
      const empty = !notes.length && !pagesSeen && !drafts && !results.length;

      view.innerHTML = `
        <article class="paper-section notebook">
          <div class="wrap">
            <header class="concept-head">
              <p class="eyebrow">Notebook</p>
              <h1 class="display concept-title">Your commonplace book</h1>
              <p class="dek">Everything you've marked, written and scored across the library, in one place. Select any sentence in a chapter to add to it.</p>
              <p class="nb-where">${M.memory.mode === "cloud" ? "Saved to your Claude account, so it follows you to other devices." : "Saved in this browser. Open the library inside Claude to keep it across devices."}</p>
            </header>

            <div class="tiles nb-tiles">
              <div class="tile"><p class="tile-k">Highlights and notes</p><p class="tile-v tnum">${notes.length}</p></div>
              <div class="tile"><p class="tile-k">Pages explored</p><p class="tile-v tnum">${pagesSeen} of ${pagesTotal}</p></div>
              <div class="tile"><p class="tile-k">Exercises done</p><p class="tile-v tnum">${results.filter((r) => r.book).length}</p></div>
              <div class="tile"><p class="tile-k">Drafts</p><p class="tile-v tnum">${drafts}</p></div>
            </div>

            ${
              empty
                ? `<div class="nb-start">
                    <p class="nb-start-t">Nothing here yet.</p>
                    <p>Open a chapter and select a sentence to highlight it or add a note. Drafts from the workbenches, exercise scores and your Northline year will collect here too.</p>
                    <p><a class="nb-link" href="#gsbs-kernel">Start with the kernel →</a></p>
                  </div>`
                : ""
            }

            ${
              northline
                ? `<section class="nb-northline">
                    <p class="eyebrow">Your Northline year</p>
                    <p class="nb-start-t">${esc(northline.label)}</p>
                    <p>${esc(northline.detail || "")}</p>
                    <a class="nb-link" href="#northline">Play it again →</a>
                  </section>`
                : ""
            }

            ${open.map(bookSection).join("")}

            ${notes.length || drafts ? `<div class="log-actions nb-actions"><button type="button" class="pill" data-copy>Copy everything as text</button><span class="nb-copied" aria-live="polite"></span></div>` : ""}
          </div>
        </article>`;

      const copy = view.querySelector("[data-copy]");
      if (copy) {
        copy.addEventListener("click", () => {
          const text = asText();
          const done = (msg) => (view.querySelector(".nb-copied").textContent = msg);
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(
              () => done("Copied."),
              () => fallback(text, done)
            );
          } else fallback(text, done);
        });
      }
    }
  };

  function fallback(text, done) {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.className = "nb-copy-area";
    ta.setAttribute("aria-label", "Your notebook as text");
    const host = document.querySelector(".nb-actions");
    host.after(ta);
    ta.select();
    done("Selected below. Copy it with your keyboard.");
  }
})();
