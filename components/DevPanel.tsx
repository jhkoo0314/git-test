"use client";

import React, { useState } from "react";
import { useDevMode } from "../lib/DevModeContext";

/**
 * 개발자 패널 컴포넌트
 * 개발자 모드에서 디버그 정보를 표시하는 패널
 */
interface DevPanelProps {
  title: string;
  data: any;
  className?: string;
}

export default function DevPanel({
  title,
  data,
  className = "",
}: DevPanelProps) {
  const { isDevMode, isHydrated } = useDevMode();
  const [isExpanded, setIsExpanded] = useState(false);

  // 디버그 로그 추가
  console.log("🛠️ DevPanel 렌더링", {
    title,
    isDevMode,
    isHydrated,
    hasData: !!data,
  });

  // hydration이 완료되지 않았으면 렌더링하지 않음
  if (!isHydrated) {
    console.log("🛠️ DevPanel: hydration 대기 중");
    return null;
  }

  // 에러 처리: 개발자 모드가 제대로 초기화되지 않은 경우
  if (typeof isDevMode === "undefined") {
    console.warn("⚠️ DevPanel: 개발자 모드 초기화 실패");
    return null;
  }

  // 개발자 모드가 아니면 렌더링하지 않음
  if (!isDevMode) {
    console.log("🛠️ DevPanel: 개발자 모드가 비활성화됨");
    return null;
  }

  return (
    <div
      className={`bg-yellow-50 border-2 border-yellow-400 rounded-lg p-4 ${className}`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-xl">🛠️</span>
          <h3 className="font-bold text-yellow-900">{title}</h3>
          <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded">
            개발자 전용
          </span>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-yellow-700 hover:text-yellow-900 transition-colors"
        >
          {isExpanded ? "▼ 접기" : "▶ 펼치기"}
        </button>
      </div>

      {isExpanded && (
        <div className="mt-3">
          <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-xs font-mono">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

/**
 * 간단한 개발자 정보 표시 컴포넌트
 */
interface DevInfoProps {
  label: string;
  value: any;
  className?: string;
}

export function DevInfo({ label, value, className = "" }: DevInfoProps) {
  const { isDevMode, isHydrated } = useDevMode();

  // hydration이 완료되지 않았으면 렌더링하지 않음
  if (!isHydrated) {
    return null;
  }

  // 에러 처리: 개발자 모드가 제대로 초기화되지 않은 경우
  if (typeof isDevMode === "undefined") {
    console.warn("⚠️ DevInfo: 개발자 모드 초기화 실패");
    return null;
  }

  if (!isDevMode) {
    return null;
  }

  return (
    <div
      className={`inline-flex items-center gap-2 bg-yellow-100 text-yellow-900 px-3 py-1 rounded-full text-xs font-medium ${className}`}
    >
      <span className="font-bold">{label}:</span>
      <span className="font-mono">{JSON.stringify(value)}</span>
    </div>
  );
}

/**
 * 개발자 로그 표시 컴포넌트
 */
interface DevLogProps {
  logs: string[];
  maxLogs?: number;
  className?: string;
}

export function DevLog({ logs, maxLogs = 10, className = "" }: DevLogProps) {
  const { isDevMode, isHydrated } = useDevMode();

  // hydration이 완료되지 않았으면 렌더링하지 않음
  if (!isHydrated) {
    return null;
  }

  // 에러 처리: 개발자 모드가 제대로 초기화되지 않은 경우
  if (typeof isDevMode === "undefined") {
    console.warn("⚠️ DevLog: 개발자 모드 초기화 실패");
    return null;
  }

  if (!isDevMode) {
    return null;
  }

  const displayLogs = logs.slice(-maxLogs);

  return (
    <div
      className={`bg-gray-900 text-green-400 rounded-lg p-4 font-mono text-xs ${className}`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-yellow-400 font-bold">📋 실시간 로그</span>
        <span className="text-gray-500">{displayLogs.length}개</span>
      </div>
      <div className="space-y-1 max-h-64 overflow-y-auto">
        {displayLogs.length === 0 ? (
          <div className="text-gray-500">로그가 없습니다</div>
        ) : (
          displayLogs.map((log, index) => (
            <div key={index} className="border-l-2 border-green-600 pl-2">
              {log}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
