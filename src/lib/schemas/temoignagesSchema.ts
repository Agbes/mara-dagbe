import { z } from "zod";

export const temoignageSchema = z.object({
  id: z.number().optional(), // généré automatiquement en DB
  name: z.string().min(2, "Le nom est obligatoire"),
  category: z.string().min(2, "La catégorie est obligatoire"),
  description: z.string().min(5, "La description est obligatoire"),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type TemoignageType = z.infer<typeof temoignageSchema>;



export const temoignageVideoSchema = z.object({
  id: z.number().optional(),
  videoUrl: z.string().min(1, "La vidéo est obligatoire"),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});