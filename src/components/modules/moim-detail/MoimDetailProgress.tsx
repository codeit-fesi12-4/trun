import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { IMoimInformation, PARTICIPANTS } from "@/constants/moimFakeData";
import Image from "next/image";
import MoimDetailParticipantList from "./MoimDetailParticipantList";

interface IMoimDetailProgress {
  moim: IMoimInformation;
}

const MoimDetailProgress = ({ moim }: IMoimDetailProgress) => {
  const participantPercentage = (moim.participantCount / moim.capacity) * 100;

  const participants = PARTICIPANTS;

  return (
    <div className="flex flex-col gap-3 px-6 pt-3 pb-6 sm:pt-2">
      <div className="flex justify-between">
        <div className="flex flex-row items-center gap-3">
          <span className="text-sm font-semibold text-gray-900">
            모집 정원 {participants.length}명
          </span>
          <MoimDetailParticipantList />
        </div>
        <Badge className="gap-1 bg-transparent p-0 text-sm font-medium text-orange-500">
          <Image src="/icons/Property 1=Variant2.svg" alt="check" width={24} height={24} />
          개설 확정
        </Badge>
      </div>
      <div className="flex flex-col gap-2">
        <Progress
          value={participantPercentage}
          className="h-1 w-full bg-orange-50 md:h-1.5 lg:h-2 [&>div]:bg-orange-600"
        />
        <div className="flex justify-between">
          <span className="text-xs font-medium">최소인원 5명</span>
          <span className="text-xs font-medium">최대인원 20명</span>
        </div>
      </div>
    </div>
  );
};

export default MoimDetailProgress;
