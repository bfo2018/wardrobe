import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BookingModalProvider } from "@/context/BookingModalContext";
import { BookingModal } from "@/components/booking/BookingModal";
import { MetaPixel } from "@/components/tracking/MetaPixel";
import { GoogleAnalytics } from "@/components/tracking/GoogleAnalytics";
import { PageViewTracker } from "@/components/tracking/PageViewTracker";
import { brand } from "@/lib/brand";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${brand.name} — Premium Clothing Rentals | ${brand.tagline}`,
  description: `${brand.description} Bridal lehengas, sherwanis, Indo-western & more.`,
  keywords: [
    "clothing rental",
    "wedding outfit rental",
    "lehenga rental",
    "sherwani rental",
    "India",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="font-body antialiased">
        <MetaPixel />
        <GoogleAnalytics />
        <BookingModalProvider>
          <PageViewTracker />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <BookingModal />
        </BookingModalProvider>
      </body>
    </html>
  );
}
