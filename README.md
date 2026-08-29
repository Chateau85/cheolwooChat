# cheolwooChat

Expo와 Firebase를 사용하는 React Native 인증 예제입니다.

## 요구 사항

- Node.js 22.13 이상
- npm 10 이상
- Expo SDK 57을 지원하는 개발 빌드 또는 Expo Go
- Firebase Authentication, Cloud Firestore, Cloud Storage가 활성화된 Firebase 프로젝트

## 로컬 실행

1. 의존성을 설치합니다.

   ```shell
   npm ci
   ```

2. `.env.example`을 `.env.local`로 복사하고 Firebase 웹 앱 설정값을 입력합니다.

3. 개발 서버를 실행합니다.

   ```shell
   npm start
   ```

Firebase 클라이언트 설정은 프로젝트 식별자이며 서버 비밀키가 아닙니다. 실제 데이터 보호는 Firebase Authentication, Security Rules, App Check로 구성해야 합니다. 서비스 계정 키나 FCM 서버 키는 클라이언트 환경 변수에 넣지 마세요.

## 검증

```shell
npm test
npm run check
npx expo export --platform web
npm audit
```

Firebase 서비스와 연결되는 인증·저장소 통합 동작은 유효한 로컬 설정과 별도의 테스트 프로젝트에서 확인해야 합니다.
