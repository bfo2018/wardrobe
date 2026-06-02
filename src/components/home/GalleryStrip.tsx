import Image from "next/image";
import { picsumUrl } from "@/lib/data";
import { brand } from "@/lib/brand";

const gallerySeeds = [
  "g1",
  "g2",
  "g3",
  "g4",
  "g5",
  "g6",
  "g7",
  "g8",
];

export function GalleryStrip() {
  return (
    <section className="py-16 overflow-hidden">
      <p className="text-center text-sm text-ivory/60 mb-6 tracking-wide">
        Follow our work{" "}
        <span className="text-gold">{brand.instagram}</span>
      </p>
      <div className="flex gap-2 px-2 overflow-x-auto scrollbar-hide">
        {gallerySeeds.map((seed) => (
          <div
            key={seed}
            className="relative flex-shrink-0 w-40 h-40 md:w-48 md:h-48"
          >
            <Image
              src={picsumUrl(seed, 400, 400)}
              alt={`${brand.name} rental showcase`}
              fill
              className="object-cover"
              sizes="192px"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
