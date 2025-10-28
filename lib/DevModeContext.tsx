"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

// 개발자 모드 Context 타입 정의
interface DevModeContextType {
  isDevMode: boolean;
  toggleDevMode: () => void;
  isDevelopment: boolean;
  isHydrated: boolean;
}

// Context 생성
const DevModeContext = createContext<DevModeContextType | undefined>(undefined);

// Provider 컴포넌트
export function DevModeProvider({ children }: { children: React.ReactNode }) {
  // 개발 환경 여부 확인 (더 안전한 방법)
  const isDevelopment =
    process.env.NODE_ENV === "development" ||
    (typeof window !== "undefined" && window.location.hostname === "localhost");

  // 개발자 모드 상태 (localStorage에 저장하여 새로고침 후에도 유지)
  // hydration mismatch 방지를 위해 초기값을 false로 설정
  const [isDevMode, setIsDevMode] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // 컴포넌트 마운트 시 localStorage에서 개발자 모드 상태 복원
  useEffect(() => {
    console.log("🛠️ DevModeProvider 초기화 시작", { isDevelopment });

    // hydration 완료 표시 (React 19 호환)
    const timer = setTimeout(() => {
      setIsHydrated(true);
      console.log("🛠️ DevModeProvider hydration 완료");
    }, 100);

    if (isDevelopment && typeof window !== "undefined") {
      try {
        const savedDevMode = localStorage.getItem("devMode");
        console.log("🛠️ localStorage에서 개발자 모드 설정 확인:", savedDevMode);

        if (savedDevMode === "true") {
          setIsDevMode(true);
          console.log("🛠️ 개발자 모드 활성화됨 (저장된 설정)");
        }
      } catch (error) {
        console.warn("⚠️ localStorage 접근 실패:", error);
      }
    }

    return () => clearTimeout(timer);
  }, [isDevelopment]);

  // 개발자 모드 토글 함수 (useCallback으로 최적화)
  const toggleDevMode = useCallback(() => {
    if (!isDevelopment) {
      console.warn("⚠️ 개발자 모드는 개발 환경에서만 사용할 수 있습니다.");
      return;
    }

    const newDevMode = !isDevMode;
    setIsDevMode(newDevMode);

    // localStorage 접근을 안전하게 처리
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("devMode", newDevMode.toString());
      } catch (error) {
        console.warn("⚠️ localStorage 저장 실패:", error);
      }
    }

    if (newDevMode) {
      console.log("🛠️ 개발자 모드 활성화");
      console.log("✨ 개발자 전용 기능이 활성화되었습니다:");
      console.log("  - 상세한 디버그 로그");
      console.log("  - API 응답 데이터 표시");
      console.log("  - 컴포넌트 상태 정보");
    } else {
      console.log("👤 일반 사용자 모드로 전환");
    }
  }, [isDevelopment, isDevMode]);

  return (
    <DevModeContext.Provider
      value={{ isDevMode, toggleDevMode, isDevelopment, isHydrated }}
    >
      {children}
    </DevModeContext.Provider>
  );
}

// Custom Hook으로 Context 사용
export function useDevMode() {
  const context = useContext(DevModeContext);
  if (context === undefined) {
    console.warn(
      "⚠️ useDevMode는 DevModeProvider 내부에서 사용해야 합니다. 기본값을 사용합니다."
    );
    // 기본값 반환 (에러 대신)
    return {
      isDevMode: false,
      toggleDevMode: () =>
        console.warn("⚠️ DevModeProvider가 설정되지 않았습니다."),
      isDevelopment: process.env.NODE_ENV === "development",
      isHydrated: false,
    };
  }
  return context;
}

// 개발자 모드 로그 헬퍼 함수
export function devLog(message: string, ...args: any[]) {
  if (process.env.NODE_ENV === "development") {
    console.log(`🛠️ [DEV] ${message}`, ...args);
  }
}
