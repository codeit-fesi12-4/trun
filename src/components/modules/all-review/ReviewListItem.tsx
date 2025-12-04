"use client";

import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
import { ReviewItem } from "@/types/review.type";

type ReviewListItemProps = {
  review: ReviewItem;
};

const HeartSvg = ({ className }: { className?: string }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 32 28"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="currentColor"
  >
    <path d="M31.825 9.65833C31.6667 4.275 27.3917 0 22.0083 0C20.2667 0 17.575 1.26667 16.4667 3.325C16.3083 3.8 15.675 3.8 15.5167 3.325C14.25 1.425 11.7167 0.158333 9.81667 0.158333C4.59167 0.158333 0.158333 4.43333 0 9.65833V9.975C0 12.6667 1.10833 15.2 3.00833 17.1C3.00833 17.1 3.00833 17.1 3.00833 17.2583C3.16667 17.4167 10.7667 24.0667 14.25 27.075C15.2 27.8667 16.625 27.8667 17.575 27.075C21.0583 24.0667 28.5 17.4167 28.8167 17.2583C28.8167 17.2583 28.8167 17.2583 28.8167 17.1C30.7167 15.3583 31.825 12.825 31.825 9.975V9.65833Z" />
  </svg>
);

const HeartIcon = ({ fillPercent }: { fillPercent: number }) => {
  const clamped = Math.max(0, Math.min(1, fillPercent));
  const clipRight = `${100 - clamped * 100}%`;

  return (
    <span className="relative block h-4 w-4" aria-hidden>
      <HeartSvg className="absolute inset-0 text-gray-300" />
      <span
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${clipRight} 0 0)` }}
      >
        <HeartSvg className="text-orange-400" />
      </span>
    </span>
  );
};

const ReviewListItem = ({ review }: ReviewListItemProps) => {
  const dateLabel = review.createdAt ? review.createdAt.split("T")[0] : "";

  return (
    <Card className="border border-gray-100 bg-white shadow-sm">
      <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-start sm:gap-5 sm:p-5">
        <div className="relative h-24 w-32 shrink-0 overflow-hidden rounded-xl sm:h-28 sm:w-36">
          <Image
            src={review.Gathering?.image || "/images/review-thumb-1.png"}
            alt={review.Gathering?.name || "review image"}
            fill
            className="object-cover"
            sizes="144px"
          />
        </div>

        <div className="flex flex-1 flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-xs font-semibold text-gray-700">
                {review.User?.name?.slice(0, 1) ?? "유저"}
              </div>
              <span className="text-gray-700">{review.User?.name ?? "이름없음"}</span>
            </div>
            <div className="flex items-center gap-1 text-emerald-500">
              {Array.from({ length: 5 }).map((_, idx) => (
                <HeartIcon key={idx} fillPercent={Math.max(0, Math.min(1, review.score - idx))} />
              ))}
            </div>
            <span className="text-gray-500">{dateLabel}</span>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 sm:text-sm">
            <span className="rounded-full bg-gray-100 px-2 py-1 font-semibold text-gray-700">
              {review.Gathering?.name ?? "모임명"}
            </span>
            {review.Gathering?.location ? (
              <span className="text-gray-600">{review.Gathering.location}</span>
            ) : null}
          </div>

          <p className="text-sm text-gray-800 sm:text-base">
            {review.comment || "작성된 내용이 없습니다"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewListItem;
