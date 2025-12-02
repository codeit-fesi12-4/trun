import { Review, Reviews } from "@/constants/moimFakeData";
import ReviewItem from "./ReviewItem";

type ReviewList = {
  reviewList: Reviews;
};

const ReviewList = ({ reviewList }: ReviewList) => (
  <ul className="mb-6 flex flex-col gap-4">
    {reviewList.map((review: Review) => (
      <li key={review.id}>
        <ReviewItem review={review} />
      </li>
    ))}
  </ul>
);

export default ReviewList;
