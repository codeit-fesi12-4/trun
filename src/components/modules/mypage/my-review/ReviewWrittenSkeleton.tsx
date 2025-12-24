const ReviewWrittenSkeleton = () => (
  <div className="flex w-full flex-row items-center gap-6">
    {/* 모임 이미지 (큰 화면) */}
    <div className="relative hidden h-50 w-50 shrink-0 animate-pulse overflow-hidden rounded-3xl bg-gray-200 sm:block" />

    <div className="flex w-full flex-col gap-6 sm:h-50 sm:justify-between sm:gap-0">
      {/* 프로필 */}
      <div className="flex flex-row items-center gap-3">
        <div className="relative h-10 w-10 animate-pulse overflow-hidden rounded-full bg-gray-200" />
        <div className="flex flex-col gap-1">
          <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
          <div className="flex flex-row gap-2">
            {/* 리뷰 score */}
            <div className="flex gap-0.5">
              {[0, 1, 2, 3, 4].map(i => (
                <div key={i} className="h-6 w-6 animate-pulse rounded bg-gray-200" />
              ))}
            </div>
            <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
          </div>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <div className="h-8 w-8 animate-pulse rounded bg-gray-200" />
          <div className="h-8 w-8 animate-pulse rounded bg-gray-200" />
        </div>
      </div>

      {/* 위치 */}
      <div className="flex flex-row items-center gap-1.5">
        <div className="h-[13px] w-[3px] bg-gray-100 sm:h-4" />
        <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
      </div>

      {/* 코멘트 + 모임 이미지 (작은 화면) */}
      <div className="flex w-full flex-row items-center gap-4">
        <div className="relative h-20 w-20 shrink-0 animate-pulse overflow-hidden rounded-[12px] bg-gray-200 sm:hidden" />
        <div className="h-5 w-full animate-pulse rounded bg-gray-200" />
      </div>

      {/* 구분선 */}
      <div className="mt-4 h-px w-full bg-gray-100" />
    </div>
  </div>
);

export default ReviewWrittenSkeleton;
