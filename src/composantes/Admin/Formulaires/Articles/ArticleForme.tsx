"use client";

import { useEffect } from "react";
import { useForm, Controller, useFieldArray, Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { articleFormSchema, ArticleFormValues } from "@/lib/schemas/articleSchema";
import { ArticleDTO } from "../../../../../types/articles-type";

// ---- UI Components ----
import TailwindUploadButton from "../../../TailwindUploadButton";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";

// ==========================
// Props
// ==========================
type Props = {
    initialData?: ArticleDTO;
    categories?: { id: number; name: string }[];
    onSubmit: (data: ArticleFormValues) => Promise<void> | void;
};

// ==========================
// Default values util
// ==========================
function getDefaultValues(initialData?: ArticleDTO): ArticleFormValues {
    console.log("📌 getDefaultValues appelé avec:", initialData);
    return {
        id: initialData?.id,
        title: initialData?.title ?? "",
        slug: initialData?.slug ?? "",
        description: initialData?.description ?? "",
        metaTitre: initialData?.slug ?? "",
        metaDescription: initialData?.description ?? "",
        conclusion: initialData?.conclusion ?? "",
        
        coverImage: initialData?.coverImage
            ? typeof initialData.coverImage === "string"
                ? { url: initialData.coverImage, publicId: "" } // publicId vide si absent
                : initialData.coverImage
            : null,

        content: {
            sections: initialData?.content?.sections?.map(s => ({
                subtitle: s.subtitle ?? "",
                text: s.text ?? "",
                image: s.image ? {
                    url: s.image.url ?? null,
                    publicId: s.image.publicId ?? null
                } : null,
            })) ?? [],
        },


        categoryId: initialData?.categoryId ?? "",
        tags: initialData?.tags ?? [],
        published: initialData?.published ?? false,
        publishedAt: initialData?.publishedAt ? new Date(initialData.publishedAt) : null,

    };
}

const formatDateForInput = (date: Date) => {
    const tzOffset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() - tzOffset).toISOString().slice(0, 16);
};

// ==========================
// Slug util
// ==========================
function slugify(str: string) {
    return str
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
}

