"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getFavoriteMoims } from "@/utils/favorite.util";
import { useUserProfileQuery } from "./queries/useUserQuery";
import { useQueryClient } from "@tanstack/react-query";
import { logout } from "@/utils/logout.util";
import useLoginRedirect from "./useLoginRedirect";

export const useHeader = () => {
  const { data: user } = useUserProfileQuery();
  const [isMounted, setIsMounted] = useState(false);
  const [favoriteCount, setFavoriteCount] = useState(0);

  const queryClient = useQueryClient();

  const { redirectToLogin } = useLoginRedirect();

  // 클라이언트 마운트 체크
  useEffect(() => {
    const handleMount = () => {
      setIsMounted(true);
    };
    handleMount();
  }, []);

  // 찜한 모임 개수 가져오기 및 업데이트 (localStorage에서만 카운트 - 성능 최적화)
  useEffect(() => {
    const updateFavoriteCount = () => {
      const favorites = getFavoriteMoims(user?.id);
      // localStorage에서만 개수 계산 (실제 존재 여부 검증은 찜한 모임 페이지에서 처리)
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
    try {
      await logout(queryClient);
      redirectToLogin();
      toast.success("로그아웃 했습니다.");
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
