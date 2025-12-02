"use client";

import MoimCard from "@/components/modules/moim-find/MoimCard";
import { MoimCardData, GROUP_SEARCH_CARD_SAMPLE_DATA } from "@/constants";

interface IMoimCardListProps {
  items?: MoimCardData[];
  onFavoriteToggle?: (id: string) => void;
  onJoinClick?: (id: string) => void;
}

const MoimCardList = ({
  items = GROUP_SEARCH_CARD_SAMPLE_DATA,
  onFavoriteToggle,
  onJoinClick,
}: IMoimCardListProps) => (
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
