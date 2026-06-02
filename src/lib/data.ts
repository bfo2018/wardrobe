import {
  bridalImages,
  groomImages,
  sariImages,
  productGallery,
} from "@/lib/product-images";

export type Category =
  | "all"
  | "bridal"
  | "groom"
  | "indo-western"
  | "party"
  | "kids"
  | "western";

export type Occasion =
  | "Wedding"
  | "Reception"
  | "Sangeet"
  | "Mehendi"
  | "Birthday"
  | "Corporate"
  | "Party";

export interface Product {
  slug: string;
  name: string;
  description: string;
  category: Exclude<Category, "all">;
  images: string[];
  pricePerDay: number;
  occasions: Occasion[];
  sizes: string[];
  pricing: { days: 1 | 3 | 7; price: number }[];
}

export const categories: { id: Category; label: string }[] = [
  { id: "all", label: "All" },
  { id: "bridal", label: "Bridal" },
  { id: "groom", label: "Groom" },
  { id: "indo-western", label: "Indo-Western" },
  { id: "party", label: "Party" },
  { id: "kids", label: "Kids" },
  { id: "western", label: "Western" },
];

/** Local images live in public/images/featured/ — see README in that folder */
export const featuredCollections = [
  {
    name: "Bridal Lehenga",
    slug: "bridal-lehenga",
    image: "/images/featured/bridal-lehenga.png",
    href: "/collections?filter=bridal",
    /** CSS object-position — portrait art, face upper third */
    imagePosition: "center 12%",
    gridClass: "lg:col-span-4 lg:row-span-2 min-h-[480px] lg:min-h-0",
  },
  {
    name: "Groom Sherwani",
    slug: "groom-sherwani",
    image: "/images/featured/groom-sherwani.png",
    href: "/collections?filter=groom",
    imagePosition: "center 8%",
    gridClass: "lg:col-span-4 min-h-[360px]",
  },
  {
    name: "Indo-Western Fusion",
    slug: "indo-western",
    image: "/images/featured/indo-western.png",
    href: "/collections?filter=indo-western",
    imagePosition: "center 8%",
    gridClass: "lg:col-span-4 min-h-[360px]",
  },
  {
    name: "Party Wear",
    slug: "party-wear",
    image: "/images/featured/party-wear.png",
    href: "/collections?filter=party",
    imagePosition: "center 10%",
    gridClass: "lg:col-span-8 min-h-[400px]",
  },
  {
    name: "Kids Ethnic",
    slug: "kids-ethnic",
    image: "/images/featured/kids-ethnic.png",
    href: "/collections?filter=kids",
    imagePosition: "center 15%",
    gridClass: "lg:col-span-4 min-h-[360px]",
  },
  {
    name: "Western Formals",
    slug: "western-formals",
    image: "/images/featured/western-formals.png",
    href: "/collections?filter=western",
    imagePosition: "center 8%",
    gridClass: "lg:col-span-8 min-h-[360px]",
  },
];

