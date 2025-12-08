"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { format } from "date-fns";
import { useInfiniteQuery } from "@tanstack/react-query";

import ReviewListItem from "@/components/modules/all-review/AllReviewItem";
import MoimFindCategory from "@/components/modules/moim-find/MoimFindCategory";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TEAM_NAME } from "@/constants";
import { getReviews, useReviewScoresQuery } from "@/hooks/api/review.api";
import { GetReviewsParams } from "@/types/review.type";
import { MoimType } from "@/types/moim.type";
import { MoimFilterValues } from "@/types/moimFind.type";
import EmptyReview from "@/components/common/EmptyReview";
import { HeartIcon } from "./HeartIcon";
import { REVIEW_PAGE_SIZE } from "@/constants/pageSize";

type ReviewDistribution = { score: number; count: number };

// 평균 평점의 형식을 변환해준다.
// buildDistribution({ fiveStars: 1, fourStars: 2, threeStars: 3, twoStars: 4, oneStar: 5 }) =>
// 0 : {score: 5, count: 1}
// 1 : {score: 4, count: 2}
// 2 : {score: 3, count: 3}
// 3 : {score: 2, count: 4}
// 4 : {score: 1, count: 5}
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

// 카테고리에 달림핏, 런케이션을 백엔드가 정한 정식 명칭으로 바꿔준다.
//  CATEGORY_MAP["달림핏"] => "MINDFULNESS"
const CATEGORY_MAP: Record<MoimFilterValues["category"], MoimType> = {
  달림핏: "MINDFULNESS",
  런케이션: "WORKATION",
};

// 기본 지역 설정
const DEFAULT_LOCATION = "지역 전체";

const AllReviewContent = () => {
  // 필터의 값을 변경하는 useState와 초기값
  const [filters, setFilters] = useState<MoimFilterValues>({
    category: "달림핏",
    location: DEFAULT_LOCATION,
    date: undefined,
    sort: "마감임박 순",
  });

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const activeReviewType: MoimType = CATEGORY_MAP[filters.category];

  const reviewQueryParams = useMemo<GetReviewsParams>(() => {
    const params: GetReviewsParams = {
      teamId: TEAM_NAME,
      limit: REVIEW_PAGE_SIZE.SCROLL,
      type: activeReviewType,
    };

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
      filters.location,
      filters.date ? format(filters.date, "yyyy-MM-dd") : "all",
      filters.sort,
      REVIEW_PAGE_SIZE.SCROLL,
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
      const pageSize = reviewQueryParams.limit ?? REVIEW_PAGE_SIZE.SCROLL;
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

  // 필터들을 변경하면 setFilters를 변경해준다.
  // onFilterChange(next)를 하면 setFilter(next)해준다.
  const onFilterChange = (next: MoimFilterValues) => {
    setFilters({
      ...next,
      category: next.category,
      location: next.location,
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
    <div className="flex flex-col gap-3 rounded-xl p-3 sm:p-4">
      <MoimFindCategory onFilterChange={onFilterChange} availableLocations={availableLocations} />
      {/* 평균 평점 박스 */}
      <Card className="bg-gradient-100 rounded-3xl border border-green-300 shadow-none sm:rounded-4xl">
        <CardContent className="flex flex-col gap-5 rounded-xl px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:px-6 sm:py-7">
          <div className="flex flex-col items-center gap-2 text-center sm:w-2/5">
            <span className="text-3xl font-semibold text-gray-900 sm:text-4xl">
              {averageScore.toFixed(1)}
            </span>
            <div className="flex gap-1 text-gray-300 sm:gap-2">
              {Array.from({ length: 5 }).map((_, idx) => (
                <HeartIcon key={idx} fillPercent={heartFillFor(idx)} />
              ))}
            </div>
            <p className="text-sm font-medium text-green-600 sm:text-base">
              {scoresData === undefined ? "집계 중.." : `총 ${totalItemCount}명 참여`}
            </p>
          </div>

          <div className="my-2 h-px w-full bg-gray-200 sm:my-0 sm:hidden" />
          <div className="hidden h-24 w-px bg-gray-200 sm:block" />

          <div className="grid w-full gap-2 sm:w-3/5 sm:gap-2.5">
            {distribution.map(item => (
              <div key={item.score} className="flex items-center gap-3">
                <span className="w-8 text-xs font-medium text-gray-500 sm:w-10 sm:text-sm">
                  {item.score}점
                </span>
                <Progress
                  value={totalReviews === 0 ? 0 : (item.count / totalReviews) * 100}
                  className="bg-[#DAE3E3]"
                />
                <span className="w-6 text-right text-xs font-medium text-gray-500 sm:w-8 sm:text-sm">
                  {item.count}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 리뷰들 */}
      <div className="mt-2 mb-10 h-fit rounded-2xl bg-white px-5 py-6 pb-10 sm:mt-4 sm:rounded-4xl sm:px-10 sm:pt-8 md:mt-6 md:px-12 md:pt-10 md:pb-10">
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
          <ul className="flex flex-col gap-8">
            {reviewList.map((review, index: number) => (
              <ReviewListItem
                key={review.id}
                review={review}
                index={index}
                length={reviewList.length}
              />
            ))}
          </ul>
        ) : (
          <EmptyReview />
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
