import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { postSignin } from "@/api/auth.api";
import type { NextAuthOptions } from "next-auth";
import { cookies } from "next/headers";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const loginResult = await postSignin({
            email: credentials.email,
            password: credentials.password,
          });

          // API 에러 처리
          if (!loginResult.ok) {
            console.error("Login failed:", loginResult.message);
            return null;
          }

          if (!loginResult.data.token) {
            return null;
          }

          // 외부 API 토큰을 HttpOnly 쿠키에 저장 (서버 사이드에서만 가능)
          const cookieStore = await cookies();
          cookieStore.set("api-token", loginResult.data.token, {
            httpOnly: true, // 클라이언트에서 접근 불가 (보안)
            secure: process.env.NODE_ENV === "production", // HTTPS에서만 전송
            sameSite: "lax", // CSRF 방지
            maxAge: 24 * 60 * 60, // 1일 (24시간)
            path: "/", // 모든 경로에서 접근 가능
          });

          // NextAuth는 토큰만 관리
          return { id: "authenticated" };
        } catch (error) {
          console.error("Login error:", error);
          return null;
        }
      },
    }),
  ],
  events: {
    async signOut() {
      // 로그아웃 시 토큰 쿠키도 함께 삭제
      const cookieStore = await cookies();
      cookieStore.delete("api-token");
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 1일 (24시간)
  },
  jwt: {
    maxAge: 24 * 60 * 60, // 1일 (24시간)
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
