import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImage = async (filePath: string) => {
  const result = await cloudinary.uploader.upload(filePath, {
    folder: "articles",
  });
  return { url: result.secure_url, publicId: result.public_id };
};

export const deleteImage = async (publicId?: string) => {
  if (!publicId) return;
  await cloudinary.uploader.destroy(publicId);
};
