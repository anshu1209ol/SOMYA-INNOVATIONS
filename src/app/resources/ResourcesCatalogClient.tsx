"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  ArrowRight,
  Clock,
  Calendar,
  User,
  SlidersHorizontal,
  X,
  Mail,
  CheckCircle,
  BookOpen,
  Sparkles,
} from "lucide-react";
import { type Article, type ResourceCategory, RESOURCE_CATEGORIES } from "@/lib/resources";
import { Badge } from "@/components/ui";

interface ResourcesCatalogClientProps {
  initialArticles: Article[];
}

function getCategoryBadgeVariant(category: ResourceCategory): "burgundy" | "olive" | "default" {
  switch (category) {
    case "AI":
    case "Digital Transformation":
      return "burgundy";
    case "IT":
    case "Technology Products":
    case "Technology":
      return "olive";
    default:
      return "default";
  }
}

export function ResourcesCatalogClient({ initialArticles }: ResourcesCatalogClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [newsletterEmail, setNewsletterEmail] = useState<string>("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState<boolean>(false);

  // Filter articles by category and search
  const filteredArticles = useMemo(() => {
    return initialArticles.filter((article) => {
      const matchesCategory =
        selectedCategory === "All" || article.category === selectedCategory;

      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesCategory;

      const matchesSearch =
        article.title.toLowerCase().includes(query) ||
        article.excerpt.toLowerCase().includes(query) ||
        article.category.toLowerCase().includes(query) ||
        article.tags.some((tag) => tag.toLowerCase().includes(query)) ||
        article.author.name.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [initialArticles, selectedCategory, searchQuery]);

  // Featured article is the top featured one when viewing "All" and without search
  const featuredArticle = useMemo(() => {
    if (selectedCategory === "All" && !searchQuery) {
      return initialArticles.find((a) => a.featured) || null;
    }
    return null;
  }, [initialArticles, selectedCategory, searchQuery]);

  // Remaining articles excluding the featured one if it's shown at top
  const displayArticles = useMemo(() => {
    if (featuredArticle) {
      return filteredArticles.filter((a) => a.id !== featuredArticle.id);
    }
    return filteredArticles;
  }, [filteredArticles, featuredArticle]);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSubscribed(true);
      setNewsletterEmail("");
    }
  };

  return (
    <div className="text-[#F1EBDD]">
      {/* ─── Search & Category Filtering Bar ─────────────────────────── */}
      <div className="space-y-6 mb-12">
        {/* Search Input */}
        <div className="relative max-w-2xl mx-auto">
          <Search className="w-5 h-5 text-[#F1EBDD]/40 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles by topic, technology, keyword, or author..."
            className="w-full pl-12 pr-10 py-3.5 rounded-xl bg-[#161614] border border-[#2A2A26] text-sm text-[#F1EBDD] placeholder-[#F1EBDD]/40 focus:outline-none focus:border-[#641F2A] focus:ring-1 focus:ring-[#641F2A] transition-all font-sans"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              aria-label="Clear search"
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#F1EBDD]/40 hover:text-[#F1EBDD] p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          <button
            onClick={() => setSelectedCategory("All")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center gap-2 border font-sans ${
              selectedCategory === "All"
                ? "bg-[#641F2A] text-[#F1EBDD] border-[#641F2A]"
                : "bg-[#161614] text-[#F1EBDD]/60 border-[#2A2A26] hover:text-[#F1EBDD] hover:border-[#641F2A]/40"
            }`}
          >
            <span>All Categories</span>
            <span
              className={`px-1.5 py-0.2 rounded text-[10px] ${
                selectedCategory === "All"
                  ? "bg-white/20 text-white"
                  : "bg-white/[0.06] text-[#F1EBDD]/50"
              }`}
            >
              {initialArticles.length}
            </span>
          </button>

          {RESOURCE_CATEGORIES.map((cat) => {
            const count = initialArticles.filter((a) => a.category === cat).length;
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center gap-2 border font-sans ${
                  isSelected
                    ? "bg-[#641F2A] text-[#F1EBDD] border-[#641F2A]"
                    : "bg-[#161614] text-[#F1EBDD]/60 border-[#2A2A26] hover:text-[#F1EBDD] hover:border-[#641F2A]/40"
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`px-1.5 py-0.2 rounded text-[10px] ${
                    isSelected
                      ? "bg-white/20 text-white"
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

      {/* ─── FEATURED ARTICLE SPOTLIGHT (WHEN BROWSING ALL) ─────────── */}
      {featuredArticle && (
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-[#641F2A]" />
            <span className="text-xs font-mono text-[#641F2A] font-semibold uppercase tracking-wider">
              Featured Insight
            </span>
          </div>

          <div className="p-8 sm:p-12 rounded-3xl bg-[#161614] border border-[#2A2A26] shadow-2xl relative overflow-hidden group hover:border-[#641F2A]/40 transition-all duration-300">
            <div className="relative z-10 max-w-4xl space-y-5">
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant={getCategoryBadgeVariant(featuredArticle.category)}>
                  {featuredArticle.category}
                </Badge>
                <span className="text-xs text-[#F1EBDD]/60 flex items-center gap-1.5 font-sans">
                  <Clock className="w-3.5 h-3.5 text-[#F1EBDD]/40" />
                  {featuredArticle.readTime}
                </span>
                <span className="text-[#F1EBDD]/20">•</span>
                <span className="text-xs text-[#F1EBDD]/60 flex items-center gap-1.5 font-sans">
                  <Calendar className="w-3.5 h-3.5 text-[#F1EBDD]/40" />
                  {featuredArticle.publishedAt}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#F1EBDD] tracking-tight group-hover:text-[#E8DFCF] transition-colors">
                <Link href={`/resources/${featuredArticle.slug}`}>
                  {featuredArticle.title}
                </Link>
              </h2>

              <p className="text-sm sm:text-base text-[#F1EBDD]/70 leading-relaxed max-w-3xl font-sans">
                {featuredArticle.excerpt}
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-[#2A2A26]">
                <div className="flex items-center gap-3 text-xs text-[#F1EBDD]/60 font-sans">
                  <div className="w-8 h-8 rounded-full bg-[#1B1B18] border border-[#2A2A26] flex items-center justify-center text-[#F1EBDD]">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-[#F1EBDD] block">
                      {featuredArticle.author.name}
                    </span>
                    <span className="text-[11px] text-[#F1EBDD]/40">
                      {featuredArticle.author.role}
                    </span>
                  </div>
                </div>

                <Link
                  href={`/resources/${featuredArticle.slug}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-[#F1EBDD] bg-[#641F2A] hover:bg-[#641F2A]/90 transition-all font-sans"
                >
                  <span>Read Full Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── SEARCH SUMMARY & ACTIVE FILTERS ─────────────────────────── */}
      <div className="flex items-center justify-between text-xs text-[#F1EBDD]/60 mb-6 px-1 font-sans">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-3.5 h-3.5 text-[#641F2A]" />
          <span>
            Showing <strong className="text-[#F1EBDD]">{filteredArticles.length}</strong> articles
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
            className="text-xs text-[#641F2A] hover:text-[#E8DFCF] underline underline-offset-2"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* ─── ARTICLES GRID ───────────────────────────────────────────── */}
      {displayArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {displayArticles.map((article) => {
            const badgeVariant = getCategoryBadgeVariant(article.category);
            return (
              <article
                key={article.id}
                className="p-7 rounded-2xl bg-[#161614] border border-[#2A2A26] hover:border-[#641F2A]/40 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <Badge variant={badgeVariant} size="sm">
                      {article.category}
                    </Badge>
                    <span className="text-[11px] text-[#F1EBDD]/40 flex items-center gap-1 font-sans">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </span>
                  </div>

                  <h3 className="text-lg font-serif text-[#F1EBDD] tracking-tight mb-3 group-hover:text-[#E8DFCF] transition-colors">
                    <Link href={`/resources/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h3>

                  <p className="text-xs text-[#F1EBDD]/60 leading-relaxed mb-6 line-clamp-3 font-sans">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#2A2A26] flex items-center justify-between font-sans">
                  <div className="text-[11px] text-[#F1EBDD]/60">
                    <span className="text-[#F1EBDD] font-medium block">
                      {article.author.name}
                    </span>
                    <span className="text-[#F1EBDD]/40 text-[10px]">
                      {article.publishedAt}
                    </span>
                  </div>

                  <Link
                    href={`/resources/${article.slug}`}
                    className="text-xs font-semibold text-[#641F2A] hover:text-[#E8DFCF] inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>Read</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="py-20 text-center rounded-2xl bg-[#161614] border border-[#2A2A26] p-8 max-w-lg mx-auto mb-20 font-sans">
          <div className="w-12 h-12 rounded-xl bg-[#1B1B18] border border-[#2A2A26] flex items-center justify-center text-[#F1EBDD]/60 mx-auto mb-4">
            <BookOpen className="w-5 h-5" />
          </div>
          <h4 className="text-base font-serif text-[#F1EBDD] mb-1">
            No articles match your criteria
          </h4>
          <p className="text-xs text-[#F1EBDD]/60 mb-6">
            We couldn&apos;t find any resources matching &quot;{searchQuery}&quot;. Try another search term or clear your filters.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("All");
              setSearchQuery("");
            }}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-[#F1EBDD] bg-[#641F2A] hover:bg-[#641F2A]/90 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* ─── NEWSLETTER / TECHNICAL BRIEFINGS CTA PLACEHOLDER ────────── */}
      <section className="p-8 sm:p-12 rounded-3xl bg-[#161614] border border-[#2A2A26] shadow-2xl relative overflow-hidden">
        <div className="max-w-3xl mx-auto text-center space-y-5 relative z-10">
          <div className="w-12 h-12 rounded-xl bg-[#641F2A]/15 border border-[#641F2A]/30 flex items-center justify-center text-[#641F2A] mx-auto">
            <Mail className="w-6 h-6" />
          </div>

          <Badge variant="burgundy" dot>
            Knowledge Subscription
          </Badge>

          <h3 className="text-2xl sm:text-3xl font-serif text-[#F1EBDD] tracking-tight">
            Subscribe to SOMYA Technical Briefings
          </h3>

          <p className="text-sm text-[#F1EBDD]/70 max-w-xl mx-auto leading-relaxed font-sans">
            Receive curated architectural frameworks, enterprise hardware guides, and pragmatic AI automation breakdowns directly in your inbox. No marketing spam.
          </p>

          {newsletterSubscribed ? (
            <div className="p-4 rounded-xl bg-[#68704A]/20 border border-[#68704A]/40 text-[#68704A] text-xs font-medium inline-flex items-center gap-2 font-sans">
              <CheckCircle className="w-4 h-4" />
              <span>Thank you! Your email has been added to our technical dispatch list.</span>
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto pt-2 font-sans">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter corporate email address..."
                className="w-full px-4 py-3 rounded-xl bg-[#1B1B18] border border-[#2A2A26] text-sm text-[#F1EBDD] placeholder-[#F1EBDD]/40 focus:outline-none focus:border-[#641F2A]"
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-5 py-3 rounded-xl text-xs font-semibold text-[#F1EBDD] bg-[#641F2A] hover:bg-[#641F2A]/90 transition-all shrink-0"
              >
                Subscribe
              </button>
            </form>
          )}

          <div className="pt-2 text-[11px] text-[#F1EBDD]/40 font-mono">
            Unsubscribe anytime • Zero third-party data sharing • Strictly engineering insights
          </div>
        </div>
      </section>
    </div>
  );
}
