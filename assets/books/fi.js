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
          { n: 7, title: "Revenue: the issue is recognition", blurb: "A sale counts when it's earned, which may be long before it's paid." },
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
          { n: 17, title: "The language of cash flow", blurb: "Operating, investing and financing: the three sources and uses of cash.", page: "cash-flow-language" },
          { n: 18, title: "How cash connects with everything else", blurb: "Tying the cash flow statement back to the other two." }
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
          { title: "The building blocks of ROI", blurb: "Time value of money, cost of capital and the hurdle rate." },
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
      "profit-estimate": {
        navLabel: "Estimates",
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

      "forms-of-profit": {
        title: "The many forms of profit",
        navLabel: "Profit",
        eyebrow: "Part II · Chapter 09",
        dek:
          "“Profit” on its own is ambiguous. An income statement shows several kinds, each a step further down the page, and each answers a different question about the business.",
        blocks: [
          {
            type: "prose",
            sections: [
              {
                n: "1",
                title: "Three questions, three profits",
                paras: [
                  "<strong>Gross profit</strong> is revenue minus the cost of goods sold: what's left from sales after paying to make or buy what was sold. It asks whether the product itself makes money.",
                  "<strong>Operating profit</strong> takes gross profit and subtracts the costs of running the business: selling, administration, research, depreciation. It asks whether the company as a whole is run well. It's often called EBIT, for earnings before interest and taxes.",
                  "<strong>Net profit</strong> subtracts the rest: interest to lenders, taxes, and one-time gains or losses. It is the bottom line, and it asks what's left for the owners."
                ],
                side: {
                  label: "In the book",
                  html: "<p>Berman and Knight walk down the income statement line by line in the chapters before this one. This chapter is about what each subtotal is for.</p>"
                }
              },
              {
                n: "2",
                title: "Margins make them comparable",
                paras: [
                  "Divide each profit by revenue and you get a margin: gross margin, operating margin, net margin. Margins let you compare one year with another, or one company with another, even when they differ in size.",
                  "Small changes in margin are large in dollars. At Northline, with $2.4 million of sales, one point of gross margin is $24,000, nearly a tenth of the year's operating profit."
                ],
                side: {
                  label: "See also",
                  html: "<p>Margins are the profitability ratios. <a href=\"@ratios\">Reading the ratios</a> compares them across two years.</p>"
                }
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
            type: "prose",
            sections: [
              {
                n: "3",
                title: "Reading down the page",
                paras: [
                  "Each subtotal isolates a different part of the business. A fall in gross margin points at prices or production costs. A fall in operating margin with gross margin steady points at overheads. A change in net margin with operating margin steady points at financing, taxes or one-off items.",
                  "So when someone says profit went up, the first question is which profit. A company can report higher net profit in a year when its operations got worse, if a one-time gain or a cheaper loan covers the gap."
                ],
                side: {
                  label: "Try this",
                  html: "<p>Switch on “Sell the old warehouse.” Net profit rises by more than 40% while operating margin doesn't move at all.</p>"
                }
              },
              {
                n: "4",
                title: "Which one is yours?",
                paras: [
                  "Most managers have the most influence over the top half of the statement: prices, production costs and operating expenses. Interest and taxes are usually set elsewhere. That makes gross and operating margin the numbers a manager can most directly move, and the ones worth knowing for their own part of the business."
                ],
                side: {
                  label: "A caution",
                  html: "<p>Every line here still rests on estimates. <a href=\"@profit-estimate\">Profit is an estimate</a> shows how much judgment sits inside them.</p>"
                }
              }
            ]
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

      ratios: {
        title: "Reading the ratios",
        navLabel: "Ratios",
        eyebrow: "Part V · Chapters 19–23",
        dek:
          "A single number says little. Ratios compare one number with another, and comparing them across years shows what the totals hide. Here is a growing company whose profit looks fine and whose ratios tell a more worried story.",
        blocks: [
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
            type: "prose",
            sections: [
              {
                n: "1",
                title: "Why ratios",
                paras: [
                  "Totals are hard to judge on their own. Is $750,000 of profit good? It depends on the sales, the assets and the money behind it. Ratios put two numbers side by side so that companies of different sizes, or one company in different years, can be compared.",
                  "The authors group them into families: profitability, leverage, liquidity and efficiency. Each family answers a different question, and the useful reading comes from looking across them."
                ],
                side: {
                  label: "In the book",
                  html: "<p>Part V works through each family in turn and closes with the ratios outside investors watch.</p>"
                }
              },
              {
                n: "2",
                title: "What Northline's ratios say",
                paras: [
                  "On the income statement, last year looks like a success: sales up 20%, profit up. The ratios tell the rest. Customers are paying more slowly, stock is piling up, suppliers are being paid sooner, and the gap is being filled with debt. Cash fell from $900,000 to $350,000.",
                  "None of this shows up as a loss. It shows up as a company that is growing into a cash squeeze."
                ],
                side: {
                  label: "See also",
                  html: "<p>Move the same levers yourself in <a href=\"@working-capital\">Working capital levers</a>.</p>"
                }
              }
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

      "cash-flow-language": {
        title: "The language of cash flow",
        navLabel: "Cash flow",
        eyebrow: "Part IV · Chapter 17",
        dek:
          "The cash flow statement sorts every dollar in and out into three buckets: operating, investing and financing. Which bucket a dollar lands in tells you whether the business is paying its own way.",
        blocks: [
          {
            type: "prose",
            sections: [
              {
                n: "1",
                title: "Three buckets",
                paras: [
                  "Operating cash comes from running the business: collecting from customers, paying suppliers and staff, paying interest and taxes. Investing cash goes into, or comes out of, long-lived assets such as equipment and buildings. Financing cash moves between the company and the people who fund it: borrowing and repaying, issuing shares, paying dividends.",
                  "Add the three together and you get the change in cash for the period, which is exactly the change in the cash line on the balance sheet."
                ],
                side: {
                  label: "One surprise",
                  html: "<p>Under US accounting rules, interest paid is an operating cash flow, even though the loan itself is financing.</p>"
                }
              }
            ]
          },
          {
            type: "sorter",
            title: "Operating, investing or financing?",
            intro:
              "Eight things that happen at Northline Bikes in a year. Put each one in the bucket where the cash flow statement would report it.",
            options: [
              { id: "op", label: "Operating", hint: "Running the business" },
              { id: "inv", label: "Investing", hint: "Long-lived assets" },
              { id: "fin", label: "Financing", hint: "Lenders and owners" }
            ],
            rewriteLabel: "",
            items: [
              { text: "A bike shop pays Northline's invoice.", answer: "op", why: "Collecting from customers is the heart of operating cash." },
              { text: "Northline buys a new paint line.", answer: "inv", why: "Equipment lasts for years, so the cash spent on it is investing." },
              { text: "Northline borrows $500,000 from the bank.", answer: "fin", why: "Money from a lender is financing." },
              { text: "Northline pays its frame supplier.", answer: "op", why: "Paying for materials is part of running the business." },
              { text: "Northline pays interest on its loan.", answer: "op", why: "The surprise: under US rules, interest paid is an operating cash flow, even though the loan itself is financing." },
              { text: "Northline sells an old warehouse.", answer: "inv", why: "Selling a long-lived asset brings in investing cash." },
              { text: "The owners take a dividend.", answer: "fin", why: "Cash going back to owners is financing." },
              { text: "Northline repays part of the loan.", answer: "fin", why: "Repaying the amount borrowed is financing. Only the interest counts as operating." }
            ]
          },
          {
            type: "prose",
            sections: [
              {
                n: "2",
                title: "What healthy looks like",
                paras: [
                  "A healthy, established business usually generates cash from operations and uses some of it to invest and to pay lenders or owners. A young company may show negative operating cash funded by borrowing or new shares. That can be fine for a while, but a business can't run on financing forever."
                ],
                side: {
                  label: "See also",
                  html: "<p>Watch all three buckets move in <a href=\"@profit-cash\">Profit isn't cash</a>.</p>"
                }
              }
            ]
          }
        ],
        end: {
          related: [
            { title: "Profit ≠ cash", where: "Chapter 16", page: "profit-cash" },
            { title: "How cash connects with everything else", where: "Chapter 18" },
            { title: "Working capital levers", where: "Part VII", page: "working-capital" },
            { title: "Reading the ratios", where: "Part V", page: "ratios" }
          ],
          cta: { page: "profit-cash", kicker: "See it in action", text: "Watch the three buckets fill" }
        }
      },

      roi: {
        title: "Figuring ROI",
        navLabel: "ROI",
        eyebrow: "Part VI · Return on investment",
        dek:
          "Should Northline buy the machine? Return on investment asks whether the cash a project brings in, counted at today's value, beats what it costs. The book works through three ways to answer: payback, net present value and internal rate of return.",
        blocks: [
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
            type: "prose",
            sections: [
              {
                n: "1",
                title: "Money later is worth less",
                paras: [
                  "A dollar saved five years from now is worth less than a dollar today, because today's dollar could be earning a return in the meantime. So each future year's savings is discounted back to today's value, at a rate that reflects what the company's money costs and what else it could do with it. Companies call that rate the hurdle rate."
                ],
                side: {
                  label: "In the book",
                  html: "<p>Part VI builds up the time value of money, the cost of capital and the hurdle rate before working through each method.</p>"
                }
              },
              {
                n: "2",
                title: "Three answers to three questions",
                paras: [
                  "Payback asks how fast the money comes back. It's simple and ignores both timing and anything after the payback date. Net present value asks how much value the project adds in today's dollars; positive means it beats the hurdle. Internal rate of return asks what return the project earns; if it's above the hurdle rate, the project clears it."
                ],
                side: {
                  label: "Try this",
                  html: "<p>Drop the savings to $90,000. Payback still looks reasonable, but net present value turns negative.</p>"
                }
              },
              {
                n: "3",
                title: "The estimates are the decision",
                paras: [
                  "Every input here is a judgment: how much the machine will save, how long it will last, what rate to use. Small changes in the estimates swing the answer. That's the same lesson as profit being an estimate, applied to the future."
                ],
                side: {
                  label: "See also",
                  html: "<p><a href=\"@profit-estimate\">Profit is an estimate</a> shows the same effect on this year's numbers.</p>"
                }
              }
            ]
          }
        ],
        end: {
          related: [
            { title: "The building blocks of ROI", where: "Part VI" },
            { title: "Profit is an estimate", where: "Chapter 5", page: "profit-estimate" },
            { title: "Reading the ratios", where: "Part V", page: "ratios" },
            { title: "Working capital levers", where: "Part VII", page: "working-capital" }
          ],
          cta: { page: "working-capital", kicker: "Next", text: "Pull the working capital levers" }
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
            { title: "The language of cash flow", where: "Chapter 17", page: "cash-flow-language" },
            { title: "Reading the ratios", where: "Part V", page: "ratios" }
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
            { title: "The language of cash flow", where: "Chapter 17", page: "cash-flow-language" },
            { title: "Working capital levers", where: "Part VII", page: "working-capital" }
          ],
          cta: { page: "", kicker: "Contents", text: "See the map of the book" }
        }
      }
    }
  });
})();
