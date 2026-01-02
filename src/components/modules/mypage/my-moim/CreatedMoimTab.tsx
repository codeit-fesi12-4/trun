"use client";

import MyPageCard from "./MyPageMoimCard";
import MoimCardSkeleton from "./MoimCardSkeleton";
import { EmptyState } from "@/components/modules/mypage/EmptyState";
import { useCreatedMoimsInfinite } from "@/hooks/useMypageQuery";
import { useUserProfileQuery } from "@/hooks/useUserQuery";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { Spinner } from "@/components/ui/spinner";

const CreatedMoimTab = () => {
  const { data: user, isLoading: isUserLoading } = useUserProfileQuery();
  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage, isError } =
    useCreatedMoimsInfinite();

  const { loadMoreRef } = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    error: isError ? new Error("데이터 로드 실패") : null,
  });

  if (isUserLoading || isLoading)
    return (
      <div className="flex flex-col gap-6">
        {[1, 2, 3].map(i => (
          <MoimCardSkeleton key={i} />
        ))}
      </div>
    );

  if (isError || !user) {
    return (
      <div className="mt-6 text-center text-red-500">
        {isError
          ? "모임 목록을 불러오는데 실패했습니다. 다시 시도해주세요."
          : "로그인이 필요합니다."}
      </div>
    );
  }

  const allCreatedMoims = data?.pages.flat() ?? [];

  return (
    <div className="flex flex-col gap-6">
      {allCreatedMoims.length === 0 ? (
        <EmptyState text="아직 만든 모임이 없어요" />
      ) : (
        allCreatedMoims.map(item => (
          <MyPageCard key={item.id} item={item} showCancelButton={false} isCreatedMoimTab={true} />
        ))
      )}

      {/* 무한 스크롤 센티널 */}
      {hasNextPage && <div ref={loadMoreRef} className="h-0 w-full" aria-hidden />}

      {/* 로딩 스피너 */}
      {isFetchingNextPage && (
        <div className="mt-6 flex flex-col items-center justify-center gap-3 text-base text-gray-600">
          <Spinner className="size-7 text-green-500" />
          <span>모임을 불러오는 중...</span>
        </div>
      )}
    </div>
  );
};
export default CreatedMoimTab;
