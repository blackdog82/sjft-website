/* ================================================
   bagfilter-viz.js — 집진기 작동 원리 Canvas 애니메이션
   ================================================ */
(function () {
  'use strict';

  const canvas = document.getElementById('bagfilterCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, sc;

  function resize() {
    const wrap = canvas.parentElement;
    W = wrap.clientWidth;
    H = Math.round(W * 0.70);
    canvas.width = W;
    canvas.height = H;
    sc = W / 820;
  }

  /* ── 좌표 헬퍼 ─────────────────────────── */
  const px = v => v * sc;

  /* ── 색상 ──────────────────────────────── */
  const C = {
    navy:        '#1a2b4a',
    blue:        '#2563a8',
    chamberFill: '#eef2f8',
    plenuFill:   '#dce8f4',
    tubeFill:    '#b8c8dc',
    bagFill:     '#d6c6a8',
    bagStroke:   '#8b6f4e',
    hopperFill:  '#e0e8f2',
    outletFill:  '#d0e4f5',
    dust:        '#9b7a35',
    cleanAir:    '#5ba3d9',
    pulse:       '#ffffff',
  };

  /* ── 레이아웃 (820px 기준) ──────────────── */
  const L = {
    outlet:    { x: 300, y: 2,  w: 220, h: 58 },
    chamber:   { x: 155, y: 60, w: 510, h: 285 },
    plenum:    { x: 155, y: 60, w: 510, h: 88  },
    tubesheet: { x: 155, y: 148,w: 510, h: 13  },
    bags: [
      { cx: 245, y1: 161, y2: 335, r: 24 },
      { cx: 345, y1: 161, y2: 335, r: 24 },
      { cx: 475, y1: 161, y2: 335, r: 24 },
      { cx: 575, y1: 161, y2: 335, r: 24 },
    ],
    inlet:  { x: 62, y: 258, w: 103, h: 68 },
    hopper: { tL: 155, tR: 665, bL: 295, bR: 525, tY: 345, bY: 475 },
    valve:  { cx: 410, cy: 500, r: 22 },
  };

  /* ── 파티클 ─────────────────────────────── */
  class DustParticle {
    constructor() { this.init(); }
    init() {
      this.x  = L.inlet.x + L.inlet.w;
      this.y  = L.inlet.y + L.inlet.h * 0.5 + (Math.random() - 0.5) * L.inlet.h * 0.55;
      this.vx = 1.3 + Math.random() * 1.4;
      this.vy = -0.6 + Math.random() * 0.5;
      this.r  = 1.6 + Math.random() * 2.2;
      const g = 100 + Math.floor(Math.random() * 55);
      this.col = `rgb(${140 + Math.floor(Math.random()*40)},${g},${45 + Math.floor(Math.random()*25)})`;
      this.life    = 110 + Math.floor(Math.random() * 50);
      this.maxLife = this.life;
      this.stuck   = false;
    }
    update() {
      if (this.stuck) { this.life -= 1.8; return; }
      this.x += this.vx;
      this.y += this.vy;
      this.vy += 0.018;
      for (const b of L.bags) {
        if (Math.abs(this.x - b.cx) <= b.r + 2 && this.y >= b.y1 + 10 && this.y <= b.y2) {
          this.stuck = true;
          this.x = b.cx + (this.x > b.cx ? b.r : -b.r);
          break;
        }
      }
      this.life--;
    }
    draw() {
      const a = Math.max(0, this.life / this.maxLife);
      ctx.save();
      ctx.globalAlpha = a * 0.85;
      ctx.fillStyle = this.col;
      ctx.beginPath();
      ctx.arc(px(this.x), px(this.y), px(this.r), 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
    get dead() { return this.life <= 0; }
  }

  class CleanParticle {
    constructor() {
      const b = L.bags[Math.floor(Math.random() * L.bags.length)];
      this.x  = b.cx + (Math.random() - 0.5) * b.r * 1.4;
      this.y  = b.y1 + 30 + Math.random() * (b.y2 - b.y1 - 50);
      this.vx = (Math.random() - 0.5) * 0.35;
      this.vy = -1.6 - Math.random() * 1.1;
      this.r  = 1.1 + Math.random() * 1.5;
      this.life    = 55 + Math.floor(Math.random() * 40);
      this.maxLife = this.life;
    }
    update() { this.x += this.vx; this.y += this.vy; this.life--; }
    draw() {
      ctx.save();
      ctx.globalAlpha = Math.max(0, (this.life / this.maxLife) * 0.72);
      ctx.fillStyle = C.cleanAir;
      ctx.beginPath();
      ctx.arc(px(this.x), px(this.y), px(this.r), 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
    get dead() { return this.life <= 0; }
  }

  class FallDust {
    constructor(bx, by) {
      this.x  = bx + (Math.random() - 0.5) * 44;
      this.y  = by;
      this.vx = (Math.random() - 0.5) * 1.6;
      this.vy = -0.5 + Math.random() * 1.8;
      this.r  = 1 + Math.random() * 2.2;
      this.g  = 0.07 + Math.random() * 0.05;
      this.life    = 95 + Math.floor(Math.random() * 70);
      this.maxLife = this.life;
    }
    update() { this.x += this.vx; this.y += this.vy; this.vy += this.g; this.life--; }
    draw() {
      ctx.save();
      ctx.globalAlpha = Math.max(0, (this.life / this.maxLife) * 0.8);
      ctx.fillStyle = C.dust;
      ctx.beginPath();
      ctx.arc(px(this.x), px(this.y), px(this.r), 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
    get dead() { return this.life <= 0; }
  }

  /* ── 상태 변수 ─────────────────────────── */
  let dustArr  = [];
  let cleanArr = [];
  let fallArr  = [];
  let frame    = 0;
  let pulseTimer = 0;
  const PULSE_EVERY = 210; // 약 3.5초 @ 60fps
  let pulseWaves = []; // { y, alpha }

  function triggerPulse() {
    pulseWaves.push({ y: L.plenum.y + L.plenum.h, alpha: 1.0 });
    L.bags.forEach(b => {
      for (let i = 0; i < 14; i++) {
        fallArr.push(new FallDust(b.cx, b.y1 + 20 + Math.random() * (b.y2 - b.y1 - 30)));
      }
    });
  }

  /* ── 그리기 함수 ────────────────────────── */
  function arrow(ax, ay1, ay2, size) {
    ctx.beginPath();
    ctx.moveTo(ax, ay1);
    ctx.lineTo(ax, ay2 + size * 1.8);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(ax - size, ay2 + size * 1.8);
    ctx.lineTo(ax, ay2);
    ctx.lineTo(ax + size, ay2 + size * 1.8);
    ctx.stroke();
  }

  function label(txt, lx, ly, align, color, size) {
    ctx.save();
    ctx.font = `bold ${px(size || 11.5)}px 'Malgun Gothic','맑은 고딕',sans-serif`;
    ctx.fillStyle = color || C.navy;
    ctx.textAlign = align || 'center';
    ctx.textBaseline = 'middle';
    txt.split('\n').forEach((t, i) => ctx.fillText(t, lx, ly + i * px(15)));
    ctx.restore();
  }

  function drawOutlet() {
    const o = L.outlet;
    ctx.fillStyle = C.outletFill;
    ctx.strokeStyle = C.navy;
    ctx.lineWidth = px(2.2);
    ctx.beginPath();
    ctx.rect(px(o.x), px(o.y), px(o.w), px(o.h));
    ctx.fill(); ctx.stroke();

    // 상승 화살표
    ctx.strokeStyle = C.cleanAir;
    ctx.lineWidth = px(2);
    [o.x + 40, o.x + 110, o.x + 180].forEach(ax => {
      arrow(px(ax), px(o.y + o.h - 8), px(o.y + 7), px(4));
    });

    label('Clean Air Exhaust', px(o.x + o.w / 2), px(o.y - 12), 'center', C.blue, 11);
  }

  function drawChamber() {
    const ch = L.chamber;
    // 전체 하우징
    ctx.fillStyle = C.chamberFill;
    ctx.strokeStyle = C.navy;
    ctx.lineWidth = px(2.8);
    ctx.beginPath();
    ctx.rect(px(ch.x), px(ch.y), px(ch.w), px(ch.h));
    ctx.fill(); ctx.stroke();

    // Top Plenum (청정 공기 영역)
    const pl = L.plenum;
    ctx.fillStyle = C.plenuFill;
    ctx.beginPath();
    ctx.rect(px(pl.x + 2), px(pl.y + 2), px(pl.w - 4), px(pl.h - 2));
    ctx.fill();

    ctx.save();
    ctx.font = `${px(10)}px 'Malgun Gothic',sans-serif`;
    ctx.fillStyle = 'rgba(37,99,168,0.55)';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Top Plenum  (정화 공기 구역)', px(410), px(pl.y + pl.h / 2));
    ctx.restore();
  }

  function drawTubeSheet() {
    const ts = L.tubesheet;
    ctx.fillStyle = C.tubeFill;
    ctx.strokeStyle = C.navy;
    ctx.lineWidth = px(1.8);
    ctx.fillRect(px(ts.x), px(ts.y), px(ts.w), px(ts.h));
    ctx.strokeRect(px(ts.x), px(ts.y), px(ts.w), px(ts.h));

    // 튜브시트 구멍
    L.bags.forEach(b => {
      ctx.fillStyle = '#f0f4fa';
      ctx.strokeStyle = C.navy;
      ctx.lineWidth = px(1);
      ctx.beginPath();
      ctx.ellipse(px(b.cx), px(ts.y + ts.h / 2), px(b.r * 0.82), px(ts.h * 0.42), 0, 0, Math.PI * 2);
      ctx.fill(); ctx.stroke();
    });

    label('Tube Sheet', px(ts.x - 12), px(ts.y + ts.h / 2), 'right', C.blue, 10.5);
  }

  function drawManifold() {
    // 펄스 매니폴드 파이프
    ctx.fillStyle = '#8ba0c4';
    ctx.strokeStyle = C.navy;
    ctx.lineWidth = px(1.5);
    ctx.fillRect(px(L.chamber.x + 8), px(L.plenum.y + L.plenum.h - 20), px(L.chamber.w - 16), px(9));
    ctx.strokeRect(px(L.chamber.x + 8), px(L.plenum.y + L.plenum.h - 20), px(L.chamber.w - 16), px(9));

    // 각 백 위 노즐
    L.bags.forEach(b => {
      ctx.fillStyle = '#5a6e8c';
      ctx.fillRect(px(b.cx - 4), px(L.plenum.y + L.plenum.h - 11), px(8), px(14));
    });

    label('Pulse Jet Manifold', px(L.chamber.x + L.chamber.w + 12), px(L.plenum.y + L.plenum.h - 16), 'left', C.blue, 10);
  }

  function drawBags() {
    L.bags.forEach((b, i) => {
      const bH = b.y2 - b.y1;

      // 케이지 수직선
      ctx.strokeStyle = 'rgba(139,111,78,0.32)';
      ctx.lineWidth = px(0.8);
      [-0.65, 0, 0.65].forEach(f => {
        ctx.beginPath();
        ctx.moveTo(px(b.cx + f * b.r), px(b.y1));
        ctx.lineTo(px(b.cx + f * b.r), px(b.y2));
        ctx.stroke();
      });

      // 케이지 수평링
      for (let ry = b.y1 + 28; ry < b.y2 - 8; ry += 26) {
        ctx.beginPath();
        ctx.moveTo(px(b.cx - b.r + 2), px(ry));
        ctx.lineTo(px(b.cx + b.r - 2), px(ry));
        ctx.stroke();
      }

      // 필터백 본체
      ctx.fillStyle = C.bagFill;
      ctx.strokeStyle = C.bagStroke;
      ctx.lineWidth = px(1.8);
      ctx.beginPath();
      ctx.moveTo(px(b.cx - b.r), px(b.y1));
      ctx.lineTo(px(b.cx + b.r), px(b.y1));
      ctx.quadraticCurveTo(px(b.cx + b.r + 5), px(b.y1 + bH * 0.5), px(b.cx + b.r * 0.5), px(b.y2));
      ctx.quadraticCurveTo(px(b.cx), px(b.y2 + 9), px(b.cx - b.r * 0.5), px(b.y2));
      ctx.quadraticCurveTo(px(b.cx - b.r - 5), px(b.y1 + bH * 0.5), px(b.cx - b.r), px(b.y1));
      ctx.closePath();
      ctx.fill(); ctx.stroke();

      // 벤투리 노즐 (상단)
      ctx.fillStyle = '#6b5030';
      ctx.strokeStyle = C.bagStroke;
      ctx.lineWidth = px(1.5);
      ctx.beginPath();
      ctx.ellipse(px(b.cx), px(b.y1 + 3), px(b.r * 0.72), px(7), 0, 0, Math.PI * 2);
      ctx.fill(); ctx.stroke();

      // 첫 번째 백에만 라벨
      if (i === 0) {
        label('Filter Bag', px(b.cx - b.r - 12), px((b.y1 + b.y2) / 2), 'right', C.blue, 10.5);
        label('Venturi', px(b.cx - b.r - 12), px(b.y1 + 10), 'right', C.blue, 10.5);
        label('Bag Cage', px(b.cx - b.r - 12), px(b.y2 - 30), 'right', C.blue, 10.5);
      }
    });
  }

  function drawInlet() {
    const inp = L.inlet;
    ctx.fillStyle = '#edf2fa';
    ctx.strokeStyle = C.navy;
    ctx.lineWidth = px(2.2);
    ctx.fillRect(px(inp.x), px(inp.y), px(inp.w), px(inp.h));
    ctx.strokeRect(px(inp.x), px(inp.y), px(inp.w), px(inp.h));

    // 유입 화살표
    ctx.strokeStyle = 'rgba(180,115,35,0.85)';
    ctx.fillStyle   = 'rgba(180,115,35,0.85)';
    ctx.lineWidth   = px(1.5);
    [18, 48, 78].forEach(ox => {
      const ax = px(inp.x + ox);
      const ay = px(inp.y + inp.h / 2);
      ctx.beginPath();
      ctx.moveTo(ax, ay - px(4.5));
      ctx.lineTo(ax + px(13), ay);
      ctx.lineTo(ax, ay + px(4.5));
      ctx.closePath(); ctx.fill();
    });

    label('Dust Laden Air', px(inp.x + inp.w / 2), px(inp.y + inp.h + 16), 'center', '#a06820', 10.5);
  }

  function drawHopper() {
    const h = L.hopper;
    ctx.fillStyle = C.hopperFill;
    ctx.strokeStyle = C.navy;
    ctx.lineWidth = px(2.6);
    ctx.beginPath();
    ctx.moveTo(px(h.tL), px(h.tY));
    ctx.lineTo(px(h.tR), px(h.tY));
    ctx.lineTo(px(h.bR), px(h.bY));
    ctx.lineTo(px(h.bL), px(h.bY));
    ctx.closePath();
    ctx.fill(); ctx.stroke();

    label('Dust Hopper', px((h.bL + h.bR) / 2), px(h.bY - 22), 'center', C.navy, 10.5);

    // Rotary Valve 케이싱
    const v = L.valve;
    ctx.fillStyle = '#b8c8dc';
    ctx.strokeStyle = C.navy;
    ctx.lineWidth = px(2);
    ctx.beginPath();
    ctx.rect(px(v.cx - v.r), px(v.cy - v.r), px(v.r * 2), px(v.r * 2));
    ctx.fill(); ctx.stroke();

    // 회전하는 날개
    const angle = (frame * 0.018) % (Math.PI * 2);
    ctx.strokeStyle = C.navy;
    ctx.lineWidth = px(1.8);
    for (let i = 0; i < 6; i++) {
      const a = angle + i * (Math.PI / 3);
      ctx.beginPath();
      ctx.moveTo(px(v.cx), px(v.cy));
      ctx.lineTo(px(v.cx + Math.cos(a) * v.r * 0.88), px(v.cy + Math.sin(a) * v.r * 0.88));
      ctx.stroke();
    }
    label('Rotary Valve', px(v.cx - v.r - 12), px(v.cy), 'right', C.blue, 10.5);
  }

  function drawPulseWaves() {
    pulseWaves = pulseWaves.filter(pw => pw.alpha > 0.02);
    pulseWaves.forEach(pw => {
      ctx.save();
      ctx.strokeStyle = `rgba(255,255,255,${pw.alpha})`;
      ctx.lineWidth = px(3.5);
      ctx.shadowColor = 'rgba(130,190,255,0.9)';
      ctx.shadowBlur  = px(14);
      ctx.beginPath();
      ctx.moveTo(px(L.chamber.x + 12), px(pw.y));
      ctx.lineTo(px(L.chamber.x + L.chamber.w - 12), px(pw.y));
      ctx.stroke();
      ctx.restore();
      pw.y     += 5.5;
      pw.alpha -= 0.022;
    });
  }

  function drawLegend() {
    const items = [
      { col: '#9b7a35', label: '분진 함유 공기' },
      { col: C.cleanAir,label: '정화된 공기'  },
      { col: 'rgba(200,220,255,0.9)', stroke: C.blue, label: '펄스 탈진' },
    ];
    let lx = px(22);
    const ly = px(L.hopper.bY + 34);
    items.forEach(it => {
      ctx.save();
      ctx.fillStyle = it.col;
      if (it.stroke) { ctx.strokeStyle = it.stroke; ctx.lineWidth = px(1.5); }
      ctx.beginPath();
      ctx.arc(lx + px(6), ly, px(5.5), 0, Math.PI * 2);
      it.stroke ? (ctx.fill(), ctx.stroke()) : ctx.fill();
      ctx.font = `${px(11)}px 'Malgun Gothic',sans-serif`;
      ctx.fillStyle = C.navy;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText(it.label, lx + px(17), ly);
      ctx.restore();
      lx += px(145);
    });
  }

  /* ── 업데이트 ───────────────────────────── */
  function update() {
    frame++;

    // 파티클 생성
    if (frame % 4 === 0) dustArr.push(new DustParticle());
    if (frame % 5 === 0) cleanArr.push(new CleanParticle());

    dustArr.forEach(p => p.update());
    cleanArr.forEach(p => p.update());
    fallArr.forEach(p => p.update());

    dustArr  = dustArr.filter(p => !p.dead);
    cleanArr = cleanArr.filter(p => !p.dead);
    fallArr  = fallArr.filter(p => !p.dead);

    // 과부하 방지
    if (dustArr.length  > 100) dustArr.splice(0, 15);
    if (cleanArr.length >  80) cleanArr.splice(0, 10);

    // 펄스 타이머
    pulseTimer++;
    if (pulseTimer >= PULSE_EVERY) { pulseTimer = 0; triggerPulse(); }
  }

  /* ── 렌더 ──────────────────────────────── */
  function draw() {
    ctx.clearRect(0, 0, W, H);

    // 배경
    ctx.fillStyle = '#f4f7fc';
    ctx.fillRect(0, 0, W, H);

    drawOutlet();
    drawChamber();
    drawManifold();
    drawTubeSheet();
    drawBags();
    drawInlet();
    drawHopper();

    // 파티클 레이어 (하우징 위)
    fallArr.forEach(p => p.draw());
    dustArr.forEach(p => p.draw());
    cleanArr.forEach(p => p.draw());

    drawPulseWaves();
    drawLegend();
  }

  /* ── 루프 ──────────────────────────────── */
  function loop() { update(); draw(); requestAnimationFrame(loop); }

  resize();
  window.addEventListener('resize', resize);
  loop();
})();
