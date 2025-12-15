import { Moim } from "@/types/moim.type";
import Image from "next/image";

type MoimDetailImage = {
  moim: Moim;
};

const MoimDetailImage = ({ moim }: MoimDetailImage) => {
  if (!moim.image)
    return <div className="w-full sm:h-[333px] sm:w-1/2 md:h-[443px]">이미지가 없습니다.</div>;
  return (
    <div className="w-full sm:h-[333px] sm:w-1/2 md:h-[443px]">
      <div className="relative aspect-343/241 w-full overflow-hidden rounded-[12px] sm:h-full sm:rounded-[20px] md:rounded-4xl">
        <Image src={moim.image} alt="모임 이미지" fill className="object-cover" />
      </div>
    </div>
  );
};

export default MoimDetailImage;
