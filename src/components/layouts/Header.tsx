"use client";

import Image from "next/image";
import Link from "next/link";

const Header = () => (
  <header className="fixed top-0 z-10 w-full border-b-2 border-gray-900 bg-orange-600">
    <div className="mx-auto flex h-14 max-w-[1200px] items-center justify-between px-4 md:h-15 md:px-6">
      <div className="flex items-center gap-3 md:gap-6">
        <Link href="/">
          <Image src="/icons/logo.svg" alt="trun 로고" width={60} height={60} />
        </Link>

        <nav className="flex gap-3 md:gap-6">
          <Link href="/moim-find" className="nav-link">
            모임 찾기
          </Link>
          <Link href="/moim-save" className="nav-link">
            찜한 모임
          </Link>
          <Link href="/moim-review" className="nav-link">
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
