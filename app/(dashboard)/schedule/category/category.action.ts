"use server";

import { prisma } from "@/src/lib/prisma";
import { authAction } from "@/src/lib/safe-actions";
import { z } from "zod";
import { categorySchema } from "./category.schema";

// Création d'une catégorie
export const createCategoryAction = authAction
  .schema(categorySchema)
  .action(async ({ parsedInput: inputs, ctx }) => {
    const category = await prisma.category.create({
      data: {
        name: inputs.name,
        userId: ctx.user.id as string,
      },
    });
    return category;
  });

// Suppression d'une catégorie
export const deleteCategoryAction = authAction
  .schema(z.string())
  .action(async ({ parsedInput: id, ctx }) => {
    const category = await prisma.category.delete({
      where: {
        id,
      },
    });
    return category;
  });

// Mise à jour d'une catégorie
export const updateCategoryAction = authAction
  .schema(
    z.object({
      id: z.string(),
      name: z.string(),
    })
  )
  .action(async ({ parsedInput: inputs, ctx }) => {
    const category = await prisma.category.update({
      where: {
        id: inputs.id,
        userId: ctx.user.id,
      },
      data: {
        name: inputs.name,
      },
    });
    return category;
  });

// Vérification de l'existence d'une catégorie par nom
export const checkNameCategoryAction = async (name: string, userId: string) => {
  const category = await prisma.category.findFirst({
    where: {
      name,
      userId,
    },
  });
  return category;
};

// Récupération des catégories d'un utilisateur
export const getCategoriesAction = async (userId: string) => {
  return prisma.category.findMany({
    where: {
      userId,
    },
  });
};
