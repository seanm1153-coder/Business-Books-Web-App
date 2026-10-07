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
