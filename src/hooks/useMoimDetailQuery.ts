"use client";

import { deleteJoin, getMoim, getParticipants, postJoin, putMoim } from "@/api/moimDetail.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// 모임 상세 정보 가져오기
export const useMoimQuery = (moimId: number) =>
  useQuery({
    queryKey: ["moim", moimId],
    queryFn: () => getMoim(moimId),
    select: res => (res.ok ? res.data : undefined),
    staleTime: 1000 * 60,
  });

// 참여자 정보 가져오기
export const useParticipantsQuery = (moimId: number) =>
  useQuery({
    queryKey: ["participants", moimId],
    queryFn: () => getParticipants(moimId),
    select: res => (res.ok ? res.data : undefined),
    staleTime: 1000 * 60,
  });

// 모임 참여하기
export const useCreateJoinMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (moimId: number) => postJoin(moimId),
    onSuccess: (data, moimId) => {
      if (!data.ok) {
        toast.error(data.message);
        return;
      }
      if (data.data.message) {
        toast.success(data.data.message);
      }
      void queryClient.invalidateQueries({ queryKey: ["moim", moimId] });
      void queryClient.invalidateQueries({ queryKey: ["participants", moimId] });
    },
  });
};

// 모임 참여 취소하기 (참여자)
export const useCancelJoinMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (moimId: number) => deleteJoin(moimId),
    onSuccess: (data, moimId) => {
      if (!data.ok) {
        toast.error(data.message);
        return;
      }
      if (data.data.message) {
        toast.success(data.data.message);
      }
      void queryClient.invalidateQueries({ queryKey: ["moim", moimId] });
      void queryClient.invalidateQueries({ queryKey: ["participants", moimId] });
    },
  });
};

// 모임 취소하기 (방장)
export const useCancelMoimMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: (moimId: number) => putMoim(moimId),
    onSuccess: (data, moimId) => {
      if (!data.ok) {
        toast.error(data.message);
        return;
      }
      toast.success("모임이 취소되었습니다.");
      void queryClient.invalidateQueries({ queryKey: ["moim", moimId] });
      void queryClient.invalidateQueries({ queryKey: ["participants", moimId] });
      void queryClient.invalidateQueries({ queryKey: ["moims"] });
      void router.replace("/moim-find");
    },
  });
};
