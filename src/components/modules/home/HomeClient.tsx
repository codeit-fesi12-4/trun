"use client";

import Link from "next/link";
import Image from "next/image";

const HomeClient = () => (
  <div className="flex flex-col">
    {/* 히어로 섹션 */}
    <section className="relative flex min-h-[calc(100vh-50px)] items-center justify-center overflow-hidden bg-gradient-to-b from-green-50 via-white to-green-50 px-6 text-center md:min-h-[calc(100vh-88px)]">
      <div className="flex flex-col items-center">
        <div className="mb-5 md:mb-10">
          <Image
            src="/images/img_login.png"
            alt="같이달림"
            width={600}
            height={400}
            className="mx-auto h-auto w-full max-w-[430px] md:max-w-[480px]"
            priority
          />
        </div>

        <div>
          <h1 className="mb-4 text-4xl leading-tight font-extrabold text-gray-800 md:text-5xl">
            함께 달리는 즐거움, <span className="text-green-600">같이달림!</span>
          </h1>
          <p className="mb-8 text-lg font-medium text-gray-600 md:text-xl">
            다양한 러닝 모임을 찾고 <br />
            새로운 친구들과 함께하는 즐거운 달리기 경험을 시작하세요.
          </p>
          <Link
            href="/moim-find"
            className="inline-block rounded-lg bg-green-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-600 md:px-8 md:py-4 md:text-base"
          >
            모임 찾아보기
          </Link>
        </div>
      </div>
    </section>
  </div>
);

export default HomeClient;
