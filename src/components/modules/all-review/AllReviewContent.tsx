"use client";

import { useMemo, useRef, useEffect, useCallback } from "react";
import { REVIEW_PAGE_SIZE } from "@/constants/pageSize";
import AllReviewHeader from "./AllReviewHeader";
import AllReviewStats from "./AllReviewStats";
import AllReviewList from "./AllReviewList";
import { useAllReviewQuery, useReviewScoresQuery } from "@/hooks/queries/useReviewQuery";
import { buildDistribution } from "@/utils/review.util";
import { buildReviewFiltersQueryString } from "@/utils/path.util";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import parseFilters from "@/utils/parseFilters.util";
import { ReviewFilterValues } from "@/types/review.type";

const AllReviewContent = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const filters = useMemo<ReviewFilterValues>(
    () => parseFilters(searchParams, "review"),
    [searchParams],
  );

  const reviewQueryParams = useMemo(
    () => ({
      limit: REVIEW_PAGE_SIZE.SCROLL,
      type: filters.type,
      location: filters.location,
      sortBy: filters.sortBy,
      sortOrder: filters.sortOrder,
    }),
    [filters],
  );
  const {
    data: reviewsPages,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useAllReviewQuery(reviewQueryParams);

  const reviewList = useMemo(() => reviewsPages?.pages.flatMap(p => p.data) ?? [], [reviewsPages]);

  const { data: scoresData } = useReviewScoresQuery({
    params: { type: filters.type },
  });

  const distribution = useMemo(() => buildDistribution(scoresData), [scoresData]);
  const averageScore = scoresData?.averageScore ?? 0;

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const onFilterChange = useCallback(
    (patch: Partial<ReviewFilterValues>) => {
      const next: ReviewFilterValues = { ...filters, ...patch };

      const queryString = buildReviewFiltersQueryString(next);

      router.replace(queryString ? `${pathname}?${queryString}` : pathname, { scroll: false });
    },
    [filters, router, pathname],
  );

  useEffect(() => {
    const target = loadMoreRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          void fetchNextPage();
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <div className="flex flex-col gap-6">
      <AllReviewHeader filters={filters} onFilterChange={onFilterChange} />

      <AllReviewStats averageScore={averageScore} distribution={distribution} />

      <AllReviewList reviewList={reviewList} isLoading={isLoading} isError={isError} />

      <div ref={loadMoreRef} className="h-6" />

      {isFetchingNextPage && <p className="text-center text-sm text-gray-500">추가 로딩 중...</p>}
    </div>
  );
};

export default AllReviewContent;
