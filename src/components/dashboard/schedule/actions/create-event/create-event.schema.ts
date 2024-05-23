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
  start: z.any({
    required_error: "L'heure de début est requise",
  }),
  end: z.any({
    required_error: "L'heure de fin est requise",
  }),
  color: z.string({
    required_error: "La couleur est requise",
  }),
});

export type eventType = z.infer<typeof eventSchema>;
