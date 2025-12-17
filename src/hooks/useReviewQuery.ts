import { getMoimReviews, getReviews, getReviewScores } from "@/api/review.api";
import { REVIEW_PAGE_SIZE } from "@/constants/pageSize";
import { GetReviewScoresParams, GetReviewsParams, ReviewScore } from "@/types/review.type";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

// 모든 리뷰 가져오기
export const useAllReviewQuery = (params: GetReviewsParams) =>
  useInfiniteQuery({
    queryKey: ["reviews", params.type, params.location, params.sortBy, params.limit],
    queryFn: async ({ pageParam = 0 }) => {
      const result = await getReviews({ ...params, offset: pageParam });
      return result;
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
export const useMoimReviewsQuery = (params: GetReviewsParams) =>
  useQuery({
    queryKey: ["moimReview", params.gatheringId, params.limit, params.offset],
    queryFn: () => getMoimReviews({ ...params }),
    staleTime: 1000 * 60,
  });

// 리뷰 평점 가져오기
export const useReviewScoresQuery = ({
  params,
  enabled = true,
}: {
  params: GetReviewScoresParams;
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
