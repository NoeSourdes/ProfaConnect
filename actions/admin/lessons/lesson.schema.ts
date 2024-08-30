import { z } from "zod";

export const lessonSchema = z.object({
  title: z.string().max(255),
  courseId: z.string().optional(),
  content: z.string(),
});

export const lessonSchemaPDF = z.object({
  title: z.string().max(255),
  courseId: z.string().optional(),
  url: z.string().url(),
});

export const lessonShemaGlobal = z.object({
  lessonId: z.string(),
  document: z.string().nullable().optional(),
  updatedAt: z.date().optional(),
  title: z.string().max(255),
  courseId: z.string().optional().nullable(),
  content: z.string().optional(),
  url: z.string().url().nullable().optional(),
  author: z
    .object({
      id: z.string(),
      name: z.string().nullable(),
      email: z.string().nullable(),
      emailVerified: z.union([z.boolean(), z.date().nullable()]),
      image: z.string().nullable(),
    })
    .nullable(),
});

export type lessonType = z.infer<typeof lessonSchema>;
export type lessonTypePDF = z.infer<typeof lessonSchemaPDF>;
export type lessonTypeGlobal = z.infer<typeof lessonShemaGlobal>;
