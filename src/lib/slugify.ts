// lib/slugify.ts
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")               // supprime les accents
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")           // espaces → tirets
    .replace(/[^a-z0-9-]/g, "")     // supprime caractères spéciaux
    .replace(/--+/g, "-")
    .replace(/^-+|-+$/g, "");
}