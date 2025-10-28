import Link from "next/link";
import { notFound } from "next/navigation";
import OverviewSection from "@/components/property/OverviewSection";

// 타입 정의
interface AuctionItem {
  id: string;
  title: string;
  marketPrice: number;
  appraisedValue: number;
  startingBid: number;
  riskType: "LOW" | "MEDIUM" | "HIGH" | "VERY_HIGH";
}

interface AuctionDetail {
  caseNumber?: string;
  address?: string;
  propertyType?: string;
  landArea?: number | null;
  buildingArea?: number | null;
  buildYear?: number | null;
  floor?: number | null;
  usage?: string | null;
}

// 서버 컴포넌트에서 데이터 fetch
async function getAuctionItem(id: string) {
  console.log("🔍 [서버] 매물 상세 정보 요청:", id);

  try {
    // 환경변수에서 base URL 가져오기 (배포 환경 대응)
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/auctions/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("❌ [서버] API 응답 실패:", res.status);
      return null;
    }

    const data = await res.json();
    console.log("✅ [서버] 매물 상세 정보 조회 성공:", data.success);

    if (!data.success || !data.data) {
      console.error("❌ [서버] 데이터 없음");
      return null;
    }

    return data.data; // API 응답 구조에 맞춰 data 필드를 반환
  } catch (error) {
    console.error("❌ [서버] 매물 상세 정보 조회 에러:", error);
    return null;
  }
}

export default async function AuctionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Next.js 15에서 params는 Promise로 처리
  const resolvedParams = await params;
  const { id } = resolvedParams;

  console.log("🏠 [페이지] 매물 상세 페이지 렌더링:", id);

  const data = await getAuctionItem(id);

  if (!data) {
    console.error("❌ [페이지] 매물 정보를 불러올 수 없음");
    notFound();
  }

  // API 응답 구조에 맞춰 데이터 추출
  const auction: AuctionItem = {
    id: data.auction.id,
    title: data.auction.title,
    marketPrice: data.auction.marketPrice,
    appraisedValue: data.auction.appraisedValue,
    startingBid: data.auction.startingBid,
    riskType: data.auction.riskType,
  };

  const detail: AuctionDetail = data.detail || {};

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* 헤더 */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
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
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            목록으로 돌아가기
          </Link>

          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <span className="mr-3">🏘️</span>
            {auction.title}
          </h1>

          <div className="flex items-center gap-2 mt-3">
            <span
              className={`px-3 py-1 text-sm rounded-full font-medium ${
                auction.riskType === "LOW"
                  ? "bg-green-100 text-green-800"
                  : auction.riskType === "MEDIUM"
                  ? "bg-yellow-100 text-yellow-800"
                  : auction.riskType === "HIGH"
                  ? "bg-orange-100 text-orange-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {auction.riskType === "LOW"
                ? "낮은 위험"
                : auction.riskType === "MEDIUM"
                ? "중간 위험"
                : auction.riskType === "HIGH"
                ? "높은 위험"
                : "매우 높은 위험"}
            </span>
          </div>
        </div>

        {/* 섹션들 */}
        <div className="space-y-6">
          {/* 기본 개요 - 올바른 props 전달 */}
          <OverviewSection auction={auction} detail={detail} />
        </div>

        {/* 하단 액션 버튼 */}
        <div className="mt-8 flex justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            입찰 시뮬레이션 시작
          </Link>
        </div>
      </div>
    </div>
  );
}



