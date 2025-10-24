import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getWeekStart } from "@/lib/dateUtils";

const prisma = new PrismaClient();

/**
 * AI 시나리오 사용량 조회 API
 * GET /api/ai-scenarios/usage?userId={userId}
 */
export async function GET(request: NextRequest) {
  try {
    console.log("🔍 AI 시나리오 사용량 조회 API 호출");

    // URL 파라미터에서 userId와 isDevMode 가져오기
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const isDevModeParam = searchParams.get("isDevMode");
    const isDevMode = isDevModeParam === "true";

    if (!userId) {
      console.error("❌ userId 누락");
      return NextResponse.json(
        { success: false, error: "userId가 필요합니다." },
        { status: 400 }
      );
    }

    console.log("👤 사용자 ID:", userId);
    console.log("🔍 클라이언트 개발자 모드:", isDevMode);

    // 현재 주의 시작일 계산
    const weekStart = getWeekStart();
    console.log("📅 현재 주 시작일:", weekStart);

    // DB에서 사용량 조회
    const usage = await prisma.aIScenarioUsage.findUnique({
      where: {
        userId_weekStart: {
          userId: userId,
          weekStart: weekStart,
        },
      },
    });

    const usageCount = usage?.usageCount || 0;
    const limit = 5;

    // 개발 환경 및 개발자 모드 체크
    const isDevelopment = process.env.NODE_ENV === "development";
    // 🎯 중요: 개발 환경이면서 클라이언트에서 개발자 모드가 활성화된 경우에만 무제한
    const isUnlimited = isDevelopment && isDevMode === true;
    const remaining = isUnlimited ? 999 : Math.max(0, limit - usageCount);

    console.log("📊 사용량 정보:", {
      usageCount,
      limit: isUnlimited ? "무제한" : limit,
      remaining: isUnlimited ? "무제한" : remaining,
      weekStart: weekStart.toISOString(),
      environment: isDevelopment ? "개발" : "프로덕션",
      clientDevMode: isDevMode,
      isUnlimited,
    });

    if (isUnlimited) {
      console.log("🔓 무제한 모드 활성화 (개발 환경 + 개발자 모드)");
    } else if (isDevelopment && !isDevMode) {
      console.log("👤 일반 사용자 모드 (개발 환경이지만 횟수 제한)");
    }

    return NextResponse.json({
      success: true,
      data: {
        usageCount,
        limit: isUnlimited ? 999 : limit,
        remaining,
        weekStart: weekStart.toISOString(),
      },
    });
  } catch (error) {
    console.error("❌ 사용량 조회 오류:", error);
    return NextResponse.json(
      {
        success: false,
        error: "사용량 조회 중 오류가 발생했습니다.",
      },
      { status: 500 }
    );
  }
}
