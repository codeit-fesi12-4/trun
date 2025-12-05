"use client";

import Image from "next/image";

const AllReviewHero = () => (
  <header className="mt-2 mb-[35px] flex flex-row gap-3 sm:mt-4 sm:mb-[57px] sm:gap-[26px] md:mb-[71px]">
    <Image
      src="/images/img_head.svg"
      alt="review header logo"
      width={68}
      height={50}
      className="sm:h-[76px] sm:w-[102px]"
    />
    <div className="flex flex-col sm:gap-4">
      <h1 className="text-lg font-semibold text-gray-800 sm:text-[32px]">모든 리뷰</h1>
      <p className="ttext-base font-medium text-gray-400 sm:text-xl">
        같이달램을 이용자들은 이렇게 느꼈어요 🫶
      </p>
    </div>
  </header>
);

export default AllReviewHero;
