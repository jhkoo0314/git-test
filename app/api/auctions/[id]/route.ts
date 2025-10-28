import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { generateAuctionMaster } from "@/lib/scenarioGenerator";

const prisma = new PrismaClient();

// GET /api/auctions/[id] - 특정 매물의 상세 정보 조회
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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
      return NextResponse.json(
        {
          success: false,
          error: "매물 ID가 필요합니다.",
        },
        { status: 400 }
      );
    }

    const id = resolvedParams.id;
    console.log("🔍 받은 매물 ID:", id);

    // DB 조회 (상세/권리/임차/일정 포함)
    console.log("🔍 DB에서 매물 조회 시도");
    let item = await prisma.auctionItem.findUnique({
      where: { id },
      include: {
        detail: true,
        rights: true,
        tenants: true,
        scheduleEvents: true,
      },
    });

    // 없으면 AI로 생성 후 upsert
    if (!item) {
      console.log("📭 DB 미존재 → 🤖 AI 마스터 생성 및 DB 저장 진행");

      try {
        // 간단한 테스트 데이터 생성
        const testData = {
          item: {
            title: `테스트 매물 ${id}`,
            itemType: "아파트",
            imageUrl: null,
            appraisedValue: 1000000000, // 10억
            startingBid: 800000000, // 8억
            marketPrice: 950000000, // 9.5억
            riskType: "LOW" as const,
            riskData: null,
          },
          detail: {
            caseNumber: `2024타경${Math.floor(Math.random() * 10000)}`,
            address: "서울특별시 강남구 테스트동 123-45",
            propertyType: "아파트",
            landArea: 100,
            buildingArea: 84,
            buildYear: 2020,
            floor: 5,
            usage: "주거",
            memo: null,
          },
          rights: [
            {
              rightType: "근저당권",
              rank: 1,
              establishedAt: "2024-01-15",
              claimAmount: 500000000, // 5억
              isBaseRight: true,
              holder: "신한은행",
              memo: null,
            },
          ],
          tenants: [],
          schedule: [
            {
              eventDate: "2024-10-26",
              eventType: "공고",
              memo: "매각 공고",
            },
            {
              eventDate: "2024-11-26",
              eventType: "입찰일",
              memo: "1회차",
            },
          ],
        };

        console.log("✅ 테스트 데이터 생성 완료:", testData.item.title);

        const created = await prisma.auctionItem.create({
          data: {
            title: testData.item.title,
            itemType: testData.item.itemType,
            imageUrl: testData.item.imageUrl,
            appraisedValue: testData.item.appraisedValue,
            startingBid: testData.item.startingBid,
            marketPrice: testData.item.marketPrice,
            riskType: testData.item.riskType,
            riskData: testData.item.riskData,
            detail: {
              create: testData.detail,
            },
            rights: { create: testData.rights },
            tenants: { create: testData.tenants },
            scheduleEvents: { create: testData.schedule },
          },
          include: {
            detail: true,
            rights: true,
            tenants: true,
            scheduleEvents: true,
          },
        });

        console.log("✅ 테스트 데이터 DB 저장 완료:", created.id);
        item = created;
      } catch (aiError) {
        console.error("❌ 테스트 데이터 생성 실패:", aiError);
        console.error(
          "❌ AI 에러 스택:",
          aiError instanceof Error ? aiError.stack : "스택 없음"
        );
        throw new Error(
          `테스트 데이터 생성 실패: ${
            aiError instanceof Error ? aiError.message : String(aiError)
          }`
        );
      }
    } else {
      console.log("✅ DB에서 매물 조회 성공:", item.id);
    }

    // 응답 데이터 구성 (섹션별)
    const responseData = {
      auction: {
        id: item.id,
        title: item.title,
        marketPrice: item.marketPrice,
        appraisedValue: item.appraisedValue,
        startingBid: item.startingBid,
        riskType: item.riskType,
      },
      detail: item.detail,
      rights: item.rights,
      tenants: item.tenants,
      schedule: item.scheduleEvents,
    } as const;

    console.log("📊 섹션 데이터 구성 완료");

    return NextResponse.json({ success: true, data: responseData });
  } catch (error) {
    console.error("❌ 매물 상세 정보 조회 실패:", error);
    console.error(
      "❌ 에러 스택:",
      error instanceof Error ? error.stack : "스택 없음"
    );
    console.error("❌ 에러 타입:", typeof error);
    console.error(
      "❌ 에러 메시지:",
      error instanceof Error ? error.message : String(error)
    );

    return NextResponse.json(
      {
        success: false,
        error: "매물 정보를 불러오는데 실패했습니다.",
        details: error instanceof Error ? error.message : "알 수 없는 오류",
        stack: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}
