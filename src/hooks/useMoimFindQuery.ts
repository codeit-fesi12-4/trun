import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TEAM_NAME } from "@/constants";
import { getMoimList, postMoim } from "@/api/moim.api";
import { CreateMoimRequest, GetMoimsParams } from "@/types/moim.type";

// React Query 훅 - 모임 목록 조회
export const useMoimsQuery = ({
  params,
  teamName = TEAM_NAME,
  enabled = true,
}: {
  params?: GetMoimsParams;
  teamName?: string;
  enabled?: boolean;
}) =>
  useQuery({
    queryKey: ["moims", teamName, params],
    queryFn: () => getMoimList(params, teamName),
    staleTime: 1000 * 60, // 1분
    enabled,
  });

// React Query Mutation 훅 - 모임 생성
export const useCreateMoimMutation = (teamName: string = TEAM_NAME) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateMoimRequest) => postMoim(payload, teamName),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["moims", teamName] });
    },
  });
};
