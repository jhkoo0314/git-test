import React from "react";

// 입찰 결과 타입 정의
interface BidResult {
  success: boolean;
  message: string;
  finalBid?: number;
  profitOrLoss?: number;
  marketPrice?: number;
  appraisedValue?: number;
  riskLevel?: string;
  recommendation?: string;
  profitAnalysis?: string; // 상세 수익 분석 추가
  keyLearningPoints?: string[]; // 핵심 학습 포인트 추가
  userRank?: number;
  totalBidders?: number;
  virtualBidders?: Array<{
    name: string;
    bidAmount: number;
    timestamp: string;
  }>;
  details?: {
    competitionLevel?: string;
    biddingHistory?: Array<{
      name?: string;
      bid: number;
      timestamp: string;
    }>;
    marketTrend?: string;
  };
}

interface ResultCardProps {
  result: BidResult;
  isOpen: boolean;
  onClose: () => void;
  onViewDetails?: () => void;
}

const ResultCard: React.FC<ResultCardProps> = ({
  result,
  isOpen,
  onClose,
  onViewDetails,
}) => {
  if (!isOpen) return null;

  // 결과에 따른 아이콘과 색상 설정
  const getResultConfig = (success: boolean, profitOrLoss?: number) => {
    if (success) {
      if (profitOrLoss && profitOrLoss > 0) {
        return {
          icon: "🎉",
          title: "입찰 성공!",
          subtitle: "수익을 얻었습니다",
          bgColor: "bg-success-50",
          borderColor: "border-success-200",
          textColor: "text-success-800",
          buttonColor: "bg-success-600 hover:bg-success-700",
        };
      } else if (profitOrLoss && profitOrLoss < 0) {
        return {
          icon: "⚠️",
          title: "입찰 성공",
          subtitle: "하지만 손실이 발생했습니다",
          bgColor: "bg-warning-50",
          borderColor: "border-warning-200",
          textColor: "text-warning-800",
          buttonColor: "bg-warning-600 hover:bg-warning-700",
        };
      } else {
        return {
          icon: "✅",
          title: "입찰 성공!",
          subtitle: "성공적으로 입찰했습니다",
          bgColor: "bg-primary-50",
          borderColor: "border-primary-200",
          textColor: "text-primary-800",
          buttonColor: "bg-primary-600 hover:bg-primary-700",
        };
      }
    } else {
      return {
        icon: "❌",
        title: "입찰 실패",
        subtitle: "다른 경쟁자가 더 높은 가격을 제시했습니다",
        bgColor: "bg-danger-50",
        borderColor: "border-danger-200",
        textColor: "text-danger-800",
        buttonColor: "bg-danger-600 hover:bg-danger-700",
      };
    }
  };

  const config = getResultConfig(result.success, result.profitOrLoss);

  // 숫자 포맷팅
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("ko-KR").format(num);
  };

  // 수익률 계산
  const profitPercentage =
    result.marketPrice && result.finalBid
      ? (
          ((result.marketPrice - result.finalBid) / result.finalBid) *
          100
        ).toFixed(1)
      : null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div
        className={`${config.bgColor} ${config.borderColor} border-2 rounded-2xl shadow-2xl max-w-md w-full animate-fade-in my-8 max-h-[90vh] overflow-y-auto`}
      >
        {/* 헤더 */}
        <div className="p-6 text-center">
          <div className="text-6xl mb-4 animate-bounce-gentle">
            {config.icon}
          </div>
          <h2 className={`text-2xl font-bold ${config.textColor} mb-2`}>
            {config.title}
          </h2>
          <p className="text-gray-600 text-sm">{config.subtitle}</p>
        </div>

        {/* 결과 정보 */}
        <div className="px-6 pb-4">
          {/* 입찰 순위 정보 */}
          {result.userRank && result.totalBidders && (
            <div className="mb-4 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border-2 border-purple-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600 mb-1">입찰 순위</p>
                  <p className="text-2xl font-bold text-purple-700">
                    {result.userRank}위{" "}
                    <span className="text-sm text-gray-600">
                      / {result.totalBidders}명
                    </span>
                  </p>
                </div>
                <div className="text-4xl">
                  {result.userRank === 1
                    ? "🏆"
                    : result.userRank === 2
                    ? "🥈"
                    : result.userRank === 3
                    ? "🥉"
                    : "📊"}
                </div>
              </div>
            </div>
          )}

          <div className="bg-white rounded-lg p-4 space-y-3">
            {/* 최종 입찰가 */}
            {result.finalBid && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">최종 입찰가</span>
                <span className="text-lg font-bold text-gray-900">
                  {formatNumber(result.finalBid)}원
                </span>
              </div>
            )}

            {/* 손익 */}
            {result.profitOrLoss !== undefined && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">손익</span>
                <span
                  className={`text-lg font-bold ${
                    result.profitOrLoss > 0
                      ? "text-success-600"
                      : result.profitOrLoss < 0
                      ? "text-danger-600"
                      : "text-gray-600"
                  }`}
                >
                  {result.profitOrLoss > 0 ? "+" : ""}
                  {formatNumber(result.profitOrLoss)}원
                </span>
              </div>
            )}

            {/* 수익률 */}
            {profitPercentage && result.success && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">수익률</span>
                <span
                  className={`text-sm font-medium ${
                    parseFloat(profitPercentage) > 0
                      ? "text-success-600"
                      : parseFloat(profitPercentage) < 0
                      ? "text-danger-600"
                      : "text-gray-600"
                  }`}
                >
                  {parseFloat(profitPercentage) > 0 ? "+" : ""}
                  {profitPercentage}%
                </span>
              </div>
            )}

            {/* 시장가 */}
            {result.marketPrice && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">시장가</span>
                <span className="text-sm font-medium text-gray-800">
                  {formatNumber(result.marketPrice)}원
                </span>
              </div>
            )}

            {/* 감정가 */}
            {result.appraisedValue && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">감정가</span>
                <span className="text-sm font-medium text-gray-800">
                  {formatNumber(result.appraisedValue)}원
                </span>
              </div>
            )}
          </div>

          {/* 가상 입찰자 목록 */}
          {result.virtualBidders && result.virtualBidders.length > 0 && (
            <div className="mt-4 bg-white rounded-lg p-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                <span className="mr-2">👥</span>
                입찰자 목록
              </h3>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {result.virtualBidders.map((bidder, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-2 rounded-lg transition-all ${
                      bidder.name === "나"
                        ? "bg-blue-50 border-2 border-blue-300 shadow-sm"
                        : "bg-gray-50 hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      {/* 순위 표시 */}
                      <span
                        className={`text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full ${
                          bidder.name === "나"
                            ? "bg-blue-500 text-white"
                            : index === 0
                            ? "bg-yellow-400 text-yellow-900"
                            : index === 1
                            ? "bg-gray-300 text-gray-700"
                            : index === 2
                            ? "bg-orange-300 text-orange-900"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {index + 1}
                      </span>
                      {/* 입찰자 이름 */}
                      <span
                        className={`text-sm font-medium ${
                          bidder.name === "나"
                            ? "text-blue-700"
                            : "text-gray-700"
                        }`}
                      >
                        {bidder.name}
                        {bidder.name === "나" && " (나)"}
                      </span>
                      {/* 1위 트로피 */}
                      {index === 0 && <span className="text-xs">🏆</span>}
                    </div>
                    {/* 입찰가 */}
                    <span
                      className={`text-sm font-semibold ${
                        bidder.name === "나" ? "text-blue-700" : "text-gray-800"
                      }`}
                    >
                      {formatNumber(bidder.bidAmount)}원
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 메시지 */}
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-700 text-center">
              {result.message}
            </p>
          </div>

          {/* 추천사항 */}
          {result.recommendation && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-start">
                <span className="text-blue-500 mr-2">💡</span>
                <div>
                  <p className="text-sm font-medium text-blue-800 mb-1">
                    추천사항
                  </p>
                  <p className="text-sm text-blue-700">
                    {result.recommendation}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 상세 수익 분석 */}
          {result.profitAnalysis && (
            <div className="mt-4 p-4 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg border-2 border-purple-200">
              <h3 className="text-sm font-bold text-purple-900 mb-3 flex items-center">
                <span className="mr-2">📊</span>
                상세 분석 리포트
              </h3>
              <div className="text-xs text-gray-800 whitespace-pre-line leading-relaxed">
                {result.profitAnalysis}
              </div>
            </div>
          )}

          {/* 핵심 학습 포인트 */}
          {result.keyLearningPoints && result.keyLearningPoints.length > 0 && (
            <div className="mt-4 p-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg border-2 border-yellow-300">
              <h3 className="text-sm font-bold text-orange-900 mb-3 flex items-center">
                <span className="mr-2">🎓</span>
                핵심 학습 포인트
              </h3>
              <div className="space-y-3">
                {result.keyLearningPoints.map((point, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-2 p-2 bg-white rounded-lg"
                  >
                    <span className="text-orange-500 font-bold text-xs mt-0.5">
                      {index + 1}.
                    </span>
                    <p className="text-xs text-gray-800 leading-relaxed flex-1">
                      {point}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 버튼 영역 */}
        <div className="p-6 pt-0 space-y-3">
          {/* 상세 리포트 보기 버튼 */}
          {onViewDetails && (
            <button
              onClick={onViewDetails}
              className="w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              📊 상세 리포트 보기
            </button>
          )}

          {/* 닫기 버튼 */}
          <button
            onClick={onClose}
            className={`w-full py-3 px-4 ${config.buttonColor} text-white rounded-lg font-medium transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]`}
          >
            확인
          </button>
        </div>

        {/* 추가 정보 (경쟁 수준, 시장 동향 등) */}
        {result.details && (
          <div className="px-6 pb-4">
            <div className="bg-white rounded-lg p-4 space-y-2">
              {result.details.competitionLevel && (
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-600">경쟁 수준</span>
                  <span className="font-medium text-gray-800">
                    {result.details.competitionLevel}
                  </span>
                </div>
              )}
              {result.details.marketTrend && (
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-600">시장 동향</span>
                  <span className="font-medium text-gray-800">
                    {result.details.marketTrend}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultCard;
