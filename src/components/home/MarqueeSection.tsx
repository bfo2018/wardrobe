const items =
  "Sherwani · Lehenga · Indo-Western · Saree · Tuxedo · Bridal Wear · Groom Suits · Party Wear ·";

export function MarqueeSection() {
  const content = `${items} ${items}`;

  return (
    <section className="bg-charcoal-light border-y border-gold/10 py-4 overflow-hidden">
      <div className="flex whitespace-nowrap animate-marquee">
        <span className="text-gold font-display text-lg md:text-xl tracking-[0.2em] px-4">
          {content}
        </span>
        <span
          className="text-gold font-display text-lg md:text-xl tracking-[0.2em] px-4"
          aria-hidden
        >
          {content}
        </span>
      </div>
    </section>
  );
}
