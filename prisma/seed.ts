// Prisma 클라이언트를 동적으로 import
let prisma: any;
try {
  const { PrismaClient } = require("@prisma/client");
  prisma = new PrismaClient();
} catch (error) {
  console.log(
    "Prisma 클라이언트를 사용할 수 없습니다. 데이터 생성만 진행합니다."
  );
  prisma = null;
}

// 매물 유형별 이름과 이미지 생성 함수
function generatePropertyName(itemType: string) {
  const propertyNames = {
    아파트: [
      "강남구 래미안아트팰리스",
      "서초구 헬리오시티",
      "송파구 잠실래미안",
      "마포구 홍대아이파크",
      "용산구 한남더힐",
      "강동구 천호아이파크",
      "노원구 상계힐스테이트",
      "영등포구 타워팰리스",
      "강서구 화곡래미안",
      "동작구 사당아이파크",
    ],
    빌라: [
      "홍대다세대주택",
      "신촌빌라",
      "이태원빌라",
      "강남빌라",
      "서초빌라",
      "송파빌라",
      "마포빌라",
      "용산빌라",
      "강동빌라",
      "노원빌라",
    ],
    오피스텔: [
      "천호비즈니스텔",
      "강남오피스텔",
      "서초오피스텔",
      "송파오피스텔",
      "마포오피스텔",
      "용산오피스텔",
      "강동오피스텔",
      "노원오피스텔",
      "영등포오피스텔",
      "동작오피스텔",
    ],
    상가: [
      "인사동상가건물",
      "명동상가건물",
      "강남상가건물",
      "서초상가건물",
      "송파상가건물",
      "마포상가건물",
      "용산상가건물",
      "강동상가건물",
      "노원상가건물",
      "영등포상가건물",
    ],
    단독주택: [
      "한남단독주택",
      "성수단독주택",
      "압구정단독주택",
      "청담단독주택",
      "반포단독주택",
      "잠실단독주택",
      "홍대단독주택",
      "이태원단독주택",
      "강남단독주택",
      "서초단독주택",
    ],
    원룸: [
      "사당원룸텔",
      "강남원룸텔",
      "서초원룸텔",
      "송파원룸텔",
      "마포원룸텔",
      "용산원룸텔",
      "강동원룸텔",
      "노원원룸텔",
      "영등포원룸텔",
      "동작원룸텔",
    ],
  };

  const names =
    propertyNames[itemType as keyof typeof propertyNames] ||
    propertyNames["아파트"];
  return names[Math.floor(Math.random() * names.length)];
}

function generatePropertyImage(itemType: string) {
  const propertyImages = {
    아파트: [
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop",
    ],
    빌라: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
    ],
    오피스텔: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop",
    ],
    상가: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop",
    ],
    단독주택: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop",
    ],
    원룸: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop",
    ],
  };

  const images =
    propertyImages[itemType as keyof typeof propertyImages] ||
    propertyImages["아파트"];
  return images[Math.floor(Math.random() * images.length)];
}

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

// 매물 유형별 가격 범위 설정 (현실적인 가격으로 조정)
function getPriceRange(itemType: string) {
  const priceRanges = {
    아파트: { min: 200000000, max: 800000000 }, // 2억~8억 (기존 5억~15억에서 대폭 하향)
    빌라: { min: 80000000, max: 300000000 }, // 8천만~3억 (기존 2억~6억에서 하향)
    오피스텔: { min: 60000000, max: 250000000 }, // 6천만~2.5억 (기존 1.5억~5억에서 하향)
    상가: { min: 100000000, max: 400000000 }, // 1억~4억 (기존 3억~8억에서 하향)
    단독주택: { min: 150000000, max: 600000000 }, // 1.5억~6억 (기존 4억~10억에서 하향)
    원룸: { min: 50000000, max: 200000000 }, // 5천만~2억 (기존 2억~5억에서 하향)
  };

  return (
    priceRanges[itemType as keyof typeof priceRanges] || priceRanges["아파트"]
  );
}

// 위험도 타입 생성
function getRandomRiskType() {
  const riskTypes = [
    "클린",
    "복합위험",
    "근저당위험",
    "임차인위험",
    "소유권분쟁",
    "상속분할",
    "건물허가문제",
    "최고근저당",
    "전세권설정",
    "환경문제",
    "혼인재산",
    "노후건물",
  ];
  return riskTypes[Math.floor(Math.random() * riskTypes.length)];
}

