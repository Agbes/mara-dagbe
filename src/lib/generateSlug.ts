// src/lib/generateSlug.ts
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // accents → normalisés
    .replace(/[^a-z0-9\s-]/g, "")    // caractères spéciaux supprimés
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}
