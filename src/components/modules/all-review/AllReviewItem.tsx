import Image from "next/image";
import { ReviewItem } from "@/types/review.type";
import { format } from "date-fns";

type ReviewListItemProps = {
  review: ReviewItem;
  index: number;
  length: number;
};

const AllReviewItem = ({ review, index, length }: ReviewListItemProps) => (
  <div className="flex w-full flex-row items-center gap-6">
    <div className="relative hidden h-50 w-50 shrink-0 overflow-hidden rounded-3xl sm:block md:w-[296px]">
      <Image src={review.Gathering.image} alt="모임 이미지" fill className="object-cover" />
    </div>
    <div className="flex w-full flex-col gap-6 sm:h-50 sm:justify-between sm:gap-0">
      {/* 프로필 이미지 */}
      <div className="flex flex-row items-center gap-[13px]">
        <div className="relative h-10 w-10 overflow-hidden rounded-full">
          <Image
            src={review.User.image ? review.User.image : "/icons/default_profile.svg"}
            alt="프로필이미지"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-1">
          <div className="text-sm font-medium text-gray-500">{review.User.name}</div>
          <div className="flex flex-row gap-2">
            {/* 리뷰 score */}
            <div className="flex gap-0.5">
              {[0, 1, 2, 3, 4].map(i => (
                <svg key={i} width="24" height="24">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22.1 9.1C22 5.7 19.3 3 15.9 3C14.8 3 13.1 3.8 12.4 5.1C12.3 5.4 11.9 5.4 11.8 5.1C11 3.9 9.4 3.1 8.2 3.1C4.9 3.1 2.1 5.8 2 9.1V9.3C2 11 2.7 12.6 3.9 13.8C3.9 13.8 3.9 13.8 3.9 13.9C4 14 8.8 18.2 11 20.1C11.6 20.6 12.5 20.6 13.1 20.1C15.3 18.2 20 14 20.2 13.9C20.2 13.9 20.2 13.9 20.2 13.8C21.4 12.7 22.1 11.1 22.1 9.3V9.1Z"
                      fill={i < review.score ? "#00BB86" : "#EEEEEE"}
                    />
                  </svg>
                </svg>
              ))}
            </div>
            <div className="text-sm font-normal text-gray-400">
              {format(review.createdAt, "yyyy.MM.dd")}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center gap-1.5">
        <div className="h-[13px] w-[3px] bg-gray-100 sm:h-4" />
        <span className="text-sm font-medium text-gray-400 sm:text-base">
          {review.Gathering.location}
        </span>
      </div>
      <div className="flex w-full flex-row items-center gap-4">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-[12px] sm:hidden">
          <Image src={review.Gathering.image} alt="모임 이미지" fill className="object-cover" />
        </div>
        <div className="text-base font-medium text-gray-600">{review.comment}</div>
      </div>
      {index + 1 !== length && <div className="mt-4 h-px w-full bg-gray-100" />}
    </div>
  </div>
);

export default AllReviewItem;
