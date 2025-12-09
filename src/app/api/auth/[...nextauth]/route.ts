import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getUserProfile, postSignin } from "@/api/auth.api";
import type { NextAuthOptions } from "next-auth";
import { TEAM_NAME } from "@/constants";

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

          if (!loginResult?.token) {
            return null;
          }

          const userProfile = await getUserProfile(TEAM_NAME, loginResult.token);

          if (!userProfile) {
            return null;
          }

          return {
            id: userProfile.id,
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
      if (user) {
        token.id = user.id || "";
        token.email = user.email || "";
        token.name = user.name || "";
        token.companyName = user.companyName || "";
        token.image = user.image ?? null;
        token.accessToken = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.email && token.name && token.companyName) {
        session.user.id = token.id || "";
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.companyName = token.companyName;
        session.user.image = token.image ?? null;
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
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
