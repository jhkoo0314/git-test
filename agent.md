# Bid Master - 부동산 경매 시뮬레이션 플랫폼

## 프로젝트 개요

**Bid Master**는 실제 부동산 경매 상황을 시뮬레이션하며 입찰 전략을 학습할 수 있는 웹 플랫폼입니다. 사용자는 다양한 위험도와 가격대의 부동산에 대해 입찰을 연습하고, 투자 전략을 수립할 수 있습니다.

실제 부동산 경매 데이터를 기반으로 한 시뮬레이션을 통해 안전하게 경매 투자 경험을 쌓을 수 있으며, 권리분석 리포트를 통해 전문적인 분석 능력을 키울 수 있습니다.

## 기술 스택

### 프론트엔드

- **Next.js 16.0.0** - React 기반 풀스택 프레임워크
- **React 19.2.0** - 사용자 인터페이스 라이브러리
- **TypeScript 5.3.3** - 타입 안전성을 위한 정적 타입 언어
- **Tailwind CSS 3.4.0** - 유틸리티 우선 CSS 프레임워크

### 백엔드 & 데이터베이스

- **Prisma 5.22.0** - 데이터베이스 ORM
- **SQLite** - 경량 데이터베이스 (개발용)
- **Next.js API Routes** - 서버리스 API 엔드포인트

### 개발 도구

- **pnpm** - 패키지 매니저
- **tsx** - TypeScript 실행기
- **Autoprefixer** - CSS 벤더 프리픽스 자동 추가

## 프로젝트 구조

```
bid master/
├── app/                          # Next.js App Router
│   ├── api/                      # API 라우트
│   │   ├── auctions/             # 경매 관련 API
│   │   │   ├── [id]/            # 개별 경매 매물 API
│   │   │   │   ├── bid/         # 입찰 처리 API
│   │   │   │   │   └── route.ts
│   │   │   │   └── route.ts     # 매물 상세 조회 API
│   │   │   └── route.ts         # 경매 목록 조회 API (페이지네이션)
│   │   ├── collect-user-info/   # 사용자 정보 수집 API
│   │   │   └── route.ts         # Google Sheets 연동
│   │   ├── seed/                # 시드 데이터 API
│   │   │   └── route.ts
│   │   └── README.md            # API 문서
│   ├── globals.css              # 전역 스타일
│   ├── layout.tsx               # 루트 레이아웃
│   └── page.tsx                 # 메인 페이지 (경매 목록 + 입찰)
├── components/                   # React 컴포넌트
│   ├── AuctionCard.tsx          # 경매 매물 카드
│   ├── BidInputModal.tsx        # 입찰가 입력 모달
│   ├── PropertyDetailReport.tsx # 매물 권리분석 리포트
│   ├── ResultCard.tsx           # 입찰 결과 카드
│   └── UserInfoModal.tsx        # 사용자 정보 수집 모달
├── prisma/                      # 데이터베이스 스키마
│   ├── schema.prisma           # Prisma 스키마 정의
│   ├── dev.db                  # SQLite 데이터베이스
│   └── seed.ts                 # 시드 데이터 생성
├── generated/                   # Prisma 생성 파일
│   └── prisma/
├── agent.md                     # 프로젝트 문서 (본 파일)
└── package.json                # 프로젝트 설정
```

## 주요 기능

### 1. 경매 매물 조회

- **페이지네이션 지원**: 6개씩 매물을 표시하며 페이지별로 탐색 가능
- **총 20개의 다양한 매물**: 시드 기반 일관된 매물 데이터 생성
- **다양한 매물 유형**: 아파트, 오피스텔, 빌라, 상가, 단독주택, 원룸
- **실제적인 매물 데이터**: 서울시 13개 구별 현실적인 매물명과 가격대
  - 강남구, 서초구, 송파구, 마포구, 용산구, 성동구, 영등포구
  - 강동구, 노원구, 종로구, 중구, 강서구, 동작구
- **위험도 분류**: LOW, MEDIUM, HIGH, VERY_HIGH 4단계 위험도 시스템
- **새로고침 기능**: 매물 목록을 수동으로 갱신 가능

### 2. 입찰 시뮬레이션

