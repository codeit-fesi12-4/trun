"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FILTER_SORT } from "@/constants/moim";
import Image from "next/image";

type MoimFindSortProps = {
  selectedSort: "마감임박 순" | "참여 인원 순";
  onSortChange: (sort: "마감임박 순" | "참여 인원 순") => void;
};

const MoimFindSort = ({ selectedSort, onSortChange }: MoimFindSortProps) => (
  <DropdownMenu>
    <DropdownMenuTrigger className="flex h-7 w-fit items-center justify-center gap-1 text-sm font-medium text-gray-500 focus:ring-0 focus:outline-none focus-visible:ring-0 data-[state=active]:border-0 sm:text-base">
      <Image src="../icons/sort.svg" alt="정렬 아이콘" width={18} height={18} />
      {selectedSort}
    </DropdownMenuTrigger>
    <DropdownMenuContent className="mr-8 border-0">
      {Object.values(FILTER_SORT).map(option => (
        <DropdownMenuItem
          key={option}
          onClick={() => onSortChange(option as "마감임박 순" | "참여 인원 순")}
          className="text-sm font-medium data-highlighted:bg-green-200"
        >
          {option}
        </DropdownMenuItem>
      ))}
    </DropdownMenuContent>
  </DropdownMenu>
);

export default MoimFindSort;
