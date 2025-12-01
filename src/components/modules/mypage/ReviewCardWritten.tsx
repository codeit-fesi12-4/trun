"use client";

import Image from "next/image";
import { formatDateTime } from "./MyPageCard";
import { TReviewCardProps } from "@/types/mypage.type";

export type ReviewCardProps = {
  item: TReviewCardProps;
};

const ReviewCardWritten = ({ item }: ReviewCardProps) => {
  const formattedDate = formatDateTime(item.dateTime, false);

  return (
    <div className="flex flex-col gap-4 border-b-2 border-dashed border-gray-200 pb-6 md:flex-row">
      {/* 이미지 */}
      <div className="relative h-39 w-full overflow-hidden rounded-3xl md:w-2xs">
        <Image src={item.image} alt="모임 이미지" fill className="object-cover" />
      </div>

      <div className="flex flex-col">
        {/* 별점 */}
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, score) => (
            <span
              key={score}
              className={`${score < (item.score ?? 0) ? "text-orange-600" : "text-gray-200"} text-lg`}
            >
              ♥
            </span>
          ))}
        </div>

        {/* 내가 작성한 내용 */}
        <p className="pt-2.5 text-sm text-gray-700">{item.comment}</p>

        {/* 타이틀 + 위치 */}
        <div className="flex items-center gap-2 pt-2.5 text-xs font-medium text-gray-700">
          <h2>{item.name}</h2>
          <span>·</span>
          <p>{item.location}</p>
        </div>

        {/* 날짜 y. m. d */}
        <p className="pt-2 text-xs text-gray-500">{formattedDate}</p>
      </div>
    </div>
  );
};

export default ReviewCardWritten;
