import React from "react";

// 매물 상세 정보 타입 정의
interface PropertyDetail {
  id: string;
  title: string;
  itemType: string;
  imageUrl?: string;
  appraisedValue: number;
  startingBid: number;
  marketPrice: number;
  riskType: "LOW" | "MEDIUM" | "HIGH" | "VERY_HIGH";
  riskData?: any;
  createdAt: string;
  updatedAt: string;
  // 추가 상세 정보
  location?: string;
  area?: number;
  buildingYear?: number;
  floor?: number;
  structure?: string;
  ownership?: string;
  mortgage?: string;
  restrictions?: string[];
  marketTrend?: string;
  neighborhoodInfo?: string;
}

interface PropertyDetailReportProps {
  property: PropertyDetail;
  isOpen: boolean;
  onClose: () => void;
}

const PropertyDetailReport: React.FC<PropertyDetailReportProps> = ({
  property,
  isOpen,
  onClose,
}) => {
  console.log("📋 매물 상세 리포트 열기:", property.title); // 로그 추가

  if (!isOpen) return null;

  // 랜덤한 권리관계 데이터 생성 함수
  const generateRandomOwnership = () => {
    const ownershipTypes = [
      "개인 소유 (100%)",
      "공유 소유 (2명, 각 50%)",
      "공유 소유 (3명, 각 33.3%)",
      "공유 소유 (4명, 각 25%)",
      "법인 소유 (주식회사)",
      "상속 공유 (5명, 각 20%)",
      "혼인재산 공유 (부부 각 50%)",
      "개인 소유 (단독)",
      "공유 소유 (6명, 각 16.7%)",
      "법인 소유 (유한회사)",
    ];
    return ownershipTypes[Math.floor(Math.random() * ownershipTypes.length)];
  };

  const generateRandomMortgage = () => {
    const mortgageTypes = [
      "저당권 설정 없음",
      "은행 저당권 (국민은행, 5억원)",
      "은행 저당권 (신한은행, 3억원)",
      "은행 저당권 (우리은행, 7억원)",
      "금융회사 저당권 (2억원)",
      "개인 저당권 (1억원)",
      "복수 저당권 (1순위: 국민은행, 2순위: 신한은행)",
      "최고근저당권 설정 (10억원)",
      "저당권 설정 없음 (담보 해제 완료)",
      "은행 저당권 (하나은행, 4억원)",
    ];
    return mortgageTypes[Math.floor(Math.random() * mortgageTypes.length)];
  };

  const generateRandomRestrictions = () => {
    const restrictionSets = [
      ["경매절차 진행 중", "소유권 이전 제한", "담보권 설정 가능"],
      ["경매절차 진행 중", "임차인 보호", "전세권 설정"],
      ["경매절차 진행 중", "상속분할 미완료", "공유물 분할 필요"],
      ["경매절차 진행 중", "건물허가 문제", "개발제한구역"],
      ["경매절차 진행 중", "환경오염 문제", "정화의무 부담"],
      ["경매절차 진행 중", "소유권 분쟁", "법원 조정 진행"],
      ["경매절차 진행 중", "혼인재산 분할", "재산분할 협의 필요"],
      ["경매절차 진행 중", "저당권 실행", "담보권 우선순위"],
      ["경매절차 진행 중", "임차인 퇴거", "보상금 지급 필요"],
      ["경매절차 진행 중", "건물 노후화", "리모델링 필요"],
    ];
    return restrictionSets[Math.floor(Math.random() * restrictionSets.length)];
  };

  // 위험도에 따른 색상 및 텍스트 설정
  const getRiskConfig = (riskType: string) => {
    console.log("🔍 상세 리포트 위험도 타입 확인:", riskType); // 로그 추가
    switch (riskType) {
      case "LOW":
        return {
          color: "text-green-600",
          bgColor: "bg-green-50",
          borderColor: "border-green-200",
          text: "낮음",
          icon: "🟢",
        };
      case "MEDIUM":
        return {
          color: "text-yellow-600",
          bgColor: "bg-yellow-50",
          borderColor: "border-yellow-200",
          text: "보통",
          icon: "🟡",
        };
      case "HIGH":
        return {
          color: "text-red-600",
          bgColor: "bg-red-50",
          borderColor: "border-red-200",
          text: "높음",
          icon: "🔴",
        };
      case "VERY_HIGH":
        return {
          color: "text-red-700",
          bgColor: "bg-red-100",
          borderColor: "border-red-300",
          text: "매우 높음",
          icon: "⚠️",
        };
      // 한국어 타입도 지원 (하위 호환성)
      case "클린":
        return {
          color: "text-green-600",
          bgColor: "bg-green-50",
          borderColor: "border-green-200",
          text: "안전",
          icon: "🟢",
        };
      case "복합위험":
        return {
          color: "text-red-600",
          bgColor: "bg-red-50",
          borderColor: "border-red-200",
          text: "복합위험",
          icon: "🔴",
        };
      case "근저당위험":
        return {
          color: "text-yellow-600",
          bgColor: "bg-yellow-50",
          borderColor: "border-yellow-200",
          text: "근저당위험",
          icon: "🟡",
        };
      case "임차인위험":
        return {
          color: "text-yellow-600",
          bgColor: "bg-yellow-50",
          borderColor: "border-yellow-200",
          text: "임차인위험",
          icon: "🟡",
        };
      case "소유권분쟁":
        return {
          color: "text-red-600",
          bgColor: "bg-red-50",
          borderColor: "border-red-200",
          text: "소유권분쟁",
          icon: "🔴",
        };
      case "상속분할":
        return {
          color: "text-yellow-600",
          bgColor: "bg-yellow-50",
          borderColor: "border-yellow-200",
          text: "상속분할",
          icon: "🟡",
        };
      case "건물허가문제":
        return {
          color: "text-red-600",
          bgColor: "bg-red-50",
          borderColor: "border-red-200",
          text: "허가문제",
          icon: "🔴",
        };
      case "최고근저당":
        return {
          color: "text-red-600",
          bgColor: "bg-red-50",
          borderColor: "border-red-200",
          text: "최고근저당",
          icon: "🔴",
        };
      case "전세권설정":
        return {
          color: "text-yellow-600",
          bgColor: "bg-yellow-50",
          borderColor: "border-yellow-200",
          text: "전세권설정",
          icon: "🟡",
        };
      case "환경문제":
        return {
          color: "text-red-600",
          bgColor: "bg-red-50",
          borderColor: "border-red-200",
          text: "환경문제",
          icon: "🔴",
        };
      case "혼인재산":
        return {
          color: "text-yellow-600",
          bgColor: "bg-yellow-50",
          borderColor: "border-yellow-200",
          text: "혼인재산",
          icon: "🟡",
        };
      case "노후건물":
        return {
          color: "text-yellow-600",
          bgColor: "bg-yellow-50",
          borderColor: "border-yellow-200",
          text: "노후건물",
          icon: "🟡",
        };
      default:
        return {
          color: "text-gray-600",
          bgColor: "bg-gray-50",
          borderColor: "border-gray-200",
          text: "알 수 없음",
          icon: "❓",
        };
    }
  };

  const riskConfig = getRiskConfig(property.riskType);

  // 숫자 포맷팅 함수
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("ko-KR").format(num);
  };

  // 수익률 계산
  const profitMargin = (
    ((property.marketPrice - property.startingBid) / property.startingBid) *
    100
  ).toFixed(1);

  return (
    <div className="bg-white rounded-lg shadow-lg max-w-6xl w-full mx-auto">
      {/* 헤더 */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white px-6 py-6 rounded-t-lg">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">부동산 권리분석 리포트</h2>
            <p className="text-primary-100 mt-1">등기부등본 기반 상세 분석</p>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors bg-white/20 hover:bg-white/30 rounded-full p-2"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* 리포트 내용 */}
      <div className="p-6 space-y-6">
        {/* 매물 기본 정보 */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">🏠</span>
            매물 기본 정보
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-600">
                매물명
              </label>
              <p className="text-lg font-semibold text-gray-900">
                {property.title}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">
                매물 유형
              </label>
              <p className="text-lg font-semibold text-gray-900">
                {property.itemType}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">위치</label>
              <p className="text-lg font-semibold text-gray-900">
                {property.location || "서울시 강남구 테헤란로 123"}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">면적</label>
              <p className="text-lg font-semibold text-gray-900">
                {property.area || "84.5㎡"} (25.6평)
              </p>
            </div>
          </div>
        </div>

        {/* 가격 분석 */}
        <div className="bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">💰</span>
            가격 분석
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-white rounded-lg border">
              <div className="text-sm text-gray-600 mb-1">시작 입찰가</div>
              <div className="text-xl font-bold text-blue-600">
                {formatNumber(property.startingBid)}원
              </div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border">
              <div className="text-sm text-gray-600 mb-1">감정가</div>
              <div className="text-xl font-bold text-gray-800">
                {formatNumber(property.appraisedValue)}원
              </div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border">
              <div className="text-sm text-gray-600 mb-1">시장가</div>
              <div className="text-xl font-bold text-green-600">
                {formatNumber(property.marketPrice)}원
              </div>
            </div>
          </div>
          <div className="mt-4 p-4 bg-white rounded-lg border">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-600">
                예상 수익률
              </span>
              <span
                className={`text-lg font-bold ${
                  parseFloat(profitMargin) > 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {parseFloat(profitMargin) > 0 ? "+" : ""}
                {profitMargin}%
              </span>
            </div>
          </div>
        </div>

        {/* 권리 분석 */}
        <div className="bg-yellow-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">📋</span>
            권리 분석 (등기부등본 기반)
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-white rounded-lg border">
                <div className="text-sm font-medium text-gray-600 mb-2">
                  소유권 현황
                </div>
                <div className="text-lg font-semibold text-gray-900">
                  {property.ownership || generateRandomOwnership()}
                </div>
              </div>
              <div className="p-4 bg-white rounded-lg border">
                <div className="text-sm font-medium text-gray-600 mb-2">
                  저당권 현황
                </div>
                <div className="text-lg font-semibold text-gray-900">
                  {property.mortgage || generateRandomMortgage()}
                </div>
              </div>
            </div>

            <div className="p-4 bg-white rounded-lg border">
              <div className="text-sm font-medium text-gray-600 mb-2">
                제한사항
              </div>
              <div className="space-y-2">
                {(property.restrictions || generateRandomRestrictions()).map(
                  (restriction, index) => (
                    <div
                      key={index}
                      className="flex items-center text-sm text-gray-700"
                    >
                      <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
                      {restriction}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 위험도 분석 */}
        <div
          className={`${riskConfig.bgColor} rounded-lg p-6 border ${riskConfig.borderColor}`}
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">{riskConfig.icon}</span>
            위험도 분석
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white rounded-lg border">
              <span className="text-sm font-medium text-gray-600">
                종합 위험도
              </span>
              <span className={`text-lg font-bold ${riskConfig.color}`}>
                {riskConfig.text}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-white rounded-lg border">
                <div className="text-sm font-medium text-gray-600 mb-2">
                  시장 위험도
                </div>
                <div className="text-sm text-gray-700">
                  {property.marketTrend ||
                    "현재 시장 상황 양호, 안정적 거래 환경"}
                </div>
              </div>
              <div className="p-4 bg-white rounded-lg border">
                <div className="text-sm font-medium text-gray-600 mb-2">
                  지역 정보
                </div>
                <div className="text-sm text-gray-700">
                  {property.neighborhoodInfo ||
                    "교통 접근성 우수, 상업지구 인근"}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 건물 정보 */}
        <div className="bg-green-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">🏢</span>
            건물 정보
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-lg border">
              <div className="text-sm font-medium text-gray-600 mb-1">
                건축년도
              </div>
              <div className="text-lg font-semibold text-gray-900">
                {property.buildingYear || "2015년"}
              </div>
            </div>
            <div className="p-4 bg-white rounded-lg border">
              <div className="text-sm font-medium text-gray-600 mb-1">층수</div>
              <div className="text-lg font-semibold text-gray-900">
                {property.floor || "15층"}
              </div>
            </div>
            <div className="p-4 bg-white rounded-lg border">
              <div className="text-sm font-medium text-gray-600 mb-1">구조</div>
              <div className="text-lg font-semibold text-gray-900">
                {property.structure || "철근콘크리트"}
              </div>
            </div>
          </div>
        </div>

        {/* 투자 권고사항 */}
        <div className="bg-purple-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">💡</span>
            투자 권고사항
          </h3>
          <div className="space-y-3">
            <div className="p-4 bg-white rounded-lg border-l-4 border-purple-400">
              <div className="text-sm font-medium text-purple-600 mb-1">
                권장 입찰가
              </div>
              <div className="text-lg font-semibold text-gray-900">
                {formatNumber(Math.round(property.startingBid * 1.1))}원 ~{" "}
                {formatNumber(Math.round(property.startingBid * 1.3))}원
              </div>
              <div className="text-sm text-gray-600 mt-1">
                (시작가 대비 10-30% 상향 입찰 권장)
              </div>
            </div>

            <div className="p-4 bg-white rounded-lg border-l-4 border-blue-400">
              <div className="text-sm font-medium text-blue-600 mb-1">
                예상 수익률
              </div>
              <div className="text-lg font-semibold text-gray-900">
                {parseFloat(profitMargin) > 0 ? "+" : ""}
                {profitMargin}%
              </div>
              <div className="text-sm text-gray-600 mt-1">
                (시장가 대비 기준)
              </div>
            </div>

            <div className="p-4 bg-white rounded-lg border-l-4 border-green-400">
              <div className="text-sm font-medium text-green-600 mb-1">
                투자 위험도
              </div>
              <div className="text-lg font-semibold text-gray-900">
                {riskConfig.text}
              </div>
              <div className="text-sm text-gray-600 mt-1">
                {property.riskType === "LOW"
                  ? "안전한 투자 대상"
                  : property.riskType === "MEDIUM"
                  ? "신중한 검토 필요"
                  : property.riskType === "HIGH"
                  ? "높은 위험 주의"
                  : "매우 높은 위험"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 푸터 */}
      <div className="bg-gray-50 border-t border-gray-200 px-6 py-4 rounded-b-lg">
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            리포트 생성일: {new Date().toLocaleDateString("ko-KR")}
          </div>
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              닫기
            </button>
            <button
              onClick={() => {
                console.log("📄 리포트 인쇄 요청"); // 로그 추가
                window.print();
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              인쇄
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailReport;
