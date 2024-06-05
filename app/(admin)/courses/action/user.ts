"use server";

import { prisma } from "@/src/lib/prisma";

export const getUserData = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  return user;
};
