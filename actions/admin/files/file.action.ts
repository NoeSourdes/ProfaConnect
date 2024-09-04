"use server";

import { prisma } from "@/src/lib/prisma";
import { userAction } from "@/src/lib/safe-actions";
import { z } from "zod";
import { fileSchema, fileSchemaPDF } from "./file.schema";

export const createFile = userAction(fileSchema, async (inputs, context) => {
  const content = JSON.parse(inputs.content);
  const file = await prisma.files.create({
    data: {
      title: inputs.title,
      document: content,
      folderId: inputs.folderId === "" ? null : inputs.folderId,
      authorId: context.user.id,
    },
  });
  return file;
});

export const updateFile = userAction(
  z.object({
    id: z.string(),
    data: fileSchema,
  }),
  async (inputs, context) => {
    const file = await prisma.files.update({
      where: {
        fileId: inputs.id,
        authorId: context.user.id,
      },
      data: {
        title: inputs.data.title,
        document: JSON.parse(inputs.data.content),
      },
    });
    return file;
  }
);

export const createFilePDF = userAction(
  fileSchemaPDF,
  async (inputs, context) => {
    const file = await prisma.files.create({
      data: {
        title: inputs.title,
        url: inputs.url,
        folderId: inputs.folderId === "" ? null : inputs.folderId,
        authorId: context.user.id,
      },
    });
    return file;
  }
);

export const updateFilePdf = userAction(
  z.object({
    id: z.string(),
    data: fileSchemaPDF,
  }),
  async (inputs, context) => {
    const file = await prisma.files.update({
      where: {
        fileId: inputs.id,
        authorId: context.user.id,
      },
      data: {
        title: inputs.data.title,
        url: inputs.data.url,
      },
    });
    return file;
  }
);

export const getFilesFolderId = async (id: string) => {
  // return Promise.reject("Une erreur est survenue");

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

export const deleteFileAction = userAction(z.string(), async (id, context) => {
  const file = await prisma.files.findUnique({
    where: {
      fileId: id,
      authorId: context.user.id,
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

export const getFileFolderId = async (id: string) => {
  const file = await prisma.files.findUnique({
    where: {
      fileId: id,
    },
  });

  return file;
};

export const getNameFile = async (id: string) => {
  const file = await prisma.files.findUnique({
    where: {
      fileId: id,
    },
  });

  return file;
};

export const renameFileAction = userAction(
  z.object({
    id: z.string(),
    name: z.string(),
  }),
  async (inputs, context) => {
    const file = await prisma.files.update({
      where: {
        fileId: inputs.id,
        authorId: context.user.id,
      },
      data: {
        title: inputs.name,
      },
    });
    return file;
  }
);
