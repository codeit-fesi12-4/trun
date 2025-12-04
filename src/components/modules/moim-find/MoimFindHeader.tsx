import Image from "next/image";
import MoimFindCategory from "./MoimFindCategory";
import { type MoimFilterValues } from "@/types/moimFind.type";

type MoimFindHeaderProps = {
  onFilterChange?: (filters: MoimFilterValues) => void;
  availableLocations?: string[];
};

const MoimFindHeader = ({ onFilterChange, availableLocations }: MoimFindHeaderProps) => (
  <div>
    <div className="relative mb-6 h-48 w-full overflow-hidden bg-[#9DEBCD] sm:h-[244px] sm:rounded-4xl">
      <div className="absolute -right-30 -bottom-17 h-[254px] w-[435px] sm:-right-25 sm:-bottom-10 sm:h-[273px] sm:w-[468px] md:right-0 md:-bottom-17 md:h-[313px] md:w-[536px]">
        <Image src="/images/img_moim_find.svg" alt="모임찾기이미지" fill className="object-cover" />
      </div>
      <div className="absolute ml-4 flex h-full flex-col justify-center gap-2 sm:ml-10 md:ml-10">
        <p className="text-sm font-medium text-green-800 sm:text-xl">
          함께할 사람을 찾고 계신가요?
        </p>
        <h1 className="text-lg font-semibold text-black sm:text-3xl">지금 모임에 참여해보세요</h1>
      </div>
    </div>
    <MoimFindCategory onFilterChange={onFilterChange} availableLocations={availableLocations} />
  </div>
);

export default MoimFindHeader;
