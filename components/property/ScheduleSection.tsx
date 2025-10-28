import React from "react";

interface ScheduleItem {
  id?: string;
  eventDate: string;
  eventType: string;
  memo?: string | null;
}

const ScheduleSection: React.FC<{ schedule: ScheduleItem[] }> = ({
  schedule,
}) => {
  console.log("📋 일정 섹션 렌더링, 건수:", schedule?.length || 0);
  return (
    <section className="bg-white rounded-lg border p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <span className="mr-2">📅</span>
        일정/변경 이력
      </h3>
      {(!schedule || schedule.length === 0) && (
        <div className="text-gray-500">일정 정보가 없습니다.</div>
      )}
      <div className="space-y-3">
        {schedule?.map((s, idx) => (
          <div key={s.id || idx} className="p-4 bg-gray-50 rounded-lg border">
            <div className="flex flex-wrap gap-3 items-center">
              <span className="px-2 py-1 text-xs rounded bg-gray-200">
                {s.eventDate}
              </span>
              <span className="px-2 py-1 text-xs rounded bg-blue-100">
                {s.eventType}
              </span>
            </div>
            {s.memo && (
              <div className="text-sm text-gray-600 mt-2">비고: {s.memo}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ScheduleSection;
