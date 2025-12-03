export type TProfileCardProps = {
  teamId?: number;
  id?: number;
  email: string;
  name: string;
  companyName: string;
  image: string;
};

export type MoimType = "DALLAEMFIT" | "OFFICE_STRETCHING" | "MINDFULNESS" | "WORKATION";

export type MoimStatus = "이용 예정" | "개설 확정" | "개설 대기" | "이용 완료";

export type TMyPageCardProps = {
  teamId: number;
  id: number;
  type: MoimType;
  name: string;
  dateTime: string;
  registrationEnd: string;
  location: string;
  participantCount: number;
  capacity: number;
  image: string;
  status?: MoimStatus | MoimStatus[];
  createdBy: number;
  canceledAt: string | null;
  joinedAt?: string;
  isCompleted?: boolean;
  isReviewed?: boolean;
};

export type TReviewCardProps = {
  id: number;
  image: string;
  name: string;
  location: string;
  dateTime: string;
  score?: number;
  comment?: string;
};
