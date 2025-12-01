import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const MoimFindSort = () => (
  <DropdownMenu>
    <DropdownMenuTrigger className="flex h-9 w-9 items-center justify-center gap-1 rounded-[12px] border-2 border-gray-100 bg-white text-sm font-medium sm:h-10 sm:w-[110px]">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3 11L7 7M7 7L11 11M7 7V17"
          stroke="#111827"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M21 13L17 17M17 17L13 13M17 17V7"
          stroke="#111827"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
      <span className="hidden sm:block">마감 임박</span>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem className="data-highlighted:bg-orange-100">마감 임박</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

export default MoimFindSort;
