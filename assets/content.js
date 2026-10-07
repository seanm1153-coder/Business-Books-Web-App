// Content for Marginalia. Everything the pages render lives here as data,
// so adding a book means adding an entry, not new page code.
// Summaries are paraphrased; keep quotations short and attributed.

window.MARGINALIA = {
  books: [
    { id: "gsbs", route: "book", title: "Good Strategy Bad Strategy", author: "Richard P. Rumelt", year: 2011, status: "open", cover: "gsbs" },
    { id: "fi", title: "Financial Intelligence", author: "Karen Berman & Joe Knight", year: 2013, status: "forthcoming", cover: "fi" }
  ],

  gsbs: {
    subtitle: "The difference and why it matters",
    thesis:
      "Most of what passes for strategy is a list of goals written in confident language. " +
      "Rumelt argues that a real strategy has three parts: an honest diagnosis of the challenge, " +
      "an approach that rules things out, and actions that reinforce one another.",

    parts: [
      {
        n: "I",
        title: "Good and bad strategy",
        chapters: [
          { n: 1, title: "Good strategy is unexpected", blurb: "Few organizations have a real strategy, so one that does catches rivals off guard." },
          { n: 2, title: "Discovering power", blurb: "Good strategy puts strength against weakness, and finds power in coherence itself." },
          { n: 3, title: "Bad strategy", blurb: "Fluff, failure to face the challenge, mistaking goals for strategy, and bad strategic objectives." },
          { n: 4, title: "Why so much bad strategy?", blurb: "Choosing is hard. Templates and positive thinking offer ways to avoid it." },
          { n: 5, title: "The kernel of good strategy", blurb: "Diagnosis, guiding policy and coherent action.", route: "kernel" }
        ]
      },
      {
        n: "II",
        title: "Sources of power",
        chapters: [
          { n: 6, title: "Using leverage", blurb: "Anticipation, pivot points and concentration: where a little effort moves a lot." },
          { n: 7, title: "Proximate objectives", blurb: "Targets close enough to reach, which turn a vague aspiration into a solvable problem." },
          { n: 8, title: "Chain-link systems", blurb: "When every link matters, improving one does nothing until the weakest is fixed." },
          { n: 9, title: "Using design", blurb: "Fitting resources and actions together so tightly that they work as one." },
          { n: 10, title: "Focus", blurb: "Coordinating policies so they hit one segment with unusual force." },
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
          { n: 16, title: "The science of strategy", blurb: "A strategy is a hypothesis. Your edge is what you know that others don't." },
          { n: 17, title: "Using your head", blurb: "Habits for thinking past the first idea that comes to mind." },
          { n: 18, title: "Keeping your head", blurb: "Holding on to your own judgment when everyone around you agrees." }
        ]
      }
    ],

    cases: [
      { era: "216 BC", title: "Hannibal at Cannae", blurb: "A smaller army encircles a larger Roman one by anticipating exactly how it will attack.", tag: "Using design" },
      { era: "1960s", title: "Surveyor and the Moon", blurb: "Designing a lunar lander became solvable once engineers pinned down what the surface was like.", tag: "Proximate objectives" },
      { era: "1991", title: "Desert Storm", blurb: "The coalition avoids Iraq's prepared defenses with a wide swing through the western desert.", tag: "The kernel", route: "kernel" },
      { era: "1997", title: "Apple's turnaround", blurb: "Steve Jobs returns and cuts a sprawling product line down to four.", tag: "The kernel", route: "kernel" },
      { era: "1993–2010", title: "Nvidia", blurb: "A graphics-chip maker rides a wave of change in computing, step by step.", tag: "Putting it together" }
    ],

    kernel: {
      dek:
        "Strip any good strategy down and you find three parts: a diagnosis of the challenge, " +
        "a guiding policy for dealing with it, and a set of coherent actions that carry the policy out.",
      caption: "The general form, then two cases from the book in the same three parts. Case summaries are paraphrased.",
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
      ],
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
            html: "<p>Part II comes back to coherence in the chapters on <a href=\"#book\">design</a> and <a href=\"#book\">chain-link systems</a>, where actions only work if they work together.</p>"
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
            html: "<p>Chapter 3 names four hallmarks of bad strategy. <em>Mistaking goals for strategy</em> is one of them.</p>"
          }
        }
      ],
      related: [
        { title: "Bad strategy", where: "Chapter 3" },
        { title: "Proximate objectives", where: "Chapter 7" },
        { title: "Chain-link systems", where: "Chapter 8" },
        { title: "Focus", where: "Chapter 10" }
      ]
    },

    builderExamples: {
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
};
