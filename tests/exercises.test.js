// The interactive blocks: each test drives one exercise and checks the numbers it shows.
// Expected values come from the invented companies in the book files; if you change
// a block's data on purpose, update the numbers here.
const test = require("node:test");
const assert = require("node:assert/strict");
const { setup, slide } = require("./helpers");

let env;
let page;
test.before(async () => {
  env = await setup();
  page = await env.page();
});
test.after(async () => {
  assert.deepEqual(page.errors, []);
  await env.close();
});

async function sort(answers) {
  for (const a of answers) {
    await page.click(`[data-opt="${a}"]`);
    await page.click('[data-action="next"]');
  }
  return page.text(".sorter-score");
}

const tableRows = () => page.evaluate(() => Array.from(document.querySelectorAll(".dt-table"), (t) => t.tBodies[0].rows.length));

test("GSBS: bad strategy tables the four hallmarks and keeps the spotting exercise", async () => {
  await page.open("gsbs-bad-strategy");
  assert.equal(await page.evaluate(() => document.querySelectorAll(".brief-p").length), 6);
  assert.deepEqual(await tableRows(), [4, 4]);
  // Each hallmark carries its highlighter color, shared with the exercise below.
  assert.deepEqual(await page.evaluate(() => Array.from(document.querySelectorAll(".dt-table th .hl"), (h) => h.className)), ["hl hl-fluff", "hl hl-face", "hl hl-goals", "hl hl-objectives"]);
  await page.click('[data-pen="goals"]');
  await page.click('[data-seg="0-0"]');
  await page.click('[data-action="check"]');
  assert.match(await page.text(".spot-count"), /\d+ of \d+/);
});

test("GSBS: the kernel figure switches between examples, with the parts tabled", async () => {
  await page.open("gsbs-kernel");
  assert.equal(await page.evaluate(() => document.querySelectorAll(".brief-p").length), 6);
  assert.deepEqual(await tableRows(), [5, 4, 5]);
  const before = await page.evaluate(() => document.querySelector(".kernel-panels").textContent);
  await page.click('[data-view="apple"]');
  assert.equal(await page.getAttribute('[data-view="apple"]', "aria-selected"), "true");
  // The panels swap after a short fade.
  await page.waitForFunction((b) => document.querySelector(".kernel-panels").textContent !== b, before);
});

test("GSBS: why so much bad strategy draws the voting cycle and checks its arithmetic", async () => {
  await page.open("gsbs-why-bad-strategy");
  assert.equal(await page.evaluate(() => document.querySelectorAll(".sorter, input, button.tpl-again").length), 0);
  assert.equal(await page.evaluate(() => document.querySelectorAll(".fg-note").length), 4);
  assert.deepEqual(await tableRows(), [3, 4, 4]);
  // The rankings in the table really do cycle: each option loses to another, 2 to 1.
  const ranks = await page.evaluate(() =>
    Array.from(document.querySelector(".dt-table").tBodies[0].rows, (r) => Array.from(r.cells).slice(1).map((c) => c.textContent))
  );
  const beats = (a, b) => ranks.filter((r) => r.indexOf(a) < r.indexOf(b)).length;
  assert.deepEqual([beats("Chips", "Boxes"), beats("Boxes", "Solutions"), beats("Solutions", "Chips")], [2, 2, 2]);
});

test("GSBS: discovering power draws Wal-Mart's network and tables strength against weakness", async () => {
  await page.open("gsbs-discovering-power");
  assert.equal(await page.evaluate(() => document.querySelectorAll(".sorter, input").length), 0);
  assert.equal(await page.evaluate(() => document.querySelectorAll(".fg-wide .sv-call").length), 4);
  assert.equal(await page.evaluate(() => document.querySelectorAll(".fg-note").length), 4);
  assert.deepEqual(await tableRows(), [6, 5]);
  assert.match(await page.text(".pager"), /Next → \| Bad strategy \|/i);
  // On a phone the figure switches to its stacked layout and fits the screen.
  await page.setViewportSize({ width: 390, height: 844 });
  assert.ok(await page.evaluate(() => {
    const svg = document.querySelector(".fg-narrow svg");
    return svg && svg.getBoundingClientRect().width > 0 && svg.getBoundingClientRect().width <= 390;
  }));
  await page.setViewportSize({ width: 1280, height: 900 });
});

// A dense page's shape: no quiz or toy model, the brief, the figure's callouts and notes, and table sizes.
async function dense(route, { points, calls, rows }) {
  await page.open(route);
  assert.equal(await page.evaluate(() => document.querySelectorAll(".sorter, input").length), 0);
  assert.equal(await page.evaluate(() => document.querySelectorAll(".brief-p").length), points);
  if (calls !== undefined) {
    assert.equal(await page.evaluate(() => document.querySelectorAll(".fg-wide .sv-call").length), calls);
    assert.equal(await page.evaluate(() => document.querySelectorAll(".fg-note").length), calls);
  }
  assert.deepEqual(await tableRows(), rows);
}

test("GSBS: using leverage draws the threshold and tables the three sources", async () => {
  await dense("gsbs-using-leverage", { points: 6, calls: 3, rows: [3, 4] });
  assert.match(await page.text(".dt-table"), /Anticipation\s[\s\S]*Pivot points\s[\s\S]*Concentration\s/);
});

