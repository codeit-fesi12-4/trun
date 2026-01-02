import { API_BASE_URL, TEAM_NAME } from "@/constants/env";
import { apiFetch } from "@/lib/apiClient";
import { SigninRequest, SignupRequest, LoginResponse, SignupResponse } from "@/types/auth.type";

// 회원가입
export const postSignup = (payload: SignupRequest) =>
  apiFetch<SignupResponse & { message: string }>(`/api/proxy/auths/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

// 로그인
export const postSignin = (payload: SigninRequest) =>
  apiFetch<LoginResponse>(`${API_BASE_URL}${TEAM_NAME}/auths/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });
