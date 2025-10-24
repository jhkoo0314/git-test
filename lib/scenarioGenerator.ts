/**
 * AI 경매 시나리오 생성 엔진
 * 템플릿과 알고리즘을 기반으로 무한히 다양한 경매 시나리오를 생성합니다.
 */

import {
  formatDate,
  formatDateKorean,
  generateRandomPastDate,
} from "./dateUtils";

// 타입 정의
export interface ScenarioParams {
  propertyType: "apartment" | "villa" | "commercial" | "land";
  difficulty: "easy" | "medium" | "hard";
  learningGoal: "daehanglyek" | "malso" | "baedang" | "seonsoonsun" | "total";
  capital: "under100" | "under300" | "over300";
}

export interface GeneratedScenario {
  caseId: string;
  propertyInfo: {
    type: string;
    address: string;
    area: string;
    appraisalValue: number;
    minimumBid: number;
  };
  documents: {
    saleNotice: {
      courtName: string;
      caseNumber: string;
      saleDate: string;
      propertyDetails: string;
    };
    registry: {
      gapgu: Array<{
        date: string;
        type: string;
        holder: string;
        details: string;
      }>;
      eulgoo: Array<{
        date: string;
        rank: number;
        type: string;
        amount: number;
        holder: string;
      }>;
    };
    statusReport: {
      occupancy: string;
      tenants: Array<{
        name: string;
        deposit: number;
        contractDate: string;
        moveInDate: string;
        confirmDate?: string;
      }>;
    };
  };
  correctAnswer: {
    malsoGijun: string;
    malsoRights: string[];
    insuRights: string[];
    expectedCost: number;
    profitAnalysis: string;
    keyLearning: string;
  };
}

// ========== 템플릿 데이터 ==========

// 서울 25개 구
const SEOUL_DISTRICTS = [
  "강남구",
  "강동구",
  "강북구",
  "강서구",
  "관악구",
  "광진구",
  "구로구",
  "금천구",
  "노원구",
  "도봉구",
  "동대문구",
  "동작구",
  "마포구",
  "서대문구",
  "서초구",
  "성동구",
  "성북구",
  "송파구",
  "양천구",
  "영등포구",
  "용산구",
  "은평구",
  "종로구",
  "중구",
  "중랑구",
];

// 주요 동 이름
const DONG_NAMES = [
  "역삼동",
  "삼성동",
  "대치동",
  "압구정동",
  "청담동",
  "신사동",
  "잠실동",
  "방이동",
  "송파동",
  "문정동",
  "가락동",
  "신림동",
  "봉천동",
  "남현동",
  "중계동",
  "공릉동",
  "상계동",
  "화곡동",
  "목동",
  "신정동",
  "등촌동",
];

// 한국 이름
const KOREAN_NAMES = [
  "김철수",
  "이영희",
  "박민수",
  "최지영",
  "정성훈",
  "강미경",
  "윤서준",
  "임하나",
  "오승현",
  "한지우",
  "신동욱",
  "권수현",
  "배정민",
  "홍재희",
  "조은비",
  "장민호",
  "서유진",
  "문태영",
  "안소희",
  "황준석",
];

// 은행 이름
const BANK_NAMES = [
  "신한은행",
  "국민은행",
  "하나은행",
  "우리은행",
  "NH농협은행",
  "기업은행",
  "대구은행",
  "부산은행",
  "경남은행",
  "광주은행",
  "전북은행",
  "제주은행",
  "새마을금고",
  "신협",
  "저축은행",
];

// 법원 이름
const COURT_NAMES = [
  "서울중앙지방법원",
  "서울동부지방법원",
  "서울남부지방법원",
  "서울북부지방법원",
  "서울서부지방법원",
  "의정부지방법원",
  "인천지방법원",
  "수원지방법원",
  "부천지원",
];

// 물건 유형별 상세 정보
const PROPERTY_TYPE_INFO: Record<
  string,
  { name: string; areaUnit: string; areaRange: [number, number] }
> = {
  apartment: { name: "아파트", areaUnit: "㎡", areaRange: [59, 135] },
  villa: { name: "빌라/연립", areaUnit: "㎡", areaRange: [45, 100] },
  commercial: { name: "상가", areaUnit: "㎡", areaRange: [33, 200] },
  land: { name: "토지", areaUnit: "㎡", areaRange: [100, 500] },
};