test("GSBS: proximate objectives draws the Surveyor ladder and rewrites blue-sky objectives", async () => {
  await dense("gsbs-proximate-objectives", { points: 6, calls: 3, rows: [4, 4] });
  assert.match(await page.evaluate(() => document.querySelector(".fg-art").getAttribute("aria-label")), /firm ground with scattered rocks/);
  assert.match(await page.text(".pager"), /Using leverage .* Chain-link systems/);
});

test("GSBS: chain-link systems draw the weakest link against the average", async () => {
  await dense("gsbs-chain-link", { points: 6, calls: 3, rows: [5, 5] });
  // The figure's labels agree with its bars: average 6, weakest link 4.
  const labels = await page.evaluate(() => Array.from(document.querySelectorAll(".fg-wide .sv-k"), (t) => t.textContent));
  const bars = labels.filter((t) => /^\d+$/.test(t)).map(Number);
  assert.deepEqual(bars, [8, 7, 4, 5, 6]);
  assert.ok(labels.includes(`AVERAGE ${bars.reduce((a, b) => a + b) / bars.length}`));
  assert.ok(labels.includes(`WEAKEST LINK ${Math.min(...bars)}`));
});

test("GSBS: the Cannae map steps through four phases", async () => {
  await page.open("gsbs-using-design");
  assert.equal(await page.evaluate(() => document.querySelectorAll(".brief-p").length), 5);
  assert.deepEqual(await tableRows(), [5, 5]);
  assert.equal(await page.text('.pm [data-ref="step"]'), "PHASE 1 OF 4");
  assert.equal(await page.getAttribute('.pm [data-ref="prev"]', "disabled"), "");
  for (let i = 0; i < 3; i++) await page.click('.pm [data-ref="next"]');
  assert.equal(await page.text('.pm [data-ref="title"]'), "The trap shuts");
  assert.equal(await page.getAttribute('.pm [data-ref="next"]', "disabled"), "");
  assert.equal(await page.getAttribute('.pm [role="tab"][data-phase="3"]', "aria-selected"), "true");
  // The heavy cavalry ends up behind the Roman infantry.
  assert.equal(await page.evaluate(() => document.querySelector('[data-unit="heavy-cav"]').style.transform), "translate(160px, 46px)");
  await page.focus('.pm [role="tab"][data-phase="3"]');
  await page.keyboard.press("ArrowLeft");
  assert.equal(await page.text('.pm [data-ref="title"]'), "The sides close");
});

test("GSBS: focus maps Crown's policies on one target", async () => {
  await dense("gsbs-focus", { points: 6, rows: [2, 5] });
  // Six policies, each linked to the target, and a list in place of the map on phones.
  assert.equal(await page.evaluate(() => document.querySelectorAll(".dg-link").length), 10);
  assert.equal(await page.evaluate(() => [...document.querySelectorAll(".dg-link")].filter((l) => /NaN/.test(l.getAttribute("d"))).length), 0);
  assert.equal(await page.evaluate(() => document.querySelectorAll(".dg-list li").length), 1);
  assert.match(await page.text(".dg-list"), /Small plants close to customers/);
});

test("GSBS: growth works the arithmetic of buying a company", async () => {
  await dense("gsbs-growth", { points: 6, calls: 4, rows: [5, 4] });
  // The waterfall's labels add up: worth on its own + gains − price = value created.
  const nums = await page.evaluate(() => Array.from(document.querySelectorAll(".fg-wide text"), (t) => t.textContent).filter((t) => /^[+−]?\d+$/.test(t)));
  const [own, gains, price, created] = nums.map((n) => Number(n.replace("−", "-")));
  assert.equal(own + gains - price, created);
});

test("GSBS: using advantage tables four ways to raise its value and the silver machine", async () => {
  await dense("gsbs-using-advantage", { points: 6, rows: [4, 5, 6] });
  assert.match(await page.text(".dt-table"), /Deepen it[\s\S]*Broaden it[\s\S]*Create demand[\s\S]*Strengthen isolating mechanisms/);
});

test("GSBS: spot the guideposts of change", async () => {
  await page.open("gsbs-using-dynamics");
  assert.equal(await page.evaluate(() => document.querySelectorAll(".brief-p").length), 5);
  assert.deepEqual(await tableRows(), [5, 5]);
  // Each guidepost carries the highlighter color the exercise uses for it.
  assert.deepEqual(await page.evaluate(() => Array.from(document.querySelectorAll(".dt-table th .hl"), (h) => h.className.split("-").pop())), ["fixed", "dereg", "bias", "incumbent", "attractor"]);
  await page.click('[data-pen="dereg"]');
  await page.click('[data-seg="0-0"]');
  await page.click('[data-pen="fixed"]');
  await page.click('[data-seg="0-1"]');
  await page.click('[data-pen="bias"]');
  await page.click('[data-seg="0-2"]');
  await page.click('[data-action="check"]');
  assert.match(await page.text(".spot-count"), /^2 of 5 found/);
  assert.match(await page.text(".spot-notes"), /Not a guidepost here/i);
});

test("GSBS: inertia and entropy draws GM's brand ladder coming apart", async () => {
  await dense("gsbs-inertia-entropy", { points: 6, rows: [4] });
  // The ladder's ranges don't overlap; the later ones do.
  const spans = await page.evaluate(() =>
    Array.from(document.querySelectorAll(".fg-wide svg > g"), (g) => Array.from(g.querySelectorAll("rect"), (r) => [Number(r.getAttribute("x")), Number(r.getAttribute("x")) + Number(r.getAttribute("width"))]))
  );
  const overlaps = (rs) => rs.slice(1).filter((r, i) => r[0] < rs[i][1]).length;
  assert.equal(spans.length, 2);
  assert.equal(overlaps(spans[0]), 0);
  assert.equal(overlaps(spans[1]), 4);
});

