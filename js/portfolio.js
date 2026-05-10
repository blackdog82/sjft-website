/* portfolio.js — 납품 실적 필터 및 카드 렌더링 */
(function () {
  var currentInd = 'all';
  var currentYear = 'all';

  var INDUSTRY_COLORS = {
    '철강': '#b0c4de', '시멘트': '#d2b48c', '화학': '#98d8c8',
    '발전': '#f4c97e', '식품': '#b8e6b8', '제지': '#c8d8e8',
    '금속': '#d8c8e8', '기타': '#e8d8c8'
  };

  function escHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function yearGroup(year) {
    if (year >= 2022) return '2022';
    if (year >= 2018) return '2018';
    return '2005';
  }

  function filtered() {
    return PORTFOLIO.filter(function (p) {
      var indOk = currentInd === 'all' || p.industry === currentInd;
      var yearOk = currentYear === 'all' || yearGroup(p.year) === currentYear;
      return indOk && yearOk;
    });
  }

  function render() {
    var list = filtered();
    var grid = document.getElementById('portfolioGrid');
    var statEl = document.getElementById('statTotal');
    if (statEl) statEl.textContent = list.length;

    if (!list.length) {
      grid.innerHTML = '<div class="no-results">해당 조건의 납품 실적이 없습니다.</div>';
      return;
    }

    grid.innerHTML = list.map(function (p) {
      var color = INDUSTRY_COLORS[p.industry] || '#c8d3df';
      return '<div class="port-card" style="border-left-color:' + color + '">' +
        '<div class="port-card-header">' +
          '<span class="port-client">' + escHtml(p.client) + '</span>' +
          '<span class="port-year">' + escHtml(String(p.year)) + '</span>' +
        '</div>' +
        '<div>' +
          '<span class="badge">' + escHtml(p.industry) + '</span>' +
        '</div>' +
        '<div class="port-product">' + escHtml(p.product) + '</div>' +
        '<div class="port-achievement">✓ ' + escHtml(p.achievement) + '</div>' +
      '</div>';
    }).join('');
  }

  // 산업 필터
  document.getElementById('industryFilter').addEventListener('click', function (e) {
    var btn = e.target.closest('.port-filter-btn');
    if (!btn) return;
    document.querySelectorAll('#industryFilter .port-filter-btn').forEach(function (b) { b.classList.remove('active'); });
    btn.classList.add('active');
    currentInd = btn.dataset.ind;
    render();
  });

  // 연도 필터
  document.getElementById('yearFilter').addEventListener('click', function (e) {
    var btn = e.target.closest('.port-filter-btn');
    if (!btn) return;
    document.querySelectorAll('#yearFilter .port-filter-btn').forEach(function (b) { b.classList.remove('active'); });
    btn.classList.add('active');
    currentYear = btn.dataset.year;
    render();
  });

  render();
})();
