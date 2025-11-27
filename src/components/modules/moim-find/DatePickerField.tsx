"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import TimeCalendar from "./TimeCalendar";

interface IDatePickerFieldProps {
  label: string;
  date: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
  formatDateTime: (date: Date | undefined) => string;
}

const DatePickerField = ({ label, date, onDateChange, formatDateTime }: IDatePickerFieldProps) => (
  <div className="flex w-full flex-col gap-2">
    <label className="text-sm font-semibold text-gray-700">{label}</label>
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-start border-transparent text-left font-semibold"
        >
          {date ? (
            formatDateTime(date)
          ) : (
            <span className="flex items-center gap-2 font-semibold text-gray-400">
              날짜 및 시간을 선택하세요
              <Image src="/icons/calendar.svg" alt="calendar" width={16} height={20} />
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

export default DatePickerField;
