import { TMyPageCardProps } from "@/types/mypage.type";
import { MOIM_TYPE } from "@/constants";
import MyPageCard from "./MyPageCard";

// 테스트용
const MOCK_DATA: TMyPageCardProps[] = [
  {
    teamId: 1,
    id: 1,
    type: MOIM_TYPE.DALLIMFIT,
    // type: "DALLAEMFIT",
    name: "러닝 모임",
    dateTime: "2025-11-28T05:34:19.967Z",
    registrationEnd: "",
    location: "부산 전체",
    participantCount: 3,
    capacity: 10,
    image: "/images/running-1.png",
    createdBy: 1,
    canceledAt: null,
    isCompleted: true,
    isReviewed: false,
  },
  {
    teamId: 2,
    id: 2,
    type: MOIM_TYPE.DALLIMFIT,
    // type: "MINDFULNESS",
    name: "명상 모임",
    dateTime: "2025-11-30T10:00:00.000Z",
    registrationEnd: "",
    location: "서울 전체",
    participantCount: 5,
    capacity: 10,
    image: "/images/img_login.png",
    createdBy: 2,
    canceledAt: null,
    isCompleted: true,
    isReviewed: false,
  },
];

const handleJoinClick = (id: number) => {
  alert(`모임 ${id} 클릭`);
};

const ReviewWritableList = () => (
  <div className="flex flex-col gap-6">
    {MOCK_DATA.length === 0 ? (
      <p className="flex h-40 items-center justify-center text-sm font-medium text-gray-500">
        아직 작성 가능한 리뷰가 없어요
      </p>
    ) : (
      MOCK_DATA.map(card => (
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
