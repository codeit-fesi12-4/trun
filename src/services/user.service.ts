import { apiFetch, ApiResult } from "@/lib/apiClient";
import { UserProfile } from "@/types/user.type";
import { ApiError } from "@/utils/error.util";

// 회원 정보 호출
export const getUserProfile = async (): Promise<ApiResult<UserProfile>> => {
  try {
    return await apiFetch<UserProfile>(`/api/proxy/auths/user`, {
      method: "GET",
    });
  } catch (error) {
    if (error instanceof ApiError && error.status === 401 && error.code === "UNAUTHORIZED") {
      return {
        ok: false,
        status: 401,
        message: error.message,
        code: error.code,
      };
    }
    throw error;
  }
};

// 회원 정보 수정
export const putUpdateProfile = (formData: FormData) =>
  apiFetch<UserProfile>(`/api/proxy/auths/user`, {
    method: "PUT",
    isFormData: true,
    body: formData,
  });
