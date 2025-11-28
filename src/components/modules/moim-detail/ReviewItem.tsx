import { IReview } from "@/constants/moimFakeData";
import Image from "next/image";

interface IReviewItem {
  review: IReview;
}

const ReviewItem = ({ review }: IReviewItem) => {
  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
  };

  return (
    <div className="flex w-full flex-col border-b-2 border-dashed border-gray-200 pb-4">
      {/* 리뷰 score */}
      <div className="mb-2.5 flex gap-0.5">
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
                fill={i < review.score ? "#EA580C" : "#E5E7EB"}
              />
            </svg>
          </svg>
        ))}
      </div>
      {/* 리뷰 comment */}
      <div className="mb-2 text-sm font-medium text-gray-700">{review.comment}</div>
      {/* 리뷰 작성자 */}
      <div className="flex flex-row items-center gap-2">
        <div className="h-6 w-6 overflow-hidden rounded-full">
          <Image
            src={review.User.image ?? "/icons/default_profile.svg"}
            alt="프로필이미지"
            width={24}
            height={24}
          />
        </div>
        <div className="text-xs font-medium text-gray-700">{review.User.name}</div>
        <div className="text-xs font-medium text-gray-700">|</div>
        <div className="text-xs font-medium text-gray-500">{formatDate(review.createdAt)}</div>
      </div>
    </div>
  );
};

export default ReviewItem;
