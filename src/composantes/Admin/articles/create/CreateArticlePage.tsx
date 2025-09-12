"use client";

import { useRouter } from "next/navigation";
import { ArticleFormValues } from "@/lib/schemas/articleSchema";
import ArticleForm from "../../Formulaires/Articles/ArticleForme";

type Props = {
  categories: { id: number; name: string }[];
};

export default function CreateArticlePage({ categories }: Props) {
  const router = useRouter();

  console.log("➡️ [CREATE CLIENT] Catégories reçues :", categories);

  const handleCreate = async (data: ArticleFormValues) => {
    console.log("✍️ [CREATE CLIENT] Données envoyées :", data);

    try {
      const res = await fetch("/api/admin/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      console.log("📡 [CREATE CLIENT] Réponse du serveur :", res);

      if (!res.ok) {
        const errorText = await res.text();
        console.error("❌ [CREATE CLIENT] Erreur backend :", errorText);
        throw new Error("Erreur lors de la création");
      }

      console.log("✅ [CREATE CLIENT] Article créé avec succès !");
      router.push("/admin/rituels");
      router.refresh();   
    } catch (err) {
      console.error("❌ [CREATE CLIENT] Erreur côté client :", err);
      alert("Impossible de créer l’article !");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Créer un nouvel article</h1>
      <ArticleForm categories={categories} onSubmit={handleCreate} />
    </div>
  );
}
