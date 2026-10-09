// Diagram: nodes and links drawn from data, for activity-system maps and causal loop
// diagrams. Nodes are placed by hand in a viewBox; links run between node edges, optionally
// curved, directed, signed (+ or −) or dashed. Labels break on "\n".
// Block: { title, intro?, alt, w, h, nodes: [{ id, label, x, y, kind?, w? }],
//   links: [[a, b] | { from, to, arrow?, sign?, bend?, dash? }], marks?: [{ x, y, t }],
//   list?: { kind, k } — on phones, replace the drawing with a list of each node of that
//   kind and what it links to (for maps too dense to shrink), notes?, caption?,
//   full? — the drawing takes the full width, with the notes in a row beneath it }.
// Kinds: "theme" (an ink pill), "act" (a box, the default), "stock" (a pen box), "var"
// (bare text, for causal loops).
(function () {
  "use strict";
  const { esc, figHead, pad2, resolveLinks } = window.Marginalia.util;

  const FS = { theme: 12.5, act: 12, stock: 12.5, var: 12.5 };

  function measure(n) {
    const kind = n.kind || "act";
    const lines = n.label.split("\n");
    const fs = FS[kind];
    const w = n.w || Math.round(Math.max(...lines.map((l) => l.length)) * fs * 0.56 + (kind === "var" ? 6 : 24));
    const h = Math.round(lines.length * fs * 1.25 + (kind === "var" ? 4 : 14));
    return { ...n, kind, lines, fs, w, h };
  }

  // Where the line from a node's centre towards (tx, ty) leaves its box.
  function edge(n, tx, ty) {
    const dx = tx - n.x;
    const dy = ty - n.y;
    if (!dx && !dy) return [n.x, n.y];
    const t = Math.min(dx ? n.w / 2 / Math.abs(dx) : Infinity, dy ? n.h / 2 / Math.abs(dy) : Infinity);
    return [n.x + dx * t, n.y + dy * t];
  }

  function linkSVG(l, byId, uid) {
    const L = Array.isArray(l) ? { from: l[0], to: l[1] } : l;
    const a = byId[L.from];
    const b = byId[L.to];
    const mx = (a.x + b.x) / 2;
    const my = (a.y + b.y) / 2;
    const len = Math.hypot(b.x - a.x, b.y - a.y) || 1;
    // Control point for a curve: off the midpoint, at right angles to the straight line.
    const cx = mx - ((b.y - a.y) / len) * (L.bend || 0);
    const cy = my + ((b.x - a.x) / len) * (L.bend || 0);
    const [x1, y1] = edge(a, L.bend ? cx : b.x, L.bend ? cy : b.y);
    let [x2, y2] = edge(b, L.bend ? cx : a.x, L.bend ? cy : a.y);
    if (L.arrow || L.sign) {
      // Stop short so the arrowhead sits just outside the box.
      const ex = x2 - (L.bend ? cx : x1);
      const ey = y2 - (L.bend ? cy : y1);
      const el = Math.hypot(ex, ey) || 1;
      x2 -= (ex / el) * 3;
      y2 -= (ey / el) * 3;
    }
    const d = L.bend ? `M${x1.toFixed(1)} ${y1.toFixed(1)} Q${cx.toFixed(1)} ${cy.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}` : `M${x1.toFixed(1)} ${y1.toFixed(1)} L${x2.toFixed(1)} ${y2.toFixed(1)}`;
    let sign = "";
    if (L.sign) {
      // Near the head, set off to one side of the line.
      const t = 0.8;
      const px = L.bend ? (1 - t) ** 2 * x1 + 2 * (1 - t) * t * cx + t * t * x2 : x1 + (x2 - x1) * t;
      const py = L.bend ? (1 - t) ** 2 * y1 + 2 * (1 - t) * t * cy + t * t * y2 : y1 + (y2 - y1) * t;
      const nx = -(y2 - y1) / (Math.hypot(x2 - x1, y2 - y1) || 1);
      const ny = (x2 - x1) / (Math.hypot(x2 - x1, y2 - y1) || 1);
      const off = L.signSide === "left" ? -11 : 11;
      sign = `<text class="dg-sign" x="${(px + nx * off).toFixed(1)}" y="${(py + ny * off + 4.5).toFixed(1)}" text-anchor="middle">${L.sign === "-" ? "−" : "+"}</text>`;
    }
    return `<path class="dg-link${L.dash ? " sv-dash" : ""}${L.arrow || L.sign ? " is-directed" : ""}" d="${d}"${L.arrow || L.sign ? ` marker-end="url(#${uid}-arr)"` : ""}/>${sign}`;
  }

  function nodeSVG(n) {
    const x = n.x - n.w / 2;
    const y = n.y - n.h / 2;
    const box =
      n.kind === "var"
        ? ""
        : `<rect class="dg-node is-${n.kind}" x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${n.w}" height="${n.h}" rx="${n.kind === "theme" ? Math.min(n.h / 2, 16) : 4}"/>`;
    const top = n.y - ((n.lines.length - 1) * n.fs * 1.25) / 2 + n.fs * 0.36;
    const text = n.lines
      .map((l, i) => `<tspan x="${n.x}" y="${(top + i * n.fs * 1.25).toFixed(1)}">${esc(l)}</tspan>`)
      .join("");
    return `${box}<text class="dg-label is-${n.kind}" text-anchor="middle">${text}</text>`;
  }

  window.Marginalia.blocks.diagram = {
    render(block, ctx) {
      const nodes = block.nodes.map(measure);
      const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));
      const uid = `${ctx.uid}-dg`;
      const svg = `<svg viewBox="0 0 ${block.w} ${block.h}" xmlns="http://www.w3.org/2000/svg">
        <defs><marker id="${uid}-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path class="sv-head" d="M0 0 L10 5 L0 10 z"/></marker></defs>
        ${block.links.map((l) => linkSVG(l, byId, uid)).join("")}
        ${nodes.map(nodeSVG).join("")}
        ${(block.marks || []).map((m) => `<g class="sv-call"><circle cx="${m.x}" cy="${m.y}" r="10"/><text x="${m.x}" y="${m.y + 3.8}" text-anchor="middle">${esc(m.t)}</text></g>`).join("")}
      </svg>`;
      let list = "";
      if (block.list) {
        const plain = (n) => n.label.replace(/\n/g, " ");
        const linked = (id) =>
          block.links
            .map((l) => (Array.isArray(l) ? l : [l.from, l.to]))
            .filter((p) => p.includes(id))
            .map((p) => byId[p[0] === id ? p[1] : p[0]]);
        list = `<ul class="dg-list" role="list">${nodes
          .filter((n) => n.kind === block.list.kind)
          .map(
            (n) => `<li><p class="dg-list-t">${esc(plain(n))}</p><p class="dg-list-d"><span class="dg-list-k">${esc(block.list.k)}</span> ${linked(n.id).map((m) => esc(plain(m))).join(" · ")}</p></li>`
          )
          .join("")}</ul>`;
      }
      const notes = block.notes || [];
      return `<section class="dg" aria-labelledby="${ctx.uid}-h">
        ${figHead(block, ctx)}
        <div class="fg-body${notes.length ? " has-notes" : ""}${block.full ? " is-full" : ""}">
          <figure class="fg-fig${block.list ? " has-list" : ""}">
            <div class="dg-art" role="img" aria-label="${esc(block.alt)}"><div aria-hidden="true">${svg}</div></div>
            ${list}
            ${block.caption ? `<figcaption class="fig-foot">${resolveLinks(block.caption, ctx)}</figcaption>` : ""}
          </figure>
          ${
            notes.length
              ? `<ol class="fg-notes" role="list">${notes
                  .map(
                    (n, i) => `<li class="fg-note">
                      <span class="brief-n tnum" aria-hidden="true">${pad2(i + 1)}</span>
                      <p class="brief-d"><strong class="brief-t">${esc(n.t)}</strong> ${resolveLinks(n.d, ctx)}</p>
                    </li>`
                  )
                  .join("")}</ol>`
              : ""
          }
        </div>
      </section>`;
    }
  };
})();
