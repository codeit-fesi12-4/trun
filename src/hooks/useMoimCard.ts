"use client";

import { useState, useEffect, useMemo } from "react";
import { isFavoriteMoim, toggleFavoriteMoim } from "@/utils/favorite.util";
import { formatDeadline } from "@/utils/moim.util";
import { Moim } from "@/types/moim.type";
import { MoimCardActions } from "@/types/moimFind.type";
import { useAuthStore } from "@/stores/auth.store";

/**
 * MoimCard 컴포넌트에서 사용하는 로직을 관리하는 훅
 * @param item 모임 데이터
 * @param onFavoriteToggle 찜한 모임 토글 콜백 (optional)
 * @param onJoinClick 참여하기 클릭 콜백 (optional)
 * @returns 카드에 필요한 모든 상태와 핸들러
 */
export const useMoimCard = (
  item: Moim,
  onFavoriteToggle?: MoimCardActions["onFavoriteToggle"],
  onJoinClick?: MoimCardActions["onJoinClick"],
) => {
  // localStorage에서 찜한 상태를 계산 (item.id가 변경될 때마다 재계산)
  const computedFavoriteState = useMemo(() => {
    if (typeof window === "undefined") return false;
    return isFavoriteMoim(item.id);
  }, [item.id]);

  const [isFavorite, setIsFavorite] = useState(computedFavoriteState);

  // computedFavoriteState가 변경될 때만 상태 업데이트 (item.id 변경 시)
  useEffect(() => {
    setIsFavorite(computedFavoriteState);
  }, [computedFavoriteState]);

  // localStorage 변경 감지 (다른 탭에서 변경된 경우)
  useEffect(() => {
    const handleStorageChange = () => {
      // 외부 시스템(localStorage) 변경을 감지하여 상태 동기화
      const favoriteState = isFavoriteMoim(item.id);
      setIsFavorite(favoriteState);
    };

    window.addEventListener("storage", handleStorageChange);
    // 커스텀 이벤트로 같은 탭 내 변경도 감지
    window.addEventListener("favoriteMoimsChanged", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("favoriteMoimsChanged", handleStorageChange);
    };
  }, [item.id]);

  // 찜한 모임 토글 함수
  const toggleFavorite = () => {
    const newFavoriteState = toggleFavoriteMoim(item.id);
    setIsFavorite(newFavoriteState);

    // 같은 탭 내 다른 컴포넌트에 변경 알림
    window.dispatchEvent(new Event("favoriteMoimsChanged"));

    return newFavoriteState;
  };

  const token = useAuthStore(state => state.token);

  // 하트 클릭 핸들러
  const handleFavoriteClick = () => {
    if (!token) {
      alert("로그인이 필요한 서비스입니다. 먼저 로그인해주세요.");
      return;
    }
    toggleFavorite();
    onFavoriteToggle?.(item.id);
  };

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
    handleFavoriteClick,
    handleJoinClick,
    participantPercentage,
    isFull,
    deadlineText,
  };
};
