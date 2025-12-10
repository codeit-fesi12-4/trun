import { getMoimReviews, getReviews, getReviewScores } from "@/api/review.api";
import { TEAM_NAME } from "@/constants";
import { REVIEW_PAGE_SIZE } from "@/constants/pageSize";
import { GetReviewsParams, ReviewScore, ReviewScoresParams } from "@/types/review.type";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

// 모든 리뷰 가져오기
export const useAllReviewQuery = (params: GetReviewsParams) =>
  useInfiniteQuery({
    queryKey: ["reviews", params.teamId, params.type, params.location, params.sortBy, params.limit],
    queryFn: async ({ pageParam = 0 }) => {
      const res = await getReviews({ ...params, offset: pageParam });

      if (Array.isArray(res)) {
        return {
          data: res,
          totalItemCount: res.length,
        };
      }
      return res;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      const pageSize = params.limit ?? REVIEW_PAGE_SIZE.SCROLL;
      const lastCount = lastPage?.data?.length ?? 0;

      if (lastCount < pageSize) return undefined;

      return pages.reduce((sum, p) => sum + (p?.data?.length ?? 0), 0);
    },
  });

// 모임별 리뷰 가져오기
export const useMoimReviewsQuery = ({
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
