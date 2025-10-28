# 개발자 모드 사용 가이드

## 📖 개요

개발자 모드는 **개발 서버에서만** 사용할 수 있는 특별한 기능입니다. 이 기능을 활성화하면 일반 사용자에게는 보이지 않는 디버그 정보와 개발자 전용 기능을 사용할 수 있습니다.

## 🎯 주요 특징

### 1. 개발 환경 전용

- `NODE_ENV=development`일 때만 활성화됩니다
- 프로덕션 배포 시에는 자동으로 비활성화되어 사용자에게 노출되지 않습니다

### 2. localStorage 기반 상태 유지

- 개발자 모드 설정이 브라우저에 저장되어 새로고침 후에도 유지됩니다
- 개발 중 편리하게 사용할 수 있습니다

### 3. 실시간 디버그 정보

- API 응답 데이터
- 컴포넌트 상태 정보
- 페이지네이션 상태
- 로딩 상태 등

## 🚀 사용 방법

### 1. 개발 서버 실행

```bash
pnpm run dev
```

### 2. 개발자 모드 전환

- 브라우저에서 우측 하단의 **플로팅 버튼**을 클릭합니다
- 🛠️ (DEV) 아이콘: 개발자 모드 활성화
- 👤 (USER) 아이콘: 일반 사용자 모드

### 3. 개발자 정보 확인

개발자 모드가 활성화되면:

- 우측 상단에 **노란색 배지**가 표시됩니다
- 페이지에 **디버그 패널**이 나타납니다
- 콘솔에 상세한 로그가 출력됩니다

## 📦 구성 요소

### 1. DevModeContext (`lib/DevModeContext.tsx`)

전역 개발자 모드 상태를 관리하는 Context입니다.

**제공하는 값:**

- `isDevMode`: 개발자 모드 활성화 여부
- `toggleDevMode`: 개발자 모드 전환 함수
- `isDevelopment`: 개발 환경 여부

**사용 예시:**

```typescript
import { useDevMode } from "../lib/DevModeContext";

function MyComponent() {
  const { isDevMode, toggleDevMode, isDevelopment } = useDevMode();

  return <div>{isDevMode && <div>개발자 전용 정보</div>}</div>;
}
```

### 2. DevModeToggle (`components/DevModeToggle.tsx`)

우측 하단에 표시되는 플로팅 토글 버튼입니다.

**기능:**

- 클릭하여 개발자 모드 전환
- 현재 모드 시각적 표시 (🛠️ 또는 👤)
- 개발자 모드 활성화 시 상단에 배지 표시

### 3. DevPanel (`components/DevPanel.tsx`)

개발자 모드에서 디버그 정보를 표시하는 패널 컴포넌트입니다.

**컴포넌트:**

- `DevPanel`: 접고 펼칠 수 있는 디버그 패널
- `DevInfo`: 간단한 인라인 정보 표시
- `DevLog`: 실시간 로그 표시 (선택사항)

**사용 예시:**

```typescript
import DevPanel, { DevInfo } from "../components/DevPanel";

function MyComponent() {
  const [data, setData] = useState({});

  return (
    <div>
      {/* 디버그 패널 */}
      <DevPanel title="API 응답 데이터" data={data} />

      {/* 인라인 정보 */}
      <DevInfo label="상태" value={loading} />
    </div>
  );
}
```

## 💡 활용 예시

### 1. API 응답 디버깅

```typescript
const loadData = async () => {
  const response = await fetch("/api/data");
  const result = await response.json();

  // 개발자 모드: API 응답 저장
  if (isDevMode) {
    setLastApiResponse(result);
    console.log("🛠️ [DEV] API 응답:", result);
  }
};
```

### 2. 상태 정보 표시

```typescript
{
  isDevMode && (
    <DevPanel
      title="페이지 상태"
      data={{
        loading,
        error,
        itemCount: items.length,
        currentPage,
      }}
    />
  );
}
```

### 3. 인라인 디버그 정보

```typescript
<div className="flex items-center gap-2">
  <h2>제목</h2>
  {isDevMode && (
    <>
      <DevInfo label="로딩" value={loading} />
      <DevInfo label="개수" value={items.length} />
    </>
  )}
</div>
```

## 🔧 커스터마이징

### 1. 새로운 개발자 기능 추가

원하는 컴포넌트에서 `useDevMode` 훅을 사용하세요:

```typescript
import { useDevMode } from "../lib/DevModeContext";

function MyComponent() {
  const { isDevMode } = useDevMode();

  return (
    <div>
      {/* 일반 사용자 UI */}
      <div>일반 콘텐츠</div>

      {/* 개발자 전용 UI */}
      {isDevMode && (
        <div className="bg-yellow-50 p-4 border-2 border-yellow-400">
          개발자 전용 기능
        </div>
      )}
    </div>
  );
}
```

### 2. 개발자 로그 출력

`devLog` 헬퍼 함수를 사용하면 개발 환경에서만 로그가 출력됩니다:

```typescript
import { devLog } from "../lib/DevModeContext";

function handleClick() {
  devLog("버튼 클릭됨", { timestamp: Date.now() });
}
```

## ⚠️ 주의사항

### 1. 프로덕션 배포

- 프로덕션 빌드 시 개발자 모드 관련 코드가 자동으로 제외됩니다
- `process.env.NODE_ENV === 'production'`일 때는 모든 개발자 기능이 비활성화됩니다

### 2. 민감한 정보

- 개발자 모드에서도 **민감한 정보**(API 키, 비밀번호 등)는 절대 표시하지 마세요
- 사용자 개인정보도 마스킹 처리하세요

### 3. 성능

- 대량의 데이터를 DevPanel에 표시할 때는 성능에 주의하세요
- 필요한 정보만 선택적으로 표시하세요

## 🎨 스타일 가이드

개발자 모드 UI는 일관된 디자인을 사용합니다:

- **배경색**: `bg-yellow-50` (연한 노란색)
- **테두리**: `border-yellow-400` (진한 노란색)
- **텍스트**: `text-yellow-900` (매우 진한 노란색)
- **강조색**: `bg-yellow-500` (중간 노란색)
- **이모지**: 🛠️ (렌치, 개발자 도구)

## 📚 추가 리소스

- React Context API: https://react.dev/reference/react/useContext
- Next.js 환경 변수: https://nextjs.org/docs/app/building-your-application/configuring/environment-variables
- localStorage API: https://developer.mozilla.org/ko/docs/Web/API/Window/localStorage

## 🤝 기여하기

새로운 개발자 기능이나 개선 사항이 있다면:

1. `lib/DevModeContext.tsx`에 필요한 상태나 함수 추가
2. `components/DevPanel.tsx`에 새로운 컴포넌트 추가 (필요시)
3. 원하는 페이지/컴포넌트에서 `useDevMode` 훅으로 사용

---

**Made with ❤️ for Bid Master Developers**


