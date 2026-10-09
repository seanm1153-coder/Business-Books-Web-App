# Working on Marginalia

Instructions for AI coding agents and human contributors. Read this before changing anything. `README.md` has the page list and a feature overview.

Marginalia is an interactive study companion for business books. It's a static site with plain HTML, CSS and JavaScript. It has no framework, no build step and no runtime dependencies. The only dependency is Playwright, for the tests.

## Commands

```sh
npm install          # once; installs Playwright for the tests
npx playwright install chromium   # once, if Chromium isn't already installed
npm start            # serve the site at http://localhost:8000/
npm test             # run every test (Node's built-in runner + Playwright)
npm run bundle       # write dist/marginalia.html, a single self-contained file
```

Run `npm test` before every commit. It must pass, with no console errors. CI runs the same command on every pull request.

## How the code fits together

- `index.html` is the page shell. Scripts load in order with plain `<script>` tags and share one global, `window.Marginalia` (`M` in the code). The order of the book scripts sets the order of books on the shelf. `assets/js/app.js` loads last.
- `assets/js/util.js` creates the namespace (`M.books`, `M.blocks`, `M.art`, `M.views`, `M.addBook`) and shared helpers (`esc`, `capitalize`, `resolveLinks`, `store`, `tablist`, …).
- `assets/books/<id>.js` holds one book: metadata, the chapter map, cases and pages. It's pure data and calls `M.addBook({...})`.
- `assets/js/blocks/<type>.js` holds one reusable page block per file.
- `assets/js/views/*.js` are site-wide pages (`#notebook`, `#northline`).
- `assets/js/art/*.js` draws the hero art on each book's home page.
- `assets/js/memory.js` stores everything a reader leaves behind (notes, drafts, scores, visits). `notes.js` does highlights and margin notes. `ask.js` does the Claude critique, and `assistant.js` the Ask Claude panel, which reads every interactive's controls generically (sliders, radio groups, checkboxes, presets, tabs) and can operate them. Use real labelled controls in new blocks and the panel works with them for free.
- `assets/js/northline-model.js` is a pure quarterly finance model. It works both in the browser and in Node (`module.exports`).
- `assets/styles.css` holds every style. Design tokens are at the top, with a light theme and a dark theme.

### Routes

The hash is the route. `#shelf` is the library, `#<book>` a book's home page, `#<book>-<slug>` a page in a book, and `#notebook` and `#northline` are the site-wide views. Unknown routes redirect to `#shelf`. Old routes are listed in `ALIASES` in `app.js`. Never remove an alias.

### Pages and blocks

A page is a header, a list of blocks and an optional end section:

```js
"my-page": {
  title: "…", navLabel: "Short", eyebrow: "Part II · …", dek: "One or two plain sentences.",
  blocks: [ { type: "prose", sections: [...] }, { type: "sorter", ... } ],
  end: {
    related: [ { title: "…", where: "Part I", page: "other-slug" } ],   // omit page if it doesn't exist yet
    cta: { page: "builder", kicker: "Workbench", text: "…" }
  }
}
```

A block type lives in `M.blocks[type]` and has two functions:

```js
render(block, ctx)        // returns an HTML string. ctx = { book, slug, uid, href(slug) }
mount(root, block, ctx)   // wires up events; may return a cleanup function (remove window listeners there)
```

Use `ctx.uid` to make ids unique. Escape every piece of data with `esc()`. Look elements up inside `root`, never across the whole `document`.

Links inside content HTML use `href="@slug"` for a page in the same book. `resolveLinks` turns them into real routes. The tests fail on any link to a route that doesn't exist.

## Recipes

**Add a page to an existing book**
1. Add an entry to the book's `pages` object.
2. Point a chapter at it with `page: "<slug>"`. That gives it a place in the map and in the previous/next pager.
3. Only add it to the book's `nav` if the nav has fewer than four entries. The header must stay on one line.
4. Add a row to the page table in `README.md`.
5. Add a test in `tests/exercises.test.js` if the page has an interactive block.

**Add a block type**
1. Create `assets/js/blocks/<type>.js`, copying the pattern of an existing block such as `sorter.js` or `triangle.js`.
2. Add its `<script>` tag to `index.html` with the other blocks (before `app.js`).
3. Add its styles to `styles.css` under a comment header.
4. Before reaching for a new block, check whether an existing one fits. `sorter` handles two or more options; `prose` handles text with sidenotes.

