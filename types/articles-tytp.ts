import type { Prisma } from "@prisma/client";

/**
 * Contenu JSON strict de l'article (stocké dans Article.content)
 */
export type ArticleContent = {
  sections: {
    subtitle: string;   // sous-titre de la section
    image: string;      // URL ou chemin de l'image
    text: string;       // texte de la section
  }[];
};

/**
 * Forme du résultat retourné par Prisma pour un Article avec relations
 */
export type ArticleWithRelations = {
  id: number;
  slug: string;
  title: string;
  description: string;
  coverImage: string | null;       // optionnel
  content: Prisma.JsonValue;        // contenu JSON
  conclusion: string;
  metaTitre: string;               // SEO
  metaDescription: string;         // SEO
  published: boolean;
  publishedAt: Date | null;        // nullable
  createdAt: Date;
  updatedAt: Date;
  categoryId: number;              // FK vers Category
  category: {
    id: number;
    name: string;
    slug: string;
  };
  tagsArticles: Array<{
    tag: {
      id: number;
      name: string;
      slug: string;
    };
    assignedAt: Date;
  }>;
};




/**
 * --------------------
 * Category
 * --------------------
 */
export type CategoryWithArticles = {
  id: number;
  name: string;
  slug: string;
  createdAt: Date;
  articles: Array<{
    id: number;
    title: string;
    slug: string;
  }>;
};



/**
 * DTO pour le frontend, avec dates sérialisées en string
 */
export type ArticleDTO = {
  id: number;
  slug: string;
  title: string;
  description: string;
  coverImage?: string | null;
  content: ArticleContent;
  conclusion: string;
  metaTitre: string;
  metaDescription: string;
  published: boolean;
  publishedAt: string | null;     // nullable et sérialisée
  createdAt: string;
  updatedAt: string;
  categoryId: number;
  category: string;                // juste le nom de la catégorie
  tags: string[];                  // noms des tags
};

/**
 * Mapper : ArticleWithRelations -> ArticleDTO
 */
export function mapArticle(article: ArticleWithRelations): ArticleDTO {
  return {
    id: article.id,
    slug: article.slug,
    title: article.title,
    description: article.description,
    coverImage: article.coverImage,
    content: article.content as ArticleContent,
    conclusion: article.conclusion,
    metaTitre: article.metaTitre,
    metaDescription: article.metaDescription,
    published: article.published,
    publishedAt: article.publishedAt ? article.publishedAt.toISOString() : null,
    createdAt: article.createdAt.toISOString(),
    updatedAt: article.updatedAt.toISOString(),
    categoryId: article.categoryId,
    category: article.category.name,
    tags: article.tagsArticles.map((ta) => ta.tag.name),
  };
}

/**
 * Formulaire pour créer ou mettre à jour un Article
 */
export type ArticleFormValues = {
  id?: number;
  title: string;
  slug: string;
  description: string;
  coverImage?: string | null;
  categoryId: number | "";  
  tags: string[];         
  published: boolean;
  conclusion: string;
  metaTitre: string;
  metaDescription: string;
  content: ArticleContent;
};

/**
 * Résumé d'article pour liste ou card
 */
export type ArticleSummaryDTO = Pick<
  ArticleDTO,
  "title" | "slug" | "description" | "coverImage" | "updatedAt"
>;

/**
 * Type Category
 */
export type CategoryDTO = {
  id: number;
  name: string;
  slug: string;
  createdAt: string;
};

/**
 * Type Tag
 */
export type TagDTO = {
  id: number;
  name: string;
  slug: string;
  createdAt: string;
};


/**
 * --------------------
 * Tag
 * --------------------
 */
export type TagWithArticles = {
  id: number;
  name: string;
  slug: string;
  createdAt: Date;
  tagsArticles: Array<{
    article: {
      id: number;
      title: string;
      slug: string;
    };
    assignedAt: Date;
  }>;
};






export type TagArticleDTO = {
  articleId: number;
  articleTitle: string;
  tagId: number;
  tagName: string;
  assignedAt: string;           // ISO string
};



export type ArticleSidebarDTO = {
  title: string;
  slug: string;
  coverImage?: string | null;
};