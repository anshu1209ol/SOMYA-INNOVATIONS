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
  LayoutDashboard,
  Inbox,
  FileText,
  Users,
  Settings,
  Shield,
  Search,
  SlidersHorizontal,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  MoreVertical,
  Download,
  Filter,
  Layers,
  Sparkles,
  Server,
  Code2,
  HardDrive,
} from "lucide-react";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Operations Command & Admin Portal",
  description: "Internal operations, quotation pipeline, and service delivery management portal for SOMYA INNOVATIONS.",
  path: "/admin",
  noIndex: true, // Internal operational portal
});

// Sample operational lead pipeline
const RECENT_ENQUIRIES = [
  {
    id: "REQ-2025-089",
    client: "Rajasthan Enterprise Logistics",
    contact: "Vikram Singhania",
    category: "AI & Automation",
    scope: "Computer Vision Defect Inspection",
    date: "2025-03-18",
    status: "Qualified",
    priority: "High",
    budget: "₹3L+",
  },
  {
    id: "REQ-2025-088",
    client: "Mewar Industrial Corp",
    contact: "Pooja Mehta",
    category: "IT Solutions",
    scope: "Campus Network & Switch Hardening",
    date: "2025-03-17",
    status: "In Review",
    priority: "Medium",
    budget: "₹1L–₹3L",
  },
  {
    id: "REQ-2025-087",
    client: "Apex Health Diagnostics",
    contact: "Dr. K. Sharma",
    category: "Digital Solutions",
    scope: "Custom Patient Portal & API",
    date: "2025-03-16",
    status: "In Review",
    priority: "High",
    budget: "₹1L–₹3L",
  },
  {
    id: "REQ-2025-086",
    client: "AeroTech Components",
    contact: "Suresh Verma",
    category: "Technology Products",
    scope: "Enterprise Server Compute Nodes",
    date: "2025-03-15",
    status: "Pending",
    priority: "Medium",
    budget: "₹3L+",
  },
  {
    id: "REQ-2025-085",
    client: "Heritage Textile Mills",
    contact: "Arun Joshi",
    category: "AI & Automation",
    scope: "Workflow Automation & Telemetry",
    date: "2025-03-14",
    status: "Closed",
    priority: "Low",
    budget: "₹50k–₹1L",
  },
];

