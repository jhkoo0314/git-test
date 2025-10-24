import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

/**
 * Gmail API를 사용하여 이메일을 전송하는 API 라우트
 *
 * 요청 본문 예시:
 * {
 *   "to": "recipient@example.com",
 *   "subject": "제목",
 *   "text": "텍스트 내용",
 *   "html": "<p>HTML 내용</p>" (선택사항)
 * }
 */

// OAuth2 클라이언트 생성
function createGmailClient() {
  console.log("📧 Gmail API 클라이언트 생성 중...");

  const oauth2Client = new google.auth.OAuth2(
    process.env.GMAIL_CLIENT_ID,
    process.env.GMAIL_CLIENT_SECRET,
    "https://developers.google.com/oauthplayground" // Redirect URL
  );

  // Refresh Token 설정
  oauth2Client.setCredentials({
    refresh_token: process.env.GMAIL_REFRESH_TOKEN,
  });

  return google.gmail({ version: "v1", auth: oauth2Client });
}

// 이메일 메시지 생성 (Base64로 인코딩)
function createEmailMessage(
  to: string,
  subject: string,
  text: string,
  html?: string
) {
  const from = process.env.GMAIL_USER_EMAIL;

  const messageParts = [
    `From: ${from}`,
    `To: ${to}`,
    "Content-Type: text/html; charset=utf-8",
    "MIME-Version: 1.0",
    `Subject: ${subject}`,
    "",
    html || text, // HTML이 있으면 HTML 사용, 없으면 텍스트 사용
  ];

  const message = messageParts.join("\n");

  // Base64 URL-safe 인코딩
  const encodedMessage = Buffer.from(message)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  return encodedMessage;
}

/**
 * POST 요청 처리: 이메일 전송
 */
export async function POST(request: NextRequest) {
  console.log("📧 이메일 전송 요청 시작");

  try {
    // 환경 변수 확인
    if (
      !process.env.GMAIL_CLIENT_ID ||
      !process.env.GMAIL_CLIENT_SECRET ||
      !process.env.GMAIL_REFRESH_TOKEN ||
      !process.env.GMAIL_USER_EMAIL
    ) {
      console.log("❌ Gmail API 환경 변수가 설정되지 않았습니다");
      return NextResponse.json(
        {
          success: false,
          error:
            "Gmail API 설정이 완료되지 않았습니다. 환경 변수를 확인해주세요.",
        },
        { status: 500 }
      );
    }

    // 요청 본문 파싱
    const body = await request.json();
    const { to, subject, text, html } = body;

    console.log("📬 이메일 정보:", {
      to,
      subject,
      from: process.env.GMAIL_USER_EMAIL,
      hasHtml: !!html,
    });

    // 필수 필드 검증
    if (!to || !subject || !text) {
      console.log("❌ 필수 필드 누락");
      return NextResponse.json(
        {
          success: false,
          error: "수신자(to), 제목(subject), 내용(text)은 필수 항목입니다.",
        },
        { status: 400 }
      );
    }

    // Gmail 클라이언트 생성
    const gmail = createGmailClient();

    // 이메일 메시지 생성
    const encodedMessage = createEmailMessage(to, subject, text, html);
    console.log("✉️ 이메일 메시지 인코딩 완료");

    // Gmail API로 이메일 전송
    console.log("📤 Gmail API를 통해 이메일 전송 중...");
    const result = await gmail.users.messages.send({
      userId: "me",
      requestBody: {
        raw: encodedMessage,
      },
    });

    console.log("✅ 이메일 전송 성공:", result.data.id);

    return NextResponse.json({
      success: true,
      data: {
        messageId: result.data.id,
        to,
        subject,
        sentAt: new Date().toISOString(),
      },
      message: "이메일이 성공적으로 전송되었습니다.",
    });
  } catch (error: any) {
    console.error("❌ 이메일 전송 실패:", error);

    // 에러 메시지 세부 정보
    let errorMessage = "이메일 전송에 실패했습니다.";

    if (error.code === "invalid_grant") {
      errorMessage =
        "Gmail API 인증이 만료되었습니다. Refresh Token을 갱신해주세요.";
    } else if (error.message) {
      errorMessage = error.message;
    }

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
        details: error.message || "알 수 없는 오류",
      },
      { status: 500 }
    );
  }
}
