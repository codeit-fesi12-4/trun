import { GetReviewsParams, GetReviewScoresParams } from "@/types/review.type";

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
export const buildReviewsPath = (params: GetReviewsParams) =>
  `/reviews?${buildReviewsQueryString(params)}`;

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
export const buildReviewScoresPath = (params: GetReviewScoresParams) =>
  `/reviews/scores?${buildReviewScoresQueryString(params)}`;
