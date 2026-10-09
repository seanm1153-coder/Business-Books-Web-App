// Thinking in Systems: A Primer (Donella H. Meadows, edited by Diana Wright, 2008).
// Summaries are paraphrased; keep quotations short and attributed.
// The map lists the book's seven chapters. Unnumbered rows are sections of the chapter
// above them that have pages of their own.
(function () {
  "use strict";

  // Points for behavior charts: f sampled at n + 1 evenly spaced times from x0 to x1.
  const curve = (f, x0, x1, n = 60) =>
    Array.from({ length: n + 1 }, (_, i) => {
      const x = x0 + ((x1 - x0) * i) / n;
      return [x, f(x)];
    });

  // Meadows's car dealer, re-run: inventory on the lot, day by day, when demand steps up
  // 10% on day 25. Sales are averaged over the perception delay, orders close the gap to ten
  // days' perceived sales over the response delay, and orders arrive after the delivery
  // delay. Our reconstruction from her description, not her model's equations.
  const dealer = ({ perc = 5, resp = 3, deliv = 5, days = 100 } = {}) => {
    let inv = 200;
    let seen = 20;
    const pipe = Array(deliv).fill(20);
    const pts = [];
    for (let t = 0; t <= days; t++) {
      const sales = t >= 25 ? 22 : 20;
      seen += (sales - seen) / perc;
      const orders = Math.max(0, seen + (seen * 10 - inv) / resp);
      inv += pipe.shift() - sales;
      pipe.push(orders);
      pts.push([t, inv]);
    }
    return pts;
  };

  // An oil field and a fishery, re-run from Meadows's descriptions; our reconstructions,
  // not her models' equations. In both, profit buys capital (rigs, boats) that wears out.
  // Oil: each rig yields a barrel-unit a year until the field is down to 500, then less.
  const oil = (size, years = 100) => {
    let left = size;
    let rigs = 1;
    const pts = [];
    for (let t = 0; t <= years; t++) {
      const out = Math.min(left, rigs * Math.min(1, left / 500));
      pts.push([t, out]);
      left -= out;
      rigs += Math.max(0, 0.05 * (5 * out - 2 * rigs)) - rigs / 20;
    }
    return pts;
  };
  // Fish regrow fastest at half the sea's capacity; each boat's catch falls with fish
  // density to the power `a`, so the lower `a`, the better boats are at finding the last
  // fish. Returns fish as a share of capacity, yearly.
  const fishery = (a, years = 150) => {
    let fish = 1000;
    let boats = 1;
    const pts = [];
    const dt = 0.25;
    for (let i = 0; i <= years / dt; i++) {
      if (i % 4 === 0) pts.push([i * dt, fish / 10]);
      const regrow = 0.4 * fish * (1 - fish / 1000);
      const catchNow = Math.min(fish / dt, boats * 20 * Math.pow(fish / 1000, a));
      fish = Math.max(0, fish + (regrow - catchNow) * dt);
      boats = Math.max(0, boats + (0.006 * (2 * catchNow - 10 * boats) - boats / 15) * dt);
    }
    return pts;
  };

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
      { kicker: "Start here", title: "Stocks and flows", desc: "The building blocks of every system, and why a tub keeps filling while the faucet closes.", page: "stocks-flows" },
      { kicker: "Case", title: "Delays", desc: "How one rise in demand sets a car lot swinging, and why reacting faster makes it worse.", page: "delays" },
      { kicker: "System traps", title: "Eight traps", desc: "The structures that produce the same trouble again and again, each drawn as a loop, with its way out.", page: "traps" }
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
          { title: "Delays and oscillation", blurb: "Why a car dealer's inventory swings for months after one rise in demand.", page: "delays" },
          { title: "Growth meets a limit", blurb: "An oil field and a fishery: growing capital drawing on a stock that runs out, or one that regrows.", page: "limits" }
        ]
      },
      {
        n: "II",
        title: "Systems and us",
        chapters: [
          { n: 3, title: "Why systems work so well", blurb: "Resilience, self-organization and hierarchy.", page: "resilience" },
          { n: 4, title: "Why systems surprise us", blurb: "Events hide behavior; nonlinearities, boundaries, limits, delays and bounded rationality.", page: "surprises" },
          { n: 5, title: "System traps and opportunities", blurb: "Structures that produce the same problems again and again, and the way out of each.", page: "traps" }
        ]
      },
      {
        n: "III",
        title: "Creating change, in systems and in our philosophy",
        chapters: [
          { n: 6, title: "Leverage points", blurb: "Twelve places to intervene in a system, from changing numbers to changing paradigms.", page: "leverage-points" },
          { n: 7, title: "Living in a world of systems", blurb: "Habits for working with systems rather than against them.", page: "living" }
        ]
      }
    ],

    cases: [
      { era: "Chapter 1", title: "A bathtub", blurb: "One stock, one inflow, one outflow: the simplest system there is.", tag: "Stocks and flows", page: "stocks-flows" },
      { era: "Chapter 1", title: "A cooling cup of coffee", blurb: "A balancing loop: the hotter the coffee, the faster it cools toward room temperature.", tag: "Feedback loops", page: "feedback" },
      { era: "Chapter 1", title: "Money in the bank", blurb: "A reinforcing loop: the more money in the account, the more interest it earns.", tag: "Feedback loops", page: "feedback" },
      { era: "Chapter 2", title: "A thermostat", blurb: "Two balancing loops pulling one stock, the heat in a room, in opposite directions.", tag: "Systems zoo" },
      { era: "Chapter 2", title: "A car dealer's lot", blurb: "Three delays turn one rise in demand into months of swings in inventory.", tag: "Delays", page: "delays" },
      { era: "Chapter 2", title: "An oil field", blurb: "Profits buy rigs until the emptying field pushes back: a rise, a peak and a fall.", tag: "Systems zoo", page: "limits" },
      { era: "Chapter 2", title: "A fishing fleet", blurb: "A renewable resource that can be harvested forever, or fished to collapse.", tag: "Systems zoo", page: "limits" },
      { era: "Chapter 5", title: "A shared pasture", blurb: "Herders who each gain from one more animal, and together graze the pasture bare.", tag: "System traps", page: "traps" }
    ],

    pages: {
      // A reference page. The definition of a system (quoted), elements, interconnections and
      // purpose, the football team, stocks and flows, dynamic equilibrium and the stock
      // principles follow Meadows's chapter 1 and its end-of-chapter summary as I remember
      // them, unchecked against her wording. The bathtub charts are drawn from simple
      // arithmetic (a faucet closing steadily against a fixed drain), not from the book's
      // figures. The examples table is ours, built from systems the book mentions.
      "stocks-flows": {
        navLabel: "Stocks and flows",
        title: "Stocks and flows",
        eyebrow: "Part I · Chapter 01",
        layout: "dense",
        dek:
          "Every system is built from stocks, the things you can see, count or measure at any moment, and flows, the rates that fill and drain them. Meadows starts with the simplest case there is: a bathtub.",
        blocks: [
          {
            type: "brief",
            eyebrow: "In brief",
            title: "The chapter in six points",
            points: [
              {
                t: "A system is elements, interconnections and a purpose.",
                d: "Meadows defines it as “an interconnected set of elements that is coherently organized in a way that achieves something.” The elements are the easiest part to see and usually the least important: a football team can replace every player and stay the same team, but change its rules or its goal and it becomes something else."
              },
              {
                t: "Stocks are what you can count at a moment.",
                d: "Water in a tub, money in an account, trees in a forest, goods in a warehouse, a reputation. A stock is the memory of every flow that has filled or drained it."
              },
              {
                t: "Only flows change a stock.",
                d: "When inflow exceeds outflow, the stock rises; when it falls short, the stock falls; when they match, the stock holds steady in dynamic equilibrium, even though both flows keep running."
              },
              {
                t: "There are two ways to raise a stock.",
                d: "Add to the inflow, or cut the outflow. A company can keep more staff by hiring faster or by losing fewer people. The second way is often cheaper, and often overlooked."
              },
              {
                t: "Stocks change slowly.",
                d: "Even large flows take time to move a large stock. That makes stocks delays, buffers and shock absorbers, and gives systems their momentum."
              },
              {
                t: "Stocks let flows run out of step.",
                d: "A warehouse lets a factory produce at a different pace from sales; a reservoir lets a city use water in a drought. Much of managing anything is adjusting flows to keep stocks where you want them."
              }
            ]
          },
          {
            type: "diagram",
            eyebrow: "Figure",
            title: "How Meadows draws a stock and its flows",
            intro: "The bathtub in stock-and-flow notation. The same three symbols draw every system in the book.",
            alt: "A stock-and-flow diagram. A cloud on the left feeds a pipe with a valve labelled faucet into a box labelled water in the tub. A second pipe with a valve labelled drain leads from the box to a cloud on the right.",
            w: 520,
            h: 110,
            nw: 300,
            nh: 340,
            nodes: [
              { id: "src", kind: "cloud", x: 30, y: 60, nx: 150, ny: 22 },
              { id: "tub", kind: "stock", label: "Water in\nthe tub", x: 260, y: 60, w: 110, nx: 150, ny: 170 },
              { id: "sink", kind: "cloud", x: 490, y: 60, nx: 150, ny: 318 }
            ],
            links: [
              { from: "src", to: "tub", flow: true, label: "Faucet (inflow)" },
              { from: "tub", to: "sink", flow: true, label: "Drain (outflow)" }
            ],
            notes: [
              { t: "A box is a stock:", d: "an amount, measured in units such as liters, dollars or people." },
              { t: "A pipe with a valve is a flow:", d: "a rate, in units per period, such as liters per minute. The valve is where the rate is set." },
              { t: "A cloud is the system's edge:", d: "where a flow comes from, or goes to, that this model doesn't track." }
            ]
          },
          {
            type: "behavior",
            eyebrow: "Behavior over time",
            title: "What the level does",
            intro: "A 100-liter tub. The level follows the gap between faucet and drain, not either flow alone.",
            cols: 2,
            charts: [
              {
                t: "Faucet runs faster than the drain",
                d: "In at 5 liters a minute, out at 2: the level climbs 3 liters a minute, from 20 to 80 in 20 minutes.",
                x: [0, 20],
                y: [0, 100],
                xLabel: "Minutes",
                yTicks: [0, 50, 100],
                yLabel: "Liters",
                unit: " L",
                hover: true,
                series: [{ name: "Water in the tub", points: curve((t) => 20 + 3 * t, 0, 20, 20) }]
              },
              {
                t: "Faucet matches the drain",
                d: "In and out at 5 liters a minute: dynamic equilibrium. Water keeps moving through the tub, but the level holds at 50.",
                x: [0, 20],
                y: [0, 100],
                xLabel: "Minutes",
                yTicks: [0, 50, 100],
                yLabel: "Liters",
                unit: " L",
                hover: true,
                series: [{ name: "Water in the tub", points: curve(() => 50, 0, 20, 20) }]
              },
              {
                t: "Closing the faucet: the flows",
                d: "The faucet closes steadily from 8 liters a minute to 2 over 20 minutes; the drain stays at 5. They cross at minute 10.",
                x: [0, 30],
                y: [0, 10],
                xLabel: "Minutes",
                yTicks: [0, 5, 10],
                yLabel: "Liters a minute",
                unit: " L/min",
                hover: true,
                series: [
                  { name: "Faucet", points: curve((t) => (t <= 20 ? 8 - 0.3 * t : 2), 0, 30, 30) },
                  { name: "Drain", tone: "cash", points: curve(() => 5, 0, 30, 30) }
                ]
              },
              {
                t: "Closing the faucet: the level",
                d: "The level goes on rising for ten minutes after the faucet starts closing, peaks at 45 liters when the flows cross, and only then falls.",
                x: [0, 30],
                y: [0, 100],
                xLabel: "Minutes",
                yTicks: [0, 50, 100],
                yLabel: "Liters",
                unit: " L",
                hover: true,
                series: [{ name: "Water in the tub", points: curve((t) => (t <= 20 ? 30 + 3 * t - 0.15 * t * t : 30 - 3 * (t - 20)), 0, 30, 30) }]
              }
            ],
            caption: "Drawn from simple arithmetic, not the book's figures."
          },
          {
            type: "table",
            eyebrow: "Everywhere",
            title: "Stocks and the flows that change them",
            intro: "The same structure in very different systems. Our examples, from systems the book mentions.",
            columns: ["Stock", "Inflows", "Outflows", "Why it matters"],
            widths: ["11rem", null, null, null],
            rows: [
              ["Water in a reservoir", "Rain, rivers", "Evaporation, releases to the city", "Lets a city use water at a steady rate while rainfall comes and goes"],
              ["A population", "Births, people moving in", "Deaths, people moving out", "Changes for decades after birth rates change, because of the people already born"],
              ["Trees in a forest", "Growth", "Logging, fire, death", "Takes decades to rebuild once cut, whatever the harvest rate allows"],
              ["Money in an account", "Deposits, interest", "Withdrawals, fees", "Its own size drives one inflow, interest: a feedback loop, the next page's subject"],
              ["Goods in a warehouse", "Deliveries from the factory", "Shipments to customers", "Lets production and sales run at different paces"],
              ["A workforce", "Hiring", "Quits, retirements, layoffs", "Can be kept up by losing fewer people as well as by hiring more"],
              ["A company's reputation", "Promises kept", "Promises broken", "Builds slowly and can drain fast"]
            ]
          },
          {
            type: "table",
            eyebrow: "Principles",
            title: "What stocks and flows imply",
            intro: "Meadows closes the chapter with a summary of principles like these. Our wording.",
            columns: ["Principle", "What it means in practice"],
            widths: ["19rem", null],
            rows: [
              ["A stock is the memory of the history of its flows.", "To understand where a stock is going, look at its flows, not just its level."],
              ["If inflows exceed outflows, the stock rises, and the reverse.", "A shrinking inflow does not mean a shrinking stock. Watch the gap."],
              ["A stock can be raised by cutting outflow as well as by raising inflow.", "Retention, maintenance and conservation are as much levers as recruitment, investment and supply."],
              ["Stocks act as delays, buffers and shock absorbers.", "Big stocks change slowly, so expect lags between a change in flows and a visible result."],
              ["Stocks let inflows and outflows be decoupled.", "That gives slack and stability, at the cost of tying up resources in the stock."],
              ["Most decisions are made to adjust stocks.", "People and organizations watch stock levels and change flows to correct them: feedback."]
            ]
          }
        ],
        end: {
          related: [
            { title: "Feedback loops", where: "Chapter 1", page: "feedback" },
            { title: "Delays and oscillation", where: "Chapter 2", page: "delays" },
            { title: "Why systems surprise us", where: "Chapter 4", page: "surprises" },
            { title: "Leverage points", where: "Chapter 6", page: "leverage-points" }
          ],
          cta: { page: "feedback", kicker: "Next", text: "Add feedback: loops that run the stock" }
        }
      },
      // A reference page. Balancing and reinforcing loops, the coffee cup (hot and iced), the
      // bank account, the population with competing loops and shifting dominance, the leaky
      // thermostat that settles below its setting, and feedback acting only on future
      // behavior follow Meadows's chapters 1 and 2 as I remember them, unchecked against her
      // wording. The charts are drawn from simple formulas, not the book's figures. The
      // doubling times are arithmetic. The polarity rule in the comparison table is standard
      // system dynamics; unchecked whether the book states it.
      "feedback": {
        navLabel: "Feedback loops",
        title: "Feedback loops",
        eyebrow: "Part I · Chapter 01",
        layout: "dense",
        dek:
          "A system starts to run itself when a stock affects its own flows. Meadows calls that a feedback loop, and there are only two kinds: loops that pull a stock toward a goal, and loops that make it grow on itself.",
        blocks: [
          {
            type: "brief",
            eyebrow: "In brief",
            title: "The argument in six points",
            points: [
              {
                t: "A feedback loop is a stock that changes its own flows.",
                d: "A closed chain runs from the level of a stock, through a decision, a rule or a physical law, back to a flow that changes it."
              },
              {
                t: "Balancing loops seek a goal.",
                d: "They oppose whatever direction of change is imposed on them. The bigger the gap, the faster the correction, so the stock moves quickly at first and then settles."
              },
              {
                t: "Reinforcing loops amplify.",
                d: "Change is proportional to the stock, so it compounds: exponential growth, or runaway collapse. The same structure compounds savings and debt."
              },
              {
                t: "Doubling time is about 70 divided by the growth rate.",
                d: "Something growing steadily at 7% a year doubles in about ten years, then again in ten more. Exponential growth outruns intuition fast."
              },
              {
                t: "Loops compete, and dominance shifts.",
                d: "Most stocks have several loops acting on them, and whichever is stronger sets the behavior. When the balance between them changes, a long trend can reverse with no push from outside."
              },
              {
                t: "Feedback acts on the future, with delay.",
                d: "Information about a stock arrives too late to change the flow that has already happened. And a balancing loop's goal has to allow for any steady drain: a leaky room settles below its thermostat's setting."
              }
            ]
          },
          {
            type: "diagram",
            eyebrow: "Figure",
            title: "Three loops in Meadows's examples",
            intro: "Causal loop diagrams. An arrow marked + means the two move in the same direction; − means they move in opposite directions. B marks a balancing loop, R a reinforcing one.",
            alt: "Three causal loop diagrams. Coffee: coffee temperature raises the gap to room temperature, the gap raises cooling, and cooling lowers coffee temperature, a balancing loop; room temperature lowers the gap. Bank account: money in the bank raises interest earned, which raises money in the bank, a reinforcing loop; the interest rate raises interest earned. Population: population raises births, which raise population, a reinforcing loop; population raises deaths, which lower population, a balancing loop; fertility raises births and mortality raises deaths.",
            w: 900,
            h: 280,
            nw: 300,
            nh: 860,
            nodes: [
              { id: "temp", kind: "var", label: "Coffee\ntemperature", x: 150, y: 45, nx: 150, ny: 40 },
              { id: "gap", kind: "var", label: "Gap to room\ntemperature", x: 252, y: 175, nx: 245, ny: 165 },
              { id: "cool", kind: "var", label: "Cooling", x: 48, y: 175, nx: 52, ny: 165 },
              { id: "room", kind: "var", label: "Room\ntemperature", x: 252, y: 250, nx: 245, ny: 245 },
              { id: "money", kind: "var", label: "Money in\nthe bank", x: 450, y: 45, nx: 150, ny: 330 },
              { id: "int", kind: "var", label: "Interest\nearned", x: 450, y: 200, nx: 150, ny: 480 },
              { id: "rate", kind: "var", label: "Interest\nrate", x: 560, y: 250, nx: 252, ny: 540 },
              { id: "pop", kind: "var", label: "Population", x: 760, y: 45, nx: 150, ny: 620 },
              { id: "births", kind: "var", label: "Births", x: 670, y: 175, nx: 58, ny: 735 },
              { id: "deaths", kind: "var", label: "Deaths", x: 850, y: 175, nx: 242, ny: 735 },
              { id: "fert", kind: "var", label: "Fertility", x: 670, y: 250, nx: 58, ny: 815 },
              { id: "mort", kind: "var", label: "Mortality", x: 850, y: 250, nx: 242, ny: 815 }
            ],
            links: [
              { from: "temp", to: "gap", sign: "+", bend: -30 },
              { from: "gap", to: "cool", sign: "+", bend: -30 },
              { from: "cool", to: "temp", sign: "-", bend: -30 },
              { from: "room", to: "gap", sign: "-" },
              { from: "money", to: "int", sign: "+", bend: -55 },
              { from: "int", to: "money", sign: "+", bend: -55 },
              { from: "rate", to: "int", sign: "+" },
              { from: "pop", to: "births", sign: "+", bend: 40 },
              { from: "births", to: "pop", sign: "+", bend: 40 },
              { from: "pop", to: "deaths", sign: "+", bend: -40 },
              { from: "deaths", to: "pop", sign: "-", bend: -40 },
              { from: "fert", to: "births", sign: "+" },
              { from: "mort", to: "deaths", sign: "+" }
            ],
            marks: [
              { x: 150, y: 128, t: "B" },
              { x: 450, y: 122, t: "R" },
              { x: 712, y: 105, t: "R" },
              { x: 808, y: 105, t: "B" }
            ],
            nmarks: [
              { x: 150, y: 118, t: "B" },
              { x: 150, y: 405, t: "R" },
              { x: 102, y: 680, t: "R" },
              { x: 198, y: 680, t: "B" }
            ],
            full: true
          },
          {
            type: "behavior",
            eyebrow: "Behavior over time",
            title: "What each structure does",
            intro: "The shape of the curve tells you which loop is in charge.",
            cols: 2,
            charts: [
              {
                t: "Balancing: goal-seeking",
                d: "A hot coffee and an iced drink in a 20° room. Each closes most of its gap early, then creeps toward room temperature. Same loop, opposite directions.",
                x: [0, 60],
                y: [0, 100],
                xLabel: "Minutes",
                yLabel: "Degrees",
                yTicks: [0, 20, 50, 80],
                unit: "°",
                hover: true,
                refs: [{ y: 20, label: "Room" }],
                series: [
                  { name: "Hot coffee", points: curve((t) => 20 + 60 * Math.exp(-0.05 * t), 0, 60, 60) },
                  { name: "Iced drink", tone: "cash", points: curve((t) => 20 - 15 * Math.exp(-0.05 * t), 0, 60, 60) }
                ]
              },
              {
                t: "Reinforcing: exponential growth",
                d: "$100 left to compound. At 2% it barely doubles in 30 years; at 10% it doubles about every seven years and ends near $1,745.",
                x: [0, 30],
                y: [0, 1800],
                xLabel: "Years",
                yLabel: "Dollars",
                yTicks: [0, 500, 1000, 1500],
                unit: "",
                hover: true,
                series: [
                  { name: "10% a year", points: curve((t) => 100 * Math.pow(1.1, t), 0, 30, 30) },
                  { name: "5% a year", tone: "cash", points: curve((t) => 100 * Math.pow(1.05, t), 0, 30, 30) },
                  { name: "2% a year", tone: "ink", dash: true, points: curve((t) => 100 * Math.pow(1.02, t), 0, 30, 30) }
                ]
              },
              {
                t: "Two loops: shifting dominance",
                d: "Births at 3% a year, deaths at 2%. Held steady, the population grows 2.7 times in a century. Let the birth rate drift down to 1.5% and growth slows, peaks in year 67 and turns into decline, with no outside push.",
                x: [0, 100],
                y: [0, 300],
                xLabel: "Years",
                yLabel: "Population, year 0 = 100",
                yTicks: [0, 100, 200, 300],
                hover: true,
                series: [
                  { name: "Birth rate steady", tone: "ink", dash: true, points: curve((t) => 100 * Math.exp(0.01 * t), 0, 100, 50) },
                  { name: "Birth rate falling", points: curve((t) => 100 * Math.exp(0.01 * t - 0.000075 * t * t), 0, 100, 50) }
                ]
              },
              {
                t: "A leaky room settles short of its goal",
                d: "A thermostat set to 18° in a room losing heat to 10° outside. The furnace answers the gap, the leak answers the outside, and the room settles at 16°, where they balance.",
                x: [0, 12],
                y: [0, 20],
                xLabel: "Hours",
                yLabel: "Degrees",
                yTicks: [0, 10, 16, 20],
                unit: "°",
                hover: true,
                refs: [{ y: 18, label: "Setting" }],
                series: [{ name: "Room temperature", points: curve((t) => 16 - 6 * Math.exp(-0.4 * t), 0, 12, 48) }]
              }
            ],
            caption: "Drawn from simple formulas, not the book's figures."
          },
          {
            type: "table",
            eyebrow: "Compounding",
            title: "How long it takes to double",
            intro: "The rule of 70 against the exact answer. The rule is close enough for anything below about 10%.",
            columns: ["Steady growth", "Rule of 70", "Exact", "In practice"],
            widths: ["9rem", "8rem", "7rem", null],
            rows: [
              ["1% a year", "70 years", "69.7 years", "A population growing at 1% doubles within a lifetime"],
              ["2% a year", "35 years", "35.0 years", "Prices at 2% inflation double over a career"],
              ["3% a year", "23 years", "23.4 years", "A typical rate for a growing economy"],
              ["5% a year", "14 years", "14.2 years", "Three doublings, eight times as much, in about 43 years"],
              ["7% a year", "10 years", "10.2 years", "Ten times as much in about 34 years"],
              ["10% a year", "7 years", "7.3 years", "A thousand times as much in about 72 years"],
              ["15% a year", "4.7 years", "5.0 years", "The rule starts to undershoot"]
            ]
          },
          {
            type: "table",
            eyebrow: "Side by side",
            title: "Balancing and reinforcing loops",
            columns: ["", "Balancing loop", "Reinforcing loop"],
            widths: ["9rem", null, null],
            rows: [
              ["What it does", "Opposes change, closing the gap between a stock and a goal", "Amplifies change in whichever direction it is going"],
              ["Typical behavior", "Goal-seeking; with delays, oscillation around the goal", "Exponential growth or collapse"],
              ["How to spot one", "An odd number of − links around the loop", "No − links, or an even number"],
              ["Examples", "Thermostats, restocking shelves, a body regulating its temperature, a market adjusting price to supply", "Compound interest, population growth, word of mouth, erosion, a price war"],
              ["What goes wrong", "A goal set too low, or one that drifts; delays that make the correction overshoot", "Runaway growth into a limit, or a downward spiral that feeds on itself"]
            ]
          }
        ],
        end: {
          related: [
            { title: "Stocks and flows", where: "Chapter 1", page: "stocks-flows" },
            { title: "A brief visit to the systems zoo", where: "Chapter 2" },
            { title: "Delays and oscillation", where: "Chapter 2", page: "delays" },
            { title: "Why systems surprise us", where: "Chapter 4", page: "surprises" }
          ],
          cta: { page: "delays", kicker: "Next", text: "Add delays and watch a stock swing" }
        }
      },
      // Meadows's car-dealer model, rebuilt with our own numbers: the three delays
      // (perception 5 days, response 3, delivery 5) and the findings that a faster
      // response makes the swings worse and a slower one damps them follow my reading
      // of Chapter 2 and are unchecked against the book.
      // A reference page. Delays in balancing loops, the three delays, the car dealer (ten
      // days of sales on the lot, a 10% rise in demand), and the counterintuitive results
      // (reacting faster worsens the swings, slowing the response damps them, noticing sooner
      // barely helps) follow Meadows's chapter 2 as I remember it, unchecked against her
      // wording and numbers. The charts are our re-run (see `dealer` above), not her figures.
      // The "delays elsewhere" table is ours.
      "delays": {
        navLabel: "Delays",
        title: "Delays and oscillation",
        eyebrow: "Part I · Chapter 02",
        layout: "dense",
        dek:
          "Every feedback loop takes time to act: time to notice a change, time to decide, time for the response to arrive. Meadows shows how those delays turn a balancing loop into a system that swings.",
        blocks: [
          {
            type: "brief",
            eyebrow: "In brief",
            title: "The argument in six points",
            points: [
              {
                t: "Every loop has delays.",
                d: "Time to notice a change and believe it (perception), time to decide and act (response), and time for the action to take effect (delivery). Meanwhile the stock keeps moving."
              },
              {
                t: "A balancing loop with delays oscillates.",
                d: "It keeps correcting a gap that orders already on their way will close. The correction overshoots, then has to be corrected the other way."
              },
              {
                t: "One small change can set off months of swings.",
                d: "Meadows's car dealer faces the simplest change a business could meet, a 10% rise in demand that then holds steady, and the lot swings above and below its target for months."
              },
              {
                t: "Reacting faster makes it worse.",
                d: "The instinct is to respond more aggressively. Shortening the response delay amplifies the swings; lengthening it damps them. Noticing the change sooner barely helps."
              },
              {
                t: "Not every delay can be changed.",
                d: "Delivery times are often set by physics or by someone else. The response delay is usually the manager's own choice, and the one that feels wrong to lengthen."
              },
              {
                t: "Delays are leverage points.",
                d: "Changing a delay can change behavior dramatically, for better or worse. A policy has to fit the system's own rhythm, its delays, or it will fight them."
              }
            ]
          },
          {
            type: "diagram",
            eyebrow: "Figure",
            title: "The car dealer's system",
            intro: "One stock, the cars on the lot, regulated by a balancing loop with three delays in it, each marked ‖.",
            alt: "A stock-and-flow diagram. Deliveries flow into the stock of cars on the lot, and sales flow out to customers. Customer demand sets sales. Sales are noticed, after a perception delay, as perceived sales, which set the desired inventory of ten days' sales. The gap between desired inventory and cars on the lot sets orders to the factory, after a response delay. Orders become deliveries after a delivery delay.",
            w: 860,
            h: 310,
            nw: 320,
            nh: 560,
            nodes: [
              { id: "src", kind: "cloud", x: 40, y: 60, nx: 40, ny: 40 },
              { id: "lot", kind: "stock", label: "Cars on\nthe lot", x: 430, y: 60, w: 120, nx: 160, ny: 150 },
              { id: "sink", kind: "cloud", x: 820, y: 60, nx: 280, ny: 40 },
              { id: "dv", kind: "point", x: 210, y: 60, nx: 82, ny: 92 },
              { id: "sv", kind: "point", x: 645, y: 60, nx: 238, ny: 92 },
              { id: "demand", kind: "var", label: "Customer\ndemand", x: 760, y: 160, nx: 270, ny: 200 },
              { id: "seen", kind: "var", label: "Perceived\nsales", x: 600, y: 270, nx: 250, ny: 320 },
              { id: "want", kind: "var", label: "Desired inventory\n(10 days of sales)", x: 400, y: 270, nx: 160, ny: 420 },
              { id: "orders", kind: "var", label: "Orders to\nthe factory", x: 175, y: 200, nx: 60, ny: 330 }
            ],
            links: [
              { from: "src", to: "lot", flow: true, label: "Deliveries" },
              { from: "lot", to: "sink", flow: true, label: "Sales" },
              { from: "demand", to: "sv", sign: "+" },
              { from: "sv", to: "seen", sign: "+", delay: true, bend: -30 },
              { from: "seen", to: "want", sign: "+" },
              { from: "want", to: "orders", sign: "+", delay: true },
              { from: "lot", to: "orders", sign: "-", bend: 20 },
              { from: "orders", to: "dv", sign: "+", delay: true }
            ],
            marks: [{ x: 300, y: 170, t: "B" }],
            nmarks: [{ x: 120, y: 245, t: "B" }],
            full: true,
            notes: [
              { t: "Perception delay:", d: "the dealer averages sales over several days before believing demand has changed." },
              { t: "Response delay:", d: "each day's order makes up only part of the gap between the cars on the lot and the target." },
              { t: "Delivery delay:", d: "cars ordered today arrive days later, while the dealer keeps ordering against the same gap." }
            ]
          },
          {
            type: "behavior",
            eyebrow: "Behavior over time",
            title: "One rise in demand, four ways to respond",
            intro: "Cars on the lot over 100 days. Demand rises from 20 cars a day to 22 on day 25, so the target rises from 200 cars to 220 (the dashed line). The grey line is the base case.",
            cols: 2,
            charts: [
              {
                t: "Base case: delays of 5, 3 and 5 days",
                d: "The lot dips as sales rise, then swings above and below the new target, between about 136 and 289 cars, and the swings are still growing at day 100.",
                x: [0, 100],
                y: [0, 450],
                xLabel: "Days",
                yLabel: "Cars on the lot",
                yTicks: [0, 200, 400],
                hover: true,
                refs: [{ y: 220, label: "New target" }],
                series: [{ name: "Cars on the lot", points: dealer() }]
              },
              {
                t: "React faster: response delay 2 days",
                d: "Each order chases half the gap instead of a third. The swings grow, to between about 121 and 423 cars.",
                x: [0, 100],
                y: [0, 450],
                xLabel: "Days",
                yLabel: "Cars on the lot",
                yTicks: [0, 200, 400],
                hover: true,
                refs: [{ y: 220 }],
                series: [
                  { name: "Respond in 2 days", points: dealer({ resp: 2 }) },
                  { name: "Base case", tone: "ink", points: dealer() }
                ]
              },
              {
                t: "React more slowly: response delay 6 days",
                d: "Each order makes up a sixth of the gap. The lot dips once, overshoots a little and settles near 220.",
                x: [0, 100],
                y: [0, 450],
                xLabel: "Days",
                yLabel: "Cars on the lot",
                yTicks: [0, 200, 400],
                hover: true,
                refs: [{ y: 220 }],
                series: [
                  { name: "Respond in 6 days", points: dealer({ resp: 6 }) },
                  { name: "Base case", tone: "ink", points: dealer() }
                ]
              },
              {
                t: "Notice sooner: perception delay 2 days",
                d: "Seeing the change sooner barely helps; the swings are slightly larger. The trouble is overreacting, not noticing.",
                x: [0, 100],
                y: [0, 450],
                xLabel: "Days",
                yLabel: "Cars on the lot",
                yTicks: [0, 200, 400],
                hover: true,
                refs: [{ y: 220 }],
                series: [
                  { name: "Perceive in 2 days", points: dealer({ perc: 2 }) },
                  { name: "Base case", tone: "ink", points: dealer() }
                ]
              }
            ],
            caption: "Our re-run of a model built from Meadows's description, not her figures."
          },
          {
            type: "table",
            eyebrow: "The three delays",
            title: "Which delay to change",
            columns: ["Delay", "In the dealer's case", "Shorten it", "Lengthen it", "Who controls it"],
            widths: ["8rem", null, null, null, "9rem"],
            rows: [
              ["Perception", "Averaging sales over 5 days before believing a change", "Barely helps; swings slightly larger", "Slower to see real changes", "The dealer"],
              ["Response", "Ordering a third of the gap each day", "Swings grow sharply", "Swings damp; the lot settles", "The dealer"],
              ["Delivery", "5 days from order to the lot", "Swings shrink to almost nothing (196 to 220 cars at 2 days)", "Swings grow", "The factory and the trucks, usually not the dealer"]
            ],
            foot: "Effects from our re-run of the model above."
          },
          {
            type: "table",
            eyebrow: "Elsewhere",
            title: "The same structure in other systems",
            intro: "Our examples of balancing loops with long delays, and the swings they produce.",
            columns: ["System", "The delays", "What swings"],
            widths: ["11rem", null, null],
            rows: [
              ["Electricity supply", "Years to plan and build power plants after demand rises", "Shortage, then overcapacity, then shortage again"],
              ["Commodity farming", "A season or more between seeing high prices and harvesting more", "Prices and plantings, out of step year after year"],
              ["Commercial property", "Years from a decision to build to an opened building", "Booms that end in empty offices"],
              ["Hiring", "Months to notice a shortage, recruit and train", "Hiring sprees followed by layoffs"],
              ["A shower", "Seconds between turning the tap and feeling the change", "Scalding, then freezing, until you slow down"]
            ]
          }
        ],
        end: {
          related: [
            { title: "Stocks and flows", where: "Chapter 1", page: "stocks-flows" },
            { title: "Feedback loops", where: "Chapter 1", page: "feedback" },
            { title: "Why systems surprise us", where: "Chapter 4", page: "surprises" },
            { title: "Leverage points", where: "Chapter 6", page: "leverage-points" }
          ],
          cta: { page: "limits", kicker: "Next", text: "Grow an industry until its resource pushes back" }
        }
      },
      // The oil and fishing economies are from Chapter 2's systems zoo, rebuilt with our own
      // numbers. The terms stock-limited and flow-limited, the fishery's three outcomes (settle,
      // oscillate, collapse as boats get better at finding scarce fish) and the point that limits
      // are either self-imposed or imposed by the system are from my reading of the book,
      // unchecked against its wording. The Grand Banks note and the sorter items are ours.
      // A reference page. Growth meeting a limit, two-stock systems (capital and resource),
      // stock-limited and flow-limited resources, the oil field (bigger discoveries buy a
      // later, higher peak, not a longer plateau) and the fishery (equilibrium, oscillation
      // or collapse, depending on how well boats find scarce fish) follow Meadows's chapter
      // 2 as I remember it, unchecked against her wording and numbers. The charts are our
      // re-runs (see `oil` and `fishery` above). The Grand Banks cod moratorium (1992) is
      // from the public record; unchecked whether the book mentions it.
      "limits": {
        navLabel: "Limits",
        title: "Growth meets a limit",
        eyebrow: "Part I · Chapter 02",
        layout: "dense",
        dek:
          "Anything physical that grows will eventually run into a constraint. The last two systems in Meadows's zoo show the two kinds of limit a resource sets: one that runs out, and one that regrows.",
        blocks: [
          {
            type: "brief",
            eyebrow: "In brief",
            title: "The argument in six points",
            points: [
              {
                t: "Every growing physical system meets a limit.",
                d: "A reinforcing loop can't run forever in a finite world. Sooner or later a balancing loop takes over; the question is what form it takes, and when."
              },
              {
                t: "Two stocks: the capital and the resource.",
                d: "Profits buy more rigs or boats, a reinforcing loop. As the resource thins, each rig or boat gets less, a balancing loop. Which one dominates changes over time."
              },
              {
                t: "Nonrenewable resources are stock-limited.",
                d: "All of an oil field or an ore body is there to use, but once it's gone it's gone. The faster it's used, the sooner the end."
              },
              {
                t: "A bigger discovery buys a later, higher peak, not a plateau.",
                d: "Because the capital grows exponentially, each doubling of the resource adds only about one doubling time to the boom, and makes the fall steeper."
              },
              {
                t: "Renewable resources are flow-limited.",
                d: "A fishery or a forest can be used forever, but only as fast as it regenerates. Harvest faster and the stock shrinks, and a small enough stock barely regrows."
              },
              {
                t: "Efficiency can hasten collapse.",
                d: "Gear that keeps catches up as fish get scarce hides the signal that should stop the fleet growing. The better the boats, the worse the outcome for the people who own them."
              }
            ]
          },
          {
            type: "diagram",
            eyebrow: "Figure",
            title: "The structure behind both systems",
            intro: "Capital that harvests a resource. Profit from the harvest builds more capital; the harvest draws the resource down, which makes each unit of capital less productive.",
            alt: "A stock-and-flow diagram with two stocks. Investment flows into capital, rigs or boats, and depreciation flows out. Harvest flows out of the resource stock. Capital raises the harvest, the harvest raises profit, and profit raises investment: a reinforcing loop. The harvest draws down the resource, and a smaller resource lowers the yield per unit of capital, which lowers the harvest: a balancing loop.",
            w: 860,
            h: 300,
            nw: 320,
            nh: 560,
            nodes: [
              { id: "c1", kind: "cloud", x: 40, y: 60, nx: 32, ny: 140 },
              { id: "cap", kind: "stock", label: "Capital\n(rigs or boats)", x: 270, y: 60, w: 130, nx: 205, ny: 140 },
              { id: "c2", kind: "cloud", x: 500, y: 60, nx: 205, ny: 25 },
              { id: "res", kind: "stock", label: "Resource\n(oil or fish)", x: 270, y: 255, w: 130, nx: 110, ny: 490 },
              { id: "c3", kind: "cloud", x: 820, y: 255, nx: 290, ny: 490 },
              { id: "iv", kind: "point", x: 155, y: 60, nx: 92, ny: 140 },
              { id: "hv", kind: "point", x: 570, y: 255, nx: 222, ny: 490 },
              { id: "profit", kind: "var", label: "Profit", x: 95, y: 175, nx: 55, ny: 290 },
              { id: "yield", kind: "var", label: "Yield per rig\nor boat", x: 420, y: 185, nx: 80, ny: 395 },
              { id: "harvest", kind: "var", label: "Harvest", x: 570, y: 150, nx: 235, ny: 300 }
            ],
            links: [
              { from: "c1", to: "cap", flow: true, label: "Investment" },
              { from: "cap", to: "c2", flow: true, label: "Depreciation" },
              { from: "res", to: "c3", flow: true, label: "Extraction or catch", labelSide: "below" },
              { from: "cap", to: "harvest", sign: "+" },
              { from: "harvest", to: "hv", sign: "+" },
              { from: "res", to: "yield", sign: "+" },
              { from: "yield", to: "harvest", sign: "+" },
              { from: "harvest", to: "profit", sign: "+", bend: 45 },
              { from: "profit", to: "iv", sign: "+" }
            ],
            marks: [
              { x: 300, y: 150, t: "R" },
              { x: 480, y: 222, t: "B" }
            ],
            nmarks: [
              { x: 140, y: 220, t: "R" },
              { x: 165, y: 415, t: "B" }
            ],
            full: true
          },
          {
            type: "behavior",
            eyebrow: "Behavior over time",
            title: "Four runs of the same structure",
            intro: "Our re-runs of an oil field and a fishery built from Meadows's descriptions.",
            cols: 2,
            charts: [
              {
                t: "Oil: twice and four times the field",
                d: "Output peaks in year 42 for the base field. Twice the oil moves the peak to year 52; four times, to year 61. Each peak is higher and each fall steeper.",
                x: [0, 100],
                y: [0, 350],
                xLabel: "Years",
                yLabel: "Output a year",
                yTicks: [0, 100, 200, 300],
                hover: true,
                series: [
                  { name: "Four times the oil", points: oil(4000) },
                  { name: "Twice the oil", tone: "cash", points: oil(2000) },
                  { name: "The base field", tone: "ink", points: oil(1000) }
                ]
              },
              {
                t: "Fish: catch falls as the fish thin",
                d: "Each boat catches less as soon as fish get scarcer, so falling profits stop the fleet growing. Fish settle at about half the sea's capacity, near the largest sustainable catch.",
                x: [0, 150],
                y: [0, 100],
                xLabel: "Years",
                yLabel: "Fish, % of capacity",
                yTicks: [0, 50, 100],
                unit: "%",
                hover: true,
                series: [{ name: "Fish", points: fishery(1) }]
              },
              {
                t: "Fish: better gear, boom and bust",
                d: "Boats keep catching well as fish decline, so the fleet overshoots. Fish fall to about a fifth of capacity, recover, and keep cycling.",
                x: [0, 150],
                y: [0, 100],
                xLabel: "Years",
                yLabel: "Fish, % of capacity",
                yTicks: [0, 50, 100],
                unit: "%",
                hover: true,
                series: [{ name: "Fish", points: fishery(0.6) }]
              },
              {
                t: "Fish: gear good enough to find the last fish",
                d: "Catches stay high until the fish are nearly gone. There's no warning: fish and fleet collapse together within about 40 years.",
                x: [0, 150],
                y: [0, 100],
                xLabel: "Years",
                yLabel: "Fish, % of capacity",
                yTicks: [0, 50, 100],
                unit: "%",
                hover: true,
                series: [{ name: "Fish", points: fishery(0.5) }]
              }
            ],
            caption: "Our re-runs of models built from Meadows's descriptions, not her figures."
          },
          {
            type: "table",
            eyebrow: "Two kinds of limit",
            title: "Stock-limited and flow-limited",
            columns: ["", "Stock-limited (nonrenewable)", "Flow-limited (renewable)"],
            widths: ["9rem", null, null],
            rows: [
              ["The limit", "The amount in the ground: once used, gone", "The rate of regeneration: usable forever at that rate"],
              ["Examples", "Oil, coal, metal ores, water in an aquifer that no longer refills", "Fish, forests, grassland, soil fertility, a river's capacity to clean waste"],
              ["Faster use means", "An earlier end", "A shrinking stock, and less regrowth"],
              ["Typical path under growth", "Rise, peak, decline", "Equilibrium, oscillation or collapse, depending on the feedback"],
              ["The warning sign", "Rising cost per unit extracted", "Falling catch or yield per unit of effort"],
              ["In business", "Selling a product to first-time buyers who each buy once", "Replacement demand, renewing as products wear out"]
            ]
          },
          {
            type: "table",
            eyebrow: "In the world",
            title: "Limits that arrived late, and hard",
            intro: "Meadows's point is that a limit the system imposes tends to arrive late and hard, while a limit people set for themselves can arrive early and gently.",
            columns: ["Case", "What happened"],
            widths: ["13rem", null],
            rows: [
              ["Grand Banks cod, Newfoundland", "One of the world's richest fisheries collapsed in the early 1990s and was closed in 1992. Decades later the cod had not fully recovered."],
              ["A fossil aquifer", "Wells that draw water laid down thousands of years ago lower the water table with every season; when it falls below the pumps, farming stops."],
              ["First-time buyer markets", "Sales rise, peak and fall as households buy their first of something, just as an oil field's output does."]
            ],
            foot: "The cod collapse is from the public record; the other rows are general examples."
          }
        ],
        end: {
          related: [
            { title: "Delays and oscillation", where: "Chapter 2", page: "delays" },
            { title: "System traps and opportunities", where: "Chapter 5", page: "traps" },
            { title: "Feedback loops", where: "Chapter 1", page: "feedback" },
            { title: "Why systems surprise us", where: "Chapter 4", page: "surprises" }
          ],
          cta: { page: "resilience", kicker: "Next", text: "What keeps a system going, and how efficiency wears it away" }
        }
      },
      // The three properties follow Chapter 3. That Meadows uses just-in-time supply as an
      // example of resilience traded for efficiency, that hierarchies arise from the bottom up
      // to serve the lower levels, and her use of "suboptimization" are from my reading of the
      // chapter, unchecked against its wording. The factory and the sorter items are invented.
      // A reference page. Resilience (many loops on different mechanisms and time scales,
      // meta-resilience, invisible until tested, traded for efficiency), self-organization
      // (more complexity from simple rules, suppressed for control) and hierarchy (built
      // from the bottom up, serving the levels below; suboptimization and overcentralization)
      // follow Meadows's chapter 3 as I remember it, unchecked against her wording. Simon's
      // watchmakers are from Herbert Simon's "The Architecture of Complexity" (1962), which I
      // remember Meadows retelling; the odds are our arithmetic (a 1% chance of interruption
      // per part). The "how it gets lost" examples are ours.
      "resilience": {
        navLabel: "Resilience",
        title: "Why systems work so well",
        eyebrow: "Part II · Chapter 03",
        layout: "dense",
        dek:
          "Systems that last share three properties: resilience, self-organization and hierarchy. Each is easy to wear away without noticing, often in the name of efficiency.",
        blocks: [
          {
            type: "brief",
            eyebrow: "In brief",
            title: "The argument in six points",
            points: [
              {
                t: "Three properties make systems last.",
                d: "Resilience lets a system survive shocks, self-organization lets it learn and change its own structure, and hierarchy lets it grow complex without being swamped by information."
              },
              {
                t: "Resilience comes from many loops.",
                d: "Several balancing loops, working by different mechanisms and on different time scales, so one can restore the system when another fails. Higher still are loops that rebuild the others and learn."
              },
              {
                t: "Resilience is not stability.",
                d: "A system can be steady for years and brittle all along. Because resilience is invisible until it's tested, it gets traded away for things that show: output, efficiency, this year's cost."
              },
              {
                t: "Self-organization adds structure.",
                d: "Systems learn, diversify and evolve, often from a few simple rules. That produces variety and surprise, so organizations that prize control tend to suppress it."
              },
              {
                t: "Hierarchies grow from the bottom up.",
                d: "Stable subsystems combine into larger ones. Each level handles most of its own business, so the levels above need far less information. The upper levels exist to serve the lower ones."
              },
              {
                t: "Hierarchies fail in two ways.",
                d: "Suboptimization, when a part's goals win out over the whole's, and overcentralization, when the top tries to control too much and the parts lose the freedom that made them work."
              }
            ]
          },
          {
            type: "table",
            eyebrow: "The three properties",
            title: "What makes each, and what wears it away",
            columns: ["Property", "What it is", "Where it comes from", "How it gets lost"],
            widths: ["9rem", null, null, null],
            rows: [
              ["Resilience", "The ability to survive and recover in a changing environment", "Redundant balancing loops working in different ways and on different time scales; slack and buffers; diversity", "Cutting inventories, staff and suppliers to the minimum; single sources; monocultures; optimizing for one set of conditions"],
              ["Self-organization", "The ability to make its own structure more complex: to learn, diversify and evolve", "Variety, experimentation and freedom to try things, governed by a few simple rules", "Rigid procedures, narrow targets and central control that make a system easier to manage today and less able to adapt"],
              ["Hierarchy", "Subsystems nested inside larger systems, each running most of its own affairs", "Stable intermediate units that combine, with upper levels coordinating rather than commanding", "Suboptimization by the parts, or overcentralization by the top"]
            ]
          },
          {
            type: "figure",
            eyebrow: "Figure",
            title: "Hierarchy: systems inside systems",
            intro: "A company of divisions made of teams. Most of what happens stays inside a box, so each level deals with a summary of the levels below.",
            alt: "Nested boxes. A company box contains three division boxes; each division contains three team boxes. Within each box, most links stay inside.",
            svg: `<svg viewBox="0 0 520 250" xmlns="http://www.w3.org/2000/svg">
              <rect class="sv-box-pen" x="4" y="4" width="512" height="242" rx="8"/>
              <text class="sv-k" x="18" y="24">COMPANY</text>
              ${[0, 1, 2].map((d) => `<rect class="sv-box" x="${20 + d * 165}" y="36" width="150" height="196" rx="6"/>
                <text class="sv-k" x="${32 + d * 165}" y="56">DIVISION</text>
                ${[0, 1, 2].map((t) => `<rect class="sv-box-ink" x="${32 + d * 165}" y="${68 + t * 52}" width="126" height="40" rx="4"/>
                  <text class="sv-t sv-tp" x="${95 + d * 165}" y="${92 + t * 52}" text-anchor="middle">Team</text>`).join("")}`).join("")}
            </svg>`,
            svgNarrow: `<svg viewBox="0 0 300 470" xmlns="http://www.w3.org/2000/svg">
              <rect class="sv-box-pen" x="4" y="4" width="292" height="462" rx="8"/>
              <text class="sv-k" x="18" y="24">COMPANY</text>
              ${[0, 1, 2].map((d) => `<rect class="sv-box" x="16" y="${36 + d * 142}" width="268" height="130" rx="6"/>
                <text class="sv-k" x="28" y="${56 + d * 142}">DIVISION</text>
                ${[0, 1, 2].map((t) => `<rect class="sv-box-ink" x="${28 + t * 84}" y="${68 + d * 142}" width="76" height="86" rx="4"/>
                  <text class="sv-t sv-tp" x="${66 + t * 84}" y="${115 + d * 142}" text-anchor="middle">Team</text>`).join("")}`).join("")}
            </svg>`,
            notes: [
              { t: "Less information at the top.", d: "Head office doesn't need to know what every team is doing, only how each division is doing. That is what makes large systems manageable." },
              { t: "Built from the bottom up.", d: "Teams that work become divisions; divisions that work become companies. The levels above exist to help the levels below do their jobs." },
              { t: "Suboptimization:", d: "a team hits its own target by pushing work onto another, and the company is no better off. Overcentralization: head office makes the teams' decisions for them, and they stop adapting." }
            ]
          },
          {
            type: "bar-chart",
            eyebrow: "The arithmetic",
            title: "Why stable building blocks matter: Simon's watchmakers",
            intro:
              "Two watchmakers build watches of 1,000 parts and are often interrupted, and an interrupted assembly falls apart. One builds each watch in one go; the other builds stable subassemblies of ten parts. Say each part added carries a 1% chance of interruption. The chance of finishing an assembly in one sitting:",
            unit: "%",
            decimals: 1,
            max: 100,
            ticks: [0, 25, 50, 75, 100],
            labelHead: "Parts in one assembly",
            valueHead: "Chance of finishing it uninterrupted",
            rows: [
              { label: "10 parts", value: 90.4, show: true },
              { label: "50 parts", value: 60.5 },
              { label: "100 parts", value: 36.6, show: true },
              { label: "200 parts", value: 13.4 },
              { label: "500 parts", value: 0.66, text: "0.66%" },
              { label: "1,000 parts", value: 0.0043, show: true, text: "0.004%" }
            ],
            source:
              "Herbert Simon's parable from “The Architecture of Complexity” (1962), which Meadows retells. The odds are 0.99 to the power of the number of parts, our arithmetic. The watchmaker who builds in tens nearly always finishes; the one who builds in a thousand almost never does."
          }
        ],
        end: {
          related: [
            { title: "Feedback loops", where: "Chapter 1", page: "feedback" },
            { title: "Growth meets a limit", where: "Chapter 2", page: "limits" },
            { title: "Why systems surprise us", where: "Chapter 4", page: "surprises" },
            { title: "Leverage points", where: "Chapter 6", page: "leverage-points" }
          ],
          cta: { page: "surprises", kicker: "Next", text: "Why systems keep surprising the people who run them" }
        }
      },
      // The six headings follow Chapter 4 (events, nonlinearity, boundaries, layers of limits,
      // delays, bounded rationality); the descriptions and advice are ours, paraphrasing my
      // reading of the chapter, unchecked against its wording. The help-desk queue is our own
      // illustration of nonlinearity, not from the book; the sorter items are invented.
      // A reference page. Models as incomplete, the six sources of surprise (beguiling
      // events, nonlinearity, nonexistent boundaries, layers of limits, ubiquitous delays,
      // bounded rationality), events, behavior and structure, the spruce budworm, Liebig's law
      // of the minimum and Herbert Simon's bounded rationality follow Meadows's chapter 4 as I
      // remember it, unchecked against her wording. The waiting-time chart is standard
      // queueing arithmetic (a single server with random arrivals: waiting time in service
      // times = utilization / (1 − utilization)), not from the book. The barrel is the usual
      // picture of Liebig's law, drawn by us with invented staves.
      "surprises": {
        navLabel: "Surprises",
        title: "Why systems surprise us",
        eyebrow: "Part II · Chapter 04",
        layout: "dense",
        dek:
          "Systems keep doing things their managers didn't expect. Meadows argues the surprise comes less from the systems than from the habits of mind we bring to them, and names six.",
        blocks: [
          {
            type: "brief",
            eyebrow: "In brief",
            title: "The argument in six points",
            points: [
              { t: "Every model is incomplete, in predictable places.", d: "Everything we know about the world is a simplified picture of it. The gaps aren't random: they fall in the same six places, and systems surprise us there again and again." },
              { t: "Events mislead.", d: "News arrives as single happenings. Behavior over time shows the pattern, and only structure, the stocks, flows, loops and delays, explains it." },
              { t: "Twice the push rarely gives twice the result.", d: "Systems are full of nonlinearities: thresholds, saturation, and loops whose dominance shifts as conditions change." },
              { t: "Boundaries are drawn by us.", d: "The clouds at the edge of a diagram are a convenience. Real sources run out and real sinks fill up, and then the boundary we drew starts to matter." },
              { t: "One limit at a time, and it moves.", d: "A growing system is held back by whatever is scarcest. Relieve it and growth resumes until the next limit binds." },
              { t: "Decisions are rational where they're made.", d: "People act sensibly on the partial, local, short-term information they have. Sensible choices in each place can add up to results nobody wants." }
            ]
          },
          {
            type: "table",
            eyebrow: "The six sources",
            title: "Where surprises come from, and the habit that helps",
            columns: ["Source", "What goes wrong", "Example", "The habit that helps"],
            widths: ["9.5rem", null, null, null],
            rows: [
              ["Beguiling events", "We explain the latest happening instead of the pattern it belongs to.", "A bad quarter blamed on the weather, when sales have swung on the same cycle for years.", "Graph the history, then ask what structure produces that shape."],
              ["Nonlinearity", "We expect responses to be proportional to the push.", "Spraying against the spruce budworm in eastern Canada kept the forests in a state where outbreaks could recur. Meadows's example.", "Look for thresholds and saturation; test how the response changes near them."],
              ["Nonexistent boundaries", "We treat the edge of our model as the edge of the world.", "Waste sent \"away\" from a plant comes back in the river downstream.", "Draw the boundary around the question, and redraw it when the question changes."],
              ["Layers of limits", "We push on factors that aren't limiting, and miss the one that is.", "Liebig's law: a crop grows only as far as its scarcest nutrient allows.", "Find what limits growth now, and expect growth to move the limit."],
              ["Ubiquitous delays", "We underestimate how long it takes to notice, decide and act.", "The car dealer's swings, or a building boom that finishes after demand has gone.", "Find the delays and allow for them; where they're long, foresight beats speed."],
              ["Bounded rationality", "We blame people for decisions that make sense where they stand.", "Each fishing crew catches what it can; together they empty the sea.", "Change the information, incentives and goals people act on."]
            ]
          },
          {
            type: "table",
            eyebrow: "Three levels",
            title: "Events, behavior and structure",
            intro: "Each level explains more than the one above it. One company's sales, seen three ways; our example.",
            columns: ["Level", "What you see", "The question it raises", "What it lets you do"],
            widths: ["8rem", null, null, null],
            rows: [
              ["Events", "Sales fell 8% last quarter.", "Who or what is to blame?", "React, after the fact."],
              ["Behavior", "Sales have risen and fallen on a three-year cycle for a decade.", "What keeps producing this shape?", "Anticipate the next turn."],
              ["Structure", "Retailers order on recent sales, and deliveries take months, so the chain amplifies every change in demand.", "Which stocks, flows, loops and delays produce it?", "Change the structure, and with it the behavior."]
            ]
          },
          {
            type: "behavior",
            eyebrow: "A nonlinearity",
            title: "How waiting time explodes as a desk fills up",
            intro: "One service desk, customers arriving at random. Average wait, in multiples of the time it takes to serve one customer, against how busy the desk is. Our example of a nonlinearity, from standard queueing arithmetic.",
            cols: 1,
            h: 260,
            charts: [
              {
                t: "Average wait against utilization",
                d: "At half busy, customers wait about one service time. At 80% they wait four, at 90% nine, at 95% nineteen. The last few points of utilization cost far more than the first fifty.",
                x: [0, 96],
                y: [0, 25],
                xLabel: "Utilization, %",
                yLabel: "Wait, in service times",
                yTicks: [0, 5, 10, 15, 20, 25],
                hover: true,
                series: [{ name: "Service times of waiting", points: curve((u) => u / 100 / (1 - u / 100), 0, 96, 96) }]
              }
            ]
          },
          {
            type: "figure",
            eyebrow: "Layers of limits",
            title: "Liebig's barrel",
            intro: "A barrel holds water only up to its shortest stave. A growing business is the same: output is set by its scarcest input, whatever the others are.",
            alt: "A barrel drawn as five staves of different heights: customers, capital, staff, management time and supplier capacity. The water level reaches only the top of the shortest stave, staff.",
            svg: `<svg viewBox="0 0 420 270" xmlns="http://www.w3.org/2000/svg">
              <rect class="sv-wash" x="40" y="146" width="340" height="100"/>
              <path class="sv-curve" d="M40 146 H380"/>
              ${[["Customers", 40], ["Capital", 64], ["Staff", 146], ["Management time", 90], ["Supplier capacity", 54]]
                .map(([name, top], i) => `<rect class="${i === 2 ? "sv-box-pen" : "sv-box"}" x="${40 + i * 68}" y="${top}" width="64" height="${246 - top}" style="fill-opacity: 0.35"/>
                  <text class="sv-t2" transform="translate(${76 + i * 68} ${240}) rotate(-90)">${name}</text>`)
                .join("")}
              <path class="sv-axis" d="M30 246 H390"/>
              <text class="sv-k" x="212" y="136" text-anchor="middle">WATER LEVEL</text>
            </svg>`,
            notes: [
              { t: "Only the shortest stave matters now.", d: "Here it's staff. More capital, customers or supplier capacity would hold no more water." },
              { t: "Fix it and another becomes shortest.", d: "Hire, and management time becomes the limit; then capital. Growth keeps moving the limit." },
              { t: "Meadows's advice:", d: "know which factor limits you now, and look ahead to the next one, rather than pushing on whatever is easiest to push." }
            ],
            caption: "The usual picture of Liebig's law of the minimum, which Meadows uses. Staves and their heights are invented."
          }
        ],
        end: {
          related: [
            { title: "Delays and oscillation", where: "Chapter 2", page: "delays" },
            { title: "Growth meets a limit", where: "Chapter 2", page: "limits" },
            { title: "System traps and opportunities", where: "Chapter 5", page: "traps" },
            { title: "Leverage points", where: "Chapter 6", page: "leverage-points" }
          ],
          cta: { page: "traps", kicker: "Next", text: "See the traps that structures set" }
        }
      },
      // The eight trap names follow Chapter 5. The one-line structures, descriptions and
      // examples are ours, and the ways out paraphrase my reading of the chapter, unchecked
      // against its wording. That Meadows uses Hardin's pasture and quotes his "mutual
      // coercion" phrase is from memory and unchecked; the phrase itself is Hardin's (1968).
      // A reference page. The eight traps and their ways out follow Meadows's chapter 5 as I
      // remember it, unchecked against her wording. Romania's 1966 ban (births nearly doubled
      // the next year, then fell back) is from the public record; I remember Meadows using
      // Romania and contrasting Sweden, unchecked. Hardin's commons (1968), Monopoly and GNP
      // are in the book as I remember it. The loop diagrams are our simplified drawings of each
      // structure. The Senge column is from The Fifth Discipline (1990).
      "traps": {
        navLabel: "Traps",
        title: "System traps and opportunities",
        eyebrow: "Part II · Chapter 05",
        layout: "dense",
        dek:
          "Some structures produce the same trouble wherever they turn up, whoever is inside them. Meadows describes eight of these traps, and for each one a way out.",
        blocks: [
          {
            type: "brief",
            eyebrow: "In brief",
            title: "The argument in four points",
            cols: 2,
            points: [
              { t: "Traps are structures, not people.", d: "An arms race and a price war look nothing alike but are built the same way and go wrong the same way. Replace the people and the new ones, facing the same pressures, make the same choices." },
              { t: "Each trap has a characteristic behavior.", d: "Endless stalemate, a resource run into the ground, slowly sinking standards, runaway rivalry, winner-take-all, dependence, gamed rules, effort aimed at the wrong target." },
              { t: "The way out is to change the structure.", d: "The goals, the rules, the information people get and the feedback that reaches them, rather than pushing harder within the trap." },
              { t: "Every trap is also an opportunity.", d: "Seeing the structure early makes it possible to avoid the trap, or to turn the same loops to good use, such as letting success feed success where it serves everyone." }
            ]
          },
          {
            type: "loop-cards",
            eyebrow: "The eight traps",
            title: "Structure, example and way out",
            intro: "Each card draws the loops behind the trap. + means two things move together, − that they move in opposite directions; R marks a reinforcing loop, B a balancing one, and ‖ a delay.",
            cols: 2,
            items: [
              {
                name: "Policy resistance",
                alt: "The state of the system, pushed up by actor A and down by actor B. Each push weakens as the state moves its way: two balancing loops pulling against each other.",
                diagram: {
                  w: 300, h: 150,
                  nodes: [
                    { id: "s", kind: "var", label: "State of\nthe system", x: 150, y: 35 },
                    { id: "a", kind: "var", label: "Actor A's\npush", x: 52, y: 118 },
                    { id: "b", kind: "var", label: "Actor B's\npush", x: 248, y: 118 }
                  ],
                  links: [
                    { from: "s", to: "a", sign: "-", bend: 22 }, { from: "a", to: "s", sign: "+", bend: 22 },
                    { from: "s", to: "b", sign: "+", bend: -22 }, { from: "b", to: "s", sign: "-", bend: -22 }
                  ],
                  marks: [{ x: 98, y: 82, t: "B" }, { x: 202, y: 82, t: "B" }]
                },
                rows: [
                  { k: "The trap", d: "Several groups pull a system toward different goals. A push from one is met by the others pushing harder; everyone works hard and the system barely moves." },
                  { k: "Example", d: "Romania banned abortion and contraception in 1966. Births nearly doubled the next year, then fell most of the way back as families found ways around the ban, at great human cost." },
                  { k: "Way out", d: "Let go of the push so the resistance relaxes, then look for a goal everyone can share. Meadows contrasts Sweden, which met falling births by supporting families." }
                ]
              },
              {
                name: "The tragedy of the commons",
                alt: "Each user's use raises their gain, which raises their use: a reinforcing loop. Use draws down the shared resource, after a delay, and a smaller resource lowers each user's gain: a balancing loop that acts too late.",
                diagram: {
                  w: 300, h: 150,
                  nodes: [
                    { id: "u", kind: "var", label: "Each user's\nuse", x: 62, y: 40 },
                    { id: "g", kind: "var", label: "Gain to\neach user", x: 238, y: 40 },
                    { id: "r", kind: "var", label: "The shared\nresource", x: 150, y: 125 }
                  ],
                  links: [
                    { from: "u", to: "g", sign: "+", bend: -30 }, { from: "g", to: "u", sign: "+", bend: -30 },
                    { from: "u", to: "r", sign: "-", delay: true }, { from: "r", to: "g", sign: "+" }
                  ],
                  marks: [{ x: 150, y: 40, t: "R" }, { x: 150, y: 88, t: "B" }]
                },
                rows: [
                  { k: "The trap", d: "Each user gets the whole gain from using a shared resource a little more and bears only a share of the cost. Everyone takes more, and the resource erodes until nobody can use it." },
                  { k: "Example", d: "Garrett Hardin's 1968 pasture, open to every herder; overfished seas; air used to carry away waste." },
                  { k: "Way out", d: "Restore the missing feedback: educate and appeal to users, divide the resource so each bears the cost of overusing their part, or regulate access by rules the users agree to." }
                ]
              },
              {
                name: "Drift to low performance",
                alt: "Actual performance shapes perceived performance, which pulls the goal down; a lower goal means less corrective action and lower performance: a reinforcing drift. Perceived performance below the goal prompts corrective action: the balancing loop the drift erodes.",
                diagram: {
                  w: 300, h: 150,
                  nodes: [
                    { id: "act", kind: "var", label: "Actual\nperformance", x: 58, y: 35 },
                    { id: "per", kind: "var", label: "Perceived\nperformance", x: 242, y: 35 },
                    { id: "goal", kind: "var", label: "The goal", x: 242, y: 125 },
                    { id: "fix", kind: "var", label: "Corrective\naction", x: 58, y: 125 }
                  ],
                  links: [
                    { from: "act", to: "per", sign: "+" }, { from: "per", to: "goal", sign: "+" },
                    { from: "goal", to: "fix", sign: "+" }, { from: "fix", to: "act", sign: "+" },
                    { from: "per", to: "fix", sign: "-" }
                  ],
                  marks: [{ x: 115, y: 70, t: "B" }, { x: 205, y: 88, t: "R" }]
                },
                rows: [
                  { k: "The trap", d: "The standard is set by past performance, and bad results are believed more readily than good ones. Each disappointment lowers the bar, and performance follows it down, slowly enough that nobody notices." },
                  { k: "Example", d: "An “acceptable” delay or error rate that creeps up a little each year." },
                  { k: "Way out", d: "Keep standards absolute, whatever the latest results, or let the best results raise the standard rather than the worst lower it." }
                ]
              },
              {
                name: "Escalation",
                alt: "A's strength raises B's, and B's strength raises A's: a single reinforcing loop.",
                diagram: {
                  w: 300, h: 150,
                  nodes: [
                    { id: "a", kind: "var", label: "A's strength", x: 62, y: 75 },
                    { id: "b", kind: "var", label: "B's strength", x: 238, y: 75 }
                  ],
                  links: [{ from: "a", to: "b", sign: "+", bend: -40 }, { from: "b", to: "a", sign: "+", bend: -40 }],
                  marks: [{ x: 150, y: 75, t: "R" }]
                },
                rows: [
                  { k: "The trap", d: "Each side's goal is to stay ahead of the other, so every move provokes a bigger one. Both grow exponentially until one collapses." },
                  { k: "Example", d: "Arms races, price wars, advertising battles, negative political campaigns, two voices getting louder at a party." },
                  { k: "Way out", d: "Refuse to compete, which breaks the loop even if only one side does it, or negotiate an arrangement with balancing loops that cap the race." }
                ]
              },
              {
                name: "Success to the successful",
                alt: "A's success brings it a bigger share of resources, which brings more success: a reinforcing loop. The same share is taken from B, whose success falls, which shrinks its claim further: a second reinforcing loop.",
                diagram: {
                  w: 300, h: 150,
                  nodes: [
                    { id: "a", kind: "var", label: "A's\nsuccess", x: 50, y: 40 },
                    { id: "sh", kind: "var", label: "Resources\ngoing to A", x: 150, y: 120 },
                    { id: "b", kind: "var", label: "B's\nsuccess", x: 250, y: 40 }
                  ],
                  links: [
                    { from: "a", to: "sh", sign: "+", bend: 26 }, { from: "sh", to: "a", sign: "+", bend: 26 },
                    { from: "sh", to: "b", sign: "-", bend: -26 }, { from: "b", to: "sh", sign: "-", bend: -26 }
                  ],
                  marks: [{ x: 98, y: 72, t: "R" }, { x: 202, y: 72, t: "R" }]
                },
                rows: [
                  { k: "The trap", d: "Winning brings the means to win again. Winners take a growing share, losers are pushed out, and played long enough the game ends with one player holding everything." },
                  { k: "Example", d: "Monopoly, the board game; competitive exclusion in ecology; wealth that buys the education and credit that build more wealth." },
                  { k: "Way out", d: "Let losers find another game, cap the share any winner can hold, and level the field so that one round's prize doesn't decide the next: antitrust, inheritance taxes, public schooling." }
                ]
              },
              {
                name: "Shifting the burden to the intervenor",
                alt: "The problem prompts a quick fix, which relieves the problem: a balancing loop. The fix also, after a delay, weakens the system's own capacity to solve the problem, which makes the problem worse: a reinforcing loop of dependence.",
                diagram: {
                  w: 300, h: 150,
                  nodes: [
                    { id: "p", kind: "var", label: "The problem", x: 150, y: 28 },
                    { id: "f", kind: "var", label: "Quick fix", x: 50, y: 122 },
                    { id: "c", kind: "var", label: "Own capacity\nto solve it", x: 245, y: 122 }
                  ],
                  links: [
                    { from: "p", to: "f", sign: "+", bend: 20 }, { from: "f", to: "p", sign: "-", bend: 20 },
                    { from: "f", to: "c", sign: "-", delay: true }, { from: "c", to: "p", sign: "-" }
                  ],
                  marks: [{ x: 88, y: 72, t: "B" }, { x: 175, y: 95, t: "R" }]
                },
                rows: [
                  { k: "The trap", d: "A fix relieves the symptom and leaves the cause alone, so the system's own ability to handle the problem withers through disuse. Each time, more of the fix is needed." },
                  { k: "Example", d: "Addiction to alcohol, drugs or caffeine; farms that depend on ever more pesticide; industries that depend on subsidies." },
                  { k: "Way out", d: "Avoid getting hooked. If already dependent, use the fix while rebuilding the system's own capacity, then withdraw it gradually." }
                ]
              },
              {
                name: "Rule beating",
                alt: "A rule's measure rewards behavior that meets its letter, which raises the measure: a reinforcing loop. That behavior works against what the rule was meant to achieve.",
                diagram: {
                  w: 300, h: 150,
                  nodes: [
                    { id: "m", kind: "var", label: "The rule's\nmeasure", x: 58, y: 40 },
                    { id: "b", kind: "var", label: "Behavior that\nmeets the letter", x: 236, y: 40 },
                    { id: "aim", kind: "var", label: "What the rule\nwas meant to do", x: 150, y: 125 }
                  ],
                  links: [
                    { from: "m", to: "b", sign: "+", bend: -30 }, { from: "b", to: "m", sign: "+", bend: -30 },
                    { from: "b", to: "aim", sign: "-" }
                  ],
                  marks: [{ x: 147, y: 40, t: "R" }]
                },
                rows: [
                  { k: "The trap", d: "People obey the wording of a rule while defeating its intent, and the system distorts around the rule." },
                  { k: "Example", d: "A department spends whatever is left of its budget in the last weeks of the year so that next year's isn't cut." },
                  { k: "Way out", d: "Treat rule beating as feedback about the rules, and redesign them so ingenuity goes into meeting their purpose rather than getting around them." }
                ]
              },
              {
                name: "Seeking the wrong goal",
                alt: "An indicator rewards effort to raise it, and the effort raises the indicator: a reinforcing loop. The link from that effort to what's actually wanted is weak or uncertain, drawn dashed.",
                diagram: {
                  w: 300, h: 150,
                  nodes: [
                    { id: "i", kind: "var", label: "The indicator\n(say, GNP)", x: 62, y: 40 },
                    { id: "e", kind: "var", label: "Effort to\nraise it", x: 238, y: 40 },
                    { id: "w", kind: "var", label: "What's actually\nwanted", x: 150, y: 125 }
                  ],
                  links: [
                    { from: "i", to: "e", sign: "+", bend: -30 }, { from: "e", to: "i", sign: "+", bend: -30 },
                    { from: "e", to: "w", arrow: true, dash: true }
                  ],
                  marks: [{ x: 150, y: 40, t: "R" }]
                },
                rows: [
                  { k: "The trap", d: "A system does what its goals and measures ask, not what anyone intended. If the measure isn't the real aim, effort goes to the measure." },
                  { k: "Example", d: "GNP counts activity, not well-being: a car crash and the hospital stay that follows add to it. Schools judged by test scores teach to the test." },
                  { k: "Way out", d: "Choose goals and indicators that reflect what you actually want, and don't confuse effort with results." }
                ]
              }
            ],
            caption: "Loop diagrams simplified and drawn by us."
          },
          {
            type: "table",
            eyebrow: "Cross-reference",
            title: "The same traps under other names",
            intro: "Peter Senge's The Fifth Discipline (1990) made a similar set of system archetypes widely known in management.",
            columns: ["Meadows's trap", "Senge's archetype", "Behavior to look for"],
            widths: ["14rem", "12rem", null],
            rows: [
              ["Policy resistance", "Fixes that fail (in part)", "Effort rises year after year and the problem stays put"],
              ["The tragedy of the commons", "Tragedy of the commons", "Everyone's yield falls together after a period of growth"],
              ["Drift to low performance", "Eroding goals", "Targets quietly revised down to match results"],
              ["Escalation", "Escalation", "Two actors' moves grow in size, each answering the other"],
              ["Success to the successful", "Success to the successful", "One player's share keeps growing at the others' expense"],
              ["Shifting the burden to the intervenor", "Shifting the burden", "A remedy needed in ever larger doses"],
              ["Rule beating", "—", "Measures improve while what they stand for doesn't"],
              ["Seeking the wrong goal", "—", "Hitting the numbers while missing the point"]
            ]
          }
        ],
        end: {
          related: [
            { title: "Leverage points", where: "Chapter 6", page: "leverage-points" },
            { title: "Feedback loops", where: "Chapter 1", page: "feedback" },
            { title: "Delays and oscillation", where: "Chapter 2", page: "delays" },
            { title: "Why systems surprise us", where: "Chapter 4", page: "surprises" }
          ],
          cta: { page: "leverage-points", kicker: "Next", text: "Where to push: twelve leverage points" }
        }
      },
      // The meter-in-the-hall story and Meadows's caveat that the list is tentative are
      // from my reading of Chapter 6 and unchecked against the book's wording. The twelve
      // names follow her list; the descriptions are ours.
      // A reference page. The twelve leverage points in Meadows's order, Forrester's remark
      // that people find leverage points and push them the wrong way, the Dutch electricity
      // meters, and the list held loosely follow Meadows's chapter 6 as I remember it,
      // unchecked against her wording. The US Toxics Release Inventory (1986) as an
      // information-flow example is my memory of the book; unchecked. The grouping into
      // parameters, feedbacks, design and intent is from Abson and colleagues, “Leverage
      // points for sustainability transformation”, Ambio (2017), not from Meadows. The
      // business examples are ours.
      "leverage-points": {
        navLabel: "Leverage",
        title: "Leverage points",
        eyebrow: "Part III · Chapter 06",
        layout: "dense",
        dek:
          "Some places in a system respond to a small push with a large change. Meadows ranks twelve kinds of place to intervene, and the ones people reach for first are near the bottom of her list.",
        blocks: [
          {
            type: "brief",
            eyebrow: "In brief",
            title: "The argument in six points",
            points: [
              { t: "Some places respond to a small push with a large change.", d: "Meadows quotes Jay Forrester's observation that people often find these leverage points by instinct, and then push them in the wrong direction." },
              { t: "Numbers are the weakest.", d: "Budgets, tax rates and targets get most of the attention because they're visible and easy to argue over. Changing them rarely changes how the system behaves." },
              { t: "Physical structure and delays are strong but stubborn.", d: "Rebuilding plants and networks is slow and costly; many delays can't be changed, only allowed for." },
              { t: "Information and rules are strong and often cheap.", d: "Restoring a missing flow of information, or changing who may do what, can change behavior quickly. Houses with the electricity meter in the front hall used about a third less power." },
              { t: "Goals and paradigms are strongest.", d: "Change what a system is for, or the assumptions it grows out of, and everything beneath reorganizes. Resistance is fiercest there too." },
              { t: "Hold the list loosely.", d: "Meadows offered it as tentative and its order as open to argument. Her highest leverage point is not being attached to any paradigm at all." }
            ]
          },
          {
            type: "figure",
            eyebrow: "Figure",
            title: "Twelve places to intervene, weakest to strongest",
            intro: "Meadows's list, numbered as she numbers it, from 12 (weakest) to 1 (strongest). The brackets show a later grouping of her list into four realms.",
            alt: "A staircase of twelve steps rising from left to right: numbers, buffers, stock-and-flow structures, delays, balancing loops, reinforcing loops, information flows, rules, self-organization, goals, paradigms and transcending paradigms. Brackets group them as parameters, feedbacks, design and intent.",
            svg: (() => {
              const names = ["Numbers", "Buffers", "Stock-and-flow structures", "Delays", "Balancing loops", "Reinforcing loops", "Information flows", "Rules", "Self-organization", "Goals", "Paradigms", "Transcending paradigms"];
              const bars = names
                .map((nm, i) => {
                  const x = 40 + i * 70;
                  const h = 26 + i * 16;
                  return `<rect x="${x}" y="${200 - h}" width="62" height="${h}" rx="2" style="fill: var(--series-profit); fill-opacity: ${(0.22 + 0.065 * i).toFixed(2)}"/>
                    <text class="sv-k" x="${x + 31}" y="${194 - h}" text-anchor="middle">${12 - i}</text>
                    <text class="sv-t2" transform="translate(${x + 38} 214) rotate(-38)" text-anchor="end">${nm}</text>`;
                })
                .join("");
              const realms = [["PARAMETERS", 0, 2], ["FEEDBACKS", 3, 5], ["DESIGN", 6, 8], ["INTENT", 9, 11]]
                .map(([nm, a, b]) => `<path class="sv-axis" d="M${40 + a * 70} 352 V358 H${102 + b * 70} V352"/><text class="sv-k" x="${(142 + (a + b) * 70) / 2}" y="374" text-anchor="middle">${nm}</text>`)
                .join("");
              return `<svg viewBox="0 0 900 384" xmlns="http://www.w3.org/2000/svg">${bars}<path class="sv-axis" d="M30 200 H880"/>${realms}</svg>`;
            })(),
            svgNarrow: (() => {
              const names = ["Numbers", "Buffers", "Stock-and-flow structures", "Delays", "Balancing loops", "Reinforcing loops", "Information flows", "Rules", "Self-organization", "Goals", "Paradigms", "Transcending paradigms"];
              return `<svg viewBox="0 0 330 376" xmlns="http://www.w3.org/2000/svg">${names
                .map((nm, i) => {
                  const y = 10 + i * 30;
                  const w = 40 + i * 9;
                  return `<text class="sv-k" x="20" y="${y + 15}" text-anchor="end">${12 - i}</text>
                    <rect x="28" y="${y}" width="${w}" height="22" rx="2" style="fill: var(--series-profit); fill-opacity: ${(0.22 + 0.065 * i).toFixed(2)}"/>
                    <text class="sv-t2" x="${36 + w}" y="${y + 15}">${nm}</text>`;
                })
                .join("")}</svg>`;
            })(),
            full: true,
            caption: "Meadows's order. The four realms are from Abson and colleagues, Ambio, 2017."
          },
          {
            type: "table",
            eyebrow: "All twelve",
            title: "What each leverage point is, with a business example",
            intro: "Meadows's definitions, paraphrased; the examples are ours.",
            columns: ["", "Leverage point", "What it is", "Business example"],
            widths: ["2.5rem", "11rem", null, null],
            rows: [
              ["12", "Numbers", "Constants and parameters: subsidies, taxes, budgets, standards, targets", "Raising next year's sales target by 10%"],
              ["11", "Buffers", "The size of stabilizing stocks relative to their flows", "Holding three months of cash, or more stock in the warehouse"],
              ["10", "Stock-and-flow structures", "The physical arrangement of the system: plants, networks, who connects to whom", "Rebuilding the distribution network around regional hubs"],
              ["9", "Delays", "How long feedback takes, relative to how fast the system changes", "Cutting the lead time from order to delivery"],
              ["8", "Balancing feedback loops", "The strength of self-correcting loops relative to the pressures they correct", "Letting customer complaints stop a product line, not just log a ticket"],
              ["7", "Reinforcing feedback loops", "The strength of loops that drive growth or collapse", "Slowing a spiral of discounting before it becomes a price war"],
              ["6", "Information flows", "Who has access to which information, and when", "Showing each team the cost of the returns its products cause"],
              ["5", "Rules", "Incentives, punishments and constraints; who may do what", "Paying salespeople on margin rather than revenue"],
              ["4", "Self-organization", "The power to add to, change or evolve the system's own structure", "Letting teams run experiments and keep what works"],
              ["3", "Goals", "The purpose or function of the system", "From maximizing this quarter's earnings to long-term customer value"],
              ["2", "Paradigms", "The shared mindset out of which the system's goals, rules and structure arise", "Seeing suppliers as partners rather than adversaries"],
              ["1", "Transcending paradigms", "Holding no paradigm as the final truth, and staying free to change it", "—"]
            ]
          },
          {
            type: "table",
            eyebrow: "Evidence",
            title: "Information flows at work",
            intro: "Two examples of how much changes when feedback reaches the people who make the decisions.",
            columns: ["Case", "What changed", "Result"],
            widths: ["12rem", null, null],
            rows: [
              ["Dutch houses", "In a suburb of near-identical houses, some had the electricity meter in the basement, others in the front hall where the family passed it daily.", "Houses with the meter in the hall used about a third less electricity. Prices, houses and people were the same; only what they could see differed."],
              ["US Toxics Release Inventory", "From 1986, companies had to report publicly the toxic chemicals they released.", "No new limits, only disclosure, yet reported releases fell sharply within a few years as companies saw their own numbers and so did their neighbors."]
            ],
            foot: "The Dutch houses are Meadows's example. The Toxics Release Inventory is as I remember the book using it; check the figures against the text."
          }
        ],
        end: {
          related: [
            { title: "Delays and oscillation", where: "Chapter 2", page: "delays" },
            { title: "Feedback loops", where: "Chapter 1", page: "feedback" },
            { title: "System traps and opportunities", where: "Chapter 5", page: "traps" },
            { title: "Living in a world of systems", where: "Chapter 7", page: "living" }
          ],
          cta: { page: "living", kicker: "Next", text: "Habits for living in a world of systems" }
        }
      },
      // A reference page. The fifteen habits follow Meadows's chapter 7 as I remember it,
      // paraphrased and unchecked against her wording; the "Try" suggestions are ours. The
      // dance image and the admission that systems thinking doesn't give control are hers as I
      // remember them. The workbench is ours.
      "living": {
        navLabel: "Habits",
        title: "Living in a world of systems",
        eyebrow: "Part III · Chapter 07",
        layout: "dense",
        dek:
          "Systems can't be controlled, but they can be understood, designed and redesigned. Meadows ends the book with the habits that let people work with systems rather than against them.",
        blocks: [
          {
            type: "brief",
            eyebrow: "In brief",
            title: "The argument in four points",
            cols: 2,
            points: [
              { t: "Systems can't be controlled.", d: "Self-organizing, nonlinear, feedback-driven systems are too complex to predict and command. Systems thinking didn't give Meadows and her colleagues that power, and she says so." },
              { t: "They can be understood, designed and redesigned.", d: "Her image is a dance: we can't control a system, but we can listen to it, learn its rhythm and move with it." },
              { t: "What follows is a practice, not a method.", d: "Fifteen habits drawn from experience rather than proof, closer to a good craftsperson's habits than to rules." },
              { t: "Behavior comes from structure.", d: "The same structure produces the same behavior whoever is inside it. That's hopeful: structures were built by people, and people can rebuild them." }
            ]
          },
          {
            type: "table",
            eyebrow: "Fifteen habits",
            title: "Living in a world of systems",
            intro: "Meadows's closing guidelines, paraphrased, with a way to try each one; the suggestions are ours.",
            columns: ["Habit", "What it means", "Try"],
            widths: ["13rem", null, null],
            rows: [
              ["Get the beat of the system", "Before changing anything, watch how the system behaves. Gather its history, as a graph if you can, and start from facts rather than theories.", "Plot the data you have over the longest period you can find before proposing a fix."],
              ["Expose your mental models to the light of day", "Write your model down, as a diagram or in words, so others can test it. Every model is wrong somewhere; the useful ones get corrected.", "Draw the stocks and loops you believe in, and ask a colleague to find the flaw."],
              ["Honor, respect and distribute information", "Many malfunctions trace back to information that is missing, late or distorted. Getting the right information to the right place is often the cheapest intervention there is.", "Ask who doesn't see the consequences of their decisions, and show them."],
              ["Use language with care", "Words shape what we can think. Keep them honest and concrete, and add words for stocks, flows, delays and loops.", "When someone says “growth”, ask: growth of which stock, and from which flow?"],
              ["Pay attention to what is important, not just what is quantifiable", "Numbers get attention because they can be counted. Quality, trust and morale matter as much, and a model that leaves them out is wrong in a predictable direction.", "List what matters that your dashboard doesn't show."],
              ["Make feedback policies for feedback systems", "In a changing system, a fixed rule soon goes out of date. Better policies adjust to the state of the system, like a fee that rises as a resource gets scarce.", "Tie a policy to a measure of the system rather than to a fixed number or date."],
              ["Go for the good of the whole", "Don't optimize one part at the expense of the system it serves. Aim for the properties of the whole: resilience, self-organization, a healthy hierarchy.", "Before improving a team's metric, check what it costs the teams around it."],
              ["Listen to the wisdom of the system", "Before intervening, find out what already works and how the system sustains itself. Help it do that rather than overriding it.", "Ask the people inside what they already do that works, and support it."],
              ["Locate responsibility in the system", "Look for the ways a system creates its own behavior before blaming outside events, and design systems in which decision-makers feel the consequences of their decisions.", "Find a decision whose costs land on someone else, and route the feedback back."],
              ["Stay humble, stay a learner", "Systems surprise everyone. Act in small steps, watch what happens, and admit mistakes quickly so they can be corrected.", "Run the next change as an experiment, with a way to tell whether it worked."],
              ["Celebrate complexity", "The world is nonlinear, diverse and changing. Expect that, and value the variety that makes systems resilient instead of forcing everything into tidy order.", "Distrust the simplest story when the evidence doesn't fit it."],
              ["Expand time horizons", "Short horizons are why so many fixes backfire. Watch the long term and the short term together, as a walker on a rough path watches both the next step and the way ahead.", "Ask what the decision looks like in five years, not just this quarter."],
              ["Defy the disciplines", "Systems don't respect academic or departmental boundaries. Follow the problem wherever it leads, and learn enough of other fields to talk with their experts.", "Bring someone from outside your function into the next diagnosis."],
              ["Expand the boundary of caring", "Because everything is connected, the success of one part depends on the rest: other people, other places, and the generations to come.", "Name who else a decision affects, and how you would know if it hurt them."],
              ["Don't erode the goal of goodness", "Drift to low performance works on standards of behavior too. Hold to high standards, and let good examples set the bar rather than bad news.", "Notice when “everyone does it” is lowering a standard you hold."]
            ]
          },
          {
            type: "system-sketch",
            title: "Sketch your system",
            intro: "Load an example to see how it works, then write your own. The sketch and the checks update as you type.",
            draftKey: "tis.sketch",
            defaultExample: "turnover",
            examples: {
              turnover: {
                label: "Staff turnover",
                note: "An invented example. Edit any field to start your own sketch.",
                behavior: "Over the past two years, resignations from the support team have risen every quarter, and response times have crept up with them.",
                stock: "Experienced support staff",
                inflow: "New hires becoming fully trained",
                outflow: "Resignations",
                kind: "reinforcing",
                loop: "The fewer experienced staff there are, the more work falls on each of those left, so more of them burn out and resign.",
                delay: "New hires take about six months to handle the work on their own.",
                lever: "Show workload per person on the weekly dashboard leadership reviews, and change the team's goal from tickets closed to customers helped."
              },
              churn: {
                label: "Subscriber growth stalls",
                note: "An invented example. Edit any field to start your own sketch.",
                behavior: "Subscribers grew quickly for three years, then flattened, even though sign-ups are still rising every month.",
                stock: "Paying subscribers",
                inflow: "New subscribers",
                outflow: "Cancellations",
                kind: "balancing",
                loop: "The more paying subscribers there are, the more cancel each month, so growth slows until cancellations catch up with sign-ups.",
                delay: "Most cancellations come three to six months after sign-up, when the introductory price ends.",
                lever: "Send the product team the cancellation reasons every week, and measure them on subscribers kept rather than sign-ups."
              },
              blank: { label: "Start blank" }
            }
          }
        ],
        end: {
          related: [
            { title: "Leverage points", where: "Chapter 6", page: "leverage-points" },
            { title: "System traps and opportunities", where: "Chapter 5", page: "traps" },
            { title: "Stocks and flows", where: "Chapter 1", page: "stocks-flows" },
            { title: "Why systems surprise us", where: "Chapter 4", page: "surprises" }
          ],
          cta: { page: "", kicker: "Contents", text: "See the map of the book" }
        }
      }
    }
  });
})();
