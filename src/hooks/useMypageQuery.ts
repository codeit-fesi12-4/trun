import { deleteReservation, getMoimJoined } from "@/api/mypageMoim.api";
import { TEAM_NAME } from "@/constants";
import { useAuthStore } from "@/stores/auth.store";
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
