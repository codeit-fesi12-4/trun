"use client";

import { Skeleton } from "@/components/ui/skeleton";

const ReviewItemSkeleton = () => (
  <div className="flex w-full flex-col gap-6">
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

    {/* 리뷰 코멘트 스켈레톤 */}
    <Skeleton className="h-16 w-full" />
  </div>
);

export default ReviewItemSkeleton;
