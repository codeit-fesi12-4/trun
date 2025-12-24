import { MOIM_LOCATION } from "@/constants/moim";

// 공통으로 사용되는 유니온 타입
export type MoimType = "MINDFULNESS" | "WORKATION";
export type MoimLocation = (typeof MOIM_LOCATION)[keyof typeof MOIM_LOCATION];
export type MoimSortBy = "dateTime" | "registrationEnd" | "participantCount";
export type MoimSortOrder = "asc" | "desc";

// 모임 기본 타입
export type Moim = {
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
  createdBy: number; // 생성자
  canceledAt: string | null; // 취소되지 않았으면 null (ISO)
};

// 모임 목록 조회 API
// 요청 파라미터
export type GetMoimsParams = {
  id?: string;
  type?: MoimType;
  location?: MoimLocation;
  date?: string;
  createdBy?: number;
  sortBy?: MoimSortBy;
  sortOrder?: MoimSortOrder;
  limit?: number;
  offset?: number;
};

// 응답 타입
export type GetMoimsResponse = Moim[];

// 모임 생성 API
// 요청 타입 (multipart/form-data)
export type CreateMoimRequest = {
  type: MoimType;
  name: string;
  dateTime: string;
  location: string;
  capacity: number;
  image: File;
  registrationEnd?: string;
};

// 응답 타입 (canceledAt 제외)
export type CreateMoimResponse = Omit<Moim, "canceledAt">;
