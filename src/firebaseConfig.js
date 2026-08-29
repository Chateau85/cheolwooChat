const requiredKeys = ["apiKey", "authDomain", "projectId", "storageBucket", "appId"];

export const createFirebaseConfig = (environment) => {
  const config = {
    apiKey: environment.apiKey,
    authDomain: environment.authDomain,
    projectId: environment.projectId,
    storageBucket: environment.storageBucket,
    messagingSenderId: environment.messagingSenderId,
    appId: environment.appId,
  };
  const missingKeys = requiredKeys.filter((key) => !config[key]?.trim());

  if (missingKeys.length) {
    throw new Error(`Firebase 환경 변수가 누락되었습니다: ${missingKeys.join(", ")}`);
  }

  return config;
};

export const getFirebaseConfig = () =>
  createFirebaseConfig({
    apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
  });
