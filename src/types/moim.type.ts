import { MOIM_TYPE } from "@/constants";

// 공통으로 사용되는 유니온 타입
export type MoimType = (typeof MOIM_TYPE)[keyof typeof MOIM_TYPE];
export type MoimLocation = "건대입구" | "을지로3가" | "신림" | "홍대입구";
export type SortBy = "dateTime" | "registrationEnd" | "participantCount";
export type SortOrder = "asc" | "desc";

// 모임 목록 조회 API

// 요청 파라미터
export type GetMoimsParams = {
  id?: string;
  type?: MoimType;
  location?: MoimLocation;
  date?: string;
  createdBy?: number;
  sortBy?: SortBy;
  sortOrder?: SortOrder;
  limit?: number;
  offset?: number;
};

// 응답 타입
export type Moim = {
  teamId: number;
  id: number;
  type: MoimType;
  name: string;
  dateTime: string; // ISO 8601 형식 (예: "2025-11-28T07:59:12.892Z")
  registrationEnd: string; // ISO 8601 형식
  location: string;
  participantCount: number;
  capacity: number;
  image: string;
  createdBy: number;
  canceledAt: string | null; // 취소되지 않았으면 null
};

export type GetMoimsResponse = Moim[];

// 모임 생성 API

// 요청 타입 (multipart/form-data)
export type CreateMoimRequest = {
  location: string; // 모임 장소
  type: MoimType; // 모임 서비스 종류
  name: string; // 모임 이름
  dateTime: string; // 모임 날짜 및 시간 (YYYY-MM-DDTHH:MM:SS 형식)
  capacity: number; // 모집 정원 (최소 5인 이상)
  image: File; // 모임 이미지
  registrationEnd?: string; // 모임 모집 마감 날짜 및 시간 (선택 사항, YYYY-MM-DDTHH:MM:SS 형식)
};

// 응답 타입
export type CreateMoimResponse = Moim;
// 제거 예정
export type MoimCardData = {
  id: string;
  imageUrl: string;
  deadlineText: string; //
  title: string;
  subtitle: string; // location
  date: string;
  time: string;
  participants: number; //
  maxParticipants: number; //
  status?: "confirmed" | null; //
  isFavorite: boolean; //
};
