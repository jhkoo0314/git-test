"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

// 개발자 모드 Context 타입 정의
interface DevModeContextType {
  isDevMode: boolean;
  toggleDevMode: () => void;
  isDevelopment: boolean;
}

// Context 생성
const DevModeContext = createContext<DevModeContextType | undefined>(undefined);

// Provider 컴포넌트
export function DevModeProvider({ children }: { children: React.ReactNode }) {
  // 개발 환경 여부 확인
  const isDevelopment = process.env.NODE_ENV === "development";

  // 개발자 모드 상태 (localStorage에 저장하여 새로고침 후에도 유지)
  const [isDevMode, setIsDevMode] = useState(false);

  // 컴포넌트 마운트 시 localStorage에서 개발자 모드 상태 복원
  useEffect(() => {
    if (isDevelopment) {
      const savedDevMode = localStorage.getItem("devMode");
      if (savedDevMode === "true") {
        setIsDevMode(true);
        console.log("🛠️ 개발자 모드 활성화됨 (저장된 설정)");
      }
    }
  }, [isDevelopment]);

  // 개발자 모드 토글 함수
  const toggleDevMode = () => {
    if (!isDevelopment) {
      console.warn("⚠️ 개발자 모드는 개발 환경에서만 사용할 수 있습니다.");
      return;
    }

    const newDevMode = !isDevMode;
    setIsDevMode(newDevMode);
    localStorage.setItem("devMode", newDevMode.toString());

    if (newDevMode) {
      console.log("🛠️ 개발자 모드 활성화");
      console.log("✨ 개발자 전용 기능이 활성화되었습니다:");
      console.log("  - 상세한 디버그 로그");
      console.log("  - API 응답 데이터 표시");
      console.log("  - 컴포넌트 상태 정보");
    } else {
      console.log("👤 일반 사용자 모드로 전환");
    }
  };

  return (
    <DevModeContext.Provider
      value={{ isDevMode, toggleDevMode, isDevelopment }}
    >
      {children}
    </DevModeContext.Provider>
  );
}

// Custom Hook으로 Context 사용
export function useDevMode() {
  const context = useContext(DevModeContext);
  if (context === undefined) {
    throw new Error("useDevMode는 DevModeProvider 내부에서 사용해야 합니다.");
  }
  return context;
}

// 개발자 모드 로그 헬퍼 함수
export function devLog(message: string, ...args: any[]) {
  if (process.env.NODE_ENV === "development") {
    console.log(`🛠️ [DEV] ${message}`, ...args);
  }
}


