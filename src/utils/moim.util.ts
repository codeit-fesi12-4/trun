import { format, parseISO, differenceInDays, isToday, isTomorrow } from "date-fns";
import { ko } from "date-fns/locale";
import { Moim } from "@/types/moim.type";
import { MoimCardData } from "@/constants";

// ISO 8601 날짜 문자열을 "1월 7일" 형식으로 변환
const formatDate = (dateString: string): string => {
  try {
    const date = parseISO(dateString);
    return format(date, "M월 d일", { locale: ko });
  } catch {
    return dateString;
  }
};

// ISO 8601 날짜 문자열을 "17:30" 형식으로 변환
const formatTime = (dateString: string): string => {
  try {
    const date = parseISO(dateString);
    return format(date, "HH:mm");
  } catch {
    return dateString;
  }
};

// 모집 마감일을 "오늘 21시 마감" 형식으로 변환
// 마감일이 지났거나 31일 이상 남았으면 빈 문자열 반환
const formatDeadline = (registrationEnd: string): string => {
  try {
    const endDate = parseISO(registrationEnd);
    const now = new Date();

    // 마감일이 지났는지 확인 (시간까지 포함)
    if (endDate < now) {
      return "";
    }

    const daysDiff = differenceInDays(endDate, now);

    // 31일 이상 남았으면 빈 문자열 반환
    if (daysDiff >= 31) {
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

// Moim 타입을 MoimCardData 타입으로 변환
export const convertMoimToMoimCardData = (moim: Moim): MoimCardData => {
  // 참가자 수가 정원과 같으면 확정, 취소되지 않았으면 확정, 아니면 null
  const status: "confirmed" | null =
    moim.canceledAt === null && moim.participantCount === moim.capacity ? "confirmed" : null;

  return {
    id: String(moim.id),
    imageUrl: moim.image,
    deadlineText: formatDeadline(moim.registrationEnd),
    title: moim.name,
    subtitle: moim.location,
    date: formatDate(moim.dateTime),
    time: formatTime(moim.dateTime),
    participants: moim.participantCount,
    maxParticipants: moim.capacity,
    status,
    isFavorite: false, // API에 없으므로 기본값 false
  };
};

// Moim 배열을 MoimCardData 배열로 변환
export const convertMoimsToMoimCardData = (moims: Moim[]): MoimCardData[] =>
  moims.map(convertMoimToMoimCardData);
