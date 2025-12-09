export type UserProfile = {
  id: number;
  email: string;
  name: string;
  companyName: string;
  image: string | null;
};

export type UpdateProfile = {
  companyName: string;
  image: string | null;
};
