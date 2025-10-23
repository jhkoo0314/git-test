module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/app/api/auctions/[id]/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/server.js [app-route] (ecmascript)");
;
async function GET(request, { params }) {
    // params가 Promise인 경우 await로 해결
    const resolvedParams = await params;
    console.log("🔍 매물 상세 정보 조회 요청:", resolvedParams?.id); // 로그 추가
    console.log("🔍 전체 params 객체:", JSON.stringify(resolvedParams)); // 로그 추가
    console.log("🔍 params 타입:", typeof resolvedParams); // 로그 추가
    console.log("🔍 params.id 타입:", typeof resolvedParams?.id); // 로그 추가
    try {
        // 매물 ID 유효성 검사 - 모든 ID 허용
        if (!resolvedParams?.id) {
            console.error("❌ 매물 ID가 없습니다:", resolvedParams?.id);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: "매물 ID가 필요합니다."
            }, {
                status: 400
            });
        }
        console.log("🔍 받은 매물 ID:", resolvedParams.id); // 로그 추가
        console.log("🔍 ID 길이:", resolvedParams.id.length); // 로그 추가
        console.log("🔍 ID 타입:", typeof resolvedParams.id); // 로그 추가
        // 매물 ID를 기반으로 랜덤 데이터 생성 (일관성을 위해 시드 사용)
        // ID가 복잡한 형태일 경우 마지막 부분을 시드로 사용
        let seed = resolvedParams.id;
        if (resolvedParams.id.includes("_")) {
            // 언더스코어가 있는 경우 마지막 부분을 시드로 사용
            const parts = resolvedParams.id.split("_");
            seed = parts[parts.length - 1] || resolvedParams.id;
        }
        console.log("🔍 사용할 시드:", seed); // 로그 추가
        // 랜덤 매물 데이터 생성
        const auctionItem = generateRandomPropertyWithSeed(seed);
        // 추가 상세 정보 생성 (안전한 실행)
        let enhancedProperty;
        try {
            enhancedProperty = {
                ...auctionItem,
                // 추가 상세 정보
                location: generateLocation(),
                area: generateArea(),
                buildingYear: generateBuildingYear(),
                floor: generateFloor(),
                structure: "철근콘크리트",
                ownership: "개인 소유 (100%)",
                mortgage: generateMortgageInfo(),
                restrictions: generateRestrictions(),
                marketTrend: generateMarketTrend(),
                neighborhoodInfo: generateNeighborhoodInfo()
            };
            console.log("✅ 추가 상세 정보 생성 완료"); // 로그 추가
        } catch (enhanceError) {
            console.error("❌ 추가 상세 정보 생성 실패:", enhanceError);
            // 기본 데이터만 사용
            enhancedProperty = auctionItem;
        }
        console.log("✅ 매물 상세 정보 조회 성공:", auctionItem.title); // 로그 추가
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            data: enhancedProperty
        });
    } catch (error) {
        console.error("❌ 매물 상세 정보 조회 실패:", error); // 로그 추가
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: "매물 정보를 불러오는데 실패했습니다.",
            details: error instanceof Error ? error.message : "알 수 없는 오류"
        }, {
            status: 500
        });
    }
}
// 시드를 사용한 랜덤 매물 생성 함수
function generateRandomPropertyWithSeed(seed) {
    console.log("🔍 시드 기반 매물 생성 시작:", seed); // 로그 추가
    try {
        // 시드를 기반으로 일관된 랜덤 데이터 생성
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
            "동작구"
        ];
        const propertyTypes = [
            "아파트",
            "빌라",
            "오피스텔",
            "상가",
            "원룸"
        ];
        const riskTypes = [
            "LOW",
            "MEDIUM",
            "HIGH",
            "VERY_HIGH"
        ];
        // 시드 기반 랜덤 선택 (안전한 인덱스 계산)
        const locationIndex = Math.abs(seed.charCodeAt(0)) % locations.length;
        const propertyTypeIndex = Math.abs(seed.charCodeAt(1)) % propertyTypes.length;
        const riskTypeIndex = Math.abs(seed.charCodeAt(2)) % riskTypes.length;
        const location = locations[locationIndex];
        const propertyType = propertyTypes[propertyTypeIndex];
        const riskType = riskTypes[riskTypeIndex];
        // 면적 (25-150㎡)
        const area = 25 + Math.abs(seed.charCodeAt(3)) % 125;
        // 감정가 (5천만원 ~ 15억원)
        const appraisedValue = 50000000 + Math.abs(seed.charCodeAt(4)) % 1450000000;
        // 시작 입찰가 (감정가의 70-85%)
        const startingBidRate = 0.7 + Math.abs(seed.charCodeAt(5)) % 15 / 100;
        const startingBid = Math.floor(appraisedValue * startingBidRate);
        // 시장가 (감정가의 90-110%)
        const marketPriceRate = 0.9 + Math.abs(seed.charCodeAt(6)) % 20 / 100;
        const marketPrice = Math.floor(appraisedValue * marketPriceRate);
        const titles = [
            `${location} ${propertyType} ${area}㎡`,
            `${location} 래미안 ${area}㎡`,
            `${location} 힐스테이트 ${area}㎡`,
            `${location} 아크로 ${area}㎡`,
            `${location} 헬리오시티 ${area}㎡`,
            `${location} 드림팰리스 ${area}㎡`,
            `${location} 래미안아트팰리스 ${area}㎡`,
            `${location} 타워팰리스 ${area}㎡`
        ];
        const titleIndex = Math.abs(seed.charCodeAt(7)) % titles.length;
        const title = titles[titleIndex];
        // 시드 기반 이미지 URL 생성 (일관성 유지)
        const imageSeed = Math.abs(seed.split("").reduce((a, b)=>a + b.charCodeAt(0), 0));
        const imageUrl = `https://images.unsplash.com/photo-${imageSeed}?w=400&h=300&fit=crop`;
        // 시드 기반 추가 데이터 생성
        const floorSeed = Math.abs(seed.charCodeAt(8)) % 20 + 1;
        const conditionIndex = Math.abs(seed.charCodeAt(9)) % 4;
        const trendIndex = Math.abs(seed.charCodeAt(10)) % 4;
        const addressSeed = Math.abs(seed.charCodeAt(11)) % 100 + 1;
        const conditions = [
            "우수",
            "양호",
            "보통",
            "노후"
        ];
        const trends = [
            "안정적 상승",
            "상승세",
            "지속적 상승",
            "불안정"
        ];
        const result = {
            id: seed,
            title,
            itemType: propertyType,
            imageUrl,
            appraisedValue,
            startingBid,
            marketPrice,
            riskType,
            riskData: {
                location: `${location} ${addressSeed}번지`,
                size: `${area}㎡`,
                floor: `${floorSeed}층`,
                condition: conditions[conditionIndex],
                marketTrend: trends[trendIndex]
            },
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        console.log("✅ 시드 기반 매물 생성 완료:", result.title); // 로그 추가
        return result;
    } catch (error) {
        console.error("❌ 시드 기반 매물 생성 실패:", error); // 로그 추가
        // 기본 매물 데이터 반환 (에러 시 대체 데이터)
        return {
            id: seed,
            title: "기본 매물",
            itemType: "부동산",
            imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop",
            appraisedValue: 100000000,
            startingBid: 80000000,
            marketPrice: 110000000,
            riskType: "MEDIUM",
            riskData: {
                location: "서울시 강남구",
                size: "84㎡",
                floor: "5층",
                condition: "양호",
                marketTrend: "안정적 상승"
            },
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
    }
}
// 헬퍼 함수들 - 실제 환경에서는 데이터베이스에서 조회
function generateLocation() {
    console.log("🔍 위치 정보 생성"); // 로그 추가
    const locations = [
        "서울시 강남구 테헤란로 123",
        "서울시 서초구 서초대로 456",
        "서울시 송파구 올림픽로 789",
        "서울시 마포구 홍대입구역 101",
        "서울시 용산구 이태원로 202"
    ];
    return locations[Math.floor(Math.random() * locations.length)];
}
function generateArea() {
    console.log("🔍 면적 정보 생성"); // 로그 추가
    // 50-150㎡ 사이의 랜덤 면적
    return Math.floor(Math.random() * 100) + 50;
}
function generateBuildingYear() {
    console.log("🔍 건축년도 정보 생성"); // 로그 추가
    // 2000-2020년 사이의 랜덤 건축년도
    return Math.floor(Math.random() * 21) + 2000;
}
function generateFloor() {
    console.log("🔍 층수 정보 생성"); // 로그 추가
    // 1-20층 사이의 랜덤 층수
    return Math.floor(Math.random() * 20) + 1;
}
function generateMortgageInfo() {
    console.log("🔍 저당권 정보 생성"); // 로그 추가
    const mortgageOptions = [
        "저당권 설정 없음",
        "은행 저당권 설정 (담보금액: 5억원)",
        "개인 저당권 설정 (담보금액: 3억원)",
        "복수 저당권 설정 (담보금액: 8억원)"
    ];
    return mortgageOptions[Math.floor(Math.random() * mortgageOptions.length)];
}
function generateRestrictions() {
    console.log("🔍 제한사항 정보 생성"); // 로그 추가
    const restrictionSets = [
        [
            "경매절차 진행 중",
            "소유권 이전 제한",
            "담보권 설정 가능"
        ],
        [
            "경매절차 진행 중",
            "소유권 이전 제한",
            "담보권 설정 가능",
            "전세권 설정"
        ],
        [
            "경매절차 진행 중",
            "소유권 이전 제한",
            "담보권 설정 가능",
            "지상권 설정"
        ],
        [
            "경매절차 진행 중",
            "소유권 이전 제한",
            "담보권 설정 가능",
            "전세권 설정",
            "지상권 설정"
        ]
    ];
    return restrictionSets[Math.floor(Math.random() * restrictionSets.length)];
}
function generateMarketTrend() {
    console.log("🔍 시장동향 정보 생성"); // 로그 추가
    const trends = [
        "현재 시장 상황 양호, 안정적 거래 환경",
        "시장 상승세 지속, 투자 적기",
        "시장 변동성 있음, 신중한 검토 필요",
        "지역 개발 계획으로 인한 상승 가능성",
        "교통 인프라 개선으로 접근성 향상"
    ];
    return trends[Math.floor(Math.random() * trends.length)];
}
function generateNeighborhoodInfo() {
    console.log("🔍 주변환경 정보 생성"); // 로그 추가
    const neighborhoodOptions = [
        "교통 접근성 우수, 상업지구 인근",
        "교육 환경 우수, 학원가 인근",
        "의료 시설 접근성 좋음, 병원가 인근",
        "쇼핑 편의성 우수, 상가 밀집 지역",
        "주거 환경 우수, 아파트 단지 인근"
    ];
    return neighborhoodOptions[Math.floor(Math.random() * neighborhoodOptions.length)];
}
}),
"[project]/app/api/auctions/[id]/bid/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/server.js [app-route] (ecmascript)");
// 매물 목록 API에서 사용하는 함수를 import
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$api$2f$auctions$2f5b$id$5d2f$route$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/api/auctions/[id]/route.ts [app-route] (ecmascript)");
;
;
/**
 * 매물 ID로 매물 정보를 조회하는 함수
 * 기존 API 로직을 재사용하여 일관된 데이터를 반환합니다.
 */ async function getAuctionItemById(id) {
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
        const auctionItem = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$api$2f$auctions$2f5b$id$5d2f$route$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateRandomPropertyWithSeed"])(seed);
        console.log(`✅ 매물 정보 조회 완료: ${auctionItem.title}`);
        return auctionItem;
    } catch (error) {
        console.error("❌ 매물 정보 조회 실패:", error);
        return null;
    }
}
async function POST(request, { params }) {
    try {
        const resolvedParams = await params;
        const auctionItemId = resolvedParams.id;
        console.log(`🎯 입찰 처리 시작 - 매물 ID: ${auctionItemId}`);
        // 요청 본문 파싱
        const body = await request.json();
        const { bidAmount } = body;
        // 입력값 검증
        if (!bidAmount || bidAmount <= 0) {
            console.log("❌ 잘못된 입력값:", {
                bidAmount
            });
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: "입찰가를 올바르게 입력해주세요"
            }, {
                status: 400
            });
        }
        console.log(`💰 입찰가: ${bidAmount}원`);
        // 실제 매물 데이터 조회 (기존 API 로직 재사용)
        const auctionItem = await getAuctionItemById(auctionItemId);
        if (!auctionItem) {
            console.log("❌ 매물을 찾을 수 없습니다:", auctionItemId);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: "매물을 찾을 수 없습니다"
            }, {
                status: 404
            });
        }
        console.log(`📦 매물 정보: ${auctionItem.title}, 감정가: ${auctionItem.appraisedValue}원, 시장가: ${auctionItem.marketPrice}원`);
        console.log(`🔍 매물 상세 정보:`, {
            id: auctionItem.id,
            title: auctionItem.title,
            appraisedValue: auctionItem.appraisedValue,
            marketPrice: auctionItem.marketPrice,
            startingBid: auctionItem.startingBid,
            riskType: auctionItem.riskType
        });
        // 시뮬레이션 결과 계산
        console.log(`🧮 시뮬레이션 계산 시작 - 입찰가: ${bidAmount}원, 감정가: ${auctionItem.appraisedValue}원, 시장가: ${auctionItem.marketPrice}원`);
        const simulationResult = calculateSimulationResult(auctionItem, bidAmount);
        console.log(`📊 시뮬레이션 결과:`, simulationResult);
        console.log(`💰 최종 수익/손실: ${simulationResult.profitOrLoss}원`);
        // 성공 응답 반환 - 원래 매물의 가격 정보를 그대로 사용
        const responseData = {
            success: true,
            finalBid: bidAmount,
            profitOrLoss: simulationResult.profitOrLoss,
            marketPrice: auctionItem.marketPrice,
            appraisedValue: auctionItem.appraisedValue,
            riskLevel: auctionItem.riskType,
            recommendation: simulationResult.recommendation,
            details: {
                competitionLevel: "보통",
                biddingHistory: [
                    {
                        bid: bidAmount - 100000,
                        timestamp: new Date().toISOString()
                    },
                    {
                        bid: bidAmount,
                        timestamp: new Date().toISOString()
                    }
                ],
                marketTrend: "안정적"
            },
            message: "입찰 처리가 완료되었습니다"
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
                appraisedValueMatch: responseData.appraisedValue === auctionItem.appraisedValue
            }
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(responseData, {
            status: 200
        });
    } catch (error) {
        console.error("❌ 입찰 처리 중 오류 발생:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: "입찰 처리 중 오류가 발생했습니다",
            details: error instanceof Error ? error.message : "알 수 없는 오류"
        }, {
            status: 500
        });
    }
}
/**
 * 시뮬레이션 결과 계산 함수
 * 매물의 위험도와 입찰가를 기반으로 결과를 계산합니다.
 */ function calculateSimulationResult(auctionItem, bidAmount) {
    const { appraisedValue, marketPrice, riskType } = auctionItem;
    console.log(`🔍 시뮬레이션 계산 시작 - 입찰가: ${bidAmount}원, 감정가: ${appraisedValue}원, 시장가: ${marketPrice}원`);
    // 원래 시장가와 감정가를 유지 (조정하지 않음)
    console.log(`📊 원래 가격 유지 - 시장가: ${marketPrice}원, 감정가: ${appraisedValue}원`);
    // 기본 확률 계산 (감정가 대비 입찰가 비율)
    const bidRatio = bidAmount / appraisedValue;
    // 위험도에 따른 성공 확률 조정
    let successProbability = 0.7; // 기본 성공 확률 70%
    switch(riskType){
        case "LOW":
            successProbability = 0.9; // 낮은 위험: 90%
            break;
        case "MEDIUM":
            successProbability = 0.7; // 중간 위험: 70%
            break;
        case "HIGH":
            successProbability = 0.4; // 높은 위험: 40%
            break;
        case "VERY_HIGH":
            successProbability = 0.2; // 매우 높은 위험: 20%
            break;
    }
    // 입찰가가 감정가보다 높으면 성공 확률 감소
    if (bidAmount > appraisedValue) {
        successProbability *= 0.5;
    }
    // 랜덤 결과 생성
    const randomValue = Math.random();
    const isSuccess = randomValue < successProbability;
    let profitOrLoss = 0;
    let recommendation = "";
    if (isSuccess) {
        // 성공한 경우
        // 수익 계산 (원래 시장가 - 입찰가)
        profitOrLoss = marketPrice - bidAmount;
        if (profitOrLoss > 0) {
            // 이익인 경우
            recommendation = "🎉 축하합니다! 수익을 거두었습니다.";
            console.log(`💰 이익 발생: ${profitOrLoss}원`);
        } else {
            // 손실인 경우
            recommendation = "⚠️ 입찰가가 시장가보다 높아 손실이 발생했습니다.";
            console.log(`💸 손실 발생: ${Math.abs(profitOrLoss)}원`);
        }
    } else {
        // 실패한 경우
        profitOrLoss = -bidAmount; // 입찰가만큼 손실
        recommendation = "❌ 입찰에 실패했습니다. 다음 기회를 노려보세요.";
        console.log(`❌ 입찰 실패: ${bidAmount}원 손실`);
    }
    // 시뮬레이션 결과 반환
    return {
        profitOrLoss,
        recommendation,
        successProbability: Math.round(successProbability * 100)
    };
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__6d45ebcb._.js.map