"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { useMoimFind } from "@/hooks/useMoimFind";
import { getFavoriteMoims } from "@/utils/favorite.util";
import { useAuthStore } from "@/stores/auth.store";
import { toast } from "sonner";
import { Moim } from "@/types/moim.type";

export const useMoimFavorite = () => {
  const [favoriteMoimIds, setFavoriteMoimIds] = useState<number[]>([]);
  const previousFavoriteMoimIdsRef = useRef<number[]>([]);
  const isInitialMountRef = useRef(true);
  const allMoimsRef = useRef<Moim[]>([]);

  const user = useAuthStore(state => state.user);
  const userId = user?.id.toString() ?? null;

  const {
    moimCardData: allMoims,
    availableLocations,
    isLoading,
    error,
    handleFilterChange,
  } = useMoimFind();

  // allMoims를 ref에 저장 (alert 표시 시 최신 값 사용)
  useEffect(() => {
    allMoimsRef.current = allMoims;
  }, [allMoims]);

  // localStorage에서 찜한 모임 ID 목록 가져오기
  useEffect(() => {
    const loadFavoriteMoims = () => {
      setFavoriteMoimIds(prevIds => {
        previousFavoriteMoimIdsRef.current = prevIds;
        return getFavoriteMoims(userId);
      });
    };

    loadFavoriteMoims();

    // localStorage 변경 감지
    const handleStorageChange = () => {
      loadFavoriteMoims();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("favoriteMoimsChanged", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("favoriteMoimsChanged", handleStorageChange);
    };
  }, [userId]);

  // 찜한 모임이 제거되었을 때 알림 표시 (추후 sonnar 적용 예정)
  useEffect(() => {
    // 초기 마운트 시에는 알림 표시하지 않음
    if (isInitialMountRef.current) {
      isInitialMountRef.current = false;
      return;
    }

    const previousIds = previousFavoriteMoimIdsRef.current;

    // 찜한 모임이 제거된 경우만 알림 표시
    // allMoims가 변경되는 것은 카테고리 변경일 수 있으므로, favoriteMoimIds가 실제로 변경되었을 때만 처리
    if (previousIds.length > 0 && favoriteMoimIds.length < previousIds.length) {
      // 제거된 모임 ID 찾기
      const removedIds = previousIds.filter((id: number) => !favoriteMoimIds.includes(id));

      if (removedIds.length > 0) {
        // 제거된 모임 이름 찾기 (현재 allMoims에 포함된 모임만)
        const removedMoim = allMoimsRef.current.find(moim => removedIds.includes(moim.id));

        if (removedMoim) {
          toast.success(`"${removedMoim.name}" 모임이 찜한 목록에서 제거되었습니다.`);
        }
      }
    }
  }, [favoriteMoimIds]);

  // 찜한 모임만 필터링
  const moimCardData = useMemo(() => {
    if (!allMoims) return [];

    return allMoims.filter(moim => favoriteMoimIds.includes(moim.id));
  }, [allMoims, favoriteMoimIds]);

  const handleFavoriteToggle = (moimId: number) => {
    void moimId;
  };

  return {
    moimCardData,
    availableLocations,
    isLoading,
    error,
    handleFilterChange,
    onFavoriteToggle: handleFavoriteToggle,
  };
};
