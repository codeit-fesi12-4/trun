import { API_BASE_URL, TEAM_NAME } from "@/constants";
import { GetReviewsParams, ReviewScoresParams } from "@/types/review.type";
import { toast } from "sonner";

// 모든 리뷰 Path
const buildReviewsPath = (params: GetReviewsParams) => {
  const { teamId, ...rest } = params;
  const basePath = `${API_BASE_URL}${teamId && TEAM_NAME}/reviews`;
  const searchParams = new URLSearchParams();

  if (rest.gatheringId !== undefined) searchParams.append("gatheringId", String(rest.gatheringId));
  if (rest.userId !== undefined) searchParams.append("userId", String(rest.userId));
  if (rest.type) searchParams.append("type", rest.type);
  if (rest.location) searchParams.append("location", rest.location);
  if (rest.date) searchParams.append("date", rest.date);
  if (rest.registrationEnd) searchParams.append("registrationEnd", rest.registrationEnd);
  if (rest.sortBy) searchParams.append("sortBy", rest.sortBy);
  if (rest.sortOrder) searchParams.append("sortOrder", rest.sortOrder);
  if (rest.limit !== undefined) searchParams.append("limit", String(rest.limit));
  if (rest.offset !== undefined) searchParams.append("offset", String(rest.offset));

  const queryString = searchParams.toString();
  return queryString ? `${basePath}?${queryString}` : basePath;
};

// 모든 리뷰 가져오기
export const getReviews = async (params: GetReviewsParams) => {
  try {
    const response = await fetch(buildReviewsPath(params), {
      method: "GET",
    });

    const result = await response.json();

    if (!response.ok) {
      toast.error(`${result.errors[0].message}`);
    }

    return result;
  } catch (error) {
    console.error("데이터 가져오기 오류:", error);
    return null;
  }
};

// 모임별 리뷰 가져오기
export const getMoimReviews = async ({
  moimId,
  teamName = TEAM_NAME,
  limit,
  offset,
}: {
  moimId: number;
  teamName: string;
  limit: number;
  offset: number;
}) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}${teamName}/reviews?gatheringId=${moimId}&limit=${limit}&offset=${offset}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      },
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(`${result.errors[0].message}`);
    }

    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 리뷰 평점 Path
const buildReviewScoresPath = (params: ReviewScoresParams) => {
  const { teamId, ...rest } = params;
  const basePath = `${API_BASE_URL}${teamId && TEAM_NAME}/reviews/scores`;
  const searchParams = new URLSearchParams();

  if (rest.gatheringId !== undefined) searchParams.append("gatheringId", String(rest.gatheringId));
  if (rest.type) searchParams.append("type", rest.type);

  const queryString = searchParams.toString();
  return queryString ? `${basePath}?${queryString}` : basePath;
};

// 리뷰 평점 가져오기
export const getReviewScores = async (params: ReviewScoresParams) => {
  try {
    const response = await fetch(buildReviewScoresPath(params), {
      method: "GET",
    });

    const result = await response.json();

    if (!response.ok) {
      toast.error(`${result.message}`);
    }

    return result;
  } catch (error) {
    console.error("데이터 가져오기 오류:", error);
    return null;
  }
};
