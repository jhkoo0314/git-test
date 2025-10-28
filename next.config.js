/** @type {import('next').NextConfig} */
const nextConfig = {
  // Turbopack 설정 (Next.js 16 기본값)
  turbopack: {},
  // Prisma 클라이언트 최적화 (Turbopack과 호환)
  experimental: {
    turbo: {
      rules: {
        "*.node": {
          loaders: ["file-loader"],
          as: "*.node",
        },
      },
    },
  },
  // TypeScript 에러 시 빌드 중단 방지
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
