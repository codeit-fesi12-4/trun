import { API_BASE_URL, TEAM_NAME } from "@/constants/env";
import { apiFetch } from "@/lib/apiClient";
import { SigninRequest, SignupRequest, LoginResponse, SignupResponse } from "@/types/auth.type";

const buildAuthPath = (path: string, teamName: string) => `${API_BASE_URL}${teamName}/auths${path}`;

// 회원가입
export const postSignup = (payload: SignupRequest, teamName: string = TEAM_NAME) =>
  apiFetch<SignupResponse & { message: string }>(buildAuthPath("/signup", teamName), {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

// 로그인
export const postSignin = (payload: SigninRequest, teamName: string = TEAM_NAME) =>
  apiFetch<LoginResponse>(buildAuthPath("/signin", teamName), {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });
