/**
 * 사용자 정보 구글 시트 연동 테스트 스크립트
 *
 * 사용법:
 * 1. .env.local 파일에 환경 변수 설정
 * 2. 서버 실행: pnpm run dev
 * 3. 이 스크립트 실행: npx tsx examples/user-info-test.ts
 */

async function testUserInfoAPI() {
  console.log("🧪 사용자 정보 API 테스트 시작");

  const testData = {
    name: "테스트 사용자",
    email: "test@example.com",
    purpose: "API 테스트",
    metadata: {
      source: "test-script",
      timestamp: new Date().toISOString(),
      userAgent: "test-agent",
    },
  };

  try {
    console.log("📤 테스트 데이터 전송:", testData);

    const response = await fetch("http://localhost:3000/api/user-info", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testData),
    });

    const result = await response.json();

    if (response.ok && result.success) {
      console.log("✅ 테스트 성공!");
      console.log("📊 응답:", result);
    } else {
      console.error("❌ 테스트 실패!");
      console.error("📊 에러 응답:", result);
    }
  } catch (error) {
    console.error("❌ 네트워크 오류:", error);
  }
}

// 테스트 실행
testUserInfoAPI();
