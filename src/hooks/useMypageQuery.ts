import { deleteReservation, getCreatedMoims, getMoimJoined } from "@/api/mypage.api";
import { deleteReview, getReviews, postReviews, putReviewEdit } from "@/api/review.api";
import { WritableReviewItem } from "@/types/mypage.type";
import { PostReviewParams, PutReviewParams, ReviewItem } from "@/types/review.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useUserProfileQuery } from "./useUserQuery";
import { sortMyMoims } from "@/utils/mypage.util";

// 참여한 나의 모임 조회
export const useJoinedMoims = () => {
  const { data: user } = useUserProfileQuery();
  const userId = user?.id;

  return useQuery({
    queryKey: ["mypage", "joinedMoims", userId],
    queryFn: getMoimJoined,
    select: res => {
      const data = res.ok ? res.data : [];
      return [...data].sort(sortMyMoims);
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

      void queryClient.invalidateQueries({ queryKey: ["mypage", "joinedMoims", userId] });
      void queryClient.invalidateQueries({ queryKey: ["moim", moimId] });
      void queryClient.invalidateQueries({ queryKey: ["participants", moimId] });
    },
  });
};

// 내가 만든 모임 조회
export const useCreatedMoims = () =>
  useQuery({
    queryKey: ["mypage", "createdMoims"],
    queryFn: async () => {
      const res = await getCreatedMoims();
      const data = res.ok ? res.data : [];
      return [...data].sort(sortMyMoims);
    },
  });

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
  const { data: joinedMoims, isLoading, isError } = useJoinedMoims();

  // joinedMoims 데이터가 변경되면 이 변수도 즉시 자동으로 계산
  const availableReviews: WritableReviewItem[] = joinedMoims
    ? joinedMoims
        .filter(item => item.isCompleted && !item.isReviewed && !item.canceledAt)
        .map(item => ({
          ...item,
          gatheringId: item.id,
          score: 0,
        }))
    : [];

  // useQuery와 같은 인터페이스를 유지하기 위해 객체로 반환
  return {
    data: availableReviews,
    isLoading,
    isError,
  };
};

// 작성한 리뷰
export const useWrittenReviews = () => {
  const { data: user } = useUserProfileQuery();
  const userId = user?.id;

  return useQuery<ReviewItem[]>({
    queryKey: ["mypage", "writtenReviews", userId],
    queryFn: async () => {
      if (!userId) return [];
      const res = await getReviews({ userId });
      if (!res.ok) throw new Error("리뷰 가져오기 실패");

      return res.data.data;
    },
    select: data =>
      // 작성일 기준 최신순 정렬
      [...data].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
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
