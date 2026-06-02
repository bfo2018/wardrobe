"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { type Product, formatPrice, getProductMainImage } from "@/lib/data";
import { ProductImage } from "@/components/collections/ProductImage";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const occasionLabel = product.occasions[0];
  const mainImage = getProductMainImage(product);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <Link href={`/collections/${product.slug}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-gradient-to-b from-charcoal-muted to-charcoal">
          <ProductImage
            src={mainImage}
            alt={product.name}
            className="group-hover:scale-[1.03]"
          />
          <span className="absolute top-3 left-3 px-3 py-1 text-[10px] uppercase tracking-wider bg-charcoal/80 text-gold border border-gold/30">
            {occasionLabel}
          </span>
        </div>
        <div className="mt-4">
          <h3 className="font-display text-lg text-ivory group-hover:text-gold transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-gold mt-1">
            {formatPrice(product.pricePerDay)}
            <span className="text-ivory/50"> / day</span>
          </p>
          <span className="inline-block mt-3 text-xs uppercase tracking-[0.15em] text-ivory/60 group-hover:text-gold transition-colors border-b border-transparent group-hover:border-gold pb-0.5">
            View Details →
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
