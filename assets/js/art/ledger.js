// Book-home hero art for Financial Intelligence: ledger paper with a short worked
// statement in which profit is up and operating cash is not, the gap circled in pen.
(function () {
  "use strict";

  const LINES = [
    ["Revenue", "30,000"],
    ["Cost of goods sold", "(18,000)"],
    ["Net income", "12,000", "rule"],
    null,
    ["Net income", "12,000"],
    ["Change in receivables", "(30,000)"],
    ["Change in inventory", "18,000"],
    ["Cash from operations", "–", "total"]
  ];

  function draw(canvas) {
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
    const line = css.getPropertyValue("--night-line").trim();
    const strong = css.getPropertyValue("--night-line-strong").trim();
    const pen = css.getPropertyValue("--pen-bright").trim();
    const dim = css.getPropertyValue("--night-dim").trim();
    const mono = css.getPropertyValue("--mono").trim() || "monospace";

    const wide = w >= 760;
    const row = 30;
    const top = wide ? 44 : 26;

    // Ruled lines across the whole hero.
    ctx.strokeStyle = line;
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let y = top; y < h; y += row) {
      ctx.moveTo(0, y + 0.5);
      ctx.lineTo(w, y + 0.5);
    }
    ctx.stroke();

    // Double column rule, as on ledger paper.
    const colX = Math.round(wide ? w * 0.63 : w - 150);
    ctx.strokeStyle = strong;
    ctx.beginPath();
    ctx.moveTo(colX + 0.5, 0);
    ctx.lineTo(colX + 0.5, h);
    ctx.moveTo(colX + 3.5, 0);
    ctx.lineTo(colX + 3.5, h);
    ctx.stroke();

    if (!wide) {
      ringAndLabel(ctx, w - 44, top + row * 1.5, pen, dim, mono, w);
      return;
    }

    // A short worked statement written into the ledger.
    const right = Math.min(w - 32, colX + 380);
    ctx.font = `12px ${mono}`;
    ctx.textBaseline = "alphabetic";
    let cash = null;
    LINES.forEach((ln, i) => {
      const y = top + row * (i + 2) - 9;
      if (!ln) return;
      const [label, value, style] = ln;
      ctx.fillStyle = dim;
      ctx.globalAlpha = 0.75;
      ctx.textAlign = "left";
      ctx.fillText(label, colX + 18, y);
      ctx.textAlign = "right";
      ctx.fillText(value, right, y);
      ctx.globalAlpha = 1;
      const vw = 64;
      ctx.strokeStyle = strong;
      if (style === "rule") {
        ctx.beginPath();
        ctx.moveTo(right - vw, y - 16.5);
        ctx.lineTo(right, y - 16.5);
        ctx.stroke();
      }
      if (style === "total") {
        ctx.beginPath();
        ctx.moveTo(right - vw, y + 5.5);
        ctx.lineTo(right, y + 5.5);
        ctx.moveTo(right - vw, y + 8.5);
        ctx.lineTo(right, y + 8.5);
        ctx.stroke();
        cash = { x: right - 4, y: y - 4 };
      }
    });
    if (cash) ringAndLabel(ctx, cash.x, cash.y, pen, dim, mono, w, true);
  }

  function ringAndLabel(ctx, x, y, pen, dim, mono, w, below) {
    ctx.strokeStyle = pen;
    ctx.lineWidth = 1.25;
    ctx.beginPath();
    ctx.ellipse(x, y, 18, 13, -0.15, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = dim;
    ctx.font = `11px ${mono}`;
    ctx.textAlign = "right";
    const label = "PROFIT ≠ CASH";
    if (below) {
      ctx.beginPath();
      ctx.moveTo(x - 4, y + 14);
      ctx.lineTo(x - 4, y + 40);
      ctx.stroke();
      ctx.fillText(label, x + 2, y + 56);
    } else {
      ctx.beginPath();
      ctx.moveTo(x - 19, y);
      ctx.lineTo(x - 40, y);
      ctx.stroke();
      ctx.textBaseline = "middle";
      ctx.fillText(label, x - 46, y);
    }
  }

  window.Marginalia.art.ledger = { draw };
})();
