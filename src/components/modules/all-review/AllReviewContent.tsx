"use client";

import { useMemo, useRef, useEffect, useState } from "react";
import { REVIEW_PAGE_SIZE } from "@/constants/pageSize";
import AllReviewHeader from "./AllReviewHeader";
import AllReviewStats from "./AllReviewStats";
import AllReviewList from "./AllReviewList";
import { useAllReviewQuery, useReviewScoresQuery } from "@/hooks/useReviewQuery";
import { CATEGORY_MAP, SORTBY_MAP } from "@/utils/category.util";
import { buildDistribution } from "@/utils/review.util";
import { ReviewFilterValues } from "@/types/review.type";
import { buildReviewsQueryString } from "@/utils/path.util";
import useSyncQueryString from "@/hooks/useSyncQueryString";

const AllReviewContent = () => {
  const [filters, setFilters] = useState<ReviewFilterValues>({
    category: "달림핏",
    location: "지역 전체",
    sortBy: "최신 리뷰 순",
  });

  const activeReviewSort = SORTBY_MAP[filters.sortBy];
  const activeReviewType = CATEGORY_MAP[filters.category];

  const reviewQueryParams = useMemo(
    () => ({
      limit: REVIEW_PAGE_SIZE.SCROLL,
      type: activeReviewType,
      location: filters.location,
      sortBy: activeReviewSort,
    }),
    [activeReviewType, filters.location, activeReviewSort],
  );

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
    params: { type: activeReviewType },
  });

  const distribution = buildDistribution(scoresData);
  const averageScore = scoresData?.averageScore ?? 0;

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

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
      <AllReviewHeader filters={filters} onFilterChange={setFilters} />

      <AllReviewStats averageScore={averageScore} distribution={distribution} />

      <AllReviewList reviewList={reviewList} isLoading={isLoading} isError={isError} />

      <div ref={loadMoreRef} className="h-6" />

      {isFetchingNextPage && <p className="text-center text-sm text-gray-500">추가 로딩 중...</p>}
    </div>
  );
};

export default AllReviewContent;
