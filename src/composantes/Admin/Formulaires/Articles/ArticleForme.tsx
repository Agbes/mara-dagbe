"use client";

import { useEffect } from "react";
import { useForm, Controller, useFieldArray, Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { articleFormSchema, ArticleFormValues } from "@/lib/schemas/articleSchema";
import { ArticleDTO } from "../../../../../types/articles-tytp";

// ---- UI Components ----


import TailwindUploadButton from "../../CloudinaryUpload/TailwindUploadButton";
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
    return {
        id: initialData?.id,
        title: initialData?.title ?? "",
        slug: initialData?.slug ?? "",
        description: initialData?.description ?? "",
        metaTitre: initialData?.slug ?? "",
        metaDescription: initialData?.description ?? "",
        conclusion: initialData?.conclusion ?? "",
        coverImage: initialData?.coverImage ?? undefined,
        categoryId: initialData?.categoryId ?? "",
        tags: initialData?.tags ?? [],
        published: initialData?.published ?? false,
        publishedAt: initialData?.publishedAt ? new Date(initialData.publishedAt) : null,
        content: {
            sections: initialData?.content?.sections?.length
                ? initialData.content.sections
                : [],
        },
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
export default function ArticleForm({ initialData, categories = [], onSubmit }: Props) {
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

    // Slug automatique
    const title = watch("title");
    const slug = watch("slug");
    useEffect(() => {
        if (title && (!slug || slug === slugify(title))) {
            setValue("slug", slugify(title), { shouldValidate: true });
        }
    }, [title, slug, setValue]);

    // Reset quand initialData change
    useEffect(() => {
        reset(getDefaultValues(initialData));
    }, [initialData, reset]);

    // FieldArray pour sections
    const { fields, append, remove } = useFieldArray({
        control,
        name: "content.sections",
    });

    // Tags
    const handleAddTag = (tag: string) => {
        if (!tag) return;
        if (!values.tags.includes(tag)) {
            setValue("tags", [...values.tags, tag]);
        }
    };

    const handleRemoveTag = (tag: string) => {
        setValue(
            "tags",
            values.tags.filter((t) => t !== tag)
        );
    };

    // Submit wrapper
    const handleInternalSubmit = async (data: ArticleFormValues) => {
        try {
            await onSubmit(data);
        } catch (err) {
            console.error("Erreur lors de l'envoi :", err);
        }
    };

    return (
        <form onSubmit={handleSubmit(handleInternalSubmit)} className="space-y-6">

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
                    <Controller
                        name="coverImage"
                        control={control}
                        render={({ field }) => (
                            <TailwindUploadButton
                                value={field.value ?? undefined}
                                onChange={field.onChange}
                                label="Téléverser l'image de couverture"
                            />
                        )}
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
                                onValueChange={(val: string) => field.onChange(val === "" ? "" : Number(val))}
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
                            <Controller
                                control={control}
                                name={`content.sections.${index}.image`}
                                render={({ field }) => (
                                    <TailwindUploadButton
                                        value={field.value ?? undefined}
                                        onChange={field.onChange}
                                        label="Image de section"
                                    />
                                )}
                            />
                            <Button
                                type="button"
                                variant="destructive"
                                onClick={() => remove(index)}
                            >
                                Supprimer section
                            </Button>
                        </div>
                    ))}
                    <Button type="button" onClick={() => append({ subtitle: "", text: "", image: "" })}>
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
                                    if (val === "published") {
                                        field.onChange(true);
                                        setValue("publishedAt", new Date());
                                    } else if (val === "scheduled") {
                                        field.onChange(false);
                                        setValue("publishedAt", values.publishedAt ?? new Date(Date.now() + 60 * 60 * 1000));
                                    } else {
                                        field.onChange(false);
                                        setValue("publishedAt", null);
                                    }
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
                            <Input
                                type="datetime-local"
                                {...register("publishedAt", { valueAsDate: true })}
                                value={values.publishedAt ? formatDateForInput(values.publishedAt) : ""}
                                onChange={(e) => {
                                    const date = e.target.value ? new Date(e.target.value) : null;
                                    setValue("publishedAt", date, { shouldValidate: true });
                                }}
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
