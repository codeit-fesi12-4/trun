import { MOCK_REVIEW_WRITABLELIST } from "@/constants/mypageTestData";
import MyPageCard from "./MyPageCard";

const handleJoinClick = (id: number) => {
  alert(`모임 ${id} 클릭`);
};

const ReviewWritableList = () => (
  <div className="flex flex-col gap-6">
    {MOCK_REVIEW_WRITABLELIST.length === 0 ? (
      <p className="flex h-40 items-center justify-center text-sm font-medium text-gray-500">
        아직 작성 가능한 리뷰가 없어요
      </p>
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
