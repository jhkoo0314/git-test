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
  details?: {
    competitionLevel?: string;
    biddingHistory?: Array<{
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div
        className={`${config.bgColor} ${config.borderColor} border-2 rounded-2xl shadow-2xl max-w-md w-full animate-fade-in`}
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
            {profitPercentage && (
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
