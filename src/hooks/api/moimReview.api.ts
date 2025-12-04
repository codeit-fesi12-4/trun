import { useQuery } from "@tanstack/react-query";

import { API_BASE_URL, TEAM_NAME } from "@/constants";
import { GetMoimReviewResponse } from "@/types/moimReview.type";

// 모입별 리뷰 목록 조회
export const getMoimReview = async ({
  moimId,
  teamName = TEAM_NAME,
  limit,
  offset,
}: {
  moimId: number;
  teamName: string;
  limit: number;
  offset: number;
}): Promise<GetMoimReviewResponse> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}${teamName}/reviews?gatheringId=${moimId}&limit=${limit}&offset=${offset}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error("리뷰 조회 실패");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const useMoimReview = ({
  teamName = TEAM_NAME,
  moimId,
  limit,
  offset,
  enabled = true,
}: {
  teamName?: string;
  moimId: number;
  limit: number;
  offset: number;
  enabled?: boolean;
}) =>
  useQuery({
    queryKey: ["moimReview", teamName, moimId, limit, offset],
    queryFn: () => getMoimReview({ moimId, teamName, limit, offset }),
    staleTime: 1000 * 60,
    enabled,
  });
