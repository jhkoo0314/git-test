"use client";

import React, { useState, useEffect } from "react";
import AuctionCard from "../components/AuctionCard";
import ResultCard from "../components/ResultCard";
import BidInputModal from "../components/BidInputModal";
import PropertyDetailReport from "../components/PropertyDetailReport";
import UserInfoModal from "../components/UserInfoModal";

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

export default function HomePage() {
  const [auctionItems, setAuctionItems] = useState<AuctionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [biddingItemId, setBiddingItemId] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [bidResult, setBidResult] = useState<BidResult | null>(null);
  const [showBidModal, setShowBidModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<AuctionItem | null>(null);
  const [showDetailReport, setShowDetailReport] = useState(false);
  const [detailItem, setDetailItem] = useState<AuctionItem | null>(null);
  const [showUserInfoModal, setShowUserInfoModal] = useState(false);
  const [isSubmittingUserInfo, setIsSubmittingUserInfo] = useState(false);

  // 페이지네이션 상태 추가
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);

  // API에서 경매 데이터 로드 (페이지네이션 지원)
  const loadAuctionData = async (page: number = 1) => {
    console.log(`🔍 경매 데이터 로드 시작 - 페이지: ${page}`); // 로그 추가
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/auctions?page=${page}&limit=6`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("✅ API 응답 받음:", result); // 로그 추가

      if (result.success && result.data) {
        setAuctionItems(result.data);

        // 페이지네이션 정보 업데이트
        if (result.pagination) {
          setCurrentPage(result.pagination.currentPage);
          setTotalPages(result.pagination.totalPages);
          setTotalItems(result.pagination.totalItems);
          setHasNextPage(result.pagination.hasNextPage);
          setHasPrevPage(result.pagination.hasPrevPage);
        }

        console.log(
          `📦 페이지 ${page}/${result.pagination?.totalPages}: ${result.data.length}개의 경매 매물을 로드했습니다`
        ); // 로그 추가
      } else {
        throw new Error(result.error || "데이터를 불러오는데 실패했습니다");
      }
    } catch (error) {
      console.error("❌ 경매 데이터 로드 실패:", error); // 로그 추가

      // 에러 상태 설정
      setError(
        error instanceof Error
          ? error.message
          : "알 수 없는 오류가 발생했습니다"
      );
      setAuctionItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAuctionData();
  }, []);

  // 페이지네이션 네비게이션 함수들
  const handlePageChange = (page: number) => {
    console.log(`📄 페이지 변경: ${page}`); // 로그 추가
    setCurrentPage(page);
    loadAuctionData(page);
  };

  const handleNextPage = () => {
    if (hasNextPage) {
      handlePageChange(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (hasPrevPage) {
      handlePageChange(currentPage - 1);
    }
  };

  // 입찰 버튼 클릭 처리 (모달 열기)
  const handleBidClick = (item: AuctionItem) => {
    console.log("🎯 입찰 모달 열기:", item.title); // 로그 추가
    setSelectedItem(item);
    setShowBidModal(true);
  };

  // 입찰가 입력 후 실제 입찰 처리
  const handleBidConfirm = async (bidAmount: number) => {
    if (!selectedItem) return;

    console.log("💰 입찰 처리 시작:", {
      item: selectedItem.title,
      bidAmount: bidAmount,
    }); // 로그 추가

    setBiddingItemId(selectedItem.id);
    setShowBidModal(false);

    try {
      // 실제 API 호출
      const response = await fetch(`/api/auctions/${selectedItem.id}/bid`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bidAmount: bidAmount,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("✅ 입찰 결과:", result); // 로그 추가

        setBidResult(result);
        setShowResult(true);
      } else {
        const errorData = await response.json();
        console.error("❌ 입찰 실패:", errorData); // 로그 추가

        setBidResult({
          success: false,
          message: errorData.error || "입찰에 실패했습니다. 다시 시도해주세요.",
        });
        setShowResult(true);
      }
    } catch (error) {
      console.error("❌ 입찰 네트워크 오류:", error); // 로그 추가

      // 네트워크 오류 시 결과
      setBidResult({
        success: false,
        message: "네트워크 오류로 인해 입찰에 실패했습니다. 다시 시도해주세요.",
      });
      setShowResult(true);
    } finally {
      setBiddingItemId(null);
    }
  };

  // 입찰 모달 닫기
  const handleBidModalClose = () => {
    setShowBidModal(false);
    // selectedItem은 상세 리포트를 위해 유지
  };

  // 결과 모달 닫기
  const handleCloseResult = () => {
    setShowResult(false);
    setBidResult(null);
    setSelectedItem(null); // 입찰 완료 후 선택된 매물 정보 초기화
  };

  // 상세 리포트 보기 - 사용자 정보 수집 모달 먼저 표시
  const handleViewDetails = () => {
    console.log("📊 상세 리포트 보기 클릭 - 사용자 정보 수집 모달 표시"); // 로그 추가

    // 사용자 정보 수집 모달 표시
    setShowUserInfoModal(true);
  };

  // 매물 상세보기 클릭 처리 - 직접 상세 정보 표시
  const handleDetailClick = (item: AuctionItem) => {
    console.log("📋 매물 상세보기 요청:", item.title); // 로그 추가

    setDetailItem(item);
    setShowDetailReport(true);
  };

  // 상세 리포트 닫기
  const handleDetailClose = () => {
    setShowDetailReport(false);
    setDetailItem(null);
  };

  // 사용자 정보 수집 모달 확인 처리
  const handleUserInfoConfirm = async (userInfo: {
    name: string;
    email: string;
  }) => {
    console.log("👤 사용자 정보 수집 완료:", userInfo); // 로그 추가

    setIsSubmittingUserInfo(true);

    try {
      // 사용자 정보를 서버에 전송
      const response = await fetch("/api/collect-user-info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      });

      if (response.ok) {
        console.log("✅ 사용자 정보 저장 완료");

        // 성공 메시지 표시
        alert(
          `🎉 출시 알림 신청이 완료되었습니다!\n\n${userInfo.name}님의 이메일(${userInfo.email})로\n상세 리포트 기능이 출시되면 알려드리겠습니다.`
        );
      } else {
        console.log("⚠️ 사용자 정보 저장 실패");
        alert("⚠️ 알림 신청 중 오류가 발생했습니다.\n다시 시도해주세요.");
      }
    } catch (error) {
      console.log("⚠️ 사용자 정보 저장 중 오류:", error);
      alert("⚠️ 네트워크 오류가 발생했습니다.\n다시 시도해주세요.");
    } finally {
      setIsSubmittingUserInfo(false);
      setShowUserInfoModal(false);
    }
  };

  // 사용자 정보 수집 모달 닫기
  const handleUserInfoModalClose = () => {
    setShowUserInfoModal(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="spinner h-12 w-12 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">경매 매물을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-6xl mb-4">😞</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            데이터를 불러올 수 없습니다
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            🔄 새로고침
          </button>
        </div>
      </div>
    );
  }

  // 상세보기가 활성화된 경우 권리분석 리포트 표시
  if (showDetailReport && detailItem) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* 뒤로가기 버튼 */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <button
              onClick={() => {
                setShowDetailReport(false);
                setDetailItem(null);
              }}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              매물 목록으로 돌아가기
            </button>
          </div>
        </div>

        {/* 권리분석 리포트 */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <PropertyDetailReport
            property={detailItem}
            isOpen={true}
            onClose={() => {
              setShowDetailReport(false);
              setDetailItem(null);
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 히어로 섹션 */}
      <div className="bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              부동산 경매 시뮬레이션
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 mb-8">
              실제 부동산 경매 상황을 체험하며 투자 전략을 학습하세요
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-white/20 px-3 py-1 rounded-full">
                🏠 부동산 투자
              </span>
              <span className="bg-white/20 px-3 py-1 rounded-full">
                📊 시장 분석
              </span>
              <span className="bg-white/20 px-3 py-1 rounded-full">
                💰 수익률 계산
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 매물 목록 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              현재 경매 중인 부동산
            </h2>
            <p className="text-gray-600">
              다양한 위험도와 가격대의 부동산으로 입찰 전략을 연습해보세요
            </p>
          </div>
          <button
            onClick={() => loadAuctionData(currentPage)}
            disabled={loading}
            className="bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            {loading ? (
              <>
                <div className="spinner h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                로딩 중...
              </>
            ) : (
              <>🔄 새로고침</>
            )}
          </button>
        </div>

        {/* 매물 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {auctionItems.map((item) => (
            <AuctionCard
              key={item.id}
              auctionItem={item}
              onBidClick={handleBidClick}
              onDetailClick={handleDetailClick}
              isBidding={biddingItemId === item.id}
            />
          ))}
        </div>

        {/* 매물이 없는 경우 */}
        {auctionItems.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🏠</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              현재 경매 중인 부동산이 없습니다
            </h3>
            <p className="text-gray-600">
              새로운 부동산이 등록되면 알려드리겠습니다
            </p>
          </div>
        )}

        {/* 페이지네이션 UI */}
        {auctionItems.length > 0 && totalPages > 1 && (
          <div className="mt-12 flex flex-col items-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <button
                onClick={handlePrevPage}
                disabled={!hasPrevPage || loading}
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                  !hasPrevPage || loading
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 hover:border-gray-400"
                }`}
              >
                <span>←</span>
                이전
              </button>

              {/* 페이지 번호들 */}
              <div className="flex items-center space-x-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      disabled={loading}
                      className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                        page === currentPage
                          ? "bg-primary-600 text-white"
                          : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 hover:border-gray-400"
                      } ${loading ? "cursor-not-allowed opacity-50" : ""}`}
                    >
                      {page}
                    </button>
                  )
                )}
              </div>

              <button
                onClick={handleNextPage}
                disabled={!hasNextPage || loading}
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                  !hasNextPage || loading
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 hover:border-gray-400"
                }`}
              >
                다음
                <span>→</span>
              </button>
            </div>

            {/* 페이지 정보 */}
            <div className="text-sm text-gray-600">
              페이지 {currentPage} / {totalPages} (총 {totalItems}개 매물)
            </div>
          </div>
        )}
      </div>

      {/* 입찰가 입력 모달 */}
      <BidInputModal
        isOpen={showBidModal}
        onClose={handleBidModalClose}
        onConfirm={handleBidConfirm}
        auctionItem={selectedItem}
        isSubmitting={biddingItemId !== null}
      />

      {/* 결과 모달 */}
      {bidResult && (
        <ResultCard
          result={bidResult}
          isOpen={showResult}
          onClose={handleCloseResult}
          onViewDetails={handleViewDetails}
        />
      )}

      {/* 사용자 정보 수집 모달 */}
      <UserInfoModal
        isOpen={showUserInfoModal}
        onClose={handleUserInfoModalClose}
        onConfirm={handleUserInfoConfirm}
        isSubmitting={isSubmittingUserInfo}
      />
    </div>
  );
}
