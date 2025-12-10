import { useState, useMemo } from "react";
import { useMoimsInfiniteQuery } from "@/hooks/useMoimFindQuery";
import { GetMoimsParams, MoimType, MoimLocation, Moim } from "@/types/moim.type";
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

  // API 파라미터 생성 (무한 스크롤용 - limit, offset 제외)
  const infiniteQueryParams = useMemo(() => {
    // 정렬 기준을 API 파라미터로 변환
    const sortParams =
      filters.sort === FILTER_SORT.DEADLINE
        ? {
            sortBy: SORT_BY.REGISTRATION_END,
            sortOrder: SORT_ORDER.ASC,
          }
        : {
            sortBy: SORT_BY.PARTICIPANT_COUNT,
            sortOrder: SORT_ORDER.DESC,
          };

    const params: Omit<GetMoimsParams, "limit" | "offset"> = {
      type: convertCategoryToMoimType(filters.category),
      location: convertLocationToMoimLocation(filters.location),
      date: formatDateWithDash(filters.date),
      sortBy: sortParams.sortBy,
      sortOrder: sortParams.sortOrder,
    };
    return params;
  }, [filters.category, filters.location, filters.date, filters.sort]);

  // 무한 스크롤 쿼리
  const {
    data: moimsPages,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useMoimsInfiniteQuery({
    params: infiniteQueryParams,
    pageSize: 8,
  });

  // 모든 페이지의 모임 데이터를 평탄화
  const allMoims = useMemo<Moim[]>(() => {
    if (!moimsPages?.pages) return [];
    return moimsPages.pages.flatMap(page => page.data);
  }, [moimsPages]);

  // 선택된 카테고리의 모임들에서 실제 존재하는 지역 목록 추출
  // 무한 스크롤 쿼리의 데이터를 사용하여 지역 목록 추출
  const availableLocations = useMemo(() => {
    if (allMoims.length === 0) return [MOIM_LOCATION.ALL];
    const locations = new Set<string>();
    allMoims.forEach(moim => {
      if (moim.location) {
        locations.add(moim.location);
      }
    });
    return [MOIM_LOCATION.ALL, ...Array.from(locations).sort()];
  }, [allMoims]);

  // 날짜 필터링, 마감일이 지난 모임 제거
  const filteredMoims = useMemo(() => {
    if (allMoims.length === 0) return [];

    const now = new Date();

    // 마감일이 지난 모임 필터링 (무한 스크롤 테스트를 위해 임시로 비활성화)
    const ENABLE_EXPIRED_FILTER = false; // 테스트 완료 후 true로 변경

    let validMoims = ENABLE_EXPIRED_FILTER
      ? allMoims.filter(moim => {
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
        })
      : allMoims; // 필터링 비활성화 시 모든 모임 포함

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

    // 서버에서 정렬된 데이터를 받아오므로, 클라이언트에서는 필터링만 수행
    // 단, 마감일이 없는 모임의 경우 정렬 순서를 유지하기 위해 추가 정렬 필요
    const sortedMoims = [...validMoims].sort((a, b) => {
      if (filters.sort === FILTER_SORT.DEADLINE) {
        // 마감임박 순: registrationEnd 오름차순 (마감일 없는 모임은 뒤로)
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
  }, [allMoims, filters.date, filters.sort]);

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
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};
