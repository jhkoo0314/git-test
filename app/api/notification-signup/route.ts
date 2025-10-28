import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

/**
 * 🔔 출시 알림 신청 API
 *
 * POST /api/notification-signup
 *
 * 요청 본문:
 * - name: 사용자 이름
 * - email: 사용자 이메일
 */
export async function POST(request: NextRequest) {
  try {
    console.log("🔔 출시 알림 신청 요청 시작");

    // 환경 변수 확인
    const spreadsheetId = process.env.SPREADSHEET_DOC_ID;
    const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY;

    if (!spreadsheetId || !serviceAccountEmail || !privateKey) {
      console.log("❌ Google Sheets API 환경 변수가 설정되지 않았습니다");
      return NextResponse.json(
        {
          success: false,
          error:
            "Google Sheets API 환경 변수가 설정되지 않았습니다. .env 파일을 확인하세요.",
        },
        { status: 500 }
      );
    }

    // 요청 본문 파싱
    const body = await request.json();
    const { name, email } = body;

    // 필수 필드 검증
    if (!name || !email) {
      console.log("❌ 필수 필드 누락:", { name, email });
      return NextResponse.json(
        { success: false, error: "이름과 이메일은 필수입니다." },
        { status: 400 }
      );
    }

    console.log("📄 출시 알림 신청 데이터:", { name, email });

    // Google Sheets API 인증 설정
    const auth = new google.auth.JWT({
      email: serviceAccountEmail,
      key: privateKey.replace(/\\n/g, "\n"), // 줄바꿈 문자 처리
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

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

    // 출시 알림 신청 데이터 행 준비
    const values = [
      [name, email, "출시 알림 신청", "상세 리포트 기능", "", timestamp],
    ];

    console.log("🔄 구글 시트에 출시 알림 신청 데이터 추가 중...");

    // 시트에 데이터 추가
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "A:F", // A열부터 F열까지
      valueInputOption: "RAW",
      requestBody: {
        values,
      },
    });

    console.log("✅ 출시 알림 신청 데이터 추가 성공:", response.data);

    return NextResponse.json({
      success: true,
      message:
        "🎉 출시 알림 신청이 완료되었습니다! 상세 리포트 기능이 출시되면 알려드리겠습니다.",
      data: {
        updatedRange: response.data.updates?.updatedRange,
        updatedRows: response.data.updates?.updatedRows,
      },
    });
  } catch (error) {
    console.error("❌ 출시 알림 신청 실패:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "출시 알림 신청에 실패했습니다.",
      },
      { status: 500 }
    );
  }
}
