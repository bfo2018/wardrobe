import type { Metadata } from "next";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: `Book a Fitting | ${brand.name} Premium Clothing Rentals`,
  description: "Reserve your premium outfit for weddings, parties, and celebrations.",
};

export default function BookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
