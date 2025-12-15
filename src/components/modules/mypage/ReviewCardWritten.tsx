"use client";

import Image from "next/image";
import { MypageMoim } from "@/types/mypage.type";
import { formatDateTime } from "@/utils/mypage.util";
import { MOIM_TYPE, FILTER_CATEGORY } from "@/constants/moim";

export type ReviewCardProps = {
  item: MypageMoim & {
    score?: number;
    comment?: string;
  };
};

const ReviewCardWritten = ({ item }: ReviewCardProps) => {
  const formattedDate = formatDateTime(item.dateTime);

  // 모임 타입을 한글로 변환
  const getTypeLabel = (type: string) => {
    if (type === MOIM_TYPE.DALLIMFIT) return FILTER_CATEGORY.DALLIMFIT;
    if (type === MOIM_TYPE.RUNCATION) return FILTER_CATEGORY.RUNCATION;
    return type;
  };

  return (
    <div className="mb-6 flex flex-col gap-6 border-b border-gray-200 pb-6 sm:flex-row md:gap-6">
      {/* 왼쪽: 모임 이미지 */}
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-3xl sm:h-32 sm:w-32">
        <Image src={item.image} alt="모임 이미지" fill className="object-cover" />
      </div>

      {/* 오른쪽: 유저 정보 + 댓글 */}
      <div className="flex flex-col justify-between gap-4 md:flex-1">
        {/* 유저 정보 */}
        <div className="flex items-center gap-3">
          <Image src="/icons/default_profile.svg" alt="프로필" width={40} height={40} />
          <div className="flex flex-col">
            <h2 className="font-medium text-gray-600">{item.name}</h2>
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, score) => (
                <span
                  key={score}
                  className={`${score < (item.score ?? 0) ? "text-green-600" : "text-gray-200"} text-lg`}
                >
                  ♥
                </span>
              ))}
              <p className="text-xs text-gray-500">{formattedDate.full}</p>
            </div>
          </div>
        </div>

        {/* 타입 + 위치 */}
        <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
          <div className="h-3.5 w-1 bg-gray-200" />
          <h2>{getTypeLabel(item.type)}</h2>
          <span>·</span>
          <p>{item.location}</p>
        </div>

        {/* 내가 작성한 내용 */}
        <p className="text-sm text-gray-700">{item.comment}</p>
      </div>
    </div>
  );
};

export default ReviewCardWritten;
