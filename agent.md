# Bid Master - 부동산 경매 시뮬레이션 플랫폼

## 프로젝트 개요

**Bid Master**는 실제 부동산 경매 상황을 시뮬레이션하며 입찰 전략을 학습할 수 있는 웹 플랫폼입니다. 사용자는 다양한 위험도와 가격대의 부동산에 대해 입찰을 연습하고, 투자 전략을 수립할 수 있습니다.

실제 부동산 경매 데이터를 기반으로 한 시뮬레이션을 통해 안전하게 경매 투자 경험을 쌓을 수 있으며, 권리분석 리포트를 통해 전문적인 분석 능력을 키울 수 있습니다.

### 🆕 2.0 버전 주요 추가 기능

- **🤖 AI 시나리오 생성 엔진**: 무한히 다양한 경매 물건 자동 생성
- **🛠️ 개발자 모드**: 디버그 도구 및 무제한 생성 기능
- **📧 이메일 연동**: Gmail API를 통한 사용자 알림 시스템
- **📊 사용량 관리**: Google Sheets 기반 주간 사용량 추적
- **🔧 Chrome DevTools MCP**: AI 도우미를 통한 자동화된 웹 테스트 및 디버깅
- **📋 상세 매물 분석**: 등기부등본, 현황조사서, 권리관계 등 전문 분석 리포트

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

### 외부 API & 서비스

- **Google Sheets API** - 사용자 정보 수집 및 사용량 관리
- **Gmail API** - 이메일 전송
- **googleapis** - Google API 클라이언트 라이브러리
- **nodemailer** - 이메일 전송 라이브러리

### UI 라이브러리

- **lucide-react** - 아이콘 라이브러리
- **React Icons** - 추가 아이콘 세트

### 개발 도구

