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
    entries: [{ kicker: "Start here", title: "The five forces", desc: "Set the forces for an industry and see how much of its value it keeps.", page: "five-forces" }],
    mapTitle: "Two parts, seven chapters",
    contentsDesc: "From industry structure to the five tests of a good strategy.",
    mapNote: "Pages open as they're written. Chapter titles are paraphrased.",
    casesTitle: "The companies the book uses",
    nav: ["five-forces"],

    parts: [
      {
        n: "I",
        title: "Competition",
        chapters: [
          { n: 1, title: "Competition: the right mindset", blurb: "Compete to be unique, not to be the best." },
          { n: 2, title: "The five forces: competing for profits", blurb: "Industry structure decides how much of the value an industry creates it gets to keep.", page: "five-forces" },
          { n: 3, title: "Competitive advantage: the value chain and your P&L", blurb: "Advantage shows up as a higher relative price, a lower relative cost, or both." }
        ]
      },
      {
        n: "II",
        title: "Strategy",
        chapters: [
          { n: 4, title: "Creating value: the core", blurb: "A distinctive value proposition and a value chain tailored to deliver it." },
          { n: 5, title: "Trade-offs: the linchpin", blurb: "Choosing what not to do is what makes a position hard to copy." },
          { n: 6, title: "Fit: the amplifier", blurb: "Activities that reinforce each other raise value and the barrier to imitation." },
          { n: 7, title: "Continuity: the enabler", blurb: "A strategy takes years, not quarters, to build." },
          { title: "Ten practical implications", blurb: "What Porter's ideas mean for managers, in brief." }
        ]
      }
    ],

    cases: [
      { era: "Strategy", title: "Southwest Airlines", blurb: "Short, cheap, frequent flights, delivered by activities that reinforce one another.", tag: "Fit" },
      { era: "Strategy", title: "IKEA", blurb: "Self-service, flat-pack furniture for young families on a budget, with trade-offs at every step.", tag: "Trade-offs" },
      { era: "Strategy", title: "Enterprise Rent-A-Car", blurb: "Built for people whose own car is in the shop, not for business travelers at airports.", tag: "Value proposition" },
      { era: "Strategy", title: "Aravind Eye Hospital", blurb: "High-volume, low-cost eye surgery in India, made possible by a value chain designed for it.", tag: "Value chain" }
    ],

    pages: {
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
                  "The forces set the average. Some companies in a poor industry earn well above it, and some in a rich industry earn well below. Explaining that difference is the job of competitive advantage, the subject of the next chapter."
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
            { title: "Competition: the right mindset", where: "Chapter 1" },
            { title: "Competitive advantage", where: "Chapter 3" },
            { title: "Trade-offs", where: "Chapter 5" }
          ],
          cta: { page: "", kicker: "Contents", text: "See the map of the book" }
        }
      }
    }
  });
})();
