"use client";

import ReviewCardWritten from "./ReviewCardWritten";
import { TReviewCardProps } from "./type";

const MOCK_DATA: TReviewCardProps[] = [
  {
    id: 1,
    image: "/images/running-1.png",
    name: "러닝 모임",
    location: "부산 전체",
    dateTime: "2025-01-25",
    score: 4,
    comment: "모임 분위기도 좋고 강사님이 친절해서 재밌게 참여했습니다!",
  },
  {
    id: 2,
    image: "/images/img_login.png",
    name: "명상 모임",
    location: "서울 전체",
    dateTime: "2025-01-20T10:00:00.000Z",
    score: 5,
    comment: "힐링 그 자체! 스트레스가 확 날아갔어요.",
  },
];

const ReviewWrittenList = () => (
  <div className="flex flex-col gap-6">
    {MOCK_DATA.length === 0 ? (
      <p className="flex h-40 items-center justify-center text-sm font-medium text-gray-500">
        아직 작성한 리뷰가 없어요
      </p>
    ) : (
      MOCK_DATA.map(card => <ReviewCardWritten key={card.id} item={card} />)
    )}
  </div>
);

export default ReviewWrittenList;