- **pnpm** - 패키지 매니저
- **tsx** - TypeScript 실행기
- **Autoprefixer** - CSS 벤더 프리픽스 자동 추가
- **Chrome DevTools MCP** - AI 도우미를 통한 자동화된 웹 테스트 및 디버깅

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
│   │   ├── ai-scenarios/        # AI 시나리오 생성 API
│   │   │   ├── generate/        # 시나리오 생성 엔드포인트
│   │   │   │   └── route.ts
│   │   │   └── usage/           # 사용량 조회 엔드포인트
│   │   │       └── route.ts
│   │   ├── collect-user-info/   # 사용자 정보 수집 API
│   │   │   └── route.ts         # Google Sheets 연동
│   │   ├── send-email/          # 이메일 전송 API
│   │   │   └── route.ts         # Gmail API 연동
│   │   ├── sheets/              # Google Sheets API
│   │   │   ├── append/          # 데이터 추가
│   │   │   │   └── route.ts
│   │   │   └── read/            # 데이터 읽기
│   │   │       └── route.ts
│   │   ├── seed/                # 시드 데이터 API
│   │   │   └── route.ts
│   │   └── README.md            # API 문서
│   ├── globals.css              # 전역 스타일
│   ├── layout.tsx               # 루트 레이아웃
│   └── page.tsx                 # 메인 페이지 (경매 목록 + 입찰)
├── components/                   # React 컴포넌트
│   ├── AuctionCard.tsx          # 경매 매물 카드
│   ├── AuctionScenarioGenerator.tsx # AI 시나리오 생성기
│   ├── BidInputModal.tsx        # 입찰가 입력 모달
│   ├── DevModeToggle.tsx        # 개발자 모드 토글 버튼
│   ├── DevPanel.tsx             # 개발자 디버그 패널
│   ├── EmailSendModal.tsx       # 이메일 전송 모달
│   ├── PropertyDetailReport.tsx # 매물 권리분석 리포트
│   ├── ResultCard.tsx           # 입찰 결과 카드
│   ├── UserInfoModal.tsx        # 사용자 정보 수집 모달
│   └── property/                # 매물 상세 분석 컴포넌트
│       ├── OverviewSection.tsx  # 기본 개요 섹션
│       ├── RightsSection.tsx    # 권리관계 섹션
│       ├── ScheduleSection.tsx  # 일정 섹션
│       └── TenantsSection.tsx   # 임차/점유 섹션
├── lib/                         # 유틸리티 라이브러리
│   ├── dateUtils.ts             # 날짜 처리 유틸리티
│   ├── DevModeContext.tsx       # 개발자 모드 Context
│   ├── scenarioGenerator.ts     # AI 시나리오 생성 로직
│   └── userStorage.ts           # 사용자 ID 저장소
├── docs/                        # 문서
│   ├── CHROME_DEVTOOLS_MCP_SETUP.md # Chrome DevTools MCP 설정 가이드
│   ├── DEV_MODE_GUIDE.md        # 개발자 모드 가이드
│   ├── EMAIL_USAGE_EXAMPLES.md  # 이메일 사용 예시
│   ├── GMAIL_API_SETUP.md       # Gmail API 설정 가이드
│   ├── GOOGLE_SHEETS_API_SETUP.md # Google Sheets API 설정
│   ├── GOOGLE_SHEETS_USAGE.md   # Google Sheets 사용 가이드
│   └── USER_INFO_GOOGLE_SHEETS_SETUP.md # 사용자 정보 Google Sheets 설정
├── prisma/                      # 데이터베이스 스키마
│   ├── schema.prisma            # Prisma 스키마 정의
│   ├── dev.db                   # SQLite 데이터베이스
│   └── seed.ts                  # 시드 데이터 생성
├── generated/                   # Prisma 생성 파일
│   └── prisma/
├── scripts/                     # 유틸리티 스크립트
│   └── setup-chrome-devtools-mcp.js # Chrome DevTools MCP 설정 스크립트
├── examples/                    # 사용 예시
│   ├── send-email-test.ts       # 이메일 전송 테스트
│   └── user-info-test.ts        # 사용자 정보 테스트
├── mcp-config.json             # MCP 서버 설정
├── google-sheets-mcp-server.py # Google Sheets MCP 서버
├── agent.md                     # 프로젝트 문서 (본 파일)
└── package.json                 # 프로젝트 설정
```

## 주요 기능

### 1. 🤖 AI 경매 시나리오 생성 엔진 (신규 기능)

- **무한 시나리오 생성**: AI가 실전 같은 경매 물건을 자동 생성
- **맞춤형 학습**: 물건 유형, 난이도, 학습 목표, 자본 규모 선택 가능
- **실제 서류 재현**:
  - 등기부등본 (갑구/을구)
  - 현황조사서 (임차인 정보)
  - 매각물건명세서
- **주간 사용 제한**: 일반 사용자 주당 3회 제한 (개발자 모드 무제한)
- **정답 분석 제공**:
  - 말소기준권리 파악
  - 말소/인수 권리 분석
  - 예상 추가 비용 계산
  - 수익 분석 및 핵심 학습 포인트
- **학습 목표별 시나리오**:
  - 대항력 이해
  - 말소기준권리
  - 배당분석
  - 선순위 임차인
  - 종합 분석

### 2. 경매 매물 조회

- **페이지네이션 지원**: 6개씩 매물을 표시하며 페이지별로 탐색 가능
- **총 20개의 다양한 매물**: 시드 기반 일관된 매물 데이터 생성
- **다양한 매물 유형**: 아파트, 오피스텔, 빌라, 상가, 단독주택, 원룸
- **실제적인 매물 데이터**: 서울시 13개 구별 현실적인 매물명과 가격대
  - 강남구, 서초구, 송파구, 마포구, 용산구, 성동구, 영등포구
  - 강동구, 노원구, 종로구, 중구, 강서구, 동작구
- **위험도 분류**: LOW, MEDIUM, HIGH, VERY_HIGH 4단계 위험도 시스템
- **새로고침 기능**: 매물 목록을 수동으로 갱신 가능

### 3. 입찰 시뮬레이션

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

### 4. 매물 상세 분석 (권리분석 리포트)

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

### 5. 🛠️ 개발자 모드 (신규 기능)

- **개발 환경 전용**: NODE_ENV=development에서만 활성화
- **플로팅 토글 버튼**: 우측 하단에서 쉽게 전환 가능
- **디버그 패널**: 실시간 API 응답, 상태 정보 표시
- **localStorage 기반**: 새로고침 후에도 상태 유지
- **AI 시나리오 무제한**: 개발자 모드 시 주간 제한 없음
- **정답 전체 공개**: AI 시나리오의 상세 정답 분석 확인 가능
- **상세 로깅**: 모든 동작에 대한 콘솔 로그 출력

### 6. 📧 이메일 전송 기능 (신규 기능)

- **Gmail API 연동**: 사용자에게 직접 이메일 전송
- **정식 출시 알림**: 신규 기능 출시 시 사용자에게 알림
- **사용자 정보 수집**: 이름, 이메일 입력 폼
- **실시간 유효성 검증**: 이메일 형식 검증
- **성공/실패 피드백**: 친화적인 메시지 표시

### 7. 🔧 Chrome DevTools MCP (신규 기능)

- **자동화된 웹 테스트**: AI 도우미를 통한 자동화된 웹사이트 테스트
- **실시간 디버깅**: 브라우저 환경에서 실시간 에러 확인 및 디버깅
- **성능 분석**: 페이지 로딩 시간, 네트워크 요청, 콘솔 로그 모니터링
- **스크린샷 촬영**: 웹페이지 상태를 이미지로 캡처하여 시각적 확인
- **DOM 조작**: 요소 클릭, 텍스트 입력 등 사용자 상호작용 시뮬레이션
- **반응형 테스트**: 다양한 화면 크기에서의 레이아웃 테스트
- **에러 추적**: JavaScript 에러 및 네트워크 오류 실시간 모니터링

### 8. 📋 상세 매물 분석 (신규 기능)

- **등기부등본 분석**: 갑구/을구 기반 권리관계 상세 분석
- **현황조사서**: 임차인 정보 및 점유 현황 분석
- **권리관계 시각화**: 말소기준권리, 인수권리 등 권리 구조 표시
- **일정 관리**: 경매 일정, 입찰 마감일 등 중요 일정 추적
- **임차/점유 분석**: 대항력, 우선변제권 등 임차인 권리 분석
- **투자 위험도 평가**: 종합적인 위험도 분석 및 투자 권고사항

### 9. 사용자 경험

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

### 경매 관련 API

#### GET /api/auctions

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

#### POST /api/auctions/[id]/bid

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

### AI 시나리오 생성 API

#### POST /api/ai-scenarios/generate

AI가 실전 같은 경매 시나리오를 생성합니다.

**요청 본문**:

```json
{
  "userId": "user_xxxxx",
  "params": {
    "propertyType": "apartment",
    "difficulty": "medium",
    "learningGoal": "daehanglyek",
    "capital": "under100"
  },
  "isDevMode": false
}
```

**응답 예시**:

```json
{
  "success": true,
  "data": {
    "caseId": "case_2024_001",
    "propertyInfo": {
      "type": "아파트",
      "address": "서울특별시 강남구 논현동 123-45",
      "area": "전용 84.5㎡",
      "appraisalValue": 850000000,
      "minimumBid": 680000000
    },
    "documents": {
      "registry": { "gapgu": [...], "eulgoo": [...] },
      "statusReport": { "occupancy": "...", "tenants": [...] }
    },
    "correctAnswer": {
      "malsoGijun": "...",
      "malsoRights": [...],
      "insuRights": [...],
      "expectedCost": 50000000,
      "profitAnalysis": "...",
      "keyLearning": "..."
    }
  },
  "usage": {
    "current": 2,
    "limit": 3,
    "remaining": 1
  }
}
```

#### GET /api/ai-scenarios/usage

사용자의 주간 시나리오 생성 사용량을 조회합니다.

**파라미터**:

- `userId`: 사용자 ID
- `isDevMode`: 개발자 모드 여부 (true/false)

**응답 예시**:

```json
{
  "success": true,
  "data": {
    "usageCount": 2,
    "limit": 3,
    "remaining": 1,
    "weekStart": "2024-10-20T00:00:00.000Z"
  }
}
```

### 사용자 정보 수집 API

#### POST /api/collect-user-info

사용자 정보를 수집하고 Google Sheets에 저장합니다.

**요청 본문**:

```json
{
  "name": "홍길동",
  "email": "hong@example.com",
  "propertyTitle": "강남구 래미안 101동 513호",
  "purpose": "ai_scenario_detail_report",
  "metadata": {
    "caseId": "case_2024_001",
    "propertyType": "apartment",
    "difficulty": "medium"
  }
}
```

**응답 예시**:

```json
{
  "success": true,
  "message": "정상 처리되었습니다. 정식출시가 되면 알려 드리겠습니다."
}
```

### 이메일 전송 API

#### POST /api/send-email

Gmail API를 통해 이메일을 전송합니다.

**요청 본문**:

```json
{
  "to": "user@example.com",
  "subject": "경매 시뮬레이션 결과",
  "text": "이메일 본문 내용",
  "html": "<p>HTML 형식 내용</p>"
}
```

**응답 예시**:

```json
{
  "success": true,
  "messageId": "message_xxxxx",
  "message": "이메일이 성공적으로 전송되었습니다"
}
```

### Google Sheets API

#### POST /api/sheets/append

Google Sheets에 데이터를 추가합니다.

**요청 본문**:

```json
{
  "values": [["홍길동", "hong@example.com", "강남구 래미안", "2024-10-24"]]
}
```

**응답 예시**:

```json
{
  "success": true,
  "updatedRange": "Sheet1!A2:D2",
  "updatedRows": 1
}
```

#### GET /api/sheets/read

Google Sheets에서 데이터를 읽습니다.

**파라미터**:

- `range`: 읽을 범위 (예: "Sheet1!A1:D10")

**응답 예시**:

```json
{
  "success": true,
  "data": [
    ["이름", "이메일", "매물", "날짜"],
    ["홍길동", "hong@example.com", "강남구 래미안", "2024-10-24"]
  ]
}
```

### 필수 환경 변수

```env
# Google Sheets API
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEETS_CLIENT_EMAIL="your-service-account@project-id.iam.gserviceaccount.com"
GOOGLE_SHEET_ID="your-google-sheet-id"

