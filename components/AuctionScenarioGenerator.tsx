"use client";

import React, { useState, useEffect } from "react";
import {
  AlertCircle,
  FileText,
  Home,
  TrendingUp,
  Loader2,
  CheckCircle,
  Lock,
} from "lucide-react";
import { getUserId } from "@/lib/userStorage";
import { useDevMode } from "@/lib/DevModeContext";
import UserInfoModal from "./UserInfoModal";

interface ScenarioParams {
  propertyType: string;
  difficulty: string;
  learningGoal: string;
  capital: string;
}

interface UsageInfo {
  usageCount: number;
  limit: number;
  remaining: number;
  weekStart: string;
}

interface GeneratedScenario {
  caseId: string;
  propertyInfo: {
    type: string;
    address: string;
    area: string;
    appraisalValue: number;
    minimumBid: number;
  };
  documents: {
    saleNotice: {
      courtName: string;
      caseNumber: string;
      saleDate: string;
      propertyDetails: string;
    };
    registry: {
      gapgu: Array<{
        date: string;
        type: string;
        holder: string;
        details: string;
      }>;
      eulgoo: Array<{
        date: string;
        rank: number;
        type: string;
        amount: number;
        holder: string;
      }>;
    };
    statusReport: {
      occupancy: string;
      tenants: Array<{
        name: string;
        deposit: number;
        contractDate: string;
        moveInDate: string;
        confirmDate?: string;
      }>;
    };
  };
  correctAnswer: {
    malsoGijun: string;
    malsoRights: string[];
    insuRights: string[];
    expectedCost: number;
    profitAnalysis: string;
    keyLearning: string;
  };
}

