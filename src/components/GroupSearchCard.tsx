"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { GroupSearchCardData as GroupSearchCardItemType } from "@/constants";
import GroupSearchCardItems from "@/components/GroupSearchCardItems";
import { Badge } from "@/components/ui/badge";

interface IGroupSearchCardProps {
  item: GroupSearchCardItemType;
  onFavoriteToggle?: (id: string) => void;
  onJoinClick?: (id: string) => void;
}

const GroupSearchCard = ({ item, onFavoriteToggle, onJoinClick }: IGroupSearchCardProps) => (
  <Card
    key={item.id}
    className="overflow-hidden border-[0.5px] py-0 shadow-none transition-shadow hover:border-transparent hover:shadow-[0px_10px_10px_0px_rgba(0,0,0,0.05),2px_2px_12px_0px_rgba(0,0,0,0.01)]"
  >
    <CardContent className="p-0">
      <div className="tablet:flex-row flex flex-col items-stretch">
        {/* 이미지 영역 */}
        <div className="tablet:h-auto tablet:w-64 tablet:rounded-l-xl tablet:rounded-t-none pc:w-80 relative h-48 w-full shrink-0 overflow-hidden rounded-t-xl">
          <Image src={item.imageUrl} alt={item.title} fill className="object-cover" />
          {/* 이미지 위 오버레이 배지 */}
          <div className="absolute top-0 right-0">
            <Badge
              variant="outline"
              className="tablet:gap-1.5 tablet:px-2 tablet:py-1 tablet:text-sm pc:gap-2 pc:px-3 pc:py-1.5 pc:text-base flex items-center gap-1 rounded-none rounded-bl-lg border-none bg-orange-600 px-1.5 py-0.5 text-xs text-white"
            >
              <Image
                src="/icons/alarm.svg"
                alt="alarm"
                width={24}
                height={24}
                className="tablet:size-5 pc:size-6 size-4"
              />
              {item.deadlineText}
            </Badge>
          </div>
        </div>

        {/* 내용 영역 */}
        <GroupSearchCardItems
          item={item}
          onFavoriteToggle={onFavoriteToggle}
          onJoinClick={onJoinClick}
        />
      </div>
    </CardContent>
  </Card>
);

export default GroupSearchCard;
