"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import {
  categories,
  getProductsByCategory,
  type Category,
} from "@/lib/data";
import { ProductCard } from "@/components/collections/ProductCard";

const validCategories = new Set(categories.map((c) => c.id));

export function CollectionsPageClient() {
  const searchParams = useSearchParams();
  const filterParam = searchParams.get("filter") as Category | null;
  const initialFilter =
    filterParam && validCategories.has(filterParam) ? filterParam : "all";

  const [activeFilter, setActiveFilter] = useState<Category>(initialFilter);

  useEffect(() => {
    if (filterParam && validCategories.has(filterParam)) {
      setActiveFilter(filterParam);
    }
  }, [filterParam]);

  const filteredProducts = useMemo(
    () => getProductsByCategory(activeFilter),
    [activeFilter]
  );

  return (
    <div className="pt-28 pb-24 px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <nav className="flex items-center gap-2 text-xs text-ivory/50 mb-8">
          <Link href="/" className="hover:text-gold transition-colors">
            Home
          </Link>
          <ChevronRight size={14} />
          <span className="text-gold">Collections</span>
        </nav>

        <div className="mb-12">
          <p className="text-xs uppercase tracking-[0.3em] text-gold mb-3">
            The Edit
          </p>
          <h1 className="font-display text-4xl md:text-5xl text-ivory">
            Our Collections
          </h1>
          <p className="mt-4 text-ivory/60 max-w-xl">
            Handpicked premium outfits for every celebration. Filter by category
            to find your perfect look.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveFilter(cat.id)}
              className={`px-4 py-2 text-xs uppercase tracking-[0.15em] border transition-all duration-300 ${
                activeFilter === cat.id
                  ? "bg-gold text-charcoal border-gold"
                  : "border-gold/30 text-ivory/70 hover:border-gold hover:text-gold"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProducts.length === 0 && (
          <p className="text-center text-ivory/50 py-16">
            No outfits in this category yet. Check back soon!
          </p>
        )}
      </div>
    </div>
  );
}
