"use client";

import { useState, useEffect } from "react";

type Props = {
  value?: string; // URL de l'image
  onChange: (url: string) => void;
  label?: string;
};

export default function TailwindUploadButton({ value, onChange, label }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(value || null);

  // Mettre à jour l'aperçu si la valeur change de l'extérieur
  useEffect(() => {
    setPreview(value || null);
  }, [value]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] || null;
    setFile(selected);
    if (selected) {
      setPreview(URL.createObjectURL(selected));
    }
  };



  const handleRemove = () => {
    setFile(null);
    setPreview(null);
    onChange("");
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Sélecteur de fichier */}
      <label className="flex items-center gap-2 bg-gray-100 border border-gray-300 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-200 transition">
        <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
        {file ? "Changer l'image" : label || "Téléverser une image"}
      </label>

      {/* Aperçu */}
      {preview && (
        <div className="relative w-48 h-48">
          <img src={preview} alt="preview" className="w-full h-full object-cover rounded-md" />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition"
          >
            ✕
          </button>
        </div>
      )}



      {/* Lien vers l'image si uploadée */}
      {value && !file && (
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline text-sm truncate max-w-xs"
        >
          Voir l'image
        </a>
      )}
    </div>
  );
}
