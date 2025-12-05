import { useState, useMemo } from "react";
import { useMoimsQuery } from "@/hooks/api/moim.api";
import { GetMoimsParams, MoimType, MoimLocation } from "@/types/moim.type";
import { MOIM_TYPE, FILTER_CATEGORY, MOIM_LOCATION, FILTER_SORT } from "@/constants/moim";
import { parseISO, isSameDay } from "date-fns";
import { type MoimFilterValues } from "@/types/moimFind.type";
import { useAuthStore } from "@/stores/auth.store";
import { formatDateWithDash } from "@/utils/date.util";

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

  // API 파라미터 생성 (정렬은 클라이언트 사이드에서 처리)
  const queryParams: GetMoimsParams = useMemo(() => {
    const params: GetMoimsParams = {
      type: convertCategoryToMoimType(filters.category),
      location: convertLocationToMoimLocation(filters.location),
      date: formatDateWithDash(filters.date),
      limit: 100, // 전체 데이터를 가져오기 위해 큰 값 설정
      // 정렬 파라미터 제거 - 클라이언트 사이드에서 정렬 처리
    };
    return params;
  }, [filters.category, filters.location, filters.date]);

  // 지역 목록 추출을 위한 쿼리 (카테고리만 필터링, 정렬 불필요)
  const categoryOnlyParams: GetMoimsParams = useMemo(
    () => ({
      type: convertCategoryToMoimType(filters.category),
      limit: 100, // 전체 데이터를 가져오기 위해 큰 값 설정
    }),
    [filters.category],
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

  // 날짜 필터링, 마감일이 지난 모임 제거, 정렬 (클라이언트 사이드) - 원본 Moim 데이터 사용
  const filteredMoims = useMemo(() => {
    if (!moims) return [];

    const now = new Date();

    // 마감일이 지난 모임 필터링
    let validMoims = moims.filter(moim => {
      // registrationEnd가 없으면 필터링하지 않음 (마감일이 없는 모임)
      if (!moim.registrationEnd) return true;

      try {
        const registrationEndDate = parseISO(moim.registrationEnd);
        // 마감일이 현재 시간보다 이후인 모임만 포함
        return registrationEndDate > now;
      } catch {
        // 파싱 실패 시 포함하지 않음
        return false;
      }
    });

    // 날짜 필터링 (사용자가 특정 날짜를 선택한 경우)
    if (filters.date) {
      validMoims = validMoims.filter(moim => {
        try {
          const moimDate = parseISO(moim.dateTime);
          return isSameDay(moimDate, filters.date!);
        } catch {
          return false;
        }
      });
    }

    // 정렬 처리 (클라이언트 사이드)
    const sortedMoims = [...validMoims].sort((a, b) => {
      if (filters.sort === FILTER_SORT.DEADLINE) {
        // 마감임박 순: registrationEnd 오름차순
        if (!a.registrationEnd) return 1;
        if (!b.registrationEnd) return -1;
        try {
          const dateA = parseISO(a.registrationEnd).getTime();
          const dateB = parseISO(b.registrationEnd).getTime();
          return dateA - dateB;
        } catch {
          return 0;
        }
      } else {
        // 참여 인원 순: participantCount 내림차순
        return b.participantCount - a.participantCount;
      }
    });

    return sortedMoims;
  }, [moims, filters.date, filters.sort]);

  const handleFilterChange = (newFilters: MoimFilterValues) => {
    setFilters(newFilters);
  };

  const token = useAuthStore(state => state.token);

  const handleCreateMoimClick = () => {
    if (!token) {
      alert("로그인이 필요한 서비스입니다. 먼저 로그인해주세요.");
      return;
    }
    setIsModalOpen(true);
  };

  return {
    isModalOpen,
    setIsModalOpen,
    moimCardData: filteredMoims,
    availableLocations,
    isLoading,
    error,
    handleFilterChange,
    handleCreateMoimClick,
  };
};
