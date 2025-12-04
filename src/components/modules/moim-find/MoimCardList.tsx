"use client";

import MoimCard from "@/components/modules/moim-find/MoimCard";
import { MoimCardData } from "@/types/moim.type";

type MoimCardListProps = {
  items: MoimCardData[];
  onFavoriteToggle?: (id: string) => void;
  onJoinClick?: (id: string) => void;
};

const MoimCardList = ({ items, onFavoriteToggle, onJoinClick }: MoimCardListProps) => (
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

export default MoimCardList;
