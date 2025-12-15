"use client";

import { Skeleton } from "@/components/ui/skeleton";

const MoimDetailSummarySkeleton = () => (
  <div className="flex w-full flex-col gap-4 sm:h-[333px] sm:w-1/2 md:h-[443px] md:gap-6">
    {/* 메인 카드 스켈레톤 */}
    <div className="flex flex-col gap-1 rounded-[12px] bg-white p-3 sm:h-[204px] sm:rounded-[20px] sm:px-6 sm:py-[22px] md:h-[278px] md:rounded-4xl md:p-8 md:px-10 md:py-[34px]">
      {/* 뱃지 영역 */}
      <div className="flex h-8 justify-between">
        <div className="flex h-5 flex-row gap-2 md:h-6">
          <Skeleton className="h-full w-16 rounded-[6px]" />
          <Skeleton className="h-full w-24 rounded-[6px]" />
        </div>
        <Skeleton className="h-8 w-8 rounded" />
      </div>

      {/* 제목 및 위치 */}
      <div className="flex flex-col gap-2 md:mt-3 md:gap-3">
        <Skeleton className="h-7 w-48 md:h-8" />
        <Skeleton className="h-5 w-32 md:h-6" />
      </div>

      {/* 좋아요 버튼 및 참여하기 버튼 */}
      <div className="flex flex-row items-center gap-2.5 sm:mt-5 md:mt-9">
        <Skeleton className="h-13 w-13 shrink-0 rounded-full" />
        <Skeleton className="h-10 w-full rounded-[12px] sm:h-12 md:h-15" />
        <Skeleton className="h-10 w-full rounded-[12px] sm:h-12 md:h-15" />
      </div>
    </div>

    {/* 진행바 영역 스켈레톤 */}
    <div className="bg-gradient-100 flex flex-col gap-3 rounded-[12px] border border-[#BEEDE7] px-5 pt-4 pb-6 sm:h-[113px] sm:rounded-[20px] sm:px-6 sm:pt-5 sm:pb-[22px] md:h-[141px] md:rounded-4xl">
      <div className="flex justify-between">
        <Skeleton className="h-5 w-46 rounded-md md:h-6" />
        <Skeleton className="h-5 w-16 md:h-6" />
      </div>
      <div className="flex flex-col gap-2 md:gap-4">
        <div className="flex justify-end">
          <Skeleton className="h-4 w-20 md:h-5" />
        </div>
        <Skeleton className="h-1 w-full md:h-1.5 lg:h-2" />
      </div>
    </div>
  </div>
);

export default MoimDetailSummarySkeleton;
