import { z } from "zod";

export const categorySchema = z.object({
  name: z.string({
    required_error: "Le nom de la catégorie est requis",
  }),
});

export type categoryType = z.infer<typeof categorySchema>;
