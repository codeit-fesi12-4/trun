"use client";
import { Button } from "@/components/ui/button";
import { Calendar, CalendarDayButton } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import Image from "next/image";
import { useState } from "react";
import { format } from "date-fns";

const MoimFindDatePicker = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!date}
          className="flex h-7 w-21 items-center justify-center gap-0 border-none bg-transparent text-sm font-medium text-gray-500! shadow-none hover:bg-transparent data-[state=open]:bg-transparent data-[state=open]:text-black sm:text-base"
        >
          {date ? format(new Date(), "yyyy/MM/dd") : <span>날짜 전체</span>}
          <Image
            src="../icons/down_arrow.svg"
            alt="날짜 선택지 보기 아이콘"
            width={17}
            height={17}
            className="sm:mb-1"
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent side="bottom" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          components={{
            DayButton: props => (
              <CalendarDayButton
                {...props}
                className="data-[selected-single=true]:text-bold data-[selected-single=true]:bg-green-200 data-[selected-single=true]:text-green-600"
              />
            ),
          }}
        />
        <div className="flex justify-center gap-3">
          <button className="h-10 w-1/2 rounded-[12px] border border-green-500 text-sm font-semibold text-green-600">
            초기화
          </button>
          <button className="h-10 w-1/2 rounded-[12px] bg-green-500 text-sm font-semibold text-white">
            적용
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default MoimFindDatePicker;
