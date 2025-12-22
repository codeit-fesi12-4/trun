import { API_BASE_URL, TEAM_NAME } from "@/constants/env";
import { apiFetch } from "@/lib/apiClient";
import { GetMoimReviewsResponse } from "@/types/moimReview.type";
import {
  GetReviewScoresResponse,
  GetReviewsParams,
  GetReviewsResponse,
  PostReviewParams,
  GetReviewScoresParams,
} from "@/types/review.type";
import { buildReviewScoresPath, buildReviewsPath } from "@/utils/path.util";

// 모든 리뷰 가져오기
export const getReviews = (params: GetReviewsParams) =>
  apiFetch<GetReviewsResponse>(`/api/proxy${buildReviewsPath(params)}`, {
    method: "GET",
  });

// 모임별 리뷰 가져오기
export const getMoimReviews = (params: GetReviewsParams) =>
  apiFetch<GetMoimReviewsResponse>(`/api/proxy${buildReviewsPath(params)}`, {
    method: "GET",
  });

// 리뷰 평점 가져오기
export const getReviewScores = (params: GetReviewScoresParams) =>
  apiFetch<GetReviewScoresResponse>(`/api/proxy${buildReviewScoresPath(params)}`, {
    method: "GET",
  });

// 리뷰 추가
export const postReviews = async (
  { gatheringId, score, comment }: PostReviewParams,
  token: string,
) => {
  if (!token) {
    throw new Error("로그인이 필요합니다.");
  }

  try {
    const response = await fetch(`${API_BASE_URL}${TEAM_NAME}/reviews`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        gatheringId,
        score,
        comment,
      }),
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message ?? "리뷰 작성에 실패했습니다.");
    }

    return result;
  } catch (error) {
    console.error("리뷰 작성 오류:", error);
    throw error;
  }
};
