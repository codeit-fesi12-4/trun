import { deleteReservation, getCreatedMoims, getMoimJoined } from "@/api/mypage.api";
import { getReviews, postReviews } from "@/api/review.api";
import { WritableReviewItem } from "@/types/mypage.type";
import { PostReviewParams, ReviewItem } from "@/types/review.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useUserProfileQuery } from "./useUserQuery";

// 참여한 나의 모임 조회
export const useJoinedMoims = () =>
  useQuery({
    queryKey: ["mypage", "joinedMoims"],
    queryFn: getMoimJoined,
    select: res => (res.ok ? res.data : []),
  });

// 예약 취소
export const useCancelReservation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (moimId: number) => deleteReservation(moimId),
    onSuccess: (_, moimId) => {
      toast.success("예약이 취소되었습니다.");

      void queryClient.invalidateQueries({ queryKey: ["mypage", "joinedMoims"] });
      void queryClient.invalidateQueries({ queryKey: ["moim", moimId] });
      void queryClient.invalidateQueries({ queryKey: ["participants", moimId] });
    },
    onError: error => {
      console.error("예약 취소 실패:", error);
      toast.error(error instanceof Error ? error.message : "예약 취소 중 오류가 발생했습니다.");
    },
  });
};

// 작성 가능한 리뷰
export const useAvailableReviews = () => {
  const { data: joinedMoims } = useJoinedMoims();

  return useQuery<WritableReviewItem[]>({
    queryKey: ["mypage", "availableReviews"],
    queryFn: async () => {
      if (!joinedMoims) return [];
      // 참여 모임 데이터를 기반으로 작성 가능한 리뷰만 필터링
      return joinedMoims
        .filter(item => item.isCompleted && !item.isReviewed && !item.canceledAt)
        .map(item => ({
          ...item,
          gatheringId: item.id,
          score: 0,
        }));
    },
    enabled: !!joinedMoims, // 참여 모임 데이터가 있을 때만 실행
    staleTime: 60_000, // 1분 캐싱
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
    onSuccess: (_, params) => {
      // 작성 가능한 리뷰에서 제거
      queryClient.setQueryData<WritableReviewItem[]>(["mypage", "availableReviews"], old =>
        Array.isArray(old) ? old.filter(item => item.id !== params.gatheringId) : [],
      );

      // 참여한 모임(joinedMoims) 상태 업데이트
      queryClient.setQueryData<WritableReviewItem[]>(["mypage", "joinedMoims"], old =>
        Array.isArray(old)
          ? old.map(item => (item.id === params.gatheringId ? { ...item, isReviewed: true } : item))
          : [],
      );

      // 작성한 리뷰 목록 새로고침
      void queryClient.invalidateQueries({ queryKey: ["mypage", "writtenReviews"] });

      // 모달 닫기
      onCloseModal();

      // 알림
      toast.success("리뷰가 성공적으로 등록되었습니다.");
    },
    onError: error => {
      const message = error instanceof Error ? error.message : "리뷰 등록 중 오류 발생";
      toast.error(message);
    },
  });
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
    enabled: !!userId,
  });
};

// 내가 만든 모임
export const useCreatedMoims = (userId?: number) =>
  useQuery({
    queryKey: ["mypage", "createdMoims", userId],
    queryFn: () => getCreatedMoims(userId ?? 0),
    enabled: !!userId,
  });
