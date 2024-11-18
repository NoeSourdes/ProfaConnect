import { z } from "zod";

export const eventSchema = z.object({
  title: z.string({
    required_error: "Le titre de l'événement est requis",
  }),
  description: z.string().optional(),
  categoryId: z.string().optional(),
  date: z.date({
    required_error: "La date est requise",
  }),
  startTime: z.string().regex(/^\d{2}:\d{2}:\d{2}$/, "Format HH:MM:SS"),
  endTime: z.string().regex(/^\d{2}:\d{2}:\d{2}$/, "Format HH:MM:SS"),
  color: z.string({
    required_error: "La couleur est requise",
  }),
});

export type eventType = z.infer<typeof eventSchema>;
