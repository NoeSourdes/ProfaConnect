import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "../prisma";

export const { auth: baseAuth, handlers } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  // pages: {
  //   signIn: "/sign-in",
  //   error: "/sign-in",
  // },
  providers: [GithubProvider, GoogleProvider],
});
