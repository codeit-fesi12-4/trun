"use client";

import { useMemo, useRef, useEffect, useState } from "react";
import { REVIEW_PAGE_SIZE } from "@/constants/pageSize";
import AllReviewHeader from "./AllReviewHeader";
import AllReviewStats from "./AllReviewStats";
import AllReviewList from "./AllReviewList";
import { useAllReviewQuery, useReviewScoresQuery } from "@/hooks/useReviewQuery";
import { buildDistribution } from "@/utils/review.util";
import { buildReviewsQueryString } from "@/utils/path.util";
import useSyncQueryString from "@/hooks/useSyncQueryString";
import { useSearchParams } from "next/navigation";
import parseFilters from "@/utils/parseFilters";

const AllReviewContent = () => {
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState(() => parseFilters(searchParams));

  const reviewQueryParams = {
    limit: REVIEW_PAGE_SIZE.SCROLL,
    type: filters.type,
    location: filters.location,
    sortBy: filters.sortBy,
    sortOrder: filters.sortOrder,
  };

  useSyncQueryString(buildReviewsQueryString(reviewQueryParams));

  useSyncQueryString(buildReviewsQueryString(reviewQueryParams));

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

  const distribution = buildDistribution(scoresData);
  const averageScore = scoresData?.averageScore ?? 0;

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const reflectParseFilter = () => {
      setFilters(parseFilters(searchParams));
    };

    reflectParseFilter();

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
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, searchParams]);

  return (
    <div className="flex flex-col gap-6">
      <AllReviewHeader filters={filters} onFilterChange={setFilters} />

      <AllReviewStats averageScore={averageScore} distribution={distribution} />

      <AllReviewList reviewList={reviewList} isLoading={isLoading} isError={isError} />

      <div ref={loadMoreRef} className="h-6" />

      {isFetchingNextPage && <p className="text-center text-sm text-gray-500">추가 로딩 중...</p>}
    </div>
  );
};

export default AllReviewContent;
