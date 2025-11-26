"use client";

import { ArrowRight, Heart, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
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
    <div className="flex flex-1 flex-col gap-1 py-3 pr-3 pl-5">
      {/* 제목 및 좋아요 버튼 */}
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-gray-800">
          {item.title} <span className="text-gray-900">|</span>{" "}
          <span className="text-xs text-gray-700">{item.subtitle}</span>
        </h3>
        <button
          type="button"
          onClick={() => onFavoriteToggle?.(item.id)}
          className="rounded-full border p-1.5 text-gray-400 transition-colors hover:bg-orange-50 hover:text-orange-500"
          aria-label={item.isFavorite ? "좋아요 취소" : "좋아요"}
        >
          <Heart
            className={cn("size-4", item.isFavorite && "fill-orange-500 text-orange-500")}
            strokeWidth={2.5}
          />
        </button>
      </div>

      {/* 날짜/시간 배지 */}
      <div className="mb-4 flex gap-2">
        <Badge variant="outline" className="rounded-sm bg-black text-white">
          {item.date}
        </Badge>
        <Badge variant="outline" className="rounded-sm bg-black text-orange-600">
          {item.time}
        </Badge>
      </div>

      {/* 인원 수 및 확정 배너 */}
      <div className="flex justify-between gap-6">
        <div className="flex flex-1 flex-col">
          <div className="flex items-center gap-2">
            <div className="mb-2 flex items-center gap-1.5">
              <User className="size-3.5 text-gray-600" strokeWidth={2.5} />
              <span className="text-xs font-semibold text-gray-600">
                {item.participants}/{item.maxParticipants}
              </span>
              {item.status === "confirmed" && (
                <div className="flex items-center gap-1">
                  <Badge variant="outline" className="border-none text-orange-600">
                    <div className="rounded-full bg-orange-500 p-0.5 text-white">
                      <svg className="size-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
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
        <div className="mt-2 flex items-end">
          <Button
            variant="link"
            size="sm"
            className="bg-white p-0 text-orange-500"
            onClick={() => onJoinClick?.(item.id)}
            type="button"
          >
            join now
            <ArrowRight className="size-4 text-orange-500" strokeWidth={2.5} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GroupSearchCardItems;
