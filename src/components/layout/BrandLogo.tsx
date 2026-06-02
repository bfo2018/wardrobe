import Image from "next/image";
import Link from "next/link";
import { brand } from "@/lib/brand";

interface BrandLogoProps {
  /** compact: navbar · default: footer */
  variant?: "compact" | "default";
  className?: string;
}

const sizeMap = {
  compact: 44,
  default: 56,
} as const;

export function BrandLogo({ variant = "compact", className = "" }: BrandLogoProps) {
  const size = sizeMap[variant];

  return (
    <Link
      href="/"
      className={`group flex items-center gap-3 ${className}`}
      aria-label={`${brand.name} — home`}
    >
      <span
        className="relative flex-shrink-0 rounded-full overflow-hidden bg-charcoal ring-1 ring-gold/25 shadow-md transition-transform duration-300 group-hover:scale-105"
        style={{ width: size, height: size }}
      >
        <Image
          src={brand.logoCircleSrc}
          alt={`${brand.name} logo`}
          fill
          sizes={`${size}px`}
          className="object-cover object-center scale-[1.02]"
          priority
        />
      </span>
      {variant === "default" && (
        <div className="flex flex-col leading-tight">
          <span className="font-display text-xl text-ivory group-hover:text-gold transition-colors">
            {brand.name}
          </span>
          <span className="text-[10px] tracking-[0.2em] text-gold/90 uppercase">
            {brand.tagline}
          </span>
        </div>
      )}
    </Link>
  );
}
