# Marginalia

An interactive study companion for business books: Richard P. Rumelt's *Good Strategy Bad Strategy*, Berman and Knight's *Financial Intelligence*, Ramadan, Peterson, Lochhead and Maney's *Play Bigger*, Donella H. Meadows's *Thinking in Systems*, and Joan Magretta's *Understanding Michael Porter*.

It's a static site with plain HTML, CSS and JavaScript, and no build step.

## Run it

Open `index.html` in a browser, or serve the folder:

```sh
npm start            # http://localhost:8000/
```

## Contributing

Read [`AGENTS.md`](AGENTS.md) first. It covers the code layout, the recipes for adding pages, blocks and books, and the rules for content and design. It's written for AI coding agents and people alike. Run the tests before every commit:

```sh
npm install
npm test
```

## What's here

| Page | Route | What it does |
| --- | --- | --- |
| Library | `#shelf` | A shelf of 3D books: Good Strategy Bad Strategy, Financial Intelligence, Play Bigger, Thinking in Systems and Understanding Michael Porter. |
| Book home | `#gsbs` | Thesis, entry points, a map of all 18 chapters, and the cases Rumelt uses. |
| Discovering power | `#gsbs-discovering-power` | Wal-Mart's small towns, Andrew Marshall's strength-against-weakness thinking, and a "strength against weakness?" sort with better-aimed rewrites. |
| Bad strategy | `#gsbs-bad-strategy` | The four hallmarks of bad strategy, plus "Spot the bad strategy": highlight sentences in three invented plans, then check your answers against annotated notes. |
| Why so much bad strategy? | `#gsbs-why-bad-strategy` | The unwillingness to choose, template-style strategy and New Thought, with a strategy template machine whose choice detector always reads zero. |
| Using leverage | `#gsbs-using-leverage` | Anticipation, pivot points, and a spread-or-concentrate exercise where initiatives only pay off past a threshold. |
| Proximate objectives | `#gsbs-proximate-objectives` | The Surveyor story and a "proximate or blue-sky?" sorting game with rewrites. |
| Chain-link systems | `#gsbs-chain-link` | Spend six improvement points on a restaurant whose evening is only as good as its weakest part; compare with an additive system. |
| Using design | `#gsbs-using-design` | Hannibal at Cannae as a step-through map in four phases, showing how each unit was placed for what it would do later, and the price of a tight fit. |
| Focus | `#gsbs-focus` | Coordinated policies aimed at the right target, with Crown Cork & Seal and an exercise where Northline Bikes aims five policies at one group of riders, or at everyone, and sees which groups it leads. |
| Growth | `#gsbs-growth` | Growth as the outcome of an advantage, Crown after Connelly, and a deal list where buying four companies doubles sales while the owners end up poorer. |
| Using advantage | `#gsbs-using-advantage` | What an advantage is, Rumelt's silver machine, and a four-way sort of moves that deepen, broaden, create demand for or protect an advantage. |
| Using dynamics | `#gsbs-using-dynamics` | Five guideposts of change (rising fixed costs, deregulation, predictable biases, incumbent response, attractor states) and a highlighter exercise on two invented market briefings. |
| Inertia and entropy | `#gsbs-inertia-entropy` | Inertia of routine, cultural inertia, inertia by proxy and entropy, with a four-way sort of invented organizations held back by each. |
| Strategy as hypothesis | `#gsbs-science-of-strategy` | Strategy as an educated, testable judgment, with a "hypothesis or article of faith?" sort. |
| The kernel | `#gsbs-kernel` | A concept page with an interactive figure (general form, Desert Storm, Apple 1997), sidenotes and definition pop-ups. |
| Workbench | `#gsbs-builder` | Write a diagnosis, guiding policy and actions. Rule-based checks flag goals posing as strategy, buzzwords, unlinked actions and policies that rule nothing out. Drafts are saved for the reader. |
| Financial Intelligence home | `#fi` | Thesis, entry points and a map of all eight parts. |
| Profit is an estimate | `#fi-profit-estimate` | Five accounting judgment calls on the same month: profit ranges from a loss to about $40,000 while the change in cash stays fixed. |
| Revenue recognition | `#fi-revenue` | Revenue counts when it's earned, not when it's paid: sort eight September deals (deposits, gift cards, prepaid servicing, a signed contract) by how much counts this month. |
| The many forms of profit | `#fi-forms-of-profit` | Gross, operating and net profit and their margins, with six moves (a price rise, a marketing cut, a cheaper loan, a one-time gain…) that each reach only some of them. |
| Why the balance sheet balances | `#fi-balance-sheet` | Double-entry bookkeeping: post eight of Northline's transactions by choosing the two accounts each one moves, with a balance scale that tips when an entry doesn't balance. |
| Profit isn't cash | `#fi-profit-cash` | A linked three-statement simulator: apply a month of events at an invented bike maker and watch the income statement, balance sheet and cash flow statement move together, with a profit-vs-cash chart. |
| The language of cash flow | `#fi-cash-flow-language` | Operating, investing and financing, with a three-way sort of Northline's cash flows. |
| How cash connects | `#fi-cash-connects` | Build the bridge from net profit to the change in cash: decide whether each balance sheet change adds or uses cash, and the finished bridge checks itself against the cash account. |
| Reading the ratios | `#fi-ratios` | Thirteen ratios across two years of a growing company, each with its formula worked through with the real numbers. |
| The building blocks of ROI | `#fi-roi-basics` | Time value of money, cost of capital and the hurdle rate, with a rate slider that decides between $10,000 now and five larger sums later. |
| Figuring ROI | `#fi-roi` | Payback, net present value and internal rate of return for a welding robot, with sliders and a discounted cash chart. |
| Working capital levers | `#fi-working-capital` | Sliders for days sales outstanding, days in inventory and days payable, with the cash conversion cycle and the cash it ties up. |
| Play Bigger home | `#pb` | Thesis, entry points and a map of the book's ideas. |
| Category kings | `#pb-category-kings` | How a category's value splits (the authors' 76% figure) and a "playing bigger or smaller?" sorting game. |
| The magic triangle | `#pb-magic-triangle` | Company, product and category design on a triangle, with presets for the common imbalances. |
| Naming the category | `#pb-naming` | What makes a category name, with a "would it work as a category name?" sort. |
| Point of view | `#pb-point-of-view` | Write a category's story (problem, from, to, why now, name) with a live preview and checks for product-pitch habits. Drafts are saved for the reader. |
| The lightning strike | `#pb-lightning-strike` | Schedule six launch moves over twelve weeks and see, in a labeled toy model, whether a drip, a strike or a strike with hijacks gets noticed. |
| Thinking in Systems home | `#tis` | Thesis, a map of the book's three parts and seven chapters, and the small systems Meadows uses as examples. |
| Stocks and flows | `#tis-stocks-flows` | A bathtub simulator: run the clock, move the faucet and drain, and watch the level trace a behavior-over-time graph, including a tub that keeps filling while the faucet closes. |
| Feedback loops | `#tis-feedback` | Balancing and reinforcing loops in three simulators on tabs: a cooling coffee, money earning interest, and a population whose birth rate can fall until the dominant loop shifts. |
| Delays and oscillation | `#tis-delays` | Meadows's car dealer rebuilt as a simulator: three delays, one 10% rise in demand, and experiments showing that reacting faster makes the swings worse while reacting more slowly calms them. |
| Growth meets a limit | `#tis-limits` | Meadows's oil and fishing economies as a two-tab simulator: a bigger oil field moves the peak later without lengthening the boom, and better fishing gear turns a steady fishery into boom and bust, then collapse. Ends with a stock-limited or flow-limited sorter. |
| Why systems work so well | `#tis-resilience` | Resilience, self-organization and hierarchy. A just-in-time simulator shows what a parts buffer costs in a calm year, on average and in a bad decade (2,000 seeded decades), and a sorter asks which property each example shows. |
| Why systems surprise us | `#tis-surprises` | Meadows's six sources of surprise as cards, an event, behavior or structure sorter, and a help-desk queue (our illustration, not the book's) where the wait outruns a straight-line forecast as the desk nears capacity. |
| System traps | `#tis-traps` | Meadows's eight system traps as cards, each with its way out; a shared-pasture simulator in which the open commons collapses while fencing and a cap restore the missing feedback; and a sorter for naming four of the traps. |
| Leverage points | `#tis-leverage-points` | Meadows's twelve places to intervene in a system as a ladder, the meter-in-the-hall story, and a ranking exercise: put five ideas for a city's traffic in order of leverage. |
| Living in a world of systems | `#tis-living` | Meadows's fifteen closing habits as cards, and a workbench for sketching the system behind a recurring problem (behavior, stock, flows, loop, delay, leverage point) with live checks, a stock-and-flow preview, the notebook and the optional Claude critique. |
| Understanding Michael Porter home | `#ump` | Thesis, a map of the book's two parts and seven chapters, and the companies the book uses. |
| Competition: the right mindset | `#ump-mindset` | Compete to be unique, not the best: a toy market of four firms on one line of customer needs, where firms crowding the same spot earn $4,000 between them and the same firms spread out earn $40,000; operational effectiveness versus strategy; and a best-or-unique sort. |
| The five forces | `#ump-five-forces` | Porter's five forces and what they divide, a toy model of how much of $100 of value an industry keeps as each force strengthens, and an eight-item sort of developments by the force they change. |
| Competitive advantage | `#ump-advantage` | Advantage as relative price and relative cost: a calculator comparing your price, cost and margin with a rival's at $100 and $90, the value chain as the source of every difference, and a price-or-cost sort. |
| Creating value | `#ump-value` | The three questions of a value proposition (which customers, which needs, what relative price) and the tailored value chain. A builder for an invented car rental company flags answers that contradict or barely fit, and shows the tailored chain for each of the three coherent positions. Ends with a which-question sort. |
| Trade-offs | `#ump-trade-offs` | Why choosing what not to do protects a position, and an airline builder: six activities, each run the full-service or the low-cost way, drawn as a map of choices that reinforce or clash. Consistent full service earns $10 a passenger and consistent low cost $14; every mix earns less. |
| Fit | `#ump-fit` | Porter's three kinds of fit; a calculator for the odds of copying a whole system (90% per activity gives 66% for four); and the airline model run over every partial copy, where each one earns less than not copying at all and only the complete system pays. Ends with a which-kind-of-fit sort. |
| Continuity | `#ump-continuity` | Why strategy needs years, and a toy simulator of two strategies whose capability builds while pursued and fades while not: staying the course earns $1,883m over 20 years, changing every two years $739m, and when the market shifts, one well-timed change beats both. |
| Test your strategy | `#ump-five-tests` | Workbench: write down a strategy (customers, needs, relative price, tailored activities, trade-offs, fit, continuity) and check it against Porter's five tests as you type. Drafts go to the notebook, with the optional Claude critique. |
| Northline | `#northline` | A year running an invented bike maker: four quarterly decisions, each read through a different book, flowing through one quarterly model of profit, cash and borrowing. |
| Notebook | `#notebook` | The reader's commonplace book: highlights and margin notes, workbench drafts, exercise scores, pages explored and their Northline result. |

