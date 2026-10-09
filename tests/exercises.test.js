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

test("GSBS: spot the bad strategy scores a highlighted sentence", async () => {
  await page.open("gsbs-bad-strategy");
  await page.click('[data-pen="goals"]');
  await page.click('[data-seg="0-0"]');
  await page.click('[data-action="check"]');
  assert.match(await page.text(".spot-count"), /\d+ of \d+/);
});

test("GSBS: the kernel figure switches between examples", async () => {
  await page.open("gsbs-kernel");
  const before = await page.evaluate(() => document.querySelector(".kernel-panels").textContent);
  await page.click('[data-view="apple"]');
  assert.equal(await page.getAttribute('[data-view="apple"]', "aria-selected"), "true");
  // The panels swap after a short fade.
  await page.waitForFunction((b) => document.querySelector(".kernel-panels").textContent !== b, before);
});

test("GSBS: the template machine never finds a choice", async () => {
  await page.open("gsbs-why-bad-strategy");
  const counts = await page.text(".tpl-counts");
  assert.match(counts, /Challenges named \| 0 \| Things ruled out \| 0 \| Actions anyone could start on Monday \| 0/);
  const first = await page.text(".tpl-vision");
  await page.click('[data-ref="again"]');
  assert.notEqual(await page.text(".tpl-vision"), first);
});

test("GSBS: strength-against-weakness sorter", async () => {
  await page.open("gsbs-discovering-power");
  assert.equal(await sort(["strong", "weak", "strong", "weak", "weak", "strong", "strong"]), "6 of 7 right");
  assert.match(await page.text(".pager"), /Next → \| Bad strategy \|/i);
});

test("GSBS: proximate objectives sorter keeps score", async () => {
  await page.open("gsbs-proximate-objectives");
  assert.equal(await sort(["far", "far", "near", "near", "near", "far", "far"]), "5 of 7 right");
  assert.match(await page.text(".pager"), /Using leverage .* Chain-link systems/);
});

test("GSBS: concentrating effort beats spreading it", async () => {
  await page.open("gsbs-using-leverage");
  assert.match(await page.text(".conc .tiles"), /IMPACT \| 0$/i);
  await page.click('[data-preset="focus"]');
  assert.match(await page.text(".conc .tiles"), /IMPACT \| 70$/i);
});

test("GSBS: a chain is only as strong as its weakest link", async () => {
  await page.open("gsbs-chain-link");
  await page.click('[data-improve="0"]');
  assert.match(await page.text('[data-ref="note"]'), /wasted/);
  await page.click('[data-improve="2"]');
  await page.click('[data-improve="2"]');
  await page.click('[data-improve="3"]');
  assert.equal(await page.text('[data-ref="chain-v"]'), "6/10");
  assert.match(await page.text('[data-ref="wasted"]'), /^1 of 4 points/);
});

