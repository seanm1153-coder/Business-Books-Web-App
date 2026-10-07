// Book-home hero art: topographic contour lines with the highest hill marked as the pivot point.
(function () {
  "use strict";

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

  window.Marginalia.art.contours = { draw: drawContours };
})();
