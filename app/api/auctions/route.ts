import { NextRequest, NextResponse } from "next/server";

// 시드를 사용한 랜덤 매물 데이터 생성 함수
export function generateRandomPropertyWithSeed(seed: string) {
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
        "업무시설",
        "상가빌딩",
        "상업빌딩",
      ];
      const commercialName =
        commercialNames[Math.abs(seedHash >> 56) % commercialNames.length];
      const commercialFloor = Math.floor(Math.abs(seedHash >> 64) % 3) + 1; // 1-3층
      const commercialRoom = Math.floor(Math.abs(seedHash >> 72) % 15) + 1; // 1-15호
      title = `${location} ${commercialName} ${commercialFloor}층 ${commercialRoom}호`;
      break;
    case "단독주택":
      const houseTypes = ["단독주택", "주택", "개별주택"];
      const houseType =
        houseTypes[Math.abs(seedHash >> 56) % houseTypes.length];
      title = `${location} ${houseType}`;
      break;
    case "원룸":
      const oneroomTypes = ["원룸", "원룸텔", "스튜디오", "원룸아파트"];
      const oneroomType =
        oneroomTypes[Math.abs(seedHash >> 56) % oneroomTypes.length];
      const oneroomFloor = Math.floor(Math.abs(seedHash >> 64) % 5) + 1; // 1-5층
      const oneroomRoom = Math.floor(Math.abs(seedHash >> 72) % 20) + 1; // 1-20호
      title = `${location} ${oneroomType} ${oneroomFloor}층 ${oneroomRoom}호`;
      break;
    default:
      title = `${location} ${propertyType} ${area}㎡`;
  }

  // 매물 유형별 적절한 이미지 URL 생성
  let imageUrl = "";
  switch (propertyType) {
    case "아파트":
      const apartmentImages = [
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop", // 아파트 외관
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop", // 아파트 단지
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop", // 고층 아파트
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop", // 아파트 내부
      ];
      imageUrl =
        apartmentImages[Math.abs(seedHash >> 88) % apartmentImages.length];
      break;
    case "오피스텔":
      const officetelImages = [
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop", // 오피스텔 외관
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=400&h=300&fit=crop", // 오피스텔 내부
        "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400&h=300&fit=crop", // 비즈니스 빌딩
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop", // 스마트 오피스텔
      ];
      imageUrl =
        officetelImages[Math.abs(seedHash >> 88) % officetelImages.length];
      break;
    case "빌라":
      const villaImages = [
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop", // 빌라 외관
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop", // 다세대주택
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop", // 연립주택
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop", // 빌라 내부
      ];
      imageUrl = villaImages[Math.abs(seedHash >> 88) % villaImages.length];
      break;
    case "상가":
      const commercialImages = [
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop", // 상가 건물
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=400&h=300&fit=crop", // 상업시설
        "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400&h=300&fit=crop", // 업무시설
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop", // 상가 내부
      ];
      imageUrl =
        commercialImages[Math.abs(seedHash >> 88) % commercialImages.length];
      break;
    case "단독주택":
      const houseImages = [
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop", // 단독주택 외관
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop", // 주택 외관
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop", // 주택 내부
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop", // 단독주택 정원
      ];
      imageUrl = houseImages[Math.abs(seedHash >> 88) % houseImages.length];
      break;
    case "원룸":
      const oneroomImages = [
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop", // 원룸 내부
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop", // 원룸 외관
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop", // 스튜디오
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop", // 원룸텔
      ];
      imageUrl = oneroomImages[Math.abs(seedHash >> 88) % oneroomImages.length];
      break;
    default:
      imageUrl = `https://images.unsplash.com/photo-${Math.floor(
        Math.random() * 1000000000
      )}?w=400&h=300&fit=crop`;
  }

  return {
    id: seed,
    title,
    itemType: propertyType,
    imageUrl,
    appraisedValue,
    startingBid,
    marketPrice,
    riskType,
    riskData: {
      location: `${location} ${(Math.abs(seedHash >> 96) % 100) + 1}번지`,
      size: `${area}㎡`,
      floor: `${(Math.abs(seedHash >> 104) % 20) + 1}층`,
      condition: ["우수", "양호", "보통", "노후"][
        Math.abs(seedHash >> 112) % 4
      ],
      marketTrend: ["안정적 상승", "상승세", "지속적 상승", "불안정"][
        Math.abs(seedHash >> 120) % 4
      ],
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

// 랜덤 매물 데이터 생성 함수들
function generateRandomProperty() {
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

  const location = locations[Math.floor(Math.random() * locations.length)];
  const propertyType =
    propertyTypes[Math.floor(Math.random() * propertyTypes.length)];
  const riskType = riskTypes[Math.floor(Math.random() * riskTypes.length)];

  // 매물 유형별 특성에 맞는 면적과 가격 설정
  let area, appraisedValue;

  switch (propertyType) {
    case "아파트":
      area = Math.floor(Math.random() * 90) + 60; // 60-150㎡
      appraisedValue = Math.floor(Math.random() * 1200000000) + 300000000; // 3억-15억
      break;
    case "오피스텔":
      area = Math.floor(Math.random() * 50) + 25; // 25-75㎡
      appraisedValue = Math.floor(Math.random() * 850000000) + 150000000; // 1.5억-10억
      break;
    case "빌라":
      area = Math.floor(Math.random() * 70) + 30; // 30-100㎡
      appraisedValue = Math.floor(Math.random() * 800000000) + 200000000; // 2억-10억
      break;
    case "상가":
      area = Math.floor(Math.random() * 110) + 40; // 40-150㎡
      appraisedValue = Math.floor(Math.random() * 1400000000) + 100000000; // 1억-15억
      break;
    case "단독주택":
      area = Math.floor(Math.random() * 120) + 80; // 80-200㎡
      appraisedValue = Math.floor(Math.random() * 1100000000) + 400000000; // 4억-15억
      break;
    case "원룸":
      area = Math.floor(Math.random() * 35) + 15; // 15-50㎡
      appraisedValue = Math.floor(Math.random() * 420000000) + 80000000; // 8천만-5억
      break;
    default:
      area = Math.floor(Math.random() * 125) + 25;
      appraisedValue = Math.floor(Math.random() * 1450000000) + 50000000;
  }

  // 시작 입찰가 (감정가의 70-85%)
  const startingBidRate = 0.7 + Math.random() * 0.15;
  const startingBid = Math.floor(appraisedValue * startingBidRate);

  // 시장가 (감정가와 다르게 설정 - 85-120% 범위)
  const marketPriceRate = 0.85 + Math.random() * 0.35; // 85-120%
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
        apartmentBrands[Math.floor(Math.random() * apartmentBrands.length)];
      const buildingNum = Math.floor(Math.random() * 5) + 101; // 101-105동
      const floorNum = Math.floor(Math.random() * 20) + 1; // 1-20층
      const roomNum = Math.floor(Math.random() * 4) + 1; // 1-4호
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
        officetelBrands[Math.floor(Math.random() * officetelBrands.length)];
      const officetelFloor = Math.floor(Math.random() * 10) + 1; // 1-10층
      const officetelRoom = Math.floor(Math.random() * 20) + 1; // 1-20호
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
        villaNames[Math.floor(Math.random() * villaNames.length)];
      const villaFloor = Math.floor(Math.random() * 4) + 1; // 1-4층
      const villaRoom = Math.floor(Math.random() * 10) + 1; // 1-10호
      title = `${location} ${villaName} ${villaFloor}층 ${villaRoom}호`;
      break;
    case "상가":
      const commercialNames = [
        "상가",
        "상가건물",
        "상업시설",
        "업무시설",
        "상가빌딩",
        "상업빌딩",
      ];
      const commercialName =
        commercialNames[Math.floor(Math.random() * commercialNames.length)];
      const commercialFloor = Math.floor(Math.random() * 3) + 1; // 1-3층
      const commercialRoom = Math.floor(Math.random() * 15) + 1; // 1-15호
      title = `${location} ${commercialName} ${commercialFloor}층 ${commercialRoom}호`;
      break;
    case "단독주택":
      const houseTypes = ["단독주택", "주택", "개별주택"];
      const houseType =
        houseTypes[Math.floor(Math.random() * houseTypes.length)];
      title = `${location} ${houseType}`;
      break;
    case "원룸":
      const oneroomTypes = ["원룸", "원룸텔", "스튜디오", "원룸아파트"];
      const oneroomType =
        oneroomTypes[Math.floor(Math.random() * oneroomTypes.length)];
      const oneroomFloor = Math.floor(Math.random() * 5) + 1; // 1-5층
      const oneroomRoom = Math.floor(Math.random() * 20) + 1; // 1-20호
      title = `${location} ${oneroomType} ${oneroomFloor}층 ${oneroomRoom}호`;
      break;
    default:
      title = `${location} ${propertyType} ${area}㎡`;
  }

  // 매물 유형별 적절한 이미지 URL 생성
  let imageUrl = "";
  switch (propertyType) {
    case "아파트":
      const apartmentImages = [
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop", // 아파트 외관
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop", // 아파트 단지
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop", // 고층 아파트
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop", // 아파트 내부
      ];
      imageUrl =
        apartmentImages[Math.floor(Math.random() * apartmentImages.length)];
      break;
    case "오피스텔":
      const officetelImages = [
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop", // 오피스텔 외관
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=400&h=300&fit=crop", // 오피스텔 내부
        "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400&h=300&fit=crop", // 비즈니스 빌딩
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop", // 스마트 오피스텔
      ];
      imageUrl =
        officetelImages[Math.floor(Math.random() * officetelImages.length)];
      break;
    case "빌라":
      const villaImages = [
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop", // 빌라 외관
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop", // 다세대주택
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop", // 연립주택
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop", // 빌라 내부
      ];
      imageUrl = villaImages[Math.floor(Math.random() * villaImages.length)];
      break;
    case "상가":
      const commercialImages = [
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop", // 상가 건물
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=400&h=300&fit=crop", // 상업시설
        "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400&h=300&fit=crop", // 업무시설
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop", // 상가 내부
      ];
      imageUrl =
        commercialImages[Math.floor(Math.random() * commercialImages.length)];
      break;
    case "단독주택":
      const houseImages = [
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop", // 단독주택 외관
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop", // 주택 외관
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop", // 주택 내부
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop", // 단독주택 정원
      ];
      imageUrl = houseImages[Math.floor(Math.random() * houseImages.length)];
      break;
    case "원룸":
      const oneroomImages = [
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop", // 원룸 내부
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop", // 원룸 외관
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop", // 스튜디오
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop", // 원룸텔
      ];
      imageUrl =
        oneroomImages[Math.floor(Math.random() * oneroomImages.length)];
      break;
    default:
      imageUrl = `https://images.unsplash.com/photo-${Math.floor(
        Math.random() * 1000000000
      )}?w=400&h=300&fit=crop`;
  }

  return {
    id: `auction_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    title,
    itemType: propertyType,
    imageUrl,
    appraisedValue,
    startingBid,
    marketPrice,
    riskType,
    riskData: {
      location: `${location} ${Math.floor(Math.random() * 100) + 1}번지`,
      size: `${area}㎡`,
      floor: `${Math.floor(Math.random() * 20) + 1}층`,
      condition: ["우수", "양호", "보통", "노후"][
        Math.floor(Math.random() * 4)
      ],
      marketTrend: ["안정적 상승", "상승세", "지속적 상승", "불안정"][
        Math.floor(Math.random() * 4)
      ],
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

/**
 * 경매 목록 조회 API
 * GET /api/auctions
 *
 * 모든 경매 매물을 조회하여 JSON으로 반환합니다.
 */
export async function GET(request: NextRequest) {
  try {
    console.log("🔍 경매 목록 조회 요청 시작");

    // URL 파라미터에서 페이지 정보 추출
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "6");

    console.log(`📄 페이지: ${page}, 제한: ${limit}`);

    // 전체 매물 데이터 생성 (총 20개)
    const totalItems = 20;
    const auctionItems = [];

    // 각 매물마다 고유한 시드 생성 (더 간단한 형태)
    for (let i = 0; i < totalItems; i++) {
      const uniqueSeed = `${Math.random().toString(36).substr(2, 9)}`;
      auctionItems.push(generateRandomPropertyWithSeed(uniqueSeed));
    }

    // 페이지네이션 계산
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedItems = auctionItems.slice(startIndex, endIndex);

    const totalPages = Math.ceil(totalItems / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    console.log(
      `✅ 페이지 ${page}/${totalPages}: ${paginatedItems.length}개의 매물을 반환했습니다`
    );

    // 성공 응답 반환
    return NextResponse.json(
      {
        success: true,
        data: paginatedItems,
        pagination: {
          currentPage: page,
          totalPages,
          totalItems,
          itemsPerPage: limit,
          hasNextPage,
          hasPrevPage,
        },
        message: "경매 목록을 성공적으로 조회했습니다",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ 경매 목록 조회 중 오류 발생:", error);

    // 오류 응답 반환
    return NextResponse.json(
      {
        success: false,
        error: "경매 목록을 조회하는 중 오류가 발생했습니다",
        details: error instanceof Error ? error.message : "알 수 없는 오류",
      },
      { status: 500 }
    );
  }
}
