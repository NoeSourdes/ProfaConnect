"use server";

import { prisma } from "@/src/lib/prisma";

export const getNameCourse = async (id: string) => {
  return await prisma.course.findUnique({
    where: {
      id: id,
    },
    select: {
      title: true,
    },
  });
};
