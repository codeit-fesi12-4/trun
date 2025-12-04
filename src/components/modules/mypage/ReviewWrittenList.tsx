"use client";

import EmptyState from "./EmptyState";
import ReviewCardWritten from "./ReviewCardWritten";
import { MOCK_REVIEW_WRITTENLIST } from "@/constants/mypageTestData";

const ReviewWrittenList = () => (
  <div className="flex flex-col rounded-3xl bg-white px-6 pt-6">
    {MOCK_REVIEW_WRITTENLIST.length === 0 ? (
      <EmptyState text="아직 작성한 리뷰가 없어요" />
    ) : (
      MOCK_REVIEW_WRITTENLIST.map(card => <ReviewCardWritten key={card.id} item={card} />)
    )}
  </div>
);

export default ReviewWrittenList;
