import { FILTER_CATEGORY, MOIM_LOCATION } from "@/constants/moim";
import { ReviewFilterProps, ReviewFilterValues } from "@/types/review.type";
import { useState, useEffect } from "react";

type UseReviewFilterProps = ReviewFilterProps;

export const useReviewFilter = ({ onFilterChange, availableLocations }: UseReviewFilterProps) => {
  const [category, setCategory] = useState<"달림핏" | "런케이션">(FILTER_CATEGORY.DALLIMFIT);
  const [location, setLocation] = useState<string>(MOIM_LOCATION.ALL);
  const [sort, setSort] = useState<"최신 리뷰 순" | "평점 높은 순" | "참여자 많은 순">(
    "최신 리뷰 순",
  );

  // 필터 객체 생성 헬퍼 함수
  const createFilterValues = (): ReviewFilterValues => ({
    category,
    location,
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

  const handleSortChange = (newSort: "최신 리뷰 순" | "평점 높은 순" | "참여자 많은 순") => {
    setSort(newSort);
    onFilterChange?.({ ...createFilterValues(), sort: newSort });
  };

  return {
    category,
    location,
    sort,
    handleCategoryChange,
    handleLocationChange,
    handleSortChange,
  };
};
