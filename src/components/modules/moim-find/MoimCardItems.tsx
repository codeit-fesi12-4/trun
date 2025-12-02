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
    <div className="flex flex-1 flex-col justify-between gap-4">
      {/* 상단: 제목, 위치, 좋아요 */}
      <div className="mt-2 flex items-start justify-between gap-2">
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <div className="flex flex-wrap items-center gap-1.5">
            <h3 className="text-md truncate font-semibold text-gray-800">{item.title}</h3>
            {item.status === "confirmed" && (
              <Badge
                variant="outline"
                className="shrink-0 border-none px-1 py-0.5 text-[10px] text-[var(--color-green-600)]"
              >
                <Image
                  src="/icons/Property 1=Variant2.svg"
                  alt="check"
                  width={12}
                  height={12}
                  className="mr-0.5 size-3"
                />
                개설확정
              </Badge>
            )}
          </div>
          <p className="truncate text-xs text-gray-500">
            위치 <span className="text-gray-600">{item.subtitle}</span>
          </p>
        </div>
        <button
          type="button"
          onClick={() => onFavoriteToggle?.(item.id)}
          aria-label={item.isFavorite ? "좋아요 취소" : "좋아요"}
          className="shrink-0"
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
            className="size-9"
          />
        </button>
      </div>

      {/* 하단: 왼쪽(뱃지+진행바) / 오른쪽(참여하기 버튼) */}
      <div className="flex items-end justify-between gap-4">
        {/* 왼쪽: 뱃지들과 진행바/인원수 */}
        <div className="flex min-w-0 flex-1 flex-col gap-3">
          {/* 뱃지들: 날짜, 시간, 데드라인 */}
          <div className="flex gap-1.5">
            <Badge
              variant="outline"
              className="rounded-sm border-gray-100 bg-white px-1.5 py-0.5 text-[12px] text-gray-500"
            >
              {item.date}
            </Badge>
            <Badge
              variant="outline"
              className="rounded-sm border-gray-200 bg-white px-1.5 py-0.5 text-[12px] text-gray-500"
            >
              {item.time}
            </Badge>
            {item.deadlineText && (
              <Badge
                variant="outline"
                className="flex items-center rounded-sm border-none bg-blue-100 p-0.5 pr-1 text-[12px] text-blue-400"
              >
                <Image
                  src="/icons/alarm.svg"
                  alt="alarm"
                  width={32}
                  height={32}
                  className="size-5"
                />
                {item.deadlineText}
              </Badge>
            )}
          </div>

          {/* 진행바/인원 수 */}
          <div className="flex min-w-0 items-center gap-2">
            <Image
              src="/icons/person.svg"
              alt="person"
              width={12}
              height={12}
              className="size-3 shrink-0"
            />
            <Progress
              value={participantPercentage}
              className="h-1 flex-1 bg-[var(--color-green-100)] [&>div]:bg-[var(--color-green-500)]"
            />
            <span className="shrink-0 text-[10px] font-semibold whitespace-nowrap text-gray-600">
              <span className="text-green-500">{item.participants}</span>/{item.maxParticipants}
            </span>
          </div>
        </div>

        {/* 오른쪽: 참여하기 버튼 */}
        <Link href={`/moim-find/1`} className="shrink-0">
          <Button
            variant="outline"
            size="xs"
            className="rounded-xl border-green-400 p-4 text-[12px] font-semibold text-green-500 hover:bg-green-400 hover:text-white"
            onClick={() => onJoinClick?.(item.id)}
            type="button"
          >
            참여하기
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default MoimCardItems;
