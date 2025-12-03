"use client";

import ReviewCardWritten from "./ReviewCardWritten";
import { MOCK_REVIEW_WRITTENLIST } from "@/constants/mypageTestData";

const ReviewWrittenList = () => (
  <div className="flex flex-col rounded-3xl bg-white px-6 pt-6">
    {MOCK_REVIEW_WRITTENLIST.length === 0 ? (
      <p className="flex h-40 items-center justify-center text-sm font-medium text-gray-500">
        아직 작성한 리뷰가 없어요
      </p>
    ) : (
      MOCK_REVIEW_WRITTENLIST.map(card => <ReviewCardWritten key={card.id} item={card} />)
    )}
  </div>
);

export default ReviewWrittenList;
