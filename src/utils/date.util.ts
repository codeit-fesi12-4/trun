import { format, parseISO } from "date-fns";
import { ko } from "date-fns/locale";

// Date 객체를 ISO 8601 형식으로 변환 (YYYY-MM-DDTHH:MM:SS.SSSZ)
// toISOString()을 사용하면 자동으로 UTC 시간으로 변환되고 Z가 붙음
export const dateToISO = (date: Date): string => date.toISOString();

// Date 객체를 "yyyy-MM-dd hh:mm a" 형식으로 변환 (DatePicker용)
export const formatDatePicker = (dateValue: Date | undefined): string => {
  if (!dateValue) return "";
  return format(dateValue, "yyyy-MM-dd hh:mm a", { locale: ko });
};

// Date 객체를 "yyyy/MM/dd" 형식으로 변환 (필터용)
export const formatDateWithSlash = (date: Date): string => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}/${m}/${d}`;
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
