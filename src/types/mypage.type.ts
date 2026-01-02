import { MoimType } from "@/types/moim.type";
import { ReviewGathering, ReviewUser } from "./review.type";

export type MoimStatus = "이용 예정" | "개설 확정" | "개설 대기" | "이용 완료";

export type ReviewModalMode = "create" | "edit";

export type MypageSortBy = "dateTime" | "registrationEnd" | "joinedAt";

export type MypageSortOrder = "asc" | "desc";

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

// 나의 모임 응답 타입
export type GetJoinedMoimsResponse = MypageMoim[];

// 나의 모임 무한 스크롤을 위한 요청 파라미터 타입
export type GetJoinedMoimsParams = {
  completed?: boolean;
  reviewed?: boolean;
  limit: number;
  offset: number;
  sortBy?: MypageSortBy;
  sortOrder?: MypageSortOrder;
};

// 내가 만든 모임 조회 파라미터
export type GetCreatedMoimsParams = {
  limit: number;
  offset: number;
};

// 작성 가능한 리뷰 타입
export type WritableReviewItem = MypageMoim & {
  gatheringId: number;
  score: number;
  comment?: string;
};

// 리뷰 수정 타입 (모달)
export type EditableReviewItem = {
  id: number;
  score: number;
  comment?: string;
};

// 작성한 리뷰 타입
export type WrittenReviewItem = {
  id: number;
  score: number;
  comment: string;
  createdAt: string;
  Gathering: ReviewGathering;
  User: ReviewUser;
};
