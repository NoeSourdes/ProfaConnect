import { z } from "zod";

export const createCourseSchema = z.object({
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

export const courseSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  published: z.boolean().nullable(),
  category: z.string().nullable(),
  author: z
    .object({
      id: z.string(),
      name: z.string().nullable(),
      email: z.string().nullable(),
      emailVerified: z.union([z.boolean(), z.date().nullable()]),
      image: z.string().nullable(),
      role: z.string(),
    })
    .nullable(),
});

export type CreateCourseType = z.infer<typeof createCourseSchema>;
export type CourseType = z.infer<typeof courseSchema>;
