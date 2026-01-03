"use client";

import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import MoimDetailParticipantList from "./MoimDetailParticipantList";
import { Moim } from "@/types/moim.type";
import { useParticipantsQuery } from "@/hooks/queries/useMoimDetailQuery";

type MoimDetailProgress = {
  moim: Moim;
};

const MoimDetailProgress = ({ moim }: MoimDetailProgress) => {
  const participantPercentage = (moim.participantCount / moim.capacity) * 100;
  const { data: participants, isLoading, error } = useParticipantsQuery(Number(moim.id));

  if (isLoading) return <div>로딩중</div>;
  if (error) return <div>에러발생</div>;
  if (!participants) return null;

  return (
    <div className="bg-gradient-100 flex flex-col gap-3 rounded-[12px] border border-[#BEEDE7] px-5 pt-4 pb-6 sm:h-[113px] sm:rounded-[20px] sm:px-6 sm:pt-5 sm:pb-[22px] md:h-[141px] md:rounded-4xl">
      <div className="flex justify-between">
        <div className="flex w-full justify-between">
          <div className="flex flex-row items-center gap-3">
            <span className="text-sm font-semibold text-gray-900 md:text-lg">
              <span className="font-bold text-green-600">{participants.length}</span>명 참여
            </span>
            <MoimDetailParticipantList participants={participants} />
          </div>
          {moim.participantCount >= 5 && (
            <Badge className="gap-0 bg-transparent p-0 text-xs font-medium text-green-600 md:text-base md:font-semibold">
              <Image src="/icons/secure_check.svg" alt="check" width={18} height={18} />
              개설 확정
            </Badge>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2 md:gap-4">
        <div className="flex justify-end">
          <span className="text-xs font-medium text-gray-500 md:text-sm">
            총 인원 {moim.capacity}명
          </span>
        </div>
        <Progress
          value={participantPercentage}
          className="h-1 w-full bg-gray-100 md:h-1.5 lg:h-2"
        />
      </div>
    </div>
  );
};

export default MoimDetailProgress;
