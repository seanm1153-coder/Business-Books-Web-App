// Margin notes: select text in a chapter's prose to highlight it or attach a note.
// Highlights are stored by paragraph key and quoted text, and re-applied on every visit.
(function () {
  "use strict";
  const M = window.Marginalia;
  const { esc } = M.util;

  const ANNOTATABLE = ".concept-head .dek, .prose p";
  const MAX_QUOTE = 600;

  let page = null; // { root, book, slug, bookTitle, pageTitle }
  let toolbar;
  let pop;
  let pending = null; // { key, quote } for the current selection

  /* ---------- Text helpers ---------- */

  // Text nodes of an element with a whitespace-collapsed copy of its text and a map
  // from each collapsed character back to its node and offset.
  function textIndex(el) {
    const nodes = [];
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    let n;
    while ((n = walker.nextNode())) nodes.push(n);
    let norm = "";
    const map = [];
    let lastSpace = true;
    nodes.forEach((node) => {
      const t = node.nodeValue;
      for (let i = 0; i < t.length; i++) {
        const space = /\s/.test(t[i]);
        if (space && lastSpace) continue;
        norm += space ? " " : t[i];
        map.push([node, i]);
        lastSpace = space;
      }
    });
    return { norm, map };
  }

  const collapse = (s) => s.replace(/\s+/g, " ").trim();

  function wrap(el, quote, noteId, hasNote) {
    const q = collapse(quote);
    if (!q) return false;
    const { norm, map } = textIndex(el);
    const at = norm.indexOf(q);
    if (at < 0) return false;
    const start = map[at];
    const end = map[at + q.length - 1];
    // Collect the node pieces to wrap, then wrap from the end so offsets stay valid.
    const pieces = [];
    let inRange = false;
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      if (node === start[0]) inRange = true;
      if (inRange) {
        const from = node === start[0] ? start[1] : 0;
        const to = node === end[0] ? end[1] + 1 : node.nodeValue.length;
        if (to > from) pieces.push([node, from, to]);
      }
      if (node === end[0]) break;
    }
    pieces.reverse().forEach(([textNode, from, to], i) => {
      const middle = textNode.splitText(from);
      middle.splitText(to - from);
      const mark = document.createElement("mark");
      mark.className = "user-hl" + (hasNote ? " has-note" : "");
      mark.dataset.note = noteId;
      if (i === 0) mark.dataset.last = "1";
      middle.parentNode.replaceChild(mark, middle);
      mark.appendChild(middle);
    });
    return pieces.length > 0;
  }

  function unwrapAll(root) {
    root.querySelectorAll("mark.user-hl").forEach((m) => {
      const parent = m.parentNode;
      while (m.firstChild) parent.insertBefore(m.firstChild, m);
      parent.removeChild(m);
      parent.normalize();
    });
  }

  /* ---------- Render ---------- */

  function paragraphs() {
    return Array.from(page.root.querySelectorAll("[data-pkey]"));
  }

  function apply() {
    if (!page || !page.root.isConnected) return;
    unwrapAll(page.root);
    const notes = M.memory.notes({ book: page.book, page: page.slug });
    notes.forEach((n) => {
      const el = page.root.querySelector(`[data-pkey="${n.para}"]`);
      if (el && wrap(el, n.quote, n.id, Boolean(n.note))) return;
      // The paragraph moved: look for the quote anywhere on the page.
      paragraphs().some((p) => wrap(p, n.quote, n.id, Boolean(n.note)));
    });
    renderPanel(notes);
  }

  function renderPanel(notes) {
    const panel = page.root.querySelector("[data-page-notes]");
    if (!panel) return;
    panel.hidden = !notes.length;
    if (!notes.length) return;
    panel.innerHTML = `
      <div class="pn-head">
        <p class="eyebrow">Your notes on this page</p>
        <a class="pn-all" href="#notebook">Open your notebook →</a>
      </div>
      <ol class="pn-list" role="list">
        ${notes
          .map(
            (n) => `<li>
              <button type="button" class="pn-quote" data-goto="${esc(n.id)}">“${esc(n.quote.length > 160 ? n.quote.slice(0, 158) + "…" : n.quote)}”</button>
              ${n.note ? `<p class="pn-note">${esc(n.note)}</p>` : ""}
            </li>`
          )
          .join("")}
      </ol>
      <p class="pn-where">${M.memory.mode === "cloud" ? "Saved to your Claude account." : "Saved in this browser."}</p>`;
  }

  /* ---------- Selection toolbar ---------- */

  function selectionTarget() {
    const sel = window.getSelection();
    if (!page || !sel || sel.isCollapsed || !sel.rangeCount) return null;
    const range = sel.getRangeAt(0);
    const node = range.commonAncestorContainer;
    const el = (node.nodeType === 1 ? node : node.parentElement).closest("[data-pkey]");
    if (!el || !page.root.contains(el)) return null;
    const quote = collapse(sel.toString());
    if (quote.length < 3) return null;
    return { key: el.dataset.pkey, quote: quote.slice(0, MAX_QUOTE), rect: range.getBoundingClientRect() };
  }

  function showToolbar() {
    const target = selectionTarget();
    if (!target) {
      toolbar.hidden = true;
      pending = null;
      return;
    }
    pending = target;
    toolbar.hidden = false;
    if (window.matchMedia("(max-width: 640px)").matches) {
      toolbar.classList.add("is-docked");
      toolbar.style.left = toolbar.style.top = "";
      return;
    }
    toolbar.classList.remove("is-docked");
    const r = target.rect;
    const w = toolbar.offsetWidth;
    const left = Math.min(Math.max(8, r.left + r.width / 2 - w / 2), window.innerWidth - w - 8);
    const top = r.top - toolbar.offsetHeight - 10;
    toolbar.style.left = left + window.scrollX + "px";
    toolbar.style.top = (top < 8 ? r.bottom + 10 : top) + window.scrollY + "px";
  }

  function addFromSelection(withNote) {
    if (!pending) return;
    const n = M.memory.addNote({
      book: page.book,
      page: page.slug,
      bookTitle: page.bookTitle,
      pageTitle: page.pageTitle,
      para: pending.key,
      quote: pending.quote
    });
    window.getSelection().removeAllRanges();
    toolbar.hidden = true;
    pending = null;
    if (withNote) {
      const mark = page.root.querySelector(`mark.user-hl[data-note="${n.id}"][data-last]`) || page.root.querySelector(`mark.user-hl[data-note="${n.id}"]`);
      openEditor(n.id, mark);
    }
  }

  /* ---------- Note editor ---------- */

  function openEditor(id, anchor) {
    const n = M.memory.notes().find((x) => x.id === id);
    if (!n) return;
    pop.dataset.note = id;
    pop.innerHTML = `
      <p class="np-quote">“${esc(n.quote.length > 220 ? n.quote.slice(0, 218) + "…" : n.quote)}”</p>
      <label class="visually-hidden" for="note-text">Your note</label>
      <textarea id="note-text" rows="3" placeholder="Add a note in the margin">${esc(n.note || "")}</textarea>
      <div class="np-actions">
        <button type="button" class="btn-primary" data-np="save">Save</button>
        <button type="button" class="pill" data-np="close">Close</button>
        <button type="button" class="np-remove" data-np="remove">Remove highlight</button>
      </div>`;
    pop.hidden = false;
    if (window.matchMedia("(max-width: 640px)").matches || !anchor) {
      pop.classList.add("is-docked");
      pop.style.left = pop.style.top = "";
    } else {
      pop.classList.remove("is-docked");
      const r = anchor.getBoundingClientRect();
      const w = pop.offsetWidth;
      pop.style.left = Math.min(Math.max(8, r.left), window.innerWidth - w - 8) + window.scrollX + "px";
      pop.style.top = r.bottom + 10 + window.scrollY + "px";
    }
    pop.querySelector("textarea").focus();
  }

  function closeEditor() {
    pop.hidden = true;
    delete pop.dataset.note;
  }

  function buildChrome() {
    toolbar = document.createElement("div");
    toolbar.className = "hl-toolbar";
    toolbar.setAttribute("role", "toolbar");
    toolbar.setAttribute("aria-label", "Selected text");
    toolbar.hidden = true;
    toolbar.innerHTML = `<button type="button" data-act="hl"><span class="hl-swatch" aria-hidden="true"></span>Highlight</button><button type="button" data-act="note">Add a note</button>`;
    // Keep the selection alive when the toolbar is pressed.
    toolbar.addEventListener("mousedown", (e) => e.preventDefault());
    toolbar.addEventListener("click", (e) => {
      const b = e.target.closest("[data-act]");
      if (b) addFromSelection(b.dataset.act === "note");
    });

    pop = document.createElement("div");
    pop.className = "note-pop";
    pop.setAttribute("role", "dialog");
    pop.setAttribute("aria-label", "Margin note");
    pop.hidden = true;
    pop.addEventListener("click", (e) => {
      const b = e.target.closest("[data-np]");
      if (!b) return;
      const id = pop.dataset.note;
      if (b.dataset.np === "save") M.memory.updateNote(id, { note: pop.querySelector("textarea").value.trim() });
      if (b.dataset.np === "remove") M.memory.removeNote(id);
      closeEditor();
    });
    pop.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeEditor();
      if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) pop.querySelector('[data-np="save"]').click();
    });
    document.body.append(toolbar, pop);

    let timer = 0;
    document.addEventListener("selectionchange", () => {
      clearTimeout(timer);
      timer = setTimeout(showToolbar, 180);
    });
    document.addEventListener("click", (e) => {
      if (toolbar.contains(e.target)) return; // the toolbar opens the editor itself
      const mark = e.target.closest("mark.user-hl");
      if (mark && page && page.root.contains(mark) && window.getSelection().isCollapsed) {
        openEditor(mark.dataset.note, mark);
        return;
      }
      const go = e.target.closest("[data-goto]");
      if (go && page) {
        const m = page.root.querySelector(`mark.user-hl[data-note="${go.dataset.goto}"]`);
        if (m) {
          m.scrollIntoView({ behavior: M.util.reducedMotion.matches ? "auto" : "smooth", block: "center" });
          m.classList.add("is-flash");
          setTimeout(() => m.classList.remove("is-flash"), 1600);
        }
        return;
      }
      if (!pop.hidden && !pop.contains(e.target)) closeEditor();
    });
    M.memory.onChange((kind) => {
      if (kind === "notes" || kind === "all" || kind === "mode") apply();
    });
  }

  M.notes = {
    // Called after a chapter page renders.
    attach(root, info) {
      if (!toolbar) buildChrome();
      closeEditor();
      toolbar.hidden = true;
      page = { root, ...info };
      root.querySelectorAll(ANNOTATABLE).forEach((el, i) => (el.dataset.pkey = "p" + i));
      apply();
    },
    detach() {
      page = null;
      if (toolbar) toolbar.hidden = true;
      if (pop) closeEditor();
    }
  };
})();
