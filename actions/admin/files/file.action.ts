"use server";

import { prisma } from "@/src/lib/prisma";
import { authAction } from "@/src/lib/safe-actions";
import { z } from "zod";
import { fileSchema, fileSchemaPDF } from "./file.schema";

// Création d'un fichier
export const createFile = authAction
  .schema(fileSchema)
  .action(async ({ parsedInput: inputs, ctx }) => {
    const content = JSON.parse(inputs.content);
    const file = await prisma.files.create({
      data: {
        title: inputs.title,
        document: content,
        folderId: inputs.folderId === "" ? null : inputs.folderId,
        authorId: ctx.user.id,
        format: "text",
        size: 45678,
      },
    });
    return file;
  });

// Mise à jour d'un fichier
export const updateFile = authAction
  .schema(
    z.object({
      id: z.string(),
      data: fileSchema,
    })
  )
  .action(async ({ parsedInput: { id, data }, ctx }) => {
    const file = await prisma.files.update({
      where: {
        fileId: id,
        authorId: ctx.user.id,
      },
      data: {
        title: data.title,
        document: JSON.parse(data.content),
      },
    });
    return file;
  });

// Création d'un fichier PDF
export const createFilePDF = authAction
  .schema(fileSchemaPDF)
  .action(async ({ parsedInput: inputs, ctx }) => {
    const file = await prisma.files.create({
      data: {
        title: inputs.title,
        url: inputs.url,
        folderId: inputs.folderId === "" ? null : inputs.folderId,
        authorId: ctx.user.id,
        format: "pdf",
        size: inputs.size,
      },
    });
    return file;
  });

// Mise à jour d'un fichier PDF
export const updateFilePdf = authAction
  .schema(
    z.object({
      id: z.string(),
      data: fileSchemaPDF,
    })
  )
  .action(async ({ parsedInput: { id, data }, ctx }) => {
    const file = await prisma.files.update({
      where: {
        fileId: id,
        authorId: ctx.user.id,
      },
      data: {
        title: data.title,
        url: data.url,
      },
    });
    return file;
  });

// Récupération des fichiers par dossier
export const getFilesFolderId = async (id: string) => {
  const files = await prisma.files.findMany({
    where: {
      folderId: id,
    },
    include: {
      author: true,
    },
  });

  const filesWithoutAuthorId = files.map(
    ({ authorId, document, url, ...file }) => ({
      ...file,
      document:
        typeof document === "string"
          ? document
          : document === null
          ? null
          : undefined,
      url: url ?? null,
    })
  );

  return filesWithoutAuthorId;
};

// Récupération des fichiers d'un utilisateur
export const getUserFiles = async (authorId: string) => {
  const files = await prisma.files.findMany({
    where: {
      authorId,
    },
    include: {
      author: true,
    },
  });
  return files;
};

// Suppression d'un fichier
export const deleteFileAction = authAction
  .schema(z.string())
  .action(async ({ parsedInput: id, ctx }) => {
    const file = await prisma.files.findUnique({
      where: {
        fileId: id,
        authorId: ctx.user.id,
      },
    });

    if (!file) {
      throw new Error("File not found");
    }

    const deletedFile = await prisma.files.delete({
      where: {
        fileId: id,
      },
    });
    return deletedFile;
  });

// Vérification du titre d'un fichier
export const checkTitleFileAction = async (title: string) => {
  const fileTitle = await prisma.files.findFirst({
    where: {
      title,
    },
  });

  if (fileTitle) {
    return true;
  }
};

// Récupération d'un fichier par dossier
export const getFileFolderId = async (id: string) => {
  const file = await prisma.files.findUnique({
    where: {
      fileId: id,
    },
  });

  return file;
};

// Récupération du nom d'un fichier
export const getNameFile = async (id: string) => {
  const file = await prisma.files.findUnique({
    where: {
      fileId: id,
    },
  });

  return file;
};

// Renommage d'un fichier
export const renameFileAction = authAction
  .schema(
    z.object({
      id: z.string(),
      name: z.string(),
    })
  )
  .action(async ({ parsedInput: { id, name }, ctx }) => {
    const file = await prisma.files.update({
      where: {
        fileId: id,
        authorId: ctx.user.id,
      },
      data: {
        title: name,
      },
    });
    return file;
  });

// Récupération d'un fichier par titre
export const getFile = authAction
  .schema(
    z.object({
      title: z.string(),
    })
  )
  .action(async ({ parsedInput: { title }, ctx }) => {
    const file = await prisma.files.findFirst({
      where: {
        title: title,
        authorId: ctx.user.id,
      },
    });

    if (!file) {
      throw new Error("File not found");
    }

    return file;
  });
