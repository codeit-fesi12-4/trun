const MoimCardSkeleton = () => (
  <div className="relative box-border flex w-full flex-col overflow-hidden rounded-3xl bg-white sm:flex-row sm:items-stretch sm:p-6">
    {/* 이미지 */}
    <div className="relative h-39 w-full shrink-0 animate-pulse bg-gray-100 sm:h-40 sm:w-40 sm:rounded-3xl" />

    {/* 데이터 */}
    <div className="relative flex w-full flex-col p-4 sm:justify-between sm:py-0 sm:pr-0 md:pl-4">
      {/* 내용 상단 부분 */}
      <div>
        {/* 배지 영역 */}
        <div className="flex gap-2 pb-4">
          <div className="h-8 w-18 animate-pulse rounded-full bg-gray-100" />
        </div>

        {/* 찜하기 버튼 영역 */}
        <div className="absolute top-4 right-4 h-12 w-12 animate-pulse rounded-full bg-gray-100 sm:top-0 sm:right-0" />

        {/* 제목 */}
        <div className="h-6 w-38 animate-pulse rounded bg-gray-100" />
      </div>

      <div className="flex flex-col sm:flex-row sm:justify-between">
        <div className="flex flex-col pr-8">
          {/* 인원 */}
          <div className="mt-2 h-5 w-15 animate-pulse rounded bg-gray-100 pt-4" />

          {/* 위치 / 날짜 / 시간 */}
          <div className="mt-2 flex gap-2">
            <div className="h-4.5 w-24 animate-pulse rounded bg-gray-100" />
            <div className="h-4.5 w-0.5 bg-gray-100" />
            <div className="h-4.5 w-20 animate-pulse rounded bg-gray-100" />
            <div className="h-4.5 w-0.5 bg-gray-200" />
            <div className="h-4.5 w-16 animate-pulse rounded bg-gray-100" />
          </div>
        </div>

        {/* 버튼 */}
        <div className="mt-4 flex justify-end">
          <div className="h-11 w-32 animate-pulse rounded-2xl bg-gray-100" />
        </div>
      </div>
    </div>
  </div>
);

export default MoimCardSkeleton;
