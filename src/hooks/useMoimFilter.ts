import { useState, useEffect } from "react";
import { type MoimFilterValues } from "@/types/moimFind.type";
import { FILTER_CATEGORY, MOIM_LOCATION, FILTER_SORT } from "@/constants/moim";

type UseMoimFilterProps = {
  onFilterChange?: (filters: MoimFilterValues) => void;
  availableLocations?: string[];
};

export const useMoimFilter = ({ onFilterChange, availableLocations }: UseMoimFilterProps) => {
  const [category, setCategory] = useState<"달림핏" | "런케이션">(FILTER_CATEGORY.DALLIMFIT);
  const [location, setLocation] = useState<string>(MOIM_LOCATION.ALL);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [sort, setSort] = useState<"마감임박 순" | "참여 인원 순">(FILTER_SORT.DEADLINE);

  // 필터 객체 생성 헬퍼 함수
  const createFilterValues = (): MoimFilterValues => ({
    category,
    location,
    date,
    sort,
  });

  // 지역 리셋 로직 공통화
  const resetLocationIfInvalid = (currentLocation: string): string =>
    availableLocations?.includes(currentLocation) ? currentLocation : MOIM_LOCATION.ALL;

  // 초기 필터 값 전달
  useEffect(() => {
    onFilterChange?.(createFilterValues());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCategoryChange = (value: string) => {
    const newCategory = value as "달림핏" | "런케이션";
    setCategory(newCategory);
    // 카테고리 변경 시 선택된 지역이 새로운 카테고리에 존재하지 않으면 "지역 전체"로 리셋
    const newLocation = resetLocationIfInvalid(location);
    setLocation(newLocation);
    onFilterChange?.({ ...createFilterValues(), category: newCategory, location: newLocation });
  };

  // availableLocations가 변경될 때 선택된 지역이 목록에 없으면 리셋
  useEffect(() => {
    if (
      availableLocations &&
      availableLocations.length > 0 &&
      !availableLocations.includes(location)
    ) {
      const newLocation = MOIM_LOCATION.ALL;
      setLocation(newLocation);
      onFilterChange?.({ ...createFilterValues(), location: newLocation });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [availableLocations]);

  const handleLocationChange = (newLocation: string) => {
    setLocation(newLocation);
    onFilterChange?.({ ...createFilterValues(), location: newLocation });
  };

  const handleDateChange = (newDate: Date | undefined) => {
    setDate(newDate);
    onFilterChange?.({ ...createFilterValues(), date: newDate });
  };

  const handleSortChange = (newSort: "마감임박 순" | "참여 인원 순") => {
    setSort(newSort);
    onFilterChange?.({ ...createFilterValues(), sort: newSort });
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
