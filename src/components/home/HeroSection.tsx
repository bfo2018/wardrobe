"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { useBookingModal } from "@/context/BookingModalContext";
import { Button } from "@/components/ui/Button";
import { picsumUrl } from "@/lib/data";
import { brand } from "@/lib/brand";
import { trackClickBookNow } from "@/lib/tracking";

export function HeroSection() {
  const { openModal } = useBookingModal();

  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        poster={picsumUrl("hero-fallback", 1920, 1080)}
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source
          src="https://assets.mixkit.co/videos/preview/mixkit-woman-in-a-elegant-dress-walking-in-a-hall-4071-large.mp4"
          type="video/mp4"
        />
      </video>
      <div
        className="absolute inset-0 bg-cover bg-center md:hidden"
        style={{
          backgroundImage: `url(${picsumUrl("hero-fallback", 1920, 1080)})`,
        }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-charcoal/50 to-charcoal" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center mb-8"
        >
          <p
            className="hero-brand-wordmark font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[0.2em] uppercase"
            aria-label={brand.name}
          >
            {brand.name}
          </p>
          <p className="mt-4 text-xs sm:text-sm uppercase tracking-[0.4em] text-gold/90">
            {brand.tagline}
          </p>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-ivory leading-tight"
        >
          Dress Like Royalty.
          <br />
          <span className="text-gold italic">Pay Like a Guest.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 text-ivory/70 text-sm md:text-base max-w-xl mx-auto"
        >
          {brand.description}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <ButtonLink href="/collections" variant="primary" size="lg" shimmer>
            Explore Collection
          </ButtonLink>
          <Button
            variant="secondary"
            size="lg"
            shimmer
            onClick={() => { trackClickBookNow("hero"); openModal(); }}
          >
            {brand.booking.heroCta}
          </Button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-ivory/50">
          Scroll
        </span>
        <ChevronDown className="text-gold animate-bounce-soft" size={24} />
      </motion.div>
    </section>
  );
}
