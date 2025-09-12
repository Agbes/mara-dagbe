"use client";

import { useMemo, useState, useCallback } from "react";
import Link from "next/link";
import { ArticleDTO } from "../../../../types/articles-tytp";
import { useRouter } from "next/navigation";
import DataTable, { Column } from "../Tables/DataTable";
import { Button } from "../ui/button";

type Props = {
  articles: ArticleDTO[];
};

export default function ArticlesPage({ articles }: Props) {
  // ⚡ State local pour les articles
  const [localArticles, setLocalArticles] = useState<ArticleDTO[]>(articles);

  const router = useRouter();

  // 🔹 handleDelete mémorisé avec useCallback
  const handleDelete = useCallback(
    async (slug: string) => {
      if (!confirm("Voulez-vous vraiment supprimer cet article ?")) return;

      try {
        const res = await fetch(`/api/admin/articles/${slug}`, { method: "DELETE" });
        if (!res.ok) throw new Error("Erreur lors de la suppression");

        setLocalArticles(prev => prev.filter(article => article.slug !== slug));
        router.refresh();
        alert(`Article "${slug}" supprimé ✅`);
      } catch (error) {
        console.error("❌ Erreur suppression :", error);
        alert("Suppression impossible ❌");
      }
    },
    [router] // router est une dépendance
  );

  // 🔹 Colonnes mémoïsées
  const columns: Column<ArticleDTO>[] = useMemo(
    () => [
      { key: "title", label: "Titre", sortable: true },
      { key: "description", label: "Description" },
      {
        key: "published",
        label: "Publié",
        render: (row) =>
          row.published ? (
            <span className="text-green-600 font-medium">✅ Oui</span>
          ) : (
            <span className="text-red-500 font-medium">❌ Non</span>
          ),
      },
      {
        key: "actions",
        label: "Actions",
        render: (row) => (
          <div className="flex gap-2">
            <Link href={`/admin/rituels/${row.slug}/edit`}>
              <Button size="sm" variant="outline">
                Modifier
              </Button>
            </Link>
            <Button size="sm" variant="destructive" onClick={() => handleDelete(row.slug)}>
              Supprimer
            </Button>
          </div>
        ),
      },
    ],
    [handleDelete] // stable grâce à useCallback
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-6">📄 Gestion des articles</h1>
        <Link href="/admin/rituels/create">
          <Button>➕ Nouvelle Article</Button>
        </Link>
      </div>
      <DataTable data={localArticles} columns={columns} />
    </div>
  );
}
