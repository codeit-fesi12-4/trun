"use client";

import { useState } from "react";
import Image from "next/image";
import { EmptyState } from "@/components/modules/mypage/EmptyState";
import { ReviewWriteModal } from "@/components/modules/mypage/mypage-modal/ReviewWriteModal";
import { useAvailableReviews } from "@/hooks/useMypageQuery";
import { WritableReviewItem } from "@/types/mypage.type";
import { formatDateTime } from "@/utils/mypage.util";
import FavoriteButton from "@/components/common/FavoriteButton";

const ReviewWritableCategory = () => {
  const [selectedReviewItem, setSelectedReviewItem] = useState<WritableReviewItem | null>(null);
  const { data, isLoading, isError, refetch } = useAvailableReviews();
  const items = data ?? [];

  const handleModalChange = (isOpen: boolean) => {
    if (!isOpen) {
      setSelectedReviewItem(null);
      void refetch();
    }
  };

  const handleReviewClick = (item: WritableReviewItem) => {
    setSelectedReviewItem(item);
  };

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>오류가 발생했습니다.</div>;

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
              <div className="relative h-40 w-full shrink-0 overflow-hidden rounded-3xl sm:h-40 sm:w-40">
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
                      <Image src="/icons/person.svg" alt="인원 아이콘" width={16} height={16} />
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

      {/* 리뷰 작성 모달 */}
      {selectedReviewItem && (
        <ReviewWriteModal
          open={!!selectedReviewItem}
          onOpenChange={handleModalChange}
          item={selectedReviewItem}
        />
      )}
    </div>
  );
};

export default ReviewWritableCategory;
