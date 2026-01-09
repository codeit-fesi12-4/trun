"use client";

import Image from "next/image";
import { useMoimFind } from "@/hooks/useMoimFind";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import MoimCardList from "@/components/modules/moim-find/MoimCardList";
import MoimAddModal from "@/components/modules/moim-find/MoimAddModal";
import { Spinner } from "@/components/ui/spinner";
import MoimFindHeader from "@/components/modules/moim-find/MoimFindHeader";

const MoimFindClient = () => {
  const {
    filters,
    isModalOpen,
    setIsModalOpen,
    moimCardData,
    availableLocations,
    isLoading,
    error,
    onFilterChange,
    handleCreateMoimClick,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useMoimFind();

  const { loadMoreRef } = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    error,
  });

  return (
    <>
      <MoimFindHeader
        onFilterChange={onFilterChange}
        availableLocations={availableLocations}
        filters={filters}
      />
      {error && (
        <div className="mt-6 text-center text-red-500">
          모임 목록을 불러오는데 실패했습니다. 다시 시도해주세요.
        </div>
      )}
      {!error && (
        <>
          {!isLoading && moimCardData.length === 0 && (
            <div className="mt-25 flex flex-col items-center justify-center gap-3">
              <Image
                src="/icons/common/empty.svg"
                alt="모임이 없음"
                width={171}
                height={136}
                className="h-auto w-auto"
              />
              <p className="flex flex-col items-center gap-1 text-base font-bold text-gray-400">
                <span>아직 모임이 없어요</span>
                <span>지금 바로 모임을 만들어보세요!</span>
              </p>
            </div>
          )}
          <MoimCardList items={moimCardData} isLoading={isLoading} />
        </>
      )}

      {/* 무한 스크롤 센티널 */}
      <div id="moim-load-more-sentinel" ref={loadMoreRef} className="h-6 w-full" aria-hidden />

      {/* 로딩 스피너 */}
      {isFetchingNextPage && (
        <div className="mt-6 flex flex-col items-center justify-center gap-3 text-base text-gray-600">
          <Spinner className="size-7 text-green-500" />
          <span>모임을 불러오는 중...</span>
        </div>
      )}

      {/* 우측 하단 고정된 모임 생성 버튼 */}
      <button
        onClick={handleCreateMoimClick}
        className="fixed right-6 bottom-6 z-50 flex h-14 w-14 cursor-pointer items-center justify-center gap-2 rounded-full bg-green-500 text-white shadow-lg transition-all hover:bg-green-600 sm:right-8 sm:bottom-8 sm:h-auto sm:w-auto sm:rounded-2xl sm:px-6 sm:py-3"
        aria-label="모임 만들기"
      >
        <Image
          src="/icons/moim/plus.svg"
          alt="플러스 아이콘"
          width={20}
          height={20}
          className="size-5 sm:size-5"
        />
        <span className="hidden text-sm font-semibold sm:inline sm:text-base">모임 만들기</span>
      </button>

      <MoimAddModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </>
  );
};

export default MoimFindClient;
