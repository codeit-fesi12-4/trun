import { API_BASE_URL, TEAM_NAME } from "@/constants/env";
import {
  CreateMoimsResponse,
  GetJoinedMoimsParams,
  GetJoinedMoimsResponse,
  WritableReviewItem,
} from "@/types/mypage.type";
import { getMoimList } from "./moim.api";

const buildMoimPath = (path: string, teamName: string) =>
  `${API_BASE_URL}${teamName}/gatherings${path}`;

// 나의 모임
export const getMoimJoined = async (
  params?: GetJoinedMoimsParams,
  teamName: string = TEAM_NAME,
  token?: string | null,
): Promise<GetJoinedMoimsResponse> => {
  try {
    const url = new URL(buildMoimPath(`/joined`, teamName));
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, String(value));
      });
    }

    const res = await fetch(url.toString(), {
      method: "GET",
      ...(token && { headers: { Authorization: `Bearer ${token}` } }),
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || `API Error: ${res.status}`);
    }
    return result;
  } catch (error) {
    if (error instanceof Error) throw error;
    throw new Error("참석한 모임 목록 조회 중 오류가 발생했습니다.");
  }
};

// 나의 모임 탭에서 예약 취소
export const deleteReservation = async (
  moimId: number,
  teamName: string = TEAM_NAME,
  token?: string | null,
) => {
  try {
    if (!token) {
      throw new Error("로그인이 필요합니다.");
    }
    const res = await fetch(buildMoimPath(`/${moimId}/leave`, teamName), {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await res.json();

    if (!res.ok) {
      const errorMessage = result.message || `API Error: ${res.status}`;

      if (res.status === 401) {
        throw new Error("인증 오류가 발생했습니다. 다시 로그인해주세요.");
      }
      throw new Error(errorMessage);
    }

    return result;
  } catch (error) {
    console.error("API 요청 중 오류 발생:", error);
    if (error instanceof Error) throw error;
    throw new Error("예약 취소 중 네트워크 오류가 발생했습니다.");
  }
};

// 나의 리뷰
// 작성 가능한 리뷰 데이터 필터
export const getAvailableReviews = async (): Promise<WritableReviewItem[]> => {
  const joinedMoims = await getMoimJoined();

  return joinedMoims
    .filter(item => item.isCompleted && !item.isReviewed && !item.canceledAt)
    .map(item => ({
      ...item,
      gatheringId: item.id,
      score: 0,
    }));
};

// 내가 만든 모임
export const getCreatedMoims = (userId: number): Promise<CreateMoimsResponse> =>
  getMoimList({ createdBy: userId }, TEAM_NAME).then(data =>
    data.map(item => ({
      ...item,
      joinedAt: item.dateTime, // 본인이 만든 날짜로 처리
      isCompleted: false,
      isReviewed: false,
    })),
  );
