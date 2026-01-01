import {
  GetCreatedMoimsParams,
  GetJoinedMoimsParams,
  GetJoinedMoimsResponse,
  MypageMoim,
} from "@/types/mypage.type";
import { apiFetch } from "@/lib/apiClient";
import { buildJoinedMoimsPath } from "@/utils/path.util";

// 참여한 나의 모임 조회
export const getMoimJoined = (params: GetJoinedMoimsParams) =>
  apiFetch<GetJoinedMoimsResponse>(`/api/proxy${buildJoinedMoimsPath(params)}`, {
    method: "GET",
  });

// 예약 취소
export const deleteReservation = (moimId: number) =>
  apiFetch(`/api/proxy/gatherings/${moimId}/leave`, {
    method: "DELETE",
  });

// 내가 만든 모임
export const getCreatedMoims = (params: GetCreatedMoimsParams) => {
  const { limit, offset } = params;
  return apiFetch<MypageMoim[]>(`/api/proxy/gatherings/my?limit=${limit}&offset=${offset}`, {
    method: "GET",
  });
};