const AuctionScenarioGenerator = () => {
  // DevMode 훅 사용 - DevModeToggle 상태 가져오기
  const { isDevMode } = useDevMode();

  const [params, setParams] = useState<ScenarioParams>({
    propertyType: "apartment",
    difficulty: "medium",
    learningGoal: "daehanglyek",
    capital: "under100",
  });
  const [scenario, setScenario] = useState<GeneratedScenario | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [usageInfo, setUsageInfo] = useState<UsageInfo | null>(null);
  const [userId, setUserId] = useState<string>("");
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [isSubmittingEmail, setIsSubmittingEmail] = useState(false);

  const propertyTypes: Record<string, string> = {
    apartment: "아파트",
    villa: "빌라/연립",
    commercial: "상가",
    land: "토지",
  };

  const difficulties: Record<string, string> = {
    easy: "초급 (★☆☆)",
    medium: "중급 (★★☆)",
    hard: "고급 (★★★)",
  };

  const learningGoals: Record<string, string> = {
    daehanglyek: "대항력 이해",
    malso: "말소기준권리",
    baedang: "배당분석",
    seonsoonsun: "선순위 임차인",
    total: "종합 분석",
  };

  const capitals: Record<string, string> = {
    under100: "1억 미만",
    under300: "3억 미만",
    over300: "3억 이상",
  };

  // 컴포넌트 마운트 시 userId 가져오기
  useEffect(() => {
    const id = getUserId();
    setUserId(id);
    console.log("👤 사용자 ID 로드:", id);
  }, []);

  // 사용량 조회 함수
  const fetchUsage = async (uid: string, devMode: boolean) => {
    try {
      console.log("🔍 사용량 조회 시작");
      console.log("🔍 현재 개발자 모드 상태:", devMode);
      const response = await fetch(
        `/api/ai-scenarios/usage?userId=${uid}&isDevMode=${devMode}`
      );
      const result = await response.json();

      if (result.success) {
        setUsageInfo(result.data);
        console.log("✅ 사용량 정보:", result.data);
      }
    } catch (err) {
      console.error("❌ 사용량 조회 오류:", err);
    }
  };

  // userId 또는 개발자 모드 변경 시 사용량 조회
  useEffect(() => {
    if (userId) {
      fetchUsage(userId, isDevMode);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, isDevMode]); // 🎯 개발자 모드 변경 시에도 사용량 재조회

  // 개발자 모드 확인
  // DevModeToggle ON (클라이언트 개발자 모드) → 정답 전체 공개
  // ⚠️ 주의: 서버의 limit 값과는 무관하게 DevModeToggle로만 제어
  const isDeveloperMode = isDevMode;

  console.log("🔍 개발자 모드 상태:", {
    isDevMode,
    usageLimit: usageInfo?.limit,
    isDeveloperMode,
  });

  // 사용자 정보 수집 핸들러
  const handleUserInfoSubmit = async (userInfo: {
    name: string;
    email: string;
  }) => {
    setIsSubmittingEmail(true);
    console.log("📧 상세 리포트 요청 - 사용자 정보:", userInfo);

    try {
      // 사용자 정보 수집 API 호출
      const response = await fetch("/api/collect-user-info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: userInfo.name,
          email: userInfo.email,
          purpose: "ai_scenario_detail_report",
          metadata: {
            caseId: scenario?.caseId,
            propertyType: params.propertyType,
            difficulty: params.difficulty,
          },
        }),
      });

      const result = await response.json();

      if (result.success) {
        console.log("✅ 사용자 정보 수집 성공");
        alert(
          "✅ 신청이 완료되었습니다!\n\n상세 리포트 기능이 출시되면 이메일로 알려드리겠습니다. 감사합니다! 😊"
        );
        setShowDetailModal(false);
      } else {
        console.error("❌ 사용자 정보 수집 실패:", result.error);
        alert("❌ 신청 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    } catch (err) {
      console.error("❌ 사용자 정보 수집 오류:", err);
      alert("❌ 네트워크 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmittingEmail(false);
    }
  };

  // 시나리오 생성
  const generateScenario = async () => {
    setLoading(true);
    setError(null);

    try {
      console.log("🎲 시나리오 생성 요청:", params);
      console.log("🔍 클라이언트 개발자 모드 상태:", isDevMode);

      const response = await fetch("/api/ai-scenarios/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          params: params,
          isDevMode: isDevMode, // 🎯 개발자 모드 상태 전달
        }),
      });

      const result = await response.json();

      if (result.success) {
        console.log("✅ 시나리오 생성 성공:", result.data);
        setScenario(result.data);

        // 사용량 정보 업데이트
        if (result.usage) {
          setUsageInfo({
            usageCount: result.usage.current,
            limit: result.usage.limit,
            remaining: result.usage.remaining,
            weekStart: usageInfo?.weekStart || new Date().toISOString(),
          });
        }
      } else {
        console.error("❌ 시나리오 생성 실패:", result.error);
        setError(result.error);
      }
    } catch (err) {
      console.error("❌ 시나리오 생성 오류:", err);
      setError(
        "시나리오 생성 중 오류가 발생했습니다: " +
          (err instanceof Error ? err.message : "알 수 없는 오류")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            🏛️ AI 경매 시나리오 생성 엔진
          </h1>
          <p className="text-gray-600 mb-3">
            원하는 조건을 선택하면 AI가 실전 같은 경매 물건을 즉시 생성합니다
          </p>

          {/* 사용량 표시 */}
          {usageInfo && (
            <div
              className={`mt-4 p-3 rounded-lg ${
                usageInfo.limit >= 999
                  ? "bg-purple-50 border border-purple-300"
                  : usageInfo.remaining > 0
                  ? "bg-green-50 border border-green-200"
                  : "bg-red-50 border border-red-200"
              }`}
            >
              {usageInfo.limit >= 999 ? (
                <p className="text-sm font-semibold text-purple-800">
                  🔓 개발 모드: 무제한 생성 가능{" "}
                  <span className="text-xs text-purple-600">
                    (현재 사용: {usageInfo.usageCount}회)
                  </span>
                </p>
              ) : (
                <>
                  <p
                    className={`text-sm font-semibold ${
                      usageInfo.remaining > 0
                        ? "text-green-800"
                        : "text-red-800"
                    }`}
                  >
                    📊 이번 주 남은 생성 횟수:{" "}
                    <span className="text-lg">
                      {usageInfo.remaining}/{usageInfo.limit}
                    </span>
                  </p>
                  {usageInfo.remaining === 0 && (
                    <p className="text-xs text-red-600 mt-1">
                      💡 다음 주 일요일에 초기화됩니다. 유료 버전 출시 시 무제한
                      생성이 가능합니다!
                    </p>
                  )}
                </>
              )}
            </div>
          )}
        </div>

        {/* Parameter Selection */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            📋 시나리오 설정
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Property Type */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Home className="inline w-4 h-4 mr-1" />
                물건 유형
              </label>
              <select
                value={params.propertyType}
                onChange={(e) =>
                  setParams({ ...params, propertyType: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {Object.entries(propertyTypes).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </select>
            </div>

            {/* Difficulty */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <TrendingUp className="inline w-4 h-4 mr-1" />
                난이도
              </label>
              <select
                value={params.difficulty}
                onChange={(e) =>
                  setParams({ ...params, difficulty: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {Object.entries(difficulties).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </select>
            </div>

            {/* Learning Goal */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <FileText className="inline w-4 h-4 mr-1" />
                학습 목표
              </label>
              <select
                value={params.learningGoal}
                onChange={(e) =>
                  setParams({ ...params, learningGoal: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {Object.entries(learningGoals).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </select>
            </div>

            {/* Capital */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                💰 자본 규모
              </label>
              <select
                value={params.capital}
                onChange={(e) =>
                  setParams({ ...params, capital: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {Object.entries(capitals).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={generateScenario}
            disabled={
              loading ||
              (usageInfo !== null &&
                usageInfo.limit < 999 &&
                usageInfo.remaining <= 0)
            }
            className="w-full mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-lg font-bold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                AI가 시나리오를 생성하는 중...
              </>
            ) : (
              "🚀 시나리오 생성하기"
            )}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded">
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}

        {/* Generated Scenario */}
        {scenario && (
          <div className="space-y-6">
            {/* Property Info */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-4">
                <CheckCircle className="w-6 h-6 text-green-500 mr-2" />
                <h2 className="text-2xl font-bold text-gray-800">생성 완료!</h2>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-4">
                <h3 className="text-lg font-bold text-gray-800 mb-3">
                  🏠 물건 정보
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">주소</p>
                    <p className="font-semibold">
                      {scenario.propertyInfo.address}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">면적</p>
                    <p className="font-semibold">
                      {scenario.propertyInfo.area}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">감정가</p>
                    <p className="font-semibold text-blue-600">
                      {(
                        scenario.propertyInfo.appraisalValue / 10000
                      ).toLocaleString()}
                      만원
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">최저입찰가</p>
                    <p className="font-semibold text-red-600">
                      {(
                        scenario.propertyInfo.minimumBid / 10000
                      ).toLocaleString()}
                      만원
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Documents */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                📄 경매 서류
              </h3>

              {/* Registry */}
              <div className="mb-6">
                <h4 className="font-bold text-gray-700 mb-2 flex items-center">
                  <FileText className="w-4 h-4 mr-2" />
                  등기부등본
                </h4>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="mb-4">
                    <p className="font-semibold text-sm text-gray-600 mb-2">
                      【갑구】 (소유권)
                    </p>
                    <div className="space-y-2">
                      {scenario.documents.registry.gapgu.map((item, idx) => (
                        <div
                          key={idx}
                          className="text-sm bg-white p-3 rounded border border-gray-200"
                        >
                          <span className="font-semibold">{item.date}</span> |{" "}
                          {item.type} | {item.holder}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-gray-600 mb-2">
                      【을구】 (권리관계)
                    </p>
                    <div className="space-y-2">
                      {scenario.documents.registry.eulgoo.map((item, idx) => (
                        <div
                          key={idx}
                          className="text-sm bg-white p-3 rounded border border-gray-200"
                        >
                          <span className="font-semibold">{item.date}</span> |
                          순위 {item.rank}번 | {item.type} |
                          <span className="text-red-600 font-semibold ml-2">
                            {item.amount > 0
                              ? `${(item.amount / 10000).toLocaleString()}만원`
                              : "-"}
                          </span>{" "}
                          | {item.holder}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Report */}
              {scenario.documents.statusReport.tenants &&
                scenario.documents.statusReport.tenants.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-bold text-gray-700 mb-2 flex items-center">
                      <Home className="w-4 h-4 mr-2" />
                      현황조사서
                    </h4>
                    <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                      <p className="font-semibold mb-2">
                        {scenario.documents.statusReport.occupancy}
                      </p>
                      {scenario.documents.statusReport.tenants.map(
                        (tenant, idx) => (
                          <div
                            key={idx}
                            className="text-sm bg-white p-3 rounded border border-gray-200 mb-2"
                          >
                            <p>
                              <strong>임차인:</strong> {tenant.name}
                            </p>
                            <p>
                              <strong>보증금:</strong>{" "}
                              <span className="text-red-600 font-semibold">
                                {(tenant.deposit / 10000).toLocaleString()}만원
                              </span>
                            </p>
                            <p>
                              <strong>계약일:</strong> {tenant.contractDate}
                            </p>
                            <p>
                              <strong>전입일:</strong> {tenant.moveInDate}
                            </p>
                            {tenant.confirmDate && (
                              <p>
                                <strong>확정일자:</strong> {tenant.confirmDate}
                              </p>
                            )}
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}
            </div>

            {/* Correct Answer - 개발자용 */}
            {isDeveloperMode && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg shadow-lg p-6 border-2 border-green-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-800">
                    ✅ 정답 분석 (개발자 모드)
                  </h3>
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-bold rounded-full">
                    🔓 전체 공개
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">말소기준권리</p>
                    <p className="font-bold text-lg text-blue-600">
                      {scenario.correctAnswer.malsoGijun}
                    </p>
                  </div>

                  <div className="bg-white rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-2">말소되는 권리</p>
                    {scenario.correctAnswer.malsoRights.map((right, idx) => (
                      <p key={idx} className="text-sm">
                        • {right}
                      </p>
                    ))}
                  </div>

                  {scenario.correctAnswer.insuRights.length > 0 && (
                    <div className="bg-white rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-2">
                        인수해야 할 권리
                      </p>
                      {scenario.correctAnswer.insuRights.map((right, idx) => (
                        <p
                          key={idx}
                          className="text-sm text-red-600 font-semibold"
                        >
                          • {right}
                        </p>
                      ))}
                    </div>
                  )}

                  <div className="bg-white rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">예상 추가 비용</p>
                    <p className="font-bold text-xl text-red-600">
                      {scenario.correctAnswer.expectedCost > 0
                        ? `+${(
                            scenario.correctAnswer.expectedCost / 10000
                          ).toLocaleString()}만원`
                        : "없음"}
                    </p>
                  </div>

                  <div className="bg-white rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-2">수익 분석</p>
                    <p className="text-sm">
                      {scenario.correctAnswer.profitAnalysis}
                    </p>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-300">
                    <p className="text-sm font-semibold text-blue-800 mb-2">
                      💡 핵심 학습 포인트
                    </p>
                    <p className="text-sm text-blue-900">
                      {scenario.correctAnswer.keyLearning}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Correct Answer - 일반 사용자용 (간단 버전) */}
            {!isDeveloperMode && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg shadow-lg p-6 border-2 border-green-200">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  ✅ 정답 분석 (기본)
                </h3>

                <div className="space-y-4">
                  {/* 간단한 정보만 표시 */}
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">말소기준권리</p>
                    <p className="font-bold text-lg text-blue-600">
                      {scenario.correctAnswer.malsoGijun}
                    </p>
                  </div>

                  <div className="bg-white rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">예상 추가 비용</p>
                    <p className="font-bold text-xl text-red-600">
                      {scenario.correctAnswer.expectedCost > 0
                        ? `+${(
                            scenario.correctAnswer.expectedCost / 10000
                          ).toLocaleString()}만원`
                        : "없음"}
                    </p>
                  </div>

                  {/* 간단한 학습 포인트 (요약) */}
                  <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-300">
                    <p className="text-sm font-semibold text-blue-800 mb-2">
                      💡 핵심 학습 포인트
                    </p>
                    <p className="text-sm text-blue-900">
                      {scenario.correctAnswer.keyLearning.split(".")[0]}.
                    </p>
                  </div>

                  {/* 상세 분석 보기 버튼 */}
                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-6 border-2 border-amber-200">
                    <div className="text-center">
                      <Lock className="w-12 h-12 text-amber-600 mx-auto mb-3" />
                      <h4 className="text-lg font-bold text-gray-800 mb-2">
                        더 자세한 분석이 필요하신가요?
                      </h4>
                      <p className="text-sm text-gray-600 mb-4">
                        말소/인수권리, 상세한 수익분석, 핵심 학습 포인트를
                        확인해 보세요!
                      </p>
                      <button
                        onClick={() => {
                          console.log("🎯 상세 분석 버튼 클릭");
                          setShowDetailModal(true);
                        }}
                        className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105 shadow-lg"
                      >
                        📊 더 자세히 보기
                      </button>
                      <p className="text-xs text-gray-500 mt-3">
                        💡 출시 알림 신청 시 상세 리포트 기능이 출시되면 가장
                        먼저 안내받으실 수 있습니다
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 사용자 정보 수집 모달 */}
        <UserInfoModal
          isOpen={showDetailModal}
          onClose={() => setShowDetailModal(false)}
          onConfirm={handleUserInfoSubmit}
          isSubmitting={isSubmittingEmail}
        />
      </div>
    </div>
  );
};

export default AuctionScenarioGenerator;
