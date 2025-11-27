export interface SignupRequest {
  email: string;
  password: string;
  name: string;
  companyName: string;
}

export interface SigninRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface SignupResponse {
  token?: string;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  companyName: string;
}
