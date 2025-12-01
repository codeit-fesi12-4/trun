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

export type UserProfile = {
  id: string;
  email: string;
  name: string;
  companyName: string;
};
