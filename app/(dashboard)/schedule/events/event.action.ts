"use server";
import { prisma } from "@/src/lib/prisma";
import { authAction } from "@/src/lib/safe-actions";
import { z } from "zod";
import { eventSchema } from "./event.schema";
// Création d'un événement
export const createEventAction = authAction
  .schema(eventSchema)
  .action(async ({ parsedInput: inputs, ctx }) => {
    if (!ctx.user) {
      throw new Error("User not found");
    }

    const event = await prisma.event.create({
      data: {
        ...inputs,
        authorId: ctx.user.id!,
        description: inputs.description ?? null,
        categoryId: inputs.categoryId ?? null,
        startTime: inputs.startTime,
        endTime: inputs.endTime,
      },
    });

    return event;
  });

// Mise à jour d'un événement
export const updateEventAction = authAction
  .schema(
    z.object({
      id: z.string(),
      data: eventSchema,
    })
  )
  .action(async ({ parsedInput: { id, data }, ctx }) => {
    if (!ctx.user) {
      throw new Error("User not found");
    }

    const event = await prisma.event.update({
      where: {
        id,
        authorId: ctx.user.id,
      },
      data: {
        title: data.title,
        description: data.description || undefined,
        categoryId: data.categoryId || undefined,
        date: data.date,
        startTime: data.startTime,
        endTime: data.endTime,
        color: data.color,
      },
    });

    return event;
  });

// Suppression d'un événement
export const deleteEventAction = authAction
  .schema(z.string())
  .action(async ({ parsedInput: id, ctx }) => {
    if (!ctx.user) {
      throw new Error("User not found");
    }

    const event = await prisma.event.delete({
      where: {
        id,
        authorId: ctx.user.id,
      },
    });

    return event;
  });

// Récupération des événements
export const getEventAction = async (authorId: string) => {
  const events = await prisma.event.findMany({
    where: {
      authorId,
    },
    select: {
      id: true,
      title: true,
      description: true,
      date: true,
      startTime: true,
      endTime: true,
      color: true,
      categoryId: true,
      category: {
        select: {
          name: true,
        },
      },
      authorId: true,
    },
    orderBy: {
      startTime: "asc",
    },
  });

  return events;
};
