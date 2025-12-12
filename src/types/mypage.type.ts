import { MoimType } from "@/types/moim.type";

export type MoimStatus = "이용 예정" | "개설 확정" | "개설 대기" | "이용 완료";

export type MypageMoim = {
  teamId: string;
  id: number;
  type: MoimType; // 모임 서비스 종류
  name: string; // 모임 이름
  dateTime: string; // 모임 날짜 (ISO)
  registrationEnd: string; // 마감 날짜 (ISO)
  location: string; // 모임 장소
  participantCount: number; // 참가자 수
  capacity: number; // 정원 수
  image: string;
  status?: MoimStatus | MoimStatus[];
  createdBy: number; // 생성자
  canceledAt: string | null; // 취소되지 않았으면 null (ISO)
  joinedAt: string; // 사용자가 모임에 참석한 일자
  isCompleted: boolean; // 모임 종료 여부
  isReviewed: boolean; // 리뷰 작성 여부
};

// 요청 파라미터
export type GetJoinedMoimsParams = {
  completed?: boolean;
  reviewed?: boolean;
  limit?: number;
  offset?: number;
  sortBy?: string;
  sortOrder?: string;
};

// 나의 모임 응답 타입
export type GetJoinedMoimsResponse = MypageMoim[];

// 내가 만든 모임 응답 타입
export type CreateMoimsResponse = MypageMoim[];

// 모임 리뷰
export type ReviewCardData = {
  gatheringId: number;
  score: number;
  comment: string;
};
