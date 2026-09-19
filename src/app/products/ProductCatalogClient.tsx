"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  ArrowRight,
  Sparkles,
  LayoutDashboard,
  Workflow,
  BarChart3,
  ShieldCheck,
  Terminal,
  CheckCircle,
  X,
  SlidersHorizontal,
  Info,
} from "lucide-react";
import { type Product, type ProductCategory, PRODUCT_CATEGORIES } from "@/lib/products";
import { Badge } from "@/components/ui";

interface ProductCatalogClientProps {
  initialProducts: Product[];
}

function CategoryIcon({
  category,
  className,
}: {
  category: ProductCategory;
  className?: string;
}) {
  switch (category) {
    case "AI Solutions":
      return <Sparkles className={className} />;
    case "SaaS Dashboards":
      return <LayoutDashboard className={className} />;
    case "Enterprise Automation":
      return <Workflow className={className} />;
    case "Analytics & Intelligence":
      return <BarChart3 className={className} />;
    case "Security & Governance":
      return <ShieldCheck className={className} />;
    case "Developer Platforms":
      return <Terminal className={className} />;
    default:
      return <Sparkles className={className} />;
  }
}

export function ProductCatalogClient({ initialProducts }: ProductCatalogClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredProducts = useMemo(() => {
    return initialProducts.filter((product) => {
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;

      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesCategory;

      const matchesSearch =
        product.name.toLowerCase().includes(query) ||
        product.shortDescription.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.sku.toLowerCase().includes(query) ||
        Object.values(product.specs).some((spec) =>
          spec.toLowerCase().includes(query)
        );

      return matchesCategory && matchesSearch;
    });
  }, [initialProducts, selectedCategory, searchQuery]);

  return (
    <div>
      {/* ─── Enterprise Software & AI Notice ────────────────────────── */}
      <div className="mb-10 p-5 rounded-2xl bg-[#1B1B18] border border-white/[0.08] flex items-start gap-4">
        <Info className="w-5 h-5 text-[#68704A] mt-0.5 shrink-0" />
        <div className="text-xs text-[#F1EBDD]/70 leading-relaxed">
          <span className="font-bold text-[#F1EBDD] block mb-1">
            Enterprise Software & AI Products Notice
          </span>
          The platforms listed below represent modular SaaS products, proprietary AI models, and operational dashboards developed by SOMYA INNOVATIONS.
          Each solution is engineered for high availability, zero-trust security, and custom enterprise integration.
          Click <span className="text-[#F1EBDD] font-bold">&quot;Request Quote&quot;</span> or view any product to receive an itemized deployment proposal tailored to your technical requirements.
        </div>
      </div>

      {/* ─── Search & Filtering Controls ─────────────────────────────── */}
      <div className="space-y-6 mb-12">
        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto">
          <label htmlFor="product-search-input" className="sr-only">
            Search software and AI products
          </label>
          <Search className="w-5 h-5 text-[#F1EBDD]/40 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true" />
          <input
            id="product-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search software by name, category, capability, or tech stack (e.g. Copilot, RAG, Telemetry, Gateway)..."
            aria-label="Search software by name, category, capability, or tech stack"
            className="w-full pl-12 pr-10 py-3.5 rounded-xl bg-[#1B1B18] border border-white/[0.1] text-sm text-[#F1EBDD] placeholder-[#F1EBDD]/40 focus:outline-none focus:border-[#641F2A] focus:ring-1 focus:ring-[#641F2A] transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              aria-label="Clear search input"
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#F1EBDD]/50 hover:text-white p-1 focus-visible:outline-2 focus-visible:outline-[#641F2A] rounded-md"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          )}
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2" role="group" aria-label="Filter products by category">
          <button
            onClick={() => setSelectedCategory("All")}
            aria-pressed={selectedCategory === "All"}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center gap-2 border ${
              selectedCategory === "All"
                ? "bg-[#641F2A] text-[#F1EBDD] border-[#641F2A] shadow-md"
                : "bg-[#1B1B18] text-[#F1EBDD]/60 border-white/[0.08] hover:text-[#F1EBDD] hover:border-white/[0.16]"
            }`}
          >
            <span>All Products</span>
            <span
              className={`px-1.5 py-0.5 rounded text-[10px] ${
                selectedCategory === "All"
                  ? "bg-white/20 text-[#F1EBDD]"
                  : "bg-white/[0.06] text-[#F1EBDD]/50"
              }`}
            >
              {initialProducts.length}
            </span>
          </button>

          {PRODUCT_CATEGORIES.map((cat) => {
            const count = initialProducts.filter((p) => p.category === cat).length;
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                aria-pressed={isSelected}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center gap-2 border ${
                  isSelected
                    ? "bg-[#641F2A] text-[#F1EBDD] border-[#641F2A] shadow-md"
                    : "bg-[#1B1B18] text-[#F1EBDD]/60 border-white/[0.08] hover:text-[#F1EBDD] hover:border-white/[0.16]"
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`px-1.5 py-0.5 rounded text-[10px] ${
                    isSelected
                      ? "bg-white/20 text-[#F1EBDD]"
                      : "bg-white/[0.06] text-[#F1EBDD]/50"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── Search Results Count & Active Filter Indicator ──────────── */}
      <div className="flex items-center justify-between text-xs text-[#F1EBDD]/60 mb-6 px-1" role="status" aria-live="polite">
        <div className="flex items-center gap-2 font-mono">
          <SlidersHorizontal className="w-3.5 h-3.5 text-[#68704A]" aria-hidden="true" />
          <span>
            Showing <strong className="text-[#F1EBDD]">{filteredProducts.length}</strong> items
            {selectedCategory !== "All" && ` in ${selectedCategory}`}
            {searchQuery && ` matching "${searchQuery}"`}
          </span>
        </div>
        {(selectedCategory !== "All" || searchQuery) && (
          <button
            onClick={() => {
              setSelectedCategory("All");
              setSearchQuery("");
            }}
            className="text-xs text-[#E8DFCF] hover:text-white underline underline-offset-2 font-mono"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* ─── Product Grid ────────────────────────────────────────────── */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => {
            return (
              <div
                key={product.id}
                className="group relative flex flex-col justify-between p-6 rounded-2xl bg-[#1B1B18] border border-white/[0.08] hover:border-[#641F2A]/50 transition-all duration-300 hover-elevate shadow-sm"
              >
                <div>
                  {/* Product Visual Container */}
                  <div className="relative h-44 rounded-xl bg-[#11110F] border border-white/[0.06] p-6 flex flex-col justify-between overflow-hidden mb-5 group-hover:border-white/[0.12] transition-colors">
                    {/* Top Row: Category Badge & SKU */}
                    <div className="flex items-center justify-between relative z-10">
                      <Badge variant="olive" size="sm">
                        {product.category}
                      </Badge>
                      <span className="text-[10px] font-mono text-[#F1EBDD]/50 bg-white/[0.04] px-2 py-0.5 rounded border border-white/[0.08]">
                        {product.sku}
                      </span>
                    </div>

                    {/* Center Icon Visual */}
                    <div className="flex items-center justify-center my-auto relative z-10">
                      <div className="w-16 h-16 rounded-2xl bg-[#641F2A]/15 border border-[#641F2A]/30 flex items-center justify-center text-[#F1EBDD] group-hover:scale-110 transition-all duration-300">
                        <CategoryIcon category={product.category} className="w-8 h-8" />
                      </div>
                    </div>

                    {/* Bottom Row: Availability Status */}
                    <div className="flex items-center justify-between text-[11px] text-[#F1EBDD]/60 relative z-10 pt-2 border-t border-white/[0.04] font-mono">
                      <span className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#68704A] animate-pulse" aria-hidden="true" />
                        {product.availability}
                      </span>
                      {product.badge && (
                        <span className="text-[10px] font-mono text-[#E8DFCF]">
                          {product.badge}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Product Details Header */}
                  <h3 className="text-lg font-bold text-[#F1EBDD] tracking-tight mb-2 group-hover:text-[#E8DFCF] transition-colors">
                    <Link href={`/products/${product.slug}`} className="hover:underline">
                      {product.name}
                    </Link>
                  </h3>

                  <p className="text-xs text-[#F1EBDD]/70 leading-relaxed mb-4 line-clamp-2">
                    {product.shortDescription}
                  </p>

                  {/* Feature Highlights Checklist */}
                  <ul className="space-y-1.5 mb-6 border-t border-white/[0.06] pt-4">
                    {product.features.slice(0, 3).map((feat) => (
                      <li key={feat} className="flex items-start gap-2 text-xs text-[#F1EBDD]/80">
                        <CheckCircle className="w-3.5 h-3.5 text-[#68704A] shrink-0 mt-0.5" aria-hidden="true" />
                        <span className="line-clamp-1">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Action Buttons (No Fabricated Pricing) */}
                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between gap-3">
                  <Link
                    href={`/products/${product.slug}`}
                    aria-label={`View full technical specifications for ${product.name}`}
                    className="text-xs font-mono uppercase tracking-wider text-[#F1EBDD]/60 hover:text-[#F1EBDD] transition-colors"
                  >
                    View Specs
                  </Link>
                  <Link
                    href={`/request-quote?product=${encodeURIComponent(product.name)}`}
                    aria-label={`Get latest price and quotation for ${product.name}`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-[#F1EBDD] bg-[#641F2A] hover:bg-[#45151D] transition-all shadow-sm"
                  >
                    <span>Get Latest Price</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="py-20 text-center rounded-3xl bg-[#1B1B18] border border-white/[0.08] p-8 max-w-lg mx-auto">
          <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[#F1EBDD]/50 mx-auto mb-4">
            <Search className="w-5 h-5" />
          </div>
          <h4 className="text-base font-bold text-[#F1EBDD] mb-1">
            No equipment matching your criteria
          </h4>
          <p className="text-xs text-[#F1EBDD]/60 mb-6">
            We couldn&apos;t find any items matching &quot;{searchQuery}&quot;. Try adjusting your search query or reset your filters.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("All");
              setSearchQuery("");
            }}
            className="px-4 py-2 rounded-lg text-xs font-semibold text-[#F1EBDD] border border-white/20 hover:bg-white/10 transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
}