export const products: Product[] = [
  {
    slug: "royal-crimson-bridal-lehenga",
    name: "Royal Crimson Bridal Lehenga",
    description:
      "Hand-embroidered crimson lehenga with zardozi work, paired with a dupatta and choli. Perfect for the wedding day.",
    category: "bridal",
    images: productGallery(bridalImages, 0),
    pricePerDay: 8500,
    occasions: ["Wedding", "Reception"],
    sizes: ["XS", "S", "M", "L", "XL"],
    pricing: [
      { days: 1, price: 8500 },
      { days: 3, price: 22000 },
      { days: 7, price: 45000 },
    ],
  },
  {
    slug: "emerald-garden-lehenga",
    name: "Emerald Garden Lehenga",
    description:
      "Floral motifs on emerald silk with delicate sequin detailing. A reception favourite.",
    category: "bridal",
    images: productGallery(bridalImages, 1),
    pricePerDay: 7200,
    occasions: ["Reception", "Sangeet"],
    sizes: ["S", "M", "L", "XL"],
    pricing: [
      { days: 1, price: 7200 },
      { days: 3, price: 18500 },
      { days: 7, price: 38000 },
    ],
  },
  {
    slug: "ivory-pearl-bridal-set",
    name: "Ivory Pearl Bridal Set",
    description:
      "Timeless ivory lehenga with pearl embellishments and a flowing trail dupatta.",
    category: "bridal",
    images: productGallery(bridalImages, 2),
    pricePerDay: 9500,
    occasions: ["Wedding", "Reception"],
    sizes: ["XS", "S", "M", "L"],
    pricing: [
      { days: 1, price: 9500 },
      { days: 3, price: 25000 },
      { days: 7, price: 52000 },
    ],
  },
  {
    slug: "midnight-velvet-sherwani",
    name: "Midnight Velvet Sherwani",
    description:
      "Deep midnight velvet sherwani with gold threadwork and matching stole. Regal groom attire.",
    category: "groom",
    images: productGallery(groomImages, 0),
    pricePerDay: 5500,
    occasions: ["Wedding", "Reception"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    pricing: [
      { days: 1, price: 5500 },
      { days: 3, price: 14000 },
      { days: 7, price: 28000 },
    ],
  },
  {
    slug: "champagne-brocade-sherwani",
    name: "Champagne Brocade Sherwani",
    description:
      "Champagne brocade with subtle self-pattern and pearl buttons. Ideal for sangeet and reception.",
    category: "groom",
    images: productGallery(groomImages, 1),
    pricePerDay: 4800,
    occasions: ["Sangeet", "Reception", "Wedding"],
    sizes: ["M", "L", "XL", "XXL"],
    pricing: [
      { days: 1, price: 4800 },
      { days: 3, price: 12000 },
      { days: 7, price: 24000 },
    ],
  },
  {
    slug: "heritage-bandhgala",
    name: "Heritage Bandhgala",
    description:
      "Classic bandhgala in heritage maroon with gold buttons. Versatile for wedding and corporate events.",
    category: "groom",
    images: productGallery(groomImages, 2),
    pricePerDay: 3500,
    occasions: ["Wedding", "Corporate", "Reception"],
    sizes: ["S", "M", "L", "XL"],
    pricing: [
      { days: 1, price: 3500 },
      { days: 3, price: 9000 },
      { days: 7, price: 18000 },
    ],
  },
  {
    slug: "saffron-fusion-ensemble",
    name: "Saffron Fusion Ensemble",
    description:
      "Indo-western kurta-jacket set in saffron with contemporary cuts. Stand out at any celebration.",
    category: "indo-western",
    images: productGallery([...bridalImages, ...sariImages], 3),
    pricePerDay: 4200,
    occasions: ["Sangeet", "Mehendi", "Party"],
    sizes: ["S", "M", "L", "XL"],
    pricing: [
      { days: 1, price: 4200 },
      { days: 3, price: 10500 },
      { days: 7, price: 21000 },
    ],
  },
  {
    slug: "midnight-anarkali-gown",
    name: "Midnight Anarkali Gown",
    description:
      "Floor-length anarkali gown blending Indian embroidery with western silhouette.",
    category: "indo-western",
    images: productGallery([...bridalImages, ...sariImages], 5),
    pricePerDay: 3800,
    occasions: ["Reception", "Sangeet", "Party"],
    sizes: ["XS", "S", "M", "L"],
    pricing: [
      { days: 1, price: 3800 },
      { days: 3, price: 9500 },
      { days: 7, price: 19000 },
    ],
  },
  {
    slug: "sequin-cocktail-saree",
    name: "Sequin Cocktail Saree",
    description:
      "Pre-draped sequin saree with a modern blouse. Ready in minutes, stunning all night.",
    category: "party",
    images: productGallery(sariImages, 0),
    pricePerDay: 3200,
    occasions: ["Party", "Reception", "Birthday"],
    sizes: ["S", "M", "L"],
    pricing: [
      { days: 1, price: 3200 },
      { days: 3, price: 8000 },
      { days: 7, price: 16000 },
    ],
  },
  {
    slug: "ruby-evening-gown",
    name: "Ruby Evening Gown",
    description:
      "Floor-length ruby gown with a subtle train. Perfect for gala nights and receptions.",
    category: "party",
    images: productGallery(sariImages, 2),
    pricePerDay: 4500,
    occasions: ["Reception", "Party", "Corporate"],
    sizes: ["XS", "S", "M", "L"],
    pricing: [
      { days: 1, price: 4500 },
      { days: 3, price: 11500 },
      { days: 7, price: 23000 },
    ],
  },
  {
    slug: "little-prince-kurta-set",
    name: "Little Prince Kurta Set",
    description:
      "Adorable kurta-pajama set for boys aged 4–12 with matching stole. Wedding-ready.",
    category: "kids",
    images: productGallery(bridalImages, 3, 4),
    pricePerDay: 1500,
    occasions: ["Wedding", "Sangeet"],
    sizes: ["4Y", "6Y", "8Y", "10Y", "12Y"],
    pricing: [
      { days: 1, price: 1500 },
      { days: 3, price: 3800 },
      { days: 7, price: 7500 },
    ],
  },
  {
    slug: "classic-black-tuxedo",
    name: "Classic Black Tuxedo",
    description:
      "Tailored black tuxedo with satin lapels, bow tie, and cufflinks included.",
    category: "western",
    images: productGallery(groomImages, 3),
    pricePerDay: 4000,
    occasions: ["Reception", "Corporate", "Party"],
    sizes: ["S", "M", "L", "XL"],
    pricing: [
      { days: 1, price: 4000 },
      { days: 3, price: 10000 },
      { days: 7, price: 20000 },
    ],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: Category): Product[] {
  if (category === "all") return products;
  return products.filter((p) => p.category === category);
}

export function getRelatedProducts(
  product: Product,
  limit = 4
): Product[] {
  return products
    .filter((p) => p.slug !== product.slug && p.category === product.category)
    .slice(0, limit);
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function picsumUrl(seed: string, width = 800, height = 1000): string {
  return `https://picsum.photos/seed/${seed}/${width}/${height}`;
}

export function getProductMainImage(product: Product): string {
  return product.images[0];
}

export const testimonials = [
  {
    name: "Priya & Arjun",
    event: "Wedding — Mumbai",
    rating: 5,
    quote:
      "Wardrobe made our wedding outfits effortless. The lehenga fit perfectly after one home visit. Our guests couldn't believe we rented!",
  },
  {
    name: "Rahul Mehta",
    event: "Reception — Delhi",
    rating: 5,
    quote:
      "Premium quality sherwanis at a fraction of buying. The team was professional and delivery was on time.",
  },
  {
    name: "Ananya Sharma",
    event: "Sangeet — Bangalore",
    rating: 5,
    quote:
      "I found the perfect Indo-western outfit for my sister's sangeet. Booking was seamless and the outfit was stunning.",
  },
  {
    name: "Vikram & Neha",
    event: "Wedding — Jaipur",
    rating: 5,
    quote:
      "From consultation to return, everything was white-glove service. Wardrobe is our go-to for every family event now.",
  },
  {
    name: "Sneha Kapoor",
    event: "Corporate Gala — Pune",
    rating: 5,
    quote:
      "Rented a tuxedo for a corporate awards night. Looked bespoke, felt luxurious. Highly recommend.",
  },
];

export const eventTypes = [
  "Wedding",
  "Reception",
  "Sangeet",
  "Birthday",
  "Corporate",
  "Other",
] as const;

export const outfitCategories = [
  "Bridal Lehenga",
  "Groom Sherwani",
  "Indo-Western",
  "Party Wear",
  "Kids Ethnic",
  "Western Formals",
  "Saree",
  "Other",
] as const;
