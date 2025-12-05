"use client";

import MoimFavoriteHeader from "@/components/modules/moim-favorite/MoimFavoriteHeader";
import MoimCardList from "@/components/modules/moim-find/MoimCardList";
import { useMoimFavorite } from "@/hooks/useMoimFavorite";

const MoimFavoritePage = () => {
  const {
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
      {!isLoading && !error && moimCardData.length === 0 && (
        <div className="mt-6 text-center text-gray-500">찜한 모임이 없습니다.</div>
      )}
      {!isLoading && !error && moimCardData.length > 0 && (
        <MoimCardList items={moimCardData} onFavoriteToggle={onFavoriteToggle} />
      )}
    </>
  );
};

export default MoimFavoritePage;
