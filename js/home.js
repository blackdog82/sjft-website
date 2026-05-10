/* home.js — 카운터 애니메이션, 스크롤 reveal, 히어로 파티클 */
(function () {
  // 히어로 파티클 생성
  var container = document.getElementById('heroParticles');
  if (container) {
    var count = 22;
    for (var i = 0; i < count; i++) {
      var p = document.createElement('span');
      p.className = 'hero-particle';
      var size = Math.random() * 5 + 2;          // 2~7px
      var left = Math.random() * 100;             // 0~100%
      var delay = Math.random() * 14;             // 0~14s 랜덤 시작
      var duration = Math.random() * 10 + 10;    // 10~20s 부유 시간
      var opacity = Math.random() * 0.4 + 0.2;   // 0.2~0.6
      p.style.cssText =
        'width:' + size + 'px;' +
        'height:' + size + 'px;' +
        'left:' + left + '%;' +
        'bottom:0;' +
        'opacity:0;' +
        'background:rgba(255,255,255,' + opacity + ');' +
        'animation-duration:' + duration + 's;' +
        'animation-delay:' + delay + 's;';
      container.appendChild(p);
    }
  }


  // IntersectionObserver: .reveal 요소 등장 애니메이션
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(function (el) {
    observer.observe(el);
  });

  // 카운터 애니메이션
  var counters = document.querySelectorAll('.stat-num[data-target]');
  var counted = false;

  function runCounters() {
    if (counted) return;
    var visible = Array.from(counters).some(function (el) {
      var rect = el.getBoundingClientRect();
      return rect.top < window.innerHeight - 40;
    });
    if (!visible) return;
    counted = true;

    counters.forEach(function (el) {
      var target = parseInt(el.dataset.target, 10);
      var duration = 1400;
      var start = null;

      function step(ts) {
        if (!start) start = ts;
        var progress = Math.min((ts - start) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target);
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = target;
      }
      requestAnimationFrame(step);
    });
  }

  window.addEventListener('scroll', runCounters, { passive: true });
  runCounters();
})();
