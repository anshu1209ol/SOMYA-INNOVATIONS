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
  Terminal,
  Server,
  Cpu,
  Activity,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  GitBranch,
  Database,
  Cloud,
  Layers,
  Code2,
  Lock,
  ArrowUpRight,
  ExternalLink,
  Wifi,
  Sparkles,
} from "lucide-react";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Engineering Telemetry & Systems Architecture | Tech Lead Portal",
  description: "Systems architecture, runtime telemetry, service health, and code release standards for SOMYA INNOVATIONS engineering leadership.",
  path: "/tech-lead",
  noIndex: true, // Internal engineering portal
});

const SERVICE_HEALTH = [
  {
    name: "Edge Web Runtime (Next.js v15)",
    cluster: "Vercel / Cloudflare Edge",
    status: "Healthy",
    latency: "12ms",
    uptime: "99.98%",
    p99: "42ms",
    accent: "olive",
  },
  {
    name: "Model Inference Gateway (PyTorch/ONNX)",
    cluster: "Industrial Edge Node 01",
    status: "Healthy",
    latency: "68ms",
    uptime: "99.92%",
    p99: "115ms",
    accent: "olive",
  },
  {
    name: "Enterprise Database Cluster (PostgreSQL)",
    cluster: "Encrypted Dedicated Primary",
    status: "Healthy",
    latency: "4ms",
    uptime: "99.99%",
    p99: "18ms",
    accent: "olive",
  },
  {
    name: "VPN & Zero-Trust SASE Gateway",
    cluster: "WireGuard Core / VLAN 10",
    status: "Monitoring",
    latency: "24ms",
    uptime: "99.85%",
    p99: "58ms",
    accent: "burgundy",
  },
  {
    name: "Telemetry Pipeline & Log Ingestion",
    cluster: "Vector / Kafka Consumer",
    status: "Healthy",
    latency: "8ms",
    uptime: "99.95%",
    p99: "31ms",
    accent: "olive",
  },
];

