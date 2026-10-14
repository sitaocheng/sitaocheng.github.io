/* DERL project page: analysis charts as inline SVG.
   All values are from the paper (Table 5, Table 4 test column, Figure 4 and Figure 6 data).
   Colors come from CSS custom properties on .chart (light and dark mode). */
(function () {
  'use strict';
  var NS = 'http://www.w3.org/2000/svg';

  function el(tag, attrs, parent) {
    var e = document.createElementNS(NS, tag);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }
  function text(parent, x, y, s, cls, anchor) {
    var t = el('text', { x: x, y: y, 'class': cls || '', 'text-anchor': anchor || 'start' }, parent);
    t.textContent = s;
    return t;
  }
  function marker(g, shape, x, y, r, color, cls) {
    var st = 'fill:' + color + ';stroke:var(--paper);stroke-width:2';
    if (shape === 'square') return el('rect', { x: x - r, y: y - r, width: 2 * r, height: 2 * r, rx: 1.5, style: st, 'class': cls || '' }, g);
    if (shape === 'triangle') {
      var h = r * 1.15;
      return el('path', { d: 'M' + x + ' ' + (y - h - 1) + 'L' + (x + h + 0.5) + ' ' + (y + h * 0.75) + 'L' + (x - h - 0.5) + ' ' + (y + h * 0.75) + 'Z', style: st, 'class': cls || '' }, g);
    }
    return el('circle', { cx: x, cy: y, r: r, style: st, 'class': cls || '' }, g);
  }
  function fit(vals) {
    var n = vals.length, sx = 0, sy = 0, sxx = 0, sxy = 0;
    for (var i = 0; i < n; i++) { sx += i; sy += vals[i]; sxx += i * i; sxy += i * vals[i]; }
    var k = (n * sxy - sx * sy) / (n * sxx - sx * sx);
    return { k: k, c: (sy - k * sx) / n };
  }
  function tooltip(host) {
    var tip = host.querySelector('.ch-tip');
    if (!tip) { tip = document.createElement('div'); tip.className = 'ch-tip'; tip.hidden = true; host.appendChild(tip); }
    return tip;
  }
  function fillTip(tip, head, rows) {
    while (tip.firstChild) tip.removeChild(tip.firstChild);
    var h = document.createElement('div'); h.className = 'ch-tip-h'; h.textContent = head; tip.appendChild(h);
    rows.forEach(function (r) {
      var row = document.createElement('div'); row.className = 'ch-tip-r';
      var key = document.createElement('i'); key.style.background = r.color; row.appendChild(key);
      var v = document.createElement('b'); v.textContent = r.value; row.appendChild(v);
      var n = document.createElement('span'); n.textContent = r.name; row.appendChild(n);
      tip.appendChild(row);
    });
  }
  function placeTip(host, tip, x, y) {
    tip.hidden = false;
    var w = tip.offsetWidth, hw = host.clientWidth;
    var left = x + 14; if (left + w > hw - 4) left = x - w - 14; if (left < 4) left = 4;
    tip.style.left = left + 'px';
    tip.style.top = Math.max(4, y - tip.offsetHeight / 2) + 'px';
  }

  /* ---------- line chart ---------- */
  function lineChart(host, cfg) {
    var svgOld = host.querySelector('svg'); if (svgOld) host.removeChild(svgOld);
    var W = host.clientWidth, H = cfg.height, n = cfg.xs.length;
    var narrow = W < 460;
    var m = { l: 40, r: cfg.endLabels ? (narrow ? 70 : 96) : 12, t: cfg.ylabel ? 24 : 10, b: 38 };
    var pw = W - m.l - m.r, ph = H - m.t - m.b;
    var sx = function (i) { return m.l + 8 + i * (pw - 16) / (n - 1); };
    var sy = function (v) { return m.t + (cfg.y.max - v) / (cfg.y.max - cfg.y.min) * ph; };
    var svg = el('svg', { width: W, height: H, viewBox: '0 0 ' + W + ' ' + H, 'aria-hidden': 'true' });
    host.insertBefore(svg, host.firstChild);
    var g = el('g', {}, svg);
    if (cfg.ylabel) text(g, m.l - 30, 13, cfg.ylabel, 'ch-lab');
    cfg.y.ticks.forEach(function (t) {
      el('line', { x1: m.l, x2: W - m.r, y1: sy(t), y2: sy(t), 'class': 'ch-grid' }, g);
      text(g, m.l - 8, sy(t) + 4, String(t), 'ch-tick', 'end');
    });
    el('line', { x1: m.l, x2: W - m.r, y1: m.t + ph, y2: m.t + ph, 'class': 'ch-axis' }, g);
    var every = n > 10 ? (narrow ? 5 : 3) : 1;
    cfg.xs.forEach(function (x, i) { if (i % every === 0 || i === n - 1 && every === 1) text(g, sx(i), m.t + ph + 16, String(x), 'ch-tick', 'middle'); });
    text(g, m.l + pw / 2, H - 4, cfg.xlabel, 'ch-lab', 'middle');
    // trends first (behind)
    cfg.series.forEach(function (s) {
      if (!cfg.trend) return;
      var f = fit(s.vals);
      el('line', { x1: sx(0), x2: sx(n - 1), y1: sy(f.c), y2: sy(f.c + f.k * (n - 1)), style: 'stroke:' + s.color, 'class': 'ch-trend' }, g);
    });
    // series, de-emphasized first
    var order = cfg.series.slice().sort(function (a, b) { return (a.emph ? 1 : 0) - (b.emph ? 1 : 0); });
    order.forEach(function (s) {
      var d = '', pen = false;
      s.vals.forEach(function (v, i) {
        if (v < cfg.y.min) { pen = false; return; }
        d += (pen ? 'L' : 'M') + sx(i).toFixed(1) + ' ' + sy(v).toFixed(1); pen = true;
      });
      el('path', { d: d, style: 'stroke:' + s.color + ';stroke-width:' + (s.width || 2) + (s.dash ? ';stroke-dasharray:' + s.dash : ''), 'class': 'ch-line' }, g);
      s.vals.forEach(function (v, i) {
        if (v < cfg.y.min) {
          var x = sx(i), yb = m.t + ph;
          el('path', { d: 'M' + x + ' ' + (yb - 20) + 'L' + x + ' ' + (yb - 7), 'class': 'ch-off' }, g);
          el('path', { d: 'M' + (x - 4) + ' ' + (yb - 10) + 'L' + x + ' ' + (yb - 4) + 'L' + (x + 4) + ' ' + (yb - 10), 'class': 'ch-off' }, g);
          text(g, x, yb - 25, cfg.fmt(v), 'ch-note', 'middle');
          return;
        }
        marker(g, s.marker, sx(i), sy(v), s.emph ? 4.5 : 3.5, s.color);
      });
    });
    if (cfg.endLabels) {
      var labs = cfg.series.map(function (s) { var v = s.vals[n - 1]; return { s: s, y: sy(Math.max(v, cfg.y.min)) }; })
        .sort(function (a, b) { return a.y - b.y; });
      for (var i = 1; i < labs.length; i++) if (labs[i].y - labs[i - 1].y < 15) labs[i].y = labs[i - 1].y + 15;
      labs.forEach(function (L) {
        var t = text(g, sx(n - 1) + 10, L.y + 4, narrow && L.s.short ? L.s.short : L.s.name, L.s.emph ? 'ch-end ch-end-em' : 'ch-end');
      });
    }
    // hover layer
    var cross = el('line', { x1: 0, x2: 0, y1: m.t, y2: m.t + ph, 'class': 'ch-cross', visibility: 'hidden' }, g);
    var hot = el('g', {}, g);
    var hit = el('rect', { x: m.l, y: m.t, width: pw, height: ph, fill: 'transparent' }, svg);
    var tip = tooltip(host), cur = n - 1;
    function show(i, px, py) {
      cur = i; var x = sx(i);
      cross.setAttribute('x1', x); cross.setAttribute('x2', x); cross.setAttribute('visibility', 'visible');
      while (hot.firstChild) hot.removeChild(hot.firstChild);
      cfg.series.forEach(function (s) { var v = s.vals[i]; if (v >= cfg.y.min) marker(hot, s.marker, x, sy(v), 6, s.color); });
      fillTip(tip, cfg.xname + ' ' + cfg.xs[i], cfg.series.map(function (s) { return { color: s.color, value: cfg.fmt(s.vals[i]), name: s.name }; })
        .sort(function (a, b) { return parseFloat(b.value) - parseFloat(a.value); }));
      placeTip(host, tip, px === undefined ? x : px, py === undefined ? m.t + ph / 2 : py);
    }
    function hide() { cross.setAttribute('visibility', 'hidden'); while (hot.firstChild) hot.removeChild(hot.firstChild); tip.hidden = true; }
    hit.addEventListener('pointermove', function (e) {
      var r = svg.getBoundingClientRect(), px = e.clientX - r.left, py = e.clientY - r.top;
      var i = Math.round((px - m.l - 8) / ((pw - 16) / (n - 1))); i = Math.max(0, Math.min(n - 1, i));
      show(i, sx(i), py);
    });
    hit.addEventListener('pointerleave', hide);
    host.onfocus = function () { show(cur); };
    host.onblur = hide;
    host.onkeydown = function (e) {
      if (e.key === 'ArrowRight') { show(Math.min(n - 1, cur + 1)); e.preventDefault(); }
      if (e.key === 'ArrowLeft') { show(Math.max(0, cur - 1)); e.preventDefault(); }
      if (e.key === 'Escape') hide();
    };
  }

  /* ---------- dot plot ---------- */
  function dotPlot(host, cfg) {
    var svgOld = host.querySelector('svg'); if (svgOld) host.removeChild(svgOld);
    var W = host.clientWidth, narrow = W < 460, rowH = 30, gap = 12;
    var nGaps = 0; cfg.rows.forEach(function (r, i) { if (i && r.group !== cfg.rows[i - 1].group) nGaps++; });
    var m = { l: narrow ? 104 : 196, r: 44, t: 26, b: 38 };
    var H = m.t + cfg.rows.length * rowH + nGaps * gap + m.b;
    var pw = W - m.l - m.r;
    var sx = function (v) { return m.l + (v - cfg.x.min) / (cfg.x.max - cfg.x.min) * pw; };
    var svg = el('svg', { width: W, height: H, viewBox: '0 0 ' + W + ' ' + H, 'aria-hidden': 'true' });
    host.insertBefore(svg, host.firstChild);
    var g = el('g', {}, svg);
    cfg.x.ticks.forEach(function (t) {
      el('line', { x1: sx(t), x2: sx(t), y1: m.t - 6, y2: H - m.b, 'class': 'ch-grid' }, g);
      text(g, sx(t), H - m.b + 16, String(t), 'ch-tick', 'middle');
    });
    text(g, m.l + pw / 2, H - 4, cfg.xlabel, 'ch-lab', 'middle');
    if (cfg.ref) {
      el('line', { x1: sx(cfg.ref.v), x2: sx(cfg.ref.v), y1: m.t - 8, y2: H - m.b, 'class': 'ch-ref' }, g);
      text(g, sx(cfg.ref.v) + 6, m.t - 12, cfg.ref.label, 'ch-note');
    }
    var y = m.t, tip = tooltip(host), rows = [];
    cfg.rows.forEach(function (r, i) {
      if (i && r.group !== cfg.rows[i - 1].group) y += gap;
      var cy = y + rowH / 2;
      text(g, m.l - 12, cy + 4, narrow && r.short ? r.short : r.name, r.emph ? 'ch-row ch-row-em' : 'ch-row', 'end');
      el('line', { x1: sx(cfg.x.min), x2: sx(cfg.x.max), y1: cy, y2: cy, 'class': 'ch-guide' }, g);
      marker(g, 'circle', sx(r.v), cy, r.emph ? 6 : 5, r.color);
      var left = cfg.ref && r.v <= cfg.ref.v + 0.05;
      text(g, sx(r.v) + (left ? -11 : 11), cy + 4, cfg.fmt(r.v), r.emph ? 'ch-val ch-val-em' : 'ch-val', left ? 'end' : 'start');
      rows.push({ r: r, y: y });
      y += rowH;
    });
    rows.forEach(function (o, i) {
      var hit = el('rect', { x: 0, y: o.y, width: W, height: rowH, fill: 'transparent' }, svg);
      hit.addEventListener('pointermove', function (e) {
        var b = svg.getBoundingClientRect();
        fillTip(tip, o.r.name, [{ color: o.r.color, value: cfg.fmt(o.r.v), name: cfg.unit }]);
        placeTip(host, tip, e.clientX - b.left, o.y + rowH / 2);
      });
      hit.addEventListener('pointerleave', function () { tip.hidden = true; });
    });
  }

  /* ---------- data (from the paper) ---------- */
  var f1 = function (v) { return v.toFixed(1); };
  var C = { blue: 'var(--c-blue)', orange: 'var(--c-orange)', g1: 'var(--c-g1)', g2: 'var(--c-g2)' };
  var charts = [
    ['ch-proposers', function (h) {
      lineChart(h, {
        xs: [0, 1, 2, 3, 4, 5, 6], xname: 'Outer step', xlabel: 'Outer step', height: 290, endLabels: true, fmt: f1,
        ylabel: 'Test accuracy (%)', y: { min: 74.4, max: 78.8, ticks: [75, 76, 77, 78] },
        series: [
          { name: 'DERL-base', vals: [75.13, 76.60, 77.69, 77.13, 77.29, 78.28, 78.30], color: C.blue, width: 2.5, marker: 'circle', emph: true },
          { name: 'RLAIF (GPT-4o)', short: 'RLAIF', vals: [76.88, 76.67, 76.40, 76.85, 76.45, 76.17, 76.95], color: C.g2, width: 1.75, dash: '6 4', marker: 'triangle' },
          { name: 'Random search', short: 'Random', vals: [76.08, 74.90, 75.97, 54.58, 76.34, 75.16, 74.83], color: C.g1, width: 1.75, dash: '2 4', marker: 'square' }
        ]
      });
    }],
    ['ch-vocab', function (h) {
      dotPlot(h, {
        xlabel: 'GSM8K test exact match (%)', unit: 'exact match (%)', fmt: f1,
        x: { min: 74, max: 80, ticks: [74, 75, 76, 77, 78, 79, 80] }, ref: { v: 76.12, label: 'best GRPO baseline' },
        rows: [
          { name: 'GRPO w/ Outcome', short: 'Outcome', v: 75.82, color: C.g1, group: 0 },
          { name: 'GRPO w/ Average(primitives)', short: 'Average', v: 76.12, color: C.g1, group: 0 },
          { name: 'DERL-base, flip g\u2082', short: 'flip g\u2082', v: 77.79, color: C.blue, group: 1 },
          { name: 'DERL-base, remove g\u2082', short: 'no g\u2082', v: 78.39, color: C.blue, group: 1 },
          { name: 'DERL-base, remove g\u2083', short: 'no g\u2083', v: 78.92, color: C.blue, group: 1 },
          { name: 'DERL-base, remove g\u2084', short: 'no g\u2084', v: 77.94, color: C.blue, group: 1 },
          { name: 'DERL-base, full vocabulary', short: 'full', v: 79.22, color: C.blue, group: 2, emph: true }
        ]
      });
    }],
    ['ch-dyn-alf', function (h) {
      lineChart(h, {
        xs: Array.from({ length: 16 }, function (_, i) { return i; }), xname: 'Outer step', xlabel: 'Outer step', height: 220, trend: true, fmt: f1,
        ylabel: 'Success rate (%)', y: { min: 25, max: 95, ticks: [30, 50, 70, 90] },
        series: [
          { name: 'Validation', vals: [51.9, 72.2, 64.8, 72.9, 73.4, 75.0, 70.7, 83.3, 86.4, 54.6, 73.4, 85.7, 85.2, 68.2, 86.9, 86.2], color: C.blue, marker: 'circle', emph: true },
          { name: 'Test', vals: [30.5, 41.7, 41.2, 45.0, 45.3, 45.0, 40.7, 44.5, 54.5, 34.0, 43.2, 51.8, 54.9, 43.4, 51.7, 55.1], color: C.orange, marker: 'square' }
        ]
      });
    }],
    ['ch-dyn-gsm', function (h) {
      lineChart(h, {
        xs: [0, 1, 2, 3, 4, 5, 6, 7], xname: 'Outer step', xlabel: 'Outer step', height: 220, trend: true, fmt: f1,
        ylabel: 'Accuracy (%)', y: { min: 55, max: 100, ticks: [60, 70, 80, 90, 100] },
        series: [
          { name: 'Validation', vals: [67.8, 83.0, 96.6, 96.6, 96.4, 96.8, 96.8, 96.5], color: C.blue, marker: 'circle', emph: true },
          { name: 'Test', vals: [59.5, 73.5, 86.2, 86.0, 86.4, 86.2, 86.4, 86.2], color: C.orange, marker: 'square' }
        ]
      });
    }],
    ['ch-dyn-math', function (h) {
      lineChart(h, {
        xs: [0, 1, 2, 3, 4, 5, 6, 7], xname: 'Outer step', xlabel: 'Outer step', height: 220, trend: true, fmt: f1,
        ylabel: 'Accuracy (%)', y: { min: 35, max: 75, ticks: [40, 50, 60, 70] },
        series: [
          { name: 'Validation', vals: [48.2, 59.6, 68.9, 68.4, 67.8, 68.5, 69.2, 70.2], color: C.blue, marker: 'circle', emph: true },
          { name: 'Test', vals: [39.6, 48.9, 57.2, 56.5, 56.3, 56.5, 57.0, 59.0], color: C.orange, marker: 'square' }
        ]
      });
    }],
    ['ch-structures', function (h) {
      lineChart(h, {
        xs: [0, 1, 2, 3, 4, 5, 6, 7, 8], xname: 'Outer step', xlabel: 'Outer step', height: 260, trend: true, endLabels: true, fmt: f1,
        ylabel: 'Share of programs (%)', y: { min: -4, max: 100, ticks: [0, 25, 50, 75, 100] },
        series: [
          { name: 'Stable', vals: [62.5, 75.0, 50.0, 75.0, 62.5, 75.0, 87.5, 87.5, 87.5], color: C.blue, marker: 'circle', emph: true },
          { name: 'Unstable', vals: [25.0, 12.5, 37.5, 12.5, 25.0, 0.0, 12.5, 0.0, 12.5], color: C.orange, marker: 'triangle' }
        ]
      });
    }]
  ];

  function renderAll() {
    charts.forEach(function (c) { var h = document.getElementById(c[0]); if (h && h.clientWidth > 0) c[1](h); });
  }
  var t = null;
  function onResize() { clearTimeout(t); t = setTimeout(renderAll, 120); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', renderAll); else renderAll();
  if ('ResizeObserver' in window) {
    var last = {};
    var ro = new ResizeObserver(function (entries) {
      var changed = entries.some(function (e) { var w = Math.round(e.contentRect.width), id = e.target.id; if (last[id] !== w) { last[id] = w; return true; } return false; });
      if (changed) onResize();
    });
    charts.forEach(function (c) { var h = document.getElementById(c[0]); if (h) ro.observe(h); });
  } else window.addEventListener('resize', onResize);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(renderAll);
})();
