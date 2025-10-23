import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bid Master - 경매 시뮬레이션 플랫폼",
  description:
    "실제 경매 상황을 시뮬레이션하며 입찰 전략을 학습할 수 있는 플랫폼",
  keywords: ["경매", "시뮬레이션", "입찰", "투자", "학습"],
  authors: [{ name: "Bid Master Team" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Pretendard:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-gray-50">
        <div className="min-h-screen flex flex-col">
          {/* 헤더 */}
          <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <h1 className="text-2xl font-bold text-primary-600">
                      🏺 Bid Master
                    </h1>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-sm text-gray-600">
                    시뮬레이션 포인트:{" "}
                    <span className="font-semibold text-primary-600">
                      1,000
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* 메인 콘텐츠 */}
          <main className="flex-1">{children}</main>

          {/* 푸터 */}
          <footer className="bg-white border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="text-center text-sm text-gray-500">
                <p>&copy; 2024 Bid Master. 모든 권리 보유.</p>
                <p className="mt-1">경매 시뮬레이션을 통한 투자 학습 플랫폼</p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
