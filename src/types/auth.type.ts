export type SignupRequest = {
  email: string;
  password: string;
  name: string;
  companyName: string;
};

export type SigninRequest = {
  email: string;
  password: string;
};

export type SigninResponse = {
  error: string | null;
  status: number;
  ok: boolean;
  url: string | null;
};

export type SignupResponse = {
  token?: string;
};

// 로그인 폼 타입 추론
export type LoginForm = {
  email: string;
  password: string;
};

// 로그인 에러 타입 추론
export type LoginErrors = {
  email?: string;
  password?: string;
};

// 회원가입 폼 타입 추론
export type SignupForm = {
  name: string;
  email: string;
  companyName: string;
  password: string;
  confirmPassword: string;
};

// 회원가입 에러 타입 추론
export type SignupErrors = {
  name?: string;
  email?: string;
  companyName?: string;
  password?: string;
  confirmPassword?: string;
};
