import { MoimStatus, MypageMoim } from "@/types/mypage.type";

export const formatDateTime = (isoString: string) => {
  if (!isoString) return { date: "", time: "", full: "" };

  const date = new Date(isoString);
  if (isNaN(date.getTime())) return { date: "", time: "", full: "" };

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return {
    date: `${month}월 ${day}일`,
    time: `${hours}:${minutes}`,
    full: `${year}.${month}.${day}`,
  };
};

// 상태별 배지 스타일
const statusToClassName: Record<MoimStatus, string> = {
  "이용 예정": "bg-green-100 text-green-600",
  "개설 확정": "bg-white text-green-600 border-[var(--gradient-500)]",
  "개설 대기": "border-gray-200 text-gray-500 bg-white",
  "이용 완료": "bg-gray-100 text-gray-600 text-md",
};

export const getMoimStatusClass = (status: MoimStatus) => statusToClassName[status];

// 메인/서브 상태 반환
export const getMeetingStatus = (item: MypageMoim) => {
  const now = new Date();
  const dateTime = new Date(item.dateTime);

  // 날짜가 이상한 경우 기본값(안전한 상태)
  if (isNaN(dateTime.getTime())) {
    return {
      main: "개설 대기",
      sub: null,
    } as const;
  }

  // 이용 완료
  if (item.isCompleted) {
    return {
      main: "이용 완료",
      sub: null,
    } as const;
  }

  // 시작 전
  if (now < dateTime) {
    const isFull = item.participantCount >= item.capacity;

    return {
      main: isFull ? "개설 확정" : "개설 대기",
      sub: "이용 예정",
    } as const;
  }

  // 그 외: 이용 완료 처리
  return {
    main: "이용 완료",
    sub: null,
  } as const;
};

// 나의 모임 정렬
// 정렬 순서: 이용 예정 -> 이용 완료 -> 모집 취소
export const sortMyMoims = (a: MypageMoim, b: MypageMoim): number => {
  // 모집 취소 항상 최하단
  if (a.canceledAt && !b.canceledAt) return 1;
  if (!a.canceledAt && b.canceledAt) return -1;

  // 이용 예정 우선
  if (!a.isCompleted && b.isCompleted) return -1; // a가 이용 예정이면 앞으로
  if (a.isCompleted && !b.isCompleted) return 1; // a가 이용 완료면 뒤로

  // 같은 상태 내에서 최신순
  return new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime();
};