test("GSBS: strategy as hypothesis tells hypotheses from articles of faith", async () => {
  await dense("gsbs-science-of-strategy", { points: 5, rows: [4, 3] });
});

test("GSBS: the kernel builder flags a corporate draft", async () => {
  await page.open("gsbs-builder");
  await page.click('[data-example="corporate"]');
  assert.ok((await page.text(".verdict")).length > 0);
  const rows = await page.evaluate(() => document.querySelectorAll(".action-row").length);
  await page.click('[data-ref="add-action"]');
  assert.equal(await page.evaluate(() => document.querySelectorAll(".action-row").length), rows + 1);
});

test("FI: judgment calls move profit while cash stays put", async () => {
  await page.open("fi-profit-estimate");
  assert.equal(await page.text('[data-ref="profit"]'), "$39,683");
  const cash = await page.text('[data-ref="cash"]');
  await page.click('[data-preset="low"]');
  assert.equal(await page.text('[data-ref="profit"]'), "−$3,000");
  assert.equal(await page.text('[data-ref="cash"]'), cash);
});

test("FI: each move reaches only the profits below it", async () => {
  await page.open("fi-forms-of-profit");
  const tiles = () => page.text(".pl .tiles");
  assert.match(await tiles(), /40\.0% .* 10\.4% .* 5\.9% /i);
  await page.click('[data-move="warehouse"]');
  assert.match(await tiles(), /40\.0% \| Unchanged .* 10\.4% \| Unchanged .* 8\.4% \| \+2\.5 points$/i);
  assert.equal(await page.text('[data-reach="warehouse"]'), "Reaches net profit only");
  await page.click('[data-move="price"]');
  assert.match(await tiles(), /42\.9% .* 14\.7% .* 11\.6% /i);
  assert.equal(await page.text('[data-reach="price"]'), "Reaches gross profit, operating profit and net profit");
  await page.click('[data-move="marketing"]');
  assert.equal(await page.text('[data-reach="marketing"]'), "Reaches operating profit and net profit");
  await page.click('.pl [data-ref="reset"]');
  assert.match(await tiles(), /40\.0% .* 10\.4% .* 5\.9% /i);
});

test("FI: the profit-to-cash bridge checks itself against the cash account", async () => {
  await page.open("fi-cash-connects");
  const pick = (id, sign) => page.click(`[data-pick="${id}"][data-sign="${sign}"]`);
  const right = { dep: 1, ar: -1, inv: -1, ap: 1, accr: 1, capex: -1, loan: 1 };
  for (const [id, sign] of Object.entries(right)) await pick(id, sign);
  assert.match(await page.text('.cb [data-ref="note"]'), /ends at \$17,500, .* They match/);
  assert.equal(await page.text('.cb [data-total="5"]'), "$97,500");
  // One row the wrong way moves the end by twice its amount.
  await pick("ar", 1);
  assert.match(await page.text('.cb [data-ref="note"]'), /ends at \$197,500, .* over by \$180,000/);
  await page.click('.cb [data-ref="reveal"]');
  assert.ok(await page.evaluate(() => document.querySelector('[data-row="ar"]').classList.contains("is-wrong")));
  assert.match(await page.text('[data-why="dep"]'), /^Right\. Adds cash/);
});

test("FI: revenue recognition sorter shows each month's figure", async () => {
  await page.open("fi-revenue");
  await page.click('[data-opt="all"]');
  await page.click('[data-action="next"]');
  await page.click('[data-opt="none"]');
  await page.click('[data-action="next"]');
  await page.click('[data-opt="some"]');
  assert.match(await page.text(".sorter-rewrite"), /\$1,000$/);
  await page.click('[data-action="next"]');
  // The gift cards (item 4) are answered wrong on purpose.
  assert.equal(await sort(["all", "none", "all", "some", "none"]), "7 of 8 right");
});

test("FI: double entry keeps the balance sheet in balance", async () => {
  await page.open("fi-balance-sheet");
  const post = async ([a1, s1], [a2, s2]) => {
    await page.selectOption('.de [data-acct="1"]', a1);
    await page.click(`.de [data-dir="1"][data-sign="${s1}"]`);
    await page.selectOption('.de [data-acct="2"]', a2);
    await page.click(`.de [data-dir="2"][data-sign="${s2}"]`);
    await page.click('.de [data-ref="post"]');
  };
  const verdict = () => page.text('.de [data-ref="verdict"]');
  // A one-sided mistake tips the scale; retrying keeps the books clean.
  await post(["cash", 1], ["loan", -1]);
  assert.match(await verdict(), /out of balance by \$100,000/i);
  await page.click('.de [data-ref="retry"]');
  await post(["cash", 1], ["loan", 1]);
  assert.match(await verdict(), /^right/i);
  await page.click('.de [data-ref="next"]');
  // A balanced but wrong entry is caught too; "Show the answer" posts the right one.
  await post(["inv", 1], ["cash", -1]);
  assert.match(await verdict(), /it balances, but/i);
  await page.click('.de [data-ref="reveal"]');
  await page.click('.de [data-ref="next"]');
  const rest = [
    [["cash", -1], ["ap", -1]],
    [["equip", 1], ["cash", -1]],
    [["ar", 1], ["equity", 1]],
    [["inv", -1], ["equity", -1]],
    [["equip", -1], ["equity", -1]],
    [["accr", 1], ["equity", -1]]
  ];
  for (const [k, [a, b]] of rest.entries()) {
    await post(a, b);
    assert.match(await verdict(), /^right/i, `transaction ${k + 3}`);
    if (k < rest.length - 1) await page.click('.de [data-ref="next"]');
  }
  assert.equal(await page.text('.de [data-ref="progress"]'), "DONE · 6 OF 8 RIGHT FIRST TIME");
  assert.equal(await page.text('.de [data-ref="assets"]'), "$1,434,000");
  assert.equal(await page.text('.de [data-ref="claims"]'), "$1,434,000");
});

