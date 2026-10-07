// The Northline year: a quarterly model that turns four decisions into an income
// statement line, cash flow and a cash balance. Pure functions; no DOM.
//
// Each quarter:
//   profit      = revenue × gross margin − operating costs − depreciation − interest
//   working cap = receivables + inventory − payables   (each from days and annual rates)
//   cash flow   = profit + depreciation − change in working capital
// If cash would fall below the minimum, the bank's credit line covers the gap.
(function (root) {
  "use strict";

  const BASE = {
    revenue: 12000000, // annual run rate
    gm: 0.39,
    opex: 3480000,
    dso: 65,
    dio: 85,
    dpo: 30,
    cash: 350000,
    debt: 2248000,
    equipment: 2400000,
    depYears: 5,
    rate: 0.08,
    minCash: 250000, // the bank requires this much on hand; below it, the credit line kicks in
    cc: 0, // CityCycle revenue inside the run rate
    ccDays: 45,
    position: 0,
    focus: false,
    stretched: false
  };

  const POSITIONS = ["One bike brand among many", "A familiar name", "A contender", "Defining the category"];

  function workingCapital(s) {
    const cogs = s.revenue * (1 - s.gm);
    const ar = ((s.revenue - s.cc) / 365) * s.dso + (s.cc / 365) * s.ccDays;
    return ar + (cogs / 365) * s.dio - (cogs / 365) * s.dpo;
  }

  // Effects of each choice, applied at the start of its quarter. `next` effects wait a quarter.
  const EFFECTS = {
    price: (s) => ({ ...s, gm: s.gm - 0.06, revenue: s.revenue * 1.04 }),
    focus: (s) => ({ ...s, revenue: s.revenue * 0.92, gm: s.gm + 0.04, opex: s.opex * 0.95, dio: 65, focus: true }),
    vision: (s) => ({ ...s, spend: 250000 }),
    accept90: (s) => ({ ...s, revenue: s.revenue + 1200000, cc: 1200000, ccDays: 90 }),
    accept45: (s) => ({ ...s, revenue: s.revenue + 1176000, cc: 1176000, ccDays: 45 }),
    decline: (s) => s,
    features: (s) => ({ ...s, position: Math.max(s.position, 1), next: { revenueMul: 1.03 } }),
    category: (s) => ({ ...s, spend: 250000, position: s.focus ? 3 : 2, next: { revenueMul: s.focus ? 1.15 : 1.06 } }),
    drip: (s) => ({ ...s, spend: 125000, position: Math.max(s.position, 1), next: { revenueMul: 1.04, spend: 125000 } }),
    stretch: (s) => ({ ...s, depYears: 10, stretched: true }),
    keep: (s) => s
  };

  function run(choices) {
    let s = { ...BASE, wcPrev: workingCapital(BASE), borrowed: 0 };
    const quarters = [];
    choices.forEach((choice, q) => {
      // Carry over effects scheduled by the previous quarter's decision.
      const carried = s.next || {};
      s = { ...s, next: null, spend: carried.spend || 0, revenue: s.revenue * (carried.revenueMul || 1) };
      s = EFFECTS[choice](s);

      const revenue = s.revenue / 4;
      const gross = revenue * s.gm;
      const opex = s.opex / 4 + (s.spend || 0);
      const dep = s.equipment / s.depYears / 4;
      const interest = (s.debt * s.rate) / 4;
      const profit = gross - opex - dep - interest;
      const wc = workingCapital(s);
      const cfo = profit + dep - (wc - s.wcPrev);
      let cash = s.cash + cfo;
      let borrowed = 0;
      if (cash < s.minCash) {
        borrowed = s.minCash - cash;
        cash = s.minCash;
      }
      s = { ...s, cash, debt: s.debt + borrowed, borrowed: s.borrowed + borrowed, wcPrev: wc };
      quarters.push({ q: q + 1, choice, revenue, profit, cfo, borrowed, cash, wc, position: s.position });
    });
    return { state: s, quarters };
  }

  function outcome(result) {
    const { state: s, quarters } = result;
    const profit = quarters.reduce((n, q) => n + q.profit, 0);
    let headline;
    if (s.position >= 3 && s.borrowed === 0) headline = "A category king in the making";
    else if (s.position >= 3) headline = "Defining the category, on borrowed money";
    else if (s.borrowed > 0 && profit > 0) headline = "Profitable on paper, short of cash";
    else if (s.borrowed > 0) headline = "Losing money and borrowing to keep going";
    else if (!s.focus && s.position >= 2) headline = "A strong launch with no strategy behind it";
    else if (!s.focus) headline = "Busy, but stuck";
    else headline = "Focused and profitable, but still unknown";
    return { headline, profit, cash: s.cash, borrowed: s.borrowed, revenue: s.revenue, position: POSITIONS[s.position], stretched: s.stretched, focus: s.focus };
  }

  const api = { BASE, POSITIONS, run, outcome, workingCapital };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.NorthlineModel = api;
})(typeof window !== "undefined" ? window : globalThis);
