import { apiFetch } from "@/lib/apiClient";
import { UserProfile } from "@/types/user.type";
import { API_BASE_URL, TEAM_NAME } from "@/constants/env";

// 회원 정보 확인 (클라이언트용 - 프록시 라우트 사용)
export const getUserProfile = () =>
  apiFetch<UserProfile>(`/api/proxy/auths/user`, {
    method: "GET",
  });

// 회원 정보 확인 (서버 사이드용 - 직접 API 호출)
export const getUserProfileServer = async (
  token: string,
  teamName: string = TEAM_NAME,
): Promise<UserProfile> => {
  const response = await fetch(`${API_BASE_URL}${teamName}/auths/user`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: response.statusText }));
    throw new Error(errorData.message || "사용자 정보를 가져오는데 실패했습니다.");
  }

  return response.json();
};

// 회원 정보 수정
export const putUpdateProfile = (formData: FormData) =>
  apiFetch<UserProfile>(`/api/proxy/auths/user`, {
    method: "PUT",
    isFormData: true,
    body: formData,
  });
