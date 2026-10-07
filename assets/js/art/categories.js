// Book-home hero art for Play Bigger: crowded existing categories drawn as faint boxes
// full of small companies, and one new category outlined in pen with a single king.
(function () {
  "use strict";

  // Small seeded generator so the picture is the same on every visit.
  function rng(seed) {
    let s = seed;
    return () => {
      s = (s * 16807) % 2147483647;
      return (s - 1) / 2147483646;
    };
  }

  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

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
    const rand = rng(7);
    // Keep clear of the hero text: draw in the area to its right when there's room,
    // otherwise in the strip above the title.
    const ax = Math.max(w * 0.64, 840);
    const aw = w - ax - 24;
    const wide = aw >= 260;
    const X = wide ? ax : 0;
    const W = wide ? aw : w;
    const H = wide ? h * 0.7 : 120;

    // Old categories: crowded boxes of equal-sized dots. [x, y, width, height] as fractions of the area.
    const boxes = wide
      ? [
          [0.0, 0.1, 0.48, 0.34],
          [0.58, 0.06, 0.42, 0.28],
          [0.62, 0.46, 0.38, 0.4]
        ]
      : [
          [0.04, 0.12, 0.28, 0.6],
          [0.36, 0.1, 0.24, 0.5]
        ];
    boxes.forEach(([bx, by, bw, bh]) => {
      const x = X + bx * W;
      const y = by * H;
      const ww = bw * W;
      const hh = bh * H;
      ctx.strokeStyle = strong;
      ctx.lineWidth = 1;
      roundRect(ctx, x, y, ww, hh, 8);
      ctx.stroke();
      ctx.fillStyle = line;
      const count = Math.round((ww * hh) / 700);
      for (let i = 0; i < count; i++) {
        ctx.beginPath();
        ctx.arc(x + 8 + rand() * (ww - 16), y + 8 + rand() * (hh - 16), 2.2, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    // The new category: a dashed box in pen, one large dot and a few small ones.
    const nx = wide ? X + 0.04 * W : 0.66 * w;
    const ny = wide ? 0.54 * H : 0.1 * H;
    const nw = wide ? 0.48 * W : 0.3 * w;
    const nh = wide ? 0.36 * H : 0.6 * H;
    ctx.setLineDash([5, 5]);
    ctx.strokeStyle = pen;
    ctx.lineWidth = 1.25;
    roundRect(ctx, nx, ny, nw, nh, 10);
    ctx.stroke();
    ctx.setLineDash([]);
    const kx = nx + nw * 0.45;
    const ky = ny + nh * 0.5;
    const kr = Math.min(nw, nh) * 0.22;
    ctx.fillStyle = pen;
    ctx.beginPath();
    ctx.arc(kx, ky, kr, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 0.6;
    [[0.8, 0.25], [0.82, 0.78], [0.18, 0.8]].forEach(([fx, fy]) => {
      ctx.beginPath();
      ctx.arc(nx + nw * fx, ny + nh * fy, 2.6, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;

    ctx.fillStyle = dim;
    ctx.font = `11px ${mono}`;
    ctx.textBaseline = "top";
    ctx.textAlign = "left";
    ctx.fillText("NEW CATEGORY", nx, ny + nh + 10);
  }

  window.Marginalia.art.categories = { draw };
})();
