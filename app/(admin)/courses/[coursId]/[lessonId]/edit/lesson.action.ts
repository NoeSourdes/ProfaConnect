"use server";

import { prisma } from "@/src/lib/prisma";
import { userAction } from "@/src/lib/safe-actions";
import { z } from "zod";
import { lessonSchema, lessonSchemaPDF } from "./lesson.schema";

export const createLesson = userAction(
  lessonSchema,
  async (inputs, context) => {
    const content = JSON.parse(inputs.content);
    const lesson = await prisma.lesson.create({
      data: {
        title: inputs.title,
        document: content,
        courseId: inputs.courseId,
        authorId: context.user.id,
      },
    });
    return lesson;
  }
);

export const updateLesson = userAction(
  z.object({
    id: z.string(),
    data: lessonSchema,
  }),
  async (inputs, context) => {
    const lesson = await prisma.lesson.update({
      where: {
        lessonId: inputs.id,
        authorId: context.user.id,
      },
      data: {
        title: inputs.data.title,
        document: JSON.parse(inputs.data.content),
      },
    });
    return lesson;
  }
);

export const createLesssonPDF = userAction(
  lessonSchemaPDF,
  async (inputs, context) => {
    const lesson = await prisma.lesson.create({
      data: {
        title: inputs.title,
        url: inputs.url,
        courseId: inputs.courseId,
        authorId: context.user.id,
      },
    });
    return lesson;
  }
);

export const updateLessonPdf = userAction(
  z.object({
    id: z.string(),
    data: lessonSchemaPDF,
  }),
  async (inputs, context) => {
    const lesson = await prisma.lesson.update({
      where: {
        lessonId: inputs.id,
        authorId: context.user.id,
      },
      data: {
        title: inputs.data.title,
        url: inputs.data.url,
      },
    });
    return lesson;
  }
);

export const getlessons = async (id: string) => {
  // return Promise.reject("Une erreur est survenue");

  const lessons = await prisma.lesson.findMany({
    where: {
      courseId: id,
    },
    include: {
      author: true,
    },
  });

  const lessonsWithoutAuthorId = lessons.map(
    ({ authorId, document, url, ...lesson }) => ({
      ...lesson,
      document:
        typeof document === "string"
          ? document
          : document === null
          ? null
          : undefined,
      url: url ?? null,
    })
  );

  return lessonsWithoutAuthorId;
};

export const deleteLessonAction = userAction(
  z.string(),
  async (id, context) => {
    const lesson = await prisma.lesson.findUnique({
      where: {
        lessonId: id,
        authorId: context.user.id,
      },
    });

    if (!lesson) {
      throw new Error("Lesson not found");
    }

    const deletedLesson = await prisma.lesson.delete({
      where: {
        lessonId: id,
      },
    });
    return deletedLesson;
  }
);

export const checkTitleLessonAction = async (title: string) => {
  const lessonTitle = await prisma.lesson.findFirst({
    where: {
      title,
    },
  });

  if (lessonTitle) {
    return true;
  }
};

export const getLesson = async (id: string) => {
  const lesson = await prisma.lesson.findUnique({
    where: {
      lessonId: id,
    },
  });

  return lesson;
};

export const getNameLesson = async (id: string) => {
  const lesson = await prisma.lesson.findUnique({
    where: {
      lessonId: id,
    },
  });

  return lesson;
};

export const renameLessonAction = userAction(
  z.object({
    id: z.string(),
    name: z.string(),
  }),
  async (inputs, context) => {
    const lesson = await prisma.lesson.update({
      where: {
        lessonId: inputs.id,
        authorId: context.user.id,
      },
      data: {
        title: inputs.name,
      },
    });
    return lesson;
  }
);
