// src/utils/mypage.util.ts
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