- **입찰가 입력 모달**: 사용자 친화적인 입찰가 입력 인터페이스
- **빠른 입찰가 설정**: +10%, +20%, +50% 버튼으로 빠른 설정
- **실시간 검증**: 최소 입찰가, 최대 입찰가 자동 검증
- **시뮬레이션 결과**: 위험도에 따른 성공 확률과 손익 계산
  - LOW 위험도: 90% 성공 확률
  - MEDIUM 위험도: 70% 성공 확률
  - HIGH 위험도: 40% 성공 확률
  - VERY_HIGH 위험도: 20% 성공 확률
- **입찰가 검증**: 감정가를 초과하면 성공 확률 50% 감소
- **실시간 손익 계산**: 성공 시 (시장가 - 입찰가), 실패 시 -입찰가

### 3. 매물 상세 분석 (권리분석 리포트)

- **사용자 정보 수집**: 리포트 조회 전 이름, 이메일 수집
- **Google Sheets 연동**: 수집된 정보를 자동으로 Google Sheets에 저장
- **권리분석 리포트**: 등기부등본 기반 상세 분석
  - 소유권 현황 및 권리 관계
  - 가격 분석 (시작가, 감정가, 시장가 비교)
  - 위험도 분석 및 평가
  - 투자 권고사항 및 예상 수익률
  - 매물 위치 정보 및 시장 동향
- **전체 페이지 리포트**: 별도 페이지에서 상세 리포트 표시
- **뒤로가기 기능**: 매물 목록으로 쉽게 돌아가기

### 4. 사용자 경험

- **반응형 디자인**: 모바일, 태블릿, 데스크톱 지원
- **직관적인 UI**: 이모지와 색상을 활용한 직관적 인터페이스
- **실시간 피드백**: 입찰 과정의 모든 단계에서 즉시 피드백
- **로딩 상태 관리**: 사용자 액션에 대한 명확한 로딩 표시
- **에러 처리**: 친화적인 에러 메시지 및 새로고침 옵션
- **히어로 섹션**: 매력적인 랜딩 섹션으로 사용자 참여 유도
- **입력 검증**: 실시간 입력 검증 및 피드백

## 데이터베이스 스키마

현재 프로젝트는 **SQLite**를 사용하며, Prisma ORM을 통해 데이터베이스를 관리합니다.

### AuctionItem (경매 매물)

```prisma
model AuctionItem {
  id            String    @id @default(cuid())
  title         String    // 매물 제목 (예: "강남구 래미안 101동 513호")
  itemType      String    // 매물 유형 (아파트, 오피스텔, 빌라, 상가, 단독주택, 원룸)
  imageUrl      String?   // 매물 이미지 URL (Unsplash 기반)
  appraisedValue Int      // 감정가 (원)
  startingBid   Int      // 시작 입찰가 (감정가의 70-85%)
  marketPrice   Int      // 시장가 (감정가의 85-120%)
  riskType      String   // 위험도 타입 ("LOW", "MEDIUM", "HIGH", "VERY_HIGH")
  riskData      String?  // 위험도 관련 추가 데이터 (JSON 문자열)
  commentaryId  String?  // 해설 ID (추후 확장용)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  // 관계 설정
  simulationResults SimulationResult[]

  @@map("auction_items")
}
```

### User (사용자)

```prisma
model User {
  id               String    @id @default(cuid())
  simulationPoints Int       @default(1000) // 시뮬레이션 포인트 (기본값 1000)
  createdAt        DateTime  @default(now())
  updatedAt        DateTime  @updatedAt

  // 관계 설정
  simulationResults SimulationResult[]

  @@map("users")
}
```

### SimulationResult (시뮬레이션 결과)

```prisma
model SimulationResult {
  id            String      @id @default(cuid())
  userId        String      // 사용자 ID
  auctionItemId String      // 경매 매물 ID
  finalBid      Int         // 최종 입찰가
  result        String      // 결과 ("성공", "실패", "보류" 등)
  profitOrLoss  Int         // 손익 (양수: 이익, 음수: 손실)
  createdAt     DateTime    @default(now())

  // 관계 설정
  user        User        @relation(fields: [userId], references: [id], onDelete: Cascade)
  auctionItem AuctionItem @relation(fields: [auctionItemId], references: [id], onDelete: Cascade)

  @@map("simulation_results")
}
```

