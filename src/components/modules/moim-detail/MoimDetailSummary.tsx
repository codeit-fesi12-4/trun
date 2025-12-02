"use client";

import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { useState } from "react";
import MoimDetailProgress from "./MoimDetailProgress";
import { GetMoimResponse } from "@/types/moimDetail.type";
import { format } from "date-fns";

type MoimDetailSummary = {
  moim: GetMoimResponse;
};

const MoimDetailSummary = ({ moim }: MoimDetailSummary) => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="flex w-full flex-col sm:h-full sm:w-1/2">
      <div className="flex flex-col gap-4 rounded-[12px] bg-white p-4 sm:p-5 md:p-8">
        {/* 마감일, 날짜,시간 badge */}
        <div className="flex flex-row gap-2">
          <Badge className="bg h-5 rounded-[6px] border border-gray-200 bg-transparent px-2 text-xs font-medium text-gray-600">
            {format(new Date(moim.dateTime), "MM월 dd일")}
          </Badge>
          <Badge className="bg h-5 rounded-[6px] border border-gray-200 bg-transparent px-2 text-xs font-medium text-gray-600">
            {format(new Date(moim.dateTime), "HH:mm")}
          </Badge>
          <Badge className="h-5 rounded-[6px] bg-blue-100 pr-2 pl-1 text-xs font-semibold text-blue-600">
            <Image src="../icons/alarm.svg" alt="알람 아이콘" width={20} height={20} />
            {/* {formatDeadline(moim.registrationEnd)} */}
          </Badge>
        </div>
        {/* 제목 */}
        <div>
          <h1 className="text-lg font-semibold text-gray-900">{moim.name}</h1>
          <p className="flex flex-row gap-2 text-sm font-medium text-gray-500">
            <span className="text-sm font-medium text-gray-400">위치</span> {moim.location}
          </p>
        </div>
        <div className="flex flex-row gap-4">
          {/* 좋아요 버튼 */}
          <button
            onClick={() => {
              setIsFavorite(!isFavorite);
            }}
          >
            <Image
              src={
                isFavorite
                  ? "/icons/size=large, state=active.svg"
                  : "/icons/size=large, state=inactive.svg"
              }
              alt={isFavorite ? "좋아요" : "좋아요 취소"}
              width={47}
              height={47}
              className=""
            />
          </button>
          <button className="w-full rounded-[12px] bg-green-500 text-sm font-bold text-white">
            참여하기
          </button>
        </div>
      </div>
      <MoimDetailProgress moim={moim} />
    </div>
  );
};

export default MoimDetailSummary;
