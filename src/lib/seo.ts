import { Article as PrismaArticle } from "@prisma/client";
import type { Metadata } from "next";
import prisma from "./prisma";
import type { WithContext, WebSite, Article as SchemaArticle } from "schema-dts";

// ----------------------------
// Typage SEO
// ----------------------------
export type SEOProps = {
  title: string;
  description: string;
  keywords?: string[];
  path?: string;
  image?: string;
  other?: Record<string, string>;
  tags?: string[];
  section?: string;
  authorName?: string;
  datePublished?: string;
  dateModified?: string;
  type?: "WebSite" | "Article";
};


// ----------------------------
// Config site
// ----------------------------
const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || "Medium Ali Moussa",
  url: process.env.NEXT_PUBLIC_URL_SITE_BASE || "https://www.medium-ali-moussa.com",
  other: {
    "google-site-verification": "",
  },
  twitter: process.env.NEXT_PUBLIC_TWITER_NAME || "@mediumAliMoussa",
  defaultImage: `${process.env.NEXT_PUBLIC_URL_SITE_BASE || "https://www.medium-ali-moussa.com"}/images/ali-moussa.jpg`,
};

// ----------------------------
// Keywords automatiques
// ----------------------------
function enrichKeywords(base: string[]) {
  const extra = [
    "Medium Ali Moussa",
    "marabout puissant",
    "rituels africains",
    "retour affectif",
    "désenvoûtement",
  ];
  return Array.from(new Set([...base, ...extra]));
}

// ----------------------------
// Génération Metadata pour Next.js
// ----------------------------
export function generateStaticMetadata({
  title,
  description,
  keywords = [],
  path = "/",
  image,
  other,
  tags = [],
  section,
  type = "WebSite",
}: SEOProps): Metadata {
  const fullUrl = `${siteConfig.url}${path}`;
  const imageUrl = image || siteConfig.defaultImage;

  const ogKeywords = [...keywords, ...tags];
  if (section) ogKeywords.push(section);

  const enrichedKeywords = enrichKeywords(ogKeywords);

  // ✅ conversion WebSite → website, Article → article
  const ogType = type === "Article" ? "article" : "website";

  return {
    
    title: `${title} | ${siteConfig.name}`,
    description,
    keywords: enrichedKeywords,
    other: other || siteConfig.other,
    alternates: {
      canonical: fullUrl,
    },
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url: fullUrl,
      siteName: siteConfig.name,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: title }],
      locale: "fr_FR",
      type: ogType,
    },
    twitter: {
      card: "summary_large_image",
      site: siteConfig.twitter,
      title: `${title} | ${siteConfig.name}`,
      description,
      images: [imageUrl],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
// ----------------------------
// JSON-LD pour Google
// ----------------------------



export function generateJSONLD({
  title,
  description,
  path = "/",
  image,
  authorName,
  datePublished,
  dateModified,
  keywords = [],
  type = "WebSite",
}: SEOProps) {
  const fullUrl = `${siteConfig.url}${path}`;

  let jsonLd: WithContext<WebSite | SchemaArticle>;

  if (type === "WebSite") {
    jsonLd = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: title,
      url: fullUrl,
      description,
      ...(image && { image }),
      ...(keywords.length && { keywords: keywords.join(", ") }),
    };
  } else {
    jsonLd = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: title,
      description,
      url: fullUrl,
      ...(image && { image }),
      ...(keywords.length && { keywords: keywords.join(", ") }),
      author: {
        "@type": "Person",
        name: authorName || "Medium Ali Moussa",
      },
      ...(datePublished && { datePublished }),
      ...(dateModified && { dateModified }),
      publisher: {
        "@type": "Organization",
        name: siteConfig.name,
        logo: {
          "@type": "ImageObject",
          url: `${siteConfig.url}/favicon.ico`,
        },
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": fullUrl,
      },
    };
  }

  return JSON.stringify(jsonLd);
}


// ----------------------------
// Typage exact pour article avec relations
// ----------------------------
export type ArticleWithRelations = PrismaArticle & {
  category: { id: number; name: string; slug: string } | null;
  tagsArticles: {
    assignedAt: Date;
    tag: { id: number; name: string; slug: string };
  }[];
};


