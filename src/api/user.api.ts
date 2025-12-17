import { API_BASE_URL, TEAM_NAME } from "@/constants/env";
import { UserProfile } from "@/types/user.type";

const buildAuthPath = (path: string, teamName: string) => `${API_BASE_URL}${teamName}/auths${path}`;

// 회원 정보 확인
export const getUserProfile = async (teamName: string = TEAM_NAME, token?: string | null) => {
  try {
    if (!token) {
      throw new Error("로그인이 필요합니다.");
    }

    const res = await fetch(buildAuthPath("/user", teamName), {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message);
    }
    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
};

// 회원 정보 수정
export const updateProfile = async (
  formData: FormData,
  teamName: string = TEAM_NAME,
  token?: string | null,
): Promise<UserProfile> => {
  if (!token) {
    throw new Error("로그인이 필요합니다.");
  }

  const res = await fetch(buildAuthPath("/user", teamName), {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(errorData.message);
  }

  return res.json();
};
