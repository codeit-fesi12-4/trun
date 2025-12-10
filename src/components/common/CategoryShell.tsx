"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { FILTER_CATEGORY } from "@/constants/moim";

type CategoryShellProps = {
  category: "달림핏" | "런케이션";
  onCategoryChange: (val: "달림핏" | "런케이션") => void;
  LocationSlot?: React.ReactNode;
  DateSlot?: React.ReactNode;
  SortSlot?: React.ReactNode;
};

const CategoryShell = ({
  category,
  onCategoryChange,
  LocationSlot,
  DateSlot,
  SortSlot,
}: CategoryShellProps) => (
  <div className="flex h-[95px] flex-col md:h-[53px] md:flex-row md:items-center md:justify-between md:border-b md:border-gray-200">
    {/* 카테고리 탭 영역 */}
    <Tabs
      value={category}
      onValueChange={v => onCategoryChange(v as "달림핏" | "런케이션")}
      className="-mx-6 sm:mx-0"
    >
      <TabsList className="flex w-full justify-between bg-transparent">
        <div className="flex w-full border-b border-gray-200 md:border-0">
          <TabsTrigger
            value={FILTER_CATEGORY.DALLIMFIT}
            className="h-[53px] w-1/2 gap-2 bg-transparent! px-6 text-base font-semibold text-gray-500 data-[state=active]:rounded-none data-[state=active]:border-x-0 data-[state=active]:border-t-0 data-[state=active]:border-b-2 data-[state=active]:border-green-500 data-[state=active]:text-green-600 data-[state=active]:shadow-none md:text-xl"
          >
            <Image
              src="../icons/dallimfit.svg"
              alt="달림핏 아이콘"
              width={32}
              height={32}
              className="size-10"
            />
            달림핏
          </TabsTrigger>
          <TabsTrigger
            value={FILTER_CATEGORY.RUNCATION}
            className="h-[53px] w-1/2 gap-2 bg-transparent! px-6 text-base font-semibold text-gray-500 data-[state=active]:rounded-none data-[state=active]:border-x-0 data-[state=active]:border-t-0 data-[state=active]:border-b-2 data-[state=active]:border-green-500 data-[state=active]:text-green-600 data-[state=active]:shadow-none md:text-xl"
          >
            <Image
              src="../icons/runcation.svg"
              alt="런케이션 아이콘"
              width={40}
              height={40}
              className="md:size-13"
            />
            런케이션
          </TabsTrigger>
        </div>
      </TabsList>
    </Tabs>
    {/* 필터 영역 */}
    <div className="mt-8 ml-4 flex flex-row md:mt-0 md:gap-3 md:px-3">
      {LocationSlot && <div className="flex">{LocationSlot}</div>}
      {DateSlot && <div className="flex">{DateSlot}</div>}
      {SortSlot && <div className="flex">{SortSlot}</div>}
    </div>
  </div>
);

export default CategoryShell;
