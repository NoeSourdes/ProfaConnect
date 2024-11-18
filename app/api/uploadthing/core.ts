import { prisma } from "@/src/lib/prisma";

import { requiredCurrentUser } from "@/src/lib/auth/current-user";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { z } from "zod";

const f = createUploadthing();

export const ourFileRouter = {
  pdfUploader: f({ pdf: { maxFileSize: "16MB" } })
    .input(z.object({ configId: z.string().optional() }))
    .middleware(async ({ req }) => {
      const user = await requiredCurrentUser();

      if (!user) throw new UploadThingError("Unauthorized");

      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const createdFile = await prisma.fileUpload.create({
        data: {
          key: file.key,
          name: file.name,
          userId: metadata.userId ?? "",
          url: `https://utfs.io/f/${file.key}`,
          type: file.type,
          size: file.size,
        },
      });
      return createdFile;
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
