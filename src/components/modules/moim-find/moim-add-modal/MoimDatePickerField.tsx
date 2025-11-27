"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { TimeCalendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

interface IMoimDatePickerFieldProps {
  label: string;
  date: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
}

const MoimDatePickerField = ({ label, date, onDateChange }: IMoimDatePickerFieldProps) => {
  const formatDateTime = (dateValue: Date | undefined) => {
    if (!dateValue) return "";
    return format(dateValue, "yyyy-MM-dd hh:mm a", { locale: ko });
  };

  return (
    <div className="flex w-full flex-col gap-2">
      <label className="text-xs font-semibold text-gray-700 sm:text-sm">{label}</label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="h-8 w-full justify-start border-transparent px-2 text-left text-xs font-semibold sm:h-9 sm:px-3 sm:text-sm"
          >
            {date ? (
              formatDateTime(date)
            ) : (
              <span className="flex items-center gap-1.5 font-semibold text-gray-400 sm:gap-2">
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
        <PopoverContent className="w-auto border-transparent p-0" align="start">
          <TimeCalendar date={date} onDateChange={onDateChange} />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default MoimDatePickerField;
