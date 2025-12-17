"use client";

import Image from "next/image";
import { EmptyState } from "@/components/modules/mypage/EmptyState";
import { useWrittenReviews } from "@/hooks/useMypageQuery";
import { format } from "date-fns";
import { toast } from "sonner";

const ReviewWrittenCategory = () => {
  const { data, isLoading, isError } = useWrittenReviews();
  const items = data?.data ?? [];

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>오류가 발생했습니다.</div>;

  return (
    <div className="flex flex-col gap-6 rounded-3xl bg-white p-6 lg:p-8">
      {items.length === 0 ? (
        <EmptyState text="아직 작성한 리뷰가 없어요" />
      ) : (
        items.map((review, index) => (
          <div key={review.id} className="flex w-full flex-row items-center gap-6">
            {/* 모임 이미지 (큰 화면) */}
            <div className="relative hidden h-50 w-50 shrink-0 overflow-hidden rounded-3xl sm:block">
              <Image src={review.Gathering.image} alt="모임 이미지" fill className="object-cover" />
            </div>

            <div className="flex w-full flex-col gap-6 sm:h-50 sm:justify-between sm:gap-0">
              {/* 프로필 */}
              <div className="flex flex-row items-center gap-3">
                <div className="relative h-10 w-10 overflow-hidden rounded-full">
                  <Image
                    src={review.User?.image ?? "/icons/default_profile.svg"}
                    alt={review.User?.name ?? "익명"}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="text-sm font-medium text-gray-500">
                    {review.User?.name ?? "익명"}
                  </div>
                  <div className="flex flex-row gap-2">
                    {/* 리뷰 score */}
                    <div className="flex gap-0.5">
                      {[0, 1, 2, 3, 4].map(i => (
                        <svg key={i} width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M22.1 9.1C22 5.7 19.3 3 15.9 3C14.8 3 13.1 3.8 12.4 5.1C12.3 5.4 11.9 5.4 11.8 5.1C11 3.9 9.4 3.1 8.2 3.1C4.9 3.1 2.1 5.8 2 9.1V9.3C2 11 2.7 12.6 3.9 13.8C3.9 13.8 3.9 13.8 3.9 13.9C4 14 8.8 18.2 11 20.1C11.6 20.6 12.5 20.6 13.1 20.1C15.3 18.2 20 14 20.2 13.9C20.2 13.9 20.2 13.9 20.2 13.8C21.4 12.7 22.1 11.1 22.1 9.3V9.1Z"
                            fill={i < review.score ? "#00BB86" : "#EEEEEE"}
                          />
                        </svg>
                      ))}
                    </div>
                    <div className="text-sm font-normal text-gray-400">
                      {format(new Date(review.Gathering.dateTime), "yyyy.MM.dd")}
                    </div>
                  </div>
                </div>

                <div className="ml-auto flex items-center">
                  <button onClick={() => toast("수정 클릭")} className="cursor-pointer">
                    <Image
                      src="/icons/ic_mypage_edit.svg"
                      alt="수정"
                      width={40}
                      height={40}
                      className="w-8 sm:w-10"
                    />
                  </button>
                  <button onClick={() => toast("삭제 클릭")} className="cursor-pointer">
                    <Image
                      src="/icons/ic_trash.svg"
                      alt="수정"
                      width={40}
                      height={40}
                      className="w-8 sm:w-10"
                    />
                  </button>
                </div>
              </div>

              {/* 위치 */}
              <div className="flex flex-row items-center gap-1.5">
                <div className="h-[13px] w-[3px] bg-gray-100 sm:h-4" />
                <span className="text-sm font-medium text-gray-400 sm:text-base">
                  {review.Gathering.location}
                </span>
              </div>

              {/* 코멘트 + 모임 이미지 (작은 화면) */}
              <div className="flex w-full flex-row items-center gap-4">
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-[12px] sm:hidden">
                  <Image
                    src={review.Gathering.image}
                    alt="모임 이미지"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-base font-medium text-gray-600">{review.comment}</div>
              </div>

              {/* 구분선 */}
              {index + 1 !== items.length && <div className="mt-4 h-px w-full bg-gray-100" />}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ReviewWrittenCategory;