**Write a dense reference page**
The direction for chapter pages is more of the book per screen and fewer toy models and quizzes. `#ump-five-forces` is the model.
1. Set `layout: "dense"` on the page for the compact head.
2. Open with a `brief`: the chapter's argument as numbered claims (`{ t, d }`).
3. Draw the chapter's own framework and chart real figures from the book. `force-map` draws a hub and spokes, `value-chain` Porter's chain, and `figure` any diagram as inline SVG built from the `.sv-*` classes in `styles.css` (numbered `.sv-call` markers tie it to its notes; give a taller `svgNarrow` when the wide drawing would be too small on a phone). `bar-chart` charts real figures; name the source, and flag any figure you couldn't check in a code comment.
4. Put comparisons, worked cases and common mistakes in `table` blocks. Cells are trusted HTML; `<span class="pl-tag">Price ↓</span>` marks where something hits the P&L.

**Add a book**
1. Create `assets/books/<id>.js` with `M.addBook({ id, title, author, year, status: "open", cover, hero, thesis, citation, entries, parts, pages, nav })`. Use `pb.js` as the model.
2. Add its `<script>` tag to `index.html` after the other books.
3. Add a cover color set (`--c-<id>`, `--c-<id>-ink`, …) to both themes in `styles.css`.
4. Give the hero an existing art key, or add a new file in `assets/js/art/`.

## Rules

**Content and copyright**
- Write summaries in your own words. Quotations must be short (a phrase or a sentence) and attributed. Never paste passages from the books.
- Example companies are invented (Northline Bikes and others) unless a real case comes from the book. If you aren't sure a detail is in the book, mark it as unchecked in a code comment or `mapNote` rather than guessing.

**Writing style**
- Plain, direct language: short sentences, defined jargon, sentence-case headings.
- No hype words, no exclamation marks.

**Design**
- Use only the color tokens in `:root`. Never use a raw hex value in a component.
- Every color must work in both light and dark themes. Check both.
- Chart series colors are `--series-profit` and `--series-cash`.
- Use the fonts already loaded: Gloock for display, Literata for text, Fragment Mono for labels and numbers. Use `.tnum` for numbers that change.
- Every page must fit a 390px-wide phone screen with no sideways scrolling. The tests check every route in both themes.
- Respect `prefers-reduced-motion` (see `util.reducedMotion`).

**Accessibility**
- Use real buttons and labels.
- Sliders need a `<label for>`.
- Live results need `aria-live="polite"`.
- Tabs use `util.tablist`.

**Storage**
- Go through `M.memory` (`result`, `draft`/`setDraft`, `addNote`, `visit`). Never call `localStorage` directly from a block.

## Things that look broken but aren't

- **`window.claude` is usually absent.** The site is also published as a claude.ai Artifact. There, `window.claude.use("db" | "user" | "sample")` provides cloud sync, the Claude critique and the Ask Claude panel. Everywhere else, including GitHub Pages and local runs, it's missing, so memory falls back to browser storage and the critique button and Ask Claude panel stay hidden. Don't remove these code paths or make them required. `tests/reader.test.js` covers both modes with a mock.
- **The claude.ai Artifact is a build output.** It's made with `python3 tools/bundle.py --fragment <file>` and published by a Claude session. Only edit the source files in this repo.
- **`dist/` is ignored.** Don't commit build output.

## Tests

`tests/` uses Node's built-in test runner with Playwright. Each file starts its own static server on a free port.

- `model.test.js`: the Northline model, in plain Node.
- `site.test.js`: every route renders at desktop width and on a 390px phone (both themes), all internal links resolve, old routes redirect, the header stays one line, and the single-file bundle works.
- `exercises.test.js`: drives each interactive block and checks the numbers it shows. If you change a block's data on purpose, update the expected numbers here.
- `reader.test.js`: notes and highlights, the notebook, a Northline playthrough, cloud sync (mocked) and the Claude critique (mocked).

Never skip or delete a test to make the suite pass. Fix the cause, or update an expectation when the change was intended, and say so in the commit message.

## Git

- Work on a branch and open a pull request into `main`. Merges to `main` publish to GitHub Pages.
- Keep each pull request to one change: a page, a block, a fix.
