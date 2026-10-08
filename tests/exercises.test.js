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
