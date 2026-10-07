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
| Library | `#shelf` | A shelf of 3D books: Good Strategy Bad Strategy, Financial Intelligence and Play Bigger. |
| Book home | `#gsbs` | Thesis, entry points, a map of all 18 chapters, and the cases Rumelt uses. |
| Bad strategy | `#gsbs-bad-strategy` | The four hallmarks of bad strategy, plus "Spot the bad strategy": highlight sentences in three invented plans, then check your answers against annotated notes. |
| Proximate objectives | `#gsbs-proximate-objectives` | The Surveyor story and a "proximate or blue-sky?" sorting game with rewrites. |
| Chain-link systems | `#gsbs-chain-link` | Spend six improvement points on a restaurant whose evening is only as good as its weakest part; compare with an additive system. |
| The kernel | `#gsbs-kernel` | A concept page with an interactive figure (general form, Desert Storm, Apple 1997), sidenotes and definition pop-ups. |
| Workbench | `#gsbs-builder` | Write a diagnosis, guiding policy and actions. Rule-based checks flag goals posing as strategy, buzzwords, unlinked actions and policies that rule nothing out. Drafts save to `localStorage`. |
| Financial Intelligence home | `#fi` | Thesis, entry points and a map of all eight parts. |
| Profit is an estimate | `#fi-profit-estimate` | Five accounting judgment calls on the same month: profit ranges from a loss to about $40,000 while the change in cash stays fixed. |
| Profit isn't cash | `#fi-profit-cash` | A linked three-statement simulator: apply a month of events at an invented bike maker and watch the income statement, balance sheet and cash flow statement move together, with a profit-vs-cash chart. |
| Working capital levers | `#fi-working-capital` | Sliders for days sales outstanding, days in inventory and days payable, with the cash conversion cycle and the cash it ties up. |
| Play Bigger home | `#pb` | Thesis, entry points and a map of the book's ideas. |
| Category kings | `#pb-category-kings` | How a category's value splits (the authors' 76% figure) and a "playing bigger or smaller?" sorting game. |
| Point of view | `#pb-point-of-view` | Write a category's story (problem, from, to, why now, name) with a live preview and checks for product-pitch habits. Drafts save to `localStorage`. |

Routes are `#<book>` for a book's home and `#<book>-<page>` for its pages. Older links (`#kernel`, `#builder`, …) redirect.

## How it's organized

```
index.html                    page shell; script order sets the shelf order
assets/styles.css             design tokens (light and dark) and all styles
assets/books/<id>.js          one file per book: metadata, chapter map, cases and pages
assets/js/util.js             shared namespace and helpers
assets/js/blocks/*.js         reusable page blocks (prose, kernel-figure, hallmarks,
                              spot-exercise, kernel-builder, three-statements,
                              sorter, chain-link, judgment-calls, wc-levers,
                              value-split, pov-builder)
assets/js/art/*.js            book-home hero art (contours, ledger, categories)
assets/js/app.js              router, shelf, book home and page shell (loads last)
tools/bundle.py               builds a single self-contained HTML file in dist/
.github/workflows/pages.yml   publishes the site to GitHub Pages on pushes to main
```

A page is a header plus a list of blocks, each `{ type: "...", ...settings }`, and an optional end section with related ideas and a call to action. To add a page, add an entry to the book's `pages` and point a chapter at it with `page: "<slug>"`. To add a book, create `assets/books/<id>.js`, call `Marginalia.addBook({...})`, and add a script tag to `index.html`. A new kind of interactive means a new file in `assets/js/blocks/`.

Summaries are written in our own words. Keep quotations short and attributed.

## Publishing

- **GitHub Pages:** in the repo, go to Settings → Pages → Build and deployment and set Source to **GitHub Actions**. After that, every push to `main` publishes the site.
- **Single file:** `python3 tools/bundle.py` writes `dist/marginalia.html` with all styles and scripts inlined.
