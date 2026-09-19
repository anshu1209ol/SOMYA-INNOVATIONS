import React from "react";
import type { Metadata } from "next";
import {
  Badge,
  DisplayHeading,
  EditorialHeading,
  H2,
  Text,
  Breadcrumbs,
} from "@/components/ui";
import { ButtonLink } from "@/components/buttons";
import { QuoteForm } from "@/components/forms";
import {
  CheckCircle2,
  ShieldCheck,
  Cpu,
  Layers,
  FileCheck2,
  ArrowRight,
  Calculator,
} from "lucide-react";
import { createMetadata, getBreadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Request a Quote | SOMYA INNOVATIONS",
  description:
    "Tell SOMYA INNOVATIONS about your technology requirements and request a quote for AI, IT, digital or technology product solutions.",
  path: "/request-quote",
});

const QUOTATION_EXPECTATIONS = [
  {
    icon: FileCheck2,
    title: "Line-Item Transparency",
    desc: "Clear breakdown of hardware units, software licensing, engineering implementation, and optional service level agreements.",
  },
  {
    icon: Cpu,
    title: "Architectural Fit",
    desc: "Technical evaluation to ensure proposed compute configurations, network switches, or software stacks match your workload requirements.",
  },
  {
    icon: Layers,
    title: "Alternative Configurations",
    desc: "Where practical, we offer tiered configuration options to help procurement teams balance capital expenditure against performance.",
  },
  {
    icon: ShieldCheck,
    title: "Confidentiality Assured",
    desc: "All submitted technical diagrams, bill-of-materials, and organizational requirements are held under strict non-disclosure terms.",
  },
];

export default function RequestQuotePage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Request a Quote", url: "/request-quote" },
  ]);

  return (
    <div className="py-12 sm:py-16 lg:py-24 bg-[#F1EBDD] text-[#11110F]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs items={[{ label: "Request a Quote" }]} />

        {/* ─── HERO SECTION ────────────────────────────────────────────── */}
        <div className="relative pt-6 pb-16 text-center">
          <div className="inline-flex items-center gap-2 mb-6">
            <h1 className="text-xs font-mono uppercase tracking-[0.2em] text-[#641F2A]">
              <Badge variant="burgundy" dot>
                Request a Quote
              </Badge>
            </h1>
          </div>

          <DisplayHeading as="h2" className="max-w-4xl mx-auto mb-6 text-[#11110F]">
            Request a Technical &{" "}
            <EditorialHeading italic className="text-[#641F2A]">
              Commercial Quote
            </EditorialHeading>
          </DisplayHeading>

          <Text variant="lead" className="max-w-3xl mx-auto mb-8 text-[#11110F]/80">
            Submit your bill of materials, hardware requirements, software scope, or AI automation project details.
            Our technical team will review your specifications and prepare an itemized proposal.
          </Text>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-[#11110F]/60 font-mono">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#68704A]" />
              Verified Pricing Models
            </span>
            <span className="flex items-center gap-1.5">
              <Calculator className="w-4 h-4 text-[#641F2A]" />
              Transparent Bill of Materials
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#68704A]" />
              Direct Engineering Review
            </span>
          </div>
        </div>

        {/* ─── MAIN CONTENT: FORM & SPECIFICATION GUIDE ────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-20">
          {/* Left Column: Form (8 cols on lg) */}
          <div className="lg:col-span-8">
            <QuoteForm />
          </div>

          {/* Right Column: B2B Standards (4 cols on lg) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-black/[0.08] shadow-sm">
              <Badge variant="olive" dot className="mb-3">
                Commercial Standards
              </Badge>
              <H2 className="text-xl font-bold text-[#11110F] tracking-tight mb-4">
                What to Expect
              </H2>
              <p className="text-xs text-[#11110F]/70 leading-relaxed mb-6">
                We handle commercial and procurement inquiries with engineering rigor and operational clarity.
              </p>

              <div className="space-y-5">
                {QUOTATION_EXPECTATIONS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="flex items-start gap-3.5">
                      <div className="w-8 h-8 rounded-lg bg-[#641F2A]/10 border border-[#641F2A]/20 flex items-center justify-center text-[#641F2A] shrink-0 mt-0.5">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-[#11110F]">
                          {item.title}
                        </h4>
                        <p className="text-xs text-[#11110F]/70 leading-relaxed mt-1">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Catalog / Solutions Link */}
            <div className="p-6 rounded-2xl bg-[#11110F] text-[#F1EBDD] border border-white/[0.08] space-y-4">
              <h4 className="text-sm font-bold tracking-tight">
                Exploring Hardware Specifications?
              </h4>
              <p className="text-xs text-[#F1EBDD]/70 leading-relaxed">
                Review our enterprise product catalogue for desktop towers, commercial laptops, CAD workstations, and managed switches.
              </p>
              <ButtonLink
                href="/products"
                variant="secondary"
                size="sm"
                className="w-full justify-between border-white/30 text-[#F1EBDD] hover:bg-white/10"
                icon={<ArrowRight className="w-3.5 h-3.5" />}
              >
                <span>View Product Catalogue</span>
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
