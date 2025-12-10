import { Data } from "@/types/moimReview.type";
import ReviewItem from "./ReviewItem";
import EmptyReview from "@/components/common/EmptyReview";

type ReviewListProps = {
  reviewList: Data[];
};

const ReviewList = ({ reviewList }: ReviewListProps) => (
  <div className="mt-2 mb-10 h-fit rounded-2xl bg-white px-5 py-6 pb-10 sm:mt-4 sm:rounded-4xl sm:px-10 sm:pt-8 md:mt-6 md:px-12 md:pt-10 md:pb-10">
    {reviewList.length === 0 ? (
      <EmptyReview />
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
