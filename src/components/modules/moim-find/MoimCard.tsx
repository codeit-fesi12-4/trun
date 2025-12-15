"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Moim } from "@/types/moim.type";
import { MoimCardActions } from "@/types/moimFind.type";
import MoimCardItems from "./MoimCardItems";

type MoimCardProps = {
  item: Moim;
} & MoimCardActions;

const MoimCard = ({ item, onFavoriteToggle, onJoinClick }: MoimCardProps) => (
  <Card className="overflow-hidden rounded-4xl border-[0.5px] p-0 shadow-none md:p-5">
    <CardContent className="p-0">
      <div className="flex flex-col items-stretch md:flex-row md:gap-6">
        {/* 이미지 영역 */}
        <div className="relative aspect-video h-45 w-full shrink-0 md:aspect-auto md:h-36 md:w-36">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="rounded-b-none object-cover md:rounded-3xl"
          />
          {(item.participantCount >= item.capacity ||
            new Date(item.registrationEnd) < new Date()) && (
            <div className="absolute inset-0 flex items-center justify-center rounded-b-none bg-black/50 md:rounded-3xl">
              <Image
                src="/icons/모집 마감.svg"
                alt="인원 마감"
                width={86}
                height={20}
                className="h-5 w-auto"
              />
            </div>
          )}
        </div>

        {/* 내용 영역 */}
        <MoimCardItems item={item} onFavoriteToggle={onFavoriteToggle} onJoinClick={onJoinClick} />
      </div>
    </CardContent>
  </Card>
);

export default MoimCard;
