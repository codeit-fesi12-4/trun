import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { REVIEW_FILTER_SORT } from "@/constants/review";
import Image from "next/image";

type ReviewSortProps = {
  selectedSort: "최신 리뷰 순" | "평점 높은 순" | "참여자 많은 순";
  onSortChange: (sort: "최신 리뷰 순" | "평점 높은 순" | "참여자 많은 순") => void;
};

const AllReviewSort = ({ selectedSort, onSortChange }: ReviewSortProps) => (
  <DropdownMenu>
    <DropdownMenuTrigger className="flex h-7 w-fit items-center justify-center gap-1 text-sm font-medium text-gray-500 focus:ring-0 focus:outline-none focus-visible:ring-0 data-[state=active]:border-0 sm:text-base">
      <Image src="../icons/sort.svg" alt="정렬 아이콘" width={18} height={18} />
      {selectedSort}
    </DropdownMenuTrigger>
    <DropdownMenuContent className="mr-8 border-0">
      {Object.values(REVIEW_FILTER_SORT).map(option => (
        <DropdownMenuItem
          key={option}
          onClick={() => onSortChange(option as "최신 리뷰 순" | "평점 높은 순" | "참여자 많은 순")}
          className="text-sm font-medium data-highlighted:bg-green-200"
        >
          {option}
        </DropdownMenuItem>
      ))}
    </DropdownMenuContent>
  </DropdownMenu>
);

export default AllReviewSort;
