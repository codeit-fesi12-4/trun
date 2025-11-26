"use client";

import GroupSearchCard from "@/components/GroupSearchCard";
import { GroupSearchCardData, GROUP_SEARCH_CARD_SAMPLE_DATA } from "@/constants";

interface GroupSearchCardListProps {
  items?: GroupSearchCardData[];
  onFavoriteToggle?: (id: string) => void;
  onJoinClick?: (id: string) => void;
}

const GroupSearchCardList = ({
  items = GROUP_SEARCH_CARD_SAMPLE_DATA,
  onFavoriteToggle,
  onJoinClick,
}: GroupSearchCardListProps) => (
  <div className="mx-auto flex w-1/2 flex-col gap-4">
    {items.map(item => (
      <GroupSearchCard
        key={item.id}
        item={item}
        onFavoriteToggle={onFavoriteToggle}
        onJoinClick={onJoinClick}
      />
    ))}
  </div>
);

export default GroupSearchCardList;
