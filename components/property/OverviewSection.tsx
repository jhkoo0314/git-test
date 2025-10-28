import React from "react";

interface AuctionOverviewProps {
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
}

const OverviewSection: React.FC<AuctionOverviewProps> = ({
  auction,
  detail,
}) => {
  console.log("📋 개요 섹션 렌더링:", auction.id, auction.title);
  const format = (n: number) => new Intl.NumberFormat("ko-KR").format(n);

  // 위험도에 따른 색상 및 텍스트 매핑
  const getRiskInfo = (riskType: string) => {
    switch (riskType) {
      case "LOW":
        return { color: "text-green-600", text: "낮음", emoji: "🟢" };
      case "MEDIUM":
        return { color: "text-yellow-600", text: "보통", emoji: "🟡" };
      case "HIGH":
        return { color: "text-orange-600", text: "높음", emoji: "🟠" };
      case "VERY_HIGH":
        return { color: "text-red-600", text: "매우 높음", emoji: "🔴" };
      default:
        return { color: "text-gray-600", text: "알 수 없음", emoji: "❓" };
    }
  };

  const riskInfo = getRiskInfo(auction.riskType);

  return (
    <section className="bg-white rounded-lg border p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <span className="mr-2">🏠</span>
        기본 개요
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="text-sm text-gray-600">매물명</div>
          <div className="text-lg font-semibold">{auction.title}</div>
        </div>
        <div>
          <div className="text-sm text-gray-600">사건번호</div>
          <div className="text-lg font-semibold">
            {detail?.caseNumber || "-"}
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-600">주소</div>
          <div className="text-lg font-semibold">{detail?.address || "-"}</div>
        </div>
        <div>
          <div className="text-sm text-gray-600">용도/종별</div>
          <div className="text-lg font-semibold">
            {detail?.propertyType || "-"}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
        <div className="text-center p-4 bg-gray-50 rounded-lg border">
          <div className="text-sm text-gray-600">시작 입찰가</div>
          <div className="text-xl font-bold text-blue-600">
            {format(auction.startingBid)}원
          </div>
        </div>
        <div className="text-center p-4 bg-gray-50 rounded-lg border">
          <div className="text-sm text-gray-600">감정가</div>
          <div className="text-xl font-bold">
            {format(auction.appraisedValue)}원
          </div>
        </div>
        <div className="text-center p-4 bg-gray-50 rounded-lg border">
          <div className="text-sm text-gray-600">시장가</div>
          <div className="text-xl font-bold text-green-600">
            {format(auction.marketPrice)}원
          </div>
        </div>
        <div className="text-center p-4 bg-gray-50 rounded-lg border">
          <div className="text-sm text-gray-600">투자 위험도</div>
          <div
            className={`text-xl font-bold ${riskInfo.color} flex items-center justify-center`}
          >
            <span className="mr-1">{riskInfo.emoji}</span>
            {riskInfo.text}
          </div>
        </div>
      </div>

      {/* 추가 분석 정보 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="text-sm text-blue-600">입찰 비율</div>
          <div className="text-lg font-bold text-blue-700">
            {((auction.startingBid / auction.appraisedValue) * 100).toFixed(1)}%
          </div>
          <div className="text-xs text-blue-500 mt-1">(시작가 ÷ 감정가)</div>
        </div>

        <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
          <div className="text-sm text-green-600">시장가 대비</div>
          <div className="text-lg font-bold text-green-700">
            {((auction.marketPrice / auction.appraisedValue) * 100).toFixed(1)}%
          </div>
          <div className="text-xs text-green-500 mt-1">(시장가 ÷ 감정가)</div>
        </div>

        <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
          <div className="text-sm text-purple-600">예상 수익률</div>
          <div className="text-lg font-bold text-purple-700">
            {(
              ((auction.marketPrice - auction.startingBid) /
                auction.startingBid) *
              100
            ).toFixed(1)}
            %
          </div>
          <div className="text-xs text-purple-500 mt-1">(시장가 기준)</div>
        </div>
      </div>
    </section>
  );
};

export default OverviewSection;
