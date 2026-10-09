// Ask Claude: a reading companion in a side panel. It appears only where the page runs inside
// a Claude viewer (the `sample` capability); anywhere else nothing is shown. Each question
// carries the page's text, the state of every interactive on it and any passage the reader
// selected. Where the viewer allows page tools, Claude can read and change the interactives
// (get_page_state, set_control). Answers can be kept as margin notes.
(function () {
  "use strict";
  const M = window.Marginalia;
  const { esc } = M.util;

  const PAGE_CHARS = 12000;
  const BLOCK_CHARS = 1400;
  const KEEP_TURNS = 8; // earlier questions and answers drop out as a chat grows
  const HIDE = new Set(["not_granted", "sampling_disabled", "not_declared", "capability_disabled", "capability_removed"]);
  const INTERACTIVE = "section[aria-labelledby], .bench";
  const CONTROLS = 'input[type="range"], input[type="radio"], input[type="checkbox"], [data-preset], [role="tab"], [data-example]';

  let sample = null;
  let toolsOK = false;
  let route = { shelf: true };
  let ui = null;
  let turns = []; // the conversation on this page: [{role, content}]
  let quote = null; // { text, para } attached to the next question
  let ctl = null;

  /* ---------- What's on the page ---------- */

  const clean = (s) => String(s || "").replace(/[ \t]+/g, " ").replace(/\n\s*\n+/g, "\n").trim();
  const clip = (s, n) => (s.length > n ? s.slice(0, n - 1) + "…" : s);
  const view = () => document.getElementById("view");

  function blocks() {
    return Array.from(view().querySelectorAll(INTERACTIVE)).filter((b) => b.querySelector(`${CONTROLS}, textarea`) && !b.parentElement.closest(INTERACTIVE));
  }

  function labelText(input) {
    const label = input.labels && input.labels[0];
    if (label) {
      const t = label.querySelector(".lever-t, span");
      return clean((t || label).textContent);
    }
    return clean(input.getAttribute("aria-label") || "");
  }

  // Every control in an interactive, in page order: sliders, choices (one per radio group),
  // checkboxes and buttons (presets, tabs, examples).
  function controlsOf(block) {
    const list = [];
    const groups = new Map();
    block.querySelectorAll(CONTROLS).forEach((el) => {
      if (el.closest("[hidden]")) return;
      if (el.matches('input[type="range"]')) list.push({ kind: "slider", el, label: labelText(el) });
      else if (el.matches('input[type="radio"]')) {
        if (!groups.has(el.name)) {
          const g = { kind: "choice", el, radios: [], label: clean((el.closest("fieldset") && el.closest("fieldset").querySelector("legend") || {}).textContent || "") };
          groups.set(el.name, g);
          list.push(g);
        }
        groups.get(el.name).radios.push(el);
      } else if (el.matches('input[type="checkbox"]')) list.push({ kind: "toggle", el, label: labelText(el) || clean(el.parentElement.textContent) });
      else list.push({ kind: "button", el, label: clean(el.textContent) });
    });
    list.forEach((c) => {
      if (c.kind === "choice" && !c.label) c.label = c.radios.map((r) => labelText(r)).join(" / ");
    });
    return list;
  }

  function sliderValue(el) {
    const shown = el.closest(".lever") && el.closest(".lever").querySelector(".lever-v");
    return shown && clean(shown.textContent) ? clean(shown.textContent) : el.value;
  }

  // The page's interactives as text, with an id for every control (c1, c2, ...).
  function snapshot() {
    let n = 0;
    const controls = [];
    const parts = blocks().map((block, b) => {
      const head = block.querySelector("h2, .h2");
      const lines = [`Interactive ${b + 1}: ${clean(head ? head.textContent : "untitled")}`];
      controlsOf(block).forEach((c) => {
        const id = `c${++n}`;
        controls.push({ ...c, id, block: b });
        if (c.kind === "slider") lines.push(`- ${id} slider "${c.label}": ${sliderValue(c.el)} (range ${c.el.min} to ${c.el.max}, step ${c.el.step || 1})${c.el.disabled ? ", disabled" : ""}`);
        else if (c.kind === "choice") lines.push(`- ${id} choice "${c.label}": ${c.radios.map((r) => `${labelText(r)}${r.checked ? " [chosen]" : ""}${r.disabled ? " [disabled]" : ""}`).join(" | ")}`);
        else if (c.kind === "toggle") lines.push(`- ${id} checkbox "${c.label}": ${c.el.checked ? "ticked" : "not ticked"}${c.el.disabled ? ", disabled" : ""}`);
        else lines.push(`- ${id} button "${c.label}"${c.el.getAttribute("aria-pressed") === "true" || c.el.getAttribute("aria-selected") === "true" ? " (active)" : ""}`);
      });
      // Workbench drafts live in text fields, which innerText leaves out. Claude reads them; only the reader writes them.
      block.querySelectorAll("textarea").forEach((t) => {
        if (t.value.trim()) lines.push(`- field "${labelText(t)}" (the reader's own writing): ${clip(clean(t.value), 600)}`);
      });
      lines.push(`Shows: ${clip(clean(block.innerText), BLOCK_CHARS)}`);
      block.querySelectorAll('svg[role="img"][aria-label]').forEach((svg) => lines.push(`Chart: ${clean(svg.getAttribute("aria-label"))}`));
      return lines.join("\n");
    });
    return { text: parts.join("\n\n") || "(No interactives on this page.)", controls };
  }

  function whereText() {
    if (route.page) {
      const b = route.book;
      return `Book: ${b.title}, by ${b.author} (${b.year})\nPage: ${route.page.eyebrow ? `${route.page.eyebrow} · ` : ""}${route.page.title}`;
    }
    if (route.book) return `Book: ${route.book.title}, by ${route.book.author} (${route.book.year})\nPage: the book's home page (its argument, map and cases)`;
    if (route.view && M.views[route.view]) return `Page: ${M.views[route.view].title} (a site-wide page)`;
    return "Page: the library shelf, listing every book on the site";
  }

  function instructions() {
    const state = snapshot();
    return [
      "You are the reading companion built into Marginalia, an interactive study site for business books. The reader has a page open and is asking you about it. Below is what is on their screen: the page's text, then every interactive (simulators, calculators, exercises) with its controls as the reader has left them.",
      "",
      "How to answer:",
      "- Answer the question directly, in plain language: a few short paragraphs or a short list. Define jargon. No preamble.",
      "- Ground what you say in the page and the book it covers. The site's summaries are its own paraphrases. Interactives labelled \"A toy model\" use invented numbers to show how an idea behaves: never present those numbers as facts from the book. If you aren't sure what the book itself says, say so rather than guess.",
      "- When numbers on the page matter, use the ones in the page state.",
      toolsOK
        ? "- You can work the page: set_control moves a slider, picks an option, ticks a box or presses a button, the way the reader would, and get_page_state reads everything again. Use them when the reader asks you to show or try something, or when one change makes an explanation concrete. Say plainly what you changed."
        : "- You can't change the page yourself; tell the reader which control to move if it helps.",
      "- Format: short paragraphs, **bold** for key terms, \"- \" for bullets. No headings, no tables.",
      "",
      whereText(),
      "",
      "<page_text>",
      clip(clean(view().innerText), PAGE_CHARS),
      "</page_text>",
      "",
      "<interactives>",
      state.text,
      "</interactives>"
    ].join("\n");
  }

  /* ---------- Page tools ---------- */

  const settle = () => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));

  function reveal(block) {
    if (!block) return;
    const r = block.getBoundingClientRect();
    if (r.top < 0 || r.top > window.innerHeight * 0.6) block.scrollIntoView({ behavior: M.util.reducedMotion.matches ? "auto" : "smooth", block: "start" });
    block.classList.remove("ac-flash");
    void block.offsetWidth;
    block.classList.add("ac-flash");
  }

  async function setControl(input) {
    const id = String(input.id || "").trim();
    const c = snapshot().controls.find((x) => x.id === id);
    if (!c) throw new Error(`There is no control "${id}". Call get_page_state for the current ids.`);
    let said;
    if (c.kind === "slider") {
      const v = Number(input.value);
      if (!Number.isFinite(v)) throw new Error("A slider takes a number.");
      if (c.el.disabled) throw new Error(`"${c.label}" is disabled right now.`);
      const min = Number(c.el.min);
      const max = Number(c.el.max);
      const step = Number(c.el.step) || 1;
      c.el.value = Math.min(max, Math.max(min, min + Math.round((v - min) / step) * step));
      c.el.dispatchEvent(new Event("input", { bubbles: true }));
      c.el.dispatchEvent(new Event("change", { bubbles: true }));
      await settle();
      said = `Set “${c.label}” to ${sliderValue(c.el)}`;
    } else if (c.kind === "choice") {
      const want = String(input.value || "").trim().toLowerCase();
      const r = c.radios.find((x) => labelText(x).toLowerCase() === want) || c.radios.find((x) => labelText(x).toLowerCase().includes(want) && want) || c.radios.find((x) => x.value.toLowerCase() === want);
      if (!r) throw new Error(`"${input.value}" isn't an option. Options: ${c.radios.map(labelText).join(", ")}.`);
      if (r.disabled) throw new Error(`"${labelText(r)}" is disabled right now.`);
      r.click();
      await settle();
      said = `Chose “${labelText(r)}”${c.label && !c.label.includes("/") ? ` for “${c.label}”` : ""}`;
    } else if (c.kind === "toggle") {
      const want = input.value === true || String(input.value).toLowerCase() === "true";
      if (c.el.disabled) throw new Error(`"${c.label}" is disabled right now.`);
      if (c.el.checked !== want) c.el.click();
      await settle();
      said = `${want ? "Ticked" : "Unticked"} “${c.label}”`;
    } else {
      c.el.click();
      await settle();
      said = `Pressed “${c.label}”`;
    }
    const block = blocks()[c.block];
    reveal(block);
    logTool(said);
    const after = snapshot();
    return `${said}. ${after.text.split("\n\n")[c.block] || ""}`;
  }

  function tools() {
    return [
      {
        name: "get_page_state",
        description: "Read every interactive on the page again: control ids, labels, current values and what each one shows. Use it when the reader may have changed something since the question was asked.",
        execute: () => snapshot().text
      },
      {
        name: "set_control",
        description:
          "Change one control on the page the way the reader would: move a slider to a number, pick a choice's option by its label, tick or untick a checkbox (true or false), or press a button such as a preset or tab. Takes the control's id from the page state. Returns what that interactive shows afterwards.",
        inputSchema: {
          type: "object",
          properties: {
            id: { type: "string", description: "The control's id from the page state, such as c4." },
            value: { description: "Slider: a number. Choice: the option's label. Checkbox: true or false. Button: leave out." }
          },
          required: ["id"]
        },
        execute: (input) => setControl(input)
      }
    ];
  }

  /* ---------- Rendering answers ---------- */

  function inline(s) {
    return esc(s)
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/(^|[^*\w])\*(?!\s)(.+?)\*(?!\w)/g, "$1<em>$2</em>")
      .replace(/`([^`]+)`/g, "<code>$1</code>");
  }

  // A small, safe subset of Markdown: paragraphs, bullet and numbered lists, bold, italics, code.
  function md(text) {
    const out = [];
    let list = null;
    let para = [];
    const flush = () => {
      if (para.length) out.push(`<p>${para.map(inline).join("<br>")}</p>`);
      para = [];
    };
    text.replace(/\r/g, "").split("\n").forEach((raw) => {
      const line = raw.trim();
      const bullet = line.match(/^[-*•]\s+(.*)$/);
      const num = line.match(/^\d+[.)]\s+(.*)$/);
      if (bullet || num) {
        flush();
        const tag = bullet ? "ul" : "ol";
        if (!list || list.tag !== tag) {
          list = { tag, items: [] };
          out.push(list);
        }
        list.items.push((bullet || num)[1]);
        return;
      }
      list = null;
      if (!line) return flush();
      para.push(line.replace(/^#+\s*/, ""));
    });
    flush();
    return out.map((x) => (typeof x === "string" ? x : `<${x.tag}>${x.items.map((i) => `<li>${inline(i)}</li>`).join("")}</${x.tag}>`)).join("");
  }

  /* ---------- The panel ---------- */

  function suggestions() {
    if (route.page) {
      const interactive = blocks().length > 0;
      return ["Explain this page in plain words", interactive ? "What is the interactive showing right now?" : "What's the most important idea here?", "Quiz me on this page"];
    }
    if (route.book) return ["What is this book's main argument?", "Where should I start?", "How does it connect to the other books here?"];
    return ["Which book should I start with?", "What can I do on this page?"];
  }

  function build() {
    const launch = document.createElement("button");
    launch.type = "button";
    launch.className = "ac-launch";
    launch.setAttribute("aria-expanded", "false");
    launch.setAttribute("aria-controls", "ac-panel");
    launch.innerHTML = `<span class="ac-glyph" aria-hidden="true">✳</span><span class="ac-launch-t">Ask Claude</span>`;
    const panel = document.createElement("aside");
    panel.className = "ac-panel";
    panel.id = "ac-panel";
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-labelledby", "ac-title");
    panel.hidden = true;
    panel.innerHTML = `
      <div class="ac-head">
        <div class="ac-head-t">
          <p class="ac-title" id="ac-title">Ask Claude</p>
          <p class="ac-about" data-ref="about"></p>
        </div>
        <button type="button" class="ac-x" data-act="close" aria-label="Close">×</button>
      </div>
      <div class="ac-log" data-ref="log"></div>
      <p class="visually-hidden" aria-live="polite" data-ref="status"></p>
      <form class="ac-form" data-ref="form">
        <div class="ac-quote" data-ref="quote" hidden></div>
        <label class="visually-hidden" for="ac-input">Your question</label>
        <textarea id="ac-input" rows="2" placeholder="Ask about this page"></textarea>
        <div class="ac-actions">
          <p class="ac-meta">Uses your Claude account. Claude sees this page.</p>
          <button type="button" class="pill" data-act="new">New chat</button>
          <button type="button" class="pill" data-act="stop" hidden>Stop</button>
          <button type="submit" class="btn-primary" data-act="send">Ask</button>
        </div>
      </form>`;
    document.body.append(launch, panel);
    const ref = (n) => panel.querySelector(`[data-ref="${n}"]`);
    ui = { launch, panel, ref, input: panel.querySelector("textarea"), send: panel.querySelector('[data-act="send"]'), stop: panel.querySelector('[data-act="stop"]') };

    launch.addEventListener("click", () => (panel.hidden ? open() : close()));
    panel.addEventListener("click", (e) => {
      const b = e.target.closest("[data-act]");
      if (!b) return;
      if (b.dataset.act === "close") close();
      else if (b.dataset.act === "new") reset();
      else if (b.dataset.act === "stop") ctl && ctl.abort();
      else if (b.dataset.act === "suggest") ask(b.textContent);
      else if (b.dataset.act === "unquote") setQuote(null);
      else if (b.dataset.act === "save") saveNote(b);
    });
    ref("form").addEventListener("submit", (e) => {
      e.preventDefault();
      ask(ui.input.value);
    });
    ui.input.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey && !e.isComposing) {
        e.preventDefault();
        ask(ui.input.value);
      }
    });
    panel.addEventListener("keydown", (e) => {
      if (e.key === "Escape") close();
    });
    renderEmpty();
  }

  function renderEmpty() {
    ui.ref("about").textContent = route.page ? route.page.title : route.book ? route.book.title : route.view && M.views[route.view] ? M.views[route.view].title : "The library";
    ui.ref("log").innerHTML = `
      <div class="ac-empty">
        <p>Ask about anything on this page. Claude can see the text and how you've set the interactives${toolsOK ? ", and can move the controls to show you something" : ""}.</p>
        <div class="ac-suggest">${suggestions()
          .map((s) => `<button type="button" class="pill" data-act="suggest">${esc(s)}</button>`)
          .join("")}</div>
      </div>`;
  }

  function setQuote(q) {
    quote = q;
    const box = ui.ref("quote");
    box.hidden = !q;
    box.innerHTML = q
      ? `<span class="ac-quote-t">About: “${esc(clip(q.text, 180))}”</span><button type="button" class="ac-x" data-act="unquote" aria-label="Don't ask about this passage">×</button>`
      : "";
  }

  function scrollLog(force) {
    const log = ui.ref("log");
    if (force || log.scrollHeight - log.scrollTop - log.clientHeight < 120) log.scrollTop = log.scrollHeight;
  }

  function logTool(text) {
    const box = ui && ui.panel.querySelector(".ac-msg.is-claude:last-child .ac-did");
    if (!box) return;
    box.hidden = false;
    box.insertAdjacentHTML("beforeend", `<li>${esc(text)}</li>`);
    scrollLog();
  }

  function busy(on) {
    ui.send.hidden = on;
    ui.stop.hidden = !on;
    ui.input.disabled = false;
  }

  async function ask(text) {
    const question = clean(text);
    if (!question || ctl) return;
    ui.input.value = "";
    const asked = quote;
    setQuote(null);
    const log = ui.ref("log");
    if (log.querySelector(".ac-empty")) log.innerHTML = "";
    log.insertAdjacentHTML(
      "beforeend",
      `<div class="ac-msg is-user">${asked ? `<p class="ac-q">“${esc(clip(asked.text, 240))}”</p>` : ""}<p>${esc(question)}</p></div>
       <div class="ac-msg is-claude"><ul class="ac-did" hidden></ul><div class="ac-md"><p class="ac-thinking">Thinking…</p></div></div>`
    );
    const msg = log.lastElementChild;
    const out = msg.querySelector(".ac-md");
    scrollLog(true);
    ui.ref("status").textContent = "Claude is thinking.";

    const content = asked ? `About this passage on the page: "${asked.text}"\n\n${question}` : question;
    const input = [{ role: "user", content: instructions() }, ...turns.slice(-KEEP_TURNS * 2), { role: "user", content }];
    ctl = new AbortController();
    busy(true);
    try {
      const { text: answer, truncated } = await sample(input, {
        signal: ctl.signal,
        cache: false,
        modelTier: "default",
        onText: ({ text }) => {
          out.innerHTML = md(text);
          scrollLog();
        },
        ...(toolsOK ? { tools: tools() } : {})
      });
      out.innerHTML = md(answer) + (truncated ? `<p class="ac-note">The answer was cut short. Ask for less at a time.</p>` : "");
      turns.push({ role: "user", content }, { role: "assistant", content: answer });
      if (route.page) {
        msg.insertAdjacentHTML("beforeend", `<div class="ac-msg-actions"><button type="button" class="ac-link" data-act="save">Save as a margin note</button></div>`);
        msg.dataset.question = question;
        msg.dataset.answer = answer;
        if (asked) {
          msg.dataset.quote = asked.text;
          msg.dataset.para = asked.para || "";
        }
      }
      ui.ref("status").textContent = "Claude answered.";
    } catch (e) {
      const code = e && e.code;
      const kept = e && e.text ? md(e.text) : "";
      const note = (t) => `<p class="ac-note">${esc(t)}</p>`;
      if (HIDE.has(code)) {
        out.innerHTML = note("Claude isn't available for this page.");
        ui.launch.hidden = true;
      } else if (code === "cancelled") out.innerHTML = kept || note("Stopped.");
      else if (code === "rate_limited") out.innerHTML = kept + note("Too many requests right now. Try again in a minute.");
      else if (code === "refused") out.innerHTML = note("Claude couldn't answer that. Try asking another way.");
      else if (code === "session_expired") out.innerHTML = note("Sign in to Claude again, then ask once more.");
      else if (code === "prompt_too_large") out.innerHTML = note("This conversation has grown too long. Start a new chat.");
      else out.innerHTML = kept + note("The answer was interrupted. Try again.");
      ui.ref("status").textContent = "";
    } finally {
      ctl = null;
      busy(false);
      scrollLog();
      ui.input.focus();
    }
  }

  function saveNote(btn) {
    const msg = btn.closest(".ac-msg");
    if (!route.page || !msg || !msg.dataset.answer) return;
    const answer = msg.dataset.answer.replace(/\*\*/g, "").trim();
    M.memory.addNote({
      book: route.book.id,
      page: route.slug,
      bookTitle: route.book.title,
      pageTitle: route.page.title,
      para: msg.dataset.para || "",
      quote: msg.dataset.quote || `Asked Claude: ${msg.dataset.question}`,
      note: clip(`Claude: ${answer}`, 2000)
    });
    btn.textContent = "Saved to your notes";
    btn.disabled = true;
  }

  function reset() {
    if (ctl) ctl.abort();
    turns = [];
    setQuote(null);
    renderEmpty();
  }

  function open(opts) {
    if (!ui) return;
    ui.panel.hidden = false;
    ui.launch.setAttribute("aria-expanded", "true");
    document.body.classList.add("ac-open");
    if (opts && opts.quote) setQuote({ text: opts.quote, para: opts.para });
    ui.input.focus();
  }

  function close() {
    if (!ui) return;
    ui.panel.hidden = true;
    ui.launch.setAttribute("aria-expanded", "false");
    document.body.classList.remove("ac-open");
    ui.launch.focus();
  }

  M.assistant = {
    get available() {
      return Boolean(ui && !ui.launch.hidden);
    },
    // Called by the router after every route renders.
    setRoute(r) {
      route = r;
      if (!ui) return;
      if (ctl) ctl.abort();
      turns = [];
      setQuote(null);
      renderEmpty();
    },
    // Open the panel, optionally about a passage the reader selected.
    open
  };

  M.ask.getSample().then(async (s) => {
    if (!s) return;
    sample = s;
    const limits = typeof s.limits === "function" ? await s.limits().catch(() => null) : null;
    toolsOK = Boolean(limits && limits.tools);
    build();
  });
})();
