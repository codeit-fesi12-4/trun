"use client";

import Image from "next/image";
import { MypageMoim } from "@/types/mypage.type";
import MyPageCardItem from "./MyPageCardItem";

type MyPageCardProps = {
  item: MypageMoim;
  onClick?: () => void;
  showButton?: boolean;
  isCreatedMoimTab?: boolean;
  isReviewedMoimTab?: boolean;
};

const MyPageCard = ({
  item,
  onClick,
  showButton,
  isCreatedMoimTab,
  isReviewedMoimTab,
}: MyPageCardProps) => (
  <div
    key={item.id}
    className="relative box-border flex w-full flex-col overflow-hidden rounded-3xl bg-white sm:flex-row sm:items-stretch sm:p-6"
  >
    {/* 이미지 */}
    <div className="relative h-39 w-full shrink-0 sm:h-40 sm:w-40">
      <Image src={item.image} alt="이미지" fill className="object-cover sm:rounded-3xl" />
    </div>

    {/* 데이터 */}
    <MyPageCardItem
      item={item}
      onClick={onClick}
      showButton={showButton}
      isCreatedMoimTab={isCreatedMoimTab}
      isReviewedMoimTab={isReviewedMoimTab}
    />

    {/* 모집 취소 오버레이: 내가 참여한 모임이 생성자에 의해 취소된 경우 */}
    {item.canceledAt && item.participantCount > 0 && (
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-gray-950/80 text-sm font-medium text-white">
        <p>모집 취소된 모임이에요,</p>
        <p>다음 기회에 만나요 🙏</p>
      </div>
    )}
  </div>
);

export default MyPageCard;
