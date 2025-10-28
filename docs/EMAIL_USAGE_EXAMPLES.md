# 이메일 전송 기능 사용 예시

이 문서는 Gmail API를 사용한 이메일 전송 기능의 다양한 사용 예시를 제공합니다.

---

## 📋 목차

1. [기본 텍스트 이메일](#1-기본-텍스트-이메일)
2. [HTML 이메일](#2-html-이메일)
3. [입찰 결과 이메일](#3-입찰-결과-이메일)
4. [컴포넌트 사용법](#4-컴포넌트-사용법)
5. [고급 사용 예시](#5-고급-사용-예시)

---

## 1. 기본 텍스트 이메일

### API 직접 호출

```typescript
const sendSimpleEmail = async () => {
  const response = await fetch("/api/send-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      to: "user@example.com",
      subject: "안녕하세요!",
      text: "이것은 간단한 텍스트 이메일입니다.",
    }),
  });

  const data = await response.json();

  if (data.success) {
    console.log("✅ 이메일 전송 성공!");
  } else {
    console.error("❌ 전송 실패:", data.error);
  }
};
```

---

## 2. HTML 이메일

### 스타일이 적용된 이메일

```typescript
const sendHtmlEmail = async () => {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #3b82f6; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background-color: #f3f4f6; }
          .button { 
            background-color: #3b82f6; 
            color: white; 
            padding: 10px 20px; 
            text-decoration: none; 
            border-radius: 5px; 
            display: inline-block;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📧 Bid Master</h1>
          </div>
          <div class="content">
            <h2>환영합니다!</h2>
            <p>경매 시뮬레이션 플랫폼에 오신 것을 환영합니다.</p>
            <a href="https://your-domain.com" class="button">시작하기</a>
          </div>
        </div>
      </body>
    </html>
  `;

  const response = await fetch("/api/send-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      to: "user@example.com",
      subject: "Bid Master에 오신 것을 환영합니다!",
      text: "경매 시뮬레이션 플랫폼에 오신 것을 환영합니다.",
      html: htmlContent,
    }),
  });

  return response.json();
};
```

---

## 3. 입찰 결과 이메일

### 입찰 성공 알림

```typescript
interface BidResult {
  userName: string;
  auctionTitle: string;
  bidAmount: number;
  result: string;
  profitOrLoss: number;
  marketPrice: number;
}

const sendBidResultEmail = async (email: string, bidResult: BidResult) => {
  const isSuccess = bidResult.result === "성공";
  const formattedBid = bidResult.bidAmount.toLocaleString("ko-KR");
  const formattedMarket = bidResult.marketPrice.toLocaleString("ko-KR");
  const formattedProfit = Math.abs(bidResult.profitOrLoss).toLocaleString(
    "ko-KR"
  );

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; background-color: #f9fafb; }
          .container { max-width: 600px; margin: 0 auto; background-color: white; }
          .header { 
            background: linear-gradient(to right, #3b82f6, #1d4ed8);
            color: white; 
            padding: 30px; 
            text-align: center; 
          }
          .content { padding: 30px; }
          .result-box {
            border: 2px solid ${isSuccess ? "#10b981" : "#ef4444"};
            border-radius: 10px;
            padding: 20px;
            margin: 20px 0;
            background-color: ${isSuccess ? "#f0fdf4" : "#fef2f2"};
          }
          .result-title {
            font-size: 24px;
            font-weight: bold;
            color: ${isSuccess ? "#059669" : "#dc2626"};
            margin-bottom: 10px;
          }
          .info-row {
            display: flex;
            justify-content: space-between;
            padding: 10px 0;
            border-bottom: 1px solid #e5e7eb;
          }
          .info-label { font-weight: bold; color: #6b7280; }
          .info-value { color: #1f2937; }
          .profit { color: #059669; font-size: 28px; font-weight: bold; }
          .loss { color: #dc2626; font-size: 28px; font-weight: bold; }
          .footer { 
            background-color: #f3f4f6; 
            padding: 20px; 
            text-align: center; 
            color: #6b7280; 
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>💰 입찰 결과 알림</h1>
            <p>Bid Master 경매 시뮬레이션</p>
          </div>
          
          <div class="content">
            <h2>안녕하세요, ${bidResult.userName}님!</h2>
            <p>입찰하신 경매의 결과가 나왔습니다.</p>
            
            <div class="result-box">
              <div class="result-title">
                ${isSuccess ? "🎉 입찰 성공!" : "😔 입찰 실패"}
              </div>
              
              <div class="info-row">
                <span class="info-label">경매 물건</span>
                <span class="info-value">${bidResult.auctionTitle}</span>
              </div>
              
              <div class="info-row">
                <span class="info-label">입찰가</span>
                <span class="info-value">${formattedBid}원</span>
              </div>
              
              <div class="info-row">
                <span class="info-label">시장가</span>
                <span class="info-value">${formattedMarket}원</span>
              </div>
              
              <div style="text-align: center; margin-top: 20px;">
                <div style="color: #6b7280; margin-bottom: 5px;">
                  ${bidResult.profitOrLoss >= 0 ? "💰 수익" : "📉 손실"}
                </div>
                <div class="${bidResult.profitOrLoss >= 0 ? "profit" : "loss"}">
                  ${bidResult.profitOrLoss >= 0 ? "+" : "-"}${formattedProfit}원
                </div>
              </div>
            </div>
            
            <p style="color: #6b7280; margin-top: 20px;">
              ${
                isSuccess
                  ? "축하합니다! 성공적으로 낙찰되었습니다."
                  : "아쉽게도 낙찰에 실패했습니다. 다음 기회에 도전해보세요!"
              }
            </p>
          </div>
          
          <div class="footer">
            <p>이 메일은 Bid Master에서 자동으로 발송되었습니다.</p>
            <p>© 2024 Bid Master. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;

  const response = await fetch("/api/send-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      to: email,
      subject: `[Bid Master] ${bidResult.auctionTitle} 입찰 결과`,
      text: `${bidResult.userName}님의 입찰 결과: ${bidResult.result}`,
      html: htmlContent,
    }),
  });

  return response.json();
};
```

---

## 4. 컴포넌트 사용법

### ResultCard에서 이메일 전송

```typescript
"use client";

import { useState } from "react";
import EmailSendModal from "./EmailSendModal";

export default function ResultCard({ result }: { result: any }) {
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  // 이메일 내용 생성
  const emailSubject = `[Bid Master] ${result.auctionItem.title} 입찰 결과`;
  const emailContent = `
안녕하세요!

입찰 결과를 알려드립니다.

경매 물건: ${result.auctionItem.title}
입찰가: ${result.finalBid.toLocaleString("ko-KR")}원
결과: ${result.result}
손익: ${
    result.profitOrLoss >= 0 ? "+" : ""
  }${result.profitOrLoss.toLocaleString("ko-KR")}원

감사합니다.
Bid Master
  `;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* 결과 표시 */}
      <h2 className="text-2xl font-bold mb-4">입찰 결과</h2>
      <div className="space-y-2">
        <p>결과: {result.result}</p>
        <p>입찰가: {result.finalBid.toLocaleString("ko-KR")}원</p>
        <p>손익: {result.profitOrLoss.toLocaleString("ko-KR")}원</p>
      </div>

      {/* 이메일 전송 버튼 */}
      <button
        onClick={() => setIsEmailModalOpen(true)}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        📧 결과 이메일로 받기
      </button>

      {/* 이메일 전송 모달 */}
      <EmailSendModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        defaultSubject={emailSubject}
        defaultContent={emailContent}
      />
    </div>
  );
}
```

---

## 5. 고급 사용 예시

### 일괄 이메일 전송

```typescript
interface Recipient {
  email: string;
  name: string;
  customData: any;
}

const sendBulkEmails = async (recipients: Recipient[]) => {
  console.log(`📧 ${recipients.length}명에게 이메일 전송 시작`);

  const results = await Promise.allSettled(
    recipients.map(async (recipient) => {
      const htmlContent = `
        <h1>안녕하세요, ${recipient.name}님!</h1>
        <p>맞춤 정보: ${recipient.customData}</p>
      `;

      return fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: recipient.email,
          subject: `${recipient.name}님을 위한 맞춤 정보`,
          text: `안녕하세요, ${recipient.name}님!`,
          html: htmlContent,
        }),
      });
    })
  );

  const success = results.filter((r) => r.status === "fulfilled").length;
  const failed = results.filter((r) => r.status === "rejected").length;

  console.log(`✅ 성공: ${success}건, ❌ 실패: ${failed}건`);

  return { success, failed, total: recipients.length };
};
```

### 예약 발송 (시간 지연)

```typescript
const scheduleEmail = async (email: string, delayMinutes: number) => {
  const delayMs = delayMinutes * 60 * 1000;

  console.log(`⏰ ${delayMinutes}분 후 이메일 전송 예약`);

  setTimeout(async () => {
    await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: email,
        subject: "예약된 이메일",
        text: "이 이메일은 예약 전송되었습니다.",
      }),
    });

    console.log("✅ 예약 이메일 전송 완료");
  }, delayMs);
};

