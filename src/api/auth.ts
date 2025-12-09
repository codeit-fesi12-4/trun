import { useQuery } from "@tanstack/react-query";

import { API_BASE_URL, TEAM_NAME } from "@/constants";
import { apiFetch } from "@/lib/apiClient";
import { SigninRequest, SignupRequest, UserProfile } from "@/types/auth.type";
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

// 로그아웃
export const postSignout = async (teamName: string = TEAM_NAME) => {
  try {
    const response = await fetch(buildAuthPath("/signout", teamName), {
      method: "POST",
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

export const getUserProfile = (teamName: string = TEAM_NAME, token?: string | null) =>
  apiFetch<UserProfile>({
    path: buildAuthPath("/user", teamName),
    method: "GET",
    headers: {
      Authorization: `Bearer ${
        token ?? (typeof window !== "undefined" ? (localStorage.getItem("token") ?? "") : "")
      }`,
    },
  });

export const useUserProfileQuery = ({
  teamName = TEAM_NAME,
  token,
  enabled = true,
}: {
  teamName?: string;
  token?: string | null;
  enabled?: boolean;
}) =>
  useQuery({
    queryKey: ["userProfile", teamName, token ?? "guest"],
    queryFn: () => getUserProfile(teamName, token),
    staleTime: 1000 * 60,
    enabled,
  });
