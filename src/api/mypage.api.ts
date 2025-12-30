import { GetJoinedMoimsResponse, MypageMoim, WritableReviewItem } from "@/types/mypage.type";
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

// 작성 가능한 리뷰
export const getAvailableReviews = async (): Promise<WritableReviewItem[]> => {
  const result = await getMoimJoined();

  if (!result.ok) return []; // 실패하면 빈 배열 반환
  return result.data
    .filter(item => item.isCompleted && !item.isReviewed && !item.canceledAt)
    .map(item => ({
      ...item,
      gatheringId: item.id,
      score: 0,
    }));
};

// 내가 만든 모임
export const getCreatedMoims = () =>
  apiFetch<MypageMoim[]>(`/api/proxy/gatherings/my`, {
    method: "GET",
  });
