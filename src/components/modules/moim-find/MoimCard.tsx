"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { MoimCardData as MoimCardItemType } from "@/constants";
import MoimCardItems from "./MoimCardItems";

interface IMoimCardProps {
  item: MoimCardItemType;
  onFavoriteToggle?: (id: string) => void;
  onJoinClick?: (id: string) => void;
}

const MoimCard = ({ item, onFavoriteToggle, onJoinClick }: IMoimCardProps) => (
  <Card
    key={item.id}
    className="overflow-hidden rounded-4xl border-[0.5px] p-0 shadow-none transition-shadow hover:border-transparent hover:shadow-[0px_10px_10px_0px_rgba(0,0,0,0.05),2px_2px_12px_0px_rgba(0,0,0,0.01)] sm:p-5"
  >
    <CardContent className="p-0">
      <div className="flex flex-col items-stretch sm:gap-5 md:flex-row">
        {/* 이미지 영역 */}
        <div className="relative aspect-video h-45 w-full shrink-0 md:aspect-auto md:h-36 md:w-36">
          <Image
            src={item.imageUrl}
            alt={item.title}
            fill
            className="rounded-b-none object-cover sm:rounded-3xl"
          />
        </div>

        {/* 내용 영역 */}
        <MoimCardItems item={item} onFavoriteToggle={onFavoriteToggle} onJoinClick={onJoinClick} />
      </div>
    </CardContent>
  </Card>
);

export default MoimCard;
