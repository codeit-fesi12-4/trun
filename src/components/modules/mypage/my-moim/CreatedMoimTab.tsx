"use client";

import MyPageCard from "./MyPageMoimCard";
import MoimCardSkeleton from "./MoimCardSkeleton";
import { EmptyState } from "@/components/modules/mypage/EmptyState";
import { useCreatedMoims } from "@/hooks/useMypageQuery";
import { useUserProfileQuery } from "@/hooks/useUserQuery";

const CreatedMoimTab = () => {
  const { data: user, isLoading: isUserLoading } = useUserProfileQuery();
  const userId = user?.id;

  const { data: items = [], isLoading, isError } = useCreatedMoims(userId);

  if (isUserLoading || isLoading)
    return (
      <div className="flex flex-col gap-6">
        {[1, 2, 3].map(i => (
          <MoimCardSkeleton key={i} />
        ))}
      </div>
    );
  if (!userId) return <div>로그인이 필요합니다.</div>;
  if (isError) return <div>오류가 발생했습니다.</div>;

  return (
    <div className="flex flex-col gap-6">
      {items.length === 0 ? (
        <EmptyState text="아직 만든 모임이 없어요" />
      ) : (
        items.map(item => (
          <MyPageCard key={item.id} item={item} showCancelButton={false} isCreatedMoimTab={true} />
        ))
      )}
    </div>
  );
};
export default CreatedMoimTab;
