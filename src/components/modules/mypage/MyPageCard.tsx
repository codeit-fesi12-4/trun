"use client";

import Image from "next/image";
import { TMyPageCardProps } from "@/types/mypage.type";
import MyPageCardItem from "./MyPageCardItem";

type MyPageCardProps = {
  item: TMyPageCardProps;
  onClick?: () => void;
  showButton?: boolean;
  isCreatedMoimTab?: boolean;
};

const MyPageCard = ({ item, onClick, showButton, isCreatedMoimTab }: MyPageCardProps) => (
  <div
    key={item.id}
    className="box-border flex w-full flex-col overflow-hidden rounded-3xl bg-white sm:flex-row sm:items-stretch sm:p-6"
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
    />
  </div>
);

export default MyPageCard;
