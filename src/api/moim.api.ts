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
  return apiFetch<GetMoimsResponse>(`/api/proxy${path}`, {
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

  // 이미지가 없으면 기본 이미지를 사용
  if (payload.image) {
    formData.append("image", payload.image);
  } else {
    try {
      const defaultImageResponse = await fetch("/images/img_login.png");
      const defaultImageBlob = await defaultImageResponse.blob();
      const defaultImageFile = new File([defaultImageBlob], "default-image.png", {
        type: defaultImageBlob.type,
      });
      formData.append("image", defaultImageFile);
    } catch (error) {
      console.warn("기본 이미지 로드 실패:", error);
    }
  }

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
