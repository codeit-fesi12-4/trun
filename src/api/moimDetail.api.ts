import { apiFetch } from "@/lib/apiClient";
import {
  DeleteJoinResponse,
  GetMoimResponse,
  GetParticipantsResponse,
  PostJoinResponse,
  PutMoimResponse,
} from "@/types/moimDetail.type";

// 모임 상세 조회
export const getMoim = (moimId: number) =>
  apiFetch<GetMoimResponse>(`/api/proxy/gatherings/${moimId}`, {
    method: "GET",
  });

// 특정 모임의 참가자 목록 조회
export const getParticipants = (moimId: number) =>
  apiFetch<GetParticipantsResponse>(`/api/proxy/gatherings/${moimId}/participants`, {
    method: "GET",
  });

// 모임 참여
export const postJoin = (moimId: number) =>
  apiFetch<PostJoinResponse>(`/api/proxy/gatherings/${moimId}/join`, {
    method: "POST",
  });

// 모임 참여 취소
export const deleteJoin = (moimId: number) =>
  apiFetch<DeleteJoinResponse>(`/api/proxy/gatherings/${moimId}/leave`, {
    method: "DELETE",
  });

// 모임 취소
export const putMoim = (moimId: number) =>
  apiFetch<PutMoimResponse>(`/api/proxy/gatherings/${moimId}/cancel`, {
    method: "PUT",
  });