# Gmail API
GMAIL_USER="your-email@gmail.com"
GMAIL_CLIENT_ID="your-client-id.apps.googleusercontent.com"
GMAIL_CLIENT_SECRET="your-client-secret"
GMAIL_REFRESH_TOKEN="your-refresh-token"
```

## 핵심 알고리즘

### 1. AI 시나리오 생성 알고리즘

`lib/scenarioGenerator.ts`에 구현된 AI 시나리오 생성 엔진은 템플릿과 알고리즘을 기반으로 무한히 다양한 경매 시나리오를 생성합니다.

**생성 과정**:

```typescript
// 1. 시드 생성 (사용자ID + 타임스탬프 기반)
const seed = `${userId}_${timestamp}_${JSON.stringify(params)}`;

// 2. 물건 정보 생성
const propertyInfo = generatePropertyInfo(params, seed);

// 3. 등기부등본 생성 (갑구/을구)
const registry = generateRegistry(params, seed);

// 4. 현황조사서 생성 (임차인 정보)
const statusReport = generateStatusReport(params, seed);

// 5. 정답 분석 생성
const correctAnswer = calculateCorrectAnswer(registry, statusReport);
```

**주요 특징**:

- **물건 유형별 템플릿**: 아파트, 빌라, 상가, 토지별 특화된 시나리오
- **난이도 조절**: 초급, 중급, 고급에 따라 권리관계 복잡도 조정
- **학습 목표 반영**: 대항력, 말소, 배당, 선순위 등 특정 학습 목표에 맞춤
- **자본 규모 고려**: 1억 미만, 3억 미만, 3억 이상 가격대 조정
- **실제 데이터 기반**: 실제 부동산 가격, 지역명, 법원명 사용
- **정답 자동 계산**: 말소기준권리, 인수권리, 예상비용 자동 산출

### 2. 매물 데이터 생성 (시드 기반)

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

### 3. 시뮬레이션 결과 계산

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

### 4. 가격 설정 로직

```typescript
// 시작 입찰가: 감정가의 70-85%
const startingBidRate = 0.7 + (Math.abs(seedHash >> 40) % 15) / 100;
const startingBid = Math.floor(appraisedValue * startingBidRate);

