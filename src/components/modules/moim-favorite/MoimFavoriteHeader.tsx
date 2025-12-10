"use client";
import Image from "next/image";
import { type MoimFilterProps } from "@/types/moimFind.type";
import { useMoimFilter } from "@/hooks/useMoimFilter";
import MoimDatePicker from "@/components/common/MoimDatePicker";
import CategoryShell from "@/components/common/CategoryShell";
import LocationFilter from "@/components/common/LocationFilter";
import MoimSort from "@/components/common/MoimSort";

const MoimFavoriteHeader = ({ onFilterChange, availableLocations }: MoimFilterProps) => {
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
    <div className="mt-2 sm:mt-4">
      <div className="flex flex-row gap-3 px-2 sm:gap-[26px]">
        <Image
          src="/icons/img_favorite.svg"
          alt="찜한 모임 이미지"
          width={68}
          height={50}
          className="sm:h-[76px] sm:w-[102px]"
        />
        <div className="flex flex-col sm:gap-5">
          <h1 className="text-lg font-semibold text-gray-800 sm:text-[32px]">찜한 모임</h1>
          <p className="text-base font-medium text-gray-400 sm:text-xl">
            마감되기 전에 지금 바로 참여해보세요 👀
          </p>
        </div>
      </div>
      <div className="mt-8 sm:mt-10 md:mt-14">
        <CategoryShell
          category={category}
          onCategoryChange={handleCategoryChange}
          LocationSlot={
            <LocationFilter
              selectedLocation={location}
              onLocationChange={handleLocationChange}
              availableLocations={availableLocations}
            />
          }
          DateSlot={<MoimDatePicker selectedDate={date} onDateChange={handleDateChange} />}
          SortSlot={<MoimSort selectedSort={sort} onSortChange={handleSortChange} />}
        />
      </div>
    </div>
  );
};

export default MoimFavoriteHeader;
