import { useState, useMemo, useCallback } from "react";
import { useMoimsInfiniteQuery } from "@/hooks/queries/useMoimFindQuery";
import { GetMoimsParams, MoimLocation, Moim } from "@/types/moim.type";
import { MOIM_LOCATION, SORT_PARAMS_MAP } from "@/constants/moim";
import { parseISO, isSameDay } from "date-fns";
import { type MoimFilterValues } from "@/types/moimFind.type";
import { formatDateWithDash } from "@/utils/date.util";
import { useLoginModalStore } from "@/stores/loginModal.store";
import { useUserProfileQuery } from "./queries/useUserQuery";
import { buildMoimFiltersQueryString } from "@/utils/path.util";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import parseFilters from "@/utils/parseFilters.util";

export const useMoimFind = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { setOpen: setIsLoginModalOpen } = useLoginModalStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filters = useMemo(() => parseFilters(searchParams, "moim"), [searchParams]);

  // 지역을 MoimLocation으로 변환
  const convertLocationToMoimLocation = useCallback(
    (location: string): MoimLocation | undefined => {
      if (location === MOIM_LOCATION.ALL) return undefined;
      return location as MoimLocation;
    },
    [],
  );

  // API 파라미터 생성 (무한 스크롤용 - limit, offset 제외)
  const infiniteQueryParams = useMemo(() => {
    const sortParams = SORT_PARAMS_MAP[filters.sortBy];

    const params: Omit<GetMoimsParams, "limit" | "offset"> = {
      type: filters.category,
      location: convertLocationToMoimLocation(filters.location),
      date: formatDateWithDash(filters.date),
      sortBy: sortParams.sortBy,
      sortOrder: sortParams.sortOrder,
    };
    return params;
  }, [
    filters.category,
    filters.location,
    filters.date,
    filters.sortBy,
    convertLocationToMoimLocation,
  ]);

  const { data: user } = useUserProfileQuery();
  const isLoggedIn = !!user;

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

  // 정의된 지역 목록 사용
  const availableLocations = useMemo(() => Object.values(MOIM_LOCATION), []);

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

  const onFilterChange = useCallback(
    (patch: Partial<MoimFilterValues>) => {
      const next: MoimFilterValues = { ...filters, ...patch };

      const queryString = buildMoimFiltersQueryString(next);

      router.replace(queryString ? `${pathname}?${queryString}` : pathname, { scroll: false });
    },
    [filters, router, pathname],
  );

  const handleCreateMoimClick = () => {
    if (!isLoggedIn) {
      setIsLoginModalOpen(true);
      return;
    }
    setIsModalOpen(true);
  };

  return {
    filters,
    isModalOpen,
    setIsModalOpen,
    moimCardData: filteredMoims,
    availableLocations,
    isLoading,
    error,
    onFilterChange,
    handleCreateMoimClick,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};
