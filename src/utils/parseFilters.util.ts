import { MoimSortBy, MoimType } from "@/types/moim.type";
import { MoimFilterValues } from "@/types/moimFind.type";
import { ReviewFilterValues, ReviewSortBy, ReviewSortOrder, ReviewType } from "@/types/review.type";
import { isValid, parse } from "date-fns";
import type { ReadonlyURLSearchParams } from "next/navigation";

const isMoimType = (v: string | null): v is MoimType => v === "MINDFULNESS" || v === "WORKATION";

const isMoimSortBy = (v: string | null): v is MoimSortBy =>
  v === "dateTime" || v === "registrationEnd" || v === "participantCount";

const isReviewType = (v: string | null): v is ReviewType =>
  v === "MINDFULNESS" || v === "WORKATION";

const isReviewSortBy = (v: string | null): v is ReviewSortBy =>
  v === "createdAt" || v === "score" || v === "participantCount";

const isReviewSortOrder = (v: string | null): v is ReviewSortOrder => v === "asc" || v === "desc";

const parseDateParam = (dateParam: string | null) => {
  if (!dateParam) return undefined;
  const parsed = parse(dateParam, "yyyy-MM-dd", new Date());
  return isValid(parsed) ? parsed : undefined;
};

function parseFilters(searchParams: ReadonlyURLSearchParams, kind: "moim"): MoimFilterValues;
function parseFilters(searchParams: ReadonlyURLSearchParams, kind: "review"): ReviewFilterValues;
function parseFilters(
  searchParams: ReadonlyURLSearchParams,
  kind: "moim" | "review",
): MoimFilterValues | ReviewFilterValues {
  const typeParam = searchParams.get("type");
  const sortByParam = searchParams.get("sortBy");
  const sortOrderParams = searchParams.get("sortOrder");
  const dateParam = searchParams.get("date");

  if (kind === "moim") {
    return {
      category: isMoimType(typeParam) ? typeParam : "MINDFULNESS",
      location: searchParams.get("location") ?? "지역 전체",
      date: parseDateParam(dateParam),
      sortBy: isMoimSortBy(sortByParam) ? sortByParam : "registrationEnd",
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
