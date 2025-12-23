import { useState, useMemo, useEffect, useRef } from "react";
import { useMoimsInfiniteQuery } from "@/hooks/useMoimFindQuery";
import { GetMoimsParams, MoimLocation, Moim } from "@/types/moim.type";
import { MOIM_LOCATION, MOIM_FILTER_SORT, SORT_BY, SORT_ORDER } from "@/constants/moim";
import { parseISO, isSameDay } from "date-fns";
import { type MoimFilterValues } from "@/types/moimFind.type";
import { useSession } from "next-auth/react";
import { formatDateWithDash } from "@/utils/date.util";
import { useLoginModalStore } from "@/stores/loginModal.store";

export const useMoimFind = () => {
  const { setOpen: setIsLoginModalOpen } = useLoginModalStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState<MoimFilterValues>({
    category: "MINDFULNESS",
    location: MOIM_LOCATION.ALL,
    date: undefined,
    sort: MOIM_FILTER_SORT.DEADLINE,
  });

  // 지역을 MoimLocation으로 변환
  const convertLocationToMoimLocation = (location: string): MoimLocation | undefined => {
    if (location === MOIM_LOCATION.ALL) return undefined;
    return location as MoimLocation;
  };

  // API 파라미터 생성 (무한 스크롤용 - limit, offset 제외)
  const infiniteQueryParams = useMemo(() => {
    // 정렬 기준을 API 파라미터로 변환
    const sortParams =
      filters.sort === MOIM_FILTER_SORT.DEADLINE
        ? {
            sortBy: SORT_BY.REGISTRATION_END,
            sortOrder: SORT_ORDER.ASC,
          }
        : {
            sortBy: SORT_BY.PARTICIPANT_COUNT,
            sortOrder: SORT_ORDER.DESC,
          };

    const params: Omit<GetMoimsParams, "limit" | "offset"> = {
      type: filters.category,
      location: convertLocationToMoimLocation(filters.location),
      date: formatDateWithDash(filters.date),
      sortBy: sortParams.sortBy,
      sortOrder: sortParams.sortOrder,
    };
    return params;
  }, [filters.category, filters.location, filters.date, filters.sort]);

  // NextAuth 세션에서 사용자 정보 가져오기
  const { data: session } = useSession();
  // 로그인 여부는 user 존재로 확인 (토큰은 HttpOnly 쿠키에 있어서 클라이언트에서 접근 불가)
  const isLoggedIn = !!session?.user;

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

  // 모든 페이지의 모임 데이터를 하나의 배열로 통합
  const allMoims = useMemo<Moim[]>(() => {
    if (!moimsPages?.pages) return [];
    return moimsPages.pages.flatMap(page => page.data);
  }, [moimsPages]);

  // 지역 목록 추출을 위한 별도 무한 스크롤 쿼리
  const locationQueryParams = useMemo(
    () => ({
      type: filters.category,
    }),
    [filters.category],
  );

  const {
    data: locationMoimsPages,
    fetchNextPage: fetchNextLocationPage,
    hasNextPage: hasNextLocationPage,
    isFetchingNextPage: isFetchingNextLocationPage,
  } = useMoimsInfiniteQuery({
    params: locationQueryParams,
    pageSize: 8,
  });

  const allLocationMoims = useMemo<Moim[]>(() => {
    if (!locationMoimsPages?.pages) return [];
    return locationMoimsPages.pages.flatMap(page => page.data);
  }, [locationMoimsPages]);

  const isAutoLoadingRef = useRef(false);

  // 초기에 모든 지역을 가져오기 위해 자동으로 다음 페이지 로드
  useEffect(() => {
    if (hasNextLocationPage && !isFetchingNextLocationPage && !isAutoLoadingRef.current) {
      isAutoLoadingRef.current = true;
      void fetchNextLocationPage().finally(() => {
        isAutoLoadingRef.current = false;
      });
    }
  }, [hasNextLocationPage, isFetchingNextLocationPage, fetchNextLocationPage]);

  const availableLocations = useMemo(() => {
    if (allLocationMoims.length === 0) return [MOIM_LOCATION.ALL];
    const locations = new Set<string>();
    allLocationMoims.forEach(moim => {
      if (moim.location) {
        locations.add(moim.location);
      }
    });
    return [MOIM_LOCATION.ALL, ...Array.from(locations).sort()];
  }, [allLocationMoims]);

  const filteredMoims = useMemo(() => {
    if (allMoims.length === 0) return [];

    if (filters.date) {
      const selectedDate = filters.date;
      return allMoims.filter(moim => {
        try {
          const moimDate = parseISO(moim.dateTime);
          return isSameDay(moimDate, selectedDate);
        } catch {
          return false;
        }
      });
    }

    return allMoims;
  }, [allMoims, filters.date]);

  const handleFilterChange = (newFilters: MoimFilterValues) => {
    setFilters(newFilters);
  };

  const handleCreateMoimClick = () => {
    if (!isLoggedIn) {
      setIsLoginModalOpen(true);
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
