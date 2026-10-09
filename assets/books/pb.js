// Play Bigger (Al Ramadan, Dave Peterson, Christopher Lochhead & Kevin Maney, 2016).
// Summaries are paraphrased; keep quotations short and attributed.
// The book map is organized by idea: the chapter list hasn't been checked against
// the book yet, so ideas are listed without chapter numbers.
(function () {
  "use strict";

  // A toy model of market attention for the lightning-strike page, ours, not the book's.
  // Attention fades each week; moves in the same week reinforce each other; a move lands
  // harder when the market is already paying attention.
  //   impact(h) = h × (1 + 0.5 × (h − 1))          h = moves that week
  //   a(t)      = 0.6 × a(t−1) + impact(h) × (1 + a(t−1) / 4)
  // `plan` lists the week (0 to 11) of each of six launch moves.
  const attention = (plan, weeks = 12) => {
    const moves = Array(weeks).fill(0);
    plan.forEach((w) => moves[w]++);
    let a = 0;
    return moves.map((h, t) => [t + 1, Math.round((a = 0.6 * a + h * (1 + 0.5 * (h - 1)) * (1 + a / 4)) * 100) / 100]);
  };

  window.Marginalia.addBook({
    id: "pb",
    title: "Play Bigger",
    author: "Ramadan, Peterson, Lochhead & Maney",
    year: 2016,
    status: "open",
    cover: "pb",
    subtitle: "How pirates, dreamers, and innovators create and dominate markets",
    thesis:
      "The biggest winners don't just build a better product. They define a new category, teach the market to see a problem in a new way, and become its king. " +
      "The authors argue that this is a discipline, not luck: design the company, the product and the category together, then launch with one concentrated strike.",
    citation:
      "Summaries on this page are written in our own words from Al Ramadan, Dave Peterson, Christopher Lochhead and Kevin Maney, <cite>Play Bigger</cite> (Harper Business, 2016). Example companies are invented unless named. Read the book for the full argument.",
    hero: { lines: ["Play", "Bigger"], art: "categories" },
    entries: [
      { kicker: "Start here", title: "Category kings", desc: "Why the company that defines a category takes most of its value.", page: "category-kings" },
      { kicker: "Workbench", title: "Write a point of view", desc: "Draft a category's story and check it as you go.", page: "point-of-view" }
    ],
    mapTitle: "The ideas, in the order the book builds them",
    contentsDesc: "Why categories matter, how to design one, and how to launch it.",
    mapNote: "Organized by idea rather than by chapter. Chapter titles and order are still being checked against the book.",
    nav: ["category-kings", "magic-triangle", "point-of-view", "lightning-strike"],

    parts: [
      {
        n: "I",
        title: "Why categories matter",
        chapters: [
          { title: "Category kings", blurb: "Winners take most of a new category's value.", page: "category-kings" },
          { title: "The category makes the company", blurb: "People buy into a new way of thinking before they buy a product." },
          { title: "Own the problem", blurb: "Whoever frames the problem gets to define the solution." }
        ]
      },
      {
        n: "II",
        title: "Designing a category",
        chapters: [
          { title: "The magic triangle", blurb: "Company, product and category, designed together.", page: "magic-triangle" },
          { title: "Discovery", blurb: "Finding a problem big enough to build a category around." },
          { title: "Marchitecture", blurb: "How the pieces of the solution fit together, drawn for the market." },
          { title: "Naming the category", blurb: "A name people can repeat for the new way of thinking.", page: "naming" },
          { title: "Point of view", blurb: "The written story of the category: problem, from, to, why now.", page: "point-of-view" }
        ]
      },
      {
        n: "III",
        title: "Launching it",
        chapters: [
          { title: "The lightning strike", blurb: "One concentrated moment that puts the point of view in front of the market.", page: "lightning-strike" },
          { title: "Hijacks", blurb: "Follow-up moves that keep the story going after the first strike." }
        ]
      }
    ],

    pages: {
      // A reference page. The 76% figure is the authors' own analysis, as I remember it of
      // US venture-backed technology companies founded from 2000 to 2015, measuring share of
      // the category's market value; the scope is unchecked against the book. That kings
      // often weren't first to market is the authors' argument as I remember it; the list of
      // "playing smaller" lines is invented. The ownership signs are our summary.
      "category-kings": {
        navLabel: "Kings",
        title: "Category kings",
        eyebrow: "Part I · Why categories matter",
        layout: "dense",
        dek:
          "In a new category, value doesn't spread evenly. The company that defines the category, and the problem it solves, tends to take most of it. The authors call that company the category king.",
        blocks: [
          {
            type: "brief",
            eyebrow: "In brief",
            title: "The argument in six points",
            points: [
              {
                t: "Categories, not products, are the real contest.",
                d: "Buyers first decide what kind of thing they need, then which one to buy. The company that defines the kind of thing has the advantage in the second choice."
              },
              {
                t: "Most of a category's value goes to one company.",
                d: "The authors call it the category king. In their analysis of technology companies, the king took about 76% of its category's market value."
              },
              {
                t: "The king defines the category; it needn't be first.",
                d: "Many kings weren't first to market. They were first to name the problem and frame the solution in terms the market adopted."
              },
              {
                t: "The category makes the company.",
                d: "People buy into a new way of thinking before they buy a product. Once the market thinks in one company's terms, rivals get described as alternatives to it."
              },
              {
                t: "Playing smaller means competing in someone else's frame.",
                d: "Claims to be faster, cheaper or more complete than the leader accept the leader's category, and teach buyers to keep comparing."
              },
              {
                t: "Category design is a discipline.",
                d: "Find the problem, name it, design the company, the product and the category together, then launch with force. See <a href=\"@magic-triangle\">the magic triangle</a>."
              }
            ]
          },
          {
            type: "bar-chart",
            eyebrow: "Figure",
            title: "How a category's value splits",
            intro: "The authors' estimate of the share of a category's total market value taken by its king.",
            rows: [
              { label: "The category king", value: 76, show: true },
              { label: "Every other company in the category", value: 24, show: true }
            ],
            max: 100,
            ticks: [0, 25, 50, 75],
            unit: "%",
            decimals: 0,
            labelHead: "Who",
            valueHead: "Share of the category's market value",
            source: "Source: the authors' analysis of technology categories, reported in <cite>Play Bigger</cite>. Share of market value, not revenue or units sold."
          },
          {
            type: "table",
            eyebrow: "Rewrites",
            title: "Playing smaller, and a bigger version",
            intro: "Invented lines from pitch decks and press releases.",
            columns: ["Playing smaller", "Why it's smaller", "Playing bigger"],
            rows: [
              ["Our CRM is 30% faster than the market leader.", "It accepts the leader's category and competes on the leader's terms. Even if it's true, it teaches buyers to see you as an alternative.", "Sales teams spend a third of their week updating software instead of selling. That time should go back to customers."],
              ["The best-in-class, AI-powered platform for modern teams.", "No problem in it at all. It could describe a thousand products.", "Teams make decisions on numbers that are three weeks old. Decisions should run on today's numbers."],
              ["It's like Uber, but for dog walking.", "It borrows someone else's category to explain itself, and casts you as a follower in their story.", "Dog owners juggle walkers by text message and hope someone shows up. Care for your dog should be as dependable as care for yourself."],
              ["We have more integrations than any competitor.", "A feature comparison, on a checklist the leader probably wrote. It invites the buyer to keep comparing.", "Your tools don't talk to each other, so your team has become the integration. Work should move between tools on its own."]
            ]
          },
          {
            type: "table",
            eyebrow: "A quick test",
            title: "Who owns the category?",
            intro: "Our summary of the signs.",
            columns: ["Sign", "You own it", "Someone else does"],
            widths: ["13rem", null, null],
            rows: [
              ["How customers describe rivals", "Rivals are “like” you", "You're “like” them"],
              ["Whose words the market uses", "Analysts and buyers use your name for the problem", "You use theirs"],
              ["Who writes the checklist", "Buyers compare others against what you defined", "You're scored on someone else's features"],
              ["What a rival's launch does", "Adds to the category you lead", "Sets the agenda you react to"]
            ]
          }
        ],
        end: {
          related: [
            { title: "Own the problem", where: "Part I" },
            { title: "The magic triangle", where: "Part II", page: "magic-triangle" },
            { title: "Point of view", where: "Part II", page: "point-of-view" },
            { title: "The lightning strike", where: "Part III", page: "lightning-strike" }
          ],
          cta: { page: "point-of-view", kicker: "Workbench", text: "Write a point of view" }
        }
      },

      // A reference page. Naming as part of category design, and that the name comes once
      // the point of view is clear, follow the book as I remember it, unchecked against its
      // wording. The names in the second table are a mix of real category names and invented
      // product names; the first table is our summary.
      naming: {
        title: "Naming the category",
        navLabel: "Naming",
        eyebrow: "Part II · Designing a category",
        layout: "dense",
        dek:
          "A category needs a name people can repeat: one that describes the problem or the new way, not the company. Get it right and customers, analysts and even competitors end up using your words.",
        blocks: [
          {
            type: "brief",
            eyebrow: "In brief",
            title: "The argument in five points",
            points: [
              {
                t: "Name the category, not just the product.",
                d: "A product name belongs to one company. A category name belongs to the market: it's what buyers search for and what analysts put at the top of a report."
              },
              {
                t: "Whoever names it gets to define it.",
                d: "Everyone else ends up described in its terms."
              },
              {
                t: "Good names are plain, short and descriptive.",
                d: "They say what problem is solved or what the new way is, so a newcomer can guess what's inside. Hype words, brand names and version numbers don't travel."
              },
              {
                t: "A rival should be able to use it.",
                d: "If a competitor could use the name about itself without it sounding odd, it works as a category name."
              },
              {
                t: "The name comes last.",
                d: "It's the final step of the <a href=\"@point-of-view\">point of view</a>, once the problem and the new way are clear."
              }
            ]
          },
          {
            type: "table",
            eyebrow: "Two kinds of name",
            title: "Category names and product names",
            columns: ["", "Category name", "Product name"],
            widths: ["10rem", null, null],
            rows: [
              ["Belongs to", "The market", "One company"],
              ["Describes", "A problem, or a new way of solving it", "A product, often by brand"],
              ["Used by", "Buyers, analysts, the press and rivals", "The company and its customers"],
              ["Lasts", "Often longer than the companies that popularized it", "As long as the product"],
              ["Example", "Ride-hailing, software as a service", "A brand of car service or software"]
            ]
          },
          {
            type: "table",
            eyebrow: "Examples",
            title: "Would it work as a category name?",
            intro: "Real category names and invented product names.",
            columns: ["Name", "Works?", "Why", "As a category"],
            widths: [null, "6rem", null, null],
            rows: [
              ["Customer relationship management", "Yes", "It describes what the software does, and every vendor in the market uses it.", "Already one"],
              ["SmartFleet Pro X", "No", "A product name. It belongs to one company and says little about the problem.", "Predictive fleet maintenance"],
              ["Ride-hailing", "Yes", "Short, plain and descriptive. Rivals describe themselves with it.", "Already one"],
              ["The Northline TheftGuard frame", "No", "A brand name for one product.", "Theft-proof commuting"],
              ["Software as a service", "Yes", "It names a new way of buying software, and has outlived many of the companies that popularized it.", "Already one"],
              ["AI-powered next-gen data cloud", "No", "Mostly hype words. A newcomer can't tell what problem it solves.", "Real-time sales forecasting"],
              ["Predictive fleet maintenance", "Yes", "It names the new way, maintenance driven by data rather than the calendar, in three plain words.", "Already one"],
              ["30% faster invoicing", "No", "A benefit claim, not a kind of thing. It invites a comparison instead of defining a market.", "Automated accounts receivable"]
            ]
          }
        ],
        end: {
          related: [
            { title: "Point of view", where: "Part II", page: "point-of-view" },
            { title: "Category kings", where: "Part I", page: "category-kings" },
            { title: "Marchitecture", where: "Part II" },
            { title: "The lightning strike", where: "Part III", page: "lightning-strike" }
          ],
          cta: { page: "point-of-view", kicker: "Workbench", text: "Name your category" }
        }
      },

      // A reference page. The magic triangle (company design, product design and category
      // design, developed together) is the authors' framework. The drawing, what each edge
      // carries, and the table of imbalances are our summary.
      "magic-triangle": {
        title: "The magic triangle",
        navLabel: "Triangle",
        eyebrow: "Part II · Designing a category",
        layout: "dense",
        dek:
          "Category kings design three things together: the company, the product and the category. When one lags behind the others, the whole effort slows down.",
        blocks: [
          {
            type: "brief",
            eyebrow: "In brief",
            title: "The argument in five points",
            points: [
              {
                t: "Three designs, at once.",
                d: "Kings don't design the product first and think about the market later. They design the company, the product and the category together, so all three point the same way."
              },
              {
                t: "Product design: it solves the problem.",
                d: "The product actually delivers the new way the category promises."
              },
              {
                t: "Company design: it's built for the new category.",
                d: "Culture, structure, business model, sales and service set up to sell the new way, not the old one."
              },
              {
                t: "Category design: the market learns to see it.",
                d: "The point of view, the name and the launch that teach buyers the problem and the new way."
              },
              {
                t: "The weakest side sets the pace.",
                d: "A strong product with no category design gets compared feature by feature with the old way; a strong story with a weak product makes a promise the product breaks. It's close to what <a href=\"#gsbs-kernel\">Rumelt</a> calls coherent action."
              }
            ]
          },
          {
            type: "figure",
            eyebrow: "Figure",
            title: "What each side gives the others",
            intro: "The three designs, and what passes between each pair when they're developed together.",
            alt: "A triangle with category design at the top, company design at the bottom left and product design at the bottom right. Numbered markers sit on each edge: between category and company, between category and product, and between company and product.",
            svg: `<svg viewBox="0 0 460 320" xmlns="http://www.w3.org/2000/svg">
              <path class="sv-line" d="M230 60 L95 262 M230 60 L365 262 M95 262 H365"/>
              <rect class="sv-box-pen" x="150" y="24" width="160" height="42" rx="4"/>
              <text class="sv-t sv-b" x="230" y="50" text-anchor="middle">Category design</text>
              <rect class="sv-box" x="15" y="244" width="160" height="42" rx="4"/>
              <text class="sv-t sv-b" x="95" y="270" text-anchor="middle">Company design</text>
              <rect class="sv-box" x="285" y="244" width="160" height="42" rx="4"/>
              <text class="sv-t sv-b" x="365" y="270" text-anchor="middle">Product design</text>
              <text class="sv-k" x="230" y="190" text-anchor="middle">DESIGNED</text>
              <text class="sv-k" x="230" y="205" text-anchor="middle">TOGETHER</text>
              <g class="sv-call"><circle cx="160" cy="160" r="9"/><text x="160" y="163.5" text-anchor="middle">1</text></g>
              <g class="sv-call"><circle cx="300" cy="160" r="9"/><text x="300" y="163.5" text-anchor="middle">2</text></g>
              <g class="sv-call"><circle cx="230" cy="262" r="9"/><text x="230" y="265.5" text-anchor="middle">3</text></g>
            </svg>`,
            notes: [
              { t: "Category and company.", d: "The company tells the category's story in everything it does, from hiring to sales calls, and the story gives the company its purpose." },
              { t: "Category and product.", d: "The product delivers what the category promises, and the category explains why the product matters." },
              { t: "Company and product.", d: "The company is built to make, sell and support this product for these buyers, not the old product for the old ones." }
            ],
            caption: "Our drawing of the authors' magic triangle."
          },
          {
            type: "table",
            eyebrow: "Reference",
            title: "The three designs",
            columns: ["", "What it covers", "Signs it's lagging"],
            widths: ["10rem", null, null],
            rows: [
              ["Product design", "What you sell, and whether it solves the problem the category names", "Buyers like the story but churn after trying the product"],
              ["Company design", "Culture, structure, business model, sales and service", "Sales still sells the old way; service is set up for the old product"],
              ["Category design", "The point of view, the name and the launch", "Buyers compare you feature by feature with the old way, and shrug"]
            ]
          },
          {
            type: "table",
            eyebrow: "Imbalances",
            title: "When one side lags",
            intro: "Invented companies, in shapes the authors describe.",
            columns: ["Shape", "What happens"],
            widths: ["14rem", null],
            rows: [
              ["Great product, no category", "A better mousetrap nobody is looking for. The market has no name for the problem it solves, so buyers compare it with the old way."],
              ["All story", "A launch the product can't live up to. The story promises a new way, the product delivers an old one, and buyers notice."],
              ["A company built for the old way", "Sales, pricing and service are set up for the old category, so neither the product nor the story reaches buyers as designed."],
              ["Designed together", "The company is built to sell the new way, the product delivers it, and the market has a name for it. Each makes the others more convincing."]
            ]
          }
        ],
        end: {
          related: [
            { title: "Category kings", where: "Part I", page: "category-kings" },
            { title: "Point of view", where: "Part II", page: "point-of-view" },
            { title: "Discovery", where: "Part II" },
            { title: "The lightning strike", where: "Part III", page: "lightning-strike" }
          ],
          cta: { page: "point-of-view", kicker: "Workbench", text: "Start with the point of view" }
        }
      },

      // A reference page around a toy model. The lightning strike (one concentrated launch
      // moment) and following it up with further moves are the authors' ideas; that they
      // call the follow-ups "hijacks" is as I remember it, unchecked. The charts come from
      // our attention model at the top of this file, not from the book.
      "lightning-strike": {
        navLabel: "Strike",
        title: "The lightning strike",
        eyebrow: "Part III · Launching it",
        layout: "dense",
        dek:
          "Most launches drip out: a press release here, a webinar there, each one fading before the next arrives. The book argues for the opposite: one concentrated moment that puts the point of view in front of the market all at once, then follow-up moves that keep it there.",
        blocks: [
          {
            type: "brief",
            eyebrow: "In brief",
            title: "The argument in five points",
            points: [
              {
                t: "A new category asks people to change how they think.",
                d: "That takes more than one announcement, and more than a series of small ones."
              },
              {
                t: "Spread out, each move fades before the next.",
                d: "A drip of releases, webinars and posts is too small to register, so the market never quite notices."
              },
              {
                t: "Concentrated, the same moves reinforce each other.",
                d: "A strike lines up the whole company at once: the point of view, the product, customers, partners and the sales team, telling the same story in the same week."
              },
              {
                t: "One strike fades too.",
                d: "The authors recommend following it with further moves, which they call hijacks, that land while the market is still listening."
              },
              {
                t: "It's built on the point of view.",
                d: "Without a <a href=\"@point-of-view\">point of view</a> there's nothing to concentrate."
              }
            ]
          },
          {
            type: "behavior",
            eyebrow: "A toy model",
            title: "The same six moves, three ways",
            intro: "Market attention, week by week, when six launch moves are spread out, made at once, or made at once with two follow-ups. Above the dashed line, the market is paying attention.",
            cols: 3,
            charts: [
              {
                t: "Drip",
                d: "One move every other week. Attention never reaches the line: noticed in 0 of 12 weeks.",
                x: [1, 12],
                y: [0, 22],
                xLabel: "Weeks",
                yTicks: [0, 10, 20],
                hover: true,
                refs: [{ y: 3, label: "Noticed" }],
                series: [{ name: "Attention", points: attention([1, 3, 5, 7, 9, 11]) }]
              },
              {
                t: "One strike",
                d: "All six moves in week 5. A large spike that fades within a month: noticed in 4 of 12 weeks.",
                x: [1, 12],
                y: [0, 22],
                xLabel: "Weeks",
                yTicks: [0, 10, 20],
                hover: true,
                refs: [{ y: 3, label: "Noticed" }],
                series: [{ name: "Attention", points: attention([4, 4, 4, 4, 4, 4]) }]
              },
              {
                t: "Strike, then hijacks",
                d: "Four moves in week 4, then one in week 7 and one in week 9. A smaller spike, kept alive: noticed in 5 of 12 weeks.",
                x: [1, 12],
                y: [0, 22],
                xLabel: "Weeks",
                yTicks: [0, 10, 20],
                hover: true,
                refs: [{ y: 3, label: "Noticed" }],
                series: [{ name: "Attention", points: attention([3, 3, 3, 3, 6, 8]) }]
              }
            ],
            caption: "Our model, not data from the book: attention fades each week, moves in the same week reinforce each other, and a move lands harder when the market is already paying attention. The formula is in the book file."
          },
          {
            type: "table",
            eyebrow: "In a strike",
            title: "What a strike lines up",
            intro: "Our summary of the pieces the book describes moving together.",
            columns: ["Piece", "Its job in the strike"],
            widths: ["13rem", null],
            rows: [
              ["The point of view", "Published first, so everything else has a story to point to"],
              ["The product", "Released, or shown, in the same moment, delivering what the story promises"],
              ["Customers", "A flagship customer telling the story in their own words"],
              ["Partners", "Announcements that show the category is bigger than one company"],
              ["Analysts and press", "Briefed in advance, so the coverage uses the category's name"],
              ["The sales team", "Trained on the point of view, so every call that week tells the same story"]
            ]
          },
          {
            type: "table",
            eyebrow: "Two ways to launch",
            title: "Drip or strike",
            columns: ["", "Drip", "Strike, then hijacks"],
            widths: ["10rem", null, null],
            rows: [
              ["Shape", "Many small moves, spread out", "One concentrated moment, then a few well-timed follow-ups"],
              ["What the market hears", "Scattered announcements, each forgotten", "One story, loudly enough to remember"],
              ["Inside the company", "Each team launches on its own schedule", "The whole company moves together"],
              ["Risk", "Feels safer: nothing big can fail", "Visible: the strike either lands or it doesn't"]
            ]
          }
        ],
        end: {
          related: [
            { title: "Point of view", where: "Part II", page: "point-of-view" },
            { title: "Hijacks", where: "Part III" },
            { title: "Category kings", where: "Part I", page: "category-kings" },
            { title: "The magic triangle", where: "Part II", page: "magic-triangle" }
          ],
          cta: { page: "point-of-view", kicker: "Workbench", text: "Write the point of view first" }
        }
      },

      // A reference page around the workbench. The point of view as the written story of the
      // category (problem, from, to, why now, then the name), written before the product
      // pitch and agreed across the company, follows the book as I remember it, unchecked.
      // The two examples are invented; the tables are our summary.
      "point-of-view": {
        navLabel: "Point of view",
        title: "Point of view",
        eyebrow: "Part II · Designing a category",
        layout: "dense",
        dek:
          "A point of view is the written story of a category: the problem, how people deal with it today, the new way, and why now. It comes before any product pitch, and the launch is built on it.",
        blocks: [
          {
            type: "brief",
            eyebrow: "In brief",
            title: "The argument in five points",
            points: [
              {
                t: "The story comes before the product.",
                d: "A point of view describes the problem in the market's terms, says what's wrong with how it's handled today, describes a different way, and only then introduces the solution."
              },
              {
                t: "It doesn't compare features.",
                d: "Comparing features accepts someone else's category. The point of view defines its own."
              },
              {
                t: "From and to is its shape.",
                d: "From the way the job is done today to the way it will be done. The bigger the gap, the bigger the category."
              },
              {
                t: "Writing it forces agreement.",
                d: "Engineering, sales and the executives should all tell the same story. The launch, the website and the sales pitch all come from it."
              },
              {
                t: "Then strike.",
                d: "The <a href=\"@lightning-strike\">lightning strike</a> puts the point of view in front of the market all at once."
              }
            ]
          },
          {
            type: "table",
            eyebrow: "Reference",
            title: "The parts of a point of view",
            columns: ["Part", "What it says", "Watch for"],
            widths: ["9rem", null, null],
            rows: [
              ["The problem", "What's going wrong for buyers, in their terms, before any product appears", "Starting with your product or its features"],
              ["From", "How the job is done today", "A straw man nobody recognizes"],
              ["To", "The new way it will be done", "“The same, but better”: that's an improvement, not a category"],
              ["Why now", "What has changed to make the new way possible or necessary", "“Customers want more”: true of every market, every year"],
              ["The name", "A plain name for the new way, last of all (see <a href=\"@naming\">naming</a>)", "Hype words and brand names"]
            ]
          },
          {
            type: "pov-builder",
            draftKey: "pb.pov",
            defaultExample: "fleet",
            examples: {
              fleet: {
                label: "Predictive maintenance",
                note: "Example loaded: an invented company's point of view for predictive fleet maintenance. Edit any field to make it your own.",
                problem:
                  "Every year, trucking fleets lose weeks of truck time to breakdowns that the trucks' own sensors saw coming. The warning signs were in the data; nobody was reading it.",
                from: "Service trucks on a fixed calendar and fix them after they break down.",
                to: "Service each truck when its own data says it needs it.",
                why: "Every truck built in the last few years streams engine data, and cellular coverage now reaches almost every highway.",
                name: "Predictive fleet maintenance"
              },
              pitch: {
                label: "The same idea as a pitch",
                note: "Example loaded: the same idea written as a product pitch. It fails on purpose.",
                problem: "Our platform gives fleet managers powerful new features for maintenance.",
                from: "Using old maintenance software.",
                to: "Using better maintenance software.",
                why: "Customers want more.",
                name: "AI-powered next-gen fleet maintenance platform"
              },
              blank: { label: "Blank page", note: "", problem: "", from: "", to: "", why: "", name: "" }
            }
          },
          {
            type: "table",
            eyebrow: "Two drafts",
            title: "A point of view and a pitch",
            intro: "The workbench's two examples side by side: the same idea, told two ways.",
            columns: ["", "Point of view", "Product pitch"],
            widths: ["8rem", null, null],
            rows: [
              ["The problem", "Fleets lose weeks of truck time to breakdowns their own sensors saw coming.", "Our platform gives fleet managers powerful new features."],
              ["From", "Service on a fixed calendar; fix trucks after they break.", "Using old maintenance software."],
              ["To", "Service each truck when its own data says it needs it.", "Using better maintenance software."],
              ["Why now", "Recent trucks stream engine data, and coverage reaches almost every highway.", "Customers want more."],
              ["The name", "Predictive fleet maintenance", "AI-powered next-gen fleet maintenance platform"]
            ]
          }
        ],
        end: {
          related: [
            { title: "Category kings", where: "Part I", page: "category-kings" },
            { title: "Naming the category", where: "Part II", page: "naming" },
            { title: "Marchitecture", where: "Part II" },
            { title: "The lightning strike", where: "Part III", page: "lightning-strike" }
          ],
          cta: { page: "", kicker: "Contents", text: "See the map of the book" }
        }
      }
    }
  });
})();
