"use server";

import { prisma } from "@/src/lib/prisma";
import { authAction } from "@/src/lib/safe-actions";
import { z } from "zod";

// Mise à jour du profil utilisateur
export const updateUserAction = authAction
  .schema(
    z.object({
      role: z.string(),
      level: z.string(),
      gender: z.string(),
    })
  )
  .action(async ({ parsedInput: data, ctx }) => {
    const userProfile = await prisma.userProfile.update({
      where: {
        userId: ctx.user.id,
      },
      data: {
        publicName:
          data.gender === "BOY"
            ? "M. " + (ctx.user.name?.split(" ")[1] ?? "")
            : data.gender === "GIRL"
            ? "Mme. " + (ctx.user.name?.split(" ")[1] ?? "")
            : "Mx. " + (ctx.user.name?.split(" ")[1] ?? ""),
        role: data.role,
        level: data.level,
        onboarded: true,
      },
    });
    return userProfile;
  });

// Récupération d'un profil utilisateur
export const getUserProfileAction = authAction
  .schema(z.string())
  .action(async ({ parsedInput: userId, ctx }) => {
    const userProfile = await prisma.userProfile.findUnique({
      where: {
        userId,
      },
    });
    return userProfile;
  });

// Récupération de tous les enseignants
export const getAllTeachersAction = async () => {
  const teachers = await prisma.userProfile.findMany({
    where: {
      role: "TEACHER",
    },
  });
  return teachers;
};
