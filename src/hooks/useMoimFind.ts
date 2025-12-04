import { useState, useMemo } from "react";
import { useMoimsQuery } from "@/hooks/api/moim.api";
import { convertMoimsToMoimCardData } from "@/utils/moim.util";
import { GetMoimsParams, MoimType, SortBy } from "@/types/moim.type";
import { MOIM_TYPE } from "@/constants";
import { parseISO, isSameDay } from "date-fns";
import { MoimFilterValues } from "./useMoimFilter";

export const useMoimFind = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState<MoimFilterValues>({
    category: "달림핏",
    location: "지역 전체",
    date: undefined,
    sort: "마감임박",
  });

  // 카테고리를 MoimType으로 변환
  const convertCategoryToMoimType = (category: "달림핏" | "런케이션"): MoimType | undefined => {
    if (category === "달림핏") return MOIM_TYPE.DALLIMFIT;
    return MOIM_TYPE.RUNCATION;
  };

  // 지역을 MoimLocation으로 변환
  const convertLocationToMoimLocation = (location: string): string | undefined => {
    if (location === "지역 전체") return undefined;
    return location;
  };

  // 정렬을 SortBy로 변환
  const convertSortToSortBy = (sort: "마감임박" | "참여 인원 순"): SortBy => {
    if (sort === "마감임박") return "registrationEnd";
    return "participantCount";
  };

  // API 파라미터 생성
  const queryParams: GetMoimsParams = useMemo(() => {
    const params: GetMoimsParams = {
      type: convertCategoryToMoimType(filters.category),
      location: convertLocationToMoimLocation(filters.location) as
        | "건대입구"
        | "을지로3가"
        | "신림"
        | "홍대입구"
        | undefined,
      sortBy: convertSortToSortBy(filters.sort),
      sortOrder: filters.sort === "마감임박" ? "asc" : "desc",
    };
    return params;
  }, [filters.category, filters.location, filters.sort]);

  // 지역 목록 추출을 위한 쿼리 (카테고리만 필터링)
  const categoryOnlyParams: GetMoimsParams = useMemo(
    () => ({
      type: convertCategoryToMoimType(filters.category),
      sortBy: convertSortToSortBy(filters.sort),
      sortOrder: filters.sort === "마감임박" ? "asc" : "desc",
    }),
    [filters.category, filters.sort],
  );

  const { data: moimsForLocation } = useMoimsQuery({
    params: categoryOnlyParams,
  });

  // 선택된 카테고리의 모임들에서 실제 존재하는 지역 목록 추출
  const availableLocations = useMemo(() => {
    if (!moimsForLocation) return ["지역 전체"];
    const locations = new Set<string>();
    moimsForLocation.forEach(moim => {
      if (moim.location) {
        locations.add(moim.location);
      }
    });
    return ["지역 전체", ...Array.from(locations).sort()];
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

  // 필터링된 Moim 데이터를 MoimCardData로 변환
  const moimCardData = filteredMoims ? convertMoimsToMoimCardData(filteredMoims) : undefined;

  const handleFilterChange = (newFilters: MoimFilterValues) => {
    setFilters(newFilters);
  };

  return {
    isModalOpen,
    setIsModalOpen,
    moimCardData: moimCardData || [],
    availableLocations,
    isLoading,
    error,
    handleFilterChange,
  };
};
