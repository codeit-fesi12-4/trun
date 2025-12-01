import MyPageCard from "./MyPageCard";
import { TMyPageCardProps } from "./type";

const MOCK_DATA: TMyPageCardProps[] = [
  {
    teamId: 1,
    id: 1,
    type: "DALLAEMFIT",
    name: "러닝 모임",
    dateTime: "2025-11-28T05:34:19.967Z",
    registrationEnd: "",
    location: "부산 전체",
    participantCount: 3,
    capacity: 10,
    image: "/images/running-1.png",
    status: ["이용 예정", "개설 확정"],
    createdBy: 1,
    canceledAt: null, // 예약 취소 가능
    isCompleted: false,
    isReviewed: false,
  },
  {
    teamId: 2,
    id: 2,
    type: "MINDFULNESS",
    name: "명상 모임",
    dateTime: "2025-11-30T10:00:00.000Z",
    registrationEnd: "",
    location: "서울 전체",
    participantCount: 5,
    capacity: 10,
    image: "/images/img_login.png",
    status: ["이용 예정", "개설 대기"],
    createdBy: 2,
    canceledAt: null,
    isCompleted: false, // 완료된 모임
    isReviewed: false, // 리뷰 작성 가능
  },
  {
    teamId: 3,
    id: 3,
    type: "MINDFULNESS",
    name: "명상 모임",
    dateTime: "2025-11-30T10:00:00.000Z",
    registrationEnd: "",
    location: "서울 전체",
    participantCount: 5,
    capacity: 10,
    image: "/images/img_login.png",
    status: "이용 완료",
    createdBy: 2,
    canceledAt: null,
    isCompleted: true, // 완료된 모임
    isReviewed: false, // 리뷰 작성 가능
  },
];
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
        />
      ))
    )}
  </div>
);

export default MyMoimTab;
