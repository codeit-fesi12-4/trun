import { format, parseISO, differenceInDays, isToday, isTomorrow } from "date-fns";
import { ko } from "date-fns/locale";

// 모집 마감일을 "오늘 21시 마감" 형식으로 변환 (모임 UI 전용)
// 마감일이 지났거나 7일 이상 남았으면 빈 문자열 반환
export const formatDeadline = (registrationEnd: string): string => {
  try {
    const endDate = parseISO(registrationEnd);
    const now = new Date();

    // 마감일이 지났는지 확인 (시간까지 포함)
    if (endDate < now) {
      return "";
    }

    const daysDiff = differenceInDays(endDate, now);

    // 7일 이상 남았으면 빈 문자열 반환
    if (daysDiff >= 7) {
      return "";
    }

    if (isToday(endDate)) {
      return `오늘 ${format(endDate, "HH")}시 마감`;
    } else if (isTomorrow(endDate)) {
      return `내일 ${format(endDate, "HH")}시 마감`;
    } else if (daysDiff > 0) {
      return `${daysDiff}일 후 마감`;
    } else {
      return format(endDate, "M월 d일 HH시 마감", { locale: ko });
    }
  } catch {
    return "";
  }
};
