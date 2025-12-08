"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { format } from "date-fns";
import { useInfiniteQuery } from "@tanstack/react-query";

import ReviewListItem from "@/components/modules/all-review/ReviewListItem";
import MoimFindCategory, {
  MoimFilterValues,
} from "@/components/modules/moim-find/MoimFindCategory";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TEAM_NAME } from "@/constants";
import { getReviews, useReviewScoresQuery } from "@/api/review.api";
import { GetReviewsParams } from "@/types/review.type";
import { MoimType } from "@/types/moim.type";

type ReviewDistribution = { score: number; count: number };

const HeartSvg = ({ className }: { className?: string }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 32 28"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="currentColor"
  >
    <path d="M31.825 9.65833C31.6667 4.275 27.3917 0 22.0083 0C20.2667 0 17.575 1.26667 16.4667 3.325C16.3083 3.8 15.675 3.8 15.5167 3.325C14.25 1.425 11.7167 0.158333 9.81667 0.158333C4.59167 0.158333 0.158333 4.43333 0 9.65833V9.975C0 12.6667 1.10833 15.2 3.00833 17.1C3.00833 17.1 3.00833 17.1 3.00833 17.2583C3.16667 17.4167 10.7667 24.0667 14.25 27.075C15.2 27.8667 16.625 27.8667 17.575 27.075C21.0583 24.0667 28.5 17.4167 28.8167 17.2583C28.8167 17.2583 28.8167 17.2583 28.8167 17.1C30.7167 15.3583 31.825 12.825 31.825 9.975V9.65833Z" />
  </svg>
);

