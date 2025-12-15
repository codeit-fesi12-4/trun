"use client";

import MoimCard from "@/components/modules/moim-find/MoimCard";
import MoimCardSkeleton from "@/components/modules/moim-find/MoimCardSkeleton";
import { Moim } from "@/types/moim.type";
import { MoimCardActions } from "@/types/moimFind.type";

type MoimCardListProps = {
  items: Moim[];
  isLoading?: boolean;
} & MoimCardActions;

const SKELETON_COUNT = 6;

const MoimCardList = ({ items, onFavoriteToggle, onJoinClick, isLoading }: MoimCardListProps) => {
  if (isLoading) {
    return (
      <div className="mx-auto mt-6 grid w-full grid-cols-1 gap-4 lg:grid-cols-2">
        {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
          <MoimCardSkeleton key={`skeleton-${index}`} />
        ))}
      </div>
    );
  }

  return (
    <div className="mx-auto mt-6 grid w-full grid-cols-1 gap-4 lg:grid-cols-2">
      {items.map(item => (
        <MoimCard
          key={item.id}
          item={item}
          onFavoriteToggle={onFavoriteToggle}
          onJoinClick={onJoinClick}
        />
      ))}
    </div>
  );
};

export default MoimCardList;
