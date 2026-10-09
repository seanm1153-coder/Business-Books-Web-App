// Ask Claude for a critique of a workbench draft. Uses the `sample` capability when the
// page runs inside a Claude viewer; anywhere else the feature stays hidden. The reading
// companion (assistant.js) shares the same capability through getSample().
(function () {
  "use strict";
  const M = window.Marginalia;
  const { esc } = M.util;

  let samplePromise = null;
  function getSample() {
    if (!samplePromise) {
      const claude = window.claude;
      samplePromise = claude && typeof claude.use === "function" ? claude.use("sample").catch(() => null) : Promise.resolve(null);
    }
    return samplePromise;
  }

  const HIDE = new Set(["not_granted", "sampling_disabled", "not_declared", "capability_disabled", "capability_removed"]);

  // Render the reply's simple format: "Heading: text" lines and "- " bullets.
  function format(text) {
    const out = [];
    let list = null;
    text.split("\n").forEach((raw) => {
      const line = raw.trim();
      if (!line) return;
      if (/^[-•*]\s+/.test(line)) {
        if (!list) {
          list = [];
          out.push(list);
        }
        list.push(line.replace(/^[-•*]\s+/, ""));
        return;
      }
      list = null;
      const m = line.match(/^([A-Z][A-Za-z ]{2,24}):\s*(.*)$/);
      if (m) out.push({ head: m[1], rest: m[2] });
      else out.push({ text: line });
    });
    return out
      .map((item) => {
        if (Array.isArray(item)) return `<ul>${item.map((li) => `<li>${esc(li)}</li>`).join("")}</ul>`;
        if (item.head) return `<p><span class="cq-h">${esc(item.head)}</span>${item.rest ? " " + esc(item.rest) : ""}</p>`;
        return `<p>${esc(item.text)}</p>`;
      })
      .join("");
  }

  M.ask = {
    // The `sample` capability, or null where the page isn't inside a Claude viewer.
    getSample,

    // Fills `host` with a critique control once Claude is reachable. `prompt()` builds
    // the full instruction from the current draft at click time.
    mount(host, { label, prompt, isEmpty }) {
      let ctl = null;
      let asked = false;
      let alive = true;

      getSample().then((sample) => {
        if (!alive || !sample) return;
        host.hidden = false;
        host.innerHTML = `
          <div class="cq-bar">
            <button type="button" class="cq-ask">${esc(label)}</button>
            <button type="button" class="cq-stop" hidden>Stop</button>
          </div>
          <p class="cq-meta">Uses your Claude account. Claude reads only this draft.</p>
          <div class="cq-out" aria-live="polite" hidden></div>`;
        const askBtn = host.querySelector(".cq-ask");
        const stopBtn = host.querySelector(".cq-stop");
        const out = host.querySelector(".cq-out");

        stopBtn.addEventListener("click", () => ctl && ctl.abort());
        askBtn.addEventListener("click", async () => {
          if (isEmpty && isEmpty()) {
            out.hidden = false;
            out.innerHTML = `<p class="cq-note">Write something first. Claude needs a draft to critique.</p>`;
            return;
          }
          ctl = new AbortController();
          askBtn.disabled = true;
          stopBtn.hidden = false;
          out.hidden = false;
          out.innerHTML = `<p class="cq-thinking">Thinking…</p>`;
          try {
            const { text, truncated } = await sample(prompt(), {
              signal: ctl.signal,
              cache: asked ? false : true,
              onText: ({ text }) => (out.innerHTML = format(text))
            });
            out.innerHTML = format(text) + (truncated ? `<p class="cq-note">The critique was cut short.</p>` : "");
            asked = true;
            askBtn.textContent = "Ask again";
          } catch (e) {
            const code = e && e.code;
            const kept = e && e.text ? format(e.text) : "";
            if (HIDE.has(code)) {
              out.innerHTML = `<p class="cq-note">Claude isn't available for this page, so the critique is switched off.</p>`;
              askBtn.hidden = true;
            } else if (code === "cancelled") {
              out.innerHTML = kept || `<p class="cq-note">Stopped.</p>`;
            } else if (code === "rate_limited") {
              out.innerHTML = kept + `<p class="cq-note">Too many requests right now. Try again in a minute.</p>`;
            } else if (code === "refused") {
              out.innerHTML = `<p class="cq-note">Claude couldn't critique this draft. Try rewording it.</p>`;
            } else if (code === "session_expired") {
              out.innerHTML = `<p class="cq-note">Sign in to Claude again, then try once more.</p>`;
            } else {
              out.innerHTML = kept + `<p class="cq-note">The critique was interrupted. Try again.</p>`;
            }
          } finally {
            askBtn.disabled = false;
            stopBtn.hidden = true;
            ctl = null;
          }
        });
      });

      return () => {
        alive = false;
        if (ctl) ctl.abort();
      };
    }
  };
})();
