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
import { ArrowRight, ShieldCheck, Terminal, Cpu } from "lucide-react";
import { getProducts } from "@/lib/products";
import { ProductCatalogClient } from "./ProductCatalogClient";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Technology Products Catalogue | Enterprise Equipment & Systems",
  description:
    "Explore our commercial equipment catalogue across Computing, Networking, Accessories, Security, Electronics, and Office Technology with direct B2B quotation upon request.",
  path: "/products",
});

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="py-12 sm:py-16 lg:py-24 bg-[#11110F] text-[#F1EBDD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <Breadcrumbs items={[{ label: "Products" }]} />

        {/* ─── HERO SECTION ────────────────────────────────────────────── */}
        <div className="relative pt-6 pb-14 text-center">
          <div className="inline-flex items-center gap-2 mb-6">
            <Badge variant="burgundy" dot>
              Enterprise Technology Catalogue
            </Badge>
          </div>

          <DisplayHeading className="max-w-4xl mx-auto mb-6 text-[#F1EBDD]">
            Technology Products{" "}
            <EditorialHeading italic className="text-[#E8DFCF]">
              Catalogue
            </EditorialHeading>
          </DisplayHeading>

          <Text variant="lead" className="max-w-3xl mx-auto mb-8 text-[#F1EBDD]/80">
            Explore sample configurations and verified equipment categories available to support our client infrastructure deployments.
            Every item is sourced through certified channels with full commercial warranty backing and direct quotation.
          </Text>

          {/* Quick Value Pillars */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-[#F1EBDD]/60 font-mono mb-8">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#68704A]" />
              Verified OEM Hardware
            </span>
            <span className="flex items-center gap-1.5">
              <Terminal className="w-4 h-4 text-[#641F2A]" />
              Enterprise Integration Support
            </span>
            <span className="flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-[#68704A]" />
              Transparent B2B Quotes
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
                Custom Hardware Specifications
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#F1EBDD] tracking-tight mb-4">
                Need Specific Hardware Specifications?
              </h2>
              <p className="text-sm sm:text-base text-[#F1EBDD]/80 leading-relaxed mb-8">
                Looking for custom-configured server racks, high-throughput network appliances, specialized workstations,
                or bulk office setup pricing? Our engineering team can fulfill exact component bills of materials.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <ButtonLink
                  href="/request-quote?service=Technology+Products"
                  variant="secondary"
                  size="md"
                  className="w-full sm:w-auto bg-[#F1EBDD] text-[#11110F] hover:bg-white border-transparent"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Request Product Quote
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
