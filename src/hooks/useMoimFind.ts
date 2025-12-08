import { useState, useMemo } from "react";
import { useMoimsQuery } from "@/api/moim.api";
import { GetMoimsParams, MoimType, MoimLocation, SortBy, SortOrder } from "@/types/moim.type";
import {
  MOIM_TYPE,
  FILTER_CATEGORY,
  MOIM_LOCATION,
  FILTER_SORT,
  SORT_BY,
  SORT_ORDER,
} from "@/constants/moim";
import { parseISO, isSameDay } from "date-fns";
import { type MoimFilterValues } from "@/types/moimFind.type";

export const useMoimFind = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState<MoimFilterValues>({
    category: FILTER_CATEGORY.DALLIMFIT,
    location: MOIM_LOCATION.ALL,
    date: undefined,
    sort: FILTER_SORT.DEADLINE,
  });

  // 카테고리를 MoimType으로 변환
  const convertCategoryToMoimType = (category: "달림핏" | "런케이션"): MoimType | undefined => {
    if (category === FILTER_CATEGORY.DALLIMFIT) return MOIM_TYPE.DALLIMFIT;
    return MOIM_TYPE.RUNCATION;
  };

  // 지역을 MoimLocation으로 변환
  const convertLocationToMoimLocation = (location: string): MoimLocation | undefined => {
    if (location === MOIM_LOCATION.ALL) return undefined;
    return location as MoimLocation;
  };

  // 정렬을 SortBy로 변환
  const convertSortToSortBy = (sort: "마감임박 순" | "참여 인원 순"): SortBy => {
    if (sort === FILTER_SORT.DEADLINE) return SORT_BY.REGISTRATION_END;
    return SORT_BY.PARTICIPANT_COUNT;
  };

  // 정렬 순서 변환 헬퍼 함수
  const convertSortToSortOrder = (sort: "마감임박 순" | "참여 인원 순"): SortOrder =>
    sort === FILTER_SORT.DEADLINE ? SORT_ORDER.ASC : SORT_ORDER.DESC;

  // API 파라미터 생성
  const queryParams: GetMoimsParams = useMemo(() => {
    const params: GetMoimsParams = {
      type: convertCategoryToMoimType(filters.category),
      location: convertLocationToMoimLocation(filters.location),
      sortBy: convertSortToSortBy(filters.sort),
      sortOrder: convertSortToSortOrder(filters.sort),
    };
    return params;
  }, [filters.category, filters.location, filters.sort]);

  // 지역 목록 추출을 위한 쿼리 (카테고리만 필터링)
  const categoryOnlyParams: GetMoimsParams = useMemo(
    () => ({
      type: convertCategoryToMoimType(filters.category),
      sortBy: convertSortToSortBy(filters.sort),
      sortOrder: convertSortToSortOrder(filters.sort),
    }),
    [filters.category, filters.sort],
  );

  const { data: moimsForLocation } = useMoimsQuery({
    params: categoryOnlyParams,
  });

  // 선택된 카테고리의 모임들에서 실제 존재하는 지역 목록 추출
  const availableLocations = useMemo(() => {
    if (!moimsForLocation) return [MOIM_LOCATION.ALL];
    const locations = new Set<string>();
    moimsForLocation.forEach(moim => {
      if (moim.location) {
        locations.add(moim.location);
      }
    });
    return [MOIM_LOCATION.ALL, ...Array.from(locations).sort()];
  }, [moimsForLocation]);

  const { data: moims, isLoading, error } = useMoimsQuery({ params: queryParams });

  // 날짜 필터링 (클라이언트 사이드) - 원본 Moim 데이터 사용
  const filteredMoims = useMemo(() => {
    if (!moims || !filters.date) return moims;

    return moims.filter(moim => {
      try {
        const moimDate = parseISO(moim.dateTime);
        return isSameDay(moimDate, filters.date!);
      } catch {
        return false;
      }
    });
  }, [moims, filters.date]);

  const handleFilterChange = (newFilters: MoimFilterValues) => {
    setFilters(newFilters);
  };

  return {
    isModalOpen,
    setIsModalOpen,
    moimCardData: filteredMoims || [],
    availableLocations,
    isLoading,
    error,
    handleFilterChange,
  };
};