**참고**: 현재 구현에서는 실제 데이터베이스를 사용하지 않고, 시드 기반으로 메모리에서 매물 데이터를 생성합니다.

## API 엔드포인트

### GET /api/auctions

경매 매물 목록을 조회합니다. 페이지네이션을 지원합니다.

**파라미터**:

- `page`: 페이지 번호 (기본값: 1)
- `limit`: 페이지당 항목 수 (기본값: 6)

**응답 예시**:

```json
{
  "success": true,
  "data": [
    {
      "id": "unique_seed_id",
      "title": "강남구 래미안 101동 513호",
      "itemType": "아파트",
      "imageUrl": "https://images.unsplash.com/...",
      "appraisedValue": 800000000,
      "startingBid": 600000000,
      "marketPrice": 850000000,
      "riskType": "LOW",
      "riskData": { ... },
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 4,
    "totalItems": 20,
    "itemsPerPage": 6,
    "hasNextPage": true,
    "hasPrevPage": false
  },
  "message": "경매 목록을 성공적으로 조회했습니다"
}
```

### POST /api/auctions/[id]/bid

특정 매물에 대한 입찰을 처리하고 시뮬레이션 결과를 계산합니다.

**요청 본문**:

```json
{
  "bidAmount": 650000000
}
```

**응답 예시**:

```json
{
  "success": true,
  "finalBid": 650000000,
  "profitOrLoss": 200000000,
  "marketPrice": 850000000,
  "appraisedValue": 800000000,
  "riskLevel": "LOW",
  "recommendation": "🎉 축하합니다! 수익을 거두었습니다.",
  "details": {
    "competitionLevel": "보통",
    "biddingHistory": [...],
    "marketTrend": "안정적"
  },
  "message": "입찰 처리가 완료되었습니다"
}
```

### POST /api/collect-user-info

사용자 정보를 수집하고 Google Sheets에 저장합니다.

**요청 본문**:

```json
{
  "name": "홍길동",
  "email": "hong@example.com",
  "propertyTitle": "강남구 래미안 101동 513호"
}
```

**응답 예시**:

```json
{
  "success": true,
  "message": "정상 처리되었습니다. 정식출시가 되면 알려 드리겠습니다."
}
```

**필수 환경 변수**:

- `GOOGLE_SHEETS_PRIVATE_KEY`: Google Service Account Private Key
- `GOOGLE_SHEETS_CLIENT_EMAIL`: Google Service Account Email
- `GOOGLE_SHEET_ID`: 데이터를 저장할 Google Sheet ID

## 핵심 알고리즘

### 1. 매물 데이터 생성 (시드 기반)

프로젝트는 일관된 매물 데이터를 생성하기 위해 시드 기반 랜덤 생성 시스템을 사용합니다.

```typescript
function generateRandomPropertyWithSeed(seed: string) {
  // 시드를 해시값으로 변환
  const seedHash = seed.split("").reduce((a, b) => {
    a = (a << 5) - a + b.charCodeAt(0);
    return a & a;
  }, 0);

  // 시드 기반으로 일관된 데이터 생성
  const locationIndex = Math.abs(seedHash) % locations.length;
  const propertyTypeIndex = Math.abs(seedHash >> 8) % propertyTypes.length;
  const riskTypeIndex = Math.abs(seedHash >> 16) % riskTypes.length;

  // ... 매물 유형별 특성 설정
}
```

**주요 특징**:

- **일관성**: 동일한 시드는 항상 동일한 매물 생성
- **매물 유형별 가격대**:
  - 아파트: 3억 ~ 15억
  - 오피스텔: 1.5억 ~ 10억
  - 빌라: 2억 ~ 10억
  - 상가: 1억 ~ 15억
  - 단독주택: 4억 ~ 15억
  - 원룸: 8천만 ~ 5억
- **현실적인 매물명**: 브랜드명 + 동호수 조합 (예: "강남구 래미안 101동 513호")
- **이미지 URL**: Unsplash 기반 매물 유형별 이미지

### 2. 시뮬레이션 결과 계산

