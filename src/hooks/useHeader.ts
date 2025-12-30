"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { signOut } from "next-auth/react";
import { getFavoriteMoims } from "@/utils/favorite.util";
import { useUserProfileQuery } from "./useUserQuery";
import { useQueryClient } from "@tanstack/react-query";
import { useMoimsInfiniteQuery } from "@/hooks/useMoimFindQuery";
import { Moim } from "@/types/moim.type";

export const useHeader = () => {
  const { data: user } = useUserProfileQuery();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [favoriteCount, setFavoriteCount] = useState(0);

  const queryClient = useQueryClient();

  // 필터 없이 모든 모임 목록 가져오기 (첫 페이지만 - 성능 최적화)
  const { data: allMoimsPages } = useMoimsInfiniteQuery({
    params: undefined,
    pageSize: 1000,
  });

  // 모든 페이지의 모임 데이터를 하나의 배열로 통합
  const allMoims = useMemo<Moim[]>(() => {
    if (!allMoimsPages?.pages) return [];
    return allMoimsPages.pages.flatMap(page => page.data);
  }, [allMoimsPages]);

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
      // 실제 존재하는 모임만 카운트
      const existingMoimIds = new Set(allMoims.map(moim => moim.id));
      const validFavorites = favorites.filter(id => existingMoimIds.has(id));
      setFavoriteCount(validFavorites.length);
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
      queryClient.removeQueries({ queryKey: ["userProfile"] });
      router.refresh();
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
