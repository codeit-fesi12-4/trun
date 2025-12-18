import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TEAM_NAME } from "@/constants/env";
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
    queryFn: () => getMoimList(params),
    staleTime: 1000 * 60, // 1분
    enabled,
  });

// React Query 훅 - 모임 목록 무한 스크롤 조회
export const useMoimsInfiniteQuery = ({
  params,
  teamName = TEAM_NAME,
  enabled = true,
  pageSize = 8,
}: {
  params?: Omit<GetMoimsParams, "limit" | "offset">;
  teamName?: string;
  enabled?: boolean;
  pageSize?: number;
}) =>
  useInfiniteQuery({
    queryKey: ["moims", "infinite", teamName, params],
    queryFn: async ({ pageParam = 0 }) => {
      // 초기 페이지(offset 0)가 아닐 때만 딜레이 적용
      if (pageParam === 0) {
        // 초기 로드 시 딜레이 없이 바로 반환
        const result = await getMoimList({
          ...params,
          limit: pageSize,
          offset: pageParam,
        });
        return {
          data: result,
          nextOffset: result.length < pageSize ? undefined : pageParam + result.length,
        };
      }

      // 추가 페이지 로드 시 1-2초 딜레이 적용
      const [result] = await Promise.all([
        getMoimList({
          ...params,
          limit: pageSize,
          offset: pageParam,
        }),
        new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000)), // 1-2초 랜덤 딜레이
      ]);
      return {
        data: result,
        nextOffset: result.length < pageSize ? undefined : pageParam + result.length,
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
    onSuccess: () => {
      // "moims"로 시작하는 모든 쿼리 무효화 (infinite 쿼리 포함)
      void queryClient.invalidateQueries({ queryKey: ["moims"] });
      // 마이페이지의 생성한 모임 목록도 무효화
      void queryClient.invalidateQueries({ queryKey: ["mypage", "createdMoims"] });
    },
  });
};
