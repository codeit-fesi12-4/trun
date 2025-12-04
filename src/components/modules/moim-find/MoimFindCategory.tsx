"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MoimFindLocationFilter from "./MoimFindLocationFilter";
import MoimFindDatePicker from "./MoimFindDatePicker";
import MoimFindSort from "./MoimFindSort";
import Image from "next/image";
import { useMoimFilter } from "@/hooks/useMoimFilter";
import { type MoimFilterValues } from "@/types/moimFind.type";

type MoimFindCategoryProps = {
  onFilterChange?: (filters: MoimFilterValues) => void;
  availableLocations?: string[];
};

const MoimFindCategory = ({ onFilterChange, availableLocations }: MoimFindCategoryProps) => {
  const {
    category,
    location,
    date,
    sort,
    handleCategoryChange,
    handleLocationChange,
    handleDateChange,
    handleSortChange,
  } = useMoimFilter({ onFilterChange, availableLocations });

  return (
    <div className="flex h-[95px] flex-col md:h-[53px] md:flex-row md:items-center md:justify-between md:border-b md:border-gray-200">
      {/* 카테고리 탭 영역 */}
      <Tabs value={category} onValueChange={handleCategoryChange}>
        <TabsList className="flex w-full justify-between bg-transparent">
          <div className="flex w-full border-b border-gray-200 md:border-0">
            <TabsTrigger
              value="달림핏"
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
              value="런케이션"
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
      <div className="mt-8 flex flex-row md:mt-0 md:gap-3 md:px-3">
        <MoimFindLocationFilter
          selectedLocation={location}
          onLocationChange={handleLocationChange}
          availableLocations={availableLocations}
        />
        <MoimFindDatePicker selectedDate={date} onDateChange={handleDateChange} />
        <MoimFindSort selectedSort={sort} onSortChange={handleSortChange} />
      </div>
    </div>
  );
};

export default MoimFindCategory;
