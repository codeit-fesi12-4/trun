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

export const PARTICIPANTS = [
  {
    teamId: "trun",
    userId: 2569,
    gatheringId: 3654,
    joinedAt: "2025-11-27T08:43:23.443Z",
    User: {
      id: 2569,
      email: "bb@gmail.com",
      name: "bb",
      companyName: "bb",
      image: "/images/profile2.jpg",
    },
  },
  {
    teamId: "trun",
    userId: 2570,
    gatheringId: 3654,
    joinedAt: "2025-11-27T08:44:46.270Z",
    User: {
      id: 2570,
      email: "bbb@gmail.com",
      name: "bbb",
      companyName: "bbb",
      image: "/images/profile3.jpg",
    },
  },
  {
    teamId: "trun",
    userId: 2571,
    gatheringId: 3654,
    joinedAt: "2025-11-27T08:43:23.443Z",
    User: {
      id: 2569,
      email: "bb@gmail.com",
      name: "bb",
      companyName: "bb",
      image: "/images/profile4.jpg",
    },
  },
  {
    teamId: "trun",
    userId: 2572,
    gatheringId: 3654,
    joinedAt: "2025-11-27T08:44:46.270Z",
    User: {
      id: 2570,
      email: "bbb@gmail.com",
      name: "bbb",
      companyName: "bbb",
      image: "/images/profile4.jpg",
    },
  },
  {
    teamId: "trun",
    userId: 2573,
    gatheringId: 3654,
    joinedAt: "2025-11-27T08:43:23.443Z",
    User: {
      id: 2569,
      email: "bb@gmail.com",
      name: "bb",
      companyName: "bb",
      image: "/images/profile2.jpg",
    },
  },
  {
    teamId: "trun",
    userId: 2574,
    gatheringId: 3654,
    joinedAt: "2025-11-27T08:43:23.443Z",
    User: {
      id: 2569,
      email: "bb@gmail.com",
      name: "bb",
      companyName: "bb",
      image: "/images/profile4.jpg",
    },
  },
];
