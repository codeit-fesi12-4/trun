"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MOIM_FILTER_SORT } from "@/constants/moim";
import { MoimSortBy } from "@/types/moim.type";
import Image from "next/image";

type MoimSortProps = {
  selectedSort: MoimSortBy;
  onSortChange: (sortBy: MoimSortBy) => void;
};

const MoimSort = ({ selectedSort, onSortChange }: MoimSortProps) => (
  <DropdownMenu modal={false}>
    <DropdownMenuTrigger className="flex h-7 w-fit cursor-pointer items-center justify-center gap-1 text-sm font-medium text-gray-500 focus:ring-0 focus:outline-none focus-visible:ring-0 data-[state=active]:border-0 sm:text-base">
      <Image src="/icons/sort.svg" alt="정렬 아이콘" width={18} height={18} />
      {MOIM_FILTER_SORT[selectedSort]}
    </DropdownMenuTrigger>
    <DropdownMenuContent className="mr-8 border-0">
      {Object.entries(MOIM_FILTER_SORT).map(([key, label]) => (
        <DropdownMenuItem
          key={key}
          onClick={() => onSortChange(key as MoimSortBy)}
          className="text-sm font-medium data-highlighted:bg-green-200"
        >
          {label}
        </DropdownMenuItem>
      ))}
    </DropdownMenuContent>
  </DropdownMenu>
);

export default MoimSort;