test("FI: the three statements stay in balance through a month of events", async () => {
  await page.open("fi-profit-cash");
  const expected = [
    ["restock", "$12,000", "$50,000"],
    ["machine", "$12,000", "$26,000"],
    ["depreciate", "$10,000", "$26,000"],
    ["payroll", "$2,000", "$18,000"],
    ["paysupplier", "$2,000", "−$2,000"],
    ["collect", "$2,000", "$28,000"],
    ["borrow", "$2,000", "$43,000"],
    ["repay", "$2,000", "$38,000"]
  ];
  for (const [move, profit, cash] of expected) {
    await page.click(`[data-move="${move}"]`);
    assert.equal(await page.text('[data-ref="profit"]'), profit, `profit after ${move}`);
    assert.equal(await page.text('[data-ref="cash"]'), cash, `cash after ${move}`);
    const checks = await page.evaluate(() => [...document.querySelectorAll(".st-check")].map((e) => e.innerText));
    assert.ok(checks.every((c) => c.startsWith("✓")), `books out of balance after ${move}`);
  }
  await page.click('[data-ref="undo"]');
  assert.equal(await page.text('[data-ref="cash"]'), "$43,000");
});

test("FI: cash-flow sorter has three buckets and explains a wrong pick", async () => {
  await page.open("fi-cash-flow-language");
  assert.equal(await page.evaluate(() => document.querySelectorAll(".sorter-opt").length), 3);
  await page.click('[data-opt="fin"]');
  assert.match(await page.text(".sorter-why"), /^NOT QUITE/i);
});

test("FI: ratios compare two years", async () => {
  await page.open("fi-ratios");
  assert.match(await page.text(".ratios .tiles-3"), /\$675k → \$750k/);
  assert.equal(await page.evaluate(() => document.querySelectorAll(".rt-row").length), 13);
  await page.click('[data-ratio="ic"]');
  assert.match(await page.text(".ratio-detail"), /10\.0×.*6\.0×/);
});

test("FI: the rate decides between money now and later", async () => {
  await page.open("fi-roi-basics");
  const note = () => page.text('.tv [data-ref="note"]');
  assert.match(await note(), /^At 5%, 4 of 5 later offers are worth more/);
  await page.click('.tv [data-rate="0.12"]');
  assert.match(await note(), /^At 12%, 1 of 5 later offers is worth more/);
  // The ten-year offer breaks even at exactly 12%.
  assert.match(await page.text(".tv-offer:last-child"), /About the same/i);
  await slide(page, '.tv [data-ref="rate"]', 0);
  assert.match(await note(), /^At 0%, 5 of 5 .* waiting costs nothing/);
});

test("FI: ROI calculator", async () => {
  await page.open("fi-roi");
  const tiles = () => page.text(".roi .tiles-3");
  assert.match(await tiles(), /3\.6 years .*\$79,079 .*16\.5% \| Above the 10% hurdle/);
  await slide(page, 'input[data-key="savings"]', 90000);
  assert.match(await tiles(), /4\.4 years .*−\$8,027 .*9\.3% \| Below the 10% hurdle/);
  await slide(page, 'input[data-key="savings"]', 60000);
  assert.match(await tiles(), /Never .*None/);
  await page.click('[data-ref="reset"]');
  assert.match(await tiles(), /\$79,079/);
});

test("FI: working capital levers free cash", async () => {
  await page.open("fi-working-capital");
  assert.match(await page.text(".tiles-3"), /90 days .*\$2,498,630/);
  await slide(page, 'input[data-key="dso"]', 45);
  assert.equal(await page.text('[data-ref="freed"]'), "+$328,767");
  assert.equal(await page.text('[data-ref="ccc"]'), "80 days");
});

test("TiS: stocks and flows draw the bathtub and chart what the level does", async () => {
  await page.open("tis-stocks-flows");
  assert.equal(await page.evaluate(() => document.querySelectorAll(".sorter, input").length), 0);
  // Stock-and-flow notation: two clouds, a stock, two flows with valves.
  assert.equal(await page.evaluate(() => document.querySelectorAll(".fg-wide .dg-cloud").length), 2);
  assert.equal(await page.evaluate(() => document.querySelectorAll(".fg-wide .dg-valve").length), 2);
  assert.equal(await page.evaluate(() => document.querySelectorAll(".bh-chart").length), 4);
  // Hovering a chart reads the level: the closing faucet's tub peaks at 45 liters at minute 10.
  await page.locator(".bh-chart").nth(3).scrollIntoViewIfNeeded();
  const at = await page.evaluate(() => {
    const fig = document.querySelectorAll(".bh-chart")[3];
    const r = fig.querySelector("svg").getBoundingClientRect();
    const W = fig.bhW;
    return { x: r.left + (r.width * (34 + (10 / 30) * (W - 44))) / W, y: r.top + r.height / 2 };
  });
  await page.mouse.move(at.x, at.y);
  assert.equal(await page.text(".bh-chart:nth-child(4) .bh-tip"), "Minutes 10 | 45 L Water in the tub");
  await page.mouse.move(0, 0);
  const rows = () => page.evaluate(() => Array.from(document.querySelectorAll(".dt-table"), (t) => t.tBodies[0].rows.length));
  assert.deepEqual(await rows(), [7, 6]);
});

