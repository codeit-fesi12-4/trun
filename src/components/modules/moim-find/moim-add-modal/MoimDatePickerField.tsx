"use client";

// import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { TimeCalendar } from "@/components/ui/TimeCalendar";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

type MoimDatePickerFieldProps = {
  label: string;
  date: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
};

const MoimDatePickerField = ({ label, date, onDateChange }: MoimDatePickerFieldProps) => {
  // const [sideOffset, setSideOffset] = useState(320);

  // useEffect(() => {
  //   const handleResize = () => {
  //     // md 브레이크포인트 (768px) 기준
  //     if (window.innerWidth >= 768) {
  //       setSideOffset(290); // 데스크톱
  //     } else {
  //       setSideOffset(470); // 모바일/태블릿
  //     }
  //   };

  //   // 초기값 설정
  //   handleResize();

  //   // 리사이즈 이벤트 리스너 추가
  //   window.addEventListener("resize", handleResize);

  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);

  const formatDateTime = (dateValue: Date | undefined) => {
    if (!dateValue) return "";
    return format(dateValue, "yyyy-MM-dd hh:mm a", { locale: ko });
  };

  return (
    <div className="flex w-full flex-col gap-2">
      <label className="text-xs font-semibold text-gray-600 sm:text-sm">{label}</label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="h-8 w-full justify-start border-transparent px-2 text-left text-xs font-semibold sm:h-9 sm:px-3 sm:text-sm"
          >
            {date ? (
              formatDateTime(date)
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
          // sideOffset={sideOffset}
          onOpenAutoFocus={e => e.preventDefault()}
        >
          <TimeCalendar date={date} onDateChange={onDateChange} />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default MoimDatePickerField;
