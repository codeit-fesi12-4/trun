// 모바일, 태블릿 사이즈의 페이지네이션
export const getPagesInSmallView = (page: number, totalPages: number) => {
  if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);
  if (page <= 3) return [1, 2, 3, "...", totalPages];
  if (page >= totalPages - 2) return [1, "...", totalPages - 2, totalPages - 1, totalPages];
  return [1, "...", page - 1, page, page + 1, "...", totalPages];
};

// pc 사이즈의 페이지네이션
export const getPagesInLargeView = (page: number, totalPages: number) => {
  // Case 1) totalPages <= 7 → 전체 출력
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // Case 2) page가 초반부 (1~4)
  if (page <= 4) {
    return [1, 2, 3, 4, 5, "...", totalPages];
  }

  // Case 3) page가 끝 부분 (totalPages - 3 이상)
  if (page >= totalPages - 3) {
    return [1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  }
  // Case 4) 중간 영역
  return [1, "...", page - 2, page - 1, page, page + 1, page + 2, "...", totalPages];
};
