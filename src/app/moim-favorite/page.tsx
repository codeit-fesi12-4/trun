"use client";

import MoimFavoriteHeader from "@/components/modules/moim-favorite/MoimFavoriteHeader";
import MoimCardList from "@/components/modules/moim-find/MoimCardList";
import { useMoimFind } from "@/hooks/useMoimFind";

const MoimFavoritePage = () => {
  const { moimCardData, isLoading, error, handleFilterChange, availableLocations } = useMoimFind();
  return (
    <>
      <MoimFavoriteHeader
        onFilterChange={handleFilterChange}
        availableLocations={availableLocations}
      />
      {isLoading && (
        <div className="mt-6 text-center text-gray-500">모임 목록을 불러오는 중...</div>
      )}
      {error && (
        <div className="mt-6 text-center text-red-500">
          모임 목록을 불러오는데 실패했습니다. 다시 시도해주세요.
        </div>
      )}
      {!isLoading && !error && <MoimCardList items={moimCardData} />}
    </>
  );
};

export default MoimFavoritePage;
