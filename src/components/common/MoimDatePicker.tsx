"use client";
import { Calendar, CalendarDayButton } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import Image from "next/image";
import { useDatePicker } from "@/hooks/useMoimFilter";
import { formatDateWithDash } from "@/utils/date.util";

type MoimDatePickerProps = {
  selectedDate: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
};

const MoimDatePicker = ({ selectedDate, onDateChange }: MoimDatePickerProps) => {
  const { tempDate, setTempDate, isOpen, setIsOpen, handleReset, handleApply } = useDatePicker({
    selectedDate,
    onDateChange,
  });

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger
        data-empty={!selectedDate}
        className="flex h-7 w-27 items-center justify-center text-sm font-medium text-gray-500 focus:ring-0 focus:outline-none focus-visible:ring-0 sm:text-base"
      >
        <span>{formatDateWithDash(selectedDate) || "날짜 전체"}</span>
        <Image
          src="/icons/down_arrow.svg"
          alt="날짜 선택지 보기 아이콘"
          width={17}
          height={17}
          className="sm:mb-1"
        />
      </PopoverTrigger>
      <PopoverContent side="bottom" align="center">
        <Calendar
          mode="single"
          selected={tempDate}
          onSelect={setTempDate}
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
          <button
            onClick={handleReset}
            className="h-10 w-1/2 rounded-[12px] border border-green-500 text-sm font-semibold text-green-600"
          >
            초기화
          </button>
          <button
            onClick={handleApply}
            className="h-10 w-1/2 rounded-[12px] bg-green-500 text-sm font-semibold text-white"
          >
            적용
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default MoimDatePicker;
