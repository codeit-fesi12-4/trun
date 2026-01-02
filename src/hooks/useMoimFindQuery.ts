import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMoimList, postMoim } from "@/api/moim.api";
import { CreateMoimRequest, GetMoimsParams, GetMoimsResponse } from "@/types/moim.type";
import { toast } from "sonner";

// React Query 훅 - 모임 목록 조회
export const useMoimsQuery = ({
  params,
  enabled = true,
}: {
  params?: GetMoimsParams;
  enabled?: boolean;
}) =>
  useQuery({
    queryKey: ["moims", params],
    queryFn: () => getMoimList(params),
    select: res => {
      const response = res as { ok?: boolean; data?: GetMoimsResponse };
      return response.ok ? response.data : undefined;
    },
    staleTime: 1000 * 60, // 1분
    enabled,
  });

// React Query 훅 - 모임 목록 무한 스크롤 조회
export const useMoimsInfiniteQuery = ({
  params,
  enabled = true,
  pageSize = 8,
}: {
  params?: Omit<GetMoimsParams, "limit" | "offset">;
  enabled?: boolean;
  pageSize?: number;
}) =>
  useInfiniteQuery({
    queryKey: ["moims", "infinite", params],
    queryFn: async ({ pageParam = 0 }) => {
      const result = await getMoimList({
        ...params,
        limit: pageSize,
        offset: pageParam,
      });
      const response = result as { ok?: boolean; data?: GetMoimsResponse };
      const data = response.ok ? (response.data ?? []) : [];
      return {
        data,
        nextOffset: data.length < pageSize ? undefined : pageParam + data.length,
      };
    },
    initialPageParam: 0,
    getNextPageParam: lastPage => lastPage.nextOffset,
    staleTime: 1000 * 60, // 1분
    enabled,
  });

// React Query Mutation 훅 - 모임 생성
export const useCreateMoimMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateMoimRequest) => postMoim(payload),
    onSuccess: data => {
      const response = data as { ok?: boolean; data?: unknown; message?: string };
      if (response.ok === false) {
        toast.error(response.message ?? "모임 생성에 실패했습니다.");
        return;
      }

      toast.success("모임이 성공적으로 생성되었습니다.");
      // "moims"로 시작하는 모든 쿼리 무효화 (infinite 쿼리 포함)
      void queryClient.invalidateQueries({ queryKey: ["moims"] });
      // 마이페이지의 생성한 모임 목록도 무효화
      void queryClient.invalidateQueries({ queryKey: ["mypage", "createdMoims"] });
    },
  });
};
