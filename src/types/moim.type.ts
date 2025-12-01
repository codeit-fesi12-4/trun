// 유니온 타입들 (type으로 정의)
export type MoimType = "DALLAEMFIT" | "OFFICE_STRETCHING" | "MINDFULNESS" | "WORKATION";
export type MoimLocation = "건대입구" | "을지로3가" | "신림" | "홍대입구";
export type SortBy = "dateTime" | "registrationEnd" | "participantCount";
export type SortOrder = "asc" | "desc";

// 모임 목록 조회 요청 파라미터 타입
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

// 모임 목록 조회 응답 타입
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

// 모임 생성 요청 타입 (multipart/form-data)
export type CreateMoimRequest = {
  location: string; // 모임 장소
  type: MoimType; // 모임 서비스 종류
  name: string; // 모임 이름
  dateTime: string; // 모임 날짜 및 시간 (YYYY-MM-DDTHH:MM:SS 형식)
  capacity: number; // 모집 정원 (최소 5인 이상)
  image: File; // 모임 이미지
  registrationEnd?: string; // 모임 모집 마감 날짜 및 시간 (선택 사항, YYYY-MM-DDTHH:MM:SS 형식)
};

// 모임 생성 응답 타입 (생성된 Moim 객체 반환)
export type CreateMoimResponse = Moim;
