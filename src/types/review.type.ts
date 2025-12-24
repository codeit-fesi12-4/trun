import { MoimType } from "./moim.type";

export type ReviewType = "MINDFULNESS" | "WORKATION";

export type ReviewSortBy = "createdAt" | "score" | "participantCount";

export type ReviewSortOrder = "asc" | "desc";

export type ReviewGathering = {
  teamId: number;
  id: number;
  type: MoimType;
  name: string;
  dateTime: string;
  location: string;
  image: string;
};

export type ReviewUser = {
  teamId: number;
  id: number;
  name: string;
  image: string | null;
};

export type ReviewItem = {
  teamId: number;
  id: number;
  score: number;
  comment: string;
  createdAt: string;
  Gathering: ReviewGathering;
  User: ReviewUser;
};

export type ReviewScore = {
  teamId: number;
  gatheringId: number | null;
  type: MoimType | null;
  averageScore: number;
  oneStar: number;
  twoStars: number;
  threeStars: number;
  fourStars: number;
  fiveStars: number;
};

// 리뷰 필터 값 타입
export type ReviewFilterValues = {
  type: ReviewType;
  location: string;
  sortBy: ReviewSortBy;
  sortOrder: ReviewSortOrder;
};

export type ReviewDistribution = { score: number; count: number };

// 리뷰 리스트 요청 함수용 파라미터
export type GetReviewsParams = {
  gatheringId?: number;
  userId?: number;
  type?: MoimType;
  location?: string;
  date?: string;
  registrationEnd?: string;
  sortBy?: ReviewSortBy;
  sortOrder?: ReviewSortOrder;
  limit?: number;
  offset?: number;
};

// 리뷰 스코어 요청 함수용 파라미터
export type GetReviewScoresParams = {
  gatheringId?: number;
  type?: ReviewType;
};

// 리뷰 리스트 응답
export type GetReviewsResponse = {
  data: ReviewItem[];
  totalItemCount: number;
  currentPage: number;
  totalPages: number;
};

// 리뷰 스코어 응답
export type GetReviewScoresResponse = ReviewScore[];

// 리뷰 추가 타입
export type PostReviewParams = {
  gatheringId: number;
  score: number;
  comment: string;
};
