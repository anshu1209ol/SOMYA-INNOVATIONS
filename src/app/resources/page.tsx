import React from "react";
import type { Metadata } from "next";
import {
  Badge,
  Text,
  Breadcrumbs,
} from "@/components/ui";
import { getResources } from "@/lib/resources";
import { ResourcesCatalogClient } from "./ResourcesCatalogClient";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Resources & Technical Insights | IT, AI & Cloud Engineering",
  description:
    "Explore engineering frameworks, IT infrastructure guides, cybersecurity best practices, and pragmatic AI automation breakdowns by SOMYA INNOVATIONS.",
  path: "/resources",
});

export default async function ResourcesPage() {
  const articles = await getResources();

  return (
    <div className="bg-[#11110F] text-[#F1EBDD] min-h-screen py-12 sm:py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs items={[{ label: "Resources" }]} />

        {/* ─── HERO SECTION ────────────────────────────────────────────── */}
        <div className="relative pt-8 pb-14 text-center">
          <div className="inline-flex items-center gap-2 mb-6">
            <Badge variant="burgundy" dot>
              Knowledge Hub & Technical Articles
            </Badge>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#F1EBDD] tracking-tight max-w-4xl mx-auto mb-6 leading-tight">
            Engineering Insights & Technology Briefings
          </h1>

          <p className="text-base sm:text-lg text-[#F1EBDD]/70 max-w-3xl mx-auto mb-8 leading-relaxed font-sans">
            Pragmatic perspectives on enterprise IT infrastructure, applied AI automation, cloud architectures,
            and enterprise hardware engineering standards. Free of marketing hype and speculation.
          </p>
        </div>

        {/* ─── INTERACTIVE CLIENT CATALOG (SEARCH + CATEGORIES + ARTICLES) ─ */}
        <ResourcesCatalogClient initialArticles={articles} />
      </div>
    </div>
  );
}
