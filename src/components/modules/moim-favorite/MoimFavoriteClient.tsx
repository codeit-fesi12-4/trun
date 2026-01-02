"use client";

import Image from "next/image";
import MoimFavoriteHeader from "@/components/modules/moim-favorite/MoimFavoriteHeader";
import MoimCardList from "@/components/modules/moim-find/MoimCardList";
import { useMoimFavorite } from "@/hooks/useMoimFavorite";

const MoimFavoriteClient = () => {
  const {
    filters,
    moimCardData,
    isLoading,
    error,
    handleFilterChange,
    availableLocations,
    onFavoriteToggle,
  } = useMoimFavorite();

  return (
    <>
      <MoimFavoriteHeader
        filters={filters}
        onFilterChange={handleFilterChange}
        availableLocations={availableLocations}
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
                src="/icons/empty_moim.svg"
                alt="찜한 모임이 없음"
                width={171}
                height={136}
                className="h-auto w-auto"
              />
              <p className="flex flex-col items-center gap-1 text-base font-bold text-gray-400">
                <span>아직 찜한 모임이 없어요</span>
                <span>관심있는 모임을 찜해보세요!</span>
              </p>
            </div>
          )}
          <MoimCardList
            items={moimCardData}
            isLoading={isLoading}
            onFavoriteToggle={onFavoriteToggle}
          />
        </>
      )}
    </>
  );
};

export default MoimFavoriteClient;
