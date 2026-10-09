// Good Strategy Bad Strategy (Richard P. Rumelt, 2011).
// Summaries are paraphrased; keep quotations short and attributed.
// Links between pages in content HTML use href="@page-slug" ("@" alone is the book home).
(function () {
  "use strict";

  // Shared by the hallmarks table and the spot-the-bad-strategy exercise.
  const HALLMARKS = [
    {
      id: "fluff",
      name: "Fluff",
      short: "Fluff",
      def: "Grand language wrapped around the obvious. Buzzwords and abstractions make a plan sound deep while it says very little.",
      sounds: "“We will deliver synergistic, customer-centric value across our ecosystem.”",
      tell: "Rewrite it in plain words. If what's left is obvious or empty, it was fluff."
    },
    {
      id: "face",
      name: "Failure to face the challenge",
      short: "Dodges the challenge",
      def: "Never saying what the problem is. If the challenge isn't named, there's no way to judge whether the strategy deals with it.",
      sounds: "“We will continue to execute on our priorities in a dynamic environment.”",
      tell: "Ask what, exactly, is in the way. If the document never says, it hasn't faced it."
    },
    {
      id: "goals",
      name: "Mistaking goals for strategy",
      short: "Goal, not strategy",
      def: "Stating what you want as if wanting it were a plan. Ambitions and performance targets with no account of how to reach them.",
      sounds: "“Grow revenue 20% a year and reach a 30% operating margin.”",
      tell: "Ask “how?” If the answer is another goal, there's no strategy yet."
    },
    {
      id: "objectives",
      name: "Bad strategic objectives",
      short: "Bad objective",
      def: "Objectives that don't help. Either a long list of unrelated to-dos, which Rumelt calls a “dog's dinner,” or “blue-sky” objectives no easier than the original problem.",
      sounds: "“Our seven strategic pillars are…” or “Reinvent the industry.”",
      tell: "Could someone start on it Monday? Do the items depend on each other, or just sit side by side?"
    }
  ];

  // The two panels of the Wal-Mart figure on the discovering-power page, each 300 × 290.
  // A schematic, not a map: the store counts are illustrative.
  const CHAIN_PANEL = `
    <text class="sv-k" x="10" y="18">A NATIONAL CHAIN</text>
    <path class="sv-line sv-dash" d="M31 240 L150 70"/>
    <path class="sv-line sv-dash" d="M31 240 L250 140"/>
    <path class="sv-line sv-dash" d="M31 240 L110 160"/>
    <path class="sv-line sv-dash" d="M31 240 L240 240"/>
    <circle class="sv-dot" cx="60" cy="90" r="3.5"/>
    <circle class="sv-dot" cx="205" cy="100" r="3.5"/>
    <circle class="sv-dot" cx="175" cy="200" r="3.5"/>
    <circle class="sv-dot" cx="80" cy="215" r="3.5"/>
    <circle class="sv-dot" cx="275" cy="60" r="3.5"/>
    <circle class="sv-dot" cx="40" cy="130" r="3.5"/>
    <circle class="sv-dot" cx="140" cy="250" r="3.5"/>
    <circle class="sv-dot" cx="285" cy="195" r="3.5"/>
    <rect class="sv-box-ink" x="143" y="63" width="14" height="14"/>
    <rect class="sv-box-ink" x="243" y="133" width="14" height="14"/>
    <rect class="sv-box-ink" x="103" y="153" width="14" height="14"/>
    <rect class="sv-box-ink" x="233" y="233" width="14" height="14"/>
    <rect class="sv-box" x="12" y="229" width="38" height="22" rx="2"/>
    <text class="sv-k" x="31" y="244" text-anchor="middle">WH</text>
    <text class="sv-t2" x="150" y="284" text-anchor="middle">Big-city stores, supplied from afar</text>
    <g class="sv-call"><circle cx="205" cy="178" r="9"/><text x="205" y="181.5" text-anchor="middle">1</text></g>
    <g class="sv-call"><circle cx="258" cy="84" r="9"/><text x="258" y="87.5" text-anchor="middle">2</text></g>`;
  const NETWORK_PANEL = `
    <text class="sv-k" x="10" y="18">WAL-MART</text>
    <circle class="sv-line sv-dash" cx="150" cy="155" r="112"/>
    <path class="sv-line" d="M150 155 L150 72"/>
    <path class="sv-line" d="M150 155 L212 92"/>
    <path class="sv-line" d="M150 155 L238 152"/>
    <path class="sv-line" d="M150 155 L212 222"/>
    <path class="sv-line" d="M150 155 L150 242"/>
    <path class="sv-line" d="M150 155 L86 218"/>
    <path class="sv-line" d="M150 155 L62 154"/>
    <path class="sv-line" d="M150 155 L90 92"/>
    <path class="sv-line" d="M150 155 L190 124"/>
    <path class="sv-line" d="M150 155 L112 188"/>
    <circle class="sv-dot-pen" cx="150" cy="72" r="5.5"/>
    <circle class="sv-dot-pen" cx="212" cy="92" r="5.5"/>
    <circle class="sv-dot-pen" cx="238" cy="152" r="5.5"/>
    <circle class="sv-dot-pen" cx="212" cy="222" r="5.5"/>
    <circle class="sv-dot-pen" cx="150" cy="242" r="5.5"/>
    <circle class="sv-dot-pen" cx="86" cy="218" r="5.5"/>
    <circle class="sv-dot-pen" cx="62" cy="154" r="5.5"/>
    <circle class="sv-dot-pen" cx="90" cy="92" r="5.5"/>
    <circle class="sv-dot-pen" cx="190" cy="124" r="5.5"/>
    <circle class="sv-dot-pen" cx="112" cy="188" r="5.5"/>
    <rect class="sv-box-pen" x="131" y="143" width="38" height="24" rx="2"/>
    <text class="sv-k" x="150" y="159" text-anchor="middle">DC</text>
    <text class="sv-t2" x="150" y="284" text-anchor="middle">Small-town stores around its own warehouse</text>
    <g class="sv-call"><circle cx="183" cy="168" r="9"/><text x="183" y="171.5" text-anchor="middle">3</text></g>
    <g class="sv-call"><circle cx="55" cy="213" r="9"/><text x="55" y="216.5" text-anchor="middle">4</text></g>`;

  window.Marginalia.addBook({
    id: "gsbs",
    title: "Good Strategy Bad Strategy",
    author: "Richard P. Rumelt",
    year: 2011,
    status: "open",
    cover: "gsbs",
    subtitle: "The difference and why it matters",
    thesis:
      "Most of what passes for strategy is a list of goals written in confident language. " +
      "Rumelt argues that a real strategy has three parts: an honest diagnosis of the challenge, " +
      "an approach that rules things out, and actions that reinforce one another.",
    citation:
      "Summaries on this page are written in our own words from Richard P. Rumelt, <cite>Good Strategy Bad Strategy</cite> (Crown Business, 2011). Read the book for the full argument.",
    hero: { lines: ["Good Strategy", "Bad Strategy"], art: "contours" },
    entries: [
      { kicker: "Start here", title: "The kernel", desc: "The three-part structure under every good strategy.", page: "kernel" },
      { kicker: "Workbench", title: "Build a kernel", desc: "Write a strategy and check it against Rumelt's tests.", page: "builder" }
    ],
    mapNote: "Pages open as they're written. Start with the kernel or with bad strategy.",
    casesTitle: "The stories Rumelt uses",
    nav: ["bad-strategy", "kernel", "builder"],

    parts: [
      {
        n: "I",
        title: "Good and bad strategy",
        chapters: [
          { n: 1, title: "Good strategy is unexpected", blurb: "Few organizations have a real strategy, so one that does catches rivals off guard." },
          { n: 2, title: "Discovering power", blurb: "Good strategy puts strength against weakness, and finds power in coherence itself.", page: "discovering-power" },
          { n: 3, title: "Bad strategy", blurb: "Fluff, failure to face the challenge, mistaking goals for strategy, and bad strategic objectives.", page: "bad-strategy" },
          { n: 4, title: "Why so much bad strategy?", blurb: "Choosing is hard. Templates and positive thinking offer ways to avoid it.", page: "why-bad-strategy" },
          { n: 5, title: "The kernel of good strategy", blurb: "Diagnosis, guiding policy and coherent action.", page: "kernel" }
        ]
      },
      {
        n: "II",
        title: "Sources of power",
        chapters: [
          { n: 6, title: "Using leverage", blurb: "Anticipation, pivot points and concentration: where a little effort moves a lot.", page: "using-leverage" },
          { n: 7, title: "Proximate objectives", blurb: "Targets close enough to reach, which turn a vague aspiration into a solvable problem.", page: "proximate-objectives" },
          { n: 8, title: "Chain-link systems", blurb: "When every link matters, improving one does nothing until the weakest is fixed.", page: "chain-link" },
          { n: 9, title: "Using design", blurb: "Fitting resources and actions together so tightly that they work as one.", page: "using-design" },
          { n: 10, title: "Focus", blurb: "Coordinating policies so they hit one segment with unusual force.", page: "focus" },
          { n: 11, title: "Growth", blurb: "Why growth pursued for its own sake destroys value, and what healthy growth looks like.", page: "growth" },
          { n: 12, title: "Using advantage", blurb: "What an advantage really is, and how to deepen and widen one.", page: "using-advantage" },
          { n: 13, title: "Using dynamics", blurb: "Spotting waves of change early and riding them.", page: "using-dynamics" },
          { n: 14, title: "Inertia and entropy", blurb: "Organizations resist change and drift into disorder. Both create openings.", page: "inertia-entropy" },
          { n: 15, title: "Putting it together", blurb: "Nvidia's rise, worked through as one long example." }
        ]
      },
      {
        n: "III",
        title: "Thinking like a strategist",
        chapters: [
          { n: 16, title: "The science of strategy", blurb: "A strategy is a hypothesis. Your edge is what you know that others don't.", page: "science-of-strategy" },
          { n: 17, title: "Using your head", blurb: "Habits for thinking past the first idea that comes to mind." },
          { n: 18, title: "Keeping your head", blurb: "Holding on to your own judgment when everyone around you agrees." }
        ]
      }
    ],

    cases: [
      { era: "216 BC", title: "Hannibal at Cannae", blurb: "A smaller army encircles a larger Roman one by anticipating exactly how it will attack.", tag: "Using design", page: "using-design" },
      { era: "1960s", title: "Surveyor and the Moon", blurb: "Designing a lunar lander became solvable once engineers pinned down what the surface was like.", tag: "Proximate objectives", page: "proximate-objectives" },
      { era: "1960s–80s", title: "Crown Cork & Seal", blurb: "A small can maker outperforms its giant rivals by aiming every policy at hard-to-make cans and the customers who need them.", tag: "Focus", page: "focus" },
      { era: "1960s–80s", title: "Wal-Mart's small towns", blurb: "A discount chain grows by filling towns its bigger rivals ignore, with stores clustered around its own warehouses.", tag: "Discovering power", page: "discovering-power" },
      { era: "1970s", title: "Competing with the Soviets", blurb: "Pentagon strategists look for ways to play American strengths against Soviet weaknesses instead of matching weapon for weapon.", tag: "Discovering power", page: "discovering-power" },
      { era: "1991", title: "Desert Storm", blurb: "The coalition avoids Iraq's prepared defenses with a wide swing through the western desert.", tag: "The kernel", page: "kernel" },
      { era: "1997", title: "Apple's turnaround", blurb: "Steve Jobs returns and cuts a sprawling product line down to four.", tag: "The kernel", page: "kernel" },
      { era: "1993–2010", title: "Nvidia", blurb: "A graphics-chip maker rides a wave of change in computing, step by step.", tag: "Putting it together" }
    ],

    pages: {
      // A reference page with one exercise kept. The four hallmarks, "dog's dinner" and
      // "blue-sky" objectives follow Chapter 3 as I remember it. The chief executive whose
      // strategy was a pair of targets is Rumelt's "20/20" story (20% growth, 20% margin),
      // remembered and unchecked against his wording. The repair table is our summary.
      "bad-strategy": {
        title: "Bad strategy",
        eyebrow: "Part I · Chapter 03",
        layout: "dense",
        dek:
          "Bad strategy is more than a missing strategy. It is a recognizable set of habits that sound strategic while skipping the hard part: " +
          "naming the problem and choosing what to do about it. Rumelt names four hallmarks.",
        blocks: [
          {
            type: "brief",
            eyebrow: "In brief",
            title: "The argument in six points",
            points: [
              {
                t: "Bad strategy isn't just a missing strategy.",
                d: "It is an active mistake with habits of its own, and it can fill a document that looks complete and confident."
              },
              {
                t: "Its core failure is skipping the problem.",
                d: "Bad strategy avoids the two things that make a strategy useful: naming the obstacle and choosing what to do about it."
              },
              {
                t: "It has four hallmarks.",
                d: "Fluff, failure to face the challenge, mistaking goals for strategy, and bad strategic objectives. Any one is a warning; most bad strategies show several."
              },
              {
                t: "A target is not a plan.",
                d: "A goal says where you want to end up. A strategy says how you'll get past what's in the way. Rumelt tells of a chief executive whose whole strategy was a growth target and a margin target."
              },
              {
                t: "Long lists hide the absence of choice.",
                d: "A “dog's dinner” of unrelated objectives, or a “blue-sky” objective as hard as the problem itself, gives people nothing they can start on."
              },
              {
                t: "Each hallmark is a missing piece of the kernel.",
                d: "A diagnosis, a guiding policy and coherent actions. Name which one is missing and you know what to write next. See <a href=\"@kernel\">the kernel</a>."
              }
            ]
          },
          {
            type: "table",
            eyebrow: "Reference",
            title: "The four hallmarks",
            intro: "Definitions in our words, with a made-up line that shows each one and a quick test for it.",
            columns: ["", "What it is", "Sounds like", "How to spot it"],
            widths: ["11rem", null, null, null],
            rows: HALLMARKS.map((h) => [`<span class="hl hl-${h.id}">${h.name}</span>`, h.def, `<em>${h.sounds}</em>`, h.tell])
          },
          {
            type: "spot-exercise",
            title: "Spot the bad strategy",
            intro:
              "Pick a highlighter, then tap each sentence that shows that hallmark. Leave a sentence unmarked if it's fine. When you're done, check your answers. The organizations are invented for practice.",
            labels: HALLMARKS,
            exercises: [
              {
                id: "hospital",
                label: "A hospital's plan",
                source: "Strategic plan · Northfield Regional Health",
                hint: "Every hallmark appears at least once in this one.",
                paras: [
                  [
                    { t: "Our vision is to be the region's most trusted healthcare partner.", h: "goals", note: "An aspiration. It says where the hospital wants to be, not how it will get there." },
                    { t: "We operate in a rapidly evolving healthcare landscape.", h: "face", note: "Any hospital could say this. It gestures at change but never names the specific problem this hospital faces." }
                  ],
                  [
                    { t: "Over the next three years we will grow patient volume by 15%, raise satisfaction scores into the top decile, and reach a 4% operating margin.", h: "goals", note: "Three performance targets. Useful for measuring progress, but none says what the hospital will do differently." },
                    { t: "To get there, we will leverage our integrated care ecosystem to deliver seamless, patient-centered experiences.", h: "fluff", note: "It sounds like a method. In plain words it says “we will treat patients well using what we already have.”" }
                  ],
                  [
                    { t: "Our six strategic priorities are digital transformation, workforce engagement, community partnerships, facility modernization, research excellence and cost discipline.", h: "objectives", note: "A dog's dinner: six unrelated areas, with nothing about which matters most or how they connect." },
                    { t: "This plan was shaped by more than 200 staff, physicians and community members.", note: "Context, not a hallmark. Who helped write a plan says nothing about whether it is a strategy." }
                  ]
                ]
              },
              {
                id: "software",
                label: "A CEO's memo",
                source: "All-hands memo · Lumen Software",
                hint: "Watch for the sentence that gets close to the real problem and then turns away.",
                paras: [
                  [
                    { t: "Team, last year was tough." },
                    { t: "Competitors shipped faster than we expected, but we still have the best people in the industry.", h: "face", note: "The memo touches the real problem, then swerves to reassurance. Why were competitors faster? What did they do that Lumen couldn't?" }
                  ],
                  [
                    { t: "This year, we are going to win.", h: "goals", note: "Every company wants to win. Saying so is not a plan." },
                    { t: "Winning means becoming the #1 platform for mid-market teams.", h: "goals", note: "A more specific goal, but still a goal. Nothing yet about how." }
                  ],
                  [
                    { t: "Our strategy is simple: relentless customer obsession, delivered through operational excellence and a culture of innovation.", h: "fluff", note: "Labeled as the strategy, but it is three abstractions any company could claim. There is no choice in it." },
                    { t: "Our north star for the year is to reinvent how work gets done.", h: "objectives", note: "Blue-sky: an objective at least as hard as the original problem. Nobody can start on it Monday." }
                  ],
                  [{ t: "Let's go make it happen!" }]
                ]
              },
              {
                id: "bakery",
                label: "A bakery's plan",
                source: "Plan for next year · Harbor Street Bakery",
                hint: "This one is mostly a real strategy. Part of the skill is not over-marking.",
                paras: [
                  [
                    { t: "Wholesale orders bring in 60% of our revenue but barely break even, because each café wants its own custom items and a delivery every morning.", note: "A real diagnosis. It names the obstacle and says why it is hard." },
                    { t: "We will stop competing on variety.", note: "A guiding policy. It rules something out." }
                  ],
                  [
                    { t: "Wholesale customers will order from a fixed list of twelve items, and deliveries move to three set days a week.", note: "Actions that carry out the policy." },
                    { t: "Cafés that need daily delivery can still have it, for a surcharge.", note: "Another action, and it keeps the policy from driving away the best accounts." },
                    { t: "The two early shifts this frees up move to the retail counter, which earns about three times the margin.", note: "Resources moved toward the stronger part of the business. This is what focus looks like." }
                  ],
                  [
                    { t: "We also aim to be the best-loved bakery in the city.", h: "goals", note: "The one goal riding along. Harmless here, because the rest of the plan does the strategic work." }
                  ]
                ]
              }
            ]
          },
          {
            type: "table",
            eyebrow: "Repair",
            title: "What each hallmark is missing, and how to fix it",
            intro: "Our summary, read against the <a href=\"@kernel\">kernel</a>.",
            columns: ["Hallmark", "What's missing", "The repair"],
            widths: ["11rem", null, null],
            rows: [
              ["Fluff", "Plain words, and usually a diagnosis behind them", "Rewrite it in plain language. If what's left is obvious, start on the diagnosis: what is actually hard here?"],
              ["Failure to face the challenge", "The diagnosis", "Name the obstacle specifically enough that a reasonable person could disagree with you."],
              ["Mistaking goals for strategy", "The guiding policy and the actions", "Keep the goal, then ask what stands in the way of it and what approach gets past that."],
              ["Bad strategic objectives", "Focus, and objectives close enough to act on", "Keep the few objectives that address the diagnosis, and bring each one within reach. See <a href=\"@proximate-objectives\">proximate objectives</a>."]
            ]
          }
        ],
        end: {
          related: [
            { title: "Why so much bad strategy?", where: "Chapter 4", page: "why-bad-strategy" },
            { title: "The kernel of good strategy", where: "Chapter 5", page: "kernel" },
            { title: "Proximate objectives", where: "Chapter 7", page: "proximate-objectives" },
            { title: "Focus", where: "Chapter 10", page: "focus" }
          ],
          cta: { page: "builder", kicker: "Workbench", text: "Write a strategy that passes" }
        }
      },

      // A reference page around the kernel figure. The three parts, the doctor analogy and the
      // four ways a guiding policy draws on advantage (anticipation, reducing complexity,
      // leverage, coherence) follow Chapter 5 as I remember it, unchecked against his wording.
      // The Desert Storm and Apple cases come from Chapter 1. The tables are our summary.
      kernel: {
        title: "The kernel",
        eyebrow: "Part I · Chapter 05",
        layout: "dense",
        dek:
          "Strip any good strategy down and you find three parts: a diagnosis of the challenge, " +
          "a guiding policy for dealing with it, and a set of coherent actions that carry the policy out.",
        blocks: [
          {
            type: "brief",
            eyebrow: "In brief",
            title: "The argument in six points",
            points: [
              {
                t: "Every good strategy has a kernel.",
                d: "Strip away the detail and three parts remain: a diagnosis, a guiding policy and coherent actions."
              },
              {
                t: "The diagnosis names the challenge.",
                d: "Out of a situation too complicated to grasp at once, it picks what matters and says why it's hard. It is a judgment and can be wrong, so treat it as a hypothesis, stated plainly enough that events can test it."
              },
              {
                t: "The guiding policy is an approach, not a goal.",
                d: "It works like a guardrail. By ruling out many possible moves, it points effort in one direction without spelling out every step."
              },
              {
                t: "A policy earns its place by creating advantage.",
                d: "It anticipates how others will act, simplifies a confusing situation, concentrates effort on a pivot point, or makes separate actions reinforce one another."
              },
              {
                t: "Actions make it a strategy.",
                d: "A diagnosis and a policy with nothing behind them is commentary. The actions commit money, people and attention."
              },
              {
                t: "Coherent means coordinated.",
                d: "Each action supports the others and none pulls against the policy. Concentrating resources means taking them from somewhere else, so someone always loses something they cared about."
              }
            ]
          },
          {
            type: "kernel-figure",
            caption: "The general form, then two cases from the book in the same three parts. Case summaries are paraphrased.",
            steps: [
              { key: "diagnosis", title: "Diagnosis", question: "What is going on here?" },
              { key: "policy", title: "Guiding policy", question: "How will we deal with it?" },
              { key: "actions", title: "Coherent actions", question: "What will we do?" }
            ],
            views: [
              {
                id: "general",
                label: "In general",
                diagnosis: "Names the challenge. Out of everything going on, it picks the few things that matter most and explains why the situation is hard.",
                policy: "The overall approach to that challenge. It rules out many possible moves so that effort points in one direction.",
                actions: [
                  "Concrete steps, commitments of resources and policies that carry out the approach.",
                  "Each one supports the others. None pulls against the policy."
                ]
              },
              {
                id: "desertstorm",
                label: "Desert Storm, 1991",
                diagnosis: "Iraqi forces are dug in along the Kuwaiti border, expecting an attack from the south. A frontal assault into prepared defenses would be slow and costly.",
                policy: "Don't attack where the defenses are. Keep Iraqi attention on the coast and the border while the main force goes around them through the desert.",
                actions: [
                  "Weeks of air attacks on command, communications and supply.",
                  "Marines and an amphibious force positioned to look like the main threat.",
                  "Hundreds of thousands of troops moved west, unseen, before the ground war.",
                  "A wide swing north and east into the Iraqi flank: the “left hook.”"
                ]
              },
              {
                id: "apple",
                label: "Apple, 1997",
                diagnosis: "Apple is close to running out of cash. Its product line has sprawled into dozens of overlapping models that confuse buyers and split engineering effort.",
                policy: "Shrink to a few products good enough to justify their price, and stop doing everything else.",
                actions: [
                  "Fifteen desktop models cut to one, and the portable line cut to one.",
                  "What remains organized into a simple grid: consumer and pro, desktop and portable.",
                  "Printers and peripherals dropped; engineering and software projects cut back.",
                  "Most retailers dropped, manufacturing moved to an outside contractor, an online store opened."
                ]
              }
            ]
          },
          {
            type: "table",
            eyebrow: "Reference",
            title: "The three parts at a glance",
            columns: ["", "Diagnosis", "Guiding policy", "Coherent actions"],
            widths: ["9rem", null, null, null],
            rows: [
              ["The question", "What's going on here?", "How will we deal with it?", "What will we do?"],
              ["What it does", "Names the challenge, and reframes the situation so that some actions look clearly better than others", "Sets an overall approach that rules many possible moves out", "Commits money, people and attention, and changes how things are done"],
              ["A good one", "Is specific enough that someone could disagree with it", "Makes some reasonable-sounding option off-limits", "Has each step making the others more effective"],
              ["A weak one", "Restates the goals, or blames “a challenging environment” in general terms", "Is a goal or a vision in disguise", "Is a list of unrelated initiatives: a “dog's dinner”"],
              ["In a doctor's terms", "Naming the condition from the symptoms", "Choosing the approach to treatment", "The specific treatments, given together and in order"]
            ]
          },
          {
            type: "table",
            eyebrow: "The guiding policy",
            title: "Four ways a guiding policy creates advantage",
            intro: "A policy that doesn't draw on one of these is probably a goal in disguise.",
            columns: ["Source", "What it means", "Example"],
            widths: ["9rem", null, null],
            rows: [
              ["Anticipation", "Predicting how rivals, customers or others will act, and acting before they do", "Desert Storm: Iraq's defenses expected an attack from the south, so the main force went around them."],
              ["Simplification", "Cutting a complicated, ambiguous situation down to a few problems people can work on", "Apple in 1997: a confusing line of overlapping models became a grid of four."],
              ["Leverage", "Concentrating effort on the pivot point where it has the most effect", "<a href=\"@using-leverage\">Using leverage</a>, Chapter 6"],
              ["Coherence", "Designing actions and policies to reinforce each other", "<a href=\"@using-design\">Using design</a> and <a href=\"@chain-link\">chain-link systems</a>, Chapters 8 and 9"]
            ]
          },
          {
            type: "table",
            eyebrow: "Not in the kernel",
            title: "What the kernel leaves out",
            intro: "Rumelt doesn't say these are useless. He says they aren't strategy, and that confusing them with strategy is one of the most common ways organizations fool themselves.",
            columns: ["", "What it is", "Why it isn't strategy"],
            widths: ["10rem", null, null],
            rows: [
              ["Vision", "A picture of where the organization wants to be", "It says nothing about what stands in the way."],
              ["Mission", "What the organization is for", "It rarely rules anything out."],
              ["Values", "How people should behave", "Important, but not an answer to a particular challenge."],
              ["Financial targets", "“20% annual growth”, “a 30% margin”", "Goals. They describe an outcome, not how to reach it. See <a href=\"@bad-strategy\">bad strategy</a>."],
              ["A list of initiatives", "Everything each part of the organization wants to do", "No priority and no coordination: the opposite of coherent action."]
            ]
          }
        ],
        end: {
          related: [
            { title: "Bad strategy", where: "Chapter 3", page: "bad-strategy" },
            { title: "Proximate objectives", where: "Chapter 7", page: "proximate-objectives" },
            { title: "Chain-link systems", where: "Chapter 8", page: "chain-link" },
            { title: "Focus", where: "Chapter 10", page: "focus" }
          ],
          cta: { page: "builder", kicker: "Workbench", text: "Try the kernel on your own problem" }
        }
      },

      // A reference page. The unwillingness to choose, template-style strategy and New Thought
      // follow Chapter 4 as I remember it. The Digital Equipment Corporation meeting (early
      // 1990s; one executive for chips, one for boxes, one for solutions; every option beaten
      // by another; a compromise statement that chose none) is Rumelt's story as I remember
      // it; the rankings in the table are ours, chosen to reproduce the cycle he describes.
      // DEC's sale to Compaq in 1998 is public record. The last table is our summary.
      "why-bad-strategy": {
        title: "Why so much bad strategy?",
        navLabel: "Why so much bad strategy",
        eyebrow: "Part I · Chapter 04",
        layout: "dense",
        dek:
          "If bad strategy is so easy to spot, why is it everywhere? Rumelt's answer: good strategy demands choices, and choosing is painful. Templates and relentless positive thinking offer ways to avoid it.",
        blocks: [
          {
            type: "brief",
            eyebrow: "In brief",
            title: "The argument in six points",
            points: [
              {
                t: "Choosing is the hard part.",
                d: "Every real strategy says no to something: a market, a product, a project with a powerful sponsor. Saying no disappoints people who can make life hard for you."
              },
              {
                t: "Capable organizations avoid it too.",
                d: "It is a failure of will, not of intelligence. The more capable people have something to protect, the stronger the pull toward a plan that keeps everyone's priorities."
              },
              {
                t: "A group can circle instead of choosing.",
                d: "Rumelt's account of a meeting at Digital Equipment Corporation: three executives, three directions, and every option beaten by another. The group settled on words that committed to none of them."
              },
              {
                t: "Templates offer a way out.",
                d: "Fill in a vision, a mission, values and goals, and you have something that looks finished without a single hard choice in it."
              },
              {
                t: "So does relentless positive thinking.",
                d: "The New Thought movement of around 1900 held that thinking about success brings it about. Where doubt counts as disloyalty, nobody names the problem."
              },
              {
                t: "The result has nothing to work on.",
                d: "Without a named challenge there's no <a href=\"@kernel\">diagnosis</a>, and without a choice there's no guiding policy."
              }
            ]
          },
          {
            type: "figure",
            eyebrow: "Figure",
            title: "Why the group couldn't choose",
            intro: "DEC's three options, and which one a majority preferred in each pair, using the rankings in the table below.",
            alt: "Three boxes in a triangle: Chips, Boxes and Solutions. Arrows run from Chips to Boxes, from Boxes to Solutions and from Solutions back to Chips, each marked 2 to 1, meaning a majority prefers the first to the second. Each option loses to another.",
            svg: `<svg viewBox="0 0 420 285" xmlns="http://www.w3.org/2000/svg">
              <defs><marker id="gs-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path class="sv-head" d="M0 0 L10 5 L0 10 z"/></marker></defs>
              <path class="sv-line" d="M245 72 L327 212" marker-end="url(#gs-arr)"/>
              <path class="sv-line" d="M291 238 L131 238" marker-end="url(#gs-arr)"/>
              <path class="sv-line" d="M93 214 L175 74" marker-end="url(#gs-arr)"/>
              <rect class="sv-box-pen" x="155" y="28" width="110" height="40" rx="4"/>
              <rect class="sv-box-pen" x="295" y="218" width="110" height="40" rx="4"/>
              <rect class="sv-box-pen" x="15" y="218" width="110" height="40" rx="4"/>
              <text class="sv-t sv-b" x="210" y="53" text-anchor="middle">Chips</text>
              <text class="sv-t sv-b" x="350" y="243" text-anchor="middle">Boxes</text>
              <text class="sv-t sv-b" x="70" y="243" text-anchor="middle">Solutions</text>
              <text class="sv-k" x="300" y="140">2 TO 1</text>
              <text class="sv-k" x="211" y="229" text-anchor="middle">2 TO 1</text>
              <text class="sv-k" x="120" y="140" text-anchor="end">2 TO 1</text>
              <text class="sv-t2" x="210" y="160" text-anchor="middle">Each option</text>
              <text class="sv-t2" x="210" y="176" text-anchor="middle">loses to another</text>
              <text class="sv-k" x="210" y="280" text-anchor="middle">AN ARROW POINTS FROM THE OPTION A MAJORITY PREFERS</text>
            </svg>`,
            notes: [
              {
                t: "Three executives, three directions.",
                d: "In Rumelt's account, one wanted DEC to focus on making chips, one on complete computers (“boxes”), and one on integrated solutions for customers."
              },
              {
                t: "Every pair has a majority.",
                d: "With rankings like those below, two of the three prefer chips to boxes, two prefer boxes to solutions, and two prefer solutions to chips."
              },
              {
                t: "So a vote has no winner.",
                d: "Whichever direction is picked, a majority prefers another. The group can circle indefinitely, or settle on a statement broad enough to include everything."
              },
              {
                t: "Someone has to choose.",
                d: "Consensus can't produce a strategy here. It takes a leader willing to decide and to disappoint the people who wanted something else. DEC was sold to Compaq in 1998."
              }
            ],
            caption: "Drawn by us from the rankings below."
          },
          {
            type: "table",
            eyebrow: "The rankings",
            title: "Three executives, three rankings",
            intro: "Illustrative rankings, ours, built to show the cycle Rumelt describes.",
            columns: ["", "First choice", "Second", "Third"],
            widths: ["12rem", null, null, null],
            rows: [
              ["The chips executive", "Chips", "Boxes", "Solutions"],
              ["The boxes executive", "Boxes", "Solutions", "Chips"],
              ["The solutions executive", "Solutions", "Chips", "Boxes"]
            ],
            foot: "Pair by pair: chips beat boxes with the chips and solutions executives; boxes beat solutions with the chips and boxes executives; solutions beat chips with the boxes and solutions executives."
          },
          {
            type: "table",
            eyebrow: "Two habits",
            title: "Two ways to avoid choosing",
            columns: ["", "Template-style strategy", "New Thought"],
            widths: ["9rem", null, null],
            rows: [
              ["What it is", "A fill-in-the-blanks format: a vision, a mission, values, then a list of goals called strategies", "The belief, from a movement around 1900 and its modern descendants, that picturing success brings it about"],
              ["Why it appeals", "It produces a finished-looking document and offends nobody", "It feels like leadership: confident, motivating, upbeat"],
              ["What it leaves out", "The challenge, and what will be done differently because of it", "Doubt and bad news, which is where a diagnosis starts"],
              ["The tell", "Swap in another organization's name and nothing breaks", "Questions about the plan are treated as a lack of commitment"]
            ]
          },
          {
            type: "table",
            eyebrow: "In practice",
            title: "Ways to force a choice",
            intro: "Our summary, drawing on the chapter and on <a href=\"@kernel\">the kernel</a>.",
            columns: ["Move", "Why it helps"],
            widths: ["14rem", null],
            rows: [
              ["Write the diagnosis first", "Agreeing on what's wrong narrows the options before anyone starts defending a favorite."],
              ["Say what's ruled out", "A plan that puts nothing off-limits hasn't chosen anything. Listing the exclusions makes the choice visible, and so does the cost."],
              ["Rank, don't list", "A ranked list forces the trade-offs an unranked list hides."],
              ["Give one person the decision", "As at DEC, a vote among favorites can circle. Someone has to decide, and accept that others will be disappointed."]
            ]
          }
        ],
        end: {
          related: [
            { title: "Bad strategy", where: "Chapter 3", page: "bad-strategy" },
            { title: "The kernel of good strategy", where: "Chapter 5", page: "kernel" },
            { title: "Using leverage", where: "Chapter 6", page: "using-leverage" },
            { title: "Keeping your head", where: "Chapter 18" }
          ],
          cta: { page: "builder", kicker: "Workbench", text: "Write one that makes a choice" }
        }
      },

      "science-of-strategy": {
        title: "Strategy as hypothesis",
        crumb: "Strategy as hypothesis",
        eyebrow: "Part III · Chapter 16",
        dek:
          "Rumelt argues that a good strategy is a hypothesis: an educated judgment about what will work, made under uncertainty and tested against what happens. Treating it that way changes how you write it and how you run it.",
        blocks: [
          {
            type: "prose",
            sections: [
              {
                n: "1",
                title: "A judgment, not a calculation",
                paras: [
                  "Strategy can't be derived from data alone, because it is about a future that hasn't happened yet. The best a strategist can do is form a well-reasoned hypothesis about what will work, act on it, and watch closely for evidence.",
                  "Rumelt draws the parallel with science. An idea is useful when it says something definite enough to be shown wrong, and the people running it are willing to notice when it is."
                ],
                side: {
                  label: "In practice",
                  html: "<p>Before you start, write down what would convince you the strategy is wrong.</p>"
                }
              },
              {
                n: "2",
                title: "Your edge is what you know",
                paras: [
                  "A strategic insight often comes from knowing something others don't: about customers, about a technology, about how a competitor really works. Rumelt treats that knowledge as a genuine source of advantage, and the strategy as a bet placed on it."
                ],
                side: {
                  label: "See also",
                  html: "<p>The hypothesis starts with the diagnosis in the <a href=\"@kernel\">kernel</a>.</p>"
                }
              }
            ]
          },
          {
            type: "sorter",
            title: "Hypothesis or article of faith?",
            intro:
              "Six statements from invented strategy documents. Could events show each one wrong? Articles of faith come with a testable rewrite.",
            options: [
              { id: "test", label: "A testable hypothesis", hint: "Events could show it wrong" },
              { id: "faith", label: "An article of faith", hint: "Nothing could disprove it" }
            ],
            rewriteLabel: "A testable version",
            items: [
              {
                text: "Customers will love our products if we just keep innovating.",
                answer: "faith",
                why: "There's no result that would count against it. If sales fall, the answer is always more innovation.",
                rewrite: "Commuters will pay 15% more for built-in theft tracking. If fewer than one buyer in ten chooses it by June, we're wrong."
              },
              {
                text: "Shops will stock more of our bikes if we cut delivery from two weeks to two days. We'll know by March from the reorder rate.",
                answer: "test",
                why: "A specific cause, a specific effect and a date. March will settle it."
              },
              {
                text: "Our people are our greatest asset.",
                answer: "faith",
                why: "A sentiment, not a claim about what will happen.",
                rewrite: "Giving each sales team one customer segment will halve our response time within a quarter."
              },
              {
                text: "If we stop selling through discount dealers, average order value will rise and total margin won't fall. We'll check after two quarters.",
                answer: "test",
                why: "It even names the risk (lower volume) and how it will be measured."
              },
              {
                text: "The market will come around to our vision.",
                answer: "faith",
                why: "No timeline and no sign of what “coming around” would look like.",
                rewrite: "Three of our five largest dealers will reorder within 60 days of the launch. If they don't, the message isn't landing."
              },
              {
                text: "Moving support in-house will cut customer churn from 8% to 5% within a year.",
                answer: "test",
                why: "A number now, a number later and a deadline."
              }
            ]
          }
        ],
        end: {
          related: [
            { title: "The kernel of good strategy", where: "Chapter 5", page: "kernel" },
            { title: "Proximate objectives", where: "Chapter 7", page: "proximate-objectives" },
            { title: "Using your head", where: "Chapter 17" },
            { title: "Keeping your head", where: "Chapter 18" }
          ],
          cta: { page: "builder", kicker: "Workbench", text: "Write your strategy as a hypothesis" }
        }
      },

      // A reference page. Anticipation, pivot points and concentration (with threshold
      // effects) follow Chapter 6 as I remember it, unchecked against his wording. The
      // threshold curve is our drawing of the idea; the tables are our summary.
      "using-leverage": {
        title: "Using leverage",
        eyebrow: "Part II · Chapter 06",
        layout: "dense",
        dek:
          "Leverage is getting a large result from a focused effort. Rumelt finds it in three places: anticipating what others will do, finding the pivot points where a small push has a large effect, and concentrating effort instead of spreading it.",
        blocks: [
          {
            type: "brief",
            eyebrow: "In brief",
            title: "The argument in six points",
            points: [
              {
                t: "Leverage is a large result from a focused effort.",
                d: "No organization has enough resources to push everywhere. Strategy is about finding the few places where pushing pays off most."
              },
              {
                t: "Anticipate.",
                d: "Much of the leverage comes from seeing what others will do, or what will happen anyway, before it happens, and putting resources where they'll be needed instead of reacting late."
              },
              {
                t: "Find the pivot point.",
                d: "A bottleneck, a customer whose choice others follow, an idea that changes how people see the situation: places where a small, well-aimed push has a large effect."
              },
              {
                t: "The diagnosis finds it.",
                d: "You can only aim at a pivot point once you understand which parts of the situation matter. That's what <a href=\"@kernel\">the diagnosis</a> is for."
              },
              {
                t: "Concentrate past the threshold.",
                d: "Many results appear only once effort passes a threshold. Spread across many targets, effort can leave every one of them just short, so nothing changes."
              },
              {
                t: "So choosing what not to do is part of the work.",
                d: "A strategy that tries to do everything usually changes nothing. Concentration means some good ideas get no resources at all."
              }
            ]
          },
          {
            type: "figure",
            eyebrow: "Figure",
            title: "Why concentration beats spreading",
            intro: "How the result of one initiative often grows with the effort put behind it.",
            alt: "A chart with effort on one target along the bottom and the result up the side. An S-shaped curve stays flat near zero until a dashed threshold line, rises steeply just past it, then levels off. A point marked Spread sits on the flat part below the threshold; a point marked Concentrated sits high on the curve past it.",
            svg: `<svg viewBox="0 0 450 300" xmlns="http://www.w3.org/2000/svg">
              <path class="sv-axis" d="M60 20 V250 H425"/>
              <text class="sv-t2" transform="translate(30 140) rotate(-90)" text-anchor="middle">Result</text>
              <text class="sv-t2" x="242" y="282" text-anchor="middle">Effort on one target</text>
              <path class="sv-line sv-dash" d="M190 30 V250"/>
              <text class="sv-k" x="196" y="38">THRESHOLD</text>
              <path class="sv-curve" d="M62 247 C130 247 160 244 185 225 C215 200 225 110 265 85 C300 64 360 58 420 56"/>
              <circle class="sv-dot" cx="120" cy="246" r="5.5"/>
              <text class="sv-k" x="120" y="232" text-anchor="middle">SPREAD</text>
              <circle class="sv-dot-pen" cx="300" cy="66" r="6"/>
              <text class="sv-k" x="300" y="50" text-anchor="middle">CONCENTRATED</text>
              <g class="sv-call"><circle cx="128" cy="205" r="9"/><text x="128" y="208.5" text-anchor="middle">1</text></g>
              <g class="sv-call"><circle cx="248" cy="160" r="9"/><text x="248" y="163.5" text-anchor="middle">2</text></g>
              <g class="sv-call"><circle cx="380" cy="84" r="9"/><text x="380" y="87.5" text-anchor="middle">3</text></g>
            </svg>`,
            notes: [
              {
                t: "Below the threshold, little happens.",
                d: "A product that's nearly good enough doesn't sell, and a campaign that nearly reaches people isn't noticed. Effort spread thin lands here, on every target at once."
              },
              {
                t: "Just past it, results climb fast.",
                d: "This is where concentrated effort lands. The same total effort, put behind fewer targets, gets some of them across."
              },
              {
                t: "Then the gains level off.",
                d: "Past a point, more effort adds little. Concentration means enough, not everything, on each chosen target."
              }
            ],
            caption: "Our drawing of the idea. The shape varies from case to case; the threshold is what matters."
          },
          {
            type: "table",
            eyebrow: "Reference",
            title: "Three sources of leverage",
            columns: ["", "What it is", "Where to look", "How it goes wrong"],
            widths: ["9rem", null, null, null],
            rows: [
              ["Anticipation", "Seeing what others will do, or what will happen anyway, before it happens", "Rivals' habits and constraints; shifts in demand, costs or rules already under way", "Assuming rivals will stand still, or that a trend will run forever"],
              ["Pivot points", "A place where a small, well-aimed push has a large effect", "Bottlenecks, customers whose choices others follow, ideas that reframe the situation", "Pushing on what's visible rather than what's pivotal"],
              ["Concentration", "Putting enough effort on a few targets to carry them past their thresholds", "Results that appear only once effort passes a level", "Spreading effort so that every target stays just short"]
            ]
          },
          {
            type: "table",
            eyebrow: "The temptation",
            title: "Why spreading feels safer than it is",
            intro: "Our summary.",
            columns: ["", "Spreading effort", "Concentrating it"],
            widths: ["10rem", null, null],
            rows: [
              ["Who's happy", "Every sponsor gets a share", "Some sponsors get nothing"],
              ["How it feels", "Prudent: no single bet can fail badly", "Exposed: a failed bet is plain to see"],
              ["What usually happens", "Every target stays short of its threshold, so little changes", "A few targets cross their thresholds and results appear"],
              ["What it needs", "A budget split", "A diagnosis that says which targets matter, and the will to say no to the rest"]
            ]
          }
        ],
        end: {
          related: [
            { title: "The kernel of good strategy", where: "Chapter 5", page: "kernel" },
            { title: "Proximate objectives", where: "Chapter 7", page: "proximate-objectives" },
            { title: "Focus", where: "Chapter 10", page: "focus" },
            { title: "Bad strategy", where: "Chapter 3", page: "bad-strategy" }
          ],
          cta: { page: "builder", kicker: "Workbench", text: "Write a strategy that concentrates" }
        }
      },

      // A reference page. Proximate objectives, the Surveyor story (Rumelt at JPL; a lander
      // specified for an assumed surface, firm with scattered rocks, like the desert
      // Southwest) and the idea that one level's proximate objective is the next level's
      // strategic problem follow Chapter 7 as I remember it, unchecked against his wording.
      // Kennedy's 1961 goal and Surveyor 1's soft landing in 1966 are public record; the
      // three-level ladder is our drawing. The objectives in the rewrite table are invented.
      "proximate-objectives": {
        title: "Proximate objectives",
        eyebrow: "Part II · Chapter 07",
        layout: "dense",
        dek:
          "A good strategy turns an overwhelming aspiration into objectives close enough to reach. A proximate objective is one the organization can reasonably be expected to hit, and hitting it makes the next step clearer.",
        blocks: [
          {
            type: "brief",
            eyebrow: "In brief",
            title: "The argument in six points",
            points: [
              {
                t: "Objectives should be close enough to act on.",
                d: "Leaders are told to set ambitious goals. Rumelt's point is that strategy has to produce objectives people can actually get to work on."
              },
              {
                t: "A proximate objective resolves ambiguity.",
                d: "It turns a fuzzy situation into a problem a team can solve, with a clear sign of being done, using what the organization knows and has."
              },
              {
                t: "Blue-sky objectives only restate the problem.",
                d: "An objective as hard as the original problem doesn't help. It's one of the <a href=\"@bad-strategy\">hallmarks of bad strategy</a>."
              },
              {
                t: "Surveyor: assume, then design.",
                d: "Engineers had to design a lunar lander before anyone knew what the Moon's surface was like. A specification that simply assumed a surface gave them a problem they could solve."
              },
              {
                t: "Objectives cascade.",
                d: "One level's proximate objective becomes the strategic problem for the level below, which needs its own diagnosis and policy."
              },
              {
                t: "The more uncertain, the closer in.",
                d: "When the ground is shifting, objectives need to be nearer, and the right one may be to learn something rather than to hit a number."
              }
            ]
          },
          {
            type: "figure",
            eyebrow: "Figure",
            title: "From aspiration to something engineers can design",
            intro: "The Surveyor story as a ladder of objectives. Each rung is a proximate objective for the level above and a hard problem for the level below.",
            alt: "Three stacked boxes joined by downward arrows. Top: the national goal, land people on the Moon and return them safely. Middle: NASA's step, soft-land robot spacecraft first and learn what the surface is like. Bottom: the lander specification, design for firm ground with scattered rocks. Each arrow is labelled: becomes the problem for.",
            svg: `<svg viewBox="0 0 460 330" xmlns="http://www.w3.org/2000/svg">
              <defs><marker id="gs-arr2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path class="sv-head" d="M0 0 L10 5 L0 10 z"/></marker></defs>
              <rect class="sv-box" x="20" y="16" width="420" height="62" rx="4"/>
              <text class="sv-k" x="36" y="38">THE GOAL · 1961</text>
              <text class="sv-t" x="36" y="62">Land people on the Moon and return them safely</text>
              <path class="sv-line" d="M230 78 L230 132" marker-end="url(#gs-arr2)"/>
              <text class="sv-k" x="240" y="110">BECOMES THE PROBLEM FOR</text>
              <rect class="sv-box" x="20" y="134" width="420" height="62" rx="4"/>
              <text class="sv-k" x="36" y="156">A STEP · SURVEYOR</text>
              <text class="sv-t" x="36" y="180">Soft-land a robot first and see the surface</text>
              <path class="sv-line" d="M230 196 L230 250" marker-end="url(#gs-arr2)"/>
              <text class="sv-k" x="240" y="228">BECOMES THE PROBLEM FOR</text>
              <rect class="sv-box-pen" x="20" y="252" width="420" height="62" rx="4"/>
              <text class="sv-k" x="36" y="274">THE SPECIFICATION</text>
              <text class="sv-t sv-b" x="36" y="298">Design for firm ground with scattered rocks</text>
              <g class="sv-call"><circle cx="420" cy="34" r="9"/><text x="420" y="37.5" text-anchor="middle">1</text></g>
              <g class="sv-call"><circle cx="420" cy="152" r="9"/><text x="420" y="155.5" text-anchor="middle">2</text></g>
              <g class="sv-call"><circle cx="420" cy="270" r="9"/><text x="420" y="273.5" text-anchor="middle">3</text></g>
            </svg>`,
            notes: [
              {
                t: "Too far away to design for.",
                d: "A national goal is a fine aspiration, but nobody can draw landing legs from it."
              },
              {
                t: "Closer, but still open.",
                d: "Landing a robot first is a sensible step, yet it leaves the hardest question unanswered: is the surface hard rock, or dust deep enough to swallow a spacecraft?"
              },
              {
                t: "An assumption makes it solvable.",
                d: "The specification simply assumed firm ground with scattered rocks, like the deserts of the American Southwest. It might have been wrong, but it gave engineers a problem they could solve, and said which assumption to revisit if it was."
              }
            ],
            caption: "Our drawing of the story Rumelt tells from his years at NASA's Jet Propulsion Laboratory. Surveyor 1 landed softly in 1966."
          },
          {
            type: "table",
            eyebrow: "Telling them apart",
            title: "Proximate or blue-sky",
            columns: ["", "Proximate objective", "Blue-sky objective"],
            widths: ["13rem", null, null],
            rows: [
              ["Can a team start on Monday?", "Yes. The first step is obvious", "No. The first step is the open question"],
              ["Will you know when it's done?", "Yes", "No, or only as a matter of opinion"],
              ["What it does to ambiguity", "Resolves enough of it to act", "Leaves all of it in place"],
              ["When things get less certain", "Moves closer in, or becomes something to learn", "Stays the same size"]
            ]
          },
          {
            type: "table",
            eyebrow: "Rewrites",
            title: "Bringing blue-sky objectives within reach",
            intro: "Invented examples.",
            columns: ["Blue-sky", "Why it doesn't help", "A proximate version"],
            rows: [
              ["Become the most innovative company in our industry", "It names a hope, not a problem anyone can work on. Nobody can tell what to do first, or when it's done.", "Put the redesigned checkout in front of 10% of customers by March and measure how many finish their order."],
              ["Win in Asia", "A destination, not a step. Every hard question stays open: which country, which customers, which product.", "Sign two distributors in Singapore this year and learn which of our three products sells there."],
              ["Delight customers at every touchpoint", "Pleasant, but it doesn't choose. Every touchpoint at once means none in particular.", "Answer every support email within four hours for the next quarter, then compare repeat purchases."],
              ["Transform our culture to be more agile", "As hard as the original problem, and nobody knows what done looks like.", "Cut the approval steps for small product changes from five to two, and track how long changes take."]
            ]
          }
        ],
        end: {
          related: [
            { title: "Bad strategy", where: "Chapter 3", page: "bad-strategy" },
            { title: "The kernel of good strategy", where: "Chapter 5", page: "kernel" },
            { title: "Using leverage", where: "Chapter 6", page: "using-leverage" },
            { title: "Chain-link systems", where: "Chapter 8", page: "chain-link" }
          ],
          cta: { page: "builder", kicker: "Workbench", text: "Turn an aspiration into actions" }
        }
      },

      // A reference page. Chain-link logic, "stuck" systems and why chain-link excellence is
      // hard to copy follow Chapter 8 as I remember it, unchecked against his wording. That
      // Rumelt uses General Motors' long effort to learn Toyota's methods (the NUMMI joint
      // venture, from 1984, is public record) is remembered and unchecked. The figure's
      // numbers are illustrative; the tables are our summary.
      "chain-link": {
        title: "Chain-link systems",
        eyebrow: "Part II · Chapter 08",
        layout: "dense",
        dek:
          "When a system's performance depends on its weakest part, improving any other part does nothing. That makes chain-link systems easy to get stuck in, and hard for rivals to copy once they work well.",
        blocks: [
          {
            type: "brief",
            eyebrow: "In brief",
            title: "The argument in six points",
            points: [
              {
                t: "In some systems the weakest part sets the result.",
                d: "In most systems the parts add up, so a better part makes the whole a little better. In a chain-link system, performance is set by the weakest link."
              },
              {
                t: "Improving anything else is wasted.",
                d: "Until the weakest link improves, effort spent on stronger ones doesn't show up in the result at all."
              },
              {
                t: "Chain-link systems get stuck.",
                d: "When several links are equally weak, no single improvement moves the result, so each one looks pointless and none gets made."
              },
              {
                t: "Getting unstuck takes coordination.",
                d: "Someone who sees the whole system, and has authority over it, has to improve several links at once."
              },
              {
                t: "Copying the parts isn't enough.",
                d: "Methods that work only together are hard to transplant one at a time. Rumelt points to General Motors' long struggle to bring Toyota's production methods into its own plants."
              },
              {
                t: "Excellence that works is hard to copy.",
                d: "A rival has to match every link to match the result. That makes a chain-link system that already works one of the more durable advantages a company can have."
              }
            ]
          },
          {
            type: "figure",
            eyebrow: "Figure",
            title: "The weakest link sets the result",
            intro: "Five parts of one system, scored out of ten. If the parts add up, the result is their average. If it's a chain, the result is the weakest part.",
            alt: "Five bars, parts A to E, at 8, 7, 4, 5 and 6. A dotted line marks the average, 6. A dashed line in pen marks the weakest link, 4, at the top of part C. A dashed outline above part A shows it raised to 10: the average would rise to 6.4, while the weakest link stays at 4.",
            svg: `<svg viewBox="0 0 500 275" xmlns="http://www.w3.org/2000/svg">
              <path class="sv-axis" d="M70 240 H380"/>
              <rect class="sv-line sv-dash" x="82" y="40" width="36" height="40"/>
              <rect class="sv-box" x="82" y="80" width="36" height="160"/>
              <rect class="sv-box" x="142" y="100" width="36" height="140"/>
              <rect class="sv-box-pen" x="202" y="160" width="36" height="80"/>
              <rect class="sv-box" x="262" y="140" width="36" height="100"/>
              <rect class="sv-box" x="322" y="120" width="36" height="120"/>
              <path class="sv-line sv-dash" d="M70 120 H380"/>
              <path class="sv-line-pen sv-dash" d="M70 160 H380"/>
              <text class="sv-k" x="388" y="124">AVERAGE 6</text>
              <text class="sv-k" x="388" y="164">WEAKEST LINK 4</text>
              <text class="sv-k" x="100" y="96" text-anchor="middle">8</text>
              <text class="sv-k" x="160" y="116" text-anchor="middle">7</text>
              <text class="sv-k" x="220" y="176" text-anchor="middle">4</text>
              <text class="sv-k" x="280" y="156" text-anchor="middle">5</text>
              <text class="sv-k" x="340" y="136" text-anchor="middle">6</text>
              <text class="sv-k" x="100" y="258" text-anchor="middle">PART A</text>
              <text class="sv-k" x="160" y="258" text-anchor="middle">PART B</text>
              <text class="sv-k" x="220" y="258" text-anchor="middle">PART C</text>
              <text class="sv-k" x="280" y="258" text-anchor="middle">PART D</text>
              <text class="sv-k" x="340" y="258" text-anchor="middle">PART E</text>
              <g class="sv-call"><circle cx="250" cy="205" r="9"/><text x="250" y="208.5" text-anchor="middle">1</text></g>
              <g class="sv-call"><circle cx="400" cy="184" r="9"/><text x="400" y="187.5" text-anchor="middle">2</text></g>
              <g class="sv-call"><circle cx="60" cy="58" r="9"/><text x="60" y="61.5" text-anchor="middle">3</text></g>
            </svg>`,
            svgNarrow: `<svg viewBox="0 0 345 285" xmlns="http://www.w3.org/2000/svg">
                <path class="sv-axis" d="M10 240 H262"/>
                <rect class="sv-line sv-dash" x="20" y="40" width="36" height="40"/>
                <rect class="sv-box" x="20" y="80" width="36" height="160"/>
                <rect class="sv-box" x="70" y="100" width="36" height="140"/>
                <rect class="sv-box-pen" x="120" y="160" width="36" height="80"/>
                <rect class="sv-box" x="170" y="140" width="36" height="100"/>
                <rect class="sv-box" x="220" y="120" width="36" height="120"/>
                <path class="sv-line sv-dash" d="M10 120 H262"/>
                <path class="sv-line-pen sv-dash" d="M10 160 H262"/>
                <text class="sv-k" x="268" y="124">AVERAGE 6</text>
                <text class="sv-k" x="268" y="164">WEAKEST 4</text>
                <text class="sv-k" x="38" y="96" text-anchor="middle">8</text>
                <text class="sv-k" x="88" y="116" text-anchor="middle">7</text>
                <text class="sv-k" x="138" y="176" text-anchor="middle">4</text>
                <text class="sv-k" x="188" y="156" text-anchor="middle">5</text>
                <text class="sv-k" x="238" y="136" text-anchor="middle">6</text>
                <text class="sv-k" x="38" y="258" text-anchor="middle">A</text>
                <text class="sv-k" x="88" y="258" text-anchor="middle">B</text>
                <text class="sv-k" x="138" y="258" text-anchor="middle">C</text>
                <text class="sv-k" x="188" y="258" text-anchor="middle">D</text>
                <text class="sv-k" x="238" y="258" text-anchor="middle">E</text>
                <g class="sv-call"><circle cx="164" cy="205" r="9"/><text x="164" y="208.5" text-anchor="middle">1</text></g>
                <g class="sv-call"><circle cx="280" cy="184" r="9"/><text x="280" y="187.5" text-anchor="middle">2</text></g>
                <g class="sv-call"><circle cx="72" cy="40" r="9"/><text x="72" y="43.5" text-anchor="middle">3</text></g>
              </svg>`,
            notes: [
              {
                t: "Part C is the weakest link.",
                d: "In a chain-link system, it alone sets the result."
              },
              {
                t: "The result is 4, not 6.",
                d: "Averaging the parts would say 6. The system delivers what its weakest part can."
              },
              {
                t: "Raise the strongest part to 10, and nothing changes.",
                d: "The average would rise to 6.4; the chain stays at 4. Only raising C moves it, and then only as far as D, the next weakest."
              }
            ],
            caption: "Illustrative numbers, drawn by us."
          },
          {
            type: "table",
            eyebrow: "Two kinds of system",
            title: "Additive and chain-link systems",
            columns: ["", "Additive", "Chain-link"],
            widths: ["11rem", null, null],
            rows: [
              ["The result is set by", "The sum, or the average, of the parts", "The weakest part"],
              ["Improving a strong part", "Raises the result a little", "Changes nothing"],
              ["How it gets stuck", "Rarely: every gain shows", "Several equally weak links, so no single gain shows"],
              ["How to improve it", "Anywhere, a bit at a time", "The weakest link first, often several at once, by someone who sees the whole"],
              ["Copying it", "Piece by piece works", "A rival has to match every link"]
            ]
          },
          {
            type: "table",
            eyebrow: "In practice",
            title: "Where chain-link logic shows up",
            intro: "Our examples.",
            columns: ["", "The weakest link", "What it means"],
            widths: ["11rem", null, null],
            rows: [
              ["A product launch", "The slowest team that has to deliver for it", "Speeding up the fast teams changes the launch date not at all."],
              ["A customer's experience", "The worst moment in it", "A great meal is remembered for the forty-minute wait for the bill."],
              ["Manufacturing quality", "The least reliable step", "One sloppy step produces defects no other step can catch up on."],
              ["A software release", "The last component to pass its tests", "The release ships when everything is ready, not on average."],
              ["Transplanting a system", "Whichever practice the copy leaves out", "Methods that work together, as Toyota's did, lose most of their value when taken one at a time."]
            ]
          }
        ],
        end: {
          related: [
            { title: "Proximate objectives", where: "Chapter 7", page: "proximate-objectives" },
            { title: "Using design", where: "Chapter 9", page: "using-design" },
            { title: "Focus", where: "Chapter 10", page: "focus" },
            { title: "The kernel of good strategy", where: "Chapter 5", page: "kernel" }
          ],
          cta: { page: "builder", kicker: "Workbench", text: "Write a strategy that fixes the weakest link" }
        }
      },

      // The Crown Cork & Seal details (Connelly's era, aerosol and drink cans, plants near
      // customers) follow the widely taught Harvard case. Unchecked against Chapter 10's
      // wording, as is the pointer to Chapter 11 picking up Crown's later story.
      focus: {
        title: "Focus",
        eyebrow: "Part II · Chapter 10",
        dek:
          "In Rumelt's sense, focus is more than doing fewer things. It means coordinating several policies so their effects overlap and reinforce each other, then aiming that combined force at the right target.",
        blocks: [
          {
            type: "prose",
            sections: [
              {
                n: "1",
                title: "Two parts to focus",
                paras: [
                  "The word is used loosely, often to mean “do less.” Rumelt gives it a narrower meaning with two parts. The first is coordination: policies designed to work together, so that each one makes the others more effective and the whole delivers more than the parts would separately.",
                  "The second is the target. That combined force has to be applied where it counts: a segment of customers, a market or a problem where it can win. Coordination without the right target wastes the power, and a target without coordination never gets enough of it."
                ],
                side: {
                  label: "See also",
                  html: "<p><a href=\"@using-leverage\">Using leverage</a> makes a related point about effort: spread thin, it changes nothing. Focus adds that the policies have to fit together, not just share a goal.</p>"
                }
              },
              {
                n: "2",
                title: "Crown Cork & Seal",
                paras: [
                  "Rumelt's example is Crown Cork & Seal, a maker of metal cans that was small next to giants such as American Can and Continental Can. Under John Connelly, who took charge in the late 1950s, Crown stopped trying to serve every can buyer. It concentrated on cans that were hard to make well, such as those for aerosols and carbonated drinks, which have to hold pressure.",
                  "Around that choice sat a set of ordinary-looking policies. Plants were small and close to the customers they served, so Crown could respond quickly and send its engineers to help with problems on a customer's filling line. None of this was remarkable on its own. Together, aimed at one kind of customer, it gave Crown an edge its larger rivals, built to serve everyone, did not match."
                ],
                side: {
                  label: "What happened next",
                  html: "<p><a href=\"@growth\">Chapter 11</a>, on growth, picks up Crown's story after Connelly, when buying other can makers replaced focus as the plan.</p>"
                }
              }
            ]
          },
          {
            type: "policy-fit",
            title: "Aim the policies",
            intro:
              "Northline Bikes, the invented bike maker from elsewhere on this site, sets five policies. Each option serves one group of riders or tries to serve everyone. Choose one option per policy and see which groups Northline leads against the strongest rival in each.",
            company: "Northline",
            ledLabel: "Groups you lead",
            valueLabel: "Sales where you lead",
            unit: { before: "$", after: "m" },
            sizeNote: "a year",
            allLabel: "Everyone",
            emptyNote: "No policies set. Choose one option for each policy, or try a preset.",
            foot:
              "A toy model, not from the book. Each policy aimed at a group adds 1 to Northline's strength there, and each pair of policies aimed at the same group adds 1 more, because they reinforce each other. Options for everyone add 1 to every group and reinforce nothing.",
            start: "everyone",
            presets: [
              { id: "everyone", label: "Something for everyone", picks: ["all", "all", "all", "all", "all"] },
              { id: "mix", label: "A bit of each", picks: ["commute", "race", "family", "commute", "race"] },
              { id: "race", label: "All in on racers", picks: ["race", "race", "race", "race", "race"] },
              { id: "clear", label: "Clear", picks: [] }
            ],
            segments: [
              {
                id: "commute",
                name: "city commuters",
                short: "Commuters",
                size: 40,
                rival: { name: "the national brands", short: "National brands", strength: 9 },
                together:
                  "Station shops make same-day repairs easy to offer, bike-to-work schemes send riders to those shops, and the message tells them why. Each policy makes the others work better."
              },
              {
                id: "race",
                name: "weekend racers",
                short: "Racers",
                size: 35,
                rival: { name: "Veloce", short: "Veloce", strength: 18 }
              },
              {
                id: "family",
                name: "families",
                short: "Families",
                size: 15,
                rival: { name: "the importers", short: "Importers", strength: 7 },
                together:
                  "Cargo bikes, test-ride showrooms, monthly payments and safety checks all answer the question parents ask: is this safe and affordable enough to replace a car?"
              }
            ],
            policies: [
              {
                id: "build",
                title: "What we build",
                question: "Which bikes get the design budget?",
                options: [
                  { target: "commute", label: "Sturdy city bikes with racks, mudguards and built-in lights" },
                  { target: "race", label: "Light carbon road frames" },
                  { target: "family", label: "Cargo bikes that carry two children and the shopping" },
                  { target: "all", label: "A full range, with a model for every kind of rider" }
                ]
              },
              {
                id: "sell",
                title: "Where we sell",
                question: "Where do riders find a Northline?",
                options: [
                  { target: "commute", label: "Small shops by train stations and office districts" },
                  { target: "race", label: "Online, backed by race-club sponsorships" },
                  { target: "family", label: "Suburban showrooms with room for test rides" },
                  { target: "all", label: "Any retailer willing to stock us" }
                ]
              },
              {
                id: "service",
                title: "How we look after riders",
                question: "What happens when something goes wrong?",
                options: [
                  { target: "commute", label: "Same-day repairs, so nobody misses a ride to work" },
                  { target: "race", label: "A mechanic's van at weekend races" },
                  { target: "family", label: "Free yearly safety checks" },
                  { target: "all", label: "A two-year warranty on every bike" }
                ]
              },
              {
                id: "pay",
                title: "How customers pay",
                question: "What does buying one feel like?",
                options: [
                  { target: "commute", label: "Through employers' bike-to-work schemes" },
                  { target: "race", label: "Premium prices, with upgrades sold separately" },
                  { target: "family", label: "Monthly payments spread over two years" },
                  { target: "all", label: "Mid-range prices across the board" }
                ]
              },
              {
                id: "message",
                title: "What we tell the market",
                question: "What does every ad say?",
                options: [
                  { target: "commute", label: "Get to work on time, every day" },
                  { target: "race", label: "Fastest on the climbs" },
                  { target: "family", label: "Leave the second car at home" },
                  { target: "all", label: "Quality bikes for everyone" }
                ]
              }
            ]
          },
          {
            type: "prose",
            sections: [
              {
                n: "3",
                title: "Focus means giving things up",
                paras: [
                  "Every policy aimed at commuters is a policy not aimed at families or racers. That is the cost of focus, and it's why focus is rarer than the word suggests. Someone has to accept that the company will be ordinary, or absent, in places it could have tried to serve.",
                  "This is the same choice <a href=\"@why-bad-strategy\">Chapter 4</a> says organizations avoid. A plan with something for everyone keeps every group happy inside the company and leads in none of them outside it."
                ],
                side: {
                  label: "Try this",
                  html: "<p>Set four policies on commuters and one on families. You still lead commuters, but the family policy does almost nothing on its own.</p>"
                }
              },
              {
                n: "4",
                title: "Hard to copy",
                paras: [
                  "Because the advantage lives in how the policies fit together, a rival who copies one of them gets little. Copying Crown's plant locations without its choice of customers, or its engineers without its quick service, would not have reproduced the result.",
                  "A well-run <a href=\"@chain-link\">chain-link system</a> is protected the same way. In both cases the strength is in the combination, so it has to be matched as a whole."
                ],
                side: {
                  label: "Why not racers?",
                  html: "<p>Veloce, an invented specialist with twenty years of race wins, beats even five coordinated policies. Choosing the target comes first, which is one reason Rumelt's <a href=\"@kernel\">kernel</a> starts with the diagnosis.</p>"
                }
              }
            ]
          }
        ],
        end: {
          related: [
            { title: "Using leverage", where: "Chapter 6", page: "using-leverage" },
            { title: "Chain-link systems", where: "Chapter 8", page: "chain-link" },
            { title: "Using design", where: "Chapter 9", page: "using-design" },
            { title: "Growth", where: "Chapter 11", page: "growth" }
          ],
          cta: { page: "builder", kicker: "Workbench", text: "Write a guiding policy that picks a target" }
        }
      },

      // Crown under William Avery (acquisitions through the 1990s, including Continental
      // Can businesses and CarnaudMetalbox; the later fall in the share price) follows
      // public accounts of the company. Unchecked against Chapter 11's wording.
      growth: {
        title: "Growth",
        eyebrow: "Part II · Chapter 11",
        dek:
          "Growth is the reward for having something customers want more of. Rumelt argues that growth pursued for its own sake, especially growth bought through acquisitions, often makes a company bigger and its owners poorer.",
        blocks: [
          {
            type: "prose",
            sections: [
              {
                n: "1",
                title: "Growth is an outcome",
                paras: [
                  "Many companies treat growth as a strategy: a target for sales, set first, with the means worked out later. Rumelt treats it as a result. Healthy growth comes from a company having something special, such as a better product, a skill or a cost position, and from more customers wanting it, or from extending that strength into nearby markets.",
                  "Growth that isn't built on such an advantage has to be manufactured, and the quickest way to manufacture it is to buy it. That is where the trouble usually starts."
                ],
                side: {
                  label: "See also",
                  html: "<p>A sales target with no account of how to reach it is one of the <a href=\"@bad-strategy\">hallmarks of bad strategy</a>: a goal mistaken for a strategy.</p>"
                }
              },
              {
                n: "2",
                title: "Crown after Connelly",
                paras: [
                  "The <a href=\"@focus\">previous chapter</a> left Crown Cork & Seal as a focused, profitable can maker. After John Connelly, the new leadership under William Avery set out to make Crown much larger, buying other packaging companies through the 1990s, including parts of Continental Can and the European group CarnaudMetalbox. Crown became one of the largest packaging companies in the world.",
                  "Size didn't bring value. The deals were paid for with large premiums and heavy borrowing, the combined business earned less on its capital than the old Crown had, and the share price later fell steeply. Rumelt uses the story to separate getting bigger from getting better."
                ],
                side: {
                  label: "The pattern",
                  html: "<p>The focus that made Crown strong was the first thing lost: a company built to serve everyone looks like the rivals Crown used to beat.</p>"
                }
              }
            ]
          },
          {
            type: "deals",
            title: "Buying growth",
            intro:
              "Northline Bikes, the invented bike maker, has $90m of sales and is worth $120m to its owners. Four companies are for sale. Buy any of them and watch two numbers: how big Northline gets, and what it's worth.",
            company: "Northline",
            base: { sales: 90, value: 120 },
            unit: { before: "$", after: "m" },
            valueLabel: "Owners' value",
            valueNoun: "what Northline is worth to its owners",
            emptyNote: "Northline as it is today. Tick a company to buy it, or try a preset.",
            loseNote: "A deal only creates value when the gains from combining are bigger than the premium paid over what the company was worth on its own.",
            winNote: "Here the gains from combining are bigger than the premium. Northline is extending something it already does well.",
            foot:
              "Invented numbers. Value created by a deal = what the company is worth on its own + gains from combining − the price paid. Debt and taxes are left out to keep the arithmetic visible.",
            deals: [
              {
                id: "ridgeway",
                name: "Ridgeway Cycles",
                what: "A rival commuter-bike brand.",
                sales: 40,
                price: 65,
                alone: 50,
                gains: 5,
                why: "Sharing factories saves a little, but Northline paid a 30% premium to buy sales it was already competing for."
              },
              {
                id: "spoke",
                name: "Spoke & Co.",
                what: "A chain of thirty bike shops.",
                sales: 60,
                price: 60,
                alone: 45,
                gains: 3,
                why: "The biggest boost to sales, but Northline knows how to make bikes, not how to run shops. Little of what it's good at carries over."
              },
              {
                id: "tandem",
                name: "Tandem Kids",
                what: "A maker of children's bikes.",
                sales: 25,
                price: 38,
                alone: 30,
                gains: 0,
                why: "Different customers, different bikes, different shops. There is nothing to combine, so the premium is simply lost."
              },
              {
                id: "gearhaus",
                name: "Gearhaus",
                what: "A small firm with a sealed gearbox design.",
                sales: 5,
                price: 12,
                alone: 8,
                gains: 12,
                why: "Its gearbox makes Northline's commuter bikes, which already sell well, better still. Northline can sell more of what it's good at."
              }
            ]
          },
          {
            type: "prose",
            sections: [
              {
                n: "3",
                title: "What a deal has to beat",
                paras: [
                  "A company for sale is usually priced at about what it's worth on its own, plus a premium to persuade its owners to sell. Paying that price buys sales and profits, but at a fair price at best. The premium is a loss on day one, and only real gains from combining the two businesses can earn it back.",
                  "Those gains are easy to promise and hard to deliver. They exist when the buyer has something the target can use, or the other way round. Without that, the deal adds size and subtracts value."
                ],
                side: {
                  label: "Try this",
                  html: "<p>Buy all four. Sales more than double while Northline's owners end up poorer. Then buy only Gearhaus, the smallest deal.</p>"
                }
              },
              {
                n: "4",
                title: "Healthy growth",
                paras: [
                  "The growth Rumelt admires follows an advantage. It comes from more customers wanting what the company is uniquely good at, or from carrying a strength into a neighboring market where it still counts. It tends to be slower and less dramatic than a string of acquisitions, and much more likely to make the owners better off."
                ],
                side: {
                  label: "Do the numbers",
                  html: "<p>The same logic applies to any investment. <a href=\"#fi-roi\">Figuring ROI</a> in <cite>Financial Intelligence</cite> works through payback, net present value and internal rate of return.</p>"
                }
              }
            ]
          }
        ],
        end: {
          related: [
            { title: "Focus", where: "Chapter 10", page: "focus" },
            { title: "Using advantage", where: "Chapter 12", page: "using-advantage" },
            { title: "Bad strategy", where: "Chapter 3", page: "bad-strategy" },
            { title: "Using leverage", where: "Chapter 6", page: "using-leverage" }
          ],
          cta: { page: "builder", kicker: "Workbench", text: "Write a strategy that earns its growth" }
        }
      },

      // A reference page. Sources and checks:
      // - Wal-Mart: stores in small towns the national discount chains passed over, clustered
      //   around its own distribution centers, with Kmart the larger rival for years. Public
      //   record, and Rumelt's account as I remember it; unchecked against Chapter 2's wording.
      // - Andrew Marshall and the Pentagon's Office of Net Assessment: competing by playing US
      //   strengths against Soviet weaknesses, favoring moves cheap to make and costly to
      //   answer. As I remember Rumelt telling it; the details are unchecked.
      // - The figure is a schematic of the logic. The two tables are our summary.
      "discovering-power": {
        title: "Discovering power",
        eyebrow: "Part I · Chapter 02",
        layout: "dense",
        dek:
          "A good strategy finds a source of power and applies it where it counts. Rumelt names two: putting your strength against a rival's weakness, and the extra force that comes from actions that fit together.",
        blocks: [
          {
            type: "brief",
            eyebrow: "In brief",
            title: "The argument in six points",
            points: [
              {
                t: "Strategy applies power where it counts.",
                d: "A good strategy finds a source of strength and brings it to bear on the point that decides the outcome, instead of spreading effort evenly."
              },
              {
                t: "Put strength against weakness.",
                d: "The most basic source of power is to use what you do well where a rival is weak. A strength aimed at a rival's strength is only a contest of resources, and the bigger side usually wins it."
              },
              {
                t: "Weaknesses often come from strengths.",
                d: "A rival built to win one way is awkward at another. The national discount chains needed big markets, so small towns were empty ground for anyone who could serve them cheaply."
              },
              {
                t: "Compare costs, not just capabilities.",
                d: "Andrew Marshall's question at the Pentagon: which moves are cheap for us to make and expensive for them to answer? A good move makes that ratio lopsided."
              },
              {
                t: "Coherence is power too.",
                d: "Actions designed to fit together reinforce one another, so the whole has more force than its parts. No single piece of Wal-Mart's system was hard to copy; the combination was."
              },
              {
                t: "Finding it means studying the other side.",
                d: "A list of your own strengths isn't enough. Finding where a strength meets a weakness means studying rivals as closely as yourself."
              }
            ]
          },
          {
            type: "figure",
            eyebrow: "Figure",
            title: "Wal-Mart's small towns",
            intro: "Why a smaller company could be stronger where it competed. Two ways to lay out a discount chain, drawn as a schematic.",
            alt: "Two panels. A national chain: four large stores in big cities, each linked by long dashed lines to a distant warehouse, with small towns scattered between them and no store in any of them. Wal-Mart: a distribution center in the middle of a dashed circle, with ten small-town stores around it, each linked by a short line.",
            svg: `<svg viewBox="0 0 640 290" xmlns="http://www.w3.org/2000/svg">
              <g>${CHAIN_PANEL}</g>
              <path class="sv-grid" d="M320 30 V270"/>
              <g transform="translate(340 0)">${NETWORK_PANEL}</g>
            </svg>`,
            svgNarrow: `<svg viewBox="0 0 300 600" xmlns="http://www.w3.org/2000/svg">
              <g>${CHAIN_PANEL}</g>
              <path class="sv-grid" d="M10 302 H290"/>
              <g transform="translate(0 310)">${NETWORK_PANEL}</g>
            </svg>`,
            notes: [
              {
                t: "Built for big markets.",
                d: "The large discount chains put stores in places big enough to support them, and supplied them over long distances."
              },
              {
                t: "Small towns left empty.",
                d: "Towns below that size weren't worth a store to them, so a rival there met little competition."
              },
              {
                t: "Stores around their own warehouses.",
                d: "Wal-Mart filled those towns and clustered the stores within reach of its own distribution centers, so trucks, managers and information served many stores cheaply."
              },
              {
                t: "Hard to copy as a whole.",
                d: "A rival could open a store in one town. Matching the cost of the cluster meant building the whole network, and Kmart, for years the larger company, was built the other way."
              }
            ],
            caption: "A schematic of the logic, drawn by us. Not a map; the number of stores is illustrative."
          },
          {
            type: "table",
            eyebrow: "Strength against weakness",
            title: "Where a rival's strength becomes its weakness",
            intro: "Our summary of the pattern, with the chapter's two cases in the first rows.",
            columns: ["A rival built for", "Finds it hard to", "So a challenger can"],
            rows: [
              ["Big markets and big stores", "Serve small, scattered places at a profit", "Fill the places it passes over, as Wal-Mart did"],
              ["One fixed idea of what to defend", "Stop spending on that defense, whatever the cost", "Make moves that are cheap to make and expensive to answer, as Marshall urged against the Soviets"],
              ["Volume, with few staff per customer", "Offer advice and personal service", "Compete on service, advice and speed"],
              ["One dominant product", "Walk away from it", "Sell what would eat into that product's sales"],
              ["A powerful retail channel", "Sell around it without upsetting its partners", "Sell direct"],
              ["Central control", "Respond quickly to local conditions", "Win market by market, where local knowledge counts"]
            ]
          },
          {
            type: "table",
            eyebrow: "Two sources",
            title: "Strength against weakness, and coherence",
            columns: ["", "Strength against weakness", "Coherence"],
            widths: ["10rem", null, null],
            rows: [
              ["What it is", "Using an edge where a rival is exposed", "Actions designed to reinforce one another"],
              ["In the chapter", "Andrew Marshall's net assessment of the Soviet Union", "Wal-Mart's stores, warehouses and trucks"],
              ["The question to ask", "What would it cost them to respond, compared with what it costs us to act?", "Which of our actions make the others work better?"],
              ["How it fails", "Aimed at a rival's strength, it becomes a contest of resources", "Actions that only sit side by side add nothing to each other"],
              ["Later in the book", "<a href=\"@using-leverage\">Using leverage</a> and <a href=\"@using-advantage\">using advantage</a>", "<a href=\"@using-design\">Using design</a>, <a href=\"@chain-link\">chain-link systems</a> and <a href=\"@focus\">focus</a>"]
            ]
          }
        ],
        end: {
          related: [
            { title: "Good strategy is unexpected", where: "Chapter 1" },
            { title: "The kernel of good strategy", where: "Chapter 5", page: "kernel" },
            { title: "Using leverage", where: "Chapter 6", page: "using-leverage" },
            { title: "Focus", where: "Chapter 10", page: "focus" }
          ],
          cta: { page: "builder", kicker: "Workbench", text: "Write a guiding policy that plays to a strength" }
        }
      },

      // A reference page around the Cannae map. Cannae follows the standard modern accounts
      // (Polybius and Livy as retold by historians). That Rumelt opens Chapter 9 with it, and
      // the framing of design as a substitute for resources and of tight fit as fragile, are
      // unchecked against the chapter's wording. The tables are our summary.
      "using-design": {
        title: "Using design",
        eyebrow: "Part II · Chapter 09",
        layout: "dense",
        dek:
          "Some strategies win by the arrangement of their parts rather than their size. Each action is placed and timed so that it sets up the next, and the whole works only because the pieces fit.",
        blocks: [
          {
            type: "brief",
            eyebrow: "In brief",
            title: "The argument in five points",
            points: [
              {
                t: "Some strategies are designs.",
                d: "Instead of one clever move, they're an arrangement: each action placed and timed so that what it does makes the next one possible."
              },
              {
                t: "Cannae is the classic case.",
                d: "In 216 BC Hannibal surrounded and almost destroyed a Roman army far larger than his own, by how he arranged his forces rather than by weight of numbers."
              },
              {
                t: "Design substitutes for resources.",
                d: "A much larger force can often win by weight alone. A smaller one has to make its parts work together, and that takes a deliberate plan for how they fit."
              },
              {
                t: "A design rests on a premise.",
                d: "Hannibal's plan assumed the Romans would press hard through the center, as they usually did. Anticipating that was as much a part of the design as placing the troops."
              },
              {
                t: "Tight fit is powerful and fragile.",
                d: "The tighter the parts fit, the more the design depends on the situation being what its designer expected. More power under the planned conditions means less room when they change."
              }
            ]
          },
          {
            type: "phase-map",
            eyebrow: "Figure",
            title: "How the trap worked",
            intro:
              "Step through the battle in four phases. Watch where each part of Hannibal's army starts, and what it's there to do later.",
            size: [400, 280],
            whyLabel: "Why it's design",
            outLabel: "Broken or driven off",
            caption: "A simplified schematic, not to scale. Positions follow the standard modern accounts of the battle.",
            sides: [
              { id: "carthage", label: "Hannibal's army" },
              { id: "rome", label: "Roman army" }
            ],
            terrain: [{ d: "M 22 0 C 42 70, 12 150, 30 280", label: "River", lx: 38, ly: 272 }],
            units: [
              {
                id: "roman-inf",
                side: "rome",
                label: "Roman infantry",
                inside: true,
                at: [
                  { x: 145, y: 30, w: 110, h: 75, l: [55, 42] },
                  { x: 145, y: 68, w: 110, h: 75, l: [55, 42] },
                  { x: 145, y: 85, w: 110, h: 75, l: [55, 42] }
                ]
              },
              {
                id: "roman-cav",
                side: "rome",
                label: "Roman cavalry",
                at: [
                  { x: 62, y: 52, w: 46, h: 24 },
                  { x: 40, y: 4, w: 46, h: 24, out: true, hideLabel: true }
                ]
              },
              {
                id: "allied-cav",
                side: "rome",
                label: "Allied cavalry",
                at: [
                  { x: 292, y: 52, w: 46, h: 24 },
                  { x: 292, y: 52, w: 46, h: 24 },
                  { x: 292, y: 52, w: 46, h: 24 },
                  { x: 300, y: 4, w: 46, h: 24, out: true, hideLabel: true }
                ]
              },
              {
                id: "center",
                side: "carthage",
                label: "Gauls, Spaniards",
                at: [
                  { d: "M 150 158 Q 200 112 250 158 L 250 172 Q 200 126 150 172 Z", l: [200, 168] },
                  { d: "M 145 150 Q 200 188 255 150 L 255 164 Q 200 202 145 164 Z", l: [200, 200] },
                  { d: "M 145 162 Q 200 205 255 162 L 255 176 Q 200 219 145 176 Z", l: [200, 216] }
                ]
              },
              {
                id: "libyans-l",
                side: "carthage",
                label: "Libyans",
                at: [
                  { x: 108, y: 186, w: 36, h: 30, l: [18, -5] },
                  { x: 108, y: 186, w: 36, h: 30, l: [18, -5] },
                  { x: 116, y: 92, w: 26, h: 62, l: [-24, 35] }
                ]
              },
              {
                id: "libyans-r",
                side: "carthage",
                label: "Libyans",
                at: [
                  { x: 256, y: 186, w: 36, h: 30, l: [18, -5] },
                  { x: 256, y: 186, w: 36, h: 30, l: [18, -5] },
                  { x: 258, y: 92, w: 26, h: 62, l: [50, 35] }
                ]
              },
              {
                id: "heavy-cav",
                side: "carthage",
                label: "Heavy cavalry",
                at: [
                  { x: 58, y: 192, w: 46, h: 24 },
                  { x: 62, y: 52, w: 46, h: 24, l: [23, -5] },
                  { x: 296, y: 16, w: 46, h: 24, l: [23, -5] },
                  { x: 160, y: 46, w: 80, h: 24, l: [40, -5] }
                ]
              },
              {
                id: "numidians",
                side: "carthage",
                label: "Numidian cavalry",
                at: [
                  { x: 296, y: 192, w: 46, h: 24 },
                  { x: 296, y: 96, w: 46, h: 24 },
                  { x: 346, y: 26, w: 46, h: 24, hideLabel: true },
                  { x: 352, y: 4, w: 46, h: 24, hideLabel: true }
                ]
              }
            ],
            phases: [
              {
                tab: "Setup",
                title: "The setup",
                body: "Hannibal puts his least reliable infantry, Gauls and Spaniards, in the center, bowed out toward the Romans. His best infantry, the Libyans, wait on either side, set back. Cavalry holds both wings. The Romans mass their larger infantry deep in the middle, planning to break straight through.",
                why: "Every unit is placed for the job it will do later, not for the first clash.",
                arrows: ["M 200 108 L 200 128"]
              },
              {
                tab: "The center bends",
                title: "The center gives way",
                body: "The Roman infantry pushes into the bowed center, which falls back slowly without breaking. By the river, Hannibal's heavy cavalry drives the Roman cavalry from the field.",
                why: "The plan relies on the Romans doing what they usually did: pressing hard through the middle. Hannibal anticipated it and gave them somewhere to go.",
                arrows: ["M 200 146 L 200 162", "M 81 186 L 84 82"]
              },
              {
                tab: "The sides close",
                title: "The sides close",
                body: "With the Romans deep in the pocket, the Libyans turn inward and strike both Roman flanks. The heavy cavalry rides behind the Roman army to join the Numidians against the allied cavalry on the far wing.",
                why: "Timing: the Libyans move only once the Romans are committed. Too early and the Romans could have turned to meet them.",
                arrows: ["M 126 184 C 126 172, 128 166, 129 158", "M 274 184 C 274 172, 272 166, 271 158", "M 92 48 C 130 6, 250 4, 294 24"]
              },
              {
                tab: "The trap shuts",
                title: "The trap shuts",
                body: "With both Roman cavalry wings gone, Hannibal's horsemen strike the rear of the Roman infantry. Surrounded and packed too tightly to fight, the Roman army is destroyed.",
                why: "No single unit could have won. The result comes from how the parts fit together in space and in time.",
                arrows: ["M 200 72 L 200 83"]
              }
            ]
          },
          {
            type: "table",
            eyebrow: "Anatomy of a design",
            title: "What made the trap work",
            columns: ["", "At Cannae", "In a business"],
            widths: ["9rem", null, null],
            rows: [
              ["Anticipation", "The Romans would mass in the center and push straight through", "How rivals and customers will respond, built into the plan"],
              ["Placement", "The least reliable infantry in the center, the best set back on either side, cavalry on the wings", "Each resource put where its strength decides the result, not where it looks best"],
              ["Timing", "The Libyans turned inward only once the Romans were committed to the pocket", "Moves sequenced so each lands when the one before has prepared the ground"],
              ["Coordination", "The cavalry, done with its own fight, came around to close the rear", "Units that finish one job are ready for the next one in the plan"],
              ["The whole", "No unit could have won alone", "The advantage lies in the arrangement, so copying one part gets a rival little"]
            ]
          },
          {
            type: "table",
            eyebrow: "The trade",
            title: "The price of a tight fit",
            intro: "Our summary of the trade-off the chapter describes.",
            columns: ["", "Tightly designed", "Loosely coupled"],
            widths: ["11rem", null, null],
            rows: [
              ["Under the expected conditions", "Very powerful: each part multiplies the others", "Adequate: the parts work, but don't amplify each other"],
              ["If the premise is wrong", "Can fail all at once, as Cannae would have if the Romans had held back", "Degrades piece by piece"],
              ["For a rival to copy", "Hard: the whole arrangement has to be matched", "Easier: parts can be copied one at a time"],
              ["To change later", "Hard: changing one part disturbs the rest", "Easier"],
              ["Best when", "Resources are short and the situation is well understood", "The situation is uncertain or changing fast"]
            ]
          }
        ],
        end: {
          related: [
            { title: "Chain-link systems", where: "Chapter 8", page: "chain-link" },
            { title: "Focus", where: "Chapter 10", page: "focus" },
            { title: "Using leverage", where: "Chapter 6", page: "using-leverage" },
            { title: "The kernel of good strategy", where: "Chapter 5", page: "kernel" }
          ],
          cta: { page: "builder", kicker: "Workbench", text: "Write actions that fit together" }
        }
      },

      // The silver machine thought experiment, the four ways to increase an advantage's
      // value, and the Resnicks' orchards follow my reading of Chapter 12. All three are
      // unchecked against the chapter's wording.
      "using-advantage": {
        title: "Using advantage",
        eyebrow: "Part II · Chapter 12",
        dek:
          "Having an advantage is not the same as making money from it. Rumelt's point is that the returns come from making an advantage more valuable over time, and he names four ways to do it.",
        blocks: [
          {
            type: "prose",
            sections: [
              {
                n: "1",
                title: "What an advantage is",
                paras: [
                  "An advantage is an asymmetry you can use: the ability to deliver more value than rivals, or the same value at a lower cost. It is always specific. It holds against particular competitors, for particular customers, and it can disappear when either changes.",
                  "That makes advantage something to look for in detail, not a label to claim. A company can be better than its rivals at one thing, for one kind of buyer, and ordinary everywhere else."
                ],
                side: {
                  label: "See also",
                  html: "<p>Finding where your strength meets a rival's weakness is the subject of <a href=\"@discovering-power\">Discovering power</a>.</p>"
                }
              },
              {
                n: "2",
                title: "The silver machine",
                paras: [
                  "Rumelt asks the reader to imagine owning a machine that produces a fixed amount of silver every year. It's valuable, but if you bought it at a fair price, you earn only a normal return on what you paid. The price already reflects what the machine produces.",
                  "To do better than that, you have to make the machine itself more valuable: get more silver out of it, or put it to a use worth more. A business advantage works the same way. Owning one isn't enough; the gains come from increasing it."
                ],
                side: {
                  label: "The same logic",
                  html: "<p>It's why buying a company at a fair price adds size but not value, as the deals on <a href=\"@growth\">Growth</a> show.</p>"
                }
              },
              {
                n: "3",
                title: "Four ways to raise its value",
                paras: [
                  "<strong>Deepen it:</strong> add more value for buyers, or cut costs further, where you already lead. <strong>Broaden it:</strong> carry the same strength to new products, customers or places. <strong>Create demand:</strong> get more buyers to want what you're best at. <strong>Protect it:</strong> make it harder for rivals to copy, so it lasts longer.",
                  "Each works on a different part of what the advantage is worth: the edge itself, how widely it's used, how many people want it, and how long it lasts."
                ],
                side: {
                  label: "A useful question",
                  html: "<p>Which of the four is cheapest for us and hardest for a rival to match?</p>"
                }
              }
            ]
          },
          {
            type: "sorter",
            title: "Which way does it work?",
            intro:
              "Eight moves by companies that already have an advantage. For each, decide which of the four ways it raises that advantage's value. The companies are invented.",
            options: [
              { id: "deepen", label: "Deepen it", hint: "More value or lower cost where it already leads" },
              { id: "broaden", label: "Broaden it", hint: "The same strength used in more places" },
              { id: "demand", label: "Create demand", hint: "More buyers want what it's best at" },
              { id: "protect", label: "Protect it", hint: "Harder for rivals to copy" }
            ],
            items: [
              {
                text: "Northline, already the fastest frame welder in the industry, redesigns its line to cut another 10% from the cost of each frame.",
                answer: "deepen",
                why: "The edge it already has, cheap and fast frames, gets bigger. Nothing about who it sells to changes."
              },
              {
                text: "Northline starts selling its frames to two cargo-bike makers, who build them into their own bikes.",
                answer: "broaden",
                why: "The same welding strength now earns money from customers Northline didn't serve before."
              },
              {
                text: "Northline funds a city campaign on how much faster commuting by bike is than driving.",
                answer: "demand",
                why: "It helps every bike seller a little, but the leader in commuter bikes gains the most from a bigger market."
              },
              {
                text: "Northline patents its sealed gearbox and signs its two key engineers to long contracts.",
                answer: "protect",
                why: "Neither makes the gearbox better. Both make it harder and slower for a rival to copy, so the advantage lasts longer."
              },
              {
                text: "A coffee roaster famous for its sourcing launches a cold brew made from the same beans and farm relationships.",
                answer: "broaden",
                why: "The sourcing advantage stays the same; it's applied to a new product."
              },
              {
                text: "A software firm whose customers rarely leave builds deeper links into their accounting systems.",
                answer: "protect",
                why: "Switching becomes harder still, which keeps rivals out. The product may be no better for a new buyer."
              },
              {
                text: "A large pistachio grower runs national ads persuading people to snack on pistachios.",
                answer: "demand",
                why: "Most of the extra demand flows to the biggest grower, so growing the market raises the value of its orchards."
              },
              {
                text: "A hospital known for heart surgery invests in better aftercare and cuts complications further.",
                answer: "deepen",
                why: "It strengthens the very thing it's known for, for the patients it already serves."
              }
            ]
          },
          {
            type: "prose",
            sections: [
              {
                n: "4",
                title: "Pistachios and pomegranates",
                paras: [
                  "Rumelt describes Stewart and Lynda Resnick, who built a large farming business in California around pistachios, almonds and pomegranates. Owning the orchards was an advantage, but the bigger gains came from raising demand for the crops themselves: promoting pistachios as a snack, and turning pomegranates into a branded juice. As the biggest grower, they captured the largest share of the market they had helped create."
                ],
                side: {
                  label: "Why it fits",
                  html: "<p>A leader gains most from a bigger market. A small grower running the same ads would mostly have helped its rivals.</p>"
                }
              }
            ]
          }
        ],
        end: {
          related: [
            { title: "Discovering power", where: "Chapter 2", page: "discovering-power" },
            { title: "Growth", where: "Chapter 11", page: "growth" },
            { title: "Focus", where: "Chapter 10", page: "focus" },
            { title: "Using dynamics", where: "Chapter 13", page: "using-dynamics" }
          ],
          cta: { page: "builder", kicker: "Workbench", text: "Write a strategy built on an advantage" }
        }
      },

      // The three kinds of inertia and the General Motors brands as an example of entropy
      // follow my reading of Chapter 14; both are unchecked against the chapter's wording.
      "inertia-entropy": {
        title: "Inertia and entropy",
        eyebrow: "Part II · Chapter 14",
        dek:
          "Organizations resist change, and left alone they slowly fall into disorder. Rumelt treats both as forces a strategist has to reckon with, in their own company and, as opportunities, in their rivals'.",
        blocks: [
          {
            type: "prose",
            sections: [
              {
                n: "1",
                title: "Three kinds of inertia",
                paras: [
                  "<strong>Inertia of routine</strong> is the pull of established procedures. Routines make an organization efficient at what it already does, and they keep running after the situation that justified them has gone. They are the easiest kind to change once someone with authority decides to.",
                  "<strong>Cultural inertia</strong> runs deeper: shared habits of mind about what matters, who gets listened to and how work is done. It changes slowly, and rarely by announcement.",
                  "<strong>Inertia by proxy</strong> is when a company doesn't change because its customers don't. If existing buyers rarely switch, keeping the old product and the old prices can stay profitable for years, until a rival goes after those buyers or new customers arrive who expect something better."
                ],
                side: {
                  label: "See also",
                  html: "<p>A system where several parts must change together is easy to get <a href=\"@chain-link\">stuck</a> in, which adds to inertia.</p>"
                }
              },
              {
                n: "2",
                title: "Entropy",
                paras: [
                  "Entropy is the tendency of an organization to drift into disorder unless someone keeps working against it. Product lines multiply, brands blur into each other, costs creep up and old arrangements outlive their purpose.",
                  "Rumelt's example is General Motors, whose car divisions were once arranged as a clear price ladder from Chevrolet up to Cadillac. Over the decades the ranges spread and overlapped until GM's own brands were competing with each other for the same buyers."
                ],
                side: {
                  label: "The manager's job",
                  html: "<p>Much of management is simply pushing back against entropy: pruning, simplifying and restating what each part is for.</p>"
                }
              }
            ]
          },
          {
            type: "sorter",
            title: "Which force is at work?",
            intro:
              "Eight organizations, each held back by something. Decide whether it's routine, culture, customers who don't change, or a slow drift into disorder. The organizations are invented.",
            options: [
              { id: "routine", label: "Routine", hint: "Procedures that outlived their reason" },
              { id: "culture", label: "Culture", hint: "Deep habits about what matters" },
              { id: "proxy", label: "Inertia by proxy", hint: "Customers who don't change" },
              { id: "entropy", label: "Entropy", hint: "A slow drift into disorder" }
            ],
            items: [
              {
                text: "A bank still runs a 30-step approval for small loans, designed for paper files, years after everything moved online.",
                answer: "routine",
                why: "A procedure kept running after the reason for it disappeared. A manager with authority could cut it quickly."
              },
              {
                text: "At a manufacturer, engineers quietly ignore any idea that comes from marketing, as they always have.",
                answer: "culture",
                why: "Nobody wrote this down as a rule. It's a shared belief about whose ideas count, and it won't change by memo."
              },
              {
                text: "A cable company keeps its old prices and packages because most of its customers never shop around.",
                answer: "proxy",
                why: "The company isn't changing because its customers aren't. It pays, for now, and leaves an opening for a rival."
              },
              {
                text: "A clothing retailer's brands slowly multiply until five of them sell nearly the same jacket at nearly the same price.",
                answer: "entropy",
                why: "Nobody planned the overlap. It built up because no one kept the ranges distinct."
              },
              {
                text: "A newspaper keeps its print-era schedule and layout meetings, though most readers now read on their phones.",
                answer: "routine",
                why: "Working procedures built for one situation keep running in another."
              },
              {
                text: "A hospital's senior surgeons reject a safety checklist as an insult to their professional judgment.",
                answer: "culture",
                why: "The resistance comes from a deeply held idea of what a surgeon is, not from a procedure."
              },
              {
                text: "A software vendor earns steady fees from old clients who would find switching painful, so it sees little reason to modernize.",
                answer: "proxy",
                why: "Its clients' reluctance to move stands in for the vendor's own. The risk arrives with the first competitor that makes switching easy."
              },
              {
                text: "A restaurant chain's menu creeps from 20 dishes to 90 as each manager adds a favorite, and quality slips.",
                answer: "entropy",
                why: "Each addition seemed harmless. Together they turned a tight menu into a sprawling one."
              }
            ]
          },
          {
            type: "prose",
            sections: [
              {
                n: "3",
                title: "Openings for rivals",
                paras: [
                  "Inertia and entropy are problems at home and opportunities elsewhere. A rival held back by routine will be slow to respond. One whose customers rarely switch has little practice at winning them back. One whose product lines have blurred has left gaps a focused competitor can fill.",
                  "So part of a diagnosis is asking not only what's changing in the market, but which competitors are least able to change with it."
                ],
                side: {
                  label: "Next in the book",
                  html: "<p>Chapter 15 brings these ideas together in one long example: Nvidia's rise in graphics chips.</p>"
                }
              }
            ]
          }
        ],
        end: {
          related: [
            { title: "Using dynamics", where: "Chapter 13", page: "using-dynamics" },
            { title: "Chain-link systems", where: "Chapter 8", page: "chain-link" },
            { title: "Growth", where: "Chapter 11", page: "growth" },
            { title: "Putting it together", where: "Chapter 15" }
          ],
          cta: { page: "builder", kicker: "Workbench", text: "Diagnose what's holding a company back" }
        }
      },

      // The five guideposts (rising fixed costs, deregulation, predictable biases, incumbent
      // response, attractor states) follow my reading of Chapter 13 and are unchecked
      // against its wording, as is the note on where Rumelt's examples come from.
      "using-dynamics": {
        title: "Using dynamics",
        eyebrow: "Part II · Chapter 13",
        dek:
          "The biggest openings in strategy come when an industry is shifting, because a shift upsets the advantages everyone has built. The skill is reading a change early and working out where it leads.",
        blocks: [
          {
            type: "prose",
            sections: [
              {
                n: "1",
                title: "Waves of change",
                paras: [
                  "Most of the time an industry's leaders are hard to dislodge. Their advantages took years to build, and rivals can't simply copy them. A wave of change, in technology, costs, rules or what buyers want, can make those advantages matter less, or not at all, and open ground that was closed.",
                  "Rumelt's point is not that strategists should predict the far future. It's that a few signs show where a shift is heading, and someone who reads them earlier and more clearly than rivals can position for it."
                ],
                side: {
                  label: "In the book",
                  html: "<p>Rumelt's examples come mostly from computing and telecommunications, industries he watched through several waves of change.</p>"
                }
              }
            ]
          },
          {
            type: "hallmarks",
            label: "Five guideposts",
            items: [
              {
                id: "fixed",
                name: "Rising fixed costs",
                def: "When the cost of staying in the game rises (a new plant, a bigger network, a costlier product to develop), an industry tends to consolidate into fewer, larger players.",
                sounds: "“The next factory will cost three times what the last one did.”",
                tell: "Ask what it now costs to compete at an efficient scale, and how many companies that leaves room for."
              },
              {
                id: "dereg",
                name: "Deregulation",
                def: "When rules that fixed prices, territories or who may compete are lifted, the old pattern of winners often breaks quickly and new kinds of competitors arrive.",
                sounds: "“From next year, anyone can apply for a license.”",
                tell: "Look for rules being removed or rewritten, then ask whose advantage depended on them."
              },
              {
                id: "bias",
                name: "Predictable biases",
                def: "Forecasters and investors tend to make the same mistakes, such as extending recent trends in a straight line or assuming today's leader will lead tomorrow. Errors you can anticipate are opportunities.",
                sounds: "“We've assumed last year's growth rate holds for the next ten years.”",
                tell: "Find the consensus view and ask which familiar bias it rests on."
              },
              {
                id: "incumbent",
                name: "Incumbent response",
                def: "Established leaders often respond to change by protecting what they already earn money from. Their likely response, usually slow or defensive, can be planned around.",
                sounds: "“Our dealers depend on the current model, so we'll keep it.”",
                tell: "Ask what the leader would lose by embracing the change. The more it would lose, the slower it will move."
              },
              {
                id: "attractor",
                name: "Attractor state",
                def: "The shape an industry is being pulled toward by its underlying economics: the most efficient way to meet demand once things settle. Knowing where it's heading matters more than knowing exactly when.",
                sounds: "“Once costs settle, the cheapest way to do this will be…”",
                tell: "Set today's companies aside and ask how you'd design the industry from scratch with today's technology and costs."
              }
            ]
          },
          {
            type: "spot-exercise",
            title: "Read the briefing",
            intro:
              "Two short market briefings about invented industries. Pick a highlighter, then tap each sentence that shows that guidepost. Leave background sentences unmarked. When you're done, check your answers.",
            noun: { one: "guidepost", article: "a" },
            labels: [
              { id: "fixed", short: "Fixed costs" },
              { id: "dereg", short: "Deregulation" },
              { id: "bias", short: "Biases" },
              { id: "incumbent", short: "Incumbents" },
              { id: "attractor", short: "Attractor" }
            ],
            exercises: [
              {
                id: "bikes",
                label: "City bikes",
                source: "Market briefing · City bikes",
                hint: "Each of the five guideposts appears once. Two sentences are only background.",
                paras: [
                  [
                    { t: "A new national law lets employers offer bikes through tax-free lease schemes, ending the old limits on which shops may sell them.", h: "dereg", note: "A rule that shaped who could compete is going. The old pattern of winners may not survive it." },
                    { t: "Tooling for a modern carbon-frame line now costs ten times what a steel line did.", h: "fixed", note: "Rising fixed costs favor bigger producers and push the industry toward fewer makers." },
                    { t: "The industry's trade show moved to a larger hall this year.", note: "Background. It says nothing about which way the industry is moving." }
                  ],
                  [
                    { t: "The market leader, whose dealers earn most of their money from repairs, has told them nothing will change.", h: "incumbent", note: "The leader is protecting its dealers' repair income. A challenger can plan around that slow response." },
                    { t: "Investors keep assuming that whoever leads road bikes today will lead electric bikes too.", h: "bias", note: "A familiar bias: today's leader will lead the next market. If that's wrong, the bets built on it are mispriced." }
                  ],
                  [
                    { t: "Commuters are converging on one kind of bike: electric, with a sealed drivetrain that needs almost no servicing.", h: "attractor", note: "This is where the economics are pulling the product. It also undermines the leader's repair-based dealers." },
                    { t: "Several large employers say they are watching the new scheme closely.", note: "Background. Interest isn't a shift yet." }
                  ]
                ]
              },
              {
                id: "vans",
                label: "Delivery vans",
                source: "Market briefing · Urban delivery fleets",
                hint: "Again, each guidepost appears once, with one background sentence.",
                paras: [
                  [
                    { t: "City councils across the region are scrapping the rules that limited delivery permits to a handful of licensed operators.", h: "dereg", note: "The permit rules protected the incumbents. Without them, new kinds of operators can enter." },
                    { t: "Most forecasts simply extend last year's growth in parcel volumes for the next decade.", h: "bias", note: "Straight-line extrapolation. Growth curves bend, and forecasts that don't will be wrong." }
                  ],
                  [
                    { t: "A competitive battery plant now costs four times what one did a decade ago.", h: "fixed", note: "Only a few companies can afford plants like that, so the supply side is likely to consolidate." },
                    { t: "The two largest diesel-van makers will keep their current models for eight more years, citing loyal fleet customers.", h: "incumbent", note: "Protecting existing customers and factories. Expect them to arrive late to electric vans." },
                    { t: "Fleet managers met for their annual conference in the spring.", note: "Background." }
                  ],
                  [
                    { t: "With charging costs falling and city centers closing to diesel, the cheapest way to run a city fleet is becoming small electric vans on shared charging hubs.", h: "attractor", note: "The settled, efficient shape of the industry. Positioning for it beats guessing the exact year it arrives." }
                  ]
                ]
              }
            ]
          },
          {
            type: "prose",
            sections: [
              {
                n: "2",
                title: "Position for where it's going",
                paras: [
                  "Reading the guideposts together tells you more than any one of them. In the bike briefing, the attractor state (electric bikes that need little servicing) is exactly what the leader's repair-based dealers can't embrace, and investors are betting the leader will win anyway. That combination is an opening.",
                  "The work is to position for the attractor state early, while incumbents defend the old model and the consensus is still looking the other way."
                ],
                side: {
                  label: "See also",
                  html: "<p>Why leaders are slow to move is the subject of <a href=\"@inertia-entropy\">Inertia and entropy</a>.</p>"
                }
              }
            ]
          }
        ],
        end: {
          related: [
            { title: "Inertia and entropy", where: "Chapter 14", page: "inertia-entropy" },
            { title: "Using advantage", where: "Chapter 12", page: "using-advantage" },
            { title: "Discovering power", where: "Chapter 2", page: "discovering-power" },
            { title: "Putting it together", where: "Chapter 15" }
          ],
          cta: { page: "builder", kicker: "Workbench", text: "Diagnose a shifting industry" }
        }
      },

      builder: {
        kind: "tool",
        title: "Build a kernel",
        crumb: "Kernel workbench",
        navLabel: "Workbench",
        eyebrow: "Workbench · The kernel",
        dek: "Write a diagnosis, a guiding policy and the actions that carry it out. The checks apply Rumelt's tests as you type.",
        blocks: [
          {
            type: "kernel-builder",
            draftKey: "gsbs.kernel",
            defaultExample: "apple",
            examples: {
              apple: {
                label: "Apple, 1997",
                note: "Example loaded: Apple in 1997, as Rumelt describes Steve Jobs's turnaround. Edit any field to make it your own.",
                diagnosis:
                  "Apple is close to running out of cash. Its product line has sprawled into dozens of overlapping models that confuse buyers, split engineering effort and fill warehouses with unsold machines. It cannot win a fight on scale against the Windows PC makers, so the immediate problem is survival.",
                policy:
                  "Shrink Apple to four great products (consumer and pro, desktop and portable) and stop doing everything else.",
                actions: [
                  { text: "Cut fifteen desktop models down to one, and the portable line down to one", linked: true },
                  { text: "Organize what remains into a two-by-two grid: consumer and pro, desktop and portable", linked: true },
                  { text: "Drop printers and peripherals, and shrink engineering and software teams to match", linked: true },
                  { text: "Drop most national retailers and start selling directly online", linked: true },
                  { text: "Move manufacturing to an outside contractor and cut inventory", linked: true }
                ]
              },
              corporate: {
                label: "A typical corporate plan",
                note: "Example loaded: a typical corporate plan, invented for this page. It fails on purpose.",
                diagnosis: "The market is changing faster than ever and customer expectations keep rising. We need to keep up.",
                policy:
                  "Become the leading customer-centric platform in our space by leveraging our synergies and driving innovation across the business.",
                actions: [
                  { text: "Grow revenue 20% year over year", linked: true },
                  { text: "Launch a digital transformation initiative", linked: true },
                  { text: "Empower teams to deliver excellence", linked: true },
                  { text: "Explore strategic partnerships", linked: false },
                  { text: "Improve customer satisfaction scores", linked: true },
                  { text: "Expand into new markets", linked: false },
                  { text: "Optimize operations for efficiency", linked: true }
                ]
              },
              blank: {
                label: "Blank page",
                note: "",
                diagnosis: "",
                policy: "",
                actions: [{ text: "", linked: true }]
              }
            }
          }
        ]
      }
    }
  });
})();
