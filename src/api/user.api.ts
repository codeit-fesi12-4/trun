import { API_BASE_URL, TEAM_NAME } from "@/constants";
import { UserProfile } from "@/types/user.type";

const buildAuthPath = (path: string, teamName: string) => `${API_BASE_URL}${teamName}/auths${path}`;

// 회원 정보 확인
export const getUserProfile = async (teamName: string = TEAM_NAME, token?: string | null) => {
  try {
    const res = await fetch(buildAuthPath("/user", teamName), {
      method: "GET",
      headers: {
        Authorization: `Bearer ${
          token ?? (typeof window !== "undefined" ? (localStorage.getItem("token") ?? "") : "")
        }`,
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
  token?: string | null,
): Promise<UserProfile> => {
  const Token = token ?? (typeof window !== "undefined" ? localStorage.getItem("token") : "") ?? "";

  const res = await fetch(`${API_BASE_URL}${TEAM_NAME}/auths/user`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${Token}`,
    },
    body: formData,
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(errorData.message);
  }

  return res.json();
};
