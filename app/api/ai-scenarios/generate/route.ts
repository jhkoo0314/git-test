import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getWeekStart } from "@/lib/dateUtils";
import {
  generateScenario,
  ScenarioParams,
  generateAuctionMasterFromScenario,
} from "@/lib/scenarioGenerator";

const prisma = new PrismaClient();

/**
 * 🎯 AI 시나리오 생성 API (현재 경매매물 양식 적용)
 * POST /api/ai-scenarios/generate
 * Body: { userId: string, params: ScenarioParams }
 */
export async function POST(request: NextRequest) {
  try {
    console.log("🎯 AI 시나리오 생성 API 호출");

    const body = await request.json();
    const { userId, params, isDevMode } = body;

    // 필수 필드 검증
    if (!userId) {
      console.error("❌ userId 누락");
      return NextResponse.json(
        { success: false, error: "userId가 필요합니다." },
        { status: 400 }
      );
    }

    if (!params) {
      console.error("❌ params 누락");
      return NextResponse.json(
        { success: false, error: "시나리오 파라미터가 필요합니다." },
        { status: 400 }
      );
    }

    console.log("👤 사용자 ID:", userId);
    console.log("⚙️ 파라미터:", params);
    console.log("🔍 클라이언트 개발자 모드:", isDevMode);

    // 현재 주의 시작일 계산
    const weekStart = getWeekStart();
    console.log("📅 현재 주 시작일:", weekStart);

    // DB에서 사용량 조회 또는 생성
    let usage = await prisma.aIScenarioUsage.findUnique({
      where: {
        userId_weekStart: {
          userId: userId,
          weekStart: weekStart,
        },
      },
    });

    if (!usage) {
      console.log("📝 새로운 주간 사용량 레코드 생성");
      usage = await prisma.aIScenarioUsage.create({
        data: {
          userId: userId,
          weekStart: weekStart,
          usageCount: 0,
        },
      });
    }

    // 개발 환경 및 개발자 모드 체크
    const isDevelopment = process.env.NODE_ENV === "development";
    // 🎯 중요: 개발 환경이면서 클라이언트에서 개발자 모드가 활성화된 경우에만 무제한
    const isUnlimited = isDevelopment && isDevMode === true;

    // 사용 제한 확인 (5개) - 무제한 모드가 아닌 경우에만 체크
    const limit = 5;
    if (!isUnlimited && usage.usageCount >= limit) {
      console.log("⚠️ 사용 제한 초과:", usage.usageCount);
      return NextResponse.json(
        {
          success: false,
          error: `이번 주 무료 생성 한도(${limit}개)를 모두 사용했습니다. 다음 주 일요일에 초기화됩니다.`,
        },
        { status: 403 }
      );
    }

    if (isUnlimited) {
      console.log(
        "🔓 무제한 모드 활성화 (개발 환경 + 개발자 모드) - 현재 사용량:",
        usage.usageCount
      );
    } else if (isDevelopment && !isDevMode) {
      console.log(
        "👤 일반 사용자 모드 (개발 환경이지만 횟수 차감) - 현재 사용량:",
        usage.usageCount,
        "/",
        limit
      );
    } else {
      console.log("📊 현재 사용량:", usage.usageCount, "/", limit);
    }

    // 시나리오 생성
    console.log("🎲 시나리오 생성 시작...");
    const scenario = generateScenario(params as ScenarioParams);
    console.log("✅ 시나리오 생성 완료:", scenario.caseId);

    // 🎯 현재 경매매물 양식으로 변환
    console.log("🔄 경매매물 양식으로 변환 시작...");
    const auctionMaster = generateAuctionMasterFromScenario(
      scenario,
      params as ScenarioParams
    );
    console.log("✅ 경매매물 양식 변환 완료:", auctionMaster.item.title);

    // 사용량 증가 (무제한 모드가 아닌 경우에만 증가)
    if (!isUnlimited) {
      await prisma.aIScenarioUsage.update({
        where: {
          id: usage.id,
        },
        data: {
          usageCount: usage.usageCount + 1,
        },
      });
      console.log("💰 사용량 증가:", usage.usageCount + 1, "/", limit);
    } else {
      console.log("💰 무제한 모드: 사용량 증가하지 않음");
    }

    // 🎯 경매매물 양식 + 기존 시나리오 구조 + 정답분석 통합 반환
    return NextResponse.json({
      success: true,
      data: {
        // 🔹 기존 시나리오 구조 (프론트엔드 호환성 유지)
        caseId: scenario.caseId,
        propertyInfo: scenario.propertyInfo,
        documents: scenario.documents,
        correctAnswer: scenario.correctAnswer,

        // 🔹 경매매물 양식 (현재 경매매물과 동일한 구조) - 추가 데이터
        auction: {
          id: scenario.caseId,
          ...auctionMaster.item,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        detail: auctionMaster.detail,
        rights: auctionMaster.rights,
        tenants: auctionMaster.tenants,
        schedule: auctionMaster.schedule,
      },
      usage: {
        current: isUnlimited ? usage.usageCount : usage.usageCount + 1,
        limit: isUnlimited ? 999 : limit,
        remaining: isUnlimited ? 999 : limit - (usage.usageCount + 1),
      },
    });
  } catch (error) {
    console.error("❌ 시나리오 생성 오류:", error);
    return NextResponse.json(
      {
        success: false,
        error: "시나리오 생성 중 오류가 발생했습니다.",
      },
      { status: 500 }
    );
  }
}
