import React, { useState, useEffect } from "react";

// AuctionItem 타입 정의
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

interface BidInputModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (bidAmount: number) => void;
  auctionItem: AuctionItem | null;
  isSubmitting?: boolean;
}

const BidInputModal: React.FC<BidInputModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  auctionItem,
  isSubmitting = false,
}) => {
  const [bidAmount, setBidAmount] = useState<string>("");
  const [error, setError] = useState<string>("");

  // 모달이 열릴 때마다 입찰가 초기화
  useEffect(() => {
    if (isOpen && auctionItem) {
      setBidAmount(auctionItem.startingBid.toString());
      setError("");
    }
  }, [isOpen, auctionItem]);

  // 숫자 포맷팅 함수
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("ko-KR").format(num);
  };

  // 입력값 검증
  const validateBidAmount = (value: string): string => {
    if (!value.trim()) {
      return "입찰가를 입력해주세요.";
    }

    const numValue = parseInt(value.replace(/,/g, ""));

    if (isNaN(numValue) || numValue <= 0) {
      return "올바른 입찰가를 입력해주세요.";
    }

    if (auctionItem && numValue < auctionItem.startingBid) {
      return `입찰가는 최소 ${formatNumber(
        auctionItem.startingBid
      )}원 이상이어야 합니다.`;
    }

    if (auctionItem && numValue > auctionItem.marketPrice * 2) {
      return `입찰가가 시장가의 2배를 초과했습니다. (최대: ${formatNumber(
        auctionItem.marketPrice * 2
      )}원)`;
    }

    return "";
  };

  // 입력값 변경 처리
  const handleBidAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, ""); // 숫자만 허용
    setBidAmount(value);

    if (value) {
      const errorMsg = validateBidAmount(value);
      setError(errorMsg);
    } else {
      setError("");
    }
  };

  // 빠른 입찰가 설정
  const setQuickBid = (multiplier: number) => {
    if (auctionItem) {
      const quickAmount = Math.floor(auctionItem.startingBid * multiplier);
      setBidAmount(quickAmount.toString());
      setError("");
    }
  };

  // 입찰 확인
  const handleConfirm = () => {
    if (!auctionItem) return;

    const errorMsg = validateBidAmount(bidAmount);
    if (errorMsg) {
      setError(errorMsg);
      return;
    }

    const finalBidAmount = parseInt(bidAmount.replace(/,/g, ""));
    console.log("💰 입찰가 입력:", {
      item: auctionItem.title,
      bidAmount: finalBidAmount,
      startingBid: auctionItem.startingBid,
      marketPrice: auctionItem.marketPrice,
    }); // 로그 추가

    onConfirm(finalBidAmount);
  };

  // 모달이 닫혀있으면 렌더링하지 않음
  if (!isOpen || !auctionItem) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* 배경 오버레이 */}
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />

      {/* 모달 컨테이너 */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-xl shadow-xl max-w-md w-full transform transition-all">
          {/* 헤더 */}
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white p-6 rounded-t-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold">입찰하기</h3>
              <button
                onClick={onClose}
                disabled={isSubmitting}
                className="text-white/80 hover:text-white transition-colors disabled:opacity-50"
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

          {/* 콘텐츠 */}
          <div className="p-6">
            {/* 매물 정보 */}
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-2">
                {auctionItem.title}
              </h4>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>시작 입찰가:</span>
                  <span className="font-medium text-primary-600">
                    {formatNumber(auctionItem.startingBid)}원
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>감정가:</span>
                  <span className="font-medium text-blue-600">
                    {formatNumber(auctionItem.appraisedValue)}원
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>시장가:</span>
                  <span
                    className={`font-medium ${
                      auctionItem.marketPrice > auctionItem.appraisedValue
                        ? "text-green-600"
                        : "text-orange-600"
                    }`}
                  >
                    {formatNumber(auctionItem.marketPrice)}원
                    {auctionItem.marketPrice > auctionItem.appraisedValue
                      ? " ↗️"
                      : " ↘️"}
                  </span>
                </div>
                {/* 가격 관계 설명 */}
                <div className="mt-2 p-2 bg-gray-50 rounded-lg text-xs text-gray-500">
                  {auctionItem.marketPrice > auctionItem.appraisedValue ? (
                    <span>
                      💡 시장가가 감정가보다 높습니다 (시장 상황이 좋음)
                    </span>
                  ) : (
                    <span>
                      ⚠️ 시장가가 감정가보다 낮습니다 (시장 상황이 어려움)
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* 입찰가 입력 */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                입찰가 입력
              </label>

              <div className="relative">
                <input
                  type="text"
                  value={
                    bidAmount
                      ? formatNumber(parseInt(bidAmount.replace(/,/g, "")))
                      : ""
                  }
                  onChange={handleBidAmountChange}
                  placeholder="입찰가를 입력하세요"
                  disabled={isSubmitting}
                  className={`w-full px-4 py-3 border rounded-lg text-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    error
                      ? "border-red-300 bg-red-50"
                      : "border-gray-300 focus:border-primary-500"
                  } ${isSubmitting ? "bg-gray-100 cursor-not-allowed" : ""}`}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  원
                </div>
              </div>

              {/* 에러 메시지 */}
              {error && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {error}
                </p>
              )}
            </div>

            {/* 빠른 입찰가 버튼들 */}
            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-3">빠른 입찰가 설정:</p>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setQuickBid(1.1)}
                  disabled={isSubmitting}
                  className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50"
                >
                  +10%
                </button>
                <button
                  onClick={() => setQuickBid(1.2)}
                  disabled={isSubmitting}
                  className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50"
                >
                  +20%
                </button>
                <button
                  onClick={() => setQuickBid(1.5)}
                  disabled={isSubmitting}
                  className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50"
                >
                  +50%
                </button>
              </div>
            </div>

            {/* 버튼들 */}
            <div className="flex space-x-3">
              <button
                onClick={onClose}
                disabled={isSubmitting}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                취소
              </button>
              <button
                onClick={handleConfirm}
                disabled={isSubmitting || !!error || !bidAmount}
                className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors ${
                  isSubmitting || !!error || !bidAmount
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-primary-600 hover:bg-primary-700 text-white"
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    입찰 중...
                  </div>
                ) : (
                  "입찰하기"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BidInputModal;
