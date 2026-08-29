import assert from "node:assert/strict";
import test from "node:test";
import {
  getAuthErrorMessage,
  normalizeEmail,
  validateEmail,
  validateSignup,
} from "../src/utils.js";

test("이메일을 정규화하고 검증한다", () => {
  assert.equal(normalizeEmail("  USER@Example.COM "), "user@example.com");
  assert.equal(validateEmail("user@example.com"), true);
  assert.equal(validateEmail("not-an-email"), false);
});

test("회원가입 입력 오류를 반환한다", () => {
  assert.equal(
    validateSignup({
      name: "",
      email: "user@example.com",
      password: "password",
      passwordConfirm: "password",
    }),
    "이름을 입력해 주세요."
  );
  assert.equal(
    validateSignup({
      name: "사용자",
      email: "user@example.com",
      password: "password",
      passwordConfirm: "different",
    }),
    "비밀번호가 일치하지 않습니다."
  );
});

test("유효한 회원가입 입력을 허용한다", () => {
  assert.equal(
    validateSignup({
      name: "사용자",
      email: "user@example.com",
      password: "password",
      passwordConfirm: "password",
    }),
    ""
  );
});

test("인증 오류를 사용자용 메시지로 변환한다", () => {
  assert.equal(
    getAuthErrorMessage({ code: "auth/invalid-credential" }),
    "이메일 또는 비밀번호를 확인해 주세요."
  );
  assert.equal(
    getAuthErrorMessage(new Error("internal detail")),
    "요청을 처리하지 못했습니다. 잠시 후 다시 시도해 주세요."
  );
});
