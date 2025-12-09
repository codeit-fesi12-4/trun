import { API_BASE_URL, TEAM_NAME } from "@/constants/env";
import { SigninRequest, SignupRequest } from "@/types/auth.type";
import { toast } from "sonner";

const buildAuthPath = (path: string, teamName: string) => `${API_BASE_URL}${teamName}/auths${path}`;

// 회원가입
export const postSignup = async (payload: SignupRequest, teamName: string = TEAM_NAME) => {
  try {
    const response = await fetch(buildAuthPath("/signup", teamName), {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message);
    }

    toast.success(result.message);
    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
};

// 로그인
export const postSignin = async (payload: SigninRequest, teamName: string = TEAM_NAME) => {
  try {
    const response = await fetch(buildAuthPath("/signin", teamName), {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message);
    }

    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
};
