import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { postSignin } from "@/api/auth.api";
import { getUserProfile } from "@/api/user.api";
import type { NextAuthOptions } from "next-auth";
import { TEAM_NAME } from "@/constants/env";

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

          if (!loginResult.token) {
            return null;
          }

          const userProfile = await getUserProfile(TEAM_NAME, loginResult.token);

          if (!userProfile) {
            return null;
          }

          return {
            id: String(userProfile.id),
            email: userProfile.email,
            name: userProfile.name,
            companyName: userProfile.companyName,
            image: userProfile.image,
            token: loginResult.token,
          };
        } catch (error) {
          console.error("Login error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // 새로운 로그인 시 토큰 업데이트
      if (user) {
        token.id = user.id || "";
        token.email = user.email || "";
        token.name = user.name || "";
        token.companyName = user.companyName || "";
        token.image = user.image ?? null;
        token.accessToken = user.token;
        return token;
      }

      // 기존 세션에서 토큰이 없으면 빈 토큰 반환
      if (!token.accessToken) {
        return { ...token, accessToken: undefined };
      }

      return token;
    },
    async session({ session, token }) {
      // 토큰이 없으면 세션에서 토큰 제거 (API 호출 시 401 에러 발생하여 apiClient에서 자동 로그아웃)
      if (!token.accessToken) {
        session.token = undefined;
        return session;
      }

      if (token.email && token.name && token.companyName) {
        const user = session.user;
        user.id = Number(token.id) || 0;
        user.email = token.email;
        user.name = token.name;
        user.companyName = token.companyName;
        user.image = token.image ?? null;
      }
      session.token = token.accessToken;
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
