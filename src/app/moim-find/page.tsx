"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useMoimFind } from "@/hooks/useMoimFind";
import MoimCardList from "@/components/modules/moim-find/MoimCardList";
import MoimFindHeader from "@/components/modules/moim-find/MoimFindHeader";
import MoimAddModal from "@/components/modules/moim-find/MoimAddModal";
import { Spinner } from "@/components/ui/spinner";

const MoimFindPage = () => {
  const {
    isModalOpen,
    setIsModalOpen,
    moimCardData,
    availableLocations,
    isLoading,
    error,
    handleFilterChange,
    handleCreateMoimClick,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useMoimFind();

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // IntersectionObserver로 무한 스크롤
  useEffect(() => {
    const target = loadMoreRef.current;

    if (!target) return;

    const observer = new IntersectionObserver(
      entries => {
        const entry = entries[0];
        if (entry.isIntersecting && !isLoading && !error && hasNextPage && !isFetchingNextPage) {
          void fetchNextPage();
        }
      },
      { rootMargin: "200px 0px" },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, error, isLoading, isFetchingNextPage]);

  // 초기 로드 완료 후 센티널이 이미 뷰포트 안에 있을 때 추가 호출
  // 초기 로드가 완료되고 데이터가 8개 이하일 때만 실행 (초기 페이지만 로드된 경우)
  useEffect(() => {
    const target = loadMoreRef.current;
    if (!target || !hasNextPage || isLoading || isFetchingNextPage || moimCardData.length === 0)
      return;

    // 초기 로드 완료 후에만 실행 (데이터가 8개 이하이고, 로딩이 완료된 경우)
    if (moimCardData.length <= 8 && !isLoading) {
      const rect = target.getBoundingClientRect();
      const isVisible = rect.top <= window.innerHeight + 200;
      if (isVisible) {
        void fetchNextPage();
      }
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, moimCardData.length]);

  return (
    <>
      <MoimFindHeader onFilterChange={handleFilterChange} availableLocations={availableLocations} />
      {/* 카드 컴포넌트 렌더링 전 로딩 상태 표시 (추후 스켈레톤 적용 예정) */}
      {isLoading && (
        <div className="mt-6 text-center text-gray-500">모임 목록을 불러오는 중...</div>
      )}
      {error && (
        <div className="mt-6 text-center text-red-500">
          모임 목록을 불러오는데 실패했습니다. 다시 시도해주세요.
        </div>
      )}
      {!isLoading && !error && <MoimCardList items={moimCardData} />}

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
        className="fixed right-6 bottom-6 z-50 flex h-14 w-14 items-center justify-center gap-2 rounded-full bg-green-500 text-white shadow-lg transition-all hover:bg-green-600 sm:right-8 sm:bottom-8 sm:h-auto sm:w-auto sm:rounded-2xl sm:px-6 sm:py-3"
        aria-label="모임 만들기"
      >
        <Image
          src="/icons/ic_plus.svg"
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

export default MoimFindPage;
