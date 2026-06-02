export const brand = {
  name: "Wardrobe",
  tagline: "RENT IT | BUY IT",
  description:
    "Premium clothing rentals for weddings, parties, and high-end events across India.",
  /** Square-cropped circular lockup (no white margins) */
  logoCircleSrc: "/images/logo-circle.png",
  instagram: "@wardrob__stock__exchange",
  instagramUrl: "https://www.instagram.com/wardrob__stock__exchange/",
  email: "hello@wardrobe.rentals",
  phone: "+91 98267 70724",
  phoneTel: "+919826770724",
  whatsappNumber: "919826770724",
  address: {
    line1: "SHOP NO. 4, HOTEL MAHARAJA PALACE",
    line2: "Jawahar Rd, near AXIS BANK, Narayanpura",
    city: "Chhatarpur, Madhya Pradesh 471001",
  },
  mapsEmbedUrl:
    "https://maps.google.com/maps?q=Hotel+Maharaja+Palace+Jawahar+Rd+Chhatarpur+Madhya+Pradesh+471001&t=&z=15&ie=UTF8&iwloc=&output=embed",
  booking: {
    modalTitle: "Reserve Your Outfit",
    modalSubtitle:
      "Tell us about your celebration — we’ll confirm availability and reach out shortly.",
    modalSubmit: "Confirm Booking",
    successTitle: "Booking Successful!",
    successMessage:
      "Your booking is done. We will contact you shortly with the next steps.",
    heroCta: "Reserve Your Look",
    ctaBannerLine: "Share your event date and style — our team will get back to you soon.",
  },
} as const;

export function brandAddressLines(): string[] {
  return [brand.address.line1, brand.address.line2, brand.address.city];
}

export function brandWhatsAppMessage(context: string) {
  return `Hi ${brand.name}! ${context}`;
}
