"use client";

import { Calendar } from "@/components/ui/calendar";

// 시간 선택 컴포넌트
const TimePicker = ({
  date,
  onTimeChange,
}: {
  date: Date | undefined;
  onTimeChange: (newDate: Date) => void;
}) => {
  const hours = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0"));
  const minutes = Array.from({ length: 12 }, (_, i) => String(i * 5).padStart(2, "0"));
  const periods = ["AM", "PM"];

  const currentHour = date ? date.getHours() % 12 || 12 : 12;
  const currentMinute = date ? Math.round(date.getMinutes() / 5) * 5 : 0;
  const currentPeriod = date ? (date.getHours() >= 12 ? "PM" : "AM") : "PM";

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
    <div className="flex border-l border-gray-200">
      {/* 시간 컬럼 */}
      <div className="flex h-[280px] w-16 flex-col overflow-y-auto">
        {hours.map(hour => {
          const isSelected = parseInt(hour) === currentHour;
          return (
            <button
              key={hour}
              type="button"
              onClick={() => handleHourChange(hour)}
              className={`flex h-10 items-center justify-center text-sm transition-colors ${
                isSelected ? "bg-orange-500 text-white" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {hour}
            </button>
          );
        })}
      </div>

      {/* 분 컬럼 */}
      <div className="flex h-[280px] w-16 flex-col overflow-y-auto">
        {minutes.map(minute => {
          const isSelected = parseInt(minute) === currentMinute;
          return (
            <button
              key={minute}
              type="button"
              onClick={() => handleMinuteChange(minute)}
              className={`flex h-10 items-center justify-center text-sm transition-colors ${
                isSelected ? "bg-orange-500 text-white" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {minute}
            </button>
          );
        })}
      </div>

      {/* AM/PM 컬럼 */}
      <div className="flex h-[280px] w-16 flex-col overflow-y-auto">
        {periods.map(period => {
          const isSelected = period === currentPeriod;
          return (
            <button
              key={period}
              type="button"
              onClick={() => handlePeriodChange(period)}
              className={`flex h-10 items-center justify-center text-sm transition-colors ${
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
};

interface ITimeCalendarProps {
  date: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
}

const TimeCalendar = ({ date, onDateChange }: ITimeCalendarProps) => {
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

  // 훅으로 빠질 예정
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

  return (
    <div className="flex">
      <Calendar mode="single" selected={date} onSelect={handleDateSelect} initialFocus />
      <TimePicker date={date || new Date()} onTimeChange={handleTimeChange} />
    </div>
  );
};

export default TimeCalendar;
