"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SORT_OPTIONS } from "@/constants/moimFakeData";
import Image from "next/image";
import { useState } from "react";

const MoimFindSort = () => {
  const [selectedSort, setSelectedSort] = useState("마감임박");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex h-7 w-fit items-center justify-center text-sm font-medium text-gray-500 focus:ring-0 focus:outline-none focus-visible:ring-0 data-[state=active]:border-0 sm:text-base">
        <Image src="../icons/sort.svg" alt="정렬 아이콘" width={18} height={18} />
        {selectedSort}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="ml-15 border-0">
        {SORT_OPTIONS.map(option => (
          <DropdownMenuItem
            key={option}
            onClick={() => setSelectedSort(option)}
            className="text-sm font-medium data-highlighted:bg-green-200"
          >
            {option}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MoimFindSort;
