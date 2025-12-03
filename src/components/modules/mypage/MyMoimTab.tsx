import MyPageCard from "./MyPageCard";
import { MOCK_DATA } from "@/constants/mypageTestData";

const handleJoinClick = (id: number) => {
  alert(`${id}하기 `);
};

const MyMoimTab = () => (
  <div className="flex flex-col gap-6">
    {MOCK_DATA.length === 0 ? (
      <p className="flex h-40 items-center justify-center text-sm font-medium text-gray-500">
        신청한 모임이 아직 없어요
      </p>
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