test("TiS: feedback draws three loops and their behavior, with doubling times", async () => {
  await page.open("tis-feedback");
  assert.equal(await page.evaluate(() => document.querySelectorAll(".sorter, input").length), 0);
  // Two reinforcing and two balancing loop marks; every signed link has its sign.
  assert.deepEqual(await page.evaluate(() => Array.from(document.querySelectorAll(".fg-wide .sv-call text"), (t) => t.textContent)), ["B", "R", "R", "B"]);
  assert.equal(await page.evaluate(() => document.querySelectorAll(".fg-wide .dg-sign").length), 13);
  assert.equal(await page.evaluate(() => document.querySelectorAll(".bh-chart").length), 4);
  assert.match(await page.text(".dt-table"), /10% a year\t7 years\t7\.3 years/);
});

test("TiS: delays draw the dealer's loop and re-run it four ways", async () => {
  await page.open("tis-delays");
  assert.equal(await page.evaluate(() => document.querySelectorAll(".sorter, input").length), 0);
  assert.equal(await page.evaluate(() => document.querySelectorAll(".fg-wide .dg-delay").length), 6);
  // The re-run behind the charts: reacting faster widens the swing, reacting slower narrows it.
  const swing = (i) =>
    page.evaluate((i) => {
      const d = document.querySelectorAll(".bh-chart")[i].querySelector(".bh-line").getAttribute("d");
      const ys = d.match(/[ML][\d.]+ ([\d.]+)/g).map((m) => Number(m.split(" ")[1]));
      return Math.max(...ys) - Math.min(...ys);
    }, i);
  const [base, faster, slower] = [await swing(0), await swing(1), await swing(2)];
  assert.ok(faster > base * 1.5 && slower < base * 0.5, `${base} ${faster} ${slower}`);
  const rows = () => page.evaluate(() => Array.from(document.querySelectorAll(".dt-table"), (t) => t.tBodies[0].rows.length));
  assert.deepEqual(await rows(), [3, 5]);
});

test("TiS: limits draw the two-stock structure and re-run the oil field and the fishery", async () => {
  await page.open("tis-limits");
  assert.equal(await page.evaluate(() => document.querySelectorAll(".sorter, input").length), 0);
  assert.equal(await page.evaluate(() => document.querySelectorAll(".fg-wide .dg-node.is-stock").length), 2);
  assert.match(await page.text(".bh-chart"), /Output peaks in year 42\b.*year 52\b.*year 61\b/);
  const rows = () => page.evaluate(() => Array.from(document.querySelectorAll(".dt-table"), (t) => t.tBodies[0].rows.length));
  assert.deepEqual(await rows(), [6, 3]);
});

