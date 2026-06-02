"use client";

import { motion } from "framer-motion";
import { useBookingModal } from "@/context/BookingModalContext";
import { Button } from "@/components/ui/Button";
import { brand } from "@/lib/brand";

export function CtaBanner() {
  const { openModal } = useBookingModal();

  return (
    <section className="relative py-24 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal-light to-charcoal" />
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--color-gold)_0%,_transparent_70%)]" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative mx-auto max-w-3xl text-center"
      >
        <h2 className="font-display text-3xl md:text-4xl text-ivory leading-snug">
          Your dream outfit is one booking away.
        </h2>
        <p className="mt-4 text-ivory/60">
          {brand.booking.ctaBannerLine}
        </p>
        <Button
          variant="primary"
          size="lg"
          shimmer
          className="mt-8"
          onClick={() => openModal()}
        >
          Book Now
        </Button>
      </motion.div>
    </section>
  );
}
