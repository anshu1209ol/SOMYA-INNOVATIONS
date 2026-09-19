import React from "react";
import type { Metadata } from "next";
import {
  Badge,
  H2,
  Text,
  Breadcrumbs,
} from "@/components/ui";
import { ButtonLink } from "@/components/buttons";
import {
  ArrowRight,
  Cpu,
  GraduationCap,
  Sparkles,
  Workflow,
  ShieldCheck,
  Zap,
  Code2,
  Users,
} from "lucide-react";
import { getActiveJobListings } from "@/lib/careers";
import { CareersClient } from "./CareersClient";
import { createMetadata, getBreadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Careers at SOMYA INNOVATIONS | Technology Opportunities",
  description:
    "Explore career opportunities at SOMYA INNOVATIONS and join a team working across AI, IT and digital technology.",
  path: "/careers",
});

const WHY_WORK_PILLARS = [
  {
    icon: Cpu,
    title: "Technology",
    tagline: "Modern, Production-Grade Stacks",
    description:
      "Work directly with enterprise-grade compute platforms, high-throughput networking, applied AI automation models, and scalable modern web architectures.",
    points: [
      "Modern full-stack web and API architectures",
      "Applied computer vision, LLMs & document intelligence",
      "Enterprise networking, switches, firewalls & hardware",
      "Edge-to-cloud telemetry and automated data pipelines",
    ],
    accent: "burgundy",
  },
  {
    icon: GraduationCap,
    title: "Learning",
    tagline: "Continuous Technical Mastery",
    description:
      "Engineering excellence is an ongoing pursuit. We encourage first-principles learning, deep technical curiosity, and mastering emerging tools without vendor lock-in.",
    points: [
      "Mentorship across software, hardware, and networks",
      "Time allocated for experimental engineering spikes",
      "Cross-disciplinary exposure from bare metal to cloud",
      "Emphasis on architectural fundamentals over transient buzzwords",
    ],
    accent: "olive",
  },
  {
    icon: Sparkles,
    title: "Innovation",
    tagline: "Pragmatic, Utility-First Solutions",
    description:
      "We believe innovation is measured by operational impact, reliability, and measurable client efficiency rather than flashy prototypes that never deploy.",
    points: [
      "Solving real operational bottlenecks for organizations",
      "Building resilient systems engineered for long-term uptime",
      "Automating manual administrative workflows",
      "Balancing bleeding-edge capabilities with commercial viability",
    ],
    accent: "burgundy",
  },
  {
    icon: Workflow,
    title: "Problem Solving",
    tagline: "First-Principles Systems Thinking",
    description:
      "Tackle complex challenges across computing hardware, network latency, system integration, and data processing with methodical rigor and intellectual honesty.",
    points: [
      "Deconstruct ambiguous requirements into modular blueprints",
      "Root-cause diagnostic discipline for hardware and software",
      "Optimizing data workflows for speed and cost efficiency",
      "Open collaboration where the best technical idea wins",
    ],
    accent: "olive",
  },
];

