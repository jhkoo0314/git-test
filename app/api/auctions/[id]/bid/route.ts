import { NextRequest, NextResponse } from "next/server";

/**
 * 시드를 사용한 랜덤 매물 데이터 생성 함수
 * 매물 목록 API와 동일한 로직을 사용하여 일관된 데이터를 생성합니다.
 */
function generateRandomPropertyWithSeed(seed: string) {
  const locations = [
    "강남구",
    "서초구",
    "송파구",
    "마포구",
    "용산구",
    "성동구",
    "영등포구",
    "강동구",
    "노원구",
    "종로구",
    "중구",
    "강서구",
    "동작구",
  ];

  const propertyTypes = [
    "아파트",
    "오피스텔",
    "빌라",
    "상가",
    "단독주택",
    "원룸",
  ];
  const riskTypes = ["LOW", "MEDIUM", "HIGH", "VERY_HIGH"];

  // 시드 기반 랜덤 선택 (더 다양하게)
  const seedHash = seed.split("").reduce((a, b) => {
    a = (a << 5) - a + b.charCodeAt(0);
    return a & a;
  }, 0);

  const locationIndex = Math.abs(seedHash) % locations.length;
  const propertyTypeIndex = Math.abs(seedHash >> 8) % propertyTypes.length;
  const riskTypeIndex = Math.abs(seedHash >> 16) % riskTypes.length;

  const location = locations[locationIndex];
  const propertyType = propertyTypes[propertyTypeIndex];
  const riskType = riskTypes[riskTypeIndex];

  // 매물 유형별 특성에 맞는 면적과 가격 설정
  let area, appraisedValue;

  switch (propertyType) {
    case "아파트":
      area = 60 + (Math.abs(seedHash >> 24) % 90); // 60-150㎡
      appraisedValue = 300000000 + (Math.abs(seedHash >> 32) % 1200000000); // 3억-15억
      break;
    case "오피스텔":
      area = 25 + (Math.abs(seedHash >> 24) % 50); // 25-75㎡
      appraisedValue = 150000000 + (Math.abs(seedHash >> 32) % 850000000); // 1.5억-10억
      break;
    case "빌라":
      area = 30 + (Math.abs(seedHash >> 24) % 70); // 30-100㎡
      appraisedValue = 200000000 + (Math.abs(seedHash >> 32) % 800000000); // 2억-10억
      break;
    case "상가":
      area = 40 + (Math.abs(seedHash >> 24) % 110); // 40-150㎡
      appraisedValue = 100000000 + (Math.abs(seedHash >> 32) % 1400000000); // 1억-15억
      break;
    case "단독주택":
      area = 80 + (Math.abs(seedHash >> 24) % 120); // 80-200㎡
      appraisedValue = 400000000 + (Math.abs(seedHash >> 32) % 1100000000); // 4억-15억
      break;
    case "원룸":
      area = 15 + (Math.abs(seedHash >> 24) % 35); // 15-50㎡
      appraisedValue = 80000000 + (Math.abs(seedHash >> 32) % 420000000); // 8천만-5억
      break;
    default:
      area = 25 + (Math.abs(seedHash >> 24) % 125);
      appraisedValue = 50000000 + (Math.abs(seedHash >> 32) % 1450000000);
  }

  // 시작 입찰가 (감정가의 70-85%)
  const startingBidRate = 0.7 + (Math.abs(seedHash >> 40) % 15) / 100;
  const startingBid = Math.floor(appraisedValue * startingBidRate);

  // 시장가 (감정가와 다르게 설정 - 85-120% 범위)
  const marketPriceRate = 0.85 + (Math.abs(seedHash >> 48) % 35) / 100; // 85-120%
  const marketPrice = Math.floor(appraisedValue * marketPriceRate);

  // 매물 유형별 제목 생성 (더 다양하고 현실적인 이름)
  let title = "";

  switch (propertyType) {
    case "아파트":
      const apartmentBrands = [
        "래미안",
        "힐스테이트",
        "아크로",
        "헬리오시티",
        "드림팰리스",
        "래미안아트팰리스",
        "타워팰리스",
        "아이파크",
        "자이",
        "센트럴파크",
        "트리지움",
      ];
      const apartmentName =
        apartmentBrands[Math.abs(seedHash >> 56) % apartmentBrands.length];
      const buildingNum = Math.floor(Math.abs(seedHash >> 64) % 5) + 101; // 101-105동
      const floorNum = Math.floor(Math.abs(seedHash >> 72) % 20) + 1; // 1-20층
      const roomNum = Math.floor(Math.abs(seedHash >> 80) % 4) + 1; // 1-4호
      title = `${location} ${apartmentName} ${buildingNum}동 ${floorNum}${roomNum}호`;
      break;
    case "오피스텔":
      const officetelBrands = [
        "비즈니스텔",
        "스마트오피스텔",
        "비즈니스센터",
        "오피스텔",
        "비즈니스빌딩",
        "스마트빌딩",
      ];
      const officetelName =
        officetelBrands[Math.abs(seedHash >> 56) % officetelBrands.length];
      const officetelFloor = Math.floor(Math.abs(seedHash >> 64) % 10) + 1; // 1-10층
      const officetelRoom = Math.floor(Math.abs(seedHash >> 72) % 20) + 1; // 1-20호
      title = `${location} ${officetelName} ${officetelFloor}층 ${officetelRoom}호`;
      break;
    case "빌라":
      const villaNames = [
        "빌라",
        "다세대주택",
        "연립주택",
        "다가구주택",
        "빌딩",
        "주택",
      ];
      const villaName =
        villaNames[Math.abs(seedHash >> 56) % villaNames.length];
      const villaFloor = Math.floor(Math.abs(seedHash >> 64) % 4) + 1; // 1-4층
      const villaRoom = Math.floor(Math.abs(seedHash >> 72) % 10) + 1; // 1-10호
      title = `${location} ${villaName} ${villaFloor}층 ${villaRoom}호`;
      break;
    case "상가":
      const commercialNames = [
        "상가",
        "상가건물",
        "상업시설",
        "상가동",
        "상가빌딩",
        "상가건물",
      ];
      const commercialName =
        commercialNames[Math.abs(seedHash >> 56) % commercialNames.length];
      const commercialFloor = Math.floor(Math.abs(seedHash >> 64) % 5) + 1; // 1-5층
      const commercialRoom = Math.floor(Math.abs(seedHash >> 72) % 20) + 1; // 1-20호
      title = `${location} ${commercialName} ${commercialFloor}층 ${commercialRoom}호`;
      break;
    case "단독주택":
      const houseNames = [
        "단독주택",
        "주택",
        "한옥",
        "단독주택",
        "주택",
        "단독주택",
      ];
      const houseName =
        houseNames[Math.abs(seedHash >> 56) % houseNames.length];
      title = `${location} ${houseName} ${area}㎡`;
      break;
    case "원룸":
      const studioNames = [
        "원룸",
        "스튜디오",
        "원룸",
        "스튜디오",
        "원룸",
        "스튜디오",
      ];
      const studioName =
        studioNames[Math.abs(seedHash >> 56) % studioNames.length];
      const studioFloor = Math.floor(Math.abs(seedHash >> 64) % 10) + 1; // 1-10층
      const studioRoom = Math.floor(Math.abs(seedHash >> 72) % 20) + 1; // 1-20호
      title = `${location} ${studioName} ${studioFloor}층 ${studioRoom}호`;
      break;
    default:
      title = `${location} ${propertyType} ${area}㎡`;
  }

  // 시드 기반 이미지 URL 생성 (일관성 유지)
  const imageSeed = Math.abs(
    seed.split("").reduce((a, b) => a + b.charCodeAt(0), 0)
  );
  const imageUrl = `https://images.unsplash.com/photo-${imageSeed}?w=400&h=300&fit=crop`;

  // 시드 기반 추가 데이터 생성
  const riskData = {
    legalIssues: Math.abs(seedHash >> 88) % 2 === 0,
    marketVolatility: Math.abs(seedHash >> 96) % 3,
    competitionLevel: Math.abs(seedHash >> 104) % 3,
  };

  const auctionItem = {
    id: seed,
    title,
    itemType: propertyType,
    imageUrl,
    appraisedValue,
    startingBid,
    marketPrice,
    riskType,
    riskData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  console.log(`✅ 매물 데이터 생성 완료: ${title}`);
  console.log(
    `💰 가격 정보: 감정가 ${appraisedValue}원, 시장가 ${marketPrice}원, 시작입찰가 ${startingBid}원`
  );

  return auctionItem;
}

/**
 * 매물 ID로 매물 정보를 조회하는 함수
 * 기존 API 로직을 재사용하여 일관된 데이터를 반환합니다.
 */
async function getAuctionItemById(id: string) {
  try {
    console.log(`🔍 매물 정보 조회 시작 - ID: ${id}`);

    // 매물 ID를 기반으로 랜덤 데이터 생성 (일관성을 위해 시드 사용)
    let seed = id;
    if (id.includes("_")) {
      // 언더스코어가 있는 경우 마지막 부분을 시드로 사용
      const parts = id.split("_");
      seed = parts[parts.length - 1] || id;
    }

    console.log(`🔍 사용할 시드: ${seed}`);

    // 시드 기반 매물 데이터 생성
    const auctionItem = generateRandomPropertyWithSeed(seed);

    console.log(`✅ 매물 정보 조회 완료: ${auctionItem.title}`);
    return auctionItem;
  } catch (error) {
    console.error("❌ 매물 정보 조회 실패:", error);
    return null;
  }
}

/**
 * 입찰 처리 API
 * POST /api/auctions/[id]/bid
 *
 * 사용자의 입찰을 처리하고 시뮬레이션 결과를 계산합니다.
 * 요청 본문: { userId: string, bidAmount: number }
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const auctionItemId = resolvedParams.id;
    console.log(`🎯 입찰 처리 시작 - 매물 ID: ${auctionItemId}`);

    // 요청 본문 파싱
    const body = await request.json();
    const { bidAmount } = body;

    // 입력값 검증
    if (!bidAmount || bidAmount <= 0) {
      console.log("❌ 잘못된 입력값:", { bidAmount });
      return NextResponse.json(
        {
          success: false,
          error: "입찰가를 올바르게 입력해주세요",
        },
        { status: 400 }
      );
    }

    console.log(`💰 입찰가: ${bidAmount}원`);

    // 실제 매물 데이터 조회 (기존 API 로직 재사용)
    const auctionItem = await getAuctionItemById(auctionItemId);

    if (!auctionItem) {
      console.log("❌ 매물을 찾을 수 없습니다:", auctionItemId);
      return NextResponse.json(
        {
          success: false,
          error: "매물을 찾을 수 없습니다",
        },
        { status: 404 }
      );
    }

    console.log(
      `📦 매물 정보: ${auctionItem.title}, 감정가: ${auctionItem.appraisedValue}원, 시장가: ${auctionItem.marketPrice}원`
    );
    console.log(`🔍 매물 상세 정보:`, {
      id: auctionItem.id,
      title: auctionItem.title,
      appraisedValue: auctionItem.appraisedValue,
      marketPrice: auctionItem.marketPrice,
      startingBid: auctionItem.startingBid,
      riskType: auctionItem.riskType,
    });

    // 가상 입찰자 생성
    console.log(`👥 가상 입찰자 생성 시작`);
    const virtualBidders = generateVirtualBidders(
      auctionItem,
      bidAmount,
      auctionItemId
    );
    console.log(`✅ 가상 입찰자 생성 완료:`, virtualBidders);

    // 시뮬레이션 결과 계산
    console.log(
      `🧮 시뮬레이션 계산 시작 - 입찰가: ${bidAmount}원, 감정가: ${auctionItem.appraisedValue}원, 시장가: ${auctionItem.marketPrice}원`
    );
    const simulationResult = calculateSimulationResult(
      auctionItem,
      bidAmount,
      virtualBidders
    );
    console.log(`📊 시뮬레이션 결과:`, simulationResult);
    console.log(`💰 최종 수익/손실: ${simulationResult.profitOrLoss}원`);

    // 성공 응답 반환 - 원래 매물의 가격 정보를 그대로 사용
    const responseData = {
      success: simulationResult.isSuccess,
      finalBid: bidAmount,
      profitOrLoss: simulationResult.profitOrLoss,
      marketPrice: auctionItem.marketPrice, // 원래 매물의 시장가 사용
      appraisedValue: auctionItem.appraisedValue, // 원래 매물의 감정가 사용
      riskLevel: auctionItem.riskType,
      recommendation: simulationResult.recommendation,
      userRank: simulationResult.userRank,
      totalBidders: simulationResult.totalBidders,
      virtualBidders: virtualBidders, // 가상 입찰자 정보 포함
      details: {
        competitionLevel:
          simulationResult.totalBidders > 8
            ? "높음"
            : simulationResult.totalBidders > 6
            ? "보통"
            : "낮음",
        biddingHistory: virtualBidders.map((bidder) => ({
          name: bidder.name,
          bid: bidder.bidAmount,
          timestamp: bidder.timestamp,
        })),
        marketTrend: "안정적",
      },
      message: simulationResult.isSuccess
        ? "축하합니다! 입찰에 성공했습니다."
        : "입찰에 실패했습니다.",
    };

    console.log(`✅ 입찰 응답 데이터:`, {
      finalBid: responseData.finalBid,
      profitOrLoss: responseData.profitOrLoss,
      marketPrice: responseData.marketPrice,
      appraisedValue: responseData.appraisedValue,
      riskLevel: responseData.riskLevel,
      originalMarketPrice: auctionItem.marketPrice,
      originalAppraisedValue: auctionItem.appraisedValue,
      priceConsistency: {
        marketPriceMatch: responseData.marketPrice === auctionItem.marketPrice,
        appraisedValueMatch:
          responseData.appraisedValue === auctionItem.appraisedValue,
      },
    });

    return NextResponse.json(responseData, { status: 200 });
  } catch (error) {
    console.error("❌ 입찰 처리 중 오류 발생:", error);

    return NextResponse.json(
      {
        success: false,
        error: "입찰 처리 중 오류가 발생했습니다",
        details: error instanceof Error ? error.message : "알 수 없는 오류",
      },
      { status: 500 }
    );
  }
}

/**
 * 가상의 입찰자들을 생성하는 함수
 */
function generateVirtualBidders(
  auctionItem: any,
  userBidAmount: number,
  seed: string
) {
  const { startingBid, appraisedValue } = auctionItem;

  // 시드를 기반으로 일관된 입찰자 수 생성 (5-10명)
  const seedHash = seed.split("").reduce((a, b) => {
    a = (a << 5) - a + b.charCodeAt(0);
    return a & a;
  }, 0);

  const bidderCount = 5 + (Math.abs(seedHash) % 6); // 5-10명

  console.log(`👥 가상 입찰자 ${bidderCount}명 생성 시작`);

  const bidderNames = [
    "김철수",
    "이영희",
    "박민수",
    "최지은",
    "정다은",
    "강호동",
    "한지민",
    "오세훈",
    "윤미래",
    "임창정",
    "송혜교",
    "전지현",
    "조인성",
    "하정우",
    "배수지",
  ];

  const virtualBidders: Array<{
    name: string;
    bidAmount: number;
    timestamp: string;
  }> = [];

  for (let i = 0; i < bidderCount; i++) {
    // 시드 기반으로 일관된 이름 선택
    const nameIndex = Math.abs((seedHash >> (i * 8)) % bidderNames.length);
    const bidderName = `${bidderNames[nameIndex]}${i + 1}`;

    // 입찰가 생성 (시작가와 감정가 * 1.2 사이에서 랜덤)
    // 다양한 입찰가를 생성하기 위해 범위를 넓게 설정
    const minBid = startingBid;
    const maxBid = appraisedValue * 1.2;
    const bidRange = maxBid - minBid;

    // 시드 기반 랜덤값 생성
    const randomSeed = Math.abs(seedHash >> (i * 16));
    const randomValue = (randomSeed % 1000) / 1000; // 0-1 사이의 값

    // 대부분의 입찰자들은 중간 범위에 몰리도록 조정 (정규분포 비슷하게)
    const adjustedRandom =
      randomValue < 0.5
        ? 0.3 + randomValue * 0.8 // 0.3-0.7 범위
        : 0.5 + (randomValue - 0.5) * 1.4; // 0.5-1.2 범위

    const bidAmount = Math.floor(minBid + bidRange * adjustedRandom);

    // 백만원 단위로 반올림
    const roundedBidAmount = Math.round(bidAmount / 1000000) * 1000000;

    virtualBidders.push({
      name: bidderName,
      bidAmount: roundedBidAmount,
      timestamp: new Date(Date.now() - (bidderCount - i) * 60000).toISOString(), // 시간 간격을 두고 입찰
    });

    console.log(`👤 가상 입찰자 생성: ${bidderName} - ${roundedBidAmount}원`);
  }

  // 사용자 입찰 추가
  virtualBidders.push({
    name: "나",
    bidAmount: userBidAmount,
    timestamp: new Date().toISOString(),
  });

  // 입찰가 기준으로 정렬 (높은 순)
  virtualBidders.sort((a, b) => b.bidAmount - a.bidAmount);

  console.log(
    `✅ 가상 입찰자 생성 완료 - 총 ${virtualBidders.length}명 (가상 ${bidderCount}명 + 사용자 1명)`
  );

  return virtualBidders;
}

/**
 * 시뮬레이션 결과 계산 함수
 * 매물의 위험도와 입찰가를 기반으로 결과를 계산합니다.
 */
function calculateSimulationResult(
  auctionItem: any,
  bidAmount: number,
  virtualBidders: any[]
) {
  const { appraisedValue, marketPrice, riskType } = auctionItem;

  console.log(
    `🔍 시뮬레이션 계산 시작 - 입찰가: ${bidAmount}원, 감정가: ${appraisedValue}원, 시장가: ${marketPrice}원`
  );

  // 원래 시장가와 감정가를 유지 (조정하지 않음)
  console.log(
    `📊 원래 가격 유지 - 시장가: ${marketPrice}원, 감정가: ${appraisedValue}원`
  );

  // 사용자의 입찰 순위 찾기
  const userRank =
    virtualBidders.findIndex((bidder) => bidder.name === "나") + 1;
  const totalBidders = virtualBidders.length;

  console.log(`📊 입찰 순위: ${userRank}위 / ${totalBidders}명`);

  // 입찰 성공 여부 결정 (1위면 성공)
  const isSuccess = userRank === 1;

  let profitOrLoss = 0;
  let recommendation = "";

  if (isSuccess) {
    // 성공한 경우
    // 수익 계산 (원래 시장가 - 입찰가)
    profitOrLoss = marketPrice - bidAmount;

    if (profitOrLoss > 0) {
      // 이익인 경우
      recommendation = "🎉 축하합니다! 최고가 입찰로 낙찰받았습니다!";
      console.log(`💰 이익 발생: ${profitOrLoss}원`);
    } else {
      // 손실인 경우
      recommendation =
        "⚠️ 낙찰은 받았지만 입찰가가 시장가보다 높아 손실이 발생했습니다.";
      console.log(`💸 손실 발생: ${Math.abs(profitOrLoss)}원`);
    }
  } else {
    // 실패한 경우
    profitOrLoss = 0; // 입찰 실패 시 손실 없음
    const highestBidder = virtualBidders[0];
    const difference = highestBidder.bidAmount - bidAmount;
    recommendation = `❌ 입찰에 실패했습니다. ${
      highestBidder.name
    }님이 ${difference.toLocaleString()}원 더 높은 가격으로 낙찰받았습니다.`;
    console.log(
      `❌ 입찰 실패: ${userRank}위 (1위는 ${highestBidder.name}님, ${highestBidder.bidAmount}원)`
    );
  }

  // 시뮬레이션 결과 반환
  return {
    profitOrLoss,
    recommendation,
    isSuccess,
    userRank,
    totalBidders,
  };
}
