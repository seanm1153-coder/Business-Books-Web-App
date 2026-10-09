// Behavior: small multiples of behavior-over-time graphs, the line charts Meadows draws
// throughout her book. Each chart plots one or more series against time, drawn in a frame
// matched to its width so labels stay legible. Charts with `hover` get a crosshair that
// reads every series at the nearest point; the rest are shapes to be read at a glance.
// Block: { title, intro?, cols?, h? (chart height, default 168), caption?, charts: [{ t, d?, alt?, hover?, x: [min, max],
//   y: [min, max], xLabel?, yLabel?, yTicks?: [..], unit? (for the tooltip), refs?: [{ y, label }],
//   series: [{ name?, points: [[x, y], ..], tone?: "cash" | "ink", dash? }] }] }.
(function () {
  "use strict";
  const { esc, figHead, resolveLinks } = window.Marginalia.util;

  // The frame widens with fewer columns, so text draws at much the same size everywhere.
  const WIDTH = { 1: 860, 2: 440, 3: 300, 4: 240 };
  const M = { l: 34, r: 10, t: 18, b: 24 };

  const fmt = (v, unit) => `${Math.abs(v) >= 100 ? Math.round(v).toLocaleString("en-US") : Math.round(v * 10) / 10}${unit || ""}`;

  function chartSVG(c, W, H) {
    const sx = (x) => M.l + ((x - c.x[0]) / (c.x[1] - c.x[0])) * (W - M.l - M.r);
    const sy = (y) => H - M.b - ((y - c.y[0]) / (c.y[1] - c.y[0])) * (H - M.t - M.b);
    const path = (pts) => pts.map(([x, y], i) => `${i ? "L" : "M"}${sx(x).toFixed(1)} ${sy(Math.max(c.y[0], Math.min(c.y[1], y))).toFixed(1)}`).join(" ");
    const ticks = (c.yTicks || [])
      .map((v) => `<path class="sv-grid" d="M${M.l} ${sy(v).toFixed(1)} H${W - M.r}"/><text class="bh-tick" x="${M.l - 5}" y="${(sy(v) + 3.5).toFixed(1)}" text-anchor="end">${esc(fmt(v))}</text>`)
      .join("");
    const refs = (c.refs || [])
      .map((r) => `<path class="sv-line sv-dash" d="M${M.l} ${sy(r.y).toFixed(1)} H${W - M.r}"/>${r.label ? `<text class="bh-tick" x="${W - M.r}" y="${(sy(r.y) - 4).toFixed(1)}" text-anchor="end">${esc(r.label)}</text>` : ""}`)
      .join("");
    const lines = c.series
      .map((s) => `<path class="bh-line is-${s.tone || "pen"}${s.dash ? " sv-dash" : ""}" d="${path(s.points)}"/>`)
      .join("");
    return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
      ${ticks}${refs}
      <path class="sv-axis" d="M${M.l} ${M.t - 4} V${H - M.b} H${W - M.r}"/>
      ${c.yLabel ? `<text class="bh-tick" x="${M.l + 5}" y="${M.t - 2}">${esc(c.yLabel)}</text>` : ""}
      <text class="bh-tick" x="${W - M.r}" y="${H - 7}" text-anchor="end">${esc(c.xLabel || "Time")} →</text>
      ${lines}
      ${c.hover ? `<path class="bh-cross" d="" /><g class="bh-dots"></g>` : ""}
    </svg>`;
  }

  window.Marginalia.blocks.behavior = {
    render(block, ctx) {
      const W = WIDTH[Number(block.cols) || 3] || 300;
      const H = block.h || 168;
      const charts = block.charts
        .map((c, i) => {
          const legend =
            c.series.length > 1
              ? `<p class="bh-key">${c.series.map((s) => `<span><i class="bh-swatch is-${s.tone || "pen"}${s.dash ? " is-dash" : ""}"></i>${esc(s.name)}</span>`).join("")}</p>`
              : "";
          return `<figure class="bh-chart" data-i="${i}">
            <figcaption class="bh-t">${esc(c.t)}</figcaption>
            ${legend}
            <div class="bh-plot" role="img" aria-label="${esc(c.alt || `${c.t}. ${c.d || ""}`)}">
              <div aria-hidden="true">${chartSVG(c, W, H)}</div>
              ${c.hover ? '<div class="bh-tip" hidden></div>' : ""}
            </div>
            ${c.d ? `<p class="bh-d">${resolveLinks(c.d, ctx)}</p>` : ""}
          </figure>`;
        })
        .join("");
      return `<section class="bh" aria-labelledby="${ctx.uid}-h">
        ${figHead(block, ctx)}
        <div class="bh-grid" style="--cols: ${Number(block.cols) || 3}">${charts}</div>
        ${block.caption ? `<p class="fig-foot">${resolveLinks(block.caption, ctx)}</p>` : ""}
      </section>`;
    },

    mount(root, block) {
      const figs = Array.from(root.querySelectorAll(".bh-chart"));
      const base = WIDTH[Number(block.cols) || 3] || 300;
      const H = block.h || 168;
      // Redraw each chart in a frame matched to its rendered width, so its labels stay a
      // readable size from a phone to a wide screen.
      function draw() {
        figs.forEach((fig) => {
          const host = fig.querySelector(".bh-plot > div");
          const px = host.clientWidth;
          if (!px) return;
          const W = Math.round(Math.max(220, Math.min(900, px / 1.1)));
          if (fig.bhW === W) return;
          fig.bhW = W;
          host.innerHTML = chartSVG(block.charts[Number(fig.dataset.i)], W, H);
        });
      }
      figs.forEach((fig) => {
        const c = block.charts[Number(fig.dataset.i)];
        if (!c.hover) return;
        const plot = fig.querySelector(".bh-plot");
        const tip = fig.querySelector(".bh-tip");
        const xs = c.series[0].points.map((p) => p[0]);
        function show(e) {
          const W = fig.bhW || base;
          const svg = plot.querySelector("svg");
          const sx = (x) => M.l + ((x - c.x[0]) / (c.x[1] - c.x[0])) * (W - M.l - M.r);
          const sy = (y) => H - M.b - ((y - c.y[0]) / (c.y[1] - c.y[0])) * (H - M.t - M.b);
          const box = svg.getBoundingClientRect();
          const ux = ((e.clientX - box.left) / box.width) * W;
          if (ux < M.l || ux > W - M.r) return hide();
          let i = 0;
          xs.forEach((x, j) => {
            if (Math.abs(sx(x) - ux) < Math.abs(sx(xs[i]) - ux)) i = j;
          });
          const x = xs[i];
          plot.querySelector(".bh-cross").setAttribute("d", `M${sx(x).toFixed(1)} ${M.t - 4} V${H - M.b}`);
          plot.querySelector(".bh-dots").innerHTML = c.series
            .map((s) => `<circle class="bh-dot is-${s.tone || "pen"}" cx="${sx(x).toFixed(1)}" cy="${sy(s.points[i][1]).toFixed(1)}" r="3.5"/>`)
            .join("");
          tip.textContent = "";
          const head = document.createElement("p");
          head.className = "bh-tip-x";
          head.textContent = `${c.xLabel || "Time"} ${fmt(x)}`;
          tip.appendChild(head);
          c.series.forEach((s) => {
            const row = document.createElement("p");
            const v = document.createElement("strong");
            v.textContent = fmt(s.points[i][1], c.unit);
            row.append(v, ` ${s.name || ""}`);
            tip.appendChild(row);
          });
          tip.hidden = false;
          const left = (sx(x) / W) * box.width;
          tip.style.left = `${Math.min(Math.max(0, left + 10), box.width - tip.offsetWidth)}px`;
        }
        function hide() {
          const cross = plot.querySelector(".bh-cross");
          if (cross) cross.setAttribute("d", "");
          const dots = plot.querySelector(".bh-dots");
          if (dots) dots.innerHTML = "";
          tip.hidden = true;
        }
        plot.addEventListener("pointermove", show);
        plot.addEventListener("pointerdown", show);
        plot.addEventListener("pointerleave", hide);
      });
      draw();
      window.addEventListener("resize", draw);
      return () => window.removeEventListener("resize", draw);
    }
  };
})();
