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

const PAGE_SIZE = 4;

const getPagesInSmallView = (page: number, totalPages: number) => {
  if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);
  if (page <= 3) return [1, 2, 3, "...", totalPages];
  if (page >= totalPages - 2) return [1, "...", totalPages - 2, totalPages - 1, totalPages];
  return [1, "...", page - 1, page, page + 1, "...", totalPages];
};

const getPagesInLargeView = (page: number, totalPages: number) => {
  // Case 1) totalPages <= 7 → 전체 출력
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // Case 2) page가 초반부 (1~4)
  if (page <= 4) {
    return [1, 2, 3, 4, 5, "...", totalPages];
  }

  // Case 3) page가 끝 부분 (totalPages - 3 이상)
  if (page >= totalPages - 3) {
    return [1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  }
  // Case 4) 중간 영역
  return [1, "...", page - 2, page - 1, page, page + 1, page + 2, "...", totalPages];
};

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
    <div className="flex h-fit w-full flex-col gap-2.5 border-t-2 border-gray-200 bg-white p-6 sm:pb-[125px]">
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
