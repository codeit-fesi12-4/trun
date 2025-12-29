const ReviewWritableSkeleton = () => (
  <div className="relative flex w-full flex-col gap-4 overflow-hidden rounded-3xl bg-white sm:flex-row sm:items-stretch sm:p-6">
    {/* 모임 이미지 */}
    <div className="relative h-40 w-full shrink-0 animate-pulse rounded-3xl bg-gray-200 sm:h-40 sm:w-40" />

    {/* 모임 정보 */}
    <div className="relative flex flex-1 flex-col justify-between gap-2 p-4 sm:flex-row sm:gap-0 sm:p-0">
      {/* 찜 버튼 */}
      <div className="absolute top-4 right-4 z-10 h-8 w-8 animate-pulse rounded-full bg-gray-200 sm:top-0 sm:right-0" />

      <div className="flex flex-col justify-between gap-2">
        {/* 제목 */}
        <div className="h-6 w-48 animate-pulse rounded bg-gray-200" />

        <div>
          {/* 인원 */}
          <div className="mt-2 h-4 w-20 animate-pulse rounded bg-gray-200" />

          {/* 위치 / 날짜 / 시간 */}
          <div className="mt-2 flex gap-2">
            <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-1 bg-gray-200" />
            <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-1 bg-gray-200" />
            <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
          </div>
        </div>
      </div>

      {/* 리뷰 작성 버튼 */}
      <div className="mt-4 flex justify-end sm:mt-auto">
        <div className="h-11 w-32 animate-pulse rounded-2xl bg-gray-200" />
      </div>
    </div>
  </div>
);

export default ReviewWritableSkeleton;
