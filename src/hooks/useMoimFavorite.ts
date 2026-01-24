"use client";

import { useEffect } from "react";
import { useMoimFind } from "@/hooks/useMoimFind";
import { getFavoriteMoims } from "@/utils/favorite.util";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useUserProfileQuery } from "./queries/useUserQuery";

export const useMoimFavorite = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { data: user } = useUserProfileQuery();
  const userId = user?.id;

  // favorites를 id로 변환 및 localStorage 동기화
  useEffect(() => {
    const idParam = searchParams.get("id");
    const favoritesParam = searchParams.get("favorites");

    // favorites가 있으면 id로 변환
    if (favoritesParam && !idParam) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("id", favoritesParam);
      params.delete("favorites");
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
      return;
    }

    // id가 없으면 localStorage에서 가져와서 id로 변환
    if (!idParam) {
      const ids = getFavoriteMoims(userId);
      if (ids.length > 0) {
        const params = new URLSearchParams(searchParams.toString());
        params.set("id", ids.join(","));
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
      }
    }
  }, [searchParams, userId, pathname, router]);

  // localStorage 변경 감지하여 id 업데이트
  useEffect(() => {
    const handleStorageChange = () => {
      const ids = getFavoriteMoims(userId);
      const currentId = searchParams.get("id");
      const newId = ids.join(",");

      if (currentId !== newId) {
        const params = new URLSearchParams(searchParams.toString());
        if (ids.length > 0) {
          params.set("id", newId);
        } else {
          params.delete("id");
        }
        router.replace(params.toString() ? `${pathname}?${params.toString()}` : pathname, {
          scroll: false,
        });
      }
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("favoriteMoimsChanged", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("favoriteMoimsChanged", handleStorageChange);
    };
  }, [searchParams, userId, pathname, router]);

  // useMoimFind 사용 (id 파라미터가 포함된 상태)
  return useMoimFind();
};
