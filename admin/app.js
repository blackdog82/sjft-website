'use strict';

const STORAGE_KEY = 'sales_orders';

// ── Storage ──────────────────────────────────────────────────
function loadOrders() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
}
function saveOrders(orders) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
}

// ── ID 생성: SO-YYYYMMDD-NNN ─────────────────────────────────
function generateId() {
  const orders = loadOrders();
  const today = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const count = orders.filter(o => o.id.includes(today)).length;
  return `SO-${today}-${String(count + 1).padStart(3, '0')}`;
}

// ── 숫자 포맷 ────────────────────────────────────────────────
function fmt(n) {
  return Number(n || 0).toLocaleString('ko-KR');
}

// ── 뷰 전환 ─────────────────────────────────────────────────
function showList() {
  document.getElementById('list-view').style.display = '';
  document.getElementById('form-view').style.display = 'none';
  renderList();
}

function showForm(id = null) {
  document.getElementById('list-view').style.display = 'none';
  document.getElementById('form-view').style.display = '';
  renderForm(id);
}

// ── 목록 화면 ────────────────────────────────────────────────
function renderList() {
  const customer = (document.getElementById('filter-customer')?.value || '').trim().toLowerCase();
  const from = document.getElementById('filter-from')?.value || '';
  const to = document.getElementById('filter-to')?.value || '';

  let orders = loadOrders().filter(o => {
    if (customer && !o.customer.name.toLowerCase().includes(customer)) return false;
    if (from && o.orderDate < from) return false;
    if (to && o.orderDate > to) return false;
    return true;
  });

  orders.sort((a, b) => b.orderDate.localeCompare(a.orderDate));

  const tbody = document.getElementById('order-tbody');
  const emptyMsg = document.getElementById('empty-msg');

  if (orders.length === 0) {
    tbody.innerHTML = '';
    emptyMsg.style.display = '';
    return;
  }
  emptyMsg.style.display = 'none';

  tbody.innerHTML = orders.map(o => `
    <tr>
      <td>${o.id}</td>
      <td>${escHtml(o.customer.name)}</td>
      <td>${o.orderDate}</td>
      <td>${o.deliveryDate}</td>
      <td style="text-align:right">${fmt(o.total)}원</td>
      <td>${escHtml(o.salesRep || '-')}</td>
      <td class="col-action">
        <div class="action-btns">
          <button class="btn btn-secondary btn-sm" onclick="showForm('${o.id}')">수정</button>
          <button class="btn btn-sm" style="background:#1a6fc4;color:#fff" onclick="printOrder('${o.id}')">인쇄</button>
          <button class="btn btn-danger btn-sm" onclick="deleteOrder('${o.id}')">삭제</button>
        </div>
      </td>
    </tr>
  `).join('');
}

function clearFilters() {
  document.getElementById('filter-customer').value = '';
  document.getElementById('filter-from').value = '';
  document.getElementById('filter-to').value = '';
  renderList();
}

// ── 폼 화면 ─────────────────────────────────────────────────
function renderForm(id) {
  document.getElementById('form-title').textContent = id ? '수주서 수정' : '수주서 등록';

  const orders = loadOrders();
  const o = id ? orders.find(x => x.id === id) : null;

  document.getElementById('f-id').value = o ? o.id : '';
  document.getElementById('f-order-no').value = o ? o.id : generateId();
  document.getElementById('f-order-date').value = o ? o.orderDate : today();
  document.getElementById('f-delivery-date').value = o ? o.deliveryDate : '';
  document.getElementById('f-delivery-addr').value = o ? o.deliveryAddress : '';
  document.getElementById('f-payment-terms').value = o ? o.paymentTerms : '';
  document.getElementById('f-sales-rep').value = o ? o.salesRep : '';
  document.getElementById('f-customer-name').value = o ? o.customer.name : '';
  document.getElementById('f-customer-contact').value = o ? o.customer.contact : '';
  document.getElementById('f-customer-phone').value = o ? o.customer.phone : '';
  document.getElementById('f-customer-email').value = o ? o.customer.email : '';

  const items = o ? o.items : [emptyItem()];
  renderItemRows(items);
  calcTotals();

  initCanvas(o ? o.drawing : null);
}

