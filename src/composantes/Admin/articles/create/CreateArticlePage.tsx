"use client";

import { useRouter } from "next/navigation";
import { ArticleFormValues } from "@/lib/schemas/articleSchema";
import ArticleForme from "../../Formulaires/Articles/ArticleForme";

type Props = {
  categories: { id: number; name: string }[];
};

export default function CreateArticlePage({ categories }: Props) {
  const router = useRouter();

  console.log("➡️ [CREATE CLIENT] Catégories reçues :", categories);

const handleCreate = async (data: ArticleFormValues) => {
  try {
    const res = await fetch("/api/admin/articles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({ message: "Erreur lors de la création de l’article" }));
      throw new Error(errorData.message);
    }

    const article = await res.json();
    console.log("✅ Article créé :", article);

    router.push("/admin/rituels");
    router.refresh();
  } catch (err) {
    console.error("❌ Erreur création article :", err);
    throw err instanceof Error ? err : new Error("Erreur inconnue");
  }
};


  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Créer un nouvel article</h1>
      <ArticleForme categories={categories} onSubmit={handleCreate} />
    </div>
  );
}
