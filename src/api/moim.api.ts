import { apiFetch, ApiResult } from "@/lib/apiClient";
import {
  CreateMoimRequest,
  CreateMoimResponse,
  GetMoimsParams,
  GetMoimsResponse,
} from "@/types/moim.type";
import { buildMoimsPath } from "@/utils/path.util";

// 모임 목록 조회 함수
export const getMoimList = async (
  params?: GetMoimsParams,
): Promise<ApiResult<GetMoimsResponse>> => {
  const path = buildMoimsPath(params);
  return apiFetch<GetMoimsResponse>(`/api/proxy/${path}`, {
    method: "GET",
  });
};

// 모임 생성 함수 (multipart/form-data)
export const postMoim = async (
  payload: CreateMoimRequest,
): Promise<ApiResult<CreateMoimResponse>> => {
  const formData = new FormData();

  formData.append("location", payload.location);
  formData.append("type", payload.type);
  formData.append("name", payload.name);
  formData.append("dateTime", payload.dateTime);
  formData.append("capacity", payload.capacity.toString());
  formData.append("image", payload.image);

  if (payload.registrationEnd) {
    formData.append("registrationEnd", payload.registrationEnd);
  }

  const path = "gatherings";

  return apiFetch<CreateMoimResponse>(`/api/proxy/${path}`, {
    method: "POST",
    isFormData: true,
    body: formData,
  });
};
