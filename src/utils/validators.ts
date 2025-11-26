const EMAIL_PATTERN =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export interface LoginForm {
  email: string;
  password: string;
}

export interface LoginErrors {
  email?: string;
  password?: string;
}

export interface SignupForm {
  name: string;
  email: string;
  company: string;
  password: string;
  confirmPassword: string;
}

export interface SignupErrors {
  name?: string;
  email?: string;
  company?: string;
  password?: string;
  confirmPassword?: string;
}

export const validateLogin = (values: LoginForm): LoginErrors => {
  const nextErrors: LoginErrors = {};
  if (!values.email.trim()) {
    nextErrors.email = "아이디를 입력해주세요.";
  } else if (!EMAIL_PATTERN.test(values.email)) {
    nextErrors.email = "올바른 이메일을 입력해주세요.";
  }
  if (!values.password) {
    nextErrors.password = "비밀번호를 입력해주세요.";
  }
  return nextErrors;
};

export const validateSignup = (values: SignupForm, duplicateEmails: string[]): SignupErrors => {
  const nextErrors: SignupErrors = {};
  if (!values.name.trim()) {
    nextErrors.name = "이름을 입력해주세요.";
  }
  const normalizedEmail = values.email.trim().toLowerCase();
  if (!normalizedEmail) {
    nextErrors.email = "이메일을 입력해주세요.";
  } else if (!EMAIL_PATTERN.test(normalizedEmail)) {
    nextErrors.email = "올바른 이메일을 입력해주세요.";
  } else if (duplicateEmails.includes(normalizedEmail)) {
    nextErrors.email = "중복된 이메일입니다.";
  }
  if (!values.company.trim()) {
    nextErrors.company = "회사명을 정확하게 입력해주세요.";
  }
  if (!values.password) {
    nextErrors.password = "비밀번호를 입력해주세요.";
  } else if (values.password.length < 8) {
    nextErrors.password = "비밀번호는 8자 이상이어야 합니다.";
  }
  if (!values.confirmPassword) {
    nextErrors.confirmPassword = "비밀번호를 다시 입력해주세요.";
  } else if (values.password && values.confirmPassword !== values.password) {
    nextErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";
  }
  return nextErrors;
};
