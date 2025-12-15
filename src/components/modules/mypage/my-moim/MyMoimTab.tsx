"use client";

import { useState } from "react";
import MyPageCard from "./MyPageMoimCard";
import { useCancelReservation, useJoinedMoims } from "@/hooks/useMypageQuery";
import ModalLayout from "@/components/layouts/ModalLayout";
import { MypageMoim, WritableReviewItem } from "@/types/mypage.type";
import { ReviewWriteModal } from "@/components/modules/mypage/mypage-modal/ReviewWriteModal";
import { EmptyState } from "@/components/modules/mypage/EmptyState";

const MyMoimTab = () => {
  // 리뷰쓰기 모달
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedMoim, setSelectedMoim] = useState<WritableReviewItem | null>(null);

  // 예약 취소 확인 모달
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [selectedCancelId, setSelectedCancelId] = useState<number | null>(null);

  // 참여한 나의 모임 조회
  const { data: joinedMoims = [], isLoading, isError } = useJoinedMoims();

  // 예약 취소
  const cancelJoinMutation = useCancelReservation();

  // 예약 취소 버튼
  const handleCancelClick = (id: number) => {
    setSelectedCancelId(id);
    setIsCancelModalOpen(true);
  };

  // 리뷰 작성 버튼 클릭
  const handleReviewClick = (moim: MypageMoim) => {
    // WritableReviewItem으로 변환
    const writableItem: WritableReviewItem = {
      ...moim,
      gatheringId: moim.id,
      score: 0,
    };
    setSelectedMoim(writableItem);
    setIsReviewModalOpen(true);
  };

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>오류가 발생했습니다.</div>;

  return (
    <div className="flex flex-col gap-6">
      {joinedMoims.length === 0 ? (
        <EmptyState text="신청한 모임이 아직 없어요" />
      ) : (
        joinedMoims.map(item => {
          const reviewAction =
            item.isCompleted && !item.isReviewed ? (
              <button
                className="h-11 w-32 rounded-2xl bg-green-500 font-semibold text-white"
                onClick={() => handleReviewClick(item)}
              >
                리뷰 작성하기
              </button>
            ) : item.isReviewed ? (
              <button
                className="h-11 w-32 rounded-2xl bg-gray-100 font-semibold text-gray-500 sm:h-12 sm:w-28"
                disabled
              >
                리뷰 작성 완료
              </button>
            ) : null;

          return (
            <MyPageCard
              key={item.id}
              item={item}
              showCancelButton={!item.isCompleted} // 취소 버튼 노출 여부
              reviewAction={reviewAction} // 리뷰 액션 UI (작성/완료/없음)
              onCancelClick={() => handleCancelClick(item.id)} // 예약 취소 핸들러
            />
          );
        })
      )}

      {isCancelModalOpen && selectedCancelId && (
        <ModalLayout
          open={isCancelModalOpen}
          onOpenChange={setIsCancelModalOpen}
          title="예약 취소"
          onConfirm={() => {
            cancelJoinMutation.mutate(selectedCancelId);
            setIsCancelModalOpen(false);
            setSelectedCancelId(null);
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

      {isReviewModalOpen && selectedMoim && (
        <ReviewWriteModal
          open={isReviewModalOpen}
          onOpenChange={setIsReviewModalOpen}
          item={selectedMoim}
        />
      )}
    </div>
  );
};

export default MyMoimTab;