test("TiS: resilience draws hierarchy and works Simon's watchmakers", async () => {
  await page.open("tis-resilience");
  assert.equal(await page.evaluate(() => document.querySelectorAll(".sorter, input").length), 0);
  assert.equal(await page.evaluate(() => document.querySelectorAll(".fg-wide .sv-box-ink").length), 9);
  assert.deepEqual(
    await page.evaluate(() => Array.from(document.querySelectorAll(".bc-v"), (v) => v.textContent)),
    ["90.4%", "36.6%", "0.004%"]
  );
  assert.equal(await page.evaluate(() => document.querySelector(".dt-table").tBodies[0].rows.length), 3);
});
test("TiS: surprises tables the six sources and charts a nonlinearity", async () => {
  await page.open("tis-surprises");
  assert.equal(await page.evaluate(() => document.querySelectorAll(".sorter, input").length), 0);
  const rows = () => page.evaluate(() => Array.from(document.querySelectorAll(".dt-table"), (t) => t.tBodies[0].rows.length));
  assert.deepEqual(await rows(), [6, 3]);
  // Waiting time at 90% busy: nine service times.
  await page.locator(".bh-chart").first().scrollIntoViewIfNeeded();
  const at = await page.evaluate(() => {
    const fig = document.querySelector(".bh-chart");
    const r = fig.querySelector("svg").getBoundingClientRect();
    const W = fig.bhW;
    return { x: r.left + (r.width * (34 + (90 / 96) * (W - 44))) / W, y: r.top + r.height / 2 };
  });
  await page.mouse.move(at.x, at.y);
  assert.equal(await page.text(".bh-tip"), "Utilization, % 90 | 9 Service times of waiting");
  await page.mouse.move(0, 0);
});
test("TiS: traps draw each of the eight structures with its way out", async () => {
  await page.open("tis-traps");
  assert.equal(await page.evaluate(() => document.querySelectorAll(".sorter, input").length), 0);
  assert.equal(await page.evaluate(() => document.querySelectorAll(".lc-card").length), 8);
  // Every card has a drawing with links and its three labelled rows.
  assert.ok(await page.evaluate(() => [...document.querySelectorAll(".lc-card")].every((c) => c.querySelectorAll(".dg-link").length >= 2 && c.querySelectorAll(".lc-rows dt").length === 3)));
  assert.match(await page.text(".lc-card:nth-child(4)"), /Escalation .* Arms races, price wars/);
  assert.equal(await page.evaluate(() => document.querySelector(".dt-table").tBodies[0].rows.length), 8);
});
test("TiS: the system sketch checks behavior, stock, loop, delay and leverage", async () => {
  await page.open("tis-living");
  assert.equal(await page.evaluate(() => document.querySelector(".dt-table").tBodies[0].rows.length), 15);
  const statuses = () => page.evaluate(() => [...document.querySelectorAll(".sk .check")].map((c) => c.classList[1]).join(" "));
  assert.match(await page.text(".sk .check-summary"), /6 of 6 checks pass/);
  await page.click('.sk [data-example="blank"]');
  assert.match(await page.text(".sk .check-summary"), /^Start with the behavior/);
  // An event, a flow posing as a stock and a change to a number all get flagged.
  await page.fill('.sk [data-field="behavior"]', "The finance director resigned this morning.");
  await page.fill('.sk [data-field="stock"]', "Sales per month");
  await page.fill('.sk [data-field="lever"]', "Raise the bonus budget.");
  assert.equal(await statuses(), "warn warn fail fail fail warn");
  assert.match(await page.text(".sk .checks"), /“Sales” sounds like a flow/);
  await page.fill('.sk [data-field="behavior"]', "Unsold cars have swung between gluts and shortages every year since 2021.");
  await page.fill('.sk [data-field="stock"]', "Unsold cars on the lot");
  await page.fill('.sk [data-field="inflow"]', "Deliveries");
  await page.fill('.sk [data-field="outflow"]', "Sales");
  await page.fill('.sk [data-field="loop"]', "The fewer unsold cars on the lot, the more the dealer orders.");
  await page.check('.sk [data-kind][value="balancing"]');
  await page.fill('.sk [data-field="delay"]', "Deliveries take about five days.");
  await page.fill('.sk [data-field="lever"]', "Show the dealer the cars already on order, not just the lot.");
  assert.equal(await statuses(), "pass pass pass pass pass pass");
  await page.open("notebook");
  assert.match(await page.text("#view"), /Your system sketch \| The behavior \| Unsold cars have swung/i);
});

test("TiS: leverage points rank all twelve and show information at work", async () => {
  await page.open("tis-leverage-points");
  assert.equal(await page.evaluate(() => document.querySelectorAll(".sorter, input, .rk").length), 0);
  const steps = await page.evaluate(() => Array.from(document.querySelectorAll(".fg-wide .sv-k"), (t) => t.textContent));
  assert.deepEqual(steps.slice(0, 12), ["12", "11", "10", "9", "8", "7", "6", "5", "4", "3", "2", "1"]);
  const rows = () => page.evaluate(() => Array.from(document.querySelectorAll(".dt-table"), (t) => t.tBodies[0].rows.length));
  assert.deepEqual(await rows(), [12, 2]);
});
test("Porter: the mindset page contrasts best and unique, and draws the productivity frontier", async () => {
  await page.open("ump-mindset");
  assert.equal(await page.evaluate(() => document.querySelectorAll(".sorter, input").length), 0);
  assert.equal(await page.evaluate(() => document.querySelectorAll(".brief-p").length), 6);
  const rows = () => page.evaluate(() => Array.from(document.querySelectorAll(".dt-table"), (t) => t.tBodies[0].rows.length));
  assert.deepEqual(await rows(), [7, 5]);
  // The frontier: a labelled image with four numbered callouts and four notes to match.
  assert.match(await page.evaluate(() => document.querySelector(".fg-art").getAttribute("aria-label")), /productivity frontier/);
  assert.equal(await page.evaluate(() => document.querySelectorAll(".fg .sv-call").length), 4);
  assert.equal(await page.evaluate(() => document.querySelectorAll(".fg-note").length), 4);
  // The diagram fits a phone without sideways scrolling.
  await page.setViewportSize({ width: 390, height: 844 });
  assert.ok(await page.evaluate(() => document.querySelector(".fg-art svg").getBoundingClientRect().width <= 390));
  await page.setViewportSize({ width: 1280, height: 900 });
});

