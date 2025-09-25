import { getAllArticles, getAllCategory, getAllTag } from "@/lib/getArticles";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.SITE_URL || "https://mara-dagbe.vercel.app";

  const articles = await getAllArticles();
  const categories = await getAllCategory();
  const tags = await getAllTag();

  const urlArticles: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${baseUrl}/rituels/${a.slug}`,
    lastModified: a.updatedAt || a.publishedAt || new Date(),
    changeFrequency: "daily",
    priority: 0.8,
  }));

  const urlCategories: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${baseUrl}/categories/${c.slug}`,
    lastModified: c.updatedAt || new Date(),
    changeFrequency: "daily",
    priority: 0.7,
  }));

  const urlTags: MetadataRoute.Sitemap = tags.map((t) => ({
    url: `${baseUrl}/tag/${t.slug}`,
    lastModified: t.updatedAt || new Date(),
    changeFrequency: "daily",
    priority: 0.6,
  }));

  const urlStatic: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `${baseUrl}/rituels`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/rituels-affaire-de-justice`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/rituels-de-retour-affectif`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/rituels-envoutements`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/galerie`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/propos`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/rituels-de-richesse`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
  ];

  return [...urlStatic, ...urlArticles, ...urlCategories, ...urlTags];
}
