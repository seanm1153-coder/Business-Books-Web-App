// Thinking in Systems: A Primer (Donella H. Meadows, edited by Diana Wright, 2008).
// Summaries are paraphrased; keep quotations short and attributed.
// The map lists the book's seven chapters. Unnumbered rows are sections of the chapter
// above them that have pages of their own.
(function () {
  "use strict";

  window.Marginalia.addBook({
    id: "tis",
    title: "Thinking in Systems",
    author: "Donella H. Meadows",
    year: 2008,
    status: "open",
    cover: "tis",
    subtitle: "A primer",
    thesis:
      "A system is more than the sum of its parts. Meadows shows how stocks, flows and feedback loops produce the behavior we see, " +
      "why that behavior so often surprises the people inside it, and where a small change can shift the whole system.",
    citation:
      "Summaries on this page are written in our own words from Donella H. Meadows, <cite>Thinking in Systems: A Primer</cite>, edited by Diana Wright (Chelsea Green, 2008). Example systems are invented unless the book uses them. Read the book for the full argument.",
    hero: { lines: ["Thinking", "in Systems"], art: "behavior" },
    entries: [
      { kicker: "Start here", title: "Stocks and flows", desc: "Fill and drain a bathtub, and watch what the level does.", page: "stocks-flows" },
      { kicker: "Simulator", title: "Delays", desc: "Run a car lot and watch one rise in demand set off months of swings.", page: "delays" },
      { kicker: "System traps", title: "The shared pasture", desc: "Five herders, one pasture, and three ways to keep it from being grazed bare.", page: "traps" }
    ],
    mapTitle: "Three parts, seven chapters",
    contentsDesc: "From stocks and flows to system traps and leverage points.",
    mapNote: "Numbered rows are chapters; the rows between them are sections with pages of their own. Pages open as they're written.",
    casesTitle: "The systems Meadows uses",
    nav: ["stocks-flows", "feedback", "delays", "leverage-points"],

    parts: [
      {
        n: "I",
        title: "System structure and behavior",
        chapters: [
          { n: 1, title: "The basics", blurb: "Elements, interconnections and purpose; stocks, and the flows that fill and drain them.", page: "stocks-flows" },
          { title: "Feedback loops", blurb: "Balancing loops pull a stock toward a goal; reinforcing loops make it grow or collapse.", page: "feedback" },
          { n: 2, title: "A brief visit to the systems zoo", blurb: "Small models of common systems: a thermostat, a population, a car dealer's lot, an oil field, a fishery." },
          { title: "Delays and oscillation", blurb: "Why a car dealer's inventory swings for months after one rise in demand.", page: "delays" }
        ]
      },
      {
        n: "II",
        title: "Systems and us",
        chapters: [
          { n: 3, title: "Why systems work so well", blurb: "Resilience, self-organization and hierarchy." },
          { n: 4, title: "Why systems surprise us", blurb: "Events hide behavior; nonlinearities, boundaries, limits, delays and bounded rationality." },
          { n: 5, title: "System traps and opportunities", blurb: "Structures that produce the same problems again and again, and the way out of each.", page: "traps" }
        ]
      },
      {
        n: "III",
        title: "Creating change, in systems and in our philosophy",
        chapters: [
          { n: 6, title: "Leverage points", blurb: "Twelve places to intervene in a system, from changing numbers to changing paradigms.", page: "leverage-points" },
          { n: 7, title: "Living in a world of systems", blurb: "Habits for working with systems rather than against them." }
        ]
      }
    ],

    cases: [
      { era: "Chapter 1", title: "A bathtub", blurb: "One stock, one inflow, one outflow: the simplest system there is.", tag: "Stocks and flows", page: "stocks-flows" },
      { era: "Chapter 1", title: "A cooling cup of coffee", blurb: "A balancing loop: the hotter the coffee, the faster it cools toward room temperature.", tag: "Feedback loops", page: "feedback" },
      { era: "Chapter 1", title: "Money in the bank", blurb: "A reinforcing loop: the more money in the account, the more interest it earns.", tag: "Feedback loops", page: "feedback" },
      { era: "Chapter 2", title: "A thermostat", blurb: "Two balancing loops pulling one stock, the heat in a room, in opposite directions.", tag: "Systems zoo" },
      { era: "Chapter 2", title: "A car dealer's lot", blurb: "Three delays turn one rise in demand into months of swings in inventory.", tag: "Delays", page: "delays" },
      { era: "Chapter 2", title: "A fishing fleet", blurb: "A renewable resource that can be harvested for ever, or fished to collapse.", tag: "Systems zoo" },
      { era: "Chapter 5", title: "A shared pasture", blurb: "Herders who each gain from one more animal, and together graze the pasture bare.", tag: "System traps", page: "traps" }
    ],

    pages: {
      "stocks-flows": {
        navLabel: "Stocks and flows",
        title: "Stocks and flows",
        eyebrow: "Part I · Chapter 01",
        dek:
          "Every system is built from stocks, the things you can see, count or measure at any moment, and flows, the rates that fill and drain them. Meadows starts with the simplest case there is: a bathtub.",
        blocks: [
          {
            type: "prose",
            sections: [
              {
                n: "1",
                title: "What a system is",
                paras: [
                  "Meadows defines a system as “an interconnected set of elements that is coherently organized in a way that achieves something.” It has three kinds of things: elements, the interconnections between them, and a function or purpose.",
                  "The elements are the easiest part to see and usually the least important. A football team can replace every player and still be recognizably the same team. Change the rules of the game, or what the team is trying to achieve, and it becomes something else."
                ],
                side: {
                  label: "Look past the players",
                  html: "<p>When a system misbehaves, the first instinct is to blame the people in it. Meadows suggests looking at the structure they're working inside instead.</p>"
                }
              },
              {
                n: "2",
                title: "Stocks and flows",
                paras: [
                  "A stock is anything that accumulates: water in a tub, money in an account, trees in a forest, stock in a warehouse, a person's reputation. Flows are what change it. Inflows add to a stock, outflows take away from it, and nothing else does.",
                  "That makes a stock a kind of memory. The level of water in the tub is the running total of everything that has flowed in, minus everything that has drained out."
                ],
                side: {
                  label: "Units",
                  html: "<p>Stocks and flows are measured differently: a stock in liters, a flow in liters per minute. Mixing them up is a common source of confused arguments.</p>"
                }
              }
            ]
          },
          {
            type: "bathtub",
            title: "Fill and drain the tub",
            intro:
              "A 100-liter tub with a faucet and a drain. Run the clock, move either slider while it runs, and watch the level trace its path over half an hour. Or try one of the scenarios.",
            capacity: 100,
            minutes: 30,
            maxFlow: 10,
            unit: "L",
            stockLabel: "Water in the tub",
            inflowLabel: "Faucet (inflow)",
            inflowHint: "Liters per minute coming in.",
            outflowLabel: "Drain (outflow)",
            outflowHint: "Liters per minute going out, as long as there's water.",
            chartCaption: "Water in the tub, in liters, over 30 minutes.",
            initial: { start: 20, inflow: 5, outflow: 2 },
            scenarios: [
              { id: "drain", label: "Full tub, drain open", start: 100, inflow: 0, outflow: 5 },
              { id: "steady", label: "Faucet matches drain", start: 50, inflow: 5, outflow: 5 },
              { id: "ease", label: "Ease the faucet off", start: 30, inflow: 8, outflow: 5, ramp: { from: 8, to: 2, over: 20 } }
            ]
          },
          {
            type: "prose",
            sections: [
              {
                n: "3",
                title: "What the bathtub teaches",
                paras: [
                  "A stock rises whenever inflow is bigger than outflow, whichever way the flows are moving. Close the faucet slowly and the level keeps climbing until the faucet runs slower than the drain. People watching the faucet expect the level to fall the moment they start closing it.",
                  "There are two ways to raise a stock: add to the inflow, or cut the outflow. A company can keep more staff by hiring faster or by losing fewer; a household can build savings by earning more or by spending less. The second way is often cheaper and easier to overlook.",
                  "Stocks also change slowly. Even a wide-open faucet takes time to fill a tub. That makes stocks buffers, which let inflows and outflows be out of step for a while, as a warehouse lets a factory produce at a different pace from sales. It also makes them a source of delay."
                ],
                side: {
                  label: "Try this",
                  html: "<p>Pick “Ease the faucet off” and press +5 min twice. The faucet starts closing at once, yet the tub goes on filling for ten minutes.</p>"
                }
              }
            ]
          }
        ],
        end: {
          related: [
            { title: "Feedback loops", where: "Chapter 1", page: "feedback" },
            { title: "Delays and oscillation", where: "Chapter 2", page: "delays" },
            { title: "Why systems surprise us", where: "Chapter 4" },
            { title: "Leverage points", where: "Chapter 6", page: "leverage-points" }
          ],
          cta: { page: "feedback", kicker: "Next", text: "Add feedback: loops that run the stock" }
        }
      },
      "feedback": {
        navLabel: "Feedback",
        title: "Feedback loops",
        eyebrow: "Part I · Chapter 01",
        dek:
          "A system starts to run itself when a stock affects its own flows. Meadows calls that a feedback loop, and there are only two kinds: loops that pull a stock toward a goal, and loops that make it grow on itself.",
        blocks: [
          {
            type: "prose",
            sections: [
              {
                n: "1",
                title: "When a stock talks back",
                paras: [
                  "In the bathtub, someone outside the system works the faucet. Most real systems don't need that: the level of a stock itself changes the flows in or out. A cup of coffee loses heat faster when it's hotter; a bank account earns more interest when it's bigger. Each is a closed chain from the stock, through a rule or a decision or a law of physics, back to a flow that changes the stock.",
                  "Meadows names two kinds. A <strong>balancing loop</strong> works against a gap: it pulls a stock toward a goal and keeps it there. A <strong>reinforcing loop</strong> amplifies whatever is happening: growth feeds more growth, and decline feeds more decline."
                ],
                side: {
                  label: "In diagrams",
                  html: "<p>Loops are marked B for balancing and R for reinforcing. Reading a diagram mostly means finding the loops and asking which one is stronger.</p>"
                }
              },
              {
                n: "2",
                title: "Goal-seeking and runaway",
                paras: [
                  "Balancing loops produce goal-seeking behavior. The bigger the gap, the faster the correction, so the stock moves quickly at first and then slows as it closes in. A thermostat, a driver keeping to a lane and a shop restocking its shelves all work this way.",
                  "Reinforcing loops produce exponential growth or collapse. Because the change is a share of the stock, the stock grows by the same percentage each period and by ever larger amounts. A handy rule: something growing at a steady rate doubles in about 70 divided by the percentage growth rate, so 7% a year doubles in about ten years."
                ],
                side: {
                  label: "Vicious and virtuous",
                  html: "<p>Reinforcing loops run both ways. The same structure that compounds savings compounds debt, and a price war that feeds itself is a reinforcing loop too.</p>"
                }
              }
            ]
          },
          {
            type: "loop-sim",
            title: "Run the loops",
            intro:
              "Three small systems, one stock each. Change the settings and watch the shape of the curve change, not only its size.",
            systems: [
              {
                id: "coffee",
                label: "Cooling coffee",
                model: "cooling",
                kind: "One balancing loop: the bigger the gap to the room, the faster the drink cools.",
                stockShort: "Temperature",
                outflow: "Heat lost",
                loops: [{ kind: "balancing", label: "Cooling" }],
                unit: "deg",
                goalParam: "room",
                goalLabel: "Room temperature",
                caption: "Temperature of the drink, in °C, over 60 minutes.",
                params: [
                  { key: "start", label: "Starting temperature", min: 0, max: 100, step: 1, value: 85, format: "deg", hint: "Try a cold drink too: below room temperature, the same loop warms it." },
                  { key: "room", label: "Room temperature", min: 0, max: 40, step: 1, value: 20, format: "deg" },
                  { key: "k", label: "Cooling rate", min: 0.02, max: 0.2, step: 0.01, value: 0.08, format: "gapPerMin", hint: "A thin paper cup cools faster than a thick mug." }
                ]
              },
              {
                id: "savings",
                label: "Money in the bank",
                model: "interest",
                kind: "One reinforcing loop: the bigger the balance, the more interest it earns.",
                stockShort: "Money",
                inflow: "Interest",
                loops: [{ kind: "reinforcing", label: "Interest" }],
                unit: "money",
                caption: "Balance, in dollars, over 40 years.",
                params: [
                  { key: "start", label: "Starting balance", min: 100, max: 10000, step: 100, value: 1000, format: "money" },
                  { key: "r", label: "Interest rate", min: 0, max: 0.15, step: 0.005, value: 0.05, format: "pctYear" }
                ]
              },
              {
                id: "population",
                label: "A population",
                model: "population",
                kind: "Two loops on one stock: births reinforce, deaths balance. Whichever is stronger decides the behavior.",
                stockShort: "Population",
                inflow: "Births",
                outflow: "Deaths",
                loops: [
                  { kind: "reinforcing", label: "Births" },
                  { kind: "balancing", label: "Deaths" }
                ],
                unit: "millions",
                caption: "Population, in millions, over 100 years.",
                params: [
                  { key: "start", label: "Starting population", min: 10, max: 200, step: 10, value: 100, format: "millions" },
                  { key: "b", label: "Birth rate", min: 0, max: 0.05, step: 0.001, value: 0.03, format: "pctYear" },
                  { key: "d", label: "Death rate", min: 0, max: 0.05, step: 0.001, value: 0.01, format: "pctYear" },
                  { key: "falling", type: "toggle", label: "Let the birth rate fall over the century", value: false },
                  { key: "bEnd", label: "Birth rate by year 100", min: 0, max: 0.05, step: 0.001, value: 0.005, format: "pctYear", dependsOn: "falling" }
                ]
              }
            ]
          },
          {
            type: "prose",
            sections: [
              {
                n: "3",
                title: "Shifting dominance",
                paras: [
                  "Most real systems have several loops acting on the same stock, and the behavior depends on which is stronger at the time. In the population, births and deaths are both proportional to the population. If the birth rate is higher, the reinforcing loop dominates and the population grows; if the death rate is higher, it shrinks.",
                  "Dominance can shift without anyone pushing the system from outside. Let the birth rate fall slowly and the same population grows for decades, peaks, and turns down. Nothing about the structure changed. That's one reason systems surprise people: a trend that has held for years can reverse on its own."
                ],
                side: {
                  label: "Try this",
                  html: "<p>On the population tab, tick “Let the birth rate fall over the century”. Growth continues for 80 years, then the curve bends over.</p>"
                }
              }
            ]
          }
        ],
        end: {
          related: [
            { title: "Stocks and flows", where: "Chapter 1", page: "stocks-flows" },
            { title: "A brief visit to the systems zoo", where: "Chapter 2" },
            { title: "Delays and oscillation", where: "Chapter 2", page: "delays" },
            { title: "Why systems surprise us", where: "Chapter 4" }
          ],
          cta: { page: "delays", kicker: "Next", text: "Add delays and watch a stock swing" }
        }
      },
      // Meadows's car-dealer model, rebuilt with our own numbers: the three delays
      // (perception 5 days, response 3, delivery 5) and the findings that a faster
      // response makes the swings worse and a slower one damps them follow my reading
      // of Chapter 2 and are unchecked against the book.
      "delays": {
        navLabel: "Delays",
        title: "Delays and oscillation",
        eyebrow: "Part I · Chapter 02",
        dek:
          "Every feedback loop takes time to act: time to notice a change, time to decide, time for the response to arrive. Meadows shows how those delays turn a balancing loop into a system that swings.",
        blocks: [
          {
            type: "prose",
            sections: [
              {
                n: "1",
                title: "Delays are everywhere",
                paras: [
                  "A balancing loop corrects a gap, but never instantly. Information about the stock takes time to arrive and be believed; deciding what to do takes time; and the action, an order or a hire or a new policy, takes time to have an effect. Meanwhile the stock keeps moving.",
                  "Meadows's point is that a delay in a balancing loop makes a system likely to oscillate. The correction arrives late, overshoots, and has to be corrected again."
                ],
                side: {
                  label: "See also",
                  html: "<p>Delays come from stocks: a stock takes time to fill or drain, as the <a href=\"@stocks-flows\">bathtub</a> shows.</p>"
                }
              },
              {
                n: "2",
                title: "The car dealer",
                paras: [
                  "Meadows's example is a car dealer who tries to keep enough cars on the lot to cover ten days of sales. Three delays sit in the loop. The dealer averages sales over several days before believing demand has changed, a perception delay. Orders make up only part of any shortfall at a time, a response delay. And new cars take days to arrive, a delivery delay.",
                  "Then sales rise by 10% and stay there. It's the smallest, simplest change a business could face, and it sets the lot swinging."
                ],
                side: {
                  label: "Why it swings",
                  html: "<p>The dealer keeps ordering to fill a gap that orders already on the road will fill. By the time they arrive, the lot is overstocked, and the dealer cuts back too far.</p>"
                }
              }
            ]
          },
          {
            type: "inventory",
            title: "Run the car lot",
            intro:
              "An invented dealer sells 20 cars a day and aims to keep 10 days of sales on the lot. On day 25, demand rises 10% and stays there. Set the three delays, or try one of the experiments, and watch the stock over 100 days.",
            base: 20,
            rise: 0.1,
            at: 25,
            cover: 10,
            days: 100,
            unit: "cars",
            settleWithin: 5,
            caption: "Cars on the lot over 100 days.",
            delays: [
              { key: "P", label: "Perception delay", hint: "Days of sales the dealer averages before believing demand has changed." },
              { key: "R", label: "Response delay", hint: "How hard orders chase the gap: each day's order makes up one part in this many of the shortfall." },
              { key: "D", label: "Delivery delay", hint: "Days between placing an order and the cars arriving." }
            ],
            presets: [
              { id: "meadows", label: "Meadows's settings", delays: { P: 5, R: 3, D: 5 } },
              { id: "notice", label: "Notice faster", delays: { P: 2, R: 3, D: 5 } },
              { id: "react", label: "React faster", delays: { P: 5, R: 2, D: 5 } },
              { id: "slow", label: "React more slowly", delays: { P: 5, R: 6, D: 5 } },
              { id: "deliver", label: "Faster deliveries", delays: { P: 5, R: 3, D: 2 } }
            ]
          },
          {
            type: "prose",
            sections: [
              {
                n: "3",
                title: "Why reacting faster makes it worse",
                paras: [
                  "The natural response to swings is to act faster. Try it: cut the response delay from three days to two, and the swings grow. Noticing the change sooner barely helps either, because the trouble isn't seeing the change, it's overreacting to it while earlier orders are still on the way.",
                  "Slowing the response down, so that each day's order makes up a smaller part of the gap, calms the swings almost completely. Shorter deliveries help too, but delivery times are usually set by someone else. The lever the dealer actually controls is the one that feels wrong to pull."
                ],
                side: {
                  label: "Try this",
                  html: "<p>Press “React faster”, then “React more slowly”, and compare the swing in the last 20 days.</p>"
                }
              },
              {
                n: "4",
                title: "Beyond the car lot",
                paras: [
                  "The same structure shows up wherever someone manages a stock through a delay: a factory planning output, a hospital hiring nurses, a city building housing, a central bank setting interest rates. In each, an aggressive response to a gap that's already being closed produces a boom and a bust. Knowing the length of the delays is often more useful than reacting faster to them."
                ],
                side: {
                  label: "Later in the book",
                  html: "<p>Meadows ranks the length of delays among the places to intervene in a system, while noting they are often hard to change.</p>"
                }
              }
            ]
          }
        ],
        end: {
          related: [
            { title: "Stocks and flows", where: "Chapter 1", page: "stocks-flows" },
            { title: "Feedback loops", where: "Chapter 1", page: "feedback" },
            { title: "Why systems surprise us", where: "Chapter 4" },
            { title: "Leverage points", where: "Chapter 6", page: "leverage-points" }
          ],
          cta: { page: "traps", kicker: "Next", text: "See the traps that structures set" }
        }
      },
      // The eight trap names follow Chapter 5. The one-line structures, descriptions and
      // examples are ours, and the ways out paraphrase my reading of the chapter, unchecked
      // against its wording. That Meadows uses Hardin's pasture and quotes his "mutual
      // coercion" phrase is from memory and unchecked; the phrase itself is Hardin's (1968).
      "traps": {
        navLabel: "Traps",
        title: "System traps and opportunities",
        eyebrow: "Part II · Chapter 05",
        dek:
          "Some structures produce the same trouble wherever they turn up, whoever is inside them. Meadows describes eight of these traps, and for each one a way out.",
        blocks: [
          {
            type: "prose",
            sections: [
              {
                n: "1",
                title: "Same structure, same trouble",
                paras: [
                  "Meadows calls them archetypes: common arrangements of feedback that produce characteristic kinds of trouble. An arms race and a price war look nothing alike, but they're built the same way and they go wrong the same way.",
                  "Because the structure produces the behavior, replacing the people rarely helps. New people in the same position face the same pressures and make much the same choices. What helps is changing the structure: the goals, the rules, the information and the feedback. That's why the chapter is about opportunities as well as traps. Understanding how a trap works shows where the way out is."
                ],
                side: {
                  label: "Archetypes",
                  html: "<p>Peter Senge's <cite>The Fifth Discipline</cite> (1990) made a similar set of system archetypes widely known in management, and several of the names overlap.</p>"
                }
              }
            ]
          },
          {
            type: "trap-cards",
            eyebrow: "The eight traps",
            title: "Traps, and the ways out",
            intro: "Each trap is a structure, and each way out changes the structure rather than the people in it.",
            outLabel: "The way out",
            items: [
              {
                name: "Policy resistance",
                structure: "Balancing loops pulling one stock toward different goals",
                trap: "When several groups want different things from the same system, a push from one is met by the others pushing back harder. Everyone works hard and the system barely moves. A crackdown that raises the price of an illegal drug, and so draws in new suppliers, is a familiar case.",
                out: "Let go: stop pushing, so the resistance relaxes. Then look for a goal all the groups can share, so their effort pulls the same way."
              },
              {
                name: "The tragedy of the commons",
                structure: "Use that grows on itself, with weak feedback from the resource",
                trap: "Each user of a shared resource gets the whole gain from using a little more and bears only a share of the cost. So everyone takes more, and the resource erodes until nobody can use it.",
                out: "Strengthen the missing feedback: educate and exhort the users, divide the resource so each user bears the cost of overusing their part, or regulate access for everyone."
              },
              {
                name: "Drift to low performance",
                structure: "A balancing loop whose goal is set by its own results",
                trap: "When the standard is set by past performance, and bad results are believed more readily than good ones, every disappointment lowers the bar. Performance follows the bar down, slowly enough that nobody notices.",
                out: "Keep standards absolute, whatever the latest results. Better still, let the best results raise the standard rather than the worst lower it."
              },
              {
                name: "Escalation",
                structure: "Two balancing loops joined into one reinforcing loop",
                trap: "When each side's goal is to stay ahead of the other, every move provokes a bigger one. Arms races, price wars and advertising battles run this way, and so do two voices getting louder at a party.",
                out: "Refuse to compete, even if only one side does, which breaks the loop. Or negotiate a new arrangement with balancing loops that limit the race."
              },
              {
                name: "Success to the successful",
                structure: "Reinforcing loops competing for one limited resource",
                trap: "When winning brings the means to win again, the winners take a growing share and the losers are pushed out. Played long enough, the game ends with one player holding everything, as in Monopoly.",
                out: "Let the losers find another game, limit the share any one winner can hold, and level the field so that each round's prize doesn't decide the next."
              },
              {
                name: "Shifting the burden to the intervenor",
                structure: "A quick fix that weakens the system's own correction",
                trap: "A fix relieves a symptom but leaves the cause alone, and the system's own ability to handle the problem withers through disuse. Each time, more of the fix is needed. Addiction is the extreme case.",
                out: "Avoid getting hooked in the first place. If already dependent, use the fix while rebuilding the system's own capacity, then withdraw it gradually."
              },
              {
                name: "Rule beating",
                structure: "Behavior aimed at the letter of a rule, not its purpose",
                trap: "People obey the wording of a rule while defeating its intent. A department spends whatever is left of its budget in the last weeks of the year so that next year's budget isn't cut.",
                out: "Treat rule beating as feedback about the rules. Redesign them so that ingenuity goes into meeting their purpose rather than getting around them."
              },
              {
                name: "Seeking the wrong goal",
                structure: "A balancing loop aimed at the wrong target",
                trap: "A system does what its goals and measures ask, not what anyone intended. Judge schools by test scores and they teach to the test; judge a country by its output and it counts activity, not well-being.",
                out: "Choose goals and indicators that reflect what you actually want, and don't confuse effort with results."
              }
            ]
          },
          {
            type: "prose",
            sections: [
              {
                n: "2",
                title: "The commons, up close",
                paras: [
                  "The best-known trap takes its name from Garrett Hardin's 1968 essay, which imagined a pasture open to every herder. Each herder gets all the benefit of adding one more animal, while the cost, a little less grass, is shared by everyone. So every herder adds animals, and the pasture is grazed bare.",
                  "Meadows reads it as a problem of missing feedback: the condition of the resource reaches the users too weakly or too late to change what they do. Each of her three ways out repairs that link. Teach users the consequences and ask them to restrain themselves. Divide the resource so each user feels the cost of overusing their own part. Or regulate access for everyone, by what Hardin called “mutual coercion, mutually agreed upon.”"
                ],
                side: {
                  label: "Not only pastures",
                  html: "<p>Fisheries, groundwater, clean air and a shared office kitchen are all commons: things many people can draw on, where nobody pays more for using more.</p>"
                }
              }
            ]
          },
          {
            type: "commons",
            title: "Run the shared pasture",
            intro:
              "An invented village pasture feeds five herders' cows. A well-fed cow earns $1,000 a year and costs $300 to keep; when grass runs short, cows go hungry and earn less. Each year a herder adds a cow if the cows made money and sells one if they lost it. Choose how the pasture is run, or try an experiment, and watch 40 years.",
            herders: 5,
            startCows: 6,
            share: 10,
            years: 40,
            regrow: 0.5,
            eat: 0.25,
            hungry: 40,
            value: 1000,
            upkeep: 300,
            capMin: 20,
            capMax: 80,
            failBelow: 25,
            caption: "Grass cover, as a share of a fully grown pasture, and cows on the pasture over 40 years.",
            grassLabel: "Grass cover",
            cowsLabel: "Cows",
            heldPlotLabel: "Plots held back",
            otherPlotLabel: "Plots not held back",
            modes: [
              { id: "shared", label: "One shared pasture", hint: "Every cow grazes the same grass." },
              { id: "fenced", label: "Fenced into five plots", hint: "Each herder grazes only their own plot." },
              { id: "cap", label: "Shared, with a cap", hint: "A limit on the whole herd, split equally and enforced." }
            ],
            holdersLabel: "Herders who hold back to 10 cows",
            holdersHint: "The rest keep adding cows as long as their cows make money.",
            capLabel: "Cap on the whole herd",
            capHint: "Each herder may keep a fifth of it.",
            holdsRule: "Holds back",
            addsRule: "Adds while cows pay",
            capRule: "Keeps to the cap",
            presets: [
              { id: "open", label: "Open pasture", mode: "shared", holders: 0, cap: 50 },
              { id: "all", label: "Everyone holds back", mode: "shared", holders: 5, cap: 50 },
              { id: "one", label: "One herder doesn't", mode: "shared", holders: 4, cap: 50 },
              { id: "fence", label: "Fence it", mode: "fenced", holders: 4, cap: 50 },
              { id: "cap", label: "Cap it at 50", mode: "cap", holders: 4, cap: 50 }
            ]
          },
          {
            type: "prose",
            sections: [
              {
                n: "3",
                title: "What the pasture shows",
                paras: [
                  "On the open pasture, the first decade looks like success: more cows and more income every year. The grass is a large stock, and it hides the damage until the herd is far bigger than it can feed. Then it fails for everyone at once, and the herders spend years losing money on hungry cows.",
                  "An agreement to hold back works only while everyone keeps it. A herder who breaks it earns more than the others, takes more of the grass, and still brings the pasture down. Fence the same pasture into plots, with the same herders and the same habits, and the one who overgrazes ruins only their own plot. The feedback now reaches the person who causes the damage.",
                  "A cap works for everyone at once, but only if it's set from what the grass can feed. Many commons, such as fish, air and groundwater, can't be fenced, so this is often the only way out that's available."
                ],
                side: {
                  label: "Try this",
                  html: "<p>Press “One herder doesn't”, then “Fence it”: same herders, same habits, different structure. Then set the cap to 55. The pasture looks fine for more than twenty years before it starts to fail.</p>"
                }
              }
            ]
          },
          {
            type: "sorter",
            title: "Name the trap",
            intro: "Six invented situations, four traps. Which trap is each one caught in?",
            options: [
              { id: "escalation", label: "Escalation", hint: "Each side sets its goal by the other's." },
              { id: "success", label: "Success to the successful", hint: "Winning brings the means to win again." },
              { id: "burden", label: "Shifting the burden", hint: "A quick fix weakens the real cure." },
              { id: "drift", label: "Drift to low performance", hint: "The standard slips with each result." }
            ],
            items: [
              {
                text: "A help desk misses its four-hour response target, so the target becomes eight hours. The next year it misses eight, and the target becomes twelve.",
                answer: "drift",
                why: "The standard is set by recent results, so each disappointment lowers it. Hold the standard where it is, or set it by the best the team has done."
              },
              {
                text: "Two cafés on the same street each cut prices to win customers from the other, until neither makes money on a cup.",
                answer: "escalation",
                why: "Each café's price is set by the other's, so two balancing loops have joined into one reinforcing loop. One way out is to stop matching and compete on something else."
              },
              {
                text: "Each time a project slips, a team brings in outside contractors to rescue it. Two years on, nobody on the team understands the system the contractors keep fixing.",
                answer: "burden",
                why: "The rescue works, which is the problem: it relieves the symptom while the team's own skill withers. Use the contractors while rebuilding that skill, then step back."
              },
              {
                text: "On an online marketplace, the sellers with the most reviews appear first in search, so they make the most sales and collect the most new reviews.",
                answer: "success",
                why: "Each win buys the visibility that wins the next sale. Marketplaces counter it by giving new sellers some visibility of their own, a way of leveling the field."
              },
              {
                text: "Two neighboring towns compete for the same employers with ever-larger tax breaks, until neither collects enough to maintain its roads.",
                answer: "escalation",
                why: "Each town's offer is set by the other's. The race stops only when one side refuses to match, or both agree to a limit."
              },
              {
                text: "A sales team makes its quarterly number with ever-deeper discounts in the last week. Customers learn to wait for them, so each quarter needs a bigger discount than the last.",
                answer: "burden",
                why: "The discount treats the symptom, a short quarter, while wearing away the real cure: customers willing to pay full price."
              }
            ]
          },
          {
            type: "prose",
            sections: [
              {
                n: "4",
                title: "The way out is in the structure",
                paras: [
                  "The ways out have a family resemblance. Restore feedback that's missing or too slow. Replace a goal that's set by the wrong thing, or relative to the wrong people. Rewrite rules that reward the wrong behavior. None of them depends on finding better people.",
                  "They also tend to feel uncomfortable: holding back while others don't, keeping a standard after a bad year, refusing to match a rival's price cut. A trap is a trap because each step into it feels sensible to the person taking it."
                ],
                side: {
                  label: "See also",
                  html: "<p>Several of the ways out are <a href=\"@leverage-points\">leverage points</a>: information flows, rules and goals.</p>"
                }
              }
            ]
          }
        ],
        end: {
          related: [
            { title: "Leverage points", where: "Chapter 6", page: "leverage-points" },
            { title: "Feedback loops", where: "Chapter 1", page: "feedback" },
            { title: "Delays and oscillation", where: "Chapter 2", page: "delays" },
            { title: "Why systems surprise us", where: "Chapter 4" }
          ],
          cta: { page: "leverage-points", kicker: "Next", text: "Where to push: twelve leverage points" }
        }
      },
      // The meter-in-the-hall story and Meadows's caveat that the list is tentative are
      // from my reading of Chapter 6 and unchecked against the book's wording. The twelve
      // names follow her list; the descriptions are ours.
      "leverage-points": {
        navLabel: "Leverage",
        title: "Leverage points",
        eyebrow: "Part III · Chapter 06",
        dek:
          "Some places in a system respond to a small push with a large change. Meadows ranks twelve kinds of place to intervene, and the ones people reach for first are near the bottom of her list.",
        blocks: [
          {
            type: "prose",
            sections: [
              {
                n: "1",
                title: "Where to push",
                paras: [
                  "Faced with a problem in a system, most people adjust a number: a budget, a tax rate, a target. Meadows argues that numbers are among the weakest places to intervene. The structure that produced the problem is still there, so the behavior usually comes back.",
                  "Higher up her list are places that change the structure itself: how long feedback takes, who gets what information, what the rules are, what the system is for, and the beliefs it grows out of. They're more powerful, harder to see, and more fiercely resisted."
                ],
                side: {
                  label: "Not a recipe",
                  html: "<p>Meadows offered the list as tentative and its order as open to argument. It's a way of looking at a problem, not a checklist.</p>"
                }
              }
            ]
          },
          {
            type: "ladder",
            eyebrow: "The list",
            title: "Twelve places to intervene",
            lowLabel: "Least effective",
            highLabel: "Most effective",
            items: [
              { n: 12, name: "Numbers", desc: "Parameters such as tax rates, subsidies, budgets and standards. The most common place to push, and usually the weakest." },
              { n: 11, name: "Buffers", desc: "The size of a stabilizing stock compared with its flows. A big reserve steadies a system but makes it slow to change." },
              { n: 10, name: "Stock-and-flow structures", desc: "The physical layout: pipes, roads, factories, who is connected to what. Powerful, but slow and costly to rebuild." },
              { n: 9, name: "Delays", desc: "How long feedback takes compared with how fast the system changes. Often decisive, often hard to alter." },
              { n: 8, name: "Balancing feedback loops", desc: "How strong the self-correcting loops are compared with the pressures they have to correct." },
              { n: 7, name: "Reinforcing feedback loops", desc: "How strongly growth feeds on itself. Slowing a runaway loop usually beats fighting its effects." },
              { n: 6, name: "Information flows", desc: "Who knows what, and when. Restoring a missing loop of information can change behavior cheaply." },
              { n: 5, name: "Rules", desc: "Incentives, punishments and constraints: who may do what, and who decides." },
              { n: 4, name: "Self-organization", desc: "The power of a system to add to, change or evolve its own structure." },
              { n: 3, name: "Goals", desc: "The purpose the whole system serves. Change it and everything beneath it reorganizes." },
              { n: 2, name: "Paradigms", desc: "The shared assumptions out of which the system's goals, rules and structure arise." },
              { n: 1, name: "Transcending paradigms", desc: "Holding no paradigm as the final truth, and staying free to change it." }
            ]
          },
          {
            type: "prose",
            sections: [
              {
                n: "2",
                title: "The meter in the hall",
                paras: [
                  "One of Meadows's examples shows how strong an information flow can be. In a Dutch suburb of near-identical houses, some had their electricity meters down in the basement and others in the front hall, where the family passed them every day. The houses with meters in the hall used about a third less electricity. The prices, the houses and the people were the same; only what they could see had changed."
                ],
                side: {
                  label: "Cheap and strong",
                  html: "<p>Putting feedback where decisions are made is often one of the cheapest interventions available, and one of the most overlooked.</p>"
                }
              }
            ]
          },
          {
            type: "ranker",
            title: "Rank the interventions",
            intro:
              "An invented city wants to cut traffic jams. Here are five ideas. Put them in order from least leverage at the top to most at the bottom, then check against Meadows's list.",
            topLabel: "Least leverage",
            bottomLabel: "Most leverage",
            descending: true,
            perfect: "All in order. The most familiar fix, a price change, sat at the bottom of the list.",
            hint: "Move any item and check again. Meadows's list runs from numbers, through information and rules, to goals and paradigms.",
            start: ["goal", "fee", "paradigm", "signs", "rules"],
            items: [
              {
                id: "fee",
                text: "Raise the downtown parking fee by $2 an hour.",
                rank: 12,
                label: "Leverage point 12 · Numbers",
                why: "A parameter. It may trim some traffic, but the system that produces the jams is unchanged."
              },
              {
                id: "signs",
                text: "Show live journey times by car and by train on a sign at every on-ramp.",
                rank: 6,
                label: "Leverage point 6 · Information flows",
                why: "Drivers get feedback they didn't have, at the moment they choose. Cheap, and it changes behavior directly."
              },
              {
                id: "rules",
                text: "Let developers build homes near train stations without the parking spaces the code now requires.",
                rank: 5,
                label: "Leverage point 5 · Rules",
                why: "A rule change reshapes what gets built, and so where people live and how they travel, for decades."
              },
              {
                id: "goal",
                text: "Change the transport department's goal from moving cars quickly to moving people quickly.",
                rank: 3,
                label: "Leverage point 3 · Goals",
                why: "Every budget, plan and measure beneath the goal reorganizes around it."
              },
              {
                id: "paradigm",
                text: "Challenge the shared belief that a good city is one you can drive across easily.",
                rank: 2,
                label: "Leverage point 2 · Paradigms",
                why: "The goals, rules and roads all grow out of this assumption. Shift it and the rest follows, slowly."
              }
            ]
          },
          {
            type: "prose",
            sections: [
              {
                n: "3",
                title: "Why the list runs this way",
                paras: [
                  "Numbers get most of the attention because they're visible and easy to argue about. But changing a number leaves the loops, the rules and the purpose of the system as they were, so the system tends to produce the same behavior with slightly different figures.",
                  "Further up, interventions change how the system is built, what it's allowed to do, what it's trying to achieve and what its people believe. Those changes threaten things people inside the system value, which is why the most powerful points are also where change is hardest."
                ],
                side: {
                  label: "See also",
                  html: "<p>Delays rank ninth. The <a href=\"@delays\">car lot</a> shows how much they matter, and how hard they can be to change.</p>"
                }
              }
            ]
          }
        ],
        end: {
          related: [
            { title: "Delays and oscillation", where: "Chapter 2", page: "delays" },
            { title: "Feedback loops", where: "Chapter 1", page: "feedback" },
            { title: "System traps and opportunities", where: "Chapter 5", page: "traps" },
            { title: "Living in a world of systems", where: "Chapter 7" }
          ],
          cta: { page: "", kicker: "Contents", text: "See the map of the book" }
        }
      }
    }
  });
})();
