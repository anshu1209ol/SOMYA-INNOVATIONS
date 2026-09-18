import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Badge,
  DisplayHeading,
  EditorialHeading,
  H2,
  Text,
  Breadcrumbs,
} from "@/components/ui";
import { ButtonLink } from "@/components/buttons";
import {
  ArrowRight,
  CheckCircle,
  FileCode2,
  Layers,
  ShieldCheck,
  Compass,
  Cpu,
  Workflow,
  Search,
} from "lucide-react";
import {
  getCaseStudies,
  CASE_STUDY_SCHEMA_SECTIONS,
  type CaseStudy,
} from "@/lib/caseStudies";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Work & Case Studies | Engineering Portfolio & Standards",
  description:
    "Explore our engineering methodology and case study framework. Selected work and case studies will be added as projects are completed.",
  path: "/work",
});

export default async function WorkPage() {
  const caseStudies: CaseStudy[] = await getCaseStudies();

  return (
    <div className="py-12 sm:py-16 lg:py-24 bg-[#11110F] text-[#F1EBDD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs items={[{ label: "Work" }]} />

        {/* ─── HERO SECTION ────────────────────────────────────────────── */}
        <div className="relative pt-6 pb-16 text-center">
          <div className="inline-flex items-center gap-2 mb-6">
            <Badge variant="burgundy" dot>
              Case Studies & Portfolio
            </Badge>
          </div>

          <DisplayHeading className="max-w-4xl mx-auto mb-6 text-[#F1EBDD]">
            Engineered for{" "}
            <EditorialHeading italic className="text-[#E8DFCF]">
              operational impact.
            </EditorialHeading>
          </DisplayHeading>

          <Text variant="lead" className="max-w-3xl mx-auto mb-8 text-[#F1EBDD]/80">
            Every technical engagement at SOMYA INNOVATIONS is guided by pragmatic engineering, measurable operational objectives,
            and strict commercial integrity.
          </Text>

          {/* Core Quality Pillars */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-[#F1EBDD]/60 font-mono mb-8">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#68704A]" />
              100% Truthful Documentation
            </span>
            <span className="flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-[#641F2A]" />
              Modular System Blueprints
            </span>
            <span className="flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-[#68704A]" />
              Strict Client Confidentiality (NDA)
            </span>
          </div>
        </div>

        {/* ─── REAL CASE STUDIES (WHEN AVAILABLE) ──────────────────────── */}
        {caseStudies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {caseStudies.map((cs) => (
              <div
                key={cs.id}
                className="p-8 rounded-2xl bg-[#1B1B18] border border-white/[0.08] hover:border-[#641F2A]/40 transition-all duration-300 hover-elevate group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="olive" size="sm">
                      {cs.industry}
                    </Badge>
                    <span className="text-xs font-mono text-[#F1EBDD]/50">
                      {cs.id}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-[#F1EBDD] mb-2 group-hover:text-[#E8DFCF] transition-colors">
                    {cs.project}
                  </h3>
                  <p className="text-xs text-[#F1EBDD]/70 line-clamp-3 mb-6">
                    {cs.challenge}
                  </p>
                  <div className="space-y-2 border-t border-white/[0.08] pt-4">
                    <span className="text-[11px] font-mono text-[#F1EBDD]/50 uppercase block">
                      Solution Highlights
                    </span>
                    <p className="text-xs text-[#F1EBDD]/80 line-clamp-2">
                      {cs.solution}
                    </p>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/[0.08] mt-6 flex items-center justify-between">
                  <Link
                    href={`/work/${cs.slug}`}
                    className="text-xs font-mono uppercase tracking-wider text-[#E8DFCF] hover:text-white inline-flex items-center gap-1.5"
                  >
                    <span>Read Full Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* ─── EMPTY STATE & TRANSPARENT CAPABILITY OVERVIEW ─────────── */
          <div className="space-y-16">
            {/* Primary Status Notice Box */}
            <div className="relative rounded-3xl p-8 sm:p-12 bg-[#1B1B18] border border-white/[0.1] shadow-2xl text-center overflow-hidden">
              <div className="relative z-10 max-w-3xl mx-auto space-y-6">
                <div className="w-16 h-16 rounded-2xl bg-[#641F2A]/15 border border-[#641F2A]/30 flex items-center justify-center text-[#F1EBDD] mx-auto">
                  <FileCode2 className="w-8 h-8" />
                </div>

                <div className="inline-block px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-[#E8DFCF] uppercase tracking-wider">
                  Portfolio Status
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-[#F1EBDD] tracking-tight">
                  &ldquo;Selected work and case studies will be added as projects are completed.&rdquo;
                </h2>

                <p className="text-sm sm:text-base text-[#F1EBDD]/70 leading-relaxed max-w-2xl mx-auto">
                  SOMYA INNOVATIONS adheres strictly to professional transparency. In the absence of signed client releases
                  and completed project milestones, we do not fabricate client names, simulate revenue figures, publish artificial performance statistics,
                  or display mock testimonials.
                </p>

                <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
                  <ButtonLink
                    href="/request-quote"
                    variant="primary"
                    size="md"
                    icon={<ArrowRight className="w-4 h-4" />}
                  >
                    Discuss Your Project
                  </ButtonLink>
                  <ButtonLink href="/ai-solutions" variant="secondary" size="md">
                    Explore Capabilities
                  </ButtonLink>
                </div>
              </div>
            </div>

            {/* ─── CASE STUDY FRAMEWORK PREVIEW ─────────────────────────── */}
            <div className="pt-6">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <Badge variant="olive" dot className="mb-3">
                  Architectural Standard
                </Badge>
                <H2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#F1EBDD] tracking-tight">
                  Our Case Study Structure
                </H2>
                <Text className="mt-3 text-base text-[#F1EBDD]/70">
                  Every project delivered by SOMYA INNOVATIONS is documented under a standardized 9-point technical framework
                  to ensure transparency, reproducibility, and verified accountability.
                </Text>
              </div>

              {/* 9-Point Framework Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {CASE_STUDY_SCHEMA_SECTIONS.map((section, idx) => (
                  <div
                    key={section.key}
                    className="p-6 rounded-2xl bg-[#1B1B18] border border-white/[0.08] hover:border-[#641F2A]/40 transition-all duration-300 hover-elevate group"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-mono font-bold text-[#641F2A]">
                        0{idx + 1}
                      </span>
                      <span className="text-[10px] font-mono text-[#F1EBDD]/50 uppercase tracking-wider bg-white/[0.03] px-2 py-0.5 rounded border border-white/[0.08]">
                        {section.key}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-[#F1EBDD] mb-2 group-hover:text-[#E8DFCF] transition-colors">
                      {section.label}
                    </h3>
                    <p className="text-xs text-[#F1EBDD]/70 leading-relaxed">
                      {section.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* ─── ARCHITECTURAL BLUEPRINT PREVIEW CARD ────────────────── */}
            <div className="p-8 sm:p-12 rounded-3xl bg-[#1B1B18] border border-white/[0.08] relative overflow-hidden">
              <div className="max-w-4xl mx-auto space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#68704A]" />
                      <span className="text-xs font-mono text-[#E8DFCF] uppercase tracking-wider">
                        Template Framework Preview
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#F1EBDD] tracking-tight">
                      How Future Case Studies Will Be Documented
                    </h3>
                  </div>
                  <Badge variant="burgundy" size="sm">
                    Pre-Configured Architecture
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                  <div className="space-y-4 p-5 rounded-xl bg-[#11110F] border border-white/[0.06]">
                    <div className="flex items-center gap-2 text-[#641F2A] font-semibold uppercase tracking-wider">
                      <Search className="w-4 h-4" />
                      <span>Discovery & Diagnosis</span>
                    </div>
                    <div>
                      <strong className="text-[#F1EBDD] block mb-1">Project & Industry Context:</strong>
                      <p className="text-[#F1EBDD]/70 leading-relaxed">
                        Clear definition of the operating environment, organizational scale, and regulatory constraints.
                      </p>
                    </div>
                    <div>
                      <strong className="text-[#F1EBDD] block mb-1">Challenge & Objective:</strong>
                      <p className="text-[#F1EBDD]/70 leading-relaxed">
                        Itemized operational bottlenecks, system latencies, and explicit success criteria.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 p-5 rounded-xl bg-[#11110F] border border-white/[0.06]">
                    <div className="flex items-center gap-2 text-[#68704A] font-semibold uppercase tracking-wider">
                      <Cpu className="w-4 h-4" />
                      <span>Architecture & Execution</span>
                    </div>
                    <div>
                      <strong className="text-[#F1EBDD] block mb-1">Solution & Technology:</strong>
                      <p className="text-[#F1EBDD]/70 leading-relaxed">
                        Hardware configurations, software stacks, network topologies, and algorithmic pipelines.
                      </p>
                    </div>
                    <div>
                      <strong className="text-[#F1EBDD] block mb-1">Implementation & Outcome:</strong>
                      <p className="text-[#F1EBDD]/70 leading-relaxed">
                        Staging protocols, migration strategies, uptime stability, and verified post-deployment handoff.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#11110F] border border-white/[0.08] flex items-center justify-between gap-4 text-xs text-[#F1EBDD]/70 font-mono">
                  <span className="flex items-center gap-2">
                    <Workflow className="w-4 h-4 text-[#68704A] shrink-0" />
                    Built to dynamically render projects as soon as NDA client authorizations are secured.
                  </span>
                  <Link
                    href="/request-quote"
                    className="text-[#E8DFCF] hover:text-white font-bold shrink-0"
                  >
                    Partner with us &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ─── FINAL CALL TO ACTION ────────────────────────────────────── */}
        <section className="mt-20 pt-16 border-t border-white/[0.08]">
          <div className="relative rounded-3xl overflow-hidden bg-[#641F2A] text-[#F1EBDD] p-8 sm:p-14 text-center shadow-2xl border border-white/[0.1]">
            <div className="relative z-10 max-w-2xl mx-auto">
              <Badge variant="beige" dot className="mb-4">
                Transparent Execution
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#F1EBDD] tracking-tight mb-4">
                Start Your Project with SOMYA
              </h2>
              <p className="text-sm sm:text-base text-[#F1EBDD]/80 leading-relaxed mb-8">
                Partner with a technology team that values pragmatic engineering, architectural rigor,
                and complete commercial transparency from day one.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <ButtonLink
                  href="/request-quote"
                  variant="secondary"
                  size="md"
                  className="w-full sm:w-auto bg-[#F1EBDD] text-[#11110F] hover:bg-white border-transparent"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Discuss a Project
                </ButtonLink>
                <ButtonLink
                  href="/contact"
                  variant="secondary"
                  size="md"
                  className="w-full sm:w-auto border-white/40 text-[#F1EBDD] hover:bg-white/10"
                >
                  Contact Us
                </ButtonLink>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
