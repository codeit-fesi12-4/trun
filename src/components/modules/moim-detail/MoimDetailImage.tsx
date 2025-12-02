import { GetMoimResponse } from "@/types/moimDetail.type";
import Image from "next/image";

type MoimDetailImage = {
  moim: GetMoimResponse;
};

const MoimDetailImage = ({ moim }: MoimDetailImage) => (
  <div className="w-full sm:h-[333px] sm:w-1/2 md:h-[443px]">
    <div className="relative aspect-343/241 w-full overflow-hidden rounded-[12px] sm:h-full sm:rounded-[20px] md:rounded-4xl">
      <Image src={moim.image} alt="모임 이미지" fill className="object-cover" />
    </div>
  </div>
);

export default MoimDetailImage;
