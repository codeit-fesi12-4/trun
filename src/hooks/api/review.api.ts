import { useQuery } from "@tanstack/react-query";

import { TEAM_NAME } from "@/constants";
import { apiFetch } from "@/lib/apiClient";
import {
  GetReviewsParams,
  GetReviewsResponse,
  ReviewScore,
  ReviewScoresParams,
  ReviewScoresResponse,
} from "@/types/review.type";

const buildReviewsPath = (params: GetReviewsParams) => {
  const { teamId, ...rest } = params;
  const basePath = `/${teamId && TEAM_NAME}/reviews`;
  const searchParams = new URLSearchParams();

  if (rest.gatheringId !== undefined) searchParams.append("gatheringId", String(rest.gatheringId));
  if (rest.userId !== undefined) searchParams.append("userId", String(rest.userId));
  if (rest.type) searchParams.append("type", rest.type);
  if (rest.location) searchParams.append("location", rest.location);
  if (rest.date) searchParams.append("date", rest.date);
  if (rest.registrationEnd) searchParams.append("registrationEnd", rest.registrationEnd);
  if (rest.sortBy) searchParams.append("sortBy", rest.sortBy);
  if (rest.sortOrder) searchParams.append("sortOrder", rest.sortOrder);
  if (rest.limit !== undefined) searchParams.append("limit", String(rest.limit));
  if (rest.offset !== undefined) searchParams.append("offset", String(rest.offset));

  const queryString = searchParams.toString();
  return queryString ? `${basePath}?${queryString}` : basePath;
};

export const getReviews = (params: GetReviewsParams) =>
  apiFetch<GetReviewsResponse>({
    path: buildReviewsPath(params),
    method: "GET",
  });

export const useReviewsQuery = ({
  params,
  enabled = true,
}: {
  params: GetReviewsParams;
  enabled?: boolean;
}) =>
  useQuery({
    queryKey: ["reviews", params],
    queryFn: () => getReviews(params),
    enabled,
  });

const buildReviewScoresPath = (params: ReviewScoresParams) => {
  const { teamId, ...rest } = params;
  const basePath = `/${teamId && TEAM_NAME}/reviews/scores`;
  const searchParams = new URLSearchParams();

  if (rest.gatheringId !== undefined) searchParams.append("gatheringId", String(rest.gatheringId));
  if (rest.type) searchParams.append("type", rest.type);

  const queryString = searchParams.toString();
  return queryString ? `${basePath}?${queryString}` : basePath;
};

export const getReviewScores = (params: ReviewScoresParams) =>
  apiFetch<ReviewScoresResponse>({
    path: buildReviewScoresPath(params),
    method: "GET",
  });

export const useReviewScoresQuery = ({
  params,
  enabled = true,
}: {
  params: ReviewScoresParams;
  enabled?: boolean;
}) =>
  useQuery<ReviewScore | null>({
    queryKey: ["reviewScores", params],
    queryFn: async () => {
      const res = await getReviewScores(params);
      if (Array.isArray(res) && res.length > 0) return res[0];
      return null;
    },
    enabled,
  });
