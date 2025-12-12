"use client";

import ModalLayout from "@/components/layouts/ModalLayout";
import { Textarea } from "@/components/ui/textarea";
import { ReviewCardData } from "@/types/mypage.type";
import { useState } from "react";
import { toast } from "sonner";

const ReviewWriteModal = ({
  open,
  onOpenChange,
  item,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: ReviewCardData;
}) => {
  const [score, setScore] = useState(item.score ?? 0);
  const [comment, setComment] = useState("");

  const handleConfirm = () => {
    toast(`리뷰 등록: score=${score}, comment=${comment}`);
  };

  const handleChangeComent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  return (
    <ModalLayout
      open={open}
      onOpenChange={onOpenChange}
      title="리뷰 쓰기"
      onConfirm={handleConfirm}
      confirmText="리뷰 등록"
      onCancel={() => onOpenChange(false)}
      showCancel
    >
      {/* 폼 */}
      <div className="flex flex-col gap-12 pt-8 pb-8">
        <div>
          <h2 className="pb-2 text-lg font-medium text-gray-800">만족스러운 경험이었나요?</h2>
          {/* 별점 체크 */}
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setScore(index + 1)}
                className="cursor-pointer text-3xl"
              >
                <span className={index < score ? "text-green-600" : "text-gray-200"}>♥</span>
              </button>
            ))}
          </div>
        </div>
        <div>
          <h2 className="pb-2.5 text-lg font-medium text-gray-800">경험에 대해 남겨주세요.</h2>
          <Textarea
            value={comment}
            onChange={handleChangeComent}
            placeholder="남겨주신 리뷰는 프로그램 운영 및 다른 회원 분들께 큰 도움이 됩니다."
            className="h-52 text-base focus-visible:border-green-400 focus-visible:ring-0"
          />
        </div>
      </div>
    </ModalLayout>
  );
};
export default ReviewWriteModal;
