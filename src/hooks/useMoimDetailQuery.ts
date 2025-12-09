import { deleteJoin, getMoim, getParticipants, postJoin, putMoim } from "@/api/moimDetail.api";
import { TEAM_NAME } from "@/constants";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// 모임 상세 정보 가져오기
export const useMoimQuery = ({
  teamName = TEAM_NAME,
  moimId,
  enabled = true,
}: {
  teamName?: string;
  moimId: number;
  enabled?: boolean;
}) =>
  useQuery({
    queryKey: ["moim", teamName, moimId],
    queryFn: () => getMoim(moimId, teamName),
    staleTime: 1000 * 60,
    enabled,
  });

// 참여자 정보 가져오기
export const useParticipantsQuery = ({
  teamName = TEAM_NAME,
  moimId,
  enabled = true,
}: {
  teamName?: string;
  moimId: number;
  enabled?: boolean;
}) =>
  useQuery({
    queryKey: ["participants", teamName, moimId],
    queryFn: () => getParticipants(moimId, teamName),
    staleTime: 1000 * 60,
    enabled,
  });

// 모임 참여하기
export const useCreateJoinMutaiton = (teamName: string = TEAM_NAME) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (moimId: number) => {
      const token = localStorage.getItem("token");
      return postJoin(moimId, teamName, token);
    },
    onSuccess: (_, moimId) => {
      void queryClient.invalidateQueries({ queryKey: ["moim", teamName, moimId] });
      void queryClient.invalidateQueries({ queryKey: ["participants", teamName, moimId] });
    },

    onError: err => {
      console.error("모임 참여 실패:", err);
    },
  });
};

// 모임 취소하기 (방장)
export const useCancelMoimMutation = (teamName: string = TEAM_NAME) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (moimId: number) => {
      const token = localStorage.getItem("token");
      return putMoim(moimId, teamName, token);
    },
    onSuccess: (_, moimId) => {
      void queryClient.invalidateQueries({ queryKey: ["moim", teamName, moimId] });
      void queryClient.invalidateQueries({ queryKey: ["participants", teamName, moimId] });
    },

    onError: err => {
      console.error("모임 취소 실패:", err);
    },
  });
};

// 모임 참여 취소하기 (참여자)
export const useCancelJoinMutaion = (teamName: string = TEAM_NAME) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (moimId: number) => {
      const token = localStorage.getItem("token");
      return deleteJoin(moimId, teamName, token);
    },
    onSuccess: (_, moimId) => {
      void queryClient.invalidateQueries({ queryKey: ["moim", teamName, moimId] });
      void queryClient.invalidateQueries({ queryKey: ["participants", teamName, moimId] });
    },

    onError: err => {
      console.error("모임 참여 취소 실패:", err);
    },
  });
};
