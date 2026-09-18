"use client";

import React from "react";
import {
  Cpu,
  Server,
  Shield,
  Layers,
  Activity,
  CheckCircle2,
  Terminal,
} from "lucide-react";

export function HeroVisual() {
  return (
    <div className="relative w-full max-w-5xl mx-auto mt-12 lg:mt-16 select-none text-left">
      {/* Subtle luxury ambient glow behind blueprint */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#641F2A]/10 via-transparent to-[#68704A]/10 rounded-3xl blur-3xl -z-10 pointer-events-none" />

      {/* Architectural blueprint container */}
      <div className="relative rounded-2xl border border-white/[0.12] bg-[#11110F] p-6 sm:p-8 lg:p-10 shadow-2xl overflow-hidden">
        {/* Architectural grid overlay */}
        <div className="absolute inset-0 bg-arch-grid-dark opacity-30 pointer-events-none" />

        {/* Top visual telemetry & architectural header */}
        <div className="relative z-10 flex flex-wrap items-center justify-between pb-6 mb-8 border-b border-white/[0.08] gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#641F2A]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#68704A]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#E8DFCF]/60" />
            </div>
            <span className="text-xs font-mono text-[#F1EBDD]/60 tracking-wider">
              ARCH_SPEC // ENTERPRISE_UNIFIED_SYSTEMS
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#68704A]/15 text-[#E8DFCF] border border-[#68704A]/30">
              <span className="w-1.5 h-1.5 rounded-full bg-[#68704A] animate-pulse" />
              <span className="text-[11px] tracking-wide font-medium">PRECISION PLATFORM</span>
            </div>
            <span className="text-[#F1EBDD]/40 hidden md:inline-block">
              UPTIME: 99.99% // SLA GUARANTEED
            </span>
          </div>
        </div>

        {/* 4 Core Pillars Architecture Blueprint Grid */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Pillar 01: AI & Automation */}
          <div className="p-5 rounded-xl bg-[#1B1B18] border border-white/[0.08] hover:border-[#641F2A]/60 transition-all duration-300 group">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono text-[#641F2A] font-bold">01</span>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#F1EBDD]/60 bg-white/[0.04] px-2 py-0.5 rounded border border-white/[0.08]">
                APPLIED AI
              </span>
            </div>
            <div className="w-9 h-9 rounded-lg bg-[#641F2A]/20 border border-[#641F2A]/40 flex items-center justify-center text-[#F1EBDD] mb-3">
              <Cpu className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-[#F1EBDD] mb-1">
              AI & Automation
            </h4>
            <p className="text-xs text-[#F1EBDD]/70 leading-relaxed mb-4">
              Neural vision, predictive pipelines, document intelligence, and operational workflow agents.
            </p>
            <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between text-[10px] font-mono text-[#F1EBDD]/50">
              <span>LATENCY &lt; 2.4MS</span>
              <span className="text-[#68704A]">OPTIMIZED</span>
            </div>
          </div>

          {/* Pillar 02: IT Solutions */}
          <div className="p-5 rounded-xl bg-[#1B1B18] border border-white/[0.08] hover:border-[#68704A]/60 transition-all duration-300 group">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono text-[#68704A] font-bold">02</span>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#F1EBDD]/60 bg-white/[0.04] px-2 py-0.5 rounded border border-white/[0.08]">
                INFRASTRUCTURE
              </span>
            </div>
            <div className="w-9 h-9 rounded-lg bg-[#68704A]/20 border border-[#68704A]/40 flex items-center justify-center text-[#F1EBDD] mb-3">
              <Server className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-[#F1EBDD] mb-1">
              IT Solutions
            </h4>
            <p className="text-xs text-[#F1EBDD]/70 leading-relaxed mb-4">
              Enterprise compute, fiber networking, zero-trust security perimeters, and 24/7 SLA governance.
            </p>
            <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between text-[10px] font-mono text-[#F1EBDD]/50">
              <span>TIER-3 ARCH</span>
              <span className="text-[#68704A]">SECURE</span>
            </div>
          </div>

          {/* Pillar 03: Digital Solutions */}
          <div className="p-5 rounded-xl bg-[#1B1B18] border border-white/[0.08] hover:border-[#641F2A]/60 transition-all duration-300 group">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono text-[#641F2A] font-bold">03</span>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#F1EBDD]/60 bg-white/[0.04] px-2 py-0.5 rounded border border-white/[0.08]">
                ENGINEERING
              </span>
            </div>
            <div className="w-9 h-9 rounded-lg bg-[#641F2A]/20 border border-[#641F2A]/40 flex items-center justify-center text-[#F1EBDD] mb-3">
              <Layers className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-[#F1EBDD] mb-1">
              Digital Solutions
            </h4>
            <p className="text-xs text-[#F1EBDD]/70 leading-relaxed mb-4">
              Scalable web architectures, enterprise ERP/CRM portals, API microservices, and client platforms.
            </p>
            <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between text-[10px] font-mono text-[#F1EBDD]/50">
              <span>NEXT.JS / TS</span>
              <span className="text-[#E8DFCF]">ENTERPRISE</span>
            </div>
          </div>

          {/* Pillar 04: Technology Products */}
          <div className="p-5 rounded-xl bg-[#1B1B18] border border-white/[0.08] hover:border-[#68704A]/60 transition-all duration-300 group">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono text-[#68704A] font-bold">04</span>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#F1EBDD]/60 bg-white/[0.04] px-2 py-0.5 rounded border border-white/[0.08]">
                CATALOGUE
              </span>
            </div>
            <div className="w-9 h-9 rounded-lg bg-[#68704A]/20 border border-[#68704A]/40 flex items-center justify-center text-[#F1EBDD] mb-3">
              <Terminal className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-[#F1EBDD] mb-1">
              Technology Products
            </h4>
            <p className="text-xs text-[#F1EBDD]/70 leading-relaxed mb-4">
              Enterprise workstations, rack servers, managed network switches, and security surveillance kits.
            </p>
            <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between text-[10px] font-mono text-[#F1EBDD]/50">
              <span>OEM VERIFIED</span>
              <span className="text-[#68704A]">SUPPORTED</span>
            </div>
          </div>
        </div>

        {/* Bottom Status & Trust Banner */}
        <div className="relative z-10 mt-8 pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F1EBDD]/60">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#68704A]" />
            <span>Architecture: Engineered for High Uptime, Data Sovereignty & Commercial ROI</span>
          </div>
          <div className="flex items-center gap-4 font-mono text-[11px] text-[#F1EBDD]/40">
            <span>NO LOCK-IN</span>
            <span>•</span>
            <span>MODULAR ARCHITECTURE</span>
            <span>•</span>
            <span>ISO ALIGNED</span>
          </div>
        </div>
      </div>
    </div>
  );
}
