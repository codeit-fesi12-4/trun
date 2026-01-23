"use client";

import { useState, useEffect, useMemo } from "react";
import { isFavoriteMoim } from "@/utils/favorite.util";
import { formatDeadline } from "@/utils/moim.util";
import { Moim } from "@/types/moim.type";
import { MoimCardActions } from "@/types/moimFind.type";
import { useUserProfileQuery } from "./queries/useUserQuery";

export const useMoimCard = (
  item: Moim,
  onFavoriteToggle?: MoimCardActions["onFavoriteToggle"],
  onJoinClick?: MoimCardActions["onJoinClick"],
) => {
  const { data: user } = useUserProfileQuery();
  const me = useUserProfileQuery();

  const status = me.isLoading ? "loading" : me.data ? "authenticated" : "unauthenticated";

  const userId = user?.id;

  // 로그인 여부는 user 존재로 확인 (토큰은 HttpOnly 쿠키에 있어서 클라이언트에서 접근 불가)
  const isLoggedIn = status === "authenticated";

  // localStorage에서 찜한 상태를 계산 (item.id, userId가 변경될 때마다 재계산)
  const computedFavoriteState = useMemo(() => {
    if (typeof window === "undefined") return false;
    // 로그인하지 않은 상태에서는 찜 상태를 표시하지 않음
    if (!isLoggedIn || !userId) return false;
    return isFavoriteMoim(item.id, userId);
  }, [item.id, userId, isLoggedIn]);

  const [isFavorite, setIsFavorite] = useState(computedFavoriteState);

  // computedFavoriteState가 변경될 때만 상태 업데이트 (item.id, userId 변경 시)
  useEffect(() => {
    setIsFavorite(computedFavoriteState);
  }, [computedFavoriteState]);

  // localStorage 변경 감지 (다른 탭에서 변경된 경우)
  useEffect(() => {
    const handleStorageChange = () => {
      // 외부 시스템(localStorage) 변경을 감지하여 상태 동기화
      if (!isLoggedIn || !userId) {
        setIsFavorite(false);
        return;
      }
      const favoriteState = isFavoriteMoim(item.id, userId);
      setIsFavorite(favoriteState);
    };

    window.addEventListener("storage", handleStorageChange);
    // 커스텀 이벤트로 같은 탭 내 변경도 감지
    window.addEventListener("favoriteMoimsChanged", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("favoriteMoimsChanged", handleStorageChange);
    };
  }, [item.id, userId, isLoggedIn]);

  // 참여하기 클릭 핸들러
  const handleJoinClick = () => {
    onJoinClick?.(item.id);
  };

  // 계산된 값들
  const participantPercentage = (item.participantCount / item.capacity) * 100;
  const isFull = item.participantCount === item.capacity;
  const deadlineText = formatDeadline(item.registrationEnd);

  return {
    isFavorite,
    handleJoinClick,
    participantPercentage,
    isFull,
    deadlineText,
  };
};
