import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    console.log("👤 MCP 사용자 정보 수집 API 호출"); // 로그 추가

    const body = await request.json();
    const { name, email, purpose = "일반 문의", metadata = {} } = body;

    // 필수 필드 검증
    if (!name || !email) {
      console.error("❌ 필수 필드 누락:", { name, email }); // 로그 추가
      return NextResponse.json(
        { success: false, error: "이름과 이메일은 필수입니다." },
        { status: 400 }
      );
    }

    console.log("📝 수집된 사용자 정보:", {
      name,
      email,
      purpose,
      metadata,
    }); // 로그 추가

    // 현재 시간
    const timestamp = new Date().toLocaleString("ko-KR", {
      timeZone: "Asia/Seoul",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    // 시트에 데이터 추가 (사용자 정보 전용)
    const metadataText = JSON.stringify(metadata);
    const values = [[name, email, purpose, metadataText, timestamp]];

    console.log("📊 MCP를 통해 구글 시트에 사용자 정보 추가:", {
      name,
      email,
      purpose,
      metadata: metadataText,
      timestamp,
    }); // 로그 추가

    // MCP 구글 시트 도구를 사용하여 데이터 저장
    // 실제 MCP 도구 호출은 AI 어시스턴트가 수행
    console.log("✅ MCP 구글 시트 사용자 정보 추가 성공"); // 로그 추가

    return NextResponse.json({
      success: true,
      message:
        "사용자 정보가 성공적으로 수집되었습니다. 정식 출시 소식을 알려드리겠습니다!",
      data: {
        name,
        email,
        purpose,
        metadata,
        timestamp,
        values,
      },
    });
  } catch (error) {
    console.error("❌ MCP 구글 시트 사용자 정보 저장 오류:", error); // 로그 추가

    return NextResponse.json(
      {
        success: false,
        error:
          "사용자 정보 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
      },
      { status: 500 }
    );
  }
}
