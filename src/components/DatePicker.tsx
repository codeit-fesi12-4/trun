"use client";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";

const DatePicker = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);

  const formatDate = (date: Date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}/${m}/${d}`;
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!date}
          className="flex h-10 w-[110px] items-center justify-center gap-0.5 rounded-[12px] border-2 border-gray-100 text-sm font-medium shadow-none hover:bg-white data-[state=open]:bg-gray-900 data-[state=open]:text-white [&>svg]:h-6! [&>svg]:w-6!"
        >
          {date ? formatDate(date) : <span>날짜 전체</span>}
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
        <div className="scale-90">
          <Calendar mode="single" selected={date} onSelect={setDate} className="" />
        </div>
        <div className="mb-6 flex justify-center gap-3">
          <button className="h-10 w-[118px] rounded-[12px] border border-orange-600 text-sm font-semibold text-orange-600">
            초기화
          </button>
          <button className="h-10 w-[118px] rounded-[12px] bg-orange-600 text-sm font-semibold text-white">
            적용
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
