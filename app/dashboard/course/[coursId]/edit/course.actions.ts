"use server";

import { prisma } from "@/lib/prisma";
import { userAction } from "@/lib/safe-actions";
import { courseSchema } from "./course.schema";

export const createCourseAction = userAction(
  courseSchema,
  async (inputs, context) => {
    console.log(inputs);
    console.log(context);
    const course = await prisma.course.create({
      data: {
        ...inputs,
        userId: context.user.id,
      },
    });
    return course;
  }
);

export const editCourseAction = async () => {};
