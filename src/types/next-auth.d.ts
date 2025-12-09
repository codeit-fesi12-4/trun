import "next-auth";
import { UserProfile } from "@/types/auth.type";

declare module "next-auth" {
  interface Session {
    user: UserProfile;
    token?: string; // API 토큰
  }

  interface User extends UserProfile {
    token?: string; // API 토큰
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    email?: string;
    name?: string;
    companyName?: string;
    image?: string | null;
    accessToken?: string; // API 토큰
  }
}
