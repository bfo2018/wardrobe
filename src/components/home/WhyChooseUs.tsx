"use client";

import { motion } from "framer-motion";
import { Award, ShieldCheck, Truck } from "lucide-react";

const features = [
  {
    icon: Award,
    title: "Premium Brands",
    description:
      "Designer labels and handpicked pieces from India's finest ateliers — no compromises on quality.",
  },
  {
    icon: ShieldCheck,
    title: "Perfect Fit Guarantee",
    description:
      "Expert tailoring adjustments and dedicated fittings so your outfit drapes flawlessly.",
  },
  {
    icon: Truck,
    title: "Doorstep Delivery",
    description:
      "White-glove delivery and pickup across 100+ cities. Your celebration, our logistics.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-24 px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-gold mb-3">
            The Wardrobe Difference
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-ivory">
            Why Choose Us
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="p-8 border border-gold/10 bg-charcoal-light rounded-sm hover:border-gold/30 transition-all duration-300"
            >
              <feature.icon
                className="text-gold mb-6"
                size={36}
                strokeWidth={1.5}
              />
              <h3 className="font-display text-xl text-ivory mb-3">
                {feature.title}
              </h3>
              <p className="text-sm text-ivory/60 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
