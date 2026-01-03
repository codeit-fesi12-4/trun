"use client";

import ProfileSection from "@/components/modules/mypage/ProfileCard";
import ProfileCardSkeleton from "@/components/modules/mypage/ProfileCardSkeleton";
import TabsSection from "@/components/modules/mypage/TabsSection";
import Image from "next/image";
import { useState } from "react";
import { ProfileEditModal } from "./mypage-modal/ProfileEditModal";
import { useUserProfileQuery } from "@/hooks/queries/useUserQuery";

const MypageClient = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: user, isLoading } = useUserProfileQuery();

  return (
    <main className="flex w-full flex-1 flex-col lg:flex-row">
      <div className="relative">
        {/* 타이틀 + 프로필 수정 버튼 */}
        <div className="flex items-center justify-between">
          <h1 className="text-base font-semibold text-gray-900 sm:text-2xl">마이페이지</h1>

          <button
            onClick={() => setIsModalOpen(true)}
            className="cursor-pointer lg:absolute lg:top-[68px] lg:right-[52px]"
          >
            <Image src="/icons/mypage/mypage_edit.svg" alt="수정 아이콘" width={32} height={32} />
          </button>
        </div>

        {/* 내 프로필 */}
        <div className="mt-1.5 mb-6 sm:mt-6 sm:mb-10 lg:mr-10 lg:mb-0 lg:w-72">
          {isLoading || !user ? <ProfileCardSkeleton /> : <ProfileSection user={user} />}
        </div>
      </div>

      {/* 탭 영역*/}
      <div className="w-full">
        <TabsSection />
      </div>

      {/* 프로필 수정 모달 */}
      {user && <ProfileEditModal open={isModalOpen} onOpenChange={setIsModalOpen} user={user} />}
    </main>
  );
};
export default MypageClient;