// 시장가: 감정가의 85-120%
const marketPriceRate = 0.85 + (Math.abs(seedHash >> 48) % 35) / 100;
const marketPrice = Math.floor(appraisedValue * marketPriceRate);
```

이 로직을 통해 현실적인 경매 가격 구조를 시뮬레이션합니다.

### 5. 주간 사용량 관리

AI 시나리오 생성은 주간 사용량 제한이 있으며, Google Sheets에 저장됩니다:

```typescript
// 사용량 확인
const usage = await getWeeklyUsage(userId);
const limit = isDevMode ? 9999 : 3; // 개발자 모드는 무제한

if (usage >= limit) {
  return { error: "주간 사용 횟수를 초과했습니다" };
}

// 사용량 증가
await incrementUsage(userId);
```

**특징**:

- 일반 사용자: 주당 3회 제한
- 개발자 모드: 무제한 생성
- 매주 일요일 00:00 자동 초기화
- Google Sheets에 사용 기록 저장

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
# Google Sheets API (사용자 정보 수집 및 사용량 관리)
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEETS_CLIENT_EMAIL="your-service-account@project-id.iam.gserviceaccount.com"
GOOGLE_SHEET_ID="your-google-sheet-id"

# Gmail API (이메일 전송용)
GMAIL_USER="your-email@gmail.com"
GMAIL_CLIENT_ID="your-client-id.apps.googleusercontent.com"
GMAIL_CLIENT_SECRET="your-client-secret"
GMAIL_REFRESH_TOKEN="your-refresh-token"

# 데이터베이스 (선택사항 - 현재는 시드 기반 메모리 데이터 사용)
DATABASE_URL="file:./prisma/dev.db"

# 개발 모드 (development/production)
NODE_ENV="development"
```

