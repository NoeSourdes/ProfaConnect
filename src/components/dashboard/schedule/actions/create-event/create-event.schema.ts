import { z } from "zod";

export const eventSchema = z.object({
  title: z.string({
    required_error: "Le titre de l'événement est requis",
  }),
  date: z.string({
    required_error: "La date est requise",
  }),
  start: z.string({
    required_error: "L'heure de début est requise",
  }),
  end: z.string({
    required_error: "L'heure de fin est requise",
  }),
  color: z.string({
    required_error: "La couleur est requise",
  }),
  categoryId: z.number({
    required_error: "La catégorie est requis",
  }),
});

export type eventType = z.infer<typeof eventSchema>;
