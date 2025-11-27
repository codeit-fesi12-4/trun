"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

const MoimFindFilter = () => {
  const [selectedLocation, setSelectedLocation] = useState("지역 전체");

  const options = ["지역 전체", "건대입구", "종로 3가"];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex h-10 w-[110px] items-center justify-center gap-[5px] rounded-[12px] border-2 border-gray-100 bg-white text-sm font-medium data-[state=open]:bg-gray-900 data-[state=open]:text-white">
        {selectedLocation}
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.7151 15.4653C12.3975 15.7654 11.9008 15.7654 11.5832 15.4653L5.8047 10.006C5.26275 9.49404 5.6251 8.58286 6.37066 8.58286L17.9276 8.58286C18.6732 8.58286 19.0355 9.49404 18.4936 10.006L12.7151 15.4653Z"
            fill="currentColor"
          />
        </svg>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {options.map(option => (
          <DropdownMenuItem
            key={option}
            onSelect={() => setSelectedLocation(option)}
            className="data-highlighted:bg-orange-100"
          >
            {option}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MoimFindFilter;
