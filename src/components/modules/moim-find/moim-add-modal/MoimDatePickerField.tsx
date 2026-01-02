"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { TimeCalendar } from "@/components/ui/TimeCalendar";
import { formatDatePicker } from "@/utils/date.util";

type MoimDatePickerFieldProps = {
  label: string;
  date: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
  required?: boolean;
};

const MoimDatePickerField = ({
  label,
  date,
  onDateChange,
  required = false,
}: MoimDatePickerFieldProps) => (
  <div className="flex w-full flex-col gap-2">
    <label className="text-xs font-semibold text-gray-600 sm:text-sm">
      {label}
      {required && <span className="text-red-500"> *</span>}
    </label>
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="h-8 w-full cursor-pointer justify-start border-transparent px-2 text-left text-xs font-semibold sm:h-9 sm:px-3 sm:text-sm"
        >
          {date ? (
            formatDatePicker(date)
          ) : (
            <span className="flex w-full items-center justify-between font-semibold text-gray-400">
              <span className="text-xs sm:text-sm">날짜 및 시간을 선택하세요</span>
              <Image
                src="/icons/calendar.svg"
                alt="calendar"
                width={14}
                height={16}
                className="sm:h-5 sm:w-4"
              />
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="fixed z-[60] w-auto border-transparent p-0"
        align="start"
        side="bottom"
        onOpenAutoFocus={e => e.preventDefault()}
      >
        <TimeCalendar date={date} onDateChange={onDateChange} />
      </PopoverContent>
    </Popover>
  </div>
);

export default MoimDatePickerField;
