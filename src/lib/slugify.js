"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slugify = slugify;
// lib/slugify.ts
function slugify(text) {
    return text
        .toLowerCase()
        .normalize("NFD") // supprime les accents
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, "-") // espaces → tirets
        .replace(/[^a-z0-9-]/g, "") // supprime caractères spéciaux
        .replace(/--+/g, "-")
        .replace(/^-+|-+$/g, "");
}
