import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

export async function POST(request: NextRequest) {
  try {
    console.log("📝 사용자 정보 수집 API 호출"); // 로그 추가

    const body = await request.json();
    const { name, email, propertyTitle, purpose, metadata } = body;

    // 필수 필드 검증
    if (!name || !email) {
      console.error("❌ 필수 필드 누락:", { name, email }); // 로그 추가
      return NextResponse.json(
        { success: false, error: "이름과 이메일은 필수입니다." },
        { status: 400 }
      );
    }

    console.log("👤 수집된 데이터:", {
      name,
      email,
      purpose: purpose || "general",
      propertyTitle,
      metadata,
    }); // 로그 추가

    // 환경 변수 검증
    const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY;
    const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
    const sheetId = process.env.GOOGLE_SHEET_ID;

    if (!privateKey || !clientEmail || !sheetId) {
      console.error("❌ 구글 시트 환경 변수 누락"); // 로그 추가
      return NextResponse.json(
        { success: false, error: "서버 설정 오류가 발생했습니다." },
        { status: 500 }
      );
    }

    // 구글 시트 API 인증 설정
    const auth = new google.auth.GoogleAuth({
      credentials: {
        private_key: privateKey.replace(/\\n/g, "\n"),
        client_email: clientEmail,
      },
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

    // 시트에 데이터 추가
    const purposeText = purpose || "일반 문의";
    const metadataText = metadata ? JSON.stringify(metadata) : "";
    const propertyInfo = propertyTitle || "알 수 없음";

    const values = [
      [name, email, purposeText, propertyInfo, metadataText, timestamp],
    ];

    console.log("📊 구글 시트에 데이터 추가:", {
      name,
      email,
      purpose: purposeText,
      propertyTitle: propertyInfo,
      metadata: metadataText,
      timestamp,
    }); // 로그 추가

    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: "A:F", // A열부터 F열까지 (이름, 이메일, 목적, 물건정보, 메타데이터, 시간)
      valueInputOption: "RAW",
      requestBody: {
        values: values,
      },
    });

    console.log("✅ 구글 시트 데이터 추가 성공"); // 로그 추가

    return NextResponse.json({
      success: true,
      message: "정상 처리되었습니다. 정식출시가 되면 알려 드리겠습니다.",
    });
  } catch (error) {
    console.error("❌ 구글 시트 연동 오류:", error); // 로그 추가

    return NextResponse.json(
      {
        success: false,
        error: "데이터 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
      },
      { status: 500 }
    );
  }
}
