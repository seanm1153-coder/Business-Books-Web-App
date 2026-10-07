// Play Bigger (Al Ramadan, Dave Peterson, Christopher Lochhead & Kevin Maney, 2016).
// Summaries are paraphrased; keep quotations short and attributed.
// The book map is organized by idea: the chapter list hasn't been checked against
// the book yet, so ideas are listed without chapter numbers.
(function () {
  "use strict";

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
      "category-kings": {
        navLabel: "Kings",
        title: "Category kings",
        eyebrow: "Part I · Why categories matter",
        dek:
          "In a new category, value doesn't spread evenly. The company that defines the category, and the problem it solves, tends to take most of it. The authors call that company the category king.",
        blocks: [
          {
            type: "value-split",
            title: "How a category's value splits",
            intro:
              "By the authors' analysis of technology categories, the category king took about 76% of its category's total market value. Change how many other companies share the category and see what's left for each.",
            kingShare: 76,
            startRivals: 4,
            maxRivals: 12,
            foot:
              "The 76% figure is the authors' own estimate of share of market value, not revenue or units sold. Other companies are shown splitting the remainder evenly, to keep it simple."
          },
          {
            type: "prose",
            sections: [
              {
                n: "1",
                title: "Winner takes most",
                paras: [
                  "The authors' research on technology companies found that new categories are winner-take-most. The king ends up with the bulk of the value, the next company with far less, and everyone else with what's left. Being second in someone else's category is a much smaller game than being first in your own."
                ],
                side: {
                  label: "About the number",
                  html: "<p>The 76% figure comes from the authors' own analysis. It describes share of market value, not revenue or units sold.</p>"
                }
              },
              {
                n: "2",
                title: "The category makes the company",
                paras: [
                  "The book's central claim is that people buy into a new way of thinking before they buy a product. The company that names a problem and frames the solution teaches the market how to see it. Once the market thinks in those terms, the company that taught it looks like the natural leader, and competitors get described as alternatives to it."
                ],
                side: {
                  label: "A quick test",
                  html: "<p>Listen to how customers describe the competition. If rivals are described as “like” your company, you have the category. If you're described as “like” them, they do.</p>"
                }
              },
              {
                n: "3",
                title: "Design it on purpose",
                paras: [
                  "Category kings are often treated as lucky. The authors argue that category design is a discipline: find the problem, name it, design the company, the product and the category together, and then launch with enough force to change how the market thinks."
                ],
                side: {
                  label: "The magic triangle",
                  html: "<p>Company design, product design and category design, developed together so that each reinforces the others.</p>"
                }
              }
            ]
          },
          {
            type: "sorter",
            title: "Playing bigger or smaller?",
            intro:
              "Seven lines from invented pitch decks and press releases. Does each one frame a problem and a new way of thinking, or compete inside someone else's frame? Smaller ones come with a bigger rewrite.",
            options: [
              { id: "big", label: "Plays bigger", hint: "Frames a problem and a new category" },
              { id: "small", label: "Plays smaller", hint: "Competes inside someone else's frame" }
            ],
            rewriteLabel: "A bigger version",
            items: [
              {
                text: "Our CRM is 30% faster than the market leader.",
                answer: "small",
                why: "It accepts the leader's category and competes on the leader's terms. Even if it's true, it teaches buyers to think of you as an alternative.",
                rewrite: "Sales teams spend a third of their week updating software instead of selling. That time should go back to customers."
              },
              {
                text: "Every year, fleets lose weeks of truck time to breakdowns the trucks saw coming.",
                answer: "big",
                why: "It names a problem the market hasn't framed yet, and doesn't mention a product."
              },
              {
                text: "The best-in-class, AI-powered platform for modern teams.",
                answer: "small",
                why: "No problem in it at all. It could describe a thousand products.",
                rewrite: "Teams make decisions on numbers that are three weeks old. Decisions should run on today's numbers."
              },
              {
                text: "Stop servicing trucks by the calendar. Start servicing them by the data.",
                answer: "big",
                why: "A clear from and to: the old way, and a different way of thinking about the same job."
              },
              {
                text: "It's like Uber, but for dog walking.",
                answer: "small",
                why: "It borrows someone else's category to explain itself. Handy shorthand in a pitch, but it casts you as a follower in their story.",
                rewrite: "Dog owners juggle walkers by text message and hope someone shows up. Care for your dog should be as dependable as care for yourself."
              },
              {
                text: "We have more integrations than any competitor.",
                answer: "small",
                why: "A feature comparison, on a checklist the leader probably wrote. It invites the buyer to keep comparing.",
                rewrite: "Your tools don't talk to each other, so your team has become the integration. Work should move between tools on its own."
              },
              {
                text: "Software shouldn't be something you install.",
                answer: "big",
                why: "It challenges how a whole market thinks, not one product. Salesforce made a version of this argument in its early “no software” campaign."
              }
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

      naming: {
        title: "Naming the category",
        navLabel: "Naming",
        eyebrow: "Part II · Designing a category",
        dek:
          "A category needs a name people can repeat: one that describes the problem or the new way, not the company. Get it right and customers, analysts and even competitors end up using your words.",
        blocks: [
          {
            type: "prose",
            sections: [
              {
                n: "1",
                title: "Name the category, not just the product",
                paras: [
                  "A product name belongs to one company. A category name belongs to the market: it's what customers type into a search box and what analysts put at the top of a report. The authors' point is that whoever names the category gets to define it, and everyone else ends up described in its terms."
                ],
                side: {
                  label: "See also",
                  html: "<p>The name is the last step of the <a href=\"@point-of-view\">point of view</a>.</p>"
                }
              },
              {
                n: "2",
                title: "What good names have in common",
                paras: [
                  "They are plain, short and descriptive. They say what problem is solved or what the new way is, so a newcomer can guess what's inside. Hype words, brand names and version numbers don't travel."
                ],
                side: {
                  label: "A quick test",
                  html: "<p>Could a competitor use the name about themselves without it sounding odd? Then it works as a category name.</p>"
                }
              }
            ]
          },
          {
            type: "sorter",
            title: "Would it work as a category name?",
            intro: "Eight names, real and invented. Could each become the market's word for a kind of thing? Names that don't work come with one that would.",
            options: [
              { id: "yes", label: "Works as a category", hint: "Plain, descriptive, anyone could use it" },
              { id: "no", label: "Doesn't", hint: "A brand, a feature or hype" }
            ],
            rewriteLabel: "As a category",
            items: [
              { text: "Customer relationship management", answer: "yes", why: "It describes what the software does, and every vendor in the market uses it." },
              { text: "SmartFleet Pro X", answer: "no", why: "A product name. It belongs to one company and says little about the problem.", rewrite: "Predictive fleet maintenance" },
              { text: "Ride-hailing", answer: "yes", why: "Short, plain and descriptive. Rivals describe themselves with it." },
              { text: "The Northline TheftGuard frame", answer: "no", why: "A brand name for one product.", rewrite: "Theft-proof commuting" },
              { text: "Software as a service", answer: "yes", why: "It names a new way of buying software, and it has outlived many of the companies that popularized it." },
              { text: "AI-powered next-gen data cloud", answer: "no", why: "Mostly hype words. A newcomer can't tell what problem it solves, so it can't become the market's word.", rewrite: "Real-time sales forecasting" },
              { text: "Predictive fleet maintenance", answer: "yes", why: "It names the new way (maintenance driven by data, not the calendar) in three plain words." },
              { text: "30% faster invoicing", answer: "no", why: "A benefit claim, not a kind of thing. It invites a comparison rather than defining a market.", rewrite: "Automated accounts receivable" }
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

      "magic-triangle": {
        title: "The magic triangle",
        navLabel: "Triangle",
        eyebrow: "Part II · Designing a category",
        dek:
          "Category kings design three things together: the company, the product and the category. When one lags behind the others, the whole effort slows down.",
        blocks: [
          {
            type: "triangle",
            title: "Balance the triangle",
            intro:
              "Rate how far each design has come for an invented company, or start from a preset. The shape shows the balance; the weakest side sets how well the whole works.",
            start: 0,
            sides: [
              { name: "Company design", short: "Company", hint: "Culture, structure and business model built around the new category." },
              { name: "Product design", short: "Product", hint: "The product actually solves the problem the category names." },
              { name: "Category design", short: "Category", hint: "Point of view, name and launch that teach the market the new way." }
            ],
            presets: [
              {
                label: "Great product, no category",
                values: [6, 9, 2],
                note: "A better mousetrap nobody is looking for. The product is strong, but the market has no name for the problem it solves, so buyers compare it with the old way and shrug."
              },
              {
                label: "All story",
                values: [4, 3, 9],
                note: "A launch the product can't live up to. The story promises a new way, the product delivers an old one, and buyers notice."
              },
              {
                label: "Designed together",
                values: [8, 8, 8],
                note: "The company is built to sell the new way, the product delivers it, and the market has a name for it. Each makes the others more convincing."
              }
            ]
          },
          {
            type: "prose",
            sections: [
              {
                n: "1",
                title: "Three designs at once",
                paras: [
                  "The authors argue that the companies that become category kings don't design the product first and think about the market later. They design the company, the product and the category together, so the organization, what it sells and the story it tells all point the same way."
                ],
                side: {
                  label: "Rumelt would agree",
                  html: "<p>It's close to what <em>Good Strategy Bad Strategy</em> calls coherence: actions that reinforce one another.</p>"
                }
              },
              {
                n: "2",
                title: "When one side lags",
                paras: [
                  "A strong product with no category design ends up compared feature by feature with the old way. A brilliant category story with a weak product makes a promise the product breaks. A company not built for the category, with sales and service set up for the old way, can't deliver either."
                ],
                side: {
                  label: "Try it",
                  html: "<p>In <a href=\"#northline\">Northline</a>, a category launch from an unfocused company is exactly this imbalance.</p>"
                }
              }
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

      "lightning-strike": {
        navLabel: "Strike",
        title: "The lightning strike",
        eyebrow: "Part III · Launching it",
        dek:
          "Most launches drip out: a press release here, a webinar there, each one fading before the next arrives. The book argues for the opposite: one concentrated moment that puts the point of view in front of the market all at once, then follow-up moves that keep it there.",
        blocks: [
          {
            type: "strike-planner",
            title: "Drip or strike?",
            intro:
              "Six launch moves for an invented company, and twelve weeks to place them in. Schedule them, or start from a preset, and watch whether the market ever notices.",
            weeks: 12,
            threshold: 3,
            start: "drip",
            moves: [
              "Publish the point of view",
              "Launch event",
              "Product release",
              "Flagship customer story",
              "Analyst and press briefings",
              "Partner announcements"
            ],
            presets: {
              drip: { label: "Drip", plan: [1, 3, 5, 7, 9, 11] },
              strike: { label: "One strike", plan: [4, 4, 4, 4, 4, 4] },
              hijacks: { label: "Strike, then hijacks", plan: [3, 3, 3, 3, 6, 8] }
            },
            foot:
              "An illustration, not data from the book. In this toy model, attention fades each week, moves in the same week reinforce each other, and a move lands harder when the market is already paying attention."
          },
          {
            type: "prose",
            sections: [
              {
                n: "1",
                title: "Why all at once",
                paras: [
                  "A new category asks people to change how they think, and that takes more than one announcement. Spread out over months, each move is too small to register and fades before the next. Concentrated into one moment, the same moves reinforce each other, and the market hears the point of view loudly enough to remember it.",
                  "In the book's telling, a strike lines up the whole company at once: the point of view, the product, customers, partners and the sales team, all telling the same story in the same week."
                ],
                side: {
                  label: "See also",
                  html: "<p>The strike is built on the <a href=\"@point-of-view\">point of view</a>. Without one, there's nothing to concentrate.</p>"
                }
              },
              {
                n: "2",
                title: "Hijacks",
                paras: [
                  "One strike fades. The authors recommend following it with further moves, which they call hijacks, to keep the story in front of the market. In the planner, the “Strike, then hijacks” preset uses a smaller strike but keeps the market's attention for longer, because each follow-up lands while people are still listening."
                ],
                side: {
                  label: "Try this",
                  html: "<p>Start from “One strike”, then move the last two moves to weeks 7 and 9. Watch how long the market keeps noticing.</p>"
                }
              }
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

      "point-of-view": {
        navLabel: "Point of view",
        title: "Point of view",
        eyebrow: "Part II · Designing a category",
        dek:
          "A point of view is the written story of a category: the problem, how people deal with it today, the new way, and why now. It comes before any product pitch, and the launch is built on it.",
        blocks: [
          {
            type: "prose",
            sections: [
              {
                n: "1",
                title: "The story before the product",
                paras: [
                  "In the book, the point of view is a short document that tells the category's story. It describes the problem in the market's terms, says what's wrong with how it's handled today, describes a different way, and only then introduces the solution. It doesn't compare features.",
                  "Writing it forces agreement inside the company. Engineering, sales and the executives should all be able to tell the same story, and the launch, the website and the sales pitch all come from it."
                ],
                side: {
                  label: "From and to",
                  html: "<p>A useful shape for the story is from and to: from the way the job is done today to the way it will be done. The bigger the gap, the bigger the category.</p>"
                }
              }
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
            type: "prose",
            sections: [
              {
                n: "2",
                title: "Then strike",
                paras: [
                  "The book's launch idea is the lightning strike: one concentrated moment that puts the point of view in front of the market all at once, instead of a slow drip of announcements. It conditions buyers to see the problem the new way.",
                  "One strike fades. The authors recommend following it with further moves, which they call hijacks, to keep the story in front of the market."
                ],
                side: {
                  label: "In the book",
                  html: "<p>The design work runs roughly from discovery to problem and solution, marchitecture, naming and the point of view, and then the lightning strike.</p>"
                }
              }
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
