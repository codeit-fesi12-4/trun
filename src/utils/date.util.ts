import { format, parseISO, differenceInDays, isToday, isTomorrow } from "date-fns";
import { ko } from "date-fns/locale";

// Date 객체를 ISO 8601 형식으로 변환 (YYYY-MM-DDTHH:MM:SS.SSSZ)
// toISOString()을 사용하면 자동으로 UTC 시간으로 변환되고 Z가 붙음
export const dateToISO = (date: Date): string => date.toISOString();

// Date 객체를 "yyyy-MM-dd hh:mm a" 형식으로 변환 (DatePicker용)
export const formatDatePicker = (dateValue: Date | undefined): string => {
  if (!dateValue) return "";
  return format(dateValue, "yyyy-MM-dd hh:mm a", { locale: ko });
};

// ISO 8601 날짜 문자열을 "1월 7일" 형식으로 변환
export const formatDate = (dateString: string): string => {
  try {
    const date = parseISO(dateString);
    return format(date, "M월 d일", { locale: ko });
  } catch {
    return dateString;
  }
};

// ISO 8601 날짜 문자열을 "17:30" 형식으로 변환
export const formatTime = (dateString: string): string => {
  try {
    const date = parseISO(dateString);
    return format(date, "HH:mm");
  } catch {
    return dateString;
  }
};

// 모집 마감일을 "오늘 21시 마감" 형식으로 변환
// 마감일이 지났거나 31일 이상 남았으면 빈 문자열 반환
export const formatDeadline = (registrationEnd: string): string => {
  try {
    const endDate = parseISO(registrationEnd);
    const now = new Date();

    // 마감일이 지났는지 확인 (시간까지 포함)
    if (endDate < now) {
      return "";
    }

    const daysDiff = differenceInDays(endDate, now);

    // 31일 이상 남았으면 빈 문자열 반환
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
