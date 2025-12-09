import { TEAM_NAME, API_BASE_URL } from "@/constants";
import {
  CreateMoimRequest,
  CreateMoimResponse,
  GetMoimsParams,
  GetMoimsResponse,
} from "@/types/moim.type";

// 경로를 만드는 헬퍼 함수 (로그인 API와 같은 패턴)
// 토큰의 teamId와 일치해야 함
const buildMoimsPath = (teamName: string, params?: GetMoimsParams) => {
  const basePath = `/${teamName}/gatherings`;

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
  teamName: string = TEAM_NAME,
): Promise<GetMoimsResponse> => {
  try {
    const path = buildMoimsPath(teamName, params);
    const endpoint = new URL(path, API_BASE_URL).toString();

    const token = typeof window !== "undefined" ? (localStorage.getItem("token") ?? "") : "";

    const response = await fetch(endpoint, {
      method: "GET",
      ...(token && { headers: { Authorization: `Bearer ${token}` } }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || `API Error: ${response.status}`);
    }

    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("모임 목록 조회 중 오류가 발생했습니다.");
  }
};

// 모임 생성 함수 (multipart/form-data)
export const postMoim = async (
  payload: CreateMoimRequest,
  teamName: string = TEAM_NAME,
): Promise<CreateMoimResponse> => {
  try {
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

    const endpoint = new URL(`/${teamName}/gatherings`, API_BASE_URL).toString();

    const token = typeof window !== "undefined" ? (localStorage.getItem("token") ?? "") : "";

    if (!token) {
      throw new Error("로그인이 필요합니다. 먼저 로그인해주세요.");
    }

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || `API Error: ${response.status}`);
    }

    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("모임 생성 중 오류가 발생했습니다.");
  }
};
