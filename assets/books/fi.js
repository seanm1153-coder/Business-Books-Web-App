// Financial Intelligence, Revised Edition (Karen Berman & Joe Knight with John Case, 2013).
// Summaries are paraphrased; keep quotations short and attributed.
// Parts I–V are checked against published tables of contents. Chapter numbers in
// Parts VI–VIII are not yet checked, so those chapters are listed without numbers.
(function () {
  "use strict";

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
      { kicker: "Judgment calls", title: "Profit is an estimate", desc: "Five accounting choices that move profit but not cash.", page: "profit-estimate" },
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
      // A reference page around the judgment-calls tool. Profit as an estimate and cash as the
      // reality check follow Part I and Chapter 5 as I remember them, unchecked against the
      // wording. Northline Bikes is invented; the tables are our summary.
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
            title: "The argument in five points",
            points: [
              {
                t: "Profit rests on judgment calls.",
                d: "When a sale counts, how long equipment lasts, how many customers won't pay, what old stock is worth: each is an estimate, and the rules allow a range of reasonable answers."
              },
              {
                t: "Careful accountants can disagree.",
                d: "Two of them can report different profits for the same month, each within the rules."
              },
              {
                t: "That isn't fraud.",
                d: "The authors' point is not that the books are cooked, but that profit rests on assumptions a manager should know how to find."
              },
              {
                t: "Cash doesn't move with the estimates.",
                d: "The same bikes shipped and the same bills were paid, so the change in cash is identical under every choice. Cash is the reality check."
              },
              {
                t: "When profit jumps, ask what changed.",
                d: "The business, or the estimates? A longer equipment life or a smaller bad-debt reserve can lift profit without a single extra sale. Next: <a href=\"@profit-cash\">profit isn't cash</a>."
              }
            ]
          },
          {
            type: "judgment-calls",
            company: "Northline Bikes",
            period: "September",
            title: "Five judgment calls",
            intro:
              "Northline's September is fixed: the same bikes shipped, the same bills paid. Only the accounting choices change. Every option below is defensible. Flip them and watch the reported profit move.",
            base: { revenue: 210000, cogs: 126000, opex: 58000 },
            cashChange: 3100,
            calls: [
              {
                id: "rev",
                title: "A big order shipped on September 29",
                question: "A $40,000 order for custom bikes left the warehouse two days before month-end, but the fitting service the shop paid for happens in October. When does the revenue count?",
                lines: ["Revenue", "Cost of goods sold", "Gross profit"],
                start: "now",
                options: [
                  { id: "now", label: "Count it in September", tag: "aggressive", fx: { revenue: 40000, cogs: 24000 }, note: "The bikes have shipped, so September gets the $40,000 sale and its $24,000 cost. Defensible if the fitting is a minor part of the deal." },
                  { id: "later", label: "Count it in October, after fitting", tag: "conservative", fx: {}, note: "If the fitting is an essential part of what was sold, the sale isn't complete until it's done, and September's revenue is $40,000 lower." }
                ]
              },
              {
                id: "dep",
                title: "The new paint line",
                question: "Northline installed $120,000 of painting equipment. How many years will it last?",
                lines: ["Depreciation and amortization"],
                start: "ten",
                options: [
                  { id: "ten", label: "Ten years", tag: "aggressive", fx: { da: 1000 }, note: "$120,000 spread over 120 months is $1,000 a month." },
                  { id: "five", label: "Five years", tag: "conservative", fx: { da: 2000 }, note: "Over 60 months it's $2,000 a month. Same machine, same cash spent, twice the expense." }
                ]
              },
              {
                id: "debt",
                title: "Unpaid invoices",
                question: "Shops owe Northline $90,000. How much of it will never be collected?",
                lines: ["Bad-debt reserve"],
                start: "one",
                options: [
                  { id: "one", label: "About 1%", tag: "aggressive", fx: { reserve: 900 }, note: "A $900 reserve. Reasonable if customers have always paid." },
                  { id: "five", label: "About 5%", tag: "conservative", fx: { reserve: 4500 }, note: "A $4,500 reserve. Reasonable if two shops are already paying late." }
                ]
              },
              {
                id: "sw",
                title: "The new ordering system",
                question: "Northline paid $15,000 to set up new ordering software. Is that an asset or an expense?",
                lines: ["Depreciation and amortization", "Software project, expensed"],
                start: "asset",
                options: [
                  { id: "asset", label: "An asset, amortized over three years", tag: "aggressive", fx: { da: 417 }, note: "Only $417 a month reaches the income statement. The cash still left the bank this month; the cash flow statement shows it under investing instead of operations." },
                  { id: "expense", label: "An expense this month", tag: "conservative", fx: { project: 15000 }, note: "The whole $15,000 hits September. The cash spent is identical either way." }
                ]
              },
              {
                id: "inv",
                title: "Last year's frames",
                question: "$30,000 of frames in last year's colors are still in the warehouse. Are they worth what they cost?",
                lines: ["Inventory write-down"],
                start: "keep",
                options: [
                  { id: "keep", label: "Keep them at cost", tag: "aggressive", fx: {}, note: "No write-down, on the view that they'll sell at a normal price." },
                  { id: "write", label: "Write them down by a quarter", tag: "conservative", fx: { writedown: 7500 }, note: "A $7,500 write-down, on the view that they'll only sell at a discount." }
                ]
              }
            ]
          },
          {
            type: "table",
            eyebrow: "Reference",
            title: "Where the judgment hides",
            columns: ["Estimate", "The judgment", "The aggressive end", "Where it shows"],
            widths: ["11rem", null, null, null],
            rows: [
              ["Revenue recognition", "When a sale is complete enough to count", "Profit arrives sooner", "<span class=\"pl-tag\">Revenue</span> and gross profit"],
              ["Useful life", "How many years equipment will last", "Less depreciation each year", "<span class=\"pl-tag\">Depreciation</span>"],
              ["Bad-debt reserve", "How much of what customers owe won't be paid", "A smaller expense now", "<span class=\"pl-tag\">Operating expenses</span>"],
              ["Asset or expense", "Whether a cost builds something lasting or is used up now", "The cost spreads over years", "<span class=\"pl-tag\">Amortization</span>; the cash shows under investing"],
              ["Inventory value", "Whether stock is still worth what it cost", "No write-down", "<span class=\"pl-tag\">Cost of goods sold</span>"]
            ]
          },
          {
            type: "table",
            eyebrow: "In practice",
            title: "Reading someone else's numbers",
            intro: "Our summary of the questions the chapter prompts.",
            columns: ["Sign", "What to ask"],
            widths: ["20rem", null],
            rows: [
              ["Profit rises while operating cash doesn't, period after period", "Has the business changed, or have the estimates?"],
              ["Equipment is now expected to last longer", "Did the equipment change, or only the assumption?"],
              ["The bad-debt reserve shrinks as receivables grow", "Are customers really paying better?"],
              ["Revenue bunches at the end of each quarter", "When do sales count, and has that changed?"]
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

      // A reference page around the profit-layers tool. Gross, operating and net profit and their
      // margins follow Chapter 9 as I remember it. Northline's year is invented, and the tool
      // shows its income statement.
      "forms-of-profit": {
        title: "The many forms of profit",
        navLabel: "Profit",
        eyebrow: "Part II · Chapter 09",
        layout: "dense",
        dek:
          "“Profit” on its own is ambiguous. An income statement shows several kinds, each a step further down the page, and each answers a different question about the business.",
        blocks: [
          {
            type: "brief",
            eyebrow: "In brief",
            title: "The argument in six points",
            points: [
              {
                t: "“Profit” on its own is ambiguous.",
                d: "An income statement shows several kinds, one below another, and each answers a different question."
              },
              {
                t: "Gross profit: does the product make money?",
                d: "Revenue minus the cost of goods sold."
              },
              {
                t: "Operating profit: is the business run well?",
                d: "Gross profit minus selling, administration, research and depreciation. Often called EBIT: earnings before interest and taxes."
              },
              {
                t: "Net profit: what's left for the owners?",
                d: "Operating profit minus interest, taxes and one-time items. The bottom line."
              },
              {
                t: "Margins make them comparable.",
                d: "Divide each by revenue. Small changes are large in dollars: at $2.4 million of sales, one point of gross margin is $24,000."
              },
              {
                t: "Always ask which profit.",
                d: "Net profit can rise in a year when operations got worse, if a one-time gain or a cheaper loan covers the gap."
              }
            ]
          },
          {
            type: "profit-layers",
            company: "Northline Bikes",
            period: "Last year",
            title: "Which profit moves?",
            intro:
              "A year at Northline, the invented bike maker. Each move below changes one or two lines of the income statement. Switch moves on and off, alone or together, and watch which margins change and which stay put.",
            base: { revenue: 2400000, cogs: 1440000, sm: 300000, ga: 260000, rd: 80000, dep: 70000, interest: 60000, other: 0 },
            taxRate: 0.25,
            otherLabel: "One-time gain",
            startNote: "Northline's year as reported. Pick a move to apply it.",
            foot: "Invented figures. Tax is a flat 25% of profit before tax.",
            moves: [
              {
                id: "price",
                label: "Raise prices 5%",
                amount: "+$120,000 revenue",
                fx: { revenue: 120000 },
                note: "The bikes cost the same to make, so all of the extra revenue reaches gross profit, and every line below it. This assumes no customers walk away over the higher price."
              },
              {
                id: "suppliers",
                label: "Frame suppliers raise their prices",
                amount: "+$72,000 cost of goods",
                fx: { cogs: 72000 },
                note: "Every bike now costs more to make. Gross margin falls first, and every profit line below it falls too."
              },
              {
                id: "marketing",
                label: "Cut the marketing budget by a third",
                amount: "−$100,000 marketing",
                fx: { sm: -100000 },
                note: "Each bike still earns the same, so gross profit doesn't move. Operating profit rises, at least until the missing marketing shows up in next year's sales."
              },
              {
                id: "office",
                label: "Move to a cheaper office",
                amount: "−$40,000 admin",
                fx: { ga: -40000 },
                note: "An overhead cut. It lifts operating profit without touching the product."
              },
              {
                id: "loan",
                label: "Pay off half the loan",
                amount: "−$30,000 interest",
                fx: { interest: -30000 },
                note: "A financing decision. The business runs exactly as before, so gross and operating profit stay put. Only interest, and the lines below it, change."
              },
              {
                id: "warehouse",
                label: "Sell the old warehouse at a gain",
                amount: "+$80,000 one-time gain",
                fx: { other: 80000 },
                note: "A one-off. Net profit jumps, but nothing about making or selling bikes got better. That's why operating profit is usually the better guide to how the business itself is doing."
              }
            ]
          },
          {
            type: "table",
            eyebrow: "Reading down the page",
            title: "Which line a change shows up in",
            columns: ["If this falls", "While this holds", "Look at", "Who usually controls it"],
            rows: [
              ["Gross margin", "–", "Prices, or the cost of making or buying the product", "Managers across the business"],
              ["Operating margin", "Gross margin", "Overheads: selling, administration, research", "Department heads"],
              ["Net margin", "Operating margin", "Financing, taxes or one-time items", "Finance and the board"]
            ],
            foot: "Every line still rests on estimates; see <a href=\"@profit-estimate\">profit is an estimate</a>."
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

      // A reference page around the cash-bridge tool. Building cash flow from net income and
      // balance sheet changes (the indirect method) follows Chapter 18 as I remember it. Northline
      // is invented; the tables are our summary.
      "cash-connects": {
        title: "How cash connects with everything else",
        navLabel: "Cash bridge",
        eyebrow: "Part IV · Chapter 18",
        layout: "dense",
        dek:
          "The cash flow statement isn't a separate story. Start from profit, adjust for every change on the balance sheet, and you arrive at the change in cash, to the dollar.",
        blocks: [
          {
            type: "brief",
            eyebrow: "In brief",
            title: "The argument in five points",
            points: [
              {
                t: "The cash flow statement can be built from the other two.",
                d: "Start from net profit, add back expenses that used no cash, then adjust for every change between two balance sheets."
              },
              {
                t: "Most companies present it this way.",
                d: "Accountants call it the indirect method: it starts from profit and explains the difference."
              },
              {
                t: "An asset rising uses cash.",
                d: "Money is tied up in what customers owe, in stock or in machines."
              },
              {
                t: "A liability rising provides cash.",
                d: "Someone else is waiting to be paid, or has lent you money. Decreases work the other way round."
              },
              {
                t: "It always reconciles.",
                d: "The balance sheet always balances, so every change in cash is matched by changes somewhere else on it."
              }
            ]
          },
          {
            type: "table",
            eyebrow: "The rule of thumb",
            title: "How a balance sheet change moves cash",
            columns: ["Change on the balance sheet", "Effect on cash", "Why"],
            widths: ["14rem", "8rem", null],
            rows: [
              ["Receivables or inventory up", "Uses cash", "Money tied up in what customers owe or in stock"],
              ["Receivables or inventory down", "Provides cash", "Customers paid, or stock was sold without being replaced"],
              ["Payables or accrued expenses up", "Provides cash", "Costs are counted, but not yet paid"],
              ["Payables or accrued expenses down", "Uses cash", "Old bills were paid"],
              ["Equipment bought", "Uses cash (investing)", "It reaches profit only slowly, as depreciation"],
              ["Loans up, or new shares", "Provides cash (financing)", "Borrowed or invested money, never income"]
            ]
          },
          {
            type: "cash-bridge",
            company: "Northline Bikes",
            period: "Last year",
            title: "Build the bridge from profit to cash",
            intro:
              "Northline, the invented bike maker, made $142,500 of net profit last year, but its cash rose by only $17,500. Use the two balance sheets to find out where the rest went. For each change, decide whether it adds cash or uses it.",
            sheetNote: "Start and end of last year · in dollars",
            sheetFoot:
              "Equipment rose $50,000: $120,000 of new machines less $70,000 of depreciation. Equity rose by the year's net profit; no dividends were paid.",
            sheet: [
              { group: "Assets" },
              { label: "Cash", start: 120000, end: 137500, key: true },
              { label: "Receivables", start: 300000, end: 390000 },
              { label: "Inventory", start: 340000, end: 400000 },
              { label: "Equipment, net", start: 600000, end: 650000 },
              { group: "Liabilities and equity" },
              { label: "Payables", start: 180000, end: 205000 },
              { label: "Accrued expenses", start: 60000, end: 70000 },
              { label: "Loan", start: 400000, end: 440000 },
              { label: "Owners' equity", start: 720000, end: 862500 }
            ],
            start: { label: "Net profit", amount: 142500, detail: "From the income statement: the same year as on The many forms of profit." },
            startNote: "Decide each row. The bridge starts at net profit and has to end at the change in the cash account.",
            actualNote: "the cash account went from $120,000 to $137,500, a rise of $17,500.",
            rows: [
              {
                id: "dep",
                label: "Depreciation",
                detail: "A $70,000 expense on the income statement. No cash was paid out for it this year.",
                amount: 70000,
                sign: 1,
                why: "depreciation lowered profit without using any cash, so it's added back."
              },
              {
                id: "ar",
                label: "Receivables",
                detail: "Customers owe $90,000 more than they did a year ago.",
                amount: 90000,
                sign: -1,
                why: "those sales are counted in profit, but the cash hasn't arrived yet."
              },
              {
                id: "inv",
                label: "Inventory",
                detail: "$60,000 more stock is sitting in the warehouse.",
                amount: 60000,
                sign: -1,
                why: "cash went out to make or buy stock that hasn't been sold, so it isn't in profit yet."
              },
              {
                id: "ap",
                label: "Payables",
                detail: "Northline owes its suppliers $25,000 more than a year ago.",
                amount: 25000,
                sign: 1,
                why: "those costs count against profit, but they haven't been paid. The cash is still in the bank for now."
              },
              {
                id: "accr",
                label: "Accrued expenses",
                detail: "Wages and bills recorded but not yet paid rose by $10,000.",
                amount: 10000,
                sign: 1,
                why: "the same logic as payables: the expense is in profit, the cash hasn't left."
              },
              { total: "Cash from operations" },
              {
                id: "capex",
                label: "New equipment",
                detail: "Investing: Northline bought $120,000 of machines.",
                amount: 120000,
                sign: -1,
                why: "buying equipment uses cash. It reaches the income statement only slowly, as depreciation."
              },
              {
                id: "loan",
                label: "Loan",
                detail: "Financing: Northline borrowed another $40,000.",
                amount: 40000,
                sign: 1,
                why: "borrowing brings cash in. It isn't income, so it never touches profit."
              },
              { total: "Change in cash" }
            ]
          },
          {
            type: "table",
            eyebrow: "Reading the bridge",
            title: "Where Northline's profit went",
            intro: "Once the bridge is built.",
            columns: ["", "Amount", "What it shows"],
            widths: ["13rem", "8rem", null],
            rows: [
              ["Receivables and inventory", "−$150,000", "More than the year's profit, absorbed by growth: customers owe more and more stock waits to be sold"],
              ["Payables and accrued expenses", "+$35,000", "Suppliers and unpaid bills covered only part of it"],
              ["New equipment and the loan", "−$120,000, +$40,000", "Neither appears on the income statement, yet both moved cash"]
            ],
            foot: "Next: change how long cash stays tied up in <a href=\"@working-capital\">working capital levers</a>."
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

      // A reference page around the double-entry tool. The accounting equation and where profit
      // lands follow Chapter 13 as I remember it. Northline is invented; the tables are our summary.
      "balance-sheet": {
        title: "Why the balance sheet balances",
        navLabel: "Balance sheet",
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
              {
                t: "Assets = liabilities + equity.",
                d: "One side lists what the company owns; the other lists who has a claim on it: lenders and suppliers, then the owners."
              },
              {
                t: "Every transaction changes at least two lines.",
                d: "Borrow money and cash rises, and so does the loan. That's double-entry bookkeeping, and it's why the totals always match."
              },
              {
                t: "Equity is what's left.",
                d: "Rearranged, the equation says equity is what the company owns minus what it owes."
              },
              {
                t: "Profit lands in equity.",
                d: "Revenue raises equity and expenses lower it. A sale on credit raises receivables and equity; depreciation lowers equipment and equity. No cash moves in either."
              },
              {
                t: "Read it alongside the income statement.",
                d: "Profit says whether the month made money. The balance sheet says what that money turned into."
              }
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
            type: "double-entry",
            company: "Northline Bikes",
            period: "One month",
            title: "Post the entries",
            intro:
              "Eight things happen at Northline, the invented bike maker. For each, choose the two accounts that change and whether each goes up or down, then post it. The scale shows whether the books still balance.",
            sheetNote: "In dollars · start of the month, then after each entry",
            accounts: [
              { id: "cash", label: "Cash", side: "asset" },
              { id: "ar", label: "Receivables", side: "asset" },
              { id: "inv", label: "Inventory", side: "asset" },
              { id: "equip", label: "Equipment", side: "asset" },
              { id: "ap", label: "Payables", side: "claim" },
              { id: "accr", label: "Wages owed", side: "claim" },
              { id: "loan", label: "Bank loan", side: "claim" },
              { id: "equity", label: "Owners' equity", side: "claim" }
            ],
            start: { cash: 120000, ar: 300000, inv: 340000, equip: 600000, ap: 180000, accr: 60000, loan: 400000, equity: 720000 },
            moves: [
              {
                text: "Northline borrows $50,000 from its bank.",
                amount: 50000,
                entries: [["cash", 1], ["loan", 1]],
                why: "Cash comes in, and the bank now has a $50,000 claim on the company. Both sides grow by the same amount.",
                hint: "Borrowing isn't income, so equity doesn't change. Something Northline owns went up, and so did something it owes."
              },
              {
                text: "Northline buys $30,000 of frames from a supplier, to pay next month.",
                amount: 30000,
                entries: [["inv", 1], ["ap", 1]],
                why: "Stock goes up, and so does what Northline owes its supplier. No cash has moved yet.",
                hint: "No cash has changed hands yet. What did Northline get, and who is now owed?"
              },
              {
                text: "Northline pays a supplier $20,000 it already owed.",
                amount: 20000,
                entries: [["cash", -1], ["ap", -1]],
                why: "Cash goes down and so does the debt. Both sides shrink; profit isn't touched, because the cost was recorded when the goods arrived.",
                hint: "Paying a bill that's already on the books isn't a new expense."
              },
              {
                text: "Northline buys a $25,000 welding machine and pays cash.",
                amount: 25000,
                entries: [["equip", 1], ["cash", -1]],
                why: "Cash turns into equipment. One asset swaps for another, so the totals don't change. The cost reaches profit slowly, as depreciation.",
                hint: "Buying equipment isn't an expense on the day you buy it."
              },
              {
                text: "Northline ships $60,000 of bikes to a shop, on 30-day terms.",
                amount: 60000,
                entries: [["ar", 1], ["equity", 1]],
                why: "The shop now owes $60,000, and the sale is revenue. Revenue raises profit, and profit belongs to the owners, so equity goes up.",
                hint: "This is a sale on credit. Where does revenue end up on the balance sheet?"
              },
              {
                text: "Those bikes cost $36,000 to build, and they've left the warehouse.",
                amount: 36000,
                entries: [["inv", -1], ["equity", -1]],
                why: "Inventory falls, and the cost of the bikes sold is an expense, which lowers equity. With the sale, equity rose $24,000 overall: the gross profit.",
                hint: "The bikes are gone, and their cost is now an expense."
              },
              {
                text: "Northline records $10,000 of depreciation on its machines.",
                amount: 10000,
                entries: [["equip", -1], ["equity", -1]],
                why: "The machines are worth $10,000 less on the books, and depreciation is an expense, so equity falls too. No cash moves.",
                hint: "Depreciation is an expense, but nobody gets paid."
              },
              {
                text: "Staff earn $12,000 of wages this month, to be paid next week.",
                amount: 12000,
                entries: [["accr", 1], ["equity", -1]],
                why: "The wages are an expense, so equity falls, and Northline now owes its staff, so a liability rises. Both changes sit on the same side, so the totals don't move at all.",
                hint: "The expense is real this month even though the cash goes out next week."
              }
            ]
          },
          {
            type: "table",
            eyebrow: "Reading it as a manager",
            title: "What the month added up to",
            intro: "Once all eight entries are posted.",
            columns: ["", "Change", "What it means"],
            widths: ["11rem", "8rem", null],
            rows: [
              ["Profit for the month", "+$2,000", "$24,000 of gross profit on the sale, less $10,000 of depreciation and $12,000 of wages"],
              ["Receivables", "+$60,000", "The sale is owed by a customer, not in the bank"],
              ["Equipment", "+$15,000", "A $25,000 machine, less $10,000 of depreciation"],
              ["Bank loan", "+$50,000", "Much of the month's cash came from borrowing"]
            ],
            foot: "Next: turn balance sheet changes into a cash flow statement in <a href=\"@cash-connects\">how cash connects</a>."
          }
        ],
        end: {
          related: [
            { title: "Understanding balance sheet basics", where: "Chapter 10" },
            { title: "The income statement affects the balance sheet", where: "Chapter 14" },
            { title: "Profit ≠ cash", where: "Chapter 16", page: "profit-cash" },
            { title: "How cash connects with everything else", where: "Chapter 18", page: "cash-connects" }
          ],
          cta: { page: "cash-connects", kicker: "Next", text: "Build the bridge from profit to cash" }
        }
      },

      // A reference page. Recognition when earned, and deferred revenue as a liability, follow
      // Chapter 7 as I remember it. The September examples are invented (they were the page's
      // sorting quiz); the second table is our summary.
      revenue: {
        title: "Revenue: the issue is recognition",
        navLabel: "Revenue",
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
              {
                t: "Revenue counts when it's earned.",
                d: "When the product is delivered or the service performed, not when the cash arrives."
              },
              {
                t: "So revenue and cash can sit in different months.",
                d: "A sale on 30-day terms counts on delivery; a deposit for a bike built later doesn't count yet."
              },
              {
                t: "Many deals have no single moment of delivery.",
                d: "A year of servicing is delivered a month at a time; a product sold with installation may not be complete until both are done. Applying the standards takes judgment."
              },
              {
                t: "Cash in advance is a debt.",
                d: "Deposits, gift cards and prepaid contracts are liabilities, often called deferred revenue, until the company delivers."
              },
              {
                t: "Revenue is the first place to look.",
                d: "Counting sales a little early is one of the simplest ways to make a quarter look better. See <a href=\"@profit-estimate\">profit is an estimate</a>."
              }
            ]
          },
          {
            type: "table",
            eyebrow: "Worked examples",
            title: "Does it count in September?",
            intro: "Eight things that happen at Northline Bikes, the invented bike maker, in September.",
            columns: ["What happens", "September revenue", "Why"],
            widths: [null, "11rem", null],
            rows: [
              ["Northline ships $40,000 of bikes to a shop on 30-day terms. No cash has arrived yet.", "$40,000", "The bikes are delivered, so the sale is earned. When the shop pays only changes cash and receivables."],
              ["A rider pays a $2,000 deposit for a custom bike to be delivered in November.", "$0", "Nothing has been delivered. Until November the deposit is a liability: Northline owes a bike or the money back."],
              ["A delivery company pays $12,000 on September 1 for a year of servicing.", "$1,000", "The service is delivered month by month, so the revenue is too: a twelfth now."],
              ["Northline sells $5,000 of gift cards. None has been used yet.", "$0", "A gift card is a promise to deliver later. It becomes revenue when it's spent."],
              ["A shop pays $18,000 for bikes delivered in August.", "$0", "That sale was counted in August. The payment turns a receivable into cash."],
              ["Northline delivers $15,000 of bikes to a school that paid in July.", "$15,000", "Delivery happens now. The July payment sat on the balance sheet as a liability until today."],
              ["Ten riders each pay $900 for a three-month course that starts September 1.", "$3,000", "A third of the course is delivered in September, so a third of the $9,000 counts."],
              ["Northline signs a $100,000 contract to supply a bike-share scheme next spring.", "$0", "Signing isn't delivering. Good news for next year, not this month."]
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

      // A reference page around the ratios tool. The four families follow Part V as I remember it.
      // Northline's two years are invented.
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
              {
                t: "A single number says little.",
                d: "Is $750,000 of profit good? It depends on the sales, the assets and the money behind it."
              },
              {
                t: "Ratios put two numbers side by side.",
                d: "So companies of different sizes, or one company in different years, can be compared."
              },
              {
                t: "They come in four families.",
                d: "Profitability, leverage, liquidity and efficiency, each answering a different question."
              },
              {
                t: "Read across the families.",
                d: "The useful story comes from several ratios moving together, not from any one."
              },
              {
                t: "Northline is growing into a cash squeeze.",
                d: "Sales rose a fifth and profit rose, but customers pay later, stock sits longer, suppliers are paid sooner, and debt filled the gap."
              }
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
            eyebrow: "Reference",
            title: "Four families of ratios",
            columns: ["Family", "The question", "Ratios in the tool", "Chapter"],
            widths: ["9rem", null, null, "6rem"],
            rows: [
              ["Profitability", "How much of each sales dollar does the company keep?", "Gross, operating and net margin; return on assets; return on equity", "20"],
              ["Leverage", "How much does it rely on borrowed money?", "Debt to equity; interest coverage", "21"],
              ["Liquidity", "Can it pay its bills as they come due?", "Current ratio; quick ratio", "22"],
              ["Efficiency", "How well does it use its assets?", "Days sales outstanding, days in inventory, days payable; asset turnover", "23"]
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

      // A reference page. The three categories, and interest paid as operating cash under US
      // rules, follow Chapter 17 as I remember it. The eight examples are invented (they were the
      // page's sorting quiz); the patterns table is our summary.
      "cash-flow-language": {
        title: "The language of cash flow",
        navLabel: "Cash flow",
        eyebrow: "Part IV · Chapter 17",
        layout: "dense",
        dek:
          "The cash flow statement sorts every dollar in and out into three buckets: operating, investing and financing. Which bucket a dollar lands in tells you whether the business is paying its own way.",
        blocks: [
          {
            type: "brief",
            eyebrow: "In brief",
            title: "The argument in five points",
            points: [
              {
                t: "Every dollar lands in one of three buckets.",
                d: "Operating, investing or financing. Add them up and you get the change in cash, exactly the change in the balance sheet's cash line."
              },
              {
                t: "Operating: running the business.",
                d: "Collecting from customers, paying suppliers and staff, paying interest and taxes."
              },
              {
                t: "Investing: long-lived assets.",
                d: "Buying or selling equipment, buildings and other assets that last for years."
              },
              {
                t: "Financing: the people who fund it.",
                d: "Borrowing and repaying, issuing shares, paying dividends."
              },
              {
                t: "The bucket tells you who's paying.",
                d: "An established business usually funds itself from operations. A business can live on financing for a while, but not forever. See <a href=\"@profit-cash\">profit isn't cash</a>."
              }
            ]
          },
          {
            type: "table",
            eyebrow: "Reference",
            title: "The three buckets",
            columns: ["", "Operating", "Investing", "Financing"],
            widths: ["8rem", null, null, null],
            rows: [
              ["Cash in from", "Customers", "Selling equipment or property", "Lenders and new shareholders"],
              ["Cash out to", "Suppliers, staff, landlords, lenders' interest, tax", "Buying equipment or property", "Repaying loans, dividends, buying back shares"],
              ["One surprise", "Interest paid counts here under US rules", "–", "The loan itself is here, but not its interest"]
            ]
          },
          {
            type: "table",
            eyebrow: "Worked examples",
            title: "Where each one goes",
            intro: "Eight things that happen at Northline Bikes, the invented bike maker, in a year.",
            columns: ["What happens", "Bucket", "Why"],
            widths: [null, "8rem", null],
            rows: [
              ["A bike shop pays Northline's invoice.", "Operating", "Collecting from customers is the heart of operating cash."],
              ["Northline buys a new paint line.", "Investing", "Equipment lasts for years."],
              ["Northline borrows $500,000 from the bank.", "Financing", "Money from a lender."],
              ["Northline pays its frame supplier.", "Operating", "Paying for materials is part of running the business."],
              ["Northline pays interest on its loan.", "Operating", "Under US rules interest paid is operating, even though the loan is financing."],
              ["Northline sells an old warehouse.", "Investing", "Selling a long-lived asset."],
              ["The owners take a dividend.", "Financing", "Cash going back to owners."],
              ["Northline repays part of the loan.", "Financing", "Repaying what was borrowed. Only the interest is operating."]
            ]
          },
          {
            type: "table",
            eyebrow: "Patterns",
            title: "What the three signs often mean",
            intro: "Our summary. A plus means cash in, a minus cash out.",
            columns: ["Operating", "Investing", "Financing", "Often means"],
            widths: ["7rem", "7rem", "7rem", null],
            rows: [
              ["+", "−", "−", "An established business paying for its own investment and returning cash to lenders or owners"],
              ["+", "−", "+", "A business investing faster than its own cash allows, with lenders or owners making up the rest"],
              ["−", "−", "+", "A young or struggling business living on outside money"],
              ["−", "+", "+", "A business selling assets and borrowing to cover its operations: a warning sign"]
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

      // A reference page around the now-or-later tool. Time value, present value, cost of capital
      // and the hurdle rate follow Part VI as I remember it. The present values are computed;
      // Northline's 12% hurdle rate is invented.
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
            title: "The argument in six points",
            points: [
              {
                t: "A dollar today is worth more than a dollar later.",
                d: "Money you have now can be invested, lent or used to pay down debt in the meantime."
              },
              {
                t: "Growth on growth is compounding.",
                d: "At 8% a year, $10,000 grows to $10,800 after one year and $14,693 after five."
              },
              {
                t: "Present value runs it backwards.",
                d: "Future amount ÷ (1 + rate)<sup>years</sup>. $14,693 in five years is worth $10,000 today, at 8%."
              },
              {
                t: "The rate is the cost of capital.",
                d: "A blend of the interest on loans and the higher return owners expect, because owners take more risk than lenders."
              },
              {
                t: "The hurdle rate is the bar.",
                d: "The minimum a project must return to be approved, usually at or above the cost of capital. The invented Northline uses 12%."
              },
              {
                t: "Long waits are hit hardest.",
                d: "The rate compounds once a year, so late payoffs need a strong case. Next: <a href=\"@roi\">figuring ROI</a>."
              }
            ]
          },
          {
            type: "table",
            eyebrow: "Present value",
            title: "What $10,000 later is worth today",
            columns: ["Received in", "At 3%", "At 8%", "At 12%"],
            widths: ["9rem", null, null, null],
            rows: [
              ["1 year", "$9,709", "$9,259", "$8,929"],
              ["2 years", "$9,426", "$8,573", "$7,972"],
              ["5 years", "$8,626", "$6,806", "$5,674"],
              ["10 years", "$7,441", "$4,632", "$3,220"]
            ]
          },
          {
            type: "now-or-later",
            title: "Now or later?",
            intro:
              "Five offers, each a bigger sum paid later instead of $10,000 today. Move the rate, which stands for the return you could earn on the money in the meantime, and watch which offers stay worth waiting for.",
            rateLabel: "Rate",
            rateHint: "The return the money could earn elsewhere: a savings account, paying down a loan, or the company's hurdle rate.",
            rate: { start: 0.05, min: 0, max: 0.2, step: 0.005 },
            presets: [
              { label: "No return (0%)", rate: 0 },
              { label: "A savings account (3%)", rate: 0.03 },
              { label: "Northline's hurdle rate (12%)", rate: 0.12 }
            ],
            now: 10000,
            offers: [
              { amount: 10300, years: 1 },
              { amount: 11236, years: 2 },
              { amount: 13225, years: 2 },
              { amount: 15386, years: 5 },
              { amount: 31058, years: 10 }
            ],
            foot: "Each offer is built to break even at a different rate: 3%, 6%, 15%, 9% and 12% in the order shown. Below its rate the later money wins; above it, the money now does."
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
              ["Hurdle rate", "The minimum a project must return to be approved", "At or above the cost of capital, and higher for riskier projects"]
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

      // A reference page around the ROI calculator. Payback, net present value and internal rate
      // of return follow Part VI as I remember it. The welding robot is invented; the second
      // table's figures are the calculator's own results, checked in tests/exercises.test.js.
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
            title: "The argument in five points",
            points: [
              {
                t: "ROI asks whether a project pays for itself.",
                d: "Does the cash it brings in, counted at today's value, beat what it costs?"
              },
              {
                t: "Payback: how fast does the money come back?",
                d: "Simple, but it ignores timing and everything after the payback date."
              },
              {
                t: "Net present value: how much value does it add?",
                d: "Discount each year's cash to today at the hurdle rate and subtract the cost. Positive means it clears the hurdle."
              },
              {
                t: "Internal rate of return: what return does it earn?",
                d: "The rate at which net present value is zero. Above the hurdle rate, the project clears it."
              },
              {
                t: "The estimates are the decision.",
                d: "Savings, life and rate are all judgments, and small changes swing the answer, the same lesson as <a href=\"@profit-estimate\">profit is an estimate</a>."
              }
            ]
          },
          {
            type: "roi-calculator",
            company: "Northline Bikes",
            title: "The welding robot",
            intro:
              "A robotic welding cell costs $400,000 today. Engineering estimates it will save about $110,000 a year in labor and rework for six years. Move the estimates and the hurdle rate and watch the answer change.",
            cost: 400000,
            start: { savings: 110000, years: 6, rate: 10 },
            ranges: { savings: [40000, 200000, 5000], years: [2, 12], rate: [2, 20] }
          },
          {
            type: "table",
            eyebrow: "Reference",
            title: "Three methods",
            columns: ["Method", "The question", "Approve when", "Blind spot"],
            widths: ["11rem", null, null, null],
            rows: [
              ["Payback", "How many years until the cost comes back?", "It's shorter than a set limit", "Ignores the time value of money and anything after payback"],
              ["Net present value", "How much value does it add, in today's dollars?", "It's above zero at the hurdle rate", "Only as good as the rate and the estimates"],
              ["Internal rate of return", "What return does it earn?", "It's above the hurdle rate", "Says nothing about size: a small project can have a high rate"]
            ]
          },
          {
            type: "table",
            eyebrow: "Worked example",
            title: "The welding robot, two ways",
            intro: "$400,000 today, six years of savings, a 10% hurdle rate: the calculator's starting values, and one change.",
            columns: ["Savings a year", "Payback", "Net present value", "Internal rate of return", "At a 10% hurdle"],
            rows: [
              ["$110,000", "3.6 years", "+$79,079", "16.5%", "Clears it"],
              ["$90,000", "4.4 years", "−$8,027", "9.3%", "Falls short, though payback still looks reasonable"]
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

      // A reference page around the working-capital levers, which draw the cash conversion
      // cycle themselves. DSO, DIO, DPO and the cycle follow Part VII as I remember it. Northline
      // is invented; a day's value is its $12 million of revenue, or $7.2 million of cost of
      // goods sold, divided by 365.
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
            title: "The argument in six points",
            points: [
              {
                t: "Much of the gap between profit and cash sits in three numbers.",
                d: "How long customers take to pay, how long stock sits, and how long you take to pay suppliers."
              },
              {
                t: "Each is measured in days.",
                d: "Days sales outstanding, days in inventory and days payable outstanding."
              },
              {
                t: "Together they make the cash conversion cycle.",
                d: "Days in inventory plus days sales outstanding, minus days payable: how long a dollar is tied up between paying for materials and collecting from a customer."
              },
              {
                t: "Each day is worth a lot.",
                d: "At $12 million of sales, collecting one day sooner frees about $33,000 for as long as it lasts. None of it changes profit."
              },
              {
                t: "Managers across the company hold the levers.",
                d: "Sales sets payment terms, operations decides how much stock to hold, purchasing negotiates with suppliers."
              },
              {
                t: "Stretching suppliers has a cost.",
                d: "Lost discounts, worse prices, or suppliers who stop putting you first."
              }
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
            eyebrow: "Reference",
            title: "Three levers, measured in days",
            columns: ["Lever", "What it measures", "Formula", "Who moves it", "A day at Northline"],
            widths: ["11rem", null, null, null, "8rem"],
            rows: [
              ["Days sales outstanding (DSO)", "How long, on average, customers take to pay", "Receivables ÷ (revenue ÷ 365)", "Sales and finance: terms, credit checks, collections", "$32,877"],
              ["Days in inventory (DIO)", "How long stock sits before it's sold", "Inventory ÷ (cost of goods sold ÷ 365)", "Operations and purchasing", "$19,726"],
              ["Days payable outstanding (DPO)", "How long the company takes to pay suppliers", "Payables ÷ (cost of goods sold ÷ 365)", "Purchasing and finance", "$19,726"]
            ],
            foot: "Collecting ten days sooner, from 55 days to 45, frees about $329,000."
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

      // A reference page around the three-statements tool. Profit and cash as different measures,
      // and how the statements tie, follow Part IV as I remember it. Northline is invented; the
      // tables are our summary.
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
            title: "The argument in six points",
            points: [
              {
                t: "A profitable company can run out of cash.",
                d: "Profit measures how the business performed over a period. Cash is what's in the bank. They follow different rules."
              },
              {
                t: "Revenue counts on delivery.",
                d: "A sale is recorded when the product ships, not when the customer pays."
              },
              {
                t: "Costs are matched to sales.",
                d: "Materials become an expense when the products they go into are sold, not when they're bought."
              },
              {
                t: "Equipment is spread over its life.",
                d: "Its cost reaches profit a little at a time, as depreciation, though the cash left all at once."
              },
              {
                t: "The three statements tie together.",
                d: "Net income becomes retained earnings and starts the cash flow statement; its last line is the cash on the balance sheet."
              },
              {
                t: "Most of the gap is working capital.",
                d: "Money tied up in receivables and inventory, offset by what's owed to suppliers. See <a href=\"@working-capital\">working capital levers</a>."
              }
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
            title: "Four rules that pull profit and cash apart",
            columns: ["Rule", "Profit moves", "Cash moves"],
            widths: ["13rem", null, null],
            rows: [
              ["Revenue counts on delivery", "When the goods ship", "When the customer pays"],
              ["Costs are matched to sales", "When the products are sold", "When suppliers are paid"],
              ["Equipment is depreciated", "A slice each month, for years", "All at once, when it's bought"],
              ["Borrowing isn't income", "Not at all (only the interest)", "In when borrowed, out when repaid"]
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