test("Porter: the five forces page maps the forces, charts real industry returns and works the airline case", async () => {
  await page.open("ump-five-forces");
  // A reference page: no toy model and no quiz.
  assert.equal(await page.evaluate(() => document.querySelectorAll(".sorter, input").length), 0);
  assert.equal(await page.evaluate(() => document.querySelectorAll(".brief-p").length), 10);
  assert.match(await page.text(".fm-grid"), /Threat of new entrants .* Supplier power .* Rivalry among existing competitors .* Buyer power .* Threat of substitutes/);

  // The chart: every industry, values written only where the text discusses them.
  assert.equal(await page.evaluate(() => document.querySelectorAll(".bc-row").length), 31);
  assert.equal(await page.text(".bc-ref-k"), "All industries 14.9%");
  assert.deepEqual(
    await page.evaluate(() => Array.from(document.querySelectorAll(".bc-v"), (v) => v.textContent)),
    ["40.9%", "37.6%", "37.6%", "31.7%", "5.9%"]
  );
  // Hover and keyboard focus show the same tooltip.
  const tip = () => page.evaluate(() => (document.querySelector(".bc-tip").hidden ? "" : document.querySelector(".bc-tip").textContent));
  await page.hover('.bc-row[aria-label^="Soft drink bottling"] .bc-bar');
  assert.equal(await tip(), "11.7%Soft drink bottling");
  await page.mouse.move(0, 0);
  assert.equal(await tip(), "");
  await page.focus(".bc-row[tabindex='0']");
  await page.keyboard.press("End");
  assert.equal(await tip(), "5.9%Airlines");
  await page.keyboard.press("ArrowUp");
  assert.equal(await tip(), "5.9%Catalog & mail order");
  // The table twin carries every value.
  await page.click(".bc-table summary");
  assert.equal(await page.evaluate(() => document.querySelectorAll(".bc-table tbody tr").length), 31);
  assert.match(await page.text(".bc-table"), /Semiconductors\s+21\.3%/);

  // The tables: the airline case force by force, factors and mistakes.
  const rows = () => page.evaluate(() => Array.from(document.querySelectorAll(".dt-table"), (t) => t.tBodies[0].rows.length));
  assert.deepEqual(await rows(), [5, 4, 7]);
  assert.match(await page.text(".dt"), /Rivalry\tMany carriers[^|]*\tPrice ↓ Cost ↑ \| Buyers/);
});

test("Porter: the advantage page traces price and cost to the value chain", async () => {
  await page.open("ump-advantage");
  assert.equal(await page.evaluate(() => document.querySelectorAll(".sorter, input").length), 0);
  assert.equal(await page.evaluate(() => document.querySelectorAll(".brief-p").length), 6);
  // Porter's generic chain: four support activities over five primary ones, ending in margin.
  assert.equal(await page.evaluate(() => document.querySelectorAll(".vc-support").length), 4);
  assert.equal(await page.evaluate(() => document.querySelectorAll(".vc-primary").length), 5);
  assert.match(await page.text(".vc-chain"), /Firm infrastructure .* Procurement .* Inbound logistics .* Service .* MARGIN$/);
  // The value system swaps to a vertical drawing on phones.
  const shown = () => page.evaluate(() => Array.from(document.querySelectorAll(".fg-fig.has-narrow > .fg-art > div"), (d) => getComputedStyle(d).display));
  assert.deepEqual(await shown(), ["block", "none"]);
  await page.setViewportSize({ width: 390, height: 844 });
  assert.deepEqual(await shown(), ["none", "block"]);
  await page.setViewportSize({ width: 1280, height: 900 });
  const rows = () => page.evaluate(() => Array.from(document.querySelectorAll(".dt-table"), (t) => t.tBodies[0].rows.length));
  assert.deepEqual(await rows(), [10, 6]);
});

test("Porter: the value page sets four value propositions and IKEA's tailored chain side by side", async () => {
  await page.open("ump-value");
  assert.equal(await page.evaluate(() => document.querySelectorAll(".sorter, input").length), 0);
  const rows = () => page.evaluate(() => Array.from(document.querySelectorAll(".dt-table"), (t) => t.tBodies[0].rows.length));
  assert.deepEqual(await rows(), [4, 3]);
  // Seven activities, two chains; IKEA's row is the highlighted one.
  assert.equal(await page.evaluate(() => document.querySelectorAll(".cc-act").length), 7);
  assert.equal(await page.evaluate(() => document.querySelectorAll(".cc-cell.is-pen").length), 7);
  assert.match(await page.text(".cc-grid"), /Typical retailer .* IKEA .* Design .* Buys ranges from outside makers .* Its own designers/);
  // On phones the matrix becomes a list by activity, each cell naming its company.
  await page.setViewportSize({ width: 390, height: 844 });
  assert.equal(await page.evaluate(() => getComputedStyle(document.querySelector(".cc-who")).display), "block");
  await page.setViewportSize({ width: 1280, height: 900 });
});

test("Porter: trade-offs set three airlines side by side and mark what Continental Lite copied", async () => {
  await page.open("ump-trade-offs");
  assert.equal(await page.evaluate(() => document.querySelectorAll(".sorter, input").length), 0);
  assert.deepEqual(
    await page.evaluate(() => Array.from(document.querySelectorAll(".cc-tag"), (t) => t.textContent)),
    ["Copied", "Kept", "Copied", "Copied", "Copied", "Kept", "Kept"]
  );
  // Southwest's row and the copied cells are drawn in pen.
  assert.equal(await page.evaluate(() => document.querySelectorAll(".cc-cell.is-pen").length), 11);
  const rows = () => page.evaluate(() => Array.from(document.querySelectorAll(".dt-table"), (t) => t.tBodies[0].rows.length));
  assert.deepEqual(await rows(), [3, 5]);
});

