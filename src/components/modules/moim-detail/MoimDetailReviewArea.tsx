"use client";
import { useState } from "react";
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

const getPages = (page: number, totalPages: number) => {
  if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);
  if (page <= 3) return [1, 2, 3, "...", totalPages];
  if (page >= totalPages - 2) return [1, "...", totalPages - 2, totalPages - 1, totalPages];
  return [1, "...", page - 1, page, page + 1, "...", totalPages];
};

export default function MoimDetailReviewArea() {
  const [page, setPage] = useState(1);
  const reviewList = FAKE_REVIEWLIST.data;
  const totalPages = Math.ceil(reviewList.length / PAGE_SIZE);

  const paginatedList = reviewList.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const pages = getPages(page, totalPages);

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
