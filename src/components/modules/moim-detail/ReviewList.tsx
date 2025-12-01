import { IReview, IReviews } from "@/constants/moimFakeData";
import ReviewItem from "./ReviewItem";

interface IReviewList {
  reviewList: IReviews;
}

const ReviewList = ({ reviewList }: IReviewList) => (
  <ul className="mb-6 flex flex-col gap-4">
    {reviewList.map((review: IReview) => (
      <li key={review.id}>
        <ReviewItem review={review} />
      </li>
    ))}
  </ul>
);

export default ReviewList;
