import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

/**
 * 📊 구글 시트에 경매 결과 데이터를 추가하는 API
 *
 * POST /api/sheets/append
 *
 * 요청 본문:
 * - date: 날짜 (YYYY-MM-DD)
 * - userId: 사용자 ID
 * - itemTitle: 매물 제목
 * - appraisedValue: 감정가
 * - startingBid: 시작 입찰가
 * - finalBid: 최종 입찰가
 * - result: 결과 ("성공" 또는 "실패")
 * - profitOrLoss: 손익
 */
export async function POST(request: NextRequest) {
  try {
    console.log("📊 구글 시트 데이터 추가 요청 시작");

    // 환경 변수 확인
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
    const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY;

    if (!spreadsheetId || !serviceAccountEmail || !privateKey) {
      console.log("❌ Google Sheets API 환경 변수가 설정되지 않았습니다");
      return NextResponse.json(
        {
          success: false,
          error:
            "Google Sheets API 환경 변수가 설정되지 않았습니다. .env.local 파일을 확인하세요.",
        },
        { status: 500 }
      );
    }

    // 요청 본문 파싱
    const body = await request.json();
    const {
      date,
      userId,
      itemTitle,
      appraisedValue,
      startingBid,
      finalBid,
      result,
      profitOrLoss,
    } = body;

    console.log("📄 요청 데이터:", {
      date,
      userId,
      itemTitle,
      appraisedValue,
      startingBid,
      finalBid,
      result,
      profitOrLoss,
    });

    // Google Sheets API 인증 설정
    const auth = new google.auth.JWT({
      email: serviceAccountEmail,
      key: privateKey.replace(/\\n/g, "\n"), // 줄바꿈 문자 처리
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    // 데이터 행 준비 (헤더: 날짜, 사용자ID, 매물제목, 감정가, 시작입찰가, 최종입찰가, 결과, 손익)
    const values = [
      [
        date,
        userId,
        itemTitle,
        appraisedValue,
        startingBid,
        finalBid,
        result,
        profitOrLoss,
      ],
    ];

    console.log("🔄 구글 시트에 데이터 추가 중...");

    // 시트에 데이터 추가
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "경매결과!A:H", // 시트 이름과 범위
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values,
      },
    });

    console.log("✅ 구글 시트에 데이터 추가 성공:", response.data);

    return NextResponse.json({
      success: true,
      message: "데이터가 구글 시트에 저장되었습니다.",
      data: {
        updatedRange: response.data.updates?.updatedRange,
        updatedRows: response.data.updates?.updatedRows,
      },
    });
  } catch (error) {
    console.error("❌ 구글 시트 데이터 추가 실패:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "구글 시트 데이터 추가에 실패했습니다.",
      },
      { status: 500 }
    );
  }
}
