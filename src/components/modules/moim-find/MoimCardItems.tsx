"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Moim } from "@/types/moim.type";
import { formatDate, formatTime, formatDeadline } from "@/utils/date.util";
import Link from "next/link";

type MoimCardItemsProps = {
  item: Moim;
  onFavoriteToggle?: (id: number) => void;
  onJoinClick?: (id: number) => void;
};

const MoimCardItems = ({ item, onFavoriteToggle, onJoinClick }: MoimCardItemsProps) => {
  const participantPercentage = (item.participantCount / item.capacity) * 100;
  const isFull = item.participantCount === item.capacity;
  const deadlineText = formatDeadline(item.registrationEnd);

  return (
    <div className="flex flex-1 flex-col justify-between gap-1 p-5 md:p-0">
      {/* 상단: 제목, 위치, 좋아요 */}
      <div className="mt-1.5 flex items-start justify-between">
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate text-lg font-semibold text-gray-800">{item.name}</h3>
            {item.canceledAt === null && item.participantCount >= 5 && (
              <Badge
                variant="outline"
                className="shrink-0 border-none text-[13px] font-semibold text-[var(--color-green-600)]"
              >
                <Image
                  src="/icons/secure_check.svg"
                  alt="check"
                  width={20}
                  height={20}
                  className="size-5"
                />
                개설확정
              </Badge>
            )}
          </div>
          <p className="truncate text-sm text-gray-500">
            위치 <span className="text-gray-600">{item.location}</span>
          </p>
        </div>
        <button
          type="button"
          onClick={() => onFavoriteToggle?.(item.id)}
          aria-label="좋아요"
          className="shrink-0"
        >
          <Image
            src="../icons/empty_heart.svg"
            alt="좋아요"
            width={44}
            height={44}
            className="size-11"
          />
        </button>
      </div>

      {/* 하단: 왼쪽(뱃지+진행바) / 오른쪽(참여하기 버튼) */}
      <div className="flex items-end justify-between gap-5">
        {/* 왼쪽: 뱃지들과 진행바/인원수 */}
        <div className="flex min-w-0 flex-1 flex-col gap-3.5">
          {/* 뱃지들: 날짜, 시간, 데드라인 */}
          <div className="flex flex-wrap items-center gap-2">
            <Badge
              variant="outline"
              className="shrink-0 rounded-md border-gray-100 bg-white px-2 py-0.5 text-[12px] text-gray-500"
            >
              {formatDate(item.dateTime)}
            </Badge>
            <Badge
              variant="outline"
              className="shrink-0 rounded-md border-gray-200 bg-white px-2 py-0.5 text-[12px] text-gray-500"
            >
              {formatTime(item.dateTime)}
            </Badge>
            {deadlineText && (
              <Badge
                variant="outline"
                className="flex shrink-0 items-center rounded-md border-none bg-blue-100 px-1 py-0.5 pr-2 text-[12px] font-bold text-blue-400"
              >
                <Image
                  src="/icons/alarm.svg"
                  alt="alarm"
                  width={32}
                  height={32}
                  className="size-5"
                />
                {deadlineText}
              </Badge>
            )}
          </div>

          {/* 진행바/인원 수 */}
          <div className="flex min-w-0 items-center gap-2.5">
            <Image
              src="/icons/person.svg"
              alt="person"
              width={14}
              height={14}
              className="size-3.5 shrink-0"
            />
            <Progress value={participantPercentage} className="h-1.5 flex-1 bg-gray-100" />
            <span className="shrink-0 text-[12px] font-semibold whitespace-nowrap text-gray-600">
              <span className="text-gradient-500">{item.participantCount}</span>/{item.capacity}
            </span>
          </div>
        </div>

        {/* 오른쪽: 참여하기 버튼 */}
        {isFull ? (
          <div className="shrink-0">
            <Button
              variant="outline"
              size="xs"
              disabled
              className="cursor-not-allowed rounded-xl border-gray-300 p-5 text-[14px] font-semibold text-gray-400"
              type="button"
            >
              마감
            </Button>
          </div>
        ) : (
          <Link href={`/moim-find/${item.id}`} className="shrink-0">
            <Button
              variant="outline"
              size="xs"
              className="rounded-xl border-green-400 bg-white p-5 text-[14px] font-semibold text-green-500 hover:border-green-500 hover:bg-green-500 hover:text-white"
              onClick={() => onJoinClick?.(item.id)}
              type="button"
            >
              참여하기
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default MoimCardItems;
