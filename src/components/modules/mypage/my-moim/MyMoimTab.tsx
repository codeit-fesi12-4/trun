"use client";

import { useState } from "react";
import MyPageMoimCard from "./MyPageMoimCard";
import MoimCardSkeleton from "./MoimCardSkeleton";
import { useCancelReservation, useJoinedMoims } from "@/hooks/useMypageQuery";
import ModalLayout from "@/components/layouts/ModalLayout";
import { EmptyState } from "@/components/modules/mypage/EmptyState";

const MyMoimTab = () => {
  // 예약 취소 확인 모달
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [selectedCancelId, setSelectedCancelId] = useState<number | null>(null);

  // 참여한 나의 모임 조회
  const { data = [], isLoading, isError } = useJoinedMoims();

  // 예약 취소
  const cancelJoinMutation = useCancelReservation();

  // 예약 취소 버튼
  const handleCancelClick = (id: number) => {
    setSelectedCancelId(id);
    setIsCancelModalOpen(true);
  };

  if (isLoading)
    return (
      <div className="flex flex-col gap-6">
        {[1, 2, 3].map(i => (
          <MoimCardSkeleton key={i} />
        ))}
      </div>
    );
  if (isError) return <div>오류가 발생했습니다.</div>;

  return (
    <div className="flex flex-col gap-6">
      {data.length === 0 ? (
        <EmptyState text="신청한 모임이 아직 없어요" />
      ) : (
        data.map(item => (
          <MyPageMoimCard
            key={item.id}
            item={item}
            showCancelButton={!item.isCompleted} // 취소 버튼 노출 여부
            onCancelClick={() => handleCancelClick(item.id)} // 예약 취소 핸들러
          />
        ))
      )}

      {isCancelModalOpen && selectedCancelId && (
        <ModalLayout
          open={isCancelModalOpen}
          onOpenChange={setIsCancelModalOpen}
          title="예약 취소"
          onConfirm={() => {
            cancelJoinMutation.mutate(selectedCancelId, {
              onSuccess: () => {
                setIsCancelModalOpen(false);
                setSelectedCancelId(null);
              },
            });
          }}
          onCancel={() => {
            setIsCancelModalOpen(false);
            setSelectedCancelId(null);
          }}
          confirmText="확인"
          showCancel
        >
          <h2 className="flex items-center justify-center py-3 text-base font-medium">
            예약을 취소하시겠습니까?
          </h2>
        </ModalLayout>
      )}
    </div>
  );
};

export default MyMoimTab;
