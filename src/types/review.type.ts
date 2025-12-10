import { MoimType, SortOrder } from "./moim.type";

export type ReviewSortBy = "createdAt" | "score" | "participantCount";

export type GetReviewsParams = {
  teamId: string;
  gatheringId?: number;
  userId?: number;
  type?: MoimType;
  location?: string;
  date?: string;
  registrationEnd?: string;
  sortBy?: ReviewSortBy;
  sortOrder?: SortOrder;
  limit?: number;
  offset?: number;
};

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

export type GetReviewsResponse = {
  data: ReviewItem[];
  totalItemCount: number;
  currentPage: number;
  totalPages: number;
};

export type ReviewScoresParams = {
  teamId: string;
  gatheringId?: number;
  type?: MoimType;
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

export type ReviewScoresResponse = ReviewScore[];

// 리뷰 필터 값 타입
export type ReviewFilterValues = {
  category: "달림핏" | "런케이션";
  location: string;
  sortBy: "최신 리뷰 순" | "평점 높은 순" | "참여자 많은 순";
};

export type ReviewFilterProps = {
  onFilterChange?: (filters: ReviewFilterValues) => void;
  availableLocations?: string[];
};

export type ReviewDistribution = { score: number; count: number };
