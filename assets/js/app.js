// Router, shelf, book home and page shell. Loaded last: books, blocks and art are registered by then.
//
// Routes (bare hash tokens):
//   #shelf            the library
//   #<book>           a book's home, e.g. #gsbs
//   #<book>-<page>    a page in that book, e.g. #gsbs-kernel
//   #notebook         the reader's commonplace book (assets/js/views/notebook.js)
//   #northline        the cross-book Northline campaign (assets/js/views/northline.js)
(function () {
  "use strict";

  const M = window.Marginalia;
  const { esc, pad2, numberWord, capitalize, reducedMotion } = M.util;
  const view = document.getElementById("view");
  const crumbsEl = document.getElementById("crumbs");
  const bookNavEl = document.getElementById("booknav");

  // Links from before routes carried a book id.
  const ALIASES = { book: "gsbs", kernel: "gsbs-kernel", "bad-strategy": "gsbs-bad-strategy", builder: "gsbs-builder" };

  let cleanups = [];

  /* ---------- Routing ---------- */

  function parse(hash) {
    if (ALIASES[hash]) return { redirect: ALIASES[hash] };
    if (M.views && M.views[hash]) return { view: hash };
    for (const book of M.books) {
      if (book.status !== "open") continue;
      if (hash === book.id) return { book };
      if (hash.startsWith(book.id + "-")) {
        const slug = hash.slice(book.id.length + 1);
        if (book.pages[slug]) return { book, slug, page: book.pages[slug] };
      }
    }
    return { shelf: true, redirect: hash && hash !== "shelf" ? "shelf" : null };
  }

  function context(book, slug) {
    return {
      book,
      slug,
      href: (target) => (target ? `#${book.id}-${target}` : `#${book.id}`)
    };
  }

  function go() {
    const route = parse(location.hash.slice(1));
    if (route.redirect) {
      location.replace("#" + route.redirect);
      return;
    }
    cleanups.forEach((fn) => fn());
    cleanups = [];
    M.notes.detach();

    if (route.view) {
      const v = M.views[route.view];
      setSurface("paper", v.header || "paper");
      renderChrome(null, null, v.crumb);
      const cleanup = v.render(view);
      if (typeof cleanup === "function") cleanups.push(cleanup);
      document.title = `${v.title} · Marginalia`;
    } else if (route.shelf) {
      setSurface("night", "night");
      renderChrome(null);
      renderShelf();
      document.title = "Marginalia";
    } else if (!route.page) {
      setSurface("paper", "night");
      renderChrome(route.book);
      renderBookHome(route.book);
      document.title = `${route.book.title} · Marginalia`;
    } else {
      setSurface("paper", "paper");
      renderChrome(route.book, route.slug);
      renderPage(route.book, route.slug, route.page);
      document.title = `${route.page.title} · ${route.book.title} · Marginalia`;
    }
    window.scrollTo(0, 0);
    view.focus({ preventScroll: true });
    // Restart the short fade-in (styles.css, Motion) for the new view.
    view.classList.remove("is-entering");
    void view.offsetWidth;
    view.classList.add("is-entering");
  }

  function setSurface(page, header) {
    document.body.dataset.page = page;
    document.body.dataset.header = header;
  }

  function renderChrome(book, slug, extra) {
    const trail = [{ label: "Library", href: "#shelf" }];
    if (extra) trail.push({ label: extra });
    document.querySelectorAll("#sitenav a").forEach((a) => {
      if (a.getAttribute("href") === location.hash) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
    updateNoteCount();
    if (book) {
      const ctx = context(book);
      trail.push({ label: book.title, href: ctx.href() });
      if (slug) trail.push({ label: book.pages[slug].crumb || book.pages[slug].title });
    }
    crumbsEl.innerHTML = trail
      .map((c, i) => {
        const last = i === trail.length - 1;
        return (i ? '<span class="sep" aria-hidden="true">/</span>' : "") +
          (last ? `<span aria-current="page">${esc(c.label)}</span>` : `<a href="${c.href}">${esc(c.label)}</a>`);
      })
      .join("");

    bookNavEl.hidden = !book;
    if (!book) return;
    const ctx = context(book);
    const items = [{ href: ctx.href(), label: "Overview", current: !slug }].concat(
      book.nav.map((s) => ({ href: ctx.href(s), label: book.pages[s].navLabel || book.pages[s].title, current: s === slug }))
    );
    bookNavEl.innerHTML = items
      .map((n) => `<a href="${n.href}"${n.current ? ' aria-current="page"' : ""}>${esc(n.label)}</a>`)
      .join("");
  }

  /* ---------- Library shelf ---------- */

  function renderShelf() {
    const open = M.books.filter((b) => b.status === "open").length;
    view.innerHTML = `
      <section class="night shelf-page">
        <div class="wrap">
          <div class="shelf-intro">
            <p class="eyebrow">The library</p>
            <h1 class="display shelf-title">Business books, read slowly.</h1>
            <p class="lede">Each book on the shelf becomes a set of pages to explore: its ideas mapped and explained, its examples taken apart, and tools for trying its frameworks on problems of your own.</p>
          </div>
          <ul class="shelf" role="list">${M.books.map(shelfBookHTML).join("")}</ul>
          ${M.books.length - open ? `<p class="shelf-note">${open} open · ${M.books.length - open} forthcoming</p>` : ""}
          <a class="shelf-feature" href="#northline">
            <span class="shelf-feature-k">A year in three books</span>
            <span class="shelf-feature-t">Run Northline Bikes for a year <span aria-hidden="true">→</span></span>
            <span class="shelf-feature-d">Four decisions, one per quarter, each read through a different book. Every choice flows through the same income statement and bank balance.</span>
          </a>
        </div>
      </section>`;
  }

  function shelfBookHTML(b, i) {
    const open = b.status === "open";
    const total = Object.keys(b.pages).length;
    const seen = open ? Math.min(M.memory.visited(b.id).filter((s) => b.pages[s]).length, total) : 0;
    const lines = (b.hero && b.hero.lines) || [b.title];
    const inner = `
      <span class="book-3d" aria-hidden="true">
        <span class="book-face cover">
          <span class="cover-title">${lines.map((l) => `<span>${esc(l)}</span>`).join(" ")}</span>
          <span class="cover-author">${esc(b.coverAuthor || b.author)}</span>
        </span>
        <span class="book-face spine"></span>
        <span class="book-face pages"></span>
      </span>
      <span class="book-meta">
        <span class="book-title">${esc(b.title)}</span>
        <span class="book-sub">${esc(b.author)} · ${b.year}</span>
        ${
          !open
            ? '<span class="chip chip-muted">Forthcoming</span>'
            : seen
              ? `<span class="book-progress">${seen} of ${total} pages explored</span>`
              : `<span class="book-count">${total} pages</span>`
        }
      </span>`;
    return `<li class="book c-${b.cover} ${open ? "is-open" : "is-forthcoming"}" style="--i: ${i}">${
      open
        ? `<a class="book-link" href="#${b.id}">${inner}</a>`
        : `<div class="book-link" aria-disabled="true">${inner}</div>`
    }</li>`;
  }

  /* ---------- Book home ---------- */

  function renderBookHome(book) {
    const ctx = context(book);
    const chapterCount = book.parts.reduce((n, p) => n + p.chapters.length, 0);
    const shape = `${numberWord(book.parts.length)} parts, ${numberWord(chapterCount)} chapters`;
    const mapTitle = book.mapTitle || capitalize(shape);
    const contentsDesc = book.contentsDesc || `${capitalize(shape)}, one idea each.`;
    const [firstLine, ...restLines] = book.hero.lines;
    const art = book.hero.art && M.art[book.hero.art];

    const entries = book.entries
      .map(
        (e) => `<a class="entry" href="${ctx.href(e.page)}">
          <span class="entry-k">${esc(e.kicker)}</span>
          <span class="entry-t">${esc(e.title)} <span class="arrow" aria-hidden="true">→</span></span>
          <span class="entry-d">${esc(e.desc)}</span>
        </a>`
      )
      .join("");

    view.innerHTML = `
      <section class="night book-hero">
        ${art ? '<canvas class="hero-art" aria-hidden="true"></canvas>' : ""}
        <div class="wrap hero-inner">
          <p class="eyebrow">${esc(book.author)} · ${book.year}</p>
          <h1 class="display hero-title">${esc(firstLine)}${restLines.map((l) => ` <span class="hero-alt">${esc(l)}</span>`).join("")}</h1>
          <p class="hero-sub">${esc(book.subtitle)}</p>
          <p class="lede">${esc(book.thesis)}</p>
          <div class="entries">
            ${entries}
            <button class="entry" type="button" data-scroll="map">
              <span class="entry-k">Contents</span>
              <span class="entry-t">Map of the book <span class="arrow" aria-hidden="true">↓</span></span>
              <span class="entry-d">${esc(contentsDesc)}</span>
            </button>
          </div>
        </div>
      </section>

      <section class="paper-section" id="map">
        <div class="wrap">
          <div class="section-head">
            <p class="eyebrow">Map of the book</p>
            <h2 class="h2">${esc(mapTitle)}</h2>
            <p class="section-dek">${esc(book.mapNote)}</p>
          </div>
          <div class="parts">${book.parts.map((p) => partHTML(p, ctx)).join("")}</div>
        </div>
      </section>

      ${
        book.cases && book.cases.length
          ? `<section class="paper-section">
              <div class="wrap">
                <div class="section-head">
                  <p class="eyebrow">Cases</p>
                  <h2 class="h2">${esc(book.casesTitle || "Cases")}</h2>
                </div>
                <ul class="cases" role="list">${book.cases.map((c) => caseHTML(c, ctx)).join("")}</ul>
              </div>
            </section>`
          : ""
      }`;

    view.querySelector('[data-scroll="map"]').addEventListener("click", () => {
      document.getElementById("map").scrollIntoView({ behavior: reducedMotion.matches ? "auto" : "smooth" });
    });

    if (art) {
      const canvas = view.querySelector(".hero-art");
      const draw = () => art.draw(canvas);
      let timer = 0;
      const onResize = () => {
        clearTimeout(timer);
        timer = setTimeout(draw, 150);
      };
      draw();
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => canvas.isConnected && draw());
      window.addEventListener("resize", onResize);
      cleanups.push(() => window.removeEventListener("resize", onResize));
    }
  }

  function partHTML(p, ctx) {
    const rows = p.chapters
      .map((c) => {
        const live = Boolean(c.page);
        const tag = live ? "a" : "div";
        return `<li><${tag} class="chapter${live ? " is-live" : ""}"${live ? ` href="${ctx.href(c.page)}"` : ""}>
          <span class="ch-n">${c.n ? pad2(c.n) : "··"}</span>
          <span class="ch-body"><span class="ch-t">${esc(c.title)}</span><span class="ch-d">${esc(c.blurb)}</span></span>
          <span class="chip ${live ? "chip-open" : "chip-muted"}">${live ? "Open" : "In draft"}</span>
        </${tag}></li>`;
      })
      .join("");
    return `<div class="part">
      <p class="eyebrow">Part ${esc(p.n)}</p>
      <h3 class="part-t">${esc(p.title)}</h3>
      <ol class="chapters" role="list">${rows}</ol>
    </div>`;
  }

  function caseHTML(c, ctx) {
    const tag = c.page
      ? `<a class="case-tag is-live" href="${ctx.href(c.page)}">${esc(c.tag)} →</a>`
      : `<span class="case-tag">${esc(c.tag)}</span>`;
    return `<li class="case">
      <span class="case-era">${esc(c.era)}</span>
      <span class="case-body"><span class="case-t">${esc(c.title)}</span><span class="case-d">${esc(c.blurb)}</span></span>
      ${tag}
    </li>`;
  }

  /* ---------- Pages: a header, a run of blocks, and an optional end ---------- */

  function renderPage(book, slug, page) {
    const ctx = context(book, slug);
    M.memory.visit(book.id, slug);
    const blocks = page.blocks.map((block, i) => {
      const impl = M.blocks[block.type];
      if (!impl) throw new Error(`Unknown block type "${block.type}" on ${book.id}-${slug}`);
      return { block, impl, ctx: { ...ctx, uid: `${slug}-${i}` } };
    });

    view.innerHTML = `
      <article class="paper-section concept${page.kind === "tool" ? " is-tool" : ""}">
        <div class="wrap">
          <header class="concept-head">
            <p class="eyebrow">${esc(page.eyebrow)}</p>
            <h1 class="display concept-title">${esc(page.title)}</h1>
            <p class="dek">${esc(page.dek)}</p>
          </header>
          ${blocks.map((b, i) => `<div class="block" data-block="${i}">${b.impl.render(b.block, b.ctx)}</div>`).join("")}
          <section class="page-notes" data-page-notes hidden aria-label="Your notes on this page"></section>
          ${pagerHTML(book, slug, ctx)}
          ${page.end ? endHTML(book, page.end, ctx) : ""}
        </div>
      </article>`;

    blocks.forEach((b, i) => {
      if (!b.impl.mount) return;
      const cleanup = b.impl.mount(view.querySelector(`[data-block="${i}"]`), b.block, b.ctx);
      if (typeof cleanup === "function") cleanups.push(cleanup);
    });
    M.notes.attach(view.querySelector("article"), { book: book.id, slug, bookTitle: book.title, pageTitle: page.title });
  }

  // Previous/next links between open pages, in the book's chapter order.
  function pagerHTML(book, slug, ctx) {
    const order = [];
    book.parts.forEach((p) => p.chapters.forEach((c) => c.page && !order.includes(c.page) && order.push(c.page)));
    const i = order.indexOf(slug);
    if (i < 0 || order.length < 2) return "";
    const link = (s, dir) => {
      if (!s) return "<span></span>";
      const pg = book.pages[s];
      return `<a class="pager-${dir}" href="${ctx.href(s)}">
        <span class="pager-k">${dir === "prev" ? "← Previous" : "Next →"}</span>
        <span class="pager-t">${esc(pg.title)}</span>
        <span class="pager-w">${esc(pg.eyebrow)}</span>
      </a>`;
    };
    return `<nav class="pager" aria-label="Chapters">${link(order[i - 1], "prev")}${link(order[i + 1], "next")}</nav>`;
  }

  function endHTML(book, end, ctx) {
    const rows = (end.related || [])
      .map((r) => {
        const live = Boolean(r.page);
        const tag = live ? "a" : "span";
        return `<li><${tag} class="rel-row${live ? " is-live" : ""}"${live ? ` href="${ctx.href(r.page)}"` : ""}>
          <span class="rel-t">${esc(r.title)}</span><span class="rel-w">${esc(r.where)}</span>
          <span class="chip ${live ? "chip-open" : "chip-muted"}">${live ? "Open" : "In draft"}</span>
        </${tag}></li>`;
      })
      .join("");
    const cta = end.cta
      ? `<a class="cta" href="${ctx.href(end.cta.page)}">
          <span class="cta-k">${esc(end.cta.kicker)}</span>
          <span class="cta-t">${esc(end.cta.text)}</span>
          <span class="cta-go" aria-hidden="true">→</span>
        </a>`
      : "";
    return `<div class="concept-end">
        <div class="related">
          <p class="eyebrow">Related ideas</p>
          <ul role="list">${rows}</ul>
        </div>
        ${cta}
      </div>
      ${book.citation ? `<p class="fineprint">${book.citation}</p>` : ""}`;
  }

  function updateNoteCount() {
    const el = document.getElementById("notecount");
    if (!el) return;
    const n = M.memory.notes().length;
    el.textContent = n ? String(n) : "";
    el.hidden = !n;
  }

  // Pages that summarize what the reader has done refresh when it changes.
  let refreshTimer = 0;
  M.memory.onChange(() => {
    updateNoteCount();
    clearTimeout(refreshTimer);
    refreshTimer = setTimeout(() => {
      const route = parse(location.hash.slice(1));
      if (route.shelf && !route.redirect) renderShelf();
      else if (route.view && M.views[route.view].live) {
        cleanups.forEach((fn) => fn());
        cleanups = [];
        const cleanup = M.views[route.view].render(view);
        if (typeof cleanup === "function") cleanups.push(cleanup);
      }
    }, 250);
  });

  /* ---------- Boot ---------- */

  window.addEventListener("hashchange", go);
  go();
})();
