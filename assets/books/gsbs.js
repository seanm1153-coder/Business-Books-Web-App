// Good Strategy Bad Strategy (Richard P. Rumelt, 2011).
// Summaries are paraphrased; keep quotations short and attributed.
// Links between pages in content HTML use href="@page-slug" ("@" alone is the book home).
(function () {
  "use strict";

  // Shared by the hallmarks grid and the spot-the-bad-strategy exercise.
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
          { n: 2, title: "Discovering power", blurb: "Good strategy puts strength against weakness, and finds power in coherence itself." },
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
          { n: 9, title: "Using design", blurb: "Fitting resources and actions together so tightly that they work as one." },
          { n: 10, title: "Focus", blurb: "Coordinating policies so they hit one segment with unusual force.", page: "focus" },
          { n: 11, title: "Growth", blurb: "Why growth pursued for its own sake destroys value, and what healthy growth looks like." },
          { n: 12, title: "Using advantage", blurb: "What an advantage really is, and how to deepen and widen one." },
          { n: 13, title: "Using dynamics", blurb: "Spotting waves of change early and riding them." },
          { n: 14, title: "Inertia and entropy", blurb: "Organizations resist change and drift into disorder. Both create openings." },
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
      { era: "216 BC", title: "Hannibal at Cannae", blurb: "A smaller army encircles a larger Roman one by anticipating exactly how it will attack.", tag: "Using design" },
      { era: "1960s", title: "Surveyor and the Moon", blurb: "Designing a lunar lander became solvable once engineers pinned down what the surface was like.", tag: "Proximate objectives", page: "proximate-objectives" },
      { era: "1960s–80s", title: "Crown Cork & Seal", blurb: "A small can maker outperforms its giant rivals by aiming every policy at hard-to-make cans and the customers who need them.", tag: "Focus", page: "focus" },
      { era: "1991", title: "Desert Storm", blurb: "The coalition avoids Iraq's prepared defenses with a wide swing through the western desert.", tag: "The kernel", page: "kernel" },
      { era: "1997", title: "Apple's turnaround", blurb: "Steve Jobs returns and cuts a sprawling product line down to four.", tag: "The kernel", page: "kernel" },
      { era: "1993–2010", title: "Nvidia", blurb: "A graphics-chip maker rides a wave of change in computing, step by step.", tag: "Putting it together" }
    ],

    pages: {
      "bad-strategy": {
        title: "Bad strategy",
        eyebrow: "Part I · Chapter 03",
        dek:
          "Bad strategy is more than a missing strategy. It is a recognizable set of habits that sound strategic while skipping the hard part: " +
          "naming the problem and choosing what to do about it. Rumelt names four hallmarks.",
        blocks: [
          { type: "hallmarks", label: "The four hallmarks", items: HALLMARKS },
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
            type: "prose",
            sections: [
              {
                title: "Why there is so much of it",
                paras: [
                  "If bad strategy is this easy to spot, why is it everywhere? Rumelt's answer is that good strategy requires choosing, and choosing means saying no to people, ideas and projects that have supporters. It is much easier to write a document that includes everyone's priorities.",
                  "Two habits make the avoidance easy. Template-style strategy fills in a vision, a mission, values and goals, and produces something that looks complete without a single hard choice. A culture of relentless positive thinking treats doubts about the plan as a lack of commitment, so problems go unnamed."
                ],
                side: {
                  label: "Chapter 4",
                  html: "<p>Rumelt traces the second habit to “New Thought,” a movement from around 1900 that held that thinking about success brings it about.</p>"
                }
              }
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

      kernel: {
        title: "The kernel",
        eyebrow: "Part I · Chapter 05",
        dek:
          "Strip any good strategy down and you find three parts: a diagnosis of the challenge, " +
          "a guiding policy for dealing with it, and a set of coherent actions that carry the policy out.",
        blocks: [
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
            type: "prose",
            sections: [
              {
                n: "1",
                title: "Diagnosis",
                paras: [
                  "A diagnosis takes a situation too complicated to grasp all at once and says which parts of it matter. It names the challenge. A good one also reframes the situation, so that some actions start to look clearly better than others.",
                  "Rumelt compares it to a doctor's diagnosis. Once a set of symptoms has a name, a course of treatment follows. Like a doctor's diagnosis, it is a judgment and it can be wrong. Treat it as a <span class=\"term\" tabindex=\"0\" data-def=\"In Part III, Rumelt argues that a strategy is a hypothesis about what will work, to be tested against what actually happens.\">hypothesis</span>, stated plainly enough that events can prove it wrong."
                ],
                side: {
                  label: "In practice",
                  html: "<p>The diagnosis is usually the hardest part to write. It means committing to one reading of the situation and setting the others aside.</p>"
                }
              },
              {
                n: "2",
                title: "Guiding policy",
                paras: [
                  "The guiding policy is the overall approach to the challenge named in the diagnosis. It is not a goal or a vision. It works more like a guardrail: by ruling out a wide range of possible actions, it points effort in one direction without spelling out every step.",
                  "A guiding policy earns its place by creating an advantage. It might anticipate how rivals will respond, make separate actions reinforce one another, or concentrate effort on a <span class=\"term\" tabindex=\"0\" data-def=\"A place where a small push produces a large effect. Rumelt develops the idea in the chapter on leverage.\">pivot point</span> instead of spreading it thin."
                ],
                side: {
                  label: "A quick test",
                  html: "<p>If your guiding policy doesn't make some reasonable-sounding option off-limits, it isn't guiding anything. The workbench checks for this.</p>"
                }
              },
              {
                n: "3",
                title: "Coherent actions",
                paras: [
                  "Strategy is about doing something. A diagnosis and a guiding policy with nothing behind them is commentary. The third part of the kernel is the set of actions that carry out the policy: decisions, commitments of money and people, and changes to how things are done.",
                  "The actions are coherent when they are coordinated. Each makes the others more effective, and none pulls against the policy. This is where strategy gets uncomfortable, because concentrating resources on a few things means taking them away from others, and someone always loses something they cared about."
                ],
                side: {
                  label: "Later in the book",
                  html: "<p>Part II comes back to coherence in the chapters on <a href=\"@\">design</a> and <a href=\"@chain-link\">chain-link systems</a>, where actions only work if they work together.</p>"
                }
              },
              {
                title: "What the kernel leaves out",
                paras: [
                  "Vision statements, mission statements, lists of values and financial targets are all missing from the kernel. Rumelt doesn't say these are useless. He says they aren't strategy, and that confusing them with strategy is one of the most common ways organizations fool themselves.",
                  "A goal like “20% annual growth” says where you would like to end up. It says nothing about what stands in the way or how you will get past it. The kernel is that missing middle."
                ],
                side: {
                  label: "See also",
                  html: "<p>Chapter 3 names four hallmarks of bad strategy. <a href=\"@bad-strategy\">Mistaking goals for strategy</a> is one of them.</p>"
                }
              }
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

      "why-bad-strategy": {
        title: "Why so much bad strategy?",
        navLabel: "Why so much bad strategy",
        eyebrow: "Part I · Chapter 04",
        dek:
          "If bad strategy is so easy to spot, why is it everywhere? Rumelt's answer: good strategy demands choices, and choosing is painful. Templates and relentless positive thinking offer ways to avoid it.",
        blocks: [
          {
            type: "prose",
            sections: [
              {
                n: "1",
                title: "The unwillingness to choose",
                paras: [
                  "Every real strategy says no to something: a market, a product, a project with a powerful sponsor. Saying no disappoints people who can make life hard for you. The easy path is a document that includes everyone's priorities, which is a document with no strategy in it.",
                  "Rumelt's point is that this isn't a failure of intelligence. It is a failure of will, and it happens in smart, successful organizations precisely because so many capable people have something to protect."
                ],
                side: {
                  label: "In the book",
                  html: "<p>Rumelt recounts a meeting at Digital Equipment Corporation in the early 1990s where executives backed different directions and settled on a compromise that committed to none of them.</p>"
                }
              }
            ]
          },
          {
            type: "template-strategy",
            title: "The strategy template machine",
            intro:
              "Press the button for a strategy in the house style of a thousand annual reports. Every draft is complete, confident and well formatted. Then look for the choice.",
            verdict:
              "A complete-looking strategy with no diagnosis, no guiding policy and nothing ruled out. Rumelt calls this template-style strategy: the form of a strategy with none of the substance."
          },
          {
            type: "prose",
            sections: [
              {
                n: "2",
                title: "Template-style strategy",
                paras: [
                  "Templates are popular because they feel like progress. Fill in a vision, a mission, some values and a few goals, and you have a document that looks finished. What it can't contain is the hard part: what is going on, what makes it difficult, and what you will do differently because of it."
                ],
                side: {
                  label: "Try this",
                  html: "<p>Generate a few drafts. Notice that any of them could belong to a bank, a hospital or a bike maker. That interchangeability is the tell.</p>"
                }
              },
              {
                n: "3",
                title: "New Thought",
                paras: [
                  "Rumelt traces a second habit to the New Thought movement of around 1900, which held that thinking about success brings it about. Its modern descendants tell leaders to picture the goal and let belief carry the organization.",
                  "The trouble is what this does to bad news. If doubt counts as disloyalty, nobody names the problem, and a strategy without a named problem has nothing to work on."
                ],
                side: {
                  label: "Why it matters",
                  html: "<p>A culture that punishes doubt can't produce a <a href=\"@kernel\">diagnosis</a>.</p>"
                }
              }
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

      "using-leverage": {
        title: "Using leverage",
        eyebrow: "Part II · Chapter 06",
        dek:
          "Leverage is getting a large result from a focused effort. Rumelt finds it in three places: anticipating what others will do, finding the pivot points where a small push has a large effect, and concentrating effort instead of spreading it.",
        blocks: [
          {
            type: "prose",
            sections: [
              {
                n: "1",
                title: "Anticipation",
                paras: [
                  "Much of the leverage in strategy comes from seeing what others will do, or what will happen anyway, before it happens. A strategist who correctly anticipates a rival's response, a shift in demand or a change in the rules can put resources where they will be needed, instead of reacting late."
                ],
                side: {
                  label: "See also",
                  html: "<p>A good <a href=\"@kernel\">guiding policy</a> often works by anticipating how others will respond.</p>"
                }
              },
              {
                n: "2",
                title: "Pivot points",
                paras: [
                  "A pivot point is a place where a small, well-aimed push produces a large effect: a bottleneck, a customer whose choice others follow, an idea that changes how people see the situation. Finding one depends on the diagnosis. You can only aim at a pivot point once you understand which parts of the situation really matter."
                ],
                side: {
                  label: "On the map",
                  html: "<p>The contour map on <a href=\"@\">this book's home page</a> marks a pivot point for this reason.</p>"
                }
              }
            ]
          },
          {
            type: "concentration",
            title: "Spread or concentrate",
            intro:
              "An invented company has ten units of effort (people, money, management attention) to put behind five initiatives. Each one pays off only once it gets enough effort to cross its threshold, and effort past the threshold adds a little more. Spread the effort, or concentrate it.",
            impactLabel: "Impact",
            budget: 10,
            emptyNote: "No effort placed yet. Use + to add effort to an initiative, or try a preset.",
            start: [2, 2, 2, 2, 2],
            focus: [5, 5, 0, 0, 0],
            fronts: [
              { name: "Launch a new product line", threshold: 4, value: 30 },
              { name: "Enter a new region", threshold: 5, value: 35 },
              { name: "Win back lost customers", threshold: 3, value: 18 },
              { name: "Cut delivery times", threshold: 3, value: 20 },
              { name: "Rebuild the website", threshold: 3, value: 8 }
            ]
          },
          {
            type: "prose",
            sections: [
              {
                n: "3",
                title: "Concentration and thresholds",
                paras: [
                  "Many results only appear once effort passes a threshold: a product that is nearly good enough doesn't sell, and a campaign that nearly reaches people isn't noticed. Effort spread across many targets can leave every one of them below its threshold, so nothing changes.",
                  "Concentrating on a few targets gets them past it. That is why a strategy that tries to do everything usually changes nothing, and why choosing what not to do is part of the work."
                ],
                side: {
                  label: "Try this",
                  html: "<p>Press “Spread evenly”: every initiative gets two units and none crosses its threshold. Then press “Concentrate”.</p>"
                }
              }
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

      "proximate-objectives": {
        title: "Proximate objectives",
        eyebrow: "Part II · Chapter 07",
        dek:
          "A good strategy turns an overwhelming aspiration into objectives close enough to reach. A proximate objective is one the organization can reasonably be expected to hit, and hitting it makes the next step clearer.",
        blocks: [
          {
            type: "prose",
            sections: [
              {
                n: "1",
                title: "Close enough to act on",
                paras: [
                  "Leaders are often told to set ambitious goals. Rumelt's point is different. Strategy has to produce objectives close enough that people can actually get to work on them. An objective that is as hard as the original problem doesn't help; it only restates it.",
                  "A proximate objective resolves enough ambiguity to act. It names a target the organization can reasonably be expected to hit with what it knows and has, and reaching it changes the situation so that the next step becomes clearer."
                ],
                side: {
                  label: "See also",
                  html: "<p>Objectives no easier than the original problem are one of the <a href=\"@bad-strategy\">hallmarks of bad strategy</a> in Chapter 3.</p>"
                }
              },
              {
                n: "2",
                title: "The Surveyor problem",
                paras: [
                  "Rumelt, who started his career as an engineer at NASA's Jet Propulsion Laboratory, tells how engineers there had to design an unmanned lunar lander before anyone knew what the Moon's surface was like. Was it hard rock, or dust deep enough to swallow a spacecraft? Without an answer, nobody could design the landing legs.",
                  "The way forward was a specification that simply assumed a surface: firm ground with scattered rocks, much like the deserts of the American Southwest. It might have been wrong. But it gave the engineers a problem they could solve, which is what a proximate objective is for."
                ],
                side: {
                  label: "Why it worked",
                  html: "<p>The assumption turned an unknown into a stated design condition. If it proved wrong, the team would at least know which assumption to revisit.</p>"
                }
              }
            ]
          },
          {
            type: "sorter",
            title: "Proximate or blue-sky?",
            intro:
              "Seven objectives. For each, decide whether a team could start on it tomorrow and know when it's done, or whether it only restates the hope. Blue-sky ones come with a proximate rewrite. The organizations are invented.",
            options: [
              { id: "near", label: "Proximate", hint: "Close enough to act on" },
              { id: "far", label: "Blue-sky", hint: "As hard as the original problem" }
            ],
            rewriteLabel: "A proximate version",
            items: [
              {
                text: "Become the most innovative company in our industry.",
                answer: "far",
                why: "It names a hope, not a problem anyone can work on. Nobody can tell what to do on Monday, or when it's done.",
                rewrite: "Put the redesigned checkout in front of 10% of customers by March and measure how many finish their order."
              },
              {
                text: "Cut the time to quote a custom order from five days to two by the end of the quarter.",
                answer: "near",
                why: "It's specific, within the team's control, and clearly done or not done. Reaching it also shows where quotes really get stuck."
              },
              {
                text: "Design the landing legs for firm ground with scattered rocks, like the desert Southwest.",
                answer: "near",
                why: "This is the Surveyor move: an assumption that turns an unknown into something engineers can design for."
              },
              {
                text: "Win in Asia.",
                answer: "far",
                why: "A destination, not a step. It leaves every hard question open: which country, which customers, which product.",
                rewrite: "Sign two distributors in Singapore this year and learn which of our three products sells there."
              },
              {
                text: "Train every service technician on the new model before it launches.",
                answer: "near",
                why: "Clear, feasible and checkable, and it removes a known obstacle to the launch."
              },
              {
                text: "Delight customers at every touchpoint.",
                answer: "far",
                why: "Pleasant, but it doesn't choose. Every touchpoint at once means no touchpoint in particular.",
                rewrite: "Answer every support email within four hours for the next quarter, then compare repeat purchases."
              },
              {
                text: "Transform our culture to be more agile.",
                answer: "far",
                why: "As hard as the original problem, and nobody knows what done looks like.",
                rewrite: "Cut the approval steps for small product changes from five to two, and track how long changes take."
              }
            ]
          },
          {
            type: "prose",
            sections: [
              {
                n: "3",
                title: "Proximate isn't the same as easy",
                paras: [
                  "Proximate objectives can be hard. The test is whether the organization can reasonably be expected to reach them, given what it knows and has. The more uncertain the situation, the closer in the objectives need to be. When the ground is shifting, the right objective may be to learn something rather than to hit a number."
                ],
                side: {
                  label: "A quick test",
                  html: "<p>If you can't say what the team will do first, the objective isn't proximate yet.</p>"
                }
              }
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

      "chain-link": {
        title: "Chain-link systems",
        eyebrow: "Part II · Chapter 08",
        dek:
          "When a system's performance depends on its weakest part, improving any other part does nothing. That makes chain-link systems easy to get stuck in, and hard for rivals to copy once they work well.",
        blocks: [
          {
            type: "chain-link",
            title: "Find the weakest link",
            intro:
              "An invented neighborhood restaurant. Diners judge the evening by its worst part, so the evening is only as good as the weakest of the five below. You have six improvement points. Spend them one at a time and watch what moves.",
            outputLabel: "Evening",
            outputNoun: "evening",
            points: 6,
            startNote: "Each point raises one part by 1. Try improving something other than the weakest link first.",
            links: [
              { name: "Ingredients", level: 8, desc: "Sourcing and freshness." },
              { name: "Kitchen", level: 7, desc: "Cooking and plating." },
              { name: "Service", level: 4, desc: "Timing and attention at the table." },
              { name: "Bookings", level: 5, desc: "Getting a table when you want one." },
              { name: "Dining room", level: 6, desc: "Noise, light and comfort." }
            ]
          },
          {
            type: "prose",
            sections: [
              {
                n: "1",
                title: "Only as strong as the weakest link",
                paras: [
                  "In many systems the parts add up: a better part makes the whole a little better. In a chain-link system they don't. Performance is set by the weakest part, so effort spent anywhere else is wasted until that part improves.",
                  "Plenty of real operations work this way. A product launch is only as good as the slowest team that has to deliver for it, and a fast kitchen doesn't help if the servers can't keep up."
                ],
                side: {
                  label: "Try this",
                  html: "<p>Improve Service once. Bookings is now just as weak, and raising either one alone changes nothing. You have to move both.</p>"
                }
              },
              {
                n: "2",
                title: "Getting stuck",
                paras: [
                  "Rumelt's word for this is stuck. When several links are equally weak, no single improvement shows up in the result, so each one looks pointless and none gets made. Getting unstuck takes someone who can see the whole system and coordinate several changes at once."
                ],
                side: {
                  label: "Why it matters",
                  html: "<p>Coordinated change usually has to come from someone with authority over the whole system, not from each part improving on its own.</p>"
                }
              },
              {
                n: "3",
                title: "Why excellence is hard to copy",
                paras: [
                  "The same logic protects a chain-link system that works well. A rival who copies three of the five parts gets almost nothing; to match the result, they have to match every link. Excellence built across many linked parts is one of the more durable advantages a company can have."
                ],
                side: {
                  label: "Later in the book",
                  html: "<p>The chapters on design and on using advantage build on the same idea of tightly fitted parts.</p>"
                }
              }
            ]
          }
        ],
        end: {
          related: [
            { title: "Proximate objectives", where: "Chapter 7", page: "proximate-objectives" },
            { title: "Using design", where: "Chapter 9" },
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
                  html: "<p>Chapter 11, on growth, picks up Crown's story after Connelly, when buying other can makers replaced focus as the plan.</p>"
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
            { title: "Using design", where: "Chapter 9" },
            { title: "Growth", where: "Chapter 11" }
          ],
          cta: { page: "builder", kicker: "Workbench", text: "Write a guiding policy that picks a target" }
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
