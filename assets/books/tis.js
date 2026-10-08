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
    nav: ["stocks-flows"],

    parts: [
      {
        n: "I",
        title: "System structure and behavior",
        chapters: [
          { n: 1, title: "The basics", blurb: "Elements, interconnections and purpose; stocks, and the flows that fill and drain them.", page: "stocks-flows" },
          { title: "Feedback loops", blurb: "Balancing loops pull a stock toward a goal; reinforcing loops make it grow or collapse." },
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
      { era: "Chapter 1", title: "A cooling cup of coffee", blurb: "A balancing loop: the hotter the coffee, the faster it cools toward room temperature.", tag: "Feedback loops" },
      { era: "Chapter 1", title: "Money in the bank", blurb: "A reinforcing loop: the more money in the account, the more interest it earns.", tag: "Feedback loops" },
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
            { title: "Feedback loops", where: "Chapter 1" },
            { title: "Delays and oscillation", where: "Chapter 2" },
            { title: "Why systems surprise us", where: "Chapter 4" },
            { title: "Leverage points", where: "Chapter 6" }
          ],
          cta: { page: "", kicker: "Contents", text: "See the map of the book" }
        }
      }
    }
  });
})();
