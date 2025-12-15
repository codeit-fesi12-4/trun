"use client";

import Image from "next/image";
import { MypageMoim } from "@/types/mypage.type";
import MyPageCardItem from "./MyPageMoimCardContent";
import { ReactNode } from "react";

type MyPageCardProps = {
  item: MypageMoim;
  onCancelClick?: () => void;
  reviewAction?: ReactNode;
  showCancelButton?: boolean;
  isCreatedMoimTab?: boolean;
};

const MyPageMoimCard = ({
  item,
  onCancelClick,
  reviewAction,
  showCancelButton,
  isCreatedMoimTab,
}: MyPageCardProps) => {
  const isCreatorCanceled = item.canceledAt && item.participantCount > 0;

  return (
    <div className="relative box-border flex w-full flex-col overflow-hidden rounded-3xl bg-white sm:flex-row sm:items-stretch sm:p-6">
      {/* 이미지 */}
      <div className="relative h-39 w-full shrink-0 sm:h-40 sm:w-40">
        <Image src={item.image} alt="이미지" fill className="object-cover sm:rounded-3xl" />
      </div>

      {/* 데이터 */}
      <MyPageCardItem
        item={item}
        onCancelClick={onCancelClick}
        reviewAction={reviewAction}
        showCancelButton={showCancelButton}
        isCreatedMoimTab={isCreatedMoimTab}
      />

      {/* 모집 취소 오버레이: 내가 참여한 모임이 생성자에 의해 취소된 경우 */}
      {isCreatorCanceled && (
        <div className="absolute inset-0 z-5 flex flex-col items-center justify-center bg-gray-950/80 text-sm font-medium text-white">
          <p>모집 취소된 모임이에요,</p>
          <p>다음 기회에 만나요 🙏</p>
        </div>
      )}
    </div>
  );
};
export default MyPageMoimCard;
