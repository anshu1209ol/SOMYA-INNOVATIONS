import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/buttons";
import {
  Badge,
  SectionHeading,
  DisplayHeading,
  EditorialHeading,
  Text,
} from "@/components/ui";
import { HeroVisual } from "@/components/hero/HeroVisual";
import {
  ArrowRight,
  Cpu,
  Server,
  Shield,
  Layers,
  Globe,
  Terminal,
  Eye,
  BrainCircuit,
  Workflow,
  LineChart,
  MessageSquareCode,
  FileSearch,
  BarChart3,
  Code2,
  HardDrive,
  Network,
  Lock,
  Headphones,
  Laptop,
  CheckCircle2,
  Check,
} from "lucide-react";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "SOMYA INNOVATIONS | Technology • AI • IT Solutions",
  description:
    "SOMYA INNOVATIONS provides AI & automation, enterprise IT solutions, digital platforms, and technology products engineered for business performance.",
  path: "/",
});

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* ─── 1. HERO SECTION — Reference-matched split layout ───── */}
      <section className="relative min-h-[100svh] overflow-hidden bg-[#11110F] text-[#F1EBDD]">

        {/* ── Right-side workspace image (positioned absolute, desktop only) ── */}
        <div className="hidden lg:block absolute top-0 right-0 w-[50%] h-full z-0">
          <img
            src="/images/hero-workspace.jpg"
            alt="Professional executive office workspace with city skyline view"
            className="w-full h-full object-cover"
          />
          {/* Dark overlay to blend edges */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#11110F] via-[#11110F]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#11110F]/60 via-transparent to-[#11110F]/30" />

          {/* Vertical manifesto text: SOLVE BUILD INNOVATE GROW */}
          <div className="absolute top-[18%] right-[12%] z-10 space-y-1 text-right">
            <p className="text-[13px] font-mono tracking-[0.3em] text-[#C8C2B3]/80 uppercase">Solve</p>
            <p className="text-[13px] font-mono tracking-[0.3em] text-[#C8C2B3]/80 uppercase">Build</p>
            <p className="text-[13px] font-mono tracking-[0.3em] text-[#C8C2B3]/80 uppercase">Innovate</p>
            <p className="text-[13px] font-mono tracking-[0.3em] text-[#C8C2B3]/80 uppercase">Grow</p>
          </div>

          {/* Bottom-right: BUILDING MEANINGFUL SOLUTIONS */}
          <div className="absolute bottom-8 right-8 z-10 text-right">
            <p className="text-[10px] font-mono tracking-[0.25em] text-[#C8C2B3]/70 uppercase leading-relaxed">
              Building<br />
              Meaningful<br />
              Solutions
            </p>
          </div>
        </div>

        {/* ── Diagonal burgundy geometric shape ── */}
        <div className="hidden lg:block absolute z-[1]" style={{
          top: 0,
          right: '32%',
          width: '28%',
          height: '100%',
          background: 'linear-gradient(160deg, #641F2A 0%, #45151D 100%)',
          clipPath: 'polygon(60% 0%, 100% 0%, 40% 100%, 0% 100%)',
          opacity: 0.85,
        }} />

        {/* ── Small burgundy triangular accent (top-right corner) ── */}
        <div className="hidden lg:block absolute z-[1]" style={{
          top: 0,
          right: '35%',
          width: '22%',
          height: '30%',
          background: '#3B1118',
          clipPath: 'polygon(100% 0%, 100% 100%, 40% 0%)',
          opacity: 0.7,
        }} />

        {/* ── Left-side content ── */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 flex flex-col justify-center min-h-[100svh] pt-28 pb-16 lg:pt-32 lg:pb-20">
          <div className="max-w-xl lg:max-w-[540px]">

            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-10">
              <span className="w-8 h-px bg-[#C8C2B3]/50" />
              <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#C8C2B3]/80 font-medium">
                Technology for a smarter tomorrow
              </span>
            </div>

            {/* Main heading */}
            <h1 className="mb-7">
              <span className="block text-[clamp(2.5rem,5vw,4rem)] font-bold text-[#F1EBDD] leading-[1.08] tracking-tight" style={{ fontFamily: 'var(--font-manrope), sans-serif' }}>
                Technology built around
              </span>
              <span className="block text-[clamp(2.5rem,5vw,4rem)] leading-[1.08] tracking-tight text-[#E8DFCF]" style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontStyle: 'italic', fontWeight: 400 }}>
                how your business works.
              </span>
            </h1>

            {/* Supporting paragraph */}
            <p className="text-[15px] leading-relaxed text-[#C8C2B3]/90 max-w-md mb-9">
              We design and deliver practical technology solutions across
              AI, IT infrastructure and digital products—built around
              real business requirements.
            </p>

            {/* Two CTA buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-16">
              <Link
                href="#pillars"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-semibold text-[#F1EBDD] bg-[#641F2A] hover:bg-[#7D2836] border border-[#641F2A]/60 shadow-[0_2px_16px_rgba(100,31,42,0.35)] transition-all duration-200"
              >
                <span>Explore Solutions</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center px-6 py-3 rounded-full text-sm font-semibold text-[#F1EBDD] bg-transparent border border-[#F1EBDD]/25 hover:border-[#F1EBDD]/50 hover:bg-white/[0.04] transition-all duration-200"
              >
                Start a Conversation
              </Link>
            </div>

            {/* Service labels with thin separators */}
            <div className="flex flex-wrap items-center gap-x-0 text-[10px] font-mono tracking-[0.2em] uppercase text-[#C8C2B3]/60">
              <span className="w-6 h-px bg-[#C8C2B3]/30 mr-3" />
              <span className="pr-4">AI & Automation</span>
              <span className="w-px h-3 bg-[#C8C2B3]/25 mr-4" />
              <span className="pr-4">IT Solutions</span>
              <span className="w-px h-3 bg-[#C8C2B3]/25 mr-4" />
              <span className="pr-4">Digital Solutions</span>
              <span className="w-px h-3 bg-[#C8C2B3]/25 mr-4" />
              <span>Technology Products</span>
            </div>

          </div>

          {/* Navigation arrows at bottom-left */}
          <div className="absolute bottom-8 left-6 sm:left-8 lg:left-10 flex items-center gap-3 z-10">
            <button
              type="button"
              aria-label="Previous"
              className="w-8 h-8 flex items-center justify-center text-[#C8C2B3]/50 hover:text-[#F1EBDD] transition-colors"
            >
              <span className="text-lg">←</span>
            </button>
            <button
              type="button"
              aria-label="Next"
              className="w-8 h-8 flex items-center justify-center text-[#C8C2B3]/50 hover:text-[#F1EBDD] transition-colors"
            >
              <span className="text-lg">→</span>
            </button>
          </div>
        </div>

        {/* ── Mobile workspace image (stacked below content on mobile) ── */}
        <div className="lg:hidden relative w-full h-64 sm:h-80 -mt-4">
          <img
            src="/images/hero-workspace.jpg"
            alt="Professional executive office workspace"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#11110F] via-[#11110F]/40 to-transparent" />
          {/* Diagonal burgundy accent on mobile */}
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(160deg, #641F2A 0%, #45151D 100%)',
            clipPath: 'polygon(0% 0%, 50% 0%, 0% 70%)',
            opacity: 0.75,
          }} />
          {/* Mobile manifesto text */}
          <div className="absolute bottom-6 right-6 text-right">
            <p className="text-[10px] font-mono tracking-[0.25em] text-[#C8C2B3]/70 uppercase leading-relaxed">
              Building<br />
              Meaningful<br />
              Solutions
            </p>
          </div>
        </div>

      </section>

      {/* ─── 2. BUSINESS AREAS (Warm Beige #F1EBDD) ─────────────────── */}
      <section id="pillars" className="py-24 lg:py-32 relative bg-[#F1EBDD] text-[#11110F] fine-divider-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Four Business Areas"
            badgeVariant="burgundy"
            theme="light"
            title="Engineered Capabilities for Modern Business"
            subtitle="Distinct, coordinated capabilities designed to solve operational bottlenecks and modernize enterprise systems."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 01. AI & Automation */}
            <div className="p-8 rounded-2xl bg-white border border-black/[0.08] flex flex-col justify-between hover-elevate group transition-all duration-300">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="text-sm font-mono font-bold text-[#641F2A]">01</span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#11110F]/60 bg-[#F1EBDD] px-2.5 py-0.5 rounded border border-black/[0.06]">
                    APPLIED AI
                  </span>
                </div>
                <div className="w-12 h-12 rounded-xl bg-[#641F2A]/10 border border-[#641F2A]/20 flex items-center justify-center text-[#641F2A] mb-5 group-hover:scale-105 transition-transform">
                  <Cpu className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[#11110F] tracking-tight mb-3">
                  AI & Automation
                </h3>
                <p className="text-sm text-[#11110F]/70 leading-relaxed mb-6">
                  Applied machine learning, computer vision, automated document parsing, predictive models, and autonomous workflow pipelines.
                </p>
              </div>
              <div className="pt-4 border-t border-black/[0.08]">
                <Link
                  href="/ai-solutions"
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#641F2A] hover:text-[#45151D] transition-colors"
                >
                  <span>Explore AI Capabilities</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* 02. IT Solutions */}
            <div className="p-8 rounded-2xl bg-white border border-black/[0.08] flex flex-col justify-between hover-elevate group transition-all duration-300">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="text-sm font-mono font-bold text-[#68704A]">02</span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#11110F]/60 bg-[#F1EBDD] px-2.5 py-0.5 rounded border border-black/[0.06]">
                    INFRASTRUCTURE
                  </span>
                </div>
                <div className="w-12 h-12 rounded-xl bg-[#68704A]/15 border border-[#68704A]/25 flex items-center justify-center text-[#68704A] mb-5 group-hover:scale-105 transition-transform">
                  <Server className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[#11110F] tracking-tight mb-3">
                  IT Solutions
                </h3>
                <p className="text-sm text-[#11110F]/70 leading-relaxed mb-6">
                  Physical computing hardware, enterprise networking, cybersecurity defenses, systems architecture, and 24/7 technical support SLAs.
                </p>
              </div>
              <div className="pt-4 border-t border-black/[0.08]">
                <Link
                  href="/it-solutions"
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#68704A] hover:text-[#4D5437] transition-colors"
                >
                  <span>Explore IT Solutions</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* 03. Digital Solutions */}
            <div className="p-8 rounded-2xl bg-white border border-black/[0.08] flex flex-col justify-between hover-elevate group transition-all duration-300">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="text-sm font-mono font-bold text-[#641F2A]">03</span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#11110F]/60 bg-[#F1EBDD] px-2.5 py-0.5 rounded border border-black/[0.06]">
                    PLATFORMS
                  </span>
                </div>
                <div className="w-12 h-12 rounded-xl bg-[#641F2A]/10 border border-[#641F2A]/20 flex items-center justify-center text-[#641F2A] mb-5 group-hover:scale-105 transition-transform">
                  <Globe className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[#11110F] tracking-tight mb-3">
                  Digital Solutions
                </h3>
                <p className="text-sm text-[#11110F]/70 leading-relaxed mb-6">
                  Custom web applications, business portals, cloud integrations, internal tool automation, and scalable digital platforms.
                </p>
              </div>
              <div className="pt-4 border-t border-black/[0.08]">
                <Link
                  href="/digital-solutions"
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#641F2A] hover:text-[#45151D] transition-colors"
                >
                  <span>Explore Digital Solutions</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* 04. Technology Products */}
            <div className="p-8 rounded-2xl bg-white border border-black/[0.08] flex flex-col justify-between hover-elevate group transition-all duration-300">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="text-sm font-mono font-bold text-[#68704A]">04</span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#11110F]/60 bg-[#F1EBDD] px-2.5 py-0.5 rounded border border-black/[0.06]">
                    CATALOGUE
                  </span>
                </div>
                <div className="w-12 h-12 rounded-xl bg-[#68704A]/15 border border-[#68704A]/25 flex items-center justify-center text-[#68704A] mb-5 group-hover:scale-105 transition-transform">
                  <Terminal className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[#11110F] tracking-tight mb-3">
                  Technology Products
                </h3>
                <p className="text-sm text-[#11110F]/70 leading-relaxed mb-6">
                  Curated product catalogue supporting enterprise deployments: workstations, servers, network appliances, and security hardware.
                </p>
              </div>
              <div className="pt-4 border-t border-black/[0.08]">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#68704A] hover:text-[#4D5437] transition-colors"
                >
                  <span>Browse Product Catalogue</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 3. ABOUT SECTION (Light Beige #E8DFCF) ─────────────────── */}
      <section className="py-24 lg:py-32 relative bg-[#E8DFCF] text-[#11110F] fine-divider-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <Badge variant="burgundy" dot className="mb-4">
              About SOMYA INNOVATIONS
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#11110F] tracking-tight mb-6 leading-tight">
              Technology should solve problems,{" "}
              <EditorialHeading italic className="text-[#641F2A]">
                not create complexity.
              </EditorialHeading>
            </h2>
            <p className="text-base sm:text-lg text-[#11110F]/80 leading-relaxed mb-4">
              At SOMYA INNOVATIONS, we design, deploy, and maintain technology systems built around
              how your organization actually functions. We avoid speculative tech trends, over-engineered
              paradigms, and unnecessary vendor overhead.
            </p>
            <p className="text-sm sm:text-base text-[#11110F]/70 leading-relaxed">
              Our approach unites applied artificial intelligence, enterprise infrastructure, and custom
              software engineering into a singular, accountable partnership.
            </p>
          </div>

          {/* Three Core Principles */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 rounded-2xl bg-[#F1EBDD] border border-black/[0.08] hover-elevate">
              <span className="text-xs font-mono text-[#641F2A] font-bold block mb-3">PRINCIPLE 01</span>
              <h3 className="text-xl font-bold text-[#11110F] tracking-tight mb-3">
                Pragmatic Engineering
              </h3>
              <p className="text-sm text-[#11110F]/70 leading-relaxed">
                Real solutions tested for stability. We deploy proven architectural patterns and verified hardware to ensure continuous operational uptime.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#F1EBDD] border border-black/[0.08] hover-elevate">
              <span className="text-xs font-mono text-[#68704A] font-bold block mb-3">PRINCIPLE 02</span>
              <h3 className="text-xl font-bold text-[#11110F] tracking-tight mb-3">
                Commercial Alignment
              </h3>
              <p className="text-sm text-[#11110F]/70 leading-relaxed">
                Every automation workflow, network rollout, and software feature must have measurable commercial return and clear operational justification.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#F1EBDD] border border-black/[0.08] hover-elevate">
              <span className="text-xs font-mono text-[#641F2A] font-bold block mb-3">PRINCIPLE 03</span>
              <h3 className="text-xl font-bold text-[#11110F] tracking-tight mb-3">
                Operational Longevity
              </h3>
              <p className="text-sm text-[#11110F]/70 leading-relaxed">
                Systems engineered with modularity and clean documentation, ensuring your team retains full control without proprietary vendor lock-in.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 4. AI SHOWCASE (Warm Black #11110F) ─────────────────────── */}
      <section className="py-24 lg:py-32 relative bg-[#11110F] text-[#F1EBDD] fine-divider-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <Badge variant="burgundy" dot className="mb-3">
                Applied Artificial Intelligence
              </Badge>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F1EBDD] tracking-tight mb-4">
                Production-Ready AI for Critical Operations
              </h2>
              <p className="text-base text-[#F1EBDD]/70 leading-relaxed">
                Practical, production-grade intelligence embedded into enterprise workflows to enhance decision velocity,
                automate high-volume processing, and extract strategic insights.
              </p>
            </div>
            <div>
              <ButtonLink href="/ai-solutions" variant="primary" icon={<ArrowRight className="w-4 h-4" />}>
                Explore AI Capabilities
              </ButtonLink>
            </div>
          </div>

          {/* 8 AI Capabilities Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                title: "Computer Vision",
                desc: "Real-time visual quality inspection, object recognition, and automated optical validation.",
                icon: Eye,
              },
              {
                title: "Machine Learning",
                desc: "Custom trained supervised and unsupervised algorithms solving complex business prediction tasks.",
                icon: BrainCircuit,
              },
              {
                title: "AI Automation",
                desc: "Autonomous workflow agents bridging disparate legacy systems and reducing manual friction.",
                icon: Workflow,
              },
              {
                title: "Predictive Analytics",
                desc: "Time-series forecasting models for supply demand, risk mitigation, and revenue projections.",
                icon: LineChart,
              },
              {
                title: "AI Chatbots",
                desc: "Context-aware conversational assistants trained on private enterprise knowledge bases.",
                icon: MessageSquareCode,
              },
              {
                title: "Document Intelligence",
                desc: "Automated OCR extraction, contract parsing, invoice reconciliation, and semantic sorting.",
                icon: FileSearch,
              },
              {
                title: "Data Analytics",
                desc: "Scalable data ingestion pipelines, real-time KPI telemetry, and executive intelligence dashboards.",
                icon: BarChart3,
              },
              {
                title: "Custom AI Applications",
                desc: "Bespoke full-stack applications engineered from ground up around proprietary AI logic.",
                icon: Code2,
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="p-6 rounded-xl bg-[#1B1B18] border border-white/[0.08] hover:border-[#641F2A]/50 transition-all duration-300 hover-elevate group"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#641F2A]/20 border border-[#641F2A]/30 flex items-center justify-center text-[#F1EBDD] mb-4 group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-[#F1EBDD] mb-2">{item.title}</h4>
                  <p className="text-xs text-[#F1EBDD]/70 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── 5. IT SOLUTIONS (Warm Beige #F1EBDD) ────────────────────── */}
      <section className="py-24 lg:py-32 relative bg-[#F1EBDD] text-[#11110F] fine-divider-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <Badge variant="olive" dot className="mb-3">
                Enterprise IT Systems
              </Badge>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#11110F] tracking-tight mb-4">
                Foundations Engineered for Continuous Uptime
              </h2>
              <p className="text-base text-[#11110F]/70 leading-relaxed">
                Robust computing infrastructure, multi-gigabit networking, zero-trust cybersecurity, and SLA-governed support.
              </p>
            </div>
            <div>
              <ButtonLink href="/it-solutions" variant="secondary-dark" icon={<ArrowRight className="w-4 h-4" />}>
                Explore IT Infrastructure
              </ButtonLink>
            </div>
          </div>

          {/* 5 Core Pillars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {[
              {
                title: "Hardware",
                desc: "High-spec server racks, enterprise workstations, power backups, and peripherals.",
                icon: HardDrive,
                badge: "Compute",
              },
              {
                title: "Networking",
                desc: "Structured fiber cabling, routing switches, firewall gateways, and wireless mesh topology.",
                icon: Network,
                badge: "Connectivity",
              },
              {
                title: "Security",
                desc: "Zero-trust network access, endpoint protection, automated penetration auditing, and backups.",
                icon: Lock,
                badge: "Defense",
              },
              {
                title: "Software",
                desc: "Enterprise OS licensing, virtualization hypervisors, and business productivity stacks.",
                icon: Terminal,
                badge: "Platform",
              },
              {
                title: "Support",
                desc: "24/7 incident response, scheduled preventive maintenance, and SLA-governed helpdesk.",
                icon: Headphones,
                badge: "Assurance",
              },
            ].map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="p-6 rounded-xl bg-white border border-black/[0.08] hover:border-[#68704A]/60 transition-all duration-300 flex flex-col justify-between hover-elevate group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-lg bg-[#68704A]/15 border border-[#68704A]/25 flex items-center justify-center text-[#68704A] group-hover:scale-105 transition-transform">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#11110F]/70 bg-[#F1EBDD] px-2 py-0.5 rounded border border-black/[0.06]">
                        {pillar.badge}
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-[#11110F] mb-2">{pillar.title}</h4>
                    <p className="text-xs text-[#11110F]/70 leading-relaxed mb-4">{pillar.desc}</p>
                  </div>
                  <div className="pt-3 border-t border-black/[0.08] text-[11px] font-mono text-[#68704A] font-semibold">
                    SLA GOVERNED
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── 6. DIGITAL SOLUTIONS (Light Beige #E8DFCF) ──────────────── */}
      <section className="py-24 lg:py-32 relative bg-[#E8DFCF] text-[#11110F] fine-divider-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <Badge variant="burgundy" dot className="mb-3">
                Digital Platforms
              </Badge>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#11110F] tracking-tight mb-4">
                High-Performance Platforms Built for Scale
              </h2>
              <p className="text-base text-[#11110F]/70 leading-relaxed">
                Custom web applications, business portals, cloud integrations, and API microservices designed for intuitive usability and high transactional throughput.
              </p>
            </div>
            <div>
              <ButtonLink href="/digital-solutions" variant="primary" icon={<ArrowRight className="w-4 h-4" />}>
                Explore Digital Solutions
              </ButtonLink>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 rounded-2xl bg-[#F1EBDD] border border-black/[0.08] hover-elevate">
              <div className="w-12 h-12 rounded-xl bg-[#641F2A]/10 border border-[#641F2A]/20 flex items-center justify-center text-[#641F2A] mb-5">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#11110F] tracking-tight mb-2">
                Enterprise Web Platforms
              </h3>
              <p className="text-sm text-[#11110F]/70 leading-relaxed mb-4">
                Fast, responsive web applications built with modern frontend frameworks and SEO-optimized architecture.
              </p>
              <ul className="space-y-2 text-xs text-[#11110F]/80">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#68704A]" />
                  <span>Next.js & React Architecture</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#68704A]" />
                  <span>Sub-second Page Load Speeds</span>
                </li>
              </ul>
            </div>

            <div className="p-8 rounded-2xl bg-[#F1EBDD] border border-black/[0.08] hover-elevate">
              <div className="w-12 h-12 rounded-xl bg-[#68704A]/15 border border-[#68704A]/25 flex items-center justify-center text-[#68704A] mb-5">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#11110F] tracking-tight mb-2">
                Custom Portals & ERP
              </h3>
              <p className="text-sm text-[#11110F]/70 leading-relaxed mb-4">
                Internal dashboards, client portals, inventory trackers, and role-based access management systems.
              </p>
              <ul className="space-y-2 text-xs text-[#11110F]/80">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#68704A]" />
                  <span>Fine-grained Permission Controls</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#68704A]" />
                  <span>Real-time Operational Telemetry</span>
                </li>
              </ul>
            </div>

            <div className="p-8 rounded-2xl bg-[#F1EBDD] border border-black/[0.08] hover-elevate">
              <div className="w-12 h-12 rounded-xl bg-[#641F2A]/10 border border-[#641F2A]/20 flex items-center justify-center text-[#641F2A] mb-5">
                <Workflow className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#11110F] tracking-tight mb-2">
                Workflow Automation
              </h3>
              <p className="text-sm text-[#11110F]/70 leading-relaxed mb-4">
                Automate repetitive cross-departmental operations, sync data between software tools, and eliminate manual data entry.
              </p>
              <ul className="space-y-2 text-xs text-[#11110F]/80">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#68704A]" />
                  <span>REST / GraphQL API Connectors</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#68704A]" />
                  <span>Zero-Loss Event Queues</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 7. CASE STUDIES / FRAMEWORK (Warm Black #11110F) ───────── */}
      <section className="py-24 lg:py-32 relative bg-[#11110F] text-[#F1EBDD] fine-divider-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Case Studies"
            badgeVariant="burgundy"
            title="Real Outcomes. Measurable Precision."
            subtitle="Transparent case summaries demonstrating how our technology capabilities solve tangible operational challenges."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Case Study 1 */}
            <div className="p-8 rounded-2xl bg-[#1B1B18] border border-white/[0.08] flex flex-col justify-between hover-elevate">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#E8DFCF]/70">
                    MANUFACTURING & QUALITY
                  </span>
                  <span className="text-xs font-mono text-[#68704A] font-bold">99.4% ACCURACY</span>
                </div>
                <h3 className="text-xl font-bold text-[#F1EBDD] mb-3">
                  Computer Vision Automated Defect Detection
                </h3>
                <p className="text-sm text-[#F1EBDD]/70 leading-relaxed mb-6">
                  Replaced manual optical inspection on production lines with high-speed edge camera inference, detecting micro-surface defects in real-time.
                </p>
                <div className="space-y-2.5 pt-4 border-t border-white/[0.08] text-xs text-[#F1EBDD]/80">
                  <div className="flex justify-between">
                    <span className="text-[#F1EBDD]/50">Inspection Cycle:</span>
                    <span className="font-mono text-[#F1EBDD]">42ms / part</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#F1EBDD]/50">False Positive Rate:</span>
                    <span className="font-mono text-[#68704A]">&lt; 0.6%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#F1EBDD]/50">Deployment:</span>
                    <span className="font-mono text-[#F1EBDD]">On-prem Edge Nodes</span>
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-4 border-t border-white/[0.08]">
                <Link
                  href="/work"
                  className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#E8DFCF] hover:text-white transition-colors"
                >
                  <span>View Case Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Case Study 2 */}
            <div className="p-8 rounded-2xl bg-[#1B1B18] border border-white/[0.08] flex flex-col justify-between hover-elevate">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#E8DFCF]/70">
                    LOGISTICS & NETWORKING
                  </span>
                  <span className="text-xs font-mono text-[#68704A] font-bold">99.99% UPTIME</span>
                </div>
                <h3 className="text-xl font-bold text-[#F1EBDD] mb-3">
                  Multi-Site Network Redundancy & Zero-Trust
                </h3>
                <p className="text-sm text-[#F1EBDD]/70 leading-relaxed mb-6">
                  Engineered dual-carrier SD-WAN routing and encrypted site-to-site bridges across 6 corporate facilities, guaranteeing failover within 100ms.
                </p>
                <div className="space-y-2.5 pt-4 border-t border-white/[0.08] text-xs text-[#F1EBDD]/80">
                  <div className="flex justify-between">
                    <span className="text-[#F1EBDD]/50">Failover Latency:</span>
                    <span className="font-mono text-[#68704A]">&lt; 100ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#F1EBDD]/50">Encryption:</span>
                    <span className="font-mono text-[#F1EBDD]">WireGuard / IPsec</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#F1EBDD]/50">Managed SLA:</span>
                    <span className="font-mono text-[#F1EBDD]">24/7 Monitoring</span>
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-4 border-t border-white/[0.08]">
                <Link
                  href="/work"
                  className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#E8DFCF] hover:text-white transition-colors"
                >
                  <span>View Case Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Case Study 3 */}
            <div className="p-8 rounded-2xl bg-[#1B1B18] border border-white/[0.08] flex flex-col justify-between hover-elevate">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#E8DFCF]/70">
                    COMMERCE & DIGITAL
                  </span>
                  <span className="text-xs font-mono text-[#68704A] font-bold">85% TIME SAVED</span>
                </div>
                <h3 className="text-xl font-bold text-[#F1EBDD] mb-3">
                  Enterprise Portal & Automated Reconciliation
                </h3>
                <p className="text-sm text-[#F1EBDD]/70 leading-relaxed mb-6">
                  Consolidated 4 legacy inventory spreadsheets and external supplier invoices into an automated portal with instant optical verification.
                </p>
                <div className="space-y-2.5 pt-4 border-t border-white/[0.08] text-xs text-[#F1EBDD]/80">
                  <div className="flex justify-between">
                    <span className="text-[#F1EBDD]/50">Data Accuracy:</span>
                    <span className="font-mono text-[#68704A]">99.8% Verified</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#F1EBDD]/50">Audit Trail:</span>
                    <span className="font-mono text-[#F1EBDD]">Immutable Log</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#F1EBDD]/50">Processing Speed:</span>
                    <span className="font-mono text-[#F1EBDD]">Seconds vs Days</span>
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-4 border-t border-white/[0.08]">
                <Link
                  href="/work"
                  className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#E8DFCF] hover:text-white transition-colors"
                >
                  <span>View Case Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 8. FINAL CTA (Burgundy #641F2A / Warm Black #11110F) ────── */}
      <section className="py-24 lg:py-32 relative bg-[#11110F] text-[#F1EBDD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden border border-white/[0.12] bg-[#641F2A] p-8 sm:p-14 lg:p-16 text-center shadow-2xl">
            <div className="relative z-10 max-w-3xl mx-auto">
              <Badge variant="beige" dot className="mb-4">
                Partner with SOMYA INNOVATIONS
              </Badge>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F1EBDD] tracking-tight mb-5">
                Let&apos;s Build Something Better
              </h2>
              <p className="text-base sm:text-lg text-[#F1EBDD]/80 leading-relaxed max-w-2xl mx-auto mb-10">
                Whether you need applied AI systems, robust enterprise IT architecture, custom digital applications,
                or supporting technology products, SOMYA INNOVATIONS is your technology partner.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <ButtonLink
                  href="/request-quote"
                  variant="secondary"
                  size="lg"
                  className="w-full sm:w-auto bg-[#F1EBDD] text-[#11110F] hover:bg-white border-transparent"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Request a Quote
                </ButtonLink>
                <ButtonLink
                  href="/contact"
                  variant="secondary"
                  size="lg"
                  className="w-full sm:w-auto border-white/40 text-[#F1EBDD] hover:bg-white/10"
                >
                  Contact SOMYA
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
