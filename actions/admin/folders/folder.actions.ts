"use server";

import { prisma } from "@/src/lib/prisma";
import { userAction } from "@/src/lib/safe-actions";
import { z } from "zod";
import { createFolderSchema } from "./folder.schema";

export const createFolderAction = userAction(
  createFolderSchema,
  async (inputs, context) => {
    const folder = await prisma.folders.create({
      data: {
        ...inputs,
        authorId: context.user.id,
      },
    });
    return folder;
  }
);

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

export const updateFolderAction = userAction(
  z.object({
    id: z.string(),
    data: createFolderSchema,
  }),
  async (inputs, context) => {
    const upadteFolder = await prisma.folders.update({
      where: {
        id: inputs.id,
        authorId: context.user.id,
      },
      data: inputs.data,
    });
    return upadteFolder;
  }
);

export const deleteFolderAction = userAction(
  z.string(),
  async (id, context) => {
    const folder = await prisma.folders.findUnique({
      where: {
        id: id,
        authorId: context.user.id,
      },
    });

    if (!folder) {
      throw new Error("Folder not found");
    }
    await prisma.files.deleteMany({
      where: {
        folderId: id,
      },
    });
    const deletedFolder = await prisma.folders.delete({
      where: {
        id: id,
        authorId: context.user.id,
      },
    });

    return deletedFolder;
  }
);

export const checkTitleFolderAction = async (title: string) => {
  const folderTitle = await prisma.folders.findFirst({
    where: {
      title,
    },
  });

  if (folderTitle) {
    return true;
  }
};

export const renameFolderAction = userAction(
  z.object({
    id: z.string(),
    name: z.string(),
  }),
  async (inputs, context) => {
    const folder = await prisma.folders.update({
      where: {
        id: inputs.id,
        authorId: context.user.id,
      },
      data: {
        title: inputs.name,
      },
    });
    return folder;
  }
);
