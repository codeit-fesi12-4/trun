"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getFavoriteMoims } from "@/utils/favorite.util";
import { useMoimFind } from "@/hooks/useMoimFind";
import { useUserProfileQuery } from "./useUserQuery";
import { useQueryClient } from "@tanstack/react-query";
import { logout } from "@/utils/logout.util";
import useLoginRedirect from "./useLoginRedirect";

export const useHeader = () => {
  const { data: user } = useUserProfileQuery();
  const [isMounted, setIsMounted] = useState(false);
  const [favoriteCount, setFavoriteCount] = useState(0);

  const queryClient = useQueryClient();

  const { redirectToLogin } = useLoginRedirect();

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
    const updateFavoriteCount = () => {
      const favorites = getFavoriteMoims(user?.id);
      setFavoriteCount(favorites.length);
      // }
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
