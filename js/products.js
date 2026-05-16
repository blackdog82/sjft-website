/* products.js — 제품 카탈로그 필터, 검색, 모달 */
(function () {
  var currentCat = 'all';
  var currentSearch = '';

  function escHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function renderCards() {
    var grid = document.getElementById('productGrid');
    var list = PRODUCTS.filter(function (p) {
      var catOk = currentCat === 'all' || p.category === currentCat;
      var q = currentSearch.toLowerCase();
      var searchOk = !q ||
        p.name.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        p.categoryLabel.toLowerCase().includes(q);
      return catOk && searchOk;
    });

    if (!list.length) {
      grid.innerHTML = '<div class="no-results">검색 결과가 없습니다.</div>';
      return;
    }

    grid.innerHTML = list.map(function (p) {
      var fabricOverlay = (p.category === 'fabric')
        ? '<div class="fabric-overlay"><div class="fabric-overlay-text">' + escHtml(p.name) + '</div></div>'
        : '';
    var imgHtml = p.image
        ? '<img src="' + escHtml(p.image) + '" alt="' + escHtml(p.name) + '" onerror="this.style.display=\'none\'">' + fabricOverlay
        : '<div class="img-placeholder"><span>' + escHtml(p.categoryLabel) + '</span></div>';
      return '<div class="prod-card">' +
        '<div class="prod-card-img">' + imgHtml + '</div>' +
        '<div class="prod-card-body">' +
          '<div class="prod-cat-badge"><span class="badge">' + escHtml(p.categoryLabel) + '</span></div>' +
          '<h3>' + escHtml(p.name) + '</h3>' +
          '<p>' + escHtml(p.summary) + '</p>' +
          '<div class="prod-card-footer">' +
            '<button class="btn btn-sm" style="border:1.5px solid var(--color-border);color:var(--color-text-sub)" onclick="openModal(\'' + escHtml(p.id) + '\')">상세 보기</button>' +
            '<a href="inquiry.html?product=' + escHtml(p.id) + '" class="btn btn-primary btn-sm">견적 문의</a>' +
          '</div>' +
        '</div>' +
      '</div>';
    }).join('');
  }

  // Filter tabs
  document.getElementById('filterTabs').addEventListener('click', function (e) {
    var btn = e.target.closest('.filter-tab');
    if (!btn) return;
    document.querySelectorAll('.filter-tab').forEach(function (t) { t.classList.remove('active'); });
    btn.classList.add('active');
    currentCat = btn.dataset.cat;
    renderCards();
  });

  // Search
  document.getElementById('searchInput').addEventListener('input', function (e) {
    currentSearch = e.target.value;
    renderCards();
  });

  // Modal
  var overlay = document.getElementById('modalOverlay');
  var modalTitle = document.getElementById('modalTitle');
  var modalBody = document.getElementById('modalBody');
  var modalInquiryBtn = document.getElementById('modalInquiryBtn');

  window.openModal = function (id) {
    var p = PRODUCTS.find(function (x) { return x.id === id; });
    if (!p) return;

    modalTitle.textContent = p.name;
    modalInquiryBtn.href = 'inquiry.html?product=' + id;

    var specRows = Object.entries(p.specs).map(function (entry) {
      return '<tr><th>' + escHtml(entry[0]) + '</th><td>' + escHtml(entry[1]) + '</td></tr>';
    }).join('');

    var industryTags = p.industries.map(function (ind) {
      return '<span class="badge">' + escHtml(ind) + '</span>';
    }).join('');

    modalBody.innerHTML =
      '<h4>제품 사양</h4>' +
      '<table class="spec-table"><tbody>' + specRows + '</tbody></table>' +
      '<h4>적용 산업 분야</h4>' +
      '<div class="industry-tags">' + industryTags + '</div>' +
      '<p style="font-size:0.83rem;color:var(--color-text-sub)">' + escHtml(p.summary) + '</p>';

    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  function closeModal() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.getElementById('modalClose').addEventListener('click', closeModal);
  document.getElementById('modalCloseBtn').addEventListener('click', closeModal);
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeModal();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeModal();
  });

  renderCards();
})();
