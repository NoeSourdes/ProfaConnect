"use server";

import { prisma } from "@/src/lib/prisma";
import { userAction } from "@/src/lib/safe-actions";
import { z } from "zod";
import { courseSchema } from "./course.schema";

export const createCourseAction = userAction(
  courseSchema,
  async (inputs, context) => {
    const course = await prisma.course.create({
      data: {
        ...inputs,
        userId: context.user.id,
      },
    });
    return course;
  }
);

export const getUserCourses = async (userId: string) => {
  // return Promise.reject("Une erreur est survenue");

  const courses = await prisma.course.findMany({
    where: {
      userId,
    },
  });
  return courses;
};

export const updateCourseAction = userAction(
  z.object({
    id: z.string(),
    data: courseSchema,
  }),
  async (inputs, context) => {
    const upadteCourse = await prisma.course.update({
      where: {
        id: inputs.id,
        userId: context.user.id,
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
        userId: context.user.id,
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
        userId: context.user.id,
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
