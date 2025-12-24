"use client";

import { useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import ReviewList from "./ReviewList";
import { getPagesInLargeView, getPagesInSmallView } from "@/utils/pagenation.util";
import { TEAM_NAME } from "@/constants/env";
import { REVIEW_PAGE_SIZE } from "@/constants/pageSize";
import { useMoimReviewsQuery } from "@/hooks/useReviewQuery";

type MoimDetailReviewAreaProps = {
  moimId: string;
};

export default function MoimDetailReviewArea({ moimId }: MoimDetailReviewAreaProps) {
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState<(number | string)[]>([]);

  const NumberMoimId = Number(moimId);

  const { data, isLoading } = useMoimReviewsQuery({
    moimId: NumberMoimId,
    teamName: TEAM_NAME,
    limit: REVIEW_PAGE_SIZE.PAGINATION,
    offset: (page - 1) * REVIEW_PAGE_SIZE.PAGINATION,
  });

  const reviews = data?.data;

  const totalPages = data?.totalPages ?? 1;

  useEffect(() => {
    if (!reviews) return;
    const mediaQuery = window.matchMedia("(min-width: 1024px)"); // lg 기준

    const updatePages = () => {
      if (mediaQuery.matches) {
        setPages(getPagesInLargeView(page, totalPages)); // lg 이상
      } else {
        setPages(getPagesInSmallView(page, totalPages)); // md 이하
      }
    };

    updatePages();

    mediaQuery.addEventListener("change", updatePages);
    return () => mediaQuery.removeEventListener("change", updatePages);
  }, [page, reviews, totalPages]);

  if (isLoading)
    return (
      <div className="mt-4">
        <h3 className="ml-2 text-xl font-semibold text-black">리뷰 모아보기</h3>
        <ReviewList reviewList={[]} isLoading={true} />
      </div>
    );
  if (!reviews) return null;

  return (
    <div className="mt-4">
      <h3 className="ml-2 text-xl font-semibold text-black">리뷰 모아보기</h3>
      <ReviewList reviewList={reviews} isLoading={false} />

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            {/* PREVIOUS  */}
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setPage(Math.max(page - 1, 1))}
                disabled={page === 1}
                className={`text-gray-200 hover:cursor-pointer ${page !== 1 && "hover:text-gray-800"}`}
              />
            </PaginationItem>

            {/* PAGE NUMBERS + ELLIPSIS */}
            {pages.map((p, i) => (
              <PaginationItem key={typeof p === "number" ? `page-${p}` : `ellipsis-${i}`}>
                {p === "..." ? (
                  <PaginationEllipsis className="text-gray-200" />
                ) : (
                  <PaginationLink
                    isActive={page === p}
                    onClick={() => typeof p === "number" && setPage(p)}
                    className="text-gray-200 hover:cursor-pointer hover:bg-green-200 data-[state=active]:border-0 data-[state=active]:bg-green-200 data-[state=active]:text-green-600 data-[state=active]:shadow-none"
                  >
                    {p}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}

            {/* NEXT */}
            <PaginationItem>
              <PaginationNext
                onClick={() => setPage(Math.min(page + 1, totalPages))}
                disabled={page === totalPages}
                className={`text-gray-200 hover:cursor-pointer ${page !== totalPages && "hover:text-gray-800"}`}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