// 자본 규모별 가격 범위
const CAPITAL_RANGES: Record<string, { min: number; max: number }> = {
  under100: { min: 50000000, max: 95000000 },
  under300: { min: 100000000, max: 290000000 },
  over300: { min: 300000000, max: 800000000 },
};

// 난이도별 권리 패턴
interface RightsPattern {
  difficulty: "easy" | "medium" | "hard";
  learningGoals: string[];
  pattern: (baseDate: Date) => {
    eulgooRights: any[];
    tenants: any[];
    malsoGijun: string;
    malsoRights: string[];
    insuRights: string[];
    keyLearning: string;
  };
}

const RIGHTS_PATTERNS: RightsPattern[] = [
  // 초급 - 단순 근저당권
  {
    difficulty: "easy",
    learningGoals: ["malso", "baedang", "total"],
    pattern: (baseDate: Date) => {
      const mortgageDate = generateRandomPastDate(800, 1200);
      const mortgageAmount = Math.floor(Math.random() * 100000000) + 150000000;
      const bank = BANK_NAMES[Math.floor(Math.random() * BANK_NAMES.length)];

      return {
        eulgooRights: [
          {
            date: mortgageDate,
            rank: 1,
            type: "근저당권",
            amount: mortgageAmount,
            holder: bank,
          },
        ],
        tenants: [],
        malsoGijun: `${mortgageDate} 근저당권 1번`,
        malsoRights: [`근저당권 ${mortgageAmount.toLocaleString()}원`],
        insuRights: [],
        keyLearning: `말소기준권리 학습: 본 경매의 말소기준권리는 등기부 을구의 '${bank} 근저당권(${mortgageDate}, 채권최고액 ${(
          mortgageAmount / 10000
        ).toLocaleString()}만원)'입니다. 말소기준권리는 경매를 신청한 원인이 되는 권리로, 가장 중요한 기준점이 됩니다. 말소기준권리보다 후순위인 모든 권리(등기부상 후순위 권리 및 대항력 없는 임차인 등)는 경매로 인해 소멸됩니다. 본 물건은 단순한 근저당권 하나만 존재하는 구조로, 복잡한 권리관계가 없어 초보자가 분석하기 좋은 물건입니다. 낙찰 시 깨끗한 소유권을 취득할 수 있으며, 인수해야 할 권리가 전혀 없습니다.`,
      };
    },
  },
  // 초급 - 대항력 없는 임차인
  {
    difficulty: "easy",
    learningGoals: ["daehanglyek", "total"],
    pattern: (baseDate: Date) => {
      const mortgageDate = generateRandomPastDate(800, 1200);
      const mortgageAmount = Math.floor(Math.random() * 100000000) + 150000000;
      const bank = BANK_NAMES[Math.floor(Math.random() * BANK_NAMES.length)];

      // 근저당권 이후 전입한 임차인 (대항력 없음)
      const tenantContractDate = generateRandomPastDate(200, 400);
      const tenantMoveInDate = generateRandomPastDate(180, 390);
      const deposit = Math.floor(Math.random() * 30000000) + 30000000;
      const tenantName =
        KOREAN_NAMES[Math.floor(Math.random() * KOREAN_NAMES.length)];

      return {
        eulgooRights: [
          {
            date: mortgageDate,
            rank: 1,
            type: "근저당권",
            amount: mortgageAmount,
            holder: bank,
          },
        ],
        tenants: [
          {
            name: tenantName,
            deposit: deposit,
            contractDate: tenantContractDate,
            moveInDate: tenantMoveInDate,
          },
        ],
        malsoGijun: `${mortgageDate} 근저당권 1번`,
        malsoRights: [
          `근저당권 ${mortgageAmount.toLocaleString()}원`,
          `임차보증금 ${deposit.toLocaleString()}원 (대항력 없음)`,
        ],
        insuRights: [],
        keyLearning: `대항력 학습: 본 경매의 말소기준권리는 등기부 을구의 '${bank} 근저당권(${mortgageDate})'입니다. 현황조사서상의 임차인 ${tenantName}는 전입일(${tenantMoveInDate})이 말소기준권리 설정일보다 늦으므로 대항력이 없습니다. 주택임대차보호법에 따라 대항력을 취득하려면 '전입신고 + 주택 인도(점유)'가 필요하며, 이 두 요건을 갖춘 시점이 말소기준권리보다 빨라야 합니다. 본 임차인은 후순위이므로 경매로 인해 임차권이 소멸되며, 배당 여부와 관계없이 낙찰자에게 보증금 ${(
          deposit / 10000
        ).toLocaleString()}만원을 주장할 수 없습니다. 낙찰자는 명도 절차만 진행하면 되고, 보증금 인수 부담은 없습니다.`,
      };
    },
  },
  // 중급 - 선순위 임차인 (대항력 있음)
  {
    difficulty: "medium",
    learningGoals: ["daehanglyek", "seonsoonsun", "total"],
    pattern: (baseDate: Date) => {
      // 임차인이 먼저 전입
      const tenantContractDate = generateRandomPastDate(1000, 1400);
      const tenantMoveInDate = generateRandomPastDate(990, 1390);
      const deposit = Math.floor(Math.random() * 50000000) + 40000000;
      const tenantName =
        KOREAN_NAMES[Math.floor(Math.random() * KOREAN_NAMES.length)];

      // 그 이후 근저당권 설정
      const mortgageDate = generateRandomPastDate(800, 980);
      const mortgageAmount = Math.floor(Math.random() * 150000000) + 200000000;
      const bank = BANK_NAMES[Math.floor(Math.random() * BANK_NAMES.length)];

      return {
        eulgooRights: [
          {
            date: mortgageDate,
            rank: 1,
            type: "근저당권",
            amount: mortgageAmount,
            holder: bank,
          },
        ],
        tenants: [
          {
            name: tenantName,
            deposit: deposit,
            contractDate: tenantContractDate,
            moveInDate: tenantMoveInDate,
            confirmDate: tenantMoveInDate,
          },
        ],
        malsoGijun: `${mortgageDate} 근저당권 1번`,
        malsoRights: [`근저당권 ${mortgageAmount.toLocaleString()}원`],
        insuRights: [
          `임차보증금 ${deposit.toLocaleString()}원 (선순위 대항력)`,
        ],
        keyLearning: `선순위 임차인 학습: 본 경매의 말소기준권리는 등기부 을구의 '${bank} 근저당권(${mortgageDate})'입니다. 임차인 ${tenantName}는 전입일(${tenantMoveInDate}) 및 확정일자가 말소기준권리보다 선순위이므로 대항력과 우선변제권을 모두 갖습니다. 주택임대차보호법에 따라 '전입 + 확정일자'를 갖춘 임차인은 배당요구를 할 수 있고, 선순위 담보권자보다 우선하여 보증금을 배당받을 권리가 있습니다. 본 임차인은 경매로 소멸되지 않으며, 배당을 통해 보증금 ${(
          deposit / 10000
        ).toLocaleString()}만원 전액을 회수하지 못할 경우 나머지 금액은 낙찰자가 인수해야 합니다. 따라서 낙찰 시 이 금액을 실질적인 투자금에 포함하여 입찰가를 산정해야 합니다. 선순위 임차인이 있는 물건은 인수금액이 발생하므로 신중한 분석이 필요합니다.`,
      };
    },
  },
  // 중급 - 2개의 근저당권
  {
    difficulty: "medium",
    learningGoals: ["malso", "baedang", "total"],
    pattern: (baseDate: Date) => {
      const firstMortgageDate = generateRandomPastDate(1000, 1400);
      const firstAmount = Math.floor(Math.random() * 100000000) + 150000000;
      const firstBank =
        BANK_NAMES[Math.floor(Math.random() * BANK_NAMES.length)];

      const secondMortgageDate = generateRandomPastDate(600, 990);
      const secondAmount = Math.floor(Math.random() * 80000000) + 80000000;
      let secondBank =
        BANK_NAMES[Math.floor(Math.random() * BANK_NAMES.length)];
      while (secondBank === firstBank) {
        secondBank = BANK_NAMES[Math.floor(Math.random() * BANK_NAMES.length)];
      }

      return {
        eulgooRights: [
          {
            date: firstMortgageDate,
            rank: 1,
            type: "근저당권",
            amount: firstAmount,
            holder: firstBank,
          },
          {
            date: secondMortgageDate,
            rank: 2,
            type: "근저당권",
            amount: secondAmount,
            holder: secondBank,
          },
        ],
        tenants: [],
        malsoGijun: `${firstMortgageDate} 근저당권 1번`,
        malsoRights: [
          `1순위 근저당권 ${firstAmount.toLocaleString()}원`,
          `2순위 근저당권 ${secondAmount.toLocaleString()}원`,
        ],
        insuRights: [],
        keyLearning: `복수 근저당권 분석: 본 경매의 말소기준권리는 등기부 을구의 '${firstBank} 근저당권(${firstMortgageDate}, 순위 1번, 채권최고액 ${(
          firstAmount / 10000
        ).toLocaleString()}만원)'입니다. 본 물건에는 총 2개의 근저당권이 설정되어 있으며, 시간순으로 1) ${firstBank} 근저당권(${firstMortgageDate}) → 2) ${secondBank} 근저당권(${secondMortgageDate})입니다. 일반적으로 경매를 신청한 권리가 말소기준권리가 되며, 본 경매에서는 1순위 근저당권이 말소기준권리입니다. 말소기준권리보다 후순위인 2순위 근저당권(${secondBank}, ${(
          secondAmount / 10000
        ).toLocaleString()}만원)은 경매로 인해 소멸됩니다. 따라서 낙찰자는 1순위 근저당권까지만 책임지면 되고(실제로는 배당으로 소멸), 2순위 근저당권은 걱정할 필요가 없습니다. 복수의 근저당권이 있는 경우, 각 권리의 순위와 금액을 정확히 파악하고 배당 시뮬레이션을 통해 낙찰가가 얼마나 나올지 예측하는 것이 중요합니다. 본 물건은 깨끗한 권리관계로 인수할 권리가 없어 초보 투자자도 도전하기 좋은 물건입니다.`,
      };
    },
  },
  // 중급 - 근저당권 + 후순위 임차인
  {
    difficulty: "medium",
    learningGoals: ["daehanglyek", "baedang", "total"],
    pattern: (baseDate: Date) => {
      const mortgageDate = generateRandomPastDate(1000, 1400);
      const mortgageAmount = Math.floor(Math.random() * 120000000) + 180000000;
      const bank = BANK_NAMES[Math.floor(Math.random() * BANK_NAMES.length)];

      // 근저당권 이후 전입 + 확정일자 (대항력은 있지만 우선변제권 없음)
      const tenantContractDate = generateRandomPastDate(600, 900);
      const tenantMoveInDate = generateRandomPastDate(590, 890);
      const deposit = Math.floor(Math.random() * 40000000) + 35000000;
      const tenantName =
        KOREAN_NAMES[Math.floor(Math.random() * KOREAN_NAMES.length)];

      return {
        eulgooRights: [
          {
            date: mortgageDate,
            rank: 1,
            type: "근저당권",
            amount: mortgageAmount,
            holder: bank,
          },
        ],
        tenants: [
          {
            name: tenantName,
            deposit: deposit,
            contractDate: tenantContractDate,
            moveInDate: tenantMoveInDate,
            confirmDate: tenantMoveInDate,
          },
        ],
        malsoGijun: `${mortgageDate} 근저당권 1번`,
        malsoRights: [
          `근저당권 ${mortgageAmount.toLocaleString()}원`,
          `임차보증금 ${deposit.toLocaleString()}원 (후순위)`,
        ],
        insuRights: [],
        keyLearning: `후순위 임차인의 소멸: 본 경매의 말소기준권리는 등기부 을구의 '${bank} 근저당권(${mortgageDate})'입니다. 임차인 ${tenantName}는 전입일(${tenantMoveInDate}) 및 확정일자를 모두 갖추었으나, 이 시점이 말소기준권리보다 늦으므로 후순위 임차인에 해당합니다. 중요한 점은 '전입 + 확정일자'를 갖추었어도 말소기준권리보다 후순위라면 경매로 인해 임차권이 소멸된다는 것입니다. 임차인은 배당절차에서 후순위 채권자로서 배당요구를 할 수는 있지만, 선순위 채권자(말소기준권리)에게 전액 배당되면 보증금을 받지 못합니다. 그리고 배당 여부와 관계없이 경매로 임차권이 소멸되므로 낙찰자에게 보증금 ${(
          deposit / 10000
        ).toLocaleString()}만원을 주장할 수 없습니다. 따라서 낙찰자는 보증금 인수 부담 없이 명도만 진행하면 됩니다. 이 사례를 통해 대항력과 우선변제권의 차이, 그리고 말소기준권리와의 선후 관계가 얼마나 중요한지 이해할 수 있습니다.`,
      };
    },
  },
  // 고급 - 복잡한 권리관계 (가압류 + 근저당 + 선순위 임차인)
  {
    difficulty: "hard",
    learningGoals: ["total"],
    pattern: (baseDate: Date) => {
      // 임차인 먼저
      const tenantContractDate = generateRandomPastDate(1400, 1800);
      const tenantMoveInDate = generateRandomPastDate(1390, 1790);
      const deposit = Math.floor(Math.random() * 60000000) + 50000000;
      const tenantName =
        KOREAN_NAMES[Math.floor(Math.random() * KOREAN_NAMES.length)];

      // 가압류
      const seizureDate = generateRandomPastDate(1100, 1380);
      const seizureAmount = Math.floor(Math.random() * 50000000) + 50000000;
      const seizureHolder =
        KOREAN_NAMES[Math.floor(Math.random() * KOREAN_NAMES.length)];

      // 근저당권
      const mortgageDate = generateRandomPastDate(800, 1090);
      const mortgageAmount = Math.floor(Math.random() * 150000000) + 200000000;
      const bank = BANK_NAMES[Math.floor(Math.random() * BANK_NAMES.length)];

      return {
        eulgooRights: [
          {
            date: seizureDate,
            rank: 1,
            type: "가압류",
            amount: seizureAmount,
            holder: seizureHolder,
          },
          {
            date: mortgageDate,
            rank: 2,
            type: "근저당권",
            amount: mortgageAmount,
            holder: bank,
          },
        ],
        tenants: [
          {
            name: tenantName,
            deposit: deposit,
            contractDate: tenantContractDate,
            moveInDate: tenantMoveInDate,
            confirmDate: tenantMoveInDate,
          },
        ],
        malsoGijun: `${mortgageDate} 근저당권 2번`,
        malsoRights: [
          `가압류 ${seizureAmount.toLocaleString()}원`,
          `근저당권 ${mortgageAmount.toLocaleString()}원`,
        ],
        insuRights: [`임차보증금 ${deposit.toLocaleString()}원 (최우선순위)`],
        keyLearning: `복잡한 권리관계 종합 분석: 본 경매는 여러 권리가 복잡하게 얽힌 고급 사례입니다. 말소기준권리는 등기부 을구의 '${bank} 근저당권(${mortgageDate}, 순위 2번)'입니다. 시간순으로 정리하면: 1) 임차인 ${tenantName} 전입 및 확정일자(${tenantMoveInDate}) → 2) ${seizureHolder}의 가압류(${seizureDate}) → 3) ${bank} 근저당권(${mortgageDate})입니다. 말소기준권리보다 후순위인 권리는 없으므로, 가압류와 근저당권 모두 경매로 소멸됩니다. 핵심은 임차인의 권리입니다. 임차인은 모든 등기부상 권리보다 선순위이므로 대항력과 우선변제권을 모두 갖습니다. 배당절차에서 가장 먼저 보증금 ${(
          deposit / 10000
        ).toLocaleString()}만원을 배당받을 권리가 있으며, 배당금이 부족할 경우 나머지는 낙찰자가 인수해야 합니다. 이처럼 복잡한 물건에서는 1) 각 권리의 발생 시점을 시간순으로 정리하고, 2) 말소기준권리를 찾아 소멸되는 권리와 인수되는 권리를 구분하며, 3) 임차인의 대항력 및 배당 순위를 꼼꼼히 분석해야 합니다. 본 물건은 인수금액이 크므로 신중한 수익성 분석이 필요합니다.`,
      };
    },
  },
  // 고급 - 3개의 근저당권 + 가처분
  {
    difficulty: "hard",
    learningGoals: ["malso", "baedang", "total"],
    pattern: (baseDate: Date) => {
      const first = generateRandomPastDate(1400, 1800);
      const firstAmount = Math.floor(Math.random() * 120000000) + 150000000;
      const firstBank =
        BANK_NAMES[Math.floor(Math.random() * BANK_NAMES.length)];

      const second = generateRandomPastDate(1100, 1390);
      const secondAmount = Math.floor(Math.random() * 80000000) + 80000000;
      const secondBank =
        BANK_NAMES[Math.floor(Math.random() * BANK_NAMES.length)];

      const injunction = generateRandomPastDate(900, 1090);
      const injunctionHolder =
        KOREAN_NAMES[Math.floor(Math.random() * KOREAN_NAMES.length)];

      const third = generateRandomPastDate(600, 890);
      const thirdAmount = Math.floor(Math.random() * 60000000) + 60000000;
      const thirdBank =
        BANK_NAMES[Math.floor(Math.random() * BANK_NAMES.length)];

      return {
        eulgooRights: [
          {
            date: first,
            rank: 1,
            type: "근저당권",
            amount: firstAmount,
            holder: firstBank,
          },
          {
            date: second,
            rank: 2,
            type: "근저당권",
            amount: secondAmount,
            holder: secondBank,
          },
          {
            date: injunction,
            rank: 3,
            type: "처분금지가처분",
            amount: 0,
            holder: injunctionHolder,
          },
          {
            date: third,
            rank: 4,
            type: "근저당권",
            amount: thirdAmount,
            holder: thirdBank,
          },
        ],
        tenants: [],
        malsoGijun: `${first} 근저당권 1번`,
        malsoRights: [
          `1순위 근저당권 ${firstAmount.toLocaleString()}원`,
          `2순위 근저당권 ${secondAmount.toLocaleString()}원`,
          `처분금지가처분`,
          `3순위 근저당권 ${thirdAmount.toLocaleString()}원`,
        ],
        insuRights: [],
        keyLearning: `다중 권리 및 가처분 분석: 본 경매는 매우 복잡한 권리관계를 가진 고급 사례입니다. 말소기준권리는 등기부 을구의 '${firstBank} 근저당권(${first}, 순위 1번)'입니다. 시간순으로 정리하면: 1) ${firstBank} 근저당권(${first}, ${(
          firstAmount / 10000
        ).toLocaleString()}만원) → 2) ${secondBank} 근저당권(${second}, ${(
          secondAmount / 10000
        ).toLocaleString()}만원) → 3) ${injunctionHolder}의 처분금지가처분(${injunction}) → 4) ${thirdBank} 근저당권(${third}, ${(
          thirdAmount / 10000
        ).toLocaleString()}만원)입니다. 말소기준권리보다 후순위인 모든 권리(2순위 근저당권, 가처분, 3순위 근저당권)는 경매로 인해 소멸됩니다. 특히 '처분금지가처분'은 채권최고액이 표시되지 않지만 배당절차에서 채권자로 참가할 수 있으며, 본안소송에서 승소하면 배당금을 받을 권리가 생깁니다. 하지만 말소기준권리보다 후순위이므로 경매로 소멸되며 낙찰자에게 영향을 주지 않습니다. 이처럼 복잡한 물건을 분석할 때는 1) 등기부를 시간순으로 정리하여 각 권리의 선후 관계를 파악하고, 2) 말소기준권리를 명확히 찾아 소멸되는 권리와 인수되는 권리를 구분하며, 3) 가처분이나 가압류 같은 보전처분의 성격과 배당 관계를 이해해야 합니다. 본 물건은 모든 후순위 권리가 소멸되어 깨끗한 소유권을 취득할 수 있으므로, 권리분석만 정확히 한다면 좋은 투자 기회가 될 수 있습니다.`,
      };
    },
  },
];