// ==========================
// Component
// ==========================
export default function ArticleForme({ initialData, categories = [], onSubmit }: Props) {
    console.log("🚀 ArticleForme rendu avec props:", { initialData, categories });

    const {
        control,
        handleSubmit,
        register,
        setValue,
        watch,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<ArticleFormValues>({
        resolver: zodResolver(articleFormSchema) as unknown as Resolver<ArticleFormValues>,
        defaultValues: getDefaultValues(initialData),
    });

    const values = watch();
    console.log("👀 watch values:", values);

    // 🛠️ Log des erreurs globalement
    useEffect(() => {
        if (Object.keys(errors).length > 0) {
            console.log("⚠️ formState.errors détectés:", errors);
        }
    }, [errors]);

    // Slug automatique
    const title = watch("title");
    const slug = watch("slug");
    useEffect(() => {
        console.log("🔄 useEffect Slugify déclenché:", { title, slug });
        if (title && (!slug || slug === slugify(title))) {
            console.log("⚡ Slug généré:", slugify(title));
            setValue("slug", slugify(title), { shouldValidate: true });
        }
    }, [title, slug, setValue]);

    // Reset quand initialData change
    useEffect(() => {
        console.log("♻️ Reset form avec initialData:", initialData);
        reset(getDefaultValues(initialData));
    }, [initialData, reset]);

    // FieldArray pour sections
    const { fields, append, remove } = useFieldArray({
        control,
        name: "content.sections",
    });
    console.log("📚 Sections actuelles:", fields);

    // Tags
    const handleAddTag = (tag: string) => {
        console.log("➕ Ajout de tag:", tag);
        if (!tag) return;
        if (!values.tags.includes(tag)) {
            setValue("tags", [...values.tags, tag]);
            console.log("✅ Nouveau tags:", [...values.tags, tag]);
        }
    };

    const handleRemoveTag = (tag: string) => {
        console.log("❌ Suppression de tag:", tag);
        setValue(
            "tags",
            values.tags.filter((t) => t !== tag)
        );
    };

    // Submit wrapper
    const handleInternalSubmit = async (data: ArticleFormValues) => {
        console.log("📤 handleInternalSubmit data envoyé:", data);
        try {
            await onSubmit(data);
            console.log("✅ onSubmit réussi !");
        } catch (err) {
            console.error("❌ Erreur lors de l'envoi :", err);
        }
    };

    return (
        <form
            onSubmit={handleSubmit(handleInternalSubmit)}
            className="space-y-6"
        >
            {/* Informations générales */}
            <Card>
                <CardHeader>
                    <CardTitle>Informations générales</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Input placeholder="Titre" {...register("title")} />
                    {errors.title && <p className="text-red-500">{errors.title.message}</p>}

                    <Input placeholder="Slug" {...register("slug")} />
                    {errors.slug && <p className="text-red-500">{errors.slug.message}</p>}

                    <Textarea placeholder="Description" {...register("description")} />
                    {errors.description && <p className="text-red-500">{errors.description.message}</p>}

                    <Input placeholder="Meta Titre" {...register("metaTitre")} />
                    {errors.metaTitre && <p className="text-red-500">{errors.metaTitre.message}</p>}

                    <Textarea placeholder="Meta Description" {...register("metaDescription")} />
                    {errors.metaDescription && <p className="text-red-500">{errors.metaDescription.message}</p>}
                </CardContent>
            </Card>

            {/* Image de couverture */}
            <Card>
                <CardHeader>
                    <CardTitle>Image de couverture</CardTitle>
                </CardHeader>
                <CardContent>
                    <TailwindUploadButton
                        existingImage={values.coverImage?.url ?? undefined} // <-- ici
                        onSelectFile={async (file: File | null) => {
                            if (!file) {
                                setValue("coverImage", null, { shouldValidate: true });
                                return;
                            }


                            const formData = new FormData();
                            formData.append("file", file);
                            formData.append("folder", "Articles");

                            const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
                            if (!res.ok) {
                                const errorData = await res.json().catch(() => null);
                                throw new Error(errorData?.message || "Échec de l'upload de l'image");
                            }

                            const data = await res.json();
                            setValue("coverImage", {
                                url: data.url ?? null,
                                publicId: data.public_id ?? null,  // ✅ plus jamais undefined
                            }, { shouldValidate: true });

                        }}
                    />




                </CardContent>
            </Card>

            {/* Catégorie */}
            <Card>
                <CardHeader>
                    <CardTitle>Catégorie</CardTitle>
                </CardHeader>
                <CardContent>
                    <Controller
                        name="categoryId"
                        control={control}
                        render={({ field }) => (
                            <Select
                                value={field.value === "" ? "" : String(field.value)}
                                onValueChange={(val: string) => {
                                    console.log("📂 Catégorie choisie:", val);
                                    field.onChange(val === "" ? "" : Number(val));
                                }}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Choisir une catégorie" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((c) => (
                                        <SelectItem key={c.id} value={String(c.id)}>
                                            {c.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                    />
                </CardContent>
            </Card>

            {/* Tags */}
            <Card>
                <CardHeader>
                    <CardTitle>Mots-clés</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-2 mb-2">
                        <Input
                            placeholder="Ajouter un ou plusieurs tags (séparés par virgule)"
                            onKeyDown={(e) => {
                                const input = e.target as HTMLInputElement;
                                if (e.key === "Enter" || e.key === ",") {
                                    e.preventDefault();
                                    input.value
                                        .split(",")
                                        .map((t) => t.trim())
                                        .filter((t) => t.length > 0)
                                        .forEach(handleAddTag);
                                    input.value = "";
                                }
                            }}
                        />
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {values.tags.map((tag) => (
                            <Badge
                                key={tag}
                                variant="secondary"
                                onClick={() => handleRemoveTag(tag)}
                                className="cursor-pointer"
                            >
                                {tag} ✕
                            </Badge>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Contenu (sections) */}
            <Card>
                <CardHeader>
                    <CardTitle>Contenu</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {fields.map((field, index) => (
                        <div key={field.id} className="border p-4 rounded-md space-y-3">
                            <Input
                                placeholder="Titre de section"
                                {...register(`content.sections.${index}.subtitle` as const)}
                            />
                            <Textarea
                                placeholder="Texte de la section"
                                {...register(`content.sections.${index}.text` as const)}
                            />
                            <TailwindUploadButton
                                existingImage={field.image?.url ?? undefined} // <-- corrige ici aussi
                                onSelectFile={async (file: File | null) => {
                                    if (!file) {
                                        setValue(`content.sections.${index}.image`, null, { shouldValidate: true });
                                        return;
                                    }


                                    const formData = new FormData();
                                    formData.append("file", file);
                                    formData.append("folder", "Articles");

                                    const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
                                    if (!res.ok) {
                                        const errorData = await res.json().catch(() => null);
                                        throw new Error(errorData?.message || "Échec de l'upload de l'image");
                                    }

                                    const data = await res.json();
                                    setValue(`content.sections.${index}.image`, {
                                        url: data.url ?? null,
                                        publicId: data.public_id ?? null,  // ✅
                                    }, { shouldValidate: true });
                                }}
                            />





                            <Button
                                type="button"
                                variant="destructive"
                                onClick={() => {
                                    console.log("🗑️ Suppression section index:", index);
                                    remove(index);
                                }}
                            >
                                Supprimer section
                            </Button>
                        </div>
                    ))}
                    <Button
                        type="button"
                        onClick={() => {
                            console.log("➕ Ajout nouvelle section");
                            append({ subtitle: "", text: "", image: { url: null, publicId: null }, });
                        }}
                    >
                        ➕ Ajouter une section
                    </Button>
                </CardContent>
            </Card>

            {/* Conclusion */}
            <Card>
                <CardHeader>
                    <CardTitle>Conclusion</CardTitle>
                </CardHeader>
                <CardContent>
                    <Textarea placeholder="Conclusion" {...register("conclusion")} />
                </CardContent>
            </Card>

            {/* Publication */}
            <Card>
                <CardHeader>
                    <CardTitle>Publication</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Controller
                        name="published"
                        control={control}
                        render={({ field }) => (
                            <Select
                                value={
                                    field.value
                                        ? "published"
                                        : values.publishedAt
                                            ? "scheduled"
                                            : "draft"
                                }
                                onValueChange={(val: string) => {
                                    console.log("📌 Changement publication:", val);
                                    if (val === "published") {
                                        field.onChange(true);
                                        setValue("publishedAt", new Date());
                                    } else if (val === "scheduled") {
                                        field.onChange(false);
                                        setValue(
                                            "publishedAt",
                                            values.publishedAt ?? new Date(Date.now() + 60 * 60 * 1000)
                                        );
                                    } else {
                                        field.onChange(false);
                                        setValue("publishedAt", null);
                                    }
                                    console.log("📅 Nouveau état:", {
                                        published: field.value,
                                        publishedAt: values.publishedAt,
                                    });
                                }}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Choisir un statut" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="draft">📝 Brouillon</SelectItem>
                                    <SelectItem value="published">✅ Publier maintenant</SelectItem>
                                    <SelectItem value="scheduled">⏰ Planifier une date</SelectItem>
                                </SelectContent>
                            </Select>
                        )}
                    />

                    {!values.published && values.publishedAt && (
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">
                                Date de publication
                            </label>
                            <Controller
                                name="publishedAt"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        type="datetime-local"
                                        value={field.value ? formatDateForInput(field.value) : ""}
                                        onChange={(e) => {
                                            const date = e.target.value ? new Date(e.target.value) : null;
                                            field.onChange(date);
                                        }}
                                    />
                                )}
                            />

                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Submit */}
            <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Enregistrement..." : "Enregistrer"}
            </Button>
        </form>
    );
}
