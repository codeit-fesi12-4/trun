"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { GroupSearchCardData as GroupSearchCardItemType } from "@/constants";
import GroupSearchCardItems from "@/components/GroupSearchCardItems";
import { Badge } from "@/components/ui/badge";

interface GroupSearchCardProps {
  item: GroupSearchCardItemType;
  onFavoriteToggle?: (id: string) => void;
  onJoinClick?: (id: string) => void;
}

const GroupSearchCard = ({ item, onFavoriteToggle, onJoinClick }: GroupSearchCardProps) => (
  <Card
    key={item.id}
    className="overflow-hidden border-[0.5px] py-0 shadow-none transition-shadow hover:border-transparent hover:shadow-[0px_10px_10px_0px_rgba(0,0,0,0.05),2px_2px_12px_0px_rgba(0,0,0,0.01)]"
  >
    <CardContent className="p-0">
      <div className="flex items-stretch">
        {/* 이미지 영역 */}
        <div className="relative w-64 shrink-0 self-stretch overflow-hidden rounded-l-xl">
          <Image src={item.imageUrl} alt={item.title} fill className="object-cover" />
          {/* 이미지 위 오버레이 배지 */}
          <div className="absolute top-0 right-0">
            <Badge
              variant="outline"
              className="flex items-center gap-1.5 rounded-none rounded-bl-lg border-none bg-orange-600 px-2 py-1 text-white"
            >
              <Image src="/icons/alarm.svg" alt="alarm" width={24} height={24} className="size-6" />
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
