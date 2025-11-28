"use client";

import * as React from "react";
import { DayButton } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Calendar, CalendarDayButton } from "@/components/ui/calendar";

// 시간 선택 컴포넌트
interface ITimePickerProps {
  date: Date | undefined;
  onTimeChange: (newDate: Date) => void;
}

function TimePicker({ date, onTimeChange }: ITimePickerProps) {
  const hours = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0"));
  const minutes = Array.from({ length: 12 }, (_, i) => String(i * 5).padStart(2, "0"));
  const periods = ["AM", "PM"];

  const currentHour = date ? date.getHours() % 12 || 12 : 12;
  const currentMinute = date ? Math.round(date.getMinutes() / 5) * 5 : 0;
  const currentPeriod = date ? (date.getHours() >= 12 ? "PM" : "AM") : "PM";

  const hourColumnRef = React.useRef<HTMLDivElement>(null);
  const minuteColumnRef = React.useRef<HTMLDivElement>(null);

  // 마우스 휠 스크롤 이벤트 핸들러
  React.useEffect(() => {
    const handleHourWheel = (e: WheelEvent) => {
      if (hourColumnRef.current) {
        e.preventDefault();
        hourColumnRef.current.scrollTop += e.deltaY;
      }
    };

    const handleMinuteWheel = (e: WheelEvent) => {
      if (minuteColumnRef.current) {
        e.preventDefault();
        minuteColumnRef.current.scrollTop += e.deltaY;
      }
    };

    const hourColumn = hourColumnRef.current;
    const minuteColumn = minuteColumnRef.current;

    if (hourColumn) {
      hourColumn.addEventListener("wheel", handleHourWheel, { passive: false });
    }
    if (minuteColumn) {
      minuteColumn.addEventListener("wheel", handleMinuteWheel, { passive: false });
    }

    return () => {
      if (hourColumn) {
        hourColumn.removeEventListener("wheel", handleHourWheel);
      }
      if (minuteColumn) {
        minuteColumn.removeEventListener("wheel", handleMinuteWheel);
      }
    };
  }, []);

  const handleHourChange = (hour: string) => {
    if (!date) return;
    const newDate = new Date(date);
    const hour24 = currentPeriod === "PM" ? parseInt(hour) + 12 : parseInt(hour);
    newDate.setHours(hour24 === 24 ? 0 : hour24, currentMinute);
    onTimeChange(newDate);
  };

  const handleMinuteChange = (minute: string) => {
    if (!date) return;
    const newDate = new Date(date);
    const hour24 = currentPeriod === "PM" ? currentHour + 12 : currentHour;
    newDate.setHours(hour24 === 24 ? 0 : hour24, parseInt(minute));
    onTimeChange(newDate);
  };

  const handlePeriodChange = (period: string) => {
    if (!date) return;
    const newDate = new Date(date);
    const hour24 =
      period === "PM"
        ? currentHour === 12
          ? 12
          : currentHour + 12
        : currentHour === 12
          ? 0
          : currentHour;
    newDate.setHours(hour24, currentMinute);
    onTimeChange(newDate);
  };

  return (
    <div className="flex gap-2 border-gray-200 py-4">
      {/* 시간 컬럼 */}
      <div
        ref={hourColumnRef}
        className="time-picker-scrollbar flex h-[160px] w-16 flex-col gap-4 overflow-y-auto md:h-[250px]"
      >
        {hours.map(hour => {
          const isSelected = parseInt(hour) === currentHour;
          return (
            <button
              key={hour}
              type="button"
              onClick={() => handleHourChange(hour)}
              className={`mx-2.5 flex items-center justify-center rounded-md py-1.5 text-xs font-semibold transition-colors ${
                isSelected ? "bg-orange-500 text-white" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {hour}
            </button>
          );
        })}
      </div>

      {/* 분 컬럼 */}
      <div
        ref={minuteColumnRef}
        className="time-picker-scrollbar flex h-[160px] w-16 flex-col gap-4 overflow-y-auto md:h-[250px]"
      >
        {minutes.map(minute => {
          const isSelected = parseInt(minute) === currentMinute;
          return (
            <button
              key={minute}
              type="button"
              onClick={() => handleMinuteChange(minute)}
              className={`mx-2.5 flex items-center justify-center rounded-md py-1.5 text-xs font-semibold transition-colors ${
                isSelected ? "bg-orange-500 text-white" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {minute}
            </button>
          );
        })}
      </div>

      {/* AM/PM 컬럼 */}
      <div className="flex h-[160px] w-14 flex-col gap-4 md:h-[250px]">
        {periods.map(period => {
          const isSelected = period === currentPeriod;
          return (
            <button
              key={period}
              type="button"
              onClick={() => handlePeriodChange(period)}
              className={`mx-2 flex items-center justify-center rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
                isSelected ? "bg-orange-500 text-white" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {period}
            </button>
          );
        })}
      </div>
    </div>
  );
}

interface ITimeCalendarProps {
  date: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
}

function TimeCalendar({ date, onDateChange }: ITimeCalendarProps) {
  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      const newDate = new Date(selectedDate);
      if (date) {
        // 기존 시간 유지
        newDate.setHours(date.getHours(), date.getMinutes());
      } else {
        // 기본 시간 설정
        newDate.setHours(12, 0);
      }
      onDateChange(newDate);
    } else {
      onDateChange(undefined);
    }
  };

  const handleTimeChange = (newDate: Date) => {
    if (!date) {
      // 날짜가 없으면 오늘 날짜로 설정
      const today = new Date();
      today.setHours(newDate.getHours(), newDate.getMinutes());
      onDateChange(today);
    } else {
      // 기존 날짜에 새 시간 적용
      const updatedDate = new Date(date);
      updatedDate.setHours(newDate.getHours(), newDate.getMinutes());
      onDateChange(updatedDate);
    }
  };

  // 커스텀 DayButton: 기존 CalendarDayButton을 확장하여 주황색 배경, 하얀색 글자, rounded 적용
  const CustomDayButton = (props: React.ComponentProps<typeof DayButton>) => (
    <CalendarDayButton
      {...props}
      className={cn(
        props.className,
        "data-[selected-single=true]:rounded-md data-[selected-single=true]:bg-orange-500 data-[selected-single=true]:text-white",
      )}
    />
  );

  return (
    <div className="flex flex-col md:flex-row">
      <div className="max-h-[275px] overflow-y-auto">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateSelect}
          initialFocus
          classNames={{
            week: "flex w-full",
            weekday: "rounded-md flex-1 font-semibold text-[0.8rem] select-none py-1 px-1",
            month: "gap-1.5",
            month_caption: "flex justify-center py-1.5",
          }}
          components={{
            DayButton: CustomDayButton,
          }}
        />
      </div>
      <TimePicker date={date || new Date()} onTimeChange={handleTimeChange} />
    </div>
  );
}

export { TimeCalendar, TimePicker };
