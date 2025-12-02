"use client";

import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { useState } from "react";
import MoimDetailProgress from "./MoimDetailProgress";
import { GetMoimResponse } from "@/types/moimDetail.type";
import { format } from "date-fns";
import { formatDeadline } from "@/utils/moim.util";

type MoimDetailSummary = {
  moim: GetMoimResponse;
};

const MoimDetailSummary = ({ moim }: MoimDetailSummary) => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="flex w-full flex-col gap-4 sm:h-[333px] sm:w-1/2 md:h-[443px] md:gap-6">
      <div className="flex flex-col gap-4 rounded-[12px] bg-white p-4 sm:h-[204px] sm:rounded-[20px] sm:px-6 sm:py-[22px] md:h-[278px] md:gap-6 md:rounded-4xl md:p-8 md:px-10 md:py-[34px]">
        {/* 마감일, 날짜,시간 badge */}
        <div className="flex h-5 flex-row gap-2 md:h-6">
          <Badge className="bg h-full rounded-[6px] border border-gray-200 bg-transparent px-2 text-xs font-medium text-gray-600 md:text-sm">
            {format(new Date(moim.dateTime), "MM월 dd일")}
          </Badge>
          <Badge className="bg h-full rounded-[6px] border border-gray-200 bg-transparent px-2 text-xs font-medium text-gray-600 md:text-sm">
            {format(new Date(moim.dateTime), "HH:mm")}
          </Badge>
          {formatDeadline(moim.registrationEnd) && (
            <Badge className="h-full rounded-[6px] bg-blue-100 pr-2 pl-1 text-xs font-semibold text-blue-600 md:text-sm">
              <Image
                src="../icons/alarm.svg"
                alt="알람 아이콘"
                width={20}
                height={20}
                className="md:size-6"
              />
              {formatDeadline(moim.registrationEnd)}
            </Badge>
          )}
        </div>

        {/* 제목 */}
        <div className="flex flex-col md:gap-3">
          <h1 className="text-lg font-semibold text-gray-800 md:text-[28px]">{moim.name}</h1>
          <p className="flex flex-row gap-2 text-sm font-medium text-gray-500 md:text-base">
            <span className="text-sm font-medium text-gray-400 md:text-base">위치</span>{" "}
            {moim.location}
          </p>
        </div>

        {/* 좋아요 버튼, 참여하기 버튼 */}
        <div className="mt-4 flex flex-row sm:gap-4">
          <button
            onClick={() => {
              setIsFavorite(!isFavorite);
            }}
          >
            <Image
              src={isFavorite ? "/icons/full_heart.svg" : "/icons/empty_heart.svg"}
              alt={isFavorite ? "좋아요" : "좋아요 취소"}
              width={48}
              height={48}
              className="md:size-15"
            />
          </button>
          <button className="w-full rounded-[12px] bg-green-500 text-sm font-bold text-white sm:h-12 sm:text-base md:h-15 md:text-xl md:font-semibold">
            참여하기
          </button>
        </div>
      </div>
      <MoimDetailProgress moim={moim} />
    </div>
  );
};

export default MoimDetailSummary;
