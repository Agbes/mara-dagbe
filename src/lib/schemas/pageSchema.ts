import { z } from "zod";

export const contentPageSchema = z.object({
  id: z.number().optional(), // pour l’édition
  h1: z.string().min(2, "Le H1 est obligatoire"),
  h2: z.string().min(2, "Le H2 est obligatoire"),
  description1: z.string().min(5, "La première description est obligatoire"),
  description2: z.string().optional(),
  pageName: z.string().min(2, "Le nom de la page est obligatoire"),
  photo1: z.string().url("L’image 1 doit être une URL valide"),
  photo2: z.string().url("L’image 2 doit être une URL valide").optional(),
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
});

export type PageFormValues = z.infer<typeof contentPageSchema>;
