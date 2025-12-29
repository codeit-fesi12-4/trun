"use client";

import { ChangeEvent } from "react";
import { Textarea } from "@/components/ui/textarea";

interface ReviewFormProps {
  score: number;
  comment: string;
  onScoreChange: (score: number) => void;
  onCommentChange: (comment: string) => void;
}

export const ReviewForm = ({ score, comment, onScoreChange, onCommentChange }: ReviewFormProps) => (
  <div className="flex flex-col gap-12 pt-8 pb-8">
    <div>
      <h2 className="pb-2 text-lg font-medium text-gray-800">만족스러운 경험이었나요?</h2>
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map(star => (
          <button
            key={star}
            type="button"
            onClick={() => onScoreChange(star)}
            className="cursor-pointer text-3xl"
          >
            <span className={star <= score ? "text-green-600" : "text-gray-200"}>♥</span>
          </button>
        ))}
      </div>
    </div>
    <div>
      <h2 className="pb-2.5 text-lg font-medium text-gray-800">경험에 대해 남겨주세요.</h2>
      <Textarea
        value={comment}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => onCommentChange(e.target.value)}
        placeholder="남겨주신 리뷰는 프로그램 운영 및 다른 회원 분들께 큰 도움이 됩니다."
        className="h-52 text-base focus-visible:border-green-400 focus-visible:ring-0"
      />
    </div>
  </div>
);
