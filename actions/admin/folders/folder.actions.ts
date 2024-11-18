"use server";

import { prisma } from "@/src/lib/prisma";
import { authAction } from "@/src/lib/safe-actions";
import { z } from "zod";
import { createFolderSchema } from "./folder.schema";

// Création d'un dossier
export const createFolderAction = authAction
  .schema(createFolderSchema)
  .action(async ({ parsedInput: inputs, ctx }) => {
    const folder = await prisma.folders.create({
      data: {
        ...inputs,
        authorId: ctx.user.id,
      },
    });
    return folder;
  });

// Récupération des dossiers d'un utilisateur
export const getUserFolders = async (authorId: string) => {
  const folders = await prisma.folders.findMany({
    where: {
      authorId,
    },
    include: {
      author: true,
    },
  });
  return folders;
};

// Récupération du nom d'un dossier
export const getNameFolder = async (id: string) => {
  return await prisma.folders.findUnique({
    where: {
      id: id,
    },
    select: {
      title: true,
    },
  });
};

// Mise à jour d'un dossier
export const updateFolderAction = authAction
  .schema(
    z.object({
      id: z.string(),
      data: createFolderSchema,
    })
  )
  .action(async ({ parsedInput: { id, data }, ctx }) => {
    const updatedFolder = await prisma.folders.update({
      where: {
        id: id,
        authorId: ctx.user.id,
      },
      data,
    });
    return updatedFolder;
  });

// Suppression d'un dossier
export const deleteFolderAction = authAction
  .schema(z.string())
  .action(async ({ parsedInput: id, ctx }) => {
    const folder = await prisma.folders.findUnique({
      where: {
        id: id,
        authorId: ctx.user.id,
      },
    });

    if (!folder) {
      throw new Error("Folder not found");
    }

    // Suppression des fichiers associés
    await prisma.files.deleteMany({
      where: {
        folderId: id,
      },
    });

    const deletedFolder = await prisma.folders.delete({
      where: {
        id: id,
        authorId: ctx.user.id,
      },
    });

    return deletedFolder;
  });

// Vérification de l'existence d'un titre de dossier
export const checkTitleFolderAction = async (title: string) => {
  const folderTitle = await prisma.folders.findFirst({
    where: {
      title,
    },
  });

  return !!folderTitle;
};

// Renommage d'un dossier
export const renameFolderAction = authAction
  .schema(
    z.object({
      id: z.string(),
      name: z.string(),
    })
  )
  .action(async ({ parsedInput: { id, name }, ctx }) => {
    const folder = await prisma.folders.update({
      where: {
        id: id,
        authorId: ctx.user.id,
      },
      data: {
        title: name,
      },
    });
    return folder;
  });
