"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { GroupSearchCardData } from "@/constants";

interface GroupSearchCardItemProps {
  item: GroupSearchCardData;
  onFavoriteToggle?: (id: string) => void;
  onJoinClick?: (id: string) => void;
}

const GroupSearchCardItems = ({
  item,
  onFavoriteToggle,
  onJoinClick,
}: GroupSearchCardItemProps) => {
  const participantPercentage = (item.participants / item.maxParticipants) * 100;

  return (
    <div className="flex flex-1 flex-col gap-1 py-4 pr-4 pl-6">
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <h3 className="flex items-center gap-2 text-base font-semibold text-gray-800">
              <span>{item.title}</span>
              <span className="text-gray-900">|</span>
              <span className="text-xs text-gray-700">{item.subtitle}</span>
            </h3>
          </div>
          <div className="mb-4 flex gap-2">
            <Badge variant="outline" className="rounded-sm bg-black text-sm text-white">
              {item.date}
            </Badge>
            <Badge variant="outline" className="rounded-sm bg-black text-sm text-orange-600">
              {item.time}
            </Badge>
          </div>
        </div>
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
            className="size-9"
          />
        </button>
      </div>

      <div className="flex items-end justify-between gap-6">
        <div className="flex flex-1 flex-col gap-1">
          <div className="flex items-center">
            <div className="flex items-center gap-1">
              <Image
                src="/icons/person.svg"
                alt="person"
                width={14}
                height={14}
                className="size-3.5"
              />
              <span className="text-xs font-semibold text-gray-600">
                {item.participants}/{item.maxParticipants}
              </span>
              {item.status === "confirmed" && (
                <div className="flex items-center gap-1">
                  <Badge variant="outline" className="border-none text-orange-600">
                    <div className="">
                      <Image
                        src="/icons/Property 1=Variant2.svg"
                        alt="check"
                        width={20}
                        height={20}
                        className="size-5"
                      />
                    </div>
                    개설확정
                  </Badge>
                </div>
              )}
            </div>
          </div>
          <Progress
            value={participantPercentage}
            className="h-1 w-full bg-orange-100 [&>div]:bg-orange-500"
          />
        </div>
        {/* 상세 페이지 버튼 */}
        <div className="mr-2">
          <Button
            variant="link"
            size="xs"
            className="bg-white p-0 font-semibold text-orange-500"
            onClick={() => onJoinClick?.(item.id)}
            type="button"
          >
            join now
            <Image
              src="/icons/arrow_right.svg"
              alt="arrow right"
              width={16}
              height={16}
              className="size-4"
            />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GroupSearchCardItems;
