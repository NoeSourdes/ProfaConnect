"use server";

import { prisma } from "@/src/lib/prisma";

export const getUpcomingEventAction = async (userId: string) => {
  const events = await prisma.event.findMany({
    where: {
      userId,
    },
  });

  return events;
};
