// Book-home hero art for Thinking in Systems: the five classic behavior-over-time shapes
// on one pair of axes (exponential growth, goal-seeking, S-shaped growth, overshoot and
// collapse, oscillation), with oscillation drawn in pen.
(function () {
  "use strict";

  // Each curve maps time 0..1 to a stock level 0..1.
  const CURVES = [
    { id: "exponential", f: (x) => 0.04 * Math.exp(3.1 * x) },
    { id: "goal", f: (x) => 0.62 * (1 - Math.exp(-4.5 * x)) },
    { id: "s-shaped", f: (x) => 0.88 / (1 + Math.exp(-11 * (x - 0.45))) },
    // A smooth rise to a peak at x = 0.5, then a fall: u⁴·e^(4(1 − u)) peaks at u = 1.
    { id: "collapse", f: (x) => 0.05 + 0.82 * Math.pow(x / 0.5, 4) * Math.exp(4 * (1 - x / 0.5)) },
    { id: "oscillation", f: (x) => 0.42 + 0.3 * Math.exp(-2.4 * x) * Math.sin(13 * x - 1.2), label: "OSCILLATION" }
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

    // Keep clear of the hero text: the area to its right when there's room,
    // otherwise a strip above the title.
    const ax = Math.max(w * 0.64, 860);
    const wide = w - ax - 40 >= 260;
    const X = wide ? ax : 24;
    const Y = wide ? h * 0.12 : 18;
    const W = wide ? w - ax - 40 : w - 48;
    const H = wide ? h * 0.52 : 104;

    // Axes: stock up the side, time along the bottom.
    ctx.strokeStyle = strong;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(X, Y);
    ctx.lineTo(X, Y + H);
    ctx.lineTo(X + W, Y + H);
    ctx.stroke();
    ctx.fillStyle = dim;
    ctx.font = `11px ${mono}`;
    ctx.textBaseline = "top";
    ctx.textAlign = "right";
    ctx.fillText("TIME", X + W, Y + H + 8);
    if (wide) {
      ctx.save();
      ctx.translate(X - 10, Y);
      ctx.rotate(-Math.PI / 2);
      ctx.textAlign = "right";
      ctx.textBaseline = "bottom";
      ctx.fillText("STOCK", 0, 0);
      ctx.restore();
    }

    const steps = Math.max(60, Math.round(W / 3));
    const point = (c, i) => {
      const x = i / steps;
      const y = Math.max(0, Math.min(1, c.f(x)));
      return [X + x * W, Y + H - y * H];
    };
    CURVES.forEach((c) => {
      const lead = Boolean(c.label);
      ctx.strokeStyle = lead ? pen : line;
      ctx.lineWidth = lead ? 2 : 1.25;
      ctx.beginPath();
      for (let i = 0; i <= steps; i++) {
        const [px, py] = point(c, i);
        if (i) ctx.lineTo(px, py);
        else ctx.moveTo(px, py);
      }
      ctx.stroke();
      if (lead) {
        const [ex, ey] = point(c, steps);
        ctx.fillStyle = pen;
        ctx.beginPath();
        ctx.arc(ex, ey, 3.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = dim;
        ctx.textAlign = "right";
        ctx.textBaseline = "bottom";
        ctx.fillText(c.label, ex - 8, ey - 8);
      }
    });
  }

  window.Marginalia.art.behavior = { draw };
})();
