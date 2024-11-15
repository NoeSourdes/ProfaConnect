"use server";

import { prisma } from "@/src/lib/prisma";
import { userAction } from "@/src/lib/safe-actions";
import { z } from "zod";
import { categorySchema } from "./category.schema";

export const createCategoryAction = userAction(
  categorySchema,
  async (inputs, context) => {
    const category = await prisma.category.create({
      data: {
        name: inputs.name,
        userId: context.user.id,
      },
    });
    return category;
  }
);

export const deleteCategoryAction = userAction(
  z.string(),
  async (id, context) => {
    const category = await prisma.category.delete({
      where: {
        id,
      },
    });
    return category;
  }
);

export const updateCategoryAction = userAction(
  z.object({
    id: z.string(),
    name: z.string(),
  }),
  async (inputs, context) => {
    const category = await prisma.category.update({
      where: {
        id: inputs.id,
        userId: context.user.id,
      },
      data: {
        name: inputs.name,
      },
    });
    return category;
  }
);

export const checkNameCategoryAction = async (name: string, userId: string) => {
  const category = await prisma.category.findFirst({
    where: {
      name,
      userId,
    },
  });
  return category;
};

export const getCategoriesAction = async (userId: string) => {
  return prisma.category.findMany({
    where: {
      userId,
    },
  });
};
