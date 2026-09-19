import type { Metadata } from "next";
import { COMPANY } from "./constants/company";

export interface CreateMetadataOptions {
  title: string;
  description: string;
  path?: string;
  openGraphType?: "website" | "article";
  image?: string;
  noIndex?: boolean;
}

export function createMetadata({
  title,
  description,
  path = "",
  openGraphType = "website",
  image = "/og-image.jpg",
  noIndex = false,
}: CreateMetadataOptions): Metadata {
  const cleanPath = path ? (path.startsWith("/") ? path : `/${path}`) : "";
  const canonicalUrl = cleanPath === "" || cleanPath === "/" 
    ? `${COMPANY.siteUrl}/` 
    : `${COMPANY.siteUrl}${cleanPath.replace(/\/$/, "")}`;
  const fullImageUrl = image.startsWith("http") ? image : `${COMPANY.siteUrl}${image.startsWith("/") ? image : `/${image}`}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: openGraphType,
      locale: COMPANY.seo.locale,
      url: canonicalUrl,
      title: title.includes(COMPANY.name) ? title : `${title} | ${COMPANY.name}`,
      description,
      siteName: COMPANY.name,
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: `${title} - ${COMPANY.name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: title.includes(COMPANY.name) ? title : `${title} | ${COMPANY.name}`,
      description,
      images: [fullImageUrl],
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
  };
}

/**
 * Generates Schema.org JSON-LD for Organization.
 * Strictly verified data only — no fabricated phones, addresses, ratings or social accounts.
 */
export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: COMPANY.name,
    legalName: COMPANY.legalName,
    url: `${COMPANY.siteUrl}/`,
    logo: `${COMPANY.siteUrl}/branding/logo-mark.png`,
    description: COMPANY.seo.defaultDescription,
    knowsAbout: [
      "Artificial Intelligence",
      "Machine Learning",
      "Computer Vision",
      "Intelligent Process Automation",
      "Enterprise IT Infrastructure",
      "Hardware and Systems",
      "Structured Networking",
      "Cybersecurity Technology",
      "Custom Software Development",
      "Web Application Development",
      "API and Cloud Architecture",
      "Technology Products",
    ],
  };
}

/**
 * Generates Schema.org JSON-LD for WebSite.
 */
export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: COMPANY.name,
    url: `${COMPANY.siteUrl}/`,
    description: COMPANY.seo.defaultDescription,
    publisher: {
      "@type": "Organization",
      name: COMPANY.name,
    },
  };
}

/**
 * Generates Schema.org JSON-LD for BreadcrumbList.
 */
export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${COMPANY.siteUrl}${item.url}`,
    })),
  };
}

/**
 * Generates Schema.org JSON-LD for an Article / Resource.
 */
export interface ArticleSchemaOptions {
  headline: string;
  description: string;
  url: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  authorName?: string;
}

export function getArticleSchema({
  headline,
  description,
  url,
  image,
  datePublished,
  dateModified,
  authorName = COMPANY.name,
}: ArticleSchemaOptions) {
  const fullImageUrl = image
    ? image.startsWith("http")
      ? image
      : `${COMPANY.siteUrl}${image.startsWith("/") ? image : `/${image}`}`
    : `${COMPANY.siteUrl}/og-image.jpg`;

  const canonicalUrl = url.startsWith("http") ? url : `${COMPANY.siteUrl}${url}`;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    url: canonicalUrl,
    image: fullImageUrl,
    datePublished: datePublished || undefined,
    dateModified: dateModified || datePublished || undefined,
    author: {
      "@type": "Organization",
      name: authorName,
      url: `${COMPANY.siteUrl}/`,
    },
    publisher: {
      "@type": "Organization",
      name: COMPANY.name,
      logo: {
        "@type": "ImageObject",
        url: `${COMPANY.siteUrl}/branding/logo-mark.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
  };
}

/**
 * Generates Schema.org JSON-LD for a SoftwareApplication / Product.
 * Strictly verified metadata only — zero fabricated prices, reviews, ratings, or SKUs.
 */
export interface ProductSchemaOptions {
  name: string;
  description: string;
  slug: string;
  category: string;
}

export function getProductSchema({
  name,
  description,
  slug,
  category,
}: ProductSchemaOptions) {
  const canonicalUrl = `${COMPANY.siteUrl}/products/${slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    description,
    applicationCategory: category.includes("AI")
      ? "ArtificialIntelligenceApplication"
      : "BusinessApplication",
    operatingSystem: "Cloud, Web, Linux, Windows, macOS",
    url: canonicalUrl,
    provider: {
      "@type": "Organization",
      name: COMPANY.name,
      url: `${COMPANY.siteUrl}/`,
    },
  };
}

