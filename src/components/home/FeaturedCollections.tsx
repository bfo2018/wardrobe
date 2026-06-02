"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { featuredCollections } from "@/lib/data";

export function FeaturedCollections() {
  return (
    <section className="py-24 px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-gold mb-3">
            Curated For You
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-ivory">
            Featured Collections
          </h2>
        </div>

        {/* 12-col bento: taller cells + top-anchored crop for portrait artwork */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 lg:auto-rows-[minmax(300px,auto)]">
          {featuredCollections.map((item, i) => (
            <motion.div
              key={item.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`relative group overflow-hidden rounded-sm ${item.gridClass}`}
            >
              <Link href={item.href} className="block h-full min-h-[inherit]">
                <div className="absolute inset-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04] origin-top"
                    style={{ objectPosition: item.imagePosition }}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority={i < 3}
                  />
                </div>
                {/* Strong gradient at bottom only — keeps faces clear at top */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 via-35% to-transparent to-65% opacity-95 group-hover:opacity-100 transition-opacity pointer-events-none" />
                <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6 pointer-events-none">
                  <h3 className="font-display text-xl md:text-2xl text-ivory drop-shadow-lg">
                    {item.name}
                  </h3>
                  <div className="mt-3 overflow-hidden max-h-0 group-hover:max-h-12 transition-all duration-500">
                    <span className="inline-block text-xs uppercase tracking-[0.2em] text-gold border-b border-gold pb-1">
                      View Collection →
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
