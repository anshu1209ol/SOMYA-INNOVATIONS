"use client";

import React from "react";
import Link from "next/link";
import { Badge, Breadcrumbs } from "@/components/ui";
import {
  ShieldAlert,
  FileText,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  ExternalLink,
  Printer,
} from "lucide-react";

export interface LegalSection {
  id: string;
  title: string;
  content: React.ReactNode;
}

export interface LegalPageLayoutProps {
  title: string;
  documentType: string;
  lastUpdatedPlaceholder?: string;
  sections: LegalSection[];
  activeRoute: "/privacy-policy" | "/terms" | "/refund-policy" | "/cookie-policy";
}

const LEGAL_NAV = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Refund Policy", href: "/refund-policy" },
  { label: "Cookie Policy", href: "/cookie-policy" },
];

export function LegalPageLayout({
  title,
  documentType,
  lastUpdatedPlaceholder = "[DATE — TO BE FINALIZED PRIOR TO PRODUCTION]",
  sections,
  activeRoute,
}: LegalPageLayoutProps) {
  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="py-12 sm:py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs
          items={[
            { label: "Legal", href: "/terms" },
            { label: title },
          ]}
        />

        {/* ─── HEADER SECTION ────────────────────────────────────────── */}
        <div className="pt-6 pb-12 border-b border-white/[0.08]">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <Badge variant="accent" dot>
              {documentType}
            </Badge>
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
              <Clock className="w-3.5 h-3.5 text-indigo-400" />
              <span>Last Updated: {lastUpdatedPlaceholder}</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
            {title}
          </h1>

          <p className="text-sm sm:text-base text-zinc-400 max-w-3xl leading-relaxed">
            Standard legal and operating framework for SOMYA INNOVATIONS. All terms and policies are subject to review and finalization by qualified legal counsel prior to formal execution.
          </p>

          {/* ─── MANDATORY REVIEW ADVISORY BANNER ─────────────────────── */}
          <div className="mt-8 p-4 sm:p-5 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-start gap-3.5 text-xs text-amber-200/90 leading-relaxed">
            <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-amber-200 block font-semibold mb-1">
                Legal Review & Customization Notice
              </strong>
              <span>
                This document is a structural draft template. Text displayed in brackets (e.g.{" "}
                <code className="bg-amber-400/15 px-1 py-0.5 rounded text-amber-300 font-mono">
                  [COMPANY LEGAL NAME]
                </code>
                ,{" "}
                <code className="bg-amber-400/15 px-1 py-0.5 rounded text-amber-300 font-mono">
                  [CONTACT EMAIL]
                </code>
                ,{" "}
                <code className="bg-amber-400/15 px-1 py-0.5 rounded text-amber-300 font-mono">
                  [GOVERNING JURISDICTION]
                </code>
                ) represents placeholders requiring explicit commercial, corporate, and jurisdictional finalization before production use.
              </span>
            </div>
          </div>
        </div>

        {/* ─── TWO-COLUMN CONTENT GRID ───────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 pt-12 items-start">
          {/* Sidebar: Table of Contents & Legal Navigation (4 cols) */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
            {/* Table of Contents */}
            <div className="p-6 rounded-3xl bg-zinc-900/50 border border-white/[0.08] backdrop-blur-md">
              <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-white/[0.06]">
                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-300 flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5 text-indigo-400" />
                  Table of Contents
                </span>
                <button
                  type="button"
                  onClick={handlePrint}
                  className="text-[11px] font-mono text-zinc-500 hover:text-white flex items-center gap-1 transition-colors"
                  title="Print this policy"
                >
                  <Printer className="w-3 h-3" />
                  <span>Print</span>
                </button>
              </div>

              <nav className="space-y-1 max-h-[50vh] overflow-y-auto pr-2 text-xs">
                {sections.map((section, idx) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="flex items-baseline gap-2 py-1.5 px-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.04] transition-colors"
                  >
                    <span className="font-mono text-[10px] text-zinc-600 shrink-0">
                      {(idx + 1).toString().padStart(2, "0")}.
                    </span>
                    <span className="truncate">{section.title}</span>
                  </a>
                ))}
              </nav>
            </div>

            {/* Related Legal Policies */}
            <div className="p-6 rounded-3xl bg-zinc-900/30 border border-white/[0.06]">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block mb-3">
                Legal Documents
              </span>
              <ul className="space-y-2 text-xs">
                {LEGAL_NAV.map((link) => {
                  const isActive = link.href === activeRoute;
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={`flex items-center justify-between p-2 rounded-xl transition-all ${
                          isActive
                            ? "bg-indigo-500/10 text-indigo-300 font-semibold border border-indigo-500/20"
                            : "text-zinc-400 hover:text-white hover:bg-white/[0.02]"
                        }`}
                      >
                        <span>{link.label}</span>
                        {isActive ? (
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                        ) : (
                          <ArrowRight className="w-3 h-3 text-zinc-600" />
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>

          {/* Main Legal Sections Area (8 cols) */}
          <main className="lg:col-span-8 space-y-12">
            {sections.map((section, idx) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-28 p-6 sm:p-8 rounded-3xl bg-zinc-900/40 border border-white/[0.08] hover:border-white/[0.12] transition-colors"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-mono font-bold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-0.5 rounded-md">
                    {(idx + 1).toString().padStart(2, "0")}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {section.title}
                  </h2>
                </div>

                <div className="text-xs sm:text-sm text-zinc-300 leading-relaxed space-y-4">
                  {section.content}
                </div>
              </section>
            ))}

            {/* ─── OFFICIAL LEGAL CONTACT PLACEHOLDER ──────────────────── */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-950 to-indigo-950/40 border border-white/[0.1] space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant="accent" size="sm">
                  Contact Information Placeholder
                </Badge>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                Inquiries Regarding This Document
              </h3>

              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                For formal communications, data rights inquiries, or legal clarifications regarding this policy, please address correspondence to our designated legal representatives:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 font-mono text-xs">
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1">
                  <span className="text-zinc-500 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-indigo-400" />
                    Legal / Grievance Email:
                  </span>
                  <span className="text-zinc-200 font-semibold block">
                    [YOUR LEGAL EMAIL / GRIEVANCE CONTACT]
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1">
                  <span className="text-zinc-500 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                    Registered Legal Entity:
                  </span>
                  <span className="text-zinc-200 font-semibold block">
                    [COMPANY LEGAL NAME] &mdash; [YOUR CITY, JURISDICTION]
                  </span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-[11px] text-zinc-500 font-mono border-t border-white/[0.06]">
                <span>Document Reference: SOMYA-LEGAL-{documentType.toUpperCase().replace(/\s+/g, "-")}</span>
                <Link href="/contact" className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
                  <span>General Contact</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
