import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TEAM_NAME, API_BASE_URL } from "@/constants";
import { apiFetch } from "@/lib/apiClient";
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
export const getMoims = (params?: GetMoimsParams, teamName: string = TEAM_NAME) =>
  apiFetch<GetMoimsResponse>({
    path: buildMoimsPath(teamName, params),
    method: "GET",
  });

// React Query 훅
export const useMoimsQuery = ({
  params,
  teamName = TEAM_NAME,
  enabled = true,
}: {
  params?: GetMoimsParams;
  teamName?: string;
  enabled?: boolean;
}) =>
  useQuery({
    queryKey: ["moims", teamName, params],
    queryFn: () => getMoims(params, teamName),
    staleTime: 1000 * 60, // 1분
    enabled,
  });

// 모임 생성 함수 (multipart/form-data)
export const createMoim = async (
  payload: CreateMoimRequest,
  teamName: string = TEAM_NAME,
): Promise<CreateMoimResponse> => {
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

  const headers: HeadersInit = {
    Authorization: `Bearer ${token}`,
  };

  const response = await fetch(endpoint, {
    method: "POST",
    headers,
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: response.statusText }));
    throw new Error(errorData.message || `API Error: ${response.status}`);
  }

  const result = await response.json();
  return result;
};

// React Query Mutation 훅
export const useCreateMoimMutation = (teamName: string = TEAM_NAME) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateMoimRequest) => createMoim(payload, teamName),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["moims", teamName] });
    },
  });
};
