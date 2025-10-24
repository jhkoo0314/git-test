import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

/**
 * 📊 구글 시트에서 경매 결과 데이터를 읽어오는 API
 *
 * GET /api/sheets/read?limit=10
 *
 * 쿼리 파라미터:
 * - limit: 가져올 데이터 개수 (기본값: 10, 최대: 100)
 */
export async function GET(request: NextRequest) {
  try {
    console.log("🔍 구글 시트 데이터 조회 요청 시작");

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

    // 쿼리 파라미터에서 limit 가져오기
    const { searchParams } = new URL(request.url);
    const limitParam = searchParams.get("limit");
    const limit = limitParam ? Math.min(parseInt(limitParam, 10), 100) : 10;

    console.log(`📄 조회할 데이터 개수: ${limit}`);

    // Google Sheets API 인증 설정
    const auth = new google.auth.JWT({
      email: serviceAccountEmail,
      key: privateKey.replace(/\\n/g, "\n"), // 줄바꿈 문자 처리
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    console.log("🔄 구글 시트에서 데이터 조회 중...");

    // 시트에서 데이터 읽기 (헤더 포함)
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "경매결과!A:H", // 시트 이름과 범위
    });

    const rows = response.data.values;

    if (!rows || rows.length === 0) {
      console.log("📭 구글 시트에 데이터가 없습니다");
      return NextResponse.json({
        success: true,
        data: [],
        message: "저장된 데이터가 없습니다.",
      });
    }

    // 첫 번째 행은 헤더이므로 제외하고, limit만큼만 가져오기
    const headers = rows[0];
    const dataRows = rows.slice(1, limit + 1);

    // 객체 배열로 변환
    const data = dataRows.map((row: any[]) => ({
      date: row[0] || "",
      userId: row[1] || "",
      itemTitle: row[2] || "",
      appraisedValue: parseInt(row[3]) || 0,
      startingBid: parseInt(row[4]) || 0,
      finalBid: parseInt(row[5]) || 0,
      result: row[6] || "",
      profitOrLoss: parseInt(row[7]) || 0,
    }));

    console.log(`✅ 구글 시트에서 ${data.length}개의 데이터 조회 성공`);

    return NextResponse.json({
      success: true,
      data,
      total: rows.length - 1, // 헤더 제외한 전체 데이터 개수
      headers,
    });
  } catch (error) {
    console.error("❌ 구글 시트 데이터 조회 실패:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "구글 시트 데이터 조회에 실패했습니다.",
      },
      { status: 500 }
    );
  }
}
