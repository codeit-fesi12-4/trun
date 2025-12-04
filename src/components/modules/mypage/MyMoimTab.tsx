import EmptyState from "./EmptyState";
import MyPageCard from "./MyPageCard";
import { MOCK_DATA } from "@/constants/mypageTestData";

const handleJoinClick = (id: number) => {
  alert(`${id}하기 `);
};

const MyMoimTab = () => (
  <div className="flex flex-col gap-6">
    {MOCK_DATA.length === 0 ? (
      <EmptyState text="신청한 모임이 아직 없어요" />
    ) : (
      MOCK_DATA.map(card => (
        <MyPageCard
          key={card.id}
          item={card}
          onClick={() => handleJoinClick(card.id)}
          showButton={true}
          isCreatedMoimTab={false}
        />
      ))
    )}
  </div>
);

export default MyMoimTab;
