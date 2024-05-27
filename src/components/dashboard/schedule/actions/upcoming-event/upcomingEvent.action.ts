"use server";

import { prisma } from "@/src/lib/prisma";

export const getUpcomingEventAction = async (userId: string) => {
  const events = await prisma.event.findMany({
    where: {
      userId,
    },
    select: {
      id: true,
      title: true,
      description: true,
      date: true,
      start: true,
      end: true,
      startTime: true,
      endTime: true,
      color: true,
      categoryId: true,
      category: {
        select: {
          name: true,
        },
      },
    },
  });

  return events;
};
