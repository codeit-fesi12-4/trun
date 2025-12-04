import { ReviewGathering } from "./review.type";

type User = {
  id: number;
  image: string | null;
  name: string;
  teamId: string;
};

export type Data = {
  ReviewGathering: ReviewGathering;
  User: User;
  comment: string;
  createdAt: string;
  id: number;
  score: number;
  teamId: string;
};

export type GetMoimReviewResponse = {
  data: Data[];
  totalItemCount: number;
  totalPages: number;
  currentPage: number;
};
