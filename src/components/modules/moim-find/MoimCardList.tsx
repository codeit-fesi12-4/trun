"use client";

import MoimCard from "@/components/modules/moim-find/MiomCard";
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
  <div className="mx-auto mt-6 flex w-full flex-col gap-4">
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
