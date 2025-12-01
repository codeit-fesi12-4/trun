"use client";

import Image from "next/image";
import { TProfileCardProps } from "./type";

// 모달 테스트
const onEditHandler = () => {
  alert("프로필 수정 모달");
};

const ProfileSection = ({ name, companyName, email, image }: TProfileCardProps) => (
  <section className="relative overflow-hidden rounded-3xl border-2 border-gray-200 bg-white">
    {/* 내 프로필 수정 */}
    <div className="relative flex h-16 items-center justify-between overflow-hidden px-6 py-4">
      {/* 내 프로필 배경 */}
      <Image
        src="/images/bg-profile.svg"
        alt="배경 그래픽"
        fill
        className="object-cover object-[88%_50%] sm:object-[90%_50%]"
        priority
      />
      <h2 className="relative text-lg font-semibold text-gray-900">내 프로필</h2>
      {/* 프로필 수정 */}
      <button onClick={onEditHandler} className="relative cursor-pointer">
        <Image src="/icons/icon_edit.svg" alt="수정 아이콘" width={32} height={32} />
      </button>
    </div>

    {/* 내 정보 */}
    <div className="flex">
      <div className="absolute top-12 left-6 h-14 w-14 overflow-hidden rounded-4xl bg-white">
        <Image src={image} alt="내 프로필 이미지" fill className="object-contain" />
      </div>
      <div className="flex flex-col pt-3 pl-24">
        {/* 닉네임 */}
        <h3 className="pb-1 text-base font-semibold text-gray-900">{name}</h3>
        {/* 정보 */}
        <div className="flex flex-col gap-1 pb-4">
          <p className="text-sm font-medium text-gray-900">
            companny. <span className="font-normal text-gray-700">{companyName}</span>
          </p>
          <p className="text-sm font-medium text-gray-900">
            E-mail. <span className="font-normal text-gray-700">{email}</span>
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default ProfileSection;
