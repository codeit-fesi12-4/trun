import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { REVIEW_FILTER_SORT } from "@/constants/review";
import { ReviewSortBy } from "@/types/review.type";
import Image from "next/image";

type ReviewSortProps = {
  selectedSort: ReviewSortBy;
  onSortChange: (sort: ReviewSortBy) => void;
};

const AllReviewSort = ({ selectedSort, onSortChange }: ReviewSortProps) => (
  <DropdownMenu>
    <DropdownMenuTrigger className="flex h-7 w-fit items-center justify-center gap-1 text-sm font-medium text-gray-500 focus:ring-0 focus:outline-none focus-visible:ring-0 data-[state=active]:border-0 sm:text-base">
      <Image src="/icons/sort.svg" alt="정렬 아이콘" width={18} height={18} />
      {REVIEW_FILTER_SORT[selectedSort]}
    </DropdownMenuTrigger>
    <DropdownMenuContent className="mr-8 border-0">
      {Object.entries(REVIEW_FILTER_SORT).map(([key, label]) => (
        <DropdownMenuItem
          key={key}
          onClick={() => onSortChange(key as ReviewSortBy)}
          className="text-sm font-medium data-highlighted:bg-green-200"
        >
          {label}
        </DropdownMenuItem>
      ))}
    </DropdownMenuContent>
  </DropdownMenu>
);

export default AllReviewSort;
