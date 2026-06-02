"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import {
  type Product,
  formatPrice,
  getRelatedProducts,
} from "@/lib/data";
import { useBookingModal } from "@/context/BookingModalContext";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/collections/ProductCard";
import { ProductImage } from "@/components/collections/ProductImage";
import { trackViewProduct } from "@/lib/tracking";

interface ProductDetailClientProps {
  product: Product;
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const { openModal } = useBookingModal();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedDuration, setSelectedDuration] = useState<1 | 3 | 7>(1);
  const [selectedOccasion, setSelectedOccasion] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectionError, setSelectionError] = useState<string | null>(null);

  useEffect(() => {
    trackViewProduct(
      product.slug,
      product.name,
      product.category,
      product.pricePerDay
    );
  }, [product.slug, product.name, product.category, product.pricePerDay]);

  const galleryImages = product.images;

  const selectedPricing = product.pricing.find(
    (p) => p.days === selectedDuration
  )!;

  const related = getRelatedProducts(product);

  const canBook = selectedOccasion !== null && selectedSize !== null;

  const handleBook = () => {
    if (!canBook) {
      setSelectionError(
        "Please select an occasion and size before booking this outfit."
      );
      return;
    }
    setSelectionError(null);
    openModal({
      productSlug: product.slug,
      productName: product.name,
      occasion: selectedOccasion,
      size: selectedSize,
      rentalDuration: `${selectedDuration} day${selectedDuration > 1 ? "s" : ""}`,
      rentalPrice: formatPrice(selectedPricing.price),
    });
  };

  return (
    <div className="pt-28 pb-24 px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <nav className="flex items-center gap-2 text-xs text-ivory/50 mb-8 flex-wrap">
          <Link href="/" className="hover:text-gold">
            Home
          </Link>
          <ChevronRight size={14} />
          <Link href="/collections" className="hover:text-gold">
            Collections
          </Link>
          <ChevronRight size={14} />
          <span className="text-gold line-clamp-1">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <div>
            <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-gradient-to-b from-charcoal-muted to-charcoal">
              <ProductImage
                src={galleryImages[selectedImage]}
                alt={product.name}
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div
              className={`grid gap-2 mt-4 ${
                galleryImages.length >= 5
                  ? "grid-cols-5"
                  : `grid-cols-${galleryImages.length}`
              }`}
              style={{
                gridTemplateColumns: `repeat(${galleryImages.length}, minmax(0, 1fr))`,
              }}
            >
              {galleryImages.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setSelectedImage(i)}
                  className={`relative aspect-square overflow-hidden rounded-sm border-2 bg-charcoal-muted transition-colors ${
                    selectedImage === i
                      ? "border-gold"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <ProductImage
                    src={src}
                    alt={`${product.name} view ${i + 1}`}
                    sizes="80px"
                    className="!p-1"
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-gold mb-2">
              {product.category.replace("-", " ")}
            </p>
            <h1 className="font-display text-3xl md:text-4xl text-ivory">
              {product.name}
            </h1>
            <p className="mt-6 text-ivory/70 leading-relaxed">
              {product.description}
            </p>

            <div className="mt-8">
              <p className="label-field">Occasion *</p>
              <div className="flex flex-wrap gap-2" role="group" aria-label="Select occasion">
                {product.occasions.map((o) => (
                  <button
                    key={o}
                    type="button"
                    onClick={() => {
                      setSelectedOccasion(o);
                      setSelectionError(null);
                    }}
                    aria-pressed={selectedOccasion === o}
                    className={`px-3 py-2 text-xs border transition-all cursor-pointer ${
                      selectedOccasion === o
                        ? "border-gold bg-gold/10 text-gold"
                        : "border-gold/30 text-ivory/70 hover:border-gold hover:text-gold"
                    }`}
                  >
                    {o}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <p className="label-field">Available Size *</p>
              <div className="flex flex-wrap gap-2" role="group" aria-label="Select size">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => {
                      setSelectedSize(s);
                      setSelectionError(null);
                    }}
                    aria-pressed={selectedSize === s}
                    className={`min-w-10 h-10 px-2 flex items-center justify-center text-sm border transition-all cursor-pointer ${
                      selectedSize === s
                        ? "border-gold bg-gold/10 text-gold"
                        : "border-ivory/20 text-ivory/70 hover:border-gold hover:text-gold"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <p className="label-field">Rental Duration</p>
              <div className="flex gap-2">
                {product.pricing.map((p) => (
                  <button
                    key={p.days}
                    type="button"
                    onClick={() => setSelectedDuration(p.days)}
                    className={`flex-1 py-3 text-sm border transition-all ${
                      selectedDuration === p.days
                        ? "border-gold bg-gold/10 text-gold"
                        : "border-ivory/20 text-ivory/70 hover:border-gold/50"
                    }`}
                  >
                    <span className="block font-medium">{p.days} Day{p.days > 1 ? "s" : ""}</span>
                    <span className="block text-xs mt-1 opacity-80">
                      {formatPrice(p.price)}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-10 p-6 border border-gold/20 bg-charcoal-light">
              <p className="text-sm text-ivory/60">Total rental price</p>
              <p className="font-display text-3xl text-gold mt-1">
                {formatPrice(selectedPricing.price)}
              </p>
              <p className="text-xs text-ivory/40 mt-1">
                for {selectedDuration} day{selectedDuration > 1 ? "s" : ""}
              </p>
            </div>

            {selectionError && (
              <p className="error-text mt-6 text-center">{selectionError}</p>
            )}

            <Button
              variant="primary"
              size="lg"
              shimmer
              className={`w-full mt-8 ${!canBook ? "opacity-80" : ""}`}
              onClick={handleBook}
            >
              Book This Outfit
            </Button>
            {!canBook && (
              <p className="text-xs text-ivory/40 text-center mt-2">
                Select an occasion and size to continue
              </p>
            )}
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-24">
            <h2 className="font-display text-2xl text-ivory mb-8">
              Related Outfits
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {related.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
