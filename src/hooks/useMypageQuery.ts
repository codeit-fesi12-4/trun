import { deleteReservation, getCreatedMoims, getMoimJoined } from "@/api/mypage.api";
import { deleteReview, getReviews, postReviews, putReviewEdit } from "@/api/review.api";
import { GetJoinedMoimsParams, WritableReviewItem } from "@/types/mypage.type";
import {
  PostReviewParams,
  PutReviewParams,
  ReviewSortBy,
  ReviewSortOrder,
} from "@/types/review.type";
import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useUserProfileQuery } from "./useUserQuery";

// 참여한 나의 모임 조회
export const useJoinedMoimsInfinite = (
  params: Omit<GetJoinedMoimsParams, "limit" | "offset"> = { sortOrder: "desc" },
) => {
  const { data: user } = useUserProfileQuery();
  const userId = user?.id;
  const LIMIT = 10;

  return useInfiniteQuery({
    queryKey: ["mypage", "joinedMoims", "infinite", userId, params],
    queryFn: async ({ pageParam = 0 }) => {
      await new Promise(resolve => setTimeout(resolve, 8000));
      const res = await getMoimJoined({
        ...params,
        limit: LIMIT,
        offset: pageParam,
      });
      if (!res.ok) {
        toast.error(res.message);
        throw new Error(res.message);
      }
      return res.data;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < LIMIT) return undefined;
      return allPages.length * LIMIT;
    },
    enabled: !!userId,
  });
};

// 예약 취소
export const useCancelReservation = () => {
  const queryClient = useQueryClient();
  const { data: user } = useUserProfileQuery();
  const userId = user?.id;

  return useMutation({
    mutationFn: (moimId: number) => deleteReservation(moimId),
    onSuccess: (_, moimId) => {
      toast.success("예약이 취소되었습니다.");

      void queryClient.invalidateQueries({
        queryKey: ["mypage", "joinedMoims", "infinite", userId],
      });
      void queryClient.invalidateQueries({ queryKey: ["moim", moimId] });
      void queryClient.invalidateQueries({ queryKey: ["participants", moimId] });
    },
  });
};

// 내가 만든 모임 조회
export const useCreatedMoimsInfinite = () => {
  const { data: user } = useUserProfileQuery();
  const userId = user?.id;
  const LIMIT = 10;

  return useInfiniteQuery({
    queryKey: ["mypage", "createdMoims", "infinite", userId],
    queryFn: async ({ pageParam = 0 }) => {
      const res = await getCreatedMoims({
        limit: LIMIT,
        offset: pageParam,
      });
      if (!res.ok) {
        toast.error(res.message);
        throw new Error(res.message);
      }
      return res.data;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < LIMIT) return undefined;
      return allPages.length * LIMIT;
    },
    enabled: !!userId,
  });
};

// 리뷰 등록
export const useReviewMutation = (onCloseModal: () => void) => {
  const queryClient = useQueryClient();
  const { data: user } = useUserProfileQuery();
  const userId = user?.id;

  return useMutation({
    mutationFn: (params: PostReviewParams) => {
      if (!userId) throw new Error("로그인이 필요합니다.");
      return postReviews(params);
    },
    onSuccess: () => {
      if (!userId) return;

      void queryClient.invalidateQueries({ queryKey: ["mypage"] });

      onCloseModal();
      toast.success("리뷰가 성공적으로 등록되었습니다.");
    },
  });
};

// 작성 가능한 리뷰
export const useAvailableReviews = () => {
  const { data: joinedData, ...rest } = useJoinedMoimsInfinite({
    sortOrder: "desc",
    completed: true,
    reviewed: false,
  });

  const availableReviews: WritableReviewItem[] = joinedData
    ? joinedData.pages
        .flat()
        .filter(item => {
          // 취소된 모임 제외
          if (item.canceledAt) return false;

          if (item.isReviewed) return false;
          // 2. 마감 날짜(registrationEnd)가 현재 시간보다 과거인 경우만 포함
          const now = new Date();
          const registrationEnd = new Date(item.registrationEnd);
          return registrationEnd < now;
        })
        .map(item => ({
          ...item,
          gatheringId: item.id, // 전송 시 필요한 ID 매핑
          score: 0, // 초기 별점 값
        }))
    : [];

  // useQuery와 같은 인터페이스를 유지하기 위해 객체로 반환
  return {
    ...rest,
    data: availableReviews,
  };
};

// 작성한 리뷰
export const useWrittenReviewsInfinite = (
  sortBy: ReviewSortBy = "createdAt",
  sortOrder: ReviewSortOrder = "desc",
) => {
  const { data: user } = useUserProfileQuery();
  const userId = user?.id;
  const LIMIT = 10;

  return useInfiniteQuery({
    queryKey: ["mypage", "writtenReviews", "infinite", userId, sortBy, sortOrder],
    queryFn: async ({ pageParam = 0 }) => {
      if (!userId) return [];
      const res = await getReviews({
        userId,
        limit: LIMIT,
        offset: pageParam,
        sortBy,
        sortOrder,
      });

      if (!res.ok) {
        toast.error(res.message);
        throw new Error(res.message);
      }
      return res.data.data ?? [];
    },

    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (!Array.isArray(lastPage) || lastPage.length < LIMIT) return undefined;
      return allPages.length * LIMIT;
    },
    enabled: !!userId,
  });
};

//리뷰 수정
export const useReviewEditMutation = (onCloseModal: () => void) => {
  const queryClient = useQueryClient();
  const { data: user } = useUserProfileQuery();
  const userId = user?.id;

  return useMutation({
    mutationFn: ({ reviewId, params }: { reviewId: number; params: PutReviewParams }) =>
      putReviewEdit(reviewId, params),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["mypage", "writtenReviews", userId] });
      onCloseModal();
      toast.success("리뷰가 수정되었습니다.");
    },
  });
};

// 리뷰 삭제 훅
export const useReviewDeleteMutation = () => {
  const queryClient = useQueryClient();
  const { data: user } = useUserProfileQuery();
  const userId = user?.id;

  return useMutation({
    mutationFn: ({ reviewId }: { reviewId: number }) => deleteReview(reviewId),
    onSuccess: () => {
      if (!userId) return;

      void queryClient.invalidateQueries({ queryKey: ["mypage"] });
      toast.success("리뷰가 삭제되었습니다.");
    },
  });
};
