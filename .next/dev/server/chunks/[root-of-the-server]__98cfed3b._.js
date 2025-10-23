module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/app/api/collect-user-info/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module 'googleapis'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
;
;
async function POST(request) {
    try {
        console.log("📝 사용자 정보 수집 API 호출"); // 로그 추가
        const body = await request.json();
        const { name, email, propertyTitle } = body;
        // 필수 필드 검증
        if (!name || !email) {
            console.error("❌ 필수 필드 누락:", {
                name,
                email
            }); // 로그 추가
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: "이름과 이메일은 필수입니다."
            }, {
                status: 400
            });
        }
        // 환경 변수 검증
        const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY;
        const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
        const sheetId = process.env.GOOGLE_SHEET_ID;
        if (!privateKey || !clientEmail || !sheetId) {
            console.error("❌ 구글 시트 환경 변수 누락"); // 로그 추가
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: "서버 설정 오류가 발생했습니다."
            }, {
                status: 500
            });
        }
        // 구글 시트 API 인증 설정
        const auth = new google.auth.GoogleAuth({
            credentials: {
                private_key: privateKey.replace(/\\n/g, "\n"),
                client_email: clientEmail
            },
            scopes: [
                "https://www.googleapis.com/auth/spreadsheets"
            ]
        });
        const sheets = google.sheets({
            version: "v4",
            auth
        });
        // 현재 시간
        const timestamp = new Date().toLocaleString("ko-KR", {
            timeZone: "Asia/Seoul",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        });
        // 시트에 데이터 추가
        const values = [
            [
                name,
                email,
                propertyTitle || "알 수 없음",
                timestamp
            ]
        ];
        console.log("📊 구글 시트에 데이터 추가:", {
            name,
            email,
            propertyTitle,
            timestamp
        }); // 로그 추가
        await sheets.spreadsheets.values.append({
            spreadsheetId: sheetId,
            range: "A:D",
            valueInputOption: "RAW",
            requestBody: {
                values: values
            }
        });
        console.log("✅ 구글 시트 데이터 추가 성공"); // 로그 추가
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            message: "정상 처리되었습니다. 정식출시가 되면 알려 드리겠습니다."
        });
    } catch (error) {
        console.error("❌ 구글 시트 연동 오류:", error); // 로그 추가
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: "데이터 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__98cfed3b._.js.map