```typescript
function calculateSimulationResult(auctionItem: any, bidAmount: number) {
  // 위험도별 기본 성공 확률
  let successProbability = 0.7;

  switch (riskType) {
    case "LOW":
      successProbability = 0.9;
      break; // 90%
    case "MEDIUM":
      successProbability = 0.7;
      break; // 70%
    case "HIGH":
      successProbability = 0.4;
      break; // 40%
    case "VERY_HIGH":
      successProbability = 0.2;
      break; // 20%
  }

  // 입찰가가 감정가보다 높으면 성공 확률 50% 감소
  if (bidAmount > appraisedValue) {
    successProbability *= 0.5;
  }

  // 랜덤 결과 생성
  const isSuccess = Math.random() < successProbability;

  // 손익 계산
  const profitOrLoss = isSuccess
    ? marketPrice - bidAmount // 성공: 시장가 - 입찰가
    : -bidAmount; // 실패: 전액 손실

  return { profitOrLoss, recommendation, successProbability };
}
```

### 3. 가격 설정 로직

```typescript
// 시작 입찰가: 감정가의 70-85%
const startingBidRate = 0.7 + (Math.abs(seedHash >> 40) % 15) / 100;
const startingBid = Math.floor(appraisedValue * startingBidRate);

// 시장가: 감정가의 85-120%
const marketPriceRate = 0.85 + (Math.abs(seedHash >> 48) % 35) / 100;
const marketPrice = Math.floor(appraisedValue * marketPriceRate);
```

이 로직을 통해 현실적인 경매 가격 구조를 시뮬레이션합니다.

## 스타일링 시스템

### Tailwind CSS 커스터마이징

- **커스텀 컬러 팔레트**: primary, success, danger, warning
- **커스텀 애니메이션**: fadeIn, slideUp, bounceGentle
- **컴포넌트 클래스**: 재사용 가능한 스타일 컴포넌트

### 반응형 디자인

- **모바일 우선**: 기본적으로 모바일 화면에 최적화
- **그리드 시스템**: CSS Grid를 활용한 유연한 레이아웃
- **브레이크포인트**: sm, md, lg, xl 표준 브레이크포인트 사용

## 로깅 시스템

프로젝트 전반에 걸쳐 상세한 로깅이 구현되어 있습니다. 모든 로깅은 이모지를 활용하여 가독성을 높였습니다.

### 프론트엔드 로깅 (app/page.tsx)

```typescript
console.log(`🔍 경매 데이터 로드 시작 - 페이지: ${page}`);
console.log("✅ API 응답 받음:", result);
console.log(
  `📦 페이지 ${page}/${totalPages}: ${result.data.length}개의 경매 매물을 로드했습니다`
);
console.error("❌ 경매 데이터 로드 실패:", error);
console.log("🎯 입찰 모달 열기:", item.title);
console.log("💰 입찰 처리 시작:", { item, bidAmount });
console.log("📊 상세 리포트 보기 클릭");
console.log("👤 사용자 정보 수집 완료:", userInfo);
```

### 백엔드 로깅 (API Routes)

**경매 목록 API** (`/api/auctions/route.ts`):

```typescript
console.log("🔍 경매 목록 조회 요청 시작");
console.log(`📄 페이지: ${page}, 제한: ${limit}`);
console.log(
  `✅ 페이지 ${page}/${totalPages}: ${paginatedItems.length}개의 매물을 반환했습니다`
);
console.error("❌ 경매 목록 조회 중 오류 발생:", error);
```

**입찰 처리 API** (`/api/auctions/[id]/bid/route.ts`):

```typescript
console.log(`🎯 입찰 처리 시작 - 매물 ID: ${auctionItemId}`);
console.log(`💰 입찰가: ${bidAmount}원`);
console.log(
  `📦 매물 정보: ${auctionItem.title}, 감정가: ${auctionItem.appraisedValue}원`
);
console.log(`🧮 시뮬레이션 계산 시작`);
console.log(`📊 시뮬레이션 결과:`, simulationResult);
console.log(`💰 최종 수익/손실: ${simulationResult.profitOrLoss}원`);
```

**사용자 정보 수집 API** (`/api/collect-user-info/route.ts`):

