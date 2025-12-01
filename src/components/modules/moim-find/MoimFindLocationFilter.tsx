"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { useState } from "react";

const MoimFindLocationFilter = () => {
  const [selectedLocation, setSelectedLocation] = useState("지역 전체");

  const options = ["지역 전체", "건대입구", "종로 3가"];

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
      <DropdownMenuContent className="ml-4 border-0">
        {options.map(option => (
          <DropdownMenuItem
            key={option}
            onSelect={() => setSelectedLocation(option)}
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
