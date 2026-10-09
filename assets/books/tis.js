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
      "resilience": {
        navLabel: "Resilience",
        title: "Why systems work so well",
        eyebrow: "Part II · Chapter 03",
        dek:
          "Systems that last share three properties: resilience, self-organization and hierarchy. Each is easy to wear away without noticing, often in the name of efficiency.",
        blocks: [
          {
            type: "prose",
            sections: [
              {
                n: "1",
                title: "Resilience",
                paras: [
                  "Resilience is a system's ability to survive and recover in a changing environment. It comes from structure: several balancing loops that can each restore the system when another fails, working through different mechanisms and on different time scales. A body has many ways to keep its temperature steady; a city's food arrives from many farms by many routes.",
                  "Resilience isn't the same as stability. A system can be steady for years and still brittle, holding its course only because nothing large has hit it yet. And because resilience is usually invisible until it's needed, it's easy to trade away for something that shows: more output, higher efficiency, a lower cost this year."
                ],
                side: {
                  label: "Just in time",
                  html: "<p>Meadows points to just-in-time supply. Holding almost no inventory cuts costs and smooths production, and leaves a factory exposed to any break in its chain of deliveries.</p>"
                }
              }
            ]
          },
          {
            type: "buffer",
            title: "What a buffer costs, and what it buys",
            intro:
              "An invented factory gets its parts from one supplier. In any year there's a 30% chance the supplier stops, usually for a week or two, though one stoppage in ten lasts eight weeks. Each week without parts costs $100,000 in lost production; each week of parts kept in reserve costs $5,000 a year to hold.",
            weeksLabel: "Parts in reserve",
            weeksHint: "Weeks of production the factory can run without a delivery.",
            maxWeeks: 8,
            start: 0,
            hold: 5000,
            short: 100000,
            chance: 0.3,
            stoppages: [
              { weeks: 1, p: 0.5 },
              { weeks: 2, p: 0.25 },
              { weeks: 4, p: 0.15 },
              { weeks: 8, p: 0.1 }
            ],
            years: 10,
            decades: 2000,
            seed: 7,
            presets: [
              { label: "Lean: none", weeks: 0 },
              { label: "Two weeks", weeks: 2 },
              { label: "Four weeks", weeks: 4 },
              { label: "Eight weeks", weeks: 8 }
            ],
            caption:
              "Cost a year by weeks of parts in reserve: in a calm year, on average, and in the decade that 1 in 20 is worse than, across 2,000 simulated decades."
          },
          {
            type: "prose",
            sections: [
              {
                n: "2",
                title: "What the buffer shows",
                paras: [
                  "The budget sees only the calm-year line, and it says the reserve is pure cost: $5,000 a year for every week of parts held. Remove it and the savings show at once. The losses come later, irregularly, and often in someone else's budget.",
                  "On average, four weeks of parts is the cheapest choice here, at less than half the average cost of running lean. In a bad decade the gap is wider still. That's resilience in miniature: a cost you can see every year, for protection you see only when it's needed."
                ],
                side: {
                  label: "Try this",
                  html: "<p>Start at “Lean: none” and add one week at a time. The calm-year cost climbs in a straight line, while the bad-decade cost falls steeply at first.</p>"
                }
              },
              {
                n: "3",
                title: "Self-organization",
                paras: [
                  "Self-organization is a system's capacity to make its own structure more complex: to learn, diversify and evolve. A seed becomes a tree; a few founders become a company with habits nobody designed. Meadows notes that it often grows from a few simple rules, like the ones that give a snowflake its shape.",
                  "It produces variety and surprise, which is why organizations that prize control tend to suppress it. Rigid procedures and narrow targets make a system easier to manage today and less able to adapt tomorrow."
                ],
                side: {
                  label: "See also",
                  html: "<p>The power to self-organize is fourth on Meadows's list of <a href=\"@leverage-points\">leverage points</a>, above rules and information.</p>"
                }
              },
              {
                n: "4",
                title: "Hierarchy",
                paras: [
                  "Hierarchy here means systems nested inside systems: cells in organs in bodies, teams in divisions in companies. It lets each level handle most of its own business, which cuts the information every part needs and makes the whole more stable.",
                  "Meadows notes that hierarchies grow from the bottom up, and that the upper levels exist to serve the lower ones. They go wrong in two ways. When a part's goals win out over the goals of the whole, she calls it suboptimization. When the center tries to control too much, the parts lose the freedom that made them work."
                ],
                side: {
                  label: "Suboptimization",
                  html: "<p>A sales team that hits its target by poaching deals from another team is doing well by its own measure and nothing for the company.</p>"
                }
              }
            ]
          },
          {
            type: "sorter",
            title: "Which property?",
            intro: "Six examples. Which of the three properties is each one about?",
            options: [
              { id: "resilience", label: "Resilience", hint: "Survives shocks and recovers." },
              { id: "self", label: "Self-organization", hint: "Builds new structure on its own." },
              { id: "hierarchy", label: "Hierarchy", hint: "Systems nested inside systems." }
            ],
            items: [
              {
                text: "A city's food comes from hundreds of farms and dozens of distributors, so losing any one of them barely shows.",
                answer: "resilience",
                why: "Many sources and routes are redundant ways of restoring supply when one fails."
              },
              {
                text: "A startup's habits, jargon and rituals grew up without anyone designing them.",
                answer: "self",
                why: "The organization added structure of its own: nobody wrote the culture down before it existed."
              },
              {
                text: "A company is split into divisions, each made of teams that run most of their own work without asking head office.",
                answer: "hierarchy",
                why: "Nested subsystems, each handling its own business, so the top needs far less information."
              },
              {
                text: "A hospital keeps spare ventilators that sit unused most years.",
                answer: "resilience",
                why: "A buffer that looks wasteful in a calm year, and keeps the hospital working in a bad one."
              },
              {
                text: "A flock of starlings wheels in complex patterns, each bird following a few simple rules about its nearest neighbors.",
                answer: "self",
                why: "Simple rules, followed by many individuals, generate complex structure that no one designed."
              },
              {
                text: "A regional office hits its own cost target by pushing work onto another office, and the company's costs don't fall.",
                answer: "hierarchy",
                why: "Hierarchy gone wrong: a subsystem pursuing its own goal at the expense of the whole, which Meadows calls suboptimization."
              }
            ]
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
      "surprises": {
        navLabel: "Surprises",
        title: "Why systems surprise us",
        eyebrow: "Part II · Chapter 04",
        dek:
          "Systems keep doing things their managers didn't expect. Meadows argues the surprise comes less from the systems than from the habits of mind we bring to them, and names six.",
        blocks: [
          {
            type: "prose",
            sections: [
              {
                n: "1",
                title: "Our models are incomplete",
                paras: [
                  "Everything we think we know about the world is a model: a simplified picture in our heads, in words or in numbers. Models are useful, and they're always incomplete. Meadows's argument is that the gaps aren't random. They fall in the same few places, and systems surprise us there again and again.",
                  "Each of the six sources below is a habit of thought that works well enough in daily life and fails with systems."
                ],
                side: {
                  label: "Not a reason for despair",
                  html: "<p>Knowing where models tend to fail is what makes them improvable. Each source of surprise comes with a habit that helps.</p>"
                }
              }
            ]
          },
          {
            type: "trap-cards",
            eyebrow: "Six sources",
            title: "Where surprises come from",
            intro: "Each is a gap between how systems work and how we tend to think about them.",
            outLabel: "What helps",
            items: [
              {
                name: "Beguiling events",
                structure: "We see events, not the behavior and structure behind them",
                trap: "News arrives as events: a stock-out, a record quarter, a resignation. Events are the most visible level of a system and the least useful for understanding it. Behavior over time shows the pattern; structure explains it.",
                out: "Look at the history as a graph, then ask what structure would produce that shape."
              },
              {
                name: "Linear minds in a nonlinear world",
                structure: "Effects aren't proportional to causes",
                trap: "We expect twice the push to give twice the result. In systems, a little more fertilizer may add a lot of yield or none at all, and a road that's nearly full jams when a few more cars join it. Nonlinearities can also shift which loop dominates.",
                out: "Look for thresholds and saturation, and test how the response changes as the system nears them."
              },
              {
                name: "Nonexistent boundaries",
                structure: "Every boundary is a choice we made",
                trap: "Systems blend into one another. The clouds at the edge of a stock-and-flow diagram, where flows come from and go to, are a convenience. Real sources run out and real sinks fill up, and then the boundary we drew starts to matter.",
                out: "Draw the boundary around the question, not around a department or a discipline, and redraw it when the question changes."
              },
              {
                name: "Layers of limits",
                structure: "Growth is held back by whatever is scarcest",
                trap: "At any moment, a growing system is limited by one factor, as a crop is limited by its scarcest nutrient. Supply more of anything else and nothing happens. Supply the limiting factor and growth resumes, until another one runs short.",
                out: "Find the factor that limits growth now, and expect growth itself to move the limit somewhere else."
              },
              {
                name: "Ubiquitous delays",
                structure: "Everything takes longer than we expect",
                trap: "Delays in noticing, deciding and acting are everywhere, and they're usually longer than people estimate. They cause overshoot and oscillation, as the car dealer found.",
                out: "Look for the delays and allow for them. Where they're long, foresight matters more than speed."
              },
              {
                name: "Bounded rationality",
                structure: "Sensible choices made with partial information",
                trap: "People make reasonable decisions with the information they have, but they see only part of the system and act on nearby, short-term goals. Choices that make sense in each place can add up to results nobody wants.",
                out: "Change the information, incentives and goals people act on, rather than blaming them for acting sensibly where they stand."
              }
            ]
          },
          {
            type: "prose",
            sections: [
              {
                n: "2",
                title: "Events, behavior, structure",
                paras: [
                  "Meadows asks readers to look at a system on three levels. <strong>Events</strong> are single happenings: what makes the news. <strong>Behavior</strong> is the pattern events make over time, the shape of the line on a graph. <strong>Structure</strong> is the arrangement of stocks, flows, feedback loops and delays that produces the pattern.",
                  "Explanations at the level of events can't predict anything, and explanations at the level of behavior can only extend a trend. Only structure explains why the pattern looks the way it does, and so where it might be changed."
                ],
                side: {
                  label: "See also",
                  html: "<p>The <a href=\"@delays\">car dealer</a> shows all three: an empty lot (an event), months of swings (behavior), and three delays in a balancing loop (structure).</p>"
                }
              }
            ]
          },
          {
            type: "sorter",
            title: "Event, behavior or structure?",
            intro: "Six statements about invented companies. Which level of the system is each one about?",
            options: [
              { id: "event", label: "Event", hint: "Something that happened, once." },
              { id: "behavior", label: "Behavior", hint: "A pattern over time." },
              { id: "structure", label: "Structure", hint: "What produces the pattern." }
            ],
            items: [
              {
                text: "The warehouse ran out of the best-selling model last Tuesday.",
                answer: "event",
                why: "A single happening. It's what gets reported, and on its own it says little about why."
              },
              {
                text: "Stock-outs have come back every spring for five years, each followed by a glut in the summer.",
                answer: "behavior",
                why: "A pattern over time. Seeing it as a line on a graph is the first step past the headline."
              },
              {
                text: "Buyers order based on last month's sales, and the factory takes ten weeks to deliver.",
                answer: "structure",
                why: "A decision rule and a delay: the structure that produces spring shortages and summer gluts."
              },
              {
                text: "Staff turnover has risen every year for the last four years.",
                answer: "behavior",
                why: "A trend, not an event. It invites the question of what keeps pushing it up."
              },
              {
                text: "Each resignation adds to the workload of the people who stay, which leads more of them to leave.",
                answer: "structure",
                why: "A reinforcing loop. It explains the rising trend, and it shows where to intervene: the workload, not the exit interviews."
              },
              {
                text: "The finance director resigned this morning.",
                answer: "event",
                why: "Newsworthy, but it's one point on a line. Whether it matters depends on the pattern it belongs to."
              }
            ]
          },
          {
            type: "prose",
            sections: [
              {
                n: "3",
                title: "Linear minds in a nonlinear world",
                paras: [
                  "A relationship is linear when the effect is proportional to the cause: one more unit of input, one more unit of output, wherever you start. Many of the relationships that matter in systems aren't like that. They're flat for a long way and then steep, or steep at first and then flat.",
                  "The trouble is that experience is gathered in the flat part. A team that has handled more and more work without much extra delay reasonably expects the next increase to go the same way."
                ],
                side: {
                  label: "Our example",
                  html: "<p>The help desk below isn't from the book. It uses the standard formula for a single queue with random arrivals, which is about as clean a nonlinearity as business offers.</p>"
                }
              }
            ]
          },
          {
            type: "queue",
            title: "How busy is too busy?",
            intro:
              "An invented help desk closes 20 requests an hour on average, and requests arrive at random. Raise the number of requests and compare how long each one takes with a straight line drawn through the quiet hours.",
            capacity: 20,
            min: 1,
            max: 19.5,
            step: 0.5,
            start: 10,
            quiet: [2, 10],
            yMax: 120,
            rateLabel: "Requests arriving",
            rateHint: "The desk can close 20 an hour, so at 20 it's 100% busy.",
            presets: [
              { label: "Half busy", value: 10 },
              { label: "80% busy", value: 16 },
              { label: "90% busy", value: 18 },
              { label: "95% busy", value: 19 }
            ],
            caption: "Minutes from arrival to done, by requests arriving per hour. The dashed line extends the quiet hours in a straight line."
          },
          {
            type: "prose",
            sections: [
              {
                n: "4",
                title: "Limits, delays and partial information",
                paras: [
                  "The last three sources compound each other. A growing business is limited by one thing at a time: first demand, then capacity, then people, then cash. Relieving the current limit lets growth continue until the next one bites, and each new limit shows up after a delay, to people who can see only their own part of the business.",
                  "That last point, which Herbert Simon called bounded rationality, is why Meadows warns against blaming individuals. A fisher who adds a boat, a manager who hoards budget and a buyer who over-orders are each acting sensibly on what they can see. If the results are bad, the place to look is what they can see and what they're rewarded for."
                ],
                side: {
                  label: "See also",
                  html: "<p>The <a href=\"@traps\">system traps</a> are bounded rationality at work: structures in which every sensible local choice adds up to a bad result.</p>"
                }
              }
            ]
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
            { title: "Why systems surprise us", where: "Chapter 4", page: "surprises" }
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
            { title: "Living in a world of systems", where: "Chapter 7", page: "living" }
          ],
          cta: { page: "living", kicker: "Next", text: "Habits for living in a world of systems" }
        }
      },
      // The fifteen habit names follow Chapter 7's list as I remember it, in the book's order;
      // the descriptions and "Try" lines are ours. The dancing image and the account of
      // systems people giving up on prediction and control are from my reading of the
      // chapter, unchecked against its wording. The sketch examples are invented.
      "living": {
        navLabel: "Habits",
        title: "Living in a world of systems",
        eyebrow: "Part III · Chapter 07",
        dek:
          "Systems can't be controlled, but they can be understood, designed and redesigned. Meadows ends the book with the habits that let people work with systems rather than against them.",
        blocks: [
          {
            type: "prose",
            sections: [
              {
                n: "1",
                title: "Dancing with systems",
                paras: [
                  "Meadows ends with an admission. Systems thinking didn't give her and her colleagues the power to predict and control; self-organizing, nonlinear, feedback-driven systems are too surprising for that. What it gave them was a way of living with systems: designing and redesigning them, learning from how they respond, and working with their strengths rather than against them.",
                  "Her last chapter is a list of habits that follow, drawn from experience rather than proof. They read less like rules than like the practice of a good craftsperson."
                ],
                side: {
                  label: "Dancing",
                  html: "<p>Meadows's image for this is a dance: we can't control a system, but we can listen to it and move with it.</p>"
                }
              }
            ]
          },
          {
            type: "trap-cards",
            eyebrow: "Fifteen habits",
            title: "Habits for a world of systems",
            intro: "In the book's order. Each comes with one way to start practicing it.",
            outLabel: "Try",
            items: [
              { name: "Get the beat of the system", trap: "Before changing anything, watch how the system behaves. Gather its history, as a graph if you can, and start from facts rather than theories.", out: "Plot the data you have over the longest period you can find before proposing a fix." },
              { name: "Expose your mental models to the light of day", trap: "Write your model down, as a diagram or in words, so others can test it. Every model is wrong somewhere; the useful ones get corrected.", out: "Draw the stocks and loops you believe in, and ask a colleague to find the flaw." },
              { name: "Honor, respect and distribute information", trap: "Many malfunctions trace back to information that is missing, late or distorted. Getting the right information to the right place is often the cheapest intervention there is.", out: "Ask who doesn't see the consequences of their decisions, and show them." },
              { name: "Use language with care", trap: "Words shape what we can think. Keep them honest and concrete, and add words for stocks, flows, delays and loops.", out: "When someone says “growth”, ask: growth of which stock, and from which flow?" },
              { name: "Pay attention to what is important, not just what is quantifiable", trap: "Numbers get attention because they can be counted. Quality, trust and morale matter as much, and a model that leaves them out is wrong in a predictable direction.", out: "List what matters that your dashboard doesn't show." },
              { name: "Make feedback policies for feedback systems", trap: "In a changing system, a fixed rule soon goes out of date. Better policies adjust to the state of the system, like a fee that rises as a resource gets scarce.", out: "Tie a policy to a measure of the system rather than to a fixed number or date." },
              { name: "Go for the good of the whole", trap: "Don't optimize one part at the expense of the system it serves. Aim for the properties of the whole: resilience, self-organization, a healthy hierarchy.", out: "Before improving a team's metric, check what it costs the teams around it." },
              { name: "Listen to the wisdom of the system", trap: "Before intervening, find out what already works and how the system sustains itself. Help it do that rather than overriding it.", out: "Ask the people inside what they already do that works, and support it." },
              { name: "Locate responsibility in the system", trap: "Look for the ways a system creates its own behavior before blaming outside events, and design systems in which decision-makers feel the consequences of their decisions.", out: "Find a decision whose costs land on someone else, and route the feedback back." },
              { name: "Stay humble, stay a learner", trap: "Systems surprise everyone. Act in small steps, watch what happens, and admit mistakes quickly so they can be corrected.", out: "Run the next change as an experiment, with a way to tell whether it worked." },
              { name: "Celebrate complexity", trap: "The world is nonlinear, diverse and changing. Expect that, and value the variety that makes systems resilient instead of forcing everything into tidy order.", out: "Distrust the simplest story when the evidence doesn't fit it." },
              { name: "Expand time horizons", trap: "Short horizons are why so many fixes backfire. Watch the long term and the short term together, as a walker on a rough path watches both the next step and the way ahead.", out: "Ask what the decision looks like in five years, not just this quarter." },
              { name: "Defy the disciplines", trap: "Systems don't respect academic or departmental boundaries. Follow the problem wherever it leads, and learn enough of other fields to talk with their experts.", out: "Bring someone from outside your function into the next diagnosis." },
              { name: "Expand the boundary of caring", trap: "Because everything is connected, the success of one part depends on the rest: other people, other places, and the generations to come.", out: "Name who else a decision affects, and how you would know if it hurt them." },
              { name: "Don't erode the goal of goodness", trap: "Drift to low performance works on standards of behavior too. Hold to high standards, and let good examples set the bar rather than bad news.", out: "Notice when “everyone does it” is lowering a standard you hold." }
            ]
          },
          {
            type: "prose",
            sections: [
              {
                n: "2",
                title: "Put the book to work",
                paras: [
                  "The workbench below runs most of the book's tools in order: behavior before structure, then stocks and flows, a feedback loop, a delay, and finally a place to push. Try it on a problem that keeps coming back, the kind that has survived several fixes. The structure usually shows why the fixes didn't hold."
                ],
                side: {
                  label: "Start from the graph",
                  html: "<p>Step 1 is the hardest. If you can only describe an event, look for the history first: the first habit is to get the beat of the system.</p>"
                }
              }
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
          },
          {
            type: "prose",
            sections: [
              {
                n: "3",
                title: "The book in one loop",
                paras: [
                  "If the book has one lesson, it's that behavior comes from structure. The same structure produces the same behavior, whoever is inside it, so lasting change comes from changing the structure: the information people see, the rules they follow and the goals they serve.",
                  "That's a hopeful conclusion. Structures were built by people, and people can rebuild them."
                ],
                side: {
                  label: "See also",
                  html: "<p>The <a href=\"@traps\">system traps</a> and the <a href=\"@leverage-points\">leverage points</a> are the two chapters to return to when a sketch shows a structure you want to change.</p>"
                }
              }
            ]
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
