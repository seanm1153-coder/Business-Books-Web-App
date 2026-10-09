// Understanding Michael Porter: The Essential Guide to Competition and Strategy
// (Joan Magretta, 2012). Summaries are paraphrased; keep quotations short and attributed.
// Chapter titles and order follow my reading of the book (two parts, seven chapters, then
// ten practical implications) and are unchecked against it. The cases are companies I
// remember the book using; check them against the text before relying on the details.
(function () {
  "use strict";

  // The invented airline used on the trade-offs and fit pages. Each option adds { price,
  // cost } a passenger to the base; each link adds its own when both of its options are
  // chosen. Tuned so the two consistent strategies beat every mix of them.
  const AIRLINE = {
    base: { price: 80, cost: 76 },
    mapOrder: ["routes", "turnarounds", "fleet", "fares", "selling", "cabin"],
    activities: [
      {
        id: "routes",
        name: "Routes",
        options: [
          { id: "hub", label: "Hub-and-spoke network", short: "Hub network", price: 2, cost: 3 },
          { id: "p2p", label: "Short point-to-point routes", short: "Point-to-point" }
        ]
      },
      {
        id: "fleet",
        name: "Fleet",
        options: [
          { id: "mixed", label: "A mixed fleet", short: "Mixed fleet", cost: 1 },
          { id: "one", label: "One type of plane", short: "One plane type" }
        ]
      },
      {
        id: "turnarounds",
        name: "Turnarounds",
        options: [
          { id: "standard", label: "Standard turnarounds", short: "Standard turns", cost: 1 },
          { id: "quick", label: "15-minute turnarounds", short: "15-minute turns" }
        ]
      },
      {
        id: "cabin",
        name: "Cabin",
        options: [
          { id: "meals", label: "Assigned seats and meals", short: "Seats and meals", price: 2, cost: 3 },
          { id: "open", label: "Open seating, no meals", short: "Open seating" }
        ]
      },
      {
        id: "selling",
        name: "Selling",
        options: [
          { id: "agents", label: "Travel agents and booking systems", short: "Travel agents", price: 1, cost: 3 },
          { id: "direct", label: "Direct sales only", short: "Direct sales" }
        ]
      },
      {
        id: "fares",
        name: "Fares",
        options: [
          { id: "first", label: "First class and flexible fares", short: "First class", price: 2, cost: 3 },
          { id: "simple", label: "One class, simple low fares", short: "Low fares" }
        ]
      }
    ],
    links: [
      { a: "hub", b: "mixed", price: 3, text: "A hub flies routes of every length, and a mixed fleet has the right plane for each." },
      { a: "meals", b: "first", price: 3, text: "Assigned seats and meals are what make a first-class fare worth paying." },
      { a: "agents", b: "first", price: 2, text: "Agents and booking systems bring in the business travelers who buy first class." },
      { a: "hub", b: "first", price: 3, text: "Business travelers want connections to everywhere, which only a hub offers." },
      { a: "hub", b: "agents", price: 2, text: "Agents can sell any journey through the hub, which fills planes from everywhere." },
      { a: "p2p", b: "quick", cost: -3, text: "With no connecting passengers to wait for, short flights can turn around in 15 minutes." },
      { a: "one", b: "quick", cost: -2, text: "One type of plane means one way to clean, fuel and service it, which speeds every turnaround." },
      { a: "open", b: "quick", cost: -2, text: "Open seating and no meals make boarding and cleaning faster." },
      { a: "direct", b: "simple", cost: -1, text: "Simple fares are easy to sell directly, without agents' commissions." },
      { a: "p2p", b: "one", cost: -2, text: "Short routes of similar length suit a single type of plane, so crews and parts are interchangeable." },
      { a: "hub", b: "quick", cost: 5, text: "Hub flights wait for connecting passengers and bags, so quick turnarounds fail and the extra ground crew is wasted." },
      { a: "meals", b: "quick", cost: 4, text: "Catering and seat assignments don't fit in 15 minutes; trying adds staff and delays." },
      { a: "agents", b: "simple", cost: 3, text: "Agents' commissions and booking fees eat into low fares." },
      { a: "hub", b: "one", cost: 3, text: "A hub needs planes of different sizes; one type is too big for some routes and too small for others." },
      { a: "first", b: "open", cost: 3, text: "A first-class cabin with open seating confuses passengers and adds handling at every gate." }
    ],
    presets: [
      {
        id: "full",
        label: "Full service",
        consistent: true,
        name: "consistent full service",
        note: "Full service, consistently: every choice supports a network that business travelers will pay more for.",
        picks: { routes: "hub", fleet: "mixed", turnarounds: "standard", cabin: "meals", selling: "agents", fares: "first" }
      },
      {
        id: "low",
        label: "Low cost, all the way",
        consistent: true,
        name: "consistent low cost",
        note: "Low cost, consistently: every choice makes the others cheaper to run.",
        picks: { routes: "p2p", fleet: "one", turnarounds: "quick", cabin: "open", selling: "direct", fares: "simple" }
      },
      {
        id: "turns",
        label: "Full service, faster turns",
        picks: { routes: "hub", fleet: "mixed", turnarounds: "quick", cabin: "meals", selling: "agents", fares: "first" }
      },
      {
        id: "straddle",
        label: "Full service plus low fares",
        picks: { routes: "hub", fleet: "mixed", turnarounds: "quick", cabin: "meals", selling: "agents", fares: "simple" }
      }
    ]
  };

  window.Marginalia.addBook({
    id: "ump",
    title: "Understanding Michael Porter",
    author: "Joan Magretta",
    year: 2012,
    status: "open",
    cover: "ump",
    subtitle: "The essential guide to competition and strategy",
    thesis:
      "Michael Porter's ideas, explained by a longtime collaborator. Competition is about earning superior returns, not beating rivals. " +
      "Industry structure sets the average an industry earns; a company beats it only by competing differently, with a distinct value proposition, a tailored value chain, trade-offs, fit and continuity.",
    citation:
      "Summaries on this page are written in our own words from Joan Magretta, <cite>Understanding Michael Porter: The Essential Guide to Competition and Strategy</cite> (Harvard Business Review Press, 2012), and the ideas of Michael Porter it explains. Example companies are invented unless the book uses them. Read the book for the full argument.",
    hero: { lines: ["Understanding", "Michael Porter"], art: "forces" },
    entries: [
      { kicker: "Start here", title: "Best or unique", desc: "Why chasing the best way to compete drives profits down for everyone.", page: "mindset" },
      { kicker: "Builder", title: "Design an airline", desc: "Choose six activities and watch them reinforce or clash.", page: "trade-offs" },
      { kicker: "Workbench", title: "Test your strategy", desc: "Write down a strategy and check it against Porter's five tests.", page: "five-tests" }
    ],
    mapTitle: "Two parts, seven chapters",
    contentsDesc: "From industry structure to the five tests of a good strategy.",
    mapNote: "Pages open as they're written. Chapter titles are paraphrased.",
    casesTitle: "The companies the book uses",
    nav: ["mindset", "five-forces", "advantage", "trade-offs"],

    parts: [
      {
        n: "I",
        title: "Competition",
        chapters: [
          { n: 1, title: "Competition: the right mindset", blurb: "Compete to be unique, not to be the best.", page: "mindset" },
          { n: 2, title: "The five forces: competing for profits", blurb: "Industry structure decides how much of the value an industry creates it gets to keep.", page: "five-forces" },
          { n: 3, title: "Competitive advantage: the value chain and your P&L", blurb: "Advantage shows up as a higher relative price, a lower relative cost, or both.", page: "advantage" }
        ]
      },
      {
        n: "II",
        title: "Strategy",
        chapters: [
          { n: 4, title: "Creating value: the core", blurb: "A distinctive value proposition and a value chain tailored to deliver it.", page: "value" },
          { n: 5, title: "Trade-offs: the linchpin", blurb: "Choosing what not to do is what makes a position hard to copy.", page: "trade-offs" },
          { n: 6, title: "Fit: the amplifier", blurb: "Activities that reinforce each other raise value and the barrier to imitation.", page: "fit" },
          { n: 7, title: "Continuity: the enabler", blurb: "A strategy takes years, not quarters, to build.", page: "continuity" },
          { title: "The five tests", blurb: "Workbench: check a strategy of your own against all five.", page: "five-tests" },
          { title: "Ten practical implications", blurb: "What Porter's ideas mean for managers, in brief." }
        ]
      }
    ],

    cases: [
      { era: "Strategy", title: "Southwest Airlines", blurb: "Short, cheap, frequent flights, delivered by activities that reinforce one another.", tag: "Fit", page: "trade-offs" },
      { era: "Strategy", title: "IKEA", blurb: "Self-service, flat-pack furniture for young families on a budget, with trade-offs at every step.", tag: "Trade-offs" },
      { era: "Strategy", title: "Enterprise Rent-A-Car", blurb: "Built for people whose own car is in the shop, not for business travelers at airports.", tag: "Value proposition", page: "value" },
      { era: "Strategy", title: "Aravind Eye Hospital", blurb: "High-volume, low-cost eye surgery in India, made possible by a value chain designed for it.", tag: "Value chain" }
    ],

    pages: {
      // A reference page. "Compete to be unique, not the best", convergence, zero-sum versus
      // positive-sum competition, return on invested capital as the goal, and operational
      // effectiveness versus strategy follow Porter's published work as I remember Magretta
      // presenting it, unchecked against her wording. The productivity frontier and the list of
      // management tools come from Porter's "What Is Strategy?" (HBR, 1996); unchecked whether
      // Magretta draws the frontier. The comparison table's rows are our summary.
      "mindset": {
        navLabel: "Mindset",
        title: "Competition: the right mindset",
        eyebrow: "Part I · Chapter 01",
        layout: "dense",
        dek:
          "Most managers think competition means being the best. Porter argues that's the wrong goal: in most industries there is no single best way to compete, and when everyone chases the same one, everyone's profits suffer.",
        blocks: [
          {
            type: "brief",
            eyebrow: "In brief",
            title: "The argument in six points",
            points: [
              {
                t: "There is rarely one best way to compete.",
                d: "Customers differ in what they need and what they'll pay, so an industry can support many different ways of creating value. “Best” only makes sense against one set of needs."
              },
              {
                t: "Competing to be the best leads to convergence.",
                d: "When rivals chase the same idea of best, they copy each other's products and practices. Customers can no longer tell them apart, so they choose on price, and profits fall for everyone."
              },
              {
                t: "Competing to be unique is positive-sum.",
                d: "A company that chooses a distinct way to serve a chosen set of customers can do well while rivals do well serving others. Several winners can share an industry."
              },
              {
                t: "The goal is superior profitability, not size.",
                d: "Porter judges success by return on invested capital sustained over years. Market share and growth are poor scoreboards: both can be bought at the expense of returns."
              },
              {
                t: "Operational effectiveness isn't strategy.",
                d: "Doing the same things better than rivals matters, but best practices spread fast, so the gains rarely last. Strategy means doing different things, or doing similar things differently."
              },
              {
                t: "Focus on customers, not rivals.",
                d: "The question is how to create value for the customers a company chooses to serve, not how to beat everyone at everything. Rivals matter as the alternatives those customers have."
              }
            ]
          },
          {
            type: "table",
            eyebrow: "Two mindsets",
            title: "Competing to be the best, or to be unique",
            intro: "Our summary of the contrast the chapter draws.",
            columns: ["", "Competing to be the best", "Competing to be unique"],
            widths: ["10rem", null, null],
            rows: [
              ["Aim", "Be number one in the industry, by size or by some single measure of quality", "Earn superior returns by being different in ways that matter to chosen customers"],
              ["Picture of the market", "One best product and one best way to make and sell it", "Many customers with different needs, so many ways to win"],
              ["Attention on", "Rivals: match their moves and beat them", "Customers: what the chosen ones need and what they'll pay for"],
              ["How companies learn", "Imitation and benchmarking, so they grow alike", "Innovation and choice, so they grow apart"],
              ["What customers choose on", "Increasingly price, because offerings converge", "Fit with their needs, so price is one factor among several"],
              ["Kind of contest", "Zero-sum: one company's gain is another's loss, and price wars can make it worse", "Positive-sum: several companies can earn good returns at once"],
              ["Scoreboard", "Market share and sales growth", "Return on invested capital, sustained over time"]
            ]
          },
          {
            type: "figure",
            eyebrow: "Figure",
            title: "Operational effectiveness and strategy on one picture",
            intro:
              "Porter's productivity frontier. Each point is a company: how much value it delivers to buyers, apart from price, against its relative cost.",
            alt: "A chart with relative cost position on the horizontal axis, from high cost on the left to low cost on the right, and non-price value delivered to buyers on the vertical axis. A curved productivity frontier runs from high value at high cost down to low value at low cost. Companies inside the curve have arrows toward it. Two positions on the curve are marked A, higher value at higher cost, and B, lower cost with less value. A small arrow shows the frontier moving outward.",
            svg: `<svg viewBox="0 0 450 310" xmlns="http://www.w3.org/2000/svg">
              <defs><marker id="sv-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path class="sv-head" d="M0 0 L10 5 L0 10 z"/></marker>
              <marker id="sv-arr-pen" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path class="sv-head-pen" d="M0 0 L10 5 L0 10 z"/></marker></defs>
              <path class="sv-wash" d="M60 270 V40 H80 C270 40 400 130 405 255 V270 Z"/>
              <path class="sv-axis" d="M60 20 V270 H425"/>
              <text class="sv-k" x="54" y="30" text-anchor="end">HIGH</text>
              <text class="sv-k" x="54" y="270" text-anchor="end">LOW</text>
              <text class="sv-t2" transform="translate(24 150) rotate(-90)" text-anchor="middle">Non-price value delivered to buyers</text>
              <text class="sv-k" x="62" y="287">HIGH COST</text>
              <text class="sv-k" x="425" y="287" text-anchor="end">LOW COST</text>
              <text class="sv-t2" x="242" y="305" text-anchor="middle">Relative cost position</text>
              <path class="sv-curve" d="M80 40 C270 40 400 130 405 255"/>
              <path class="sv-line sv-dash" d="M318 103 L340 81" marker-end="url(#sv-arr-pen)"/>
              <path class="sv-line" d="M175 150 L238 87" marker-end="url(#sv-arr)"/>
              <path class="sv-line" d="M252 200 L328 140" marker-end="url(#sv-arr)"/>
              <circle class="sv-dot" cx="175" cy="150" r="5"/>
              <circle class="sv-dot" cx="252" cy="200" r="5"/>
              <circle class="sv-dot" cx="305" cy="238" r="5"/>
              <circle class="sv-dot" cx="130" cy="215" r="5"/>
              <circle class="sv-dot-pen" cx="210" cy="56" r="6"/>
              <circle class="sv-dot-pen" cx="379" cy="169" r="6"/>
              <text class="sv-t sv-b" x="210" y="44" text-anchor="middle">A</text>
              <text class="sv-t sv-b" x="392" y="173">B</text>
              <g class="sv-call"><circle cx="122" cy="30" r="9"/><text x="122" y="33.5" text-anchor="middle">1</text></g>
              <g class="sv-call"><circle cx="146" cy="128" r="9"/><text x="146" y="131.5" text-anchor="middle">2</text></g>
              <g class="sv-call"><circle cx="372" cy="122" r="9"/><text x="372" y="125.5" text-anchor="middle">3</text></g>
              <g class="sv-call"><circle cx="352" cy="70" r="9"/><text x="352" y="73.5" text-anchor="middle">4</text></g>
            </svg>`,
            notes: [
              {
                t: "The frontier is best practice today:",
                d: "the most value a company could deliver at a given cost, using the best technology, skills, management methods and inputs available."
              },
              {
                t: "Operational effectiveness moves a company toward it.",
                d: "Most companies sit well inside the frontier, so the gains from catching up can be large. That's what quality programs, benchmarking, outsourcing and reengineering are for."
              },
              {
                t: "Strategy chooses where on it to be.",
                d: "A at more value and higher cost, or B at lower cost and less value, for different customers. Both can be profitable; the choice is the strategy."
              },
              {
                t: "The frontier keeps moving out,",
                d: "and best practices spread to everyone. Companies competing only on operational effectiveness converge on the same spot, where only price separates them."
              }
            ],
            caption: "After Porter's productivity frontier in “What Is Strategy?”, Harvard Business Review, 1996. Drawn by us."
          },
          {
            type: "table",
            eyebrow: "The distinction",
            title: "Operational effectiveness versus strategy",
            columns: ["", "Operational effectiveness", "Strategy"],
            widths: ["10rem", null, null],
            rows: [
              ["Means", "Performing similar activities better than rivals: less waste, fewer defects, faster cycles", "Performing different activities from rivals, or similar activities in different ways"],
              ["Typical tools", "Total quality management, benchmarking, time-based competition, outsourcing, reengineering", "Choosing a value proposition, tailoring the value chain to it, making trade-offs"],
              ["How long a lead lasts", "Not long: practices are visible and spread through consultants, suppliers and staff who move", "Years, when the position rests on trade-offs and on activities that fit together"],
              ["Effect on the industry", "Companies grow alike as everyone adopts the same practices", "Companies grow apart as each tailors itself to its customers"],
              ["Needed?", "Yes. A company far from the frontier is at a disadvantage whatever its strategy", "Yes. Without it, operational gains are competed away to customers"]
            ]
          }
        ],
        end: {
          related: [
            { title: "The five forces", where: "Chapter 2", page: "five-forces" },
            { title: "Competitive advantage", where: "Chapter 3", page: "advantage" },
            { title: "Trade-offs", where: "Chapter 5", page: "trade-offs" }
          ],
          cta: { page: "five-forces", kicker: "Next", text: "What sets an industry's average profit" }
        }
      },
      // A reference page rather than a toy model: the argument in brief, the forces and their
      // drivers, real industry figures, a worked example and the usual mistakes.
      // Sources and checks:
      // - The drivers of each force, the four "factors, not forces" and the list of mistakes
      //   follow Porter's 2008 HBR article "The Five Competitive Forces That Shape Strategy",
      //   which Magretta's chapter draws on. Unchecked against her wording, and the list of
      //   mistakes is unchecked as being in her chapter at all.
      // - Industry ROIC, 1992–2006, is the exhibit in that article. Checked against secondary
      //   sources: soft drinks 37.6, prepackaged software 37.6, pharmaceuticals 31.7, airlines
      //   5.9 and the 14.9 average, and that security brokers top the list. The other values
      //   are transcribed from memory of the exhibit and unchecked.
      // - The airline example is Porter's (every force strong) and Magretta cites its 5.9%;
      //   the force-by-force reading is ours.
      "five-forces": {
        navLabel: "Five forces",
        title: "The five forces",
        eyebrow: "Part I · Chapter 02",
        layout: "dense",
        dek:
          "Why some industries earn more than others, year after year. Porter's answer is structure: five forces decide how much of the value an industry creates its companies get to keep, and they act through price and cost.",
        blocks: [
          {
            type: "brief",
            eyebrow: "In brief",
            title: "The argument in six points",
            points: [
              {
                t: "Competition is a fight over profits, and rivals are only one side of it.",
                d: "A company's profits are contested by its rivals, its customers, its suppliers, the makers of substitutes and would-be entrants, all at once. Beating rivals on sales means little if the others take the value."
              },
              {
                t: "The five forces are the industry's structure.",
                d: "Structure explains why average profitability differs so much between industries and why the differences last. From 1992 to 2006, US airlines averaged a 5.9% return on invested capital; soft drinks and prepackaged software, 37.6%."
              },
              {
                t: "Every force works through price or cost.",
                d: "Powerful buyers and close substitutes hold prices down. Powerful suppliers raise costs. Rivalry and the threat of entry do both, through price cuts and through spending on features, service and advertising. That is how structure reaches the P&L."
              },
              {
                t: "The strongest force sets the limit.",
                d: "Profitability is capped by the most powerful force or forces, and which ones those are differs by industry. Good analysis goes deep on them rather than giving all five equal space."
              },
              {
                t: "Growth, technology, government and complements are factors, not forces.",
                d: "Each matters only through what it does to the five forces. A fast-growing or high-tech industry can still be a poor one."
              },
              {
                t: "The point is a better position, not a verdict.",
                d: "Use the forces to find where they are weakest, to see changes in structure coming and to reshape the structure. Labeling an industry attractive or unattractive misses the use."
              }
            ]
          },
          {
            type: "force-map",
            eyebrow: "Figure",
            title: "The five forces, and what makes each strong",
            intro:
              "Each box lists the conditions under which that force is strong. The tags show where it hits the P&L: <span class=\"pl-tag\">Price ↓</span> holds prices down, <span class=\"pl-tag\">Cost ↑</span> raises costs or the cost of competing.",
            top: {
              name: "Threat of new entrants",
              hits: ["Price ↓", "Cost ↑"],
              when: "Strong when barriers to entry are low and newcomers don't expect incumbents to fight back. Even a threat holds prices down, or makes incumbents spend to deter it.",
              lists: [
                {
                  k: "Barriers to entry",
                  items: [
                    "Supply-side economies of scale: big incumbents make each unit for less",
                    "Demand-side benefits of scale: buyers want the network everyone else uses",
                    "Customers' costs of switching",
                    "Capital needed to get in, above all if it can't be recovered",
                    "Incumbents' advantages that don't depend on size: technology, sites, brand, know-how",
                    "Unequal access to distribution channels",
                    "Restrictive government policy: licenses, permits, patents"
                  ]
                }
              ]
            },
            left: {
              name: "Supplier power",
              hits: ["Cost ↑"],
              when: "Strong when suppliers can charge more, limit quality or push costs onto the industry. Suppliers include labor.",
              lists: [
                {
                  k: "Strong when",
                  items: [
                    "Suppliers are more concentrated than the industry they sell to",
                    "They don't depend on this industry for much of their revenue",
                    "Changing suppliers is costly for the industry's companies",
                    "What they supply is differentiated",
                    "There is no substitute for it",
                    "They could credibly enter the industry themselves"
                  ]
                }
              ]
            },
            center: {
              name: "Rivalry among existing competitors",
              hits: ["Price ↓", "Cost ↑"],
              when: "How hard rivals compete, and on what. Price cuts hand profit straight to customers; competing on features, service or advertising raises costs.",
              lists: [
                {
                  k: "Intense when",
                  items: [
                    "Competitors are many, or similar in size and power",
                    "Industry growth is slow",
                    "Exit barriers are high, so capacity stays even when returns are poor",
                    "Rivals are committed to the business beyond its economics",
                    "Firms can't read each other's moves"
                  ]
                },
                {
                  k: "Turns to price, the most damaging form, when",
                  items: [
                    "Products are hard to tell apart and switching is cheap",
                    "Fixed costs are high and one more unit costs little",
                    "Capacity has to be added in large steps",
                    "The product is perishable"
                  ]
                }
              ]
            },
            right: {
              name: "Buyer power",
              hits: ["Price ↓", "Cost ↑"],
              when: "Strong when customers have leverage and use it because price matters to them. They push prices down or demand more for the same money.",
              lists: [
                {
                  k: "Leverage",
                  items: [
                    "Few buyers, or buyers who each buy in large volumes",
                    "Products are standardized",
                    "Switching vendors costs little",
                    "Buyers could make the product themselves"
                  ]
                },
                {
                  k: "Price sensitivity",
                  items: [
                    "The product is a large part of the buyer's costs",
                    "Buyers earn low profits or are short of cash",
                    "It makes little difference to the quality of the buyer's own product",
                    "It saves the buyer little else"
                  ]
                }
              ]
            },
            bottom: {
              name: "Threat of substitutes",
              hits: ["Price ↓"],
              when: "A substitute does the same job by different means: a video call instead of a business trip, plastic instead of aluminum. It puts a ceiling on price.",
              lists: [
                {
                  k: "Strong when",
                  items: ["It offers an attractive trade-off of price and performance", "Switching to it costs the buyer little"]
                }
              ]
            },
            notes: [
              "<p><strong>Not just rivals.</strong> Four of the five forces sit outside the industry. A company can beat every rival and still earn little if buyers, suppliers, substitutes or entrants take the value.</p>",
              "<p><strong>Each force is pressure</strong> on the industry's profits. The analysis asks how strong each one is, and why.</p>",
              "<p><strong>Workers are suppliers,</strong> and in some industries the most powerful ones.</p>",
              "<p><strong>Government isn't a sixth force.</strong> Its policies work through these five, as the table of factors below shows.</p>"
            ],
            foot: "The drivers follow Porter's 2008 article “The Five Competitive Forces That Shape Strategy”, which Magretta's chapter draws on. The wording is ours."
          },
          {
            type: "bar-chart",
            eyebrow: "The evidence",
            title: "Average profitability differs widely between industries",
            intro:
              "Average return on invested capital (ROIC), US industries, 1992–2006. ROIC is profit as a share of the capital tied up to earn it. Porter prefers it to sales growth or market share, which can look good while returns stay poor.",
            unit: "%",
            decimals: 1,
            max: 45,
            ticks: [0, 10, 20, 30, 40],
            ref: { value: 14.9, label: "All industries" },
            labelHead: "Industry",
            valueHead: "Average ROIC, 1992–2006",
            rows: [
              { label: "Security brokers & dealers", value: 40.9, show: true },
              { label: "Soft drinks", value: 37.6, show: true },
              { label: "Prepackaged software", value: 37.6, show: true },
              { label: "Pharmaceuticals", value: 31.7, show: true },
              { label: "Perfume & cosmetics", value: 28.6 },
              { label: "Advertising agencies", value: 27.3 },
              { label: "Distilled spirits", value: 26.4 },
              { label: "Semiconductors", value: 21.3 },
              { label: "Medical instruments", value: 21.0 },
              { label: "Men's & boys' clothing", value: 19.5 },
              { label: "Tires", value: 19.5 },
              { label: "Household appliances", value: 19.2 },
              { label: "Malt beverages", value: 19.1 },
              { label: "Child day care", value: 17.6 },
              { label: "Household furniture", value: 17.0 },
              { label: "Drug stores", value: 16.5 },
              { label: "Grocery stores", value: 16.0 },
              { label: "Iron & steel foundries", value: 15.6 },
              { label: "Cookies & crackers", value: 15.4 },
              { label: "Mobile homes", value: 15.4 },
              { label: "Wine & brandy", value: 13.9 },
              { label: "Bakery products", value: 13.8 },
              { label: "Engines & turbines", value: 13.7 },
              { label: "Book publishing", value: 13.4 },
              { label: "Laboratory equipment", value: 13.4 },
              { label: "Oil & gas machinery", value: 12.6 },
              { label: "Soft drink bottling", value: 11.7 },
              { label: "Knitting mills", value: 10.5 },
              { label: "Hotels", value: 10.4 },
              { label: "Catalog & mail order", value: 5.9 },
              { label: "Airlines", value: 5.9, show: true }
            ],
            source:
              "Source: Michael E. Porter, “The Five Competitive Forces That Shape Strategy,” <cite>Harvard Business Review</cite>, January 2008. Magretta draws on the same figures in chapter 2."
          },
          {
            type: "table",
            eyebrow: "Worked example",
            title: "Why airlines earn so little",
            intro:
              "Porter's standard case of an industry where every force is strong. From 1992 to 2006 it averaged 5.9% ROIC, the bottom of the chart above. The force-by-force reading is ours.",
            columns: ["Force", "How it shows up", "Hits"],
            widths: ["11rem", null, "9.5rem"],
            rows: [
              [
                "Rivalry",
                "Many carriers fly the same routes with seats that are hard to tell apart. Fixed costs are high and one more passenger costs almost nothing, an empty seat is lost for good once the plane leaves, and bankruptcy lets failed airlines keep flying.",
                "<span class=\"pl-tag\">Price ↓</span> <span class=\"pl-tag\">Cost ↑</span>"
              ],
              [
                "Buyers",
                "Travelers compare fares side by side and switch freely; for most trips the cheapest fare wins. Large companies negotiate corporate rates.",
                "<span class=\"pl-tag\">Price ↓</span>"
              ],
              [
                "Suppliers",
                "Two makers of large jets, unionized pilots and crews, airports with scarce gates and landing slots, and fuel priced on world markets.",
                "<span class=\"pl-tag\">Cost ↑</span>"
              ],
              [
                "Substitutes",
                "Driving, rail and buses on short routes; video calls in place of business trips.",
                "<span class=\"pl-tag\">Price ↓</span>"
              ],
              [
                "New entrants",
                "Planes can be leased and crews hired, so low-cost carriers keep appearing wherever they can get gates and slots.",
                "<span class=\"pl-tag\">Price ↓</span> <span class=\"pl-tag\">Cost ↑</span>"
              ]
            ]
          },
          {
            type: "table",
            eyebrow: "Common confusions",
            title: "Factors, not forces",
            intro: "Four things that obviously matter to an industry but aren't forces in Porter's sense. Each works through the five, so the question to ask is what it does to them.",
            columns: ["Factor", "The usual assumption", "How it actually works"],
            widths: ["11rem", "16rem", null],
            rows: [
              [
                "Industry growth",
                "Fast growth makes an industry attractive.",
                "Growth can ease rivalry, since companies can grow without taking share from each other. It does nothing about powerful buyers or suppliers, and when barriers are low it draws in entrants."
              ],
              [
                "Technology and innovation",
                "High-tech industries are the profitable ones.",
                "Technology helps only if it changes the forces, by raising barriers or weakening buyers, for example. Plenty of low-tech industries with high barriers or price-insensitive buyers out-earn glamorous ones that attract crowds of competitors."
              ],
              [
                "Government",
                "Regulation is a sixth force.",
                "Policy acts through the five: patents and licensing raise barriers to entry, rules that make switching easier strengthen buyers, and subsidies can keep weak rivals in business."
              ],
              [
                "Complements",
                "Products used together, such as hardware and software, form a sixth force.",
                "Complements also work through the forces, for example by raising customers' switching costs or lowering the barriers to entry."
              ]
            ]
          },
          {
            type: "table",
            eyebrow: "Doing the analysis",
            title: "Common mistakes, and what to do instead",
            intro: "Porter's list of the ways the analysis goes wrong.",
            columns: ["Mistake", "Do this instead"],
            widths: ["19rem", null],
            rows: [
              ["Defining the industry too broadly or too narrowly", "Draw the line by structure. If two products, or two regions, face different forces, they are different industries."],
              ["Making a list of everything that might matter", "Work out how each force operates and how strong it is. A list of factors isn't an analysis."],
              ["Giving all five forces equal attention", "Find the one or two strongest forces and go deep on them."],
              ["Confusing effect with cause", "Price-sensitive buyers are an effect. Look for the cause in the buyers' own economics, such as what the product costs them relative to their profits."],
              ["Taking a snapshot", "Look at which way each force is moving and what the trends will do to the structure."],
              ["Mistaking a cycle for a change in structure", "Swings in demand come and go. Ask whether the forces themselves have shifted."],
              ["Using it to call an industry good or bad", "Use it to find a position, anticipate change and reshape the structure."]
            ]
          },
          {
            type: "brief",
            eyebrow: "So what",
            title: "What the analysis is for",
            cols: 4,
            points: [
              {
                t: "Find the best position.",
                d: "Look for the place in the industry where the forces are weakest: customers with less power, products less exposed to substitutes, segments entrants find hard to reach."
              },
              {
                t: "See changes in structure coming.",
                d: "Shifts in the forces open new positions and close old ones. The company that sees them first can move first."
              },
              {
                t: "Reshape the structure.",
                d: "A company can raise barriers to entry, standardize inputs to weaken suppliers, steer competition away from price, or grow the profit pool everyone shares."
              },
              {
                t: "Then explain the gap from the average.",
                d: "The forces set the industry's average. Why some companies earn far more, and others far less, is the subject of <a href=\"@advantage\">competitive advantage</a>, the next chapter."
              }
            ]
          }
        ],
        end: {
          related: [
            { title: "Competition: the right mindset", where: "Chapter 1", page: "mindset" },
            { title: "Competitive advantage", where: "Chapter 3", page: "advantage" },
            { title: "Trade-offs", where: "Chapter 5", page: "trade-offs" }
          ],
          cta: { page: "advantage", kicker: "Next", text: "Where a company beats its industry's average" }
        }
      },
      // A reference page. Advantage as superior returns from relative price or relative cost,
      // industry structure plus relative position as the two sources of profitability, the
      // value chain and the value system follow Porter's published work as I remember
      // Magretta presenting it, unchecked against her wording. The generic value chain and the
      // cost and uniqueness drivers are from Porter's Competitive Advantage (1985); unchecked
      // whether Magretta lists the drivers. The P&L schematic, the activity examples and the
      // "claims" table are ours.
      "advantage": {
        navLabel: "Advantage",
        title: "Competitive advantage",
        eyebrow: "Part I · Chapter 03",
        layout: "dense",
        dek:
          "In everyday talk, an advantage is anything a company is good at. Porter means something narrower and more useful: a difference in relative price or relative cost that shows up in the P&L, traced back to differences in what the company does.",
        blocks: [
          {
            type: "brief",
            eyebrow: "In brief",
            title: "The argument in six points",
            points: [
              {
                t: "Advantage means superior returns, sustained.",
                d: "A company has a competitive advantage when it earns a higher return on invested capital than its rivals, year after year. Being good at something is not enough."
              },
              {
                t: "Profitability has two sources.",
                d: "<a href=\"@five-forces\">Industry structure</a> sets the average an industry earns. A company's relative position within the industry decides whether it does better or worse than that average."
              },
              {
                t: "Relative position shows up in two numbers.",
                d: "A higher relative price, because customers will pay more for what it offers, or a lower relative cost. Sometimes both, but rarely for long."
              },
              {
                t: "Every price or cost difference comes from activities.",
                d: "The value chain breaks a company into the activities that create value for buyers and incur cost. An advantage must trace back to doing some of them differently, or doing them better."
              },
              {
                t: "Look beyond the company.",
                d: "Its chain sits in a value system with suppliers, channels and buyers. What a buyer will pay depends on what the product does for the buyer's own activities."
              },
              {
                t: "Strengths count only if they reach the P&L.",
                d: "A brand, a patent, talented people or a culture are advantages only to the extent that they raise price or lower cost relative to rivals, in ways rivals can't easily match."
              }
            ]
          },
          {
            type: "figure",
            eyebrow: "Figure",
            title: "Advantage lives in the P&L",
            intro: "Price and cost per unit for a company at the industry's average and for two companies that beat it in different ways. A schematic: the heights are illustrative.",
            alt: "Three stacked bars. The industry average has a cost portion and a thin margin on top, reaching the average price. The higher relative price bar costs a little more but sells for more, so its margin is wider. The lower relative cost bar sells for a little less but costs much less, so its margin is also wider.",
            svg: `<svg viewBox="0 0 400 290" xmlns="http://www.w3.org/2000/svg">
              <path class="sv-grid sv-dash" d="M25 70 H390"/>
              <text class="sv-k" x="25" y="63">AVERAGE PRICE</text>
              <path class="sv-axis" d="M20 245 H392"/>
              <rect class="sv-box" x="40" y="100" width="70" height="145"/>
              <rect class="sv-box-pen" x="40" y="70" width="70" height="30" style="fill: var(--series-profit)"/>
              <rect class="sv-box" x="160" y="88" width="70" height="157"/>
              <rect class="sv-box-pen" x="160" y="40" width="70" height="48" style="fill: var(--series-profit)"/>
              <rect class="sv-box" x="280" y="128" width="70" height="117"/>
              <rect class="sv-box-pen" x="280" y="82" width="70" height="46" style="fill: var(--series-profit)"/>
              <text class="sv-t sv-tp" x="75" y="90" text-anchor="middle">margin</text>
              <text class="sv-t sv-tp" x="195" y="69" text-anchor="middle">margin</text>
              <text class="sv-t sv-tp" x="315" y="110" text-anchor="middle">margin</text>
              <text class="sv-t2" x="75" y="177" text-anchor="middle">cost</text>
              <text class="sv-t2" x="195" y="171" text-anchor="middle">cost</text>
              <text class="sv-t2" x="315" y="191" text-anchor="middle">cost</text>
              <path class="sv-line-pen" d="M237 40 V70"/><text class="sv-t2" x="242" y="54">premium</text>
              <path class="sv-line-pen" d="M357 100 V128"/><text class="sv-t2" x="362" y="112">cost</text><text class="sv-t2" x="362" y="125">saving</text>
              <text class="sv-t sv-b" x="75" y="263" text-anchor="middle">Industry</text><text class="sv-t sv-b" x="75" y="279" text-anchor="middle">average</text>
              <text class="sv-t sv-b" x="195" y="263" text-anchor="middle">Higher</text><text class="sv-t sv-b" x="195" y="279" text-anchor="middle">relative price</text>
              <text class="sv-t sv-b" x="315" y="263" text-anchor="middle">Lower</text><text class="sv-t sv-b" x="315" y="279" text-anchor="middle">relative cost</text>
            </svg>`,
            notes: [
              {
                t: "A price premium",
                d: "is worth having only if it exceeds the extra cost of earning it. Here buyers pay more and the company spends a little more to serve them."
              },
              {
                t: "A cost advantage",
                d: "is worth having only if it isn't given away in price. Here the company charges a little less than average and spends much less."
              },
              {
                t: "Both at once is unusual.",
                d: "The activities that make buyers pay more usually cost more, and those that cut cost usually cut what buyers value. Choosing between them is the subject of <a href=\"@trade-offs\">trade-offs</a>."
              }
            ]
          },
          {
            type: "value-chain",
            eyebrow: "Figure",
            title: "The value chain",
            intro:
              "Porter's generic value chain: the activities through which a company designs, makes, sells, delivers and supports what it offers. Every cost is incurred in some activity, and everything buyers value is created by one.",
            support: [
              { name: "Firm infrastructure", d: "General management, planning, finance, accounting, legal, quality management" },
              { name: "Human resource management", d: "Recruiting, training, development and pay, for every activity" },
              { name: "Technology development", d: "Research, product and process design, information systems" },
              { name: "Procurement", d: "Buying the inputs every activity uses: materials, equipment, services" }
            ],
            primary: [
              { name: "Inbound logistics", d: "Receiving, storing and moving inputs; inventory control" },
              { name: "Operations", d: "Turning inputs into the product: making, assembling, packaging, testing" },
              { name: "Outbound logistics", d: "Processing orders, warehousing, shipping and delivery" },
              { name: "Marketing and sales", d: "Advertising, pricing, channels, the sales force" },
              { name: "Service", d: "Installation, repair, training, spare parts" }
            ],
            marginLabel: "Margin",
            caption:
              "After the generic value chain in Porter's Competitive Advantage (1985); Magretta presents a simplified version. Activity descriptions are ours. Industries differ in which activities matter most."
          },
          {
            type: "figure",
            eyebrow: "Figure",
            title: "The value system",
            intro: "A company's chain is one link in a larger system. Advantage can come from how it connects to the chains on either side.",
            alt: "Four boxes in a row joined by arrows: suppliers' value chains, the company's value chain, channels' value chains, and buyers' value chains.",
            svg: `<svg viewBox="0 0 640 96" xmlns="http://www.w3.org/2000/svg">
              <defs><marker id="sv-arr-vs" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path class="sv-head" d="M0 0 L10 5 L0 10 z"/></marker></defs>
              <rect class="sv-box" x="2" y="18" width="130" height="60" rx="4"/>
              <rect class="sv-box-pen" x="170" y="18" width="130" height="60" rx="4"/>
              <rect class="sv-box" x="338" y="18" width="130" height="60" rx="4"/>
              <rect class="sv-box" x="506" y="18" width="130" height="60" rx="4"/>
              <path class="sv-line" d="M134 48 H166" marker-end="url(#sv-arr-vs)"/>
              <path class="sv-line" d="M302 48 H334" marker-end="url(#sv-arr-vs)"/>
              <path class="sv-line" d="M470 48 H502" marker-end="url(#sv-arr-vs)"/>
              <text class="sv-t" x="67" y="45" text-anchor="middle">Suppliers'</text><text class="sv-t" x="67" y="61" text-anchor="middle">value chains</text>
              <text class="sv-t sv-b" x="235" y="45" text-anchor="middle">The company's</text><text class="sv-t sv-b" x="235" y="61" text-anchor="middle">value chain</text>
              <text class="sv-t" x="403" y="45" text-anchor="middle">Channels'</text><text class="sv-t" x="403" y="61" text-anchor="middle">value chains</text>
              <text class="sv-t" x="571" y="45" text-anchor="middle">Buyers'</text><text class="sv-t" x="571" y="61" text-anchor="middle">value chains</text>
            </svg>`,
            svgNarrow: `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
              <defs><marker id="sv-arr-vsn" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path class="sv-head" d="M0 0 L10 5 L0 10 z"/></marker></defs>
              <rect class="sv-box" x="40" y="2" width="220" height="48" rx="4"/>
              <rect class="sv-box-pen" x="40" y="84" width="220" height="48" rx="4"/>
              <rect class="sv-box" x="40" y="166" width="220" height="48" rx="4"/>
              <rect class="sv-box" x="40" y="248" width="220" height="48" rx="4"/>
              <path class="sv-line" d="M150 52 V80" marker-end="url(#sv-arr-vsn)"/>
              <path class="sv-line" d="M150 134 V162" marker-end="url(#sv-arr-vsn)"/>
              <path class="sv-line" d="M150 216 V244" marker-end="url(#sv-arr-vsn)"/>
              <text class="sv-t" x="150" y="31" text-anchor="middle">Suppliers' value chains</text>
              <text class="sv-t sv-b" x="150" y="113" text-anchor="middle">The company's value chain</text>
              <text class="sv-t" x="150" y="195" text-anchor="middle">Channels' value chains</text>
              <text class="sv-t" x="150" y="277" text-anchor="middle">Buyers' value chains</text>
            </svg>`,
            notes: [
              {
                t: "Buyer value is what the product does to the buyer's chain.",
                d: "A business buyer pays more for something that lowers its own costs or raises its performance. A consumer pays more for what makes life easier, better or cheaper overall."
              },
              {
                t: "Links count as much as activities.",
                d: "How a company coordinates with suppliers and channels, from shared forecasts to delivery schedules, can lower cost or raise value on both sides."
              }
            ]
          },
          {
            type: "table",
            eyebrow: "Where advantage comes from",
            title: "Porter's drivers of cost and uniqueness",
            intro:
              "What decides an activity's cost, and what lets it create something buyers will pay more for. The same drivers often work both ways, which is why a company has to choose which to pursue.",
            columns: ["Driver", "Lowers relative cost when…", "Raises relative price when…"],
            widths: ["11rem", null, null],
            rows: [
              ["Scale", "Volume spreads fixed costs, from factories to advertising, over more units", "Size lets a company offer what small rivals can't, such as nationwide service"],
              ["Learning", "Experience makes activities cheaper: better layouts, schedules, yields", "Experience improves quality and know-how that buyers notice"],
              ["Capacity utilization", "Assets run full rather than idle through the cycle", "—"],
              ["Linkages", "Activities are coordinated so one makes another cheaper, inside the chain or with suppliers and channels", "Activities are coordinated to deliver more, such as faster or more reliable delivery"],
              ["Interrelationships", "Activities are shared with sister businesses, such as a sales force or plant", "Shared activities let a company offer a broader, joined-up product"],
              ["Integration", "Doing an activity in-house, or outsourcing it, costs less", "Control of more of the chain improves what the buyer gets"],
              ["Timing", "Moving first, or late, gives access to cheaper inputs or technology", "Being first builds reputation; being late lets a company offer the latest technology"],
              ["Location", "Sites cut wages, transport, or the cost of reaching customers", "Sites are convenient for buyers"],
              ["Policy choices", "Choosing what not to offer: fewer features, services or product lines", "Choosing to offer more: features, service, quality, speed"],
              ["Institutional factors", "Regulation, taxes or unions work in the company's favor", "Rules or standards favor what the company offers"]
            ],
            foot: "From Porter's Competitive Advantage (1985). Descriptions are our paraphrase."
          },
          {
            type: "table",
            eyebrow: "Applying the test",
            title: "Is it really an advantage?",
            intro: "Common claims, and the question Porter's definition puts to each. Our examples.",
            columns: ["The claim", "The test"],
            widths: ["15rem", null],
            rows: [
              ["“We have the best people.”", "Do they let the company perform specific activities at lower cost, or in ways buyers pay more for, and could rivals hire people just as good?"],
              ["“Our brand is strong.”", "Does it show up as a price premium, or a lower cost of winning customers, sustained against rivals?"],
              ["“We're the market leader.”", "Leadership helps only through scale-driven cost or what buyers will pay. Many leaders earn no more than the industry average."],
              ["“We have a core competence in X.”", "Locate it in particular activities, and show what it does to their cost or to buyer value."],
              ["“We're growing fast.”", "Growth isn't an advantage. Check returns on the capital the growth consumes."],
              ["“We're cheaper than our rivals.”", "A lower price is not a lower cost. Without a cost advantage, it just moves margin to customers."]
            ]
          }
        ],
        end: {
          related: [
            { title: "The five forces", where: "Chapter 2", page: "five-forces" },
            { title: "Competition: the right mindset", where: "Chapter 1", page: "mindset" },
            { title: "Creating value", where: "Chapter 4", page: "value" },
            { title: "Trade-offs", where: "Chapter 5", page: "trade-offs" }
          ],
          cta: { page: "value", kicker: "Next", text: "The value a strategy sets out to create" }
        }
      },
      // The three questions of a value proposition, the tailored value chain as the second
      // test of a strategy, and Enterprise Rent-A-Car as an example follow my reading of
      // Magretta's chapter 4, unchecked against her wording and her account of Enterprise.
      // The rental company, its options and the rules are invented.
      "value": {
        navLabel: "Value",
        title: "Creating value",
        eyebrow: "Part II · Chapter 04",
        dek:
          "Strategy starts with the value a company sets out to create: for which customers, meeting which needs, at what relative price. Porter calls the answer the value proposition, and it becomes a strategy only when the value chain is tailored to deliver it.",
        blocks: [
          {
            type: "prose",
            sections: [
              {
                n: "1",
                title: "Three questions",
                paras: [
                  "A value proposition answers three questions. Which customers will the company serve? Which of their needs will it meet? And at what price, relative to the alternatives? A distinctive proposition answers them differently from rivals: it serves customers others neglect, meets needs others meet poorly, or charges a price that others can't profitably match.",
                  "The answers have to fit together. A company can't serve price-conscious customers with an expensive feature they don't value, or charge a premium to customers whose budgets are set by someone else. The three questions are one choice, not three."
                ],
                side: {
                  label: "Outward and inward",
                  html: "<p>The value proposition looks outward, at customers. The value chain looks inward, at the company's own activities. A strategy needs both, and they need to match.</p>"
                }
              }
            ]
          },
          {
            type: "value-prop",
            title: "Answer the three questions",
            intro:
              "An invented car rental company is deciding what to stand for. Choose an answer to each question and see whether they make a coherent value proposition, and what it would take to deliver one.",
            chainLabel: "A value chain tailored to it",
            badTitle: "The answers contradict each other",
            weakTitle: "The answers don't quite hang together",
            hint: "Change one answer at a time. There are three coherent positions to find.",
            start: { customers: "biz", needs: "speed", price: "below" },
            questions: [
              {
                id: "customers",
                label: "Which customers?",
                options: [
                  { id: "biz", label: "Business travelers flying in" },
                  { id: "repair", label: "Local drivers whose own car is in the shop" },
                  { id: "tourists", label: "Holidaymakers on a budget" }
                ]
              },
              {
                id: "needs",
                label: "Which needs?",
                options: [
                  { id: "speed", label: "Speed at the airport and a new car" },
                  { id: "home", label: "A car near home, delivered and collected" },
                  { id: "cheap", label: "The lowest rate, no frills" }
                ]
              },
              {
                id: "price",
                label: "What relative price?",
                options: [
                  { id: "premium", label: "Above the market" },
                  { id: "below", label: "Below airport rates" },
                  { id: "lowest", label: "The lowest in the market" }
                ]
              }
            ],
            rules: [
              { a: "biz", b: "home", fit: "bad", text: "Travelers who have just flown in aren't near home. Delivery to a home address is no use to them." },
              { a: "biz", b: "cheap", fit: "weak", text: "Business travelers' employers care more about their time than the daily rate." },
              { a: "repair", b: "speed", fit: "bad", text: "They aren't at an airport. A fast counter there doesn't help someone whose car is in a local garage." },
              { a: "repair", b: "cheap", fit: "weak", text: "Price matters, but an insurer often pays. Getting a car without a trip across town matters more." },
              { a: "tourists", b: "speed", fit: "weak", text: "Holidaymakers will wait a few minutes at the counter to save money." },
              { a: "tourists", b: "home", fit: "bad", text: "Tourists aren't at home. They need a car where they arrive." },
              { a: "speed", b: "below", fit: "weak", text: "Fast airport service and new cars are costly to provide, and a below-market price leaves little to pay for them." },
              { a: "speed", b: "lowest", fit: "bad", text: "The fastest service and the newest cars can't be delivered at the lowest price in the market." },
              { a: "home", b: "premium", fit: "weak", text: "Delivery is valued, but the customers who need it, or their insurers, cap what they'll pay." },
              { a: "home", b: "lowest", fit: "bad", text: "Delivering and collecting cars costs money that a rock-bottom rate can't cover." },
              { a: "cheap", b: "premium", fit: "bad", text: "A no-frills car at a premium price is a contradiction." },
              { a: "cheap", b: "below", fit: "weak", text: "Below airport rates isn't low enough to win customers who choose on price alone." },
              { a: "biz", b: "below", fit: "weak", text: "Business travelers won't switch for a lower rate if the service is slower, so the discount gives money away." },
              { a: "biz", b: "lowest", fit: "bad", text: "The lowest price attracts the customers who care least about what business travelers value." },
              { a: "repair", b: "premium", fit: "bad", text: "Insurers set daily limits for replacement cars, so a premium price is out of reach." },
              { a: "repair", b: "lowest", fit: "weak", text: "Insurers will pay a fair rate. Pricing at the bottom of the market leaves money on the table." },
              { a: "tourists", b: "premium", fit: "bad", text: "Budget holidaymakers won't pay above the market." },
              { a: "tourists", b: "below", fit: "weak", text: "Budget travelers compare prices online, and below airport rates may still not be the cheapest." }
            ],
            positions: [
              {
                picks: { customers: "biz", needs: "speed", price: "premium" },
                title: "The airport position",
                text: "Fast service and new cars for travelers whose companies pay. It's a sound position, and it's also where most big rental companies already compete, so it's crowded.",
                activities: ["Counters inside the terminal", "A young fleet, replaced often", "Corporate accounts and loyalty programs", "Express pickup with no paperwork"]
              },
              {
                picks: { customers: "repair", needs: "home", price: "below" },
                title: "The replacement-car position",
                text: "Cars for people whose own car is off the road, delivered near home, at rates their insurers will pay. Airport-based rivals aren't set up to serve them.",
                activities: ["Small offices in neighborhoods, where rents are low", "Staff who pick customers up and drop them off", "Ties with insurers and repair shops, who send the business", "Slightly older cars, kept longer"]
              },
              {
                picks: { customers: "tourists", needs: "cheap", price: "lowest" },
                title: "The budget leisure position",
                text: "The lowest rate for holidaymakers who'll trade convenience for price.",
                activities: ["Lots outside the airport, reached by shuttle bus", "Older, basic cars", "Booking online only", "Extras such as insurance sold separately"]
              }
            ]
          },
          {
            type: "prose",
            sections: [
              {
                n: "2",
                title: "A tailored value chain",
                paras: [
                  "A distinctive value proposition isn't enough on its own. If a company delivers it with the same activities as everyone else, rivals can offer the same thing and the advantage disappears. The second test of a strategy is a value chain tailored to the proposition: activities done differently, or different activities altogether.",
                  "In the builder, each coherent position comes with its own chain. The replacement-car position can't be run from airport counters, and the airport position can't be run from neighborhood offices. That's the start of the trade-offs the next chapter is about."
                ],
                side: {
                  label: "Enterprise Rent-A-Car",
                  html: "<p>The book's example of a distinctive value proposition: Enterprise built its business on drivers who need a car while their own is being repaired, served from neighborhood offices rather than airport counters.</p>"
                }
              }
            ]
          },
          {
            type: "sorter",
            title: "Which question does it answer?",
            intro: "Six pieces of invented value propositions. Is each one about which customers, which needs, or what relative price?",
            options: [
              { id: "customers", label: "Which customers", hint: "Who the company serves." },
              { id: "needs", label: "Which needs", hint: "What it does for them." },
              { id: "price", label: "What relative price", hint: "How it charges, against the alternatives." }
            ],
            items: [
              { text: "Dental practices with one to three chairs.", answer: "customers", why: "A choice of customer: small practices, not hospital groups or large chains." },
              { text: "Accounting software that works without an IT department.", answer: "needs", why: "A need the customer has: running the software with no technical staff." },
              { text: "A third less than the market leader charges.", answer: "price", why: "A position on price, relative to the main alternative." },
              { text: "Retired couples who travel outside school holidays.", answer: "customers", why: "A group of customers defined by when and how they travel." },
              { text: "A haircut in ten minutes, no appointment needed.", answer: "needs", why: "The need is speed and convenience, not styling." },
              { text: "Free for patients who can't pay, full price for those who can.", answer: "price", why: "A pricing choice. It works only if the value chain keeps costs low enough to carry the free patients." }
            ]
          }
        ],
        end: {
          related: [
            { title: "Competitive advantage", where: "Chapter 3", page: "advantage" },
            { title: "Trade-offs", where: "Chapter 5", page: "trade-offs" },
            { title: "Fit", where: "Chapter 6", page: "fit" }
          ],
          cta: { page: "trade-offs", kicker: "Next", text: "Why choosing what not to do protects a strategy" }
        }
      },
      // Trade-offs as the linchpin, Porter's three sources of trade-offs, straddling, his
      // Continental Lite example and his line about choosing what not to do follow his
      // "What Is Strategy?" (1996) as I remember Magretta presenting them, unchecked against
      // her wording. The airline, its numbers and its links are invented.
      "trade-offs": {
        navLabel: "Trade-offs",
        title: "Trade-offs",
        eyebrow: "Part II · Chapter 05",
        dek:
          "A strategy is as much about what a company chooses not to do as what it does. Porter calls trade-offs the linchpin of strategy: they're what make a good position hard to copy.",
        blocks: [
          {
            type: "prose",
            sections: [
              {
                n: "1",
                title: "You can't be everything",
                paras: [
                  "A trade-off arises when doing more of one thing means doing less of another. An airline can't serve hot meals and turn a plane around in 15 minutes. A brand can't stand for both luxury and thrift. A company that sets out to serve some customers especially well has to accept serving others less well, or not at all.",
                  "Trade-offs are also what protect a strategy. If a rival could copy a successful position without giving up anything it already does, any advantage would soon be competed away. Because copying means sacrificing something the rival values, many won't try, and those that do often end up worse off than before."
                ],
                side: {
                  label: "Straddling",
                  html: "<p>Porter's word for trying to have it both ways is straddling: bolting a rival's way of competing onto your own. His best-known example is Continental Lite, a low-fare service Continental Airlines ran alongside its full-service flights in the 1990s and soon abandoned after heavy losses.</p>"
                }
              }
            ]
          },
          {
            type: "activity-system",
            title: "Design an airline",
            intro:
              "An invented airline chooses how to run six activities. Each choice suits either full service or low cost, and the map shows which choices reinforce each other and which clash. Porter's favorite example of a consistent low-cost system is Southwest Airlines. Try the two consistent strategies here, then mix them.",
            caption: "The airline's six activities and the links between the choices made.",
            linksLabel: "How the choices interact",
            priceLabel: "Average fare",
            costLabel: "Cost a passenger",
            ...AIRLINE
          },
          {
            type: "prose",
            sections: [
              {
                n: "2",
                title: "Where trade-offs come from",
                paras: [
                  "Porter traces trade-offs to three sources. Some are in the activities themselves: equipment, skills and procedures built for one way of working serve another badly. Some are in image and reputation: a company known for one thing confuses customers when it claims the opposite. And some are in coordination: an organization can't pursue every priority with equal force, so clear choices about what matters most make it work better.",
                  "In the airline, every clash is the first kind. Each is an activity designed for one strategy being asked to serve the other."
                ],
                side: {
                  label: "Try this",
                  html: "<p>Start from “Full service” and switch the turnarounds to 15 minutes. One efficient-sounding change creates two clashes and wipes out most of the margin.</p>"
                }
              },
              {
                n: "3",
                title: "Choosing what not to do",
                paras: [
                  "Porter put it in one line: “the essence of strategy is choosing what not to do.” The hard part isn't seeing the trade-offs; it's accepting them. Every customer turned away, every feature left out and every market not entered looks like lost revenue, and the pressure to add them never stops.",
                  "A company that gives in ends up with a position nobody can describe and costs that no single strategy would justify. In the model, that's every mix of the two strategies: each one earns less than either strategy run consistently."
                ],
                side: {
                  label: "Next",
                  html: "<p>The links in the map are the subject of the next chapter, on <a href=\"@fit\">fit</a>: why activities that reinforce each other are worth more together than apart, and harder to copy.</p>"
                }
              }
            ]
          }
        ],
        end: {
          related: [
            { title: "Competitive advantage", where: "Chapter 3", page: "advantage" },
            { title: "Creating value", where: "Chapter 4", page: "value" },
            { title: "Fit", where: "Chapter 6", page: "fit" },
            { title: "Continuity", where: "Chapter 7", page: "continuity" }
          ],
          cta: { page: "fit", kicker: "Next", text: "Why a system of activities is hard to copy" }
        }
      },
      // Porter's three kinds of fit (consistency, reinforcement, optimization of effort), fit
      // as what makes advantage sustainable, and the multiplying odds of copying a system
      // (his 0.9 × 0.9 example) follow "What Is Strategy?" (1996) as I remember Magretta
      // presenting them, unchecked against her wording. The calculators and sorter are ours.
      "fit": {
        navLabel: "Fit",
        title: "Fit",
        eyebrow: "Part II · Chapter 06",
        dek:
          "Fit is how a company's activities work together. Porter calls it the amplifier: it makes each activity worth more, and it turns a strategy into a whole system that a rival would have to copy all at once.",
        blocks: [
          {
            type: "prose",
            sections: [
              {
                n: "1",
                title: "Three kinds of fit",
                paras: [
                  "Porter describes fit at three levels. The first is simple <strong>consistency</strong>: every activity lines up with the strategy, so a low-cost company runs every part of the business lean, not just the factory. The second is <strong>reinforcement</strong>: activities make each other more effective, as short routes make quick turnarounds possible and quick turnarounds let each plane fly more trips. The third is <strong>optimization of effort</strong>: coordinating activities and sharing information among them so that work isn't duplicated or wasted.",
                  "Fit amplifies an advantage. Each linked activity is worth more because of the others, so the whole system is worth more than the sum of its parts."
                ],
                side: {
                  label: "See also",
                  html: "<p>The airline on the <a href=\"@trade-offs\">trade-offs</a> page shows reinforcement at work: its low-cost choices only pay off in combination.</p>"
                }
              }
            ]
          },
          {
            type: "copy-odds",
            title: "The odds of copying a system",
            intro:
              "Suppose a rival can match any one of your activities nine times out of ten. How likely is it to match all of them, when they only work together?",
            pLabel: "Chance of matching any one activity",
            pHint: "How likely the rival is to get each activity right, on its own.",
            nLabel: "Activities that must all be matched",
            nHint: "Activities in your system that depend on each other.",
            maxN: 12,
            start: { p: 90, n: 4 },
            caption: "Chance of matching every activity, by the number of activities that have to be matched."
          },
          {
            type: "prose",
            sections: [
              {
                n: "2",
                title: "Why fit protects",
                paras: [
                  "A rival can often copy a single activity: a sales approach, a process, a product feature. Matching a whole system of activities that depend on each other is far harder. The odds of getting every piece right multiply down with each piece added, and the pieces only pay off together.",
                  "That's why Porter argues that the most durable advantages rest on fit among many activities rather than on any single strength, whether it's called a core competence, a key resource or a critical success factor."
                ],
                side: {
                  label: "Porter's arithmetic",
                  html: "<p>Porter's own illustration: if a rival has a 90% chance of matching any one activity, the chance of matching two is 81%, and of matching four, about 66%.</p>"
                }
              }
            ]
          },
          {
            type: "copy-valley",
            title: "Copying part of a system",
            intro:
              "Take the full-service airline from the trade-offs chapter and have it copy some of the low-cost airline's activities. For each number of activities switched, the chart shows the best and the worst way of choosing them.",
            airline: AIRLINE,
            from: "full",
            to: "low",
            start: 3,
            kLabel: "Activities copied",
            kHint: "Switched from full service to the low-cost way, out of six: routes, fleet, turnarounds, cabin, selling and fares.",
            stayLabel: "Not copying",
            caption: "Margin a passenger, by number of activities copied: the best (blue) and worst (red) choice of which to copy."
          },
          {
            type: "prose",
            sections: [
              {
                n: "3",
                title: "The valley between",
                paras: [
                  "The chart shows why rivals so rarely copy a strategy built on fit. Copying a few activities doesn't deliver a few of the benefits; it breaks the links in the copier's own system without building the links of the new one. In this model, every partial copy earns less than not copying at all, and only a complete copy pays.",
                  "Few companies can make that jump, because it means abandoning most of what they already do. That's what makes the original position durable."
                ],
                side: {
                  label: "Try this",
                  html: "<p>Slide from 0 to 6 activities. The best partial copy never climbs back to the line for not copying until all six are switched.</p>"
                }
              }
            ]
          },
          {
            type: "sorter",
            title: "Which kind of fit?",
            intro: "Six invented companies. Is each one an example of consistency, reinforcement or optimization of effort?",
            options: [
              { id: "consistency", label: "Consistency", hint: "Every activity serves the same strategy." },
              { id: "reinforcement", label: "Reinforcement", hint: "Activities make each other work better." },
              { id: "optimization", label: "Optimization of effort", hint: "Coordination removes waste." }
            ],
            items: [
              {
                text: "A discount retailer keeps its stores, its advertising and its head office as plain as its shelves.",
                answer: "consistency",
                why: "Every activity lines up with the low-cost strategy, not just the obvious ones."
              },
              {
                text: "A furniture maker's flat-pack designs fit more per truck, and the low shipping cost lets it run large out-of-town stores.",
                answer: "reinforcement",
                why: "One activity makes another cheaper or better: the design choice pays off in logistics and in the store format."
              },
              {
                text: "A manufacturer shares its sales forecasts with its suppliers every day, so neither has to hold spare stock.",
                answer: "optimization",
                why: "Sharing information across activities removes duplicated buffers on both sides."
              },
              {
                text: "A luxury hotel spends heavily on staff training, room design and its concierge service, all aimed at the same demanding guests.",
                answer: "consistency",
                why: "Each activity is tailored to the same position, so none undercuts the others."
              },
              {
                text: "An airline's quick turnarounds let each plane fly more trips a day, which supports frequent departures, which attract the short-haul travelers its routes are built for.",
                answer: "reinforcement",
                why: "A chain of activities, each making the next more valuable."
              },
              {
                text: "A clothing chain's stores send sales data to its designers every day, so it makes more of what's selling and less of what isn't.",
                answer: "optimization",
                why: "Coordinating sales and design through shared information cuts unsold stock and markdowns."
              }
            ]
          }
        ],
        end: {
          related: [
            { title: "Trade-offs", where: "Chapter 5", page: "trade-offs" },
            { title: "Competitive advantage", where: "Chapter 3", page: "advantage" },
            { title: "Continuity", where: "Chapter 7", page: "continuity" }
          ],
          cta: { page: "continuity", kicker: "Next", text: "Why a strategy needs years to pay off" }
        }
      },
      // Continuity as the enabler (what it lets a company build, that it isn't standing still,
      // and when change is warranted) follows my reading of Magretta's chapter 7, unchecked
      // against her wording. The simulator is ours.
      "continuity": {
        navLabel: "Continuity",
        title: "Continuity",
        eyebrow: "Part II · Chapter 07",
        dek:
          "A strategy takes years to build: skills, reputation and fit don't appear overnight. Porter calls continuity the enabler, and argues that most companies change direction too often, not too rarely.",
        blocks: [
          {
            type: "prose",
            sections: [
              {
                n: "1",
                title: "Why strategy needs time",
                paras: [
                  "Continuity lets a company build what its strategy depends on. Customers learn what it stands for. Employees, suppliers and channels develop skills and assets tailored to it. And the fit among activities, which takes years to work out, has time to grow. Each change of direction throws some of that away.",
                  "Continuity doesn't mean standing still. Within a stable strategy a company should improve constantly, running its activities better and extending its offer in ways that serve the same customers. What stays fixed is the core: the customers, needs and relative price it has chosen, and the trade-offs that go with them."
                ],
                side: {
                  label: "Reinvention",
                  html: "<p>Porter is skeptical of constant reinvention. A company that changes its strategy every few years never builds the fit that would make any of them pay.</p>"
                }
              }
            ]
          },
          {
            type: "continuity",
            title: "Building a strategy, or rebuilding it",
            intro:
              "An invented company starts halfway to mastering strategy A. Each year it pursues a strategy it gets better at it, and what it knew about the other fades. Change how often it switches, then let the market shift.",
            years: 20,
            start: 0.5,
            learn: 0.3,
            decay: 0.5,
            changeCost: 25,
            shiftYear: 12,
            before: { A: 100, B: 90 },
            after: { A: 50, B: 100 },
            everyLabel: "Change strategy",
            everyHint: "How often the company switches between strategies A and B.",
            shiftLabel: "The market shifts in year 12, making B the better strategy",
            adaptLabel: "Change once, when the market shifts",
            caption: "Profit each year, in millions of dollars, over 20 years.",
            presets: [
              { id: "steady", label: "Stay the course", state: { every: 11, shift: false, adapt: false } },
              { id: "churn", label: "Change every two years", state: { every: 2, shift: false, adapt: false } },
              { id: "stuck", label: "The market shifts", state: { every: 11, shift: true, adapt: false } },
              { id: "adapt", label: "Change when it shifts", state: { every: 11, shift: true, adapt: true } }
            ],
            foot:
              "A toy model, not from the book. Each year closes 30% of the gap to full capability in the strategy being pursued and loses half of the capability in the other. A change of strategy costs $25 million in the year it happens. At full capability, either strategy earns up to $100 million a year."
          },
          {
            type: "prose",
            sections: [
              {
                n: "2",
                title: "When to change",
                paras: [
                  "Strategy should change when the world it was built for changes: when customers' needs shift, when a new technology makes the old trade-offs obsolete, or when a new way of competing appears that the existing strategy can't absorb. Even then, the hard part is usually recognizing that the old trade-offs no longer hold, and accepting the cost of building something new.",
                  "What shouldn't drive a change is impatience: a bad quarter, a rival's announcement, a new management fashion. A strategy abandoned before it has had time to build its fit never gets the chance to pay."
                ],
                side: {
                  label: "Try this",
                  html: "<p>Press “The market shifts”, then “Change when it shifts”. One well-timed change beats both standing still and changing on a schedule.</p>"
                }
              }
            ]
          }
        ],
        end: {
          related: [
            { title: "Fit", where: "Chapter 6", page: "fit" },
            { title: "Trade-offs", where: "Chapter 5", page: "trade-offs" },
            { title: "Creating value", where: "Chapter 4", page: "value" }
          ],
          cta: { page: "five-tests", kicker: "Workbench", text: "Test a strategy against all five tests" }
        }
      },
      // The five tests are Porter's, as Magretta sets them out in part II. The checks are
      // rules of thumb on the wording, not from the book; the examples are invented.
      "five-tests": {
        kind: "tool",
        title: "Test your strategy",
        crumb: "Strategy workbench",
        navLabel: "Workbench",
        eyebrow: "Workbench · The five tests",
        dek:
          "Write down a strategy, your own or one you're studying, and check it against the five tests the second half of the book builds: a distinctive value proposition, a tailored value chain, trade-offs, fit and continuity.",
        blocks: [
          {
            type: "strategy-tests",
            draftKey: "ump.tests",
            defaultExample: "rental",
            examples: {
              rental: {
                label: "A replacement-car company",
                note: "An invented example, built from the replacement-car position on the Creating value page. Edit any field to start your own.",
                customers: "Drivers whose own car is being repaired, and the insurers and garages who arrange cars for them. Not business travelers or tourists.",
                needs: "A car near home without a trip to the airport, arranged quickly by phone, at a rate the insurer will cover.",
                price: "Below airport rates, at or under insurers' daily limits.",
                chain:
                  "Small offices in neighborhoods instead of airport counters.\nStaff who deliver cars to customers and collect them.\nAccounts with insurers and repair shops, who send most of the business.\nCars kept longer than airport rivals keep theirs.",
                tradeoffs: "We don't rent at airports, don't offer luxury models and don't chase the tourist trade.",
                fit: "Cheap neighborhood offices pay for the delivery staff, and delivery is what makes garages and insurers send us their customers, which keeps the offices busy.",
                continuity: "Twelve years so far, and we plan on at least ten more."
              },
              generic: {
                label: "A generic plan",
                note: "An invented plan of the kind Porter warns about. See how many tests it fails.",
                customers: "Everyone who needs a car, from business travelers to families.",
                needs: "Great service and great value.",
                price: "Competitive.",
                chain: "Excellent people and the latest technology.",
                tradeoffs: "",
                fit: "",
                continuity: "We revisit our strategy every year."
              },
              blank: { label: "Start blank" }
            }
          },
          {
            type: "prose",
            sections: [
              {
                n: "1",
                title: "What the checks can't see",
                paras: [
                  "The checks look for the shape of a strategy in the words: named customers, a relative price, things you won't do, links between activities, a horizon in years. They can't tell whether the customers exist in useful numbers, whether rivals already serve them well, or whether the trade-offs are real. A plan can pass every check and still be wrong.",
                  "Use them the way Porter's tests are meant to be used: as questions that expose a vague or borrowed strategy, not as a score to maximize."
                ],
                side: {
                  label: "See also",
                  html: "<p>Each test has its own chapter: <a href=\"@value\">value</a>, <a href=\"@trade-offs\">trade-offs</a>, <a href=\"@fit\">fit</a> and <a href=\"@continuity\">continuity</a>.</p>"
                }
              }
            ]
          }
        ],
        end: {
          related: [
            { title: "Creating value", where: "Chapter 4", page: "value" },
            { title: "Trade-offs", where: "Chapter 5", page: "trade-offs" },
            { title: "Fit", where: "Chapter 6", page: "fit" },
            { title: "Continuity", where: "Chapter 7", page: "continuity" }
          ],
          cta: { page: "", kicker: "Contents", text: "See the map of the book" }
        }
      }
    }
  });
})();
