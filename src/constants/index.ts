export type GroupSearchCardData = {
  id: string;
  imageUrl: string;
  deadlineText: string;
  title: string;
  subtitle: string;
  date: string;
  time: string;
  participants: number;
  maxParticipants: number;
  status?: "confirmed" | null;
  isFavorite: boolean;
};

// 샘플 데이터 (UI 확인용)
export const GROUP_SEARCH_CARD_SAMPLE_DATA: GroupSearchCardData[] = [
  {
    id: "1",
    imageUrl: "/images/running-1.png",
    deadlineText: "오늘 21시 마감",
    title: "달램핏 오피스 스트레칭",
    subtitle: "을지로 3가",
    date: "1월 7일",
    time: "17:30",
    participants: 18,
    maxParticipants: 20,
    status: "confirmed",
    isFavorite: false,
  },
  {
    id: "2",
    imageUrl: "/images/running-1.png",
    deadlineText: "오늘 21시 마감",
    title: "달램핏 마인드풀니스",
    subtitle: "건대입구",
    date: "1월 7일",
    time: "17:30",
    participants: 3,
    maxParticipants: 20,
    status: null,
    isFavorite: true,
  },
  {
    id: "3",
    imageUrl: "/images/running-1.png",
    deadlineText: "오늘 21시 마감",
    title: "달램핏 마인드풀니스",
    subtitle: "을지로 3가",
    date: "1월 7일",
    time: "17:30",
    participants: 18,
    maxParticipants: 20,
    status: "confirmed",
    isFavorite: false,
  },
  {
    id: "4",
    imageUrl: "/images/running-1.png",
    deadlineText: "40일 후 마감",
    title: "달램핏 마인드풀니스",
    subtitle: "홍대입구",
    date: "4월 7일",
    time: "17:30",
    participants: 3,
    maxParticipants: 20,
    status: null,
    isFavorite: false,
  },
];
export const API_BASE_URL = "https://fe-adv-project-together-dallaem.vercel.app/";
export const TEAM_NAME = "trun";