// 동적 매물 데이터 생성 함수
function generateAuctionItem(itemType: string, index: number) {
  const priceRange = getPriceRange(itemType);
  const basePrice =
    Math.floor(Math.random() * (priceRange.max - priceRange.min)) +
    priceRange.min;

  // 감정가를 기준으로 시작가와 시장가 계산
  const appraisedValue = basePrice;
  const startingBid = Math.floor(appraisedValue * (0.7 + Math.random() * 0.2)); // 70-90%
  const marketPrice = Math.floor(
    appraisedValue * (0.85 + Math.random() * 0.35)
  ); // 85-120%

  const propertyName = generatePropertyName(itemType);
  const imageUrl = generatePropertyImage(itemType);
  const riskType = getRandomRiskType();

  // 동호수 생성
  const buildingNumber = Math.floor(Math.random() * 5) + 1; // 1-5동
  const floorNumber = Math.floor(Math.random() * 20) + 1; // 1-20층
  const roomNumber = Math.floor(Math.random() * 20) + 1; // 1-20호

  return {
    title: `서울시 ${propertyName} ${buildingNumber}동 ${floorNumber}${roomNumber
      .toString()
      .padStart(2, "0")}호`,
    itemType: itemType,
    imageUrl: imageUrl,
    appraisedValue: appraisedValue,
    startingBid: startingBid,
    marketPrice: marketPrice,
    riskType: riskType,
    riskData: {
      소유권현황: getRandomOwnershipStatus(),
      근저당정보: getRandomMortgageInfo(),
      임차인정보: getRandomTenantInfo(),
      법적문제: getRandomLegalIssues(),
      건물상태: getRandomPropertyCondition(),
      특이사항: `${riskType} 관련 주의사항이 있습니다.`,
    },
    commentaryId: `cmt_${riskType.toLowerCase()}_${index
      .toString()
      .padStart(2, "0")}`,
  };
}

// 매물 유형별 데이터 생성
const propertyTypes = [
  "아파트",
  "빌라",
  "오피스텔",
  "상가",
  "단독주택",
  "원룸",
];
const auctionItemsData = [];

// 각 매물 유형별로 2-3개씩 생성
propertyTypes.forEach((itemType, typeIndex) => {
  const count = Math.floor(Math.random() * 2) + 2; // 2-3개
  for (let i = 0; i < count; i++) {
    const itemIndex = typeIndex * 3 + i;
    auctionItemsData.push(generateAuctionItem(itemType, itemIndex));
  }
});

async function main() {
  console.log("🌱 데이터베이스 시드 작업을 시작합니다...");

  if (!prisma) {
    console.log("📋 생성된 매물 데이터 (Prisma 클라이언트 없이):");
    auctionItemsData.forEach((item, index) => {
      console.log(
        `${index + 1}. ${item.title} (${item.itemType}) - ${item.riskType}`
      );
    });
    console.log(
      `🎉 총 ${auctionItemsData.length}개의 경매 매물 데이터가 생성되었습니다!`
    );
    return;
  }

  try {
    // 기존 데이터 삭제 (선택사항)
    console.log("🗑️ 기존 경매 매물 데이터를 삭제합니다...");
    await prisma.auctionItem.deleteMany({});

    // 새로운 데이터 삽입
    console.log("📦 경매 매물 데이터를 삽입합니다...");

    for (const itemData of auctionItemsData) {
      const createdItem = await prisma.auctionItem.create({
        data: {
          title: itemData.title,
          itemType: itemData.itemType,
          imageUrl: itemData.imageUrl,
          appraisedValue: itemData.appraisedValue,
          startingBid: itemData.startingBid,
          marketPrice: itemData.marketPrice,
          riskType: itemData.riskType,
          riskData: itemData.riskData
            ? JSON.stringify(itemData.riskData)
            : null,
          commentaryId: itemData.commentaryId,
        },
      });

      console.log(
        `✅ 생성된 매물: ${createdItem.title} (ID: ${createdItem.id}) - 리스크타입: ${createdItem.riskType}`
      );
    }

    console.log(
      `🎉 총 ${auctionItemsData.length}개의 경매 매물이 성공적으로 생성되었습니다!`
    );
  } catch (error) {
    console.error("❌ 시드 작업 중 오류가 발생했습니다:", error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error("💥 시드 작업이 실패했습니다:", e);
    process.exit(1);
  })
  .finally(async () => {
    if (prisma) {
      console.log("🔌 Prisma 클라이언트 연결을 종료합니다...");
      await prisma.$disconnect();
    }
  });
