"use client";

import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { useEffect, useState } from "react";
import MoimDetailProgress from "./MoimDetailProgress";
import { GetMoimResponse } from "@/types/moimDetail.type";
import { format } from "date-fns";
import { formatDeadline } from "@/utils/moim.util";
import { useCancelMoim } from "@/hooks/api/moimDetail.api";

type MoimDetailSummary = {
  moim: GetMoimResponse;
};

const MoimDetailSummary = ({ moim }: MoimDetailSummary) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isCreator, setIsCreator] = useState(false);

  const { mutate: cancelMoim, isPending } = useCancelMoim();

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (!stored) return;

    const distinguishCreator = () => {
      const user = JSON.parse(stored);
      const userId = Number(user.id);
      if (userId === moim.createdBy) {
        setIsCreator(true);
      }
    };

    distinguishCreator();
  }, [moim]);

  const handleMoimCancel = () => {
    cancelMoim(moim.id);
  };

  return (
    <div className="flex w-full flex-col gap-4 sm:h-[333px] sm:w-1/2 md:h-[443px] md:gap-6">
      <div className="flex flex-col gap-1 rounded-[12px] bg-white p-4 sm:h-[204px] sm:rounded-[20px] sm:px-6 sm:py-[22px] md:h-[278px] md:rounded-4xl md:p-8 md:px-10 md:py-[34px]">
        {/* 마감일, 날짜,시간 badge */}
        <div className="flex h-8 justify-between">
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
          {isCreator && <Image src="../icons/crown.svg" alt="방장 아이콘" width={32} height={32} />}
        </div>

        {/* 제목 */}
        <div className="flex flex-col md:mt-3 md:gap-3">
          <h1 className="text-lg font-semibold text-gray-800 md:text-[28px]">{moim.name}</h1>
          <p className="flex flex-row gap-2 text-sm font-medium text-gray-500 md:text-base">
            <span className="text-sm font-medium text-gray-400 md:text-base">위치</span>{" "}
            {moim.location}
          </p>
        </div>

        {/* 좋아요 버튼, 참여하기 버튼 */}
        <div className="mt-3 flex flex-row gap-4 sm:mt-5 sm:gap-2.5 md:mt-9 md:gap-4">
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
          {isCreator ? (
            <div className="flex w-full gap-2 sm:h-12 md:h-15">
              <button
                onClick={handleMoimCancel}
                disabled={isPending}
                className="h-full w-1/2 rounded-[12px] border border-gray-100 text-sm font-medium text-gray-500 sm:text-base md:text-xl"
              >
                {isPending ? "취소중..." : "취소하기"}
              </button>
              <button className="w-1/2 rounded-[12px] bg-green-500 text-sm font-bold text-white sm:h-12 sm:text-base md:h-15 md:text-xl md:font-semibold">
                공유하기
              </button>
            </div>
          ) : (
            <button className="w-full rounded-[12px] bg-green-500 text-sm font-bold text-white sm:h-12 sm:text-base md:h-15 md:text-xl md:font-semibold">
              참여하기
            </button>
          )}
        </div>
      </div>
      <MoimDetailProgress moim={moim} />
    </div>
  );
};

export default MoimDetailSummary;
