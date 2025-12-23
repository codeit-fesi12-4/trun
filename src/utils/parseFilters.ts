import { ReviewFilterValues, ReviewSortBy, ReviewSortOrder, ReviewType } from "@/types/review.type";
import { useSearchParams } from "next/navigation";

const parseFilters = (searchParams: ReturnType<typeof useSearchParams>): ReviewFilterValues => {
  const typeParam = searchParams.get("type");
  const sortByParam = searchParams.get("sortBy");
  const sortOrderParams = searchParams.get("sortOrder");

  const isReviewType = (v: string | null): v is ReviewType =>
    v === "MINDFULNESS" || v === "WORKATION";

  const isSortByType = (v: string | null): v is ReviewSortBy =>
    v === "createdAt" || v === "score" || v === "participantCount";

  const isSortOrderType = (v: string | null): v is ReviewSortOrder => v === "asc" || v === "desc";

  return {
    type: isReviewType(typeParam) ? typeParam : "MINDFULNESS",
    location: searchParams.get("location") ?? "지역 전체",
    sortBy: isSortByType(sortByParam) ? sortByParam : "createdAt",
    sortOrder: isSortOrderType(sortOrderParams) ? sortOrderParams : "desc",
  };
};

export default parseFilters;
