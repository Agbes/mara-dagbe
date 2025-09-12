"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Loader2, PlusCircle } from "lucide-react";
import { categoryFormSchema, CategoryFormSchema } from "@/lib/schemas/category";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function CategoryForm() {
  const [loading, setLoading] = useState(false);

  const form = useForm<CategoryFormSchema>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: { name: "" },
  });

  const onSubmit = async (values: CategoryFormSchema) => {
    try {
      setLoading(true);
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) throw new Error("Erreur lors de la création");

      form.reset();
      alert("Catégorie ajoutée avec succès ✅");
    } catch (error) {
      console.error(error);
      alert("Impossible d’ajouter la catégorie ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col space-y-4"
    >
      {/* Champ Nom */}
      <div>
        <Input
          type="text"
          placeholder="Nom de la catégorie"
          {...form.register("name")}
          className={`${
            form.formState.errors.name
              ? "border-red-500 focus:ring-red-500"
              : ""
          }`}
        />
        {form.formState.errors.name && (
          <p className="text-sm text-red-500 mt-1">
            {form.formState.errors.name.message}
          </p>
        )}
      </div>

      {/* Bouton Submit */}
      <Button
        type="submit"
        className="w-full flex items-center justify-center"
        disabled={loading}
      >
        {loading ? (
          <Loader2 className="animate-spin w-4 h-4 mr-2" />
        ) : (
          <PlusCircle className="w-4 h-4 mr-2" />
        )}
        Ajouter
      </Button>
    </form>
  );
}
