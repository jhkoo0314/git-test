# Chrome DevTools MCP 설정 가이드

## 개요

Chrome DevTools MCP(Model Context Protocol)를 사용하면 AI 도우미가 실제 브라우저 환경에서 웹 애플리케이션을 테스트하고 디버깅할 수 있습니다.

## 🚀 빠른 시작

### 1. 자동 설정 (권장)

```bash
# 프로젝트 루트에서 실행
node scripts/setup-chrome-devtools-mcp.js
```

### 2. 수동 설정

#### 2.1 Chrome DevTools MCP 서버 설치

```bash
npx chrome-devtools-mcp@latest
```

#### 2.2 Chrome을 디버깅 모드로 시작

**Windows:**

```bash
"C:\Program Files\Google\Chrome\Application\chrome.exe" --remote-debugging-port=9222 --disable-web-security --user-data-dir=./chrome-debug-profile
```

**macOS:**

```bash
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --remote-debugging-port=9222 --disable-web-security --user-data-dir=./chrome-debug-profile
```

**Linux:**

```bash
google-chrome --remote-debugging-port=9222 --disable-web-security --user-data-dir=./chrome-debug-profile
```

## 📋 사용 방법

### 1. 기본 사용법

1. Chrome DevTools MCP 서버가 실행 중인지 확인
2. Chrome이 디버깅 모드로 실행 중인지 확인 (http://localhost:9222 접속 가능)
3. AI 도우미에게 다음과 같은 요청을 할 수 있습니다:

```
"Bid Master 웹사이트의 성능을 분석해줘"
"로그인 페이지에서 에러가 발생하는지 확인해줘"
"경매 목록 페이지의 로딩 시간을 측정해줘"
```

### 2. 주요 기능

- **스크린샷 촬영**: 웹페이지의 현재 상태를 이미지로 캡처
- **콘솔 로그 확인**: JavaScript 에러나 로그 메시지 확인
- **네트워크 요청 모니터링**: API 호출 상태와 응답 시간 확인
- **성능 분석**: 페이지 로딩 시간과 리소스 사용량 측정
- **DOM 조작**: 요소 클릭, 텍스트 입력 등 사용자 상호작용 시뮬레이션

## 🔧 설정 파일

### mcp-config.json

```json
{
  "mcpServers": {
    "chrome-devtools": {
      "command": "npx",
      "args": ["chrome-devtools-mcp@latest"],
      "env": {
        "CHROME_DEBUG_PORT": "9222"
      }
    }
  }
}
```

## ⚠️ 주의사항

### 보안

- 디버깅 모드로 Chrome을 실행할 때는 보안에 주의하세요
- 디버깅 포트(9222)가 열려 있는 동안 민감한 웹사이트 방문을 피하세요
- 사용 후에는 Chrome을 완전히 종료하세요

### 성능

- 디버깅 모드에서는 Chrome의 성능이 약간 저하될 수 있습니다
- 개발 및 테스트 목적으로만 사용하세요

## 🐛 문제 해결

### Chrome이 시작되지 않는 경우

1. Chrome이 이미 실행 중인지 확인하고 완전히 종료
2. 관리자 권한으로 명령어 실행
3. 다른 포트 번호 사용 (예: --remote-debugging-port=9223)

### MCP 서버 연결 실패

1. 방화벽 설정 확인
2. 포트 9222가 사용 가능한지 확인
3. Chrome이 디버깅 모드로 실행되었는지 확인

### 권한 오류

1. Node.js와 npm이 최신 버전인지 확인
2. 프로젝트 디렉토리에 쓰기 권한이 있는지 확인

## 📚 추가 리소스

- [Chrome DevTools MCP GitHub](https://github.com/ChromeDevTools/chrome-devtools-mcp)
- [Model Context Protocol 문서](https://modelcontextprotocol.io/)
- [Chrome DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/)

## 🎯 Bid Master에서의 활용 예시

### 1. 경매 페이지 테스트

```
"경매 상세 페이지에서 입찰 버튼이 정상적으로 작동하는지 확인해줘"
```

### 2. 성능 최적화

```
"메인 페이지의 로딩 시간을 측정하고 최적화 방안을 제안해줘"
```

### 3. 에러 디버깅

```
"사용자 정보 입력 모달에서 발생하는 JavaScript 에러를 찾아줘"
```

### 4. 반응형 테스트

```
"모바일 화면에서 경매 카드가 올바르게 표시되는지 확인해줘"
```

이제 AI 도우미가 실제 브라우저 환경에서 Bid Master 웹사이트를 테스트하고 디버깅할 수 있습니다! 🎉
