import { MoimSortBy, MoimSortOrder, MoimType } from "./moim.type";

// CreateMoimRequest를 기반으로 한 폼 상태 타입
export type MoimFormData = {
  type: MoimType | ""; // UI에서는 빈 문자열로 초기화
  name: string;
  location: string;
  image: File | null;
  dateTime: Date | undefined; // UI에서는 Date 객체 사용
  registrationEnd: Date | undefined; // UI에서는 Date 객체 사용
  capacity: string; // UI에서는 string으로 입력받음
};

// 모임 카드 컴포넌트에서 공통으로 사용하는 액션 핸들러 타입
export type MoimCardActions = {
  onFavoriteToggle?: (id: number) => void;
  onJoinClick?: (id: number) => void;
};

// 모임 필터 값 타입
export type MoimFilterValues = {
  category: MoimType;
  location: string;
  date: Date | undefined;
  sortBy: MoimSortBy;
  sortOrder?: MoimSortOrder;
};

// 모임 필터 관련 공통 props 타입
export type MoimFilterProps = {
  onFilterChange?: (filters: MoimFilterValues) => void;
  availableLocations?: string[];
  filters: MoimFilterValues;
};
