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
  // @@@ 이중 state를 제거
  // const [category, setCategory] = useState<MoimType>(filters.category);
  // const [location, setLocation] = useState<string>(filters.location);
  // const [date, setDate] = useState<Date | undefined>(filters.date);
  // const [sortBy, setSortBy] = useState<"dateTime" | ", 지금 구조는 “controlled + uncregistrationEnd" | "participantCount">(
  //   filters.sortBy,
  // );

  // @@@ 더이상 필요없어짐
  // 필터 객체 생성 헬퍼 함수
  // const createFilterValues = (): MoimFilterValues => ({
  //   category,
  //   location,
  //   date,
  //   sortBy,
  // });

  // 지역 리셋 로직 공통화
  const resetLocationIfInvalid = (currentLocation: string): string =>
    availableLocations?.includes(currentLocation) ? currentLocation : MOIM_LOCATION.ALL;

  // @@@ 초기 필터 값도 부모에서 해결
  // // 초기 필터 값 전달
  // useEffect(() => {
  //   setCategory(filters.category);
  //   setLocation(filters.location);
  //   setDate(filters.date);
  //   setSortBy(filters.sortBy);
  //   // onFilterChange?.(createFilterValues());
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [filters]);

  const handleCategoryChange = (category: MoimType) => {
    const nextLocation = resetLocationIfInvalid(filters.location);
    onFilterChange?.({
      ...filters,
      category,
      location: nextLocation,
    });
  };

  // @@@ 이것 또한 앞에서 부모에서 해결
  // availableLocations가 변경될 때 선택된 지역이 목록에 없으면 리셋 (카테고리 변경 시에만)
  // useEffect(() => {
  //   if (
  //     availableLocations &&
  //     availableLocations.length > 0 &&
  //     !availableLocations.includes(location) &&
  //     location !== MOIM_LOCATION.ALL
  //   ) {
  //     const newLocation = MOIM_LOCATION.ALL;
  //     setLocation(newLocation);
  //     onFilterChange?.({ ...createFilterValues(), location: newLocation });
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [availableLocations]);

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
