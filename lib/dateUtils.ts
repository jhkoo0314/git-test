/**
 * 날짜 관련 유틸리티 함수
 */

/**
 * 주어진 날짜가 속한 주의 시작일(일요일 00:00:00)을 반환
 * @param date 기준 날짜 (기본값: 현재)
 * @returns 주 시작일
 */
export function getWeekStart(date: Date = new Date()): Date {
  const weekStart = new Date(date);
  const day = weekStart.getDay(); // 0 (일요일) ~ 6 (토요일)

  // 일요일로 되돌리기
  weekStart.setDate(weekStart.getDate() - day);

  // 시간을 00:00:00.000으로 설정
  weekStart.setHours(0, 0, 0, 0);

  return weekStart;
}

/**
 * 주어진 기준일로부터 특정 일수만큼 이전 날짜를 생성
 * @param baseDate 기준 날짜
 * @param daysAgo 몇 일 전인지
 * @returns 생성된 날짜 (YYYY.MM.DD 형식)
 */
export function generateDateBeforeBase(
  baseDate: Date,
  daysAgo: number
): string {
  const date = new Date(baseDate);
  date.setDate(date.getDate() - daysAgo);

  return formatDate(date);
}

/**
 * 날짜를 YYYY.MM.DD 형식으로 포맷
 * @param date 날짜 객체
 * @returns 포맷된 날짜 문자열
 */
export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}.${month}.${day}`;
}

/**
 * 날짜를 YYYY년 MM월 DD일 형식으로 포맷 (한국어)
 * @param date 날짜 객체
 * @returns 포맷된 날짜 문자열
 */
export function formatDateKorean(date: Date): string {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}년 ${month}월 ${day}일`;
}

/**
 * 랜덤한 과거 날짜 생성 (특정 범위 내)
 * @param minDaysAgo 최소 며칠 전
 * @param maxDaysAgo 최대 며칠 전
 * @returns 생성된 날짜 (YYYY.MM.DD 형식)
 */
export function generateRandomPastDate(
  minDaysAgo: number,
  maxDaysAgo: number
): string {
  const daysAgo =
    Math.floor(Math.random() * (maxDaysAgo - minDaysAgo + 1)) + minDaysAgo;
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);

  return formatDate(date);
}
