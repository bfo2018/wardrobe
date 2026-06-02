/** Real wardrobe photos — files in public/images/products/ */

export const bridalImages = [
  "/images/products/bridal/bridal-1.jpg",
  "/images/products/bridal/bridal-2.avif",
  "/images/products/bridal/bridal-3.jpeg",
  "/images/products/bridal/bridal-4.png",
  "/images/products/bridal/bridal-5.png",
] as const;

export const groomImages = [
  "/images/products/groom/groom-1.webp",
  "/images/products/groom/groom-2.png",
  "/images/products/groom/groom-3.png",
  "/images/products/groom/groom-4.png",
  "/images/products/groom/groom-5.jpg",
] as const;

export const sariImages = [
  "/images/products/sari/sari-1.jpg",
  "/images/products/sari/sari-2.webp",
  "/images/products/sari/sari-3.png",
  "/images/products/sari/sari-4.png",
  "/images/products/sari/sari-5.png",
] as const;

/** Rotate through a pool so each listing gets a distinct hero + gallery */
export function productGallery(
  pool: readonly string[],
  offset: number,
  count = 5
): string[] {
  return Array.from(
    { length: Math.min(count, pool.length) },
    (_, i) => pool[(offset + i) % pool.length]
  );
}

export function isTransparentProductImage(src: string): boolean {
  return /\.(png|webp|avif)$/i.test(src);
}
