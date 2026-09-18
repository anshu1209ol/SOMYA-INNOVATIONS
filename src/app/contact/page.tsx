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
import { ContactForm } from "@/components/forms";
import { MapPlaceholder } from "@/components/contact/MapPlaceholder";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  ShieldCheck,
  Zap,
  FileSpreadsheet,
  CheckCircle,
} from "lucide-react";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Contact Us | Let's Build Something Better",
  description:
    "Connect with SOMYA INNOVATIONS for enterprise IT infrastructure, AI automation, custom digital software, and technology product enquiries.",
  path: "/contact",
});

const CONTACT_CARDS = [
  {
    icon: Phone,
    label: "Phone",
    value: "[YOUR PHONE]",
    subtext: "Mon-Sat during business hours",
  },
  {
    icon: Mail,
    label: "Email",
    value: "[YOUR EMAIL]",
    subtext: "Direct solutions and engineering inbox",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "[YOUR CITY]",
    subtext: "Operational facilities & corporate hub",
  },
  {
    icon: Clock,
    label: "Business Hours",
    value: "[BUSINESS HOURS]",
    subtext: "Indian Standard Time (IST)",
  },
];

export default function ContactPage() {
  return (
    <div className="py-12 sm:py-16 lg:py-24 bg-[#F1EBDD] text-[#11110F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs items={[{ label: "Contact" }]} />

        {/* ─── HERO SECTION ────────────────────────────────────────────── */}
        <div className="relative pt-6 pb-16 text-center">
          <div className="inline-flex items-center gap-2 mb-6">
            <Badge variant="burgundy" dot>
              Communications & Enquiries
            </Badge>
          </div>

          <DisplayHeading className="max-w-4xl mx-auto mb-6 text-[#11110F]">
            Let&apos;s build{" "}
            <EditorialHeading italic className="text-[#641F2A]">
              something better.
            </EditorialHeading>
          </DisplayHeading>

          <Text variant="lead" className="max-w-3xl mx-auto mb-8 text-[#11110F]/80">
            Whether you are planning an IT infrastructure modernization, deploying applied AI automation,
            building custom digital software, or specifying enterprise technology products, our technical team is ready to assist.
          </Text>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-[#11110F]/60 font-mono">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#68704A]" />
              Direct Engineering Consultation
            </span>
            <span className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-[#641F2A]" />
              Transparent SLAs & Specifications
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-[#68704A]" />
              Commercial Confidentiality
            </span>
          </div>
        </div>

        {/* ─── CONTACT CARDS SECTION ───────────────────────────────────── */}
        <section className="mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {CONTACT_CARDS.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.label}
                  className="relative p-6 rounded-2xl bg-white border border-black/[0.08] hover:border-[#641F2A]/50 transition-all duration-300 hover-elevate group overflow-hidden shadow-sm"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#641F2A]/10 border border-[#641F2A]/20 flex items-center justify-center text-[#641F2A] group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono text-[#11110F]/50 uppercase tracking-wider bg-[#F1EBDD] px-2 py-0.5 rounded border border-black/[0.06]">
                      {card.label}
                    </span>
                  </div>

                  <h3 className="text-xs font-mono uppercase tracking-wider text-[#11110F]/60 mb-1">
                    {card.label}
                  </h3>

                  <div className="text-lg sm:text-xl font-bold text-[#11110F] tracking-tight font-mono mb-2">
                    {card.value}
                  </div>

                  <p className="text-xs text-[#11110F]/60">
                    {card.subtext}
                  </p>
                </div>
              );
            })}
          </div>
          <p className="text-center text-[11px] text-[#11110F]/50 font-mono mt-4">
            Items in brackets are placeholders and will be connected to confirmed company contact parameters.
          </p>
        </section>

        {/* ─── CONTACT FORM & MAP CONTAINER ────────────────────────────── */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Form Column (7 cols on lg) */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>

            {/* Map Column (5 cols on lg) */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <Badge variant="olive" dot className="mb-3">
                  Physical Hub & Geographic Reach
                </Badge>
                <H2 className="text-2xl font-bold text-[#11110F] tracking-tight mb-2">
                  Operating Location
                </H2>
                <Text className="text-xs sm:text-sm text-[#11110F]/70 leading-relaxed">
                  Headquartered in [YOUR CITY] with capabilities to provide technology deployment, infrastructure staging, and digital software solutions regionally and pan-India.
                </Text>
              </div>

              {/* Map Placeholder */}
              <MapPlaceholder city="[YOUR CITY]" />
            </div>
          </div>
        </section>

        {/* ─── REQUEST A QUOTE CTA SECTION ─────────────────────────────── */}
        <section className="pt-8 border-t border-black/[0.1]">
          <div className="relative rounded-3xl overflow-hidden bg-[#11110F] text-[#F1EBDD] p-8 sm:p-14 text-center shadow-2xl border border-white/[0.08]">
            <div className="relative z-10 max-w-2xl mx-auto">
              <Badge variant="burgundy" dot className="mb-4">
                Structured Proposals
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#F1EBDD] tracking-tight mb-4">
                Need a Detailed Commercial Quotation?
              </h2>
              <p className="text-sm sm:text-base text-[#F1EBDD]/70 leading-relaxed mb-8">
                If you have an itemized bill of materials, specific compute/networking requirements,
                or a multi-phase digital software project, use our dedicated quote builder for an itemized estimate.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <ButtonLink
                  href="/request-quote"
                  variant="primary"
                  size="md"
                  icon={<FileSpreadsheet className="w-4 h-4" />}
                >
                  Request a Quote
                </ButtonLink>
                <ButtonLink
                  href="/products"
                  variant="secondary"
                  size="md"
                >
                  Explore Product Catalogue
                </ButtonLink>
              </div>

              <div className="mt-8 pt-6 border-t border-white/[0.08] flex flex-wrap items-center justify-center gap-6 text-xs text-[#F1EBDD]/50 font-mono">
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-[#68704A]" />
                  Itemized BOM Quotes
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-[#68704A]" />
                  Verified Engineering
                </span>
                <span className="flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-[#641F2A]" />
                  Fast Turnaround
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
