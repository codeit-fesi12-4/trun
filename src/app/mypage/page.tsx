"use client";

import ProfileSection from "@/components/modules/mypage/ProfileCard";
import TabsSection from "@/components/modules/mypage/TabsSection";
import { TEST_USER_DATA } from "@/constants/mypageTestData";
import Image from "next/image";

// 모달 테스트
const onEditHandler = () => {
  alert("프로필 수정 모달");
};

const Mypage = () => (
  <main className="flex w-full flex-1 flex-col lg:flex-row">
    <div className="relative">
      {/* 타이틀 + 프로필 수정 버튼 */}
      <div className="flex items-center justify-between">
        <h1 className="text-base font-semibold text-gray-900 sm:text-2xl">마이페이지</h1>

        <button
          onClick={onEditHandler}
          className="cursor-pointer lg:absolute lg:top-[68px] lg:right-[52px]"
        >
          <Image src="/icons/ic_mypage_edit.svg" alt="수정 아이콘" width={32} height={32} />
        </button>
      </div>

      {/* 내 프로필 */}
      <div className="mt-1.5 mb-6 sm:mt-6 sm:mb-10 lg:mr-10 lg:mb-0 lg:w-72">
        <ProfileSection
          name={TEST_USER_DATA.name}
          companyName={TEST_USER_DATA.companyName}
          email={TEST_USER_DATA.email}
          image={TEST_USER_DATA.image}
        />
      </div>
    </div>

    {/* 탭 영역*/}
    <div className="w-full">
      <TabsSection />
    </div>
  </main>
);

export default Mypage;
