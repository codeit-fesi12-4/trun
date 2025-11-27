export interface IMoimInformation {
  teamId: string;
  id: number;
  type: string;
  name: string;
  dateTime: string;
  registrationEnd: string;
  location: string;
  participantCount: number;
  capacity: number;
  image: string;
  createdBy: number;
  canceledAt: string | null;
}

export const MOIM_INFORMATION = {
  teamId: "trun",
  id: 3654,
  type: "OFFICE_STRETCHING",
  name: "ㄹㄹㄹ",
  dateTime: "2025-11-29T02:29:47.898Z",
  registrationEnd: "오늘 21시 마감",
  location: "건대입구",
  participantCount: 0,
  capacity: 6,
  image: "/images/running-1.png",
  createdBy: 2566,
  canceledAt: null,
};
