import { apiFetch } from "@/lib/apiClient";
import { GetMoimReviewsResponse } from "@/types/moimReview.type";
import {
  GetReviewScoresResponse,
  GetReviewsParams,
  GetReviewsResponse,
  GetReviewScoresParams,
  PostReviewParams,
  PutReviewParams,
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
export const postReviews = (params: PostReviewParams) =>
  apiFetch("/api/proxy/reviews", {
    method: "POST",
    body: JSON.stringify(params),
  });

// 리뷰 수정
export const putReviewEdit = (reviewId: number, params: PutReviewParams) =>
  apiFetch(`/api/proxy/reviews/${reviewId}`, {
    method: "PUT",
    body: JSON.stringify(params),
  });

// 리뷰 삭제
export const deleteReview = (reviewId: number) =>
  apiFetch(`/api/proxy/reviews/${reviewId}`, {
    method: "DELETE",
  });
