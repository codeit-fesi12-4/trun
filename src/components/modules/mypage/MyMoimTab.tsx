"use client";

import EmptyState from "./EmptyState";
import MyPageCard from "./MyPageCard";
import { useCancelReservation, useJoinedMoims } from "@/hooks/useMypageQuery";

const MyMoimTab = () => {
  // 참여한 나의 모임 조회
  const { data, isLoading, isError } = useJoinedMoims();
  // 예약 취소
  const cancelJoinMutation = useCancelReservation();

  // 예약 취소 버튼
  const handleCancelClick = (id: number) => {
    cancelJoinMutation.mutate(id);
  };

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>오류가 발생했습니다.</div>;

  const items = data ?? [];

  return (
    <div className="flex flex-col gap-6">
      {items.length === 0 ? (
        <EmptyState text="신청한 모임이 아직 없어요" />
      ) : (
        items.map(item => (
          <MyPageCard
            key={item.id}
            item={item}
            onCancelClick={() => handleCancelClick(item.id)}
            showButton={true}
          />
        ))
      )}
    </div>
  );
};

export default MyMoimTab;
