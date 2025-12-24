import { apiFetch } from "@/lib/apiClient";
import { UserProfile } from "@/types/user.type";

// 회원 정보 호출
export const getUserProfile = () =>
  apiFetch<UserProfile>(`/api/proxy/auths/user`, {
    method: "GET",
  });

// 회원 정보 수정
export const putUpdateProfile = (formData: FormData) =>
  apiFetch<UserProfile>(`/api/proxy/auths/user`, {
    method: "PUT",
    isFormData: true,
    body: formData,
  });
