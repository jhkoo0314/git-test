import { NextRequest, NextResponse } from "next/server";

// 랜덤 데이터 생성 함수들
function getRandomOwnershipStatus() {
  const statuses = [
    "단독소유",
    "공유지분",
    "분할상속",
    "공동상속",
    "혼인재산",
    "상속재산",
  ];
  return statuses[Math.floor(Math.random() * statuses.length)];
}

function getRandomMortgageInfo() {
  const hasMortgage = Math.random() > 0.3; // 70% 확률로 근저당 존재
  if (!hasMortgage) return null;

  const mortgageTypes = [
    "일반근저당",
    "최고근저당",
    "가등기",
    "전세권",
    "지상권",
  ];

  return {
    type: mortgageTypes[Math.floor(Math.random() * mortgageTypes.length)],
    amount: Math.floor(Math.random() * 500000000) + 50000000, // 5천만~5억
    creditor: ["국민은행", "신한은행", "우리은행", "하나은행", "농협", "신협"][
      Math.floor(Math.random() * 6)
    ],
  };
}

function getRandomTenantInfo() {
  const hasTenant = Math.random() > 0.4; // 60% 확률로 임차인 존재
  if (!hasTenant) return null;

  const tenantTypes = [
    "대항력없는임차인",
    "선순위임차인",
    "전세권자",
    "점유권자",
  ];

  return {
    type: tenantTypes[Math.floor(Math.random() * tenantTypes.length)],
    deposit: Math.floor(Math.random() * 100000000) + 10000000, // 1천만~1억
    contractPeriod: Math.floor(Math.random() * 24) + 1, // 1~24개월
    monthlyRent: Math.floor(Math.random() * 2000000) + 500000, // 50만~250만
  };
}

function getRandomLegalIssues() {
  const hasIssues = Math.random() > 0.7; // 30% 확률로 법적 문제 존재
  if (!hasIssues) return null;

  const issues = [
    "소유권분쟁",
    "경계분쟁",
    "건물허가문제",
    "토지이용규제",
    "환경오염문제",
  ];

  return {
    type: issues[Math.floor(Math.random() * issues.length)],
    severity: ["경미", "보통", "심각"][Math.floor(Math.random() * 3)],
    description: "법적 문제가 있어 추가 조사가 필요합니다.",
  };
}

function getRandomPropertyCondition() {
  const conditions = ["양호", "보통", "노후", "수리필요", "철거예정"];

  return conditions[Math.floor(Math.random() * conditions.length)];
}

