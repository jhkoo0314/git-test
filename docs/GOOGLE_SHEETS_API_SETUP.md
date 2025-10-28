# Google Sheets API 설정 가이드

이 문서는 Google Sheets API를 사용하여 경매 시뮬레이션 데이터를 구글 시트에 저장하기 위한 설정 방법을 설명합니다.

## 📋 목차

1. [Google Cloud Console 설정](#1-google-cloud-console-설정)
2. [서비스 계정 생성](#2-서비스-계정-생성)
3. [구글 시트 준비](#3-구글-시트-준비)
4. [환경 변수 설정](#4-환경-변수-설정)
5. [테스트](#5-테스트)

---

## 1. Google Cloud Console 설정

### 1-1. 프로젝트 생성 (이미 있다면 건너뛰기)

1. [Google Cloud Console](https://console.cloud.google.com/)에 접속합니다
2. 상단의 프로젝트 선택 드롭다운을 클릭합니다
3. "새 프로젝트"를 클릭하고 프로젝트 이름을 입력합니다 (예: "bid-master")
4. "만들기" 버튼을 클릭합니다

### 1-2. Google Sheets API 활성화

1. 왼쪽 메뉴에서 "API 및 서비스" > "라이브러리"를 선택합니다
2. 검색창에 "Google Sheets API"를 입력합니다
3. "Google Sheets API"를 클릭하고 "사용" 버튼을 클릭합니다

---

## 2. 서비스 계정 생성

### 2-1. 서비스 계정 만들기

1. 왼쪽 메뉴에서 "API 및 서비스" > "사용자 인증 정보"를 선택합니다
2. 상단의 "+ 사용자 인증 정보 만들기" > "서비스 계정"을 클릭합니다
3. 서비스 계정 세부정보를 입력합니다:
   - 서비스 계정 이름: "bid-master-sheets"
   - 서비스 계정 ID: 자동 생성됨 (예: bid-master-sheets@...)
   - 서비스 계정 설명: "경매 시뮬레이션 데이터 관리용"
4. "만들고 계속하기" 버튼을 클릭합니다
5. "역할 선택" 단계는 건너뛰고 "계속"을 클릭합니다
6. "완료" 버튼을 클릭합니다

### 2-2. 서비스 계정 키 생성

1. 방금 생성한 서비스 계정을 클릭합니다
2. 상단의 "키" 탭을 클릭합니다
3. "키 추가" > "새 키 만들기"를 클릭합니다
4. 키 유형: "JSON" 선택
5. "만들기" 버튼을 클릭합니다
6. **JSON 키 파일이 자동으로 다운로드됩니다** ⚠️ 이 파일을 안전하게 보관하세요!

다운로드된 JSON 파일은 다음과 같은 형식입니다:

```json
{
  "type": "service_account",
  "project_id": "your-project-id",
  "private_key_id": "...",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "bid-master-sheets@your-project-id.iam.gserviceaccount.com",
  "client_id": "...",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "..."
}
```

---

## 3. 구글 시트 준비

### 3-1. 새 구글 시트 생성

1. [Google Sheets](https://sheets.google.com/)에 접속합니다
2. 빈 스프레드시트를 새로 만듭니다
3. 시트 이름을 "Bid Master 경매 결과"로 변경합니다
4. 첫 번째 시트의 이름을 "경매결과"로 변경합니다

### 3-2. 헤더 행 추가

첫 번째 행(1행)에 다음 헤더를 입력합니다:

| A    | B        | C        | D      | E          | F          | G    | H    |
| ---- | -------- | -------- | ------ | ---------- | ---------- | ---- | ---- |
| 날짜 | 사용자ID | 매물제목 | 감정가 | 시작입찰가 | 최종입찰가 | 결과 | 손익 |

### 3-3. 시트 URL 복사

1. 브라우저 주소창의 URL을 확인합니다
2. URL 형식: `https://docs.google.com/spreadsheets/d/{SPREADSHEET_ID}/edit#gid=0`
3. **SPREADSHEET_ID 부분을 복사**해둡니다 (예: `1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms`)

### 3-4. 서비스 계정에 권한 부여

1. 구글 시트 오른쪽 상단의 "공유" 버튼을 클릭합니다
2. 앞서 생성한 서비스 계정의 이메일을 입력합니다
   - 예: `bid-master-sheets@your-project-id.iam.gserviceaccount.com`
3. 권한을 "편집자"로 설정합니다
4. "완료" 버튼을 클릭합니다

⚠️ **중요**: 서비스 계정 이메일에 편집 권한을 부여하지 않으면 API에서 시트에 접근할 수 없습니다!

---

## 4. 환경 변수 설정

### 4-1. JSON 키 파일 저장

1. 다운로드한 JSON 키 파일을 프로젝트 루트에 저장합니다
2. 파일 이름을 `google-service-account.json`으로 변경합니다
3. **⚠️ 중요**: `.gitignore` 파일에 이 파일이 포함되어 있는지 확인하세요!

### 4-2. 환경 변수 파일 생성

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 내용을 추가합니다:

```env
# Google Sheets API (경매 결과 저장용)
GOOGLE_SHEETS_SPREADSHEET_ID="your-spreadsheet-id"
GOOGLE_SERVICE_ACCOUNT_EMAIL="your-service-account@your-project-id.iam.gserviceaccount.com"
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nyour-private-key\n-----END PRIVATE KEY-----\n"
```

각 항목을 다음과 같이 설정합니다:

- `GOOGLE_SHEETS_SPREADSHEET_ID`: 구글 시트 URL에서 복사한 ID
- `GOOGLE_SERVICE_ACCOUNT_EMAIL`: JSON 파일의 `client_email` 값
- `GOOGLE_PRIVATE_KEY`: JSON 파일의 `private_key` 값 (줄바꿈 포함)

⚠️ **주의사항**:

- `GOOGLE_PRIVATE_KEY`는 반드시 따옴표로 감싸야 합니다
- `\n` 문자가 실제 줄바꿈이 아닌 문자열로 포함되어야 합니다
- `.env.local` 파일은 절대 Git에 커밋하지 마세요!

### 4-3. .gitignore 확인

`.gitignore` 파일에 다음 내용이 포함되어 있는지 확인합니다:

```gitignore
# 환경 변수
.env
.env.local
.env*.local

# Google 서비스 계정 키
google-service-account.json
```

---

## 5. 테스트

### 5-1. 서버 실행

```bash
pnpm run dev
```

### 5-2. API 테스트

다음과 같이 API를 호출하여 테스트합니다:

```bash
curl -X POST http://localhost:3000/api/sheets/append \
  -H "Content-Type: application/json" \
  -d '{
    "date": "2025-10-23",
    "userId": "test-user-123",
    "itemTitle": "서울 강남구 아파트",
    "appraisedValue": 500000000,
    "startingBid": 350000000,
    "finalBid": 400000000,
    "result": "성공",
    "profitOrLoss": 100000000
  }'
```

### 5-3. 결과 확인

**API 응답:**

- 성공 시: `{ "success": true, "message": "데이터가 구글 시트에 저장되었습니다." }`
- 실패 시: `{ "success": false, "error": "에러 메시지" }`

**구글 시트 확인:**

1. 구글 시트를 새로고침합니다
2. 2행에 새로운 데이터가 추가되었는지 확인합니다

**콘솔 로그 확인:**
서버 로그에서 다음 이모지를 확인할 수 있습니다:

- 📊 구글 시트 API 호출 시작
- ✅ 데이터 저장 성공
- ❌ 에러 발생

---

## 🔧 문제 해결

### "Google Sheets API 환경 변수가 설정되지 않았습니다"

- `.env.local` 파일이 프로젝트 루트에 있는지 확인합니다
- 환경 변수 이름이 정확한지 확인합니다
- 서버를 재시작합니다 (`Ctrl+C` 후 `pnpm run dev`)

### "The caller does not have permission" 에러

- 구글 시트에서 서비스 계정 이메일에 편집 권한을 부여했는지 확인합니다
- 서비스 계정 이메일이 정확한지 확인합니다

### "Invalid JWT Signature" 에러

- `GOOGLE_PRIVATE_KEY` 환경 변수가 올바르게 설정되었는지 확인합니다
- Private key에 `-----BEGIN PRIVATE KEY-----`와 `-----END PRIVATE KEY-----`가 포함되어 있는지 확인합니다
- 줄바꿈(`\n`)이 올바르게 포함되어 있는지 확인합니다

### "Requested entity was not found" 에러

- `GOOGLE_SHEETS_SPREADSHEET_ID`가 올바른지 확인합니다
- 구글 시트가 삭제되지 않았는지 확인합니다

---

## 📚 참고 자료

- [Google Sheets API 공식 문서](https://developers.google.com/sheets/api)
- [Google Cloud Console](https://console.cloud.google.com/)
- [googleapis npm 패키지](https://www.npmjs.com/package/googleapis)

---

## ✅ 체크리스트

설정이 완료되었는지 확인하세요:

- [ ] Google Cloud 프로젝트 생성
- [ ] Google Sheets API 활성화
- [ ] 서비스 계정 생성
- [ ] 서비스 계정 키(JSON) 다운로드
- [ ] 구글 시트 생성 및 헤더 설정
- [ ] 구글 시트에 서비스 계정 권한 부여
- [ ] `.env.local` 파일에 환경 변수 설정
- [ ] `.gitignore`에 민감한 파일 추가
- [ ] API 테스트 성공
- [ ] 구글 시트에 데이터 저장 확인

모든 항목이 완료되면 구글 시트 연동 기능을 사용할 수 있습니다! 🎉
