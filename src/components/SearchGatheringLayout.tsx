import Image from "next/image";
import GatheringCategory from "./GatheringCategory";

const SearchGatheringLayout = () => (
  <div className="mx-[10%]">
    <div className="mt-[50px] mb-[30px] flex flex-row gap-[16px]">
      <div className="h-[72px] w-[72px]">
        <Image src="icons/gathering.svg" alt="모임참여아이콘" width={100} height={100} />
      </div>
      <div className="flex flex-col justify-center gap-[8px]">
        <p className="text-sm font-medium text-gray-700">함께 할 사람이 없나요?</p>
        <h1 className="text-lg font-semibold text-gray-900 sm:text-2xl">
          지금 모임에 참여해보세요
        </h1>
      </div>
    </div>
    <GatheringCategory />
  </div>
);

export default SearchGatheringLayout;
