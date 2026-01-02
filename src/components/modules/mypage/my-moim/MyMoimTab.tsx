"use client";

import { useState } from "react";
import MyPageMoimCard from "./MyPageMoimCard";
import MoimCardSkeleton from "./MoimCardSkeleton";
import { useCancelReservation, useJoinedMoimsInfinite } from "@/hooks/useMypageQuery"; // Infinite 훅만 사용
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll"; // 팀원분이 만든 훅 추가
import ModalLayout from "@/components/layouts/ModalLayout";
import { EmptyState } from "@/components/modules/mypage/EmptyState";
import { Spinner } from "@/components/ui/spinner";

const MyMoimTab = () => {
  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage, isError } =
    useJoinedMoimsInfinite();

  const cancelJoinMutation = useCancelReservation();

  const { loadMoreRef } = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    error: isError ? new Error("모임 목록을 불러오는데 실패했습니다.") : null,
  });

  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [selectedCancelId, setSelectedCancelId] = useState<number | null>(null);

  const handleCancelClick = (id: number) => {
    setSelectedCancelId(id);
    setIsCancelModalOpen(true);
  };

  if (isLoading)
    return (
      <div className="flex flex-col gap-6">
        {[1, 2, 3].map(i => (
          <MoimCardSkeleton key={i} />
        ))}
      </div>
    );

  if (isError)
    return (
      <div className="mt-6 text-center text-red-500">모임 목록을 불러오는데 실패했습니다.</div>
    );

  const allMoims = data?.pages.flat() ?? [];

  return (
    <div className="flex flex-col gap-6">
      {allMoims.length === 0 ? (
        <EmptyState text="신청한 모임이 아직 없어요" />
      ) : (
        allMoims.map(item => (
          <MyPageMoimCard
            key={item.id}
            item={item}
            showCancelButton={!item.isCompleted}
            onCancelClick={() => handleCancelClick(item.id)}
          />
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

      {/* 예약 취소 모달 */}
      {isCancelModalOpen && selectedCancelId && (
        <ModalLayout
          open={isCancelModalOpen}
          onOpenChange={setIsCancelModalOpen}
          title="예약 취소"
          onConfirm={() => {
            cancelJoinMutation.mutate(selectedCancelId, {
              onSuccess: () => {
                setIsCancelModalOpen(false);
                setSelectedCancelId(null);
              },
            });
          }}
          onCancel={() => {
            setIsCancelModalOpen(false);
            setSelectedCancelId(null);
          }}
          confirmText="확인"
          showCancel
        >
          <h2 className="flex items-center justify-center py-3 text-base font-medium">
            예약을 취소하시겠습니까?
          </h2>
        </ModalLayout>
      )}
    </div>
  );
};

export default MyMoimTab;
