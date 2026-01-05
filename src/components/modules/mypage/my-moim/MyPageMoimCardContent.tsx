"use client";

import FavoriteButton from "@/components/common/FavoriteButton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MypageMoim } from "@/types/mypage.type";
import { formatDateTime, getMeetingStatus, getMoimStatusClass } from "@/utils/mypage.util";
import Image from "next/image";

type MyPageCardItemProps = {
  item: MypageMoim;
  onCancelClick?: () => void;
  showCancelButton?: boolean;
  isCreatedMoimTab?: boolean;
};

const MyPageMoimCardContent = ({
  item,
  onCancelClick,
  showCancelButton,
  isCreatedMoimTab,
}: MyPageCardItemProps) => {
  const formattedDate = formatDateTime(item.dateTime);
  const { main, sub } = getMeetingStatus(item);

  return (
    <>
      {/* 텍스트 영역 */}
      <div className="relative flex w-full flex-col p-4 sm:justify-between sm:py-0 sm:pr-0 md:pl-4">
        {/* 내용 상단 부분 */}
        <div>
          {/* 상태별 배지 스타일 */}
          {!isCreatedMoimTab && (
            <div className="flex gap-2 pb-4">
              {/* 서브 상태 */}
              {sub && (
                <Badge className={`${getMoimStatusClass(sub)} h-8 px-2.5 text-sm font-medium`}>
                  {sub}
                </Badge>
              )}

              {/* 메인 상태 */}
              <Badge
                className={`${getMoimStatusClass(main)} flex h-8 items-center px-2.5 text-sm font-medium`}
              >
                {main === "개설 확정" ? (
                  <>
                    <Image
                      src="/icons/moim/secure_check.svg"
                      alt="개설 확정 아이콘"
                      width={16}
                      height={16}
                    />
                    <span>{main}</span>
                  </>
                ) : (
                  main
                )}
              </Badge>
            </div>
          )}

          {/* 찜하기 */}
          <div className="absolute top-4 right-4 sm:top-0 sm:right-0">
            <FavoriteButton moimId={item.id} />
          </div>

          {/* 제목 */}
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold text-gray-900">{item.name}</h2>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between">
          <div className="flex flex-col pr-8">
            {/* 인원 */}
            <p className="flex gap-1 text-sm font-medium text-gray-950">
              <Image src="/icons/common/person.svg" alt="인원 아이콘" width={16} height={16} />
              {item.participantCount}/{item.capacity}
            </p>

            {/* 위치 / 날짜 / 시간 */}
            <div
              className={`flex gap-2 pt-1 text-sm text-gray-700 ${isCreatedMoimTab ? "pb-0" : "pb-4"} sm:pb-0`}
            >
              <p className="text-gray-600">
                <span className="pr-1.5 text-gray-500">위치</span>
                {item.location}
              </p>

              <span className="text-gray-300">|</span>

              <p className="text-gray-600">
                <span className="pr-1.5 text-gray-500">날짜</span>
                {formattedDate.date}
              </p>

              <span className="text-gray-300">|</span>

              <p className="text-gray-600">
                <span className="pr-1.5 text-gray-500">시간</span>
                {formattedDate.time}
              </p>
            </div>
          </div>

          {/* 버튼 */}
          <div className="mt-auto flex justify-end gap-2">
            {showCancelButton && item.canceledAt === null && !item.isCompleted && (
              <Button
                variant="outline"
                className="h-11 w-32 cursor-pointer rounded-2xl border-green-500 bg-white font-semibold text-green-500 hover:bg-green-500 hover:text-white"
                onClick={onCancelClick}
              >
                예약 취소하기
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyPageMoimCardContent;
