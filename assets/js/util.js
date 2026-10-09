// Shared namespace and helpers. Loaded first; book files and blocks register into it.
(function () {
  "use strict";

  const M = (window.Marginalia = window.Marginalia || {});

  M.books = [];
  M.blocks = {};
  M.art = {};
  M.views = {}; // site-wide pages that sit outside any book (#notebook, #northline)

  // Shelf order is registration order, so script order in index.html decides it.
  M.addBook = (book) => {
    M.books.push(book);
  };

  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const NUMBER_WORDS = [
    "zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten",
    "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen", "twenty"
  ];

  M.util = {
    esc,
    pad2: (n) => String(n).padStart(2, "0"),
    numberWord: (n) => NUMBER_WORDS[n] || String(n),
    capitalize: (s) => s.charAt(0).toUpperCase() + s.slice(1),
    reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)"),

    // Content HTML links to pages in the same book as href="@slug" ("@" alone is the book home).
    resolveLinks: (html, ctx) => html.replace(/href="@([\w-]*)"/g, (_, slug) => `href="${ctx.href(slug)}"`),

    // The compact heading the reference blocks share (brief, force-map, bar-chart, table):
    // a mono label, a title and an optional one-paragraph intro (trusted HTML).
    figHead: (block, ctx) => `<header class="fig-head">
        ${block.eyebrow ? `<p class="fig-k">${esc(block.eyebrow)}</p>` : ""}
        <h2 class="fig-t" id="${ctx.uid}-h">${esc(block.title)}</h2>
        ${block.intro ? `<p class="fig-intro">${M.util.resolveLinks(block.intro, ctx)}</p>` : ""}
      </header>`,

    // localStorage can be missing or blocked; every access is guarded.
    store: {
      get(key) {
        try {
          const v = localStorage.getItem(key);
          return v ? JSON.parse(v) : null;
        } catch (e) {
          return null;
        }
      },
      set(key, val) {
        try {
          localStorage.setItem(key, JSON.stringify(val));
          return true;
        } catch (e) {
          return false;
        }
      }
    },

    // Where book-home hero art can draw without crossing the hero text, measured from the
    // text itself: the area to its right when that is at least `minWide` wide, otherwise a
    // strip above the eyebrow, aligned with the text. In strip mode the hero gets the extra
    // top padding it has on phones (.has-art-strip), so the strip never sits on the text.
    heroArea(canvas, { minWide = 260, strip = 104, maxStrip = Infinity } = {}) {
      const host = canvas.parentElement;
      const box = host.getBoundingClientRect();
      const rects = [];
      host.querySelectorAll(".hero-inner > :not(.entries)").forEach((el) => {
        const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
        for (let n = walker.nextNode(); n; n = walker.nextNode()) {
          if (!n.textContent.trim()) continue;
          const range = document.createRange();
          range.selectNodeContents(n);
          rects.push(...range.getClientRects());
        }
      });
      const right = rects.length ? Math.max(...rects.map((r) => r.right)) - box.left : box.width * 0.62;
      const left = rects.length ? Math.min(...rects.map((r) => r.left)) - box.left : 24;
      const ax = right + 48;
      const wide = box.width - ax - 40 >= minWide;
      host.classList.toggle("has-art-strip", !wide);
      // Read the size after the class change, which can alter the hero's height.
      const rect = canvas.getBoundingClientRect();
      const w = Math.max(1, Math.round(rect.width));
      const h = Math.max(1, Math.round(rect.height));
      return wide
        ? { w, h, wide, X: ax, Y: h * 0.12, W: w - ax - 40, H: h * 0.52 }
        : { w, h, wide, X: left, Y: 16, W: Math.min(w - 2 * left, maxStrip), H: strip };
    },

    // Arrow-key tablist behavior shared by the example switchers.
    tablist(tabs, onSelect) {
      function select(tab) {
        tabs.forEach((t) => {
          const on = t === tab;
          t.setAttribute("aria-selected", String(on));
          t.tabIndex = on ? 0 : -1;
        });
        onSelect(tab);
      }
      tabs.forEach((tab, i) => {
        tab.addEventListener("click", () => select(tab));
        tab.addEventListener("keydown", (e) => {
          if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
          e.preventDefault();
          const next = tabs[(i + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length];
          next.focus();
          select(next);
        });
      });
    }
  };
})();
