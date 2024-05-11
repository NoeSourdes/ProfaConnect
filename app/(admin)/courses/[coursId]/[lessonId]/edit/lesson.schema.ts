import { z } from "zod";

export const lessonSchema = z.object({
  title: z.string().max(255),
  courseId: z.string(),
  content: z.any(),
});

export type lessonType = z.infer<typeof lessonSchema>;
