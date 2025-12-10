import { MoimType } from "@/types/moim.type";
import { ReviewFilterValues, ReviewSortBy } from "@/types/review.type";

// 카테고리에 달림핏, 런케이션을 백엔드가 정한 정식 명칭으로 바꿔준다.
//  CATEGORY_MAP["달림핏"] => "MINDFULNESS"
export const CATEGORY_MAP: Record<ReviewFilterValues["category"], MoimType> = {
  달림핏: "MINDFULNESS",
  런케이션: "WORKATION",
};

export const SORTBY_MAP: Record<ReviewFilterValues["sortBy"], ReviewSortBy> = {
  "최신 리뷰 순": "createdAt",
  "평점 높은 순": "score",
  "참여자 많은 순": "participantCount",
};
