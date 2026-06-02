import { notFound } from "next/navigation";
import { getProductBySlug, products } from "@/lib/data";
import { brand } from "@/lib/brand";
import { ProductDetailClient } from "@/components/collections/ProductDetailClient";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: `Not Found | ${brand.name}` };
  return {
    title: `${product.name} | ${brand.name}`,
    description: product.description,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  return <ProductDetailClient product={product} />;
}
