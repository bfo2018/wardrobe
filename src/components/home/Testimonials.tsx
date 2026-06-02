"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";
import { testimonials } from "@/lib/data";

export function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const current = testimonials[index];

  return (
    <section className="py-24 px-6 lg:px-8 bg-charcoal-light overflow-hidden">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-gold mb-3">
          Love Letters
        </p>
        <h2 className="font-display text-3xl md:text-4xl text-ivory mb-12">
          What Our Clients Say
        </h2>

        <div className="relative min-h-[220px]">
          <span className="font-display text-6xl text-gold/30 absolute -top-4 left-1/2 -translate-x-1/2">
            &ldquo;
          </span>
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.5 }}
              className="pt-8"
            >
              <p className="text-lg md:text-xl text-ivory/90 leading-relaxed italic">
                {current.quote}
              </p>
              <div className="flex justify-center gap-1 mt-6">
                {Array.from({ length: current.rating }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="fill-gold text-gold"
                  />
                ))}
              </div>
              <p className="mt-4 font-display text-lg text-gold">
                {current.name}
              </p>
              <p className="text-sm text-ivory/50">{current.event}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === index ? "bg-gold" : "bg-ivory/20"
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