const HeartIcon = ({ fillPercent }: { fillPercent: number }) => {
  const clamped = Math.max(0, Math.min(1, fillPercent));
  const clipRight = `${100 - clamped * 100}%`;

  return (
    <span className="relative block h-5 w-5 sm:h-6 sm:w-6" aria-hidden>
      <HeartSvg className="absolute inset-0 text-gray-300" />
      <span
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${clipRight} 0 0)` }}
      >
        <HeartSvg className="text-orange-400" />
      </span>
    </span>
  );
};

const buildDistribution = (
  scores?: {
    fiveStars: number;
    fourStars: number;
    threeStars: number;
    twoStars: number;
    oneStar: number;
  } | null,
): ReviewDistribution[] => [
  { score: 5, count: scores?.fiveStars ?? 0 },
  { score: 4, count: scores?.fourStars ?? 0 },
  { score: 3, count: scores?.threeStars ?? 0 },
  { score: 2, count: scores?.twoStars ?? 0 },
  { score: 1, count: scores?.oneStar ?? 0 },
];

const CATEGORY_MAP: Record<MoimFilterValues["category"], MoimType> = {
  달림핏: "MINDFULNESS",
  런케이션: "WORKATION",
};

const DEFAULT_LOCATION = "지역 전체";

const normalizeLocation = (location: string | undefined) => {
  if (!location || location === DEFAULT_LOCATION) return DEFAULT_LOCATION;
  return location;
};

const AllReviewContent = () => {
  const PAGE_SIZE = 5;
  const [filters, setFilters] = useState<MoimFilterValues>({
    category: "달림핏",
    location: DEFAULT_LOCATION,
    date: undefined,
    sort: "마감임박",
  });
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const activeReviewType = useMemo<MoimType>(
    () => CATEGORY_MAP[filters.category] as MoimType,
    [filters.category],
  );

  const reviewQueryParams = useMemo<GetReviewsParams>(() => {
    const params: GetReviewsParams = {
      teamId: TEAM_NAME,
      limit: PAGE_SIZE,
      type: activeReviewType,
    };

    const normalizedLocation = normalizeLocation(filters.location);
    if (normalizedLocation !== DEFAULT_LOCATION) params.location = normalizedLocation;

    if (filters.date) {
      params.date = format(filters.date, "yyyy-MM-dd");
    }

    return params;
  }, [activeReviewType, filters.date, filters.location]);

  const reviewQueryKey = useMemo(
    () => [
      "reviews",
      TEAM_NAME,
      activeReviewType,
      normalizeLocation(filters.location),
      filters.date ? format(filters.date, "yyyy-MM-dd") : "all",
      filters.sort,
      PAGE_SIZE,
    ],
    [activeReviewType, filters.date, filters.location, filters.sort],
  );

  const reviewScoreParams = useMemo(
    () => ({
      teamId: TEAM_NAME,
      type: activeReviewType,
    }),
    [activeReviewType],
  );

  const { data: scoresData } = useReviewScoresQuery({
    params: reviewScoreParams,
  });

  const {
    data: reviewsPages,
    isLoading: isReviewsLoading,
    isError: isReviewsError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: reviewQueryKey,
    queryFn: async ({ pageParam = 0 }) => {
      const res = await getReviews({
        ...reviewQueryParams,
        offset: pageParam,
      });
      if (Array.isArray(res)) {
        return { data: res, totalItemCount: res.length, currentPage: 1, totalPages: 1 };
      }
      return res;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      const pageSize = reviewQueryParams.limit ?? PAGE_SIZE;
      const lastCount = lastPage?.data?.length ?? 0;
      if (lastCount < pageSize) return undefined;

      const loaded = pages.reduce((sum, p) => sum + (p?.data?.length ?? 0), 0);
      return loaded; // 다음 offset
    },
  });

  const { reviewList, totalItemCount } = useMemo(() => {
    const pages = reviewsPages?.pages ?? [];
    const flattened = pages.flatMap(page => page.data);
    const total = pages[0]?.totalItemCount ?? flattened.length;
    return { reviewList: flattened, totalItemCount: total };
  }, [reviewsPages]);

  const availableLocations = useMemo(() => {
    const locations = new Set<string>();
    reviewList.forEach(review => {
      if (review.Gathering?.location) locations.add(review.Gathering.location);
    });
    return [DEFAULT_LOCATION, ...Array.from(locations).sort()];
  }, [reviewList]);

  const distribution = useMemo(() => buildDistribution(scoresData), [scoresData]);
  const totalReviews = useMemo(
    () => distribution.reduce((sum, item) => sum + item.count, 0),
    [distribution],
  );
  const averageScore = scoresData?.averageScore ?? 0;
  const heartFillFor = (index: number) => Math.max(0, Math.min(1, averageScore - index));

  const onFilterChange = (next: MoimFilterValues) => {
    setFilters({
      ...next,
      category: next.category,
      location: normalizeLocation(next.location),
    });
  };

  // IntersectionObserver로 무한 스크롤
  useEffect(() => {
    const target = loadMoreRef.current;

    if (!target) return;

    const observer = new IntersectionObserver(
      entries => {
        const entry = entries[0];
        if (
          entry.isIntersecting &&
          !isReviewsLoading &&
          !isReviewsError &&
          hasNextPage &&
          !isFetchingNextPage
        ) {
          void fetchNextPage();
        }
      },
      { rootMargin: "200px 0px" },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isReviewsError, isReviewsLoading, isFetchingNextPage]);

  // 초기 로드 직후 센티널이 이미 뷰포트 안에 있을 때 추가 호출
  useEffect(() => {
    const target = loadMoreRef.current;
    if (!target || !hasNextPage || isReviewsLoading || isFetchingNextPage) return;

    const rect = target.getBoundingClientRect();
    const isVisible = rect.top <= window.innerHeight + 200;
    if (isVisible) {
      void fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, isReviewsLoading, reviewList.length]);

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-3 shadow-sm sm:p-4">
      <MoimFindCategory onFilterChange={onFilterChange} availableLocations={availableLocations} />

      <Card className="bg-gradient-100 border-0 shadow-none">
        <CardContent className="flex flex-col gap-5 rounded-xl px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:px-6 sm:py-7">
          <div className="flex flex-col items-center gap-2 text-center sm:w-2/5">
            <span className="text-3xl font-semibold text-gray-900 sm:text-4xl">
              {averageScore.toFixed(1)}
            </span>
            <div className="flex gap-1 text-gray-300 sm:gap-2">
              {Array.from({ length: 5 }).map((_, idx) => (
                <HeartIcon key={idx} fillPercent={heartFillFor(idx)} />
              ))}
            </div>
            <p className="text-xs font-medium text-emerald-700">
              {scoresData === undefined ? "집계 중.." : `총 ${totalItemCount}명 참여`}
            </p>
          </div>

          <div className="my-2 h-px w-full bg-gray-200 sm:my-0 sm:hidden" />
          <div className="hidden h-24 w-px bg-gray-200 sm:block" />

          <div className="grid w-full gap-2 sm:w-3/5 sm:gap-2.5">
            {distribution.map(item => (
              <div key={item.score} className="flex items-center gap-3">
                <span className="w-8 text-xs font-medium text-gray-700 sm:w-10 sm:text-sm">
                  {item.score}점
                </span>
                <Progress
                  value={totalReviews === 0 ? 0 : (item.count / totalReviews) * 100}
                  className="bg-white/60"
                />
                <span className="w-6 text-right text-xs font-medium text-gray-700 sm:w-8 sm:text-sm">
                  {item.count}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-3">
        {isReviewsLoading ? (
          <Card className="border border-gray-100 bg-white shadow-sm">
            <CardContent className="p-5 text-sm text-gray-500">
              리뷰를 불러오는 중입니다...
            </CardContent>
          </Card>
        ) : isReviewsError ? (
          <Card className="border border-gray-100 bg-white shadow-sm">
            <CardContent className="p-5 text-sm text-red-600">
              리뷰를 불러오지 못했어요.
            </CardContent>
          </Card>
        ) : reviewList.length > 0 ? (
          reviewList.map(review => <ReviewListItem key={review.id} review={review} />)
        ) : (
          <Card className="border border-dashed border-gray-200 bg-white shadow-sm">
            <CardContent className="flex flex-col items-center justify-center gap-3 py-12 text-gray-600 sm:py-14">
              <Image
                src="/icons/review/blank_review.svg"
                alt="blank review"
                width={140}
                height={120}
                className="h-auto w-28 sm:w-32"
              />
              <p className="text-base font-medium sm:text-lg">아직 리뷰가 없어요</p>
            </CardContent>
          </Card>
        )}
      </div>
      <div id="review-load-more-sentinel" ref={loadMoreRef} className="h-6 w-full" aria-hidden />
      {isFetchingNextPage ? (
        <div className="text-center text-sm text-gray-500">추가 로딩 중...</div>
      ) : null}
    </div>
  );
};

export default AllReviewContent;
