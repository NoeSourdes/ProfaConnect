"use server";

import { prisma } from "@/src/lib/prisma";
import { userAction } from "@/src/lib/safe-actions";
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
      },
    });
    return event;
  }
);
