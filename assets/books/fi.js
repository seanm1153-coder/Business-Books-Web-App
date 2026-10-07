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
      { kicker: "Start here", title: "Profit isn't cash", desc: "Run a month of business through all three statements.", page: "profit-cash" }
    ],
    mapTitle: "Eight parts, from profit to cash to return on investment",
    contentsDesc: "Eight parts, from the income statement to ratios and working capital.",
    mapNote: "Pages open as they're written. Chapter numbers in Parts VI to VIII are still being checked against the book.",
    nav: ["profit-cash"],

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
          { n: 5, title: "Profit is an estimate", blurb: "Profit depends on when revenue and costs are counted, not just on what happened." },
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
          { title: "Your balance sheet levers", blurb: "Days sales outstanding, days in inventory and days payable." },
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
            { title: "Profit is an estimate", where: "Chapter 5" },
            { title: "The income statement affects the balance sheet", where: "Chapter 14" },
            { title: "The language of cash flow", where: "Chapter 17" },
            { title: "Working capital levers", where: "Part VII" }
          ],
          cta: { page: "", kicker: "Contents", text: "See the map of the book" }
        }
      }
    }
  });
})();
