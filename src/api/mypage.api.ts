import { GetJoinedMoimsResponse, MypageMoim } from "@/types/mypage.type";
import { apiFetch } from "@/lib/apiClient";

// 참여한 나의 모임 조회
export const getMoimJoined = () =>
  apiFetch<GetJoinedMoimsResponse>(`/api/proxy/gatherings/joined`, {
    method: "GET",
  });

// 예약 취소
export const deleteReservation = (moimId: number) =>
  apiFetch(`/api/proxy/gatherings/${moimId}/leave`, {
    method: "DELETE",
  });

// 내가 만든 모임
export const getCreatedMoims = () =>
  apiFetch<MypageMoim[]>(`/api/proxy/gatherings/my`, {
    method: "GET",
  });
