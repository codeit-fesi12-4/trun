import { GetMoimsParams } from "@/types/moim.type";
import { GetCreatedMoimsParams, GetJoinedMoimsParams } from "@/types/mypage.type";
import { GetReviewsParams, GetReviewScoresParams } from "@/types/review.type";

// 모임 query string
export const buildMoimsQueryString = (params?: GetMoimsParams) => {
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
export const buildMoimsPath = (params?: GetMoimsParams) => {
  const queryString = buildMoimsQueryString(params);
  return queryString ? `/gatherings?${queryString}` : "/gatherings";
};

// 리뷰 query string
export const buildReviewsQueryString = (params: GetReviewsParams) => {
  const searchParams = new URLSearchParams();

  if (params.gatheringId !== undefined)
    searchParams.append("gatheringId", String(params.gatheringId));
  if (params.userId !== undefined) searchParams.append("userId", String(params.userId));
  if (params.type) searchParams.append("type", params.type);
  if (params.location && params.location !== "지역 전체")
    searchParams.append("location", params.location);
  if (params.date) searchParams.append("date", params.date);
  if (params.registrationEnd) searchParams.append("registrationEnd", params.registrationEnd);
  if (params.sortBy) searchParams.append("sortBy", params.sortBy);
  if (params.sortBy) searchParams.append("sortOrder", "desc");
  if (params.limit !== undefined) searchParams.append("limit", String(params.limit));
  if (params.offset !== undefined) searchParams.append("offset", String(params.offset));

  const queryString = searchParams.toString();

  return queryString ? `${queryString}` : "";
};

// 리뷰 path
export const buildReviewsPath = (params: GetReviewsParams) => {
  const queryString = buildReviewsQueryString(params);
  return queryString ? `/reviews?${queryString}` : "/reviews";
};

// 리뷰 평점 query string
export const buildReviewScoresQueryString = (params: GetReviewScoresParams) => {
  const searchParams = new URLSearchParams();

  if (params.gatheringId !== undefined)
    searchParams.append("gatheringId", String(params.gatheringId));
  if (params.type) searchParams.append("type", params.type);

  const queryString = searchParams.toString();
  return queryString ? `${queryString}` : "";
};

// 리뷰 평점 path
export const buildReviewScoresPath = (params: GetReviewScoresParams) => {
  const queryString = buildReviewScoresQueryString(params);
  return queryString ? `/reviews/scores?${queryString}` : "/reviews/scores";
};

// 참여 모임 query string
export const buildJoinedMoimsQueryString = (params: GetJoinedMoimsParams) => {
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
export const buildJoinedMoimsPath = (params: GetJoinedMoimsParams) =>
  `/gatherings/joined?${buildJoinedMoimsQueryString(params)}`;

// 내가 만든 모임 query string
export const buildCreatedMoimsQueryString = (params: GetCreatedMoimsParams) => {
  const searchParams = new URLSearchParams();
  searchParams.append("limit", String(params.limit));
  searchParams.append("offset", String(params.offset));
  return searchParams.toString();
};

// 내가 만든 모임 path
export const buildCreatedMoimsPath = (params: GetCreatedMoimsParams) =>
  `/gatherings/my?${buildCreatedMoimsQueryString(params)}`;
