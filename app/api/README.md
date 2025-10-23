# 경매 시뮬레이션 API 문서

## API 엔드포인트

### 1. 경매 목록 조회

- **URL**: `GET /api/auctions`
- **설명**: 모든 경매 매물을 조회합니다.
- **응답 예시**:

```json
{
  "success": true,
  "data": [
    {
      "id": "clx123...",
      "title": "명품 가방",
      "itemType": "명품",
      "appraisedValue": 1000000,
      "startingBid": 500000,
      "marketPrice": 1200000,
      "riskType": "MEDIUM",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "count": 1,
  "message": "경매 목록을 성공적으로 조회했습니다"
}
```

### 2. 입찰 처리

- **URL**: `POST /api/auctions/[id]/bid`
- **설명**: 특정 경매 매물에 입찰을 처리하고 시뮬레이션 결과를 계산합니다.
- **요청 본문**:

```json
{
  "userId": "user123",
  "bidAmount": 800000
}
```

- **응답 예시**:

```json
{
  "success": true,
  "data": {
    "simulationResult": {
      "id": "result123",
      "userId": "user123",
      "auctionItemId": "item123",
      "finalBid": 800000,
      "result": "성공",
      "profitOrLoss": 400000,
      "createdAt": "2024-01-01T00:00:00.000Z"
    },
    "userPoints": 1400,
    "auctionItem": {
      "id": "item123",
      "title": "명품 가방",
      "appraisedValue": 1000000,
      "marketPrice": 1200000
    }
  },
  "message": "입찰 처리가 완료되었습니다"
}
```

## 시뮬레이션 로직

### 성공 확률 계산

- **LOW 위험**: 90% 성공 확률
- **MEDIUM 위험**: 70% 성공 확률
- **HIGH 위험**: 40% 성공 확률
- **VERY_HIGH 위험**: 20% 성공 확률

### 포인트 시스템

- **이익**: (시장가 - 입찰가) ÷ 100 = 획득 포인트
- **손실**: (입찰가 - 시장가) ÷ 100 = 차감 포인트
- **실패**: 입찰가 ÷ 100 = 차감 포인트

### 로그 시스템

모든 API 호출과 시뮬레이션 결과는 콘솔에 상세한 로그가 출력됩니다:

- 🔍 요청 시작
- 📦 매물 정보
- 👤 사용자 정보
- 📊 시뮬레이션 결과
- 💰 이익/손실 계산
- ✅ 완료 상태
