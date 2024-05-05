import { z } from "zod";

export const courseSchema = z.object({
  title: z.string({
    message: "Le titre est obligatoire",
  }),
  description: z.string({
    message: "La description est obligatoire",
  }),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  published: z.boolean().optional(),
  category: z.string().optional(),
});

export type CourseType = z.infer<typeof courseSchema>;
