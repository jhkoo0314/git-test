import { notFound } from "next/navigation";
import Link from "next/link";
import OverviewSection from "@/components/property/OverviewSection";
import RightsSection from "@/components/property/RightsSection";
import TenantsSection from "@/components/property/TenantsSection";
import ScheduleSection from "@/components/property/ScheduleSection";
import { InteractiveTutor } from "@/components/InteractiveTutor";

// 타입 정의
interface AuctionDetailData {
  auction: {
    id: string;
    title: string;
    marketPrice: number;
    appraisedValue: number;
    startingBid: number;
    riskType: "LOW" | "MEDIUM" | "HIGH" | "VERY_HIGH";
  };
  detail?: {
    caseNumber: string;
    address: string;
    propertyType: string;
    landArea?: number | null;
    buildingArea?: number | null;
    buildYear?: number | null;
    floor?: number | null;
    usage?: string | null;
  };
  rights: Array<{
    id?: string;
    rightType: string;
    rank?: number | null;
    establishedAt?: string | null;
    claimAmount?: number | null;
    isBaseRight: boolean;
    holder?: string | null;
    memo?: string | null;
  }>;
  tenants: Array<{
    id?: string;
    tenantType: string;
    deposit?: number | null;
    monthlyRent?: number | null;
    moveInDate?: string | null;
    fixedDate?: string | null;
    hasOpposability?: boolean | null;
    hasPreferential?: boolean | null;
    occupancy?: string | null;
    name?: string | null;
    memo?: string | null;
  }>;
  schedule: Array<{
    id?: string;
    eventDate: string;
    eventType: string;
    memo?: string | null;
  }>;
}

async function fetchAuctionDetail(id: string): Promise<AuctionDetailData> {
  console.log("🔍 [서버] 매물 상세 정보 요청:", id);

  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/auctions/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("❌ [서버] API 응답 실패:", res.status);
      throw new Error(`API 응답 실패: ${res.status}`);
    }

    const json = await res.json();
    console.log("✅ [서버] 매물 상세 정보 조회 성공:", json.success);

    if (!json.success || !json.data) {
      throw new Error("데이터 조회 실패");
    }

    return json.data;
  } catch (error) {
    console.error("❌ [서버] 매물 상세 정보 조회 에러:", error);
    throw error;
  }
}

export default async function AuctionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  console.log("🏠 [페이지] 매물 상세 페이지 렌더링:", id);

  let data: AuctionDetailData;

  try {
    data = await fetchAuctionDetail(id);
  } catch (error) {
    console.error("❌ [페이지] 데이터 로드 실패:", error);
    notFound();
  }

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
            {data.auction.title}
          </h1>

          <div className="flex items-center gap-2 mt-3">
            <span
              className={`px-3 py-1 text-sm rounded-full font-medium ${
                data.auction.riskType === "LOW"
                  ? "bg-green-100 text-green-800"
                  : data.auction.riskType === "MEDIUM"
                  ? "bg-yellow-100 text-yellow-800"
                  : data.auction.riskType === "HIGH"
                  ? "bg-orange-100 text-orange-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {data.auction.riskType === "LOW"
                ? "낮은 위험"
                : data.auction.riskType === "MEDIUM"
                ? "중간 위험"
                : data.auction.riskType === "HIGH"
                ? "높은 위험"
                : "매우 높은 위험"}
            </span>
          </div>
        </div>

        {/* 섹션들 */}
        <div className="space-y-6">
          {/* 기본 개요 */}
          <OverviewSection auction={data.auction} detail={data.detail} />

          {/* 권리관계 */}
          <RightsSection rights={data.rights} />

          {/* 임차/점유 */}
          <TenantsSection tenants={data.tenants} />

          {/* 일정/변경 이력 */}
          <ScheduleSection schedule={data.schedule} />

          {/* 경매 멘토 학습 섹션 */}
          <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center justify-center">
                <span className="mr-2">🎓</span>이 매물로 경매 학습하기
              </h2>
              <p className="text-gray-600">
                현재 매물의 정보를 바탕으로 경매의 핵심 개념을 학습해보세요
              </p>
            </div>
            <InteractiveTutor auctionItem={data.auction} />
          </div>
        </div>

        {/* 하단 액션 버튼 */}
        <div className="mt-8 flex justify-center">
          <Link
            href={`/`}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            입찰 시뮬레이션 시작
          </Link>
        </div>
      </div>
    </div>
  );
}
