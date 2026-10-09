// Financial Intelligence, Revised Edition (Karen Berman & Joe Knight with John Case, 2013).
// Summaries are paraphrased; keep quotations short and attributed.
// Parts I–V are checked against published tables of contents. Chapter numbers in
// Parts VI–VIII are not yet checked, so those chapters are listed without numbers.
(function () {
  "use strict";

  // Points for behavior charts: f sampled at n + 1 evenly spaced times from x0 to x1.
  const curve = (f, x0, x1, n = 60) =>
    Array.from({ length: n + 1 }, (_, i) => {
      const x = x0 + ((x1 - x0) * i) / n;
      return [x, f(x)];
    });

  // Northline's balance sheet at the start and end of an invented month, as stacked
  // columns: what it owns beside who has a claim on it. Side by side on wide screens; on
  // phones each month gets a row of its own. Figures in thousands of dollars.
  const balanceStacks = (narrow) => {
    const sides = (d) => [
      [["Equipment", d[0], 0.2], ["Inventory", d[1], 0.32], ["Receivables", d[2], 0.44], ["Cash", d[3], 0.6]],
      [["Owners' equity", d[4], 0.14], ["Bank loan", d[5], 0.28], ["Wages owed", d[6], 0.4], ["Payables", d[7], 0.52]]
    ];
    const snaps = [
      ["START OF MONTH", sides([600, 340, 300, 120, 720, 400, 60, 180])],
      ["END OF MONTH", sides([615, 334, 360, 125, 722, 450, 72, 190])]
    ];
    const W = narrow ? 150 : 130;
    const k = 230 / 1434;
    const stack = (segs, x, base, tone) => {
      let y = base;
      const total = segs.reduce((t, s) => t + s[1], 0);
      return (
        segs
          .map(([name, v, op]) => {
            const h = v * k;
            y -= h;
            const label =
              h >= 36
                ? `<text class="sv-t" x="${x + 8}" y="${(y + h / 2 - 2).toFixed(1)}">${name}</text><text class="sv-t2" x="${x + 8}" y="${(y + h / 2 + 13).toFixed(1)}">$${v}k</text>`
                : `<text class="sv-t2" x="${x + 8}" y="${(y + h / 2 + 4).toFixed(1)}" style="font-size: 10.5px">${name} $${v}k</text>`;
            return `<rect x="${x}" y="${y.toFixed(1)}" width="${W}" height="${(h - 1.5).toFixed(1)}" style="fill: var(--${tone}); fill-opacity: ${op}"/>${label}`;
          })
          .join("") + `<text class="sv-k" x="${x + W / 2}" y="${(y - 8).toFixed(1)}" text-anchor="middle">$${total.toLocaleString("en-US")}k</text>`
      );
    };
    const pair = ([t, [own, claim]], x, top) => `<text class="sv-k" x="${x + W + 5}" y="${top + 12}" text-anchor="middle">${t}</text>
      ${stack(own, x, top + 280, "series-profit")}${stack(claim, x + W + 10, top + 280, "series-cash")}
      <path class="sv-axis" d="M${x - 6} ${top + 280} H${x + 2 * W + 16}"/>
      <text class="sv-t2" x="${x + W / 2}" y="${top + 300}" text-anchor="middle">Owns</text>
      <text class="sv-t2" x="${x + 1.5 * W + 10}" y="${top + 300}" text-anchor="middle">Owes, and owners</text>`;
    return narrow
      ? `<svg viewBox="0 0 330 640" xmlns="http://www.w3.org/2000/svg">${pair(snaps[0], 10, 0)}${pair(snaps[1], 10, 320)}</svg>`
      : `<svg viewBox="0 0 660 320" xmlns="http://www.w3.org/2000/svg">${pair(snaps[0], 40, 0)}${pair(snaps[1], 360, 0)}</svg>`;
  };

  window.Marginalia.addBook({
    id: "fi",
    title: "Financial Intelligence",
    author: "Karen Berman & Joe Knight",
    year: 2013,
    status: "open",
    cover: "fi",
    subtitle: "A manager's guide to knowing what the numbers really mean",
    thesis:
      "Financial statements look like hard facts, but they rest on estimates, assumptions and judgment calls. " +
      "Berman and Knight argue that any manager can learn to read them: what each statement shows, " +
      "how the three connect, and why a profitable company can still run out of cash.",
    citation:
      "Summaries on this page are written in our own words from Karen Berman and Joe Knight with John Case, <cite>Financial Intelligence, Revised Edition</cite> (Harvard Business Review Press, 2013). The example company is invented. Read the book for the full argument.",
    hero: { lines: ["Financial", "Intelligence"], art: "ledger" },
    entries: [
      { kicker: "Start here", title: "Profit isn't cash", desc: "Run a month of business through all three statements.", page: "profit-cash" },
      { kicker: "Judgment calls", title: "Profit is an estimate", desc: "Five accounting choices that move one month's profit from $39,683 to a loss, with no change in cash.", page: "profit-estimate" },
      { kicker: "Levers", title: "Working capital", desc: "Free up cash by changing how many days it's tied up.", page: "working-capital" }
    ],
    mapTitle: "Eight parts, from profit to cash to return on investment",
    contentsDesc: "Eight parts, from the income statement to ratios and working capital.",
    mapNote: "Pages open as they're written. Chapter numbers in Parts VI to VIII are still being checked against the book.",
    nav: ["profit-estimate", "profit-cash", "ratios", "roi"],

    parts: [
      {
        n: "I",
        title: "The art of finance (and why it matters)",
        chapters: [
          { n: 1, title: "You can't always trust the numbers", blurb: "Financial reports mix data with estimates and judgment." },
          { n: 2, title: "Spotting assumptions, estimates and biases", blurb: "Where the judgment calls hide, and how they shape results." },
          { n: 3, title: "Why increase your financial intelligence?", blurb: "Managers who read the numbers make better decisions and ask better questions." },
          { n: 4, title: "The rules accountants follow", blurb: "Accounting principles, and why managers don't always have to think the same way." }
        ]
      },
      {
        n: "II",
        title: "The (many) peculiarities of the income statement",
        chapters: [
          { n: 5, title: "Profit is an estimate", blurb: "Profit depends on when revenue and costs are counted, not just on what happened.", page: "profit-estimate" },
          { n: 6, title: "Cracking the code of the income statement", blurb: "How to read one, line by line." },
          { n: 7, title: "Revenue: the issue is recognition", blurb: "A sale counts when it's earned, which may be long before it's paid.", page: "revenue" },
          { n: 8, title: "Costs and expenses", blurb: "Few hard-and-fast rules, and plenty of room for judgment." },
          { n: 9, title: "The many forms of profit", blurb: "Gross, operating and net profit, and what each tells you.", page: "forms-of-profit" }
        ]
      },
      {
        n: "III",
        title: "The balance sheet reveals the most",
        chapters: [
          { n: 10, title: "Understanding balance sheet basics", blurb: "What a company owns, what it owes, and what's left for the owners." },
          { n: 11, title: "Assets: more estimates and assumptions", blurb: "Every asset but cash involves a judgment about value." },
          { n: 12, title: "On the other side: liabilities and equity", blurb: "Who has a claim on the assets, and in what order." },
          { n: 13, title: "Why the balance sheet balances", blurb: "Assets always equal liabilities plus equity, by construction.", page: "balance-sheet" },
          { n: 14, title: "The income statement affects the balance sheet", blurb: "Profit flows into equity; sales and costs move assets and liabilities." }
        ]
      },
      {
        n: "IV",
        title: "Cash is king",
        chapters: [
          { n: 15, title: "Cash is a reality check", blurb: "Cash involves fewer estimates than profit, so it's harder to fudge." },
          { n: 16, title: "Profit ≠ cash (and you need both)", blurb: "Why a profitable company can run short of cash.", page: "profit-cash" },
          { n: 17, title: "The language of cash flow", blurb: "Operating, investing and financing: the three sources and uses of cash.", page: "cash-flow-language" },
          { n: 18, title: "How cash connects with everything else", blurb: "Tying the cash flow statement back to the other two.", page: "cash-connects" }
        ]
      },
      {
        n: "V",
        title: "Ratios: what the numbers are really telling you",
        chapters: [
          { n: 19, title: "The power of ratios", blurb: "Comparing numbers to each other shows what totals hide.", page: "ratios" },
          { n: 20, title: "Profitability ratios", blurb: "How much of each sales dollar the company keeps." },
          { n: 21, title: "Leverage ratios", blurb: "How much the company relies on borrowed money." },
          { n: 22, title: "Liquidity ratios", blurb: "Whether the company can pay its bills as they come due." },
          { n: 23, title: "Efficiency ratios", blurb: "How well the company uses its assets, from inventory to receivables." },
          { n: 24, title: "The investor's perspective", blurb: "The ratios outside investors and analysts watch." }
        ]
      },
      {
        n: "VI",
        title: "Return on investment",
        chapters: [
          { title: "The building blocks of ROI", blurb: "Time value of money, cost of capital and the hurdle rate.", page: "roi-basics" },
          { title: "Figuring ROI", blurb: "Payback, net present value and internal rate of return, worked through.", page: "roi" }
        ]
      },
      {
        n: "VII",
        title: "Applied financial intelligence: working capital",
        chapters: [
          { title: "The magic of managing the balance sheet", blurb: "Small changes in receivables and inventory free up a lot of cash." },
          { title: "Your balance sheet levers", blurb: "Days sales outstanding, days in inventory and days payable.", page: "working-capital" },
          { title: "Homing in on cash conversion", blurb: "How long cash is tied up between paying suppliers and getting paid." }
        ]
      },
      {
        n: "VIII",
        title: "Creating a financially intelligent company",
        chapters: [
          { title: "Financial literacy and corporate performance", blurb: "Why companies do better when employees understand the numbers." },
          { title: "Financial literacy strategies", blurb: "Practical ways to teach the numbers inside a company." },
          { title: "Financial transparency", blurb: "Opening the books as a goal, and what it takes." }
        ]
      }
    ],

    pages: {
      // A reference page. Profit as an estimate, the "art of finance" and cash as a reality
      // check follow the book's Parts I and II as I remember them, unchecked against its
      // wording. Northline's September and the five choices are invented; the arithmetic is
      // exact (operating profit $39,683 with every choice that raises it, −$3,000 with every
      // choice that lowers it, cash up $3,100 either way). The tables of estimates and warning
      // signs are ours.
      "profit-estimate": {
        navLabel: "Estimates",
        title: "Profit is an estimate",
        eyebrow: "Part II · Chapter 05",
        layout: "dense",
        dek:
          "Revenue, costs and profit all depend on judgment calls about timing and value. Two careful accountants can report different profits for the same month, while the cash in the bank doesn't change at all.",
        blocks: [
          {
            type: "brief",
            eyebrow: "In brief",
            title: "The argument in six points",
            points: [
              { t: "Profit rests on judgment.", d: "The income statement looks precise to the dollar, but many lines are estimates: when a sale counts, how long equipment lasts, how many customers won't pay, what old stock is worth." },
              { t: "The rules allow a range.", d: "Accounting standards permit a range of reasonable answers to each of those questions. Choosing within the range isn't cooking the books." },
              { t: "That's the art of finance.", d: "Berman and Knight's name for the parts of accounting that rest on judgment rather than rules. Knowing where it sits lets a manager ask better questions." },
              { t: "Small choices add up.", d: "In the example below, five defensible choices move one month's operating profit from $39,683 to a loss of $3,000." },
              { t: "Cash is the reality check.", d: "None of the choices changes what happened: the same bikes shipped and the same bills were paid. The change in cash is identical under every combination." },
              { t: "Ask whether the business changed or the estimates did.", d: "A longer equipment life, a smaller bad-debt reserve or earlier revenue can each lift profit without a single extra sale." }
            ]
          },
          {
            type: "waterfall",
            eyebrow: "Figure",
            title: "One month, two defensible profits",
            intro: "Northline's September, an invented bike maker's month. Left, every judgment call made the way that raises profit; right, every one made the other way. Same bikes, same bills, same cash.",
            charts: [
              {
                t: "Choices that raise profit",
                steps: [
                  { label: "Revenue", v: 250000 },
                  { label: "Cost of goods sold", v: -150000 },
                  { label: "Gross profit", total: true },
                  { label: "Operating expenses", v: -58000 },
                  { label: "Paint line depreciation", v: -1000 },
                  { label: "Software", v: -417 },
                  { label: "Bad-debt reserve", v: -900 },
                  { label: "Inventory write-down", v: 0 },
                  { label: "Operating profit", total: true }
                ]
              },
              {
                t: "Choices that lower profit",
                steps: [
                  { label: "Revenue", v: 210000 },
                  { label: "Cost of goods sold", v: -126000 },
                  { label: "Gross profit", total: true },
                  { label: "Operating expenses", v: -58000 },
                  { label: "Paint line depreciation", v: -2000 },
                  { label: "Software", v: -15000 },
                  { label: "Bad-debt reserve", v: -4500 },
                  { label: "Inventory write-down", v: -7500 },
                  { label: "Operating profit", total: true }
                ]
              }
            ],
            caption: "Invented figures. The change in cash is +$3,100 in both versions."
          },
          {
            type: "table",
            eyebrow: "The five calls",
            title: "Each judgment, and what it's worth to the month's profit",
            columns: ["The call", "Raises profit", "Lowers profit", "Gap"],
            widths: [null, null, null, "6rem"],
            rows: [
              ["A $40,000 custom order shipped on September 29; the fitting it includes happens in October. When does the revenue count?", "In September, with its $24,000 cost, if the fitting is a minor part of the deal", "In October, if the fitting is essential to what was sold", "<span class=\"tnum\">$16,000</span>"],
              ["$120,000 of new painting equipment. How long will it last?", "Ten years: $1,000 of depreciation a month", "Five years: $2,000 a month", "<span class=\"tnum\">$1,000</span>"],
              ["Shops owe $90,000. How much won't be collected?", "About 1%: a $900 reserve", "About 5%: $4,500, if two shops already pay late", "<span class=\"tnum\">$3,600</span>"],
              ["$15,000 spent setting up ordering software. Asset or expense?", "An asset amortized over three years: $417 a month", "An expense, all of it this month", "<span class=\"tnum\">$14,583</span>"],
              ["$30,000 of frames in last year's colors. Worth what they cost?", "Yes: no write-down", "No: write them down by a quarter, $7,500", "<span class=\"tnum\">$7,500</span>"],
              ["<strong>All five</strong>", "Operating profit $39,683", "Operating profit −$3,000", "<strong class=\"tnum\">$42,683</strong>"]
            ]
          },
          {
            type: "table",
            eyebrow: "On any income statement",
            title: "Where the estimates hide",
            intro: "Our summary of the lines the book singles out as resting on judgment.",
            columns: ["Line", "The estimate behind it", "What to ask"],
            widths: ["10rem", null, null],
            rows: [
              ["Revenue", "When a sale is complete enough to count, and how much will come back as returns or discounts", "What is the recognition policy, and has it changed?"],
              ["Cost of goods sold", "What inventory is worth, and how overhead is spread across the products made", "Any write-downs, or changes in how costs are allocated?"],
              ["Depreciation and amortization", "How long equipment and other long-term assets will last, and what they'll be worth at the end", "Have useful lives been lengthened?"],
              ["Bad-debt expense", "How much of what customers owe will never be paid", "Is the reserve shrinking while receivables grow?"],
              ["Capitalized costs", "Whether spending, such as software or development work, creates an asset or is an expense now", "What was capitalized this year that used to be expensed?"],
              ["Accruals and reserves", "Bonuses, warranties, legal claims and other costs not yet billed", "Were reserves released into profit?"]
            ]
          },
          {
            type: "table",
            eyebrow: "Reading someone else's numbers",
            title: "Signs that the estimates, not the business, moved profit",
            intro: "Our list of checks, in the spirit of the book's advice to treat cash as the reality check.",
            columns: ["Sign", "Why it matters"],
            widths: ["19rem", null],
            rows: [
              ["Profit rises for several periods while cash from operations doesn't", "Profit is being recognized faster than cash is being collected, or costs are being deferred"],
              ["Receivables grow faster than sales", "Sales may be booked early, or to customers who won't pay"],
              ["Inventory grows faster than sales", "Stock that isn't selling may be carried at more than it's worth"],
              ["A change in estimates in the notes", "Longer asset lives or smaller reserves lift profit with no change in the business"],
              ["“One-time” charges that recur", "Ordinary costs may be dressed as unusual to flatter the underlying result"]
            ]
          }
        ],
        end: {
          related: [
            { title: "The rules accountants follow", where: "Chapter 4" },
            { title: "Revenue: the issue is recognition", where: "Chapter 7", page: "revenue" },
            { title: "Assets: more estimates and assumptions", where: "Chapter 11" },
            { title: "Profit ≠ cash", where: "Chapter 16", page: "profit-cash" }
          ],
          cta: { page: "profit-cash", kicker: "Next", text: "Watch profit and cash part ways" }
        }
      },

      // A reference page. Gross, operating and net profit, margins and reading down the
      // statement follow the book's chapter 9 as I remember it, unchecked against its wording.
      // Northline's year is invented (tax a flat 25%); the margins after each move are exact.
      "forms-of-profit": {
        navLabel: "Profit",
        title: "The many forms of profit",
        eyebrow: "Part II · Chapter 09",
        layout: "dense",
        dek:
          "“Profit” on its own is ambiguous. An income statement shows several kinds, each a step further down the page, and each answers a different question about the business.",
        blocks: [
          {
            type: "brief",
            eyebrow: "In brief",
            title: "The argument in five points",
            points: [
              { t: "Gross profit asks whether the product makes money.", d: "Revenue minus the cost of goods sold: what's left from sales after paying to make or buy what was sold." },
              { t: "Operating profit asks whether the company is run well.", d: "Gross profit minus selling, administration, research and depreciation. Often called EBIT, earnings before interest and taxes." },
              { t: "Net profit asks what's left for the owners.", d: "Operating profit minus interest, taxes and one-time items: the bottom line." },
              { t: "Margins make them comparable.", d: "Each profit divided by revenue. At Northline's $2.4 million of sales, one point of gross margin is $24,000, nearly a tenth of the year's operating profit." },
              { t: "First ask which profit.", d: "Net profit can rise in a year when operations got worse, if a one-time gain or a cheaper loan covers the gap. Managers mostly move the top half of the statement." }
            ]
          },
          {
            type: "waterfall",
            eyebrow: "Figure",
            title: "Down the income statement",
            intro: "A year at Northline, the invented bike maker, from revenue to net profit. Each subtotal is one of the profits.",
            k: 1,
            charts: [
              {
                steps: [
                  { label: "Revenue", v: 2400000 },
                  { label: "Cost of goods sold", v: -1440000 },
                  { label: "Gross profit", total: true },
                  { label: "Sales and marketing", v: -300000 },
                  { label: "General and administrative", v: -260000 },
                  { label: "Research and development", v: -80000 },
                  { label: "Depreciation", v: -70000 },
                  { label: "Operating profit", total: true },
                  { label: "Interest", v: -60000 },
                  { label: "Tax at 25%", v: -47500 },
                  { label: "Net profit", total: true }
                ]
              }
            ],
            caption: "Invented figures."
          },
          {
            type: "table",
            eyebrow: "Three profits",
            title: "What each answers",
            columns: ["Profit", "Northline", "Margin", "The question", "If it falls, look at"],
            widths: ["9rem", "7rem", "6rem", null, null],
            rows: [
              ["Gross profit", "<span class=\"tnum\">$960,000</span>", "<span class=\"tnum\">40.0%</span>", "Does the product itself make money?", "Prices, discounts, materials, production costs"],
              ["Operating profit", "<span class=\"tnum\">$250,000</span>", "<span class=\"tnum\">10.4%</span>", "Is the business as a whole run well?", "Overheads, if gross margin held steady"],
              ["Net profit", "<span class=\"tnum\">$142,500</span>", "<span class=\"tnum\">5.9%</span>", "What's left for the owners?", "Financing, taxes and one-off items, if operating margin held steady"]
            ]
          },
          {
            type: "table",
            eyebrow: "Worked example",
            title: "Six moves, and which profits they reach",
            intro: "Each move applied alone to Northline's year. A move reaches the profit where it enters the statement and every profit below it.",
            columns: ["Move", "Gross margin", "Operating margin", "Net margin", "Why"],
            widths: [null, "6.5rem", "7.5rem", "6rem", null],
            rows: [
              ["<em>As reported</em>", "<span class=\"tnum\">40.0%</span>", "<span class=\"tnum\">10.4%</span>", "<span class=\"tnum\">5.9%</span>", "—"],
              ["Raise prices 5% (+$120,000 revenue)", "<strong class=\"tnum\">42.9%</strong>", "<strong class=\"tnum\">14.7%</strong>", "<strong class=\"tnum\">9.2%</strong>", "The bikes cost the same, so all of it reaches every profit, assuming no customers walk away."],
              ["Frame suppliers raise prices (+$72,000 cost of goods)", "<strong class=\"tnum\">37.0%</strong>", "<strong class=\"tnum\">7.4%</strong>", "<strong class=\"tnum\">3.7%</strong>", "Every bike costs more to make; it starts at the top."],
              ["Cut marketing by a third (−$100,000)", "<span class=\"tnum\">40.0%</span>", "<strong class=\"tnum\">14.6%</strong>", "<strong class=\"tnum\">9.1%</strong>", "Each bike earns the same; overheads fall, until next year's sales feel it."],
              ["Move to a cheaper office (−$40,000 admin)", "<span class=\"tnum\">40.0%</span>", "<strong class=\"tnum\">12.1%</strong>", "<strong class=\"tnum\">7.2%</strong>", "An overhead cut, below gross profit."],
              ["Pay off half the loan (−$30,000 interest)", "<span class=\"tnum\">40.0%</span>", "<span class=\"tnum\">10.4%</span>", "<strong class=\"tnum\">6.9%</strong>", "A financing decision; the business runs exactly as before."],
              ["Sell the old warehouse at a gain (+$80,000)", "<span class=\"tnum\">40.0%</span>", "<span class=\"tnum\">10.4%</span>", "<strong class=\"tnum\">8.4%</strong>", "Net profit up 42%; nothing about making or selling bikes got better."]
            ],
            foot: "Changed margins in bold. Tax is a flat 25% of profit before tax."
          }
        ],
        end: {
          related: [
            { title: "Profit is an estimate", where: "Chapter 5", page: "profit-estimate" },
            { title: "Costs and expenses", where: "Chapter 8" },
            { title: "Profitability ratios", where: "Chapter 20", page: "ratios" },
            { title: "Profit ≠ cash", where: "Chapter 16", page: "profit-cash" }
          ],
          cta: { page: "ratios", kicker: "Next", text: "Compare the margins across two years" }
        }
      },

      // A reference page. Building the cash flow statement from net profit and balance sheet
      // changes (the indirect method) and the rule of thumb follow the book's chapter 18 as I
      // remember it, unchecked against its wording. Northline's year is invented and continues
      // the income statement on "The many forms of profit"; the bridge is exact.
      "cash-connects": {
        navLabel: "Cash bridge",
        title: "How cash connects with everything else",
        eyebrow: "Part IV · Chapter 18",
        layout: "dense",
        dek:
          "The cash flow statement isn't a separate story. Start from profit, adjust for every change on the balance sheet, and you arrive at the change in cash, to the dollar.",
        blocks: [
          {
            type: "brief",
            eyebrow: "In brief",
            title: "The argument in four points",
            cols: 2,
            points: [
              { t: "Three statements, one set of books.", d: "Take net profit, add back expenses that used no cash such as depreciation, and adjust for every change between two balance sheets. That's cash from operations; add investing and financing for the change in cash. It's called the indirect method." },
              { t: "Assets up, cash down.", d: "When an asset other than cash rises, it has used cash: money is tied up in what customers owe, in stock or in machines. Decreases work the other way." },
              { t: "Liabilities up, cash up.", d: "When a liability rises, it has provided cash: someone else is waiting to be paid, or has lent you money." },
              { t: "In a growing company, working capital eats the profit.", d: "Northline made $142,500 but its cash rose only $17,500. Receivables and inventory absorbed $150,000, more than the year's profit." }
            ]
          },
          {
            type: "waterfall",
            eyebrow: "Figure",
            title: "From profit to cash",
            intro: "Northline's year, from net profit to the change in the cash account, built from the two balance sheets below.",
            k: 1,
            keys: ["Adds cash", "Uses cash", "Total"],
            charts: [
              {
                steps: [
                  { label: "Net profit", v: 142500 },
                  { label: "Depreciation added back", v: 70000 },
                  { label: "Receivables up", v: -90000 },
                  { label: "Inventory up", v: -60000 },
                  { label: "Payables up", v: 25000 },
                  { label: "Accrued expenses up", v: 10000 },
                  { label: "Cash from operations", total: true },
                  { label: "New equipment", v: -120000 },
                  { label: "New borrowing", v: 40000 },
                  { label: "Change in cash", total: true }
                ]
              }
            ],
            caption: "Invented figures. The cash account went from $120,000 to $137,500."
          },
          {
            type: "table",
            eyebrow: "The two balance sheets",
            title: "Every change, and what it did to cash",
            columns: ["Line", "Start", "End", "Change", "Cash"],
            widths: [null, "7rem", "7rem", "7rem", null],
            rows: [
              ["Cash", "<span class=\"tnum\">$120,000</span>", "<span class=\"tnum\">$137,500</span>", "<span class=\"tnum\">+$17,500</span>", "The result the bridge has to reach"],
              ["Receivables", "<span class=\"tnum\">$300,000</span>", "<span class=\"tnum\">$390,000</span>", "<span class=\"tnum\">+$90,000</span>", "Used: sales counted in profit, cash not yet in"],
              ["Inventory", "<span class=\"tnum\">$340,000</span>", "<span class=\"tnum\">$400,000</span>", "<span class=\"tnum\">+$60,000</span>", "Used: stock paid for, not yet sold"],
              ["Equipment, net", "<span class=\"tnum\">$600,000</span>", "<span class=\"tnum\">$650,000</span>", "<span class=\"tnum\">+$50,000</span>", "$120,000 of new machines (used) less $70,000 of depreciation (no cash)"],
              ["Payables", "<span class=\"tnum\">$180,000</span>", "<span class=\"tnum\">$205,000</span>", "<span class=\"tnum\">+$25,000</span>", "Provided: costs in profit, not yet paid"],
              ["Accrued expenses", "<span class=\"tnum\">$60,000</span>", "<span class=\"tnum\">$70,000</span>", "<span class=\"tnum\">+$10,000</span>", "Provided: wages and bills recorded, not yet paid"],
              ["Loan", "<span class=\"tnum\">$400,000</span>", "<span class=\"tnum\">$440,000</span>", "<span class=\"tnum\">+$40,000</span>", "Provided: financing"],
              ["Owners' equity", "<span class=\"tnum\">$720,000</span>", "<span class=\"tnum\">$862,500</span>", "<span class=\"tnum\">+$142,500</span>", "The year's net profit, the bridge's starting point; no dividends"]
            ]
          },
          {
            type: "table",
            eyebrow: "The rule of thumb",
            title: "Which way each change moves cash",
            columns: ["Change on the balance sheet", "Cash", "Example"],
            widths: [null, "7rem", null],
            rows: [
              ["An asset other than cash goes up", "Uses", "Customers owe more; more stock; new equipment"],
              ["An asset other than cash goes down", "Provides", "Customers pay down what they owe; stock sold off; equipment sold"],
              ["A liability goes up", "Provides", "Suppliers wait longer; new borrowing"],
              ["A liability goes down", "Uses", "Paying suppliers faster; repaying a loan"],
              ["Equity rises with profit", "Provides", "Net profit is the starting point"],
              ["Equity falls with dividends or buybacks", "Uses", "Cash returned to owners"]
            ]
          }
        ],
        end: {
          related: [
            { title: "Profit ≠ cash", where: "Chapter 16", page: "profit-cash" },
            { title: "The language of cash flow", where: "Chapter 17", page: "cash-flow-language" },
            { title: "Why the balance sheet balances", where: "Chapter 13", page: "balance-sheet" },
            { title: "Your balance sheet levers", where: "Part VII", page: "working-capital" }
          ],
          cta: { page: "working-capital", kicker: "Next", text: "Pull the working capital levers" }
        }
      },

      // A reference page. The accounting equation, double entry and profit landing in equity
      // follow the book's chapter 13 as I remember it, unchecked against its wording. The
      // month at Northline is invented; the balances are exact.
      "balance-sheet": {
        navLabel: "Balance sheet",
        title: "Why the balance sheet balances",
        eyebrow: "Part III · Chapter 13",
        layout: "dense",
        dek:
          "Assets always equal liabilities plus equity. That isn't luck or a rule someone enforces: every transaction is recorded in at least two places, so the two sides can't drift apart.",
        blocks: [
          {
            type: "brief",
            eyebrow: "In brief",
            title: "The argument in five points",
            points: [
              { t: "Two sides of the same money.", d: "One side lists what the company owns. The other lists who has a claim on it: lenders and suppliers (liabilities), and the owners (equity)." },
              { t: "Assets = liabilities + equity.", d: "Rearranged, equity is simply what the company owns minus what it owes." },
              { t: "Every transaction changes at least two lines.", d: "Borrow and cash rises, but so does the loan. Buy a machine for cash and one asset turns into another. That is double-entry bookkeeping, and it's why the totals always match." },
              { t: "Profit lands in equity.", d: "Revenue raises equity; expenses lower it. A sale on credit raises receivables and equity, and depreciation lowers equipment and equity, with no cash moving." },
              { t: "Read it alongside the income statement.", d: "Profit says whether the month made money. The balance sheet says what that money turned into." }
            ]
          },
          {
            type: "table",
            eyebrow: "Reference",
            title: "The three parts of the equation",
            columns: ["", "Assets", "Liabilities", "Equity"],
            widths: ["8rem", null, null, null],
            rows: [
              ["What it is", "What the company owns", "What it owes to others", "What's left for the owners"],
              ["Examples", "Cash, receivables, inventory, equipment", "Payables, wages owed, loans, deferred revenue", "Money the owners put in, plus profits kept"],
              ["Rises when", "The company buys, makes or is owed something", "It borrows, or takes goods or work it hasn't paid for", "It earns a profit, or owners put in more"],
              ["Falls when", "It spends, sells or uses something up", "It pays what it owes", "It makes a loss, or pays owners a dividend"]
            ]
          },
          {
            type: "figure",
            eyebrow: "Figure",
            title: "One month, both sides",
            intro: "Northline's balance sheet at the start and end of an invented month. The two sides of each stay equal through all eight transactions below.",
            alt: "Four stacked columns. At the start of the month, what Northline owns (equipment $600k, inventory $340k, receivables $300k, cash $120k) totals $1,360k, matching who has a claim on it (owners' equity $720k, bank loan $400k, wages owed $60k, payables $180k). At the end, assets of $1,434k (equipment $615k, inventory $334k, receivables $360k, cash $125k) match claims of $1,434k (equity $722k, loan $450k, wages owed $72k, payables $190k).",
            svg: balanceStacks(false),
            svgNarrow: balanceStacks(true),
            notes: [
              { t: "Assets grew $74,000;", d: "so did liabilities plus equity. They can't do anything else." },
              { t: "Equity rose only $2,000:", d: "the month's profit, $24,000 of gross profit less $10,000 of depreciation and $12,000 of wages." },
              { t: "The rest is where the money sits:", d: "$60,000 more owed by a customer, a new machine, and $50,000 more owed to the bank." }
            ],
            caption: "Invented figures, in thousands of dollars."
          },
          {
            type: "table",
            eyebrow: "Double entry",
            title: "Eight transactions, two lines each",
            columns: ["What happens", "Goes up", "Goes down", "Totals"],
            widths: [null, null, null, "10.5rem"],
            rows: [
              ["Northline borrows $50,000", "Cash; Bank loan", "—", "Both sides +$50,000"],
              ["It buys $30,000 of frames, to pay next month", "Inventory; Payables", "—", "Both sides +$30,000"],
              ["It pays a supplier $20,000 it already owed", "—", "Cash; Payables", "Both sides −$20,000"],
              ["It buys a $25,000 welding machine for cash", "Equipment", "Cash", "Unchanged"],
              ["It ships $60,000 of bikes on 30-day terms", "Receivables; Equity (revenue)", "—", "Both sides +$60,000"],
              ["Those bikes cost $36,000 to build", "—", "Inventory; Equity (cost of goods sold)", "Both sides −$36,000"],
              ["It records $10,000 of depreciation", "—", "Equipment; Equity (an expense)", "Both sides −$10,000"],
              ["Staff earn $12,000 of wages, paid next week", "Wages owed", "Equity (an expense)", "Unchanged"]
            ],
            foot: "Paying a bill already recorded, or buying equipment, isn't an expense: neither touches equity."
          }
        ],
        end: {
          related: [
            { title: "Understanding balance sheet basics", where: "Chapter 10" },
            { title: "The income statement affects the balance sheet", where: "Chapter 14" },
            { title: "Profit ≠ cash", where: "Chapter 16", page: "profit-cash" },
            { title: "How cash connects with everything else", where: "Chapter 18", page: "cash-connects" }
          ],
          cta: { page: "cash-connects", kicker: "Next", text: "Follow profit down to cash" }
        }
      },

      // A reference page. Revenue recognized when earned, deliveries spread over time,
      // deferred revenue as a liability and revenue as a place to look when results seem too
      // good follow the book's chapter 7 as I remember it, unchecked against its wording. The
      // September events are invented; their totals are exact. The list of ways revenue gets
      // pulled forward is general accounting knowledge, ours.
      "revenue": {
        navLabel: "Revenue",
        title: "Revenue: the issue is recognition",
        eyebrow: "Part II · Chapter 07",
        layout: "dense",
        dek:
          "Revenue is the top line, so it looks like the most solid number on the income statement. But when a sale counts is a judgment, and the answer often has little to do with when the cash arrives.",
        blocks: [
          {
            type: "brief",
            eyebrow: "In brief",
            title: "The argument in five points",
            points: [
              { t: "Revenue counts when it's earned.", d: "When the product is delivered or the service performed, whenever the customer pays. A sale on 30-day terms counts on delivery; cash paid in advance doesn't count yet." },
              { t: "Many deals are delivered over time.", d: "A year of servicing is delivered a month at a time, and so is its revenue. A product sold with installation and training may not be complete until all of it is done." },
              { t: "Cash in advance is a debt.", d: "Deposits, gift cards and prepaid contracts are liabilities, deferred revenue, until delivery. As the company delivers, the liability shrinks and revenue grows." },
              { t: "Revenue and cash can sit in different months.", d: "In the example below, September's revenue is $59,000 and the cash that came in during September is $46,000, from the same eight events." },
              { t: "It's the first place to look when results seem too good.", d: "Counting sales a little early is one of the simplest ways to make a quarter look better." }
            ]
          },
          {
            type: "figure",
            eyebrow: "Figure",
            title: "When revenue counts, and when the cash arrives",
            intro: "Four of Northline's deals across six months. Shaded months are when revenue is recorded; dots are when cash comes in.",
            alt: "A timeline from July to December with four deals. A shop buying on 30-day terms: revenue in September, cash in October. A year of fleet servicing paid on September 1: cash in September, revenue spread over every month from September on. A deposit for a custom bike: cash in September, revenue in November when the bike is delivered. A school that paid in July for bikes delivered in September: cash in July, revenue in September.",
            svg: (() => {
              const months = ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
              const deals = [
                { l: ["Shop buys on", "30-day terms"], rev: [2], cash: 3 },
                { l: ["A year of servicing,", "paid September 1"], rev: [2, 3, 4, 5], cash: 2, more: true },
                { l: ["Deposit for a", "custom bike"], rev: [4], cash: 2 },
                { l: ["School paid in July,", "bikes delivered in Sept."], rev: [2], cash: 0 }
              ];
              const X = (m) => 200 + m * 72;
              return `<svg viewBox="0 0 660 270" xmlns="http://www.w3.org/2000/svg">
                <rect class="sv-wash" x="${X(2) - 4}" y="10" width="72" height="250" rx="3"/>
                ${months.map((m, i) => `<text class="sv-k" x="${X(i) + 32}" y="28" text-anchor="middle">${m.toUpperCase()}</text>`).join("")}
                ${deals
                  .map((d, r) => {
                    const y = 48 + r * 54;
                    return `<text class="sv-t" x="0" y="${y + 12}">${d.l[0]}</text><text class="sv-t2" x="0" y="${y + 28}">${d.l[1]}</text>
                      <path class="sv-grid" d="M200 ${y + 40} H632"/>
                      ${d.rev.map((m) => `<rect x="${X(m)}" y="${y + 4}" width="64" height="26" rx="3" style="fill: var(--series-profit); fill-opacity: ${d.rev.length > 1 ? 0.45 : 0.85}"/>`).join("")}
                      ${d.more ? `<text class="sv-t2" x="${X(5) + 70}" y="${y + 22}">→</text>` : ""}
                      <circle class="sv-dot" cx="${X(d.cash) + 32}" cy="${y + 17}" r="7" style="fill: var(--series-cash)"/>`;
                  })
                  .join("")}
              </svg>`;
            })(),
            svgNarrow: (() => {
              const months = ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
              const deals = [
                { l: "Shop buys on 30-day terms", rev: [2], cash: 3 },
                { l: "A year of servicing, paid Sept 1", rev: [2, 3, 4, 5], cash: 2 },
                { l: "Deposit for a custom bike", rev: [4], cash: 2 },
                { l: "School paid in July, bikes in Sept", rev: [2], cash: 0 }
              ];
              const X = (m) => 4 + m * 54;
              return `<svg viewBox="0 0 330 330" xmlns="http://www.w3.org/2000/svg">
                <rect class="sv-wash" x="${X(2) - 2}" y="6" width="54" height="318" rx="3"/>
                ${months.map((m, i) => `<text class="sv-k" x="${X(i) + 25}" y="22" text-anchor="middle">${m.toUpperCase()}</text>`).join("")}
                ${deals
                  .map((d, r) => {
                    const y = 40 + r * 72;
                    return `<text class="sv-t" x="4" y="${y + 12}">${d.l}</text>
                      ${d.rev.map((m) => `<rect x="${X(m)}" y="${y + 22}" width="50" height="26" rx="3" style="fill: var(--series-profit); fill-opacity: ${d.rev.length > 1 ? 0.45 : 0.85}"/>`).join("")}
                      <circle class="sv-dot" cx="${X(d.cash) + 25}" cy="${y + 35}" r="7" style="fill: var(--series-cash)"/>`;
                  })
                  .join("")}
              </svg>`;
            })(),
            notes: [
              { t: "Shaded: revenue is recorded", d: "in the month the product or service is delivered. A darker cell is the whole sale; lighter cells are a share of a deal delivered over time." },
              { t: "Dot: cash arrives.", d: "Before delivery it's a liability; after delivery it settles a receivable." },
              { t: "September is highlighted.", d: "Three of the four deals put cash and revenue in different months." }
            ],
            caption: "Invented deals at Northline Bikes."
          },
          {
            type: "table",
            eyebrow: "Worked example",
            title: "Eight things that happen in September",
            intro: "How much of each counts as September revenue, and how much cash it brings in that month.",
            columns: ["Event", "September revenue", "September cash in", "Why"],
            widths: [null, "8.5rem", "8.5rem", null],
            rows: [
              ["Northline ships $40,000 of bikes to a shop on 30-day terms", "<span class=\"tnum\">$40,000</span>", "<span class=\"tnum\">$0</span>", "Delivered, so earned. Payment only turns the receivable into cash next month."],
              ["A rider pays a $2,000 deposit for a custom bike to be delivered in November", "<span class=\"tnum\">$0</span>", "<span class=\"tnum\">$2,000</span>", "Nothing delivered. Until November the deposit is a liability."],
              ["A delivery company pays $12,000 on September 1 for a year of servicing", "<span class=\"tnum\">$1,000</span>", "<span class=\"tnum\">$12,000</span>", "Delivered month by month: one twelfth now, the rest over eleven months."],
              ["Northline sells $5,000 of gift cards, none used yet", "<span class=\"tnum\">$0</span>", "<span class=\"tnum\">$5,000</span>", "A promise to deliver later. Revenue when the cards are spent."],
              ["A shop pays $18,000 for bikes delivered in August", "<span class=\"tnum\">$0</span>", "<span class=\"tnum\">$18,000</span>", "That sale counted in August."],
              ["Northline delivers $15,000 of bikes to a school that paid in July", "<span class=\"tnum\">$15,000</span>", "<span class=\"tnum\">$0</span>", "Delivery is now. The July payment sat on the balance sheet as a liability until today."],
              ["Ten riders each pay $900 for a three-month course starting September 1", "<span class=\"tnum\">$3,000</span>", "<span class=\"tnum\">$9,000</span>", "A third of the course is delivered in September."],
              ["Northline signs a $100,000 bike-share contract for next spring", "<span class=\"tnum\">$0</span>", "<span class=\"tnum\">$0</span>", "Signing delivers nothing. Good news for next year."],
              ["<strong>September</strong>", "<strong class=\"tnum\">$59,000</strong>", "<strong class=\"tnum\">$46,000</strong>", "The same events, two different numbers."]
            ]
          },
          {
            type: "table",
            eyebrow: "Three statements",
            title: "Revenue, cash and the balance sheet",
            columns: ["", "Revenue", "Cash", "On the balance sheet"],
            widths: ["13rem", null, null, null],
            rows: [
              ["Sale on credit, delivered", "Counts now", "Arrives later", "A receivable until paid"],
              ["Deposit or prepayment", "Counts on delivery", "Arrives now", "Deferred revenue, a liability, until delivered"],
              ["A year of service paid ahead", "A twelfth each month", "Arrives now", "A liability that shrinks each month"],
              ["Payment for an earlier sale", "Already counted", "Arrives now", "A receivable turns into cash"],
              ["Contract signed, nothing delivered", "Not yet", "Not yet", "Nothing yet"]
            ]
          },
          {
            type: "table",
            eyebrow: "What to watch",
            title: "Ways revenue gets pulled forward",
            intro: "Our list of the common ones, each a reason to compare revenue with cash and receivables.",
            columns: ["Practice", "What happens", "Where it shows"],
            widths: ["12rem", null, null],
            rows: [
              ["Channel stuffing", "Pushing extra stock onto distributors at quarter-end, often with generous return rights", "Receivables and returns jump the next quarter"],
              ["Bill and hold", "Billing for goods the customer hasn't taken delivery of", "Inventory held for customers; revenue without shipments"],
              ["Front-loading long contracts", "Counting multi-year service or software deals largely up front", "Deferred revenue lower than the contracts imply"],
              ["Side agreements", "Undisclosed promises (extra rights to return, cancel or pay later) that undo the sale", "Sales that reverse; long collection times"],
              ["Gross instead of net", "Reporting the full price of goods sold as an agent, rather than the commission", "Revenue grows while gross margin falls"]
            ]
          }
        ],
        end: {
          related: [
            { title: "Profit is an estimate", where: "Chapter 5", page: "profit-estimate" },
            { title: "Costs and expenses", where: "Chapter 8" },
            { title: "The many forms of profit", where: "Chapter 9", page: "forms-of-profit" },
            { title: "Profit ≠ cash", where: "Chapter 16", page: "profit-cash" }
          ],
          cta: { page: "forms-of-profit", kicker: "Next", text: "See which profits each move reaches" }
        }
      },

      // A reference page. Ratios, their four families and Northline's growing cash squeeze
      // follow the book's Part V as I remember it, unchecked against its wording. The ratio
      // reader and Northline's two years are invented; the families table is ours.
      ratios: {
        title: "Reading the ratios",
        navLabel: "Ratios",
        eyebrow: "Part V · Chapters 19–23",
        layout: "dense",
        dek:
          "A single number says little. Ratios compare one number with another, and comparing them across years shows what the totals hide. Here is a growing company whose profit looks fine and whose ratios tell a more worried story.",
        blocks: [
          {
            type: "brief",
            eyebrow: "In brief",
            title: "The argument in five points",
            points: [
              { t: "Totals are hard to judge alone.", d: "Is $750,000 of profit good? It depends on the sales, the assets and the money behind it. Ratios put two numbers side by side so different years, or different companies, can be compared." },
              { t: "Four families, four questions.", d: "Profitability asks whether the company earns enough; leverage, how much of it is borrowed; liquidity, whether it can pay its bills; efficiency, how well it uses what it has." },
              { t: "Read across the families.", d: "One ratio rarely tells the story. The useful reading comes from seeing how they move together." },
              { t: "Compare like with like.", d: "With the company's own past, or with similar companies. What's healthy differs by industry: a grocer's margins would ruin a software firm." },
              { t: "Growth can hide a squeeze.", d: "Northline's sales rose a fifth and profit rose, while customers paid slower, stock piled up and debt filled the gap. Cash fell from $900,000 to $350,000." }
            ]
          },
          {
            type: "ratios",
            company: "Northline Bikes",
            title: "Two years at Northline",
            intro:
              "Revenue grew by a fifth and net income rose. Read down the ratios to see what else happened. Select any ratio to see its formula with Northline's numbers in it. Figures are in thousands of dollars.",
            startRatio: "dso",
            years: [
              {
                label: "Last year",
                s: { revenue: 10000, cogs: 6000, opex: 3000, interest: 100, tax: 225, cash: 900, ar: 1370, inv: 1150, ppe: 1580, ap: 575, stDebt: 325, ltDebt: 1100, equity: 3000 }
              },
              {
                label: "This year",
                s: { revenue: 12000, cogs: 7320, opex: 3480, interest: 200, tax: 250, cash: 350, ar: 2137, inv: 1705, ppe: 2408, ap: 602, stDebt: 898, ltDebt: 1350, equity: 3750 }
              }
            ],
            notes: {
              gm: "Down a point. Costs are rising a little faster than prices.",
              om: "Flat. Overheads grew in step with sales.",
              nm: "Down, mostly because interest doubled on the extra borrowing.",
              roa: "Down: the asset base grew faster than profit, much of it in receivables and stock.",
              roe: "Still high, but falling even with more debt helping it.",
              de: "Up. Some of the growth was paid for with borrowed money.",
              ic: "Down from 10 to 6 times. Still safe, but the cushion is shrinking.",
              cr: "Down sharply as short-term borrowing rose and cash fell.",
              qr: "Down too. Without inventory, the cushion is much thinner.",
              dso: "Customers now take 15 days longer to pay. That alone ties up about $490k.",
              dio: "Stock sits two weeks longer, tying up roughly $300k more.",
              dpo: "Northline is paying suppliers faster, which uses cash.",
              at: "Each dollar of assets produces less revenue than it did."
            }
          },
          {
            type: "table",
            eyebrow: "The four families",
            title: "What each family asks, and what to watch",
            intro: "The ratios in the reader above, grouped as the book groups them. Our summary of what each tells a manager.",
            columns: ["Family", "The question", "Ratios", "Watch for"],
            widths: ["8.5rem", null, null, null],
            rows: [
              ["Profitability", "Does the company earn enough on its sales, its assets and its owners' money?", "Gross, operating and net margin; return on assets; return on equity", "Margins falling while sales grow; return on equity propped up by debt"],
              ["Leverage", "How much of the business is funded by borrowing, and can it carry the debt?", "Debt to equity; interest coverage", "Debt rising faster than equity; operating profit only a few times the interest bill"],
              ["Liquidity", "Can it pay the bills coming due in the next year?", "Current ratio; quick ratio", "A quick ratio well below the current ratio: the cushion is stock that may not sell"],
              ["Efficiency", "How well does it use its assets and working capital?", "Days sales outstanding; days in inventory; days payable; asset turnover", "Days creeping up year on year; sales growing slower than assets"]
            ]
          }
        ],
        end: {
          related: [
            { title: "Profit ≠ cash", where: "Chapter 16", page: "profit-cash" },
            { title: "Working capital levers", where: "Part VII", page: "working-capital" },
            { title: "The investor's perspective", where: "Chapter 24" },
            { title: "Profit is an estimate", where: "Chapter 5", page: "profit-estimate" }
          ],
          cta: { page: "working-capital", kicker: "Next", text: "Pull the working capital levers" }
        }
      },

      // A reference page. The three sections of the cash flow statement, interest paid as an
      // operating flow under US rules, and what a healthy pattern looks like follow the
      // book's chapter 17 as I remember it, unchecked against its wording. Northline's events
      // are invented. The life-stage patterns are a standard reading of cash flow signs, ours.
      "cash-flow-language": {
        navLabel: "Cash flow",
        title: "The language of cash flow",
        eyebrow: "Part IV · Chapter 17",
        layout: "dense",
        dek:
          "The cash flow statement sorts every dollar in and out into three buckets: operating, investing and financing. Which bucket a dollar lands in tells you whether the business is paying its own way.",
        blocks: [
          {
            type: "brief",
            eyebrow: "In brief",
            title: "The argument in four points",
            cols: 2,
            points: [
              { t: "Three buckets.", d: "Operating cash comes from running the business; investing cash goes into or comes out of long-lived assets; financing cash moves between the company and the people who fund it." },
              { t: "They add up to the change in cash.", d: "Operating plus investing plus financing equals the change in the cash line on the balance sheet, to the dollar." },
              { t: "Interest is operating.", d: "Under US rules, interest paid counts as operating cash, even though the loan itself is financing. Repaying the loan is financing." },
              { t: "The pattern of signs tells a story.", d: "An established business usually generates operating cash and uses some of it to invest and to pay lenders or owners. A business can't run on financing forever." }
            ]
          },
          {
            type: "table",
            eyebrow: "The three sections",
            title: "What goes where",
            columns: ["Section", "Cash in", "Cash out", "What it tells you"],
            widths: ["8rem", null, null, null],
            rows: [
              ["Operating", "Collections from customers", "Payments to suppliers and staff; rent; interest; taxes", "Whether the business itself generates cash"],
              ["Investing", "Selling equipment, buildings or businesses", "Buying equipment, buildings or businesses", "How much is being put into the future, or sold off"],
              ["Financing", "Borrowing; issuing shares", "Repaying loans; dividends; buying back shares", "How the gap between the first two is funded, and what owners and lenders take out"]
            ]
          },
          {
            type: "table",
            eyebrow: "Worked example",
            title: "Eight of Northline's cash flows, sorted",
            columns: ["What happens", "Section", "Why"],
            widths: [null, "8rem", null],
            rows: [
              ["A bike shop pays Northline's invoice", "Operating", "Collecting from customers is the heart of operating cash."],
              ["Northline buys a new paint line", "Investing", "Equipment lasts for years."],
              ["Northline borrows $500,000 from the bank", "Financing", "Money from a lender."],
              ["Northline pays its frame supplier", "Operating", "Paying for materials is part of running the business."],
              ["Northline pays interest on its loan", "Operating", "The surprise: interest paid is operating under US rules."],
              ["Northline sells an old warehouse", "Investing", "Selling a long-lived asset."],
              ["The owners take a dividend", "Financing", "Cash going back to owners."],
              ["Northline repays part of the loan", "Financing", "Repaying principal is financing; only the interest is operating."]
            ]
          },
          {
            type: "table",
            eyebrow: "Reading the signs",
            title: "Patterns of cash flow, and what they usually mean",
            intro: "Our summary of a standard way to read the three totals together.",
            columns: ["Pattern", "Operating", "Investing", "Financing", "Usually"],
            widths: ["9rem", "6.5rem", "6.5rem", "6.5rem", null],
            rows: [
              ["Startup", "Out", "Out", "In", "Funded by investors or lenders while it builds the business. Fine for a while; the clock is running."],
              ["Growing", "In, small", "Out, large", "In", "Operations pay part of the expansion; borrowing or new shares pay the rest."],
              ["Established", "In, large", "Out", "Out", "Pays its own way, invests, and returns cash to lenders and owners. The healthy pattern the book describes."],
              ["Shrinking", "In", "In", "Out", "Selling assets to repay debt or pay owners. Sometimes sensible, sometimes a slow liquidation."],
              ["Trouble", "Out", "In", "In", "Selling assets and borrowing to cover operations. Can't last."]
            ]
          }
        ],
        end: {
          related: [
            { title: "Profit ≠ cash", where: "Chapter 16", page: "profit-cash" },
            { title: "How cash connects with everything else", where: "Chapter 18", page: "cash-connects" },
            { title: "Working capital levers", where: "Part VII", page: "working-capital" },
            { title: "Reading the ratios", where: "Part V", page: "ratios" }
          ],
          cta: { page: "profit-cash", kicker: "See it in action", text: "Watch the three buckets fill" }
        }
      },

      // A reference page. The time value of money, compounding, present value, the cost of
      // capital and the hurdle rate follow the book's Part VI as I remember it, unchecked
      // against its wording. Northline's 12% hurdle and the five offers are invented; the
      // present values are arithmetic.
      "roi-basics": {
        title: "The building blocks of ROI",
        navLabel: "Time value",
        eyebrow: "Part VI · Return on investment",
        layout: "dense",
        dek:
          "Before you can judge an investment you need two ideas: money today is worth more than the same money later, and the rate that measures the difference is the company's cost of capital.",
        blocks: [
          {
            type: "brief",
            eyebrow: "In brief",
            title: "The argument in five points",
            points: [
              { t: "A dollar today is worth more than a dollar later.", d: "Money now can be invested, lent or used to pay down debt. At 8% a year, $10,000 grows to $10,800 in one year and $14,693 in five: growth on growth, or compounding." },
              { t: "Present value runs it backwards.", d: "What a future sum is worth today: future amount ÷ (1 + rate)<sup>years</sup>. $14,693 in five years is worth $10,000 now, at 8%." },
              { t: "The rate is the cost of capital.", d: "What the company pays for the money it uses: interest on its loans blended with the higher return its owners expect, since owners take more risk." },
              { t: "The hurdle rate is the bar a project must clear.", d: "Usually at or above the cost of capital, and higher for riskier projects. Northline, the invented bike maker, uses 12%." },
              { t: "Long waits are hit hardest.", d: "The rate compounds once a year, so the further off a payoff, the more the choice of rate decides whether it's worth having." }
            ]
          },
          {
            type: "behavior",
            eyebrow: "Figure",
            title: "What $10,000 later is worth today",
            intro: "The present value of $10,000 received after a given number of years, at three rates.",
            cols: 1,
            h: 230,
            charts: [
              {
                t: "Present value of $10,000",
                d: "At 3%, $10,000 in ten years is worth $7,441 today; at 8%, $4,632; at Northline's 12% hurdle, $3,220.",
                x: [0, 10],
                y: [0, 11000],
                xLabel: "Years until it arrives",
                yLabel: "Worth today, $",
                yTicks: [0, 2500, 5000, 7500, 10000],
                unit: "",
                hover: true,
                series: [
                  { name: "At 3%", tone: "ink", points: curve((t) => 10000 / Math.pow(1.03, t), 0, 10, 10) },
                  { name: "At 8%", tone: "cash", points: curve((t) => 10000 / Math.pow(1.08, t), 0, 10, 10) },
                  { name: "At 12%", points: curve((t) => 10000 / Math.pow(1.12, t), 0, 10, 10) }
                ]
              }
            ]
          },
          {
            type: "table",
            eyebrow: "Worked example",
            title: "Five offers instead of $10,000 today",
            intro: "Each offer's present value at four rates. An offer is worth waiting for while its present value is above $10,000, that is, while the rate is below its break-even rate.",
            columns: ["Offer", "At 0%", "At 3%", "At 8%", "At 12%", "Breaks even at"],
            widths: [null, "6rem", "6rem", "6rem", "6rem", "7rem"],
            rows: [
              ["$10,300 in 1 year", "<span class=\"tnum\">$10,300</span>", "<span class=\"tnum\">$10,000</span>", "<span class=\"tnum\">$9,537</span>", "<span class=\"tnum\">$9,196</span>", "3%"],
              ["$11,236 in 2 years", "<span class=\"tnum\">$11,236</span>", "<span class=\"tnum\">$10,591</span>", "<span class=\"tnum\">$9,633</span>", "<span class=\"tnum\">$8,957</span>", "6%"],
              ["$13,225 in 2 years", "<span class=\"tnum\">$13,225</span>", "<span class=\"tnum\">$12,466</span>", "<span class=\"tnum\">$11,338</span>", "<span class=\"tnum\">$10,543</span>", "15%"],
              ["$15,386 in 5 years", "<span class=\"tnum\">$15,386</span>", "<span class=\"tnum\">$13,272</span>", "<span class=\"tnum\">$10,471</span>", "<span class=\"tnum\">$8,730</span>", "9%"],
              ["$31,058 in 10 years", "<span class=\"tnum\">$31,058</span>", "<span class=\"tnum\">$23,110</span>", "<span class=\"tnum\">$14,386</span>", "<span class=\"tnum\">$10,000</span>", "12%"]
            ],
            foot: "Present value = amount ÷ (1 + rate)<sup>years</sup>. Invented offers."
          },
          {
            type: "table",
            eyebrow: "Reference",
            title: "The rates in an investment case",
            columns: ["Rate", "What it is", "Why it's at that level"],
            widths: ["11rem", null, null],
            rows: [
              ["Interest on debt", "What lenders charge", "Lenders are paid first, so they take the least risk"],
              ["Owners' expected return", "What shareholders expect to earn", "Owners are paid last, so they expect more"],
              ["Cost of capital", "A blend of the two, weighted by how much of each the company uses", "It's the true price of the company's money"],
              ["Hurdle rate", "The minimum a project must return to be approved", "At or above the cost of capital, and higher for riskier projects"],
              ["Discount rate", "The rate used to turn future amounts into present values", "Usually the cost of capital; the hurdle rate when judging a project"]
            ]
          }
        ],
        end: {
          related: [
            { title: "Figuring ROI", where: "Part VI", page: "roi" },
            { title: "Reading the ratios", where: "Part V", page: "ratios" },
            { title: "Working capital levers", where: "Part VII", page: "working-capital" },
            { title: "Profit is an estimate", where: "Chapter 5", page: "profit-estimate" }
          ],
          cta: { page: "roi", kicker: "Next", text: "Judge a welding robot three ways" }
        }
      },

      // A reference page. Payback, net present value and internal rate of return, and the
      // estimates as the decision, follow the book's Part VI as I remember it, unchecked
      // against its wording. The welding robot is invented; every figure in the tables is
      // arithmetic on it ($400,000 up front, even yearly savings, no salvage value).
      roi: {
        title: "Figuring ROI",
        navLabel: "ROI",
        eyebrow: "Part VI · Return on investment",
        layout: "dense",
        dek:
          "Should Northline buy the machine? Return on investment asks whether the cash a project brings in, counted at today's value, beats what it costs. The book works through three ways to answer: payback, net present value and internal rate of return.",
        blocks: [
          {
            type: "brief",
            eyebrow: "In brief",
            title: "The argument in four points",
            cols: 2,
            points: [
              { t: "Payback asks how fast the money comes back.", d: "Simple, and blind to timing and to anything after the payback date. The robot pays back in 3.6 years." },
              { t: "Net present value asks how much value it adds.", d: "Each year's cash discounted to today, minus the cost. Positive means the project beats the hurdle rate. At 12%, the robot adds $52,255." },
              { t: "Internal rate of return asks what return it earns.", d: "The rate at which net present value is zero. If it's above the hurdle, the project clears it. The robot earns 16.5%." },
              { t: "The estimates are the decision.", d: "Savings of $90,000 a year instead of $110,000, or a five-year life instead of six, and the same robot fails at 12%." }
            ]
          },
          {
            type: "roi-calculator",
            company: "Northline Bikes",
            title: "The welding robot",
            intro:
              "A robotic welding cell costs $400,000 today. Engineering estimates it will save about $110,000 a year in labor and rework for six years. Move the estimates and the hurdle rate and watch the answer change.",
            cost: 400000,
            start: { savings: 110000, years: 6, rate: 12 },
            ranges: { savings: [40000, 200000, 5000], years: [2, 12], rate: [2, 20] }
          },
          {
            type: "table",
            eyebrow: "Three methods",
            title: "Payback, net present value and internal rate of return",
            columns: ["Method", "The question", "How", "Its blind spot", "The robot"],
            widths: ["8.5rem", null, null, null, "8rem"],
            rows: [
              ["Payback", "How soon do we get our money back?", "Cost ÷ yearly cash", "Ignores the time value of money and every year after payback", "<span class=\"tnum\">3.6 years</span>"],
              ["Net present value", "How much value does it add, in today's dollars?", "Sum of discounted yearly cash, minus the cost", "Depends entirely on the rate chosen", "<span class=\"tnum\">$52,255 at 12%</span>"],
              ["Internal rate of return", "What return does it earn?", "The rate that makes net present value zero", "Can mislead when comparing projects of different sizes or lengths", "<span class=\"tnum\">16.5%</span>"]
            ]
          },
          {
            type: "table",
            eyebrow: "Sensitivity",
            title: "How the answer moves with the estimates",
            intro: "Net present value of the robot at three savings estimates and three rates, with its internal rate of return and payback.",
            columns: ["Yearly savings", "NPV at 8%", "NPV at 10%", "NPV at 12%", "IRR", "Payback"],
            widths: [null, "7rem", "7rem", "7rem", "5.5rem", "6rem"],
            rows: [
              ["$90,000", "<span class=\"tnum\">$16,059</span>", "<span class=\"tnum\">−$8,027</span>", "<span class=\"tnum\">−$29,973</span>", "<span class=\"tnum\">9.3%</span>", "<span class=\"tnum\">4.4 yrs</span>"],
              ["$110,000", "<span class=\"tnum\">$108,517</span>", "<span class=\"tnum\">$79,079</span>", "<span class=\"tnum\">$52,255</span>", "<span class=\"tnum\">16.5%</span>", "<span class=\"tnum\">3.6 yrs</span>"],
              ["$130,000", "<span class=\"tnum\">$200,974</span>", "<span class=\"tnum\">$166,184</span>", "<span class=\"tnum\">$134,483</span>", "<span class=\"tnum\">23.2%</span>", "<span class=\"tnum\">3.1 yrs</span>"]
            ],
            foot: "Six years of savings throughout. A twenty-thousand-dollar error in the savings estimate swings net present value by about $80,000."
          },
          {
            type: "table",
            eyebrow: "Sensitivity",
            title: "How long it lasts",
            intro: "The same robot saving $110,000 a year, judged at Northline's 12% hurdle, for different working lives.",
            columns: ["Working life", "NPV at 12%", "IRR", "Verdict"],
            widths: [null, "8rem", "6rem", null],
            rows: [
              ["4 years", "<span class=\"tnum\">−$65,892</span>", "<span class=\"tnum\">3.9%</span>", "Fails"],
              ["5 years", "<span class=\"tnum\">−$3,475</span>", "<span class=\"tnum\">11.6%</span>", "Just fails"],
              ["6 years", "<span class=\"tnum\">$52,255</span>", "<span class=\"tnum\">16.5%</span>", "Clears"],
              ["8 years", "<span class=\"tnum\">$146,440</span>", "<span class=\"tnum\">21.8%</span>", "Clears comfortably"]
            ]
          }
        ],
        end: {
          related: [
            { title: "The building blocks of ROI", where: "Part VI", page: "roi-basics" },
            { title: "Profit is an estimate", where: "Chapter 5", page: "profit-estimate" },
            { title: "Reading the ratios", where: "Part V", page: "ratios" },
            { title: "Working capital levers", where: "Part VII", page: "working-capital" }
          ],
          cta: { page: "working-capital", kicker: "Next", text: "Pull the working capital levers" }
        }
      },

      // A reference page. The three levers, the cash conversion cycle and who controls each
      // lever follow the book's Part VII as I remember it, unchecked against its wording.
      // Northline's sales and costs are invented; the value of a day is arithmetic. The
      // tactics table is ours.
      "working-capital": {
        title: "Working capital levers",
        navLabel: "Working capital",
        eyebrow: "Part VII · Working capital",
        layout: "dense",
        dek:
          "Much of the gap between profit and cash sits in three numbers: how long customers take to pay, how long inventory sits, and how long you take to pay suppliers. Move them and cash appears or disappears, with no change in profit.",
        blocks: [
          {
            type: "brief",
            eyebrow: "In brief",
            title: "The argument in four points",
            cols: 2,
            points: [
              { t: "Three levers, measured in days.", d: "Days sales outstanding is how long customers take to pay; days in inventory, how long stock sits before it's sold; days payable outstanding, how long the company takes to pay suppliers." },
              { t: "The cash conversion cycle adds them up.", d: "Days sales outstanding plus days in inventory, minus days payable: how long a dollar is tied up between paying for materials and collecting from a customer." },
              { t: "Each day is worth a lot.", d: "At Northline's size, collecting one day sooner puts about $33,000 back in the bank, for as long as the faster collection lasts. None of it changes profit." },
              { t: "Managers across the company move these numbers.", d: "Sales sets payment terms, operations decides how much stock to hold, purchasing negotiates with suppliers." }
            ]
          },
          {
            type: "wc-levers",
            company: "Northline Bikes, a few years on",
            title: "Pull the levers",
            intro:
              "Northline now sells about $12 million of bikes a year, with $7.2 million in cost of goods sold. Drag the sliders to change how many days a dollar spends in the business, and see how much cash that ties up.",
            revenue: 12000000,
            cogs: 7200000,
            base: { dso: 55, dio: 70, dpo: 35 },
            ranges: { dso: [10, 120], dio: [10, 150], dpo: [5, 120] }
          },
          {
            type: "table",
            eyebrow: "The formulas",
            title: "Each lever, and what a day of it is worth at Northline",
            columns: ["Lever", "Formula", "One day is worth", "Moving it frees cash when"],
            widths: ["12rem", null, "8.5rem", null],
            rows: [
              ["Days sales outstanding", "Receivables ÷ (revenue ÷ 365)", "<span class=\"tnum\">$32,877</span>", "It falls: customers pay sooner"],
              ["Days in inventory", "Inventory ÷ (cost of goods sold ÷ 365)", "<span class=\"tnum\">$19,726</span>", "It falls: stock sells sooner"],
              ["Days payable outstanding", "Payables ÷ (cost of goods sold ÷ 365)", "<span class=\"tnum\">$19,726</span>", "It rises: suppliers are paid later"]
            ],
            foot: "Northline sells $12 million a year with $7.2 million of cost of goods sold, invented figures."
          },
          {
            type: "table",
            eyebrow: "In practice",
            title: "Who moves each lever, and what pushing too far costs",
            intro: "Our summary.",
            columns: ["Lever", "Who controls it", "Ways to move it", "Pushed too far"],
            widths: ["10rem", null, null, null],
            rows: [
              ["Customers pay sooner", "Sales, credit control", "Shorter terms; invoicing on delivery; deposits; chasing late payers; discounts for early payment", "Lost customers, or discounts that cost more than the cash is worth"],
              ["Stock sells sooner", "Operations, purchasing, product", "Smaller, more frequent orders; fewer product variants; selling off slow stock", "Stock-outs, missed sales, rush orders at higher cost"],
              ["Suppliers are paid later", "Purchasing, finance", "Negotiated terms; paying on the due date, not before", "Lost early-payment discounts, worse prices, suppliers who put you last"]
            ]
          }
        ],
        end: {
          related: [
            { title: "Cash is a reality check", where: "Chapter 15" },
            { title: "Profit ≠ cash", where: "Chapter 16", page: "profit-cash" },
            { title: "The language of cash flow", where: "Chapter 17", page: "cash-flow-language" },
            { title: "Reading the ratios", where: "Part V", page: "ratios" }
          ],
          cta: { page: "profit-cash", kicker: "See it event by event", text: "Profit isn't cash" }
        }
      },

      // A reference page. Why profit and cash differ and how the three statements tie out
      // follow the book's chapter 16 as I remember it, unchecked against its wording. The
      // simulator's company is invented; the table of differences is ours.
      "profit-cash": {
        title: "Profit isn't cash",
        crumb: "Profit isn't cash",
        navLabel: "Profit vs. cash",
        eyebrow: "Part IV · Chapter 16",
        layout: "dense",
        dek:
          "A company can report a healthy profit and still run out of money. The income statement, balance sheet and cash flow statement each tell part of the story. Run one month of business through all three and watch where profit and cash part ways.",
        blocks: [
          {
            type: "brief",
            eyebrow: "In brief",
            title: "The argument in four points",
            cols: 2,
            points: [
              { t: "Profit and cash answer different questions.", d: "Profit measures how well the business performed over a period, under accounting rules about timing. Cash is simply what's in the bank. A manager needs both." },
              { t: "The rules move profit away from cash.", d: "A sale counts on delivery, not payment; its cost counts with the sale, not when materials were bought; equipment is spread over its life as depreciation." },
              { t: "The three statements tie out.", d: "Net income becomes retained earnings on the balance sheet. The cash flow statement starts from net income, adjusts for everything that moved cash differently, and ends at the balance sheet's cash." },
              { t: "Most of the gap is working capital.", d: "Money tied up in receivables and inventory, offset by what's owed to suppliers. Collecting sooner and holding less stock turn profit into cash faster without changing profit." }
            ]
          },
          {
            type: "three-statements",
            scenario: {
              company: "Northline Bikes",
              period: "June",
              intro:
                "Northline builds bikes and sells them to shops. Pick events in any order. Each one updates all three statements, and the chart tracks profit against cash. The first sale is already on the books.",
              emptyNote: "Pick something that happens this month. Each event updates all three statements at once.",
              foot: "Northline Bikes is invented for this page. Figures in US dollars; negative numbers in parentheses, as on a real statement.",
              opening: { cash: 50000, ar: 0, inv: 40000, equip: 60000, ap: 20000, loan: 40000, capital: 50000, re: 40000 },
              start: ["sell"],
              events: [
                {
                  id: "sell",
                  label: "Ship bikes to a shop on 60-day terms",
                  amount: "$30,000 sale · $18,000 cost",
                  fx: { revenue: 30000, cogs: 18000, ar: 30000, inv: -18000 },
                  note: "Profit rises by $12,000 the moment the bikes ship. Cash doesn't move: the shop has 60 days to pay, and the bikes came out of inventory that was paid for earlier. Profit is up; cash is not."
                },
                {
                  id: "collect",
                  label: "A shop pays its invoice",
                  amount: "$30,000",
                  fx: { ar: -30000, cash: 30000 },
                  note: "Cash rises by $30,000 and receivables fall by the same amount. Profit doesn't change, because the sale was already counted when the bikes shipped."
                },
                {
                  id: "restock",
                  label: "Buy parts on 30-day credit",
                  amount: "$25,000",
                  fx: { inv: 25000, ap: 25000 },
                  note: "Inventory and the amount owed to suppliers both rise by $25,000. Neither profit nor cash moves. Parts become an expense only when the bikes they go into are sold."
                },
                {
                  id: "paysupplier",
                  label: "Pay a supplier",
                  amount: "$20,000",
                  fx: { ap: -20000, cash: -20000 },
                  note: "Cash falls by $20,000 and payables fall with it. Profit doesn't change: paying a bill that's already recorded isn't a new expense."
                },
                {
                  id: "payroll",
                  label: "Pay rent and wages",
                  amount: "$8,000",
                  fx: { opex: 8000, cash: -8000 },
                  note: "Rent and wages are this month's expenses and they're paid in cash, so profit and cash both fall by $8,000. Here the two move together."
                },
                {
                  id: "machine",
                  label: "Buy a frame-welding machine",
                  amount: "$24,000 cash",
                  fx: { capex: 24000, cash: -24000 },
                  note: "Cash falls by $24,000 but profit doesn't. The machine is an asset that will last for years, so its cost reaches the income statement a little at a time, as depreciation."
                },
                {
                  id: "depreciate",
                  label: "Record a month of depreciation",
                  amount: "$2,000",
                  fx: { dep: 2000 },
                  note: "Profit falls by $2,000, one month's share of the equipment's cost. No cash leaves; it left when the equipment was bought. That's why the cash flow statement adds depreciation back."
                },
                {
                  id: "borrow",
                  label: "Borrow from the bank",
                  amount: "$15,000",
                  fx: { loan: 15000, cash: 15000 },
                  note: "Cash rises by $15,000 and so does the loan. Borrowed money isn't revenue, so profit doesn't change."
                },
                {
                  id: "repay",
                  label: "Repay part of the loan",
                  amount: "$5,000",
                  fx: { loan: -5000, cash: -5000 },
                  note: "Cash and the loan both fall by $5,000. Repaying the amount borrowed isn't an expense, so profit doesn't change."
                }
              ]
            }
          },
          {
            type: "table",
            eyebrow: "Why they differ",
            title: "The usual gaps between profit and cash",
            columns: ["What happens", "Profit", "Cash", "Where the gap shows"],
            widths: [null, null, null, null],
            rows: [
              ["A sale on credit", "Up when the goods are delivered", "Up only when the customer pays", "Receivables"],
              ["Stock bought or built ahead of sales", "No change until it's sold", "Down when it's paid for", "Inventory"],
              ["Supplies bought on credit", "Down as the goods are used or sold", "Down only when the supplier is paid", "Payables"],
              ["A machine bought", "Down a little each year, as depreciation", "Down all at once", "Equipment, and investing cash"],
              ["Money borrowed or repaid", "No change (only interest is an expense)", "Up when borrowed, down when repaid", "Debt, and financing cash"],
              ["Cash paid in advance by a customer", "No change until delivery", "Up when received", "Deferred revenue"]
            ]
          },
          {
            type: "table",
            eyebrow: "How they tie",
            title: "The same number in two places",
            columns: ["Number", "Appears on", "And on"],
            widths: ["12rem", null, null],
            rows: [
              ["Net income", "The bottom of the income statement", "The balance sheet, as an increase in retained earnings, and the top of the cash flow statement"],
              ["Depreciation", "The income statement, as an expense", "The cash flow statement, added back; the balance sheet, lowering equipment"],
              ["Changes in receivables, inventory and payables", "The balance sheet", "The cash flow statement, as adjustments from profit to cash"],
              ["Cash at the end of the period", "The last line of the cash flow statement", "The balance sheet's cash line"]
            ]
          }
        ],
        end: {
          related: [
            { title: "Profit is an estimate", where: "Chapter 5", page: "profit-estimate" },
            { title: "The income statement affects the balance sheet", where: "Chapter 14" },
            { title: "The language of cash flow", where: "Chapter 17", page: "cash-flow-language" },
            { title: "Working capital levers", where: "Part VII", page: "working-capital" }
          ],
          cta: { page: "", kicker: "Contents", text: "See the map of the book" }
        }
      }
    }
  });
})();
