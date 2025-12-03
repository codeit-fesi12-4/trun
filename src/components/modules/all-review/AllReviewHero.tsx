"use client";

import Image from "next/image";

const AllReviewHero = () => (
  <header className="flex items-center gap-4 rounded-2xl px-4 py-5 sm:gap-6 sm:px-6 sm:py-7 lg:gap-8 lg:px-8 lg:py-9">
    <Image
      src="/images/img_head.svg"
      alt="review header logo"
      width={97}
      height={91}
      className="h-auto w-20 sm:w-24 lg:w-28"
    />
    <div className="flex flex-col gap-1 sm:gap-1.5">
      <h1 className="text-2xl font-semibold text-gray-900 sm:text-3xl lg:text-4xl">모든 리뷰</h1>
      <p className="text-sm font-medium text-gray-500 sm:text-base lg:text-lg">
        같이달램을 이용자들은 이렇게 느꼈어요 🫶
      </p>
    </div>
  </header>
);

export default AllReviewHero;
