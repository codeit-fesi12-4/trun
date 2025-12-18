import { API_BASE_URL, TEAM_NAME } from "@/constants/env";
import { apiFetch } from "@/lib/apiClient";
import { SigninRequest, SignupRequest, LoginResponse, SignupResponse } from "@/types/auth.type";
import { toast } from "sonner";

const buildAuthPath = (path: string, teamName: string) => `${API_BASE_URL}${teamName}/auths${path}`;

// 회원가입
export const postSignup = async (
  payload: SignupRequest,
  teamName: string = TEAM_NAME,
): Promise<SignupResponse & { message: string }> => {
  const endpoint = buildAuthPath("/signup", teamName);
  const result = await apiFetch<SignupResponse & { message: string }>(endpoint, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  toast.success(result.message);
  return result;
};

// 로그인
export const postSignin = async (
  payload: SigninRequest,
  teamName: string = TEAM_NAME,
): Promise<LoginResponse> => {
  const endpoint = buildAuthPath("/signin", teamName);
  return apiFetch<LoginResponse>(endpoint, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });
};
