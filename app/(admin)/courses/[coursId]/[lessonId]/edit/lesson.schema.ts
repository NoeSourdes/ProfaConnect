import { z } from "zod";

export const lessonSchema = z.object({
  title: z.string().max(255),
  courseId: z.string(),
  content: z.string(),
});

export const lessonSchemaPDF = z.object({
  title: z.string().max(255),
  courseId: z.string(),
  url: z.string().url(),
});

export type lessonType = z.infer<typeof lessonSchema>;
export type lessonTypePDF = z.infer<typeof lessonSchemaPDF>;
