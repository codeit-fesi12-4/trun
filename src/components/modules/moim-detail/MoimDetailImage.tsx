import { GetMoimResponse } from "@/types/moimDetail.type";
import Image from "next/image";

type MoimDetailImage = {
  moim: GetMoimResponse;
};

const MoimDetailImage = ({ moim }: MoimDetailImage) => (
  <div className="w-full sm:h-full sm:w-1/2">
    <div className="relative aspect-343/241 w-full overflow-hidden rounded-3xl border-2 border-gray-200 sm:aspect-auto sm:h-full md:aspect-630/443 md:h-auto">
      <Image src={moim.image} alt="모임 이미지" fill className="object-cover" />
    </div>
  </div>
);

export default MoimDetailImage;
