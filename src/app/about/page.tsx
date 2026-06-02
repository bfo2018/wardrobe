import Image from "next/image";
import { picsumUrl } from "@/lib/data";
import { brand } from "@/lib/brand";

const stats = [
  { value: "500+", label: "Happy Clients" },
  { value: "1000+", label: "Outfits" },
  { value: "50+", label: "Designer Brands" },
  { value: "100+", label: "Cities Served" },
];

const values = [
  {
    title: "Sustainability",
    description:
      "Renting reduces fashion waste. Every outfit shared is one less garment destined for a landfill.",
  },
  {
    title: "Inclusivity",
    description:
      "Sizes, styles, and budgets for everyone. Luxury should feel welcoming, not exclusive.",
  },
  {
    title: "Luxury for All",
    description:
      "Designer-quality experiences without designer price tags. Celebrate big, spend smart.",
  },
];

export const metadata = {
  title: `About Us | ${brand.name} Premium Clothing Rentals`,
  description: "10 years of dressing dreams across India.",
};

export default function AboutPage() {
  return (
    <div className="pt-28 pb-24">
      <section className="px-6 lg:px-8 max-w-4xl mx-auto text-center mb-20">
        <p className="text-xs uppercase tracking-[0.3em] text-gold mb-3">
          Our Story
        </p>
        <h1 className="font-display text-4xl md:text-5xl text-ivory mb-6">
          10 Years of Dressing Dreams
        </h1>
        <p className="text-ivory/70 leading-relaxed">
          {brand.name} began with a simple belief: everyone deserves to feel like
          royalty on their most important days. What started as a boutique
          wardrobe in Chhatarpur has grown into India&apos;s trusted premium rental
          house — dressing brides, grooms, and families from Jaipur to Bangalore.
        </p>
        <p className="text-ivory/70 leading-relaxed mt-4">
          Our founder, Riya Kapoor, spent a decade in luxury fashion before
          launching {brand.name} to make designer moments accessible. Today, our team of
          stylists, tailors, and concierge specialists ensure every fitting
          feels personal and every outfit tells your story.
        </p>
      </section>

      <section className="px-6 lg:px-8 max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="text-center p-6 border border-gold/10 bg-charcoal-light"
          >
            <p className="font-display text-3xl md:text-4xl text-gold">
              {stat.value}
            </p>
            <p className="text-xs uppercase tracking-wider text-ivory/60 mt-2">
              {stat.label}
            </p>
          </div>
        ))}
      </section>

      <section className="px-6 lg:px-8 max-w-5xl mx-auto mb-24">
        <div className="relative aspect-[21/9] overflow-hidden rounded-sm">
          <Image
            src={picsumUrl("team-photo", 1200, 500)}
            alt={`${brand.name} team`}
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal to-transparent" />
          <p className="absolute bottom-6 left-6 text-sm text-ivory/80">
            The {brand.name} styling team — Chhatarpur, MP
          </p>
        </div>
      </section>

      <section className="px-6 lg:px-8 max-w-5xl mx-auto">
        <h2 className="font-display text-3xl text-ivory text-center mb-12">
          Our Values
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((v) => (
            <div
              key={v.title}
              className="p-8 border-l-2 border-gold bg-charcoal-light"
            >
              <h3 className="font-display text-xl text-gold mb-3">{v.title}</h3>
              <p className="text-sm text-ivory/60 leading-relaxed">
                {v.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
