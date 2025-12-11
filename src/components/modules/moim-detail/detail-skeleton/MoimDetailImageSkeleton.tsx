"use client";

import { Skeleton } from "@/components/ui/skeleton";

const MoimDetailImageSkeleton = () => (
  <div className="w-full sm:h-[333px] sm:w-1/2 md:h-[443px]">
    <Skeleton className="h-full w-full rounded-[12px] bg-white sm:rounded-[20px] md:rounded-4xl" />
  </div>
);

export default MoimDetailImageSkeleton;
