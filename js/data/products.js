/* js/data/products.js — 제품 데이터 */
var PRODUCTS = [

  /* ===== 백필터 ===== */
  {
    id: 'bf-snapring-01',
    category: 'bagfilter',
    categoryLabel: '백필터',
    name: '스냅링 백필터 (SNAP-RING)',
    image: 'images/products/bf-snapring.jpg',
    icon: '🔗',
    summary: '원형 스냅링으로 튜브시트에 간편하게 고정하는 방식. 탈착이 빠르고 밀봉성이 우수해 국내 가장 많이 사용되는 표준형.',
    specs: {
      '고정 방식': '스냅링 (Snap-Ring)',
      '재질': 'PE·PTFE·NOMEX·PPS 선택',
      '적용 온도': '상온 ~ 260°C (원단 종류별)',
      '특징': '교체 작업 신속, 기밀 우수',
      '규격': '직경·길이 맞춤 제작',
      '생산': '전 공정 자체 생산'
    },
    industries: ['철강', '시멘트', '화학', '발전', '배터리']
  },
  {
    id: 'bf-cord-01',
    category: 'bagfilter',
    categoryLabel: '백필터',
    name: '끈 백필터 (CORD)',
    image: 'images/products/bf-cord.jpg',
    icon: '🪢',
    summary: '상단을 끈으로 묶어 고정하는 방식. 소형·간이 집진기에 주로 적용되며 구조가 단순하고 비용이 경제적.',
    specs: {
      '고정 방식': '끈 결속 (Cord)',
      '재질': 'PE·Polyester 선택',
      '적용 온도': '상온 ~ 130°C',
      '특징': '단순 구조, 낮은 단가, 소형 집진기 적합',
      '규격': '직경·길이 맞춤 제작',
      '생산': '전 공정 자체 생산'
    },
    industries: ['목재', '식품', '금속', '일반 제조']
  },
  {
    id: 'bf-oring-01',
    category: 'bagfilter',
    categoryLabel: '백필터',
    name: '고무링 백필터 (RUBBER O-RING)',
    image: 'images/products/bf-oring.jpg',
    icon: '⭕',
    summary: '고무 오링으로 튜브시트에 기밀을 유지하며 고정. 진동·충격에 강하고 분진 누설 방지에 효과적.',
    specs: {
      '고정 방식': '고무 오링 (Rubber O-Ring)',
      '재질': 'PE·PTFE·NOMEX 선택',
      '적용 온도': '상온 ~ 200°C',
      '특징': '진동 환경 강인, 밀봉성 우수',
      '규격': '직경·길이 맞춤 제작',
      '생산': '전 공정 자체 생산'
    },
    industries: ['시멘트', '철강', '화학', '반도체']
  },
  {
    id: 'bf-flange-01',
    category: 'bagfilter',
    categoryLabel: '백필터',
    name: '플랜지 백필터 (FLANGE)',
    image: 'images/products/bf-flange.jpg',
    icon: '🔩',
    summary: '플랜지 방식으로 고정하는 대형 필터백. 강한 고정력과 안정적인 기밀 유지로 대용량·고압 환경에 적합.',
    specs: {
      '고정 방식': '플랜지 (Flange)',
      '재질': 'PTFE·NOMEX·Fiberglass 선택',
      '적용 온도': '상온 ~ 300°C',
      '특징': '대형·고압 환경 적합, 고정력 탁월',
      '규격': '직경·길이 맞춤 제작',
      '생산': '전 공정 자체 생산'
    },
    industries: ['발전', '시멘트', '화학', '소각장']
  },
  {
    id: 'bf-envelope-01',
    category: 'bagfilter',
    categoryLabel: '백필터',
    name: '봉투형 백필터 (ENVELOPE)',
    image: 'images/products/bf-envelope.jpg',
    icon: '✉️',
    summary: '평판 원단을 봉투 형태로 제작하는 특수 필터. 설치 공간이 좁거나 특수한 집진기 구조에 맞춤 제작.',
    specs: {
      '형태': '평판 봉투형 (Envelope)',
      '재질': 'PE·PTFE·NOMEX·PPS 선택',
      '적용 온도': '상온 ~ 260°C (원단 종류별)',
      '특징': '협소 공간 설치 가능, 다양한 형상 제작',
      '규격': '도면 기반 맞춤 제작',
      '생산': '전 공정 자체 생산'
    },
    industries: ['식품', '제약', '금속', '목재']
  },
  {
    id: 'bf-etc-01',
    category: 'bagfilter',
    categoryLabel: '백필터',
    name: '기타 특수형 백필터 (ETC)',
    image: 'images/products/bf-etc.jpg',
    icon: '🛠️',
    summary: '위 규격 외 비표준 집진기에 맞춘 특수 형태 필터백. 도면·샘플 기반 맞춤 제작 가능.',
    specs: {
      '형태': '비표준 특수형',
      '재질': 'PE·PP·PTFE·NOMEX·PPS 등 전 재질',
      '적용 온도': '원단 종류에 따라 상이',
      '특징': '도면·샘플 제공 시 동일 규격 제작',
      '규격': '완전 맞춤 제작',
      '생산': '전 공정 자체 생산'
    },
    industries: ['전 산업군']
  },

  /* ===== 원단 종류 ===== */
  {
    id: 'fabric-pe-01',
    category: 'fabric',
    categoryLabel: '원단 종류',
    name: 'PE(Polyester)',
    image: 'images/products/fabric-pe.jpg',
    icon: '🧵',
    summary: '가장 범용적인 필터 원단. 내산·내알칼리성이 우수하고 경제적인 비용으로 안정적인 여과 성능을 제공합니다.',
    specs: {
      '소재': 'Polyester (폴리에스터) 니들펀칭 펠트',
      '사용 온도': '상온 ~ 130°C (연속), 150°C (순간)',
      '포집 효율': '99.5% 이상',
      '면밀도': '350 ~ 600 g/m²',
      '표면 처리': '소결(Singeing), 캘린더링(Calendering) 가능',
      '특징': '범용성 최고, 가성비 우수, 내산·내알칼리'
    },
    industries: ['식품', '목재', '금속', '일반 제조', '시멘트']
  },
  {
    id: 'fabric-pp-01',
    category: 'fabric',
    categoryLabel: '원단 종류',
    name: 'PP(Polypropylene)',
    image: 'images/products/fabric-pp.jpg',
    icon: '🧪',
    summary: '강산·강알칼리 환경에서 탁월한 내화학성을 발휘하는 원단. 액상 분진이나 습윤 환경의 집진기에 적합합니다.',
    specs: {
      '소재': 'Polypropylene (폴리프로필렌) 니들펀칭 펠트',
      '사용 온도': '상온 ~ 90°C (연속)',
      '포집 효율': '99.5% 이상',
      '면밀도': '350 ~ 550 g/m²',
      '내화학성': '강산·강알칼리 탁월, 용제 저항성 우수',
      '특징': '내화학성 최우수, 습윤 환경 적합, 경량'
    },
    industries: ['화학', '제약', '식품', '도금', '오수처리']
  },
  {
    id: 'fabric-ptfe-01',
    category: 'fabric',
    categoryLabel: '원단 종류',
    name: 'PTFE(테프론)',
    image: 'images/products/fabric-ptfe.jpg',
    icon: '⚗️',
    summary: '내화학성·내열성이 가장 뛰어난 프리미엄 원단. 고온·부식성 가스 환경에서도 99.99% 이상의 포집 효율을 유지합니다.',
    specs: {
      '소재': 'PTFE 섬유 + Polyester/Glass 기포',
      '사용 온도': '상온 ~ 260°C (연속)',
      '포집 효율': '99.99% 이상',
      '면밀도': '500 ~ 800 g/m²',
      '내화학성': '산·알칼리·용제 모든 환경 탁월',
      '특징': '최고 내열·내화학, 프리미엄 등급, 초장수명'
    },
    industries: ['화학', '발전', '소각', '반도체', '제약']
  },
  {
    id: 'fabric-pps-01',
    category: 'fabric',
    categoryLabel: '원단 종류',
    name: 'PPS(Polyphenylene Sulfide)',
    image: 'images/products/fabric-pps.jpg',
    icon: '🔥',
    summary: '160~190°C 고온 환경에서 내열성과 내화학성을 동시에 확보. 석탄 보일러·소각로·시멘트 킬른에 최적화된 원단입니다.',
    specs: {
      '소재': 'PPS (폴리페닐렌설파이드) 니들펀칭 펠트',
      '사용 온도': '160 ~ 190°C (연속), 200°C (순간)',
      '포집 효율': '99.5% 이상',
      '면밀도': '450 ~ 700 g/m²',
      '내화학성': '산·알칼리·유기용제 내구성 우수',
      '특징': '고온+내화학 동시 확보, 난연성'
    },
    industries: ['발전', '소각', '화학', '시멘트', '철강']
  },
  {
    id: 'fabric-nomex-01',
    category: 'fabric',
    categoryLabel: '원단 종류',
    name: 'NOMEX(메타-아라미드)',
    image: 'images/products/fabric-nomex.jpg',
    icon: '🌡️',
    summary: '200°C 이상 고온 연속 운전에 특화된 아라미드 섬유 원단. 철강·시멘트 킬른·아스팔트 플랜트 등 혹독한 고온 환경에 사용됩니다.',
    specs: {
      '소재': 'NOMEX (Meta-Aramid) 니들펀칭 펠트',
      '사용 온도': '200°C (연속), 220°C (순간)',
      '포집 효율': '99.5% 이상',
      '면밀도': '500 ~ 750 g/m²',
      '내열성': '탁월한 고온 치수 안정성, 저열수축',
      '특징': '고온 특화, 내마모성·인장강도 우수'
    },
    industries: ['시멘트', '철강', '유리', '아스팔트', '도자기']
  },

  /* ===== 수처리필터 ===== */
  {
    id: 'wf-strainer-01',
    category: 'water',
    categoryLabel: '수처리필터',
    name: '산업용 스트레이너 필터',
    image: 'images/products/wf-strainer.jpg',
    icon: '💧',
    summary: '배관 내 이물질 제거용 1차 필터. Y형·T형·바스켓형 선택 가능.',
    specs: {
      '여과 정도': '50 ~ 3,000 μm',
      '사용 압력': '최대 16 bar',
      '재질': 'SUS304, SUS316L, Carbon Steel',
      '연결 방식': '플랜지형, 나사형',
      '세척 방식': '수동 역세척, 자동 역세척(옵션)',
      '용도': '냉각수, 공업용수, 원수 전처리'
    },
    industries: ['화학', '발전', '철강', '식품', '제약']
  },
  {
    id: 'wf-membrane-01',
    category: 'water',
    categoryLabel: '수처리필터',
    name: '정밀여과 멤브레인 필터',
    image: 'images/products/wf-membrane.jpg',
    icon: '🌊',
    summary: '0.1~0.45μm 정밀 여과. 박테리아·미립자 완전 제거, 공업용수 청정화.',
    specs: {
      '여과 정도': '0.1 ~ 0.45 μm',
      '재질': 'PP, PVDF, PTFE',
      '최고 사용 온도': '80°C (PP), 140°C (PTFE)',
      '규격': '10", 20", 30", 40" (주문 제작)',
      '연결': '222, 226, DOE',
      '용도': '공업용수 정제, 식품·제약 공정수'
    },
    industries: ['제약', '식품', '반도체', '화학']
  },
  {
    id: 'wf-bag-01',
    category: 'water',
    categoryLabel: '수처리필터',
    name: '액체용 필터백 (Liquid Filter Bag)',
    image: 'images/products/wf-bag.jpg',
    icon: '🫧',
    summary: '액체 배관 내 이물질·슬러지 제거. 대유량 처리에 경제적인 백 필터.',
    specs: {
      '여과 정도': '1 ~ 200 μm',
      '재질': 'PE, PP, Nylon, PTFE',
      '최고 사용 온도': '140°C',
      '규격': '#1, #2, #3, #4 (주문 제작)',
      '처리 유량': '최대 500 m³/hr (하우징 사양별)',
      '용도': '도료·코팅액, 오일, 냉각수, 폐수 전처리'
    },
    industries: ['화학', '도장', '식품', '철강', '제지']
  },

  /* ===== 집진기 부품 ===== */
  {
    id: 'parts-bag-poly-01',
    category: 'parts',
    categoryLabel: '집진기 부품',
    name: '폴리에스터 필터백',
    image: 'images/products/parts-bag-poly.jpg',
    icon: '🧵',
    summary: '가장 범용적인 필터백. 내산성·내알칼리성 우수, 경제적 비용으로 안정적 성능.',
    specs: {
      '재질': 'Polyester Felt',
      '최고 사용 온도': '130°C (연속), 150°C (순간)',
      '포집 효율': '99.5% 이상',
      '표면 처리': '소결(Singeing), 캘린더링(Calendering) 가능',
      '규격': '직경 120~160mm, 길이 2~6m (주문 제작)',
      '생산': '외주 없이 자체 생산'
    },
    industries: ['식품', '목재', '금속', '일반 제조']
  },
  {
    id: 'parts-bag-ptfe-01',
    category: 'parts',
    categoryLabel: '집진기 부품',
    name: 'PTFE 필터백',
    image: 'images/products/parts-bag-ptfe.jpg',
    icon: '⚙️',
    summary: '고온·고습·부식성 가스 환경 최적화. 포집 효율 99.99% 이상의 프리미엄 필터백.',
    specs: {
      '재질': 'PTFE Membrane + Polyester/Glass 기포',
      '최고 사용 온도': '260°C (연속)',
      '포집 효율': '99.99% 이상',
      '내화학성': '산·알칼리·용제 탁월한 내구성',
      '규격': '직경 120~160mm, 길이 2~6m (주문 제작)',
      '생산': '외주 없이 자체 생산'
    },
    industries: ['화학', '발전', '제약', '반도체', '소각']
  },
  {
    id: 'parts-bag-nomex-01',
    category: 'parts',
    categoryLabel: '집진기 부품',
    name: '노멕스 필터백',
    image: 'images/products/parts-bag-nomex.jpg',
    icon: '🔥',
    summary: '200°C 이상 고온 연속 운전 가능. 철강·시멘트 킬른 등 혹독한 환경에 특화.',
    specs: {
      '재질': 'Nomex (Meta-Aramid)',
      '최고 사용 온도': '200°C (연속), 220°C (순간)',
      '포집 효율': '99.5% 이상',
      '내열성': '탁월한 고온 치수 안정성',
      '규격': '직경 120~160mm, 길이 2~6m (주문 제작)',
      '생산': '외주 없이 자체 생산'
    },
    industries: ['시멘트', '철강', '유리', '도자기']
  },
  {
    id: 'parts-mesh-01',
    category: 'parts',
    categoryLabel: '집진기 부품',
    name: '메쉬망 150 필터',
    image: 'images/products/parts-mesh.jpg',
    icon: '🕸️',
    summary: '자체 생산 라인에서 직접 제작. 약 100μm 미세 입자까지 여과 가능.',
    specs: {
      '메쉬 규격': '150 Mesh (약 100μm 여과)',
      '소재': '폴리에스터 모노필라멘트',
      '특징': '세척 후 반복 사용 가능, 균일한 직조 구조',
      '생산 방식': '외주 없이 자체 생산',
      '커스텀': '규격 맞춤 제작 가능',
      '용도': '식품·화학·도료·집진 전처리·분체 공정'
    },
    industries: ['식품', '화학', '도료', '분체', '제약']
  },
  {
    id: 'parts-cage-01',
    category: 'parts',
    categoryLabel: '집진기 부품',
    name: '필터 케이지 (Filter Cage)',
    image: 'images/products/parts-cage.jpg',
    icon: '🗂️',
    summary: '필터백 형태 유지를 위한 금속 지지대. 스파이럴 및 용접형 선택 가능.',
    specs: {
      '재질': 'Carbon Steel (아연도금), Stainless 304/316',
      '표면 처리': '아연 도금, 에폭시 코팅, 실리콘 코팅',
      '링 수': '10 ~ 30링 (길이별)',
      '규격': '직경 115~155mm, 길이 2~6m (주문 제작)',
      '특징': '내식성 강화 코팅 옵션 가능'
    },
    industries: ['철강', '시멘트', '화학', '발전']
  },
  {
    id: 'parts-valve-01',
    category: 'parts',
    categoryLabel: '집진기 부품',
    name: '솔레노이드 밸브 & 다이어프램',
    image: 'images/products/parts-valve.jpg',
    icon: '🔌',
    summary: '펄스 제트 방식 탈진에 사용되는 핵심 소모품. 주요 메이커 호환 재고 보유.',
    specs: {
      '적용': '펄스 제트 백필터 탈진 시스템',
      '호환 메이커': 'Goyen, Pentair, 국산 동급',
      '규격': '1인치, 1.5인치, 2인치',
      '재질': 'Aluminum Body, Buna-N Diaphragm',
      '재고': '주요 규격 상시 재고',
      '출고': '주문 당일 출고 가능'
    },
    industries: ['전 산업군 (펄스 제트 방식 운영 현장)']
  },
  {
    id: 'parts-manometer-01',
    category: 'parts',
    categoryLabel: '집진기 부품',
    name: '마노미터 & 차압계',
    image: 'images/products/parts-manometer.jpg',
    icon: '📊',
    summary: '백필터 차압 모니터링용 압력계. 아날로그·디지털 모델 보유.',
    specs: {
      '측정 범위': '0~500 mmAq (아날로그), 디지털 맞춤',
      '연결부': '1/8인치, 1/4인치 NPT',
      '재질': 'Aluminum + ABS',
      '정확도': '±2% FS',
      '재고': '상시 보유',
      '출고': '주문 다음 날 출고'
    },
    industries: ['전 산업군']
  }
];
