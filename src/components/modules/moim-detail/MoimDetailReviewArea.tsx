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
import { FAKE_REVIEWLIST } from "@/constants/moimFakeData";
import ReviewList from "./ReviewList";
import { PAGE_SIZE } from "@/constants/pagenation";
import { getPagesInLargeView, getPagesInSmallView } from "@/utils/pagenation.util";

export default function MoimDetailReviewArea() {
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState<(number | string)[]>([]);
  const reviewList = FAKE_REVIEWLIST.data;
  const totalPages = Math.ceil(reviewList.length / PAGE_SIZE);

  const paginatedList = reviewList.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)"); // lg 기준

    const updatePages = () => {
      if (mediaQuery.matches) {
        setPages(getPagesInLargeView(page, totalPages)); // lg 이상
      } else {
        setPages(getPagesInSmallView(page, totalPages)); // md 이하
      }
    };

    updatePages(); // 초기 실행
    mediaQuery.addEventListener("change", updatePages);
    return () => mediaQuery.removeEventListener("change", updatePages);
  }, [page, totalPages]);

  return (
    <div className="flex h-fit w-full flex-col gap-2.5 border-t-2 border-gray-200 bg-white px-6 pt-6 pb-[158px] sm:pb-[209px]">
      <h3 className="text-base font-semibold text-gray-900">
        이용자들은 이 프로그램을 이렇게 느꼈어요!
      </h3>

      <ReviewList reviewList={paginatedList} />

      {/* 페이지네이션 */}
      <Pagination>
        <PaginationContent>
          {/* PREVIOUS  */}
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setPage(Math.max(page - 1, 1))}
              disabled={page === 1}
              className="text-gray-200 hover:bg-transparent data-[state=active]:text-gray-800"
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
                  className="text-gray-200 hover:bg-transparent data-[state=active]:border-0 data-[state=active]:bg-transparent data-[state=active]:text-gray-800 data-[state=active]:shadow-none"
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
              className="text-gray-200 hover:bg-transparent data-[state=active]:text-gray-800"
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
