"use client";

import GroupSearchCard from "@/components/GroupSearchCard";
import { GroupSearchCardData, GROUP_SEARCH_CARD_SAMPLE_DATA } from "@/constants";

interface IGroupSearchCardListProps {
  items?: GroupSearchCardData[];
  onFavoriteToggle?: (id: string) => void;
  onJoinClick?: (id: string) => void;
}

const GroupSearchCardList = ({
  items = GROUP_SEARCH_CARD_SAMPLE_DATA,
  onFavoriteToggle,
  onJoinClick,
}: IGroupSearchCardListProps) => (
  <div className="tablet:w-3/4 tablet:px-6 pc:w-1/2 pc:max-w-[960px] mx-auto flex w-full flex-col gap-4 px-4">
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
