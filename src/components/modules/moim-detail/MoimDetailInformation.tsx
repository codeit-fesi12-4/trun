"use client";

import { Badge } from "@/components/ui/badge";
import { IMoimInformation } from "@/constants/moimFakeData";
import Image from "next/image";
import { useState } from "react";
import MoimDetailProgress from "./MoimDetailProgress";

interface IMoimDetailInformation {
  moim: IMoimInformation;
}

const MoimDetailInformation = ({ moim }: IMoimDetailInformation) => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="h-240px flex w-full flex-col rounded-3xl border-2 border-gray-200 bg-white sm:h-full sm:w-1/2">
      <div className="flex items-start justify-between border-b-2 border-dashed p-6 sm:p-5 md:p-6">
        <div className="flex flex-col gap-3">
          {/* 제목 */}
          <div>
            <h1 className="text-lg font-semibold text-gray-900">{moim.name}</h1>
            <p className="text-sm font-medium text-gray-700">{moim.location}</p>
          </div>
          {/* 날짜,시간 badge */}
          <div className="flex flex-row gap-2">
            <Badge className="h-6 rounded-[4px] text-sm font-medium">1월 7일</Badge>
            <Badge className="h-6 rounded-[4px] text-sm font-medium text-orange-600">17:30</Badge>
          </div>
        </div>
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
            width={48}
            height={48}
            className=""
          />
        </button>
      </div>
      <MoimDetailProgress moim={moim} />
    </div>
  );
};

export default MoimDetailInformation;
