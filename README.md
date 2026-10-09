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
| Discovering power | `#gsbs-discovering-power` | Rumelt's two sources of power: the argument in six points, Wal-Mart's small towns drawn as a schematic (a national chain's far-flung stores against a cluster around its own warehouse; stacked on phones), where a rival's strength becomes its weakness, and strength against weakness set beside coherence. |
| Bad strategy | `#gsbs-bad-strategy` | The argument in six points, the four hallmarks as a table in their highlighter colors, "Spot the bad strategy" (highlight sentences in three invented plans, then check your answers against annotated notes), and what each hallmark is missing and how to repair it. |
| Why so much bad strategy? | `#gsbs-why-bad-strategy` | The unwillingness to choose: the argument in six points, the DEC meeting drawn as a voting cycle (chips beat boxes, boxes beat solutions, solutions beat chips, each 2 to 1) with the rankings behind it, template-style strategy set against New Thought, and ways to force a choice. |
| Using leverage | `#gsbs-using-leverage` | The argument in six points, a threshold curve showing why concentrated effort beats spread effort, the three sources of leverage (anticipation, pivot points, concentration) and why spreading feels safer than it is. |
| Proximate objectives | `#gsbs-proximate-objectives` | The argument in six points, the Surveyor story drawn as a ladder of objectives (each rung the next one's problem), proximate and blue-sky objectives told apart, and four blue-sky objectives rewritten within reach. |
| Chain-link systems | `#gsbs-chain-link` | The argument in six points, a drawing of five parts where the weakest sets the result (4, against an average of 6, and raising the strongest part changes nothing), additive and chain-link systems compared, and where chain-link logic shows up. |
| Using design | `#gsbs-using-design` | The argument in five points, Hannibal at Cannae as a step-through map in four phases, what made the trap work (anticipation, placement, timing, coordination), and the price of a tight fit. |
| Focus | `#gsbs-focus` | Coordination plus a target: the argument in six points, Crown Cork & Seal's policies mapped around one target (cans that are hard to make well; a list on phones), coordination and target as a two-by-two, and Crown set against its larger rivals. |
| Growth | `#gsbs-growth` | Growth as the outcome of an advantage: the argument in six points, a waterfall of what an acquisition has to beat (worth 100 on its own, gains of 10, a price of 130: value created −20), healthy and bought growth compared, and questions to ask before buying growth. |
| Using advantage | `#gsbs-using-advantage` | What an advantage is and why owning one earns only a normal return: the argument in six points, the four ways to raise an advantage's value, Rumelt's silver machine followed through, and the isolating mechanisms that stop rivals copying. |
| Using dynamics | `#gsbs-using-dynamics` | Reading waves of change: the argument in five points, the five guideposts (rising fixed costs, deregulation, predictable biases, incumbent response, attractor states) as a table in their highlighter colors, a highlighter exercise on two invented market briefings, and the first briefing read as a whole. |
| Inertia and entropy | `#gsbs-inertia-entropy` | The argument in six points, General Motors' brand ladder drawn before and after its ranges spread into each other (stacked on phones), and inertia of routine, cultural inertia, inertia by proxy and entropy: what each is, how it shows, what breaks it, and why it's an opening in a rival. |
| Strategy as hypothesis | `#gsbs-science-of-strategy` | Strategy as an educated, testable judgment: the argument in five points, hypotheses and articles of faith told apart, and three articles of faith rewritten as testable claims. |
| The kernel | `#gsbs-kernel` | The argument in six points, the interactive kernel figure (general form, Desert Storm, Apple 1997), the three parts at a glance, four ways a guiding policy creates advantage, and what the kernel leaves out. |
| Workbench | `#gsbs-builder` | Write a diagnosis, guiding policy and actions. Rule-based checks flag goals posing as strategy, buzzwords, unlinked actions and policies that rule nothing out. Drafts are saved for the reader. |
| Financial Intelligence home | `#fi` | Thesis, entry points and a map of all eight parts. |
| Profit is an estimate | `#fi-profit-estimate` | Five accounting judgment calls on the same month, as two income-statement waterfalls side by side: operating profit of $39,683 or a $3,000 loss from the same business. Where estimates hide, and the signs that they moved. |
| Revenue recognition | `#fi-revenue` | Revenue counts when it's earned, not when it's paid: a timeline of four deals, a table of eight September events (revenue $59,000, cash in $46,000), what each kind of deal leaves on the balance sheet, and the common ways revenue gets pulled forward. |
| The many forms of profit | `#fi-forms-of-profit` | An income-statement waterfall from revenue to net profit, what gross, operating and net margin each answer, and six moves tabled by which margins they reach. |
| Why the balance sheet balances | `#fi-balance-sheet` | The three parts of the equation, Northline's balance sheet as stacked columns before and after a month, and eight transactions with the two lines each one moves. |
| Profit isn't cash | `#fi-profit-cash` | A linked three-statement simulator: apply a month of events at an invented bike maker and watch the income statement, balance sheet and cash flow statement move together, with tables of the usual gaps between profit and cash and the numbers that tie the statements together. |
| The language of cash flow | `#fi-cash-flow-language` | Operating, investing and financing: what goes where, eight of Northline's cash flows sorted, and the sign patterns of a company's life stages. |
| How cash connects | `#fi-cash-connects` | A waterfall bridge from net profit to the change in cash, checked against both balance sheets, and the rule of thumb for which changes use or provide cash. |
| Reading the ratios | `#fi-ratios` | Thirteen ratios across two years of a growing company, each with its formula worked through with the real numbers, and the four families tabled. |
| The building blocks of ROI | `#fi-roi-basics` | Time value of money, cost of capital and the hurdle rate: present value of $10,000 at three rates, five later offers priced at four rates with their break-even rates, and the rates in an investment case. |
| Figuring ROI | `#fi-roi` | Payback, net present value and internal rate of return for a welding robot, with sliders, a discounted cash chart and sensitivity tables for savings, rate and working life. |
| Working capital levers | `#fi-working-capital` | Sliders for days sales outstanding, days in inventory and days payable, with the cash conversion cycle and the cash it ties up; the formulas and who controls each lever. |
| Play Bigger home | `#pb` | Thesis, entry points and a map of the book's ideas. |
| Category kings | `#pb-category-kings` | The argument in six points, the authors' estimate that a category king takes about 76% of its category's market value as a chart, four lines that play smaller rewritten to play bigger, and signs of who owns a category. |
| The magic triangle | `#pb-magic-triangle` | Company, product and category design developed together: the argument in five points, the triangle drawn with what passes along each side, the three designs and signs each is lagging, and the shapes an imbalance takes. |
| Naming the category | `#pb-naming` | The argument in five points, category names set against product names, and eight names, real and invented, judged as category names, with a better one for each that doesn't work. |
| Point of view | `#pb-point-of-view` | The argument in five points, the parts of a point of view (problem, from, to, why now, name) and what to watch for in each, a workbench that checks a draft as you type, and the workbench's two examples set side by side. |
| The lightning strike | `#pb-lightning-strike` | The argument in five points, three charts of a toy attention model (the same six launch moves as a drip, one strike, and a strike followed by hijacks: noticed in 0, 4 and 5 of 12 weeks), what a strike lines up, and drip against strike. |
| Thinking in Systems home | `#tis` | Thesis, a map of the book's three parts and seven chapters, and the small systems Meadows uses as examples. |
| Stocks and flows | `#tis-stocks-flows` | Elements, interconnections and purpose; stocks and flows in Meadows's notation (a diagram that turns vertical on phones); four behavior-over-time charts of the bathtub, including the tub that keeps filling while the faucet closes; stocks and flows in other systems; and the chapter's principles. |
| Feedback loops | `#tis-feedback` | Causal loop diagrams of the coffee cup, the bank account and the population; charts of goal-seeking, exponential growth, shifting dominance and a leaky thermostat that settles short of its setting; doubling times by the rule of 70 and exactly; balancing and reinforcing loops compared. |
| Delays and oscillation | `#tis-delays` | Meadows's car dealer as a stock-and-flow diagram with its three delays marked, re-run four ways (base case, react faster, react slower, notice sooner) to show reacting faster widens the swings; which delay to change; the same structure elsewhere. |
| Growth meets a limit | `#tis-limits` | The capital-and-resource structure behind Meadows's oil field and fishery, re-runs of both (a bigger field peaks later and higher, not longer; better gear turns equilibrium into boom and bust, then collapse), stock-limited against flow-limited resources, and limits that arrived late. |
| Why systems work so well | `#tis-resilience` | Resilience, self-organization and hierarchy: what makes each and what wears it away, a drawing of nested subsystems (with a phone layout), and Simon's watchmakers worked as arithmetic: the odds of finishing an assembly fall from 90% at ten parts to 0.004% at a thousand. |
| Why systems surprise us | `#tis-surprises` | The six sources of surprise with an example and a habit for each; events, behavior and structure as three levels of explanation; a chart of how waiting time explodes as a desk fills up; and Liebig's barrel for layers of limits. |
| System traps | `#tis-traps` | The eight traps as cards, each with a small causal loop diagram of its structure, an example and the way out; and a cross-reference to Senge's archetypes. |
| Leverage points | `#tis-leverage-points` | The twelve places to intervene drawn as a staircase from weakest to strongest (a list on phones), each with a definition and a business example, and two cases of information flows at work. |
| Living in a world of systems | `#tis-living` | Meadows's fifteen closing habits as a table with a way to try each, and a workbench for sketching the system behind a problem of your own: behavior, stock and flows, a loop, a delay and a leverage point, checked as you type. |
| Understanding Michael Porter home | `#ump` | Thesis, a map of the book's two parts and seven chapters, and the companies the book uses. |
| Competition: the right mindset | `#ump-mindset` | Compete to be unique, not the best: the argument in six points, the two mindsets side by side, Porter's productivity frontier drawn with numbered notes, and operational effectiveness set against strategy. |
| The five forces | `#ump-five-forces` | A dense reference page, the prototype for less simulation and more of the book: the argument in six points, a map of the five forces listing what makes each strong and where it hits the P&L, Porter's chart of average return on invested capital across 31 US industries (1992–2006), the airline industry force by force, factors that aren't forces, and the common mistakes. |
| Competitive advantage | `#ump-advantage` | Advantage as relative price and relative cost: a P&L schematic, Porter's generic value chain and the value system, his ten drivers of cost and uniqueness, and a table that tests common claims of advantage. |
| Creating value | `#ump-value` | The three questions of a value proposition and the tailored value chain: Enterprise, IKEA, Southwest and Aravind answered question by question, IKEA's chain set against a typical furniture retailer's activity by activity, and Porter's three bases for a position (variety, needs, access). |
| Trade-offs | `#ump-trade-offs` | Why choosing what not to do protects a position: a full-service airline, Continental Lite and Southwest compared across seven activities, with what Continental Lite copied and kept marked; Porter's three sources of trade-offs; and the usual objections, answered. |
| Fit | `#ump-fit` | Southwest's activity-system map (six themes, eleven activities; a list on phones), Porter's three orders of fit with his examples, a chart of the odds of copying a whole system (90% per activity gives 66% for four, under half from seven), and how fit gets lost. |
| Continuity | `#ump-continuity` | Why strategy needs years: what continuity builds and what a change does to it, when to change a strategy and when not to, Southwest's changes within an unchanged core, and Porter's five tests in one table. |
| Test your strategy | `#ump-five-tests` | Workbench: write down a strategy (customers, needs, relative price, tailored activities, trade-offs, fit, continuity) and check it against Porter's five tests as you type. Drafts go to the notebook, with the optional Claude critique. |
| Northline | `#northline` | A year running an invented bike maker: four quarterly decisions, each read through a different book, flowing through one quarterly model of profit, cash and borrowing. |
| Notebook | `#notebook` | The reader's commonplace book: highlights and margin notes, workbench drafts, exercise scores, pages explored and their Northline result. |

## Reader features

- **Margin notes.** Select text in any chapter's prose to highlight it or add a note. Highlights come back on every visit and collect in the notebook.
- **Memory.** `assets/js/memory.js` keeps notes, drafts, scores and visits. Inside a Claude viewer with the `db` and `user` capabilities, they live in the reader's private store (`data/users/<id>/library`) and follow them across devices; anywhere else they stay in the browser.
- **Ask Claude.** Inside a Claude viewer, an "Ask Claude" button opens a side panel on every page. Each question carries the page's text, the state of its interactives and any passage the reader selected (select text, then "Ask Claude" in the toolbar). Where the viewer allows page tools, Claude can move the page's own controls to show something (`get_page_state`, `set_control`). Answers can be saved as margin notes. It uses the `sample` capability and the reader's own Claude account; elsewhere it doesn't appear. Code: `assets/js/assistant.js`.
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
assets/js/assistant.js        Ask Claude: the reading companion panel
assets/js/northline-model.js  the Northline quarterly model (pure; testable in Node)
assets/js/views/*.js          site-wide pages: notebook, northline
assets/js/blocks/*.js         reusable page blocks: the reference blocks brief,
                              table, figure, diagram, behavior, bar-chart,
                              waterfall, force-map, value-chain, chain-compare,
                              loop-cards, prose and kernel-figure; the calculators
                              three-statements, ratios, roi-calculator and
                              wc-levers; and the exercises and workbenches
                              spot-exercise, phase-map, kernel-builder,
                              pov-builder, system-sketch and strategy-tests
assets/js/art/*.js            book-home hero art (contours, ledger, categories, behavior, forces)
assets/js/app.js              router, shelf, book home and page shell (loads last)
tools/bundle.py               builds a single self-contained HTML file in dist/
tests/                        Node test runner + Playwright: routes, exercises, reader features
.github/workflows/test.yml    runs the tests on every pull request and push to main
.github/workflows/pages.yml   publishes the site to GitHub Pages on pushes to main
```

A page is a header plus a list of blocks, each `{ type: "...", ...settings }`, and an optional end section with related ideas and a call to action. To add a page, add an entry to the book's `pages` and point a chapter at it with `page: "<slug>"`. To add a book, create `assets/books/<id>.js`, call `Marginalia.addBook({...})`, and add a script tag to `index.html`. A new kind of interactive means a new file in `assets/js/blocks/`. A page with `layout: "dense"` gets a compact head and suits the reference blocks (brief, force-map, bar-chart, table), which carry the book's own frameworks and figures rather than a simulation.

Summaries are written in our own words. Keep quotations short and attributed.

## Publishing

- **GitHub Pages:** in the repo, go to Settings → Pages → Build and deployment and set Source to **GitHub Actions**. After that, every push to `main` publishes the site.
- **Single file:** `python3 tools/bundle.py` writes `dist/marginalia.html` with all styles and scripts inlined.
