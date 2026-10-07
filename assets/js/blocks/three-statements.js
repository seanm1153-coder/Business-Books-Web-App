// Linked three-statement simulator: apply business events to a small company and watch
// the income statement, balance sheet and cash flow statement move together.
//
// Each event lists its effects on a handful of accounts; everything else is derived:
//   net income   = revenue − cogs − opex − dep
//   equipment Δ  = capex − dep
//   retained Δ   = net income
//   cash flow    = indirect method (net income, add back depreciation, working-capital changes)
(function () {
  "use strict";
  const { esc, reducedMotion } = window.Marginalia.util;

  const FX_KEYS = ["revenue", "cogs", "opex", "dep", "capex", "cash", "ar", "inv", "ap", "loan"];

  const money = (v) => {
    if (Math.round(v) === 0) return "–";
    const s = Math.abs(Math.round(v)).toLocaleString("en-US");
    return v < 0 ? `(${s})` : s;
  };
  const signed = (v) => (v > 0 ? "+" : v < 0 ? "−" : "") + Math.abs(Math.round(v)).toLocaleString("en-US");
  const dollars = (v) => (v < 0 ? "−$" : "$") + Math.abs(Math.round(v)).toLocaleString("en-US");

  // Totals for the period after applying a list of events to the opening balances.
  function compute(scenario, steps) {
    const t = Object.fromEntries(FX_KEYS.map((k) => [k, 0]));
    steps.forEach((id) => {
      const fx = scenario.events.find((e) => e.id === id).fx;
      FX_KEYS.forEach((k) => (t[k] += fx[k] || 0));
    });
    const o = scenario.opening;
    const ni = t.revenue - t.cogs - t.opex - t.dep;
    const bs = {
      cash: o.cash + t.cash,
      ar: o.ar + t.ar,
      inv: o.inv + t.inv,
      equip: o.equip + t.capex - t.dep,
      ap: o.ap + t.ap,
      loan: o.loan + t.loan,
      capital: o.capital,
      re: o.re + ni
    };
    bs.assets = bs.cash + bs.ar + bs.inv + bs.equip;
    bs.liab = bs.ap + bs.loan;
    bs.equity = bs.capital + bs.re;
    const cfo = ni + t.dep - t.ar - t.inv + t.ap;
    const cfi = -t.capex;
    const cff = t.loan;
    return { t, ni, bs, cf: { cfo, cfi, cff, net: cfo + cfi + cff } };
  }

  function statements(scenario, s) {
    const o = scenario.opening;
    return [
      {
        title: "Income statement",
        sub: `${scenario.period} · what was earned`,
        rows: [
          { key: "rev", label: "Revenue", v: s.t.revenue },
          { key: "cogs", label: "Cost of goods sold", v: -s.t.cogs },
          { key: "gp", label: "Gross profit", v: s.t.revenue - s.t.cogs, kind: "sub" },
          { key: "opex", label: "Rent and wages", v: -s.t.opex },
          { key: "dep", label: "Depreciation", v: -s.t.dep },
          { key: "ni", label: "Net income", v: s.ni, kind: "total", tie: "ni" }
        ],
        foot: "No interest or taxes, to keep it simple."
      },
      {
        title: "Balance sheet",
        sub: `End of ${scenario.period} · what is owned and owed`,
        rows: [
          { label: "Assets", kind: "head" },
          { key: "cash", label: "Cash", v: s.bs.cash, tie: "cash" },
          { key: "ar", label: "Accounts receivable", v: s.bs.ar },
          { key: "inv", label: "Inventory", v: s.bs.inv },
          { key: "equip", label: "Equipment, net", v: s.bs.equip },
          { key: "assets", label: "Total assets", v: s.bs.assets, kind: "total" },
          { label: "Liabilities and equity", kind: "head" },
          { key: "ap", label: "Accounts payable", v: s.bs.ap },
          { key: "loan", label: "Bank loan", v: s.bs.loan },
          { key: "capital", label: "Owners' capital", v: s.bs.capital },
          { key: "re", label: "Retained earnings", v: s.bs.re, tie: "ni" },
          { key: "le", label: "Total liabilities and equity", v: s.bs.liab + s.bs.equity, kind: "total" }
        ],
        check: s.bs.assets === s.bs.liab + s.bs.equity ? "Assets equal liabilities plus equity." : "Out of balance."
      },
      {
        title: "Cash flow statement",
        sub: `${scenario.period} · where the cash went`,
        rows: [
          { key: "cf-ni", label: "Net income", v: s.ni, tie: "ni" },
          { key: "cf-dep", label: "Add back depreciation", v: s.t.dep },
          { key: "cf-ar", label: "Change in receivables", v: -s.t.ar },
          { key: "cf-inv", label: "Change in inventory", v: -s.t.inv },
          { key: "cf-ap", label: "Change in payables", v: s.t.ap },
          { key: "cfo", label: "Cash from operations", v: s.cf.cfo, kind: "sub" },
          { key: "cfi", label: "Cash from investing", v: s.cf.cfi, kind: "sub" },
          { key: "cff", label: "Cash from financing", v: s.cf.cff, kind: "sub" },
          { key: "net", label: "Net change in cash", v: s.cf.net },
          { key: "open", label: `Cash at start of ${scenario.period}`, v: o.cash },
          { key: "close", label: `Cash at end of ${scenario.period}`, v: o.cash + s.cf.net, kind: "total", tie: "cash" }
        ],
        check: o.cash + s.cf.net === s.bs.cash ? "Ending cash matches the balance sheet." : "Cash doesn't tie out."
      }
    ];
  }

  function blockedReason(scenario, steps, ev) {
    const after = compute(scenario, steps.concat(ev.id)).bs;
    if (after.ar < 0) return "No unpaid invoices to collect.";
    if (after.inv < 0) return "Not enough bikes in stock.";
    if (after.ap < 0) return "Nothing owed to suppliers.";
    if (after.loan < 0) return "The loan is already paid off.";
    return "";
  }

  /* ---------- Profit vs. cash chart: one shared dollar axis, step lines ---------- */

  function niceStep(range) {
    const raw = range / 4;
    const mag = Math.pow(10, Math.floor(Math.log10(raw || 1)));
    const n = raw / mag;
    return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10) * mag;
  }

  function chartSVG(points, width) {
    const H = 200;
    const m = { t: 14, r: 112, b: 26, l: 52 };
    const w = Math.max(240, width) - m.l - m.r;
    const h = H - m.t - m.b;
    const vals = points.flatMap((p) => [p.profit, p.cash]).concat(0);
    let lo = Math.min(...vals);
    let hi = Math.max(...vals);
    if (hi - lo < 10000) hi = lo + 10000;
    const step = niceStep(hi - lo);
    lo = Math.floor(lo / step) * step;
    hi = Math.ceil(hi / step) * step;
    const n = Math.max(1, points.length - 1);
    const x = (i) => m.l + (i / n) * w;
    const y = (v) => m.t + h - ((v - lo) / (hi - lo)) * h;

    let grid = "";
    for (let v = lo; v <= hi + 1; v += step) {
      grid += `<line class="ch-grid${v === 0 ? " is-zero" : ""}" x1="${m.l}" x2="${m.l + w}" y1="${y(v).toFixed(1)}" y2="${y(v).toFixed(1)}"/>`;
      grid += `<text class="ch-tick" x="${m.l - 8}" y="${(y(v) + 3.5).toFixed(1)}" text-anchor="end">${v === 0 ? "0" : (v / 1000).toLocaleString("en-US") + "k"}</text>`;
    }
    points.forEach((p, i) => {
      grid += `<text class="ch-tick" x="${x(i).toFixed(1)}" y="${H - 8}" text-anchor="middle">${i === 0 ? "Start" : i}</text>`;
    });

    // Step-after path: each event changes the value at its own step.
    const path = (key) =>
      points
        .map((p, i) => {
          const px = x(i).toFixed(1);
          const py = y(p[key]).toFixed(1);
          if (i === 0) return `M${px},${py}`;
          return `H${px}V${py}`;
        })
        .join("");
    const dots = (key) =>
      points.map((p, i) => `<circle class="ch-dot ch-${key}" cx="${x(i).toFixed(1)}" cy="${y(p[key]).toFixed(1)}" r="4"/>`).join("");

    const last = points[points.length - 1];
    let ly = { profit: y(last.profit), cash: y(last.cash) };
    if (Math.abs(ly.profit - ly.cash) < 26) {
      const mid = (ly.profit + ly.cash) / 2;
      const up = last.profit >= last.cash ? "profit" : "cash";
      ly[up] = mid - 13;
      ly[up === "profit" ? "cash" : "profit"] = mid + 13;
    }
    const label = (key, name) =>
      `<text class="ch-label" x="${(m.l + w + 12).toFixed(1)}" y="${(ly[key] - 2).toFixed(1)}">${name}</text>
       <text class="ch-value" x="${(m.l + w + 12).toFixed(1)}" y="${(ly[key] + 11).toFixed(1)}">${signed(last[key])}</text>`;

    const hits = points
      .map((p, i) => {
        const half = (w / n) / 2;
        const x0 = Math.max(m.l - 8, x(i) - half);
        const x1 = Math.min(m.l + w + 8, x(i) + half);
        return `<rect class="ch-hit" data-i="${i}" x="${x0.toFixed(1)}" y="${m.t}" width="${(x1 - x0).toFixed(1)}" height="${h}"/>`;
      })
      .join("");

    return {
      html: `<svg class="fin-chart" width="${m.l + w + m.r}" height="${H}" viewBox="0 0 ${m.l + w + m.r} ${H}" role="img" aria-label="Profit so far and change in cash so far, by step">
        ${grid}
        <line class="ch-cross" x1="0" x2="0" y1="${m.t}" y2="${m.t + h}" visibility="hidden"/>
        <path class="ch-line ch-cash" d="${path("cash")}"/>
        <path class="ch-line ch-profit" d="${path("profit")}"/>
        ${dots("cash")}${dots("profit")}
        ${label("profit", "Profit")}${label("cash", "Cash")}
        ${hits}
      </svg>`,
      x
    };
  }

  window.Marginalia.blocks["three-statements"] = {
    render(block) {
      const sc = block.scenario;
      return `<div class="fin">
        <div class="fin-top">
          <div class="fin-moves">
            <p class="eyebrow">${esc(sc.company)} · ${esc(sc.period)}</p>
            <h2 class="fin-h">What happens this month?</h2>
            <p class="fin-intro">${esc(sc.intro)}</p>
            <div class="moves" role="group" aria-label="Business events">
              ${sc.events
                .map(
                  (e) => `<button type="button" class="move" data-move="${e.id}">
                    <span class="move-t">${esc(e.label)}</span>
                    <span class="move-a">${esc(e.amount)}</span>
                    <span class="move-why" aria-hidden="true"></span>
                  </button>`
                )
                .join("")}
            </div>
          </div>

          <div class="fin-now">
            <div class="tiles">
              <div class="tile"><p class="tile-k"><i class="key key-profit" aria-hidden="true"></i>Profit this month</p><p class="tile-v" data-ref="profit"></p></div>
              <div class="tile"><p class="tile-k"><i class="key key-cash" aria-hidden="true"></i>Cash in the bank</p><p class="tile-v" data-ref="cash"></p><p class="tile-sub" data-ref="cash-sub"></p></div>
            </div>
            <div class="chart-box">
              <p class="chart-t">Profit so far vs. change in cash so far</p>
              <div class="chart-wrap" data-ref="chart"></div>
              <div class="chart-tip" data-ref="tip" hidden></div>
            </div>
            <div class="happened" aria-live="polite">
              <p class="eyebrow">What just happened</p>
              <p class="happened-t" data-ref="note"></p>
            </div>
            <div class="fin-log">
              <ol class="log" data-ref="log" role="list"></ol>
              <div class="log-actions">
                <button type="button" class="pill" data-ref="undo">Undo last</button>
                <button type="button" class="pill" data-ref="reset">Start the month over</button>
              </div>
            </div>
          </div>
        </div>
        <div class="fin-dock">
          <p><i class="key key-profit" aria-hidden="true"></i>Profit <span data-ref="dock-profit"></span></p>
          <p><i class="key key-cash" aria-hidden="true"></i>Cash <span data-ref="dock-cash"></span></p>
          <button type="button" class="pill dock-jump" data-ref="to-statements" aria-label="Jump to the statements">↓ Statements</button>
        </div>
        <div class="statements" data-ref="statements"></div>
        <p class="fin-foot">${esc(sc.foot)}</p>
      </div>`;
    },

    mount(root, block) {
      const sc = block.scenario;
      let steps = sc.start.slice();
      const ref = (n) => root.querySelector(`[data-ref="${n}"]`);
      const chartWrap = ref("chart");
      const tip = ref("tip");
      let chartX = null;
      let points = [];

      function series() {
        const out = [];
        for (let i = 0; i <= steps.length; i++) {
          const s = compute(sc, steps.slice(0, i));
          out.push({ profit: s.ni, cash: s.bs.cash - sc.opening.cash });
        }
        return out;
      }

      function renderChart() {
        points = series();
        const c = chartSVG(points, chartWrap.clientWidth || 520);
        chartWrap.innerHTML = c.html;
        chartX = c.x;
      }

      function renderStatements(now, before) {
        const a = statements(sc, now);
        const b = before ? statements(sc, before) : null;
        ref("statements").innerHTML = a
          .map((st, si) => {
            const rows = st.rows
              .map((r, ri) => {
                if (r.kind === "head") return `<tr class="st-head"><th colspan="2" scope="rowgroup">${esc(r.label)}</th></tr>`;
                const prev = b ? b[si].rows[ri].v : r.v;
                const d = r.v - prev;
                const cls = ["st-row", r.kind ? `is-${r.kind}` : "", d ? "is-changed" : "", r.v < 0 && r.key === "cash" ? "is-neg" : ""].filter(Boolean).join(" ");
                return `<tr class="${cls}"${r.tie ? ` data-tie="${r.tie}"` : ""}>
                  <th scope="row">${esc(r.label)}${d ? `<span class="delta">${signed(d)}</span>` : ""}</th>
                  <td>${money(r.v)}</td>
                </tr>`;
              })
              .join("");
            return `<section class="statement">
              <h3 class="st-t">${st.title}</h3>
              <p class="st-sub">${esc(st.sub)}</p>
              <table class="st-table"><tbody>${rows}</tbody></table>
              ${st.check ? `<p class="st-check"><span aria-hidden="true">✓</span> ${esc(st.check)}</p>` : ""}
              ${st.foot ? `<p class="st-foot">${esc(st.foot)}</p>` : ""}
            </section>`;
          })
          .join("");
      }

      function render() {
        const now = compute(sc, steps);
        const before = steps.length ? compute(sc, steps.slice(0, -1)) : null;
        const cashChange = now.bs.cash - sc.opening.cash;

        ref("profit").textContent = dollars(now.ni);
        ref("cash").textContent = dollars(now.bs.cash);
        ref("cash").classList.toggle("is-neg", now.bs.cash < 0);
        ref("dock-profit").textContent = dollars(now.ni);
        ref("dock-cash").textContent = dollars(now.bs.cash);
        ref("dock-cash").classList.toggle("is-neg", now.bs.cash < 0);
        ref("cash-sub").textContent = now.bs.cash < 0 ? "Overdrawn. The bank wants its money." : `${signed(cashChange)} since ${sc.period} 1`;

        const last = steps.length ? sc.events.find((e) => e.id === steps[steps.length - 1]) : null;
        ref("note").textContent = last ? last.note : sc.emptyNote;

        ref("log").innerHTML = steps.length
          ? steps.map((id, i) => `<li><span class="log-n">${i + 1}</span>${esc(sc.events.find((e) => e.id === id).label)}</li>`).join("")
          : `<li class="log-empty">Nothing yet. The month starts with the opening balance sheet.</li>`;
        ref("undo").disabled = !steps.length;
        ref("reset").disabled = !steps.length;

        root.querySelectorAll("[data-move]").forEach((btn) => {
          const ev = sc.events.find((e) => e.id === btn.dataset.move);
          const why = blockedReason(sc, steps, ev);
          btn.disabled = Boolean(why);
          btn.querySelector(".move-why").textContent = why;
        });

        renderStatements(now, before);
        renderChart();
      }

      root.addEventListener("click", (e) => {
        const move = e.target.closest("[data-move]");
        if (move && !move.disabled) {
          steps.push(move.dataset.move);
          render();
        }
      });
      ref("to-statements").addEventListener("click", () => {
        ref("statements").scrollIntoView({ behavior: reducedMotion.matches ? "auto" : "smooth", block: "start" });
      });
      ref("undo").addEventListener("click", () => {
        steps.pop();
        render();
      });
      ref("reset").addEventListener("click", () => {
        steps = [];
        render();
      });

      // Rows that are the same number in two statements light up together.
      const statementsEl = ref("statements");
      const tieOn = (e) => {
        const row = e.target.closest("[data-tie]");
        statementsEl.querySelectorAll(".is-tied").forEach((r) => r.classList.remove("is-tied"));
        if (row) statementsEl.querySelectorAll(`[data-tie="${row.dataset.tie}"]`).forEach((r) => r.classList.add("is-tied"));
      };
      statementsEl.addEventListener("mouseover", tieOn);
      statementsEl.addEventListener("mouseleave", () => statementsEl.querySelectorAll(".is-tied").forEach((r) => r.classList.remove("is-tied")));

      // Chart hover: crosshair plus a tooltip naming the step and both values.
      chartWrap.addEventListener("mousemove", (e) => {
        const hit = e.target.closest(".ch-hit");
        const cross = chartWrap.querySelector(".ch-cross");
        if (!hit || !cross) return;
        const i = Number(hit.dataset.i);
        const px = chartX(i);
        cross.setAttribute("x1", px);
        cross.setAttribute("x2", px);
        cross.setAttribute("visibility", "visible");
        const label = i === 0 ? `Start of ${sc.period}` : `${i}. ${sc.events.find((ev) => ev.id === steps[i - 1]).label}`;
        tip.innerHTML = `<p class="tip-t">${esc(label)}</p>
          <p><i class="key key-profit" aria-hidden="true"></i>Profit <span>${signed(points[i].profit)}</span></p>
          <p><i class="key key-cash" aria-hidden="true"></i>Cash <span>${signed(points[i].cash)}</span></p>`;
        tip.hidden = false;
        const box = chartWrap.getBoundingClientRect();
        const left = Math.min(Math.max(px - tip.offsetWidth / 2, 0), box.width - tip.offsetWidth);
        tip.style.left = left + "px";
      });
      chartWrap.addEventListener("mouseleave", () => {
        tip.hidden = true;
        const cross = chartWrap.querySelector(".ch-cross");
        if (cross) cross.setAttribute("visibility", "hidden");
      });

      let timer = 0;
      const onResize = () => {
        clearTimeout(timer);
        timer = setTimeout(renderChart, 120);
      };
      window.addEventListener("resize", onResize);

      render();
      return () => window.removeEventListener("resize", onResize);
    }
  };
})();
