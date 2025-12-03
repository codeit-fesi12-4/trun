import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoimStatus, TMyPageCardProps } from "@/types/mypage.type";
import { formatDateTime } from "@/utils/mypage.util";
import Image from "next/image";

const statusToClassName: Record<MoimStatus, string> = {
  "이용 예정": "bg-green-100 text-green-600",
  "개설 확정": "bg-white text-green-600 border-[var(--gradient-500)] ",
  "개설 대기": "border-gray-200 text-gray-500 bg-white",
  "이용 완료": "bg-gray-100 text-gray-600 text-md",
};

type MyPageCardItemProps = {
  item: TMyPageCardProps;
  onClick?: () => void;
  showButton?: boolean;
  isCreatedMoimTab?: boolean;
};

const MyPageCardItem = ({ item, onClick, showButton, isCreatedMoimTab }: MyPageCardItemProps) => {
  const formattedDate = formatDateTime(item.dateTime);
  return (
    <>
      {/* 텍스트 영역 */}
      <div className="relative flex w-full flex-col p-4 sm:justify-between sm:py-0 sm:pr-0 md:pl-4">
        {/* 내용 상단 부분 */}
        <div>
          {/* 상태 */}
          {item.status && (
            <div className="flex gap-2 pb-4">
              {(Array.isArray(item.status) ? item.status : [item.status]).map(status => (
                <Badge
                  key={status}
                  className={`${statusToClassName[status as MoimStatus]} h-8 text-sm font-medium`}
                >
                  {status === "개설 확정" && (
                    <Image
                      src="/icons/ic_mypage_check.svg"
                      alt="개설 확정 아이콘"
                      width={24}
                      height={24}
                    />
                  )}
                  {status}
                </Badge>
              ))}
            </div>
          )}

          {/* 찜하기 */}
          <Button
            variant="outline"
            className="absolute top-4 right-4 ml-auto h-12 w-12 rounded-full border-gray-300 p-0 text-gray-500 hover:bg-red-50 hover:text-red-600 sm:top-0 sm:right-0"
            onClick={() => alert("찜하기 클릭")}
          >
            <Image src="/icons/ic_save.svg" alt="찜하기" width={48} height={48} />
          </Button>

          {/* 제목 */}
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold text-gray-900">{item.name}</h2>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between">
          <div className="flex flex-col pr-8">
            {/* 인원 */}
            <p className="flex gap-1 text-sm font-medium text-gray-950">
              <Image src="/icons/person.svg" alt="인원 아이콘" width={16} height={16} />
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
          {showButton && (
            <div className="mt-auto flex justify-end">
              {item.canceledAt === null && !item.isCompleted && (
                <Button
                  variant="outline"
                  className="h-11 w-32 rounded-2xl border-green-500 bg-white px-7 py-5 font-semibold text-green-500 hover:bg-green-500 hover:text-white sm:h-12 sm:w-28"
                  onClick={onClick}
                >
                  예약 취소하기
                </Button>
              )}
              {item.isCompleted && !item.isReviewed && (
                <Button
                  variant="outline"
                  className="h-11 w-32 rounded-2xl border-green-500 bg-green-500 font-semibold text-white hover:bg-green-50 hover:text-green-500 sm:h-12 sm:w-28"
                  onClick={onClick}
                >
                  리뷰 작성하기
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MyPageCardItem;
