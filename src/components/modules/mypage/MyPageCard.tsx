"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Status, TMyPageCardProps } from "./type";
import { Badge } from "@/components/ui/badge";

const statusToClassName: Record<Status, string> = {
  "이용 예정": "bg-orange-100 text-orange-600",
  "개설 확정": "bg-white text-orange-600 border-orange-100",
  "개설 대기": "border-gray-200 text-gray-500 bg-white",
  "이용 완료": "bg-gray-200 text-gray-500 text-md",
};

type MyPageCardProps = {
  item: TMyPageCardProps;
  onClick?: () => void;
  showButton?: boolean;
};

export const formatDateTime = (isoString: string, showYear = true) => {
  if (!isoString) return "";
  const date = new Date(isoString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return showYear ? `${month}월 ${day}일 · ${hours}:${minutes}` : `${year}.${month}.${day}`;
};

const MyPageCard = ({ item, onClick, showButton }: MyPageCardProps) => {
  const formattedDate = formatDateTime(item.dateTime, true);

  return (
    <div
      key={item.id}
      className="flex flex-col border-b-2 border-dashed border-gray-200 pb-6 md:flex-row"
    >
      {/* 이미지 */}
      <div className="relative h-39 w-full overflow-hidden rounded-3xl md:w-2xs">
        <Image src={item.image} alt="모임 이미지" fill className="object-cover" />
      </div>

      {/* 텍스트 영역 */}
      <div className="flex flex-col md:pl-4">
        {/* 상태 */}
        {/* {item.status && (
          <div className="flex gap-2 pt-4 md:pt-0 md:pb-4">
            <Badge className={`${statusToClassName[item.status]} h-8 w-[76px] text-sm font-medium`}>
              {item.status}
            </Badge>
          </div>
        )} */}
        {item.status && (
          <div className="flex gap-2 pt-4 md:pt-0 md:pb-4">
            {(Array.isArray(item.status) ? item.status : [item.status]).map(s => (
              <Badge
                key={s}
                className={`${statusToClassName[s as Status]} h-8 w-[76px] text-sm font-medium`}
              >
                {s}
              </Badge>
            ))}
          </div>
        )}

        {/* 타이틀 + 위치 */}
        <div className="flex items-center gap-2 pt-4 md:pt-0">
          <h2 className="text-lg font-semibold text-gray-900">{item.name}</h2>
          <span className="text-lg font-semibold text-gray-700">|</span>
          <p>{item.location}</p>
        </div>

        {/* 날짜 / 시간 / 인원 */}
        <div className="flex pt-1 pb-4 text-sm text-gray-700">
          <p className="pr-3">{formattedDate}</p>
          <p>
            {item.participantCount}/{item.capacity}
          </p>
        </div>

        {/* 버튼 */}
        {showButton && (
          <div className="mt-auto flex">
            {item.canceledAt === null && !item.isCompleted && (
              <Button
                variant="outline"
                className="h-10 w-30 border-orange-600 font-semibold text-orange-600 hover:bg-orange-600 hover:text-white"
                onClick={onClick}
              >
                예약 취소하기
              </Button>
            )}
            {item.isCompleted && !item.isReviewed && (
              <Button
                variant="outline"
                className="h-10 w-30 border-orange-600 bg-orange-600 font-semibold text-white hover:bg-orange-50 hover:text-orange-600"
                onClick={onClick}
              >
                리뷰 작성하기
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPageCard;
