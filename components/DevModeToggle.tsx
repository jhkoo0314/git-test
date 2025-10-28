"use client";

import React from "react";
import { useDevMode } from "../lib/DevModeContext";

/**
 * 개발자 모드 토글 버튼
 * 개발 환경에서만 표시되며, 우측 하단에 플로팅 버튼으로 나타남
 */
export default function DevModeToggle() {
  const { isDevMode, toggleDevMode, isDevelopment, isHydrated } = useDevMode();

  // 디버그 로그 추가
  console.log("🛠️ DevModeToggle 렌더링", {
    isDevMode,
    isDevelopment,
    isHydrated,
    hasToggleFunction: typeof toggleDevMode === "function",
  });

  // hydration이 완료되지 않았으면 렌더링하지 않음 (hydration mismatch 방지)
  if (!isHydrated) {
    console.log("🛠️ DevModeToggle: hydration 대기 중");
    return null;
  }

  // 프로덕션 환경에서는 렌더링하지 않음
  if (!isDevelopment) {
    console.log("🛠️ DevModeToggle: 프로덕션 환경에서 숨김");
    return null;
  }

  // 에러 처리: 개발자 모드가 제대로 초기화되지 않은 경우
  if (typeof isDevMode === "undefined" || typeof toggleDevMode !== "function") {
    console.warn("⚠️ DevModeToggle: 개발자 모드 초기화 실패", {
      isDevMode,
      hasToggleFunction: typeof toggleDevMode === "function",
    });
    return null;
  }

  return (
    <>
      {/* 플로팅 토글 버튼 */}
      <button
        onClick={toggleDevMode}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${
          isDevMode
            ? "bg-yellow-500 hover:bg-yellow-600 text-white"
            : "bg-gray-700 hover:bg-gray-800 text-white"
        }`}
        title={
          isDevMode
            ? "개발자 모드 (클릭하여 일반 모드로 전환)"
            : "일반 모드 (클릭하여 개발자 모드로 전환)"
        }
      >
        <div className="flex flex-col items-center">
          <span className="text-2xl mb-1">{isDevMode ? "🛠️" : "👤"}</span>
          <span className="text-xs font-semibold">
            {isDevMode ? "DEV" : "USER"}
          </span>
        </div>
      </button>

      {/* 개발자 모드 활성화 시 배지 표시 */}
      {isDevMode && (
        <div className="fixed top-4 right-4 z-50 bg-yellow-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 animate-pulse">
          <span className="text-lg">🛠️</span>
          <div>
            <div className="font-bold text-sm">개발자 모드</div>
            <div className="text-xs opacity-90">디버그 정보 활성화</div>
          </div>
        </div>
      )}
    </>
  );
}
