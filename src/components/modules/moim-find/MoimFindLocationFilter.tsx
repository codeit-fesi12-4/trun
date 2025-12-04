"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LOCATION_OPTIONS } from "@/constants/moimFakeData";
import Image from "next/image";

interface IMoimFindLocationFilterProps {
  selectedLocation: string;
  onLocationChange: (location: string) => void;
  availableLocations?: string[];
}

const MoimFindLocationFilter = ({
  selectedLocation,
  onLocationChange,
  availableLocations,
}: IMoimFindLocationFilterProps) => {
  // availableLocations가 제공되면 사용, 없으면 기본 LOCATION_OPTIONS 사용
  const locationOptions =
    availableLocations && availableLocations.length > 0 ? availableLocations : LOCATION_OPTIONS;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex h-7 w-21 items-center justify-center text-sm font-medium text-gray-500 focus:ring-0 focus:outline-none focus-visible:ring-0 data-[state=active]:border-0 sm:text-base">
        {selectedLocation}
        <Image
          src="../icons/down_arrow.svg"
          alt="지역 선택지 보기 아이콘"
          width={17}
          height={17}
          className="sm:mb-1"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-10 border-0">
        {locationOptions.map(option => (
          <DropdownMenuItem
            key={option}
            onClick={() => onLocationChange(option)}
            className="text-sm font-medium data-highlighted:bg-green-200"
          >
            {option}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MoimFindLocationFilter;
