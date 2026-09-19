import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createMetadata, getBreadcrumbSchema, getProductSchema } from "@/lib/seo";
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
  Sparkles,
  LayoutDashboard,
  Workflow,
  BarChart3,
  Terminal,
  Layers,
  ArrowLeft,
  Cpu,
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
    title: `${product.name} | Technology Products | SOMYA INNOVATIONS`,
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
    case "AI Solutions":
      return <Sparkles className={className} />;
    case "SaaS Dashboards":
      return <LayoutDashboard className={className} />;
    case "Enterprise Automation":
      return <Workflow className={className} />;
    case "Analytics & Intelligence":
      return <BarChart3 className={className} />;
    case "Security & Governance":
      return <ShieldCheck className={className} />;
    case "Developer Platforms":
      return <Terminal className={className} />;
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
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Products", url: "/products" },
    { name: product.name, url: `/products/${product.slug}` },
  ]);

  const productSchema = getProductSchema({
    name: product.name,
    description: product.shortDescription,
    slug: product.slug,
    category: product.category,
  });

  return (
    <div className="py-12 sm:py-16 lg:py-24 bg-[#11110F] text-[#F1EBDD]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
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
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#F1EBDD]/60 hover:text-[#F1EBDD] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Products & Solutions</span>
          </Link>
        </div>

        {/* ─── ENTERPRISE SOFTWARE ARCHITECTURE NOTICE ─────────────────── */}
        <div className="mb-10 p-4 rounded-xl bg-[#1B1B18] border border-[#2A2A26] flex items-start gap-3">
          <Info className="w-4 h-4 text-[#68704A] mt-0.5 shrink-0" />
          <p className="text-xs text-[#F1EBDD]/70 leading-relaxed">
            <span className="font-semibold text-[#F1EBDD]">Software Architecture Notice:</span>{" "}
            This product is proprietary enterprise software developed by SOMYA INNOVATIONS.
            Deployments are provisioned with enterprise SLA guarantees, role-based access control, and seamless data stack integration.
            Request an itemized quotation for licensing, multi-tenant setup, and custom workflow development.
          </p>
        </div>

        {/* ─── PRODUCT HERO & PRIMARY DETAILS ─────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          {/* Left Column: Product Visual Showcase */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl bg-[#1B1B18] border border-[#2A2A26] p-8 sm:p-12 relative overflow-hidden flex flex-col items-center justify-center min-h-[360px]">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#641F2A]/15 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#68704A]/10 rounded-full blur-3xl pointer-events-none" />

              {/* Central Product Monogram Icon */}
              <div className="w-24 h-24 rounded-2xl bg-[#11110F] border border-white/[0.1] flex items-center justify-center text-[#F1EBDD] mb-6 shadow-2xl relative z-10 group-hover:scale-105 transition-transform">
                <CategoryIcon category={product.category} className="w-12 h-12 text-[#641F2A]" />
              </div>

              {/* Product Identifier Display */}
              <div className="text-center relative z-10 space-y-1">
                <span className="text-xs font-mono uppercase tracking-widest text-[#68704A] block">
                  {product.category}
                </span>
                <span className="text-lg font-bold text-[#F1EBDD] block">
                  {product.name}
                </span>
              </div>

              {/* Status footer inside visual */}
              <div className="mt-8 pt-4 w-full border-t border-white/[0.06] flex items-center justify-between text-xs text-[#F1EBDD]/60 relative z-10 font-mono">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#68704A] animate-pulse" />
                  {product.availability}
                </span>
                <span className="text-[#E8DFCF]">
                  Enterprise SLA Backed
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Key Info & Direct Actions */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <Badge variant="burgundy">
                  {product.category}
                </Badge>
                {product.badge && (
                  <Badge variant="beige">
                    {product.badge}
                  </Badge>
                )}
                <span className="text-xs font-mono text-[#F1EBDD]/50">
                  {product.sku}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#F1EBDD] tracking-tight">
                {product.name}
              </h1>
            </div>

            <Text className="text-base sm:text-lg text-[#F1EBDD]/90 leading-relaxed">
              {product.shortDescription}
            </Text>

            <p className="text-sm text-[#F1EBDD]/70 leading-relaxed">
              {product.longDescription}
            </p>

            {/* Feature Highlights Bullets */}
            <div className="p-6 rounded-2xl bg-[#1B1B18] border border-[#2A2A26] space-y-3">
              <span className="text-xs font-semibold text-[#F1EBDD] uppercase tracking-wider block">
                Key Architectural Capabilities
              </span>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {product.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-xs text-[#F1EBDD]/80">
                    <CheckCircle className="w-3.5 h-3.5 text-[#68704A] shrink-0 mt-0.5" />
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
                className="w-full sm:w-auto"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Request Solution Quote
              </ButtonLink>
              <ButtonLink
                href={`/contact?subject=${encodeURIComponent(`Solution Inquiry: ${product.name}`)}`}
                variant="secondary"
                size="md"
                className="w-full sm:w-auto border-white/20 text-[#F1EBDD] hover:bg-white/10"
              >
                Schedule Architecture Demo
              </ButtonLink>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-xs text-[#F1EBDD]/50 font-mono pt-2">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#68704A]" />
                Zero-Trust Security & RBAC
              </span>
              <span className="flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#641F2A]" />
                Private Cloud or On-Premise
              </span>
              <span className="flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-[#68704A]" />
                High Availability & Monitoring
              </span>
            </div>
          </div>
        </div>

        {/* ─── TECHNICAL SPECIFICATIONS TABLE ─────────────────────────── */}
        <section className="py-12 border-t border-white/[0.08]">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <Badge variant="olive" dot className="mb-2">
                  Technical Architecture Breakdown
                </Badge>
                <h3 className="text-xl sm:text-2xl font-bold text-[#F1EBDD] tracking-tight">
                  Software Specifications & Engineering Details
                </h3>
              </div>
              <span className="text-xs font-mono text-[#F1EBDD]/50 hidden sm:block">
                SYSTEM ARCHITECTURE MATRIX
              </span>
            </div>

            <div className="rounded-2xl border border-[#2A2A26] overflow-hidden bg-[#1B1B18]">
              <div className="divide-y divide-white/[0.06]">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div
                    key={key}
                    className="grid grid-cols-1 sm:grid-cols-12 p-4 sm:px-6 hover:bg-white/[0.02] transition-colors gap-2"
                  >
                    <div className="sm:col-span-4 text-xs font-semibold text-[#F1EBDD]/70">
                      {key}
                    </div>
                    <div className="sm:col-span-8 text-xs font-mono text-[#F1EBDD]">
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
                <Badge variant="burgundy" dot className="mb-2">
                  Complementary Solutions
                </Badge>
                <h3 className="text-2xl font-bold text-[#F1EBDD] tracking-tight">
                  Related Solutions in {product.category}
                </h3>
              </div>
              <Link
                href="/products"
                className="text-xs font-semibold text-[#E8DFCF] hover:text-white transition-colors inline-flex items-center gap-1"
              >
                <span>View All Solutions</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map((relProduct) => {
                return (
                  <div
                    key={relProduct.id}
                    className="group flex flex-col justify-between p-6 rounded-2xl bg-[#1B1B18] border border-[#2A2A26] hover:border-[#641F2A]/50 transition-all duration-300 hover-elevate"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 rounded-xl bg-[#641F2A]/15 border border-[#641F2A]/30 flex items-center justify-center text-[#F1EBDD]">
                          <CategoryIcon category={relProduct.category} className="w-5 h-5 text-[#E8DFCF]" />
                        </div>
                        <span className="text-[10px] font-mono text-[#F1EBDD]/50">
                          {relProduct.sku}
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-[#F1EBDD] mb-2 group-hover:text-[#E8DFCF] transition-colors">
                        <Link href={`/products/${relProduct.slug}`}>
                          {relProduct.name}
                        </Link>
                      </h4>
                      <p className="text-xs text-[#F1EBDD]/70 line-clamp-2 mb-4">
                        {relProduct.shortDescription}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                      <Link
                        href={`/products/${relProduct.slug}`}
                        className="text-xs font-semibold text-[#F1EBDD]/60 hover:text-white transition-colors"
                      >
                        View Architecture
                      </Link>
                      <Link
                        href={`/request-quote?product=${encodeURIComponent(relProduct.name)}`}
                        className="text-xs font-semibold text-[#E8DFCF] hover:text-white inline-flex items-center gap-1"
                      >
                        <span>Request Quote</span>
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
          <div className="p-8 sm:p-12 rounded-3xl bg-[#1B1B18] border border-[#2A2A26] text-center max-w-3xl mx-auto space-y-6">
            <h3 className="text-2xl sm:text-3xl font-bold text-[#F1EBDD] tracking-tight">
              Ready to Deploy or Inquire About This Platform?
            </h3>
            <p className="text-sm text-[#F1EBDD]/70 leading-relaxed max-w-xl mx-auto">
              Our engineering team provides full architectural blueprints, data migration support, and custom integrations tailored to your enterprise stack.
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
              <ButtonLink href="/products" variant="secondary" size="md" className="border-white/20 text-[#F1EBDD] hover:bg-white/10">
                Browse All Software Products
              </ButtonLink>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
