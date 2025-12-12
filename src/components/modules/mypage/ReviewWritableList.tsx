"use client";

import MyPageCard from "./MyPageCard";
import EmptyState from "./EmptyState";
import { getMoimJoined } from "@/api/mypageMoim.api";
import { TEAM_NAME } from "@/constants";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ReviewCardData } from "@/types/mypage.type";
import ReviewWriteModal from "./mypage-modal/ReviewWriteModal";
import { buildReviewData } from "@/utils/mypage.util";

const ReviewWritableList = () => {
  // 리뷰쓰기 모달
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedReviewItem, setSelectedReviewItem] = useState<ReviewCardData | null>(null);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["mypage", "joinedMoims"],
    queryFn: () => getMoimJoined(undefined, TEAM_NAME),
  });

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>오류가 발생했습니다.</div>;
  const items = data ?? [];

  const handleReviewClick = (item: ReviewCardData) => {
    setSelectedReviewItem(item);
    setIsReviewModalOpen(true);
  };

  return (
    <div className="flex flex-col gap-6">
      {items.length === 0 ? (
        <EmptyState text="아직 작성 가능한 리뷰가 없어요" />
      ) : (
        items.map(item => (
          <MyPageCard
            key={item.id}
            item={item}
            onReviewClick={() => handleReviewClick(buildReviewData(item))}
            showButton={true}
            isReviewedMoimTab={true}
          />
        ))
      )}

      {/* 리뷰 작성 모달 */}
      {isReviewModalOpen && selectedReviewItem && (
        <ReviewWriteModal
          open={isReviewModalOpen}
          onOpenChange={setIsReviewModalOpen}
          item={selectedReviewItem}
        />
      )}
    </div>
  );
};
export default ReviewWritableList;
