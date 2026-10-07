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
    nav: ["profit-estimate", "profit-cash", "working-capital"],

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
          { n: 7, title: "Revenue: the issue is recognition", blurb: "A sale counts when it's earned, which may be long before it's paid." },
          { n: 8, title: "Costs and expenses", blurb: "Few hard-and-fast rules, and plenty of room for judgment." },
          { n: 9, title: "The many forms of profit", blurb: "Gross, operating and net profit, and what each tells you." }
        ]
      },
      {
        n: "III",
        title: "The balance sheet reveals the most",
        chapters: [
          { n: 10, title: "Understanding balance sheet basics", blurb: "What a company owns, what it owes, and what's left for the owners." },
          { n: 11, title: "Assets: more estimates and assumptions", blurb: "Every asset but cash involves a judgment about value." },
          { n: 12, title: "On the other side: liabilities and equity", blurb: "Who has a claim on the assets, and in what order." },
          { n: 13, title: "Why the balance sheet balances", blurb: "Assets always equal liabilities plus equity, by construction." },
          { n: 14, title: "The income statement affects the balance sheet", blurb: "Profit flows into equity; sales and costs move assets and liabilities." }
        ]
      },
      {
        n: "IV",
        title: "Cash is king",
        chapters: [
          { n: 15, title: "Cash is a reality check", blurb: "Cash involves fewer estimates than profit, so it's harder to fudge." },
          { n: 16, title: "Profit ≠ cash (and you need both)", blurb: "Why a profitable company can run short of cash.", page: "profit-cash" },
          { n: 17, title: "The language of cash flow", blurb: "Operating, investing and financing: the three sources and uses of cash." },
          { n: 18, title: "How cash connects with everything else", blurb: "Tying the cash flow statement back to the other two." }
        ]
      },
      {
        n: "V",
        title: "Ratios: what the numbers are really telling you",
        chapters: [
          { n: 19, title: "The power of ratios", blurb: "Comparing numbers to each other shows what totals hide." },
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
          { title: "The building blocks of ROI", blurb: "Time value of money, cost of capital and the hurdle rate." },
          { title: "Figuring ROI", blurb: "Payback, net present value and internal rate of return, worked through." }
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
      "profit-estimate": {
        title: "Profit is an estimate",
        eyebrow: "Part II · Chapter 05",
        dek:
          "Revenue, costs and profit all depend on judgment calls about timing and value. Two careful accountants can report different profits for the same month, while the cash in the bank doesn't change at all.",
        blocks: [
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
            type: "prose",
            sections: [
              {
                n: "1",
                title: "Where the judgment hides",
                paras: [
                  "The income statement looks precise, down to the dollar, but many of its lines are estimates. When a sale counts, how long equipment lasts, how many customers won't pay, what old stock is worth: each is a judgment, and accounting rules allow a range of reasonable answers.",
                  "Berman and Knight's point is not that accountants are cooking the books. It is that profit rests on assumptions, and a manager who knows where they sit can ask better questions about any set of numbers."
                ],
                side: {
                  label: "In the book",
                  html: "<p>Part I calls this the art of finance: the parts of accounting that rest on judgment rather than rules.</p>"
                }
              },
              {
                n: "2",
                title: "Why cash doesn't move",
                paras: [
                  "None of the five choices changes what actually happened in September. The same bikes shipped and the same bills were paid, so the change in cash is the same under every combination. That is why the authors treat cash as a reality check on profit."
                ],
                side: {
                  label: "Next",
                  html: "<p>See how profit and cash part ways event by event in <a href=\"@profit-cash\">Profit isn't cash</a>.</p>"
                }
              },
              {
                n: "3",
                title: "Reading someone else's numbers",
                paras: [
                  "When profit jumps, it's worth asking whether the business changed or the estimates did. A longer assumed equipment life, a smaller bad-debt reserve or a change in when revenue counts can each lift profit without a single extra sale."
                ],
                side: {
                  label: "A quick test",
                  html: "<p>Compare profit with cash from operations over several periods. If profit keeps rising while operating cash doesn't, look at the estimates.</p>"
                }
              }
            ]
          }
        ],
        end: {
          related: [
            { title: "The rules accountants follow", where: "Chapter 4" },
            { title: "Revenue: the issue is recognition", where: "Chapter 7" },
            { title: "Assets: more estimates and assumptions", where: "Chapter 11" },
            { title: "Profit ≠ cash", where: "Chapter 16", page: "profit-cash" }
          ],
          cta: { page: "profit-cash", kicker: "Next", text: "Watch profit and cash part ways" }
        }
      },

      "working-capital": {
        title: "Working capital levers",
        navLabel: "Working capital",
        eyebrow: "Part VII · Working capital",
        dek:
          "Much of the gap between profit and cash sits in three numbers: how long customers take to pay, how long inventory sits, and how long you take to pay suppliers. Move them and cash appears or disappears, with no change in profit.",
        blocks: [
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
            type: "prose",
            sections: [
              {
                n: "1",
                title: "Three levers, measured in days",
                paras: [
                  "Days sales outstanding is how long, on average, customers take to pay. Days in inventory is how long stock sits before it's sold. Days payable outstanding is how long the company takes to pay its suppliers.",
                  "Add the first two and subtract the third to get the cash conversion cycle: the number of days a dollar is tied up between paying for materials and collecting from a customer."
                ],
                side: {
                  label: "The formulas",
                  html: "<p>DSO = receivables ÷ (revenue ÷ 365)<br>DIO = inventory ÷ (cost of goods sold ÷ 365)<br>DPO = payables ÷ (cost of goods sold ÷ 365)</p>"
                }
              },
              {
                n: "2",
                title: "Why small changes matter",
                paras: [
                  "At any real scale, each day is worth a lot of money. At Northline's size, collecting from customers one day sooner puts about $33,000 back in the bank for as long as the faster collection lasts. None of it changes profit."
                ],
                side: {
                  label: "Try this",
                  html: "<p>Bring DSO from 55 down to 45 days. Ten days of faster collection frees about $329,000.</p>"
                }
              },
              {
                n: "3",
                title: "Who controls the levers",
                paras: [
                  "These numbers aren't only finance's job. Sales sets payment terms, operations decides how much stock to hold, and purchasing negotiates with suppliers. Managers across the company move cash every day, whether or not they see it."
                ],
                side: {
                  label: "A caution",
                  html: "<p>Stretching suppliers too far has costs of its own: lost discounts, worse prices, or suppliers who stop putting you first.</p>"
                }
              }
            ]
          }
        ],
        end: {
          related: [
            { title: "Cash is a reality check", where: "Chapter 15" },
            { title: "Profit ≠ cash", where: "Chapter 16", page: "profit-cash" },
            { title: "The language of cash flow", where: "Chapter 17" },
            { title: "Efficiency ratios", where: "Chapter 23" }
          ],
          cta: { page: "profit-cash", kicker: "See it event by event", text: "Profit isn't cash" }
        }
      },

      "profit-cash": {
        title: "Profit isn't cash",
        crumb: "Profit isn't cash",
        navLabel: "Profit vs. cash",
        eyebrow: "Part IV · Chapter 16",
        dek:
          "A company can report a healthy profit and still run out of money. The income statement, balance sheet and cash flow statement each tell part of the story. Run one month of business through all three and watch where profit and cash part ways.",
        blocks: [
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
            type: "prose",
            sections: [
              {
                n: "1",
                title: "Why profit and cash come apart",
                paras: [
                  "The income statement follows accounting rules about <em>when</em> revenue and costs count. A sale is recorded when the product is delivered, not when the customer pays. The cost of the product is recorded in the same period as the sale, not when the materials were bought. Long-lived equipment is spread over its useful life as depreciation.",
                  "Each rule is sensible on its own. Together they mean profit measures how well the business performed over a period, while cash is simply what is in the bank. Berman and Knight's point is that a manager needs both numbers, and needs to know why they differ."
                ],
                side: {
                  label: "In the book",
                  html: "<p>Part II argues that profit is an estimate, built on judgments about timing and value. Cash involves far fewer of those judgments.</p>"
                }
              },
              {
                n: "2",
                title: "How the three statements connect",
                paras: [
                  "Net income at the bottom of the income statement becomes an increase in retained earnings on the balance sheet. The cash flow statement starts from that same net income and adjusts it, line by line, for everything that changed cash differently from profit: depreciation, and changes in receivables, inventory and payables.",
                  "Its last line, cash at the end of the period, is the cash on the balance sheet. That is why the statements always tie out. Hover over net income or cash in the simulator to see the same number in two places."
                ],
                side: {
                  label: "Try this",
                  html: "<p>Ship bikes, then record depreciation. Profit and cash now differ for two reasons, and the cash flow statement shows each one on its own line.</p>"
                }
              },
              {
                n: "3",
                title: "What managers can do about it",
                paras: [
                  "Most of the gap between profit and cash sits in working capital: money tied up in receivables and inventory, offset by what is owed to suppliers. Collecting from customers sooner, holding less inventory and negotiating longer payment terms all turn profit into cash faster, without changing profit at all."
                ],
                side: {
                  label: "Later in the book",
                  html: "<p>Part VII treats these as balance sheet levers, measured in days: how long customers take to pay, how long stock sits, and how long you take to pay suppliers.</p>"
                }
              }
            ]
          }
        ],
        end: {
          related: [
            { title: "Profit is an estimate", where: "Chapter 5", page: "profit-estimate" },
            { title: "The income statement affects the balance sheet", where: "Chapter 14" },
            { title: "The language of cash flow", where: "Chapter 17" },
            { title: "Working capital levers", where: "Part VII", page: "working-capital" }
          ],
          cta: { page: "", kicker: "Contents", text: "See the map of the book" }
        }
      }
    }
  });
})();
