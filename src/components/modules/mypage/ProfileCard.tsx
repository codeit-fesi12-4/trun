"use client";

import { UserData } from "@/types/mypage.type";
import Image from "next/image";

const ProfileSection = ({ image, name, companyName, email }: UserData) => (
  <section className="flex items-center rounded-2xl border border-green-300 bg-green-100 px-4 py-6 sm:px-7 sm:py-8 md:px-8 md:py-10 lg:flex-col">
    {/* 프로필 이미지 + 닉네임 */}
    <div className="flex items-center lg:flex-col">
      <Image
        src={image}
        alt="내 프로필 이미지"
        width={114}
        height={114}
        className="h-auto w-10 sm:w-14 lg:w-28 lg:pt-5"
      />
      <h1 className="pl-2 text-sm font-semibold text-gray-800 sm:text-lg sm:font-semibold lg:pt-5">
        {name}
      </h1>
    </div>

    {/* 가로, 세로 구분선 */}
    <div className="my-6 hidden w-full border-t border-gray-100 lg:block" />
    <div className="mx-4 h-16 w-px bg-gray-100 lg:hidden" />

    {/* 회사 + 이메일 */}
    <div className="flex flex-col gap-1 text-sm font-medium sm:text-base">
      <p className="text-gray-500">
        회사 <span className="pl-2 text-gray-800">{companyName}</span>
      </p>
      <p className="text-gray-500">
        이메일 <span className="pl-2 text-gray-800">{email}</span>
      </p>
    </div>
  </section>
);

export default ProfileSection;
