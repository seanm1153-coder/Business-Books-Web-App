// Book-home hero art for Understanding Michael Porter: the five forces, with rivalry
// among existing competitors in the middle (drawn in pen) and the other four pressing in.
(function () {
  "use strict";

  function draw(canvas) {
    if (!canvas) return;
    const area = window.Marginalia.util.heroArea(canvas, { minWide: 380, strip: 108, maxStrip: 460 });
    const { w, h, wide, X, W } = area;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    const ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    const css = getComputedStyle(document.documentElement);
    const strong = css.getPropertyValue("--night-line-strong").trim();
    const pen = css.getPropertyValue("--pen-bright").trim();
    const glow = css.getPropertyValue("--pen-glow").trim();
    const dim = css.getPropertyValue("--night-dim").trim();
    const mono = css.getPropertyValue("--mono").trim() || "monospace";

    const Y = wide ? h * 0.1 : area.Y;
    const H = wide ? Math.min(h * 0.6, W * 0.85) : area.H;
    const cx = X + W / 2;
    const cy = Y + H / 2;
    const size = wide ? 11 : 9.5;
    ctx.font = `${size}px ${mono}`;
    const bh = wide ? 34 : 22;
    const pad = wide ? 14 : 8;
    const boxW = (label) => ctx.measureText(label).width + pad * 2;

    const labels = {
      entry: wide ? "THREAT OF NEW ENTRANTS" : "NEW ENTRANTS",
      suppliers: wide ? "SUPPLIER POWER" : "SUPPLIERS",
      rivalry: "RIVALRY",
      buyers: wide ? "BUYER POWER" : "BUYERS",
      substitutes: wide ? "THREAT OF SUBSTITUTES" : "SUBSTITUTES"
    };
    const box = (key, x, y) => ({ key, label: labels[key], w: boxW(labels[key]), h: bh, x, y });
    const centre = box("rivalry", cx, cy);
    const sides = [
      box("entry", cx, Y + bh / 2),
      box("substitutes", cx, Y + H - bh / 2),
      box("suppliers", X + boxW(labels.suppliers) / 2, cy),
      box("buyers", X + W - boxW(labels.buyers) / 2, cy)
    ];

    // Arrows from each outer box to the edge of the centre box.
    ctx.strokeStyle = strong;
    ctx.fillStyle = strong;
    ctx.lineWidth = 1.25;
    sides.forEach((b) => {
      const vertical = b.x === cx;
      const dir = vertical ? Math.sign(cy - b.y) : Math.sign(cx - b.x);
      const x1 = vertical ? cx : b.x + (dir * b.w) / 2;
      const y1 = vertical ? b.y + (dir * b.h) / 2 : cy;
      const x2 = vertical ? cx : cx - (dir * centre.w) / 2 - dir * 4;
      const y2 = vertical ? cy - (dir * centre.h) / 2 - dir * 4 : cy;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      const a = 5;
      ctx.beginPath();
      if (vertical) {
        ctx.moveTo(x2, y2);
        ctx.lineTo(x2 - a, y2 - dir * a * 1.4);
        ctx.lineTo(x2 + a, y2 - dir * a * 1.4);
      } else {
        ctx.moveTo(x2, y2);
        ctx.lineTo(x2 - dir * a * 1.4, y2 - a);
        ctx.lineTo(x2 - dir * a * 1.4, y2 + a);
      }
      ctx.closePath();
      ctx.fill();
    });

    const drawBox = (b, lead) => {
      ctx.lineWidth = lead ? 1.75 : 1.25;
      ctx.strokeStyle = lead ? pen : strong;
      if (lead) {
        ctx.fillStyle = glow;
        ctx.fillRect(b.x - b.w / 2, b.y - b.h / 2, b.w, b.h);
      }
      ctx.strokeRect(b.x - b.w / 2, b.y - b.h / 2, b.w, b.h);
      ctx.fillStyle = lead ? pen : dim;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(b.label, b.x, b.y + 0.5);
    };
    sides.forEach((b) => drawBox(b, false));
    drawBox(centre, true);
  }

  window.Marginalia.art.forces = { draw };
})();
