/* nav.js — 공통 헤더: 모바일 메뉴, 스크롤 효과, active 링크 */
(function () {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');

  // 스크롤 시 헤더 그림자
  window.addEventListener('scroll', function () {
    if (header) header.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  // 모바일 햄버거 메뉴
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      const isOpen = nav.classList.toggle('open');
      toggle.classList.toggle('open', isOpen);
      toggle.setAttribute('aria-expanded', isOpen);
    });

    // 메뉴 바깥 클릭 시 닫기
    document.addEventListener('click', function (e) {
      if (!header.contains(e.target)) {
        nav.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // 현재 페이지 active 표시
  const currentPath = location.pathname.replace(/\/$/, '');
  document.querySelectorAll('.site-nav a').forEach(function (a) {
    const href = a.getAttribute('href').replace(/\/$/, '');
    if (href && currentPath.endsWith(href)) {
      a.classList.add('active');
    }
  });
})();
