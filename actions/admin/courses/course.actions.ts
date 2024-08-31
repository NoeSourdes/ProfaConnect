"use server";

import { prisma } from "@/src/lib/prisma";
import { userAction } from "@/src/lib/safe-actions";
import { z } from "zod";
import { createCourseSchema } from "./course.schema";

export const createCourseAction = userAction(
  createCourseSchema,
  async (inputs, context) => {
    const course = await prisma.course.create({
      data: {
        ...inputs,
        authorId: context.user.id,
      },
    });
    return course;
  }
);

export const getUserCourses = async (authorId: string) => {
  const courses = await prisma.course.findMany({
    where: {
      authorId,
    },
    include: {
      author: true,
    },
  });
  return courses;
};

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

export const updateCourseAction = userAction(
  z.object({
    id: z.string(),
    data: createCourseSchema,
  }),
  async (inputs, context) => {
    const upadteCourse = await prisma.course.update({
      where: {
        id: inputs.id,
        authorId: context.user.id,
      },
      data: inputs.data,
    });
    return upadteCourse;
  }
);

export const deleteCourseAction = userAction(
  z.string(),
  async (id, context) => {
    const course = await prisma.course.findUnique({
      where: {
        id: id,
        authorId: context.user.id,
      },
    });

    if (!course) {
      throw new Error("Course not found");
    }
    await prisma.lesson.deleteMany({
      where: {
        courseId: id,
      },
    });
    const deletedCourse = await prisma.course.delete({
      where: {
        id: id,
        authorId: context.user.id,
      },
    });

    return deletedCourse;
  }
);

export const checkTitleCourseAction = async (title: string) => {
  const courseTitle = await prisma.course.findFirst({
    where: {
      title,
    },
  });

  if (courseTitle) {
    return true;
  }
};

export const renameCourseAction = userAction(
  z.object({
    id: z.string(),
    name: z.string(),
  }),
  async (inputs, context) => {
    const course = await prisma.course.update({
      where: {
        id: inputs.id,
        authorId: context.user.id,
      },
      data: {
        title: inputs.name,
      },
    });
    return course;
  }
);