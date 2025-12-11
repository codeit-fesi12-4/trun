"use client";

import { Skeleton } from "@/components/ui/skeleton";

const ReviewCardSkeleton = () => (
  <div className="flex w-full flex-row items-center gap-6">
    {/* 모임 이미지 스켈레톤 (태블릿/PC에서만 보임) */}
    <div className="relative hidden h-50 w-50 shrink-0 overflow-hidden rounded-3xl sm:block md:w-[296px]">
      <Skeleton className="h-full w-full" />
    </div>

    {/* 리뷰 내용 영역 스켈레톤 */}
    <div className="flex w-full flex-col gap-6 sm:h-50 sm:justify-between sm:gap-0">
      {/* 프로필 영역 */}
      <div className="flex flex-row items-center gap-[13px]">
        {/* 프로필 이미지 스켈레톤 */}
        <Skeleton className="h-10 w-10 shrink-0 rounded-full" />
        <div className="flex flex-col gap-1">
          {/* 사용자 이름 스켈레톤 */}
          <Skeleton className="h-5 w-24" />
          {/* 하트 점수 + 날짜 스켈레톤 */}
          <Skeleton className="h-5 w-40" />
        </div>
      </div>

      {/* 지역 스켈레톤 */}
      <Skeleton className="h-5 w-16" />

      {/* 모임 이미지 + 리뷰 코멘트 스켈레톤 */}
      <div className="flex w-full flex-row items-center gap-4">
        {/* 모임 이미지 스켈레톤 (모바일에서만 보임) */}
        <Skeleton className="h-20 w-20 shrink-0 rounded-[12px] sm:hidden" />
        {/* 리뷰 코멘트 스켈레톤 */}
        <Skeleton className="h-20 w-full" />
      </div>
    </div>
  </div>
);

export default ReviewCardSkeleton;
