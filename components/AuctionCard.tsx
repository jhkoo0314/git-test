import React from "react";

// AuctionItem 타입 정의 (Prisma 스키마 기반)
interface AuctionItem {
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
}

interface AuctionCardProps {
  auctionItem: AuctionItem;
  onBidClick?: (item: AuctionItem) => void;
  onDetailClick?: (item: AuctionItem) => void;
  isBidding?: boolean;
}

const AuctionCard: React.FC<AuctionCardProps> = ({
  auctionItem,
  onBidClick,
  onDetailClick,
  isBidding = false,
}) => {
  // 매물 유형에 따른 아이콘 설정
  const getPropertyIcon = (itemType: string) => {
    switch (itemType) {
      case "아파트":
        return "🏢";
      case "빌라":
        return "🏘️";
      case "오피스텔":
        return "🏢";
      case "상가":
        return "🏪";
      case "단독주택":
        return "🏠";
      case "원룸":
        return "🏠";
      default:
        return "🏠";
    }
  };

  // 위험도에 따른 색상 및 텍스트 설정
  const getRiskConfig = (riskType: string) => {
    console.log("🔍 위험도 타입 확인:", riskType); // 로그 추가
    console.log("💰 가격 정보 확인:", {
      감정가: auctionItem.appraisedValue,
      시장가: auctionItem.marketPrice,
      시작입찰가: auctionItem.startingBid,
      가격차이: auctionItem.marketPrice - auctionItem.appraisedValue,
      가격비율:
        ((auctionItem.marketPrice / auctionItem.appraisedValue) * 100).toFixed(
          1
        ) + "%",
    }); // 가격 정보 로그 추가
    switch (riskType) {
      case "LOW":
        return {
          color: "bg-green-100 text-green-800 border-green-200",
          text: "낮음",
          icon: "🟢",
        };
      case "MEDIUM":
        return {
          color: "bg-yellow-100 text-yellow-800 border-yellow-200",
          text: "보통",
          icon: "🟡",
        };
      case "HIGH":
        return {
          color: "bg-red-100 text-red-800 border-red-200",
          text: "높음",
          icon: "🔴",
        };
      case "VERY_HIGH":
        return {
          color: "bg-red-200 text-red-900 border-red-300",
          text: "매우 높음",
          icon: "⚠️",
        };
      // 한국어 타입도 지원 (하위 호환성)
      case "클린":
        return {
          color: "bg-green-100 text-green-800 border-green-200",
          text: "안전",
          icon: "🟢",
        };
      case "복합위험":
        return {
          color: "bg-red-100 text-red-800 border-red-200",
          text: "복합위험",
          icon: "🔴",
        };
      case "근저당위험":
        return {
          color: "bg-yellow-100 text-yellow-800 border-yellow-200",
          text: "근저당위험",
          icon: "🟡",
        };
      case "임차인위험":
        return {
          color: "bg-yellow-100 text-yellow-800 border-yellow-200",
          text: "임차인위험",
          icon: "🟡",
        };
      case "소유권분쟁":
        return {
          color: "bg-red-100 text-red-800 border-red-200",
          text: "소유권분쟁",
          icon: "🔴",
        };
      case "상속분할":
        return {
          color: "bg-yellow-100 text-yellow-800 border-yellow-200",
          text: "상속분할",
          icon: "🟡",
        };
      case "건물허가문제":
        return {
          color: "bg-red-100 text-red-800 border-red-200",
          text: "허가문제",
          icon: "🔴",
        };
      case "최고근저당":
        return {
          color: "bg-red-100 text-red-800 border-red-200",
          text: "최고근저당",
          icon: "🔴",
        };
      case "전세권설정":
        return {
          color: "bg-yellow-100 text-yellow-800 border-yellow-200",
          text: "전세권설정",
          icon: "🟡",
        };
      case "환경문제":
        return {
          color: "bg-red-100 text-red-800 border-red-200",
          text: "환경문제",
          icon: "🔴",
        };
      case "혼인재산":
        return {
          color: "bg-yellow-100 text-yellow-800 border-yellow-200",
          text: "혼인재산",
          icon: "🟡",
        };
      case "노후건물":
        return {
          color: "bg-yellow-100 text-yellow-800 border-yellow-200",
          text: "노후건물",
          icon: "🟡",
        };
      default:
        return {
          color: "bg-gray-100 text-gray-800 border-gray-200",
          text: "알 수 없음",
          icon: "❓",
        };
    }
  };

  const riskConfig = getRiskConfig(auctionItem.riskType);

  // 숫자 포맷팅 함수
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("ko-KR").format(num);
  };

  // 수익률 계산 (시장가 대비 시작가)
  const profitMargin = (
    ((auctionItem.marketPrice - auctionItem.startingBid) /
      auctionItem.startingBid) *
    100
  ).toFixed(1);

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-primary-300 group">
      {/* 이미지 영역 */}
      <div className="relative h-48 bg-gradient-to-br from-primary-50 to-primary-100 overflow-hidden">
        {auctionItem.imageUrl ? (
          <img
            src={auctionItem.imageUrl}
            alt={auctionItem.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-6xl opacity-30">
              {getPropertyIcon(auctionItem.itemType)}
            </div>
          </div>
        )}

        {/* 위험도 배지 */}
        <div className="absolute top-3 right-3">
          <span
            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${riskConfig.color}`}
          >
            <span className="mr-1">{riskConfig.icon}</span>
            {riskConfig.text}
          </span>
        </div>

        {/* 매물 유형 배지 */}
        <div className="absolute top-3 left-3">
          <span className="bg-white/90 backdrop-blur-sm text-gray-700 px-2 py-1 rounded-lg text-xs font-medium">
            {auctionItem.itemType}
          </span>
        </div>
      </div>

      {/* 콘텐츠 영역 */}
      <div className="p-6">
        {/* 제목 */}
        <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors">
          {auctionItem.title}
        </h3>

        {/* 가격 정보 */}
        <div className="space-y-3 mb-4">
          {/* 시작 입찰가 */}
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">시작 입찰가</span>
            <span className="text-lg font-bold text-primary-600">
              {formatNumber(auctionItem.startingBid)}원
            </span>
          </div>

          {/* 감정가 */}
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">감정가</span>
            <span className="text-sm font-medium text-blue-600">
              {formatNumber(auctionItem.appraisedValue)}원
            </span>
          </div>

          {/* 시장가 */}
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">시장가</span>
            <span
              className={`text-sm font-medium ${
                auctionItem.marketPrice > auctionItem.appraisedValue
                  ? "text-green-600"
                  : auctionItem.marketPrice < auctionItem.appraisedValue
                  ? "text-red-600"
                  : "text-gray-600"
              }`}
            >
              {formatNumber(auctionItem.marketPrice)}원
              {auctionItem.marketPrice > auctionItem.appraisedValue
                ? " ↗️"
                : auctionItem.marketPrice < auctionItem.appraisedValue
                ? " ↘️"
                : " ➡️"}
            </span>
          </div>

          {/* 수익률 */}
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">예상 수익률</span>
            <span
              className={`text-sm font-medium ${
                parseFloat(profitMargin) > 0
                  ? "text-success-600"
                  : "text-danger-600"
              }`}
            >
              {parseFloat(profitMargin) > 0 ? "+" : ""}
              {profitMargin}%
            </span>
          </div>
        </div>

        {/* 버튼 그룹 */}
        <div className="space-y-2">
          {/* 입찰 버튼 */}
          <button
            onClick={() => onBidClick?.(auctionItem)}
            disabled={isBidding}
            className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
              isBidding
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-primary-600 hover:bg-primary-700 text-white hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
            }`}
          >
            {isBidding ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-400 mr-2"></div>
                입찰 중...
              </div>
            ) : (
              "입찰하기"
            )}
          </button>

          {/* 상세보기 버튼 */}
          <button
            onClick={() => onDetailClick?.(auctionItem)}
            className="w-full py-2 px-4 rounded-lg font-medium transition-all duration-200 bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900 border border-gray-300 hover:border-gray-400"
          >
            📋 상세보기
          </button>
        </div>

        {/* 추가 정보 */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex justify-between text-xs text-gray-500">
            <span>ID: {auctionItem.id.slice(-8)}</span>
            <span>
              {new Date(auctionItem.createdAt).toLocaleDateString("ko-KR")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuctionCard;