test("GSBS: the Cannae map steps through four phases", async () => {
  await page.open("gsbs-using-design");
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

test("GSBS: focused policies lead a group; spread ones lead none", async () => {
  await page.open("gsbs-focus");
  const tiles = () => page.text(".pf .tiles");
  const aim = async (policies, target) => {
    for (const p of policies) await page.check(`[data-policy="${p}"][value="${target}"]`);
  };
  assert.match(await tiles(), /0 of 3 \| .* \| \$0m$/i);
  // Coordinated, but aimed where the rival is too strong.
  await page.click('[data-preset="race"]');
  assert.match(await tiles(), /0 of 3 \| .* \| \$0m$/i);
  assert.match(await page.text('.pf [data-ref="note"]'), /fall short of Veloce: 15 against 18/);
  await aim(["build", "sell", "service", "pay", "message"], "commute");
  assert.match(await tiles(), /1 of 3 \| .* \| \$40m$/i);
  // Four of five still lead (10 against 9); three of five do not (6 against 9).
  await aim(["message"], "family");
  assert.match(await tiles(), /1 of 3 \| .* \| \$40m$/i);
  await aim(["pay"], "family");
  assert.match(await tiles(), /0 of 3 \| .* \| \$0m$/i);
  assert.match(await page.text('.pf [data-ref="note"]'), /2 different directions/);
});

test("GSBS: buying growth adds sales but not value", async () => {
  await page.open("gsbs-growth");
  const tiles = () => page.text(".deals .tiles");
  assert.match(await tiles(), /\$90m \| .* \| \$120m \|/i);
  await page.click('.deals [data-preset="all"]');
  assert.match(await tiles(), /\$220m \| \+144% .* \| \$98m \| −18% /i);
  assert.match(await page.text('.deals [data-ref="note"]'), /3 of 4 paid more than they gained/);
  await page.click('.deals [data-preset="none"]');
  await page.check('[data-deal="gearhaus"]');
  assert.match(await tiles(), /\$95m \| \+6% .* \| \$128m \| \+7% /i);
  assert.equal(await page.text('[data-math="gearhaus"] .deal-net dd'), "+$8m");
});

test("GSBS: four ways to raise an advantage's value", async () => {
  await page.open("gsbs-using-advantage");
  assert.equal(await sort(["deepen", "broaden", "demand", "protect", "broaden", "protect", "demand", "deepen"]), "8 of 8 right");
});

test("GSBS: spot the guideposts of change", async () => {
  await page.open("gsbs-using-dynamics");
  // Five cards, the odd one spanning the row.
  assert.equal(await page.evaluate(() => document.querySelectorAll(".hallmark").length), 5);
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

test("GSBS: inertia and entropy sorter", async () => {
  await page.open("gsbs-inertia-entropy");
  assert.equal(await sort(["routine", "culture", "proxy", "entropy", "routine", "culture", "proxy", "entropy"]), "8 of 8 right");
});

test("GSBS: strategy-as-hypothesis sorter", async () => {
  await page.open("gsbs-science-of-strategy");
  assert.equal(await sort(["faith", "test", "faith", "test", "faith", "test"]), "6 of 6 right");
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

test("TiS: the bathtub keeps rising while the faucet closes", async () => {
  await page.open("tis-stocks-flows");
  const level = () => page.text('.bt [data-ref="level"]');
  const note = () => page.text('.bt [data-ref="note"]');
  assert.equal(await level(), "20 L");
  await page.click('.bt [data-ref="jump"]');
  assert.equal(await level(), "35 L");
  await page.click('.bt [data-scenario="drain"]');
  await page.click('.bt [data-ref="jump"]');
  assert.equal(await level(), "75 L");
  await page.click('.bt [data-scenario="ease"]');
  await page.click('.bt [data-ref="jump"]');
  assert.match(await note(), /faucet is closing, yet the level keeps rising/);
  // Taking the faucet by hand stops the scripted ramp.
  await slide(page, '.bt [data-flow="inflow"]', 5);
  assert.match(await note(), /level holds still/);
});

test("TiS: feedback loops seek goals, compound and shift dominance", async () => {
  await page.open("tis-feedback");
  const note = () => page.text('.ls [data-ref="note"]');
  assert.match(await note(), /about 5\.2° in the first minute.* within 1° of the room after 52 minutes/);
  await page.click('.ls [data-sys="savings"]');
  assert.match(await note(), /doubles every 14 years .* \$7,040 after 40 years/);
  await page.click('.ls [data-sys="population"]');
  assert.match(await note(), /grows 2% a year/);
  await page.check('.ls [data-param="falling"]');
  assert.match(await note(), /in year 80 it drops below the death rate.* peaks at about 223 million/);
});

test("TiS: delays make the car lot swing; slowing the response calms it", async () => {
  await page.open("tis-delays");
  const tiles = () => page.text(".inv .tiles");
  const note = () => page.text('.inv [data-ref="note"]');
  assert.match(await tiles(), /315 .* 132 .* 183$/i);
  assert.match(await note(), /never settles/);
  await page.click('.inv [data-preset="notice"]');
  assert.match(await note(), /about the same as with Meadows's settings/);
  await page.click('.inv [data-preset="react"]');
  assert.match(await tiles(), /422 .* 121 .* 301$/i);
  assert.match(await note(), /worse than with Meadows's settings/);
  await page.click('.inv [data-preset="slow"]');
  assert.match(await note(), /settles near its new target.* calmer than/);
});

test("TiS: a bigger oil field peaks later, not longer; better gear sinks the fishery", async () => {
  await page.open("tis-limits");
  const tiles = () => page.text('.lim [data-ref="tiles"]');
  const note = () => page.text('.lim [data-ref="note"]');
  assert.match(await tiles(), /^Peak year \| 40 \| of 100 \| Peak output \| 29 .* Boom years \| 29 /i);
  assert.match(await note(), /output grows for 40 years, to 29 million barrels a year.* by year 68/);
  // Each doubling of the field buys about the same 13 years, and the boom doesn't lengthen.
  await page.click('.lim [data-preset="2"]');
  assert.match(await note(), /the peak comes 13 years later than in the original field, and output stays above half its peak for 30 years, against 29/);
  await page.click('.lim [data-preset="4"]');
  assert.match(await note(), /the peak comes 26 years later/);
  await page.click('.lim [data-sys="fish"]');
  assert.match(await tiles(), /^Fish \| 45% .* Boats \| 138 \| Catch \| 124 /i);
  assert.match(await note(), /overshoots to 169 boats.* close to the most the fish can yield for good/);
  await page.click('.lim [data-preset="40"]');
  assert.match(await note(), /swing between 13% and 21% .* averages 71 thousand tonnes a year, below the 125/);
  await page.click('.lim [data-preset="20"]');
  assert.match(await note(), /the fish are all but gone.* Only once the fleet has shrunk to 17 boats/);
  await slide(page, '.lim [data-ref="input"]', 10);
  assert.match(await note(), /haven't come back by year 80/);
  assert.equal(await sort(["stock", "flow", "stock", "flow", "stock", "flow"]), "6 of 6 right");
});

test("TiS: a parts buffer costs in calm years and pays in bad ones", async () => {
  await page.open("tis-resilience");
  const tiles = () => page.text(".bf .tiles");
  const note = () => page.text('.bf [data-ref="note"]');
  // Lean: free in a calm year, dearest on average and in a bad decade.
  assert.match(await tiles(), /\$0 .* \$72,000 .* \$160,000 /i);
  assert.match(await note(), /The cheapest on average is 4 weeks, at \$32,000/);
  await page.click('.bf [data-preset="4"]');
  assert.match(await tiles(), /\$20,000 .* \$32,000 .* \$60,000 /i);
  assert.match(await note(), /This is the cheapest buffer on average/);
  await page.click('.bf [data-preset="8"]');
  assert.match(await note(), /even the longest stoppage is covered/);
  await slide(page, '.bf [data-ref="input"]', 2);
  assert.match(await note(), /^Holding 2 weeks of parts costs \$10,000 .* \$37,000 a year on average.* \$90,000/);
  assert.equal(await sort(["resilience", "self", "hierarchy", "resilience", "self", "hierarchy"]), "6 of 6 right");
});

test("TiS: waiting time outruns a straight line as the desk fills up", async () => {
  await page.open("tis-surprises");
  assert.equal(await page.evaluate(() => document.querySelectorAll(".tc-card").length), 6);
  const note = () => page.text('.qu [data-ref="note"]');
  assert.match(await note(), /At 50% busy, a request takes 6\.0 minutes .* against 6\.0 .* a fair guess/);
  await page.click('.qu [data-preset="18"]');
  assert.match(await page.text(".qu .tiles"), /90% .* 30 .* 8\.7 /i);
  assert.match(await note(), /3\.5 times what the straight line predicts\. One more request an hour would make it 60\./);
  await slide(page, '.qu [data-ref="input"]', 19.5);
  assert.match(await note(), /At 98% busy, a request takes 120 minutes/);
  assert.equal(await sort(["event", "behavior", "structure", "behavior", "structure", "event"]), "6 of 6 right");
});

test("TiS: the open pasture collapses; fencing and a cap restore the feedback", async () => {
  await page.open("tis-traps");
  assert.equal(await page.evaluate(() => document.querySelectorAll(".tc-card").length), 8);
  const tiles = () => page.text(".cm .tiles");
  const note = () => page.text('.cm [data-ref="note"]');
  // Open pasture: every herder adds cows while they pay.
  assert.match(await tiles(), /11% .* 0 .* \$0$/i);
  assert.match(await note(), /peaks at 105 cows in year 15.* earned \$60,000 over 40 years.* each would have earned \$280,000/);
  await page.click('.cm [data-preset="all"]');
  assert.match(await tiles(), /67% .* 50 .* \$35,000$/i);
  // One herder breaks the agreement: they earn more, and the pasture still fails.
  await page.click('.cm [data-preset="one"]');
  assert.match(await note(), /four who held back earned \$150,000 each.* the one herder who didn't earned \$251,000\. Breaking the agreement paid better/);
  // Same herders on fenced plots: only the overgrazer pays.
  await page.click('.cm [data-preset="fence"]');
  assert.match(await note(), /kept their plots at 67% cover and earned \$280,000 each.* down to 11%, and earned \$60,000\. Nobody else paid/);
  assert.match(await page.text(".cm-table tbody tr:last-child"), /^5 Adds while cows pay · plot at 11%\s+0\s+\$60,000$/);
  // A cap works only if it's set from what the grass can feed.
  await page.click('.cm [data-preset="cap"]');
  assert.match(await note(), /That's the most the pasture can feed year after year/);
  await slide(page, '.cm [data-input="cap"]', 55);
  assert.match(await note(), /A cap of 55 cows is more than the grass can feed/);
  assert.equal(await sort(["drift", "escalation", "burden", "success", "escalation", "burden"]), "6 of 6 right");
});

test("TiS: the system sketch checks behavior, stock, loop, delay and leverage", async () => {
  await page.open("tis-living");
  assert.equal(await page.evaluate(() => document.querySelectorAll(".tc-card").length), 15);
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

test("TiS: rank interventions by leverage", async () => {
  await page.open("tis-leverage-points");
  assert.equal(await page.evaluate(() => document.querySelectorAll(".ladder-step").length), 12);
  const order = () => page.evaluate(() => [...document.querySelectorAll(".rk-item .rk-t")].map((e) => e.textContent.slice(0, 12)));
  // Start: goal, fee, paradigm, signs, rules. Check as is, then fix it with the buttons.
  await page.click('.rk [data-ref="check"]');
  assert.match(await page.text(".rk-score"), /^0 of 5/);
  await page.click('[data-move="up"][data-id="fee"]'); // fee, goal, paradigm, signs, rules
  await page.click('[data-move="down"][data-id="goal"]'); // fee, paradigm, goal, signs, rules
  await page.click('[data-move="down"][data-id="goal"]'); // fee, paradigm, signs, goal, rules
  await page.click('[data-move="down"][data-id="goal"]'); // fee, paradigm, signs, rules, goal
  await page.click('[data-move="down"][data-id="paradigm"]'); // fee, signs, paradigm, rules, goal
  await page.click('[data-move="down"][data-id="paradigm"]'); // fee, signs, rules, paradigm, goal
  await page.click('[data-move="down"][data-id="paradigm"]'); // fee, signs, rules, goal, paradigm
  assert.deepEqual(await order(), ["Raise the do", "Show live jo", "Let develope", "Change the t", "Challenge th"]);
  await page.click('.rk [data-ref="check"]');
  assert.match(await page.text(".rk-score"), /^5 of 5 in the right place/);
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

test("PB: the category king takes most of the value", async () => {
  await page.open("pb-category-kings");
  assert.match(await page.text(".vs .tiles"), /76% .*6% .*13×/);
  await page.click('[data-mode="even"]');
  assert.match(await page.text(".vs .tiles"), /20% .*20% .*1×/);
  await page.click('[data-mode="king"]');
  assert.equal(await sort(["small", "big", "small", "big", "small", "small", "big"]), "7 of 7 right");
});

test("PB: the magic triangle names the weak side", async () => {
  await page.open("pb-magic-triangle");
  assert.match(await page.text(".tri-status"), /^Out of balance\. Category is holding/);
  await page.click('[data-preset="2"]');
  assert.match(await page.text(".tri-status"), /^Spinning\./);
});

test("PB: point-of-view checks", async () => {
  await page.open("pb-point-of-view");
  assert.equal(await page.text(".score"), "6 of 6 checks pass");
  await page.click('[data-example="pitch"]');
  assert.equal(await page.text(".verdict"), "Reads like a product pitch");
});

test("PB: lightning strike beats a drip", async () => {
  await page.open("pb-lightning-strike");
  await page.click('[data-preset="drip"]');
  assert.match(await page.text(".sp .tiles"), /0 of 12/);
  await page.click('[data-preset="hijacks"]');
  assert.match(await page.text(".sp .tiles"), /5 of 12/);
});
