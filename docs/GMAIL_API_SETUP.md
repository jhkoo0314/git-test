# Gmail API 설정 가이드

이 문서는 Gmail API를 사용하여 이메일을 전송하기 위한 설정 방법을 설명합니다.

## 📋 목차

1. [Google Cloud Console 설정](#1-google-cloud-console-설정)
2. [OAuth 2.0 인증 정보 생성](#2-oauth-20-인증-정보-생성)
3. [Refresh Token 발급](#3-refresh-token-발급)
4. [환경 변수 설정](#4-환경-변수-설정)
5. [테스트](#5-테스트)

---

## 1. Google Cloud Console 설정

### 1-1. 프로젝트 생성

1. [Google Cloud Console](https://console.cloud.google.com/)에 접속합니다
2. 상단의 프로젝트 선택 드롭다운을 클릭합니다
3. "새 프로젝트"를 클릭하고 프로젝트 이름을 입력합니다 (예: "bid-master-email")
4. "만들기" 버튼을 클릭합니다

### 1-2. Gmail API 활성화

1. 왼쪽 메뉴에서 "API 및 서비스" > "라이브러리"를 선택합니다
2. 검색창에 "Gmail API"를 입력합니다
3. "Gmail API"를 클릭하고 "사용" 버튼을 클릭합니다

---

## 2. OAuth 2.0 인증 정보 생성

### 2-1. OAuth 동의 화면 구성

1. 왼쪽 메뉴에서 "API 및 서비스" > "OAuth 동의 화면"을 선택합니다
2. "외부" 또는 "내부"를 선택합니다 (개인 사용자는 "외부" 선택)
3. 필수 정보를 입력합니다:
   - 앱 이름: "Bid Master"
   - 사용자 지원 이메일: 본인의 이메일
   - 개발자 연락처: 본인의 이메일
4. "저장 후 계속" 버튼을 클릭합니다

### 2-2. 범위(Scope) 추가

1. "범위 추가 또는 삭제" 버튼을 클릭합니다
2. 다음 범위를 추가합니다:
   - `https://www.googleapis.com/auth/gmail.send` (이메일 전송)
3. "업데이트" 버튼을 클릭합니다
4. "저장 후 계속" 버튼을 클릭합니다

### 2-3. 테스트 사용자 추가 (외부 선택 시)

1. "테스트 사용자" 섹션에서 "사용자 추가" 버튼을 클릭합니다
2. 이메일 전송에 사용할 Gmail 계정을 입력합니다
3. "저장 후 계속" 버튼을 클릭합니다

### 2-4. OAuth 2.0 클라이언트 ID 생성

1. 왼쪽 메뉴에서 "API 및 서비스" > "사용자 인증 정보"를 선택합니다
2. 상단의 "+ 사용자 인증 정보 만들기" > "OAuth 클라이언트 ID"를 클릭합니다
3. 애플리케이션 유형: "웹 애플리케이션" 선택
4. 이름: "Bid Master Web Client" 입력
5. 승인된 리디렉션 URI에 다음을 추가합니다:
   - `https://developers.google.com/oauthplayground`
6. "만들기" 버튼을 클릭합니다
7. **클라이언트 ID**와 **클라이언트 보안 비밀번호**를 복사해둡니다 ⚠️ 중요!

---

## 3. Refresh Token 발급

### 3-1. OAuth 2.0 Playground 사용

1. [OAuth 2.0 Playground](https://developers.google.com/oauthplayground/)에 접속합니다
2. 오른쪽 상단의 톱니바퀴 아이콘(⚙️)을 클릭합니다
3. "Use your own OAuth credentials" 체크박스를 선택합니다
4. 앞서 복사한 **Client ID**와 **Client Secret**을 입력합니다
5. "Close" 버튼을 클릭합니다

### 3-2. 권한 승인

1. 왼쪽의 "Step 1" 섹션에서 다음 항목을 찾아 선택합니다:
   - `https://mail.google.com/` (또는 `https://www.googleapis.com/auth/gmail.send`)
2. "Authorize APIs" 버튼을 클릭합니다
3. Google 로그인 화면이 나타나면 이메일 계정으로 로그인합니다
4. 권한 요청 화면에서 "계속" 또는 "허용"을 클릭합니다

### 3-3. Refresh Token 받기

1. "Step 2" 섹션에서 "Exchange authorization code for tokens" 버튼을 클릭합니다
2. **Refresh token**이 표시됩니다 - 이것을 복사해둡니다 ⚠️ 중요!

---

## 4. 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 내용을 입력합니다:

```env
# Gmail API (이메일 전송용)
GMAIL_CLIENT_ID="your-client-id.apps.googleusercontent.com"
GMAIL_CLIENT_SECRET="your-client-secret"
GMAIL_REFRESH_TOKEN="your-refresh-token"
GMAIL_USER_EMAIL="your-email@gmail.com"
```

각 항목을 앞서 복사한 값으로 교체합니다:

- `GMAIL_CLIENT_ID`: OAuth 클라이언트 ID
- `GMAIL_CLIENT_SECRET`: OAuth 클라이언트 보안 비밀번호
- `GMAIL_REFRESH_TOKEN`: OAuth Playground에서 받은 Refresh Token
- `GMAIL_USER_EMAIL`: 이메일을 전송할 Gmail 계정

⚠️ **중요**: `.env.local` 파일은 절대 Git에 커밋하지 마세요!

---

## 5. 테스트

### 5-1. 서버 실행

```bash
pnpm run dev
```

### 5-2. API 테스트

다음과 같이 API를 호출하여 테스트합니다:

```bash
curl -X POST http://localhost:3000/api/send-email \
  -H "Content-Type: application/json" \
  -d '{
    "to": "recipient@example.com",
    "subject": "테스트 이메일",
    "text": "이메일 전송 테스트입니다.",
    "html": "<h1>테스트</h1><p>이메일 전송 테스트입니다.</p>"
  }'
```

또는 Postman, Thunder Client 등의 API 테스트 도구를 사용할 수 있습니다.

### 5-3. 결과 확인

- 성공 시: `{ "success": true, "message": "이메일이 성공적으로 전송되었습니다." }`
- 실패 시: `{ "success": false, "error": "에러 메시지" }`

브라우저 콘솔이나 서버 로그에서 다음 이모지를 확인할 수 있습니다:

- 📧 이메일 전송 요청 시작
- ✉️ 이메일 메시지 인코딩 완료
- 📤 Gmail API를 통해 이메일 전송 중
- ✅ 이메일 전송 성공
- ❌ 에러 발생

---

## 🔧 문제 해결

### "Gmail API 환경 변수가 설정되지 않았습니다"

- `.env.local` 파일이 프로젝트 루트에 있는지 확인합니다
- 환경 변수 이름이 정확한지 확인합니다
- 서버를 재시작합니다

### "invalid_grant" 에러

- Refresh Token이 만료되었거나 잘못되었습니다
- OAuth 2.0 Playground에서 다시 Refresh Token을 발급받습니다

### "Insufficient Permission" 에러

- OAuth 동의 화면에서 올바른 scope를 추가했는지 확인합니다
- `https://www.googleapis.com/auth/gmail.send` 권한이 필요합니다

### "User not found" 에러

- `GMAIL_USER_EMAIL`이 OAuth 인증에 사용한 이메일과 동일한지 확인합니다

---

## 📚 참고 자료

- [Google Gmail API 공식 문서](https://developers.google.com/gmail/api)
- [OAuth 2.0 Playground](https://developers.google.com/oauthplayground/)
- [Google Cloud Console](https://console.cloud.google.com/)

---

## ✅ 체크리스트

설정이 완료되었는지 확인하세요:

- [ ] Google Cloud 프로젝트 생성
- [ ] Gmail API 활성화
- [ ] OAuth 2.0 클라이언트 ID 생성
- [ ] Refresh Token 발급
- [ ] `.env.local` 파일에 환경 변수 설정
- [ ] API 테스트 성공

모든 항목이 완료되면 이메일 전송 기능을 사용할 수 있습니다! 🎉
