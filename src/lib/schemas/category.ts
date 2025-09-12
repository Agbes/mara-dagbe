import { z } from "zod";

export const categoryFormSchema = z.object({
  name: z
    .string()
    .min(3, "Le nom doit comporter au moins 3 caractères")
    .max(50, "Le nom est trop long"),
});

export type CategoryFormSchema = z.infer<typeof categoryFormSchema>;
