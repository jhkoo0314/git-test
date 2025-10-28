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

// ===== AI 마스터 생성기 사용으로 시드 로직 업데이트 =====
import { generateAuctionMaster } from "../lib/scenarioGenerator";

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

// 기존 랜덤 리스크 타입/이름/이미지 로직은 사용하지 않음

// 동적 매물 데이터 생성 함수는 AI 마스터 생성으로 대체

// 매물 유형별 데이터 생성
const auctionItemsData: Array<ReturnType<typeof generateAuctionMaster>> = [];

// AI 마스터 기반 데이터 12~18개 생성
const total = Math.floor(Math.random() * 7) + 12;
for (let i = 0; i < total; i++) {
  const seed = `ITEM-${i + 1}`;
  auctionItemsData.push(generateAuctionMaster(seed));
}

async function main() {
  console.log("🌱 데이터베이스 시드 작업을 시작합니다...");

  if (!prisma) {
    console.log("📋 생성된 매물 데이터 (Prisma 클라이언트 없이):");
    auctionItemsData.forEach((m, index) => {
      console.log(
        `${index + 1}. ${m.item.title} (${m.item.itemType}) - ${
          m.item.riskType
        }`
      );
    });
    console.log(
      `🎉 총 ${auctionItemsData.length}개의 경매 매물 데이터가 생성되었습니다!`
    );
    return;
  }

  try {
    // 기존 데이터 삭제 (선택사항)
    console.log(
      "🗑️ 기존 경매 매물 및 상세/권리/임차/일정 데이터를 삭제합니다..."
    );
    await prisma.auctionRight.deleteMany({});
    await prisma.auctionTenant.deleteMany({});
    await prisma.auctionScheduleEvent.deleteMany({});
    await prisma.auctionDetail.deleteMany({});
    await prisma.auctionItem.deleteMany({});

    // 새로운 데이터 삽입
    console.log("📦 경매 매물 데이터를 삽입합니다...");

    for (const m of auctionItemsData) {
      const createdItem = await prisma.auctionItem.create({
        data: {
          title: m.item.title,
          itemType: m.item.itemType,
          imageUrl: m.item.imageUrl ?? null,
          appraisedValue: m.item.appraisedValue,
          startingBid: m.item.startingBid,
          marketPrice: m.item.marketPrice,
          riskType: m.item.riskType,
          riskData: m.item.riskData ? JSON.stringify(m.item.riskData) : null,
          commentaryId: null,
          detail: {
            create: {
              caseNumber: m.detail.caseNumber,
              address: m.detail.address,
              propertyType: m.detail.propertyType,
              landArea: m.detail.landArea ?? null,
              buildingArea: m.detail.buildingArea ?? null,
              buildYear: m.detail.buildYear ?? null,
              floor: m.detail.floor ?? null,
              usage: m.detail.usage ?? null,
              memo: m.detail.memo ?? null,
            },
          },
          rights: { create: m.rights },
          tenants: { create: m.tenants },
          scheduleEvents: { create: m.schedule },
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
