import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const GetheringSort = () => (
  <DropdownMenu>
    <DropdownMenuTrigger className="flex h-[36px] w-[36px] items-center justify-center gap-[4px] rounded-[12px] border-[2px] border-gray-100 bg-white text-sm font-medium sm:h-[40px] sm:w-[110px]">
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
      <DropdownMenuItem>마감 임박</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

export default GetheringSort;
