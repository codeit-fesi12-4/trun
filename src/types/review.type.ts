export type ReviewType = "DALLAEMFIT" | "OFFICE_STRETCHING" | "MINDFULNESS" | "WORKATION";
export type ReviewSortBy = "createdAt" | "score" | "participantCount";
export type ReviewSortOrder = "asc" | "desc";

export type GetReviewsParams = {
  teamId: string;
  gatheringId?: number;
  userId?: number;
  type?: ReviewType;
  location?: string;
  date?: string;
  registrationEnd?: string;
  sortBy?: ReviewSortBy;
  sortOrder?: ReviewSortOrder;
  limit?: number;
  offset?: number;
};

export type ReviewGathering = {
  teamId: number;
  id: number;
  type: ReviewType;
  name: string;
  dateTime: string;
  location: string;
  image: string;
};

export type ReviewUser = {
  teamId: number;
  id: number;
  name: string;
  image: string;
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
  type?: ReviewType;
};

export type ReviewScore = {
  teamId: number;
  gatheringId: number | null;
  type: ReviewType | null;
  averageScore: number;
  oneStar: number;
  twoStars: number;
  threeStars: number;
  fourStars: number;
  fiveStars: number;
};

export type ReviewScoresResponse = ReviewScore[];
