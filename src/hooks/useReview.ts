import { getMoimReviews, getReviews, getReviewScores } from "@/api";
import { TEAM_NAME } from "@/constants";
import { GetReviewsParams, ReviewScore, ReviewScoresParams } from "@/types/review.type";
import { useQuery } from "@tanstack/react-query";

// 모든 리뷰 가져오기
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

// 모임별 리뷰 가져오기
export const useMoimReviews = ({
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
    queryFn: () => getMoimReviews({ moimId, teamName, limit, offset }),
    staleTime: 1000 * 60,
    enabled,
  });

// 리뷰 평점 가져오기
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
