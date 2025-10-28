/**
 * Gmail API 이메일 전송 테스트 예제
 *
 * 이 파일은 이메일 전송 API를 테스트하는 예제입니다.
 * 실제로는 브라우저나 서버에서 fetch를 사용하여 호출합니다.
 */

// 1. 기본 텍스트 이메일 전송
export async function sendBasicEmail() {
  const response = await fetch("http://localhost:3000/api/send-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      to: "test@example.com",
      subject: "테스트 이메일",
      text: "이것은 테스트 이메일입니다.",
    }),
  });

  const data = await response.json();
  console.log("📧 응답:", data);
  return data;
}

// 2. HTML 이메일 전송
export async function sendHtmlEmail() {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #3b82f6; color: white; padding: 20px; text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📧 테스트 이메일</h1>
          </div>
          <p>이것은 HTML 형식의 테스트 이메일입니다.</p>
        </div>
      </body>
    </html>
  `;

  const response = await fetch("http://localhost:3000/api/send-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      to: "test@example.com",
      subject: "HTML 테스트 이메일",
      text: "이것은 HTML 형식의 테스트 이메일입니다.",
      html: htmlContent,
    }),
  });

  const data = await response.json();
  console.log("📧 응답:", data);
  return data;
}

// 3. 입찰 결과 이메일 (시뮬레이션)
export async function sendBidResultEmail() {
  const bidResult = {
    userName: "홍길동",
    auctionTitle: "서울 강남구 아파트",
    bidAmount: 50000000,
    result: "성공",
    profitOrLoss: 5000000,
    marketPrice: 55000000,
  };

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; }
          .container { max-width: 600px; margin: 0 auto; background-color: white; }
          .header { background: linear-gradient(to right, #3b82f6, #1d4ed8); color: white; padding: 30px; text-align: center; }
          .content { padding: 30px; }
          .result-box { border: 2px solid #10b981; border-radius: 10px; padding: 20px; margin: 20px 0; background-color: #f0fdf4; }
          .profit { color: #059669; font-size: 28px; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>💰 입찰 결과 알림</h1>
          </div>
          <div class="content">
            <h2>안녕하세요, ${bidResult.userName}님!</h2>
            <div class="result-box">
              <h3>🎉 입찰 성공!</h3>
              <p>경매 물건: ${bidResult.auctionTitle}</p>
              <p>입찰가: ${bidResult.bidAmount.toLocaleString("ko-KR")}원</p>
              <p>시장가: ${bidResult.marketPrice.toLocaleString("ko-KR")}원</p>
              <div class="profit">수익: +${bidResult.profitOrLoss.toLocaleString(
                "ko-KR"
              )}원</div>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;

  const response = await fetch("http://localhost:3000/api/send-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      to: "test@example.com",
      subject: `[Bid Master] ${bidResult.auctionTitle} 입찰 결과`,
      text: `${bidResult.userName}님의 입찰이 성공했습니다!`,
      html: htmlContent,
    }),
  });

  const data = await response.json();
  console.log("📧 응답:", data);
  return data;
}

// 사용 예시:
// sendBasicEmail();
// sendHtmlEmail();
// sendBidResultEmail();
