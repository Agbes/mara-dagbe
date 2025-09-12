"use client";

import { useRouter } from "next/navigation";
import { ArticleFormValues } from "@/lib/schemas/articleSchema";
import { ArticleDTO } from "../../../../../types/articles-tytp";
import ArticleForm from "../../Formulaires/Articles/ArticleForme";

type Props = {
  categories: { id: number; name: string }[];
  article: ArticleDTO;
};

export default function EditArticlePage({ categories, article }: Props) {
  const router = useRouter();

  const handleUpdate = async (data: ArticleFormValues) => {
    try {
      const res = await fetch(`/api/admin/articles/${article.slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Erreur lors de la mise à jour");

      router.push("/admin/rituels");
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Impossible de mettre à jour l’article !");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Modifier l’article : {article.title}
      </h1>
 <ArticleForm categories={categories} initialData={article} onSubmit={handleUpdate} />

    </div>
  );
}
