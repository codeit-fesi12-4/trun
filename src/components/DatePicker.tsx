"use client";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";

const DatePicker = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [open, setOpen] = useState(false);

  if (date) {
    console.log(date.toLocaleDateString());
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!date}
          className={`flex h-[40px] w-[110px] items-center justify-center rounded-[12px] border-[2px] border-gray-100 text-sm font-medium shadow-none data-[state=active]:bg-gray-900 [&>svg]:!h-[24px] [&>svg]:!w-[24px] ${open ? `bg-gray-900 text-white` : `bg-white text-gray-900`}`}
        >
          {date ? date.toLocaleDateString() : <span>날짜 전체</span>}
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
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex h-fit w-[336px] flex-col items-center p-0">
        <Calendar mode="single" selected={date} onSelect={setDate} />
        <div className="mb-[24px] flex justify-center gap-[12px]">
          <button className="h-[40px] w-[118px] rounded-[12px] border-[1px] border-orange-600 text-sm font-semibold text-orange-600">
            초기화
          </button>
          <button className="h-[40px] w-[118px] rounded-[12px] bg-orange-600 text-sm font-semibold text-white">
            적용
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
