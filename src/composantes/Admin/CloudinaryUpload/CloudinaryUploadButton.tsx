"use client";

import { CldUploadWidget } from "next-cloudinary";
import { Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";

type Props = {
  value?: string | null;
  onChange: (url: string) => void;
  label?: string;
};

type CloudinaryResult = {
  info: {
    secure_url: string;
    // tu peux ajouter d’autres propriétés si besoin
  };
};

export default function CloudinaryUploadButton({ value, onChange, label }: Props) {
  return (
    <div className="space-y-2">
      <CldUploadWidget
        uploadPreset="unsigned_upload" // ⚡ ton preset unsigned
        options={{
          folder: "articles",
          sources: ["local", "url", "camera"], // autorise plusieurs sources
          multiple: false,
        }}
        onSuccess={(result: unknown) => {
          const r = result as CloudinaryResult | undefined;
          if (r?.info?.secure_url) {
            onChange(r.info.secure_url);
          }
        }}


      >


        {({ open }) => (
          <Button
            type="button"
            onClick={() => open()}
            variant={value ? "secondary" : "default"}
          >
            <ImageIcon className="mr-2 h-4 w-4" />
            {value ? "Changer l’image" : label ?? "Choisir une image"}
          </Button>
        )}
      </CldUploadWidget>

      {value && (
        <Image
          src={value}
          alt="uploaded preview"
          className="h-40 w-full object-cover rounded-lg mt-2 border"
          width={300}
          height={200}
        />
      )}
    </div>
  );
}
