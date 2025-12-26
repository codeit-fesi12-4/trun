const ProfileCardSkeleton = () => (
  <div className="flex items-center rounded-2xl border border-green-300 bg-green-100 px-4 py-6 sm:px-7 sm:py-8 md:px-8 md:py-10 lg:flex-col">
    {/* 프로필 이미지 + 닉네임 */}
    <div className="flex items-center lg:flex-col">
      <div className="h-10 w-10 animate-pulse rounded-full bg-white/50 sm:h-14 sm:w-14 lg:mt-5 lg:h-28 lg:w-28" />
      <div className="ml-2 h-6 w-10 animate-pulse rounded bg-white/50 sm:h-7 sm:w-14 lg:mt-5 lg:ml-0 lg:h-7 lg:w-22" />
    </div>

    {/* 가로, 세로 구분선 */}
    <div className="my-6 hidden w-full border-t border-gray-100 lg:block" />
    <div className="mx-4 h-16 w-px bg-gray-100 lg:hidden" />

    {/* 크루명 + 이메일 */}
    <div className="flex flex-col gap-1 text-sm font-medium sm:text-base">
      <div className="flex items-center gap-2">
        <div className="h-6 w-12 animate-pulse rounded bg-white/50" />
        <div className="h-6 w-24 animate-pulse rounded bg-white/50" />
      </div>
      <div className="flex items-center gap-2">
        <div className="h-6 w-12 animate-pulse rounded bg-white/50" />
        <div className="h-6 w-32 animate-pulse rounded bg-white/50" />
      </div>
    </div>
  </div>
);

export default ProfileCardSkeleton;
