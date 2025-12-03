import { MOCK_REVIEW_WRITABLELIST } from "@/constants/mypageTestData";
import MyPageCard from "./MyPageCard";
import EmptyState from "./EmptyState";

const handleJoinClick = (id: number) => {
  alert(`모임 ${id} 클릭`);
};

const ReviewWritableList = () => (
  <div className="flex flex-col gap-6">
    {MOCK_REVIEW_WRITABLELIST.length === 0 ? (
      <EmptyState text="아직 작성 가능한 리뷰가 없어요" />
    ) : (
      MOCK_REVIEW_WRITABLELIST.map(card => (
        <MyPageCard
          key={card.id}
          item={card}
          onClick={() => handleJoinClick(card.id)}
          showButton={true}
        />
      ))
    )}
  </div>
);

export default ReviewWritableList;