function today() {
  return new Date().toISOString().slice(0, 10);
}
function emptyItem() {
  return { code: '', name: '', spec: '', qty: 1, unit: 'EA', unitPrice: 0, amount: 0 };
}

// ── 품목 행 ──────────────────────────────────────────────────
function renderItemRows(items) {
  const tbody = document.getElementById('items-tbody');
  tbody.innerHTML = '';
  items.forEach(item => addItemRow(item));
}

function addItemRow(item = null) {
  const i = item || emptyItem();
  const tbody = document.getElementById('items-tbody');
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td><input type="text" value="${escAttr(i.code)}" placeholder="코드"></td>
    <td><input type="text" value="${escAttr(i.name)}" placeholder="품목명" required oninput="calcRow(this)"></td>
    <td><input type="text" value="${escAttr(i.spec)}" placeholder="규격"></td>
    <td><input type="number" value="${i.qty}" min="0" step="any" oninput="calcRow(this)"></td>
    <td>
      <select>
        ${['EA','BOX','KG','L','M','SET','개','본','장','매'].map(u =>
          `<option${u === i.unit ? ' selected' : ''}>${u}</option>`
        ).join('')}
      </select>
    </td>
    <td><input type="number" value="${i.unitPrice}" min="0" step="any" oninput="calcRow(this)"></td>
    <td class="td-amount">${fmt(i.amount)}</td>
    <td><button type="button" class="btn btn-danger btn-sm" onclick="removeItemRow(this)">삭제</button></td>
  `;
  tbody.appendChild(tr);
}

function removeItemRow(btn) {
  const rows = document.getElementById('items-tbody').rows;
  if (rows.length <= 1) { alert('품목은 최소 1행이 필요합니다.'); return; }
  btn.closest('tr').remove();
  calcTotals();
}

function calcRow(input) {
  const tr = input.closest('tr');
  const qty = parseFloat(tr.cells[3].querySelector('input').value) || 0;
  const unitPrice = parseFloat(tr.cells[5].querySelector('input').value) || 0;
  const amount = qty * unitPrice;
  tr.cells[6].textContent = fmt(amount);
  calcTotals();
}

function calcTotals() {
  const rows = document.getElementById('items-tbody').rows;
  let subtotal = 0;
  for (const tr of rows) {
    const qty = parseFloat(tr.cells[3].querySelector('input').value) || 0;
    const unitPrice = parseFloat(tr.cells[5].querySelector('input').value) || 0;
    subtotal += qty * unitPrice;
  }
  const vat = Math.round(subtotal * 0.1);
  const total = subtotal + vat;
  document.getElementById('t-subtotal').textContent = fmt(subtotal) + '원';
  document.getElementById('t-vat').textContent = fmt(vat) + '원';
  document.getElementById('t-total').textContent = fmt(total) + '원';
}

// ── 저장 ─────────────────────────────────────────────────────
function saveOrder() {
  const customerName = document.getElementById('f-customer-name').value.trim();
  const orderDate = document.getElementById('f-order-date').value;
  const deliveryDate = document.getElementById('f-delivery-date').value;
  if (!customerName) { alert('고객사명을 입력하세요.'); return; }
  if (!orderDate) { alert('수주일자를 입력하세요.'); return; }
  if (!deliveryDate) { alert('납기일자를 입력하세요.'); return; }

  const rows = document.getElementById('items-tbody').rows;
  const items = [];
  let hasItem = false;
  for (const tr of rows) {
    const name = tr.cells[1].querySelector('input').value.trim();
    if (!name) { alert('품목명을 입력하세요.'); return; }
    const qty = parseFloat(tr.cells[3].querySelector('input').value) || 0;
    const unitPrice = parseFloat(tr.cells[5].querySelector('input').value) || 0;
    items.push({
      code: tr.cells[0].querySelector('input').value.trim(),
      name,
      spec: tr.cells[2].querySelector('input').value.trim(),
      qty,
      unit: tr.cells[4].querySelector('select').value,
      unitPrice,
      amount: qty * unitPrice,
    });
    hasItem = true;
  }
  if (!hasItem) { alert('품목을 1개 이상 입력하세요.'); return; }

  const subtotal = items.reduce((s, i) => s + i.amount, 0);
  const vat = Math.round(subtotal * 0.1);

  const existingId = document.getElementById('f-id').value;
  const order = {
    id: existingId || document.getElementById('f-order-no').value,
    orderDate,
    deliveryDate,
    deliveryAddress: document.getElementById('f-delivery-addr').value.trim(),
    paymentTerms: document.getElementById('f-payment-terms').value,
    salesRep: document.getElementById('f-sales-rep').value.trim(),
    customer: {
      name: customerName,
      contact: document.getElementById('f-customer-contact').value.trim(),
      phone: document.getElementById('f-customer-phone').value.trim(),
      email: document.getElementById('f-customer-email').value.trim(),
    },
    items,
    subtotal,
    vat,
    total: subtotal + vat,
    drawing: getCanvasDataUrl(),
  };

  const orders = loadOrders();
  const idx = orders.findIndex(x => x.id === order.id);
  if (idx >= 0) orders[idx] = order;
  else orders.push(order);
  saveOrders(orders);

  showList();
}

// ── 삭제 ─────────────────────────────────────────────────────
function deleteOrder(id) {
  if (!confirm(`수주서 ${id}를 삭제하시겠습니까?`)) return;
  const orders = loadOrders().filter(o => o.id !== id);
  saveOrders(orders);
  renderList();
}

// ── 인쇄 ─────────────────────────────────────────────────────
function printOrder(id) {
  const o = loadOrders().find(x => x.id === id);
  if (!o) return;

  const itemRows = o.items.map((item, i) => `
    <tr>
      <td class="center">${i + 1}</td>
      <td class="center">${escHtml(item.code)}</td>
      <td>${escHtml(item.name)}</td>
      <td>${escHtml(item.spec)}</td>
      <td class="right">${fmt(item.qty)}</td>
      <td class="center">${escHtml(item.unit)}</td>
      <td class="right">${fmt(item.unitPrice)}</td>
      <td class="right">${fmt(item.amount)}</td>
    </tr>
  `).join('');

  const drawingHtml = o.drawing
    ? `<img src="${o.drawing}" style="width:100%;border:1px solid #aaa;margin-top:2mm" alt="도면">`
    : `<div style="border:1px solid #aaa;height:60mm;margin-top:2mm"></div>`;

  document.getElementById('print-view').innerHTML = `
    <div class="print-doc">
      <div class="print-title">수 주 서</div>

      <div class="print-meta">
        <span>수주번호: ${escHtml(o.id)}</span>
        <span>수주일자: ${o.orderDate}</span>
      </div>

      <table class="print-info-table">
        <tr>
          <td class="label">고객사명</td><td>${escHtml(o.customer.name)}</td>
          <td class="label">담당자</td><td>${escHtml(o.customer.contact)}</td>
        </tr>
        <tr>
          <td class="label">연락처</td><td>${escHtml(o.customer.phone)}</td>
          <td class="label">이메일</td><td>${escHtml(o.customer.email)}</td>
        </tr>
        <tr>
          <td class="label">납기일자</td><td>${o.deliveryDate}</td>
          <td class="label">납품장소</td><td>${escHtml(o.deliveryAddress)}</td>
        </tr>
        <tr>
          <td class="label">결제조건</td><td>${escHtml(o.paymentTerms)}</td>
          <td class="label">담당영업자</td><td>${escHtml(o.salesRep)}</td>
        </tr>
      </table>

      <table class="print-items-table">
        <thead>
          <tr>
            <th>No</th><th>품목코드</th><th>품목명</th><th>규격/사양</th>
            <th>수량</th><th>단위</th><th>단가</th><th>금액</th>
          </tr>
        </thead>
        <tbody>${itemRows}</tbody>
      </table>

      <div class="print-totals">
        <div class="print-totals-row"><span>공급가액</span><span>${fmt(o.subtotal)}원</span></div>
        <div class="print-totals-row"><span>부가세(10%)</span><span>${fmt(o.vat)}원</span></div>
        <div class="print-totals-row print-totals-grand"><span>총 금액</span><span>${fmt(o.total)}원</span></div>
      </div>

      <div style="font-size:10pt;margin-bottom:1mm">도면 / 비고</div>
      ${drawingHtml}

      <div class="print-sign" style="margin-top:8mm">
        <div class="print-sign-box"><div class="sign-label">담당자</div></div>
        <div class="print-sign-box"><div class="sign-label">확인</div></div>
        <div class="print-sign-box"><div class="sign-label">승인</div></div>
      </div>
    </div>
  `;

  window.print();
}

// ── Canvas 드로잉 ─────────────────────────────────────────────
let drawing = false;
let currentTool = 'pen';
let snapX = 0, snapY = 0;
let snapshot = null;

function initCanvas(dataUrl) {
  const canvas = document.getElementById('draw-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (dataUrl) {
    const img = new Image();
    img.onload = () => ctx.drawImage(img, 0, 0);
    img.src = dataUrl;
  }

  canvas.onmousedown = e => startDraw(e, canvas, ctx);
  canvas.onmousemove = e => draw(e, canvas, ctx);
  canvas.onmouseup = () => { drawing = false; };
  canvas.onmouseleave = () => { drawing = false; };

  canvas.ontouchstart = e => { e.preventDefault(); startDraw(e.touches[0], canvas, ctx); };
  canvas.ontouchmove = e => { e.preventDefault(); draw(e.touches[0], canvas, ctx); };
  canvas.ontouchend = () => { drawing = false; };
}

function getPos(e, canvas) {
  const r = canvas.getBoundingClientRect();
  return {
    x: (e.clientX - r.left) * (canvas.width / r.width),
    y: (e.clientY - r.top) * (canvas.height / r.height),
  };
}

function startDraw(e, canvas, ctx) {
  drawing = true;
  const pos = getPos(e, canvas);
  snapX = pos.x;
  snapY = pos.y;
  snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);

  if (currentTool === 'pen' || currentTool === 'eraser') {
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
  }
}

function draw(e, canvas, ctx) {
  if (!drawing) return;
  const pos = getPos(e, canvas);
  const color = document.getElementById('draw-color').value;
  const width = parseInt(document.getElementById('draw-width').value, 10);

  ctx.lineWidth = width;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  if (currentTool === 'pen') {
    ctx.strokeStyle = color;
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  } else if (currentTool === 'eraser') {
    ctx.strokeStyle = '#ffffff';
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  } else if (currentTool === 'line') {
    ctx.putImageData(snapshot, 0, 0);
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(snapX, snapY);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  } else if (currentTool === 'rect') {
    ctx.putImageData(snapshot, 0, 0);
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.strokeRect(snapX, snapY, pos.x - snapX, pos.y - snapY);
  }
}

function setTool(tool) {
  currentTool = tool;
  document.querySelectorAll('.tool-btn').forEach(b => b.classList.remove('active'));
  document.getElementById(`tool-${tool}`).classList.add('active');
}

function clearCanvas() {
  if (!confirm('도면을 초기화하시겠습니까?')) return;
  const canvas = document.getElementById('draw-canvas');
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function getCanvasDataUrl() {
  const canvas = document.getElementById('draw-canvas');
  if (!canvas) return null;
  return canvas.toDataURL('image/png');
}

// ── XSS 방지 ─────────────────────────────────────────────────
function escHtml(str) {
  return String(str || '').replace(/[&<>"']/g, c => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[c]));
}
function escAttr(str) { return escHtml(str); }

// ── 초기화 ───────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', renderList);
