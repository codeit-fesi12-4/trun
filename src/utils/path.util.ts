import { GetMoimsParams } from "@/types/moim.type";
import { MoimFilterValues } from "@/types/moimFind.type";
import { GetCreatedMoimsParams, GetJoinedMoimsParams } from "@/types/mypage.type";
import { GetReviewsParams, GetReviewScoresParams, ReviewFilterValues } from "@/types/review.type";
import { formatDateWithDash } from "./date.util";

// 모임 필터(주소창 상태) query string — 최소 상태만, 기본값은 제외
export const buildMoimFiltersQueryString = (filters: MoimFilterValues) => {
  const searchParams = new URLSearchParams();

  const date = formatDateWithDash(filters.date);

  if (filters.category !== "MINDFULNESS") searchParams.append("type", filters.category);
  if (filters.location !== "지역 전체") searchParams.append("location", filters.location);
  if (date) searchParams.append("date", date);
  if (filters.sortBy !== "registrationEnd") searchParams.append("sortBy", filters.sortBy);

  return searchParams.toString();
};

// 모임 query string
export const buildMoimQueryString = (params?: GetMoimsParams) => {
  if (!params) return "";

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

  return queryString;
};

// 모임 path
export const buildMoimPath = (params?: GetMoimsParams) => {
  const queryString = buildMoimQueryString(params);
  return queryString ? `/gatherings?${queryString}` : "/gatherings";
};

// 리뷰 필터(주소창 상태) query string — 최소 상태만, 기본값은 제외
export const buildReviewFiltersQueryString = (filters: ReviewFilterValues) => {
  const searchParams = new URLSearchParams();

  // parseFilters("review")의 기본값과 반드시 일치해야 함
  if (filters.type !== "MINDFULNESS") searchParams.append("type", filters.type);
  if (filters.location !== "지역 전체") searchParams.append("location", filters.location);
  if (filters.sortBy !== "createdAt") searchParams.append("sortBy", filters.sortBy);
  if (filters.sortOrder !== "desc") searchParams.append("sortOrder", filters.sortOrder);

  return searchParams.toString();
};

// 리뷰 query string
export const buildReviewQueryString = (params: GetReviewsParams) => {
  const searchParams = new URLSearchParams();

  if (params.gatheringId !== undefined)
    searchParams.append("gatheringId", String(params.gatheringId));
  if (params.userId !== undefined) searchParams.append("userId", String(params.userId));
  if (params.type) searchParams.append("type", params.type);
  if (params.location && params.location !== "지역 전체")
    searchParams.append("location", params.location);
  if (params.date) searchParams.append("date", params.date);
  if (params.registrationEnd) searchParams.append("registrationEnd", params.registrationEnd);
  if (params.sortBy && params.sortBy !== "createdAt") searchParams.append("sortBy", params.sortBy);
  if (params.sortOrder) searchParams.append("sortOrder", params.sortOrder);
  if (params.limit !== undefined) searchParams.append("limit", String(params.limit));
  if (params.offset !== undefined) searchParams.append("offset", String(params.offset));

  const queryString = searchParams.toString();

  return queryString ? `${queryString}` : "";
};

// 리뷰 path
export const buildReviewPath = (params: GetReviewsParams) => {
  const queryString = buildReviewQueryString(params);
  return queryString ? `/reviews?${queryString}` : "/reviews";
};

// 리뷰 평점 query string
export const buildReviewScoreQueryString = (params: GetReviewScoresParams) => {
  const searchParams = new URLSearchParams();

  if (params.gatheringId !== undefined)
    searchParams.append("gatheringId", String(params.gatheringId));
  if (params.type) searchParams.append("type", params.type);

  const queryString = searchParams.toString();
  return queryString ? `${queryString}` : "";
};

// 리뷰 평점 path
export const buildReviewScorePath = (params: GetReviewScoresParams) => {
  const queryString = buildReviewScoreQueryString(params);
  return queryString ? `/reviews/scores?${queryString}` : "/reviews/scores";
};

// 참여 모임 query string
export const buildJoinedMoimQueryString = (params: GetJoinedMoimsParams) => {
  const searchParams = new URLSearchParams();

  searchParams.append("limit", String(params.limit));
  searchParams.append("offset", String(params.offset));
  searchParams.append("sortOrder", params.sortOrder ?? "desc");
  searchParams.append("sortBy", params.sortBy ?? "dateTime");

  if (params.completed !== undefined) {
    searchParams.append("completed", String(params.completed));
  }
  if (params.reviewed !== undefined) {
    searchParams.append("reviewed", String(params.reviewed));
  }

  return searchParams.toString();
};

// 참여한 모임 path
export const buildJoinedMoimPath = (params: GetJoinedMoimsParams) =>
  `/gatherings/joined?${buildJoinedMoimQueryString(params)}`;

// 내가 만든 모임 query string
export const buildCreatedMoimQueryString = (params: GetCreatedMoimsParams) => {
  const searchParams = new URLSearchParams();
  searchParams.append("limit", String(params.limit));
  searchParams.append("offset", String(params.offset));
  return searchParams.toString();
};

// 내가 만든 모임 path
export const buildCreatedMoimPath = (params: GetCreatedMoimsParams) =>
  `/gatherings/my?${buildCreatedMoimQueryString(params)}`;
