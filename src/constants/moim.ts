import { type MoimFormData } from "@/types/moimFind.type";

// 모임 생성 챕터 수
export const TOTAL_STEPS = 3;

// 최소 모집 정원
export const MIN_CAPACITY = 5;

// 모임 이름 최대 글자수
export const MAX_NAME_LENGTH = 30;

// 이미지 최대 용량 (바이트 단위, 20MB)
export const MAX_IMAGE_SIZE = 20 * 1024 * 1024;

// 폼 초기값 상수
export const INITIAL_FORM_DATA: MoimFormData = {
  type: "",
  name: "",
  location: "",
  image: null,
  dateTime: undefined,
  registrationEnd: undefined,
  capacity: "",
};

// 모임 필터 정렬 상수
export const MOIM_FILTER_SORT = {
  DEADLINE: "마감임박 순",
  PARTICIPANTS: "참여 인원 순",
} as const;

// API 정렬 기준 상수
export const SORT_BY = {
  DATE_TIME: "dateTime",
  REGISTRATION_END: "registrationEnd",
  PARTICIPANT_COUNT: "participantCount",
} as const;

// API 정렬 순서 상수
export const SORT_ORDER = {
  ASC: "asc",
  DESC: "desc",
} as const;

// 모임 지역 상수 (필터 "전체" 옵션 포함)
export const MOIM_LOCATION = {
  ALL: "지역 전체",
  KONKUK_UNIV: "건대입구",
  EULJIRO_3GA: "을지로3가",
  SINRIM: "신림",
  HONGDAE: "홍대입구",
} as const;
