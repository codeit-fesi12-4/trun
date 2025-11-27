import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { IMoimInformation } from "@/constants/moimFakeData";
import Image from "next/image";
import MoimDetailPaticipantList from "./MoimDetailPaticipantList";

interface IMoimDetailProgress {
  moim: IMoimInformation;
}

const MoimDetailProgress = ({ moim }: IMoimDetailProgress) => {
  const participantPercentage = (moim.participantCount / moim.capacity) * 100;

  return (
    <div className="flex flex-col gap-3 px-6 pt-3 pb-6">
      <div className="flex justify-between">
        <div className="flex flex-row">
          <span>모집 정원 {moim.capacity}명</span>
          <MoimDetailPaticipantList />
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