// 사용 예시: 10분 후 전송
scheduleEmail("user@example.com", 10);
```

---

## 🎯 실전 활용 팁

### 1. 에러 처리

```typescript
try {
  const response = await fetch("/api/send-email", {
    /* ... */
  });
  const data = await response.json();

  if (!data.success) {
    // 사용자에게 친화적인 에러 메시지 표시
    alert(`이메일 전송 실패: ${data.error}`);
  }
} catch (error) {
  console.error("네트워크 오류:", error);
  alert("이메일 전송 중 오류가 발생했습니다.");
}
```

### 2. 로딩 상태 관리

```typescript
const [isSending, setIsSending] = useState(false);

const handleSendEmail = async () => {
  setIsSending(true);
  try {
    await fetch("/api/send-email", {
      /* ... */
    });
  } finally {
    setIsSending(false);
  }
};
```

### 3. 성공/실패 피드백

```typescript
const [message, setMessage] = useState("");

const sendEmail = async () => {
  const response = await fetch("/api/send-email", {
    /* ... */
  });
  const data = await response.json();

  if (data.success) {
    setMessage("✅ 이메일이 전송되었습니다!");
    setTimeout(() => setMessage(""), 3000);
  } else {
    setMessage(`❌ 전송 실패: ${data.error}`);
  }
};
```

---

## 📚 참고사항

- **발송 제한**: Gmail API는 일일 발송 제한이 있습니다 (무료 계정: 500통/일)
- **스팸 방지**: 대량 발송 시 스팸으로 분류될 수 있으니 주의하세요
- **개인정보**: 이메일 주소는 안전하게 관리해야 합니다
- **테스트**: 실제 발송 전 테스트 계정으로 먼저 테스트하세요

---

더 많은 정보는 [Gmail API 공식 문서](https://developers.google.com/gmail/api)를 참고하세요! 🚀