export default async function CareersPage() {
  const activeJobs = await getActiveJobListings();
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Careers", url: "/careers" },
  ]);

  return (
    <div className="bg-[#11110F] text-[#F1EBDD] min-h-screen py-12 sm:py-16 lg:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs items={[{ label: "Careers" }]} />

        {/* ─── HERO SECTION ────────────────────────────────────────────── */}
        <div className="relative pt-8 pb-16 text-center">
          <div className="inline-flex items-center gap-2 mb-6">
            <h1 className="text-xs font-mono uppercase tracking-[0.2em] text-[#C8C2B3]">
              <Badge variant="burgundy" dot>
                Careers at SOMYA INNOVATIONS
              </Badge>
            </h1>
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#F1EBDD] tracking-tight max-w-4xl mx-auto mb-6 leading-tight">
            Build the Future with SOMYA
          </h2>

          <p className="text-base sm:text-lg text-[#F1EBDD]/70 max-w-3xl mx-auto mb-6 leading-relaxed font-sans">
            We are building an emerging technology solutions enterprise that unites AI, IT infrastructure,
            digital software, and technology product solutions into pragmatic client outcomes.
          </p>

          {/* Explicit hiring requirement notice as requested */}
          <div className="max-w-2xl mx-auto p-5 rounded-2xl bg-[#1B1B18] border border-[#2A2A26] mb-10 text-xs sm:text-sm text-[#F1EBDD]/60 leading-relaxed font-sans">
            <span className="text-[#641F2A] font-semibold">Please Note:</span> Opportunities at SOMYA INNOVATIONS depend directly on actual hiring requirements and active project commitments. We maintain an honest, zero-speculation recruitment standard.
          </div>

          {/* Quick value tags */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-[#F1EBDD]/50 font-mono">
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#641F2A]" />
              Honest Recruitment
            </span>
            <span className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-[#68704A]" />
              Hands-on Engineering
            </span>
            <span className="flex items-center gap-2">
              <Users className="w-4 h-4 text-[#F1EBDD]/60" />
              Merit-Based Culture
            </span>
          </div>
        </div>

        {/* ─── WHY WORK WITH US SECTION ────────────────────────────────── */}
        <section className="py-16 border-t border-[#2A2A26]">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="olive" dot className="mb-3">
              Culture & Environment
            </Badge>
            <H2 className="text-3xl sm:text-4xl font-serif text-[#F1EBDD] tracking-tight">
              Why Work With Us
            </H2>
            <Text className="mt-4 text-base text-[#F1EBDD]/70 font-sans">
              We provide an engineering environment where technical rigor, intellectual honesty,
              and practical impact come before corporate bureaucracy.
            </Text>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {WHY_WORK_PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              const isBurgundy = pillar.accent === "burgundy";
              return (
                <div
                  key={pillar.title}
                  className="relative p-8 rounded-2xl bg-[#161614] border border-[#2A2A26] hover:border-[#641F2A]/50 transition-all duration-300 group overflow-hidden"
                >
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 ${
                      isBurgundy 
                        ? "bg-[#641F2A]/15 text-[#F1EBDD] border border-[#641F2A]/30" 
                        : "bg-[#68704A]/15 text-[#F1EBDD] border border-[#68704A]/30"
                    }`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-mono text-[#F1EBDD]/40 uppercase tracking-wider">
                      Core Pillar
                    </span>
                  </div>

                  <h3 className="text-2xl font-serif text-[#F1EBDD] mb-1 group-hover:text-[#E8DFCF] transition-colors">
                    {pillar.title}
                  </h3>
                  <div className={`text-xs font-semibold uppercase tracking-wider mb-4 ${
                    isBurgundy ? "text-[#641F2A]" : "text-[#68704A]"
                  }`}>
                    {pillar.tagline}
                  </div>

                  <p className="text-sm text-[#F1EBDD]/60 leading-relaxed mb-6 font-sans">
                    {pillar.description}
                  </p>

                  <div className="pt-4 border-t border-[#2A2A26] space-y-2.5">
                    {pillar.points.map((pt, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2.5 text-xs text-[#F1EBDD]/80 font-sans"
                      >
                        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                          isBurgundy ? "bg-[#641F2A]" : "bg-[#68704A]"
                        }`} />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ─── OPEN POSITIONS & APPLICATION UI ─────────────────────────── */}
        <section className="py-16 border-t border-[#2A2A26]">
          <CareersClient initialJobs={activeJobs} />
        </section>

        {/* ─── GENERAL INQUIRY / TALENT CTA ────────────────────────────── */}
        <section className="mt-16 pt-16 border-t border-[#2A2A26]">
          <div className="relative rounded-3xl overflow-hidden border border-[#2A2A26] bg-[#161614] p-8 sm:p-14 text-center shadow-2xl">
            <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <Badge variant="burgundy" dot className="mb-4">
                Join the Mission
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#F1EBDD] tracking-tight mb-4">
                Have Specialized Skills to Offer?
              </h2>
              <p className="text-sm sm:text-base text-[#F1EBDD]/70 leading-relaxed mb-8 font-sans">
                Whether you specialize in applied machine learning, computer hardware diagnostics,
                enterprise networking, or full-stack software development, we welcome direct conversations with talented individuals.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <ButtonLink
                  href="/contact"
                  variant="primary"
                  size="md"
                  className="w-full sm:w-auto"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Contact Our Team
                </ButtonLink>
                <ButtonLink
                  href="/about"
                  variant="secondary"
                  size="md"
                  className="w-full sm:w-auto"
                >
                  About SOMYA INNOVATIONS
                </ButtonLink>
              </div>

              <div className="mt-8 pt-6 border-t border-[#2A2A26] flex flex-wrap items-center justify-center gap-6 text-xs text-[#F1EBDD]/50 font-mono">
                <span className="flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-[#641F2A]" />
                  Pragmatic Tech
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#68704A]" />
                  Zero Vanity Postings
                </span>
                <span className="flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-[#F1EBDD]/60" />
                  Direct Technical Impact
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
