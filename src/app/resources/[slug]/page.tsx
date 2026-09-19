import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createMetadata, getArticleSchema, getBreadcrumbSchema } from "@/lib/seo";
import {
  getArticleBySlug,
  getResources,
  getRelatedArticles,
  type ResourceCategory,
} from "@/lib/resources";
import {
  Badge,
  Breadcrumbs,
} from "@/components/ui";
import { ButtonLink } from "@/components/buttons";
import {
  ArrowRight,
  ArrowLeft,
  Clock,
  Calendar,
  User,
  CheckCircle,
  Sparkles,
  BookOpen,
} from "lucide-react";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = await getResources();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Article Not Found | SOMYA INNOVATIONS",
    };
  }

  return createMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/resources/${article.slug}`,
    openGraphType: "article",
  });
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

export default async function ArticleDetailPage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = await getRelatedArticles(article.id, article.category, 3);
  const badgeVariant = getCategoryBadgeVariant(article.category);

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Resources", url: "/resources" },
    { name: article.title, url: `/resources/${article.slug}` },
  ]);

  const articleSchema = getArticleSchema({
    headline: article.title,
    description: article.excerpt,
    url: `/resources/${article.slug}`,
    datePublished: article.publishedAt,
    authorName: article.author.name,
  });

  return (
    <div className="bg-[#11110F] text-[#F1EBDD] min-h-screen py-12 sm:py-16 lg:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs
          items={[
            { label: "Resources", href: "/resources" },
            { label: article.category, href: `/resources` },
            { label: article.title },
          ]}
        />

        {/* Back Button */}
        <div className="mb-8">
          <Link
            href="/resources"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#F1EBDD]/60 hover:text-[#F1EBDD] transition-colors font-sans"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Resources</span>
          </Link>
        </div>

        {/* ─── ARTICLE HEADER ─────────────────────────────────────────── */}
        <header className="space-y-6 mb-12">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant={badgeVariant}>
              {article.category}
            </Badge>
            <span className="text-xs text-[#F1EBDD]/60 flex items-center gap-1.5 font-sans">
              <Clock className="w-3.5 h-3.5 text-[#F1EBDD]/40" />
              {article.readTime}
            </span>
            <span className="text-[#F1EBDD]/20">•</span>
            <span className="text-xs text-[#F1EBDD]/60 flex items-center gap-1.5 font-sans">
              <Calendar className="w-3.5 h-3.5 text-[#F1EBDD]/40" />
              Published on {article.publishedAt}
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#F1EBDD] tracking-tight leading-tight">
            {article.title}
          </h1>

          <p className="text-base sm:text-lg text-[#F1EBDD]/70 leading-relaxed font-sans">
            {article.excerpt}
          </p>

          {/* Author Card */}
          <div className="pt-6 border-t border-[#2A2A26] flex items-center justify-between gap-4 font-sans">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#1B1B18] border border-[#2A2A26] flex items-center justify-center text-[#F1EBDD]">
                <User className="w-5 h-5 text-[#641F2A]" />
              </div>
              <div>
                <span className="text-sm font-semibold text-[#F1EBDD] block">
                  {article.author.name}
                </span>
                <span className="text-xs text-[#F1EBDD]/40">
                  {article.author.role}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="hidden sm:inline-block text-[11px] font-mono text-[#F1EBDD]/60 bg-[#161614] px-2.5 py-1 rounded border border-[#2A2A26]"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </header>

        {/* ─── EXECUTIVE KEY TAKEAWAYS BOX ────────────────────────────── */}
        <div className="mb-12 p-6 sm:p-8 rounded-2xl bg-[#161614] border border-[#641F2A]/30 space-y-4 font-sans">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#641F2A] uppercase tracking-wider font-mono">
            <Sparkles className="w-4 h-4 text-[#641F2A]" />
            <span>Executive Takeaways</span>
          </div>
          <ul className="space-y-2.5">
            {article.keyTakeaways.map((takeaway) => (
              <li key={takeaway} className="flex items-start gap-3 text-xs sm:text-sm text-[#F1EBDD]/80 leading-relaxed">
                <CheckCircle className="w-4 h-4 text-[#641F2A] shrink-0 mt-0.5" />
                <span>{takeaway}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ─── SEMANTIC ARTICLE CONTENT BODY ──────────────────────────── */}
        <article className="prose prose-invert max-w-none space-y-8 text-[#F1EBDD]/80 text-sm sm:text-base leading-relaxed mb-16 font-sans">
          <p className="text-base sm:text-lg text-[#F1EBDD] leading-relaxed font-normal">
            {article.content.intro}
          </p>

          {article.content.sections.map((sec) => (
            <section key={sec.heading} className="pt-6 space-y-4">
              <h2 className="text-xl sm:text-2xl font-serif text-[#F1EBDD] tracking-tight border-b border-[#2A2A26] pb-3">
                {sec.heading}
              </h2>

              {sec.paragraphs.map((para, pIdx) => (
                <p key={pIdx} className="text-[#F1EBDD]/70 leading-relaxed">
                  {para}
                </p>
              ))}

              {sec.bulletPoints && (
                <ul className="space-y-2 pl-2 pt-2">
                  {sec.bulletPoints.map((bp) => (
                    <li key={bp} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#F1EBDD]/80">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#641F2A] shrink-0 mt-2" />
                      <span>{bp}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          <div className="p-6 rounded-2xl bg-[#161614] border border-[#2A2A26] mt-8">
            <h3 className="text-base font-serif text-[#F1EBDD] mb-2">
              Key Architectural Conclusion
            </h3>
            <p className="text-sm text-[#F1EBDD]/70 leading-relaxed font-sans">
              {article.content.conclusion}
            </p>
          </div>
        </article>

        {/* ─── RELATED ARTICLES SECTION ───────────────────────────────── */}
        {relatedArticles.length > 0 && (
          <section className="pt-16 border-t border-[#2A2A26] mb-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <Badge variant="burgundy" dot className="mb-2">
                  Further Reading
                </Badge>
                <h3 className="text-xl sm:text-2xl font-serif text-[#F1EBDD] tracking-tight">
                  Related Insights
                </h3>
              </div>
              <Link
                href="/resources"
                className="text-xs font-semibold text-[#641F2A] hover:text-[#E8DFCF] inline-flex items-center gap-1 font-sans"
              >
                <span>All Articles</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
              {relatedArticles.map((rel) => {
                const relBadgeVariant = getCategoryBadgeVariant(rel.category);
                return (
                  <div
                    key={rel.id}
                    className="p-6 rounded-2xl bg-[#161614] border border-[#2A2A26] hover:border-[#641F2A]/40 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant={relBadgeVariant} size="sm">
                          {rel.category}
                        </Badge>
                        <span className="text-[10px] text-[#F1EBDD]/40">
                          {rel.readTime}
                        </span>
                      </div>
                      <h4 className="text-sm font-serif text-[#F1EBDD] mb-2 line-clamp-2 hover:text-[#E8DFCF] transition-colors">
                        <Link href={`/resources/${rel.slug}`}>
                          {rel.title}
                        </Link>
                      </h4>
                      <p className="text-xs text-[#F1EBDD]/60 line-clamp-3 mb-4 font-sans">
                        {rel.excerpt}
                      </p>
                    </div>

                    <Link
                      href={`/resources/${rel.slug}`}
                      className="text-xs font-semibold text-[#641F2A] hover:text-[#E8DFCF] inline-flex items-center gap-1 font-sans"
                    >
                      <span>Read Insight</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* ─── TECHNICAL DISCOVERY CTA CARD ───────────────────────────── */}
        <section className="p-8 sm:p-12 rounded-3xl bg-[#161614] border border-[#2A2A26] text-center space-y-6">
          <div className="w-12 h-12 rounded-xl bg-[#641F2A]/15 border border-[#641F2A]/30 flex items-center justify-center text-[#641F2A] mx-auto">
            <BookOpen className="w-6 h-6" />
          </div>

          <h3 className="text-2xl sm:text-3xl font-serif text-[#F1EBDD] tracking-tight">
            Apply These Principles to Your Environment
          </h3>

          <p className="text-sm text-[#F1EBDD]/70 max-w-lg mx-auto leading-relaxed font-sans">
            Interested in translating these architectural insights into practical deployments for your organization?
            Speak with our engineering team to review your technical objectives.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <ButtonLink
              href="/request-quote"
              variant="primary"
              size="md"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Discuss Your Project
            </ButtonLink>
            <ButtonLink href="/contact" variant="secondary" size="md">
              Contact Engineering Desk
            </ButtonLink>
          </div>
        </section>
      </div>
    </div>
  );
}
