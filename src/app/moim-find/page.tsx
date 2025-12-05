"use client";

import Image from "next/image";
import { useMoimFind } from "@/hooks/useMoimFind";
import MoimCardList from "@/components/modules/moim-find/MoimCardList";
import MoimFindHeader from "@/components/modules/moim-find/MoimFindHeader";
import MoimAddModal from "@/components/modules/moim-find/MoimAddModal";

const MoimFindPage = () => {
  const {
    isModalOpen,
    setIsModalOpen,
    moimCardData,
    availableLocations,
    isLoading,
    error,
    handleFilterChange,
  } = useMoimFind();

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

      {/* 우측 하단 고정된 모임 생성 버튼 */}
      <button
        onClick={() => setIsModalOpen(true)}
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
