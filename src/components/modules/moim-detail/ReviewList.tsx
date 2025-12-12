import { Data } from "@/types/moimReview.type";
import ReviewItem from "./ReviewItem";
import ReviewItemSkeleton from "./detail-skeleton/ReviewItemSkeleton";
import EmptyReview from "@/components/common/EmptyReview";

type ReviewListProps = {
  reviewList: Data[];
  isLoading?: boolean;
};

const SKELETON_COUNT = 3;

const ReviewList = ({ reviewList, isLoading = false }: ReviewListProps) => (
  <div className="mt-2 mb-10 h-fit rounded-2xl bg-white px-5 py-6 pb-10 sm:mt-4 sm:rounded-4xl sm:px-10 sm:pt-8 md:mt-6 md:px-12 md:pt-10 md:pb-10">
    {isLoading ? (
      <ul className="flex flex-col gap-8">
        {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
          <li key={`skeleton-${index}`}>
            <ReviewItemSkeleton />
            {index + 1 !== SKELETON_COUNT && <div className="mt-4 h-px bg-gray-100" />}
          </li>
        ))}
      </ul>
    ) : reviewList.length === 0 ? (
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
