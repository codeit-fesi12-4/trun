"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MoimFindLocationFilter from "./MoimFindLocationFilter";
import MoimFindDatePicker from "./MoimFindDatePicker";
import MoimFindSort from "./MoimFindSort";
import Image from "next/image";

export type MoimFilterValues = {
  category: "달림핏" | "런케이션";
  location: string;
  date: Date | undefined;
  sort: "마감임박" | "참여 인원 순";
};

interface IMoimFindCategoryProps {
  onFilterChange?: (filters: MoimFilterValues) => void;
}

const MoimFindCategory = ({ onFilterChange }: IMoimFindCategoryProps) => {
  const [category, setCategory] = useState<"달림핏" | "런케이션">("달림핏");
  const [location, setLocation] = useState("지역 전체");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [sort, setSort] = useState<"마감임박" | "참여 인원 순">("마감임박");

  // 초기 필터 값 전달
  useEffect(() => {
    onFilterChange?.({ category, location, date, sort });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCategoryChange = (value: string) => {
    const newCategory = value as "달림핏" | "런케이션";
    setCategory(newCategory);
    onFilterChange?.({ category: newCategory, location, date, sort });
  };

  const handleLocationChange = (newLocation: string) => {
    setLocation(newLocation);
    onFilterChange?.({ category, location: newLocation, date, sort });
  };

  const handleDateChange = (newDate: Date | undefined) => {
    setDate(newDate);
    onFilterChange?.({ category, location, date: newDate, sort });
  };

  const handleSortChange = (newSort: "마감임박" | "참여 인원 순") => {
    setSort(newSort);
    onFilterChange?.({ category, location, date, sort: newSort });
  };

  return (
    <div className="flex h-[95px] flex-col md:h-[53px] md:flex-row md:items-center md:justify-between md:border-b md:border-gray-200">
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
      <div className="mt-8 flex flex-row md:mt-0 md:gap-3 md:px-3">
        <MoimFindLocationFilter
          selectedLocation={location}
          onLocationChange={handleLocationChange}
        />
        <MoimFindDatePicker selectedDate={date} onDateChange={handleDateChange} />
        <MoimFindSort selectedSort={sort} onSortChange={handleSortChange} />
      </div>
    </div>
  );
};

export default MoimFindCategory;
