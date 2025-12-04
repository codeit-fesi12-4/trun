"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MoimFindLocationFilter from "./MoimFindLocationFilter";
import MoimFindDatePicker from "./MoimFindDatePicker";
import MoimFindSort from "./MoimFindSort";
import Image from "next/image";

// 타입 파일로 분리 예정
export type MoimFilterValues = {
  category: "달림핏" | "런케이션";
  location: string;
  date: Date | undefined;
  sort: "마감임박" | "참여 인원 순";
};

type MoimFindCategoryProps = {
  onFilterChange?: (filters: MoimFilterValues) => void;
  availableLocations?: string[];
};

const MoimFindCategory = ({ onFilterChange, availableLocations }: MoimFindCategoryProps) => {
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
    // 카테고리 변경 시 선택된 지역이 새로운 카테고리에 존재하지 않으면 "지역 전체"로 리셋
    const newLocation = availableLocations?.includes(location) ? location : "지역 전체";
    setLocation(newLocation);
    onFilterChange?.({ category: newCategory, location: newLocation, date, sort });
  };

  // availableLocations가 변경될 때 선택된 지역이 목록에 없으면 리셋
  useEffect(() => {
    if (
      availableLocations &&
      availableLocations.length > 0 &&
      !availableLocations.includes(location)
    ) {
      setLocation("지역 전체");
      onFilterChange?.({ category, location: "지역 전체", date, sort });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [availableLocations]);

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
        {/* 이름 변경 필요 */}
        <MoimFindDatePicker selectedDate={date} onDateChange={handleDateChange} />
        <MoimFindSort selectedSort={sort} onSortChange={handleSortChange} />
      </div>
    </div>
  );
};

export default MoimFindCategory;
