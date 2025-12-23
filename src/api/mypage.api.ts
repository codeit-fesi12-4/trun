import { GetJoinedMoimsResponse, MypageMoim, WritableReviewItem } from "@/types/mypage.type";
import { getMoimList } from "./moim.api";
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
export const getCreatedMoims = async (userId: number): Promise<MypageMoim[]> => {
  if (!userId) return [];

  try {
    // getMoimList는 ApiResult<MypageMoim[]> 반환
    const res = await getMoimList({ createdBy: userId });

    if (!res.ok || !res.data) return [];

    return res.data.map(item => ({
      ...item,
      joinedAt: item.dateTime,
      isCompleted: false,
      isReviewed: false,
    }));
  } catch (error) {
    console.error("getCreatedMoims API 에러:", error);
    return [];
  }
};
