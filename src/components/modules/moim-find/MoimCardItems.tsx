"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { MoimCardData } from "@/constants";
import Link from "next/link";

interface IMoimCardItemProps {
  item: MoimCardData;
  onFavoriteToggle?: (id: string) => void;
  onJoinClick?: (id: string) => void;
}

const MoimCardItems = ({ item, onFavoriteToggle, onJoinClick }: IMoimCardItemProps) => {
  const participantPercentage = (item.participants / item.maxParticipants) * 100;

  return (
    <div className="flex flex-1 flex-col gap-1 py-4 pr-4 pl-4 md:gap-1 md:py-4 md:pr-6 md:pl-6 lg:gap-2 lg:py-6 lg:pr-8 lg:pl-8">
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1.5 md:gap-2 lg:gap-3">
          {/* 제목 */}
          <div className="flex flex-col gap-1">
            <h3 className="flex flex-wrap items-center gap-2 text-sm font-semibold text-gray-800 md:text-base lg:text-lg">
              <span>{item.title}</span>
              <span className="text-gray-900">|</span>
              <span className="text-xs text-gray-700 md:text-sm lg:text-base">{item.subtitle}</span>
            </h3>
          </div>
          {/* 날짜/시간 */}
          <div className="mb-3 flex gap-2 md:mb-4 lg:mb-5">
            <Badge
              variant="outline"
              className="rounded-sm bg-black text-xs text-white md:text-sm lg:text-base"
            >
              {item.date}
            </Badge>
            <Badge
              variant="outline"
              className="rounded-sm bg-black text-xs text-orange-600 md:text-sm lg:text-base"
            >
              {item.time}
            </Badge>
          </div>
        </div>
        {/* 좋아요 버튼 */}
        <button
          type="button"
          onClick={() => onFavoriteToggle?.(item.id)}
          aria-label={item.isFavorite ? "좋아요 취소" : "좋아요"}
        >
          <Image
            src={
              item.isFavorite
                ? "/icons/size=large, state=active.svg"
                : "/icons/size=large, state=inactive.svg"
            }
            alt={item.isFavorite ? "좋아요" : "좋아요 취소"}
            width={36}
            height={36}
            className="size-8 md:size-9 lg:size-10"
          />
        </button>
      </div>

      <div className="flex items-end justify-between gap-4 md:gap-6 lg:gap-8">
        <div className="flex flex-1 flex-col gap-1">
          <div className="flex items-center">
            {/* 인원 수 및 확정 표시 */}
            <div className="flex items-center gap-1">
              <Image
                src="/icons/person.svg"
                alt="person"
                width={14}
                height={14}
                className="size-3 md:size-3.5 lg:size-4"
              />
              <span className="text-xs font-semibold text-gray-600 md:text-sm lg:text-base">
                {item.participants}/{item.maxParticipants}
              </span>
              {item.status === "confirmed" && (
                <div className="flex items-center gap-1">
                  <Badge
                    variant="outline"
                    className="border-none text-xs text-orange-600 md:text-sm lg:text-base"
                  >
                    <div className="">
                      <Image
                        src="/icons/Property 1=Variant2.svg"
                        alt="check"
                        width={20}
                        height={20}
                        className="size-4 md:size-5 lg:size-6"
                      />
                    </div>
                    개설확정
                  </Badge>
                </div>
              )}
            </div>
          </div>
          {/* 진행 상태 바 */}
          <Progress
            value={participantPercentage}
            className="h-1 w-full bg-orange-100 md:h-1.5 lg:h-2 [&>div]:bg-orange-500"
          />
        </div>
        {/* 상세 버튼 - 추후 Link에 동적으로 생성된 모임 아이디 붙이기*/}
        <Link href={`/moim-find/1`} className="mr-0 md:mr-2 lg:mr-4">
          <Button
            variant="link"
            size="xs"
            className="bg-white p-0 text-xs font-semibold text-orange-500 md:text-sm lg:text-base"
            onClick={() => onJoinClick?.(item.id)}
            type="button"
          >
            join now
            <Image
              src="/icons/arrow_right.svg"
              alt="arrow right"
              width={16}
              height={16}
              className="size-3.5 md:size-4 lg:size-5"
            />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default MoimCardItems;
