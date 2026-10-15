/* From Atomic to Composite project page: charts as inline SVG.
   All values are from the paper's result files (sufficiency, necessity zero-shot, training strategies, pass@k). */
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

  /* ---------- grouped bars: one bar per series in each group, data ends rounded, anchored at zero ---------- */
  function barPath(x, w, y0, y1, r) {
    var h = Math.abs(y0 - y1); r = Math.min(r, h, w / 2);
    var s = y1 <= y0 ? 1 : -1; // 1: bar grows up from the baseline, -1: down
    return 'M' + x + ' ' + y0 + 'V' + (y1 + s * r) + 'Q' + x + ' ' + y1 + ' ' + (x + r) + ' ' + y1 + 'H' + (x + w - r) +
      'Q' + (x + w) + ' ' + y1 + ' ' + (x + w) + ' ' + (y1 + s * r) + 'V' + y0 + 'Z';
  }
  function barChart(host, cfg) {
    var svgOld = host.querySelector('svg'); if (svgOld) host.removeChild(svgOld);
    var W = host.clientWidth, H = cfg.height, n = cfg.groups.length, k = cfg.series.length;
    var m = { l: 34, r: 4, t: 22, b: cfg.xlabel ? 38 : 22 };
    var pw = W - m.l - m.r, ph = H - m.t - m.b, gw = pw / n, gap = 2;
    var bw = Math.max(6, Math.min(18, (gw - 14) / k - gap));
    var sy = function (v) { return m.t + (cfg.y.max - v) / (cfg.y.max - cfg.y.min) * ph; };
    var y0 = sy(0);
    var svg = el('svg', { width: W, height: H, viewBox: '0 0 ' + W + ' ' + H, 'aria-hidden': 'true' });
    host.insertBefore(svg, host.firstChild);
    var g = el('g', {}, svg);
    text(g, 4, 13, cfg.ylabel, 'ch-lab');
    var band = el('rect', { x: 0, y: m.t - 4, width: gw, height: ph + 8, rx: 6, 'class': 'ch-band', visibility: 'hidden' }, g);
    cfg.y.ticks.forEach(function (t) {
      if (t !== 0) el('line', { x1: m.l, x2: W - m.r, y1: sy(t), y2: sy(t), 'class': 'ch-grid' }, g);
      text(g, m.l - 8, sy(t) + 4, String(t), 'ch-tick', 'end');
    });
    var x0 = function (i) { return m.l + gw * (i + 0.5) - (k * bw + (k - 1) * gap) / 2; };
    cfg.series.forEach(function (s, j) {
      s.vals.forEach(function (v, i) {
        el('path', { d: barPath(x0(i) + j * (bw + gap), bw, y0, sy(v), 4), style: 'fill:' + s.color }, g);
      });
    });
    el('line', { x1: m.l, x2: W - m.r, y1: y0, y2: y0, 'class': 'ch-axis' }, g);
    cfg.groups.forEach(function (lab, i) { text(g, m.l + gw * (i + 0.5), m.t + ph + 15, lab, 'ch-tick', 'middle'); });
    if (cfg.xlabel) text(g, m.l + pw / 2, H - 4, cfg.xlabel, 'ch-lab', 'middle');
    var hit = el('rect', { x: m.l, y: 0, width: pw, height: H, fill: 'transparent' }, svg);
    var tip = tooltip(host), cur = 0;
    function show(i, px, py) {
      cur = i;
      band.setAttribute('x', m.l + gw * i); band.setAttribute('visibility', 'visible');
      fillTip(tip, cfg.gname(i), cfg.series.map(function (s) {
        return { color: s.color, value: cfg.fmt(s.vals[i]), name: s.name + ' · ' + s.detail(i) };
      }));
      placeTip(host, tip, px === undefined ? m.l + gw * (i + 1) : px, py === undefined ? m.t + ph / 2 : py);
    }
    function hide() { band.setAttribute('visibility', 'hidden'); tip.hidden = true; }
    hit.addEventListener('pointermove', function (e) {
      var r = svg.getBoundingClientRect(), px = e.clientX - r.left;
      show(Math.max(0, Math.min(n - 1, Math.floor((px - m.l) / gw))), px, e.clientY - r.top);
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

  /* ---------- dot plot (optional "before" value v0 and group labels) ---------- */
  function dotPlot(host, cfg) {
    var svgOld = host.querySelector('svg'); if (svgOld) host.removeChild(svgOld);
    var W = host.clientWidth, narrow = W < 460, rowH = cfg.rowH || 30, gap = cfg.groupLabels ? 26 : 12;
    var nGaps = 0; cfg.rows.forEach(function (r, i) { if (i && r.group !== cfg.rows[i - 1].group) nGaps++; });
    var top = cfg.groupLabels ? 30 : 26;
    var m = { l: narrow ? (cfg.lNarrow || 104) : (cfg.l || 196), r: 46, t: top, b: 38 };
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
      var newGroup = i === 0 || r.group !== cfg.rows[i - 1].group;
      if (i && newGroup) y += gap;
      if (cfg.groupLabels && newGroup) text(g, 4, y - 6, cfg.groupLabels[r.group], 'ch-glab');
      var cy = y + rowH / 2;
      text(g, m.l - 12, cy + 4, narrow && r.short ? r.short : r.name, r.emph ? 'ch-row ch-row-em' : 'ch-row', 'end');
      el('line', { x1: sx(cfg.x.min), x2: sx(cfg.x.max), y1: cy, y2: cy, 'class': 'ch-guide' }, g);
      if (r.v0 !== undefined) {
        el('line', { x1: sx(r.v0), x2: sx(r.v), y1: cy, y2: cy, style: 'stroke:' + r.color + ';stroke-width:2.5;opacity:.55' }, g);
        el('circle', { cx: sx(r.v0), cy: cy, r: 4.5, style: 'fill:var(--paper);stroke:' + r.color + ';stroke-width:2' }, g);
      }
      marker(g, 'circle', sx(r.v), cy, r.emph ? 6 : 5, r.color);
      var left = (cfg.ref && r.v <= cfg.ref.v + 0.05) || (r.v0 !== undefined && r.v0 > r.v);
      text(g, sx(r.v) + (left ? -11 : 11), cy + 4, cfg.fmt(r.v), r.emph ? 'ch-val ch-val-em' : 'ch-val', left ? 'end' : 'start');
      rows.push({ r: r, y: y });
      y += rowH;
    });
    rows.forEach(function (o) {
      var hit = el('rect', { x: 0, y: o.y, width: W, height: rowH, fill: 'transparent' }, svg);
      hit.addEventListener('pointermove', function (e) {
        var b = svg.getBoundingClientRect(), rr = [{ color: o.r.color, value: cfg.fmt(o.r.v), name: o.r.v0 !== undefined ? 'after RL' : cfg.unit }];
        if (o.r.v0 !== undefined) rr.push({ color: 'var(--mute)', value: cfg.fmt(o.r.v0), name: 'before RL' });
        fillTip(tip, (cfg.groupLabels ? cfg.groupLabels[o.r.group] + ' · ' : '') + o.r.name, rr);
        placeTip(host, tip, e.clientX - b.left, o.y + rowH / 2);
      });
      hit.addEventListener('pointerleave', function () { tip.hidden = true; });
    });
  }

  /* ---------- data (from the paper) ---------- */
  var f1 = function (v) { return v.toFixed(1); };
  var C = { blue: 'var(--c-blue)', orange: 'var(--c-orange)', g1: 'var(--c-g1)', g2: 'var(--c-g2)' };
  /* sufficiency: the composite data is split into an SFT share and an RL share (10/90 ... 90/10). Composite-first runs
     SFT on the SFT share; atomic-first runs SFT on the atomic data (one model for every split). Both run RL on the RL share. */
  var sftPct = [10, 30, 50, 70, 90];
  var SUF = {
    iid:  { atomic0: 35.18, atomic: [83.14, 81.08, 80.61, 79.53, 71.29], comp0: [31.43, 51.15, 72.83, 82.86, 88.90], comp: [29.93, 62.81, 78.55, 87.03, 90.35] },
    comp: { atomic0: 28.20, atomic: [65.30, 64.24, 63.39, 62.33, 60.49], comp0: [27.14, 43.25, 57.74, 73.43, 78.37], comp: [28.13, 50.81, 63.82, 76.18, 80.35] },
    zs:   { atomic0: 24.07, atomic: [48.58, 47.39, 45.97, 43.57, 42.59], comp0: [17.32, 25.93, 27.78, 30.61, 26.25], comp: [17.76, 31.15, 28.76, 29.63, 29.85] }
  };
  var signed = function (v) { return (v < 0 ? '−' : '+') + Math.abs(v).toFixed(1); };
  function suf(key, gain) {
    var d = SUF[key];
    var before = { a: sftPct.map(function () { return d.atomic0; }), c: d.comp0 };
    var val = function (after, b) { return gain ? after.map(function (v, i) { return v - b[i]; }) : after; };
    var detail = function (after, b) { return function (i) { return f1(b[i]) + ' → ' + f1(after[i]); }; };
    return function (h) {
      barChart(h, {
        groups: sftPct.map(function (p) { return p + '/' + (100 - p); }),
        gname: function (i) { return sftPct[i] + '% SFT / ' + (100 - sftPct[i]) + '% RL'; },
        xlabel: gain ? null : 'Composite data split (% SFT / % RL)',
        ylabel: gain ? 'Gain from RL (points)' : 'Accuracy after RL (%)',
        height: gain ? 136 : 168, fmt: gain ? signed : f1,
        y: gain ? { min: -5, max: 50, ticks: [0, 25, 50] } : { min: 0, max: 100, ticks: [0, 25, 50, 75, 100] },
        series: [
          { name: 'Atomic-first', vals: val(d.atomic, before.a), color: C.blue, detail: detail(d.atomic, before.a) },
          { name: 'Composite-first', vals: val(d.comp, before.c), color: C.orange, detail: detail(d.comp, before.c) }
        ]
      });
    };
  }
  var ks = ['1', '2', '4', '8', '16', '32', '64', '128', '256', '512'];
  function pass(before, after) {
    return function (h) {
      lineChart(h, {
        xs: ks, xname: 'k =', xlabel: 'k (samples per question)', height: 250, fmt: f1,
        ylabel: 'Zero-shot pass@k (%)', y: { min: 20, max: 66, ticks: [20, 30, 40, 50, 60] },
        series: [
          { name: 'After RL', vals: after, color: C.blue, width: 2.5, marker: 'circle', emph: true },
          { name: 'Before RL', vals: before, color: C.g2, width: 2, marker: 'square' }
        ]
      });
    };
  }
  var charts = [
    ['ch-gain-iid', suf('iid', true)], ['ch-acc-iid', suf('iid', false)],
    ['ch-gain-comp', suf('comp', true)], ['ch-acc-comp', suf('comp', false)],
    ['ch-gain-zs', suf('zs', true)], ['ch-acc-zs', suf('zs', false)],
    ['ch-nec', function (h) {
      dotPlot(h, {
        xlabel: 'Zero-shot accuracy (%)', unit: 'zero-shot accuracy (%)', fmt: f1, l: 176, lNarrow: 112,
        x: { min: 0, max: 50, ticks: [0, 10, 20, 30, 40, 50] },
        rows: [
          { name: 'SFT on 10% composite', short: '10% comp.', v0: 17.32, v: 18.85, color: C.g1, group: 0 },
          { name: 'SFT on 20% composite', short: '20% comp.', v0: 19.50, v: 20.81, color: C.g1, group: 0 },
          { name: 'SFT on memory only', short: 'memory', v0: 0.00, v: 5.99, color: C.g2, group: 1 },
          { name: 'SFT on context only', short: 'context', v0: 20.59, v: 20.92, color: C.g2, group: 1 },
          { name: 'SFT on memory + context', short: 'mem. + ctx.', v0: 24.07, v: 42.59, color: C.blue, group: 2, emph: true }
        ]
      });
    }],
    ['ch-strat', function (h) {
      dotPlot(h, {
        xlabel: 'Accuracy (%)', unit: 'accuracy (%)', fmt: f1, l: 70, lNarrow: 60, rowH: 26,
        x: { min: 30, max: 80, ticks: [30, 40, 50, 60, 70, 80] },
        groupLabels: { 0: 'IID', 1: 'COMPOSITION', 2: 'ZERO-SHOT' },
        rows: [
          { name: 'SFT', v: 75.50, color: C.g1, group: 0 }, { name: 'LoRA', v: 64.26, color: C.g2, group: 0 }, { name: 'RL', v: 71.29, color: C.blue, group: 0, emph: true },
          { name: 'SFT', v: 58.59, color: C.g1, group: 1 }, { name: 'LoRA', v: 53.99, color: C.g2, group: 1 }, { name: 'RL', v: 60.49, color: C.blue, group: 1, emph: true },
          { name: 'SFT', v: 35.73, color: C.g1, group: 2 }, { name: 'LoRA', v: 34.64, color: C.g2, group: 2 }, { name: 'RL', v: 42.59, color: C.blue, group: 2, emph: true }
        ]
      });
    }],
    ['ch-pass-atomic', pass([24.07, 29.30, 31.92, 34.64, 36.60, 38.13, 41.07, 40.85, 42.81, 44.34], [47.39, 51.09, 55.88, 56.43, 58.50, 58.71, 60.24, 61.66, 62.20, 62.85])],
    ['ch-pass-comp', pass([26.25, 33.55, 36.38, 40.09, 42.59, 46.41, 46.30, 48.47, 50.87, 51.96], [29.85, 35.51, 39.00, 41.29, 43.14, 45.64, 47.39, 49.35, 50.00, 51.53])]
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
