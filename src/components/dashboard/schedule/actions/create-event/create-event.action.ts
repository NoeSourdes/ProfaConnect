"use server";

import { prisma } from "@/src/lib/prisma";
import { userAction } from "@/src/lib/safe-actions";
import { z } from "zod";
import { eventSchema } from "./create-event.schema";

export const createEventAction = userAction(
  eventSchema,
  async (inputs, context) => {
    if (!context.user) {
      throw new Error("User not found");
    }
    const event = await prisma.event.create({
      data: {
        ...inputs,
        start: inputs.start,
        end: inputs.end,
        userId: context.user.id,
        description: inputs.description || undefined,
        categoryId: inputs.categoryId || undefined,
        startTime: inputs.startTime,
        endTime: inputs.endTime,
      },
    });
    return event;
  }
);

export const updateEventAction = userAction(
  z.object({
    id: z.string(),
    data: eventSchema,
  }),
  async (inputs, context) => {
    if (!context.user) {
      throw new Error("User not found");
    }
    const event = await prisma.event.update({
      where: {
        id: inputs.id,
        userId: context.user.id,
      },
      data: {
        title: inputs.data.title,
        description: inputs.data.description || undefined,
        categoryId: inputs.data.categoryId || undefined,
        date: inputs.data.date,
        start: inputs.data.start,
        end: inputs.data.end,
        startTime: inputs.data.startTime,
        endTime: inputs.data.endTime,
        color: inputs.data.color,
      },
    });
    return event;
  }
);
