import React from "react";
import type { Metadata } from "next";
import {
  SectionHeading,
  Badge,
  Breadcrumbs,
  Text,
  SmallText,
  Label,
} from "@/components/ui";
import { Button } from "@/components/buttons";
import {
  ServiceCard,
  ProductCard,
  FeatureCard,
  ProcessStepCard,
} from "@/components/cards";
import { Input, Select, Textarea } from "@/components/forms/FormControls";
import {
  Cpu,
  Shield,
  Layers,
  ArrowRight,
  Sparkles,
  Zap,
  CheckCircle2,
  Activity,
  Bot,
  Server,
  Globe,
  HardDrive,
} from "lucide-react";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Quiet Luxury Design System | SOMYA INNOVATIONS",
  description:
    "Official SOMYA INNOVATIONS design system specifications: Warm Beige, Warm Black, Burgundy, Olive palette, Instrument Serif typography, and enterprise architectural tokens.",
  path: "/design-system",
  noIndex: true,
});

export default function DesignSystemPage() {
  return (
    <div className="bg-[#11110F] text-[#F1EBDD] min-h-screen py-12 sm:py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "Resources", href: "/resources" },
            { label: "Design System" },
          ]}
        />

        {/* ─── Hero Header ────────────────────────────────────────── */}
        <div className="mb-20 pt-6">
          <Badge variant="burgundy" dot className="mb-4">
            SOMYA INNOVATIONS DESIGN SYSTEM v2.0 • QUIET LUXURY
          </Badge>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#F1EBDD] tracking-tight mb-4">
            Quiet Luxury & Technical Precision
          </h1>
          <p className="text-base sm:text-lg text-[#F1EBDD]/70 max-w-3xl font-sans leading-relaxed">
            A restrained, premium visual language engineered for B2B enterprise technology, artificial intelligence,
            IT infrastructure, and digital solutions. Strictly free of generic SaaS templates, neon tropes, and speculative claims.
          </p>
        </div>

        {/* ─── Section 1: Color Direction ───────────────────────── */}
        <section className="mb-24">
          <div className="mb-8">
            <Badge variant="burgundy" dot className="mb-2">
              Foundation
            </Badge>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#F1EBDD]">
              Color Palette Tokens
            </h2>
            <p className="text-sm text-[#F1EBDD]/60 font-sans mt-1">
              Curated architectural color tokens adhering to the 60:25:8:7 distribution rule. Zero blue, cyan, purple, or neon.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {/* Warm Beige */}
            <div className="p-4 rounded-xl bg-[#F1EBDD] text-[#11110F] border border-[#D5CABB] flex flex-col justify-between h-36">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider">Warm Beige</span>
                <span className="text-[11px] font-mono">#F1EBDD</span>
              </div>
              <div>
                <p className="text-xs text-[#11110F]/70">Primary Light Canvas (~60%)</p>
                <code className="text-[10px] font-mono text-[#11110F]/50">--bg-warm-beige</code>
              </div>
            </div>

            {/* Light Beige */}
            <div className="p-4 rounded-xl bg-[#E8DFCF] text-[#11110F] border border-[#D5CABB] flex flex-col justify-between h-36">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider">Light Beige</span>
                <span className="text-[11px] font-mono">#E8DFCF</span>
              </div>
              <div>
                <p className="text-xs text-[#11110F]/70">Secondary Light Surface</p>
                <code className="text-[10px] font-mono text-[#11110F]/50">--bg-light-beige</code>
              </div>
            </div>

            {/* Warm Black */}
            <div className="p-4 rounded-xl bg-[#11110F] text-[#F1EBDD] border border-[#2A2A26] flex flex-col justify-between h-36">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider">Warm Black</span>
                <span className="text-[11px] font-mono text-[#F1EBDD]/50">#11110F</span>
              </div>
              <div>
                <p className="text-xs text-[#F1EBDD]/60">Primary Dark Canvas (~25%)</p>
                <code className="text-[10px] font-mono text-[#F1EBDD]/40">--bg-warm-black</code>
              </div>
            </div>

            {/* Soft Black */}
            <div className="p-4 rounded-xl bg-[#1B1B18] text-[#F1EBDD] border border-[#2A2A26] flex flex-col justify-between h-36">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider">Soft Black</span>
                <span className="text-[11px] font-mono text-[#F1EBDD]/50">#1B1B18</span>
              </div>
              <div>
                <p className="text-xs text-[#F1EBDD]/60">Elevated Dark Card Surface</p>
                <code className="text-[10px] font-mono text-[#F1EBDD]/40">--bg-soft-black</code>
              </div>
            </div>

            {/* Burgundy */}
            <div className="p-4 rounded-xl bg-[#641F2A] text-[#F1EBDD] border border-[#45151D] flex flex-col justify-between h-36">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider">Burgundy</span>
                <span className="text-[11px] font-mono text-[#F1EBDD]/70">#641F2A</span>
              </div>
              <div>
                <p className="text-xs text-[#F1EBDD]/80">Primary Accent (~8%)</p>
                <code className="text-[10px] font-mono text-[#F1EBDD]/60">--accent-burgundy</code>
              </div>
            </div>

            {/* Olive Green */}
            <div className="p-4 rounded-xl bg-[#68704A] text-[#F1EBDD] border border-[#4D5437] flex flex-col justify-between h-36">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider">Olive Green</span>
                <span className="text-[11px] font-mono text-[#F1EBDD]/70">#68704A</span>
              </div>
              <div>
                <p className="text-xs text-[#F1EBDD]/80">Secondary Accent (~7%)</p>
                <code className="text-[10px] font-mono text-[#F1EBDD]/60">--accent-olive</code>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Section 2: Typography ────────────────────────────── */}
        <section className="mb-24">
          <div className="mb-8">
            <Badge variant="olive" dot className="mb-2">
              Typography
            </Badge>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#F1EBDD]">
              Type Hierarchy & Pairing
            </h2>
            <p className="text-sm text-[#F1EBDD]/60 font-sans mt-1">
              Harmonious contrast between editorial Instrument Serif headers, clean Manrope body text, and JetBrains Mono telemetry.
            </p>
          </div>

          <div className="space-y-6 p-8 rounded-3xl bg-[#161614] border border-[#2A2A26]">
            <div>
              <span className="text-xs font-mono text-[#641F2A] block mb-1">font-serif • Instrument Serif</span>
              <div className="font-serif text-3xl sm:text-5xl text-[#F1EBDD] tracking-tight">
                Architectural Technology & Engineered Precision
              </div>
            </div>

            <div className="pt-6 border-t border-[#2A2A26]">
              <span className="text-xs font-mono text-[#68704A] block mb-1">font-sans • Manrope</span>
              <p className="text-base text-[#F1EBDD]/80 leading-relaxed font-sans max-w-3xl">
                SOMYA INNOVATIONS delivers enterprise IT infrastructure, applied AI automation, and custom digital systems engineered around verifiable client outcomes.
              </p>
            </div>

            <div className="pt-6 border-t border-[#2A2A26]">
              <span className="text-xs font-mono text-[#F1EBDD]/40 block mb-1">font-mono • JetBrains Mono</span>
              <div className="text-xs font-mono text-[#F1EBDD]/70">
                PORTAL_ID: OPS-ADM-01 • LATENCY: 18ms • STATUS: OPTIMAL
              </div>
            </div>
          </div>
        </section>

        {/* ─── Section 3: Component Primitives ──────────────────── */}
        <section className="mb-24">
          <div className="mb-8">
            <Badge variant="burgundy" dot className="mb-2">
              Components
            </Badge>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#F1EBDD]">
              Buttons & Status Badges
            </h2>
          </div>

          {/* Badges */}
          <div className="space-y-4 mb-8">
            <h3 className="text-xs font-mono text-[#F1EBDD]/50 uppercase tracking-wider">
              Badge Variants
            </h3>
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="burgundy" dot>Burgundy Accent</Badge>
              <Badge variant="olive" dot>Olive Accent</Badge>
              <Badge variant="beige">Warm Beige</Badge>
              <Badge variant="dark">Soft Black</Badge>
              <Badge variant="outline">Outline</Badge>
            </div>
          </div>

          {/* Buttons */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono text-[#F1EBDD]/50 uppercase tracking-wider">
              Button Variants
            </h3>
            <div className="flex flex-wrap items-center gap-4">
              <Button variant="primary" size="md" icon={<ArrowRight className="w-4 h-4" />}>
                Primary Burgundy
              </Button>
              <Button variant="secondary" size="md">
                Secondary Subtle
              </Button>
              <Button variant="olive" size="md">
                Olive Accent
              </Button>
              <Button variant="dark" size="md">
                Dark Solid
              </Button>
            </div>
          </div>
        </section>

        {/* ─── Section 4: Cards & Form Controls ─────────────────── */}
        <section className="mb-24">
          <div className="mb-8">
            <Badge variant="olive" dot className="mb-2">
              Surfaces
            </Badge>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#F1EBDD]">
              Solid Architectural Cards & Form Controls
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Service Card Sample */}
            <ServiceCard
              title="Applied Machine Learning"
              description="Deploying supervised models and document intelligence pipelines directly into enterprise production."
              features={[
                "Sub-100ms Inference Latency",
                "Strict Data Privacy Isolation",
                "Deterministic Validation Layers",
              ]}
              href="/ai-solutions"
              icon={Bot}
              theme="dark"
            />

            {/* Form Sample */}
            <div className="p-7 rounded-2xl bg-[#161614] border border-[#2A2A26] space-y-4">
              <h3 className="font-serif text-lg text-[#F1EBDD]">
                Accessible Form Controls
              </h3>
              <Input
                label="Full Name"
                placeholder="Anil Sharma"
                required
              />
              <Select
                label="Primary Business Pillar"
                options={[
                  { value: "ai", label: "01 AI & Automation" },
                  { value: "it", label: "02 IT Solutions" },
                  { value: "digital", label: "03 Digital Solutions" },
                  { value: "products", label: "04 Technology Products" },
                ]}
              />
            </div>
          </div>
        </section>

        {/* ─── Section 5: Governance & Prohibitions ─────────────── */}
        <section className="p-8 sm:p-10 rounded-3xl bg-[#161614] border border-[#641F2A]/40 space-y-6">
          <div className="flex items-center gap-2">
            <Badge variant="burgundy" dot>
              System Directives
            </Badge>
            <span className="text-xs font-mono text-[#F1EBDD]/40">
              GOVERNANCE-POLICY
            </span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl text-[#F1EBDD]">
            Strict Design Prohibitions
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans text-[#F1EBDD]/80">
            <div className="p-4 rounded-xl bg-[#1B1B18] border border-[#2A2A26] space-y-1">
              <strong className="text-[#641F2A] block font-mono">PROHIBITION 01: ZERO BLUE / CYAN</strong>
              <p className="text-[#F1EBDD]/60">Under no circumstances reintroduce blue, cyan, purple, violet, or neon colors to components, text, or borders.</p>
            </div>

            <div className="p-4 rounded-xl bg-[#1B1B18] border border-[#2A2A26] space-y-1">
              <strong className="text-[#641F2A] block font-mono">PROHIBITION 02: REMOVE TRADING TERMINOLOGY</strong>
              <p className="text-[#F1EBDD]/60">Do not use: Trading, Trading & Procurement, Procurement Services, Bulk Trading, or Institutional Supply.</p>
            </div>

            <div className="p-4 rounded-xl bg-[#1B1B18] border border-[#2A2A26] space-y-1">
              <strong className="text-[#68704A] block font-mono">REQUIREMENT 03: 4 BUSINESS PILLARS</strong>
              <p className="text-[#F1EBDD]/60">All navigation, catalogs, and forms must represent 01 AI & Automation, 02 IT Solutions, 03 Digital Solutions, 04 Technology Products.</p>
            </div>

            <div className="p-4 rounded-xl bg-[#1B1B18] border border-[#2A2A26] space-y-1">
              <strong className="text-[#68704A] block font-mono">REQUIREMENT 04: SECTION CONTRAST RHYTHM</strong>
              <p className="text-[#F1EBDD]/60">Pages must maintain deliberate alternation between Warm Black (#11110F), Warm Beige (#F1EBDD), and Light Beige (#E8DFCF).</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
