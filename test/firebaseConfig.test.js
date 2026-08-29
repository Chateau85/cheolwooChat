import assert from "node:assert/strict";
import test from "node:test";
import { createFirebaseConfig } from "../src/firebaseConfig.js";

const validEnvironment = {
  apiKey: "api-key",
  authDomain: "project.firebaseapp.com",
  projectId: "project",
  storageBucket: "project.firebasestorage.app",
  messagingSenderId: "sender",
  appId: "app-id",
};

test("Firebase 설정을 생성한다", () => {
  assert.deepEqual(createFirebaseConfig(validEnvironment), validEnvironment);
});

test("필수 Firebase 설정 누락을 조기에 알린다", () => {
  assert.throws(
    () => createFirebaseConfig({ ...validEnvironment, apiKey: "", appId: undefined }),
    /apiKey, appId/
  );
});
