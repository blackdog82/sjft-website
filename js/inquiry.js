/* inquiry.js — 폼 검증, EmailJS 전송, localStorage 이력 */
(function () {
  var STORAGE_KEY = 'bf_inquiries';

  // ── EmailJS 설정 (실제 값으로 교체 필요) ──────────────────
  var EMAILJS = {
    publicKey:  'YOUR_PUBLIC_KEY',   // emailjs.com → Account → Public Key
    serviceId:  'service_xxxxxxx',   // Email Services에서 생성한 ID
    templateId: 'template_xxxxxxx',  // Email Templates에서 생성한 ID
  };
  // ─────────────────────────────────────────────────────────

  var useEmailJS = EMAILJS.publicKey !== 'YOUR_PUBLIC_KEY';
  if (useEmailJS && typeof emailjs !== 'undefined') {
    emailjs.init(EMAILJS.publicKey);
  }

  // URL 파라미터로 제품 자동 선택
  (function () {
    var params = new URLSearchParams(location.search);
    var pid = params.get('product');
    if (!pid || typeof PRODUCTS === 'undefined') return;
    var prod = PRODUCTS.find(function (p) { return p.id === pid; });
    if (!prod) return;
    var boxes = document.querySelectorAll('#productCheckboxes input[type=checkbox]');
    boxes.forEach(function (cb) {
      if (cb.value === prod.name.split(' (')[0] || prod.name.includes(cb.value)) {
        cb.checked = true;
      }
    });
  })();

  // 문의 유형 변경 시 견적 사양 필드 표시/숨김
  document.querySelectorAll('input[name="inquiry_type"]').forEach(function (radio) {
    radio.addEventListener('change', function () {
      var specFields = document.getElementById('specFields');
      specFields.style.display = this.value === '견적 문의' ? '' : 'none';
    });
  });

  // ── 유효성 검사 ────────────────────────────────────────────
  function setErr(id, msg) {
    var el = document.getElementById('err-' + id);
    if (el) el.textContent = msg;
  }
  function clearErrs() {
    ['company', 'contact', 'phone', 'email', 'message', 'privacy'].forEach(function (k) {
      setErr(k, '');
    });
    document.querySelectorAll('.error').forEach(function (el) { el.classList.remove('error'); });
  }

  function validate(data) {
    var ok = true;
    if (!data.company_name.trim()) { setErr('company', '회사명을 입력해 주세요.'); document.getElementById('companyName').classList.add('error'); ok = false; }
    if (!data.contact_name.trim()) { setErr('contact', '담당자명을 입력해 주세요.'); document.getElementById('contactName').classList.add('error'); ok = false; }
    if (!data.phone.trim()) { setErr('phone', '연락처를 입력해 주세요.'); document.getElementById('phone').classList.add('error'); ok = false; }
    var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(data.reply_to)) { setErr('email', '올바른 이메일 주소를 입력해 주세요.'); document.getElementById('email').classList.add('error'); ok = false; }
    if (!data.message.trim()) { setErr('message', '문의 내용을 입력해 주세요.'); document.getElementById('message').classList.add('error'); ok = false; }
    if (!document.getElementById('privacyCheck').checked) { setErr('privacy', '개인정보 수집에 동의해 주세요.'); ok = false; }
    return ok;
  }

  // ── localStorage 저장 & 이력 렌더링 ──────────────────────
  function saveInquiry(data) {
    var list = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    list.unshift({
      id: Date.now(),
      company: data.company_name,
      type: data.inquiry_type,
      submittedAt: new Date().toLocaleString('ko-KR')
    });
    if (list.length > 20) list = list.slice(0, 20);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  }

  function renderHistory() {
    var list = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    var section = document.getElementById('historySection');
    var container = document.getElementById('historyList');
    if (!list.length) { section.style.display = 'none'; return; }
    section.style.display = '';
    container.innerHTML = list.map(function (item) {
      return '<div class="history-item">' +
        '<div class="history-item-info">' +
          '<h4>' + escHtml(item.company) + '</h4>' +
          '<p>' + escHtml(item.type) + '</p>' +
        '</div>' +
        '<span class="history-date">' + escHtml(item.submittedAt) + '</span>' +
      '</div>';
    }).join('');
  }

  function escHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  // ── 폼 제출 ──────────────────────────────────────────────
  document.getElementById('inquiryForm').addEventListener('submit', function (e) {
    e.preventDefault();
    clearErrs();

    var form = e.target;
    var checkedProducts = Array.from(form.querySelectorAll('input[name="products"]:checked'))
      .map(function (cb) { return cb.value; }).join(', ') || '미선택';

    var data = {
      company_name:      form.company_name.value,
      contact_name:      form.contact_name.value,
      phone:             form.phone.value,
      reply_to:          form.reply_to.value,
      inquiry_type:      form.inquiry_type.value,
      products_of_interest: checkedProducts,
      gas_volume:        (form.gas_volume && form.gas_volume.value) || '-',
      dust_type:         (form.dust_type && form.dust_type.value) || '-',
      temperature:       (form.temperature && form.temperature.value) || '-',
      install_location:  (form.install_location && form.install_location.value) || '-',
      message:           form.message.value,
      submitted_at:      new Date().toLocaleString('ko-KR')
    };

    if (!validate(data)) return;

    var btn = document.getElementById('submitBtn');
    btn.disabled = true;
    btn.textContent = '전송 중...';

    function onSuccess() {
      saveInquiry(data);
      document.getElementById('formWrap').style.display = 'none';
      document.getElementById('formSuccess').style.display = 'block';
      renderHistory();
      btn.disabled = false;
      btn.textContent = '문의 전송';
    }

    function onError(msg) {
      alert('전송 중 오류가 발생했습니다. 직접 연락해 주세요.\n전화: 02-0000-0000\n이메일: info@kbagfilter.com\n\n(' + (msg || '알 수 없는 오류') + ')');
      btn.disabled = false;
      btn.textContent = '문의 전송';
    }

    if (useEmailJS && typeof emailjs !== 'undefined') {
      emailjs.send(EMAILJS.serviceId, EMAILJS.templateId, data)
        .then(onSuccess, function (err) { onError(err.text); });
    } else {
      // EmailJS 미설정 시 로컬 저장만 (개발/테스트용)
      setTimeout(onSuccess, 600);
    }
  });

  // 폼 초기화
  window.resetForm = function () {
    document.getElementById('inquiryForm').reset();
    clearErrs();
    document.getElementById('formWrap').style.display = '';
    document.getElementById('formSuccess').style.display = 'none';
    document.getElementById('specFields').style.display = '';
  };

  renderHistory();
})();
