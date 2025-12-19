import { Moim } from "@/types/moim.type";

// 모임 상세 정보 요청 응답
export type GetMoimResponse = Moim;

// 모임 참가자 정보 요청 응답
export type GetParticipantsResponse = Participant[];

// 모임 참여 응답
export type PostJoinResponse = {
  message: string;
};

// 모임 참여 취소 응답 (신청자)
export type DeleteJoinResponse = {
  message: string;
};

// 모임 취소 응답 (주최자)
export type PutMoimResponse = {
  teamId: number;
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
  canceledAt: string;
};

export type Participant = {
  userId: number;
  gatheringId: number;
  joinedAt: string;
  User: User;
};

// auth.type.ts 참고
export type User = {
  id: number;
  email: string;
  name: string;
  companyName: string;
  image: string | null;
};
