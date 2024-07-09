import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "../prisma";

export const {
  auth: baseAuth,
  handlers,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [GithubProvider, GoogleProvider],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      return session;
    },
  },
  events: {
    async createUser({ user }) {
      if (user.id) {
        await prisma.userProfile.create({
          data: {
            userId: user.id,
            role: "STUDENT",
            createdAt: new Date(),
            level: "HIGH_SCHOOL",
            onboarded: false,
          },
        });
      }
    },
  },
});
