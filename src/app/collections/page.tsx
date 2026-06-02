import { Suspense } from "react";
import { CollectionsPageClient } from "@/components/collections/CollectionsPageClient";

import { brand } from "@/lib/brand";

export const metadata = {
  title: `Collections | ${brand.name} Premium Clothing Rentals`,
  description: "Browse bridal lehengas, sherwanis, Indo-western, party wear and more.",
};

export default function CollectionsPage() {
  return (
    <Suspense
      fallback={
        <div className="pt-32 text-center text-ivory/50">Loading collections...</div>
      }
    >
      <CollectionsPageClient />
    </Suspense>
  );
}
