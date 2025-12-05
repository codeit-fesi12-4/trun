import { MoimType, SortBy, SortOrder } from "./moim.type";

export type GetReviewsParams = {
  teamId: string;
  gatheringId?: number;
  userId?: number;
  type?: MoimType;
  location?: string;
  date?: string;
  registrationEnd?: string;
  sortBy?: SortBy;
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