test("Porter: fit maps Southwest's activity system and charts the odds of copying it", async () => {
  await page.open("ump-fit");
  assert.equal(await page.evaluate(() => document.querySelectorAll(".sorter, input").length), 0);
  // Six themes and eleven activities, every link between two real nodes.
  assert.equal(await page.evaluate(() => document.querySelectorAll(".dg-node.is-theme").length), 6);
  assert.equal(await page.evaluate(() => document.querySelectorAll(".dg-node.is-act").length), 11);
  assert.equal(await page.evaluate(() => document.querySelectorAll(".dg-link").length), 23);
  assert.equal(await page.evaluate(() => [...document.querySelectorAll(".dg-link")].filter((l) => /NaN/.test(l.getAttribute("d"))).length), 0);
  // On phones the map becomes a list of themes and what supports them.
  await page.setViewportSize({ width: 390, height: 844 });
  assert.equal(await page.evaluate(() => getComputedStyle(document.querySelector(".dg-art")).display), "none");
  assert.match(await page.text(".dg-list"), /^Limited passenger service \| SUPPORTED BY No meals · No seat assignments · No baggage transfers/);
  await page.setViewportSize({ width: 1280, height: 900 });
  // 0.9 to the power of the number of activities.
  assert.deepEqual(
    await page.evaluate(() => Array.from(document.querySelectorAll(".bc-v"), (v) => v.textContent)),
    ["90%", "81%", "66%", "48%", "35%"]
  );
  const rows = () => page.evaluate(() => Array.from(document.querySelectorAll(".dt-table"), (t) => t.tBodies[0].rows.length));
  assert.deepEqual(await rows(), [3, 5]);
});

test("Porter: continuity lists what it builds, when to change, and the five tests", async () => {
  await page.open("ump-continuity");
  assert.equal(await page.evaluate(() => document.querySelectorAll(".sorter, input").length), 0);
  const rows = () => page.evaluate(() => Array.from(document.querySelectorAll(".dt-table"), (t) => t.tBodies[0].rows.length));
  assert.deepEqual(await rows(), [5, 7, 4, 5]);
  const tests = await page.evaluate(() => Array.from([...document.querySelectorAll(".dt-table")].pop().tBodies[0].rows, (r) => r.cells[0].textContent));
  assert.deepEqual(tests, ["A distinctive value proposition", "A tailored value chain", "Trade-offs different from rivals'", "Fit across the value chain", "Continuity over time"]);
});

test("Porter: the five tests workbench flags a generic plan and saves a draft", async () => {
  await page.open("ump-five-tests");
  const statuses = () => page.evaluate(() => [...document.querySelectorAll(".st .check")].map((c) => c.classList[1]).join(" "));
  assert.match(await page.text(".st .check-summary"), /^Passes all five tests \| 5 of 5 tests pass/);
  await page.click('.st [data-example="generic"]');
  assert.equal(await statuses(), "warn warn fail fail warn");
  assert.match(await page.text(".st .checks"), /Serving everyone isn't a choice/);
  // Fixing the generic plan one test at a time.
  await page.fill('.st [data-field="customers"]', "Families renting a second car for a week's holiday.");
  await page.fill('.st [data-field="price"]', "About 20% below the airport brands.");
  await page.fill('.st [data-field="tradeoffs"]', "We don't serve business travelers and won't open airport desks.");
  await page.fill('.st [data-field="continuity"]', "At least five years.");
  assert.equal(await statuses(), "pass warn pass fail pass");
  await page.open("notebook");
  assert.match(await page.text("#view"), /Your strategy \| Customers and needs \| Families renting a second car/i);
});

test("PB: category kings charts the 76% and rewrites playing smaller", async () => {
  await dense("pb-category-kings", { points: 6, rows: [4, 4] });
  assert.deepEqual(await page.evaluate(() => Array.from(document.querySelectorAll(".bc-row"), (r) => r.getAttribute("aria-label"))), [
    "The category king: 76%",
    "Every other company in the category: 24%"
  ]);
});

test("PB: naming sets category names against product names", async () => {
  await dense("pb-naming", { points: 5, rows: [5, 8] });
  // Every name that doesn't work comes with one that would.
  const rows = await page.evaluate(() => Array.from(document.querySelectorAll(".dt-table")[1].tBodies[0].rows, (r) => Array.from(r.cells, (c) => c.textContent)));
  assert.ok(rows.filter((r) => r[1] === "No").every((r) => r[3] && r[3] !== "Already one"));
});

test("PB: the magic triangle draws three designs and what passes between them", async () => {
  await dense("pb-magic-triangle", { points: 5, calls: 3, rows: [3, 4] });
});

test("PB: point of view tables its parts and keeps the workbench", async () => {
  await page.open("pb-point-of-view");
  assert.equal(await page.evaluate(() => document.querySelectorAll(".brief-p").length), 5);
  assert.deepEqual(await tableRows(), [5, 5]);
  assert.equal(await page.text(".score"), "6 of 6 checks pass");
  await page.click('[data-example="pitch"]');
  assert.equal(await page.text(".verdict"), "Reads like a product pitch");
});

test("PB: lightning strike charts drip, strike and hijacks from the same six moves", async () => {
  await dense("pb-lightning-strike", { points: 5, rows: [6, 4] });
  assert.equal(await page.evaluate(() => document.querySelectorAll(".bh-line").length), 3);
  // The weeks each chart says are noticed match the model behind it.
  const noticed = await page.evaluate(() => {
    const block = window.Marginalia.books.find((b) => b.id === "pb").pages["lightning-strike"].blocks.find((b) => b.type === "behavior");
    return block.charts.map((c) => [c.series[0].points.filter(([, a]) => a >= 3).length, c.d]);
  });
  assert.deepEqual(noticed.map(([n]) => n), [0, 4, 5]);
  for (const [n, d] of noticed) assert.match(d, new RegExp(`noticed in ${n} of 12 weeks`));
});
