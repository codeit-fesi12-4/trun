"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuthStore } from "@/stores/auth.store";
import { postSignout } from "@/api/auth.api";
import { getFavoriteMoims } from "@/utils/favorite.util";

export const useHeader = () => {
  const user = useAuthStore(state => state.user);
  const reset = useAuthStore(state => state.reset);
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [favoriteCount, setFavoriteCount] = useState(0);

  // 클라이언트 마운트 체크
  useEffect(() => {
    const handleMount = () => {
      setIsMounted(true);
    };
    handleMount();
  }, []);

  // 찜한 모임 개수 가져오기 및 업데이트
  useEffect(() => {
    const userId = user?.id?.toString() ?? null;
    const updateFavoriteCount = () => {
      const favorites = getFavoriteMoims(userId);
      setFavoriteCount(favorites.length);
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
  }, [user?.id]);

  const handleLogout = async () => {
    await postSignout();
    reset();
    router.push("/");
    toast.success("로그아웃 성공");
  };

  return {
    user,
    isMounted,
    favoriteCount,
    handleLogout,
  };
};
