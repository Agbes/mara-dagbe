"use client";

import { useRouter } from "next/navigation";
import { ArticleFormValues } from "@/lib/schemas/articleSchema";
import ArticleForme from "../../Formulaires/Articles/ArticleForme";
import toast from "react-hot-toast";

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

      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error(result.message || "Erreur lors de la création de l’article");
      }

      toast.success("✅ Article créé avec succès !");
      router.push("/admin/rituels");
      router.refresh();
    } catch (err) {
      console.error("❌ Erreur création article :", err);
      const message = err instanceof Error ? err.message : "Erreur inconnue";
      toast.error(message);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Créer un nouvel article</h1>
      <ArticleForme categories={categories} onSubmit={handleCreate} />
    </div>
  );
}
