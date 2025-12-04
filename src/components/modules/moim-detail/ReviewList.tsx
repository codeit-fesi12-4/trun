import { Data } from "@/types/moimReview.type";
import ReviewItem from "./ReviewItem";
import Image from "next/image";

type ReviewListProps = {
  reviewList: Data[];
};

const ReviewList = ({ reviewList }: ReviewListProps) => (
  <div className="mt-2 mb-10 h-fit rounded-2xl bg-white px-5 py-6 pb-10 sm:mt-4 sm:rounded-4xl sm:px-10 sm:pt-8 md:mt-6 md:px-12 md:pt-10 md:pb-10">
    {reviewList.length === 0 ? (
      <div className="flex h-[250px] flex-col items-center justify-center">
        <Image src="../icons/img_empty.svg" alt="리뷰가 없습니다." width={120} height={115} />
        <div className="text-lg font-semibold text-gray-400">아직 리뷰가 없어요</div>
      </div>
    ) : (
      <ul className="flex flex-col gap-8">
        {reviewList.map((review: Data, index: number) => (
          <li key={review.id}>
            <ReviewItem review={review} index={index} length={reviewList.length} />
          </li>
        ))}
      </ul>
    )}
  </div>
);

export default ReviewList;