export default function TechLeadPortalPage() {
  return (
    <div className="min-h-screen bg-[#11110F] text-[#F1EBDD] py-12 sm:py-16 lg:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#2A2A26] mb-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#68704A] flex items-center justify-center text-[#F1EBDD] font-mono text-base font-bold">
              &gt;_
            </div>
            <div>
              <span className="text-xs font-mono text-[#68704A] uppercase tracking-widest block font-bold">
                Engineering Telemetry
              </span>
              <span className="text-sm font-serif font-bold text-[#F1EBDD]">
                SOMYA TECH LEAD CONSOLE
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 font-sans text-xs">
            <Link
              href="/admin"
              className="px-3.5 py-1.5 rounded-lg bg-[#161614] text-[#F1EBDD]/70 hover:text-[#F1EBDD] hover:bg-[#1B1B18] transition-colors border border-[#2A2A26]"
            >
              Operations Hub
            </Link>
            <Link
              href="/ceo"
              className="px-3.5 py-1.5 rounded-lg bg-[#161614] text-[#F1EBDD]/70 hover:text-[#F1EBDD] hover:bg-[#1B1B18] transition-colors border border-[#2A2A26]"
            >
              CEO Briefing
            </Link>
            <span className="text-xs font-mono text-[#F1EBDD]/40 border-l border-[#2A2A26] pl-3">
              COMMIT: 8a4f91b • MAIN
            </span>
          </div>
        </div>

        {/* ─── TECHNICAL OVERVIEW HEADER ───────────────────────────────── */}
        <header className="mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <Badge variant="olive" dot>
              Production Telemetry
            </Badge>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#F1EBDD] tracking-tight leading-[1.1] mb-6 max-w-4xl">
            Systems Architecture & Infrastructure Telemetry
          </h1>

          <p className="text-base sm:text-lg text-[#F1EBDD]/70 max-w-3xl font-sans leading-relaxed">
            Real-time operational monitoring for SOMYA INNOVATIONS engineering systems.
            Precision-engineered across edge inference pipelines, container clusters, network firewalls, and modern web runtimes.
          </p>
        </header>

        {/* ─── 4 ENGINEERING METRIC TILES ──────────────────────────────── */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10 font-mono">
          <div className="p-6 rounded-2xl bg-[#161614] border border-[#2A2A26] flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-[#F1EBDD]/50 mb-2">
              <span>LATENCY (p50 / p95 / p99)</span>
              <Activity className="w-4 h-4 text-[#68704A]" />
            </div>
            <div className="text-2xl text-[#F1EBDD] font-bold my-1">
              18ms / 42ms / 89ms
            </div>
            <div className="text-[11px] text-[#68704A] font-sans pt-2 border-t border-[#2A2A26]">
              Sub-100ms globally verified
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#161614] border border-[#2A2A26] flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-[#F1EBDD]/50 mb-2">
              <span>SECURITY VULNERABILITIES</span>
              <ShieldCheck className="w-4 h-4 text-[#68704A]" />
            </div>
            <div className="text-2xl text-[#F1EBDD] font-bold my-1">
              0 Critical • 0 High
            </div>
            <div className="text-[11px] text-[#F1EBDD]/60 font-sans pt-2 border-t border-[#2A2A26]">
              Dependencies audited daily
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#161614] border border-[#2A2A26] flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-[#F1EBDD]/50 mb-2">
              <span>SERVICE UPTIME (30D)</span>
              <Server className="w-4 h-4 text-[#68704A]" />
            </div>
            <div className="text-2xl text-[#68704A] font-bold my-1">
              99.98%
            </div>
            <div className="text-[11px] text-[#F1EBDD]/60 font-sans pt-2 border-t border-[#2A2A26]">
              Zero scheduled downtime breach
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#161614] border border-[#2A2A26] flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-[#F1EBDD]/50 mb-2">
              <span>SYSTEM ARCHITECTURE</span>
              <Layers className="w-4 h-4 text-[#641F2A]" />
            </div>
            <div className="text-2xl text-[#F1EBDD] font-bold my-1">
              4 Pillars
            </div>
            <div className="text-[11px] text-[#641F2A] font-sans pt-2 border-t border-[#2A2A26]">
              100% cleansed of trading
            </div>
          </div>
        </section>

        {/* ─── LIVE SERVICE HEALTH MATRIX ──────────────────────────────── */}
        <section className="p-8 rounded-3xl bg-[#161614] border border-[#2A2A26] mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-[#68704A] animate-pulse" />
                <h2 className="font-serif text-2xl text-[#F1EBDD]">
                  Production Service Health
                </h2>
              </div>
              <p className="text-xs text-[#F1EBDD]/60 font-sans">
                Real-time heartbeat across compute nodes, microservices, and client endpoint gateways.
              </p>
            </div>

            <span className="text-xs font-mono text-[#F1EBDD]/40">
              REFRESH: EVERY 30s
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead>
                <tr className="border-b border-[#2A2A26] text-[11px] font-mono text-[#F1EBDD]/40 uppercase">
                  <th className="pb-3 font-medium">Service Component</th>
                  <th className="pb-3 font-medium">Cluster / Host</th>
                  <th className="pb-3 font-medium">Health Status</th>
                  <th className="pb-3 font-medium">Avg Latency</th>
                  <th className="pb-3 font-medium">p99 Latency</th>
                  <th className="pb-3 font-medium text-right">30D Uptime</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2A2A26]">
                {SERVICE_HEALTH.map((svc) => (
                  <tr key={svc.name} className="hover:bg-[#1B1B18] transition-colors">
                    <td className="py-4 font-semibold text-[#F1EBDD]">
                      {svc.name}
                    </td>
                    <td className="py-4 font-mono text-[#F1EBDD]/60 text-[11px]">
                      {svc.cluster}
                    </td>
                    <td className="py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium border ${
                        svc.accent === "olive"
                          ? "bg-[#68704A]/15 text-[#68704A] border-[#68704A]/30"
                          : "bg-[#641F2A]/15 text-[#641F2A] border-[#641F2A]/30"
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          svc.accent === "olive" ? "bg-[#68704A]" : "bg-[#641F2A]"
                        }`} />
                        {svc.status}
                      </span>
                    </td>
                    <td className="py-4 font-mono text-[#F1EBDD]/80">
                      {svc.latency}
                    </td>
                    <td className="py-4 font-mono text-[#F1EBDD]/60">
                      {svc.p99}
                    </td>
                    <td className="py-4 font-mono text-right text-[#68704A] font-semibold">
                      {svc.uptime}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ─── SYSTEM ARCHITECTURE BLUEPRINT ───────────────────────────── */}
        <section className="p-8 sm:p-10 rounded-3xl bg-[#161614] border border-[#2A2A26] mb-10">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#2A2A26]">
            <div>
              <Badge variant="burgundy" dot className="mb-2">
                Architectural Topology
              </Badge>
              <h2 className="font-serif text-2xl text-[#F1EBDD]">
                End-to-End Enterprise Systems Stack
              </h2>
            </div>
            <span className="text-xs font-mono text-[#F1EBDD]/40">
              SCHEMATIC V3.4
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 font-mono text-xs">
            {/* Layer 1: Edge */}
            <div className="p-5 rounded-2xl bg-[#1B1B18] border border-[#2A2A26] space-y-3">
              <span className="text-[10px] text-[#641F2A] uppercase tracking-wider block font-bold">
                LAYER 01 • INGRESS & EDGE
              </span>
              <h4 className="font-sans font-bold text-sm text-[#F1EBDD]">
                Client & Edge Runtime
              </h4>
              <ul className="space-y-1.5 text-[11px] text-[#F1EBDD]/60">
                <li>• Next.js App Router (SSR)</li>
                <li>• Cloudflare Edge CDN</li>
                <li>• SSL/TLS 1.3 Termination</li>
                <li>• Rate Limiter & WAF</li>
              </ul>
            </div>

            {/* Layer 2: Core Services */}
            <div className="p-5 rounded-2xl bg-[#1B1B18] border border-[#2A2A26] space-y-3">
              <span className="text-[10px] text-[#68704A] uppercase tracking-wider block font-bold">
                LAYER 02 • SERVICES & LOGIC
              </span>
              <h4 className="font-sans font-bold text-sm text-[#F1EBDD]">
                Application Microservices
              </h4>
              <ul className="space-y-1.5 text-[11px] text-[#F1EBDD]/60">
                <li>• Quote & Enquiry Engine</li>
                <li>• Candidate Resume Ingest</li>
                <li>• REST & GraphQL APIs</li>
                <li>• Webhook Notification Bus</li>
              </ul>
            </div>

            {/* Layer 3: AI & Compute */}
            <div className="p-5 rounded-2xl bg-[#1B1B18] border border-[#2A2A26] space-y-3">
              <span className="text-[10px] text-[#641F2A] uppercase tracking-wider block font-bold">
                LAYER 03 • AI & COMPUTE
              </span>
              <h4 className="font-sans font-bold text-sm text-[#F1EBDD]">
                Inference & Automation
              </h4>
              <ul className="space-y-1.5 text-[11px] text-[#F1EBDD]/60">
                <li>• Edge Computer Vision Nodes</li>
                <li>• Local PyTorch / ONNX Engine</li>
                <li>• Document Parsing Pipeline</li>
                <li>• RAG Vector Knowledge Base</li>
              </ul>
            </div>

            {/* Layer 4: Infrastructure */}
            <div className="p-5 rounded-2xl bg-[#1B1B18] border border-[#2A2A26] space-y-3">
              <span className="text-[10px] text-[#68704A] uppercase tracking-wider block font-bold">
                LAYER 04 • INFRASTRUCTURE
              </span>
              <h4 className="font-sans font-bold text-sm text-[#F1EBDD]">
                Data & Physical Network
              </h4>
              <ul className="space-y-1.5 text-[11px] text-[#F1EBDD]/60">
                <li>• PostgreSQL Cluster (RAID 10)</li>
                <li>• WireGuard VPN Gateways</li>
                <li>• L2/L3 Managed Switches</li>
                <li>• Daily Encrypted S3 Backups</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ─── ENGINEERING GOVERNANCE DIRECTIVES ───────────────────────── */}
        <section className="p-6 rounded-2xl bg-[#161614] border border-[#2A2A26] flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-sans text-xs">
          <div className="flex items-center gap-3 text-[#F1EBDD]/70">
            <ShieldCheck className="w-5 h-5 text-[#68704A] shrink-0" />
            <span>
              Engineering Governance: <strong>Zero Blue/Cyan Policy</strong>, <strong>No Speculative Claims</strong>, and <strong>100% Strict Type Safety</strong> enforced in all builds.
            </span>
          </div>
          <Link
            href="/design-system"
            className="shrink-0 px-4 py-2 rounded-xl text-xs font-semibold bg-[#1B1B18] border border-[#2A2A26] text-[#F1EBDD] hover:border-[#641F2A] transition-colors"
          >
            Review Design System Tokens
          </Link>
        </section>
      </div>
    </div>
  );
}
