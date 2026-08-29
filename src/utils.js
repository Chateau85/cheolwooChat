export const validateEmail = (email) => {
  const normalizedEmail = email.trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail);
};

export const normalizeEmail = (email) => email.trim().toLowerCase();

export const validateSignup = ({ name, email, password, passwordConfirm }) => {
  if (!name.trim()) return "이름을 입력해 주세요.";
  if (!validateEmail(email)) return "올바른 이메일 주소를 입력해 주세요.";
  if (password.length < 6) return "비밀번호는 6자 이상이어야 합니다.";
  if (password !== passwordConfirm) return "비밀번호가 일치하지 않습니다.";
  return "";
};

export const getAuthErrorMessage = (error) => {
  const messages = {
    "auth/email-already-in-use": "이미 사용 중인 이메일입니다.",
    "auth/invalid-credential": "이메일 또는 비밀번호를 확인해 주세요.",
    "auth/invalid-email": "올바른 이메일 주소를 입력해 주세요.",
    "auth/network-request-failed": "네트워크 연결을 확인한 뒤 다시 시도해 주세요.",
    "auth/too-many-requests": "요청이 너무 많습니다. 잠시 후 다시 시도해 주세요.",
    "auth/weak-password": "더 안전한 비밀번호를 입력해 주세요.",
  };
  return messages[error?.code] || "요청을 처리하지 못했습니다. 잠시 후 다시 시도해 주세요.";
};
