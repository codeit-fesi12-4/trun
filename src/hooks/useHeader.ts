"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useSession, signOut } from "next-auth/react";
import { getFavoriteMoims } from "@/utils/favorite.util";
import { useMoimFind } from "@/hooks/useMoimFind";

export const useHeader = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [favoriteCount, setFavoriteCount] = useState(0);

  // 실제 모임 목록 가져오기 (존재하는 모임만 카운트하기 위해)
  const { moimCardData: allMoims } = useMoimFind();

  // 클라이언트 마운트 체크
  useEffect(() => {
    const handleMount = () => {
      setIsMounted(true);
    };
    handleMount();
  }, []);

  // 찜한 모임 개수 가져오기 및 업데이트 (실제 존재하는 모임만 카운트)
  useEffect(() => {
    const userId = user?.id ? user.id.toString() : null;
    const updateFavoriteCount = () => {
      const favorites = getFavoriteMoims(userId);

      // 실제 모임 목록이 있을 때만 필터링
      if (allMoims.length > 0) {
        const existingMoimIds = new Set(allMoims.map(moim => moim.id));
        const validFavorites = favorites.filter(id => existingMoimIds.has(id));
        setFavoriteCount(validFavorites.length);
      } else {
        // 모임 목록이 아직 로드되지 않았으면 전체 개수 사용
        setFavoriteCount(favorites.length);
      }
    };

    updateFavoriteCount();

    // localStorage 변경 감지
    const handleStorageChange = () => {
      updateFavoriteCount();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("favoriteMoimsChanged", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("favoriteMoimsChanged", handleStorageChange);
    };
  }, [user?.id, allMoims]);

  const handleLogout = async () => {
    try {
      await signOut({ redirect: false });
      router.push("/");
      toast.success("로그아웃 성공");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("로그아웃 중 오류가 발생했습니다.");
    }
  };

  return {
    user,
    isMounted,
    favoriteCount,
    handleLogout,
  };
};
