import React from "react";

interface RightItem {
  id?: string;
  rightType: string;
  rank?: number | null;
  establishedAt?: string | null;
  claimAmount?: number | null;
  isBaseRight: boolean;
  holder?: string | null;
  memo?: string | null;
}

const RightsSection: React.FC<{ rights: RightItem[] }> = ({ rights }) => {
  console.log("📋 권리 섹션 렌더링, 건수:", rights?.length || 0);
  const format = (n?: number | null) =>
    typeof n === "number" ? new Intl.NumberFormat("ko-KR").format(n) : "-";

  return (
    <section className="bg-white rounded-lg border p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <span className="mr-2">📜</span>
        권리관계
      </h3>
      {(!rights || rights.length === 0) && (
        <div className="text-gray-500">권리 정보가 없습니다.</div>
      )}
      <div className="space-y-3">
        {rights?.map((r, idx) => (
          <div key={r.id || idx} className="p-4 bg-gray-50 rounded-lg border">
            <div className="flex flex-wrap gap-4 items-center">
              <span className="px-2 py-1 text-xs rounded bg-gray-200">
                {r.rank ?? "-"}순위
              </span>
              <span className="font-semibold">{r.rightType}</span>
              {r.isBaseRight && (
                <span className="px-2 py-1 text-xs rounded bg-yellow-200">
                  말소기준권리
                </span>
              )}
            </div>
            <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-3 text-sm text-gray-700">
              <div>설정일: {r.establishedAt || "-"}</div>
              <div>채권액: {format(r.claimAmount)}원</div>
              <div>권리자: {r.holder || "-"}</div>
            </div>
            {r.memo && (
              <div className="text-sm text-gray-600 mt-2">비고: {r.memo}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default RightsSection;
