import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { postSignin } from "@/api/auth.api";
import { getUserProfileServer } from "@/api/user.api";
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

          const userProfile = await getUserProfileServer(loginResult.data.token);

          if (!userProfile) {
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

          // 사용자 정보만 반환 (토큰은 쿠키에 저장됨)
          return {
            id: String(userProfile.id),
            email: userProfile.email,
            name: userProfile.name,
            companyName: userProfile.companyName,
            image: userProfile.image,
          };
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
      // NextAuth의 signOut 이벤트에서 처리하므로 별도 API 라우트 불필요
      const cookieStore = await cookies();
      cookieStore.delete("api-token");
    },
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // 새로운 로그인 시 사용자 정보만 저장 (토큰 제거)
      if (user) {
        token.id = user.id || "";
        token.email = user.email || "";
        token.name = user.name || "";
        token.companyName = user.companyName || "";
        token.image = user.image ?? null;
        return token;
      }

      // session.update() 호출 시
      if (trigger === "update" && session?.user) {
        token.name = session.user.name;
        token.companyName = session.user.companyName;
        token.image = session.user.image ?? null;
      }

      // 기존 세션 유지
      return token;
    },
    async session({ session, token }) {
      // 세션에 사용자 정보만 포함 (토큰 제거)
      if (token.email && token.name && token.companyName) {
        const user = session.user;
        user.id = Number(token.id) || 0;
        user.email = token.email;
        user.name = token.name;
        user.companyName = token.companyName;
        user.image = token.image ?? null;
      }
      return session;
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
