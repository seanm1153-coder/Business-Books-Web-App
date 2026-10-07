// The Northline quarterly model: pure functions, no browser needed.
const test = require("node:test");
const assert = require("node:assert/strict");
const model = require("../assets/js/northline-model.js");

const near = (actual, expected, tol = 1) => assert.ok(Math.abs(actual - expected) <= tol, `${actual} is not within ${tol} of ${expected}`);

test("a do-nothing year keeps the bank minimum and borrows nothing extra", () => {
  const r = model.run(["focus", "decline", "features", "keep"]);
  assert.equal(r.quarters.length, 4);
  for (const q of r.quarters) assert.ok(q.cash >= model.BASE.minCash);
});

test("each quarter's cash ties out: cash = previous cash + cash from operations + borrowing", () => {
  const r = model.run(["price", "accept90", "category", "stretch"]);
  let cash = model.BASE.cash;
  for (const q of r.quarters) {
    near(q.cash, cash + q.cfo + q.borrowed);
    cash = q.cash;
  }
});

test("the price-cut, 90-day, category, stretch path ends profitable on paper but short of cash", () => {
  const o = model.outcome(model.run(["price", "accept90", "category", "stretch"]));
  assert.equal(o.headline, "Profitable on paper, short of cash");
  near(o.profit, 143000, 1000);
  near(o.cash, 297000, 1000);
  near(o.borrowed, 273000, 1000);
  assert.equal(o.stretched, true);
});

test("90-day terms tie up more working capital than 45-day terms", () => {
  const slow = model.run(["focus", "accept90", "features", "keep"]).quarters[1];
  const fast = model.run(["focus", "accept45", "features", "keep"]).quarters[1];
  assert.ok(slow.wc > fast.wc);
  assert.ok(slow.cfo < fast.cfo);
});

test("stretching depreciation raises reported profit without changing cash", () => {
  const keep = model.run(["focus", "decline", "features", "keep"]).quarters[3];
  const stretch = model.run(["focus", "decline", "features", "stretch"]).quarters[3];
  assert.ok(stretch.profit > keep.profit);
  near(stretch.cfo, keep.cfo);
});

test("every combination of choices produces one of the known headlines", () => {
  const headlines = new Set([
    "A category king in the making",
    "Defining the category, on borrowed money",
    "Profitable on paper, short of cash",
    "Losing money and borrowing to keep going",
    "A strong launch with no strategy behind it",
    "Busy, but stuck",
    "Focused and profitable, but still unknown"
  ]);
  for (const a of ["price", "focus", "vision"])
    for (const b of ["accept90", "accept45", "decline"])
      for (const c of ["features", "category", "drip"])
        for (const d of ["stretch", "keep"]) {
          const o = model.outcome(model.run([a, b, c, d]));
          assert.ok(headlines.has(o.headline), `${[a, b, c, d]} gave "${o.headline}"`);
          assert.ok(Number.isFinite(o.profit) && Number.isFinite(o.cash));
        }
});
