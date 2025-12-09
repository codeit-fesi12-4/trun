"use client";

import { useAuthStore } from "@/stores/auth.store";
import Image from "next/image";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { postSignout } from "@/api/auth.api";

const Header = () => {
  const user = useAuthStore(state => state.user);
  const reset = useAuthStore(state => state.reset);
  const router = useRouter();

  const handleLogout = async () => {
    await postSignout();
    reset();
    router.push("/");
    toast.success("로그아웃 성공");
  };

  return (
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
            <Link href="/moim-favorite" className="nav-link">
              찜한 모임
            </Link>
            <Link href="/all-review" className="nav-link">
              모든 리뷰
            </Link>
          </nav>
        </div>

        <div className="flex items-center">
          <div className="flex items-center space-x-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Image
                    src={user.image ? user.image : "/icons/default_profile.svg"}
                    alt="내정보"
                    width={42}
                    height={42}
                    className="h-8 w-8 cursor-pointer sm:h-11 sm:w-11"
                  />
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                  <Link href="/mypage">
                    <DropdownMenuItem>마이페이지</DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => void handleLogout()}>로그아웃</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login" className="nav-link">
                로그인
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
