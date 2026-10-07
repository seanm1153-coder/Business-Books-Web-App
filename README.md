# Marginalia

An interactive study companion for business books. The first book is Richard P. Rumelt's *Good Strategy Bad Strategy*.

This is a clickable static mockup: plain HTML, CSS and JavaScript with no build step.

## Run it

Open `index.html` in a browser, or serve the folder:

```sh
npx serve .
```

## What's here

| Page | Route | What it does |
| --- | --- | --- |
| Library | `#shelf` | A shelf of 3D books: Good Strategy Bad Strategy and Financial Intelligence. |
| Book home | `#gsbs` | Thesis, entry points, a map of all 18 chapters, and the cases Rumelt uses. |
| Bad strategy | `#gsbs-bad-strategy` | The four hallmarks of bad strategy, plus "Spot the bad strategy": highlight sentences in three invented plans, then check your answers against annotated notes. |
| The kernel | `#gsbs-kernel` | A concept page with an interactive figure (general form, Desert Storm, Apple 1997), sidenotes and definition pop-ups. |
| Workbench | `#gsbs-builder` | Write a diagnosis, guiding policy and actions. Rule-based checks flag goals posing as strategy, buzzwords, unlinked actions and policies that rule nothing out. Drafts save to `localStorage`. |
| Financial Intelligence home | `#fi` | Thesis, entry points and a map of all eight parts. |
| Profit isn't cash | `#fi-profit-cash` | A linked three-statement simulator: apply a month of events at an invented bike maker and watch the income statement, balance sheet and cash flow statement move together, with a profit-vs-cash chart. |

Routes are `#<book>` for a book's home and `#<book>-<page>` for its pages. Older links (`#kernel`, `#builder`, …) redirect.

## How it's organized

```
index.html                    page shell; script order sets the shelf order
assets/styles.css             design tokens (light and dark) and all styles
assets/books/<id>.js          one file per book: metadata, chapter map, cases and pages
assets/js/util.js             shared namespace and helpers
assets/js/blocks/*.js         reusable page blocks (prose, kernel-figure, hallmarks,
                              spot-exercise, kernel-builder, three-statements)
assets/js/art/*.js            book-home hero art (contours, ledger)
assets/js/app.js              router, shelf, book home and page shell (loads last)
tools/bundle.py               builds a single self-contained HTML file in dist/
.github/workflows/pages.yml   publishes the site to GitHub Pages on pushes to main
```

A page is a header plus a list of blocks, each `{ type: "...", ...settings }`, and an optional end section with related ideas and a call to action. To add a page, add an entry to the book's `pages` and point a chapter at it with `page: "<slug>"`. To add a book, create `assets/books/<id>.js`, call `Marginalia.addBook({...})`, and add a script tag to `index.html`. A new kind of interactive means a new file in `assets/js/blocks/`.

Summaries are written in our own words. Keep quotations short and attributed.

## Publishing

- **GitHub Pages:** in the repo, go to Settings → Pages → Build and deployment and set Source to **GitHub Actions**. After that, every push to `main` publishes the site.
- **Single file:** `python3 tools/bundle.py` writes `dist/marginalia.html` with all styles and scripts inlined.
