import { deleteReservation, getAvailableReviews, getMoimJoined } from "@/api/mypage.api";
import { getReviews, postReviews } from "@/api/review.api";
import { TEAM_NAME } from "@/constants/env";
import { useAuthStore } from "@/stores/auth.store";
import { WritableReviewItem, WrittenReviewItem } from "@/types/mypage.type";
import { PostReviewParams } from "@/types/review.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// 참여한 나의 모임 조회 훅
export const useJoinedMoims = () =>
  useQuery({
    queryKey: ["mypage", "joinedMoims"],
    queryFn: () => getMoimJoined(undefined, TEAM_NAME),
  });

// 예약 취소 훅
export const useCancelReservation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (moimId: number) => {
      const token = useAuthStore.getState().token;
      return deleteReservation(moimId, TEAM_NAME, token);
    },
    onSuccess: (_, moimId) => {
      toast.success("예약이 취소되었습니다.");

      // 마이페이지 참여 모임 목록 무효화
      void queryClient.invalidateQueries({ queryKey: ["mypage", "joinedMoims"] });
      // 상세 페이지 메인 데이터 무효화 (참여 상태, 인원 수 갱신)
      void queryClient.invalidateQueries({ queryKey: ["moim", TEAM_NAME, moimId] });
      // 상세 페이지 참여자 목록 무효화 (참여자 목록에서 사용자 제거)
      void queryClient.invalidateQueries({ queryKey: ["participants", TEAM_NAME, moimId] });
    },
    onError: error => {
      console.error("예약 취소 실패:", error);
      toast.error(error instanceof Error ? error.message : "예약 취소 중 오류가 발생했습니다.");
    },
  });
};

// 리뷰 등록 훅
export const useReviewMutation = (onSuccessCallback: (gatheringId: number) => void) => {
  const queryClient = useQueryClient();
  const token = useAuthStore(state => state.token);
  const joinedMoimsQueryKey = ["mypage", "joinedMoims"];

  return useMutation({
    mutationFn: (params: PostReviewParams) => {
      if (!token) throw new Error("로그인이 필요합니다.");
      return postReviews(params, token);
    },

    onSuccess: (_data, params) => {
      void queryClient.invalidateQueries({ queryKey: joinedMoimsQueryKey });
      onSuccessCallback(params.gatheringId);

      queryClient.setQueryData<WritableReviewItem[]>(["mypage", "joinedMoims"], old =>
        old?.map(item => (item.id === params.gatheringId ? { ...item, isReviewed: true } : item)),
      );

      toast.success("리뷰가 성공적으로 등록되었습니다.");
    },

    onError: error => {
      const message = error instanceof Error ? error.message : "리뷰 등록 중 알 수 없는 오류 발생";
      toast.error(message);
    },
  });
};

// 작성 가능한 리뷰 훅
export const useAvailableReviews = () =>
  useQuery<WritableReviewItem[]>({
    queryKey: ["mypage", "availableReviews"],
    queryFn: getAvailableReviews,
  });

// 작성한 리뷰 훅
export const useWrittenReviews = () => {
  const user = useAuthStore(state => state.user);

  return useQuery<{ data: WrittenReviewItem[] }, Error>({
    queryKey: ["mypage", "writtenReviews", user?.id],
    queryFn: () => getReviews({ userId: user?.id }),
    enabled: !!user?.id, // user가 있을 때만 실행
  });
};
