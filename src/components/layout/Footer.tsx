"use client";

import Link from "next/link";
import { Instagram, MessageCircle, Facebook } from "lucide-react";
import { useState } from "react";
import { getWhatsAppUrl } from "@/lib/webhook";
import { brand } from "@/lib/brand";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { trackClickWhatsApp, trackClickCall } from "@/lib/tracking";

const collectionLinks = [
  { href: "/collections?filter=bridal", label: "Bridal" },
  { href: "/collections?filter=groom", label: "Groom" },
  { href: "/collections?filter=indo-western", label: "Indo-Western" },
  { href: "/collections?filter=party", label: "Party Wear" },
];

const quickLinks = [
  { href: "/book", label: "Book a Fitting" },
  { href: "/about", label: "Our Story" },
  { href: "/contact", label: "Contact Us" },
  { href: "/collections", label: "All Collections" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubscribed(true);
  };

  return (
    <footer className="border-t border-gold/10 bg-charcoal-light">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <BrandLogo variant="default" className="mb-4" />
            <p className="mt-4 text-sm text-ivory/60 leading-relaxed">
              {brand.description} Luxury for every celebration.
            </p>
            <div className="mt-6 flex gap-4">
              <a
                href={brand.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ivory/60 hover:text-gold transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ivory/60 hover:text-gold transition-colors"
                aria-label="WhatsApp"
                onClick={() => trackClickWhatsApp("footer")}
              >
                <MessageCircle size={20} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ivory/60 hover:text-gold transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-gold mb-4">
              Collections
            </h4>
            <ul className="space-y-2">
              {collectionLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-ivory/60 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-gold mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-ivory/60 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-gold mb-4">
              Contact
            </h4>
            <address className="not-italic text-sm text-ivory/60 space-y-2">
              <p>{brand.address.line1}</p>
              <p>{brand.address.line2}</p>
              <p>{brand.address.city}</p>
              <p className="pt-2">
                <a href={`tel:${brand.phoneTel}`} className="hover:text-gold" onClick={() => trackClickCall()}>
                  {brand.phone}
                </a>
              </p>
              <p>
                <a href={`mailto:${brand.email}`} className="hover:text-gold">
                  {brand.email}
                </a>
              </p>
              <p className="text-gold">{brand.instagram}</p>
            </address>

            <form onSubmit={handleNewsletter} className="mt-6">
              <p className="text-xs uppercase tracking-wider text-gold mb-2">
                Newsletter
              </p>
              {subscribed ? (
                <p className="text-sm text-gold">Thank you for subscribing!</p>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    className="input-field flex-1 text-sm py-2"
                    required
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-gold text-charcoal text-xs uppercase tracking-wider hover:bg-gold-light transition-colors"
                  >
                    Join
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gold/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-ivory/40">
            © {new Date().getFullYear()} {brand.name} Premium Clothing Rentals. All
            rights reserved.
          </p>
          <p className="text-xs text-ivory/40">
            Crafted for celebrations across India
          </p>
        </div>
      </div>
    </footer>
  );
}
