import { useState, useEffect } from "react";
import { type MoimFilterProps } from "@/types/moimFind.type";
import { MOIM_LOCATION } from "@/constants/moim";
import { MoimType } from "@/types/moim.type";

type UseMoimFilterProps = MoimFilterProps;

export const useMoimFilter = ({
  onFilterChange,
  availableLocations,
  filters,
}: UseMoimFilterProps) => {
  // 지역 리셋 로직 공통화
  const resetLocationIfInvalid = (currentLocation: string): string =>
    availableLocations?.includes(currentLocation) ? currentLocation : MOIM_LOCATION.ALL;

  const handleCategoryChange = (category: MoimType) => {
    const nextLocation = resetLocationIfInvalid(filters.location);
    onFilterChange?.({
      ...filters,
      category,
      location: nextLocation,
    });
  };

  const handleLocationChange = (location: string) => {
    onFilterChange?.({ ...filters, location });
  };

  const handleDateChange = (date: Date | undefined) => {
    onFilterChange?.({ ...filters, date });
  };

  const handleSortChange = (sortBy: "dateTime" | "registrationEnd" | "participantCount") => {
    onFilterChange?.({ ...filters, sortBy });
  };

  return {
    ...filters,
    handleCategoryChange,
    handleLocationChange,
    handleDateChange,
    handleSortChange,
  };
};

// =================================================================================
// DatePicker용 커스텀 훅
type UseDatePickerProps = {
  selectedDate: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
};

export const useDatePicker = ({ selectedDate, onDateChange }: UseDatePickerProps) => {
  const [tempDate, setTempDate] = useState<Date | undefined>(selectedDate);
  const [isOpen, setIsOpen] = useState(false);

  // selectedDate가 변경되면 tempDate도 업데이트
  useEffect(() => {
    setTempDate(selectedDate);
  }, [selectedDate]);

  const handleReset = () => {
    setTempDate(undefined);
    onDateChange(undefined);
    setIsOpen(false);
  };

  const handleApply = () => {
    onDateChange(tempDate);
    setIsOpen(false);
  };

  return {
    tempDate,
    setTempDate,
    isOpen,
    setIsOpen,
    handleReset,
    handleApply,
  };
};
