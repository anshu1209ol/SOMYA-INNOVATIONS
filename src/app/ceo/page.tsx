import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Badge,
  H2,
  Text,
  Breadcrumbs,
} from "@/components/ui";
import {
  Sparkles,
  TrendingUp,
  Compass,
  Award,
  ShieldCheck,
  Building,
  ArrowUpRight,
  Target,
  Clock,
  ArrowRight,
  Layers,
  Bot,
  Server,
  Globe,
  HardDrive,
} from "lucide-react";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Executive Strategic Briefing | CEO Dashboard",
  description: "Executive strategic briefing, four-pillar portfolio performance, and commercial growth trajectory for SOMYA INNOVATIONS leadership.",
  path: "/ceo",
  noIndex: true, // Internal executive portal
});

export default function CeoPortalPage() {
  return (
    <div className="min-h-screen bg-[#F1EBDD] text-[#11110F] py-12 sm:py-16 lg:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Executive Navigation & Breadcrumbs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E8DFCF] mb-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#641F2A] flex items-center justify-center text-[#F1EBDD] font-serif text-xl font-bold">
              S
            </div>
            <div>
              <span className="text-xs font-mono text-[#641F2A] uppercase tracking-widest block font-bold">
                Executive Desk
              </span>
              <span className="text-sm font-serif font-bold text-[#11110F]">
                SOMYA INNOVATIONS
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 font-sans text-xs">
            <Link
              href="/admin"
              className="px-3.5 py-1.5 rounded-lg bg-[#E8DFCF] text-[#11110F] hover:bg-[#11110F] hover:text-[#F1EBDD] transition-colors font-medium border border-[#D5CABB]"
            >
              Operations Hub
            </Link>
            <Link
              href="/tech-lead"
              className="px-3.5 py-1.5 rounded-lg bg-[#E8DFCF] text-[#11110F] hover:bg-[#11110F] hover:text-[#F1EBDD] transition-colors font-medium border border-[#D5CABB]"
            >
              Tech Lead View
            </Link>
            <span className="text-xs font-mono text-[#11110F]/40 border-l border-[#D5CABB] pl-3">
              CONFIDENTIAL • Q1 2025
            </span>
          </div>
        </div>

        {/* ─── EDITORIAL STRATEGIC HEADER ─────────────────────────────── */}
        <header className="mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <Badge variant="burgundy" dot>
              Strategic Portfolio Briefing
            </Badge>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#11110F] tracking-tight leading-[1.1] mb-6 max-w-4xl">
            Building High-Trust Technology Assets with Disciplined Execution
          </h1>

          <p className="text-base sm:text-lg text-[#11110F]/70 max-w-3xl font-sans leading-relaxed">
            A comprehensive strategic review of SOMYA INNOVATIONS across four primary business pillars:
            AI & Automation, IT Solutions, Digital Solutions, and Technology Products. Zero speculation. Truthful capability.
          </p>
        </header>

        {/* ─── 3 HIGH-LEVEL EXECUTIVE METRICS ─────────────────────────── */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-8 rounded-3xl bg-[#E8DFCF] border border-[#D5CABB] relative overflow-hidden">
            <div className="text-xs font-mono text-[#11110F]/50 uppercase tracking-wider mb-2">
              Commercial Engagement Velocity
            </div>
            <div className="font-serif text-4xl sm:text-5xl text-[#11110F] mb-3">
              ₹38.5L
            </div>
            <div className="flex items-center gap-1.5 text-xs font-sans text-[#68704A] font-semibold mb-2">
              <TrendingUp className="w-4 h-4" />
              <span>+24% qualified pipeline quarter-over-quarter</span>
            </div>
            <p className="text-xs text-[#11110F]/60 font-sans leading-relaxed">
              Propelled by mid-market enterprise demand for applied AI automation and campus networking upgrades.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#E8DFCF] border border-[#D5CABB] relative overflow-hidden">
            <div className="text-xs font-mono text-[#11110F]/50 uppercase tracking-wider mb-2">
              Client Retention & Trust Rating
            </div>
            <div className="font-serif text-4xl sm:text-5xl text-[#641F2A] mb-3">
              100%
            </div>
            <div className="flex items-center gap-1.5 text-xs font-sans text-[#68704A] font-semibold mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Zero contract disputes or breach penalties</span>
            </div>
            <p className="text-xs text-[#11110F]/60 font-sans leading-relaxed">
              Honest technical discovery and realistic project scopes consistently prevent delivery overruns.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#E8DFCF] border border-[#D5CABB] relative overflow-hidden">
            <div className="text-xs font-mono text-[#11110F]/50 uppercase tracking-wider mb-2">
              Core Strategic Focus
            </div>
            <div className="font-serif text-4xl sm:text-5xl text-[#11110F] mb-3">
              4 Pillars
            </div>
            <div className="flex items-center gap-1.5 text-xs font-sans text-[#641F2A] font-semibold mb-2">
              <Target className="w-4 h-4" />
              <span>Complete elimination of trading operations</span>
            </div>
            <p className="text-xs text-[#11110F]/60 font-sans leading-relaxed">
              Transition to high-margin engineering services, proprietary systems, and curated technology hardware.
            </p>
          </div>
        </section>

        {/* ─── 4 PILLAR PORTFOLIO PERFORMANCE ─────────────────────────── */}
        <section className="mb-14">
          <div className="flex items-end justify-between gap-4 mb-8 pb-4 border-b border-[#E8DFCF]">
            <div>
              <span className="text-xs font-mono text-[#641F2A] uppercase tracking-wider font-semibold">
                Portfolio Breakdown
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#11110F] mt-1">
                Strategic Performance by Pillar
              </h2>
            </div>
            <span className="text-xs font-mono text-[#11110F]/40">
              FY 2024–25 Portfolio Allocation
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pillar 1: AI */}
            <div className="p-7 rounded-2xl bg-[#E8DFCF] border border-[#D5CABB] space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#641F2A]/15 border border-[#641F2A]/30 flex items-center justify-center text-[#641F2A]">
                  <Bot className="w-5 h-5" />
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono text-[#641F2A] font-bold">
                    Pillar 01
                  </span>
                  <div className="text-xs font-sans font-semibold text-[#68704A]">
                    High Growth (38%)
                  </div>
                </div>
              </div>

              <h3 className="font-serif text-xl text-[#11110F]">
                AI & Automation Solutions
              </h3>
              <p className="text-xs text-[#11110F]/70 font-sans leading-relaxed">
                Applied computer vision, intelligent document extraction, and event-driven automation for industrial and commercial operations.
              </p>

              <div className="pt-3 border-t border-[#D5CABB] space-y-1.5 text-xs font-sans text-[#11110F]/80">
                <div className="flex justify-between">
                  <span>Average Deal Value:</span>
                  <strong className="font-mono">₹2.8L – ₹4.5L</strong>
                </div>
                <div className="flex justify-between">
                  <span>Gross Margin:</span>
                  <strong className="font-mono text-[#68704A]">68%</strong>
                </div>
                <div className="flex justify-between">
                  <span>Strategic Moat:</span>
                  <span>Proprietary edge inference integration</span>
                </div>
              </div>
            </div>

            {/* Pillar 2: IT */}
            <div className="p-7 rounded-2xl bg-[#E8DFCF] border border-[#D5CABB] space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#68704A]/15 border border-[#68704A]/30 flex items-center justify-center text-[#68704A]">
                  <Server className="w-5 h-5" />
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono text-[#68704A] font-bold">
                    Pillar 02
                  </span>
                  <div className="text-xs font-sans font-semibold text-[#11110F]/70">
                    Core Foundation (32%)
                  </div>
                </div>
              </div>

              <h3 className="font-serif text-xl text-[#11110F]">
                IT Solutions & Infrastructure
              </h3>
              <p className="text-xs text-[#11110F]/70 font-sans leading-relaxed">
                Campus networks, enterprise workstation fleets, server room staging, firewall hardening, and annual maintenance contracts.
              </p>

              <div className="pt-3 border-t border-[#D5CABB] space-y-1.5 text-xs font-sans text-[#11110F]/80">
                <div className="flex justify-between">
                  <span>Average Deal Value:</span>
                  <strong className="font-mono">₹1.5L – ₹3.2L</strong>
                </div>
                <div className="flex justify-between">
                  <span>Gross Margin:</span>
                  <strong className="font-mono text-[#68704A]">44%</strong>
                </div>
                <div className="flex justify-between">
                  <span>Strategic Moat:</span>
                  <span>Local physical engineering presence & SLA trust</span>
                </div>
              </div>
            </div>

            {/* Pillar 3: Digital */}
            <div className="p-7 rounded-2xl bg-[#E8DFCF] border border-[#D5CABB] space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#641F2A]/15 border border-[#641F2A]/30 flex items-center justify-center text-[#641F2A]">
                  <Globe className="w-5 h-5" />
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono text-[#641F2A] font-bold">
                    Pillar 03
                  </span>
                  <div className="text-xs font-sans font-semibold text-[#68704A]">
                    Expanding (20%)
                  </div>
                </div>
              </div>

              <h3 className="font-serif text-xl text-[#11110F]">
                Digital Solutions & Web Systems
              </h3>
              <p className="text-xs text-[#11110F]/70 font-sans leading-relaxed">
                Full-stack Next.js platforms, operational dashboards, transactional APIs, and database migrations replacing spreadsheets.
              </p>

              <div className="pt-3 border-t border-[#D5CABB] space-y-1.5 text-xs font-sans text-[#11110F]/80">
                <div className="flex justify-between">
                  <span>Average Deal Value:</span>
                  <strong className="font-mono">₹1.2L – ₹2.5L</strong>
                </div>
                <div className="flex justify-between">
                  <span>Gross Margin:</span>
                  <strong className="font-mono text-[#68704A]">62%</strong>
                </div>
                <div className="flex justify-between">
                  <span>Strategic Moat:</span>
                  <span>High-performance architecture with zero third-party lock-in</span>
                </div>
              </div>
            </div>

            {/* Pillar 4: Products */}
            <div className="p-7 rounded-2xl bg-[#E8DFCF] border border-[#D5CABB] space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#68704A]/15 border border-[#68704A]/30 flex items-center justify-center text-[#68704A]">
                  <HardDrive className="w-5 h-5" />
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono text-[#68704A] font-bold">
                    Pillar 04
                  </span>
                  <div className="text-xs font-sans font-semibold text-[#11110F]/70">
                    Supporting (10%)
                  </div>
                </div>
              </div>

              <h3 className="font-serif text-xl text-[#11110F]">
                Technology Products Catalogue
              </h3>
              <p className="text-xs text-[#11110F]/70 font-sans leading-relaxed">
                Curated computing hardware nodes, enterprise managed switches, displays, and commercial software licensing supporting turnkey client deployments.
              </p>

              <div className="pt-3 border-t border-[#D5CABB] space-y-1.5 text-xs font-sans text-[#11110F]/80">
                <div className="flex justify-between">
                  <span>Role in Portfolio:</span>
                  <strong className="font-mono">Enabling Capability</strong>
                </div>
                <div className="flex justify-between">
                  <span>Gross Margin:</span>
                  <strong className="font-mono text-[#68704A]">22%</strong>
                </div>
                <div className="flex justify-between">
                  <span>Strategic Moat:</span>
                  <span>Validated OEM factory support without trading overhead</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── LEADERSHIP STRATEGIC DIRECTIVES ────────────────────────── */}
        <section className="p-8 sm:p-10 rounded-3xl bg-[#11110F] text-[#F1EBDD] border border-[#2A2A26] space-y-6">
          <div className="flex items-center gap-2">
            <Badge variant="burgundy" dot>
              Strategic Mandate
            </Badge>
            <span className="text-xs font-mono text-[#F1EBDD]/40">
              EXECUTIVE-DIRECTIVE-2025
            </span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl text-[#F1EBDD] tracking-tight">
            Key Operational Principles for 2025 Expansion
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-[#2A2A26] font-sans">
            <div className="space-y-2">
              <span className="text-xs font-mono text-[#641F2A] font-bold">
                01 • ZERO SPECULATION
              </span>
              <h4 className="text-sm font-bold text-[#F1EBDD]">
                Sell Concrete Capabilities
              </h4>
              <p className="text-xs text-[#F1EBDD]/60 leading-relaxed">
                Never promise speculative AI models or fictional deliverables. We only bid on projects where our engineering team can guarantee production reliability.
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono text-[#68704A] font-bold">
                02 • HONEST RECRUITMENT
              </span>
              <h4 className="text-sm font-bold text-[#F1EBDD]">
                Publish Only Funded Roles
              </h4>
              <p className="text-xs text-[#F1EBDD]/60 leading-relaxed">
                Maintain strict transparency on the Careers portal. No ghost requisitions or vanity postings. Candidate trust is our primary recruitment asset.
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono text-[#641F2A] font-bold">
                03 • QUIET LUXURY
              </span>
              <h4 className="text-sm font-bold text-[#F1EBDD]">
                Dignified Brand Experience
              </h4>
              <p className="text-xs text-[#F1EBDD]/60 leading-relaxed">
                Preserve the Warm Beige and Warm Black aesthetic with Burgundy and Olive accents. Zero neon tech tropes or generic AI startup styling.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