## Reader features

- **Margin notes.** Select text in any chapter's prose to highlight it or add a note. Highlights come back on every visit and collect in the notebook.
- **Memory.** `assets/js/memory.js` keeps notes, drafts, scores and visits. Inside a Claude viewer with the `db` and `user` capabilities, they live in the reader's private store (`data/users/<id>/library`) and follow them across devices; anywhere else they stay in the browser.
- **Claude critique.** The four workbenches (kernel, point of view, system sketch, strategy tests) can ask Claude for a critique of the draft through the `sample` capability. Where Claude isn't reachable (for example on GitHub Pages) the button stays hidden.

Routes are `#<book>` for a book's home and `#<book>-<page>` for its pages. Older links (`#kernel`, `#builder`, …) redirect.

## How it's organized

```
index.html                    page shell; script order sets the shelf order
assets/styles.css             design tokens (light and dark) and all styles
assets/books/<id>.js          one file per book: metadata, chapter map, cases and pages
assets/js/util.js             shared namespace and helpers
assets/js/memory.js           what the site remembers per reader (cloud or browser)
assets/js/notes.js            highlights and margin notes on chapter prose
assets/js/ask.js              Claude critique for the workbenches
assets/js/northline-model.js  the Northline quarterly model (pure; testable in Node)
assets/js/views/*.js          site-wide pages: notebook, northline
assets/js/blocks/*.js         reusable page blocks (prose, kernel-figure, hallmarks,
                              spot-exercise, kernel-builder, three-statements,
                              sorter, chain-link, judgment-calls, wc-levers,
                              value-split, pov-builder, concentration, ratios,
                              strike-planner, template-strategy, roi-calculator,
                              triangle, policy-fit, deals,
                              profit-layers, cash-bridge, phase-map,
                              double-entry, now-or-later, bathtub,
                              loop-sim, inventory, ladder, ranker, trap-cards,
                              commons, limits, queue,
                              buffer, system-sketch, forces,
                              advantage, activity-system, positions,
                              copy-odds, copy-valley, value-prop,
                              continuity, strategy-tests)
assets/js/art/*.js            book-home hero art (contours, ledger, categories, behavior, forces)
assets/js/app.js              router, shelf, book home and page shell (loads last)
tools/bundle.py               builds a single self-contained HTML file in dist/
tests/                        Node test runner + Playwright: routes, exercises, reader features
.github/workflows/test.yml    runs the tests on every pull request and push to main
.github/workflows/pages.yml   publishes the site to GitHub Pages on pushes to main
```

A page is a header plus a list of blocks, each `{ type: "...", ...settings }`, and an optional end section with related ideas and a call to action. To add a page, add an entry to the book's `pages` and point a chapter at it with `page: "<slug>"`. To add a book, create `assets/books/<id>.js`, call `Marginalia.addBook({...})`, and add a script tag to `index.html`. A new kind of interactive means a new file in `assets/js/blocks/`.

Summaries are written in our own words. Keep quotations short and attributed.

## Publishing

- **GitHub Pages:** in the repo, go to Settings → Pages → Build and deployment and set Source to **GitHub Actions**. After that, every push to `main` publishes the site.
- **Single file:** `python3 tools/bundle.py` writes `dist/marginalia.html` with all styles and scripts inlined.
