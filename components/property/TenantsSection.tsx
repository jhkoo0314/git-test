import React from "react";

interface TenantItem {
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
}

const TenantsSection: React.FC<{ tenants: TenantItem[] }> = ({ tenants }) => {
  console.log("📋 임차/점유 섹션 렌더링, 건수:", tenants?.length || 0);
  const format = (n?: number | null) =>
    typeof n === "number" ? new Intl.NumberFormat("ko-KR").format(n) : "-";

  return (
    <section className="bg-white rounded-lg border p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <span className="mr-2">👥</span>
        임차/점유
      </h3>
      {(!tenants || tenants.length === 0) && (
        <div className="text-gray-500">임차/점유 정보가 없습니다.</div>
      )}
      <div className="space-y-3">
        {tenants?.map((t, idx) => (
          <div key={t.id || idx} className="p-4 bg-gray-50 rounded-lg border">
            <div className="flex flex-wrap gap-3 items-center">
              <span className="px-2 py-1 text-xs rounded bg-gray-200">
                {t.tenantType}
              </span>
              {t.hasOpposability && (
                <span className="px-2 py-1 text-xs rounded bg-blue-200">
                  대항력
                </span>
              )}
              {t.hasPreferential && (
                <span className="px-2 py-1 text-xs rounded bg-green-200">
                  우선변제
                </span>
              )}
              {t.occupancy && (
                <span className="px-2 py-1 text-xs rounded bg-yellow-100">
                  {t.occupancy}
                </span>
              )}
            </div>
            <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-3 text-sm text-gray-700">
              <div>보증금: {format(t.deposit)}원</div>
              <div>월세: {format(t.monthlyRent)}원</div>
              <div>전입일: {t.moveInDate || "-"}</div>
              <div>확정일자: {t.fixedDate || "-"}</div>
              <div>이름: {t.name || "-"}</div>
            </div>
            {t.memo && (
              <div className="text-sm text-gray-600 mt-2">비고: {t.memo}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default TenantsSection;
