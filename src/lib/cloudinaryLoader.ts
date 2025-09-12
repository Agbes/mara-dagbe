// lib/cloudinaryLoader.ts
export default function cloudinaryLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  return `https://res.cloudinary.com/toncloud/image/upload/w_${width},q_${quality || 75}/${src}`;
}
