import { Badge } from "@/components/ui/badge";
import { FakeMoimInformation } from "@/constants/moimFakeData";
import Image from "next/image";

type MoimDetailImage = {
  moim: FakeMoimInformation;
};

const MoimDetailImage = ({ moim }: MoimDetailImage) => (
  <div className="w-full sm:h-full sm:w-1/2">
    <div className="relative aspect-343/180 w-full overflow-hidden rounded-3xl border-2 border-gray-200 sm:aspect-auto sm:h-full">
      <Image src={moim.image} alt="모임 이미지" fill className="object-cover" />
      {/* 이미지 위 오버레이 배지 */}
      <div className="absolute top-0 right-0">
        <Badge
          variant="outline"
          className="flex h-8 w-[123px] items-center gap-1 rounded-none rounded-bl-lg border-none bg-orange-600 py-0.5 pr-4 pl-2 text-xs font-medium text-white"
        >
          <Image src="/icons/ic_alarm.svg" alt="alarm" width={24} height={24} />
          {moim.registrationEnd}
        </Badge>
      </div>
    </div>
  </div>
);

export default MoimDetailImage;
