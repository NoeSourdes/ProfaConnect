import { z } from "zod";

export const fileSchema = z.object({
  title: z.string().max(255),
  folderId: z.string().optional(),
  content: z.string(),
});

export const fileSchemaPDF = z.object({
  title: z.string().max(255),
  folderId: z.string().optional(),
  url: z.string().url(),
});

export const fileShemaGlobal = z.object({
  fileId: z.string(),
  document: z.string().nullable().optional(),
  updatedAt: z.date().optional(),
  title: z.string().max(255),
  folderId: z.string().optional().nullable(),
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

export type fileType = z.infer<typeof fileSchema>;
export type fileTypePDF = z.infer<typeof fileSchemaPDF>;
export type fileTypeGlobal = z.infer<typeof fileShemaGlobal>;
