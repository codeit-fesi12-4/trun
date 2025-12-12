"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const MoimCardSkeleton = () => (
  <Card className="overflow-hidden rounded-4xl border-[0.5px] p-0 shadow-none md:p-5">
    <CardContent className="p-0">
      <div className="flex flex-col items-stretch md:flex-row md:gap-6">
        {/* 이미지 영역 스켈레톤 */}
        <div className="relative aspect-video h-45 w-full shrink-0 md:aspect-auto md:h-36 md:w-36">
          <Skeleton className="h-full w-full rounded-b-none md:rounded-3xl" />
        </div>

        {/* 내용 영역 스켈레톤 */}
        <div className="flex flex-1 flex-col justify-between gap-1 p-5 md:p-0">
          {/* 상단: 제목, 위치, 좋아요 */}
          <div className="mt-1.5 flex items-start justify-between">
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <div className="flex items-center gap-2">
                <Skeleton className="h-7 w-48" />
              </div>
              <Skeleton className="h-5 w-32" />
            </div>
            <Skeleton className="h-10 w-10 shrink-0 rounded-full sm:h-12 sm:w-12" />
          </div>

          {/* 하단: 왼쪽(뱃지+진행바) / 오른쪽(참여하기 버튼) */}
          <div className="flex items-end justify-between gap-5">
            {/* 왼쪽: 뱃지들과 진행바/인원수 */}
            <div className="flex min-w-0 flex-1 flex-col gap-3.5">
              {/* 뱃지들 스켈레톤 */}
              <div className="flex flex-wrap items-center gap-2">
                <Skeleton className="h-6 w-20 rounded-md" />
                <Skeleton className="h-6 w-16 rounded-md" />
              </div>

              {/* 진행바/인원 수 스켈레톤 */}
              <Skeleton className="h-4 w-full" />
            </div>

            {/* 오른쪽: 참여하기 버튼 스켈레톤 */}
            <Skeleton className="h-10 w-20 shrink-0 rounded-xl" />
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default MoimCardSkeleton;