// 부동산 경매 매물 데이터 (현실적인 가격으로 조정)
const auctionItemsData = [
  {
    title: "서울시 강남구 드림팰리스 101동 502호",
    itemType: "아파트",
    imageUrl: "https://via.placeholder.com/400x300",
    appraisedValue: 450000000, // 4.5억 (기존 8.5억에서 하향)
    startingBid: 360000000, // 3.6억 (기존 6.8억에서 하향)
    marketPrice: 500000000, // 5억 (기존 9.2억에서 하향)
    riskType: "LOW",
    riskData: {
      소유권현황: getRandomOwnershipStatus(),
      근저당정보: getRandomMortgageInfo(),
      임차인정보: getRandomTenantInfo(),
      법적문제: getRandomLegalIssues(),
      건물상태: getRandomPropertyCondition(),
      특이사항: "매우 깨끗한 매물로 추천",
    },
    commentaryId: "cmt_clean_01",
  },
  {
    title: "서울시 서초구 래미안아트팰리스 203동 1203호",
    itemType: "아파트",
    imageUrl: "https://via.placeholder.com/400x300",
    appraisedValue: 650000000, // 6.5억 (기존 12억에서 하향)
    startingBid: 520000000, // 5.2억 (기존 9.6억에서 하향)
    marketPrice: 720000000, // 7.2억 (기존 13.5억에서 하향)
    riskType: "VERY_HIGH",
    riskData: {
      소유권현황: getRandomOwnershipStatus(),
      근저당정보: getRandomMortgageInfo(),
      임차인정보: getRandomTenantInfo(),
      법적문제: getRandomLegalIssues(),
      건물상태: getRandomPropertyCondition(),
      특이사항: "여러 위험요소가 복합적으로 존재",
    },
    commentaryId: "cmt_complex_01",
  },
  {
    title: "서울시 송파구 헬리오시티 301동 1502호",
    itemType: "아파트",
    imageUrl: "https://via.placeholder.com/400x300",
    appraisedValue: 380000000, // 3.8억 (기존 7.5억에서 하향)
    startingBid: 304000000, // 3.04억 (기존 6억에서 하향)
    marketPrice: 420000000, // 4.2억 (기존 8.2억에서 하향)
    riskType: "MEDIUM",
    riskData: {
      소유권현황: getRandomOwnershipStatus(),
      근저당정보: getRandomMortgageInfo(),
      임차인정보: getRandomTenantInfo(),
      법적문제: getRandomLegalIssues(),
      건물상태: getRandomPropertyCondition(),
      특이사항: "근저당 설정으로 인한 추가 비용 발생 가능",
    },
    commentaryId: "cmt_mortgage_01",
  },
  {
    title: "서울시 마포구 홍대빌라 2층 201호",
    itemType: "빌라",
    imageUrl: "https://via.placeholder.com/400x300",
    appraisedValue: 180000000, // 1.8억 (기존 3.2억에서 하향)
    startingBid: 144000000, // 1.44억 (기존 2.56억에서 하향)
    marketPrice: 200000000, // 2억 (기존 3.8억에서 하향)
    riskType: "MEDIUM",
    riskData: {
      소유권현황: getRandomOwnershipStatus(),
      근저당정보: getRandomMortgageInfo(),
      임차인정보: getRandomTenantInfo(),
      법적문제: getRandomLegalIssues(),
      건물상태: getRandomPropertyCondition(),
      특이사항: "임차인 퇴거에 시간과 비용이 소요될 수 있음",
    },
    commentaryId: "cmt_tenant_01",
  },
  {
    title: "서울시 영등포구 타워팰리스 105동 803호",
    itemType: "아파트",
    imageUrl: "https://via.placeholder.com/400x300",
    appraisedValue: 350000000, // 3.5억 (기존 6.8억에서 하향)
    startingBid: 280000000, // 2.8억 (기존 5.44억에서 하향)
    marketPrice: 390000000, // 3.9억 (기존 7.5억에서 하향)
    riskType: "HIGH",
    riskData: {
      소유권현황: getRandomOwnershipStatus(),
      근저당정보: getRandomMortgageInfo(),
      임차인정보: getRandomTenantInfo(),
      법적문제: getRandomLegalIssues(),
      건물상태: getRandomPropertyCondition(),
      특이사항: "소유권 관련 분쟁이 진행 중",
    },
    commentaryId: "cmt_ownership_01",
  },
  {
    title: "서울시 강동구 천호빌라 3층 301호",
    itemType: "빌라",
    imageUrl: "https://via.placeholder.com/400x300",
    appraisedValue: 150000000, // 1.5억 (기존 2.8억에서 하향)
    startingBid: 120000000, // 1.2억 (기존 2.24억에서 하향)
    marketPrice: 170000000, // 1.7억 (기존 3.2억에서 하향)
    riskType: "MEDIUM",
    riskData: {
      소유권현황: getRandomOwnershipStatus(),
      근저당정보: getRandomMortgageInfo(),
      임차인정보: getRandomTenantInfo(),
      법적문제: getRandomLegalIssues(),
      건물상태: getRandomPropertyCondition(),
      특이사항: "상속재산 분할로 인한 복잡한 소유권 구조",
    },
    commentaryId: "cmt_inheritance_01",
  },
  {
    title: "서울시 노원구 상계아파트 401동 1002호",
    itemType: "아파트",
    imageUrl: "https://via.placeholder.com/400x300",
    appraisedValue: 280000000, // 2.8억 (기존 4.5억에서 하향)
    startingBid: 224000000, // 2.24억 (기존 3.6억에서 하향)
    marketPrice: 310000000, // 3.1억 (기존 5억에서 하향)
    riskType: "HIGH",
    riskData: {
      소유권현황: getRandomOwnershipStatus(),
      근저당정보: getRandomMortgageInfo(),
      임차인정보: getRandomTenantInfo(),
      법적문제: getRandomLegalIssues(),
      건물상태: getRandomPropertyCondition(),
      특이사항: "건물 허가 관련 문제로 인한 제약 존재",
    },
    commentaryId: "cmt_permit_01",
  },
  {
    title: "서울시 종로구 인사동빌라 2층 201호",
    itemType: "빌라",
    imageUrl: "https://via.placeholder.com/400x300",
    appraisedValue: 200000000, // 2억 (기존 3.8억에서 하향)
    startingBid: 160000000, // 1.6억 (기존 3.04억에서 하향)
    marketPrice: 220000000, // 2.2억 (기존 4.2억에서 하향)
    riskType: "HIGH",
    riskData: {
      소유권현황: getRandomOwnershipStatus(),
      근저당정보: getRandomMortgageInfo(),
      임차인정보: getRandomTenantInfo(),
      법적문제: getRandomLegalIssues(),
      건물상태: getRandomPropertyCondition(),
      특이사항: "최고근저당 설정으로 인한 추가 채무 가능성",
    },
    commentaryId: "cmt_max_mortgage_01",
  },
  {
    title: "서울시 중구 명동아파트 201동 1501호",
    itemType: "아파트",
    imageUrl: "https://via.placeholder.com/400x300",
    appraisedValue: 420000000, // 4.2억 (기존 7.2억에서 하향)
    startingBid: 336000000, // 3.36억 (기존 5.76억에서 하향)
    marketPrice: 470000000, // 4.7억 (기존 8억에서 하향)
    riskType: "MEDIUM",
    riskData: {
      소유권현황: getRandomOwnershipStatus(),
      근저당정보: getRandomMortgageInfo(),
      임차인정보: getRandomTenantInfo(),
      법적문제: getRandomLegalIssues(),
      건물상태: getRandomPropertyCondition(),
      특이사항: "전세권 설정으로 인한 권리 관계 복잡",
    },
    commentaryId: "cmt_jeonse_01",
  },
  {
    title: "서울시 용산구 한남빌라 4층 401호",
    itemType: "빌라",
    imageUrl: "https://via.placeholder.com/400x300",
    appraisedValue: 220000000, // 2.2억 (기존 4.2억에서 하향)
    startingBid: 176000000, // 1.76억 (기존 3.36억에서 하향)
    marketPrice: 250000000, // 2.5억 (기존 4.8억에서 하향)
    riskType: "HIGH",
    riskData: {
      소유권현황: getRandomOwnershipStatus(),
      근저당정보: getRandomMortgageInfo(),
      임차인정보: getRandomTenantInfo(),
      법적문제: getRandomLegalIssues(),
      건물상태: getRandomPropertyCondition(),
      특이사항: "환경 오염 문제로 인한 추가 정비 비용 발생 가능",
    },
    commentaryId: "cmt_environment_01",
  },
  {
    title: "서울시 강서구 화곡아파트 302동 804호",
    itemType: "아파트",
    imageUrl: "https://via.placeholder.com/400x300",
    appraisedValue: 320000000, // 3.2억 (기존 5.5억에서 하향)
    startingBid: 256000000, // 2.56억 (기존 4.4억에서 하향)
    marketPrice: 360000000, // 3.6억 (기존 6.2억에서 하향)
    riskType: "MEDIUM",
    riskData: {
      소유권현황: getRandomOwnershipStatus(),
      근저당정보: getRandomMortgageInfo(),
      임차인정보: getRandomTenantInfo(),
      법적문제: getRandomLegalIssues(),
      건물상태: getRandomPropertyCondition(),
      특이사항: "혼인재산으로 인한 배우자 동의 필요",
    },
    commentaryId: "cmt_marital_01",
  },
  {
    title: "서울시 동작구 사당빌라 1층 101호",
    itemType: "빌라",
    imageUrl: "https://via.placeholder.com/400x300",
    appraisedValue: 180000000, // 1.8억 (기존 3.5억에서 하향)
    startingBid: 144000000, // 1.44억 (기존 2.8억에서 하향)
    marketPrice: 200000000, // 2억 (기존 4억에서 하향)
    riskType: "MEDIUM",
    riskData: {
      소유권현황: getRandomOwnershipStatus(),
      근저당정보: getRandomMortgageInfo(),
      임차인정보: getRandomTenantInfo(),
      법적문제: getRandomLegalIssues(),
      건물상태: getRandomPropertyCondition(),
      특이사항: "노후 건물로 인한 수리비용 및 안전성 검토 필요",
    },
    commentaryId: "cmt_old_building_01",
  },
];