// ----------------------------
// SEO Props depuis un article
// ----------------------------
export function seoPropsFromArticle(article: ArticleWithRelations): SEOProps {
  const tagKeywords = article.tagsArticles.map(t => t.tag.name);
  const categoryKeyword = article.category?.name ? [article.category.name] : [];

  return {
    title: article.metaTitre,
    description: article.metaDescription,
    keywords: [...tagKeywords, ...categoryKeyword],
    path: `/rituels/${article.slug}`,
    image: article.coverImage || undefined,
    tags: tagKeywords,
    section: article.category?.name,
    authorName: "Medium Ali Moussa",
    datePublished: article.createdAt?.toISOString(),
    dateModified: article.updatedAt?.toISOString(),
    type: "Article",
    other: { "google-site-verification": process.env.NEXT_PUBLIC_GOOGLE_CONSOLE || "" },
  };
}

// ----------------------------
// SEO Props depuis un tag
// ----------------------------
export async function seoPropsFromTagDynamic(tagSlug: string): Promise<SEOProps> {
  const tag = await prisma.tag.findUnique({ where: { slug: tagSlug } });
  if (!tag) {
    return {
      title: `Tag non trouvé`,
      description: `Ce tag n’existe pas`,
      path: `/tag/${tagSlug}`,
    };
  }

  const articles = await prisma.article.findMany({
    where: { tagsArticles: { some: { tagId: tag.id } } },
    include: { tagsArticles: { select: { tag: { select: { name: true } } } } },
  });

  const allTags = Array.from(new Set(articles.flatMap(a => a.tagsArticles.map(t => t.tag.name))));

  return {
    title: `Articles sur ${tag.name}`,
    description: `Tous les articles liés au tag "${tag.name}"`,
    path: `/tag/${tag.slug}`,
    tags: allTags,
    type: "Article",
    other: { "google-site-verification": process.env.NEXT_PUBLIC_GOOGLE_CONSOLE || "" },
  };
}

// ----------------------------
// SEO Props depuis une catégorie
// ----------------------------
export async function seoPropsFromCategoryDynamic(categorySlug: string): Promise<SEOProps> {
  const category = await prisma.category.findUnique({ where: { slug: categorySlug } });
  if (!category) {
    return {
      title: `Catégorie non trouvée`,
      description: `Cette catégorie n’existe pas`,
      path: `/categorie/${categorySlug}`,
    };
  }

  const articles = await prisma.article.findMany({
    where: { categoryId: category.id },
    include: { tagsArticles: { select: { tag: { select: { name: true } } } } },
  });

  const allTags = Array.from(new Set(articles.flatMap(a => a.tagsArticles.map(t => t.tag.name))));

  return {
    title: `Articles dans la catégorie ${category.name}`,
    description: `Tous les articles de la catégorie "${category.name}"`,
    path: `/categorie/${category.slug}`,
    tags: allTags,
    section: category.name,
    type: "Article",
    other: { "google-site-verification": process.env.NEXT_PUBLIC_GOOGLE_CONSOLE || "" },
  };
}

// ----------------------------
// Génération dynamique Next.js
// ----------------------------
export async function generateMetadataTag({ params }: { params: { slug: string } }): Promise<Metadata> {
  const seoProps = await seoPropsFromTagDynamic(params.slug);
  return generateStaticMetadata(seoProps);
}

export async function generateMetadataCategory({ params }: { params: { slug: string } }): Promise<Metadata> {
  const seoProps = await seoPropsFromCategoryDynamic(params.slug);
  return generateStaticMetadata(seoProps);
}

export async function generateMetadataArticle({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = await prisma.article.findUnique({
    where: { slug: params.slug },
    include: {
      category: { select: { id: true, name: true, slug: true } },
      tagsArticles: { select: { tag: { select: { id: true, name: true, slug: true } }, assignedAt: true } },
    },
  });

  if (!article) {
    return generateStaticMetadata({
      title: "Article non trouvé",
      description: "Cet article n’existe pas.",
      type: "WebSite",
    });
  }

  return generateStaticMetadata(seoPropsFromArticle(article));
}
