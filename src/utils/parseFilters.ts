import { MoimSortBy, MoimSortOrder, MoimType } from "@/types/moim.type";
import { MoimFilterValues } from "@/types/moimFind.type";
import { ReviewFilterValues, ReviewSortBy, ReviewSortOrder, ReviewType } from "@/types/review.type";
import { parse } from "date-fns";
import { useSearchParams } from "next/navigation";

type SearchParams = ReturnType<typeof useSearchParams>;

function parseFilters(searchParams: SearchParams, kind: "moim"): MoimFilterValues;
function parseFilters(searchParams: SearchParams, kind: "review"): ReviewFilterValues;
function parseFilters(
  searchParams: SearchParams,
  kind: "moim" | "review",
): MoimFilterValues | ReviewFilterValues {
  const typeParam = searchParams.get("type");
  const sortByParam = searchParams.get("sortBy");
  const sortOrderParams = searchParams.get("sortOrder");
  const dateParams = searchParams.get("date");

  const isMoimType = (v: string | null): v is MoimType => v === "MINDFULNESS" || v === "WORKATION";

  const isMoimSortBy = (v: string | null): v is MoimSortBy =>
    v === "dateTime" || v === "registrationEnd" || v === "participantCount";

  const isMoimSortOrder = (v: string | null): v is MoimSortOrder => v === "asc" || v === "desc";

  const isReviewType = (v: string | null): v is ReviewType =>
    v === "MINDFULNESS" || v === "WORKATION";

  const isReviewSortBy = (v: string | null): v is ReviewSortBy =>
    v === "createdAt" || v === "score" || v === "participantCount";

  const isReviewSortOrder = (v: string | null): v is ReviewSortOrder => v === "asc" || v === "desc";

  // date string => Date 타입 변경
  const changeDatetype = () => {
    if (!dateParams) return undefined;
    return parse(dateParams, "yyyy-MM-dd", new Date());
  };

  if (kind === "moim") {
    return {
      category: isMoimType(typeParam) ? typeParam : "MINDFULNESS",
      location: searchParams.get("location") ?? "지역 전체",
      date: changeDatetype() ?? undefined,
      sortBy: isMoimSortBy(sortByParam) ? sortByParam : "registrationEnd",
      sortOrder: isMoimSortOrder(sortOrderParams) ? sortOrderParams : "desc",
    };
  }

  return {
    type: isReviewType(typeParam) ? typeParam : "MINDFULNESS",
    location: searchParams.get("location") ?? "지역 전체",
    sortBy: isReviewSortBy(sortByParam) ? sortByParam : "createdAt",
    sortOrder: isReviewSortOrder(sortOrderParams) ? sortOrderParams : "desc",
  };
}

export default parseFilters;
