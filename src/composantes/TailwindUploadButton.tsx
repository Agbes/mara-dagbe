"use client";

import { useState, useRef } from "react";
import { Button } from "./Admin/ui/button";
import { X } from "lucide-react";

type Props = {
  onSelectFile: (file: File | null) => void;
  existingImage?: string;
};

export default function TailwindUploadButton({ onSelectFile, existingImage }: Props) {
  const [preview, setPreview] = useState<string | undefined>(existingImage);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setPreview(url);
    onSelectFile(file);
  };

  const handleRemove = () => {
    setPreview(undefined);
    if (fileInputRef.current) fileInputRef.current.value = "";
    onSelectFile(null);
  };

  return (
    <div className="flex flex-col gap-2">
      {preview && (
        <div className="relative w-48 h-32">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-full object-cover rounded"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1 hover:bg-black/80 transition"
          >
            <X size={16} />
          </button>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
      />

      <Button type="button" onClick={() => fileInputRef.current?.click()}>
        {preview ? "Changer l'image" : "Uploader une image"}
      </Button>
    </div>
  );
}
