"use client";

import Link from "next/link";
import Image from "next/image";
import FeatureSection from "@/components/modules/home/FeatureSection";
import { ChevronDown } from "lucide-react";

const Page = () => (
  <div className="flex flex-col">
    {/* 히어로 섹션 */}
    <section className="relative flex min-h-screen flex-col items-center justify-start overflow-hidden bg-gradient-to-b from-green-50 via-white to-green-50 px-6 pt-32 pb-24 text-center md:pt-40">
      <div className="">
        <Image
          src="/images/img_login.png"
          alt="같이달림"
          width={600}
          height={400}
          className="mx-auto h-auto w-full max-w-[500px] md:max-w-[600px]"
          priority
        />
      </div>
      <div className="mt-12 md:mt-10">
        <h1 className="mb-6 text-4xl leading-tight font-extrabold text-gray-800 md:text-6xl">
          함께 달리는 즐거움, <span className="text-green-600">같이달림</span>
        </h1>
        <p className="mb-8 text-base text-gray-600 md:text-xl">
          다양한 러닝 모임을 찾고 함께 달려보세요. 새로운 친구들과 함께하는 즐거운 달리기 경험을
          시작하세요.
        </p>
        <Link
          href="/moim-find"
          className="inline-block rounded-lg bg-green-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-600 md:px-8 md:py-4 md:text-base"
        >
          모임 찾아보기
        </Link>
      </div>

      <div className="absolute bottom-40 mt-16 animate-bounce text-2xl text-gray-400 md:mt-20">
        <ChevronDown />
      </div>
    </section>

    {/* 모임 찾기 기능 */}
    <FeatureSection
      bgColor="bg-white"
      // image="/images/moim-find.png"
      title="원하는 러닝 모임을 쉽게 찾아보세요"
      reverse
      description={
        <>
          <p>
            <span className="font-semibold text-green-600">달림핏</span>과{" "}
            <span className="font-semibold text-green-600">런케이션</span> 등 다양한 카테고리의 러닝
            모임을 <br />
            <strong>지역별, 날짜별로 필터링</strong>하여 찾을 수 있어요.
          </p>
          <p>
            마감 임박 순, 참여 인원 순으로 정렬하여 <br />
            <strong>나에게 딱 맞는 모임을 빠르게 발견</strong>하세요.
          </p>
        </>
      }
      imageStyle="w-full max-w-[600px]"
    />

    {/* 찜한 모임 기능 */}
    <FeatureSection
      bgColor="bg-gray-50"
      // image="/images/moim-favorite.png"
      title="관심있는 모임을 찜하고 관리하세요"
      description={
        <>
          <p>
            마음에 드는 모임을 <strong>찜하기</strong>로 저장하고, <br />
            <strong>한 곳에서 모아서 확인</strong>할 수 있어요.
          </p>
          <p>
            찜한 모임은 <span className="font-semibold">헤더에서 실시간으로 개수</span>를 확인할 수
            있으며,
            <br /> 언제든지 쉽게 접근할 수 있습니다.
          </p>
        </>
      }
      imageStyle="w-full max-w-[600px]"
    />

    {/* 모임 상세 정보 */}
    <FeatureSection
      bgColor="bg-white"
      // image="/images/moim-detail.png"
      title="모임 상세 정보를 한눈에 확인하세요"
      reverse
      description={
        <>
          <p>
            모임의 <span className="font-semibold text-green-600">날짜, 시간, 위치</span>는 물론,
            <br />
            <strong>참여 인원 현황</strong>과 <strong>마감일</strong>까지 한눈에 확인할 수 있어요.
          </p>
          <p>
            <strong>참여자 리스트</strong>와 <strong>리뷰</strong>를 통해 모임의 분위기를 미리
            파악하고,
            <br />
            <span className="font-semibold">안심하고 참여</span>할 수 있습니다.
          </p>
        </>
      }
      imageStyle="w-full max-w-[600px]"
    />

    {/* 리뷰 기능 */}
    <FeatureSection
      bgColor="bg-gray-50"
      // image="/images/review.png"
      title="모임 후기를 통해 신뢰할 수 있는 모임을 찾으세요"
      description={
        <>
          <p>
            참여한 모임에 대한 <span className="font-semibold text-green-600">리뷰</span>를 작성하고
            다른 러너들의 후기를 확인할 수 있어요.
          </p>
          <p>
            <strong>실제 참여자들의 솔직한 후기</strong>를 통해 <br />
            모임의 분위기와 만족도를 미리 파악할 수 있습니다.
          </p>
          <p>
            모든 리뷰를 한 곳에서 모아보고,{" "}
            <span className="font-semibold">신뢰할 수 있는 모임</span>을 선택하세요.
          </p>
        </>
      }
      imageStyle="w-full max-w-[600px]"
    />

    {/* Footer */}
    <footer className="bg-green-500 py-8 text-center text-sm text-gray-800">
      <p>&copy; 2025 같이달림. All rights reserved.</p>
    </footer>
  </div>
);

export default Page;
