"use client";

import Image from "next/image";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ConfirmationJoinModal from "@/components/modules/moim-detail/ConfirmationJoinModal";
import { Skeleton } from "@/components/ui/skeleton";
import { useHeader } from "@/hooks/useHeader";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { useLoginModalStore } from "@/stores/loginModal.store";
import { useUserProfileQuery } from "@/hooks/useUserQuery";

const Header = () => {
  const { isMounted, favoriteCount, handleLogout } = useHeader();
  const { data: user, isLoading } = useUserProfileQuery();
  const { setOpen } = useLoginModalStore();
  const router = useRouter();

  const handleFavoritePage = () => {
    if (!user) {
      setOpen(true);
      return;
    }
    router.push("/moim-favorite");
  };

  if (isLoading) return null;

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
          <nav className="flex gap-4 md:gap-8">
            <Link href="/moim-find" className="nav-link">
              모임 찾기
            </Link>
            <button onClick={handleFavoritePage} className="nav-link flex items-center gap-1.5">
              찜한 모임
              {favoriteCount > 0 && (
                <Badge
                  variant="default"
                  className="h-4 border-transparent bg-green-500 px-1 text-white sm:h-5.5 sm:px-1.5 sm:text-[10px]"
                >
                  <span className="sm:text-sm sm:font-bold">{favoriteCount}</span>
                </Badge>
              )}
            </button>
            <Link href="/all-review" className="nav-link">
              모든 리뷰
            </Link>
          </nav>
        </div>

        <div className="flex items-center">
          <div className="flex items-center space-x-4">
            {!isMounted ? (
              <Skeleton className="h-8 w-8 rounded-full sm:h-11 sm:w-11" />
            ) : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Image
                    src={user.image ? user.image : "/icons/default_profile.svg"}
                    alt="내정보"
                    width={42}
                    height={42}
                    className="h-8 w-8 cursor-pointer rounded-full object-cover sm:h-11 sm:w-11"
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
              <Link href="/login" className="nav-link hover:underline">
                로그인
              </Link>
            )}
          </div>
        </div>
      </div>
      <ConfirmationJoinModal />
    </header>
  );
};
export default Header;
