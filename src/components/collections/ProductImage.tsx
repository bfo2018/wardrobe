import Image from "next/image";
import { isTransparentProductImage } from "@/lib/product-images";

interface ProductImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
  className?: string;
}

export function ProductImage({
  src,
  alt,
  fill = true,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 33vw",
  className = "",
}: ProductImageProps) {
  const transparent = isTransparentProductImage(src);
  const fitClass = transparent
    ? "object-contain object-center p-2 sm:p-4"
    : "object-cover object-center";

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      priority={priority}
      sizes={sizes}
      className={`${fitClass} transition-transform duration-500 ${className}`}
    />
  );
}
