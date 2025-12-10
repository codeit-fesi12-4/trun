import { ReviewItem } from "@/types/review.type";
import ReviewListItem from "./AllReviewItem";
import EmptyReview from "@/components/common/EmptyReview";

type AllReviewListProps = {
  reviewList: ReviewItem[];
  isLoading: boolean;
  isError: boolean;
};

const AllReviewList = ({ reviewList, isLoading, isError }: AllReviewListProps) => {
  if (isLoading) return <div className="p-5 text-gray-500">리뷰를 불러오는 중입니다...</div>;

  if (isError) return <div className="p-5 text-red-600">리뷰를 불러오지 못했어요.</div>;

  if (reviewList.length === 0) return <EmptyReview />;

  return (
    <ul className="flex flex-col gap-8">
      {reviewList.map((review, index) => (
        <ReviewListItem key={review.id} review={review} index={index} length={reviewList.length} />
      ))}
    </ul>
  );
};

export default AllReviewList;
