import { Moim, MoimCardData } from "@/types/moim.type";
import { formatDate, formatTime, formatDeadline } from "@/utils/date.util";

// Moim 타입을 MoimCardData 타입으로 변환
export const convertMoimToMoimCardData = (moim: Moim): MoimCardData => {
  // 참가자 수가 5명 이상이고 취소되지 않았으면 확정, 아니면 null
  const status: "confirmed" | null =
    moim.canceledAt === null && moim.participantCount >= 5 ? "confirmed" : null;

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
