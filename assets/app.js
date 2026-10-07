(function () {
  "use strict";

  const M = window.MARGINALIA;
  const G = M.gsbs;
  const view = document.getElementById("view");
  const crumbsEl = document.getElementById("crumbs");
  const bookNavEl = document.getElementById("booknav");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const pad2 = (n) => String(n).padStart(2, "0");

  // localStorage can be missing or blocked; every access is guarded.
  const store = {
    get(key) {
      try {
        const v = localStorage.getItem(key);
        return v ? JSON.parse(v) : null;
      } catch (e) {
        return null;
      }
    },
    set(key, val) {
      try {
        localStorage.setItem(key, JSON.stringify(val));
        return true;
      } catch (e) {
        return false;
      }
    }
  };

  /* ---------- Routing ---------- */

  const CRUMB = {
    shelf: { label: "Library", href: "#shelf" },
    book: { label: "Good Strategy Bad Strategy", href: "#book" },
    kernel: { label: "The kernel", href: "#kernel" },
    builder: { label: "Kernel workbench", href: "#builder" }
  };

  const ROUTES = {
    shelf: { page: "night", header: "night", trail: ["shelf"], render: renderShelf },
    book: { page: "paper", header: "night", trail: ["shelf", "book"], render: renderBook },
    kernel: { page: "paper", header: "paper", trail: ["shelf", "book", "kernel"], render: renderKernel },
    builder: { page: "paper", header: "paper", trail: ["shelf", "book", "builder"], render: renderBuilder }
  };

  function currentRoute() {
    const r = location.hash.slice(1);
    return ROUTES[r] ? r : "shelf";
  }

  function go() {
    const name = currentRoute();
    const route = ROUTES[name];
    document.body.dataset.page = route.page;
    document.body.dataset.header = route.header;
    renderChrome(name, route);
    route.render();
    window.scrollTo(0, 0);
    view.focus({ preventScroll: true });
  }

  function renderChrome(name, route) {
    crumbsEl.innerHTML = route.trail
      .map((id, i) => {
        const c = CRUMB[id];
        const last = i === route.trail.length - 1;
        return (i ? '<span class="sep" aria-hidden="true">/</span>' : "") +
          (last ? `<span aria-current="page">${esc(c.label)}</span>` : `<a href="${c.href}">${esc(c.label)}</a>`);
      })
      .join("");

    const inBook = name !== "shelf";
    bookNavEl.hidden = !inBook;
    if (inBook) {
      bookNavEl.innerHTML = [
        ["book", "Overview"],
        ["kernel", "The kernel"],
        ["builder", "Workbench"]
      ]
        .map(([id, label]) => `<a href="#${id}"${id === name ? ' aria-current="page"' : ""}>${label}</a>`)
        .join("");
    }
  }

  /* ---------- Library shelf ---------- */

  function renderShelf() {
    const open = M.books.filter((b) => b.status === "open").length;
    view.innerHTML = `
      <section class="night shelf-page">
        <div class="wrap">
          <div class="shelf-intro">
            <p class="eyebrow">The library</p>
            <h1 class="display shelf-title">Business books, read slowly.</h1>
            <p class="lede">Each book on the shelf becomes a set of pages to explore: its ideas mapped and explained, its examples taken apart, and tools for trying its frameworks on problems of your own.</p>
          </div>
          <ul class="shelf" role="list">${M.books.map(bookHTML).join("")}</ul>
          <p class="shelf-note">${open} open · ${M.books.length - open} forthcoming</p>
        </div>
      </section>`;
  }

  function bookHTML(b) {
    const open = b.status === "open";
    const inner = `
      <span class="book-3d" aria-hidden="true">
        <span class="book-face cover">
          <span class="cover-title">${esc(b.title)}</span>
          <span class="cover-author">${esc(b.author)}</span>
        </span>
        <span class="book-face spine"></span>
        <span class="book-face pages"></span>
      </span>
      <span class="book-meta">
        <span class="book-title">${esc(b.title)}</span>
        <span class="book-sub">${esc(b.author)} · ${b.year}</span>
        <span class="chip ${open ? "chip-open" : "chip-muted"}">${open ? "Open" : "Forthcoming"}</span>
      </span>`;
    return `<li class="book c-${b.cover} ${open ? "is-open" : "is-forthcoming"}">${
      open
        ? `<a class="book-link" href="#${b.route}">${inner}</a>`
        : `<div class="book-link" aria-disabled="true">${inner}</div>`
    }</li>`;
  }

  /* ---------- Book home ---------- */

  function renderBook() {
    view.innerHTML = `
      <section class="night book-hero">
        <canvas class="contours" id="contours" aria-hidden="true"></canvas>
        <div class="wrap hero-inner">
          <p class="eyebrow">Richard P. Rumelt · 2011</p>
          <h1 class="display hero-title">Good Strategy <span class="hero-bad">Bad Strategy</span></h1>
          <p class="hero-sub">${esc(G.subtitle)}</p>
          <p class="lede">${esc(G.thesis)}</p>
          <div class="entries">
            <a class="entry" href="#kernel">
              <span class="entry-k">Start here</span>
              <span class="entry-t">The kernel <span class="arrow" aria-hidden="true">→</span></span>
              <span class="entry-d">The three-part structure under every good strategy.</span>
            </a>
            <a class="entry" href="#builder">
              <span class="entry-k">Workbench</span>
              <span class="entry-t">Build a kernel <span class="arrow" aria-hidden="true">→</span></span>
              <span class="entry-d">Write a strategy and check it against Rumelt's tests.</span>
            </a>
            <button class="entry" type="button" data-scroll="map">
              <span class="entry-k">Contents</span>
              <span class="entry-t">Map of the book <span class="arrow" aria-hidden="true">↓</span></span>
              <span class="entry-d">Three parts, eighteen chapters, one idea each.</span>
            </button>
          </div>
        </div>
      </section>

      <section class="paper-section" id="map">
        <div class="wrap">
          <div class="section-head">
            <p class="eyebrow">Map of the book</p>
            <h2 class="h2">Three parts, eighteen chapters</h2>
            <p class="section-dek">Pages open as they're written. The kernel is the first one ready.</p>
          </div>
          <div class="parts">${G.parts.map(partHTML).join("")}</div>
        </div>
      </section>

      <section class="paper-section">
        <div class="wrap">
          <div class="section-head">
            <p class="eyebrow">Cases</p>
            <h2 class="h2">The stories Rumelt uses</h2>
          </div>
          <ul class="cases" role="list">${G.cases.map(caseHTML).join("")}</ul>
        </div>
      </section>`;

    view.querySelector('[data-scroll="map"]').addEventListener("click", () => {
      document.getElementById("map").scrollIntoView({ behavior: reducedMotion.matches ? "auto" : "smooth" });
    });
    drawContours(document.getElementById("contours"));
  }

  function partHTML(p) {
    const rows = p.chapters
      .map((c) => {
        const live = Boolean(c.route);
        const tag = live ? "a" : "div";
        return `<li><${tag} class="chapter${live ? " is-live" : ""}"${live ? ` href="#${c.route}"` : ""}>
          <span class="ch-n">${pad2(c.n)}</span>
          <span class="ch-body"><span class="ch-t">${esc(c.title)}</span><span class="ch-d">${esc(c.blurb)}</span></span>
          <span class="chip ${live ? "chip-open" : "chip-muted"}">${live ? "Open" : "In draft"}</span>
        </${tag}></li>`;
      })
      .join("");
    return `<div class="part">
      <p class="eyebrow">Part ${p.n}</p>
      <h3 class="part-t">${esc(p.title)}</h3>
      <ol class="chapters" role="list">${rows}</ol>
    </div>`;
  }

  function caseHTML(c) {
    const tag = c.route
      ? `<a class="case-tag is-live" href="#${c.route}">${esc(c.tag)} →</a>`
      : `<span class="case-tag">${esc(c.tag)}</span>`;
    return `<li class="case">
      <span class="case-era">${esc(c.era)}</span>
      <span class="case-body"><span class="case-t">${esc(c.title)}</span><span class="case-d">${esc(c.blurb)}</span></span>
      ${tag}
    </li>`;
  }

  // Topographic contour lines (marching squares over a few gaussian hills),
  // with the highest hill marked as the pivot point.
  function drawContours(canvas) {
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const w = Math.max(1, Math.round(rect.width));
    const h = Math.max(1, Math.round(rect.height));
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    const ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    const css = getComputedStyle(document.documentElement);
    const lineColor = css.getPropertyValue("--night-line").trim();
    const strongColor = css.getPropertyValue("--night-line-strong").trim();
    const pen = css.getPropertyValue("--pen-bright").trim();
    const dim = css.getPropertyValue("--night-dim").trim();
    const mono = css.getPropertyValue("--mono").trim();

    const wide = w >= 760;
    const S = Math.min(w, h * 1.6);
    const hills = [
      wide ? { x: 0.76, y: 0.34, s: 0.2, a: 1 } : { x: 0.74, y: 0.1, s: 0.26, a: 1 },
      { x: 0.95, y: 0.85, s: 0.24, a: 0.55 },
      { x: 0.5, y: 0.05, s: 0.14, a: 0.4 },
      { x: 1.0, y: 0.15, s: 0.12, a: 0.35 },
      { x: 0.28, y: 1.0, s: 0.2, a: 0.3 }
    ];
    const f = (x, y) => {
      let v = 0;
      for (const p of hills) {
        const dx = (x - p.x * w) / (p.s * S);
        const dy = (y - p.y * h) / (p.s * S);
        v += p.a * Math.exp(-(dx * dx + dy * dy));
      }
      return v + 0.05 * Math.sin(x * 0.011 + y * 0.004) * Math.cos(y * 0.013 - x * 0.003);
    };

    const cell = 7;
    const cols = Math.ceil(w / cell) + 1;
    const rows = Math.ceil(h / cell) + 1;
    const grid = new Float32Array(cols * rows);
    for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) grid[j * cols + i] = f(i * cell, j * cell);

    let k = 0;
    for (let L = 0.08; L < 1.05; L += 0.06, k++) {
      ctx.beginPath();
      for (let j = 0; j < rows - 1; j++) {
        for (let i = 0; i < cols - 1; i++) {
          const a = grid[j * cols + i];
          const b = grid[j * cols + i + 1];
          const c = grid[(j + 1) * cols + i + 1];
          const d = grid[(j + 1) * cols + i];
          const idx = (a > L ? 8 : 0) | (b > L ? 4 : 0) | (c > L ? 2 : 0) | (d > L ? 1 : 0);
          if (idx === 0 || idx === 15) continue;
          const x = i * cell;
          const y = j * cell;
          const t = (p, q) => (L - p) / (q - p);
          const top = [x + cell * t(a, b), y];
          const right = [x + cell, y + cell * t(b, c)];
          const bottom = [x + cell * t(d, c), y + cell];
          const left = [x, y + cell * t(a, d)];
          const seg = (p, q) => {
            ctx.moveTo(p[0], p[1]);
            ctx.lineTo(q[0], q[1]);
          };
          switch (idx) {
            case 1: case 14: seg(left, bottom); break;
            case 2: case 13: seg(bottom, right); break;
            case 3: case 12: seg(left, right); break;
            case 4: case 11: seg(top, right); break;
            case 5: seg(left, top); seg(bottom, right); break;
            case 6: case 9: seg(top, bottom); break;
            case 7: case 8: seg(left, top); break;
            case 10: seg(left, bottom); seg(top, right); break;
          }
        }
      }
      const strong = k % 4 === 3;
      ctx.strokeStyle = strong ? strongColor : lineColor;
      ctx.lineWidth = strong ? 1.1 : 0.75;
      ctx.stroke();
    }

    const px = hills[0].x * w;
    const py = hills[0].y * h;
    ctx.strokeStyle = pen;
    ctx.fillStyle = pen;
    ctx.lineWidth = 1.25;
    ctx.beginPath();
    ctx.arc(px, py, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(px, py, 13, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(px + 13, py);
    ctx.lineTo(px + 44, py);
    ctx.stroke();
    ctx.fillStyle = dim;
    ctx.font = `11px ${mono || "monospace"}`;
    ctx.textBaseline = "middle";
    const label = "PIVOT POINT";
    const lw = ctx.measureText(label).width;
    const lx = px + 50 + lw > w - 8 ? px - 50 - lw : px + 50;
    if (lx < px) {
      ctx.beginPath();
      ctx.moveTo(px - 13, py);
      ctx.lineTo(px - 44, py);
      ctx.strokeStyle = pen;
      ctx.stroke();
    }
    ctx.fillText(label, lx, py);
  }

  let resizeTimer = 0;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => drawContours(document.getElementById("contours")), 150);
  });
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => drawContours(document.getElementById("contours")));
  }

  /* ---------- Concept: the kernel ---------- */

  function renderKernel() {
    const k = G.kernel;
    const first = k.views[0];
    view.innerHTML = `
      <article class="paper-section concept">
        <div class="wrap">
          <header class="concept-head">
            <p class="eyebrow">Part I · Chapter 05</p>
            <h1 class="display concept-title">The kernel</h1>
            <p class="dek">${esc(k.dek)}</p>
          </header>

          <figure class="kernel-fig">
            <div class="tabs" role="tablist" aria-label="Choose an example">
              ${k.views
                .map(
                  (v, i) =>
                    `<button class="pill" role="tab" type="button" id="tab-${v.id}" data-view="${v.id}" aria-controls="kernel-panels" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}">${esc(v.label)}</button>`
                )
                .join("")}
            </div>
            <div class="kernel-panels" id="kernel-panels" role="tabpanel" aria-labelledby="tab-${first.id}">${panelsHTML(first)}</div>
            <figcaption class="caption">${esc(k.caption)}</figcaption>
          </figure>

          <div class="concept-body">${k.sections.map(sectionHTML).join("")}</div>

          <div class="concept-end">
            <div class="related">
              <p class="eyebrow">Related ideas</p>
              <ul role="list">
                ${k.related
                  .map((r) => `<li><span class="rel-t">${esc(r.title)}</span><span class="rel-w">${esc(r.where)}</span><span class="chip chip-muted">In draft</span></li>`)
                  .join("")}
              </ul>
            </div>
            <a class="cta" href="#builder">
              <span class="cta-k">Workbench</span>
              <span class="cta-t">Try the kernel on your own problem</span>
              <span class="cta-go" aria-hidden="true">→</span>
            </a>
          </div>
          <p class="fineprint">Summaries on this page are written in our own words from Richard P. Rumelt, <cite>Good Strategy Bad Strategy</cite> (Crown Business, 2011). Read the book for the full argument.</p>
        </div>
      </article>`;

    const tabs = Array.from(view.querySelectorAll('[role="tab"]'));
    const panels = document.getElementById("kernel-panels");

    function select(tab) {
      tabs.forEach((t) => {
        const on = t === tab;
        t.setAttribute("aria-selected", String(on));
        t.tabIndex = on ? 0 : -1;
      });
      const v = k.views.find((x) => x.id === tab.dataset.view);
      panels.setAttribute("aria-labelledby", tab.id);
      if (reducedMotion.matches) {
        panels.innerHTML = panelsHTML(v);
        return;
      }
      panels.classList.add("is-swapping");
      setTimeout(() => {
        panels.innerHTML = panelsHTML(v);
        requestAnimationFrame(() => requestAnimationFrame(() => panels.classList.remove("is-swapping")));
      }, 160);
    }

    tabs.forEach((tab, i) => {
      tab.addEventListener("click", () => select(tab));
      tab.addEventListener("keydown", (e) => {
        if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
        e.preventDefault();
        const next = tabs[(i + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length];
        next.focus();
        select(next);
      });
    });
  }

  function panelsHTML(v) {
    const parts = [
      ["1", "Diagnosis", "What is going on here?", v.diagnosis],
      ["2", "Guiding policy", "How will we deal with it?", v.policy],
      ["3", "Coherent actions", "What will we do?", v.actions]
    ];
    return parts
      .map(
        ([n, title, q, body]) => `
        <section class="kpanel">
          <p class="kpanel-k">Step ${n}</p>
          <h3 class="kpanel-t">${title}</h3>
          <p class="kpanel-q">${q}</p>
          <div class="kpanel-body">${
            Array.isArray(body)
              ? `<ul>${body.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>`
              : `<p>${esc(body)}</p>`
          }</div>
        </section>`
      )
      .join("");
  }

  // Section paragraphs are trusted HTML from content.js (they carry term markup).
  function sectionHTML(s) {
    return `<section class="prose-row">
      <div class="prose">
        <h2>${s.n ? `<span class="h-n">${s.n}</span>` : ""}${esc(s.title)}</h2>
        ${s.paras.map((p) => `<p>${p}</p>`).join("")}
      </div>
      ${s.side ? `<aside class="sidenote"><p class="sidenote-k">${esc(s.side.label)}</p>${s.side.html}</aside>` : ""}
    </section>`;
  }

  /* ---------- Workbench: build a kernel ---------- */

  const DRAFT_KEY = "marginalia.gsbs.kernel-draft";

  const CHALLENGE =
    /\b(problem|problems|challenge|obstacle|obstacles|because|threat|threats|losing|lose|loses|can't|cannot|unable|risk|risks|constraint|bottleneck|declin\w*|shrink\w*|squeez\w*|run(?:ning)? out|too (?:many|few|slow|expensive|late)|behind|struggl\w*|weak\w*|stuck|failing|fails)\b/i;
  const RULES_OUT =
    /\b(instead of|rather than|only|not|no longer|stop|avoid|exit|cut|drop|abandon|concentrate|focus(?:ed)? on|narrow|fewer|less|never|refuse)\b/i;
  const GOAL_PATTERNS = [
    /\b(?:become|be|remain|stay)\s+(?:the|a|an|our)\s+(?:[\w-]+\s+){0,3}?(?:leader|leading|best|premier|top|number one|no\. ?1|#1|dominant|preferred|go-to)\b(?:\s+[\w-]+){0,2}/gi,
    /\b(?:grow|increase|boost|double|triple|raise|lift|reach|hit|achieve|deliver)\b[^.,;\n]{0,40}?\d[\d,.]*\s?(?:%|percent\b|x\b|million\b|billion\b|k\b)(?:\s+(?:year[- ]over[- ]year|annually|a year|per year|growth))?/gi,
    /\b(?:maximi[sz]e|optimi[sz]e)\s+(?:(?:shareholder|stakeholder|long-term)\s+)?(?:value|returns|revenue|profits?)\b/gi,
    /\b(?:increase|grow|improve|boost|raise)\s+(?:our\s+)?(?:revenue|sales|profits?|profitability|market share|customer satisfaction(?: scores)?|margins?|engagement)\b/gi
  ];
  const FLUFF_TERMS = [
    "world-class", "world class", "world-leading", "best-in-class", "best in class", "customer-centric", "customer centric",
    "synergy", "synergies", "synergistic", "leveraging", "leverage our", "drive innovation", "driving innovation",
    "innovative solutions", "empower", "empowering", "excellence", "holistic", "paradigm", "transformational",
    "digital transformation", "next-generation", "next generation", "cutting-edge", "cutting edge", "value-added",
    "seamless", "seamlessly", "robust", "unlock value", "stakeholder value", "best practices", "game-changing",
    "game changer", "move the needle", "strategic alignment", "thought leader\\w*", "disrupt\\w*", "deliver value",
    "value proposition"
  ];
  const FLUFF_RE = new RegExp(`\\b(?:${FLUFF_TERMS.join("|")})\\b`, "gi");

  function findMarks(text) {
    const all = [];
    const collect = (re, kind) => {
      re.lastIndex = 0;
      let m;
      while ((m = re.exec(text))) {
        const raw = m[0];
        const trimmed = raw.replace(/\s+$/, "");
        if (trimmed) all.push({ s: m.index, e: m.index + trimmed.length, kind, text: trimmed });
        if (!raw.length) re.lastIndex++;
      }
    };
    GOAL_PATTERNS.forEach((re) => collect(re, "goal"));
    collect(FLUFF_RE, "fluff");
    all.sort((a, b) => a.s - b.s || b.e - b.s - (a.e - a.s));
    const marks = [];
    let end = -1;
    for (const f of all) {
      if (f.s >= end) {
        marks.push(f);
        end = f.e;
      }
    }
    return { marks, all };
  }

  function markup(text) {
    if (!text.trim()) return '<span class="rb-empty">Not written yet.</span>';
    const { marks } = findMarks(text);
    let out = "";
    let i = 0;
    for (const m of marks) {
      out += esc(text.slice(i, m.s));
      const title = m.kind === "goal" ? "Reads as a goal" : "Sounds strategic, says little";
      out += `<mark class="m-${m.kind}" title="${title}">${esc(text.slice(m.s, m.e))}</mark>`;
      i = m.e;
    }
    return out + esc(text.slice(i));
  }

  function listNums(nums, noun) {
    if (nums.length === 1) return `${noun} ${nums[0]}`;
    return `${noun}s ${nums.slice(0, -1).join(", ")} and ${nums[nums.length - 1]}`;
  }

  function runChecks(s) {
    const D = s.diagnosis.trim();
    const P = s.policy.trim();
    const acts = s.actions.map((a, i) => ({ ...a, n: i + 1 })).filter((a) => a.text.trim());
    const checks = [];

    // 1. Diagnosis names the challenge
    if (D.length < 25) {
      checks.push({
        status: "fail",
        title: "Diagnosis names the challenge",
        detail: D ? "Your diagnosis is very short. Say what is going on and what makes it hard." : "Write a diagnosis first. Say what is going on and what makes it hard."
      });
    } else if (CHALLENGE.test(D)) {
      checks.push({ status: "pass", title: "Diagnosis names the challenge", detail: "It names an obstacle, which gives the rest of the strategy something to act on." });
    } else {
      checks.push({ status: "warn", title: "Diagnosis names the challenge", detail: "It describes the situation but doesn't name an obstacle. What, specifically, is in the way?" });
    }

    // 2. Guiding policy is an approach, not a goal
    const policyGoals = P ? findMarks(P).all.filter((m) => m.kind === "goal") : [];
    if (!P) {
      checks.push({ status: "fail", title: "Policy is an approach, not a goal", detail: "Write a guiding policy: the overall approach you will take to the challenge." });
    } else if (policyGoals.length) {
      checks.push({
        status: "warn",
        title: "Policy is an approach, not a goal",
        detail: `“${policyGoals[0].text}” reads as a goal. A guiding policy says how you will deal with the challenge, not the result you hope for.`
      });
    } else {
      checks.push({ status: "pass", title: "Policy is an approach, not a goal", detail: "It describes how you will act, not just where you want to end up." });
    }

    // 3. Guiding policy rules things out
    if (!P) {
      checks.push({ status: "fail", title: "Policy rules things out", detail: "A guiding policy works like a guardrail. Once you write one, say what it rules out." });
    } else if (RULES_OUT.test(P)) {
      checks.push({ status: "pass", title: "Policy rules things out", detail: "It says what you won't do, which is what makes it useful for deciding." });
    } else {
      checks.push({ status: "warn", title: "Policy rules things out", detail: "Nothing in it rules anything out. What will you stop doing, or refuse to do?" });
    }

    // 4. Every action serves the policy
    const orphans = acts.filter((a) => !a.linked).map((a) => a.n);
    if (!acts.length) {
      checks.push({ status: "fail", title: "Every action serves the policy", detail: "Add at least one action. Without actions, a strategy is only commentary." });
    } else if (orphans.length) {
      const one = orphans.length === 1;
      checks.push({
        status: "warn",
        title: "Every action serves the policy",
        detail: `${listNums(orphans, "Action")} ${one ? "isn't" : "aren't"} linked to the policy. Cut ${one ? "it" : "them"}, or change the policy so ${one ? "it belongs" : "they belong"}.`
      });
    } else {
      checks.push({ status: "pass", title: "Every action serves the policy", detail: "Each action is linked to the guiding policy." });
    }

    // 5. Actions are concrete and few
    const targets = acts.filter((a) => findMarks(a.text).all.some((m) => m.kind === "goal")).map((a) => a.n);
    if (!acts.length) {
      checks.push({ status: "fail", title: "Actions are concrete and few", detail: "Nothing to check yet." });
    } else if (targets.length) {
      const one = targets.length === 1;
      checks.push({
        status: "warn",
        title: "Actions are concrete and few",
        detail: `${listNums(targets, "Action")} ${one ? "is a target" : "are targets"}, not ${one ? "an action" : "actions"}. What will you do to hit ${one ? "it" : "them"}?`
      });
    } else if (acts.length > 6) {
      checks.push({
        status: "warn",
        title: "Actions are concrete and few",
        detail: `${acts.length} actions is a lot to coordinate. A long list often means nobody chose. Which ones matter most?`
      });
    } else {
      checks.push({
        status: "pass",
        title: "Actions are concrete and few",
        detail: `${acts.length} concrete ${acts.length === 1 ? "action" : "actions"}, few enough to coordinate.`
      });
    }

    // 6. Plain language
    const allText = [D, P, ...acts.map((a) => a.text)].join("\n");
    if (!allText.trim()) {
      checks.push({ status: "fail", title: "Plain language", detail: "Nothing to check yet." });
    } else {
      const fluff = [];
      FLUFF_RE.lastIndex = 0;
      let m;
      while ((m = FLUFF_RE.exec(allText))) {
        const t = m[0].toLowerCase();
        if (!fluff.includes(t)) fluff.push(t);
      }
      if (fluff.length) {
        const shown = fluff.slice(0, 3).map((t) => `“${t}”`).join(", ");
        checks.push({
          status: "warn",
          title: "Plain language",
          detail: `${fluff.length} ${fluff.length === 1 ? "phrase sounds" : "phrases sound"} strategic but say little: ${shown}${fluff.length > 3 ? " and more" : ""}.`
        });
      } else {
        checks.push({ status: "pass", title: "Plain language", detail: "No buzzwords found." });
      }
    }

    return checks;
  }

  function verdict(checks, s) {
    const passes = checks.filter((c) => c.status === "pass").length;
    const empty = !s.diagnosis.trim() && !s.policy.trim() && !s.actions.some((a) => a.text.trim());
    if (empty) return { passes, text: "Start writing", sub: "The checks update as you type." };
    if (passes === checks.length) return { passes, text: "Reads like a strategy", sub: "Now test it against what actually happens." };
    if (passes >= 4) return { passes, text: "Close. A few things to tighten.", sub: "Work through the flags below." };
    return { passes, text: "Reads more like a wish list", sub: "Start with the diagnosis. Everything else depends on it." };
  }

  function mapSVG(s) {
    const acts = s.actions.map((a, i) => ({ ...a, n: i + 1 })).filter((a) => a.text.trim());
    const hasD = s.diagnosis.trim().length > 0;
    const hasP = s.policy.trim().length > 0;
    const count = acts.length;
    const r = count > 8 ? 9 : 12;
    const span = Math.min(264, Math.max(0, count - 1) * 46);
    const x0 = 160 - span / 2;
    const ay = 160;

    const node = (cy, label, on) =>
      `<g class="km-node${on ? " on" : ""}"><rect x="96" y="${cy - 14}" width="128" height="28" rx="3"/><text x="160" y="${cy + 4}" text-anchor="middle">${label}</text></g>`;

    let out = `<line class="km-edge${hasD && hasP ? " on" : ""}" x1="160" y1="38" x2="160" y2="70"/>`;
    acts.forEach((a, k) => {
      a.x = count > 1 ? x0 + (k * span) / (count - 1) : 160;
      if (a.linked && hasP) out += `<line class="km-edge on" x1="160" y1="98" x2="${a.x.toFixed(1)}" y2="${ay - r}"/>`;
    });
    out += node(24, "DIAGNOSIS", hasD) + node(84, "GUIDING POLICY", hasP);
    acts.forEach((a) => {
      out += `<g class="km-act ${a.linked ? "on" : "off"}"><circle cx="${a.x.toFixed(1)}" cy="${ay}" r="${r}"/><text x="${a.x.toFixed(1)}" y="${ay + 3.5}" text-anchor="middle">${a.n}</text></g>`;
    });
    if (!count) out += `<text class="km-empty" x="160" y="${ay + 4}" text-anchor="middle">NO ACTIONS YET</text>`;
    return out;
  }

  function cloneExample(id) {
    const ex = G.builderExamples[id];
    return {
      source: id,
      diagnosis: ex.diagnosis,
      policy: ex.policy,
      actions: ex.actions.map((a) => ({ text: a.text, linked: a.linked }))
    };
  }

  function renderBuilder() {
    const saved = store.get(DRAFT_KEY);
    let state = saved && Array.isArray(saved.actions) ? saved : cloneExample("apple");
    let canSave = true;

    view.innerHTML = `
      <section class="paper-section bench">
        <div class="wrap">
          <header class="bench-head">
            <p class="eyebrow">Workbench · The kernel</p>
            <h1 class="display bench-title">Build a kernel</h1>
            <p class="dek">Write a diagnosis, a guiding policy and the actions that carry it out. The checks apply Rumelt's tests as you type.</p>
            <div class="examples" role="group" aria-label="Load an example">
              <span class="examples-k">Load</span>
              ${Object.entries(G.builderExamples)
                .map(([id, ex]) => `<button class="pill" type="button" data-example="${id}">${esc(ex.label)}</button>`)
                .join("")}
            </div>
            <p class="source-note" id="source-note"></p>
          </header>

          <div class="bench-grid">
            <form class="bench-form" id="kernel-form" autocomplete="off">
              <div class="field">
                <label class="field-label" for="f-diagnosis">
                  <span class="field-k">Step 1 · Diagnosis</span>
                  <span class="field-q">What is going on, and what makes it hard?</span>
                </label>
                <textarea id="f-diagnosis" rows="5"></textarea>
              </div>
              <div class="field">
                <label class="field-label" for="f-policy">
                  <span class="field-k">Step 2 · Guiding policy</span>
                  <span class="field-q">How will you deal with it, and what will you rule out?</span>
                </label>
                <textarea id="f-policy" rows="3"></textarea>
              </div>
              <fieldset class="field">
                <legend class="field-label">
                  <span class="field-k">Step 3 · Coherent actions</span>
                  <span class="field-q">What will you actually do?</span>
                  <span class="field-hint">Mark each action that carries out the guiding policy.</span>
                </legend>
                <ol class="actions" id="actions" role="list"></ol>
                <button class="pill pill-add" type="button" id="add-action">+ Add an action</button>
              </fieldset>
            </form>

            <aside class="bench-check" aria-label="Checks">
              <div class="check-card">
                <div class="check-summary" id="check-summary" aria-live="polite"></div>
                <svg class="kernel-map" id="kernel-map" viewBox="0 0 320 184" role="img" aria-label="Map of how the actions connect to the guiding policy"></svg>
                <p class="map-key">Solid line: the action carries out the policy. Dashed circle: not linked.</p>
                <ul class="checks" id="checks" role="list"></ul>
              </div>
              <div class="readback">
                <p class="eyebrow">Read-back</p>
                <div id="readback"></div>
                <p class="legend"><mark class="m-goal">Highlighted</mark> reads as a goal. <mark class="m-fluff">Highlighted</mark> sounds strategic but says little.</p>
              </div>
            </aside>
          </div>
        </div>
      </section>`;

    const $ = (id) => document.getElementById(id);
    const diagEl = $("f-diagnosis");
    const policyEl = $("f-policy");
    const actionsEl = $("actions");

    function fillFields() {
      diagEl.value = state.diagnosis;
      policyEl.value = state.policy;
      renderActions();
      autosize(diagEl);
      autosize(policyEl);
    }

    function renderActions() {
      actionsEl.innerHTML = state.actions
        .map(
          (a, i) => `<li class="action-row">
            <span class="action-n">${i + 1}</span>
            <textarea class="action-text" id="action-${i}" data-i="${i}" rows="1" aria-label="Action ${i + 1}" placeholder="Describe a concrete step">${esc(a.text)}</textarea>
            <button type="button" class="link-toggle" data-link="${i}" aria-pressed="${a.linked}">${a.linked ? "Serves the policy" : "Not linked"}</button>
            <button type="button" class="remove" data-remove="${i}" aria-label="Remove action ${i + 1}">×</button>
          </li>`
        )
        .join("");
      actionsEl.querySelectorAll("textarea").forEach(autosize);
    }

    // Grow textareas to fit their text instead of scrolling inside them.
    function autosize(el) {
      el.style.height = "auto";
      el.style.height = el.scrollHeight + 2 + "px";
    }

    function update() {
      canSave = store.set(DRAFT_KEY, state);
      const checks = runChecks(state);
      const v = verdict(checks, state);
      $("check-summary").innerHTML = `
        <p class="verdict">${esc(v.text)}</p>
        <p class="score"><span class="pips" aria-hidden="true">${checks.map((c) => `<i class="pip ${c.status}"></i>`).join("")}</span>${v.passes} of ${checks.length} checks pass</p>
        <p class="verdict-sub">${esc(v.sub)}</p>`;
      $("checks").innerHTML = checks
        .map(
          (c) => `<li class="check ${c.status}">
            <span class="check-icon" aria-hidden="true">${c.status === "pass" ? "✓" : c.status === "warn" ? "!" : "–"}</span>
            <span class="check-body">
              <span class="check-t"><span class="visually-hidden">${c.status === "pass" ? "Passes" : c.status === "warn" ? "Needs work" : "Missing"}: </span>${esc(c.title)}</span>
              <span class="check-d">${esc(c.detail)}</span>
            </span>
          </li>`
        )
        .join("");
      $("kernel-map").innerHTML = mapSVG(state);
      const acts = state.actions.filter((a) => a.text.trim());
      $("readback").innerHTML = `<dl class="rb">
        <dt>Diagnosis</dt><dd>${markup(state.diagnosis)}</dd>
        <dt>Guiding policy</dt><dd>${markup(state.policy)}</dd>
        <dt>Actions</dt><dd>${
          acts.length ? `<ol>${state.actions.map((a, i) => (a.text.trim() ? `<li value="${i + 1}">${markup(a.text)}</li>` : "")).join("")}</ol>` : markup("")
        }</dd>
      </dl>`;
      updateSource();
    }

    function updateSource() {
      view.querySelectorAll("[data-example]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.example === state.source)));
      const ex = G.builderExamples[state.source];
      const saving = canSave ? "Your draft is saved in this browser as you type." : "Drafts can't be saved in this browser, so copy your work before leaving.";
      $("source-note").textContent = ex && ex.note ? ex.note : saving;
    }

    function markOwn() {
      if (state.source !== "own") state.source = "own";
    }

    diagEl.addEventListener("input", () => {
      state.diagnosis = diagEl.value;
      autosize(diagEl);
      markOwn();
      update();
    });
    policyEl.addEventListener("input", () => {
      state.policy = policyEl.value;
      autosize(policyEl);
      markOwn();
      update();
    });
    actionsEl.addEventListener("input", (e) => {
      const i = Number(e.target.dataset.i);
      if (Number.isNaN(i)) return;
      state.actions[i].text = e.target.value;
      autosize(e.target);
      markOwn();
      update();
    });
    actionsEl.addEventListener("click", (e) => {
      const link = e.target.closest("[data-link]");
      const remove = e.target.closest("[data-remove]");
      if (link) {
        const i = Number(link.dataset.link);
        state.actions[i].linked = !state.actions[i].linked;
        markOwn();
        renderActions();
        actionsEl.querySelector(`[data-link="${i}"]`).focus();
        update();
      } else if (remove) {
        const i = Number(remove.dataset.remove);
        state.actions.splice(i, 1);
        markOwn();
        renderActions();
        const next = actionsEl.querySelector(`#action-${Math.min(i, state.actions.length - 1)}`);
        (next || $("add-action")).focus();
        update();
      }
    });
    actionsEl.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && e.target.matches("textarea")) {
        e.preventDefault();
        $("add-action").click();
      }
    });
    $("add-action").addEventListener("click", () => {
      state.actions.push({ text: "", linked: true });
      markOwn();
      renderActions();
      actionsEl.querySelector(`#action-${state.actions.length - 1}`).focus();
      update();
    });
    $("kernel-form").addEventListener("submit", (e) => e.preventDefault());
    view.querySelectorAll("[data-example]").forEach((b) =>
      b.addEventListener("click", () => {
        state = cloneExample(b.dataset.example);
        fillFields();
        update();
      })
    );

    window.addEventListener("resize", () => {
      if (!document.body.contains(diagEl)) return;
      view.querySelectorAll(".bench-form textarea").forEach(autosize);
    });

    fillFields();
    update();
  }

  /* ---------- Boot ---------- */

  window.addEventListener("hashchange", go);
  go();
})();