```typescript
console.log("📝 사용자 정보 수집 API 호출");
console.log("📊 구글 시트에 데이터 추가:", {
  name,
  email,
  propertyTitle,
  timestamp,
});
console.log("✅ 구글 시트 데이터 추가 성공");
console.error("❌ 구글 시트 연동 오류:", error);
```

### 로깅 아이콘 가이드

- 🔍 조회/검색 시작
- ✅ 성공
- ❌ 실패/오류
- 📦 데이터 로딩
- 💰 금액 관련
- 🎯 입찰 관련
- 📊 통계/결과
- 👤 사용자 정보
- 📄 페이지네이션
- 🧮 계산 프로세스
- 📝 데이터 입력/수집

## 개발 환경 설정

### 필수 요구사항

- **Node.js** 18.0.0 이상
- **pnpm** 패키지 매니저

### 환경 변수 설정

프로젝트 루트에 `.env` 파일을 생성하고 다음 변수를 설정하세요:

```env
# Google Sheets API (사용자 정보 수집용)
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEETS_CLIENT_EMAIL="your-service-account@project-id.iam.gserviceaccount.com"
GOOGLE_SHEET_ID="your-google-sheet-id"

# 데이터베이스 (선택사항 - 현재는 시드 기반 메모리 데이터 사용)
DATABASE_URL="file:./prisma/dev.db"
```

### 설치 및 실행

```bash
# 1. 의존성 설치
pnpm install

# 2. Prisma 클라이언트 생성 (자동으로 postinstall에서 실행됨)
pnpm run db:generate

# 3. 개발 서버 실행 (http://localhost:3000)
pnpm run dev
```

### 사용 가능한 스크립트

| 명령어                 | 설명                                  |
| ---------------------- | ------------------------------------- |
| `pnpm run dev`         | 개발 서버 실행 (포트 3000)            |
| `pnpm run build`       | 프로덕션 빌드                         |
| `pnpm run start`       | 프로덕션 서버 실행                    |
| `pnpm run lint`        | Next.js ESLint 실행                   |
| `pnpm run db:generate` | Prisma 클라이언트 생성                |
| `pnpm run db:push`     | 데이터베이스 스키마 푸시              |
| `pnpm run db:seed`     | 시드 데이터 삽입                      |
| `pnpm run db:studio`   | Prisma Studio 실행 (데이터베이스 GUI) |

### Google Sheets 연동 설정

1. **Google Cloud Console에서 프로젝트 생성**
2. **Google Sheets API 활성화**
3. **서비스 계정 생성 및 키 다운로드**
4. **Google Sheet 생성 후 서비스 계정과 공유**
5. **환경 변수에 인증 정보 설정**