export default function AdminPortalPage() {
  return (
    <div className="min-h-screen bg-[#11110F] text-[#F1EBDD] flex flex-col md:flex-row">
      {/* ─── SIDEBAR NAVIGATION (WARM BLACK) ─────────────────────────── */}
      <aside className="w-full md:w-64 bg-[#161614] border-r border-[#2A2A26] flex flex-col justify-between p-5 shrink-0">
        <div>
          {/* Brand Monogram */}
          <div className="flex items-center gap-3 pb-6 border-b border-[#2A2A26] mb-6">
            <div className="w-9 h-9 rounded-lg bg-[#641F2A] flex items-center justify-center text-[#F1EBDD] font-serif text-lg font-bold">
              S
            </div>
            <div>
              <span className="text-sm font-bold tracking-tight text-[#F1EBDD] block">
                SOMYA OPS
              </span>
              <span className="text-[10px] font-mono text-[#F1EBDD]/40 uppercase tracking-widest block">
                Admin Console
              </span>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="space-y-1.5 font-sans text-xs">
            <Link
              href="/admin"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-[#641F2A] text-[#F1EBDD] font-medium"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Operations Hub</span>
            </Link>

            <a
              href="#leads"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#F1EBDD]/60 hover:text-[#F1EBDD] hover:bg-[#1B1B18] transition-colors"
            >
              <Inbox className="w-4 h-4" />
              <span>Requisitions</span>
              <span className="ml-auto px-1.5 py-0.5 rounded text-[10px] bg-[#641F2A]/20 text-[#F1EBDD] font-mono">
                4
              </span>
            </a>

            <Link
              href="/ceo"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#F1EBDD]/60 hover:text-[#F1EBDD] hover:bg-[#1B1B18] transition-colors"
            >
              <Sparkles className="w-4 h-4 text-[#641F2A]" />
              <span>CEO Strategic Brief</span>
            </Link>

            <Link
              href="/tech-lead"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#F1EBDD]/60 hover:text-[#F1EBDD] hover:bg-[#1B1B18] transition-colors"
            >
              <Server className="w-4 h-4 text-[#68704A]" />
              <span>Tech Lead Console</span>
            </Link>

            <Link
              href="/attendance"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#F1EBDD]/80 hover:text-[#F1EBDD] hover:bg-[#1B1B18] transition-colors"
            >
              <Users className="w-4 h-4 text-[#D4AF73]" />
              <span>Workforce & Attendance</span>
            </Link>

            <a
              href="#pipeline"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#F1EBDD]/60 hover:text-[#F1EBDD] hover:bg-[#1B1B18] transition-colors"
            >
              <Layers className="w-4 h-4" />
              <span>Delivery Pipeline</span>
            </a>

            <a
              href="#settings"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#F1EBDD]/60 hover:text-[#F1EBDD] hover:bg-[#1B1B18] transition-colors"
            >
              <Settings className="w-4 h-4" />
              <span>System Settings</span>
            </a>
          </nav>
        </div>

        {/* Operational Security Badge */}
        <div className="pt-6 border-t border-[#2A2A26]">
          <div className="p-3 rounded-xl bg-[#1B1B18] border border-[#2A2A26] flex items-center gap-2 text-[11px] text-[#F1EBDD]/60">
            <Shield className="w-4 h-4 text-[#68704A] shrink-0" />
            <span className="font-mono">Audit Session Active</span>
          </div>
        </div>
      </aside>

      {/* ─── MAIN CONTENT SURFACE (WARM BEIGE INTERIOR) ──────────────── */}
      <main className="flex-1 bg-[#F1EBDD] text-[#11110F] p-6 sm:p-8 lg:p-10 overflow-y-auto">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-[#E8DFCF] mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="burgundy" size="sm">
                Internal Operational Portal
              </Badge>
              <span className="text-xs font-mono text-[#11110F]/50">
                PORTAL-ID: OPS-ADM-01
              </span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#11110F] tracking-tight">
              Operations & Requisition Control
            </h1>
            <p className="text-xs sm:text-sm text-[#11110F]/70 font-sans mt-0.5">
              Live tracking for commercial inquiries, service scope qualification, and technical delivery.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-[#E8DFCF] text-[#11110F] hover:bg-[#11110F] hover:text-[#F1EBDD] transition-colors font-sans border border-[#D5CABB]">
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
            <Link
              href="/request-quote"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-[#641F2A] text-[#F1EBDD] hover:bg-[#641F2A]/90 transition-colors font-sans shadow-sm"
            >
              <span>+ New Requisition</span>
            </Link>
          </div>
        </div>

        {/* ─── 4 OPERATIONAL KPI TILES ───────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            {
              label: "Active Inquiries",
              value: "14",
              change: "+3 this week",
              sub: "Awaiting technical review",
              accent: "burgundy",
            },
            {
              label: "Qualified Pipeline",
              value: "₹18.4L",
              change: "8 engagements",
              sub: "Scoped across 4 pillars",
              accent: "olive",
            },
            {
              label: "Active Deliveries",
              value: "6",
              change: "On schedule",
              sub: "AI, IT & Digital tracks",
              accent: "burgundy",
            },
            {
              label: "Delivery SLA",
              value: "99.4%",
              change: "Zero critical breach",
              sub: "Infrastructure & uptime",
              accent: "olive",
            },
          ].map((kpi, idx) => {
            const isBurgundy = kpi.accent === "burgundy";
            return (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#E8DFCF] border border-[#D5CABB] flex flex-col justify-between"
              >
                <div className="flex items-center justify-between text-xs text-[#11110F]/60 font-mono mb-2">
                  <span>{kpi.label}</span>
                  <span className={`w-2 h-2 rounded-full ${isBurgundy ? "bg-[#641F2A]" : "bg-[#68704A]"}`} />
                </div>
                <div className="font-serif text-3xl text-[#11110F] my-1">
                  {kpi.value}
                </div>
                <div className="text-[11px] font-sans text-[#11110F]/70 flex items-center justify-between pt-2 border-t border-[#D5CABB]">
                  <span className={`font-semibold ${isBurgundy ? "text-[#641F2A]" : "text-[#68704A]"}`}>
                    {kpi.change}
                  </span>
                  <span className="text-[#11110F]/50">{kpi.sub}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ─── WORKFORCE ATTENDANCE MODULE CALLOUT ──────────────────────── */}
        <div className="p-6 rounded-2xl bg-[#11110F] text-[#F1EBDD] border border-[#2A2A26] shadow-md mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#641F2A]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#641F2A]/30 border border-[#641F2A]/50 flex items-center justify-center text-[#F1EBDD] shrink-0">
              <Users className="w-6 h-6 text-[#D4AF73]" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono uppercase tracking-wider text-[#D4AF73]">Active Subsystem</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#68704A] animate-pulse" />
              </div>
              <h3 className="text-lg font-bold tracking-tight text-[#F1EBDD]">Workforce & Biometric Shift Attendance Portal</h3>
              <p className="text-xs text-[#C8C2B3]/70 mt-1 max-w-xl">
                Real-time shift clock-in registers, automated telemetry metrics, and leave request approval queues for enterprise workforce governance.
              </p>
            </div>
          </div>
          <Link
            href="/attendance"
            className="px-5 py-3 rounded-xl text-xs font-semibold bg-[#641F2A] hover:bg-[#7D2836] text-[#F1EBDD] shadow-[0_4px_16px_rgba(100,31,42,0.4)] transition-all flex items-center gap-2 shrink-0 self-start md:self-auto"
          >
            <span>Launch Attendance Portal</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* ─── REQUISITION INBOX & PIPELINE TABLE ─────────────────────── */}
        <section id="leads" className="bg-[#E8DFCF] rounded-2xl border border-[#D5CABB] p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="font-serif text-xl sm:text-2xl text-[#11110F]">
                Recent Client Requisitions
              </h2>
              <p className="text-xs text-[#11110F]/60 font-sans mt-0.5">
                Prospective engagements submitted via public portals and direct partner channels.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-[#11110F]/40 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter inquiries..."
                  className="pl-8 pr-3 py-1.5 rounded-lg text-xs bg-[#F1EBDD] border border-[#D5CABB] text-[#11110F] placeholder-[#11110F]/40 focus:outline-none focus:border-[#641F2A] font-sans"
                />
              </div>
              <button className="p-2 rounded-lg bg-[#F1EBDD] border border-[#D5CABB] text-[#11110F]/60 hover:text-[#11110F]">
                <Filter className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead>
                <tr className="border-b border-[#D5CABB] text-[11px] font-mono text-[#11110F]/50 uppercase">
                  <th className="pb-3 font-medium">Requisition ID</th>
                  <th className="pb-3 font-medium">Client / Org</th>
                  <th className="pb-3 font-medium">Pillar Category</th>
                  <th className="pb-3 font-medium">Scope Summary</th>
                  <th className="pb-3 font-medium">Est. Budget</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D5CABB]">
                {RECENT_ENQUIRIES.map((req) => {
                  let statusBadgeClass = "bg-[#641F2A]/10 text-[#641F2A] border-[#641F2A]/30";
                  if (req.status === "Qualified") {
                    statusBadgeClass = "bg-[#68704A]/15 text-[#68704A] border-[#68704A]/30";
                  } else if (req.status === "In Review") {
                    statusBadgeClass = "bg-[#11110F]/10 text-[#11110F] border-[#11110F]/20";
                  } else if (req.status === "Closed") {
                    statusBadgeClass = "bg-[#D5CABB] text-[#11110F]/60 border-[#D5CABB]";
                  }

                  return (
                    <tr key={req.id} className="hover:bg-[#F1EBDD]/50 transition-colors">
                      <td className="py-3.5 font-mono text-[#11110F]/70 font-semibold">
                        {req.id}
                      </td>
                      <td className="py-3.5">
                        <span className="font-semibold text-[#11110F] block">
                          {req.client}
                        </span>
                        <span className="text-[11px] text-[#11110F]/50">
                          {req.contact}
                        </span>
                      </td>
                      <td className="py-3.5">
                        <span className="font-medium text-[#11110F]/80">
                          {req.category}
                        </span>
                      </td>
                      <td className="py-3.5 text-[#11110F]/70">
                        {req.scope}
                      </td>
                      <td className="py-3.5 font-mono text-[#11110F]/80">
                        {req.budget}
                      </td>
                      <td className="py-3.5">
                        <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold border ${statusBadgeClass}`}>
                          {req.status}
                        </span>
                      </td>
                      <td className="py-3.5 text-right">
                        <button className="p-1 text-[#11110F]/50 hover:text-[#11110F] rounded">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* ─── 4 PILLAR ACTIVE WORKSTREAMS ───────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-[#E8DFCF] border border-[#D5CABB]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif text-lg text-[#11110F]">
                Active Technical Engagements
              </h3>
              <span className="text-xs font-mono text-[#68704A] font-semibold">
                6 In-Flight
              </span>
            </div>
            <div className="space-y-3 font-sans text-xs">
              <div className="p-3 rounded-xl bg-[#F1EBDD] border border-[#D5CABB] flex items-center justify-between">
                <div>
                  <span className="font-semibold text-[#11110F] block">
                    Defect Vision Model Deployment
                  </span>
                  <span className="text-[11px] text-[#11110F]/60">
                    Phase 3: Validation Testing on Edge Nodes
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#68704A]/15 text-[#68704A] font-semibold">
                  85%
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#F1EBDD] border border-[#D5CABB] flex items-center justify-between">
                <div>
                  <span className="font-semibold text-[#11110F] block">
                    Campus Fiber & L3 Core Switch Staging
                  </span>
                  <span className="text-[11px] text-[#11110F]/60">
                    Phase 2: VLAN Segmentation & Firewall Hardening
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#641F2A]/15 text-[#641F2A] font-semibold">
                  45%
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#F1EBDD] border border-[#D5CABB] flex items-center justify-between">
                <div>
                  <span className="font-semibold text-[#11110F] block">
                    Executive Analytics Cockpit Engine
                  </span>
                  <span className="text-[11px] text-[#11110F]/60">
                    Phase 4: Client UAT & Verification Sign-off
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#68704A]/15 text-[#68704A] font-semibold">
                  92%
                </span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#E8DFCF] border border-[#D5CABB] flex flex-col justify-between">
            <div>
              <h3 className="font-serif text-lg text-[#11110F] mb-1">
                Operational Compliance & Health
              </h3>
              <p className="text-xs text-[#11110F]/60 font-sans mb-4">
                Internal checks verified against high-integrity business delivery standards.
              </p>
              <div className="space-y-2.5 font-sans text-xs">
                <div className="flex items-center gap-2 text-[#11110F]/80">
                  <CheckCircle2 className="w-4 h-4 text-[#68704A] shrink-0" />
                  <span>Trading references completely eliminated across public routes</span>
                </div>
                <div className="flex items-center gap-2 text-[#11110F]/80">
                  <CheckCircle2 className="w-4 h-4 text-[#68704A] shrink-0" />
                  <span>Four-pillar architectural taxonomy deployed globally</span>
                </div>
                <div className="flex items-center gap-2 text-[#11110F]/80">
                  <CheckCircle2 className="w-4 h-4 text-[#68704A] shrink-0" />
                  <span>Quote intake forms validated with server-ready API architecture</span>
                </div>
                <div className="flex items-center gap-2 text-[#11110F]/80">
                  <CheckCircle2 className="w-4 h-4 text-[#68704A] shrink-0" />
                  <span>Strict zero blue/cyan palette enforcement verified</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#D5CABB] mt-4 flex items-center justify-between text-xs font-mono text-[#11110F]/50">
              <span>Audited: Today, 11:45 AM</span>
              <span className="text-[#68704A] font-semibold">System Optimal</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
