"use client";

import { Upload, Loader2 } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

interface CloudinaryUploadProps {
  folderName?: string;
  onUploadSuccess?: (url: string) => void;
}

export default function CloudinaryUpload({
  folderName = "cloudinary-tutorial",
  onUploadSuccess,
}: CloudinaryUploadProps) {
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadFileLoading, setUploadFileLoading] = useState(false);
  const [fileLink, setFileLink] = useState<string | null>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setUploadFile(file);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!uploadFile) {
      alert("File is required");
      return;
    }

    setUploadFileLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", uploadFile);
      formData.append("folderName", folderName);

      const res = await fetch("/api/fileupload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Upload failed");
      }

      const data: {
        error?: string;
        res?: { secure_url: string };
      } = await res.json();

      if (data.error || !data.res?.secure_url) {
        throw new Error("Invalid response");
      }

      const url = data.res.secure_url;
      setFileLink(url);
      setUploadFile(null);

      if (onUploadSuccess) {
        onUploadSuccess(url);
      }
    } catch (err) {
      console.error(err);
      alert("Error uploading file");
    } finally {
      setUploadFileLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center gap-5 bg-white rounded-2xl shadow-lg p-6 w-full"
    >
      <h2 className="text-lg font-semibold text-gray-600">Upload File</h2>

      {/* Input caché */}
      <input
        type="file"
        id="file-input"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Label */}
      <label
        htmlFor="file-input"
        className="flex items-center gap-2 bg-gray-100 border cursor-pointer border-gray-200 px-5 py-2 rounded-xl transition hover:shadow-md"
      >
        <Upload size={17} />
        {uploadFile ? "Changer le fichier" : "Choisir un fichier"}
      </label>

      {/* Preview */}
      {uploadFile && (
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm text-gray-600 truncate max-w-[220px]">
            {uploadFile.name}
          </span>
          {uploadFile.type.startsWith("image/") && (
            <img
              src={URL.createObjectURL(uploadFile)}
              alt="preview"
              className="max-w-[200px] rounded-lg shadow-md"
            />
          )}
        </div>
      )}

      {/* Bouton upload */}
      <button
        type="submit"
        disabled={uploadFileLoading}
        className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-xl transition hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {uploadFileLoading ? (
          <>
            <Loader2 className="animate-spin" size={18} />
            <span>Uploading...</span>
          </>
        ) : (
          <>
            <Upload size={15} />
            <span>Upload</span>
          </>
        )}
      </button>

      {/* Lien final */}
      {fileLink && (
        <Link
          href={fileLink}
          target="_blank"
          className="text-blue-600 underline text-sm"
        >
          Voir le fichier
        </Link>
      )}
    </form>
  );
}
