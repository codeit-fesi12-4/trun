"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { GroupSearchCardData } from "@/constants";

interface IGroupSearchCardItemProps {
  item: GroupSearchCardData;
  onFavoriteToggle?: (id: string) => void;
  onJoinClick?: (id: string) => void;
}

const GroupSearchCardItems = ({
  item,
  onFavoriteToggle,
  onJoinClick,
}: IGroupSearchCardItemProps) => {
  const participantPercentage = (item.participants / item.maxParticipants) * 100;

  return (
    <div className="tablet:gap-1 tablet:py-4 tablet:pl-6 tablet:pr-6 pc:gap-2 pc:py-6 pc:pl-8 pc:pr-8 flex flex-1 flex-col gap-1 py-4 pr-4 pl-4">
      <div className="flex items-start justify-between">
        <div className="tablet:gap-2 pc:gap-3 flex flex-col gap-1.5">
          {/* 제목 */}
          <div className="flex flex-col gap-1">
            <h3 className="tablet:text-base pc:text-lg flex flex-wrap items-center gap-2 text-sm font-semibold text-gray-800">
              <span>{item.title}</span>
              <span className="text-gray-900">|</span>
              <span className="tablet:text-sm pc:text-base text-xs text-gray-700">
                {item.subtitle}
              </span>
            </h3>
          </div>
          {/* 날짜/시간 */}
          <div className="tablet:mb-4 pc:mb-5 mb-3 flex gap-2">
            <Badge
              variant="outline"
              className="tablet:text-sm pc:text-base rounded-sm bg-black text-xs text-white"
            >
              {item.date}
            </Badge>
            <Badge
              variant="outline"
              className="tablet:text-sm pc:text-base rounded-sm bg-black text-xs text-orange-600"
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
            className="tablet:size-9 pc:size-10 size-8"
          />
        </button>
      </div>

      <div className="tablet:gap-6 pc:gap-8 flex items-end justify-between gap-4">
        <div className="flex flex-1 flex-col gap-1">
          <div className="flex items-center">
            {/* 인원 수 및 확정 표시 */}
            <div className="flex items-center gap-1">
              <Image
                src="/icons/person.svg"
                alt="person"
                width={14}
                height={14}
                className="tablet:size-3.5 pc:size-4 size-3"
              />
              <span className="tablet:text-sm pc:text-base text-xs font-semibold text-gray-600">
                {item.participants}/{item.maxParticipants}
              </span>
              {item.status === "confirmed" && (
                <div className="flex items-center gap-1">
                  <Badge
                    variant="outline"
                    className="tablet:text-sm pc:text-base border-none text-xs text-orange-600"
                  >
                    <div className="">
                      <Image
                        src="/icons/Property 1=Variant2.svg"
                        alt="check"
                        width={20}
                        height={20}
                        className="tablet:size-5 pc:size-6 size-4"
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
            className="tablet:h-1.5 pc:h-2 h-1 w-full bg-orange-100 [&>div]:bg-orange-500"
          />
        </div>
        {/* 상세 버튼 */}
        <div className="tablet:mr-2 pc:mr-4 mr-0">
          <Button
            variant="link"
            size="xs"
            className="tablet:text-sm pc:text-base bg-white p-0 text-xs font-semibold text-orange-500"
            onClick={() => onJoinClick?.(item.id)}
            type="button"
          >
            join now
            <Image
              src="/icons/arrow_right.svg"
              alt="arrow right"
              width={16}
              height={16}
              className="tablet:size-4 pc:size-5 size-3.5"
            />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GroupSearchCardItems;
