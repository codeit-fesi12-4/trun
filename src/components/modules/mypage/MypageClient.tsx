"use client";

import ProfileEditModal from "@/components/modules/mypage/mypage-modal/ProfileEditModal";
import ProfileSection from "@/components/modules/mypage/ProfileCard";
import TabsSection from "@/components/modules/mypage/TabsSection";
import { useAuthStore } from "@/stores/auth.store";
import Image from "next/image";
import { useEffect, useState } from "react";

const MypageClient = () => {
  const user = useAuthStore(state => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    const handleClient = () => {
      setIsClient(true);
    };
    handleClient();
  }, []);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  return (
    <main className="flex w-full flex-1 flex-col lg:flex-row">
      <div className="relative">
        {/* 타이틀 + 프로필 수정 버튼 */}
        <div className="flex items-center justify-between">
          <h1 className="text-base font-semibold text-gray-900 sm:text-2xl">마이페이지</h1>

          <button
            onClick={handleModalOpen}
            className="cursor-pointer lg:absolute lg:top-[68px] lg:right-[52px]"
          >
            <Image src="/icons/ic_mypage_edit.svg" alt="수정 아이콘" width={32} height={32} />
          </button>
        </div>

        {/* 내 프로필 */}
        <div className="mt-1.5 mb-6 sm:mt-6 sm:mb-10 lg:mr-10 lg:mb-0 lg:w-72">
          {isClient && user && (
            <ProfileSection
              id={user.id}
              name={user.name}
              companyName={user.companyName}
              email={user.email}
              image={user.image}
            />
          )}
        </div>
      </div>

      {/* 탭 영역*/}
      <div className="w-full">
        <TabsSection />
      </div>

      {/* 프로필 수정 모달 */}
      <ProfileEditModal open={isModalOpen} onOpenChange={setIsModalOpen} user={user} />
    </main>
  );
};
export default MypageClient;
