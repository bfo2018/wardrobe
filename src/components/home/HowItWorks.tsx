"use client";

import { motion } from "framer-motion";
import { Search, CalendarCheck, Ruler, Sparkles } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Browse & Select",
    description: "Explore our curated collection online or visit our boutique.",
  },
  {
    icon: CalendarCheck,
    title: "Book & Confirm",
    description: "Reserve your outfit with a quick booking — we confirm within 2 hours.",
  },
  {
    icon: Ruler,
    title: "Try & Fit",
    description: "Home visit or in-store fitting to ensure a perfect silhouette.",
  },
  {
    icon: Sparkles,
    title: "Wear & Return",
    description: "Shine at your event. We handle pickup after the celebration.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 px-6 lg:px-8 bg-charcoal-light">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-gold mb-3">
            Simple & Seamless
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-ivory">
            How It Works
          </h2>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-12 left-[12%] right-[12%] h-px bg-gold/30 origin-left">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="h-full bg-gold origin-left"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative text-center"
              >
                <div className="mx-auto w-24 h-24 rounded-full border border-gold/40 flex items-center justify-center bg-charcoal mb-6 relative z-10">
                  <step.icon className="text-gold" size={32} strokeWidth={1.5} />
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gold text-charcoal text-sm font-medium flex items-center justify-center">
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-display text-lg text-ivory mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-ivory/60 leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
