"use client";

import { useState } from "react";
import Image from "next/image";
import { EmptyState } from "@/components/modules/mypage/EmptyState";
import ReviewWritableSkeleton from "./ReviewWritableSkeleton";
import { useAvailableReviews } from "@/hooks/useMypageQuery";
import { WritableReviewItem } from "@/types/mypage.type";
import { formatDateTime } from "@/utils/mypage.util";
import FavoriteButton from "@/components/common/FavoriteButton";
import { ReviewModal } from "@/components/modules/mypage/mypage-modal/ReviewModal";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { Spinner } from "@/components/ui/spinner";

const ReviewWritableCategory = () => {
  const [selectedReviewItem, setSelectedReviewItem] = useState<WritableReviewItem | null>(null);
  const {
    data: items = [],
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useAvailableReviews();

  const { loadMoreRef } = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    error: isError ? new Error("모임 목록을 불러오는데 실패했습니다.") : null,
  });

  const handleModalChange = (isOpen: boolean) => {
    if (!isOpen) {
      setSelectedReviewItem(null);
    }
  };

  const handleReviewClick = (item: WritableReviewItem) => {
    setSelectedReviewItem(item);
  };

  if (isLoading)
    return (
      <div className="flex flex-col gap-6">
        {[1, 2, 3].map(i => (
          <ReviewWritableSkeleton key={i} />
        ))}
      </div>
    );

  if (isError)
    return (
      <div className="mt-6 text-center text-red-500">모임 목록을 불러오는데 실패했습니다.</div>
    );

  return (
    <div className="flex flex-col gap-6">
      {items.length === 0 ? (
        <EmptyState text="아직 작성 가능한 리뷰가 없어요" />
      ) : (
        items.map(item => {
          const formattedDate = formatDateTime(item.dateTime);

          return (
            <div
              key={item.id}
              className="relative flex w-full flex-col gap-4 overflow-hidden rounded-3xl bg-white sm:flex-row sm:items-stretch sm:p-6"
            >
              {/* 모임 이미지 */}
              <div className="relative h-40 w-full shrink-0 overflow-hidden sm:h-40 sm:w-40 sm:rounded-3xl">
                <Image src={item.image} alt={item.name} fill className="object-cover" />
              </div>

              {/* 모임 정보 */}
              <div className="relative flex flex-1 flex-col justify-between gap-2 p-4 sm:flex-row sm:gap-0 sm:p-0">
                {/* 찜 버튼 */}
                <div className="absolute top-4 right-4 z-10 sm:top-0 sm:right-0">
                  <FavoriteButton moimId={item.id} />
                </div>

                <div className="flex flex-col justify-between gap-2">
                  {/* 제목 */}
                  <h2 className="text-lg font-semibold text-gray-900">{item.name}</h2>

                  <div>
                    {/* 인원 */}
                    <p className="flex gap-1 pb-1 text-sm font-medium text-gray-900">
                      <Image
                        src="/icons/common/person.svg"
                        alt="인원 아이콘"
                        width={16}
                        height={16}
                      />
                      {item.participantCount}/{item.capacity}
                    </p>

                    {/* 위치 / 날짜 / 시간 */}
                    <div className="flex gap-2 pt-1 text-sm text-gray-700 sm:pb-0">
                      <p className="text-gray-600">
                        <span className="pr-1.5 text-gray-500">위치</span>
                        {item.location}
                      </p>
                      <span className="text-gray-300">|</span>
                      <p className="text-gray-600">
                        <span className="pr-1.5 text-gray-500">날짜</span>
                        {formattedDate.date}
                      </p>
                      <span className="text-gray-300">|</span>
                      <p className="text-gray-600">
                        <span className="pr-1.5 text-gray-500">시간</span>
                        {formattedDate.time}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 리뷰 작성 버튼 */}
                <div className="mt-4 flex justify-end sm:mt-auto">
                  {item.isCompleted && (
                    <button
                      className="h-11 w-32 cursor-pointer rounded-2xl bg-green-500 font-semibold text-white"
                      onClick={() => handleReviewClick(item)}
                    >
                      리뷰 작성하기
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })
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

      {/* 리뷰 작성 모달 */}
      {selectedReviewItem && (
        <ReviewModal
          open={!!selectedReviewItem}
          onOpenChange={handleModalChange}
          item={selectedReviewItem}
          mode="create"
        />
      )}
    </div>
  );
};

export default ReviewWritableCategory;
