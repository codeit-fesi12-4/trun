const FAVORITE_MOIMS_KEY = "favoriteMoims";

/**
 * localStorage에서 찜한 모임 ID 목록을 가져옵니다.
 * @returns 찜한 모임 ID 배열
 */
export const getFavoriteMoims = (): number[] => {
  if (typeof window === "undefined") return [];

  try {
    const stored = localStorage.getItem(FAVORITE_MOIMS_KEY);
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
 */
export const addFavoriteMoim = (moimId: number): void => {
  if (typeof window === "undefined") return;

  try {
    const favorites = getFavoriteMoims();
    if (!favorites.includes(moimId)) {
      const updated = [...favorites, moimId];
      localStorage.setItem(FAVORITE_MOIMS_KEY, JSON.stringify(updated));
    }
  } catch (error) {
    console.error("찜한 모임 추가 실패:", error);
  }
};

/**
 * localStorage에서 찜한 모임 ID를 제거합니다.
 * @param moimId 제거할 모임 ID
 */
export const removeFavoriteMoim = (moimId: number): void => {
  if (typeof window === "undefined") return;

  try {
    const favorites = getFavoriteMoims();
    const updated = favorites.filter(id => id !== moimId);
    localStorage.setItem(FAVORITE_MOIMS_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error("찜한 모임 제거 실패:", error);
  }
};

/**
 * 특정 모임이 찜한 목록에 있는지 확인합니다.
 * @param moimId 확인할 모임 ID
 * @returns 찜한 목록에 있으면 true, 없으면 false
 */
export const isFavoriteMoim = (moimId: number): boolean => {
  if (typeof window === "undefined") return false;

  const favorites = getFavoriteMoims();
  return favorites.includes(moimId);
};

/**
 * 찜한 모임을 토글합니다 (추가/제거).
 * @param moimId 토글할 모임 ID
 * @returns 토글 후 찜한 상태 (true: 찜함, false: 찜하지 않음)
 */
export const toggleFavoriteMoim = (moimId: number): boolean => {
  if (typeof window === "undefined") return false;

  const isFavorite = isFavoriteMoim(moimId);
  if (isFavorite) {
    removeFavoriteMoim(moimId);
    return false;
  } else {
    addFavoriteMoim(moimId);
    return true;
  }
};
