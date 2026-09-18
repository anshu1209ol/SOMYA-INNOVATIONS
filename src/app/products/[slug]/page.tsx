import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createMetadata } from "@/lib/seo";
import {
  getProductBySlug,
  getProducts,
  getRelatedProducts,
  type ProductCategory,
} from "@/lib/products";
import {
  Badge,
  H2,
  Text,
  Breadcrumbs,
} from "@/components/ui";
import { ButtonLink } from "@/components/buttons";
import {
  ArrowRight,
  CheckCircle,
  ShieldCheck,
  Info,
  Monitor,
  Network,
  Mouse,
  Video,
  Tv,
  Printer,
  Sparkles,
  Layers,
  ArrowLeft,
} from "lucide-react";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found | SOMYA INNOVATIONS",
    };
  }

  return createMetadata({
    title: `${product.name} | ${product.category} Equipment`,
    description: product.shortDescription,
    path: `/products/${product.slug}`,
  });
}

function CategoryIcon({
  category,
  className,
}: {
  category: ProductCategory;
  className?: string;
}) {
  switch (category) {
    case "Computing":
      return <Monitor className={className} />;
    case "Networking":
      return <Network className={className} />;
    case "Accessories":
      return <Mouse className={className} />;
    case "Security":
      return <Video className={className} />;
    case "Electronics":
      return <Tv className={className} />;
    case "Office Technology":
      return <Printer className={className} />;
    default:
      return <Sparkles className={className} />;
  }
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(product.id, product.category, 3);

  return (
    <div className="py-12 sm:py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs
          items={[
            { label: "Products", href: "/products" },
            { label: product.category, href: `/products?category=${encodeURIComponent(product.category)}` },
            { label: product.name },
          ]}
        />

        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Products Catalogue</span>
          </Link>
        </div>

        {/* ─── DEMO CATALOG SOURCING NOTICE ───────────────────────────── */}
        <div className="mb-10 p-4 rounded-xl bg-indigo-950/20 border border-indigo-500/20 flex items-start gap-3">
          <Info className="w-4 h-4 text-indigo-400 mt-0.5 shrink-0" />
          <p className="text-xs text-zinc-400 leading-relaxed">
            <span className="font-semibold text-zinc-200">Catalogue Architecture Notice:</span>{" "}
            This item illustrates equipment configurations available through our procurement network.
            In adherence to B2B transparent sourcing standards, static retail prices are not listed.
            Contact our procurement desk for current OEM batch pricing, availability lead-times, and customized configurations.
          </p>
        </div>

        {/* ─── PRODUCT HERO & PRIMARY DETAILS ─────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          {/* Left Column: Product Visual Showcase */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl bg-zinc-900/40 border border-white/[0.08] p-8 sm:p-12 relative overflow-hidden flex flex-col items-center justify-center min-h-[360px]">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/[0.08] rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/[0.06] rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-28 h-28 rounded-3xl bg-gradient-to-br from-indigo-500/20 via-zinc-800/80 to-zinc-900 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shadow-2xl mb-6">
                  <CategoryIcon category={product.category} className="w-14 h-14" />
                </div>
                <Badge variant="accent" size="sm" className="mb-2">
                  {product.category}
                </Badge>
                <span className="text-xs font-mono text-zinc-500">
                  SKU: {product.sku}
                </span>
              </div>

              {/* Status footer inside visual */}
              <div className="mt-8 pt-4 w-full border-t border-white/[0.06] flex items-center justify-between text-xs text-zinc-400 relative z-10">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  {product.availability}
                </span>
                <span className="font-mono text-indigo-300">
                  Commercial Warranty Backed
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Key Info & Direct Actions */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <Badge variant="default">
                  {product.category}
                </Badge>
                {product.badge && (
                  <Badge variant="violet">
                    {product.badge}
                  </Badge>
                )}
                <span className="text-xs font-mono text-zinc-500">
                  {product.sku}
                </span>
              </div>

              <H2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
                {product.name}
              </H2>
            </div>

            <Text className="text-base sm:text-lg text-zinc-300 leading-relaxed">
              {product.shortDescription}
            </Text>

            <p className="text-sm text-zinc-400 leading-relaxed">
              {product.longDescription}
            </p>

            {/* Feature Highlights Bullets */}
            <div className="p-6 rounded-2xl bg-zinc-900/30 border border-white/[0.06] space-y-3">
              <span className="text-xs font-semibold text-zinc-300 uppercase tracking-wider block">
                Key Architecture Highlights
              </span>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {product.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-xs text-zinc-300">
                    <CheckCircle className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Direct Sourcing Call to Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
              <ButtonLink
                href={`/request-quote?product=${encodeURIComponent(product.name)}&sku=${encodeURIComponent(product.sku)}`}
                variant="primary"
                size="md"
                className="w-full sm:w-auto shadow-[0_0_20px_rgba(99,102,241,0.3)]"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Request Product Quote
              </ButtonLink>
              <ButtonLink
                href={`/contact?subject=${encodeURIComponent(`Price Enquiry: ${product.name}`)}`}
                variant="secondary"
                size="md"
                className="w-full sm:w-auto"
              >
                Get Latest Price
              </ButtonLink>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-xs text-zinc-500 font-mono pt-2">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                No Fabricated Pricing
              </span>
              <span className="flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-indigo-400" />
                Volume Discounts on Bulk Orders
              </span>
            </div>
          </div>
        </div>

        {/* ─── TECHNICAL SPECIFICATIONS TABLE ─────────────────────────── */}
        <section className="py-12 border-t border-white/[0.08]">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <Badge variant="cyan" dot className="mb-2">
                  Engineering Breakdown
                </Badge>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Technical Specifications
                </h3>
              </div>
              <span className="text-xs font-mono text-zinc-500 hidden sm:block">
                OEM SOURCING PARAMETERS
              </span>
            </div>

            <div className="rounded-2xl border border-white/[0.08] overflow-hidden bg-zinc-900/30">
              <div className="divide-y divide-white/[0.06]">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div
                    key={key}
                    className="grid grid-cols-1 sm:grid-cols-12 p-4 sm:px-6 hover:bg-white/[0.02] transition-colors gap-2"
                  >
                    <div className="sm:col-span-4 text-xs font-semibold text-zinc-400">
                      {key}
                    </div>
                    <div className="sm:col-span-8 text-xs font-mono text-zinc-200">
                      {value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── RELATED PRODUCTS SECTION ───────────────────────────────── */}
        {relatedProducts.length > 0 && (
          <section className="py-16 border-t border-white/[0.08]">
            <div className="flex items-center justify-between mb-10">
              <div>
                <Badge variant="accent" dot className="mb-2">
                  Complementary Equipment
                </Badge>
                <h3 className="text-2xl font-bold text-white tracking-tight">
                  Related Products in {product.category}
                </h3>
              </div>
              <Link
                href="/products"
                className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors inline-flex items-center gap-1"
              >
                <span>View Full Catalogue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map((relProduct) => {
                return (
                  <div
                    key={relProduct.id}
                    className="group flex flex-col justify-between p-6 rounded-2xl bg-zinc-900/40 border border-white/[0.08] hover:border-indigo-500/30 transition-all duration-300 hover-elevate"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                          <CategoryIcon category={relProduct.category} className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-mono text-zinc-500">
                          {relProduct.sku}
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                        <Link href={`/products/${relProduct.slug}`}>
                          {relProduct.name}
                        </Link>
                      </h4>
                      <p className="text-xs text-zinc-400 line-clamp-2 mb-4">
                        {relProduct.shortDescription}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                      <Link
                        href={`/products/${relProduct.slug}`}
                        className="text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
                      >
                        View Specs
                      </Link>
                      <Link
                        href={`/request-quote?product=${encodeURIComponent(relProduct.name)}`}
                        className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 inline-flex items-center gap-1"
                      >
                        <span>Get Price</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* ─── BOTTOM REQUEST QUOTE CALLOUT ───────────────────────────── */}
        <section className="py-16 border-t border-white/[0.08]">
          <div className="p-8 sm:p-12 rounded-3xl bg-zinc-900/50 border border-white/[0.08] text-center max-w-3xl mx-auto space-y-6">
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Ready to Order or Inquire About This Equipment?
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed max-w-xl mx-auto">
              Our hardware specialists verify component availability, OEM lead-times, and multi-unit enterprise volume discounts.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <ButtonLink
                href={`/request-quote?product=${encodeURIComponent(product.name)}&sku=${encodeURIComponent(product.sku)}`}
                variant="primary"
                size="md"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Request Quote for {product.name}
              </ButtonLink>
              <ButtonLink href="/products" variant="secondary" size="md">
                Browse More Equipment
              </ButtonLink>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
