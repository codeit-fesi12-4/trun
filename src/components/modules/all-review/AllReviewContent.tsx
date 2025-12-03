"use client";

import { useMemo } from "react";
import Image from "next/image";

import ReviewListItem from "@/components/modules/all-review/ReviewListItem";
import MoimFindCategory from "@/components/modules/moim-find/MoimFindCategory";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TEAM_NAME } from "@/constants";
import { useReviewsQuery, useReviewScoresQuery } from "@/hooks/api/review.api";

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

const AllReviewContent = () => {
  const { data: scoresData } = useReviewScoresQuery({
    params: { teamId: TEAM_NAME },
  });

  const {
    data: reviewsData,
    isLoading: isReviewsLoading,
    isError: isReviewsError,
  } = useReviewsQuery({
    params: {
      teamId: TEAM_NAME,
      limit: 10,
      offset: 0,
    },
  });

  const reviewList = Array.isArray(reviewsData) ? reviewsData : (reviewsData?.data ?? []);

  const distribution = useMemo(() => buildDistribution(scoresData), [scoresData]);
  const totalReviews = useMemo(
    () => distribution.reduce((sum, item) => sum + item.count, 0),
    [distribution],
  );
  const averageScore = scoresData?.averageScore ?? 0;
  const heartFillFor = (index: number) => Math.max(0, Math.min(1, averageScore - index));

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-3 shadow-sm sm:p-4">
      <MoimFindCategory />

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
              {scoresData === undefined ? "집계 중..." : `총 ${totalReviews}명 참여`}
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
            <CardContent className="p-5 text-sm text-gray-500">리뷰를 불러오는 중...</CardContent>
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
    </div>
  );
};

export default AllReviewContent;