자세한 가이드는 [Google Sheets API 문서](https://developers.google.com/sheets/api/guides/authorizing)를 참조하세요.

## 컴포넌트 구조

### 1. AuctionCard.tsx

경매 매물을 카드 형식으로 표시하는 컴포넌트

**주요 기능**:

- 매물 이미지, 제목, 가격 정보 표시
- 위험도 배지 표시 (색상 코딩)
- 입찰하기, 상세보기 버튼
- 로딩 상태 처리

### 2. BidInputModal.tsx

입찰가를 입력받는 모달 컴포넌트

**주요 기능**:

- 시작가 기준 입찰가 입력
- 빠른 입찰가 설정 버튼 (+10%, +20%, +50%)
- 실시간 입력 검증
- 최소/최대 입찰가 안내

### 3. PropertyDetailReport.tsx

매물의 권리분석 리포트를 표시하는 컴포넌트

**주요 기능**:

- 등기부등본 기반 권리 분석
- 가격 분석 차트
- 위험도 평가
- 투자 권고사항
- 인쇄 기능

### 4. ResultCard.tsx

입찰 결과를 표시하는 모달 컴포넌트

**주요 기능**:

- 입찰 성공/실패 표시
- 손익 계산 결과
- 추천사항 및 피드백
- 상세 리포트 보기 버튼

### 5. UserInfoModal.tsx

사용자 정보를 수집하는 모달 컴포넌트

**주요 기능**:

- 이름, 이메일 입력 폼
- 실시간 유효성 검증
- 이메일 형식 검증
- Google Sheets 연동 준비

## 주요 페이지

### 메인 페이지 (app/page.tsx)

**기능**:

1. **히어로 섹션**: 서비스 소개 및 주요 기능 안내
2. **매물 목록 그리드**: 6개씩 페이지네이션
3. **페이지네이션 컨트롤**: 이전/다음, 페이지 번호
4. **입찰 플로우**: 매물 선택 → 입찰 → 결과 → 리포트
5. **에러 핸들링**: 네트워크 오류 처리 및 새로고침

**상태 관리**:

- `auctionItems`: 경매 매물 목록
- `loading`: 로딩 상태
- `error`: 에러 메시지
- `showBidModal`: 입찰 모달 표시 여부
- `showResult`: 결과 모달 표시 여부
- `showDetailReport`: 상세 리포트 표시 여부
- `showUserInfoModal`: 사용자 정보 모달 표시 여부
- `currentPage`, `totalPages`: 페이지네이션 상태

## 향후 개선 계획

### 단기 계획 (1-3개월)

1. **사용자 인증 시스템**

   - 소셜 로그인 (Google, Kakao, Naver)
   - 회원가입 및 프로필 관리
   - JWT 기반 인증

2. **실제 데이터베이스 연동**

   - PostgreSQL 또는 MySQL 마이그레이션
   - 매물 데이터 영구 저장
   - 사용자 입찰 기록 저장

3. **입찰 히스토리**

   - 사용자별 입찰 기록 관리
   - 입찰 통계 및 분석
   - 즐겨찾기 기능

4. **통계 대시보드**
   - 투자 성과 분석
   - 승률, 평균 수익률 계산
   - 차트 및 그래프 시각화

### 장기 계획 (6개월~1년)

1. **실시간 경매**

   - WebSocket을 활용한 실시간 입찰
   - 다중 사용자 동시 입찰
   - 실시간 경쟁 시스템

2. **AI 추천 시스템**

   - 머신러닝 기반 매물 추천
   - 사용자 투자 성향 분석
   - 최적 입찰가 제안

3. **소셜 기능**

   - 사용자 간 경쟁 및 랭킹 시스템
   - 투자 전략 공유 커뮤니티
   - 멘토링 시스템

4. **모바일 앱**

   - React Native 기반 모바일 애플리케이션
   - 푸시 알림 기능
   - 오프라인 모드 지원

5. **교육 콘텐츠**
   - 부동산 경매 교육 강의
   - 퀴즈 및 학습 자료
   - 전문가 칼럼

## 기술적 고려사항

### 성능 최적화

- 이미지 최적화 (Next.js Image 컴포넌트)
- 코드 스플리팅
- 서버 사이드 렌더링 (SSR)
- 정적 생성 (SSG) 활용

### 보안

- HTTPS 적용
- API 요청 rate limiting
- SQL Injection 방지 (Prisma ORM)
- XSS 공격 방지
- CSRF 토큰 사용

### 확장성

- 마이크로서비스 아키텍처 고려
- CDN 활용
- 캐싱 전략 수립
- 로드 밸런싱

## 라이선스

MIT License - 자유롭게 사용, 수정, 배포 가능

## 기여 방법

프로젝트에 기여하고 싶으시다면:

1. 프로젝트를 Fork 합니다
2. Feature 브랜치를 생성합니다 (`git checkout -b feature/AmazingFeature`)
3. 변경사항을 커밋합니다 (`git commit -m 'Add some AmazingFeature'`)
4. 브랜치에 Push 합니다 (`git push origin feature/AmazingFeature`)
5. Pull Request를 생성합니다

## 문의 및 지원

프로젝트에 대한 문의사항이나 버그 리포트는 GitHub Issues를 통해 제출해주세요.

---

**Bid Master**는 부동산 투자 교육을 위한 혁신적인 플랫폼으로, 실제 경매 상황을 안전하게 시뮬레이션하며 투자 전략을 학습할 수 있는 환경을 제공합니다.

**프로젝트 상태**: 개발 중 (MVP 완료)  
**최종 업데이트**: 2024년 1월  
**버전**: 1.0.0
