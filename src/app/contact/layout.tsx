import type { Metadata } from "next";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: `Contact | ${brand.name} Premium Clothing Rentals`,
  description: "Visit our Mumbai boutique or get in touch for bookings and enquiries.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
