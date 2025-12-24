export const FAVORITE_MOIMS_KEY = "favoriteMoims";

/**
 * 사용자별 찜 목록 키를 생성합니다.
 * @param userId 사용자 ID (없으면 null)
 * @returns localStorage 키
 */
const getFavoriteMoimsKey = (userId: number | null): string => {
  if (!userId) return FAVORITE_MOIMS_KEY;
  return `${FAVORITE_MOIMS_KEY}_${userId}`;
};

/**
 * localStorage에서 찜한 모임 ID 목록을 가져옵니다.
 * @param userId 사용자 ID (없으면 null)
 * @returns 찜한 모임 ID 배열
 */
export const getFavoriteMoims = (userId: number | null = null): number[] => {
  if (typeof window === "undefined") return [];

  try {
    const key = getFavoriteMoimsKey(userId);
    const stored = localStorage.getItem(key);
    if (!stored) return [];

    const parsed = JSON.parse(stored);
    // 배열이고 모든 요소가 숫자인지 검증
    if (Array.isArray(parsed) && parsed.every(id => typeof id === "number")) {
      return parsed;
    }
    return [];
  } catch {
    return [];
  }
};

/**
 * localStorage에 찜한 모임 ID를 추가합니다.
 * @param moimId 추가할 모임 ID
 * @param userId 사용자 ID (없으면 null)
 */
export const addFavoriteMoim = (moimId: number, userId: number | null = null): void => {
  if (typeof window === "undefined") return;

  try {
    const favorites = getFavoriteMoims(userId);
    if (!favorites.includes(moimId)) {
      const updated = [...favorites, moimId];
      const key = getFavoriteMoimsKey(userId);
      localStorage.setItem(key, JSON.stringify(updated));
      // 같은 탭에서 실시간 업데이트를 위한 커스텀 이벤트 발생
      window.dispatchEvent(new Event("favoriteMoimsChanged"));
    }
  } catch (error) {
    console.error("찜한 모임 추가 실패:", error);
  }
};

/**
 * localStorage에서 찜한 모임 ID를 제거합니다.
 * @param moimId 제거할 모임 ID
 * @param userId 사용자 ID (없으면 null)
 */
export const removeFavoriteMoim = (moimId: number, userId: number | null = null): void => {
  if (typeof window === "undefined") return;

  try {
    const favorites = getFavoriteMoims(userId);
    const updated = favorites.filter(id => id !== moimId);
    const key = getFavoriteMoimsKey(userId);
    localStorage.setItem(key, JSON.stringify(updated));
    // 같은 탭에서 실시간 업데이트를 위한 커스텀 이벤트 발생
    window.dispatchEvent(new Event("favoriteMoimsChanged"));
  } catch (error) {
    console.error("찜한 모임 제거 실패:", error);
  }
};

/**
 * 특정 모임이 찜한 목록에 있는지 확인합니다.
 * @param moimId 확인할 모임 ID
 * @param userId 사용자 ID (없으면 null)
 * @returns 찜한 목록에 있으면 true, 없으면 false
 */
export const isFavoriteMoim = (moimId: number, userId: number | null = null): boolean => {
  if (typeof window === "undefined") return false;

  const favorites = getFavoriteMoims(userId);
  return favorites.includes(moimId);
};

/**
 * 찜한 모임을 토글합니다 (추가/제거).
 * @param moimId 토글할 모임 ID
 * @param userId 사용자 ID (없으면 null)
 * @returns 토글 후 찜한 상태 (true: 찜함, false: 찜하지 않음)
 */
export const toggleFavoriteMoim = (moimId: number, userId: number | null = null): boolean => {
  if (typeof window === "undefined") return false;

  const isFavorite = isFavoriteMoim(moimId, userId);
  if (isFavorite) {
    removeFavoriteMoim(moimId, userId);
    return false;
  } else {
    addFavoriteMoim(moimId, userId);
    return true;
  }
};
