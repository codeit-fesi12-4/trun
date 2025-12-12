import { ReviewItem } from "@/types/review.type";
import ReviewListItem from "./AllReviewItem";
import ReviewCardSkeleton from "./ReviewCardSkeleton";
import EmptyReview from "@/components/common/EmptyReview";

type AllReviewListProps = {
  reviewList: ReviewItem[];
  isLoading: boolean;
  isError: boolean;
};

const SKELETON_COUNT = 3;

const AllReviewList = ({ reviewList, isLoading, isError }: AllReviewListProps) => {
  if (isLoading)
    return (
      <ul className="flex flex-col gap-8 rounded-3xl bg-white p-6 sm:rounded-4xl md:p-8">
        {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
          <li key={`skeleton-${index}`}>
            <ReviewCardSkeleton />
            {index + 1 !== SKELETON_COUNT && <div className="mt-8 h-px w-full bg-gray-100" />}
          </li>
        ))}
      </ul>
    );

  if (isError) return <div className="p-5 text-red-600">리뷰를 불러오지 못했어요.</div>;

  if (reviewList.length === 0)
    return (
      <div className="flex flex-col gap-8 rounded-3xl bg-white p-6 sm:rounded-4xl md:p-8">
        <EmptyReview />
      </div>
    );

  return (
    <ul className="flex flex-col gap-8 rounded-3xl bg-white p-6 sm:rounded-4xl md:p-8">
      {reviewList.map((review, index) => (
        <ReviewListItem key={review.id} review={review} index={index} length={reviewList.length} />
      ))}
    </ul>
  );
};

export default AllReviewList;