### Gmail API 설정

Gmail API를 사용하려면 다음 단계를 따르세요:

1. [Google Cloud Console](https://console.cloud.google.com/)에서 프로젝트 생성
2. Gmail API 활성화
3. OAuth 2.0 클라이언트 ID 생성
4. Refresh Token 발급
5. 환경 변수에 인증 정보 설정

자세한 가이드는 `docs/GMAIL_API_SETUP.md`를 참조하세요.

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
| `pnpm run mcp:setup`   | Chrome DevTools MCP 설정              |
| `pnpm run mcp:start`   | Chrome DevTools MCP 서버 시작         |

### Google Sheets 연동 설정

1. **Google Cloud Console에서 프로젝트 생성**
2. **Google Sheets API 활성화**
3. **서비스 계정 생성 및 키 다운로드**
4. **Google Sheet 생성 후 서비스 계정과 공유**
5. **환경 변수에 인증 정보 설정**

자세한 가이드는 [Google Sheets API 문서](https://developers.google.com/sheets/api/guides/authorizing)를 참조하세요.

### Chrome DevTools MCP 설정

Chrome DevTools MCP를 사용하여 AI 도우미와 함께 자동화된 웹 테스트를 수행할 수 있습니다.

#### 자동 설정 (권장)

```bash
# 프로젝트 루트에서 실행
pnpm run mcp:setup
```

#### 수동 설정

1. **Chrome을 디버깅 모드로 시작**:

   ```bash
   # Windows
   "C:\Program Files\Google\Chrome\Application\chrome.exe" --remote-debugging-port=9222 --disable-web-security --user-data-dir=./chrome-debug-profile

   # macOS
   /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --remote-debugging-port=9222 --disable-web-security --user-data-dir=./chrome-debug-profile
   ```

2. **MCP 서버 시작**:
   ```bash
   pnpm run mcp:start
   ```

자세한 가이드는 `docs/CHROME_DEVTOOLS_MCP_SETUP.md`를 참조하세요.

## 컴포넌트 구조

### 1. AuctionCard.tsx

경매 매물을 카드 형식으로 표시하는 컴포넌트

**주요 기능**:

- 매물 이미지, 제목, 가격 정보 표시
- 위험도 배지 표시 (색상 코딩)
- 입찰하기, 상세보기 버튼
- 로딩 상태 처리

### 2. AuctionScenarioGenerator.tsx (신규)

AI 경매 시나리오 생성기 컴포넌트

**주요 기능**:

- 물건 유형, 난이도, 학습 목표, 자본 규모 선택
- 시나리오 생성 요청 및 결과 표시
- 등기부등본, 현황조사서 표시
- 정답 분석 제공 (개발자 모드에서 전체 공개)
- 주간 사용량 표시 및 제한 관리
- 상세 리포트 신청 기능

### 3. BidInputModal.tsx

입찰가를 입력받는 모달 컴포넌트

**주요 기능**:

- 시작가 기준 입찰가 입력
- 빠른 입찰가 설정 버튼 (+10%, +20%, +50%)
- 실시간 입력 검증
- 최소/최대 입찰가 안내

### 4. DevModeToggle.tsx (신규)

개발자 모드 토글 버튼 컴포넌트

**주요 기능**:

- 우측 하단 플로팅 버튼
- 개발자 모드 전환 (🛠️ DEV / 👤 USER)
- 활성화 시 상단 배지 표시
- 개발 환경에서만 렌더링
- localStorage 기반 상태 유지

### 5. DevPanel.tsx (신규)

개발자 디버그 패널 컴포넌트

**주요 기능**:

- 접고 펼칠 수 있는 디버그 패널
- API 응답 데이터 표시
- JSON 형식으로 데이터 시각화
- 컴포넌트 상태 정보 표시
- 개발자 모드에서만 표시

### 6. EmailSendModal.tsx (신규)

이메일 전송 모달 컴포넌트

**주요 기능**:

- 이메일 주소, 제목, 내용 입력
- 정식 출시 알림 신청 모드 지원
- 실시간 유효성 검증
- Gmail API 연동
- 성공/실패 피드백 표시

### 7. PropertyDetailReport.tsx

매물의 권리분석 리포트를 표시하는 컴포넌트

**주요 기능**:

- 등기부등본 기반 권리 분석
- 가격 분석 차트
- 위험도 평가
- 투자 권고사항
- 인쇄 기능

### 8. ResultCard.tsx

입찰 결과를 표시하는 모달 컴포넌트

**주요 기능**:

- 입찰 성공/실패 표시
- 손익 계산 결과
- 추천사항 및 피드백
- 상세 리포트 보기 버튼

### 9. UserInfoModal.tsx

사용자 정보를 수집하는 모달 컴포넌트

**주요 기능**:

- 이름, 이메일 입력 폼
- 실시간 유효성 검증
- 이메일 형식 검증
- Google Sheets 연동
- 다양한 목적 지원 (리포트 조회, 알림 신청 등)

### 10. Property 분석 컴포넌트들

#### OverviewSection.tsx

매물의 기본 개요 정보를 표시하는 컴포넌트

**주요 기능**:

- 매물명, 사건번호, 주소, 용도/종별 표시
- 가격 정보 (시작가, 감정가, 시장가) 시각화
- 위험도 배지 및 색상 코딩

#### RightsSection.tsx

권리관계를 상세히 분석하는 컴포넌트

**주요 기능**:

- 권리 순위별 정렬 및 표시
- 말소기준권리 하이라이트
- 설정일, 채권액, 권리자 정보 표시
- 권리 유형별 분류 및 시각화

#### TenantsSection.tsx

임차인 및 점유 현황을 분석하는 컴포넌트

**주요 기능**:

- 임차인 유형별 분류 (임차인, 점유자 등)
- 대항력, 우선변제권 표시
- 보증금, 월세, 전입일 정보
- 점유 현황 및 확정일자 표시

#### ScheduleSection.tsx

경매 일정 및 중요 날짜를 관리하는 컴포넌트

**주요 기능**:

- 경매 일정 표시
- 입찰 마감일 알림
- 중요 절차별 일정 관리
- 일정별 메모 및 참고사항

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

1. **AI 시나리오 고도화** ✅ 완료

   - AI 경매 시나리오 생성 엔진 구축 ✅
   - 등기부등본, 현황조사서 자동 생성 ✅
   - 정답 분석 및 학습 포인트 제공 ✅
   - 주간 사용량 관리 시스템 ✅

2. **개발자 도구 구축** ✅ 완료

   - 개발자 모드 시스템 ✅
   - 디버그 패널 및 로깅 ✅
   - 무제한 시나리오 생성 (개발 환경) ✅

3. **사용자 인증 시스템** (진행 예정)

   - 소셜 로그인 (Google, Kakao, Naver)
   - 회원가입 및 프로필 관리
   - JWT 기반 인증

4. **실제 데이터베이스 연동**

   - PostgreSQL 또는 MySQL 마이그레이션
   - 매물 데이터 영구 저장
   - 사용자 입찰 기록 저장

5. **입찰 히스토리**

   - 사용자별 입찰 기록 관리
   - 입찰 통계 및 분석
   - 즐겨찾기 기능

6. **통계 대시보드**
   - 투자 성과 분석
   - 승률, 평균 수익률 계산
   - 차트 및 그래프 시각화

### 중기 계획 (3-6개월)

1. **AI 시나리오 고급 기능**

   - 실제 법원 경매 데이터 연동
   - 시나리오 난이도 자동 조정
   - 사용자별 맞춤 시나리오 추천
   - 오답 분석 및 학습 가이드

2. **상세 리포트 자동 생성**

   - 매물별 상세 권리분석 리포트
   - PDF 다운로드 기능
   - 이메일 자동 발송
   - 인쇄 최적화

3. **커뮤니티 기능**
   - 시나리오 공유 게시판
   - 사용자 간 토론 기능
   - 전문가 Q&A

### 장기 계획 (6개월~1년)

1. **실시간 경매**

   - WebSocket을 활용한 실시간 입찰
   - 다중 사용자 동시 입찰
   - 실시간 경쟁 시스템

2. **AI 추천 시스템**

   - 머신러닝 기반 매물 추천
   - 사용자 투자 성향 분석
   - 최적 입찰가 제안
   - GPT 기반 상담 챗봇

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
   - 동영상 강의 플랫폼

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

## 📚 문서

프로젝트에는 다양한 기능에 대한 상세한 가이드 문서가 포함되어 있습니다:

### 개발자 모드

- **`docs/DEV_MODE_GUIDE.md`**: 개발자 모드 사용 가이드
  - DevModeContext, DevModeToggle, DevPanel 사용법
  - 커스터마이징 방법
  - 활용 예시

### Google APIs

- **`docs/GMAIL_API_SETUP.md`**: Gmail API 설정 가이드

  - Google Cloud Console 설정
  - OAuth 2.0 인증
  - Refresh Token 발급 방법

- **`docs/EMAIL_USAGE_EXAMPLES.md`**: 이메일 전송 사용 예시

  - 텍스트 이메일
  - HTML 이메일
  - 첨부파일 전송

- **`docs/GOOGLE_SHEETS_API_SETUP.md`**: Google Sheets API 설정

  - Service Account 생성
  - 권한 설정
  - 환경 변수 설정

- **`docs/GOOGLE_SHEETS_USAGE.md`**: Google Sheets 사용 가이드

  - 데이터 읽기/쓰기
  - 사용량 관리
  - 에러 처리

- **`docs/USER_INFO_GOOGLE_SHEETS_SETUP.md`**: 사용자 정보 Google Sheets 설정
  - 사용자 정보 수집 시트 설정
  - 데이터 구조 및 필드 매핑
  - 자동화된 데이터 관리

### Chrome DevTools MCP

- **`docs/CHROME_DEVTOOLS_MCP_SETUP.md`**: Chrome DevTools MCP 설정 가이드
  - MCP 서버 설치 및 설정
  - Chrome 디버깅 모드 설정
  - 자동화된 웹 테스트 활용법
  - 성능 분석 및 디버깅 방법

### API 문서

- **`app/api/README.md`**: API 엔드포인트 문서
  - 경매 API
  - AI 시나리오 API
  - 사용자 정보 수집 API

## 문의 및 지원

프로젝트에 대한 문의사항이나 버그 리포트는 GitHub Issues를 통해 제출해주세요.

---

**Bid Master**는 부동산 투자 교육을 위한 혁신적인 플랫폼으로, 실제 경매 상황을 안전하게 시뮬레이션하며 투자 전략을 학습할 수 있는 환경을 제공합니다.

AI 시나리오 생성 엔진을 통해 무한히 다양한 학습 콘텐츠를 제공하며, 개발자 도구를 통해 편리한 개발 경험을 지원합니다.

**프로젝트 상태**: 개발 중 (MVP 완료 + AI 시나리오 생성 + Chrome DevTools MCP + 상세 매물 분석 기능 추가)  
**최종 업데이트**: 2025년 1월  
**버전**: 2.1.0