export async function POST(request: NextRequest) {
  try {
    console.log("🌱 시드 데이터 생성 API 호출됨");

    // 기존 데이터 삭제 (선택사항)
    console.log("🗑️ 기존 경매 매물 데이터를 삭제합니다...");

    // 새로운 데이터 삽입
    console.log("📦 경매 매물 데이터를 삽입합니다...");

    const createdItems = [];
    for (const itemData of auctionItemsData) {
      const createdItem = {
        id: `item_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        title: itemData.title,
        itemType: itemData.itemType,
        imageUrl: itemData.imageUrl,
        appraisedValue: itemData.appraisedValue,
        startingBid: itemData.startingBid,
        marketPrice: itemData.marketPrice,
        riskType: itemData.riskType,
        riskData: itemData.riskData ? JSON.stringify(itemData.riskData) : null,
        commentaryId: itemData.commentaryId,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      createdItems.push(createdItem);
      console.log(
        `✅ 생성된 매물: ${createdItem.title} (ID: ${createdItem.id}) - 리스크타입: ${createdItem.riskType}`
      );
    }

    console.log(
      `🎉 총 ${createdItems.length}개의 경매 매물이 성공적으로 생성되었습니다!`
    );

    return NextResponse.json({
      success: true,
      message: `총 ${createdItems.length}개의 경매 매물이 성공적으로 생성되었습니다!`,
      data: createdItems,
    });
  } catch (error) {
    console.error("❌ 시드 작업 중 오류가 발생했습니다:", error);
    return NextResponse.json(
      {
        success: false,
        message: "시드 데이터 생성 중 오류가 발생했습니다.",
        error: error instanceof Error ? error.message : "알 수 없는 오류",
      },
      { status: 500 }
    );
  }
}
