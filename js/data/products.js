/* js/data/products.js — 제품 데이터 */
var PRODUCTS = [
  {
    id: 'bf-pulse-01',
    category: 'housing',
    categoryLabel: '백필터 하우징',
    name: '펄스 제트 백필터 (Pulse Jet Bag Filter)',
    icon: '🔧',
    summary: '압축공기 역기류 탈진 방식. 운전 중 연속 탈진 가능하여 가동 중단 불필요.',
    specs: {
      '포집 효율': '99.9% 이상',
      '처리 풍량': '1,000 ~ 100,000 m³/hr',
      '운전 온도': '상온 ~ 200°C (내열 타입 260°C)',
      '탈진 방식': 'Pulse Jet (압축공기)',
      '필터백 재질': 'Polyester, PPS, PTFE, Nomex',
      '차압 관리': '자동 타이머 / 차압 센서 방식'
    },
    industries: ['철강', '시멘트', '화학', '발전', '제지']
  },
  {
    id: 'bf-shaker-01',
    category: 'housing',
    categoryLabel: '백필터 하우징',
    name: '쉐이커 백필터 (Shaker Bag Filter)',
    icon: '🔩',
    summary: '기계적 진동으로 필터백 탈진. 소용량·저농도 분진에 적합한 경제적 솔루션.',
    specs: {
      '포집 효율': '99.5% 이상',
      '처리 풍량': '500 ~ 30,000 m³/hr',
      '운전 온도': '상온 ~ 120°C',
      '탈진 방식': '기계적 진동 (Shaker)',
      '필터백 재질': 'Polyester, Acrylic',
      '특징': '구조 단순, 유지보수 용이'
    },
    industries: ['식품', '목재', '금속', '일반 제조']
  },
  {
    id: 'bf-reverse-01',
    category: 'housing',
    categoryLabel: '백필터 하우징',
    name: '역기류 백필터 (Reverse Air Bag Filter)',
    icon: '🏭',
    summary: '역방향 공기로 탈진. 필터백 손상 최소화, 고온·대용량 집진에 최적.',
    specs: {
      '포집 효율': '99.9% 이상',
      '처리 풍량': '10,000 ~ 500,000 m³/hr',
      '운전 온도': '상온 ~ 300°C',
      '탈진 방식': '역기류 (Reverse Air)',
      '필터백 재질': 'Fiberglass, PTFE, Nomex',
      '특징': '대형 발전소·시멘트 킬른 적용'
    },
    industries: ['발전', '시멘트', '철강', '화학']
  },
  {
    id: 'bag-poly-01',
    category: 'bag',
    categoryLabel: '필터백',
    name: '폴리에스터 필터백 (Polyester Felt Bag)',
    icon: '🧵',
    summary: '가장 범용적인 필터백. 내산성·내알칼리성 우수. 경제적 비용으로 안정적 성능.',
    specs: {
      '재질': 'Polyester Felt',
      '최고 사용 온도': '130°C (연속), 150°C (순간)',
      '포집 효율': '99.5% 이상',
      '표면 처리': '소결(Singeing), 캘린더링(Calendering) 가능',
      '규격': '직경 120~160mm, 길이 2~6m (주문 제작)',
      '용도': '일반 산업 집진 (목재, 식품, 일반 분진)'
    },
    industries: ['식품', '목재', '금속', '일반 제조', '시멘트']
  },
  {
    id: 'bag-ptfe-01',
    category: 'bag',
    categoryLabel: '필터백',
    name: 'PTFE 나노섬유 필터백',
    icon: '⚙️',
    summary: '고온·고습·부식성 가스 환경 최적화. 포집 효율 99.99% 이상의 프리미엄 필터백.',
    specs: {
      '재질': 'PTFE Membrane + Polyester/Glass 기포',
      '최고 사용 온도': '260°C (연속)',
      '포집 효율': '99.99% 이상',
      '내화학성': '산·알칼리·용제 탁월한 내구성',
      '규격': '직경 120~160mm, 길이 2~6m (주문 제작)',
      '용도': '화학 공장, 소각로, 반도체 제조'
    },
    industries: ['화학', '발전', '제약', '반도체', '소각']
  },
  {
    id: 'bag-nomex-01',
    category: 'bag',
    categoryLabel: '필터백',
    name: '노멕스 필터백 (Nomex/Aramid Bag)',
    icon: '🔥',
    summary: '200°C 이상 고온 연속 운전 가능. 철강·시멘트 킬른 등 혹독한 환경에 특화.',
    specs: {
      '재질': 'Nomex (Meta-Aramid)',
      '최고 사용 온도': '200°C (연속), 220°C (순간)',
      '포집 효율': '99.5% 이상',
      '내열성': '탁월한 고온 치수 안정성',
      '규격': '직경 120~160mm, 길이 2~6m (주문 제작)',
      '용도': '시멘트 킬른, 용광로, 드라이어'
    },
    industries: ['시멘트', '철강', '유리', '도자기']
  },
  {
    id: 'cage-01',
    category: 'cage',
    categoryLabel: '케이지',
    name: '필터 케이지 (Filter Cage)',
    icon: '🗂️',
    summary: '필터백 형태 유지를 위한 금속 지지대. 스파이럴 및 용접형 선택 가능.',
    specs: {
      '재질': 'Carbon Steel (아연도금), Stainless 304/316',
      '표면 처리': '아연 도금, 에폭시 코팅, 실리콘 코팅',
      '링 수': '10 ~ 30링 (길이별)',
      '규격': '직경 115~155mm, 길이 2~6m (주문 제작)',
      '특징': '내식성 강화 코팅 옵션 가능'
    },
    industries: ['철강', '시멘트', '화학', '발전', '식품']
  },
  {
    id: 'system-01',
    category: 'system',
    categoryLabel: '집진 시스템',
    name: '집진 시스템 일체형 (Turnkey)',
    icon: '🏗️',
    summary: '백필터 하우징+팬+덕트+후드+제어반 포함 턴키 공급. 설계부터 시운전까지 일괄.',
    specs: {
      '구성': '백필터 본체 + 집진 팬 + 덕트 + 후드 + 제어반',
      '처리 풍량': '1,000 ~ 100,000 m³/hr',
      '제어 방식': 'PLC 자동 제어 (차압 연동)',
      '설치 지원': '현장 설치·시운전 포함',
      '납기': '설계 완료 후 8~12주',
      '보증': '1년 품질 보증'
    },
    industries: ['철강', '시멘트', '화학', '발전', '식품', '제지']
  },
  {
    id: 'parts-valve-01',
    category: 'parts',
    categoryLabel: 'A/S 부품',
    name: '솔레노이드 밸브 & 다이어프램',
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
    categoryLabel: 'A/S 부품',
    name: '마노미터 & 차압계',
    icon: '📊',
    summary: '백필터 차압 모니터링용 압력계. 아날로그·디지털 모델 보유.',
    specs: {
      '측정 범위': '0~500 mmAq (아날로그), 디지털 맞춤',
      '연결부': '1/8인치, 1/4인치 NPT',
      '재질': ' Aluminum + ABS',
      '정확도': '±2% FS',
      '재고': '상시 보유',
      '출고': '주문 다음 날 출고'
    },
    industries: ['전 산업군']
  }
];
