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

export type LoginResponse = {
  token: string;
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
