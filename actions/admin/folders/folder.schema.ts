import { z } from "zod";

export const createFolderSchema = z.object({
  title: z.string({
    message: "Le titre est obligatoire",
  }),
  description: z
    .string({
      message: "La description est obligatoire",
    })
    .optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  published: z.boolean().optional(),
  category: z.string().optional(),
});

export const folderSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  published: z.boolean().nullable(),
  category: z.string().nullable(),
  author: z
    .object({
      id: z.string(),
      name: z.string().nullable(),
      email: z.string().nullable(),
      image: z.string().nullable(),
    })
    .nullable(),
});

export type CreateFolderType = z.infer<typeof createFolderSchema>;
export type FolderType = z.infer<typeof folderSchema>;
