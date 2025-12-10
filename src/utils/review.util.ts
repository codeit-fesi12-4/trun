// 평균 평점의 형식을 변환해준다.
// buildDistribution({ fiveStars: 1, fourStars: 2, threeStars: 3, twoStars: 4, oneStar: 5 }) =>
// 0 : {score: 5, count: 1}
// 1 : {score: 4, count: 2}
// 2 : {score: 3, count: 3}
// 3 : {score: 2, count: 4}

import { ReviewDistribution } from "@/types/review.type";

// 4 : {score: 1, count: 5}
export const buildDistribution = (
  scores?: {
    fiveStars: number;
    fourStars: number;
    threeStars: number;
    twoStars: number;
    oneStar: number;
  } | null,
): ReviewDistribution[] => [
  { score: 5, count: scores?.fiveStars ?? 0 },
  { score: 4, count: scores?.fourStars ?? 0 },
  { score: 3, count: scores?.threeStars ?? 0 },
  { score: 2, count: scores?.twoStars ?? 0 },
  { score: 1, count: scores?.oneStar ?? 0 },
];
