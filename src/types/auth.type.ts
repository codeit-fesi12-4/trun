export type SignupRequest = {
  email: string;
  password: string;
  name: string;
  companyName: string;
};

export type SigninRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
};

export type SignupResponse = {
  token?: string;
};

export type UserProfile = {
  id: string;
  email: string;
  name: string;
  companyName: string;
  image: string | null;
};

export type UpdateProfile = {
  companyName: string;
  image: string | null;
};
