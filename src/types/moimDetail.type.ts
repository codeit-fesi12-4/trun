export type GetParticipantsResponse = Participant[];

export type Participant = {
  teamId: string;
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

export type PostJoinResponse = {
  message: string;
};

export type DeleteJoinResponse = {
  message: string;
};
