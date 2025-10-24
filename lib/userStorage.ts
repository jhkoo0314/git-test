/**
 * 브라우저 로컬 저장소를 사용한 사용자 식별 유틸리티
 */

const USER_ID_KEY = "bid_master_user_id";

/**
 * UUID v4 생성 함수
 * @returns UUID 문자열
 */
function generateUUID(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * 로컬 저장소에서 userId를 가져오거나 새로 생성
 * @returns userId 문자열
 */
export function getUserId(): string {
  // 서버 사이드에서는 빈 문자열 반환
  if (typeof window === "undefined") {
    return "";
  }

  try {
    let userId = localStorage.getItem(USER_ID_KEY);

    if (!userId) {
      // userId가 없으면 새로 생성
      userId = generateUUID();
      localStorage.setItem(USER_ID_KEY, userId);
      console.log("👤 새로운 사용자 ID 생성:", userId);
    } else {
      console.log("👤 기존 사용자 ID 로드:", userId);
    }

    return userId;
  } catch (error) {
    console.error("❌ 로컬 저장소 접근 오류:", error);
    // 로컬 저장소 접근 실패 시 임시 ID 반환
    return generateUUID();
  }
}

/**
 * userId 초기화 (테스트용)
 */
export function clearUserId(): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.removeItem(USER_ID_KEY);
    console.log("🗑️ 사용자 ID 초기화됨");
  } catch (error) {
    console.error("❌ 로컬 저장소 접근 오류:", error);
  }
}
