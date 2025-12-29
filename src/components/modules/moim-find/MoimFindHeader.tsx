import Image from "next/image";
import { type MoimFilterProps } from "@/types/moimFind.type";
import { useMoimFilter } from "@/hooks/useMoimFilter";
import CategoryShell from "@/components/common/CategoryShell";
import LocationFilter from "@/components/common/LocationFilter";
import MoimSort from "@/components/common/MoimSort";
import MoimFindDatePicker from "@/components/common/MoimDatePicker";

const MoimFindHeader = ({ onFilterChange, availableLocations, filters }: MoimFilterProps) => {
  const {
    category,
    location,
    date,
    sortBy,
    handleCategoryChange,
    handleLocationChange,
    handleDateChange,
    handleSortChange,
  } = useMoimFilter({ onFilterChange, availableLocations, filters });
  return (
    <div className="-mx-6 -mt-6 sm:mx-0 sm:mt-2">
      <div className="relative mb-6 h-48 w-full overflow-hidden bg-[#9DEBCD] sm:h-[244px] sm:rounded-4xl">
        <div className="absolute -right-30 -bottom-17 h-[254px] w-[435px] sm:-right-25 sm:-bottom-10 sm:h-[273px] sm:w-[468px] md:right-0 md:-bottom-17 md:h-[313px] md:w-[536px]">
          <Image
            src="/images/img_moim_find.svg"
            alt="모임찾기이미지"
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute ml-4 flex h-full flex-col justify-center gap-2 sm:ml-10 md:ml-10">
          <p className="text-sm font-medium text-green-800 sm:text-xl">
            함께할 사람을 찾고 계신가요?
          </p>
          <h1 className="text-lg font-semibold text-black sm:text-3xl">지금 모임에 참여해보세요</h1>
        </div>
      </div>
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
        DateSlot={<MoimFindDatePicker selectedDate={date} onDateChange={handleDateChange} />}
        SortSlot={<MoimSort selectedSort={sortBy} onSortChange={handleSortChange} />}
      />
    </div>
  );
};

export default MoimFindHeader;
