// import "next-auth";
// import { UserProfile } from "@/types/user.type";

// declare module "next-auth" {
//   interface Session {
//     user: UserProfile;
//   }

//   // companyName 등 UserProfile의 모든 필드를 포함
//   interface User extends UserProfile {
//     id: string; // UserProfile의 id는 number이지만, NextAuth는 string을 요구
//   }
// }

// declare module "next-auth/jwt" {
//   interface JWT {
//     id?: string;
//     email?: string;
//     name?: string;
//     companyName?: string;
//     image?: string | null;
//   }
// }
