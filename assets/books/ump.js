// Understanding Michael Porter: The Essential Guide to Competition and Strategy
// (Joan Magretta, 2012). Summaries are paraphrased; keep quotations short and attributed.
// Chapter titles and order follow my reading of the book (two parts, seven chapters, then
// ten practical implications) and are unchecked against it. The cases are companies I
// remember the book using; check them against the text before relying on the details.
(function () {
  "use strict";

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
      { kicker: "Case", title: "Three airlines", desc: "Southwest, a full-service airline and Continental Lite, activity by activity.", page: "trade-offs" },
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
      // A reference page. The three questions of a value proposition, distinctiveness, and the
      // tailored value chain as the second test follow my reading of Magretta's chapter 4,
      // unchecked against her wording. The case details are the standard published accounts
      // (Porter's "What Is Strategy?", 1996, for IKEA and Southwest) and are unchecked
      // against Magretta's telling; underserved and overserved customers is my memory of her
      // framing, unchecked. The three bases of positioning and their examples (Jiffy Lube,
      // Vanguard, Bessemer Trust, Carmike Cinemas) are from Porter's 1996 article; unchecked
      // whether Magretta uses them.
      "value": {
        navLabel: "Value",
        title: "Creating value",
        eyebrow: "Part II · Chapter 04",
        layout: "dense",
        dek:
          "Strategy starts with the value a company sets out to create: for which customers, meeting which needs, at what relative price. Porter calls the answer the value proposition, and it becomes a strategy only when the value chain is tailored to deliver it.",
        blocks: [
          {
            type: "brief",
            eyebrow: "In brief",
            title: "The argument in six points",
            points: [
              {
                t: "A strategy starts with the value it will create.",
                d: "The value proposition answers three questions: which customers the company will serve, which of their needs it will meet, and at what price relative to the alternatives."
              },
              {
                t: "The three answers are one choice.",
                d: "They have to fit: the needs of the chosen customers, met at a price they'll pay and the company can profitably charge. Change one and the others usually change too."
              },
              {
                t: "Distinctive means different from rivals.",
                d: "Serving the same customers' same needs at the same price isn't a strategy. A distinctive proposition targets customers or needs rivals serve poorly, or a price they can't match."
              },
              {
                t: "Look for the underserved and the overserved.",
                d: "Some customers need more than the standard offering gives them; others pay for things they don't value. Each is an opening for a different proposition."
              },
              {
                t: "The value chain must be tailored to it.",
                d: "A proposition delivered with the same activities as rivals can be copied. Tailoring means different activities, or the same activities done differently. It is Porter's second test of a strategy."
              },
              {
                t: "Tailoring creates the trade-offs.",
                d: "Activities built for one proposition serve others badly. That's what makes a good position hard to imitate, the subject of <a href=\"@trade-offs\">the next chapter</a>."
              }
            ]
          },
          {
            type: "table",
            eyebrow: "Cases",
            title: "Four value propositions, and the chains built for them",
            intro: "Each company answered the three questions differently from its industry, then built its activities around the answer.",
            columns: ["Company", "Which customers", "Which needs", "Relative price", "Tailored activities"],
            widths: ["9.5rem", null, null, "8.5rem", null],
            rows: [
              [
                "Enterprise Rent-A-Car",
                "Local drivers whose own car is being repaired or replaced",
                "A car near home, picked up and dropped off, while the insurer handles the bill",
                "Below airport rental rates",
                "Many small neighborhood offices rather than airport counters; staff who collect customers; close ties with insurers and body shops, who send the business"
              ],
              [
                "IKEA",
                "Young furniture buyers who want style at a low price",
                "Good design for a home on a budget, taken home the same day",
                "Low",
                "Its own flat-pack designs; huge out-of-town stores with room settings; self-service; customers collect and assemble the furniture"
              ],
              [
                "Southwest Airlines",
                "Price-sensitive travelers on short routes, many of whom would otherwise drive or take the bus",
                "Low fares and frequent, reliable departures",
                "Low",
                "One type of plane; short point-to-point routes from secondary airports; fast turnarounds; no meals, seat assignments or baggage transfers"
              ],
              [
                "Aravind Eye Hospital",
                "People in India who need cataract surgery, most of whom can't pay much or anything",
                "Safe, high-quality surgery that restores sight",
                "Free or very low for most; paying patients cover the rest",
                "Surgery organized for very high volume; surgeons do only the operation while trained staff do the rest; lenses made in-house; outreach camps in villages"
              ]
            ],
            foot: "Details are the standard published accounts of each company, summarized by us."
          },
          {
            type: "chain-compare",
            eyebrow: "Figure",
            title: "What tailoring looks like: IKEA against a typical furniture retailer",
            intro: "Activity by activity, IKEA does almost nothing the usual way. Each difference either cuts cost or serves its chosen customers better, and many do both.",
            activities: ["Design", "Range", "Showroom", "Sales help", "Stock", "Delivery", "Assembly"],
            rows: [
              {
                name: "Typical retailer",
                cells: [
                  "Buys ranges from outside makers",
                  "Wide, with fabrics and finishes made to order",
                  "Town-center shop, a few pieces on show",
                  "Sales staff guide each customer",
                  "Made to order, weeks of waiting",
                  "Delivered by the store",
                  "Arrives assembled"
                ]
              },
              {
                name: "IKEA",
                pen: true,
                cells: [
                  "Its own designers, designing for low cost and flat packing",
                  "Narrower, all of it in stock",
                  "Huge out-of-town stores showing everything in room settings",
                  "Self-service, with catalogs, tags and tape measures",
                  "Flat-packed in the store's own warehouse",
                  "Customers take it home",
                  "Customers build it"
                ]
              }
            ],
            caption: "After Porter's account of IKEA in “What Is Strategy?”, Harvard Business Review, 1996. Wording ours."
          },
          {
            type: "table",
            eyebrow: "Where positions come from",
            title: "Three bases for a distinctive position",
            intro: "Porter's three ways a position can arise. They often overlap.",
            columns: ["Basis", "What it means", "Porter's examples"],
            widths: ["9.5rem", null, null],
            rows: [
              [
                "Variety",
                "Choosing a subset of an industry's products or services and doing them better or cheaper than anyone, for whichever customers want them",
                "Jiffy Lube does only oil changes and lubrication, not repairs. Vanguard offers low-cost funds with predictable performance."
              ],
              [
                "Needs",
                "Serving most or all the needs of a particular group of customers whose needs differ from the rest",
                "IKEA serves young buyers who want style cheaply. Bessemer Trust serves only very wealthy families."
              ],
              [
                "Access",
                "Serving customers who are reached in a different way, because of where they are or how many there are, even if their needs are similar",
                "Carmike Cinemas ran theaters only in small towns, with lower costs and fewer rivals."
              ]
            ],
            foot: "From Porter's “What Is Strategy?” (1996)."
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
      // A reference page. Trade-offs as the linchpin, Porter's three sources of trade-offs
      // (image, activities, coordination, with his Ivory and Neutrogena example), straddling
      // and repositioning, Continental Lite, operational effectiveness gaps as false
      // trade-offs, and his line about choosing what not to do follow "What Is Strategy?"
      // (1996) as I remember Magretta presenting them, unchecked against her wording. The
      // airline comparison follows Porter's account; the cells are our wording. The
      // objections table is our summary of the chapter's arguments.
      "trade-offs": {
        navLabel: "Trade-offs",
        title: "Trade-offs",
        eyebrow: "Part II · Chapter 05",
        layout: "dense",
        dek:
          "A strategy is as much about what a company chooses not to do as what it does. Porter calls trade-offs the linchpin of strategy: they're what make a good position hard to copy.",
        blocks: [
          {
            type: "brief",
            eyebrow: "In brief",
            title: "The argument in six points",
            points: [
              {
                t: "A trade-off is an incompatibility.",
                d: "More of one thing means less of another. Activities, features or an image suited to one position serve another badly, so a company has to choose."
              },
              {
                t: "Trade-offs make a position defensible.",
                d: "A rival can copy a good position only by giving up something it already values. Many won't, and those that try usually end up worse off."
              },
              {
                t: "They come from three sources.",
                d: "Image and reputation, the activities themselves, and the limits of coordinating one organization around many priorities."
              },
              {
                t: "Imitators reposition or straddle.",
                d: "A rival can abandon its own position to match the leader's, or bolt the leader's way of competing onto its own. Straddling adds the costs of both positions and the advantages of neither."
              },
              {
                t: "Not every trade-off is real.",
                d: "A company far from best practice can improve quality and cut cost at once, because it is closing a gap in operational effectiveness. Real trade-offs appear once it reaches the frontier."
              },
              {
                t: "Strategy is choosing what not to do.",
                d: "In Porter's words, “the essence of strategy is choosing what not to do.” The hard part is holding to it when every customer turned away looks like lost revenue."
              }
            ]
          },
          {
            type: "chain-compare",
            eyebrow: "Case",
            title: "Three airlines, seven activities",
            intro:
              "Southwest's choices rule out a full-service airline's, and the reverse. In 1993 Continental tried to have both on some routes with Continental Lite. It copied the visible parts of Southwest's model and kept the rest of its full-service system, the clashes brought delays and cancellations, and within about two years it was abandoned after losses Porter puts at hundreds of millions of dollars.",
            activities: ["Routes", "Fleet", "Turnarounds", "Cabin", "Fares", "Selling", "Bags"],
            rows: [
              {
                name: "Full-service airline",
                cells: [
                  "Hub-and-spoke network reaching everywhere",
                  "Many aircraft types, sized to each route",
                  "Long enough to wait for connecting passengers and bags",
                  "Meals, assigned seats, first class",
                  "Many fares, including premium business fares",
                  "Travel agents and booking systems",
                  "Checked through to the final destination, on other airlines too"
                ]
              },
              {
                name: "Continental Lite",
                cells: [
                  { d: "More frequent flights on chosen routes, still tied into the hubs", tag: "Copied", hot: true },
                  { d: "The existing mixed fleet", tag: "Kept" },
                  { d: "Cut short", tag: "Copied", hot: true },
                  { d: "No meals, no first class", tag: "Copied", hot: true },
                  { d: "Low fares", tag: "Copied", hot: true },
                  { d: "Still sold through travel agents", tag: "Kept" },
                  { d: "Still checked bags through, and still assigned seats", tag: "Kept" }
                ]
              },
              {
                name: "Southwest",
                pen: true,
                cells: [
                  "Short point-to-point routes between midsize cities and secondary airports",
                  "One type of plane, the Boeing 737",
                  "About 15 minutes at the gate",
                  "No meals, no assigned seats, one class",
                  "Low, simple fares",
                  "Mostly direct, with limited use of agents",
                  "No transfers to other airlines"
                ]
              }
            ],
            caption: "After Porter's account in “What Is Strategy?”, Harvard Business Review, 1996. Wording ours."
          },
          {
            type: "table",
            eyebrow: "Sources",
            title: "Where trade-offs come from",
            columns: ["Source", "Why it forces a choice", "Example"],
            widths: ["11rem", null, null],
            rows: [
              [
                "Image and reputation",
                "A company known for one kind of value lacks credibility, and confuses customers, when it claims another, or two contradictory ones at once.",
                "Porter's: Ivory, a basic, inexpensive everyday soap, would struggle to take on Neutrogena's premium, near-medical reputation."
              ],
              [
                "The activities themselves",
                "Different positions need different product designs, equipment, skills, employee behavior and management systems. What is built for one serves the other badly.",
                "A 15-minute turnaround leaves no time for catering, seat assignments or waiting for connecting bags."
              ],
              [
                "Coordination and control",
                "An organization can't pursue every priority with equal force. Clear choices about what matters tell people what to do; trying to be everything confuses them.",
                "Staff told to cut cost and to pamper customers, without being told which comes first, do neither well."
              ]
            ],
            foot: "The three sources are Porter's, from “What Is Strategy?” (1996). Wording ours."
          },
          {
            type: "table",
            eyebrow: "Objections",
            title: "Arguments against trade-offs, and Porter's answers",
            intro: "Our summary of the objections the chapter takes on.",
            columns: ["The objection", "The answer"],
            widths: ["17rem", null],
            rows: [
              [
                "“The best companies get higher quality and lower cost at the same time.”",
                "They were closing gaps in operational effectiveness, which needs no trade-off. Once a company reaches best practice, more of one costs some of the other."
              ],
              [
                "“We can keep our customers and win theirs too.”",
                "That's straddling. The added activities clash with the existing ones, raising cost for everyone, and the new position lacks the fit that made the original hard to copy."
              ],
              [
                "“Customers want everything.”",
                "Different customers want different things. Serving one group especially well means serving others less well, or not at all."
              ],
              [
                "“Saying no leaves money on the table.”",
                "Serving the wrong customers dilutes the value to the right ones and raises costs across the business. Revenue isn't profit."
              ],
              [
                "“Trade-offs make a company rigid.”",
                "Holding the core choices steady is what lets everything else change quickly. See <a href=\"@continuity\">continuity</a>."
              ]
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
      // A reference page. Porter's three kinds of fit (consistency, reinforcement,
      // optimization of effort) with his Vanguard, Neutrogena and Gap examples, fit as what
      // makes advantage sustainable, the 0.9 × 0.9 arithmetic of copying a system, fit against
      // "core competences", and Southwest's activity-system map all follow "What Is
      // Strategy?" (1996), as I remember Magretta presenting them; unchecked against her
      // wording and her examples. The map's themes and activities follow Porter's exhibit;
      // its links are simplified and drawn by us. The Gap detail is unchecked. The odds past
      // four activities are computed the same way.
      "fit": {
        navLabel: "Fit",
        title: "Fit",
        eyebrow: "Part II · Chapter 06",
        layout: "dense",
        dek:
          "Trade-offs decide what a company won't do. Fit is about how the things it does work together. Porter calls it the amplifier: activities that reinforce each other are worth more together than apart, and far harder to copy.",
        blocks: [
          {
            type: "brief",
            eyebrow: "In brief",
            title: "The argument in six points",
            points: [
              {
                t: "Strategy is a system, not a list.",
                d: "The value of each activity depends on the others. Judged one by one, many of a good strategy's choices look odd; together they make sense."
              },
              {
                t: "Fit comes in three kinds.",
                d: "Consistency between each activity and the strategy; activities that reinforce one another; and optimization of effort, coordinating across activities to remove waste."
              },
              {
                t: "Fit raises the advantage.",
                d: "Linked activities cut cost or raise buyer value more than the same activities would separately. The whole is worth more than the sum of its parts."
              },
              {
                t: "Fit makes the advantage last.",
                d: "A rival has to match the whole system, not one piece of it, and the odds of doing that multiply against it with every activity added."
              },
              {
                t: "It isn't a few core strengths.",
                d: "Porter's contrast with core competences and key success factors: lasting advantage comes from many activities fitting together, not from excelling at a handful."
              },
              {
                t: "Fit needs the other tests.",
                d: "Without <a href=\"@trade-offs\">trade-offs</a> there is nothing distinctive to fit around, and without <a href=\"@continuity\">continuity</a> the system never has time to develop."
              }
            ]
          },
          {
            type: "diagram",
            eyebrow: "Figure",
            title: "Southwest's activity system",
            intro: "Porter's way of drawing fit. The dark pills are the strategy's themes; the boxes are the activities that deliver them. Lines show where one supports another.",
            alt: "A network diagram. Six themes: limited passenger service, frequent reliable departures, high aircraft utilization, lean and highly productive ground and gate crews, very low ticket prices, and short-haul point-to-point routes between midsize cities and secondary airports. Eleven activities link to them, including no meals, no seat assignments, no baggage transfers, 15-minute gate turnarounds, a standardized fleet of 737s, limited use of travel agents, automatic ticketing machines, flexible union contracts, high pay and high employee stock ownership.",
            w: 920,
            h: 590,
            nodes: [
              { id: "L", label: "Limited passenger\nservice", x: 260, y: 165, kind: "theme" },
              { id: "F", label: "Frequent, reliable\ndepartures", x: 700, y: 110, kind: "theme" },
              { id: "U", label: "High aircraft\nutilization", x: 470, y: 300, kind: "theme" },
              { id: "C", label: "Lean, highly productive\nground and gate crews", x: 760, y: 345, kind: "theme" },
              { id: "P", label: "Very low\nticket prices", x: 160, y: 370, kind: "theme" },
              { id: "R", label: "Short-haul, point-to-point routes\nbetween midsize cities and\nsecondary airports", x: 470, y: 520, kind: "theme" },
              { id: "meals", label: "No meals", x: 80, y: 55 },
              { id: "seats", label: "No seat\nassignments", x: 250, y: 42 },
              { id: "bags", label: "No baggage\ntransfers", x: 430, y: 55 },
              { id: "turns", label: "15-minute gate\nturnarounds", x: 520, y: 180 },
              { id: "fleet", label: "Standardized fleet\nof 737 aircraft", x: 650, y: 240 },
              { id: "conn", label: "No connections with\nother airlines", x: 285, y: 432 },
              { id: "agents", label: "Limited use of\ntravel agents", x: 72, y: 478 },
              { id: "ticket", label: "Automatic ticketing\nmachines", x: 210, y: 548 },
              { id: "union", label: "Flexible union\ncontracts", x: 852, y: 232 },
              { id: "pay", label: "High pay for\nemployees", x: 848, y: 470 },
              { id: "stock", label: "High employee\nstock ownership", x: 700, y: 538 }
            ],
            links: [
              ["meals", "L"], ["seats", "L"], ["bags", "L"], ["conn", "L"], ["L", "turns"], ["L", "P"],
              ["turns", "U"], ["turns", "F"], ["fleet", "U"], ["fleet", "F"], ["fleet", "C"],
              ["U", "F"], ["U", "P"], ["R", "U"], ["R", "F"], ["conn", "R"],
              ["C", "P"], ["union", "C"], ["pay", "C"], ["stock", "C"],
              ["agents", "P"], ["ticket", "P"], ["agents", "ticket"]
            ],
            list: { kind: "theme", k: "Supported by" },
            full: true,
            notes: [
              { t: "Almost every activity serves more than one theme.", d: "No meals and no seat assignments limit service, which makes 15-minute turnarounds possible, which raises aircraft utilization, which lowers fares." },
              { t: "The links are the advantage.", d: "Each box on its own is easy to copy. What a rival can't easily copy is the way each one makes the others cheaper or more effective." },
              { t: "A straddler gets the boxes without the links.", d: "Continental Lite copied several activities but kept hubs, agents and a mixed fleet, so the reinforcements never appeared. See <a href=\"@trade-offs\">trade-offs</a>." }
            ],
            caption: "After the activity-system map of Southwest in Porter's “What Is Strategy?”, Harvard Business Review, 1996. Links simplified and drawn by us."
          },
          {
            type: "table",
            eyebrow: "Kinds of fit",
            title: "Three orders of fit",
            intro: "Each kind builds on the one before.",
            columns: ["Kind", "What it means", "Porter's example"],
            widths: ["11rem", null, null],
            rows: [
              [
                "Consistency",
                "Each activity is aligned with the overall strategy, so their advantages add up rather than cancel out.",
                "Vanguard aligns its activities with low cost: it sells funds directly, keeps trading in its funds low, and spends little on marketing."
              ],
              [
                "Reinforcement",
                "Activities strengthen one another, so each is worth more because of the others.",
                "Neutrogena markets to dermatologists, whose recommendations support its mild, medical image, which in turn appeals to the upscale hotels that put its soap in their rooms."
              ],
              [
                "Optimization of effort",
                "Activities are coordinated, sharing information and designed together, to cut redundancy and wasted effort across the chain.",
                "The Gap restocks its basic items frequently from its own warehouses, so stores carry less stock and still rarely run out."
              ]
            ],
            foot: "From Porter's “What Is Strategy?” (1996). Wording ours."
          },
          {
            type: "bar-chart",
            eyebrow: "The arithmetic",
            title: "Why a system is hard to copy",
            intro:
              "Suppose a rival has a 90% chance of matching any one activity. Its chance of matching all of them falls fast: below even odds from seven activities, about a third at ten.",
            unit: "%",
            decimals: 0,
            max: 100,
            ticks: [0, 25, 50, 75, 100],
            ref: { value: 50, label: "Even odds" },
            labelHead: "Activities to match",
            valueHead: "Chance of matching all",
            rows: [
              { label: "1 activity", value: 90, show: true },
              { label: "2 activities", value: 81, show: true },
              { label: "3 activities", value: 72.9 },
              { label: "4 activities", value: 65.61, show: true },
              { label: "5 activities", value: 59.049 },
              { label: "6 activities", value: 53.1441 },
              { label: "7 activities", value: 47.82969, show: true },
              { label: "8 activities", value: 43.046721 },
              { label: "9 activities", value: 38.7420489 },
              { label: "10 activities", value: 34.86784401, show: true },
              { label: "11 activities", value: 31.381059609 },
              { label: "12 activities", value: 28.2429536481 }
            ],
            source: "Porter's arithmetic in “What Is Strategy?” (1996): matching two activities at 90% each is 81%, four is 66%. The other rows follow the same rule, 0.9 to the power of the number of activities."
          },
          {
            type: "table",
            eyebrow: "In practice",
            title: "How fit gets lost",
            intro: "Our summary of the ways a system of activities erodes from the inside.",
            columns: ["What happens", "Why it hurts"],
            widths: ["17rem", null],
            rows: [
              ["Each function optimizes on its own", "Purchasing buys the cheapest part, marketing adds the feature customers ask for, and the links between them break."],
              ["Best practices are adopted one activity at a time", "Each looks like an improvement, but it moves the company toward everyone else's way of working."],
              ["Activities are outsourced for cost alone", "The partner does the work efficiently but not in the way the rest of the system depends on."],
              ["Activities are added to win new customers", "They clash with the existing ones, which is straddling by another route."],
              ["The strategy changes every few years", "Fit takes years to build; a system that keeps being redesigned never develops it."]
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
      // A reference page. Continuity as the enabler, what it builds, the paradox that
      // continuity enables change, the reasons to change a strategy, and the five tests
      // follow my reading of Magretta's chapter 7 and part II, unchecked against her wording.
      // A horizon of a decade or more is from Porter's "What Is Strategy?" (1996). The
      // Southwest timeline is from the public record, not the book: expansion beyond Texas
      // after deregulation (1979), booking on southwest.com (1996), larger airports such as
      // Denver (2006), the AirTran purchase (2011) and the transfer of its 717s to Delta, and
      // annual profits from 1973 to 2019. The "when to change" table is our summary.
      "continuity": {
        navLabel: "Continuity",
        title: "Continuity",
        eyebrow: "Part II · Chapter 07",
        layout: "dense",
        dek:
          "A strategy takes years to build: skills, reputation and fit don't appear overnight. Porter calls continuity the enabler, and argues that most companies change direction too often, not too rarely.",
        blocks: [
          {
            type: "brief",
            eyebrow: "In brief",
            title: "The argument in six points",
            points: [
              {
                t: "A strategy needs years.",
                d: "Porter suggests a strategic position should last a decade or more, not a single planning cycle."
              },
              {
                t: "Continuity builds what the strategy depends on.",
                d: "Customers learn what the company stands for. Suppliers, channels and employees build skills and assets tailored to it. Fit among activities has time to develop."
              },
              {
                t: "Frequent change is expensive.",
                d: "Each change of direction confuses customers, strands tailored investments and resets the fit. A company that keeps reinventing itself ends up straddling its own past positions."
              },
              {
                t: "Continuity makes change easier.",
                d: "With the core fixed, a company can improve constantly: run its activities better and extend its offer to the same customers, without confusing anyone about what it is for."
              },
              {
                t: "Change when the world changes.",
                d: "Rethink the strategy when customers' needs shift, when an innovation makes the old trade-offs obsolete, or when a breakthrough undermines every existing position. Not after a bad quarter."
              },
              {
                t: "Continuity is the fifth test.",
                d: "Together with a distinctive value proposition, a tailored value chain, trade-offs and fit, it completes Porter's tests of a good strategy, set out in the table below."
              }
            ]
          },
          {
            type: "table",
            eyebrow: "What continuity builds",
            title: "Assets that take years, and what a change of strategy does to them",
            columns: ["Asset", "How it builds", "After a change of strategy"],
            widths: ["12rem", null, null],
            rows: [
              ["Reputation and brand", "Customers see the same promise kept, year after year, until they know what to expect", "Customers are unsure what the company stands for; the old reputation may work against the new position"],
              ["Customer relationships", "Repeat business and familiarity lower the cost of selling and raise trust", "The customers the old strategy served may be the wrong ones for the new"],
              ["Suppliers' and channels' capabilities", "Partners invest in equipment, processes and skills tailored to the company's way of working", "Those investments are stranded, and partners grow wary of making the next ones"],
              ["Employees' skills and culture", "People learn the activities and the reasons behind them, and act consistently without being told", "Skills built for the old trade-offs are wasted; people get mixed signals about what matters"],
              ["Fit among activities", "Links between activities are discovered, refined and deepened over time", "The system is pulled apart and has to be rebuilt, starting from little fit at all"]
            ]
          },
          {
            type: "table",
            eyebrow: "Judgment",
            title: "When to change the strategy, and when not to",
            intro: "Our summary of the chapter's guidance.",
            columns: ["Situation", "Change it?", "Why"],
            widths: ["16rem", "7rem", null],
            rows: [
              ["Customers' needs shift so the value proposition no longer fits", "<strong>Yes</strong>", "The strategy was built for needs that are going away."],
              ["An innovation makes the old trade-offs obsolete", "<strong>Yes</strong>", "If a rival can now offer both sides of a trade-off, the position is no longer protected."],
              ["A breakthrough undercuts every existing position", "<strong>Yes</strong>", "Rethink from the value proposition up, rather than patching activities."],
              ["Results disappoint for a quarter or two", "No", "Look first at operational effectiveness within the strategy."],
              ["A rival makes a bold move", "No", "Unless it changes the trade-offs, copying it is straddling."],
              ["A new management idea, or a new leader, arrives", "No", "The value of continuity depends on not resetting the strategy for reasons like these."],
              ["Growth in the core slows", "Rarely", "Look for extensions that serve the same customers or use the same activities before repositioning."]
            ]
          },
          {
            type: "table",
            eyebrow: "Case",
            title: "Southwest: what held, and what changed within it",
            intro: "Southwest's core choices lasted for decades while much else changed. It made a profit every year from 1973 to 2019.",
            columns: ["Change", "When", "Fit with the core"],
            widths: ["18rem", "6rem", null],
            rows: [
              ["Expanded beyond Texas after airline deregulation", "1979", "Consistent: the same model, flown to new cities"],
              ["Sold tickets directly on its own website", "1996", "Consistent: direct selling at lower cost than agents"],
              ["Began serving larger, busier airports, such as Denver", "2000s", "A stretch: congestion slows the quick turnarounds the model depends on"],
              ["Bought AirTran, with its Atlanta hub and a second aircraft type", "2011", "A stretch: Southwest later moved AirTran's planes to Delta and folded the network into its own model"]
            ],
            foot: "From the public record, not the book."
          },
          {
            type: "table",
            eyebrow: "Part II in one table",
            title: "Porter's five tests of a good strategy",
            columns: ["Test", "The question", "Chapter"],
            widths: ["13rem", null, "8rem"],
            rows: [
              ["A distinctive value proposition", "Does the company serve different customers or needs, or charge a different relative price, from its rivals?", "<a href=\"@value\">Creating value</a>"],
              ["A tailored value chain", "Are its activities designed for that proposition, rather than the industry's usual ones?", "<a href=\"@value\">Creating value</a>"],
              ["Trade-offs different from rivals'", "What does it choose not to do, and would a rival have to give something up to copy it?", "<a href=\"@trade-offs\">Trade-offs</a>"],
              ["Fit across the value chain", "Do its activities reinforce one another, so the system is worth more than its parts?", "<a href=\"@fit\">Fit</a>"],
              ["Continuity over time", "Has the core held long enough for the rest to develop?", "Continuity"]
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
