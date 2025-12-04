import { MyPageCardData, ReviewCardData } from "@/types/mypage.type";

// 나의 모임 카드 MOCK 데이터
export const MOCK_DATA: MyPageCardData[] = [
  {
    teamId: 1,
    id: 1,
    type: "MINDFULNESS",
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

// 나의 리뷰_내가 작성한 리뷰 카드 MOCK 데이터
export const MOCK_REVIEW_WRITABLELIST: MyPageCardData[] = [
  {
    teamId: 1,
    id: 1,
    type: "MINDFULNESS",
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
    type: "MINDFULNESS",
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

// 나의 리뷰_작성한 리뷰 카드 MOCK 데이터
export const MOCK_REVIEW_WRITTENLIST: ReviewCardData[] = [
  {
    id: 1,
    image: "/images/running-1.png",

    name: "러닝 모임",
    location: "부산 전체",
    dateTime: "2025-01-25",
    score: 4,
    comment: "모임 분위기도 좋고 강사님이 친절해서 재밌게 참여했습니다!",
  },
  {
    id: 2,
    image: "/images/img_login.png",
    name: "명상 모임",
    location: "서울 전체",
    dateTime: "2025-01-20T10:00:00.000Z",
    score: 5,
    comment: "힐링 그 자체! 스트레스가 확 날아갔어요.",
  },
];

// 내가 만든 모임 카드 MOCK 데이터
export const MOCK_CREATED_MOIM: MyPageCardData[] = [
  {
    teamId: 1,
    id: 1,
    type: "MINDFULNESS",
    name: "러닝 모임",
    dateTime: "2025-11-28T05:34:19.967Z",
    registrationEnd: "",
    location: "부산 전체",
    participantCount: 3,
    capacity: 10,
    image: "/images/running-1.png",
    createdBy: 1,
    canceledAt: null,
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
    createdBy: 2,
    canceledAt: null,
    isCompleted: true,
    isReviewed: false,
  },
];
