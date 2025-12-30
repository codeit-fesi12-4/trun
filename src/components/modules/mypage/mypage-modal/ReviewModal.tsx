"use client";

import { useState } from "react";
import ModalLayout from "@/components/layouts/ModalLayout";
import { ReviewForm } from "./ReviewForm";
import { EditableReviewItem, ReviewModalMode, WritableReviewItem } from "@/types/mypage.type";
import { toast } from "sonner";
import { useReviewEditMutation, useReviewMutation } from "@/hooks/useMypageQuery";

type ReviewModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: WritableReviewItem | EditableReviewItem;
  mode?: ReviewModalMode;
};

export const ReviewModal = ({ open, onOpenChange, item, mode = "create" }: ReviewModalProps) => {
  const [score, setScore] = useState(item.score ?? 0);
  const [comment, setComment] = useState(item.comment ?? "");

  // 모드에 따라 처리 구분
  const isEdit = mode === "edit";
  const createMutation = useReviewMutation(() => onOpenChange(false));
  const editMutation = useReviewEditMutation(() => onOpenChange(false));

  // 현재 모드에 맞는 mutation 선택
  const currentMutation = isEdit ? editMutation : createMutation;
  const isPending = currentMutation.isPending;

  // UI 상태 변수 분리
  const modalTitle = isEdit ? "리뷰 수정" : "리뷰 쓰기";
  const confirmText = isPending ? "처리 중..." : isEdit ? "수정 하기" : "리뷰 등록";
  const isConfirmDisabled = isPending || score === 0 || comment.trim().length < 5;

  const handleConfirm = () => {
    if (score === 0) {
      toast.warning("별점을 선택해주세요.");
      return;
    }

    if (comment.trim().length < 5) {
      toast.warning("리뷰를 5자 이상 작성해주세요.");
      return;
    }

    if (isEdit) {
      // 수정 모드
      editMutation.mutate({
        reviewId: item.id,
        params: {
          score,
          comment,
        },
      });
    } else {
      // 작성 모드
      if ("gatheringId" in item) {
        createMutation.mutate({
          gatheringId: item.gatheringId,
          score,
          comment,
        });
      }
    }
  };

  return (
    <ModalLayout
      open={open}
      onOpenChange={onOpenChange}
      title={modalTitle}
      onConfirm={handleConfirm}
      confirmText={confirmText}
      confirmDisabled={isConfirmDisabled}
      onCancel={() => onOpenChange(false)}
      showCancel
    >
      <ReviewForm
        score={score}
        comment={comment}
        onScoreChange={setScore}
        onCommentChange={setComment}
      />
    </ModalLayout>
  );
};