// ========== 생성 함수 ==========

/**
 * 랜덤 요소 선택 헬퍼
 */
function randomPick<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * 범위 내 랜덤 숫자
 */
function randomInRange(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * 주소 생성
 */
function generateAddress(propertyType: string): string {
  const district = randomPick(SEOUL_DISTRICTS);
  const dong = randomPick(DONG_NAMES);
  const number1 = randomInRange(1, 999);
  const number2 = randomInRange(1, 99);

  return `서울특별시 ${district} ${dong} ${number1}-${number2}`;
}

/**
 * 면적 생성
 */
function generateArea(propertyType: string): string {
  const info = PROPERTY_TYPE_INFO[propertyType];
  const area = randomInRange(info.areaRange[0], info.areaRange[1]);

  if (propertyType === "apartment") {
    return `전용 ${area}${info.areaUnit}`;
  } else if (propertyType === "land") {
    return `대지 ${area}${info.areaUnit}`;
  } else {
    return `${area}${info.areaUnit}`;
  }
}

/**
 * 가격 생성 (감정가, 최저가)
 */
function generatePrices(capital: string): {
  appraisalValue: number;
  minimumBid: number;
} {
  const range = CAPITAL_RANGES[capital];
  const minimumBid = randomInRange(range.min, range.max);

  // 감정가는 최저가의 1.3~1.5배
  const ratio = 1.3 + Math.random() * 0.2;
  const appraisalValue = Math.round((minimumBid * ratio) / 10000000) * 10000000;

  return { appraisalValue, minimumBid };
}

/**
 * 사건번호 생성
 */
function generateCaseNumber(): string {
  const year = new Date().getFullYear();
  const number = randomInRange(10000, 99999);
  return `${year}타경${number}`;
}

/**
 * 경매 시나리오 생성 메인 함수
 */
export function generateScenario(params: ScenarioParams): GeneratedScenario {
  console.log("🎲 시나리오 생성 시작:", params);

  const baseDate = new Date();
  const propertyTypeInfo = PROPERTY_TYPE_INFO[params.propertyType];

  // 파라미터에 맞는 권리 패턴 필터링
  let eligiblePatterns = RIGHTS_PATTERNS.filter((p) => {
    const difficultyMatch = p.difficulty === params.difficulty;
    const learningMatch =
      params.learningGoal === "total" ||
      p.learningGoals.includes(params.learningGoal);
    return difficultyMatch && learningMatch;
  });

  // 필터링 결과가 없으면 난이도만 맞추기
  if (eligiblePatterns.length === 0) {
    eligiblePatterns = RIGHTS_PATTERNS.filter(
      (p) => p.difficulty === params.difficulty
    );
  }

  // 그래도 없으면 전체에서 선택
  if (eligiblePatterns.length === 0) {
    eligiblePatterns = RIGHTS_PATTERNS;
  }

  const selectedPattern = randomPick(eligiblePatterns);
  console.log("✅ 선택된 패턴:", selectedPattern.difficulty);

  // 권리 관계 생성
  const rightsData = selectedPattern.pattern(baseDate);

  // 주소 및 기본 정보
  const address = generateAddress(params.propertyType);
  const area = generateArea(params.propertyType);
  const prices = generatePrices(params.capital);

  // 소유권 정보 (갑구)
  const ownershipDate = generateRandomPastDate(1500, 2000);
  const owner = randomPick(KOREAN_NAMES);

  // 법원 정보
  const court = randomPick(COURT_NAMES);
  const caseNumber = generateCaseNumber();
  const caseId = `CASE-${caseNumber}`;

  // 경매일
  const saleDateObj = new Date();
  saleDateObj.setDate(saleDateObj.getDate() + randomInRange(30, 90));
  const saleDate = formatDateKorean(saleDateObj);

  // 점유 상태
  const occupancy = rightsData.tenants.length > 0 ? "임차인 거주 중" : "공실";

  // 예상 추가 비용 계산
  const expectedCost = rightsData.tenants
    .filter((t) =>
      rightsData.insuRights.some((r) => r.includes(t.deposit.toString()))
    )
    .reduce((sum, t) => sum + t.deposit, 0);

  // 🎯 상세한 수익 분석 생성
  const appraisalInManwon = Math.round(prices.appraisalValue / 10000);
  const minimumBidInManwon = Math.round(prices.minimumBid / 10000);
  const expectedCostInManwon = Math.round(expectedCost / 10000);

  // 예상 낙찰가 (최저가의 105%~110%)
  const expectedWinningBid = Math.round(
    prices.minimumBid * (1.05 + Math.random() * 0.05)
  );
  const expectedWinningBidInManwon = Math.round(expectedWinningBid / 10000);

  // 부대비용 계산 (취득세 약 4.6%, 법무사 비용 약 1.5%, 명도비 약 300만원)
  const acquisitionTax = Math.round(expectedWinningBid * 0.046);
  const legalFee = Math.round(expectedWinningBid * 0.015);
  const evictionCost = rightsData.tenants.length > 0 ? 3000000 : 0;
  const totalAdditionalCost = acquisitionTax + legalFee + evictionCost;
  const totalAdditionalCostInManwon = Math.round(totalAdditionalCost / 10000);

  // 총 투자금
  const totalInvestment =
    expectedWinningBid + totalAdditionalCost + expectedCost;
  const totalInvestmentInManwon = Math.round(totalInvestment / 10000);

  // 임차인 분석 (있을 경우)
  let tenantAnalysis = "";
  if (rightsData.tenants.length > 0) {
    const tenant = rightsData.tenants[0];
    const malsoDate =
      rightsData.eulgooRights.find((r) => r.type === "근저당권")?.date || "";
    const isAfterMalso = tenant.moveInDate > malsoDate;

    if (isAfterMalso) {
      tenantAnalysis = ` 임차인 ${tenant.name}은(는) 말소기준권리인 ${
        rightsData.eulgooRights[0].holder
      } 근저당권(${malsoDate})보다 후순위(${tenant.moveInDate} 전입${
        tenant.confirmDate ? "/확정일자" : ""
      })이므로 대항력이 없어 보증금 전액을 배당받지 못하더라도 낙찰자에게 인수되는 금액이 없습니다. 따라서 추가적인 인수금액 부담 없이 시세차익을 기대할 수 있습니다. 다만, 점유하고 있는 임차인에 대한 명도 절차는 필요합니다.`;
    } else if (tenant.confirmDate) {
      tenantAnalysis = ` 임차인 ${tenant.name}은(는) 말소기준권리보다 선순위(${
        tenant.moveInDate
      } 전입 및 확정일자)로 대항력과 우선변제권을 가지므로, 보증금 ${Math.round(
        tenant.deposit / 10000
      )}만원을 낙찰자가 인수해야 합니다. 이 금액은 실질적인 투자금에 포함되어야 합니다.`;
    }
  }

  // 최종 수익 분석 문장 생성
  const profitAnalysis = `본 물건은 감정가 ${appraisalInManwon}만원 대비 최저입찰가 ${minimumBidInManwon}만원으로 ${Math.round(
    (1 - prices.minimumBid / prices.appraisalValue) * 100
  )}% 할인된 가격으로 유찰이 진행되어 입찰 기회가 좋은 물건입니다. 낙찰가 ${expectedWinningBidInManwon}만원으로 가정 시, 취득세 및 법무사 비용${
    evictionCost > 0 ? ", 명도비" : ""
  } 등을 포함하여 총 약 ${totalInvestmentInManwon}만원이 소요될 것으로 예상됩니다.${tenantAnalysis}${
    expectedCost > 0
      ? ` 인수해야 할 보증금 ${expectedCostInManwon}만원을 포함하면 실질 투자금은 ${totalInvestmentInManwon}만원이 됩니다.`
      : ""
  } 시세가 감정가 수준으로 회복된다면 약 ${Math.round(
    (prices.appraisalValue - totalInvestment) / 10000
  )}만원의 시세차익을 기대할 수 있습니다.`;

  console.log("📊 수익 분석 생성 완료");

  // 물건 상세 설명
  const propertyDetails = `${
    propertyTypeInfo.name
  }, ${area}, ${address}에 위치한 부동산입니다. 감정가 ${prices.appraisalValue.toLocaleString()}원, 최저입찰가 ${prices.minimumBid.toLocaleString()}원입니다.`;

  const scenario: GeneratedScenario = {
    caseId,
    propertyInfo: {
      type: propertyTypeInfo.name,
      address,
      area,
      appraisalValue: prices.appraisalValue,
      minimumBid: prices.minimumBid,
    },
    documents: {
      saleNotice: {
        courtName: court,
        caseNumber,
        saleDate,
        propertyDetails,
      },
      registry: {
        gapgu: [
          {
            date: ownershipDate,
            type: "소유권이전",
            holder: owner,
            details: "매매",
          },
        ],
        eulgoo: rightsData.eulgooRights,
      },
      statusReport: {
        occupancy,
        tenants: rightsData.tenants,
      },
    },
    correctAnswer: {
      malsoGijun: rightsData.malsoGijun,
      malsoRights: rightsData.malsoRights,
      insuRights: rightsData.insuRights,
      expectedCost,
      profitAnalysis,
      keyLearning: rightsData.keyLearning,
    },
  };

  console.log("✅ 시나리오 생성 완료:", caseId);
  return scenario;
}
