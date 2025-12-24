import { apiFetch, ApiResult } from "@/lib/apiClient";
import {
  CreateMoimRequest,
  CreateMoimResponse,
  GetMoimsParams,
  GetMoimsResponse,
} from "@/types/moim.type";

// 경로를 만드는 헬퍼 함수 (프록시 경로용)
// 프록시 라우트가 이미 TEAM_NAME을 포함하므로 teamName 없이 경로만 반환
const buildMoimsPath = (params?: GetMoimsParams) => {
  const basePath = "gatherings";

  // 쿼리 파라미터가 없으면 기본 경로만 반환
  if (!params) {
    return basePath;
  }

  // 쿼리 파라미터를 URLSearchParams로 변환
  const searchParams = new URLSearchParams();

  if (params.id) searchParams.append("id", params.id);
  if (params.type) searchParams.append("type", params.type);
  if (params.location) searchParams.append("location", params.location);
  if (params.date) searchParams.append("date", params.date);
  if (params.createdBy !== undefined) searchParams.append("createdBy", params.createdBy.toString());
  if (params.sortBy) searchParams.append("sortBy", params.sortBy);
  if (params.sortOrder) searchParams.append("sortOrder", params.sortOrder);
  if (params.limit !== undefined) searchParams.append("limit", params.limit.toString());
  if (params.offset !== undefined) searchParams.append("offset", params.offset.toString());

  const queryString = searchParams.toString();
  return queryString ? `${basePath}?${queryString}` : basePath;
};

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
