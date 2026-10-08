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
      { kicker: "Start here", title: "Stocks and flows", desc: "Fill and drain a bathtub, and watch what the level does.", page: "stocks-flows" }
    ],
    mapTitle: "Three parts, seven chapters",
    contentsDesc: "From stocks and flows to system traps and leverage points.",
    mapNote: "Numbered rows are chapters; the rows between them are sections with pages of their own. Pages open as they're written.",
    casesTitle: "The systems Meadows uses",
    nav: ["stocks-flows", "feedback"],

    parts: [
      {
        n: "I",
        title: "System structure and behavior",
        chapters: [
          { n: 1, title: "The basics", blurb: "Elements, interconnections and purpose; stocks, and the flows that fill and drain them.", page: "stocks-flows" },
          { title: "Feedback loops", blurb: "Balancing loops pull a stock toward a goal; reinforcing loops make it grow or collapse.", page: "feedback" },
          { n: 2, title: "A brief visit to the systems zoo", blurb: "Small models of common systems: a thermostat, a population, a car dealer's lot, an oil field, a fishery." },
          { title: "Delays and oscillation", blurb: "Why a car dealer's inventory swings for months after one rise in demand." }
        ]
      },
      {
        n: "II",
        title: "Systems and us",
        chapters: [
          { n: 3, title: "Why systems work so well", blurb: "Resilience, self-organization and hierarchy." },
          { n: 4, title: "Why systems surprise us", blurb: "Events hide behavior; nonlinearities, boundaries, limits, delays and bounded rationality." },
          { n: 5, title: "System traps and opportunities", blurb: "Structures that produce the same problems again and again, and the way out of each." }
        ]
      },
      {
        n: "III",
        title: "Creating change, in systems and in our philosophy",
        chapters: [
          { n: 6, title: "Leverage points", blurb: "Twelve places to intervene in a system, from changing numbers to changing paradigms." },
          { n: 7, title: "Living in a world of systems", blurb: "Habits for working with systems rather than against them." }
        ]
      }
    ],

    cases: [
      { era: "Chapter 1", title: "A bathtub", blurb: "One stock, one inflow, one outflow: the simplest system there is.", tag: "Stocks and flows", page: "stocks-flows" },
      { era: "Chapter 1", title: "A cooling cup of coffee", blurb: "A balancing loop: the hotter the coffee, the faster it cools toward room temperature.", tag: "Feedback loops", page: "feedback" },
      { era: "Chapter 1", title: "Money in the bank", blurb: "A reinforcing loop: the more money in the account, the more interest it earns.", tag: "Feedback loops", page: "feedback" },
      { era: "Chapter 2", title: "A thermostat", blurb: "Two balancing loops pulling one stock, the heat in a room, in opposite directions.", tag: "Systems zoo" },
      { era: "Chapter 2", title: "A car dealer's lot", blurb: "Three delays turn one rise in demand into months of swings in inventory.", tag: "Delays" },
      { era: "Chapter 2", title: "A fishing fleet", blurb: "A renewable resource that can be harvested for ever, or fished to collapse.", tag: "Systems zoo" }
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
            { title: "Delays and oscillation", where: "Chapter 2" },
            { title: "Why systems surprise us", where: "Chapter 4" },
            { title: "Leverage points", where: "Chapter 6" }
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
            { title: "Delays and oscillation", where: "Chapter 2" },
            { title: "Why systems surprise us", where: "Chapter 4" }
          ],
          cta: { page: "", kicker: "Contents", text: "See the map of the book" }
        }
      }
    }
  });
})();
