"use client";

import Image from "next/image";
import Link from "next/link";

const Header = () => (
  <header className="bg-background fixed top-0 z-10 w-full px-4 shadow-xl md:px-6">
    <div className="mx-auto flex h-[50px] max-w-[1200px] items-center justify-between sm:h-[88px]">
      <div className="flex items-center justify-center gap-4 md:gap-9">
        <Link href="/">
          <Image
            src="/icons/ic_logo.svg"
            alt="trun 로고"
            width={112}
            height={112}
            className="h-auto w-18 sm:w-28"
          />
        </Link>
        <nav className="flex gap-4 md:gap-9">
          <Link href="/moim-find" className="nav-link">
            모임 찾기
          </Link>
          <Link href="/moim-save" className="nav-link">
            찜한 모임
          </Link>
          <Link href="/all-review" className="nav-link">
            모든 리뷰
          </Link>
        </nav>
      </div>

      <div className="flex items-center">
        <div className="flex items-center space-x-4">
          {/* TODO: 로그인 여부에 따라서 조건부 렌더링 */}
          <Link href="/login" className="nav-link">
            로그인
          </Link>
        </div>
      </div>
    </div>
  </header>
);
export default Header;
