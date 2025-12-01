// 유니온 타입들 (type으로 정의)
export type MoimType = "DALLAEMFIT" | "OFFICE_STRETCHING" | "MINDFULNESS" | "WORKATION";
export type MoimLocation = "건대입구" | "을지로3가" | "신림" | "홍대입구";
export type SortBy = "dateTime" | "registrationEnd" | "participantCount";
export type SortOrder = "asc" | "desc";

// 모임 목록 조회 요청 파라미터 타입
export interface GetMoimsParams {
  id?: string;
  type?: MoimType;
  location?: MoimLocation;
  date?: string;
  createdBy?: number;
  sortBy?: SortBy;
  sortOrder?: SortOrder;
  limit?: number;
  offset?: number;
}

// 모임 목록 조회 응답 타입
export interface Moim {
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
}

export type GetMoimsResponse = Moim[];
