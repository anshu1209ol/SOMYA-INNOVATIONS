import React from "react";
import type { Metadata } from "next";
import {
  Badge,
  DisplayHeading,
  EditorialHeading,
  Text,
  Breadcrumbs,
} from "@/components/ui";
import { ButtonLink } from "@/components/buttons";
import { ArrowRight, ShieldCheck, Sparkles, LayoutDashboard } from "lucide-react";
import { getProducts } from "@/lib/products";
import { ProductCatalogClient } from "./ProductCatalogClient";
import { createMetadata, getBreadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Technology Products | Computing, Networking & Electronics | SOMYA INNOVATIONS",
  description:
    "Explore technology products across computing, networking, accessories, security, electronics and office technology. Request a quote for current pricing.",
  path: "/products",
});

export default async function ProductsPage() {
  const products = await getProducts();
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Products", url: "/products" },
  ]);

  return (
    <div className="py-12 sm:py-16 lg:py-24 bg-[#11110F] text-[#F1EBDD]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <Breadcrumbs items={[{ label: "Products" }]} />

        {/* ─── HERO SECTION ────────────────────────────────────────────── */}
        <div className="relative pt-6 pb-14 text-center">
          <div className="inline-flex items-center gap-2 mb-6">
            <h1 className="text-xs font-mono uppercase tracking-[0.2em] text-[#C8C2B3]">
              <Badge variant="burgundy" dot>
                Technology Products
              </Badge>
            </h1>
          </div>

          <DisplayHeading as="h2" className="max-w-4xl mx-auto mb-6 text-[#F1EBDD]">
            Technology Products &{" "}
            <EditorialHeading italic className="text-[#E8DFCF]">
              Enterprise Systems
            </EditorialHeading>
          </DisplayHeading>

          <Text variant="lead" className="max-w-3xl mx-auto mb-8 text-[#F1EBDD]/80">
            Explore our modular suite of enterprise SaaS platforms, AI automation engines, and intelligent operational dashboards.
            Engineered for rapid deployment, private cloud isolation, and seamless data stack integration.
          </Text>

          {/* Quick Value Pillars */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-[#F1EBDD]/60 font-mono mb-8">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#641F2A]" />
              Autonomous AI & RAG Copilots
            </span>
            <span className="flex items-center gap-1.5">
              <LayoutDashboard className="w-4 h-4 text-[#68704A]" />
              Real-Time SaaS Dashboards
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#68704A]" />
              Zero-Trust & SOC2 Compliance Ready
            </span>
          </div>
        </div>

        {/* ─── INTERACTIVE CLIENT CATALOG (SEARCH + FILTER + CARDS) ───── */}
        <ProductCatalogClient initialProducts={products} />

        {/* ─── CATALOG FOOTER / CUSTOM SOURCING CTA ────────────────────── */}
        <section className="mt-20 pt-16 border-t border-white/[0.08]">
          <div className="relative rounded-3xl overflow-hidden bg-[#641F2A] text-[#F1EBDD] p-8 sm:p-14 text-center shadow-2xl border border-white/[0.1]">
            <div className="relative z-10 max-w-2xl mx-auto">
              <Badge variant="beige" dot className="mb-4">
                Custom SaaS & AI Engineering
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#F1EBDD] tracking-tight mb-4">
                Need a Custom SaaS Dashboard or AI Solution?
              </h2>
              <p className="text-sm sm:text-base text-[#F1EBDD]/80 leading-relaxed mb-8">
                Looking for customized AI workflows, private LLM deployments, specialized operational dashboards,
                or custom enterprise API integrations? Our software engineering team designs and delivers end-to-end proprietary solutions.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <ButtonLink
                  href="/request-quote?service=AI+Solutions"
                  variant="secondary"
                  size="md"
                  className="w-full sm:w-auto bg-[#F1EBDD] text-[#11110F] hover:bg-white border-transparent"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Request Solution Quote
                </ButtonLink>
                <ButtonLink
                  href="/contact"
                  variant="secondary"
                  size="md"
                  className="w-full sm:w-auto border-white/40 text-[#F1EBDD] hover:bg-white/10"
                >
                  Contact Solutions Desk
                </ButtonLink>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
