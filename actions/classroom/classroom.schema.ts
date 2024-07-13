import { z } from "zod";

export const createClassroomSchema = z.object({
  title: z.string({
    message: "Le titre est obligatoire",
  }),
  description: z.string({
    message: "La description est obligatoire",
  }),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type CreateClassroomType = z.infer<typeof createClassroomSchema>;
