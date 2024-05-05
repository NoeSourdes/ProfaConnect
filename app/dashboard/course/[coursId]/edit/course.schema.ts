import { z } from "zod";

export const courseSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  published: z.boolean(),
  category: z.string().optional(),
});

export type CourseType = z.infer<typeof courseSchema>;
