"use client";

import { useMemo, useState, useCallback } from "react";
import Link from "next/link";
import { ArticleDTO } from "../../../../types/articles-type";
import { useRouter } from "next/navigation";
import DataTable, { Column } from "../Tables/DataTable";
import { Button } from "../ui/button";

type Props = {
  articles: ArticleDTO[];
};

export default function ArticlesPage({ articles }: Props) {
  const [localArticles, setLocalArticles] = useState<ArticleDTO[]>(articles);
  const router = useRouter();

  // 🔹 handleDelete avec id
  const handleDelete = useCallback(
    async (id: number) => {
      if (!confirm("Voulez-vous vraiment supprimer cet article ?")) return;

      try {
        const res = await fetch(`/api/admin/articles/${id}`, {
          method: "DELETE",
        });
        if (!res.ok) throw new Error("Erreur lors de la suppression");

        setLocalArticles((prev) => prev.filter((article) => article.id !== id));
        router.refresh();
        alert(`Article ${id} supprimé ✅`);
      } catch (error) {
        console.error("❌ Erreur suppression :", error);
        alert("Suppression impossible ❌");
      }
    },
    [router]
  );

  // 🔹 Colonnes
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
            <Link href={`/admin/rituels/${row.id}/edit`}>
              <Button size="sm" variant="outline">
                Modifier
              </Button>
            </Link>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => handleDelete(row.id)}
            >
              Supprimer
            </Button>
          </div>
        ),
      },
    ],
    [handleDelete]
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-6">📄 Gestion des articles</h1>
        <Link href="/admin/rituels/create">
          <Button>➕ Nouvel Article</Button>
        </Link>
      </div>
      <DataTable data={localArticles} columns={columns} />
    </div>
  );
}
