"use client";

import MyPageCard from "./MyPageCard";
import EmptyState from "./EmptyState";
import { useQuery } from "@tanstack/react-query";
import { getCreatedMoims } from "@/api/mypageMoim.api";
import { useAuthStore } from "@/stores/auth.store";

const CreatedMoimTab = () => {
  const user = useAuthStore(state => state.user);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["mypage", "createdMoims", user?.id],
    queryFn: () => getCreatedMoims(user!.id),
    enabled: !!user,
  });

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>오류가 발생했습니다.</div>;

  const items = data ?? [];

  return (
    <div className="flex flex-col gap-6">
      {items.length === 0 ? (
        <EmptyState text="아직 만든 모임이 없어요" />
      ) : (
        items.map(item => (
          <MyPageCard key={item.id} item={item} showButton={false} isCreatedMoimTab={true} />
        ))
      )}
    </div>
  );
};
export default CreatedMoimTab;
