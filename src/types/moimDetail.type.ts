export type GetMoimResponse = {
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

export type GetParticipantsResponse = Participant[];

export type Participant = {
  teamId: string;
  userId: number;
  gatheringId: number;
  joinedAt: string;
  User: User;
};

export type User = {
  id: number;
  email: string;
  name: string;
  companyName: string;
  image: string | null;
};
