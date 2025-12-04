import { useState, useEffect } from "react";

export type MoimFilterValues = {
  category: "달림핏" | "런케이션";
  location: string;
  date: Date | undefined;
  sort: "마감임박" | "참여 인원 순";
};

type UseMoimFilterProps = {
  onFilterChange?: (filters: MoimFilterValues) => void;
  availableLocations?: string[];
};

export const useMoimFilter = ({ onFilterChange, availableLocations }: UseMoimFilterProps) => {
  const [category, setCategory] = useState<"달림핏" | "런케이션">("달림핏");
  const [location, setLocation] = useState("지역 전체");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [sort, setSort] = useState<"마감임박" | "참여 인원 순">("마감임박");

  // 초기 필터 값 전달
  useEffect(() => {
    onFilterChange?.({ category, location, date, sort });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCategoryChange = (value: string) => {
    const newCategory = value as "달림핏" | "런케이션";
    setCategory(newCategory);
    // 카테고리 변경 시 선택된 지역이 새로운 카테고리에 존재하지 않으면 "지역 전체"로 리셋
    const newLocation = availableLocations?.includes(location) ? location : "지역 전체";
    setLocation(newLocation);
    onFilterChange?.({ category: newCategory, location: newLocation, date, sort });
  };

  // availableLocations가 변경될 때 선택된 지역이 목록에 없으면 리셋
  useEffect(() => {
    if (
      availableLocations &&
      availableLocations.length > 0 &&
      !availableLocations.includes(location)
    ) {
      setLocation("지역 전체");
      onFilterChange?.({ category, location: "지역 전체", date, sort });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [availableLocations]);

  const handleLocationChange = (newLocation: string) => {
    setLocation(newLocation);
    onFilterChange?.({ category, location: newLocation, date, sort });
  };

  const handleDateChange = (newDate: Date | undefined) => {
    setDate(newDate);
    onFilterChange?.({ category, location, date: newDate, sort });
  };

  const handleSortChange = (newSort: "마감임박" | "참여 인원 순") => {
    setSort(newSort);
    onFilterChange?.({ category, location, date, sort: newSort });
  };

  return {
    category,
    location,
    date,
    sort,
    handleCategoryChange,
    handleLocationChange,
    handleDateChange,
    handleSortChange,
  };
};

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
