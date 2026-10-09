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
      { kicker: "Toy model", title: "The five forces", desc: "Set the forces for an industry and see how much of its value it keeps.", page: "five-forces" },
      { kicker: "Builder", title: "Design an airline", desc: "Choose six activities and watch them reinforce or clash.", page: "trade-offs" }
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
          { n: 4, title: "Creating value: the core", blurb: "A distinctive value proposition and a value chain tailored to deliver it." },
          { n: 5, title: "Trade-offs: the linchpin", blurb: "Choosing what not to do is what makes a position hard to copy.", page: "trade-offs" },
          { n: 6, title: "Fit: the amplifier", blurb: "Activities that reinforce each other raise value and the barrier to imitation." },
          { n: 7, title: "Continuity: the enabler", blurb: "A strategy takes years, not quarters, to build." },
          { title: "Ten practical implications", blurb: "What Porter's ideas mean for managers, in brief." }
        ]
      }
    ],

    cases: [
      { era: "Strategy", title: "Southwest Airlines", blurb: "Short, cheap, frequent flights, delivered by activities that reinforce one another.", tag: "Fit", page: "trade-offs" },
      { era: "Strategy", title: "IKEA", blurb: "Self-service, flat-pack furniture for young families on a budget, with trade-offs at every step.", tag: "Trade-offs" },
      { era: "Strategy", title: "Enterprise Rent-A-Car", blurb: "Built for people whose own car is in the shop, not for business travelers at airports.", tag: "Value proposition" },
      { era: "Strategy", title: "Aravind Eye Hospital", blurb: "High-volume, low-cost eye surgery in India, made possible by a value chain designed for it.", tag: "Value chain" }
    ],

    pages: {
      // "Compete to be unique, not the best", competitive convergence, zero-sum versus
      // positive-sum competition and operational effectiveness versus strategy follow Porter's
      // published work as I remember Magretta presenting it, unchecked against her wording.
      // The toy market and the sorter items are ours.
      "mindset": {
        navLabel: "Mindset",
        title: "Competition: the right mindset",
        eyebrow: "Part I · Chapter 01",
        dek:
          "Most managers think competition means being the best. Porter argues that's the wrong goal. In most industries there is no single best way to compete, and when everyone chases the same one, everyone loses.",
        blocks: [
          {
            type: "prose",
            sections: [
              {
                n: "1",
                title: "Best or unique",
                paras: [
                  "Competing to be the best treats business like a sport with one winner. Find the best product and the best practices, and beat rivals at them. When every company pursues the same idea of the best, they end up serving the same customers in the same way, and the only thing left to compete on is price. Porter calls the result competitive convergence. It's zero-sum at best, and it drives profits down for everyone.",
                  "Competing to be unique starts from a different premise: customers differ, and there are many ways to create value for them. A company that chooses a distinct way of competing can serve its chosen customers better than anyone else, while rivals do well serving others. Competition becomes positive-sum."
                ],
                side: {
                  label: "Not a sport",
                  html: "<p>In sport there's one winner. In business, several companies can do well in the same industry at the same time, as long as they compete in different ways.</p>"
                }
              }
            ]
          },
          {
            type: "positions",
            title: "Four firms, one line of needs",
            intro:
              "A thousand customers are spread along a line, from those who want the lowest price to those who want the best performance. Each buys from the firm that suits them best. Move the four firms and see who earns what.",
            customers: 1000,
            margin: 40,
            floor: 0.1,
            room: 25,
            firms: ["Firm A", "Firm B", "Firm C", "Firm D"],
            lowLabel: "Lowest price",
            highLabel: "Best performance",
            hint: "Each firm's position on the line, from 0 (cheapest) to 100 (best performing).",
            spreadPreset: "unique",
            presets: [
              { id: "best", label: "Everyone chases the best", positions: [50, 50, 50, 50] },
              { id: "unique", label: "Each finds its own spot", positions: [10, 35, 65, 90] },
              { id: "breakaway", label: "One breaks away", positions: [50, 50, 50, 90] }
            ],
            foot:
              "A toy model, not from the book. A firm keeps up to $40 a customer when its nearest rival is at least 25 points away, less as rivals get closer, and $4 when it shares a spot and competes on price alone."
          },
          {
            type: "prose",
            sections: [
              {
                n: "2",
                title: "Operational effectiveness isn't strategy",
                paras: [
                  "Porter separates two things that are often confused. <strong>Operational effectiveness</strong> means performing similar activities better than rivals do: less waste, better quality, faster processes. It matters, and the gaps between companies can be large. But best practices spread quickly, so improving them rarely gives a lasting advantage, and as everyone adopts the same ones, companies grow more alike.",
                  "<strong>Strategy</strong> means performing different activities from rivals, or similar activities in different ways. That's what the rest of the book is about: how a company chooses a distinct position, and why the choice holds."
                ],
                side: {
                  label: "Benchmarking",
                  html: "<p>The more companies benchmark against each other and copy the same best practices, the more alike they become. Porter sees that as one of the engines of convergence.</p>"
                }
              }
            ]
          },
          {
            type: "sorter",
            title: "Best or unique?",
            intro: "Six moves by invented companies. Is each one competing to be the best, or competing to be unique?",
            options: [
              { id: "best", label: "Competing to be the best", hint: "The same race as rivals, run harder." },
              { id: "unique", label: "Competing to be unique", hint: "A different race, chosen on purpose." }
            ],
            items: [
              {
                text: "A bank studies its biggest rival's branches and copies the features customers praise most.",
                answer: "best",
                why: "Matching a rival's best features makes the two banks more alike. Whatever gain it brings is easy for the rival to match in turn."
              },
              {
                text: "A carmaker builds only small cars for city drivers and makes no attempt to sell to families.",
                answer: "unique",
                why: "It chooses which customers to serve and gives up the rest, so it can serve its chosen ones better than a generalist."
              },
              {
                text: "After one phone maker's launch does well, every rival adds the same three features the next year.",
                answer: "best",
                why: "Everyone chasing the same features is convergence. Customers can no longer tell the phones apart, so they choose on price."
              },
              {
                text: "An accounting firm serves only restaurants and builds its software and advice around how they work.",
                answer: "unique",
                why: "A distinct set of customers with distinct needs, served by activities tailored to them."
              },
              {
                text: "A retailer's stated goal is to be number one in its market by sales.",
                answer: "best",
                why: "Size is a scoreboard, not a strategy. It says nothing about which customers to serve or how, and invites a race for share that can wreck profits."
              },
              {
                text: "A hotel chain gives up restaurants and conference rooms to offer the cheapest clean rooms near airports.",
                answer: "unique",
                why: "It serves one kind of traveler in one kind of place, and gives up what those travelers don't need."
              }
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
      // The framing (forces divide the value an industry creates; growth, technology,
      // government and complements are factors rather than forces; return on invested capital
      // as the measure) follows Porter's published work as I remember Magretta presenting it,
      // unchecked against her wording. The toy model and the sorter items are ours.
      "five-forces": {
        navLabel: "Five forces",
        title: "The five forces",
        eyebrow: "Part I · Chapter 02",
        dek:
          "Why are some industries more profitable than others, year after year? Porter's answer is structure: five forces decide how much of the value an industry creates its companies get to keep.",
        blocks: [
          {
            type: "prose",
            sections: [
              {
                n: "1",
                title: "Competing for profits",
                paras: [
                  "Most people picture competition as a contest between rivals. Porter widens the view. A company competes for profits not only with its direct rivals but with its customers, who would like to pay less; its suppliers, who would like to charge more; the makers of substitutes, who offer another way to meet the same need; and would-be entrants, who would take a share if they could get in.",
                  "Together these five forces make up an industry's structure, and structure explains why average profitability differs so much from one industry to another, and why the differences last. The forces divide the value an industry creates: some is kept by its companies, some is bargained away to customers and suppliers, and some is held down by substitutes and the threat of entry."
                ],
                side: {
                  label: "Measuring it",
                  html: "<p>Porter judges performance by return on invested capital: profit compared with the capital tied up to earn it. Sales growth and market share can look impressive while that return stays poor.</p>"
                }
              }
            ]
          },
          {
            type: "forces",
            title: "How the forces split an industry's value",
            intro:
              "Set each force for an invented industry and see how much of the value it creates its companies keep. The shares are illustrative; the point is how the forces combine.",
            outLabel: "Of every $100 of value the industry creates",
            levels: ["Weak", "Medium", "Strong"],
            forces: [
              { id: "entry", name: "Threat of new entrants", short: "the threat of entry", question: "How easily could a newcomer get in?", take: [0.05, 0.15, 0.3], to: "buyers", arrow: "↓" },
              { id: "suppliers", name: "Supplier power", short: "supplier power", question: "Can suppliers raise prices or cut quality?", take: [0.05, 0.15, 0.3], to: "suppliers", arrow: "→" },
              { id: "rivalry", name: "Rivalry among competitors", short: "rivalry", question: "How hard do existing firms compete, and on what?", take: [0.1, 0.25, 0.45], to: "buyers" },
              { id: "buyers", name: "Buyer power", short: "buyer power", question: "Can customers push prices down?", take: [0.1, 0.25, 0.45], to: "buyers", arrow: "←" },
              { id: "substitutes", name: "Threat of substitutes", short: "the threat of substitutes", question: "Can customers meet the need another way?", take: [0.05, 0.15, 0.3], to: "buyers", arrow: "↑" }
            ],
            presets: [
              { id: "sheltered", label: "A sheltered industry", levels: { entry: 0, suppliers: 0, rivalry: 0, buyers: 0, substitutes: 0 } },
              { id: "middle", label: "Middle of the road", levels: { entry: 1, suppliers: 1, rivalry: 1, buyers: 1, substitutes: 1 } },
              { id: "buyers", label: "Strong buyers only", levels: { entry: 0, suppliers: 0, rivalry: 0, buyers: 2, substitutes: 0 } },
              { id: "brutal", label: "Every force strong", levels: { entry: 2, suppliers: 2, rivalry: 2, buyers: 2, substitutes: 2 } }
            ],
            foot:
              "A toy model, not from the book. Value created is what buyers would pay, less what it costs suppliers to provide the inputs. Suppliers take their share first; each other force passes part of what's left to buyers. The percentages are invented to show how the forces combine."
          },
          {
            type: "prose",
            sections: [
              {
                n: "2",
                title: "Forces and factors",
                paras: [
                  "Some things that obviously matter to an industry aren't forces in Porter's sense: its growth rate, technology and innovation, government, and complementary products. They matter through the forces. A new technology can lower the barriers to entry or create a substitute; a regulation can strengthen buyers or protect incumbents.",
                  "The test of any change is what it does to the five forces. Asking that question keeps the analysis from turning into a list of trends."
                ],
                side: {
                  label: "Growth isn't enough",
                  html: "<p>A fast-growing industry isn't necessarily a profitable one. Growth draws in entrants and can hand power to suppliers, exactly as the forces would predict.</p>"
                }
              }
            ]
          },
          {
            type: "sorter",
            title: "Which force?",
            intro: "Eight developments in invented industries. Which of the five forces does each one change most directly?",
            options: [
              { id: "entry", label: "New entrants", hint: "Newcomers could get in." },
              { id: "suppliers", label: "Suppliers", hint: "They can charge more." },
              { id: "rivalry", label: "Rivalry", hint: "Existing firms compete harder." },
              { id: "buyers", label: "Buyers", hint: "Customers can push back." },
              { id: "substitutes", label: "Substitutes", hint: "Another way to meet the need." }
            ],
            items: [
              {
                text: "Two of the three companies that make a component every manufacturer in the industry needs announce a merger.",
                answer: "suppliers",
                why: "Fewer makers of something essential means more supplier power: they can charge more, and the industry has few places to turn."
              },
              {
                text: "Video calls become good enough that many companies cut back on business travel.",
                answer: "substitutes",
                why: "Video calls don't compete with an airline on its routes; they meet the same need another way. That's a substitute, and it caps what airlines can charge."
              },
              {
                text: "Growth in the industry stalls, and companies with high fixed costs start cutting prices to fill their capacity.",
                answer: "rivalry",
                why: "Slow growth and high fixed costs are classic causes of intense rivalry, and price cuts are the most damaging way to fight it."
              },
              {
                text: "A retail chain that buys a fifth of everything the industry makes starts selling its own brand.",
                answer: "buyers",
                why: "A big customer that can make the product itself has leverage in every price negotiation. That's buyer power."
              },
              {
                text: "A new technology lets small firms make the product without the costly factory it used to require.",
                answer: "entry",
                why: "Lower capital needs lower the barrier to entry. Incumbents now have to keep prices low enough not to invite newcomers in."
              },
              {
                text: "An alternative way of doing the same job falls in price by half while getting better.",
                answer: "substitutes",
                why: "A better, cheaper substitute pulls down the ceiling on prices for everyone in the industry."
              },
              {
                text: "A regulator requires that customers be able to take their data with them when they switch providers.",
                answer: "buyers",
                why: "Lower switching costs strengthen buyers: walking away gets easier, so they can demand more."
              },
              {
                text: "The established firms sign exclusive deals with every major distributor.",
                answer: "entry",
                why: "Shutting newcomers out of distribution raises a barrier to entry. The threat of new entrants falls, which helps the incumbents."
              }
            ]
          },
          {
            type: "prose",
            sections: [
              {
                n: "3",
                title: "What the analysis is for",
                paras: [
                  "The point isn't to label an industry attractive or unattractive. It's to understand what drives profitability in it, so a company can find a position where the forces are weakest, act to change them, and see shifts in structure coming before its rivals do.",
                  "The forces set the average. Some companies in a poor industry earn well above it, and some in a rich industry earn well below. Explaining that difference is the job of <a href=\"@advantage\">competitive advantage</a>, the subject of the next chapter."
                ],
                side: {
                  label: "Try this",
                  html: "<p>In the model, press “Strong buyers only”. One strong force takes away more than a third of what a sheltered industry keeps.</p>"
                }
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
      // Advantage as relative price and relative cost, the value chain as its source, and the
      // value system around it follow Porter's published work as I remember Magretta
      // presenting it, unchecked against her wording. The rival, the calculator and the
      // sorter items are invented.
      "advantage": {
        navLabel: "Advantage",
        title: "Competitive advantage",
        eyebrow: "Part I · Chapter 03",
        dek:
          "In everyday talk, an advantage is anything a company is good at. Porter means something narrower and more useful: a difference in relative price or relative cost that shows up in the P&L, traced back to differences in what the company does.",
        blocks: [
          {
            type: "prose",
            sections: [
              {
                n: "1",
                title: "Advantage lives in the P&L",
                paras: [
                  "For Porter, a company has a competitive advantage only if it earns a higher return than its rivals and keeps doing so. That can come from just two places. Customers may be willing to pay more for what it offers, so it commands a higher <strong>relative price</strong>. Or it may make and deliver its offering at a lower <strong>relative cost</strong>. Sometimes it's some of both.",
                  "Everything else people call an advantage, a strong brand, a patent, a talented team, counts only if it shows up as one of those two. Profit is the gap between price and cost, and the comparison that matters is with rivals in the same industry."
                ],
                side: {
                  label: "Relative",
                  html: "<p>The industry sets the average; the <a href=\"@five-forces\">five forces</a> explain it. Advantage means beating that average, which is why Porter compares a company's price and cost with its rivals'.</p>"
                }
              }
            ]
          },
          {
            type: "advantage",
            title: "Price, cost and the margin between them",
            intro:
              "An invented rival sells at $100 and spends $90 to do it. Set how much more or less customers will pay you, and how much more or less it costs you to serve them.",
            rival: { price: 100, cost: 90 },
            rivalLabel: "The rival",
            youLabel: "You",
            priceLabel: "Your price, against the rival's",
            priceHint: "What customers will pay you for what you offer, compared with the rival's $100.",
            priceRange: [-20, 30],
            costLabel: "Your cost, against the rival's",
            costHint: "What it costs you to make and deliver it, compared with the rival's $90.",
            costRange: [-30, 30],
            presets: [
              { id: "premium", label: "A premium that pays", price: 15, cost: 5 },
              { id: "costly", label: "A premium that doesn't", price: 10, cost: 15 },
              { id: "lowcost", label: "Low cost, lower price", price: -5, cost: -15 },
              { id: "both", label: "Both at once", price: 5, cost: -5 }
            ]
          },
          {
            type: "prose",
            sections: [
              {
                n: "2",
                title: "The value chain",
                paras: [
                  "Porter's tool for tracing an advantage to its source is the <strong>value chain</strong>: the activities a company performs to design, make, sell, deliver and support what it offers. Every cost is incurred in some activity, and everything customers value is created by some activity. So any difference in relative price or cost must come from a difference in activities.",
                  "That makes the value chain a way of looking at strategy concretely. Set a company's chain beside the industry's usual one and you can see where it does things differently, and ask of each difference whether it raises what buyers will pay, lowers cost, or does neither."
                ],
                side: {
                  label: "Beyond the company",
                  html: "<p>Each company's chain sits inside a larger value system that includes its suppliers, its channels and its customers' own activities. An advantage can come from how a company fits into that system too.</p>"
                }
              }
            ]
          },
          {
            type: "sorter",
            title: "Price or cost?",
            intro: "Six invented companies that beat their industry's average. Does each advantage come mainly from a higher relative price or a lower relative cost?",
            options: [
              { id: "price", label: "Higher relative price", hint: "Customers pay more for it." },
              { id: "cost", label: "Lower relative cost", hint: "It costs less to provide." }
            ],
            items: [
              {
                text: "Customers pay a fifth more for a brand's coffee machines, which cost about the same to make as its rivals'.",
                answer: "price",
                why: "The same cost and a higher price: the brand has raised what buyers are willing to pay."
              },
              {
                text: "A regional airline flies a single type of plane, so its crews, spare parts and maintenance cost far less per seat than its rivals'.",
                answer: "cost",
                why: "One aircraft type simplifies training, scheduling and maintenance. The difference is in activities, and it shows up as lower cost."
              },
              {
                text: "A software company's product saves customers so much time that they renew at higher prices than rivals charge.",
                answer: "price",
                why: "The value to the buyer, hours saved, supports a premium. It's an advantage only while the premium exceeds the cost of earning it."
              },
              {
                text: "A clinic performs one kind of operation thousands of times a year, so each costs a fraction of what a general hospital spends.",
                answer: "cost",
                why: "Volume and specialization make every activity cheaper. The clinic can charge less and still earn more."
              },
              {
                text: "A furniture retailer has customers collect and assemble the goods themselves.",
                answer: "cost",
                why: "Customers take over activities the retailer would otherwise pay for. Much of the saving reaches them as lower prices, but the advantage starts as lower cost."
              },
              {
                text: "A carmaker's reputation for reliability lets it charge more for new cars, and its used cars hold their value.",
                answer: "price",
                why: "Reliability raises what buyers will pay, new and used. That's an advantage in relative price."
              }
            ]
          },
          {
            type: "prose",
            sections: [
              {
                n: "3",
                title: "Why both is rare",
                paras: [
                  "It's tempting to aim for a higher price and a lower cost at once. Occasionally a company manages it, usually when a rival is badly run. More often, the activities that make buyers willing to pay more also cost more to perform, and the ones that cut cost also cut what buyers value. Choosing between them is the subject of the second half of the book, and of its idea of <a href=\"@trade-offs\">trade-offs</a>."
                ],
                side: {
                  label: "Try this",
                  html: "<p>Press “A premium that doesn't”. Customers pay 10% more, but the extra cost of earning that premium leaves the margin lower than the rival's.</p>"
                }
              }
            ]
          }
        ],
        end: {
          related: [
            { title: "The five forces", where: "Chapter 2", page: "five-forces" },
            { title: "Competition: the right mindset", where: "Chapter 1", page: "mindset" },
            { title: "Creating value", where: "Chapter 4" },
            { title: "Trade-offs", where: "Chapter 5", page: "trade-offs" }
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
                  html: "<p>The links in the map are the subject of the next chapter, on fit: why activities that reinforce each other are worth more together than apart, and harder to copy.</p>"
                }
              }
            ]
          }
        ],
        end: {
          related: [
            { title: "Competitive advantage", where: "Chapter 3", page: "advantage" },
            { title: "Creating value", where: "Chapter 4" },
            { title: "Fit", where: "Chapter 6" },
            { title: "Continuity", where: "Chapter 7" }
          ],
          cta: { page: "", kicker: "Contents", text: "See the map of the book" }
        }
      }
    }
  });
})();
